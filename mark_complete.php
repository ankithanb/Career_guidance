<?php
include 'connect.php';

if (isset($_POST['id'])) {
    $id = (int)$_POST['id'];

    $sql = "UPDATE goals SET progress = 100 WHERE id = $id";

    if ($conn->query($sql) === TRUE) {
        echo "Goal marked as complete!";
    } else {
        echo "Error updating goal: " . $conn->error;
    }
} else {
    echo "Goal ID not provided.";
}

$conn->close();
?>
