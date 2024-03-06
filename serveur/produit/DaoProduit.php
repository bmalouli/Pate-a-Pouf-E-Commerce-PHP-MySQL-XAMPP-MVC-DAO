<?php
// Au début de PHP: Déclarer les types dans les paramétres des fonctions
declare(strict_types=1);

require_once(__DIR__ . "/../ressources/bd/modele.inc.php");
require_once("Produit.php");

class DaoProduit
{
    static private $modelProduit = null;
    private $reponse = array();

    private function __construct()
    {
    }

    // Retourne le singleton du modèle 
    static function  getDaoProduit(): DaoProduit
    {
        if (self::$modelProduit == null) {
            self::$modelProduit = new DaoProduit();
        }
        return self::$modelProduit;
    }

    function Mdl_AjoutProduit($produit)
    {
        $nom = $produit->getNom();
        $categorie = $produit->getCateg();
        $ingredient = $produit->getIngredients();
        $prix = $produit->getPrix();
        $quantite = $produit->getQte();
        $photo = $produit->getPhoto();
        $msg = "";

        try {
            $requete = "SELECT * FROM produits WHERE nom=?";
            $instanceModele = modeleDonnees::getInstanceModele();
            $stmt = $instanceModele->executer($requete, [$nom]);

            if ($stmt->fetch(PDO::FETCH_OBJ)) {
                $this->reponse['OK'] = false;
                $this->reponse['msg'] = "Attention, un produit du même nom existe déjà. Choisir un autre nom ou modifier l'item.";
            } else {
                $requete = "INSERT INTO produits VALUES (0,?,?,?,?,?,?)";
                $instanceModele->executer($requete, [$nom, $categorie, $ingredient, $prix, $quantite, $photo]);
                $this->reponse['OK'] = true;
                $this->reponse['msg'] = "Produit " . $nom . " bien enregistré.";
            }
        } catch (Exception $e) {
            $this->reponse['OK'] = false;
            $this->reponse['msg'] = "Erreur: " . $e->getMessage();
        } finally {
            return json_encode($this->reponse);
        }
    }

    function MdlP_ChargerProduit($idP): string
    {
        $requete = "SELECT * FROM produits WHERE idP=?";

        try {
            $instanceModele = modeleDonnees::getInstanceModele();
            $stmt = $instanceModele->executer($requete, [$idP]);

            if ($stmt->rowCount() > 0) {
                $produit = $stmt->fetch(PDO::FETCH_ASSOC);
                $this->reponse['OK'] = true;
                $this->reponse['msg'] = "Produit chargé avec succès";
                $this->reponse['produit'] = $produit;
            } else {
                $this->reponse['OK'] = false;
                $this->reponse['msg'] = "Le produit demandé n'existe pas.";
            }
        } catch (Exception $e) {
            $this->reponse['OK'] = false;
            $this->reponse['msg'] = "Erreur: " . $e->getMessage();
        } finally {
            return json_encode($this->reponse);
        }
    }

    function Mdl_ModifierProduit($idProduit, $nom, $categorie, $ingredients, $prix, $quantite)
    {
        $reponse = array();

        try {
            $photoActuelle = DaoProduit::getPhotoProduit($idProduit);
            $photoAUpload = null;

            // Verifie si le produit possede une photo
            if (isset($_FILES['photo']) && $_FILES['photo']['error'] === UPLOAD_ERR_OK) {
                $photoAUpload = DaoProduit::uploadPhoto();
            }

            // On détermine la photo a utiliser et on prepare la requete
            $photoFinal = $photoAUpload ? $photoAUpload : $photoActuelle;

            $requete = "UPDATE produits SET nom=?, categorie=?, ingredients=?, prix=?, quantite=?, photo=? WHERE IdP=?";
            $parametres = array($nom, $categorie, $ingredients, $prix, $quantite, $photoFinal, $idProduit);

            $instanceModele = modeleDonnees::getInstanceModele();
            $stmt = $instanceModele->executer($requete, $parametres);

            if ($stmt && $stmt->rowCount() > 0) {
                $reponse['OK'] = true;
                $reponse['msg'] = "Succes.";
            } else {
                $reponse['OK'] = false;
                $reponse['msg'] = "Aucune modification.";
            }
        } catch (Exception $e) {
            $reponse['OK'] = false;
            $reponse['msg'] = "Erreur1: " . $e->getMessage();
        } finally {
            return json_encode($reponse);
        }
    }

    function getPhotoProduit($idProduit)
    {
        $instanceModele = modeleDonnees::getInstanceModele();
        $requete = "SELECT photo FROM produits WHERE IdP = ?";

        try {
            $stmt = $instanceModele->executer($requete, [$idProduit]);

            if ($stmt->rowCount() > 0) {
                $photo = $stmt->fetch(PDO::FETCH_ASSOC);
                return $photo['photo'];
            }
        } catch (Exception $e) {
            error_log("Erreur2: " . $e->getMessage());
        }

        return null;
    }

    function uploadPhoto()
    {
        $targetRepertoire = "../../client/images/produits/";
        $allowedTypes = ['jpg', 'jpeg', 'png', 'gif'];
        $defaultImage = "visuel-non-disponible.jpg";
        $photo = $_FILES['photo'];

        if ($photo['error'] !== UPLOAD_ERR_OK) {
            return $defaultImage;
        }

        $fileType = strtolower(pathinfo($photo['name'], PATHINFO_EXTENSION));

        if (!in_array($fileType, $allowedTypes)) {
            return $defaultImage;
        }

        $nomFichierUnique = uniqid() . '.' . $fileType; // generer un identifiant unique

        if (move_uploaded_file($photo['tmp_name'], $targetRepertoire . $nomFichierUnique)) {
            return $nomFichierUnique;
        } else {
            return null;
        }
    }

    function MdlP_getAll(): string
    {
        $requete = "SELECT * FROM produits";

        try {
            $instanceModele = modeleDonnees::getInstanceModele();
            $stmt = $instanceModele->executer($requete, []);
            $this->reponse['OK'] = true;
            $this->reponse['msg'] = "Opération réussie";
            $this->reponse['listeProduits'] = array();
            while ($ligne = $stmt->fetch(PDO::FETCH_OBJ)) {
                $this->reponse['listeProduits'][] = $ligne;
            }
        } catch (Exception $e) {
            $this->reponse['OK'] = false;
            $this->reponse['msg'] = "Problème pour obtenir les données des produits";
        } finally {
            return json_encode($this->reponse);
        }
    }

    function MdlP_supprimer($idP): string
    {
        $requete = "DELETE FROM produits where idP=?";
        $msg = "";
        try {
            $instanceModele = modeleDonnees::getInstanceModele();
            $stmt = $instanceModele->executer($requete, [$idP]);
            //$produitsAJ = self::$modelProduit->MdlP_getAll();
            //$this->reponse = json_decode($produitsAJ);
            $this->reponse['OK'] = true;
            $this->reponse['msg'] = "Produit bien supprimé";
        } catch (Exception $e) {
            $this->reponse['OK'] = false;
            $this->reponse['msg'] = "Problème pour obtenir les données des produits";
        } finally {
            return json_encode($this->reponse);
        }
    }

    function MdlP_getCategorie(): string
    {
        $requete = "SELECT DISTINCT categorie FROM produits";

        try {
            $instanceModele = modeleDonnees::getInstanceModele();
            $stmt = $instanceModele->executer($requete, []);
            $this->reponse['OK'] = true;
            $this->reponse['msg'] = "Opération réussie";
            $this->reponse['listeCategories'] = array();
            while ($ligne = $stmt->fetch(PDO::FETCH_OBJ)) {
                $this->reponse['listeCategories'][] = $ligne;
            }
        } catch (Exception $e) {
            $this->reponse['OK'] = false;
            $this->reponse['msg'] = "Problème pour obtenir les données des produits";
        } finally {
            return json_encode($this->reponse);
        }
    }

    function MdlP_getByCategory($categorie): string
    {
        $requete = "SELECT * FROM produits WHERE categorie = ?";

        try {
            $instanceModele = modeleDonnees::getInstanceModele();
            $stmt = $instanceModele->executer($requete, [$categorie]);
            $this->reponse['OK'] = true;
            $this->reponse['msg'] = "Opération réussie";
            $this->reponse['listeProduits'] = array();
            while ($ligne = $stmt->fetch(PDO::FETCH_OBJ)) {
                $this->reponse['listeProduits'][] = $ligne;
            }
        } catch (Exception $e) {
            $this->reponse['OK'] = false;
            $this->reponse['msg'] = "Problème pour obtenir les données des produits par catégorie";
        } finally {
            return json_encode($this->reponse);
        }
    }


    function rechercherParMotCle(array $params): string
    {
        $instanceModele = modeleDonnees::getInstanceModele();
        $motCle = $params['motCle'];

        try {
            $requete = "SELECT * FROM produits WHERE nom LIKE :motCle OR ingredients LIKE :motCle OR categorie LIKE :motCle";
            $stmt = $instanceModele->executer($requete, [':motCle' => '%' . $motCle . '%']);
            $this->reponse['OK'] = true;
            $this->reponse['msg'] = "Opération réussie";
            $this->reponse['listeProduits'] = $stmt->fetchAll(PDO::FETCH_ASSOC);
        } catch (Exception $e) {
            $this->reponse['OK'] = false;
            $this->reponse['msg'] = "Problème pour obtenir les données des produits par catégorie";
        } finally {
            return json_encode($this->reponse);
        }
    }
}
