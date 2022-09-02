const loadAllProduct = async ()=>{
const res = await fetch("https://fakestoreapi.com/products");
const data = await res.json();
return data;


}
const setAllMenu = async ()=>{
const data = await loadAllProduct();
const menu = document.getElementById("menu");
const uniqueArray =[];

for (const product of data){
  
                 if(uniqueArray.indexOf(product.category)===-1){
                    uniqueArray.push(product.category);
                    const li = document.createElement('li')
                    li.innerHTML=`
                                <a>${product.category}</a>`;
                                 menu.appendChild(li);
                 }
}
}

setAllMenu();


const searchFild = document.getElementById("search-field");
searchFild.addEventListener("keypress", async(event)=>{
     if(event.key === "Enter"){
        const searchValue = searchFild.value;
        const allProduct = await loadAllProduct();
        const foundProduct = allProduct.filter(product=> product.category.includes(searchValue))

        const productsContainer = document.getElementById("products-container");
        productsContainer.innerHTML="";
        const notFound = document.getElementById("not-found") ;
        notFound.textContent="";
        if (foundProduct.length === 0 ){
            notFound.innerHTML =`<h2 class="text-2xl text-orange-500 text-center">Not Found</h2>`
            return;
        }

        foundProduct.forEach(product => {
            const {category, image, title, description, count, rate} = product;

            const div = document.createElement("div");
            div.innerHTML = `<div class="card card-compact w-full bg-base-100 shadow-xl">
            <figure><img src=${image} alt="Shoes" class="h-60 w-full" /></figure>
            <div class="card-body">
              <h2 class="card-title">${category}</h2>
              <p>${title.length > 20 ? title.slice(0,20) + '...' : title}</p>
              <div class="card-actions justify-end">
                <label for="my-modal-3" 
                onclick="showModal('${description}','${image}' ,'${count}' ,'${rate}')"  class="btn btn-primary modal-button">Show Detail</label>
              </div>
            </div>
          </div>`

          productsContainer.appendChild(div);
        });
     }
})



const showModal = (description, image, count, rate ) =>{
    const modalBody = document.getElementById("modal-body");
    modalBody.innerHTML = "";
    modalBody.innerHTML = `
    <p class="py-4">
    ${description}
    </p>
    <p class="py-4">
    ${count}
    </p>
    <p class="py-4">
    ${rate}
    </p>
    <img src="${image}"/>`

}
