<?php

// Konfigurasi panel & API
$panel_url = 'DOMAIN';
$api_keys = ['PLTA', 'PLTC']; // Ganti ke API key bener
$egg_id = 15; // Node.js only
$docker_image = 'ghcr.io/parkervcp/yolks:nodejs_18';
$startup = 'npm start';
$environment = [
    "INST" => "npm",
    "USER_UPLOAD" => "0",
    "AUTO_UPDATE" => "0",
    "CMD_RUN" => "npm start"
];

// Ambil data POST
$emailPENERIMA = htmlspecialchars($_POST['emailPENERIMA']);
$username = htmlspecialchars($_POST['username']);
$email = htmlspecialchars($_POST['email']);
$password = $_POST['password'] ?: bin2hex(random_bytes(6)); // Auto generate kalau kosong
$location = intval($_POST['location']);
$ram = intval($_POST['ram']);
$disk = 1000;
$cpu = 100;

// Coba semua API key sampai berhasil
foreach ($api_keys as $api_key) {
    $user_data = [
        "username" => $username,
        "email" => $email,
        "first_name" => $username,
        "last_name" => "User",
        "password" => $password
    ];

    $ch = curl_init("$panel_url/api/application/users");
    curl_setopt_array($ch, [
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_POST => true,
        CURLOPT_HTTPHEADER => [
            "Authorization: Bearer $api_key",
            "Content-Type: application/json",
            "Accept: Application/vnd.pterodactyl.v1+json"
        ],
        CURLOPT_POSTFIELDS => json_encode($user_data)
    ]);

    $response = curl_exec($ch);
    $user = json_decode($response, true);
    curl_close($ch);

    if (isset($user['attributes']['id'])) {
        $user_id = $user['attributes']['id'];
        break;
    }
}

if (!isset($user_id)) {
    die("❌ Gagal buat user!<br><pre>$response</pre>");
}

// Buat server
$server_data = [
    "name" => "$username-Node",
    "description" => "Node.js Server",
    "user" => $user_id,
    "egg" => $egg_id,
    "docker_image" => $docker_image,
    "startup" => $startup,
    "environment" => $environment,
    "limits" => [
        "memory" => $ram,
        "swap" => 0,
        "disk" => $disk,
        "io" => 500,
        "cpu" => $cpu
    ],
    "feature_limits" => [
        "databases" => 2,
        "backups" => 2,
        "allocations" => 1
    ],
    "deploy" => [
        "locations" => [$location],
        "dedicated_ip" => false,
        "port_range" => []
    ],
    "start_on_completion" => true
];

$ch = curl_init("$panel_url/api/application/servers");
curl_setopt_array($ch, [
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_POST => true,
    CURLOPT_HTTPHEADER => [
        "Authorization: Bearer $api_key",
        "Content-Type: application/json",
        "Accept: Application/vnd.pterodactyl.v1+json"
    ],
    CURLOPT_POSTFIELDS => json_encode($server_data)
]);

$server_response = curl_exec($ch);
curl_close($ch);

$resp = json_decode($server_response, true);
if (isset($resp['attributes']['identifier'])) {
    // Kirim email
    $subject = "🛰️ Data Akun + Server Pterodactyl ($username)";
    $message = "✅ Akun dan server berhasil dibuat!\n\n"
             . "🔹 Panel: $panel_url\n"
             . "🔹 Email: $email\n"
             . "🔹 Username: $username\n"
             . "🔹 Password: $password\n"
             . "🔹 Server ID: " . $resp['attributes']['identifier'] . "\n"
             . "🔹 Lokasi: $location\n"
             . "🔹 RAM: {$ram}MB\n";

    $headers = "From: noreply@byzatzd.com\r\n";

    mail($emailPENERIMA, $subject, $message, $headers);

    echo "<h2>✅ Server berhasil dibuat!</h2>";
    echo "<pre>Server ID: " . $resp['attributes']['identifier'] . "</pre>";
    echo "<a href='$panel_url'>Login ke Panel</a>";
} else {
    echo "<h2>❌ Gagal membuat server</h2>";
    echo "<pre>$server_response</pre>";
}
?>