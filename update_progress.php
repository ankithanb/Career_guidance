<?php
include 'connect.php';
$id = $_GET['id'];
$progress = $_GET['progress'];
$conn->query("UPDATE goals SET progress = $progress WHERE id = $id");
$conn->close();
?>
