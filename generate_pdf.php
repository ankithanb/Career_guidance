<?php
require_once __DIR__ . '/vendor/autoload.php';

// Database connection
$conn = new mysqli("localhost", "root", "", "career_guidance"); // Use your DB name

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Fetch data (example: get all students)
$result = $conn->query("SELECT * FROM students");

$html = '<h2>Student List - Career Guidance</h2><table border="1" cellpadding="10" cellspacing="0"><tr><th>ID</th><th>Name</th><th>Email</th><th>Phone</th></tr>';

while ($row = $result->fetch_assoc()) {
    $html .= '<tr>';
    $html .= '<td>' . $row['id'] . '</td>';
    $html .= '<td>' . $row['name'] . '</td>';
    $html .= '<td>' . $row['email'] . '</td>';
    $html .= '<td>' . $row['phone'] . '</td>';
    $html .= '</tr>';
}
$html .= '</table>';

$mpdf = new \Mpdf\Mpdf();
$mpdf->WriteHTML($html);
$mpdf->Output('student_report.pdf', 'I'); // 'I' = show in browser
?>
