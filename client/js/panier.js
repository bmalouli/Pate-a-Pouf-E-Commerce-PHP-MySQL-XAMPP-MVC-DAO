const TAXES = 0.1556;
let panier = null;
let listeProduits = null;

$(document).ready(function() {
    let currentURL = window.location.pathname.split("/").pop()

    if (currentURL == "membre.php"){
        chargerProduitsPanier();
    }
    
});

let chargerProduitsPanier = () =>{
    $.ajax({
        type : "POST",
        url  : "../admin/routesProduits.php",
        data : {action:"lister"},
        dataType : "json", 
        success : (reponse) => {//alert(JSON.stringify(reponse['listeProduits']));
        	listeProduits = reponse['listeProduits'];
            //alert(listeProduits);
            
        },
        fail : (err) => {
            console.log(err);
        }
    })
}



let enleverArticle = (btnClose, idArticleEnlever) => {

    let montantArticle;
    if(btnClose.parentNode.previousSibling.nodeType == 3){//Noeud bidon type #text:espace
        montantArticle = parseFloat(btnClose.parentNode.previousSibling.previousSibling.firstChild.nodeValue);
    }else {
        montantArticle = parseFloat(btnClose.parentNode.previousSibling.firstChild.nodeValue);
    }
    let ancienTotal = parseFloat(document.getElementById("totalAchat").innerText); 
    let nouveauTotal = ancienTotal - montantArticle; //Pour mettre à jour la facture
    
    //Enlever l'article du visuel du panier
    let articleEnleverVisuelPanier = btnClose.parentNode.parentNode;
    articleEnleverVisuelPanier.parentNode.remove(articleEnleverVisuelPanier);

    //Mise à jour du localStorage
    let panier = [];
    panier = JSON.parse(localStorage.getItem("panier"));
    let items = panier.filter(element => element.id == idArticleEnlever);
    localStorage.setItem("panier", JSON.stringify(items));

    //mise a jour qte arts
    afficherqteProdPanier();
    mettreAJourLaFacture(nouveauTotal);
}

let mettreAJourLaFacture = (nouveauTotal) => {
    document.getElementById("totalAchat").innerText = nouveauTotal.toFixed(2) + "$";
    let montantTaxes = nouveauTotal * TAXES;
    let totalPayer = nouveauTotal + montantTaxes;
    document.getElementById("idTaxes").innerText = montantTaxes.toFixed(2) + "$"; 
    document.getElementById("totalPayer").innerText = totalPayer.toFixed(2) + "$"; 
}

let ajusterTotalAchat = (elemInput, prix, montantActuel) => {

    let ancienMontant;
    let qte = elemInput.value; 
    montantTotalCetArticle = (qte * prix);
    if(elemInput.parentNode.nextSibling.nodeType == 3){//Node bidon ajouté au DOM
        ancienMontant = parseFloat(elemInput.parentNode.nextSibling.nextSibling.firstChild.nodeValue);
        elemInput.parentNode.nextSibling.nextSibling.firstChild.nodeValue = montantTotalCetArticle+"$";
    }else {
        ancienMontant = parseFloat(elemInput.parentNode.nextSibling.firstChild.nodeValue);
        elemInput.parentNode.nextSibling.firstChild.nodeValue = montantTotalCetArticle+"$";
    }
    //Mise-à-jour de la facture
    let ancienTotal = parseFloat(document.getElementById("totalAchat").innerText); 
    let nouveauTotal = (ancienTotal - ancienMontant)+montantTotalCetArticle; 
    mettreAJourLaFacture(nouveauTotal);

    //ajuster local storage
    let numprod = elemInput.name;
    let panier = [];
    panier = JSON.parse(localStorage.getItem("panier"));
    let item = panier.find(element=> element.id == numprod);

    if(item !== undefined){
        item.quantite = Number(qte);
    }

    localStorage.setItem("panier", JSON.stringify(panier));
} 

let payer = () => {
    document.getElementById("payer").innerHTML = "Merci pour votre paiement.";
    localStorage.setItem("panier", '[]');
    let nbart = 0;
    afficherNbart = "(" + nbart + ")";
    $('#nbart').html(afficherNbart);
}

let afficherPanier = () => {

    let currentURL = window.location.pathname.split("/").pop()
    //console.log(currentURL);

    if (currentURL != 'membre.php'){
        let msg = "Veuillez vous connecter à votre session";
        montrerToast(msg,1);
    } else if ( currentURL == 'membre.php') {
        //Chercher produits dans localStorage
        let nbart = JSON.parse(localStorage.getItem("panier"));
        let nbartlength = nbart.length;
        let nbtotalart = 0;

        if (nbartlength != 0){
            nbtotalart = nbart.reduce(function(_this, val) {
                return _this + val.quantite
            }, 0);
        } else {
            nbtotalart = 0;
        }

        let panier = JSON.parse(localStorage.getItem("panier"));
        let vuePanier = `
            <div class="card-panier">
                <div class="row row-panier">
                    <div class="col-md paniercontainer">
                        <div class="title">
                            <div class="row">
                                <div class="col">
                                    <h4><b>Panier d'achats</b></h4>
                                </div>
                                <div class="col align-self-left text-right text-muted">${nbtotalart} articles</div>
                            </div>
                        </div> 
            `;
        let listeArticlesAchetes = [];
        let listeArticles = listeProduits;
        panier.forEach(articlels => {
            let articlepanier = articlels.id;
            Object(listeArticles).filter(element =>{
                if(articlepanier == element.IdP){
                    listeArticlesAchetes.push(element);
                }
            } );
            
        });
        //alert(JSON.stringify(listeArticlesAchetes));
        let totalAchat = 0;
        let montantTotalCetArticle;
        let qteart =0;
        for (let unArticle of listeArticlesAchetes) {
            panier.forEach(articlepanier => {
                if (articlepanier.id == unArticle.IdP){
                    qteart = articlepanier.quantite;
                };
                
            });
            montantTotalCetArticle = parseFloat(unArticle.prix);
            vuePanier += ` 
                <div class="row border-top border-bottom">
                    <div class="row align-items-center row-panier">
                        <div class="col-3 item-1"><img class="img-fluid" src="../../client/images/produits/${unArticle.photo}"></div>
                        <div class="col">
                            <div class="row text-muted item-2" style="flex-grow: 2">${unArticle.nom}</div>
                        </div>
                        <div class="col item-3"> <input type="number" id="qte" name="${unArticle.IdP}" min="1" max="100" value="${qteart}" onChange="ajusterTotalAchat(this,${unArticle.prix}, ${montantTotalCetArticle});"></div>
                        <div class="col item-4" style="flex-grow: 0.5">${montantTotalCetArticle}$</div>
                        <div class="col item-5" style="flex-grow: 0.5"><div class="close closeBtn" onClick="enleverArticle(this,${unArticle.IdP});">&#10005;</div></div>
                    </div>
                </div>
            
            `;
            totalAchat += montantTotalCetArticle;
        }

        let montantTaxes = totalAchat * TAXES;
        let totalPayer = totalAchat + montantTaxes;

        vuePanier += `
                </div>
                        <div class="col-md-4 text-dark facture">
                            <div>
                                <h5><b>Facture</b></h5>
                            </div>
                            <hr>
                            <br/>
                            <div class="row">
                                <div class="col" style="padding-left:10;">${nbtotalart} ARTICLES</div>
                                <div id="totalAchat" class="col text-right">${totalAchat.toFixed(2)}$</div>
                            </div>
                            <br/>
                            <div class="row">
                                <div class="col" style="padding-left:10;">MONTANT TAXES</div>
                                <div id="idTaxes" class="col text-right">${montantTaxes.toFixed(2)}$</div>
                            </div>
                            <br/>
                            <div class="row">
                                <div class="col" style="padding-left:10;">MONTANT À PAYER</div>
                                <div id="totalPayer" class="col text-right">${totalPayer.toFixed(2)}$</div>
                            </div> 
                            </br>
                            <button class="btn btn-dark" onclick="payer();">PAYER</button>
                            <span id="payer"></span>
                            <br/> 
                        </div>
                    </div>
                </div>
            `;
        $('#contenuPanier').html(vuePanier);
        document.getElementById("payer").innerHTML = "";
        let modalPanier = new bootstrap.Modal(document.getElementById('idModPanier'), {});
        modalPanier.show();

    }
    
}