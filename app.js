
let api = "http://www.omdbapi.com/?apikey=c0508096&t=";

let title = document.querySelector('.Movietitle');
let genre = document.querySelector('#genre');
let description = document.querySelector('#desc');
let actors = document.querySelector('#actors');
let director = document.querySelector('#director');
let award = document.querySelector('#award');
let collection = document.querySelector('#collection');
let lan = document.querySelector('#lang');
let rating = document.querySelector('#ratings');
let poster = document.querySelector('#poster');
let container = document.querySelector('.container');
let error = document.querySelector('#error');
let suggestion = document.querySelector('.suggestion');
addContainer();

function addContainer(){
    container.classList.add('hidden');
}

movieDetails=(data)=>{
    title.innerText = data.Title;
    genre.innerText = data.Genre;
    description.innerText = data.Plot;
    actors.innerText = data.Actors;
    director.innerText = data.Director;
    award.innerText = data.Awards;
    collection.innerText = data.BoxOffice;
    lan.innerText = data.Language;
    rating.innerText = data.imdbRating;
    poster.src = data.Poster;
}

function suggestions(data){
    suggestion.classList.remove('worth-watch','Time-waste');
        if(data.imdbRating >7){
            suggestion.innerText = "Worth Watching!";
            suggestion.classList.add('worth-watch');
        }else if(data.imdbRating >6 && data.imdbRating <=7){
            suggestion.innerText = "Can watch";
        }else{
            suggestion.innerText = "Time Waste";
            suggestion.classList.add('Time-waste');
        }
}


function search(){
    
    let movieInput = document.querySelector('#movieName');
    let query = api + movieInput.value;
    fetch(query).then(data=> data.json()).then(data=>{
        
        error.innerText = "";
        if(data.Error === 'Incorrect IMDb ID.'){
            addContainer();
            error.innerText = "Please Search valid name!";
        }else if(data.Error === 'Movie not found!'){
            addContainer();
            error.innerText = "Movie not found!";    
        }
        else{
            container.classList.remove('hidden');
            movieDetails(data);
            
            suggestions(data);
        }
    })
    
}