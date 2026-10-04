<?php

// Minimal robust API for local roadmap generation (no external API keys)

// Headers
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// Logging & error settings (do not display errors to client)
error_reporting(E_ALL);
ini_set('display_errors', '0');
ini_set('log_errors', '1');
ini_set('error_log', 'c:/wamp64/logs/roadmap_api_errors.log');

// Reply to preflight
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// Simple GET check so you can verify endpoint is reachable
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    echo json_encode(['ok' => true, 'message' => 'roadmap_api reachable']);
    exit;
}

// Read input (support form-urlencoded and JSON)
$rawContentType = $_SERVER['CONTENT_TYPE'] ?? '';
$goal = '';

if (stripos($rawContentType, 'application/json') !== false) {
    $body = file_get_contents('php://input');
    $json = json_decode($body, true);
    if (is_array($json) && isset($json['goal'])) {
        $goal = trim(strip_tags($json['goal']));
    }
} else {
    // form-urlencoded or multipart
    $goal = isset($_POST['goal']) ? trim(strip_tags($_POST['goal'])) : '';
}

// Validate
if ($goal === '') {
    http_response_code(400);
    echo json_encode(['error' => 'No goal provided. Send POST with "goal" field.']);
    exit;
}

// Roadmap generator (deterministic, local)
function buildRoadmapFor(string $goal): string {
    $g = strtolower($goal);

    $section = function(string $title, array $lines): string {
        $out = strtoupper($title) . "\n";
        foreach ($lines as $line) {
            $out .= "- $line\n";
        }
        $out .= "\n";
        return $out;
    };

    $overview = "Roadmap for: $goal\n\n";

    // Software / Developer
    if (preg_match('/\b(software|developer|java|python|c\+\+|c#|javascript|frontend|backend|full[\s-]?stack|web)\b/i', $g)) {
        $edu = [
            "Learn core CS fundamentals: data structures, algorithms, OOP",
            "Take online courses for your primary language and web basics"
        ];
        $skills = [
            "Language proficiency (e.g., Java, Python, JavaScript)",
            "Version control (Git), testing and debugging",
            "Problem-solving and system design basics"
        ];
        $tech = [
            "Frameworks (React/Angular/Vue or Spring/Node depending on focus)",
            "Databases: SQL and one NoSQL option",
            "Containers: Docker; basics of CI/CD"
        ];
        $exp = [
            "Build 3–5 portfolio projects with README and tests",
            "Contribute to open-source or do internships",
            "Deploy at least one full-stack project"
        ];
        $cert = [
            "Optional: platform or language certificates (Coursera, Udemy, vendor certs)"
        ];
        $timeline = [
            "0-3 months: fundamentals and 1 small project",
            "3-9 months: intermediate projects, GitHub portfolio",
            "9-24 months: internships / entry-level role and specialization"
        ];
        $milestones = [
            "Complete 1 complete project with tests (1 month)",
            "Publish portfolio site and GitHub (2 months)",
            "Apply and secure internship/entry-level role (6-12 months)"
        ];

        return $overview
            . $section('Education & Learning Path', $edu)
            . $section('Essential Skills', $skills)
            . $section('Technical Stack', $tech)
            . $section('Experience & Projects', $exp)
            . $section('Certifications (optional)', $cert)
            . $section('Estimated Timeline', $timeline)
            . $section('Milestones', $milestones);
    }

    // Data / ML
    if (preg_match('/\b(data scientist|data analyst|machine learning|ml|data)\b/i', $g)) {
        $edu = [
            "Basics of statistics and linear algebra",
            "Python/R programming and data manipulation (pandas)"
        ];
        $skills = [
            "Data cleaning, exploratory data analysis and visualization",
            "SQL and database querying"
        ];
        $tech = [
            "scikit-learn, TensorFlow or PyTorch",
            "Model evaluation, feature engineering, pipelines"
        ];
        $exp = [
            "Kaggle-style projects and end-to-end analysis notebooks",
            "Internships or analytics projects"
        ];
        $timeline = [
            "0-3 months: Python and SQL basics",
            "3-9 months: ML fundamentals and small projects",
            "9-18 months: applied projects and role transition"
        ];

        return $overview
            . $section('Education & Learning Path', $edu)
            . $section('Essential Skills', $skills)
            . $section('Tools & Libraries', $tech)
            . $section('Experience', $exp)
            . $section('Estimated Timeline', $timeline)
            . $section('Milestones', ["Complete 3 data projects", "Publish portfolio notebooks"]);
    }

    // Design / UX
    if (preg_match('/\b(design|ui|ux|graphic|ux designer|ui designer)\b/i', $g)) {
        $edu = [
            "Design fundamentals: color theory, typography, layout",
            "Learn tools: Figma, Sketch, Adobe XD"
        ];
        $skills = [
            "Wireframing, prototyping, and user testing",
            "User research and creating case studies"
        ];
        $exp = [
            "Redesign a public site/app as a case study",
            "Freelance or internship work to build portfolio"
        ];
        $timeline = [
            "0-2 months: basics and tools",
            "2-8 months: portfolio projects",
            "8-18 months: internships/first job"
        ];

        return $overview
            . $section('Education & Learning Path', $edu)
            . $section('Essential Skills', $skills)
            . $section('Experience & Portfolio', $exp)
            . $section('Estimated Timeline', $timeline);
    }

    // Teaching / Education
    if (preg_match('/\b(teacher|teaching|tutor|education)\b/i', $g)) {
        $edu = [
            "Gain subject-matter understanding and relevant degrees/certificates",
            "Learn pedagogy and classroom management techniques"
        ];
        $skills = [
            "Lesson planning, assessment design, communication"
        ];
        $exp = [
            "Volunteer teaching, tutoring, or assistant roles",
            "Practice lessons and feedback cycles"
        ];
        $timeline = [
            "0-6 months: training and practice",
            "6-18 months: assistant/intern roles and first teaching job"
        ];

        return $overview
            . $section('Education & Learning Path', $edu)
            . $section('Essential Skills', $skills)
            . $section('Experience', $exp)
            . $section('Estimated Timeline', $timeline);
    }

    // Medical / Health
    if (preg_match('/\b(nurse|doctor|medical|health|medical practitioner)\b/i', $g)) {
        $edu = [
            "Formal medical or nursing education and licensing as required in your country"
        ];
        $skills = [
            "Clinical skills, patient communication, basic emergency response"
        ];
        $exp = [
            "Clinical rotations, supervised practice, internships"
        ];
        $timeline = [
            "Varies by country: typically 2-7+ years including education and licensing"
        ];

        return $overview
            . $section('Education & Licensing', $edu)
            . $section('Essential Skills', $skills)
            . $section('Clinical Experience', $exp)
            . $section('Estimated Timeline', $timeline);
    }

    // Generic fallback
    $edu = ["Research standard education paths for the role", "Take relevant online courses"];
    $skills = ["List core hard skills and supporting soft skills (communication, time management)"];
    $exp = ["Build small projects, volunteer or find mentorship", "Seek internships or entry-level roles"];
    $timeline = ["0-3 months: basics", "3-12 months: intermediate", "1-3 years: gain real-world experience"];
    $milestones = ["Define 3 short-term goals", "Complete 2 practical projects", "Apply for internships/roles"];

    return $overview
        . $section('Education & Learning Path', $edu)
        . $section('Essential Skills', $skills)
        . $section('Experience', $exp)
        . $section('Estimated Timeline', $timeline)
        . $section('Milestones', $milestones);
}

// Generate and return
$roadmapText = buildRoadmapFor($goal);

echo json_encode([
    'success' => true,
    'roadmap' => $roadmapText
]);

// end of file (no closing PHP tag)