const Switcher = function(container, startingIndex) {
  
  this.container = (typeof container === 'string' ? 
    document.getElementById(containerId) : container);

  this.images = this.container.querySelectorAll('.image');
  
  this.currentIndex = startingIndex || 0;
  this.switchPoint = this.container.offsetWidth / 4;
  this.dragXZero = 0;
  this.dragging = false;
  
  // Set up a few mouse events
  this.container.onmousedown = () => {
    console.log('START!');

    this.dragging = true;
    this.dragXZero = this.getClientX(event);
    this.container.style.cursor = 'grabbing';
  };

  this.container.addEventListener('touchstart', this.container.onmousedown, false);

  // Bind this to the document so mouseup anywhere resets dragging
  document.onmouseup = document.ontouchend = () => {
    this.dragging = false;
    this.container.style.cursor = 'grab';
  };

  this.container.onmousemove = event => {
    if(!this.dragging) {
      return;
    }

    const currentX = this.getClientX(event);

    let change = 0;
    if(this.dragXZero - currentX <= -(this.switchPoint)) {
      change = -1;
    } else if(this.dragXZero - currentX >= this.switchPoint) {
      change = 1;
    }

    if(change !== 0) {
      this.switchImage(change);
      this.dragXZero = currentX;
    }
  };

  this.container.addEventListener('touchmove', this.container.onmousemove, false);
  
  // Set the container's starting cursor
  this.container.style.cursor = 'grab';
  
  // Hide all the images when intialized.
  // This can be done in CSS too but just in case.
  this.images.forEach(img => img.style.display = 'none');
  
  // Show the current image, IE no offset.
  this.switchImage(0);
};

Switcher.prototype.getClientX = function(event) {
  return (event.touches && event.touches.length ? 
    event.touches[0].clientX : event.clientX);
}

Switcher.prototype.switchImage = function(indexOffset) {
  this.images[this.currentIndex].style.display = 'none';
  
  this.currentIndex += indexOffset;
  
  if(this.currentIndex === this.images.length) {
    this.currentIndex = 0;
  } else if(this.currentIndex < 0) {
    this.currentIndex = this.images.length - 1;
  }
  
  this.images[this.currentIndex].style.display = 'inline';
};