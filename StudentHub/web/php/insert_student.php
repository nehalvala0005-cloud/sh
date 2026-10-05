<?php

require_once "db.php";

if ($_SERVER["REQUEST_METHOD"] == "POST") {

    $name = $_POST["name"];
    $email = $_POST["email"];
    $mobile = $_POST["mobile"];
    $dob = $_POST["dob"];
    $gender = $_POST["gender"];
    $course = $_POST["course"];
    $address = $_POST["address"];
    $password = password_hash($_POST["password"], PASSWORD_DEFAULT);

    $sql = "INSERT INTO students
            (name, email, mobile, dob, gender, course, address, password_hash)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)";

    $stmt = $pdo->prepare($sql);

    $stmt->execute([
        $name,
        $email,
        $mobile,
        $dob,
        $gender,
        $course,
        $address,
        $password
    ]);

    echo "Student inserted successfully!";
}
?>

<form method="POST">

    Name:
    <input type="text" name="name" required><br><br>

    Email:
    <input type="email" name="email" required><br><br>

    Mobile:
    <input type="text" name="mobile" required><br><br>

    Date of Birth:
    <input type="date" name="dob" required><br><br>

    Gender:
    <input type="text" name="gender" required><br><br>

    Course:
    <input type="text" name="course" required><br><br>

    Address:
    <textarea name="address" required></textarea><br><br>

    Password:
    <input type="password" name="password" required><br><br>

    <button type="submit">Insert Student</button>

</form>