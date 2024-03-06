//Houssam 


function afficherformulaire() {
    document.getElementsByClassName('container_produits')[0].style.display = "none";
    document.getElementById('profilConteneur').style.display = "block";
}


function afficherEtModifierMembre() {
    document.getElementById('pageMembre').style.display = "none";
    document.getElementById('pageProfil').style.display = "block";

    let idMembre = document.getElementById('idMembreCourant').innerHTML;

    // Requête AJAX pour récupérer les données du membre
    $.ajax({
        type: "POST",
        url: "../admin/routesMembres.php",
        data: { action: "chargerMembre", 'idMembre': idMembre },
        dataType: "json",
        success: (dataMembre) => {
            console.log(dataMembre);
            // Assurez-vous que les données récupérées sont valides
            if (!dataMembre.donneesMembre) {
                console.error("Données du membre non disponibles");
                return;
            }

            // Affichage des données du membre
            document.getElementById('nomMembre').textContent = dataMembre.donneesMembre.nom;
            document.getElementById('prenomMembre').textContent = dataMembre.donneesMembre.prenom;
            document.getElementById('sexeMembre').textContent = dataMembre.donneesMembre.sexe;
            document.getElementById('courriel').textContent = dataMembre.donneesMembre.courriel;
            document.getElementById('datenaissanceMembre').textContent = dataMembre.donneesMembre.datenaissance;

            // Remplir le formulaire de modification
            $('#formModifierProfil #nom').val(dataMembre.donneesMembre.nom);
            $('#formModifierProfil #prenom').val(dataMembre.donneesMembre.prenom);
            $('#formModifierProfil #courriel').val(dataMembre.donneesMembre.courriel).prop('disabled', true); 
            $('input[name="sexe"]').prop('checked', false); 
            $('input[name="sexe"][value="' + dataMembre.donneesMembre.sexe + '"]').prop('checked', true); 
            $('#formModifierProfil #datenaissance').val(dataMembre.donneesMembre.datenaissance);        

            // Gestion de la photo de profil
            if (dataMembre.donneesMembre.photo && dataMembre.donneesMembre.photo !== '') {
                $('#imageDuMembre').attr('src', 'photos/'+dataMembre.donneesMembre.photo);
            } else {
                $('#imageDuMembre').hide(); // ou définissez une image par défaut
            }
        },
        fail: (err) => {
            console.error('Erreur lors de la récupération des données du membre', err);
        }
    });
}



function mettreAJourMembre(idMembre) {

    if (!idMembre) {
        console.error("ID du membre manquant");
        return;
    }
    let formMembre = new FormData(document.getElementById('formModifierProfil'));
    formMembre.append('action', 'mettreAJourMembre');
    formMembre.append('id', idMembre);
    $.ajax({
        type: "POST",
        url: "../../serveur/admin/routesMembres.php",
        data: formMembre,
        contentType: false,
        processData: false,
        dataType: "json",
        success: function (reponse) {
            console.log(reponse);
            afficherEtModifierMembre(idMembre);
            if (reponse.success) {
                console.log('Mise à jour réussie');

            } else {
                throw new Error('Problème lors de la mise à jour du membre');
            }
        },
        fail: function (err) {
            console.error('Erreur lors de la mise à jour du membre', err);
        }
    });
}


function afficherFormulaireModification() {
    // Afficher le formulaire de modification
    document.getElementById('formModifierProfil').style.display = 'block';
    document.getElementById('nom').value = document.getElementById('nomMembre').textContent;
    document.getElementById('prenom').value = document.getElementById('prenomMembre').textContent;
    var sexeActuel = document.getElementById('sexeMembre').textContent;

    if (sexeActuel === 'M') {
        document.getElementById('sexeM').checked = true;
    } else if (sexeActuel === 'F') {
        document.getElementById('sexeF').checked = true;
    } else if (sexeActuel === 'Autre') {
        document.getElementById('sexeAutre').checked = true;
    }

    document.getElementById('datenaissance').value = document.getElementById('datenaissanceMembre').textContent; // Mettez l'ID ou la classe de l'élément contenant la date de naissance actuelle
   
    let photoActuelle = document.getElementById('imageDuMembre').getAttribute('src');
    if (photoActuelle) {
        // Mettre à jour l'aperçu de la photo de profil dans le formulaire
        let photoAffichage = document.getElementById('photoProfil');
        photoAffichage.src = photoActuelle;
        photoAffichage.style.display = 'block'; // Assurez-vous que l'élément 'photoProfil' est bien un élément d'image
    } else {
        // Si aucune photo n'est disponible, masquez l'élément d'aperçu de la photo
        let photoAffichage = document.getElementById('photoProfil');
        photoAffichage.style.display = 'none';
    }
   
    //document.getElementById('photoProfil').src = document.getElementById('imageDuMembre').getAttribute('src'); // Mettez l'ID de l'élément img où la photo est affichée
}

function afficherApercuPhoto(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function (e) {
            document.getElementById('photoProfil').src = e.target.result;
            document.getElementById('photoProfil').style.display = 'block';
        };
        reader.readAsDataURL(input.files[0]);
    }
}


  
/////////////////////////////////////////////////////////////////////////////////////////

function chargerMembres() {
    document.getElementById('affichercontenuProduits').style.display = "none";
    document.getElementById('contenuProduits').style.display = "none";
    document.getElementsByClassName('eHr')[0].style.display = "none";
    document.getElementById('affichercontenuMembre').style.display = "block";
    document.getElementById('contenuMembres').style.display = "block";
    $.ajax({
        type : "POST",
        url  : "routesMembres.php",
        data : {action:"lister"},
        dataType : "json", //text pour voir si bien formé même chose pour xml
        success : (listeMembres) => {//alert(JSON.stringify(listeFilms['listeFilms']));
            //listeMembres = reponse;
            console.log(listeMembres);
        	montrerVueMembre("listerMembres", listeMembres);
        },
        fail : (err) => {
            //Décider du message
        }
    })
}

$(document).on('change', '#flexSwitchCheckDefault', function (e) {
    let idmembre=document.getElementById('idMembre').innerHTML;
    let formMembre = new FormData();
    formMembre.append('action', 'modifierstatut');
    formMembre.append('idm', idmembre);
    $.ajax({
        type : "POST",
        url  : "routesMembres.php",
        data : formMembre,
        dataType : "json", //text pour voir si bien formé même chose pour xml
        async: true,
        contentType : false, 
		processData : false,
        success : (reponse) => {//alert(JSON.stringify(listeFilms['listeFilms']));
            //listeMembres = reponse;
            console.log(reponse);
        	//montrerVueMembre("listerMembres", listeMembres);
        },
        fail : (err) => {
            //Décider du message
        }
    })
});


//afficher 
let montrerVueMembre = (action, donnees) => {
	msgErr = "Problème côté serveur. Essayez plus tard!";
    switch(action){
        case "enregistrer"  :
        case "modifier"     :
        case "enlever"      :
            if(donnees.OK){
                afficherMessage(donnees.msg);
            }else{
                console.log(donnees.OK);
                console.log(donnees.msg);
                afficherMessage(msgErr); 
            }
        break;
        case "listerMembres"       :
            if(donnees.OK){
                listerMembres(donnees.listeMembres);
            }else{
                afficherMessage(msgErr); 
            }
		break;
    }
}


//Vue admin pour CRUD Membres*****

let remplirCardM = (unMembre)=> {
	lienImage = chargerImageM(unMembre.photo,unMembre.sexe);
    let status = assignStatus(unMembre.statut);
	let rep ='<div class="card card-adminM">';
    rep +='<div class="id-adminM"><p class="" id="idMembre">'+unMembre.idm+'</p></div>';
	rep +='<div class="img-adminP"><img src="'+lienImage+'" class="img-fluid rounded-start"></div>';
	rep +='<div class="nom-adminM"><h5 class="card-title">'+unMembre.prenom+' '+unMembre.nom+'</h5></div>';
	rep +='<div class="courriel-adminM">'+unMembre.courriel+'</div>';
    rep +='<div class="daten-adminM">'+unMembre.datenaissance+'</div>';
	rep +='<div class="sexe-adminM">'+unMembre.sexe+'</div>';
    rep +='<div class="statut-adminM"><div class="form-btnactive-membre">';
    rep +='<div class="form-check form-switch">';
    rep +='<input class="form-check-input boutons-adminP" type="checkbox" role="switch" id="flexSwitchCheckDefault" '+status+'>';
    rep+= '</div><label class="form-check-label" for="flexSwitchCheckDefault">Active</label></div>'
	rep +='</div></div>';
	return rep;
}

let enteteMembres = ()=> {
	let rep ='<div class="card cardEntete-adminM">';
    rep +='<div class="id-adminM titre">ID</div>';
	rep +='<div class="img-adminP titre">Photo</div>';
	rep +='<div class="nom-adminM titre">Nom</div>';
	rep +='<div class="courriel-adminM titre">Courriel</div>';
	rep +='<div class="daten-adminM titre titreM">Date de naissance</div>';
    rep +='<div class="sexe-adminM titre titreM">Sexe</div>';
	rep +='<div class="boutons-adminP titre titreM">Statut</div>';
	rep +='</div>';
	return rep;
}

let listerMembres = (listeMembres) => {
    let contenu = enteteMembres();
    contenu += `<div class="row row-cols-4 container-membres">`;
    for (let unMembre of listeMembres){
            contenu+=remplirCardM(unMembre);
    } 
    contenu += `</div>`;
    document.getElementById('contenuMembres').innerHTML = contenu;
}

function chargerImageM(image,sexe){
	lien ='../membre/photos/'+image;
    lienF ='../membre/photos/avatar-membre-f.png';
    lienM ='../membre/photos/avatar-membre-m.png';
    //console.log(lien);
    if (image != ""){
        return lien;
    }else {
        if(sexe == "F") return lienF;
        return lienM; 
    } 
	
}

function assignStatus(statut){
    if (statut == 'A') {
        return "checked";}
    else if(statut == 'I'){
        return "";
    }
}