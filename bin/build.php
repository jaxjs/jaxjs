#!/usr/bin/php
<?php
if (!isset($argv[1])) {
    echo PHP_EOL . 'You must pass in a JSON build file.' . PHP_EOL . PHP_EOL;
    exit();
} else if (!file_exists($argv[1])) {
    echo PHP_EOL . 'The build file does not exist.' . PHP_EOL . PHP_EOL;
    exit();
}

$build     = json_decode(file_get_contents($argv[1]));
$buildDate = date('M j, Y H:i:s');
$buildFile = __DIR__ . '/../build/jax.' . $build->version . (isset($build->name) ? '.' . $build->name : null) . '.js';

// Check the build.json file
if (!isset($build->version)) {
    echo PHP_EOL . 'The "version" property was not set.' . PHP_EOL . PHP_EOL;
    exit();
} else if (!isset($build->include)) {
    echo PHP_EOL . 'The "include" property was not set.' . PHP_EOL . PHP_EOL;
    exit();
} else if (!is_array($build->include)) {
    echo PHP_EOL . 'The "include" property must be an array.' . PHP_EOL . PHP_EOL;
    exit();
}

echo PHP_EOL;

// Build the file
foreach ($build->include as $i => $include) {
    if (file_exists(__DIR__ . '/../src/' . $include)) {
        if (is_dir(__DIR__ . '/../src/' . $include)) {
            $contents = null;
            $dir      = opendir(__DIR__ . '/../src/' . $include);
            while (false !== ($file = readdir($dir))) {
                if ($file == '.' || $file == '..') {
                    continue;
                }
                if (is_file(__DIR__ . '/../src/' . $include . '/' . $file)) {
                    echo 'Adding: ' . $include . '/' . $file . PHP_EOL;
                    $contents .= file_get_contents(__DIR__ . '/../src/' . $include . '/' . $file) . PHP_EOL;
                }
            }
            closedir($dir);
        } else {
            echo 'Adding: ' . $include . PHP_EOL;
            $contents = file_get_contents(__DIR__ . '/../src/' . $include) . PHP_EOL;
        }

        $contents = str_replace(['[{version}]', '[{build}]'], [$build->version, $buildDate], $contents);

        if ($i == 0) {
            file_put_contents($buildFile, $contents);
        } else {
            file_put_contents($buildFile, $contents, FILE_APPEND);
        }
    }
}

echo PHP_EOL . 'Build Complete!' . PHP_EOL;
