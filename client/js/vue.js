//modal Enregistrer un membre
const modalEnregMembres = () => {
    return `
    <!-- Modal enregistrer Membre -->
    <div class="modal fade" id="modalEnregMembre" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="exampleModalLabel">Enregistrement d'un membre</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body modal-body-bg">
                    <!-- Formulaire enregistrer Membre -->
                    <form id="formEnregMembre" action="serveur/membre/enregistrerMembre.php" method="POST" enctype="multipart/form-data" class="row g-3" onsubmit="return validerFormEnreg()">
                        <div class="col-md-6">
                            <label for="nom" class="form-label">Nom :</label>
                            <input type="text" class="form-control is-valid" id="nom" name="nom" required>
                        </div>
                        <div class="col-md-6">
                            <label for="prenom" class="form-label">Prénom :</label>
                            <input type="text" class="form-control is-valid" id="prenom" name="prenom" required>
                        </div>
                        <div class="col-md-12">
                            <label for="courriel" class="form-label">Courriel :</label>
                            <input type="email" class="form-control is-valid" id="courriel" name="courriel" required>
                        </div>
                        <div class="col-md-12">
                            <label for="sexe" class="form-label">Sexe :</label>
                            <div class="form-check">
                                <input class="form-check-input" type="radio" name="sexe" id="S1" value="F">
                                <label class="form-check-label" for="S1">
                                    Féminin
                                </label>
                            </div>
                            <div class="form-check">
                                <input class="form-check-input" type="radio" name="sexe" id="S2" value="M" checked>
                                <label class="form-check-label" for="S2">
                                    Masculin
                                </label>
                            </div>
                            <div class="form-check">
                                <input class="form-check-input" type="radio" name="sexe" id="S3" value="A">
                                <label class="form-check-label" for="S3" style="margin-bottom: 10px;">
                                    Je préfére ne pas répondre
                                </label>
                            </div>
                        </div>
                        
                        <div class="col-md-6">
                            <label for="daten" class="form-label">Date de naissance :</label>
                            <input type="date" class="form-control is-valid" id="daten" name="daten" required>
                        </div>
                        <div class="col-md-12">
                            <label for="password" class="form-label">Mot de passe :</label>
                            <font size="2pt"><i><p>(8 à 10 caractères: au moins 1 majuscule, 1 minuscule, 1 chiffre et 1 symbole)</p></i></font>
                            <input type="password" class="form-control is-valid" id="password" name="password" minlength="8" maxlength="10" pattern="(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[\\.\\*\\-\\#\\?\\!@\\$%\\^&_]).{8,10}" required>
                        </div>
                        <div class="col-md-12">
                            <label for="cpassword" class="form-label">Confirmation mot de passe :</label>
                            <input type="password" class="form-control is-valid" id="cpassword" name="cpassword" pattern="(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[\\.\\*\\-\\#\\?\\!@\\$%\\^&_]).{8,10}" required>
                        </div>
                        <span style="color:red" id="msge"></span>
                        <div class="col-md-12">
                            <label for="photo" class="form-label">Photo</label>
                            <input type="file" class="form-control is-valid" id="photo" name="photo[]">
                        </div>
                        <div class="col-12 btn-enreg">
                        <br>
                            <button class="btn btn-primary" type="submit">S'enregistrer</button>
                            <button class="btn btn-danger" type="reset">Vider</button>
                        </div>
                    </form>
                    <!-- Fin du formulaire enregistrer Membre -->
    `
}

//afficher modal Enregistrer un membre
const montrerFormEnregMembre = () => {
    document.getElementById('idForms').innerHTML = modalEnregMembres(); 
    const modalEnregMembre = new bootstrap.Modal('#modalEnregMembre', {
    
      })
      modalEnregMembre.show(); 
}

//modal Connexion 
const modalConnexionUtilisateurs = () => {
    return `
    <!-- Modal connexion membre ou admin -->

    <div class="modal fade" id="modalConnexion" tabindex="-1" aria-labelledby="ModalConnexionLabel" aria-hidden="true">
        <div class="modal-dialog modal-login">
            <div class="modal-content modal-content-connexion">
            <form class="" id="formConnexion" action="serveur/connexion/controleurConnexion.php" method="POST">
                <div class="modal-header">
                    <h5 class="modal-title" id="ModalConnexionLabel">Connexion</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body modal-body-connexion">
                    <p class="logo-connexion">Pâte-à-Pouf</p>
                    
                        <div class="container-3 container">
                            <img src="client/images/general/logo.png" loading="lazy" alt="pate" class="image-modal">
                        </div>
                        <div class="form-group">
                            <label for="courrielco" class="form-label">Courriel</label>
                            <input type="email" class="form-control" id="courrielco" name="courrielco" value="" required>
                        </div>
                        <div class="form-group">
                            <div class="clearfix">
                            <label for="passwordco" class="form-label">Mot Passe</label>
                            <a href="#" class="float-right text-muted"><small>Oublié ?</small></a>
                            </div>
                            
                            <input type="password" class="form-control" id="passwordco" name="passwordco" required="required">
                        </div>
                    
                </div>
                <div class="modal-footer justify-content-between">
                <label class="form-check-label"><input type="checkbox"> Remember me</label>
                        <div class="">
                        <input type="hidden" name="action" value="connexion">
                            <button class="btn btn-primary" type="submit">Connexion</button>
                        </div>
                </div>
                </form>
            </div>
        </div>
    </div>
    <!-- Fin du formulaire connexion membre ou admin -->
    `
}

//afficher modal Connexion
const montrerFormConnexion = () => {
    document.getElementById('idForms').innerHTML = modalConnexionUtilisateurs(); 
    const modalConnexion = new bootstrap.Modal('#modalConnexion', {    
      })
      modalConnexion.show(); 
}



//modal Ajout
const modalAjoutProduit = () => {
    return `
            <div class="modal fade" id="modalAjoutProduit" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h1 class="modal-title fs-5" id="exampleModalLabel">Ajout d'un produit</h1>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Fermer"></button>
                        </div>
        
                        <div class="modal-body modal-body-bg">
                            <form id="formAjoutProduit" class="row g-3">
                                <div class="col-md-6">
                                    <label for="nom" class="form-label">Nom :</label>
                                    <input type="text" class="form-control is-valid" id="nom" name="nom" required>
                                </div>

                                <div class="col-md-6">
                                    <label for="categorie" class="form-label">Catégorie :</label>
                                    <select class="form-select" id="categorie" aria-label="Floating label select example">
                                        <option value="pâtes alimentaires">pâtes alimentaires</option>
                                        <option value="sauce">sauce</option>
                                        <option value="fromage">fromage</option>
                                        <option value="prêt-à-manger">prêt-à-manger</option>
                                    </select>
                                </div>

                                <div class="col-md-12">
                                    <label for="ingredients" class="form-label">Ingrédients :</label>
                                    <input type="text" class="form-control is-valid" id="ingredients" name="ingredients" required>
                                </div>

                                <div class="col-md-6">
                                    <label for="prix" class="form-label">Prix en $ :</label>
                                    <input type="number" class="form-control is-valid" step="0.01" id="prix" name="prix" required>
                                </div>
        
                                <div class="col-md-6">
                                    <label for="quantite" class="form-label">Quantité :</label>
                                    <input type="number" class="form-control is-valid" id="quantite" name="quantite" required>
                                </div>

                                <div class="col-md-12">
                                    <label for="photo" class="form-label">Photo :</label>
                                    <input type="file" class="form-control is-valid" id="photo" name="photo">
                                </div>

                                <div class="col-12 btn-ajouter-produit">
                                    <br>
                                    <button class="btn btn-primary" onClick="requeteEnregistrer();">Ajouter le produit</button>
                                    <button class="btn btn-danger" type="reset">Effacer</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
    `;
}

//afficher modal Ajout
const montrerFormAjoutProduit = () => {
    document.getElementById('idFormProduit').innerHTML = modalAjoutProduit();
    const modalAjout = new bootstrap.Modal('#modalAjoutProduit', {});
    modalAjout.show();
}

//modal Modif
const montrerFormModification = () => {
    return `
        <div class="modal fade" id="modalModificationProduit" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="exampleModalLabel">Modifier le produit</h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Fermer"></button>
                    </div>

                    <div class="modal-body modal-body-bg">
                        <form id="formModif" method="POST" class="row g-3">
                            <input type="hidden" id="idProduit" name="idProduit">

                            <div class="col-md-6">
                                <label for="nom" class="form-label">Nom :</label>
                                <input type="text" class="form-control is-valid" id="nom" name="nom" required>
                            </div>

                            <div class="col-md-6">
                                <label for="categorie" class="form-label">Catégorie :</label>
                                <select class="form-select" id="categorie" aria-label="Floating label select example">
                                    <option value="pâtes alimentaires">pâtes alimentaires</option>
                                    <option value="sauce">sauce</option>
                                    <option value="fromage">fromage</option>
                                    <option value="prêt-à-manger">prêt-à-manger</option>
                                </select>
                            </div>

                            <div class="col-md-12">
                                <label for="ingredients" class="form-label">Ingrédients :</label>
                                <input type="text" class="form-control is-valid" id="ingredients" name="ingredients" required>
                            </div>

                            <div class="col-md-6">
                                <label for="prix" class="form-label">Prix en $ :</label>
                                <input type="number" class="form-control is-valid" step="0.01" id="prix" name="prix" required>
                            </div>

                            <div class="col-md-6">
                                <label for="quantite" class="form-label">Quantité :</label>
                                <input type="number" class="form-control is-valid" id="quantite" name="quantite" required>
                            </div>

                            <div class="col-md-12">
                                <label for="photo" class="form-label">Photo :</label>
                                <input type="file" class="form-control is-valid" id="photo" name="photo">
                            </div>

                            <div class="col-12 btn-modifier-produit">
                                <br>
                                <button class="btn btn-primary" onClick="modifierProduit();">Modifier le produit</button>
                                <button class="btn btn-danger" type="reset">Effacer</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    `;
}

//afficher modal Modif
const remplirFormulaireModification = (ProduitAEditer) => {
    document.getElementById('idModificationProduit').innerHTML= montrerFormModification();
    
    document.getElementById('idProduit').value= ProduitAEditer.IdP;
    document.getElementById('nom').value= ProduitAEditer.nom;
    document.getElementById('categorie').value= ProduitAEditer.categorie;
    document.getElementById('ingredients').value= ProduitAEditer.ingredients;
    document.getElementById('prix').value= ProduitAEditer.prix;
    document.getElementById('quantite').value= ProduitAEditer.quantite;

    let categorieSelect = document.getElementById('categorie');
    for (let option of categorieSelect.options){
        if (option.value == ProduitAEditer.categorie){
            option.selected = true;
            break;
        }
    }

    const modalModification = new bootstrap.Modal(document.getElementById('modalModificationProduit'), {});
    modalModification.show();
}

//afficher Toast
let montrerToast = (msg, type) =>{
	if(msg.length > 0){
        let textToast;
        if (type == 1){
            textToast = document.getElementById("textToast");
            var toastElList = [].slice.call(document.querySelectorAll('.toast.posToast'));
        } else {
            textToast = document.getElementById("textToastOptions");
            var toastElList = [].slice.call(document.querySelectorAll('.toast.posToastCourant'));
        }
		
		var toastList = toastElList.map(function (toastEl) {
			return new bootstrap.Toast(toastEl);
		})
		textToast.innerHTML = msg;

		toastList[0].show();
	}
}