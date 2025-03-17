document.getElementById("navbar").style.display = "none";
document.getElementById("toggle").style.display = "none";
document.getElementById("toggle_2").style.display = "none";


document.getElementById('Get_Started').addEventListener("click",
    function (event) {
        event.preventDefault();
        const acountName = document.getElementById("Acount_name").value;
        const PIN = document.getElementById("pin").value;
        const convertPin = parseInt(PIN)
        if (acountName === "test") {
            if(convertPin === 123456){
            document.getElementById("banner").style.display = "none";
            document.getElementById("navbar").style.display = "block";
            document.getElementById("toggle").style.display = "block";
            document.getElementById("toggle_2").style.display = "block";
            }
            else {
                alert("This pin is wrong")
            }
        }
        else {
            alert("This name is wrong")
        }
    })
    document.getElementById("logut").addEventListener("click",
        function () {
            document.getElementById("banner").style.display = "block";
            document.getElementById("navbar").style.display = "none";
            document.getElementById("toggle").style.display = "none";
            document.getElementById("toggle_2").style.display = "none";
        }
    )
function removeActiveClass() {
    const activeButtons = document.getElementsByClassName("active");
    for (let btn of activeButtons) {
        btn.classList.remove("active");
    }
}

function loadButton() {
   
    fetch("https://openapi.programming-hero.com/api/levels/all")
        .then((res) => res.json())
        .then((data) => displayButton(data.data));

}

const loadlesoncard = (level_no) => {
    const url = `https://openapi.programming-hero.com/api/level/${level_no}`;
    fetch(url)
        .then((res) => res.json())
        .then((data) => {
            removeActiveClass();
            const clickedButton = document.getElementById(`btn-${level_no}`);
            console.log(clickedButton)
            clickedButton.classList.add("active");
            displayCard(data.data)
        });
    
};
const loadCardDetails = (cardId) => {
    const url = `https://openapi.programming-hero.com/api/word/${cardId}`;
    fetch(url)
        .then((res) => res.json())
        .then((data) => displayCardDetails(data.data));
}

const displayCardDetails = (data) => {
    document.getElementById("Card_details").showModal();
    const detailsContainer = document.getElementById("details-container");
    const synonymsDiv = document.getElementById("synonyms");
    let words = data.synonyms.map(valeu => valeu );

    detailsContainer.innerHTML = `
    <h3 class="text-lg font-bold">${data.word} ( ${data.pronunciation} )</h3>
                    <p class="py-4 font-bold">Meaning</p>
                    <p>${data.meaning ? data.meaning : "অর্থ নেই"}</p>
                    <p class="py-4 font-bold">Example</p>
                    <p>${data.sentence}</p>
                    <p class="py-4 font-bold">সমার্থক শব্দ গুলো</p>
                     <div id="synonyms">${words}</div> 
                    
    
    `;
};

function displayCard(cards) {
    const cardContainer = document.getElementById("allCard");
    cardContainer.innerHTML = "";
    if (cards.length == 0) {
        cardContainer.innerHTML = `
        <div class="bg-slate-100 py-20 w-11/12 mx-auto mt-6 rounded-xl col-span-full flex flex-col justify-center items-center text-center">
                    <img src="assets/alert-error.png" alt="">
        <p class="flex justify-center">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
                    <p class="text-2xl text-gray-600 font-bold flex justify-center">নেক্সট Lesson এ যান</p>
                </div>
        `;
        return;
    }
    for (let card of cards) {
        const cardDiv = document.createElement("div");
        cardDiv.innerHTML = `
                <div id="card-${card.id}" class="bg-slate-50 p-10 hover:bg-slate-100 shadow-lg rounded-lg">
                    <div class=" grid justify-center items-center">
                        <h3 class="text-2xl font-bold flex justify-center">${card.word}</h3>
                        <p class="my-2 flex justify-center">meaning / pronunciation</p>
                        <h3 class="text-xl font-bold flex justify-center">${card.meaning ? card.meaning : "অর্থ নেই"} / ${card.pronunciation}</h3>
                    </div>
                    <div class="flex justify-between pt-4">
                        <button onclick=loadCardDetails('${card.id}')> <i class="fa-solid fa-circle-info p-3 bg-slate-200 hover:bg-slate-300 rounded-sm"></i></button>
                        
                        <i class="fa-solid fa-volume-high p-3 bg-slate-200 hover:bg-slate-300 rounded-sm"></i>
                    </div>
                </div>
                
      `;
        cardContainer.append(cardDiv);
    }
}

function displayButton(buttons) {
    const buttonContainer = document.getElementById("allButton");
    for (let btn of buttons) {
        const buttonDiv = document.createElement("div");

        buttonDiv.innerHTML = `
          <button id="btn-${btn.level_no}"onclick="loadlesoncard(${btn.level_no})" class="btn btn-dash btn-primary"><i class="fa-solid fa-book-open"></i>Lesson- ${btn.level_no}</button>
          `;
        buttonContainer.append(buttonDiv);
    }
}
loadButton()
