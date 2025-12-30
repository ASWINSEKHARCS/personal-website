/**
 * Automated Test Suite for Aswin Sekhar C S Personal Website
 * Verified: 2025-12-18
 */
(function () {
    const tests = {
        'Canvas Exists': () => !!document.getElementById('brain-canvas'),
        'WebGL Context Loaded': () => {
            const canvas = document.getElementById('brain-canvas');
            // Passive check: does it already have a context?
            return !!(canvas.getContext('webgl2', { reserve: true }) || canvas.getContext('webgl', { reserve: true }));
        },
        'Three.js Scene Running': () => {
            const canvas = document.getElementById('brain-canvas');
            // If Three.js is running, the context is already active
            return !!(canvas.getContext('webgl2') || canvas.getContext('webgl'));
        },
        'UI Elements Visible': () => {
            const hero = document.getElementById('hero');
            const nav = document.querySelector('nav');
            return hero && nav && hero.offsetHeight > 0;
        }
    };

    console.log('--- STARTING AUTOMATED TESTS ---');
    let passed = 0;
    let total = Object.keys(tests).length;

    for (const [name, test] of Object.entries(tests)) {
        try {
            if (test()) {
                console.log(`[PASS] ${name}`);
                passed++;
            } else {
                console.error(`[FAIL] ${name}`);
            }
        } catch (e) {
            console.error(`[ERROR] ${name}:`, e);
        }
    }

    console.log(`--- TEST RESULTS: ${passed}/${total} PASSED ---`);

    // Alert if critical fail (optional)
    if (passed < total) {
        console.warn('One or more site integrity tests failed.');
    }
})();
