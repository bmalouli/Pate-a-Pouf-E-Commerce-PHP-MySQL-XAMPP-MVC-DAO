<?php
    $pos = strpos($_SERVER['PHP_SELF'], "index.php");
    if ($pos === false){
      echo $source="../../client/images/general/plat.png";
    }else{
      echo $source="client/images/general/plat.png";
    }
?>
