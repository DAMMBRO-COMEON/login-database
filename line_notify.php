<?php
// รับข้อมูลจากฟอร์ม
$name = $_POST["name"];
$email = $_POST["email"];
$message = $_POST["message"];

// Token ของ LINE Notify
$token = 'MeC4LJKKS60bxjL4S7puGfxEovKpKpENMEZhkL8ZNtp';  // ใส่ Token ที่คุณได้จาก LINE Notify

// ข้อความที่ต้องการส่ง
$lineMessage = "📩 แบบสอบถามใหม่!\n👤 ชื่อ: $name\n📧 อีเมล: $email\n📝 ข้อความ: $message";

// ส่งข้อมูลผ่าน cURL
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

// ส่งผลลัพธ์กลับ
echo "✅ ส่งข้อมูลเรียบร้อย!";
?>
