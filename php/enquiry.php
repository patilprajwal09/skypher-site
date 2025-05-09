<?php
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    // Sanitize and validate inputs
    $project = isset($_POST['project']) ? htmlspecialchars(trim($_POST['project'])) : '';
    $name = isset($_POST['name']) ? htmlspecialchars(trim($_POST['name'])) : '';
    $email = isset($_POST['email']) ? filter_var(trim($_POST['email']), FILTER_SANITIZE_EMAIL) : '';
    $mobile = isset($_POST['mobile']) ? htmlspecialchars(trim($_POST['mobile'])) : '';
    $address = isset($_POST['address']) ? htmlspecialchars(trim($_POST['address'])) : '';

    if (!$project || !$name || !$email || !$mobile) {
        echo "Please fill in all required fields.";
        exit;
    }
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        echo "Invalid email format.";
        exit;
    }
    if (!preg_match('/^[0-9]{10,15}$/', $mobile)) {
        echo "Invalid mobile number.";
        exit;
    }

    // Send to Google Apps Script Web App
    $data = [
        'project' => $project,
        'name' => $name,
        'email' => $email,
        'mobile' => $mobile,
        'address' => $address
    ];
    $ch = curl_init('https://script.google.com/macros/s/AKfycbznpyp9_tejp3wEJj2WZGT2Gq6bp-q3UW9lteDg5Fio75MGZT34YK-Na9JpGyZZJGyysg/exec'); // <-- Replace with your actual URL
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_HTTPHEADER, ['Content-Type: application/json']);
    curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));
    curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true); // Follow redirects
    $response = curl_exec($ch);
    curl_close($ch);
    echo $response ? $response : "Failed to submit to Google Sheets.";
} else {
    echo "Invalid request.";
}
?> 
