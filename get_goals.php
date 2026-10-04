<?php
include 'connect.php';

$sql = "SELECT * FROM goals";
$result = $conn->query($sql);

$goals = [];

if ($result && $result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $goals[] = [
            'id' => $row['id'],
            'goal_title' => $row['goal_title'],
            'goal' => $row['goal'],
            'deadline' => $row['deadline'],
            'progress' => $row['progress'],
            'is_complete' => isset($row['is_complete']) ? $row['is_complete'] : 0
        ];
    }
}

header('Content-Type: application/json');
echo json_encode($goals);
$conn->close();
?>
