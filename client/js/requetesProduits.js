//********************************************
//Actions et requetes sur les produits 
let pageEnCours = window.location.pathname;
pageEnCours = pageEnCours.split("/");
pageEnCours = pageEnCours[pageEnCours.length - 1];
let srcUrl;
if (pageEnCours == "membre.php") {
    srcUrl =  "../admin/routesProduits.php";
} else {
    srcUrl =  "routesProduits.php";
}


let chargerProduits = () => {floatingSelect
    document.getElementById('rechercheMotCle').value="";
    document.getElementById('floatingSelect').selectedIndex=0;
    $.ajax({
        type : "POST",
        url  : "routesProduits.php",
        data : {"action":"lister"},
        dataType : "json", 
        success : (reponse) => {
        	montrerVue("lister", reponse);
        },
        fail : (err) => {
            console.log(err);
        }
    })
}

let supprimerProduit = (idP) => {
    $.ajax({
        type : "POST",
        url  : "routesProduits.php",
        data : {"action":"supprimer", "id": idP},
        dataType : "json", 
        success : (reponse) => {
            console.log(reponse);
            window.open("admin.php");
        },
        fail : (err) => {
            console.log(err);
        }
    })
}

let chargerCategories = () => {
    $.ajax({
        type : "POST",
        url  : srcUrl,
        data : {"action":"recupererCategories"},
        dataType : "json", 
        success : (reponse) => {
            montrerVue("chargerCateg", reponse);
        },
        fail : (err) => {
            console.log(err);
        }
    })
}


const requeteEnregistrer = () => {
    let formProduit = new FormData(document.getElementById('formAjoutProduit'));
    let categorie = document.getElementById('categorie').options[document.getElementById('categorie').selectedIndex].value;
    formProduit.append('categorie', categorie);
    formProduit.append('action', 'enregistrer');
    $.ajax({
        type: 'POST',
        url: 'routesProduits.php',
        data: formProduit,
        contentType: false,
        processData: false,
        dataType: 'json',
        async: false,
        success: function (reponse) {
            montrerVue("enregistrer", reponse);
        },
        fail: function (err) {
            console.log(err);
        }
    });
}


// Recherche par nom, ingrédients ou catégorie
let rechercheParMotCle = () => {
    let motCle = $("#rechercheMotCle").val();
    $.ajax({
        type: "POST",
        url: "routesProduits.php",
        data: { "action": "rechercherParMotCle", "motCle": motCle },
        dataType: "json",
        success: (reponse) => {
            console.log(reponse);
            montrerVue("lister", reponse);
        },
        fail: (err) => {
            console.log(err);
        }
    });
}

//lister par catégorie ADMIN
let rechercheCategorie = () => {
    let selectedCategorie = $("#floatingSelect").val();
    $.ajax({
        type: "POST",
        url: "routesProduits.php",
        data: {
            "action": "rechercherParCategorie",
            "categorie": selectedCategorie  // Nouvelle propriété pour la catégorie
        },
        dataType: "json",
        success: (reponse) => {
            montrerVue("lister", reponse);
        },
        fail: (err) => {
            console.log(err);
        }
    });
}


//lister par catégorie MEMBRE
let selectedCategorie;//fonctionne pas*********************************************
let rechercheCategorieMembre = () => {
    selectedCategorie = $("#floatingSelect").val();
    window.location = 'membre.php?categorie='+selectedCategorie;

}



// affichage du produit a modifier dans le formulaire
let chargerInfosProduit = (idP) => {
    $.ajax({
        type: "POST",
        url: "routesProduits.php",
        data: {'action': "charger_produit", 'idProduit': idP},
        dataType: "json",
        success: function (reponse){
            if (reponse.OK){
                remplirFormulaireModification(reponse.produit);
            } else {
                console.log(reponse.msg);
            }
        },
        error: function (err) {
            console.log(err);
        }
    });
}

// modification du produit afficher dans le formulaire
let modifierProduit = () => {
    let formProduit= new FormData(document.getElementById('formModif'));

    formProduit.append('action', 'modifier_produit');
    formProduit.append('idProduit', $("#idProduit").val());
    formProduit.append('nom', $("#nom").val());
    formProduit.append('categorie', $("#categorie").val());
    formProduit.append('ingredients', $("#ingredients").val());
    formProduit.append('prix', $("#prix").val());
    formProduit.append('quantite', $("#quantite").val());

    if ($("#photo")[0].files[0]){
        formProduit.append('photo', $("#photo")[0].files[0]);
    } else {
        formProduit.append('photo', $("#photo")[0].files[0]);
    }
    
    $.ajax({
        type: "POST",
        url: "routesProduits.php",
        data: formProduit,
        dataType: "json",
        contentType: false,
        processData: false,
        success: function (reponse){
            if (reponse.OK) {
                console.log("Produit modifier avec succès.");
            } else {
                console.error("Erreur lors de la modification:", reponse.msg);
            }
        },
        error: function (err) {
            console.error("Erreur AJAX:", err);
        }
    });
}

const genererCategories = (liste) => {
    let resultat = ""
    resultat += `<option value="All">Toutes</option>`;
    for (let  i =0; i < liste.length; i++) {
        let unGenre = liste[i];
        resultat += '<option value="'+unGenre.categorie+'">'+unGenre.categorie+'</option>';
    }
    document.getElementById('floatingSelect').innerHTML += resultat;
}



//********************************************
//Controleur de sortie des requetes

let montrerVue = (action, donnees) => {
	msgErr = "Problème côté serveur. Essayez plus tard!";
    switch(action){
        case "modifier"     :
        case "enregistrer"  :
            if (donnees.OK) {
                //afficherMessageConfirmation(donnees.msg);
            } else {
                afficherMessageConfirmation(donnees.msg);
            }
            break;
        case "enlever"      :
            if(donnees.OK){
                afficherMessage(donnees.msg);
            }else{
                afficherMessageConfirmation(donnees.msg); 
            }
            break;
        case "lister"       :
            if(donnees.OK){
                listerProduits(donnees.listeProduits);
            }else{
                afficherMessageConfirmation(donnees.msg); 
            }
		    break;
		case "chargerCateg" :
			if(donnees.OK){
				genererCategories(donnees.listeCategories);
			}else{
				afficherMessageConfirmation(donnees.msg); 
			}
    }
}

//********************************************
//Affichage et mise en forme des cards
 
let remplirCard = (unProduit)=> {
	let lienImage = chargerImage(unProduit.photo);
    let prix = miseEnFormePrix(unProduit.prix);
    let idP = unProduit.IdP;

	let rep ='<div class="card card-adminP">';
	rep +='<div class="id-adminP">'+idP+'</div>';
	rep +='<div class="img-adminP"><img src="'+lienImage+'" class="img-fluid rounded-start"></div>';
	rep +='<div class="nom-adminP"><b>'+unProduit.nom+'</b></div>';
	rep +='<div class="ingredient-adminP">'+unProduit.ingredients+'</div>';
	rep +='<div class="categorie-adminP">'+unProduit.categorie+'</div>';
    rep +='<div class="prix-adminP">'+prix+'</div>';
    rep +='<div class="qte-adminP">'+unProduit.quantite+'</div>';
	rep +='<div class="boutons-adminP"><a href="#" onClick="chargerInfosProduit('+idP+');" class="btn btn-success btn-modifier-produit">Modifier</a></div>';
	rep +='<div class="boutons-adminP"><a href="#" onClick="afficherMessage('+idP+');" class="btn btn-danger">Supprimer</a></div>';     
	rep +='</div>';
	return rep;
}

let enteteProduits = ()=> {
	let rep ='<div class="card cardEntete-adminP">';
	rep +='<div class="id-adminP titre">ID</div>';
	rep +='<div class="img-adminP titre">Image</div>';
	rep +='<div class="nom-adminP titre">Nom</div>';
	rep +='<div class="ingredient-adminP titre">Ingrédients</div>';
	rep +='<div class="categorie-adminP titre">Catégorie</div>';
    rep +='<div class="prix-adminP titre">Prix</div>';
    rep +='<div class="qte-adminP titre">Nb unités<br><i>(Inventaire)</i></div>';
	rep +='<div class="boutons-adminP titre">Modifier</div>';
	rep +='<div class="boutons-adminP titre">Supprimer</div>';     
	rep +='</div>';
	return rep;
}

let listerProduits = (listeProduits) => {
    let contenu = "";
    
    if (listeProduits.length == 0){
        contenu += `<div class="menu-admin">`;
        contenu += `Aucun élément ne correspond à la recherche.`
        contenu += `</div>`;
    } else {
        contenu += enteteProduits();
        contenu += `<div class="row row-cols-4">`;
        for (let unProduit of listeProduits){
                contenu+=remplirCard(unProduit);
        } 
        contenu += `</div>`;
    }    
    document.getElementById('contenuProduits').innerHTML = contenu;
}

function chargerImage(image){
	lien = '../../client/images/produits/'+image;
	return lien;
}


function miseEnFormePrix(prix){
    prixStr = prix.toString();
    if (prixStr.length != 0) {
        if (prixStr.indexOf(".") != -1){
            prixTab = prixStr.split(".");
            prixEnt = prixTab[0];
            decimal = prixTab[1];
            if (decimal.length != 2) {
                while (decimal.length != 2) {
                    decimal += '0';
                }
            }
        } else {
            prixEnt =  prixStr;
            decimal = '00';
        }
        return prixEnt+'.'+decimal+"$";
    } else {
        return 'Prix Non Disponible';
    }
}

//lorsque retour vers la page produits
let relisterProduits =() => {
    document.getElementById('affichercontenuProduits').style.display = "block";
    document.getElementById('affichercontenuProduits').style.display = "flex";
    document.getElementById('contenuProduits').style.display = "block";
    document.getElementById('affichercontenuMembre').style.display = "none";
    document.getElementById('contenuMembres').style.display = "none";
    document.getElementsByClassName('eHr')[0].style.display = "block";
}

let montrerProduits = () => {
    if (pageEnCours == "membre.php") {
        document.getElementById('pageMembre').style.display = "block";
        document.getElementById('pageProfil').style.display = "none";
    }
}


//********************************************
//Affichage message par rapport aux produits

let afficherMessageConfirmation = (msg) => {
    alert(msg);
}


let afficherMessage = (idP) => {
    let msg = 'Êtes-vous sûrs de vouloir supprimer le produit id='+idP+'?';

    let ajoutScript = document.createElement('script');
    ajoutScript.type = 'text/javascript';
    let code = 'montrerToast("'+msg+'",2);';
    ajoutScript.appendChild(document.createTextNode(code));
    document.body.appendChild(ajoutScript);

    let boutonSupp = document.getElementsByClassName("boutonSupp")[0];
    boutonSupp.setAttribute('id', idP);
}


let confirmationSuppression = () => {
    let boutonSupp = document.getElementsByClassName("boutonSupp")[0];
    let idP = boutonSupp.getAttribute('id');
    supprimerProduit(idP);
}