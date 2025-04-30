<?php
header('Content-Type: application/json');

// Get the raw POST data
$json = file_get_contents('php://input');
$data = json_decode($json, true);

if ($data && isset($data['products'])) {
    // Ensure the products array doesn't exceed 150 items
    if (count($data['products']) > 150) {
        http_response_code(400);
        echo json_encode(['error' => 'Maximum number of products (150) exceeded']);
        exit;
    }

    // Optimize the JSON file size
    $optimizedData = [
        'products' => array_map(function($product) {
            return [
                'name' => $product['name'],
                'description' => $product['description'],
                'price' => $product['price'],
                'discount' => $product['discount'],
                'image' => $product['image']
            ];
        }, $data['products'])
    ];

    // Save the products to the JSON file
    if (file_put_contents('products.json', json_encode($optimizedData, JSON_PRETTY_PRINT))) {
        echo json_encode(['success' => true]);
    } else {
        http_response_code(500);
        echo json_encode(['error' => 'Failed to save products']);
    }
} else {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid data']);
}
?> 