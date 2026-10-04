<?php
include 'connect.php';

$goal_title = $_POST['goal_title'];
$goal = $_POST['goal'];
$deadline = $_POST['deadline'];

$sql = "INSERT INTO goals (goal_title, goal, deadline) 
        VALUES ('$goal_title', '$goal', '$deadline')";

if ($conn->query($sql) === TRUE) {
    echo "Goal added successfully!";
} else {
    echo "Error: " . $conn->error;
}

$conn->close();
?>
