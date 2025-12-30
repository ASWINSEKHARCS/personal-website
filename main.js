import * as THREE from 'three';


// --- Configuration ---
const CONFIG = {
    particleCount: 4000,
    brainSize: 15,
    particleColor: 0x00f3ff,
    signalColor: 0xffffff,
    rotationSpeed: 0.001
};

// --- Scene Setup ---
const canvas = document.getElementById('brain-canvas');
const scene = new THREE.Scene();

// Camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 40;
camera.position.y = 5;

// Renderer
const renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); // Optimize for retina

// --- Mouse Parallax Controls ---
const mouse = { x: 0, y: 0 };
const targetRotation = { x: 0, y: 0 };

window.addEventListener('mousemove', (event) => {
    // Normalize mouse position to -1 to 1
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
});


// --- Brain Generation (Procedural Point Cloud) ---
// We generally want two hemispheres.
// Mathematics: Deformed spheres.

const brainGeometry = new THREE.BufferGeometry();
const positions = new Float32Array(CONFIG.particleCount * 3);
const randoms = new Float32Array(CONFIG.particleCount); // For phase offsets/animation

for (let i = 0; i < CONFIG.particleCount; i++) {
    // Generate a random point in a sphere-like volume
    // To make it look like a brain, we create two distinct clusters (hemispheres)

    // Choose hemisphere (-1 or 1)
    const hemi = Math.random() > 0.5 ? 1 : -1;

    // Random polar coordinates
    const theta = Math.random() * Math.PI * 2; // Azimuth
    const phi = Math.acos(Math.random() * 2 - 1); // Elevation

    // Radius variation to create volume, not just shell
    // We want more points on surface, fewer inside? Or uniform?
    // Let's try uniform distribution inside the volume first, then sculpt.
    const r = Math.cbrt(Math.random()) * CONFIG.brainSize; // Cube root for uniform volume

    // Convert to Cartesian
    let x = r * Math.sin(phi) * Math.cos(theta);
    let y = r * Math.sin(phi) * Math.sin(theta);
    let z = r * Math.cos(phi);

    // --- Sculpting the shape ---
    // Squish Y slightly (top-down)
    y *= 0.8;
    // Stretch Z (front-back)
    z *= 1.2;
    // Offset X for hemispheres
    x += hemi * 2.5;

    // Add some random noise for "organic" feel
    x += (Math.random() - 0.5) * 0.5;
    y += (Math.random() - 0.5) * 0.5;
    z += (Math.random() - 0.5) * 0.5;

    positions[i * 3] = x;
    positions[i * 3 + 1] = y;
    positions[i * 3 + 2] = z;

    randoms[i] = Math.random();
}

brainGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
brainGeometry.setAttribute('aRandom', new THREE.BufferAttribute(randoms, 1));

// Material with Mouse Scatter
const brainMaterial = new THREE.ShaderMaterial({
    uniforms: {
        uTime: { value: 0 },
        uColor: { value: new THREE.Color(CONFIG.particleColor) },
        uMouse: { value: new THREE.Vector3(0, 0, 0) }, // 3D Mouse position
        uHoverRadius: { value: 8.0 } // Radius of effect
    },
    vertexShader: `
        uniform float uTime;
        uniform vec3 uMouse;
        uniform float uHoverRadius;
        attribute float aRandom;
        
        varying float vAlpha;
        
        void main() {
            vec3 pos = position;
            
            // Interaction: Scatter away from mouse
            // Fix: Use World Space for distance check since the brain rotates
            vec4 worldPos = modelMatrix * vec4(pos, 1.0);
            float dist = distance(worldPos.xyz, uMouse);
            
            if (dist < uHoverRadius) {
                float force = (1.0 - dist / uHoverRadius);
                vec3 dir = normalize(worldPos.xyz - uMouse);
                // Push in local space? No, push in world space then convert back?
                // Simpler: Apply force in local direction relative to model origin
                pos += normalize(pos) * force * 15.0 * aRandom;
            }

            vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
            gl_Position = projectionMatrix * mvPosition;
            
            // SIGNIFICANTLY ENLARGED
            gl_PointSize = (12.0 * aRandom + 6.0) * (40.0 / -mvPosition.z);
            
            vAlpha = 0.4 + 0.6 * sin(uTime * 1.5 + aRandom * 15.0);
        }
    `,
    fragmentShader: `
        uniform vec3 uColor;
        varying float vAlpha;
        
        void main() {
            if (length(gl_PointCoord - vec2(0.5)) > 0.5) discard;
            float strength = 1.0 - (length(gl_PointCoord - vec2(0.5)) * 2.0);
            strength = pow(strength, 2.5); // Sharper falloff
            gl_FragColor = vec4(uColor, vAlpha * strength);
        }
    `,
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending
});

const brainParticles = new THREE.Points(brainGeometry, brainMaterial);
scene.add(brainParticles);


// --- Signal / Synapse Animation ---
const MAX_SIGNALS = 30;
const SIGNAL_SEGMENTS = 10; // Segments per signal path
const signalGeometry = new THREE.BufferGeometry();
// Allocation fix: Each segment has 2 points, each point has 3 floats.
const signalPositions = new Float32Array(MAX_SIGNALS * SIGNAL_SEGMENTS * 2 * 3);
signalGeometry.setAttribute('position', new THREE.BufferAttribute(signalPositions, 3));

const signalMaterial = new THREE.LineBasicMaterial({
    color: 0x00f3ff,
    transparent: true,
    opacity: 0.6,
    blending: THREE.AdditiveBlending
});

const signals = new THREE.LineSegments(signalGeometry, signalMaterial);
scene.add(signals);

const activeSignals = [];

// Helper to get curved points between A and B
function getCurvedPoint(p1, p2, t, curveHeight) {
    const mid = new THREE.Vector3().lerpVectors(p1, p2, t);
    // Add some random perpendicular offset
    const offset = new THREE.Vector3(0, curveHeight, 0); // Simple vertical curve for now
    mid.add(offset.multiplyScalar(Math.sin(t * Math.PI)));
    return mid;
}

// --- Animation Loop ---
const clock = new THREE.Clock();

function animate() {
    requestAnimationFrame(animate);
    const elapsedTime = clock.getElapsedTime();

    // --- Interaction Logic ---
    const targetX = mouse.x * 25;
    const targetY = mouse.y * 20;
    brainMaterial.uniforms.uMouse.value.x += (targetX - brainMaterial.uniforms.uMouse.value.x) * 0.1;
    brainMaterial.uniforms.uMouse.value.y += (targetY - brainMaterial.uniforms.uMouse.value.y) * 0.1;
    brainMaterial.uniforms.uMouse.value.z = 0;

    brainMaterial.uniforms.uTime.value = elapsedTime;

    // Parallax + Base Rotation
    const pRotY = mouse.x * 0.4 + elapsedTime * 0.1; // Add slow base rotation
    const pRotX = mouse.y * 0.2;

    brainParticles.rotation.y += (pRotY - brainParticles.rotation.y) * 0.05;
    brainParticles.rotation.x += (pRotX - brainParticles.rotation.x) * 0.05;
    signals.rotation.y = brainParticles.rotation.y;
    signals.rotation.x = brainParticles.rotation.x;

    // Signals Spawning
    if (activeSignals.length < MAX_SIGNALS && Math.random() > 0.8) {
        const startIdx = Math.floor(Math.random() * CONFIG.particleCount);
        // Find a neighbor within a certain distance? Or just someone in the hemisphere
        const endIdx = Math.floor(Math.random() * CONFIG.particleCount);

        activeSignals.push({
            startIdx, endIdx, progress: 0,
            speed: 0.02 + Math.random() * 0.04,
            curveHeight: (Math.random() - 0.5) * 8.0
        });
    }

    const sigPosAttribute = signals.geometry.attributes.position;
    const sigPos = sigPosAttribute.array;
    let posIndex = 0;

    for (let i = activeSignals.length - 1; i >= 0; i--) {
        const sig = activeSignals[i];
        sig.progress += sig.speed;
        if (sig.progress >= 1.2) { activeSignals.splice(i, 1); continue; }

        const p1 = new THREE.Vector3(positions[sig.startIdx * 3], positions[sig.startIdx * 3 + 1], positions[sig.startIdx * 3 + 2]);
        const p2 = new THREE.Vector3(positions[sig.endIdx * 3], positions[sig.endIdx * 3 + 1], positions[sig.endIdx * 3 + 2]);

        // Draw a short trailing segment along the curve
        const trailLen = 0.2;
        const head = Math.min(1, sig.progress);
        const tail = Math.max(0, sig.progress - trailLen);

        // We divide the trail into small segments to show the curve
        const numTrailSegments = SIGNAL_SEGMENTS;
        for (let j = 0; j < numTrailSegments; j++) {
            const t1 = tail + (head - tail) * (j / numTrailSegments);
            const t2 = tail + (head - tail) * ((j + 1) / numTrailSegments);

            const pt1 = getCurvedPoint(p1, p2, t1, sig.curveHeight);
            const pt2 = getCurvedPoint(p1, p2, t2, sig.curveHeight);

            sigPos[posIndex++] = pt1.x;
            sigPos[posIndex++] = pt1.y;
            sigPos[posIndex++] = pt1.z;
            sigPos[posIndex++] = pt2.x;
            sigPos[posIndex++] = pt2.y;
            sigPos[posIndex++] = pt2.z;
        }
    }

    // Clear rest
    for (let i = posIndex; i < sigPos.length; i++) sigPos[i] = 0;
    sigPosAttribute.needsUpdate = true;

    renderer.render(scene, camera);
}

// Window Resize Handling
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

animate();

// --- Premium UI Interactions ---

const initPremiumUI = () => {
    // Navigation Scroll Effect
    const nav = document.querySelector('nav');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    });

    // Mobile Hamburger Menu
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const links = document.querySelectorAll('.nav-links a');

    if (hamburger) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
        });
    }

    links.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });

    // Intersection Observer for Reveal Animations
    const revealCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');

                // Trigger Dashboard Special Animations
                if (entry.target.id === 'about' || entry.target.querySelector('.dashboard-grid')) {
                    const typewriters = entry.target.querySelectorAll('.typewriter');

                    typewriters.forEach(el => {
                        const text = el.innerText;
                        el.innerText = '';
                        let i = 0;
                        const type = () => {
                            if (i < text.length) {
                                el.innerText += text.charAt(i);
                                i++;
                                setTimeout(type, 30);
                            }
                        };
                        type();
                    });
                }

                observer.unobserve(entry.target);
            }
        });
    };

    const revealObserver = new IntersectionObserver(revealCallback, {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    });

    document.querySelectorAll('.reveal').forEach(el => {
        revealObserver.observe(el);
    });
};

document.addEventListener('DOMContentLoaded', () => {
    initPremiumUI();
});
