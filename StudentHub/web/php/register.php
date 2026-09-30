<?php

header("Content-Type: application/json");

if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    echo json_encode([
        "success" => false,
        "message" => "Invalid request method."
    ]);
    exit;
}

$name = trim($_POST["name"] ?? "");
$email = trim($_POST["email"] ?? "");
$mobile = trim($_POST["mobile"] ?? "");
$password = $_POST["password"] ?? "";
$confirmPassword = $_POST["confirmPassword"] ?? "";
$dob = trim($_POST["dob"] ?? "");
$gender = trim($_POST["gender"] ?? "");
$course = trim($_POST["course"] ?? "");
$address = trim($_POST["address"] ?? "");
$terms = isset($_POST["terms"]);

if ($name === "" || $email === "" || $mobile === "" || $password === "" || $confirmPassword === "" || $dob === "" || $gender === "" || $course === "") {
    echo json_encode([
        "success" => false,
        "message" => "Please fill all required fields."
    ]);
    exit;
}

if (!preg_match("/^[A-Za-z ]+$/", $name)) {
    echo json_encode([
        "success" => false,
        "message" => "Name should contain only letters."
    ]);
    exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    echo json_encode([
        "success" => false,
        "message" => "Please enter a valid email address."
    ]);
    exit;
}

if (!preg_match("/^[0-9]{10}$/", $mobile)) {
    echo json_encode([
        "success" => false,
        "message" => "Mobile number must contain exactly 10 digits."
    ]);
    exit;
}

if (strlen($password) < 8 || !preg_match("/[A-Z]/", $password) || !preg_match("/[a-z]/", $password) || !preg_match("/[0-9]/", $password)) {
    echo json_encode([
        "success" => false,
        "message" => "Password must contain at least 8 characters, uppercase, lowercase and a number."
    ]);
    exit;
}

if ($password !== $confirmPassword) {
    echo json_encode([
        "success" => false,
        "message" => "Passwords do not match."
    ]);
    exit;
}

if (!$terms) {
    echo json_encode([
        "success" => false,
        "message" => "You must accept the Terms & Conditions."
    ]);
    exit;
}

$name = htmlspecialchars($name, ENT_QUOTES, "UTF-8");
$email = filter_var($email, FILTER_SANITIZE_EMAIL);
$mobile = htmlspecialchars($mobile, ENT_QUOTES, "UTF-8");
$dob = htmlspecialchars($dob, ENT_QUOTES, "UTF-8");
$gender = htmlspecialchars($gender, ENT_QUOTES, "UTF-8");
$course = htmlspecialchars($course, ENT_QUOTES, "UTF-8");
$address = htmlspecialchars($address, ENT_QUOTES, "UTF-8");

$dataFolder = __DIR__ . "/data";

if (!is_dir($dataFolder)) {
    mkdir($dataFolder, 0777, true);
}

$file = $dataFolder . "/students.csv";

$isNewFile = !file_exists($file);

$handle = fopen($file, "a");

if ($handle === false) {
    echo json_encode([
        "success" => false,
        "message" => "Unable to save registration data."
    ]);
    exit;
}

if ($isNewFile) {
    fputcsv($handle, [
        "Name",
        "Email",
        "Mobile",
        "Date of Birth",
        "Gender",
        "Course",
        "Address"
    ]);
}

fputcsv($handle, [
    $name,
    $email,
    $mobile,
    $dob,
    $gender,
    $course,
    $address
]);

fclose($handle);

echo json_encode([
    "success" => true,
    "message" => "Registration completed successfully."
]);

?>