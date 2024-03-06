<?php
    require_once('includes/Membre.inc.php');
    require_once('modeleMembre.php');


    if (!isset($err)){
        Ctr_Ajouter();
    }

    function Ctr_Ajouter(){
        $nom = $_POST['nom'];
        $prenom=$_POST['prenom'] ;
        $courriel= $_POST['courriel'];
        $sexe=$_POST['sexe'];
        $daten=$_POST['daten'];
        
        $membre = new Membre(0,$nom,$prenom,$courriel,$sexe,$daten,"");
        Mdl_Ajouter($membre,$_POST['password']);
        
    }
    
?>