/* lié au fichier index.html */
/* requéter l'API pour lui demander l'ensemble des produits : pour chaque élément = image, nom, description
récupérer la réponse émise et la parcourir pour utiliser chaque élément (produit) 
en cliquant sur le produit on est rediriger sur la page produit correspondante */

fetch('http://localhost:3000/api/products')
    .then(function(res) {
        if (res.ok){
            return res.json();
        }
    })
    .then(function(value){
        var kanapAll = value;
        kanapAll.forEach(element => {
            kanapItem.innerHTML +=
            `<a href="./product.html?id=${element._id}">
                <article>
                    <img src=${element.imageUrl} alt=${element.altTxt}>
                    <span class="kanapName">${element.name}</span>
                    <p class="kanapDescription">${element.description}</p>
                </article>
            </a> `
        });
    })
    .catch(function(err) {
        console.log("Une erreur est survenue !");
    });

var kanapItem = document.getElementById("items");
/* fonction de recherche d'élt du DOM */
