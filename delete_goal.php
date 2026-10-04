<?php
include 'connect.php';
$id = $_GET['id'];
$conn->query("DELETE FROM goals WHERE id = $id");
$conn->close();
?>
