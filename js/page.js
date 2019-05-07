moment.tz.setDefault('America/Phoenix');

const elms = {
  showtime: document.querySelector('#showtime span'),
  movieTitle: document.getElementById('movieTitle'),
  imdbLink: document.getElementById('imdb'),
  caseImages: document.getElementById('mediaCase'),
  runningTime: document.getElementById('runningTime'),
  rating: document.getElementById('rating'),
  commentary: document.getElementById('commentary'),
  description: document.getElementById('description'),
  previousMovies: document.getElementById('previous')
};

const emptyElm = function(elmName) {
  const elm = elms[elmName];
  console.log(elm);

  if(elm) {
    while (elm.firstChild) {
      elm.removeChild(elm.firstChild);
    }
  }  
}

const clearPage = function() {
  emptyElm('caseImages');
  emptyElm('description');
}

const load = function(movieIndex) {
  //clear out current elements
  clearPage();

  const movie = movieData[movieIndex];

  elms.showtime.innerHTML = moment(movie.showingDate).local().format('dddd, MMMM Do, YYYY[<br/>] LT');

  elms.movieTitle.innerHTML = movie.title;
  elms.imdbLink.href = 'https://www.imdb.com/title/' + movie.imdb;
  elms.runningTime.innerHTML = movie.runningTime;
  elms.rating.innerHTML = movie.rating;
  elms.commentary.innerHTML = movie.commentary;

  movie.backText.forEach(p => {
    const backTextP = document.createElement('p');
    backTextP.innerHTML = p;

    elms.description.appendChild(backTextP);
  });

  // Add the case images
  movie.images.forEach(img => {
    const imgElm = document.createElement('img');
    imgElm.src = movie.imagesLocation + '/' + img;
    imgElm.classList.add('image');
    imgElm.draggable = false;
    
    elms.caseImages.appendChild(imgElm);
  });

  // Set up the element switcher with the case images
  new Switcher(elms.caseImages);

  // Scroll to the top of the page
  window.scrollTo(0, 0);
}

load(0);

for(let m = 0; m < movieData.length; m++) {
  const imgElm = document.createElement('img');
  imgElm.src = movieData[m].imagesLocation + '/' + movieData[m].images[0];
  imgElm.onclick = () => load(m);

  elms.previousMovies.appendChild(imgElm)
}

