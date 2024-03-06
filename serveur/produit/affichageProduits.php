<?php
    declare (strict_types=1);
    require_once(__DIR__.'/../ressources/bd/connexion.inc.php');
    require_once(__DIR__.'/../ressources/bd/modele.inc.php');

    if(isset($_GET['categorie'])){
        $categorie = $_GET['categorie'];
        $requete="SELECT * FROM produits WHERE categorie='$categorie'";
        $categorie = "" ;
    
    } else {
        $requete="SELECT * FROM produits";
    }
    
    try{
        $instanceModele= modeleDonnees::getInstanceModele();
        $stmt = $instanceModele->executer($requete,[]);
        while($ligne=$stmt->fetch(PDO::FETCH_OBJ)){
            listerProduits($ligne);
        }
    }catch (Exception $e){ 
        echo 'ERREUR: '.$e;
    }finally {
      //echo json_encode($reponse);
    }

	function listerProduits($produit){
        $lienImage = chargerImage($produit->photo);
        $prix = miseEnFormePrix($produit->prix);
        
        $pos = strpos($_SERVER['PHP_SELF'], "index.php");
        if ($pos === false){
            $like = '../../client/images/general/notlike.png';
            $ajoutPanier = '../../client/images/general/ajout-panier.png';
        }else{
            $like = 'client/images/general/notlike.png';
            $ajoutPanier = 'client/images/general/ajout-panier.png';
        }

        $card = '
        <div class="card" style="width: 18rem;">
            <a href="#"><img src="'.$lienImage.'" class="card-img-top"></a>
            
            <div class="card-body">
                <a href="#"><h5 class="card-title">'.$produit->nom.'</h5></a>
            </div>
            <div class="card-body">
                <p><b>Catégorie: </b>'.$produit->categorie.'</p>
            </div>

            <ul class="list-group list-group-flush">
                <li class="list-group-item">'.$prix.'</li>
            </ul>
            <nav class = "qte">
                <ul class="pagination" id="prod'.$produit->IdP.'">
                    <li class="page-item"><a class="page-link moins">-</a></li>
                    <li class="page-item"><a contenteditable="true" id="quantiteProduit" class="page-link">0</a></li>
                    <li class="page-item"><a class="page-link plus">+</a></li>
                </ul>
            </nav>

            <div class="card-body">
                <p class="card-fav"><img class="etat-like" src="'.$like.'" alt="ajouter aux favoris"></p>
                <p id="add_to_cart"><img onClick="ajouterauPanier('.$produit->IdP.');" src="'.$ajoutPanier.'"></p>
            </div>
        </div>';

        echo $card;
    }

    function chargerImage($image){
        $pos = strpos($_SERVER['PHP_SELF'], "index.php");
        if ($pos === false){
            $lien = '../../client/images/produits/'.$image;
            $lienND = '../../client/images/produits/visuel-non-disponible.jpg';
        }else{
            $lien = 'client/images/produits/'.$image;
            $lienND = 'client/images/produits/visuel-non-disponible.jpg';
        }

        if ($image != ""){
            if (file_exists($lien)){
                return $lien;
            }else {
                return $lienND;
            }
        } else {
            return $lienND;
        }
    }

    function miseEnFormePrix($prix){
        $prixStr = strval($prix);
        if (strlen($prixStr) != 0) {
            if (strpos($prixStr, '.')){
                $prixTab = explode(".", $prixStr);
                $prixEnt = $prixTab[0];
                $decimal = $prixTab[1];
                if (strlen($decimal) != 2) {
                    while (strlen($decimal) != 2) {
                        $decimal .= '0';
                    }
                }
            } else {
                $prixEnt =  $prixStr;
                $decimal = '00';
            }
            return $prixEnt.'.'.$decimal."$";
        } else {
            return 'Prix Non Disponible';
        }
    }
?>


