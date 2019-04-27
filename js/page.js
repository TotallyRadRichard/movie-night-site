moment.tz.setDefault('America/Phoenix');

const elms = {
  showtime: document.querySelector('#showtime span'),
  movieTitle: document.getElementById('movieTitle'),
  caseImages: document.getElementById('mediaCase'),
  commentary: document.getElementById('commentary'),
  description: document.getElementById('description')
};

const movie = movieData[0];

elms.showtime.innerHTML = moment(movie.showingDate).local().calendar();
elms.movieTitle.innerHTML = movie.title;
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
const s = new Switcher(elms.caseImages);