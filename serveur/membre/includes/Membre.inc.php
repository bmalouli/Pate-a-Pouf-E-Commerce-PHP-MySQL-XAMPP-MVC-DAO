<?php
    class Membre{
        private $idm;
        private $nom;
        private $prenom;
        private $courriel;
        private $sexe;
        private $daten;
        private $photo;

        public function __construct($idm, $nom,$prenom,$courriel,$sexe,$daten,$photo){
            $this->setIdm($idm);
            $this->setNom($nom);
            $this->setPrenom($prenom);
            $this->setCourriel($courriel);
            $this->setSexe($sexe);
            $this->setDaten($daten);
            $this->setPhoto($photo);
        }
        // getters
        public function getIdm(){return $this->idm;}
        public function getNom(){return $this->nom;}
        public function getPrenom(){return $this->prenom;}
        public function getCourriel() { return $this->courriel ;}
        public function getSexe() { return $this->sexe ;}
        public function getDaten()  {return $this->daten;}
        public function getPhoto()  {return $this->photo;}
        // setters
        public function setIdm($idm) {
            $this->idm = $idm;
        }

        public function setNom($nom){
            $this->nom=$nom;
        }

        public function setPrenom($prenom){
            $this->prenom=$prenom;
        }

        public function setCourriel($courriel){
            $this->courriel=$courriel;
        }

        public function setSexe($sexe){
            $this->sexe=$sexe;
        }
        
        public function setDaten($daten){
            $this->daten=$daten;
        }

        public function setPhoto($photo){
            $this->photo=$photo;
        }
        
        public function afficher(){
            $rep = "<img src='../photos/".$this->photo."'>"."  ".$this->idm."  ".$this->nom."  ".$this->prenom."  ".$this->courriel."  ";
            if ($this->sexe == 'F'){
                $sexe = 'Feminin';
            } else  if ($this->sexe == 'M'){
                $sexe='Masculin';
            }else {
                $sexe='Autre';
            }
            $rep .= $sexe.'  '.$this->daten;
            return $rep;
        }
    }
?>