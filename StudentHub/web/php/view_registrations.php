<?php

require_once "db.php";

$sql = "SELECT r.registration_id, s.name, e.title,
               r.registration_date, r.status
        FROM registrations r
        JOIN students s ON r.student_id = s.student_id
        JOIN events e ON r.event_id = e.event_id
        ORDER BY r.registration_id DESC";

$stmt = $pdo->query($sql);
$registrations = $stmt->fetchAll(PDO::FETCH_ASSOC);

?>

<!DOCTYPE html>
<html>
<head>
    <title>StudentHub Registrations</title>
</head>
<body>

<h2>StudentHub Event Registrations</h2>

<table border="1" cellpadding="10">
    <tr>
        <th>Registration ID</th>
        <th>Student Name</th>
        <th>Event</th>
        <th>Registration Date</th>
        <th>Status</th>
    </tr>

    <?php foreach ($registrations as $row) { ?>

    <tr>
        <td><?php echo $row["registration_id"]; ?></td>
        <td><?php echo $row["name"]; ?></td>
        <td><?php echo $row["title"]; ?></td>
        <td><?php echo $row["registration_date"]; ?></td>
        <td><?php echo $row["status"]; ?></td>
    </tr>

    <?php } ?>

</table>

</body>
</html>