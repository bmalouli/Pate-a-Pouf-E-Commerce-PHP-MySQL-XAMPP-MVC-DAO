<?php
    $pos = strpos($_SERVER['PHP_SELF'], "index.php");
    if ($pos === false){
      echo $ref="admin.php";
    }else{
      echo $ref="index.php";
    }
?>
