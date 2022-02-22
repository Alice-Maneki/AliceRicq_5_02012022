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

/* afficher le numéro de commande pour confirmer la commande : requête Post de l'API et rediriger vers la page confirmation */
/* numéro affiché mais NON STOCKE */



}