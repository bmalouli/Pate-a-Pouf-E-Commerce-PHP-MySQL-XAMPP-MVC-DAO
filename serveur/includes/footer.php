<?php
    $pos = strpos($_SERVER['PHP_SELF'], "index.php");
    if ($pos === false){
        $map="../../client/images/general/localisation.png";
        $facebook="../../client/images/general/facebook.png";
        $insta="../../client/images/general/instagram.png";
        $gmail="../../client/images/general/gmail.png";
    }else{
        $map="client/images/general/localisation.png";
        $facebook="client/images/general/facebook.png";
        $insta="client/images/general/instagram.png";
        $gmail="client/images/general/gmail.png";
    }
?>
<footer id="footer">
    <div class="footer-top">
      <div class="container">
        <div class="row">

          <div class="col-lg-3 col-md-6 footer-info">
            <h3>Pâte-à-Pouf</h3>
            <p>Chez Pâte-à-Pouf, nous sommes plus qu'un simple centre de plats à emporter et plus qu'une épicerie de produits spécialisée. Nous sommes une communauté. Une famille. Et nous prenons toujours soin de notre famille!</p>
          </div>

          <div class="col-lg-3 col-md-6 footer-links">
            <h4>Service à la clientèle</h4>
            <ul>
              <li><a href="#">Conditions générales</a></li>
              <li><a href="#">Politique de confidentialité</a></li>
              <li><a href="#">Carrières</a></li>
              <li><a href="#">FAQ</a></li>
            </ul>
          </div>

          <div class="col-lg-3 col-md-6 footer-contact">
            <h4>Contactez-nous</h4>
            <p>
              555 5e avenue <br>
              Montréal, Québec<br>
              Canada <a id="carte" onClick='montrerCarte();'><img src='<?php echo $map ?>'></a><br><br>
              <strong>Téléphone:</strong><a id="telp"> +1 514 555 5555</a><br>
              <strong>Courriel:</strong><a id="emailp" href="mailto:pate-a-pouf@info.com"> pate-a-pouf@info.com</a><br>
            </p>

            <div>
              <a href="#"><img class="liens" src='<?php echo $facebook ?>'></a>
              <a href="#"><img class="liens" src='<?php echo $insta ?>'></a>
              <a href="#"><img class="liens" src='<?php echo $gmail ?>'></a>
            </div>

          </div>

          <div class="col-lg-3 col-md-6 footer-newsletter">
            <h4>Infolettre</h4>
            <p>Inscrivez-vous à notre infolettre pour ne rien manquer de nos nouveaux produits et des offres en cours!</p>
            <form action="" method="post">
              <input type="email" name="email"><input type="submit" value="S'inscrire">
            </form>
          </div>

        </div>
      </div>
    </div>

    <div class="container">
      <div class="copyright">
        2023 &copy; Copyright <strong><span>Pâte-à-Pouf</span></strong>. Tous droits réservés.
      </div>
    </div>

    <div id="carteForm"></div>

  </footer>