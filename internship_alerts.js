// ...existing code...
document.addEventListener('DOMContentLoaded', () => {
  const internshipsList = document.getElementById('internshipsList');
  const domainSelect = document.getElementById('domain');
  const durationSelect = document.getElementById('duration');
  const findBtn = document.getElementById('findBtn');

  if (!internshipsList || !domainSelect || !findBtn) {
    console.error('Required DOM elements missing: internshipsList / domain / findBtn');
    return;
  }

  const internships = {
    Software: [
      { company: "Microsoft", position: "Software Dev Intern", duration: "3-6", location: "Hybrid", stipend: "₹45,000/month", skills: ["C++","Java","Python"], applyLink: "https://careers.microsoft.com/students/", description: "Join dev team", resumeFormat: "software_dev_resume.html" },
      { company: "Google", position: "Full Stack Intern", duration: "6+", location: "On-site", stipend: "₹60,000/month", skills: ["JS","React","Node.js"], applyLink: "https://careers.google.com/students/", description: "Work on web apps", resumeFormat: "fullstack_resume.html" },
      { company: "Infosys", position: "Junior Dev Intern", duration: "1-3", location: "Remote", stipend: "₹25,000/month", skills: ["Java","Spring"], applyLink: "https://www.infosys.com/careers/", description: "Enterprise dev", resumeFormat: "junior_dev_resume.html" }
    ],
    Data: [
      { company: "Amazon", position: "Data Science Intern", duration: "3-6", location: "Remote", stipend: "₹35,000/month", skills: ["Python","SQL","ML"], applyLink: "https://www.amazon.jobs/student-programs", description: "Work on data problems", resumeFormat: "data_science_resume.html" },
      { company: "IBM", position: "Data Analyst Intern", duration: "1-3", location: "Hybrid", stipend: "₹20,000/month", skills: ["SQL","Excel"], applyLink: "https://www.ibm.com/careers/", description: "Analyze data", resumeFormat: "data_analyst_resume.html" },
      { company: "Databricks", position: "ML Eng Intern", duration: "6+", location: "On-site", stipend: "₹50,000/month", skills: ["TensorFlow","DL"], applyLink: "https://databricks.com/company/careers", description: "Build ML models", resumeFormat: "ml_engineer_resume.html" }
    ],
    Design: [
      { company: "Adobe", position: "UI/UX Intern", duration: "1-3", location: "Hybrid", stipend: "₹25,000/month", skills: ["Figma","UX"], applyLink: "https://www.adobe.com/careers.html", description: "Design interfaces", resumeFormat: "ui_ux_resume.html" },
      { company: "Apple", position: "Product Design Intern", duration: "3-6", location: "On-site", stipend: "₹45,000/month", skills: ["Prototyping"], applyLink: "https://www.apple.com/careers/", description: "Product design", resumeFormat: "product_design_resume.html" },
      { company: "Microsoft", position: "UX Research Intern", duration: "6+", location: "Remote", stipend: "₹40,000/month", skills: ["Research"], applyLink: "https://careers.microsoft.com/", description: "User research", resumeFormat: "ux_research_resume.html" }
    ],
    Marketing: [
      { company: "Meta", position: "Digital Marketing Intern", duration: "3-6", location: "Remote", stipend: "₹30,000/month", skills: ["SEO","Analytics"], applyLink: "https://www.metacareers.com/", description: "Campaigns", resumeFormat: "marketing_resume.html" },
      { company: "Netflix", position: "Marketing Analytics Intern", duration: "6+", location: "Hybrid", stipend: "₹45,000/month", skills: ["SQL","Analytics"], applyLink: "https://jobs.netflix.com/", description: "Analyze campaigns", resumeFormat: "marketing_analytics_resume.html" },
      { company: "Spotify", position: "Brand Marketing Intern", duration: "1-3", location: "Remote", stipend: "₹25,000/month", skills: ["Branding"], applyLink: "https://www.spotifyjobs.com/", description: "Brand campaigns", resumeFormat: "brand_marketing_resume.html" }
    ],
    Hardware: [
      { company: "Intel", position: "Hardware Design Intern", duration: "6+", location: "On-site", stipend: "₹40,000/month", skills: ["VLSI","Verilog"], applyLink: "https://www.intel.com/careers/", description: "Processor design", resumeFormat: "hardware_resume.html" },
      { company: "AMD", position: "Chip Design Intern", duration: "3-6", location: "Hybrid", stipend: "₹35,000/month", skills: ["SPICE","Verification"], applyLink: "https://careers.amd.com/", description: "Chip design", resumeFormat: "chip_design_resume.html" },
      { company: "Nvidia", position: "GPU Arch Intern", duration: "1-3", location: "On-site", stipend: "₹45,000/month", skills: ["RTL","Python"], applyLink: "https://www.nvidia.com/en-us/about-nvidia/careers/", description: "GPU architecture", resumeFormat: "gpu_arch_resume.html" }
    ]
  };

  function createCard(job) {
    const resumePath = job.resumeFormat ? `resume_formats/${job.resumeFormat}` : '';
    return `
      <div class="internship-card">
        <h3 class="company-name">${escapeHtml(job.company)}</h3>
        <div class="position">${escapeHtml(job.position)}</div>
        <div class="details">
          <p>Duration: ${escapeHtml(job.duration)}</p>
          <p>Location: ${escapeHtml(job.location)}</p>
          <p>Stipend: ${escapeHtml(job.stipend)}</p>
        </div>
        <div class="skills-required"><strong>Skills:</strong> ${escapeHtml(job.skills.join(', '))}</div>
        <p>${escapeHtml(job.description)}</p>
        <div class="action-buttons">
          <a class="apply-btn" href="${job.applyLink}" target="_blank" rel="noopener">Apply Now</a>
          ${ resumePath ? `<a class="resume-btn" href="${resumePath}" data-resume="${resumePath}" target="_blank" rel="noopener">View Resume Format</a>` : '' }
        </div>
      </div>
    `;
  }

  function escapeHtml(s) {
    return String(s)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function renderList(domain, duration) {
    if (!domain) {
      internshipsList.innerHTML = '<p>Please select a domain</p>';
      return;
    }
    internshipsList.innerHTML = '<p>Loading...</p>';
    const list = (internships[domain] || []).filter(i => !duration || i.duration === duration);
    internshipsList.innerHTML = list.length ? list.map(createCard).join('') : '<p>No internships found</p>';
  }

  if (domainSelect.value) renderList(domainSelect.value, durationSelect.value);

  findBtn.addEventListener('click', () => {
    renderList(domainSelect.value, durationSelect.value);
  });

  // popup-safe resume open handler
  internshipsList.addEventListener('click', (e) => {
    const btn = e.target.closest('.resume-btn');
    if (!btn) return;
    e.preventDefault();

    const href = btn.getAttribute('data-resume') || btn.getAttribute('href');
    if (!href) { alert('Resume file not specified.'); return; }

    // open tab synchronously to avoid popup block
    const win = window.open('', '_blank', 'noopener');
    if (!win) { alert('Popup blocked. Allow popups for this site.'); return; }

    try { win.document.write('<meta charset="utf-8"><title>Opening Resume</title><div style="font-family:Arial,Helvetica,sans-serif;padding:20px;">Opening resume…</div>'); } catch (err) {}

    fetch(href, { method: 'HEAD', cache: 'no-store' })
      .then(resp => {
        if (resp.ok) { win.location.href = href; return; }
        return fetch(href, { method: 'GET', cache: 'no-store' })
          .then(r2 => {
            if (r2.ok) win.location.href = href;
            else { try { win.document.body.innerHTML = '<p style="color:#900;padding:20px;font-family:Arial">Resume not found (HTTP ' + r2.status + ')</p>'; } catch(_) {} console.error('Resume missing:', href, r2.status); }
          });
      })
      .catch(err => { try { win.document.body.innerHTML = '<p style="color:#900;padding:20px;font-family:Arial">Unable to fetch resume. Check server.</p>'; } catch(_) {} console.error('Error fetching resume:', err); });
  });

  // debug helper: run __cg_testPath('/career_guidance/resume_formats/data_science_resume.html') in console
  window.__cg_testPath = function(path) {
    return fetch(path, { method: 'HEAD', cache: 'no-store' }).then(r => r.ok).catch(() => false);
  };
});
// ...existing code...