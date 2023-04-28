import enviroment from "./config.js"

const API = "https://api.github.com/users/Jahn13"
const containerProjects = document.querySelector("#containerCards")

const repoData = (data) =>  {
    let guardarCards = "";

    data.forEach(element => {
    let cards = `
    <div class="card mb-3 col-12 col-md-6 col-lg-4">
        <div class="row g-0">
            <div class="col-md-4">
                <img src="${element.owner.avatar_url}" class="img-fluid rounded-start" alt="...">
            </div>
            <div class="col-md-8">
                <div class="card-body">
                    <h5 class="card-title">${element.name}</h5>
                    <p class="card-text">${element.description}</p>
                    <a href="${element.html_url}" target="__Blank" class="btn btn-primary">Ir al repositorio</a>
                </div>
            </div>
        </div>
    </div>
    `
    guardarCards += cards
    });
    containerProjects.innerHTML = guardarCards;
}

const fetchData = async (url) => {
    try{
        let options = {
            "headers":
            {
                "Authorization": `token ${(enviroment.TOKEN_GITHUB)}`
            }
        }
        let response = await fetch(url, options);
        let data = await response.json();
        let repos = await fetch(data.repos_url, options);
        let responseRepos = await repos.json();
        
        repoData(responseRepos);
    }catch(error){
        console.log(error)
    }
}

fetchData(API);


