 /* afficher le numéro de commande pour confirmer la commande : requête Post de l'API et rediriger vers la page confirmation */
/* numéro affiché mais NON STOCKE */


let orderId = document.getElementById("orderId");
const urlConfirmation = window.location.search;
const urlSearchParams = new URLSearchParams(urlConfirmation);
let order = localStorage.getItem("myorder");
orderId.innerHTML = order ;
/* quand la page confirmation se charge le localStorage se vide : le numéro n'est pas stocké */
localStorage.clear();

