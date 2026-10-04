<?php
include 'connect.php';
$id = $_GET['id'];
$conn->query("UPDATE goals SET is_complete = 1 WHERE id = $id");
$conn->close();
?>
