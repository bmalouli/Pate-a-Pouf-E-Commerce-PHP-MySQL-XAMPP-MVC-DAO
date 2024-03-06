<?php
    $pos = strpos($_SERVER['PHP_SELF'], "index.php");
    if ($pos === false){
        $index="../../index.php";
        $logo="../../client/images/general/logo.png";
        $panier="../../client/images/general/panier.png";
        $favoris="../../client/images/general/like.png";
    }else{
        $index="index.php";
        $logo="client/images/general/logo.png";
        $panier="client/images/general/panier.png";
        $favoris="client/images/general/like.png";
    }
?>
<header id="header">
        <div class="logo">
            <a href="<?php echo $index ?>"><img src="<?php echo $logo ?>" alt="Pâte-à-Pouf" id="logo"></a>
            <h1 class="text-light">Pâte-à-Pouf</h1>
            <div id="identifiantMembre"></div>
        </div>

        <nav id="navbar" class="navbar">
            <ul>
                <li><a class="active" href="<?php echo $index ?>">Accueil</a></li>
                <li class="dropdown"><a href="#"><span>À propos</span> <i class="bi bi-chevron-down"></i></a>

                <li class="dropdown"><a href="javascript:montrerProduits();"><span>Produits</span> <i class="bi bi-chevron-right"></i></a>
                <ul>
                    <li><a href="#">Pâtes fraîches</a></li>
                    <li><a href="#">Sauces</a></li>
                    <li><a href="#">Fromages</a></li>
                    <li><a href="#">Prêts-à-manger</a></li>
                </ul>
                </li>

                <li class="dropdown"><a href="#"><span>Services</span> <i class="bi bi-chevron-right"></i></a>
                <ul>
                    <li><a href="#">Livraison</a></li>
                    <li><a href="#">Traiteur</a></li>
                    <li><a href="#">Ateliers</a></li>
                </ul>
                </li>
                
                <li><a href="#">Contactez-nous</a></li>
                <li><a class="getstarted" id="optionHeader1" href="javascript:montrerFormConnexion();">Se connecter</a></li>
                <li><a class="getstarted" id="optionHeader2" href="javascript:montrerFormEnregMembre();">S'inscrire</a></li>
            </ul>
        </nav>
        
        <div class="panier">
            <a href="javascript:afficherPanier();"><img src="<?php echo $panier ?>" alt="voir le panier" id="panier"></a>
        </div>
        <div class="qteproduits">
            <span id="nbart">(0)</span>
        </div>
        <div class="favoris">
            <a href="favoris.php"><img src="<?php echo $favoris ?>" alt="voir les favoris" id="favoris"></a>
        </div>
</header>
