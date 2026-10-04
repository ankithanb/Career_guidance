function addExperience() {
    const container = document.getElementById('experienceContainer');
    const newExp = document.createElement('div');
    newExp.className = 'experience-item';
    newExp.innerHTML = `
        <input type="text" placeholder="Job Title / Internship Role" class="exp-title">
        <input type="text" placeholder="Company Name" class="exp-company">
        <input type="text" placeholder="Duration (e.g., Summer 2023)" class="exp-duration">
        <textarea placeholder="Description of responsibilities and achievements" rows="3" class="exp-description"></textarea>
        <button type="button" class="remove-exp-btn" onclick="removeExperience(this)">Remove</button>
    `;
    container.appendChild(newExp);
}

function removeExperience(btn) {
    btn.parentElement.remove();
}

function addProject() {
    const container = document.getElementById('projectContainer');
    const newProj = document.createElement('div');
    newProj.className = 'project-item';
    newProj.innerHTML = `
        <input type="text" placeholder="Project Name" class="proj-name">
        <textarea placeholder="Project description and technologies used" rows="3" class="proj-description"></textarea>
        <button type="button" class="remove-proj-btn" onclick="removeProject(this)">Remove</button>
    `;
    container.appendChild(newProj);
}

function removeProject(btn) {
    btn.parentElement.remove();
}

function previewResume() {
    const previewSection = document.getElementById('previewSection');
    const resumePreview = document.getElementById('resumePreview');

    // Collect form data
    const fullName = document.getElementById('fullName').value || '[Your Name]';
    const email = document.getElementById('email').value || 'email@example.com';
    const phone = document.getElementById('phone').value || '(123) 456-7890';
    const location = document.getElementById('location').value || '';
    const linkedin = document.getElementById('linkedin').value || '';
    const github = document.getElementById('github').value || '';
    const summary = document.getElementById('summary').value || '';
    const skills = document.getElementById('skills').value || '';
    const degree = document.getElementById('degree').value || 'Bachelor of Technology';
    const university = document.getElementById('university').value || 'University Name';
    const graduation = document.getElementById('graduation').value || '2024';
    const cgpa = document.getElementById('cgpa').value || '';
    const certifications = document.getElementById('certifications').value || '';

    // Collect experiences
    const experiences = [];
    document.querySelectorAll('.experience-item').forEach(item => {
        const title = item.querySelector('.exp-title').value;
        const company = item.querySelector('.exp-company').value;
        const duration = item.querySelector('.exp-duration').value;
        const description = item.querySelector('.exp-description').value;
        if (title || company || duration || description) {
            experiences.push({ title, company, duration, description });
        }
    });

    // Collect projects
    const projects = [];
    document.querySelectorAll('.project-item').forEach(item => {
        const name = item.querySelector('.proj-name').value;
        const description = item.querySelector('.proj-description').value;
        if (name || description) {
            projects.push({ name, description });
        }
    });

    // Generate preview HTML
    let contactInfo = `${email} | ${phone}`;
    if (location) contactInfo += ` | ${location}`;
    if (linkedin) contactInfo += ` | ${linkedin}`;
    if (github) contactInfo += ` | ${github}`;

    let previewHTML = `
        <div class="resume-header">
            <div class="resume-name">${fullName}</div>
            <div class="resume-contact">${contactInfo}</div>
        </div>
    `;

    if (summary) {
        previewHTML += `
            <div class="resume-section">
                <div class="resume-section-title">Professional Summary</div>
                <p>${summary}</p>
            </div>
        `;
    }

    if (skills) {
        const skillArray = skills.split(',').map(s => s.trim()).filter(s => s);
        previewHTML += `
            <div class="resume-section">
                <div class="resume-section-title">Technical Skills</div>
                <div class="skill-tags">
                    ${skillArray.map(skill => `<span class="skill-tag">${skill}</span>`).join('')}
                </div>
            </div>
        `;
    }

    if (experiences.length > 0) {
        previewHTML += `<div class="resume-section"><div class="resume-section-title">Experience / Internships</div>`;
        experiences.forEach(exp => {
            previewHTML += `
                <div class="resume-item">
                    <div class="resume-item-title">${exp.title || 'Position'}</div>
                    <div class="resume-item-subtitle">${exp.company || 'Company'} | ${exp.duration || 'Duration'}</div>
                    <div class="resume-item-description">${exp.description}</div>
                </div>
            `;
        });
        previewHTML += `</div>`;
    }

    if (projects.length > 0) {
        previewHTML += `<div class="resume-section"><div class="resume-section-title">Projects</div>`;
        projects.forEach(proj => {
            previewHTML += `
                <div class="resume-item">
                    <div class="resume-item-title">${proj.name || 'Project'}</div>
                    <div class="resume-item-description">${proj.description}</div>
                </div>
            `;
        });
        previewHTML += `</div>`;
    }

    previewHTML += `
        <div class="resume-section">
            <div class="resume-section-title">Education</div>
            <div class="resume-item">
                <div class="resume-item-title">${degree}</div>
                <div class="resume-item-subtitle">${university} | Graduation: ${graduation}</div>
                ${cgpa ? `<div class="resume-item-subtitle">CGPA: ${cgpa}</div>` : ''}
            </div>
        </div>
    `;

    if (certifications) {
        previewHTML += `
            <div class="resume-section">
                <div class="resume-section-title">Certifications</div>
                <p>${certifications.split(',').map(c => `• ${c.trim()}`).join('<br>')}</p>
            </div>
        `;
    }

    resumePreview.innerHTML = previewHTML;
    previewSection.style.display = 'block';
}

function downloadResumePDF() {
    // First generate preview if not already shown
    previewResume();

    const element = document.getElementById('resumePreview');
    const fullName = document.getElementById('fullName').value || 'Resume';
    const filename = `${fullName.replace(/\s+/g, '_')}_Resume.pdf`;

    const opt = {
        margin: 10,
        filename: filename,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { orientation: 'portrait', unit: 'mm', format: 'a4' }
    };

    html2pdf().set(opt).from(element).save();
}