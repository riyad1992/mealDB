
document.getElementById('error-message').style.display = 'none'
const searchFood = () => {
    const searchField = document.getElementById('input-field');
    const searchText = searchField.value;
    searchField.value = '';
    if(searchText == ''){
        document.getElementById('error-message').style.display = 'block'
    }else{
        document.getElementById('error-message').style.display = 'none'
        const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchText}`
        fetch(url)
        .then(res => res.json())
        .then(data => displayFood(data.meals))
    }
}

const displayFood = foods => {
    const displayDiv = document.getElementById('display-div');
    displayDiv.textContent = ''
    foods.forEach(food => {
        const div = document.createElement('div');
        div.classList.add('col')
        div.innerHTML = `
        <div onclick = "foodDetails('${food.idMeal}')" class="card">
            <img src="${food.strMealThumb}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">${food.strMeal}</h5>
                <p class="card-text">${food.strInstructions.slice(0, 250)}.</p>
            </div>
        </div>`
        displayDiv.appendChild(div)
    })
}

const foodDetails = details => {
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${details}`
    fetch(url)
    .then(res => res.json())
    .then(data => displayDetails(data.meals[0]))
}

const displayDetails = selectFood => {
    const detailsDiv = document.getElementById('details')
    detailsDiv.classList.add('card')
    detailsDiv.innerHTML = `
    <img src="${selectFood.strMealThumb}" class="card-img-top" alt="...">
    <div class="card-body">
        <h5 class="card-title">${selectFood.strMeal}</h5>
        <p class="card-text">${selectFood.strInstructions.slice(0, 250)}</p>
        <a href="${selectFood.strYoutube}" class="btn btn-primary">Go somewhere</a>
    </div>`
}