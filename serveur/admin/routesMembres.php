<?php
    // Au début de PHP: Déclarer les types dans les paramétres des fonctions
    declare (strict_types=1);

    require_once(__DIR__."/../membre/ControleurMembre.php");
    $instanceCtr = ControleurMembre::getControleurMembre();
    echo $instanceCtr->CtrM_Actions();
?>