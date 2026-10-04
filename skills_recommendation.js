(function() {
    // Get DOM elements
    const branchSelect = document.getElementById('branch');
    const recommendBtn = document.getElementById('recommendBtn');
    const suggestionsDiv = document.getElementById('suggestions');
    const copyBtn = document.getElementById('copyBtn');
    const downloadBtn = document.getElementById('downloadBtn');

    // Complete skills mapping for all branches
    const skillsMap = {
        CSE: {
            languages: ['Java', 'Python', 'C++', 'JavaScript'],
            tools: ['Git', 'VS Code', 'Docker', 'Postman'],
            software: ['MySQL', 'MongoDB', 'React/Angular', 'Node.js'],
            certifications: ['AWS Certified Developer', 'Oracle Java Certification', 'Microsoft Azure Fundamentals']
        },
        IT: {
            languages: ['Python', 'Java', 'JavaScript', 'PHP'],
            tools: ['Git', 'Jenkins', 'Docker', 'Kubernetes'],
            software: ['MySQL', 'Redis', 'Apache/Nginx', 'Linux'],
            certifications: ['CompTIA A+', 'AWS Solutions Architect', 'CCNA']
        },
        ECE: {
            languages: ['C', 'Python', 'MATLAB'],
            tools: ['Arduino', 'Raspberry Pi', 'Oscilloscope'],
            software: ['MATLAB', 'Xilinx ISE', 'Proteus'],
            certifications: ['Embedded Systems', 'VLSI Design', 'IoT Fundamentals']
        },
        EE: {
            languages: ['Python', 'MATLAB', 'C'],
            tools: ['PLC Programming Tools', 'Oscilloscope', 'Multimeter'],
            software: ['AutoCAD Electrical', 'ETAP', 'LabVIEW'],
            certifications: ['Electrical Safety', 'PLC Programming', 'Power Systems']
        },
        ME: {
            languages: ['Python', 'MATLAB'],
            tools: ['AutoCAD', 'CNC Machines', '3D Printers'],
            software: ['SolidWorks', 'ANSYS', 'Fusion 360'],
            certifications: ['AutoCAD Certified', 'Six Sigma Green Belt', 'CNC Programming']
        },
        CE: {
            languages: ['Python', 'MATLAB'],
            tools: ['Survey Equipment', 'Material Testing Tools'],
            software: ['AutoCAD Civil 3D', 'STAAD Pro', 'Revit'],
            certifications: ['AutoCAD Civil 3D', 'LEED Green Associate', 'PMP']
        },
        CHE: {
            languages: ['Python', 'MATLAB'],
            tools: ['Lab Equipment', 'Process Control Tools'],
            software: ['Aspen Plus', 'CHEMCAD', 'COMSOL'],
            certifications: ['Process Safety Management', 'Six Sigma', 'HAZOP']
        },
        BT: {
            languages: ['Python', 'R'],
            tools: ['Lab Equipment', 'Microscopes', 'Spectrophotometer'],
            software: ['BLAST', 'PyMOL', 'Bioinformatics Tools'],
            certifications: ['GMP Certification', 'Bioinformatics', 'Lab Safety']
        },
        MBA: {
            languages: ['SQL', 'Python for Analytics'],
            tools: ['MS Office Suite', 'Project Management Tools'],
            software: ['SAP', 'Tableau', 'Power BI'],
            certifications: ['PMP', 'Six Sigma', 'Financial Modeling']
        },
        OTHER: {
            languages: ['Python', 'SQL', 'R'],
            tools: ['MS Office Suite', 'Data Analysis Tools'],
            software: ['Industry Specific Software', 'Analytics Tools'],
            certifications: ['Domain Specific Certifications', 'Project Management', 'Data Analytics']
        }
    };

    // Format recommendations
    function formatRecommendations(branch) {
        const skills = skillsMap[branch];
        if (!skills) return 'Please select a valid branch';

        return `Recommended Skills for ${branch}:\n
Programming Languages:
${skills.languages.join(', ')}

Tools & Technologies:
${skills.tools.join(', ')}

Software & Platforms:
${skills.software.join(', ')}

Recommended Certifications:
${skills.certifications.join(', ')}`;
    }

    // Event Listeners
    recommendBtn.addEventListener('click', () => {
        const selectedBranch = branchSelect.value;
        if (!selectedBranch) {
            suggestionsDiv.textContent = 'Please select a branch first';
            return;
        }
        suggestionsDiv.textContent = formatRecommendations(selectedBranch);
    });

    copyBtn.addEventListener('click', () => {
        const text = suggestionsDiv.textContent;
        navigator.clipboard.writeText(text)
            .then(() => {
                copyBtn.textContent = 'Copied!';
                setTimeout(() => copyBtn.textContent = 'Copy to Clipboard', 2000);
            })
            .catch(err => alert('Failed to copy text'));
    });

    downloadBtn.addEventListener('click', () => {
        const text = suggestionsDiv.textContent;
        const blob = new Blob([text], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'skills_recommendation.txt';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    });
})();