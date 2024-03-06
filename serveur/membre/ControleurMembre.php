<?php
       
    require_once("DaoGestionMembre.php");

 class ControleurMembre { 
    static private $instanceCtr = null;
    
    private $reponse;

    private function __construct(){

    }

     // Retourne le singleton du modèle, controleur pour gerer films
	static function  getControleurMembre():ControleurMembre{
		if(self::$instanceCtr == null){
			self::$instanceCtr = new ControleurMembre();  
		}
		return self::$instanceCtr;
	}

    function CtrM_getAll(){
         return DaoGestionMembre::getDaoMembre()->MdlM_getAll(); 
    }

    function CtrM_modifierStatut(){
        $idm=$_POST['idm'];
        return DaoGestionMembre::getDaoMembre()->MdlM_modifierStatut($idm); 
   }

   function CtrM_chargerMembre(){
    $idMembre = $_POST['idMembre'];
    return DaoGestionMembre::getDaoMembre()->MdlM_chargerMembre($idMembre); 
}
function CtrM_mettreAJourMembre() {
    $idm= $_POST['id'];
    $nom= $_POST['nom'];
    $prenom= $_POST['prenom'];
    $courriel= $_POST['courriel'];
    $sexe= $_POST['sexe'];
    $datenaissance= $_POST['datenaissance'];
    $photo= $_POST['photo'];
    return DaoGestionMembre::getDaoMembre()->MdlM_mettreAJourMembre($idm, $nom, $prenom, $courriel, $sexe, $datenaissance, $photo );
}

    function CtrM_Actions(){ // il est appelé a partir de routes.php
        $action=$_POST['action'];
        switch($action){
            case "fiche" :
                //fiche(); 
            break;
            case "modifierstatut" :
                return $this->CtrM_modifierStatut(); 
            break;
            case "enlever" :
                //enlever(); 
            break;
            
            case "chargerMembre":         
                return  $this->CtrM_chargerMembre();
            case "mettreAJourMembre":
                return $this->CtrM_mettreAJourMembre();
            case "lister" :
                return $this->CtrM_getAll(); 
        }
        // Retour de la réponse au client
       
    }
}
?>