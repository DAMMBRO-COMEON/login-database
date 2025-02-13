<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $token = "LTjxT4JkNnGjFQ2wzPVNUdxEeTFf0zDzbaby3DSNDMB"; // ✅ Token ของคุณ
    $name = $_POST["name"];
    $email = $_POST["email"];
    $message = $_POST["message"];

    $lineMessage = "📩 แบบสอบถามใหม่!\n👤 ชื่อ: $name\n📧 อีเมล: $email\n📝 ข้อความ: $message";

    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, "https://notify-api.line.me/api/notify");
    curl_setopt($ch, CURLOPT_POST, 1);
    curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query(["message" => $lineMessage]));
    curl_setopt($ch, CURLOPT_HTTPHEADER, [
        "Authorization: Bearer " . $token,
        "Content-Type: application/x-www-form-urlencoded"
    ]);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

    $response = curl_exec($ch);
    curl_close($ch);

    echo "✅ ส่งข้อมูลเรียบร้อย!";
}
?>
