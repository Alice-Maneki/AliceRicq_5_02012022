/* lié au fichier product.html */
/* faire le lien entre un pdt/page acceuil et un pdt/page pdt 
    attention à bien paramètrer pour chaque pdt la balise a et son href */

/* récupérer l'id du pdt à afficher */

const str = window.location.href;
const url = new URL(str);
const id = url.searchParams.get("id");
    
/* insérer un pdt et ses détails dans la page pdt grâce à l'API : on ne veut récupérer un seul et unique pdt ! */


const urlKanap = `http://localhost:3000/api/products/${id}`;
fetch(urlKanap)
    .then(function(res){
        if (res.ok){
            return res.json();
        }
    })
    .then(function(value){
    /* éléments du produit à afficher : photo, nom, prix, description, couleurs disponibles */
    let photo = document.querySelector(".item__img");
    const baliseImg = document.createElement("img");
    baliseImg.src = value.imageUrl; 
    baliseImg.alt = value.altTxt; 
    photo.appendChild(baliseImg); /* ajoute img dans le HTML */

    let productName = document.getElementById("title"); 
    productName.innerText = value.name; 

    let productPrice = document.getElementById("price");
    productPrice.innerText = value.price; 

    let productDescription = document.getElementById("description"); 
    productDescription.innerText = value.description; 

    let productColors = document.getElementById("colors"); 
    for (i = 0; i < value.colors.length; i++) {
      let option = document.createElement("option"); 
      option.setAttribute("value", value.colors[i]); 
      option.textContent = value.colors[i]; 
      productColors.appendChild(option); 
    }
                
/* utiliser localstorage pour accèder à l'array depuis page panier ! */
/* ajouter des pdts dans le panier: peut être un array qui contient = id produit, quantité et couleur du pdt */

    let arrayProduct =[]; /* tableau qui va regrouper les objets */

    var button = document.getElementById("addToCart");
        button.addEventListener("click",function(){    
            let choiceIdKanap = {/*objet*/
                colorKanap : document.getElementById('colors').value,
                idKanap : value._id,
                nameKanap : value.name,
                imgKanap : value.imageUrl,
                imgAltKanap : value.altTxt,
                quantityKanap : parseInt(document.getElementById('quantity').value),
                priceKanap : value.price
        }; 

  
/* signaler à l'utilisateur qu'il doit faire un choix de couleur et de quantité pour pouvoir ajouter au panier */
        if(choiceIdKanap.quantityKanap==0 || choiceIdKanap.quantityKanap==null){
                alert("Veuillez sélectionner une quantité pour ajouter votre article au panier");
                /* on n'ajoute pas l'élément dans le localStorage ! */
                
        }else if(choiceIdKanap.colorKanap==""){
                alert("Veuillez choisir une couleur pour ajouter votre article au panier");
                /* on n'ajoute pas l'élément dans le localStorage ! */
                
        }else{
            let foundProduct = arrayProduct.find(product => product.idKanap == choiceIdKanap.idKanap && product.colorKanap == choiceIdKanap.colorKanap);
             /* find() : permet de chercher un élément dans un tableau par rapport à une condition 
            si il trouve l'élément va le retourner
            sinon retourne undefined */
            if(foundProduct != undefined){
                /* il est différent de undefined donc il existe déja dans le panier */
                /* si le produit existe déjà dans le localStorage on change sa quantité */
                let newQuantity =  foundProduct.quantityKanap + choiceIdKanap.quantityKanap; 
                choiceIdKanap.quantityKanap = newQuantity;
                console.log(newQuantity);
                localStorage.setItem("productToCart",JSON.stringify(arrayProduct));
                alert("Votre produit a été ajouté au panier !");
            }else{
                /* sinon on le rajoute au localStorage */
                arrayProduct.push(choiceIdKanap);
                localStorage.setItem("productToCart",JSON.stringify(arrayProduct));
                alert("Votre produit a été ajouté au panier !");
            }
            
               
            }
                
               

        });     

                
        
    })