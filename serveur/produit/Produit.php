<?php
    class Produit{
        private $idP;
        private $nom;
        private $categorie;
        private $ingredients;
        private $prix;
        private $quantite;
        private $photo;

        public function __construct($idP, $nom, $categorie, $ingredients, $prix, $quantite, $photo){
            $this->setIdP($idP);
            $this->setNom($nom);
            $this->setCateg($categorie);
            $this->setIngredients($ingredients);
            $this->setPrix($prix);
            $this->setQte($quantite);
            $this->setPhoto($photo);
        }
        // getters
        public function getIdP(){return $this->idP;}
        public function getNom(){return $this->nom;}
        public function getCateg(){return $this->categorie;}
        public function getIngredients() { return $this->ingredients ;}
        public function getPrix() { return $this->prix ;}
        public function getQte()  {return $this->quantite;}
        public function getPhoto()  {return $this->photo;}
        // setters
        public function setIdP($idP) {
            $this->idP = $idP;
        }

        public function setNom($nom){
            $this->nom=$nom;
        }

        public function setCateg($categorie){
            $this->categorie=$categorie;
        }

        public function setIngredients($ingredients){
            $this->ingredients=$ingredients;
        }

        public function setPrix($prix){
            $this->prix=$prix;
        }
        
        public function setQte($quantite){
            $this->quantite=$quantite;
        }

        public function setPhoto($photo){
            $this->photo=$photo;
        }
        
        // public function afficher(){
        //     $rep = "<img src='../photos/".$this->photo."'>"."  ".$this->idm."  ".$this->nom."  ".$this->prenom."  ".$this->courriel."  ";
        //     if ($this->sexe == 'F'){
        //         $sexe = 'Feminin';
        //     } else  if ($this->sexe == 'M'){
        //         $sexe='Masculin';
        //     }else {
        //         $sexe='Autre';
        //     }
        //     $rep .= $sexe.'  '.$this->daten;
        //     return $rep;
        // }
    }
?>