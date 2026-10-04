<?php
require_once __DIR__ . '/vendor/autoload.php'; // Load mPDF

// DB connection
$conn = new mysqli("localhost", "root", "", "career_guidance");

if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}

// Get student ID from URL
$id = $_GET['id'] ?? 0;

// Fetch student data
$sql = "SELECT * FROM students WHERE id = $id";
$result = $conn->query($sql);
if ($result->num_rows == 0) {
    die("Student not found.");
}
$row = $result->fetch_assoc();

// Suggest careers based on skills
$skills = strtolower($row['skills']);
$career = "General IT Field";

if (strpos($skills, 'java') !== false) $career = "Java Developer";
else if (strpos($skills, 'python') !== false) $career = "Data Scientist";
else if (strpos($skills, 'web') !== false) $career = "Frontend Developer";
else if (strpos($skills, 'ml') !== false || strpos($skills, 'ai') !== false) $career = "Machine Learning Engineer";
else if (strpos($skills, 'sql') !== false) $career = "Database Administrator";

$mpdf = new \Mpdf\Mpdf();
$html = "
<h2 style='color:#0066cc;'>Career Report for {$row['name']}</h2>
<p><strong>Email:</strong> {$row['email']}</p>
<p><strong>Skills:</strong> {$row['skills']}</p>
<hr>
<h3 style='color:#009933;'>Suggested Career Path:</h3>
<p style='font-size:16px;'>$career</p>
";

$mpdf->WriteHTML($html);
$mpdf->Output("Career_{$row['name']}.pdf", "I"); // Show in browser
?>
