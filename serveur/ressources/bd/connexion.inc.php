<?php
    require_once(__DIR__.'/env.inc.php');

    class Connexion{
        private static $instance;
        private $connexion;
        
        private function __construct(){
    
        }
        //singleton d'instance de la classe connexion
        public static function getInstanceConnexion(){
            if(self::$instance ==null){
                self::$instance = new Connexion();
            }
            return self::$instance;
        }
    
        
        function getConnexion(){
            $this->connecter();//this demande un objet 
            return $this->connexion;
        }
        
        function connecter(){
           try {// on peut se connecter à oracle ou sql server
              $dns = "mysql:host=".SERVEUR.";dbname=".BD;
              $options = array(
                PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION
              );
              $this->connexion = new PDO( $dns, USAGER, MDP, $options );
            } catch ( Exception $e ) {
                //echo $e->getMessage();
                echo "Probleme de connexion au serveur de bd";
                exit();
            }
        }
    
        function deconnexion() {
            if($this->connexion){
                unset($this->connexion);
            }
        }
    }

    
?>