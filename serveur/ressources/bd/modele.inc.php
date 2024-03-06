<?php
 	require_once("connexion.inc.php");
class modeleDonnees{
private static $instance=null;
	
function __construct(){

}

public static function getInstanceModele(){
	if(self::$instance ==null){ // self est pour des proprioetés statiques, this pour des objets
		self::$instance = new modeleDonnees();
	}
	return self::$instance;
}

function executer($requete=null,$params=null){
		$connexion = Connexion::getInstanceConnexion()->getConnexion();
		$stmt = $connexion->prepare($requete);
		$stmt->execute($params);
		Connexion::getInstanceConnexion()->deconnexion();
		return $stmt;		//get result pour retourner le resultat
	}

	function lastId($requete=null,$params=null){
		$connexion = Connexion::getInstanceConnexion()->getConnexion();
		$stmt = $connexion->prepare($requete);
		$stmt->execute($params);
		$idm = $connexion -> lastInsertId();
		Connexion::getInstanceConnexion()->deconnexion();
		return $idm;		//get result pour retourner le resultat
	}
	

function enleverFichier($dossier,$pochette){
	if($pochette!== IMG_DEFAUT){ // VOIR FICHIER ENV.INC.PHP
		$rmPoc="../$dossier/".$pochette;
		$tabFichiers = glob("../$dossier/*");//glob retourne un tableau avec la liste de toutes les fichiers qui sont dans le dossier et * c'est toutes les types de fichiers.
		//print_r($tabFichiers);
		// parcourir les fichier
		foreach($tabFichiers as $fichier){
		  if(is_file($fichier) && $fichier==trim($rmPoc)) {
			// enlever le fichier
			unlink($fichier);//supprimer
			break;
		  }
		}
	}
}
	
function verserFichier($dossier, $inputNom, $fichierDefaut, $chaine){//inputNom - nom du champs input, chaine qui va me permettre de concatener avec sha1
	$cheminDossier="../$dossier/";
	$pochette=$fichierDefaut;//fichier par defaut je le mets dans pochette 
	if($_FILES[$inputNom]['tmp_name']!==""){ //php mette le fichier dans le dossier tmp
		$nomPochette=sha1($chaine.time());//former une clée unique qui va devenir le nom de ma pochette, il mets pas d'extension
		if($pochette !== IMG_DEFAUT){
			$this->enleverFichier($dossier,$pochette);//Modifier, enlever le fichier existant
		}
		//Upload de la photo
		$tmp = $_FILES[$inputNom]['tmp_name'];
		$fichier= $_FILES[$inputNom]['name'];
		$extension=strrchr($fichier,'.');// il cherche l'extension du fichier
		@move_uploaded_file($tmp,$cheminDossier.$nomPochette.$extension);//@ - veut dire on veut pas qui nous enforme les erreurs
		//temp est envoyer au chemindossier, sur le nom de phochete et concatené avec l'extension
		// Enlever le fichier temporaire chargé
		//@unlink($tmp); //effacer le fichier temporaire
		//Enlever l'ancienne pochette dans le cas de modifier
		$pochette=$nomPochette.$extension;
		//$this->enleverFichier($dossier,$pochette);
		
	}
	return $pochette; // retourne le nom du fichier qui a été versé
}
}//fin de la classe
?>