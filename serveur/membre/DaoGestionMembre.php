<?php
// Au début de PHP: Déclarer les types dans les paramétres des fonctions
declare (strict_types=1);

require_once(__DIR__.'/../ressources/bd/connexion.inc.php');
require_once(__DIR__.'/../ressources/bd/modele.inc.php');

class DaoGestionMembre{
    static private $modelMembre = null;
    
    private $reponse=array();
    private $connexion = null;
	
    private function __construct(){
        
    }
    
// Retourne le singleton du modèle 
	static function  getDaoMembre():DaoGestionMembre {
		if(self::$modelMembre == null){
			self::$modelMembre = new DaoGestionMembre();  
		}
		return self::$modelMembre;
	}

    function MdlM_modifierStatut($idm){
        $requete = "SELECT * FROM connexion WHERE idm=?"; 
        try{
            $instanceModele= modeleDonnees::getInstanceModele();
            $stmt = $instanceModele->executer($requete,[$idm]);
            if ($ligne=$stmt->fetch(PDO::FETCH_OBJ)){
                if($ligne->statut == "A"){
                    $statut = "I";
                } else{ 
                    $statut = "A";
                }
                $requete = "UPDATE connexion SET statut =? WHERE idm=?"; 
                $stmt=$instanceModele->executer($requete,[$statut, $idm]);
                $this->reponse['OK'] = true;
                $this->reponse['msg'] = "Opération réussie";
                
            }
        } catch (Exception $e){ 
            $this->reponse['OK'] = false;
            $this->reponse['msg'] = "Problème pour obtenir les données des membres";
            //echo 'ERREUR: '.$e;
        }finally {
          //unset($connexion);
          return json_encode($this->reponse);
    } 
    }
	
    function MdlM_getAll() {

        $requete="SELECT m.idm, m.nom, m.prenom, m.datenaissance, m.courriel, m.sexe, m.photo, c.statut FROM membres m INNER JOIN connexion c ON m.idm = c.idm";
        try{
            $instanceModele= modeleDonnees::getInstanceModele();
            $stmt = $instanceModele->executer($requete,[]);
            $this->reponse['OK'] = true;
            $this->reponse['msg'] = "Opération réussie";
            $this->reponse['listeMembres'] = array();
            while($ligne=$stmt->fetch(PDO::FETCH_OBJ)){
                $this->reponse['listeMembres'][] = $ligne;
            }
        } catch (Exception $e){ 
            $this->reponse['OK'] = false;
            $this->reponse['msg'] = "Problème pour obtenir les données des membres";
            //echo 'ERREUR: '.$e;
        }finally {
          //unset($connexion);
          return json_encode($this->reponse);
    } 

    
    }

    function MdlM_chargerMembre($idMembre) {
        // Préparez la requête SQL pour récupérer les informations du membre spécifique
        $requete = "SELECT * FROM membres m INNER JOIN connexion c ON m.idm = c.idm WHERE m.idm = ?";
    
        try {
            // Obtenez l'instance du modèle de données
            $instanceModele = modeleDonnees::getInstanceModele();
            // Exécutez la requête avec l'ID du membre
            $stmt = $instanceModele->executer($requete, [$idMembre]);
    
            // Si les données sont récupérées avec succès
            if ($ligne = $stmt->fetch(PDO::FETCH_OBJ)) {
                // Stockez les données du membre dans le tableau de réponse
                $this->reponse['OK'] = true;
                $this->reponse['msg'] = "Opération réussie";
                $this->reponse['donneesMembre'] = $ligne; // Contiendra les informations du membre
            } else {
                // Si aucun membre n'est trouvé avec cet ID
                $this->reponse['OK'] = false;
                $this->reponse['msg'] = "Aucun membre trouvé avec l'ID spécifié";
            }
        } catch (Exception $e) {
            // Gestion des erreurs
            $this->reponse['OK'] = false;
            $this->reponse['msg'] = "Problème pour obtenir les données du membre: " . $e->getMessage();
        } finally {
            // Retournez la réponse sous forme de JSON
            return json_encode($this->reponse);
        }
    }


    
    function MdlM_mettreAJourMembre($idm, $nom, $prenom, $courriel, $sexe, $datenaissance, $photo) {
        $reponse = array();
    
        try {
            // Récupération de la photo actuelle du membre
            $photoActuelle = DaoGestionMembre::getPhotoMembre($idm);
            $photoAUpload = null;
    
            // Vérifie si une nouvelle photo a été uploadée
            if (isset($_FILES['photo']) && $_FILES['photo']['error'] === UPLOAD_ERR_OK) {
                $photoAUpload = DaoGestionMembre::uploadPhotoMembre();
            }
    
            // Détermine la photo à utiliser
            $photoFinal = $photoAUpload ? $photoAUpload : $photoActuelle;
    
            // Préparation de la requête SQL
            $requete = "UPDATE membres SET nom=?, prenom=?, sexe=?, datenaissance=?, photo=? WHERE idm=?";
            $parametres = array($nom, $prenom, $sexe, $datenaissance, $photoFinal, $idm);
    
            $instanceModele = modeleDonnees::getInstanceModele();
            $stmt = $instanceModele->executer($requete, $parametres);
    
            // Traitement de la réponse
            if ($stmt && $stmt->rowCount() > 0) {
                $reponse['OK'] = true;
                $reponse['msg'] = "Succès de la mise à jour.";
            } else {
                $reponse['OK'] = false;
                $reponse['msg'] = "Aucune modification nécessaire.";
            }
        } catch (Exception $e) {
            $reponse['OK'] = false;
            $reponse['msg'] = "Erreur lors de la mise à jour : " . $e->getMessage();
        } finally {
            return json_encode($reponse);
        }
    }
    function getPhotoMembre($idm) {
        $instanceModele = modeleDonnees::getInstanceModele();
        $requete = "SELECT photo FROM membres WHERE idm = ?";
    
        try {
            $stmt = $instanceModele->executer($requete, [$idm]);
            if ($stmt->rowCount() > 0) {
                $photo = $stmt->fetch(PDO::FETCH_ASSOC);
                return $photo['photo'];
            }
        } catch (Exception $e) {
            error_log("Erreur lors de la récupération de la photo : " . $e->getMessage());
        }
    
        return null;
    }
        
    function uploadPhotoMembre() {
        $targetRepertoire = "../../serveur/membre/photos/";
        $allowedTypes = ['jpg', 'jpeg', 'png', 'gif'];
        $defaultImage = "default-profile.jpg";
        $photo = $_FILES['photo'];
    
        if ($photo['error'] !== UPLOAD_ERR_OK) {
            return $defaultImage;
        }
    
        $fileType = strtolower(pathinfo($photo['name'], PATHINFO_EXTENSION));
        if (!in_array($fileType, $allowedTypes)) {
            return $defaultImage;
        }
    
        $nomFichierUnique = uniqid() . '.' . $fileType;
        if (move_uploaded_file($photo['tmp_name'], $targetRepertoire . $nomFichierUnique)) {
            return $nomFichierUnique;
        } else {
            return $defaultImage;
        }
    }
    

}

    
?>