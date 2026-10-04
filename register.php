<?php
include 'connect.php';

$name = $_POST['name'];
$email = $_POST['email'];
$password = $_POST['password'];
$phone = $_POST['phone'];

// You can hash the password if needed
// $hashedPassword = password_hash($password, PASSWORD_DEFAULT);

$sql = "INSERT INTO students (name, email, password, phone) 
        VALUES ('$name', '$email', '$password', '$phone')";

if ($conn->query($sql) === TRUE) {
    header("Location: register.html?status=success");
    exit();
} else {
    header("Location: register.html?status=error");
    exit();
}

$conn->close();
?>
