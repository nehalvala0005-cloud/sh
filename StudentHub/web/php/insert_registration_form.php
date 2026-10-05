<!DOCTYPE html>
<html>
<head>
    <title>Event Registration</title>
</head>
<body>

<h2>Event Registration</h2>

<form action="insert_registration.php" method="POST">

    <label>Student ID:</label>
    <input type="number" name="student_id" value="1" required>

    <br><br>

    <label>Event ID:</label>
    <input type="number" name="event_id" value="1" required>

    <br><br>

    <button type="submit">Register Student</button>

</form>

</body>
</html>