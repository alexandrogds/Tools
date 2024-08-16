<?php
    exec("chmod +x $scriptFilename");

    // Executa o script bash
    $output = shell_exec("./$scriptFilename 2>&1");