<?php
    session_start();
    require_once('modeleConnexion.php');

    function Ctr_Connexion(){
        $courriel= $_POST['courrielco'];
        $mdp=$_POST['passwordco'];
        
        $msg = Mdl_Connexion($courriel, $mdp);
        return $msg;
    }

    // Le contrôleur
    $action = $_POST['action'];
    switch($action){
        case 'connexion': 
            echo Ctr_Connexion();
    } 
?>
