<?php

require_once("Produit.php");
require_once("DaoProduit.php");

class ControleurProduit
{
    static private $instanceCtr = null;
    private $reponse;

    private function __construct()
    {
    }

    static function  getControleurProduit(): ControleurProduit
    {
        if (self::$instanceCtr == null) {
            self::$instanceCtr = new ControleurProduit();
        }
        return self::$instanceCtr;
    }


    function CtrP_AjouterProduit()
    {
        $nom = $_POST['nom'];
        $categorie = $_POST['categorie'];
        $ingredient = $_POST['ingredients'];
        $prix = $_POST['prix'];
        $quantite = $_POST['quantite'];
        $photo = DaoProduit::getDaoProduit()->uploadPhoto();

        if ($photo === "") {
            return "Erreur";
        }

        $produit = new Produit(0, $nom, $categorie, $ingredient, $prix, $quantite, $photo);
        return DaoProduit::getDaoProduit()->Mdl_AjoutProduit($produit);
    }


    function CtrP_ChargerProduit($idProduit)
    {
        return DaoProduit::getDaoProduit()->MdlP_ChargerProduit($idProduit);
    }

    function CtrP_ModifierProduit()
    {
        $idProduit = $_POST['idProduit'];
        $nom = $_POST['nom'];
        $categorie = $_POST['categorie'];
        $ingredients = $_POST['ingredients'];
        $prix = $_POST['prix'];
        $quantite = $_POST['quantite'];

        $photoExiste = DaoProduit::getDaoProduit()->getPhotoProduit($idProduit);
        return DaoProduit::getDaoProduit()->Mdl_ModifierProduit($idProduit, $nom, $categorie, $ingredients, $prix, $quantite, $photoExiste);
    }

    function CtrP_getAll()
    {
        return DaoProduit::getDaoProduit()->MdlP_getAll();
    }


    function CtrP_getCategories()
    {
        return DaoProduit::getDaoProduit()->MdlP_getCategorie();
    }


    function CtrP_supprimer()
    {
        $idP = $_POST['id'];
        return DaoProduit::getDaoProduit()->MdlP_supprimer($idP);
    }


    function CtrP_listerParCategorie()
    {
        $categorie = $_POST['categorie'];
        if ($categorie === "All") {
            return DaoProduit::getDaoProduit()->MdlP_getAll();
        } else {
            return DaoProduit::getDaoProduit()->MdlP_getByCategory($categorie);
        }
    }


    function CtrP_rechercherParMotCle()
    {
        $params = ["motCle" => $_POST['motCle']];
        return DaoProduit::getDaoProduit()->rechercherParMotCle($params);
    }


    //controleur actions sur produits
    function CtrP_Actions()
    {
        $action = $_POST['action'];
        switch ($action) {
            case "enregistrer":
                return  $this->CtrP_AjouterProduit();
                break;
            case "modifier_produit":
                return $this->CtrP_ModifierProduit();
                break;
            case "charger_produit":
                $idProduit = $_POST['idProduit'];
                return $this->CtrP_ChargerProduit($idProduit);
                break;
            case "supprimer":
                return $this->CtrP_supprimer();
                break;
            case "lister":
                return $this->CtrP_getAll();
                break;
            case "recupererCategories":
                return $this->CtrP_getCategories();
                break;
            case "rechercherParMotCle":
                return $this->CtrP_rechercherParMotCle();
                break;
            case "rechercherParCategorie":
                return $this->CtrP_listerParCategorie();
                break;
        }
    }
}
