<?php
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $stream = isset($_POST['stream']) ? strtolower(trim($_POST['stream'])) : '';
    $interests = isset($_POST['interests']) ? strtolower(trim($_POST['interests'])) : '';

    if (empty($stream) || empty($interests)) {
        echo "⚠️ Please enter both stream and interests.";
        exit;
    }

    $careerClusters = [
        'cse' => [
            'python' => [
                "🔹 Python Developer",
                "🔹 Backend Developer",
                "🔹 Data Scientist",
                "🔹 QA/Test Engineer"
            ],

            'java' => [
  "🔹 Java Developer",
  "🔹 Backend Engineer (Java)",
  "🔹 Spring Boot Developer"
],

            'web' => [
                "🔹 Frontend Developer",
                "🔹 Full Stack Web Developer",
                "🔹 UI/UX Designer"
            ],
            'app' => [
                "🔹 Android App Developer",
                "🔹 iOS Developer"
            ],
            'ml' => [
                "🔹 Machine Learning Engineer",
                "🔹 AI Researcher"
            ],
            'cyber' => [
                "🔹 Cybersecurity Analyst",
                "🔹 Ethical Hacker"
            ]
        ],
        'ece' => [
            'vlsi' => ["🔹 VLSI Design Engineer"],
            'iot' => ["🔹 IoT Developer", "🔹 Embedded Systems Engineer"],
            'robotics' => ["🔹 Robotics Engineer"],
            'signals' => ["🔹 Signal Processing Engineer"]
        ],
        'eee' => [
            'power' => ["🔹 Power Systems Engineer"],
            'automation' => ["🔹 Automation Engineer"],
            'control' => ["🔹 Control Systems Engineer"]
        ],
        'mechanical' => [
            'design' => ["🔹 CAD Designer", "🔹 Product Design Engineer"],
            'automobile' => ["🔹 Automotive Engineer"],
            'manufacturing' => ["🔹 Manufacturing Engineer"]
        ],
        'civil' => [
            'construction' => ["🔹 Site Engineer", "🔹 Project Manager"],
            'structure' => ["🔹 Structural Engineer"],
            'autocad' => [
    "🔹 CAD Designer",
    "🔹 BIM (Building Information Modeling) Engineer",
    "🔹 Mechanical Design Engineer",
    "🔹 Civil Drafting Expert",
    "🔹 Architectural Visualizer",
    "🔹 3D Modeler using AutoCAD/Revit"
],

            'survey' => ["🔹 Land Surveyor"]

        ],
        'commerce' => [
            'account' => ["🔹 Accountant", "🔹 Auditor"],
            'finance' => ["🔹 Financial Analyst", "🔹 Investment Banker"]
        ],
        'arts' => [
            'design' => ["🔹 Graphic Designer", "🔹 UI Designer"],
            'media' => ["🔹 Media Planner", "🔹 Journalist"]
        ],
        'science' => [
            'biology' => ["🔹 Biologist", "🔹 Biotech Researcher"],
            'chemistry' => ["🔹 Chemist", "🔹 Lab Technician"]
        ],
        'other' => [
            'teaching' => ["🔹 School Teacher", "🔹 Tutor"],
            'govt' => ["🔹 UPSC Aspirant", "🔹 Banking Officer"]
        ]
    ];

    $suggestions = [];

    if (array_key_exists($stream, $careerClusters)) {
        foreach ($careerClusters[$stream] as $keyword => $careers) {
            if (strpos($interests, $keyword) !== false) {
                $suggestions = array_merge($suggestions, $careers);
            }
        }
    }

    if (empty($suggestions)) {
        $suggestions = [
            "🔸 Try adding more interests like programming, design, finance, etc.",
            "🔸 Explore certifications or projects related to your stream.",
            "🔸 Network on LinkedIn with professionals in your field."
        ];
    }

    echo "✅ Based on your stream and interests, here are your career suggestions:\n\n";
    echo implode("\n", array_unique($suggestions));
} else {
    echo "❌ Invalid request method.";
}
?>
