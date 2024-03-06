<?php
    require_once(__DIR__.'/../ressources/bd/connexion.inc.php');
    require_once(__DIR__.'/../ressources/bd/modele.inc.php');

    function Mdl_Connexion($courriel, $mdp){
        $msg = "";
        try{
            // Tester si le courriel existe déjà
            $instanceModele= modeleDonnees::getInstanceModele();
            $requete = "SELECT * FROM connexion WHERE courriel=? AND mdp=?";
            $stmt = $instanceModele->executer($requete,[$courriel, $mdp]);

            if ($ligne=$stmt->fetch(PDO::FETCH_OBJ)) { // OK, courriel et mot de passe existent
                if($ligne->statut == 'A'){ 
                    $requete = "SELECT * FROM membres WHERE courriel=?";
                    $stmt=$instanceModele->executer($requete,[$courriel]);
                    $ligne2 = $stmt->fetch(PDO::FETCH_OBJ);
                    $_SESSION['prenom'] = $ligne2->prenom;
                    $_SESSION['nom'] = $ligne2->nom;
                    $_SESSION['id'] = $ligne2->idm;
                    $_SESSION['photo'] = "../membre/photos/".$ligne2->photo;
                    //Si c'est un membre
                    if($ligne->role == 'M'){
                        $_SESSION['role'] = 'M';
                        header('Location: ../membre/membre.php');
                        exit();
                    } else { // Dans ce cas c'est un admin
                        $_SESSION['role'] = 'A';
                        header('Location: ../admin/admin.php');
                        exit();
                    }
                } else {// Membre inactif
                    $msg = "SVP contactez l'administrateur";
                } 
            } else {
                $msg = "Mot de passe ou nom d'utilisateur incorrect";
            }
        } catch(Exception $e) {
            $msg = 'Erreur : ' . $e->getMessage();
            //$msg = 'Erreur : '.$e->getMessage().'<br>';
        }finally{
            header("Location: ../../index.php?msg=$msg");
            return $msg;
        }
    }
?>