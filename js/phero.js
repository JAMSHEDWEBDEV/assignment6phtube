
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
        const singleCard = document.createElement('div');
        singleCard.classList = 'card bg-base-100 shadow-xl my-10 border p-5';
        singleCard.innerHTML = `
        <figure><img src="${card.thumbnail}" class="h-[200px] w-full"/>
        </figure>
        <div class=" text-white text-center py-2 w-48 lg:w-52  ml-18 lg:ml-24 mt-[-40px]">${card.others.posted_date?secondToHour(`${card.others.posted_date}`):""}</div> 
             <div class="flex justify-between items-center px-2 mt-5">
                    <div>
                        <img src=" ${card.authors[0].profile_picture}"
                        class = "rounded-full w-14 h-14"/>
                    </div>
                    <div class="pl-5 w-[80%]">
                       <p class="text-xl font-bold my-3">${card.title}</p>
                        <div class="flex justify-start">
                        <h1 class="text-xl font-semibold">${card.authors[0].profile_name}</h1>
                        <div>${card.authors[0].verified? '<span class ="bg-blue-600 text-xl text-white px-1 rounded-full ml-2"><i class="fa-solid fa-check"></i></span>' : ""}</div>
                        </div>
                        <h2 class="card-title">${card.others.views}<span class="text-xl">Views</span></h2>
                      </div>
                </div>
        `;
        cardContainer.appendChild(singleCard);
    })

}
// second to minute to hour convert function
const secondToHour = (second)=>{
    const hour = Math.floor(second / 3600);
    const remainingSecond = second % 3600;
    const minute = Math.floor(remainingSecond / 60);
    return `<div class="bg-gray-500 py-1">${hour}hrs ${minute}min ago</div>`;
}
// button click to go another html page 
document.getElementById('click_another_page').addEventListener('click',function(){
    window.location.href="faq.html";
})


dataLoad();
btnHandler('1000');
