<div role="alert" aria-live="assertive" aria-atomic="true" class="toast posToastCourant" data-bs-autohide="false" style="z-index: 1500000">
    <div class="toast-header">

            <img src="<?php require_once("img-toast.php") ?>" class="rounded mr-2">
            <p><strong class="mr-auto">MESSAGE</strong></p>

        <a id="fermerToast2" href="admin.php"><button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button></a>
    </div>
        <div id="textToastOptions" class="toast-body"></div>
        <div class="mt-2 pt-2 border-top centrerBoutons">
            <button type="button" class="btn btn-primary btn-sm boutonSupp" onClick="confirmationSuppression();" data-bs-dismiss="toast">Oui</button>
            <button type="button" class="btn btn-secondary btn-sm" data-bs-dismiss="toast">Non</button>
        </div>
</div>