const projectData = {
    "ischemic-stroke": {
        title: "Ischemic Stroke Classification",
        subtitle: "EMG Signal Analysis & Closed Loop System",
        image: "eeg.png",
        pi: "Dr. Sudheer A P & Shahid (Ph.D.)",
        institute: "RIG, NIT Calicut & Govt Med. College",
        duration: "Ongoing Project",
        description: "Aims to utilize EMG signals, for the detection and classification of Ischemic stroke.",
        highlights: [
            "Nonlinear characteristics will be derived from the EMG signal. These features will be employed to create a closed-loop system designed to provide feedback to individuals recovering from a stroke.",
            "This project is guided by Dr. Sudheer A P and his Ph.D. student, Shahid, from the Mechatronics Laboratory in the Mechanical Engineering Department at NIT Calicut.",
            "Collaborated with the Government Medical College, Kozhikode (India) and awaiting an ethical clearance for the research."
        ],
        techStack: ["EMG Processing", "Non-linear Dynamics", "Closed-Loop Systems", "Rehabilitation"]
    },
    "schizophrenia-depression": {
        title: "Schizophrenia & Depression AI",
        subtitle: "BTech Final Year Project",
        image: "depression.png",
        pi: "Dr. Subha DP",
        institute: "NIT Calicut & Govt Med. College",
        duration: "May 2023 - April 2024",
        description: "Aims to utilize non-invasive methods, including EEG signals, for the detection and classification of Schizophrenia and Major Depressive Disorder.",
        highlights: [
            "Developing a precise and user-friendly diagnostic tool to aid neurologists and psychiatrists in the early detection and classification of these medical condition.",
            "Projected guided by Dr. Subha DP, Biomedical Signal Processing Laboratory, Electrical and Electronics Engineering Department (NIT Calicut).",
            "Collaborated with the Psychiatry Department, Government Medical College, Kozhikode (India)",
            "The research work was published in the IEEE INDISCON Conference 2023, hosted at GSSS Institute of Engineering and Technology for Womenn(Mysore)."
        ],
        techStack: ["Deep Learning", "EEG Analysis", "Clinical Psychiatry", "Diagnostic Tools"]
    },
    "alzheimers": {
        title: "Alzheimer's Brain Dynamics",
        subtitle: "Complex Network Analysis & Graph Theory",
        image: "alzheimers.png",
        pi: "Dr. Subha DP",
        institute: "NIT Calicut & SERB",
        duration: "Jan 2024 - Mar 2024",
        description: "Investigations on the alteration in brain dynamics during progression of Alzheimer Disease (AD) from Mild Cognitive Impairment (MCI) under resting and cognitive task conditions using complex network analysis",
        highlights: [
            "A research internship offer from the Electrical and Electronics Engineering Department of NIT Calicut under the Science and Engineering Research Board (SERB) under Scientific Social Responsibility (SSR) Policy of DST-SERB CRG Research Project.",
            "Developed a Cutting-edge Preprocessing Pipeline by comparing various artifact removal algorithms including Transient Artifact Reduction Algorithm (TARA), Independent Component Analysis (ICA), Wavelet Denoising, and Simultaneous LPF/TVD.",
            "Validated the performance of each algorithm with respect to the data, in terms of Signal-To-Noise Ratio (SNR) and Root-Mean-Squared Error (RMSE)"
        ],
        techStack: ["Python", "MATLAB", "Network Science", "Signal Processing"]
    },
    "neuro-software": {
        title: "Neuro-Signal Analysis Software",
        subtitle: "Automated Time-Series Analysis Tool",
        image: "software.png",
        pi: "Dr. Chinnakkaruppan Adaikkan",
        institute: "Centre for Brain Research (IISc)",
        duration: "May 2023 - Aug 2023",
        description: "two complementary projects focusing on neural signal processing, and honed proficiency in computational neuroscience, statistics and signal processing.",
        highlights: [
            "In the first project, I examined the intracranial electroencephalogram (EEG) or local field potential (LFP) and extracellular neuronal spike data to understand the neural mechanism of non-invasive brain stimulation.",
            "In the second project, I developed a software application tailored to neuroscientists and neurologists.",
            "This application streamlines the automated analysis of diverse time-series data, encompassing EEG & LFP signals focusing on temporal, spectral and spectro-temporal feature extraction algorithms.",
            "My research poster received the Best Research Poster Award, winning first prize at the CBR Poster Symposium 2023 held at IISc, surpassing fellow interns from diverse laboratories."
        ],
        techStack: ["Python", "GUI Development", "Neuroscience", "Statistical Analysis"]
    },
    "prosthetics": {
        title: "Mind-Controlled Prosthetics",
        subtitle: "Motor Imagery BCI System",
        image: "bci.png",
        pi: "Dr. Sudheer AP",
        institute: "NIT Calicut",
        duration: "Dec 2022 - Apr 2023",
        description: "developed a Deep learning-based EEG motor imaginary signal prediction and classifier model for prosthetic limb control",
        highlights: [
            "Developed a long short term memory (LSTM) model to predict and classify motor imaginary signals",
            "Integrated this model into a hardware control system, using NodeMCU, servo motors, and Arduino programming.",
            "Contributed towards a journal publication in Robotica, a cambridge University Press journal with Impactfactor:  2.7",
            "Research was conducted in collaboration with Assistant Professor Meby Mathew, Amal Jyothi College of Engineering"
        ],
        techStack: ["Deep Learning", "Embedded Systems", "Robotics", "Arduino"]
    },
    "security": {
        title: "Biometric Security System",
        subtitle: "Contactless Face Recognition",
        image: "nn.png",
        pi: "Dr. Sudhish N George",
        institute: "NIT Calicut",
        duration: "Sep 2022 - Dec 2022",
        description: "developed a robust and contactless face recognition-based security system in view of the COVID-19 pandemic in the Embedded Systems Laboratory, National Institute of Technology Calicut",
        highlights: [
            "Developed a deep learning-based face recognition model by utilizing OpenCV and Histogram of Oriented Gradients (HOG) algorithm and Computer Networking",
            "Developed model uses 128 unique measurements for each face data and achieves a face recognition accuracy of 99.38%, with just one image of the person as input",
            "Integrated this model into an embedded system comprising NodeMCU, camera, solenoid door lock, and a speaker, employing Arduino programming and principles of communication protocols"
        ],
        techStack: ["Computer Vision", "OpenCV", "IoT", "Embedded Protocols"]
    },
    "cardiac-iot": {
        title: "Cardiac VO2 Max IoT",
        subtitle: "Remote Medical Monitoring",
        image: "eeg.png",
        pi: "Dr. Raghu C V",
        institute: "NIT Calicut",
        duration: "May 2022 - Aug 2022",
        description: "co-developed a device for estimating maximum oxygen uptake(VO2 max) of cardiac patients.",
        highlights: [
            "Primary focus of this project is to monitor the post-surgical conditions of Angiogram patients by analysing their real-time VO2 max, VCO2 max, and breathing flow rate.",
            "Developed a portable mask-based medical equipment by integrating oxygen sensor, carbon-dioxide sensor, and flow-rate sensor, employing principles of Communication protocols and Python programming.",
            "Real time analysis of the above mentioned parameters by the doctor was possible using this IoT approach"
        ],
        techStack: ["IoT", "Medical Sensors", "Python", "Data Analysis"]
    },
    "swab-manipulator": {
        title: "Swab Collecting Manipulator",
        subtitle: "Robotics Interest Group (RIG)",
        image: "bci.png",
        pi: "RIG, NIT Calicut",
        institute: "NIT Calicut",
        duration: "2020 - 2021",
        description: "Developed a manipulator with a gripper on one end to hold and collect the swab in view of Covid-19 pandemic",
        highlights: [
            "Capable of recognizing human noses using OpenCV and integrated flex sensors in the gripper to provide feedback response to improve the precision of the swab's controlled passage into the nose.",
            "Developed and integrated an automated sanitizing station along with the manipulator setup."
        ],
        techStack: ["Robotics", "OpenCV", "Flex Sensors", "Control Systems"]
    },
    "riggu-robot": {
        title: "RIGGU - Semi-Humanoid Robot",
        subtitle: "Robotics Interest Group (RIG)",
        image: "nn.png",
        pi: "RIG, NIT Calicut",
        institute: "NIT Calicut",
        duration: "Project",
        description: "RIGGU is a semi-humanoid robot built for biomedical applications to assist and aid medical personnel as well as patients",
        highlights: [
            "Locomotion is carried out by Simultaneous Localization and Mapping (SLAM) with Differential Drive mechanism",
            "Capable of detecting and recognizing objects, faces, and speech and it will also track human faces and obey human commands",
            "Developed a chat-bot for communicating with RIGGU via smart phones.",
            "Robot is controlled using NVIDIA Jetson and Python programming"
        ],
        techStack: ["NVIDIA Jetson", "SLAM", "Python", "Human-Robot Interaction"]
    }
};

export default projectData;
