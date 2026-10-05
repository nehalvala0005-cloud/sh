<?php

require_once "db.php";

$stmt = $pdo->prepare("SELECT student_id, name, email, mobile, course FROM students");
$stmt->execute();

$students = $stmt->fetchAll(PDO::FETCH_ASSOC);

?>

<h2>Student Records</h2>

<table border="1" cellpadding="10">
    <tr>
        <th>ID</th>
        <th>Name</th>
        <th>Email</th>
        <th>Mobile</th>
        <th>Course</th>
    </tr>

    <?php foreach ($students as $student): ?>

    <tr>
        <td><?= htmlspecialchars($student["student_id"]) ?></td>
        <td><?= htmlspecialchars($student["name"]) ?></td>
        <td><?= htmlspecialchars($student["email"]) ?></td>
        <td><?= htmlspecialchars($student["mobile"]) ?></td>
        <td><?= htmlspecialchars($student["course"]) ?></td>
    </tr>

    <?php endforeach; ?>

</table>