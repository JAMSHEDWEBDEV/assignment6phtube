
const dataLoad = async () => {
    const res = await fetch('https://openapi.programming-hero.com/api/videos/categories');
    const data = await res.json();
    const allData = data.data;
    // console.log(allData);

    // button data display
    const buttonContainer = document.getElementById('button_container');
    allData.forEach(category => {
        // console.log(category);
        const btn = document.createElement('div');
        btn.innerHTML = `
        <button onclick="btnHandler('${category.category_id}')" class="btn hover:bg-red-500 font-medium text-xl hover:text-white">${category.category}</button>
        `;
        buttonContainer.appendChild(btn);
    })
}

// button handler 
const btnHandler = async (id) => {
    // console.log(id);
    const res = await fetch(`https://openapi.programming-hero.com/api/videos/category/${id}`);
    const data = await res.json();
    const allCard = data.data;

    // card display  
    const cardContainer = document.getElementById('card_container');
    cardContainer.innerHTML = '';

    allCard.forEach(card => {
        console.log(card)
        const singleCard = document.createElement('div');
        singleCard.classList = 'card bg-base-100 shadow-xl my-10 border p-5';
        singleCard.innerHTML = `
        <figure><img src="${card.thumbnail}" /></figure> 
                <div class="flex justify-between items-center px-2 mt-5">
                    <div class="w-14">
                        <img src=" ${card.authors[0].profile_picture}"
                        class = "rounded-full"/>
                    </div>
                    <div class="pl-5 w-[80%]">
                       <p class="text-xl font-bold my-3">${card.title}</p>
                        <div class="flex justify-between">
                        <h1 class="text-xl font-semibold">${card.authors[0].profile_name}</h1>
                        <div>${card.authors[0].verified? '<span class ="bg-blue-600 text-2xl text-white px-3 py-1 rounded-full"><i class="fa-solid fa-check"></i></span>' : ""}</div>
                        </div>
                        <h2 class="card-title"><span class="text-xl font-bold">Views:</span> ${card.others.views}</h2>
                      </div>
                </div>
        `;
        cardContainer.appendChild(singleCard);

    })


}


dataLoad();
btnHandler('1001');
