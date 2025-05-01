<?php
if ($_SERVER["REQUEST_METHOD"] === "POST" && isset($_POST['email'])) {
    $email = filter_var(trim($_POST['email']), FILTER_SANITIZE_EMAIL);

    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        echo "Invalid email format.";
        exit;
    }

    $file = 'emails.json';
    $emails = [];

    if (file_exists($file)) {
        $emails = json_decode(file_get_contents($file), true);
        if (!is_array($emails)) {
            $emails = [];
        }
    }

    if (in_array($email, $emails)) {
        echo "Email already subscribed.";
        exit;
    }

    $emails[] = $email;
    file_put_contents($file, json_encode($emails, JSON_PRETTY_PRINT));

    echo "Email subscribed successfully!";
} else {
    echo "Invalid request.";
}
?>
