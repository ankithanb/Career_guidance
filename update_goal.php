<?php
$servername = "localhost";
$username = "root";
$password = "";
$database = "career_guidance";

$conn = new mysqli($servername, $username, $password, $database);
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$id = $_POST['id'];

$sql = "UPDATE goals SET status='completed' WHERE id=$id";
if ($conn->query($sql) === TRUE) {
    echo "Goal marked as completed!";
} else {
    echo "Error updating goal: " . $conn->error;
}

$conn->close();
?>
