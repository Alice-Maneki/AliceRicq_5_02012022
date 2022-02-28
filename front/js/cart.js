/* lié au fichier cart.html et confirmation.html */

/* afficher un tableau récapitulatif des achats dans la page Panier : récupérer via le localStorage !attention à ne pas dupliquer les éléments! */

let productInCart = JSON.parse(localStorage.getItem("productToCart"));
    
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
            }
/* afficher le total: quantité et prix du panier */

    function totalQuantity(){
      let arrayQuantity = [];
      for (let product of productInCart){
        arrayQuantity.push(product.quantityKanap);
        const reducer = (previousValue, currentValue) => previousValue + currentValue;
        let quantity = arrayQuantity.reduce(reducer);
        document.getElementById("totalQuantity").innerText= totalQuantity;  
       }
    }

    function totalPrice(){
      let arrayPrice = [];
      let totalPriceEach = "";
      for(let product of productInCart){
        totalPriceEach = product.priceKanap * product.quantityKanap;
        arrayPrice.push(totalPriceEach);
        const reducer = (previousValue, currentValue) => previousValue + currentValue;
        let totalPriceCart = arrayPrice.reduce(reducer);
        document.getElementById("totalPrice").innerText = totalPriceCart;
      }
    }

/* gérer la modification et la suppression de produits dans la page Panier : attention à modifier le DOM mais aussi localStorage */

      let deleteProduct = document.getElementsByClassName("deleteItem");
      
     
          

          
    
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
let form = document.getElementsByClassName("cart__order__form"); 
let formValid = document.getElementById("order");
  formValid.addEventListener("click", function(evt) {evt.preventDefault();
  if( formFirstName.value || formLastName.value || formAdress.value || formCity.value || formEmail.value) {
      const order = document.getElementById('order')
      order.setAttribute('value', 'Votre commande à été envoyée')
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

    let sendorder = {contact, products};
    console.log(sendorder);

  fetch("http://localhost:3000/api/products/order"  , {
      method: "POST",
      body: JSON.stringify(sendorder),
      headers: {
          "content-type" : "application/json",
      }   
  })
  
  .then(res => {
      return res.json();
  }).then((data) => {
      let orderId = data.idKanap;
     window.location.href= `./confirmation.html?id=${orderId}` ; 
    console.log(orderId);
  }).catch((error) =>{
      console.log(error);
  })
}
/* afficher le numéro de commande pour confirmer la commande : requête Post de l'API et rediriger vers la page confirmation */
/* numéro affiché mais NON STOCKE */
    let params = new URL(document.location).searchParams;
    let id = params.get("id");
    console.log(id);

    const numOrder = document.getElementById("orderId");
    numOrder.innerHTML = id
    localStorage.clear()

  })
  