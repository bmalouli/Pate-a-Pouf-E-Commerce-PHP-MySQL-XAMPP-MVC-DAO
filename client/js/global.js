function initialisation(role = null) { // des fonctions propres au panier et aux favoris
    switchLike(role);
    qtePlus();
    qteMoins();
    setLocalStorage();
    afficherqteProdPanier()
    // $( document ).ready(function() {
    //     attribuerProduits();
    // });
}

let deconnexionPageSpec = () => {
    document.getElementById('deconnexion').submit();
}

// bouton pour ajouter/enlever aux favoris
function switchLike(role) {
    let srcLike;
    let srcNotLike;
    if (role === "M") {
        srcLike = '../../client/images/general/like.png';
        srcNotLike = '../../client/images/general/notlike.png';
    }else {
        srcLike = 'client/images/general/like.png';
        srcNotLike = 'client/images/general/notlike.png';
    }
    let listeFavoris = document.getElementsByClassName("etat-like");
    for (let i=0; i<listeFavoris.length; i++) {
        listeFavoris[i].addEventListener("click", () => {
            if (listeFavoris[i].src.match(/^.*notlike.png$/)) {
                listeFavoris[i].setAttribute("src", srcLike);
            } else {
                listeFavoris[i].setAttribute("src", srcNotLike);
            }
        })
    }
}

// quantité à ajouter au panie, bouton + ou - pour le nombre d'articles souhaités
function qtePlus() {
    let listePlus = document.getElementsByClassName("plus");
    for (let i=0; i<listePlus.length; i++) {
        listePlus[i].addEventListener("click", () => {
            let parentNode = listePlus[i].parentNode;
            let nodeQte = parentNode.previousElementSibling.firstChild;
            let qte = parseInt(nodeQte.innerHTML);
            let nouvQte = qte + 1;
            nodeQte.innerHTML=nouvQte;
        })
    }
}

function qteMoins() {
    let listeMoins = document.getElementsByClassName("moins");
    for (let i=0; i<listeMoins.length; i++) {
        listeMoins[i].addEventListener("click", () => {
            let parentNode = listeMoins[i].parentNode;
            let nodeQte = parentNode.nextElementSibling.firstChild;
            let qte = parseInt(nodeQte.innerHTML);
            let nouvQte = qte - 1;
            if (nouvQte < 1) {
                alert("Attention, la quantité doit être minimalement de 1 unité")
            } else {
                nodeQte.innerHTML=nouvQte;
            }
        })
    }
}

function setLocalStorage() {
    //Local Storage
    if (localStorage.getItem("panier") == undefined) {
        localStorage.setItem("panier", '[]'); //panier vide
    }
}
    
function afficherqteProdPanier() {
    let nbart = JSON.parse(localStorage.getItem("panier"));
    let nbartlength = nbart.length;

    if (nbartlength != 0){
        nbtotalart = nbart.reduce(function(_this, val) {
        return _this + val.quantite
        }, 0);
    } else {
        nbtotalart = 0;
    }

    let afficherNbart = "(" + nbtotalart + ")";
    $('#nbart').html(afficherNbart);
}
    
    
// quantité à ajouter au panier, bouton + ou - pour le nombre d'articles souhaités
let ajouterauPanier = (idArticle) => {
    let elementprod = "prod"+idArticle;
    let nodeQte = document.getElementById(elementprod);
    let requirednode = nodeQte.getElementsByTagName('li')[1];
    let requiredElement= requirednode.childNodes[0];
    //récupérer quantité
    let qte = parseInt(requiredElement.innerHTML);

    //ajuster objet articleId/quantité
    let nouvarticle = {
        id:idArticle,
        quantite: qte
    };

    //ajuster localStorage
    let panier = [];
    panier = JSON.parse(localStorage.getItem("panier"));
    let item = panier.find(el=> el.id == idArticle);
    
    if(item == undefined){
        panier.push(nouvarticle);
    }else {
        item.quantite=item.quantite+qte;
    }
    localStorage.setItem("panier", JSON.stringify(panier));
    //remettre quantité à 0 dans le card
    requiredElement.innerHTML = "0";
    afficherqteProdPanier()
}
    

// afficher carte de localisation
const montrerCarte= () => {
    document.getElementById('carteForm').innerHTML = modalCarte();

    const carte = new bootstrap.Modal('#montrerCarte', {
   });
   carte.show();
}


const modalCarte = () => {
    return `<div class="modal fade modal-lg" id="montrerCarte" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                    
                        <div class="modal-header">
                            <h1 id="titre-carte">Plan de localisation</h1>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>

                        <div class="modal-body">
                            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d11179.379231841116!2d-73.62031518344403!3d45.533328468249444!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4cc9196d14bf06b7%3A0x6a6f8db96da6f3f0!2sPetite%20Italie%2C%20Montr%C3%A9al%2C%20QC!5e0!3m2!1sfr!2sca!4v1695139534811!5m2!1sfr!2sca" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
                       </div>

                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        </div>

                    </div>
                </div>
            </div>`;
}

// changer le header du site selon la connexion
const switchHeader= (role, prenom, nom, photo) => {
    if (role === "M") {
        document.getElementById('pageMembre').style.display = "block";
        document.getElementById('pageProfil').style.display = "none";

        let switch1 = document.getElementById('optionHeader1'); 
        let switch2 = document.getElementById('optionHeader2'); 
        switch1.setAttribute("href","javascript:afficherEtModifierMembre()");
        switch1.innerHTML = "Profil";
        switch2.setAttribute("href","javascript:deconnexionPageSpec();");
        switch2.innerHTML = "Déconnexion";

        let addIndentifiant= document.getElementById('identifiantMembre'); 
        let nomCie = document.getElementsByClassName("text-light")[0];
        nomCie.innerHTML += "  /";
        let nomMembre = document.createElement("p");
        nomMembre.setAttribute("id","salutation");
        nomMembre.innerHTML = "  Bonjour "+ prenom + " " + nom + "!";
        let photoMembre = document.createElement("img");
        photoMembre.src = photo;
        photoMembre.style.height = '50px';
        addIndentifiant.prepend(nomMembre);
        addIndentifiant.prepend(photoMembre);

        let navbar= document.getElementById('navbar'); 
        navbar.classList.add("navbarMembre");

    } 

}

// Validation mot de passe pendant l'enregistrement
function validerFormEnreg() {
    let etat = true;
    let msg ="";
    const regExpPass = new RegExp("(?=.*[A-Z])(?=.*?[a-z])(?=.*[0-9])(?=.*[\\#\\?\\!@\\$%\\^&\\*\\-_]).{8,10}");
    const mdp = document.getElementById('password').value;
    const mdpc = document.getElementById('cpassword').value;
    if(mdp !== mdpc){
        etat = false;
        msg = "Mot de passe ne sont pas égaux !";
        document.getElementById('msge').innerHTML = msg;
        return etat;
    } else {//OK, égaux
        if(!regExpPass.test(mdp)){
            etat = false;
            msg = "Mot de passe non conforme";
            document.getElementById('msge').innerHTML = msg;
            return etat;
        } 
    }
    return etat;
}


