<?php
include 'connect.php';

$email = $_POST['email'];
$password = $_POST['password'];

$sql = "SELECT * FROM students WHERE email='$email' AND password='$password'";
$result = $conn->query($sql);

if ($result->num_rows === 1) {
    // You can start session if you want to track logged-in user
    header("Location: dashboard.html");
    exit();
} else {
    echo "Invalid login credentials.";
}
$conn->close();
?>
