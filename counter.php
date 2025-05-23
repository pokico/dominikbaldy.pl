<?php
$filename = 'counter.txt';

// Create the file if it doesn't exist
if (!file_exists($filename)) {
    file_put_contents($filename, "0");
}

$fp = fopen($filename, 'c+');
if (flock($fp, LOCK_EX)) {
    // If the file is empty, default to 0
    $filesize = filesize($filename);
    $count = 0;
    if ($filesize > 0) {
        $count = (int)fread($fp, $filesize);
    }

    $count++;

    // Write updated value
    ftruncate($fp, 0);
    rewind($fp);
    fwrite($fp, $count);
    fflush($fp);
    flock($fp, LOCK_UN);
    fclose($fp);

    // Set header and output JSON
    header('Content-Type: application/json');
    echo json_encode(["count" => $count]);
} else {
    fclose($fp);
    header('Content-Type: application/json');
    echo json_encode(["count" => "error"]);
}
?>
