function myMenuFunction(){
    var menuBtn = document.getElementById("myNavMenu");

    if(menuBtn.className === "nav-menu"){
        menuBtn.className +=" responsive";
    }else{
        menuBtn.className = "nav-menu"
    }
}


window.onscroll= function(){headerShadow()};

function headerShadow(){
    const navHeader = document.getElementById("header");
    if(document.body.scrollTop>50 || document.documentElement.scrollTop>50){
        navHeader.style.boxShadow = "0 1px 6px rgba(0, 0, 0, 0.1)";
        navHeader.style.height="70px"
        navHeader.style.lineHeight="70px"
    }else{
        navHeader.style.boxShadow = "none";
        navHeader.style.height="90px"
        navHeader.style.lineHeight="90px"
    }
}

// const search=document.querySelector('.search')
// const btn = document.querySelector('.search-btn')
// const input= document.querySelector('.input')

// btn.addEventListener('click',()=>{
//     search.classList.toggle('active')
//     input.focus()
// });

const ingredientsInput = document.querySelector(".ingredients");
const searchBtn=document.querySelector(".generate-btn")
const recipeResult = document.querySelector(".input")
const apikey="727ea2854390448a987cadef9c73be4e";
searchBtn.addEventListener("click",()=>{
     const ingredients=ingredientsInput.value.trim();
    fetchRecipies(ingredients);
});

const fetchRecipies= async(ingredients)=>{
    const response = await fetch(`https://api.spoonacular.com/recipes/findByIngredients?ingredients=${ingredients}&number=10&apiKey=${apikey}`);
    const recipes= await response.json();
    console.log(recipes)
    displayRecipes(recipes);
};

const displayRecipes = (recipes) => {
    const recipeContainer = document.querySelector(".result");
        recipeContainer.innerHTML=
        ` <div class="recipeResult"></div>
        <div class="recipeResult"></div>
        <div class="recipeResult"></div>`;
    
    const recipeContainers = document.querySelectorAll(".recipeResult");
    let containerIndex = 0; 

    recipes.forEach((recipe, index) => {
        const recipeCard = document.createElement("div");
        recipeCard.classList.add("card");
        recipeCard.innerHTML = `
            <div class="img">
                <img src="${recipe.image}" alt="Recipe Image"/>
            </div>
            <p>${recipe.title}</p>
            <button class="btn">See Recipe</button>
        `;

        recipeContainers[containerIndex].appendChild(recipeCard);
        if ((index + 1) % 3 === 0) {
            containerIndex++;
        }

        if (containerIndex >= recipeContainers.length) return;
    });

};


