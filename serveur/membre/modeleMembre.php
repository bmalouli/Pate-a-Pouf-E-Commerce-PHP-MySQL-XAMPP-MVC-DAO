<?php
require_once('../ressources/bd/connexion.inc.php');
require_once('../ressources/bd/modele.inc.php');

function chargerPhoto($nom, $prenom, $sexe)
{
    $dossierPhotos = "photos/";
    $objPhotoRecue = $_FILES['photo'];
    
    // Déterminer le préfixe de la photo en fonction du sexe
    $prefixePhoto = ($sexe == 'M') ? 'avatar_membre-m' : 'avatar_membre-f';
    
    $photo = $prefixePhoto . ".png";

    if ($objPhotoRecue['tmp_name'][0] !== "") {
        $nouveauNom = sha1($nom . $prenom . time());
        $extension = strrchr($objPhotoRecue['name'][0], ".");
        $photo = $nouveauNom . $extension;
        @move_uploaded_file($objPhotoRecue['tmp_name'][0], $dossierPhotos . $photo);
    }

    return $photo;
}


function Mdl_Ajouter($membre, $mdp)
{

    $nom = $membre->getNom();
    $prenom = $membre->getPrenom();
    $courriel = $membre->getCourriel();
    $sexe = $membre->getSexe();
    $daten = $membre->getDaten();
    $msg = "";

    try {
        // Tester si le courriel existe déjà
        $requete = "SELECT * FROM membres WHERE courriel=?";
        $instanceModele= modeleDonnees::getInstanceModele();
        $stmt = $instanceModele->executer($requete,[$courriel]);

        if ($stmt->fetch(PDO::FETCH_OBJ)) {
            $msg = "Attention, ce courriel est déjà utilisé! Inscription non complétée.";
        } else {
            
            // Le courriel n'existe pas
            $photo = chargerPhoto($nom, $prenom, $sexe);


            // Insérer dans la table membres
            $requete = "INSERT INTO membres VALUES (0,?,?,?,?,?,?)";
            $idm = $instanceModele->lastId($requete, [$nom, $prenom, $courriel, $sexe, $daten, $photo]);
    

            $requete = "INSERT INTO connexion VALUES (?,?,?,'M','A')";
            $stmt = $instanceModele->executer($requete, [$idm, $courriel, $mdp]);
            
            $msg = "Membre " . $membre->getPrenom() . ", " . $membre->getNom() . " bien enregistré.";
        }
    } catch (Exception $e) {
        // En cas d'erreur, annuler la transaction
        $msg = 'Erreur : ' . $e->getMessage();
    } finally {
        header("Location: ../../index.php?msg=$msg");
        exit;
    }
}
?>
