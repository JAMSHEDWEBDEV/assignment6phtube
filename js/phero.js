
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
        // console.log(card)
        const singleCard = document.createElement('div');
        singleCard.classList = 'card bg-base-100 shadow-xl my-10 border p-5';
        singleCard.innerHTML = `
        <figure><img src="${card.thumbnail}" alt="Shoes" /></figure> 
                <div class="flex justify-between px-2 mt-5">
                    <div class="w-[20%] h-[20%]">
                        <img src=" ${card.authors[0].profile_picture} " class="rounded-full"/>
                    </div>
                    <div class="pl-5 w-[80%]">
                        <div class="flex justify-between">
                        <h1 class="text-xl font-bold">${card.authors[0].profile_name}</h1>
                        <div>${card.authors[0].verified? '<span class ="bg-blue-500 text-xl px-3 py-1 rounded-full"><i class="fa-solid fa-check"></i></span>' : ""}</div>
                        </div>
                        <h2 class="card-title">
                        </h2>
                        <p>If a dog chews shoes whose shoes does he choose?</p>
                      </div>
                </div>
        `;
        cardContainer.appendChild(singleCard);

    })


}

dataLoad();