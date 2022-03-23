/* lié au fichier cart.html et confirmation.html */

/* afficher un tableau récapitulatif des achats dans la page Panier : récupérer via le localStorage !attention à ne pas dupliquer les éléments! */
/* récupérer les éléments ajouter dans le localStorage et les afficher */
let productInCart = JSON.parse(localStorage.getItem("productToCart"));

if(productInCart === null || productInCart == 0){
  alert("Votre panier est vide");
}else{
  for(let product of productInCart){
    fetch('http://localhost:3000/api/products/' + product.idKanap) 
    .then(function(res){
        if (res.ok){
            return res.json();
        }
    })
    .then(
        document.getElementById("cart__items").innerHTML += 
        `<article class="cart__item" data-id=${product.idKanap} data-color=${product.colorKanap}>
        <div class="cart__item__img">
        <img src=${product.imgKanap} alt=${product.imgAltKanap}>
        </div>
        <div class="cart__item__content">
      <div class="cart__item__content__description">
        <h2>${product.nameKanap}</h2>
        <p>${product.colorKanap}</p>
        <p>${product.priceKanap} €</p>
      </div>
      <div class="cart__item__content__settings">
        <div class="cart__item__content__settings__quantity">
          <p>Qté : </p>
          <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value=${product.quantityKanap}>
        </div>
        <div class="cart__item__content__settings__delete">
          <p class="deleteItem">Supprimer</p>
        </div>
      </div>
    </div>
  </article>
    `
      
  )
/* afficher le total: quantité et prix du panier */

/* total quantité */
let totalQuantityCalcul = [];
let sum = 0;
for (let i=0;i<productInCart.length;i++){
  let quantityProduct = productInCart[i].quantityKanap;
  totalQuantityCalcul.push(quantityProduct);
  sum += productInCart[i].quantityKanap;
}
let totalQuantity = sum;
document.getElementById("totalQuantity").innerHTML = totalQuantity;

/* prix total */
/*déclaration de la variable où on va retrouver les prix présents dans le panier */
let totalPriceCalcul = [];
/* aller chercher les prix dans le panier */
for (let i=0;i<productInCart.length;i++){
  let priceProduct =  productInCart[i].priceKanap * productInCart[i].quantityKanap;
  totalPriceCalcul.push(priceProduct);
}
/* additionner les prix présents dans le tableau avec la méthode .reducer */
const reducer = (accumulator, currentValue) => accumulator + currentValue;
const totalPrice = totalPriceCalcul.reduce(reducer,0);
console.log(totalPrice);
/* le code HTML du prix total à afficher */
document.getElementById("totalPrice").innerHTML = totalPrice;


/* gérer la modification et la suppression de produits dans la page Panier : attention à modifier le DOM mais aussi localStorage */
/* modifier la quantité d'un produit directement sur la page panier si le produit existe déjà */
let quantityItem = document.getElementsByClassName(".itemQuantity");
quantityItem.forEach((tag) => {
  let article = tag.closest("article");
  let id = article.dataset.idKanap;
  let color = article.dataset.colorKanap;
  let newQuantity = "";
  tag.addEventListener("change", event => {
    event.preventDefault();
    newQuantity = Number(tag.value);
    productInCart.forEach((sofa) =>{
      if (sofa.idKanap == id && sofa.colorKanap == color ){
        sofa.quantityKanap = newQuantity;
        document.location.reload();
      }
    })
  })
}) 


/* sélection des réf de tous les éléments "supprimer" */
let deleteItem = document.querySelectorAll(".deleteItem");
console.log(deleteItem);
for (let i=0;i<deleteItem.length;i++){
  deleteItem[i].addEventListener("click", event => {
    event.preventDefault();
    console.log(event);
    /* sélection de l'id du produit à supprimer */
    let idDeleteItem = productInCart[i].idKanap;
    let colorDeleteItem = productInCart[i].colorKanap;
    console.log(idDeleteItem);
    console.log(colorDeleteItem);
    /* avec la méthode filter() je sélectionne les éléments à garder et je supprime les éléments où "supprimer" a été cliqué */
    productInCart = productInCart.filter(el => el.idKanap == idDeleteItem && el.colorKanap == colorDeleteItem);
    console.log(productInCart);
    console.log(productInCart.filter(el => el.idKanap == idDeleteItem && el.colorKanap == colorDeleteItem));
    /* la méthode filter crée et retourne un nouveau tableau contenant tous les éléments du tableau d'origine qui remplissent une condition déterminée par la fonction callback */
    /* on envoie les éléments non supprimés dans le localStorage */
    localStorage.setItem("productToCart", JSON.stringify(productInCart));
    alert("ce produit a été supprimé de votre panier !");
    /* recharger la page pour afficher le nouveau panier */
    document.location.reload();
    /* le nombre d'article total et le prix total sont mis à jour automatiquement quand la page se recharge */
    
    })

}
/* passer la commande : vérifier les données saisies et message d'erreur si nécessaire */
/*valider le first Name=prénom du formulaire */
let formFirstName = document.getElementById("firstName");
formFirstName.addEventListener('change', function() {validFirstName(this)});
const validFirstName =  function (inputFirstName){
  let FirstNameRegExp = new RegExp ('^[a-zA-Z-9áàâäãåçéèêëíìîïñóòôöõúùûüýÿæœÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ._\s -]*$', 'g');
  let testFirstName = FirstNameRegExp.test(inputFirstName.value)
  if(testFirstName){
    formFirstName.style.boxShadow ='0px 0px 10px grey'
    formFirstName.style.boxSizing = 'border-box'
  }else{
    formFirstName.style.boxShadow ='0px 0px 10px red'
    formFirstName.style.boxSizing = 'border-box'
    document.getElementById("firstNameErrorMsg").innerHTML = `"${inputFirstName.value} n'est pas valide !"`
  }    
};

/*valider le Last Name = Nom du formulaire */
let formLastName = document.getElementById("lastName");
formLastName.addEventListener('change', function() {validLastName(this)});
const validLastName =  function (inputLastName){
  let LastNameRegExp = new RegExp ('^[a-zA-ZáàâäãåçéèêëíìîïñóòôöõúùûüýÿæœÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ._\s -]*$', 'g');
  let testLastName = LastNameRegExp.test(inputLastName.value)
  if(testLastName){
    formLastName.style.boxShadow ='0px 0px 10px grey'
    formLastName.style.boxSizing = 'border-box'
  }else{
    formLastName.style.boxShadow ='0px 0px 10px red'
    formLastName.style.boxSizing = 'border-box'
    document.getElementById("lastNameErrorMsg").innerHTML = `"${inputLast.value} n'est pas valide !"`
  }    
};

/* valider le champ adresse */
let formAdress = document.getElementById("address");
formAdress.addEventListener('change', function() { validAdress(this)});
const validAdress =  function (inputAdress){
  let AdressRegExp = new RegExp ('^[a-zA-Z0-9áàâäãåçéèêëíìîïñóòôöõúùûüýÿæœÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ._\s -]*$', 'g');
  let testAdress = AdressRegExp.test(inputAdress.value)
  if(testAdress){
    formAdress.style.boxShadow ='0px 0px 10px grey'
    formAdress.style.boxSizing = 'border-box'
  }else{
    formAdress.style.boxShadow ='0px 0px 10px red'
    formAdress.style.boxSizing = 'border-box'
    document.getElementById("addressErrorMsg").innerHTML = `"${inputAdress.value} n'est pas valide !"`
  }    
};

/* valider le champ ville */
let formCity = document.getElementById("city");
formCity.addEventListener('change', function() {validCity(this)});
const validCity =  function (inputCity){
  let cityRegExp = new RegExp ('^[a-zA-Z-9áàâäãåçéèêëíìîïñóòôöõúùûüýÿæœÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ._\s-]*$', 'g');
  let testcity = cityRegExp.test(inputCity.value)
  if(testcity){
    formCity.style.boxShadow ='0px 0px 10px grey'
    formCity.style.boxSizing = 'border-box'
  }else{
    formCity.style.boxShadow ='0px 0px 10px red'
    formCity.style.boxSizing = 'border-box'
    document.getElementById("cityErrorMsg").innerHTML = `"${inputCity.value} n'est pas valide !"`
  }    
};

/*valider le champ email */
let formEmail = document.getElementById("email");
formEmail.addEventListener('change', function() {validEmail(this)});
const validEmail =  function (inputEmail){
  let emailRegExp = new RegExp ('^[a-zA-Z0-9ôöáàâäãåçéèêëíìîïñóòôöõúùûüýÿæœÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ._\s-]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$', 'g');
  let testEmail = emailRegExp.test(inputEmail.value)
  if(testEmail){
    formEmail.style.boxShadow ='0px 0px 10px grey'
    formEmail.style.boxSizing = 'border-box'
  }else{
    formEmail.style.boxShadow ='0px 0px 10px red'
    formEmail.style.boxSizing = 'border-box'    
    document.getElementById("emailErrorMsg").innerHTML = `"${inputEmail.value} n'est pas valide !"`
  }    
};

/*Envoi du formulaire si tous les champs sont valides */
let formValid = document.getElementById("order");
formValid.addEventListener("click", function(evt) {
  evt.preventDefault();
  if( !formFirstName.value || !formLastName.value || !formAdress.value || !formCity.value || !formEmail.value) {
    const order = document.getElementById('order');
    order.setAttribute('value', 'Veuillez remplir tous les champs du formulaire pour valider votre commande !');
    return evt.preventDefault();
  }else{
    const contact = {
      firstName: `${formFirstName.value}`,
      lastName: `${formLastName.value}`,
      address: `${formAdress.value}`,
      city: `${formCity.value}`,
      email: `${formEmail.value}`
    }
    localStorage.setItem("contact", JSON.stringify(contact));

    let products = [];
    for(i = 0; i < productInCart.length; i++){
      products.push(productInCart[i].idKanap)
    }

    let sendOrder = {contact, products};

    fetch("http://localhost:3000/api/products/order"  , {
      method: "POST",
      body: JSON.stringify(sendOrder),
      headers: {
        "content-type" : "application/json",    
    }   
  })
  .then(res => {
    return res.json();
  })

  .then((data) => {
      let orderId = data.orderId;
      localStorage.setItem("myorder",JSON.stringify(orderId));
      /* quand on valide la commande on est redirigé vers la page confirmation */
      window.location.href= "confirmation.html" ; 
      /* afficher le numéro de commande pour confirmer la commande : requête Post de l'API et rediriger vers la page confirmation */
/* numéro affiché mais NON STOCKE */
      const numberOrder = document.getElementById("orderId");
      numberOrder.innerHTML = orderId;
      console.log(orderId);
      
  })

  .catch((error) =>{
    console.log(error);
  })

}})}}
