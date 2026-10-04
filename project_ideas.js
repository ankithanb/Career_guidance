(function() {
    const projectsList = document.getElementById('projectsList');
    const branchSelect = document.getElementById('branch');
    const difficultySelect = document.getElementById('difficulty');
    const findBtn = document.getElementById('findBtn');

    const projects = {
        CSE: [
            {
                title: "Task Management System",
                difficulty: "Beginner",
                description: "Build a simple todo app with CRUD operations",
                techStack: ["HTML", "CSS", "JavaScript", "localStorage"],
                github: "https://github.com/topics/todo-app"
            },
            {
                title: "URL Shortener",
                difficulty: "Intermediate",
                description: "Create a service that converts long URLs to short ones",
                techStack: ["Node.js", "Express", "MongoDB", "React"],
                github: "https://github.com/topics/url-shortener"
            },
            {
                title: "Real-time Chat Application",
                difficulty: "Advanced",
                description: "Build a chat app with rooms and real-time messaging",
                techStack: ["React", "Socket.io", "Node.js", "Redis"],
                github: "https://github.com/topics/chat-app"
            }
        ],
        IT: [
            {
                title: "File Sharing System",
                difficulty: "Beginner",
                description: "Create a simple file upload/download system",
                techStack: ["PHP", "MySQL", "Bootstrap"],
                github: "https://github.com/topics/file-sharing"
            },
            {
                title: "Network Monitor Dashboard",
                difficulty: "Intermediate",
                description: "Monitor network status and display metrics",
                techStack: ["Python", "Flask", "Chart.js"],
                github: "https://github.com/topics/network-monitoring"
            },
            {
                title: "Cloud Storage Service",
                difficulty: "Advanced",
                description: "Build a Dropbox-like cloud storage system",
                techStack: ["Node.js", "AWS S3", "React", "MongoDB"],
                github: "https://github.com/topics/cloud-storage"
            }
        ],
        ECE: [
            {
                title: "Arduino Weather Station",
                difficulty: "Beginner",
                description: "Build a basic weather monitoring system",
                techStack: ["Arduino", "C++", "DHT11 Sensor"],
                github: "https://github.com/topics/weather-station"
            },
            {
                title: "Home Automation System",
                difficulty: "Intermediate",
                description: "Control home appliances using IoT",
                techStack: ["ESP8266", "MQTT", "Node-RED"],
                github: "https://github.com/topics/home-automation"
            },
            {
                title: "Smart Security System",
                difficulty: "Advanced",
                description: "Build a security system with motion detection and camera",
                techStack: ["Raspberry Pi", "Python", "OpenCV"],
                github: "https://github.com/topics/security-camera"
            }
        ],
        EE: [
            {
                title: "Solar Charge Controller",
                difficulty: "Beginner",
                description: "Build a basic solar charging system",
                techStack: ["Arduino", "Solar Panel", "Voltage Sensors"],
                github: "https://github.com/topics/solar-charger"
            },
            {
                title: "Smart Energy Meter",
                difficulty: "Intermediate",
                description: "Create an IoT-based energy monitoring system",
                techStack: ["ESP32", "Current Sensors", "Cloud Platform"],
                github: "https://github.com/topics/energy-meter"
            },
            {
                title: "Electric Vehicle Battery Management",
                difficulty: "Advanced",
                description: "Design a BMS for electric vehicles",
                techStack: ["STM32", "CAN Bus", "Battery Monitoring ICs"],
                github: "https://github.com/topics/battery-management"
            }
        ],
        ME: [
            {
                title: "3D Printed Robot Arm",
                difficulty: "Beginner",
                description: "Design and build a simple robotic arm",
                techStack: ["3D Printing", "Arduino", "Servo Motors"],
                github: "https://github.com/topics/robot-arm"
            },
            {
                title: "CNC Drawing Machine",
                difficulty: "Intermediate",
                description: "Build a 2-axis drawing machine",
                techStack: ["Arduino", "Stepper Motors", "G-code"],
                github: "https://github.com/topics/cnc-plotter"
            },
            {
                title: "Automated Drone",
                difficulty: "Advanced",
                description: "Design and build an autonomous drone",
                techStack: ["Flight Controller", "GPS", "Sensors"],
                github: "https://github.com/topics/diy-drone"
            }
        ],
        CE: [
            {
                title: "Construction Cost Calculator",
                difficulty: "Beginner",
                description: "Build a web-based construction cost estimator",
                techStack: ["HTML", "JavaScript", "Bootstrap"],
                github: "https://github.com/topics/cost-calculator"
            },
            {
                title: "Structural Analysis Tool",
                difficulty: "Intermediate",
                description: "Create a tool for basic structural calculations",
                techStack: ["Python", "NumPy", "Matplotlib"],
                github: "https://github.com/topics/structural-analysis"
            },
            {
                title: "Smart Building Monitor",
                difficulty: "Advanced",
                description: "IoT-based building health monitoring system",
                techStack: ["Sensors", "Cloud Platform", "Data Analytics"],
                github: "https://github.com/topics/building-monitoring"
            }
        ]
    };

    // Rest of your existing code remains the same
    function createProjectCard(project) {
        return `
            <div class="project-card">
                <h3 class="project-title">${project.title}</h3>
                <span class="project-difficulty ${project.difficulty}">${project.difficulty}</span>
                <p>${project.description}</p>
                <div class="project-tech">
                    Tech Stack: ${project.techStack.join(', ')}
                </div>
                <a href="${project.github}" target="_blank" class="project-link">
                    📚 View Similar Projects on GitHub
                </a>
            </div>
        `;
    }

    findBtn.addEventListener('click', () => {
        const branch = branchSelect.value;
        const difficulty = difficultySelect.value;
        
        if (!branch) {
            projectsList.innerHTML = 'Please select a branch';
            return;
        }

        const branchProjects = projects[branch] || [];
        const filteredProjects = difficulty 
            ? branchProjects.filter(p => p.difficulty === difficulty)
            : branchProjects;

        if (filteredProjects.length === 0) {
            projectsList.innerHTML = 'No projects found for selected criteria';
            return;
        }

        projectsList.innerHTML = filteredProjects.map(createProjectCard).join('');
    });
})();