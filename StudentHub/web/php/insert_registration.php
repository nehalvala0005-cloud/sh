<?php

require_once "db.php";

$student_id = $_POST["student_id"] ?? "";
$event_id = $_POST["event_id"] ?? "";

if ($student_id == "" || $event_id == "") {
    die("Student ID and Event ID are required.");
}

$sql = "INSERT INTO registrations
        (student_id, event_id, registration_date, status)
        VALUES (:student_id, :event_id, CURDATE(), :status)";

$stmt = $pdo->prepare($sql);

$stmt->execute([
    ":student_id" => $student_id,
    ":event_id" => $event_id,
    ":status" => "Pending"
]);

echo "Registration successful!";
?>