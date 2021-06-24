import createElement from '../../assets/lib/create-element.js';

export default class Carousel {
  constructor(slides) {
    this.slides = slides;

    this.render();
  }

  render() {
    if (!this.elem) {
      this.elem = createElement('<div class="carousel"></div>');
      this.elem.addEventListener('click', this.addProductOnClick.bind(this));
      this.elem.addEventListener('click', this.switchSlidesOnClick.bind(this));
    }

    let arrowLeft = this.createArrowLeft();
    arrowLeft.style.display = "none";
    
    let arrowRight = this.createArrowRight();
    let allSlides = this.createAllSlides();

    this.elem.append(arrowLeft);
    this.elem.append(arrowRight);
    this.elem.append(allSlides);

    //console.log("render", this);
    this.position = 0;

  }

  createArrowLeft() {
    return createElement(`<div class="carousel__arrow carousel__arrow_left">
        <img src="/assets/images/icons/angle-left-icon.svg" alt="icon">
      </div>`);

  }

  createArrowRight() {
    return createElement(`<div class="carousel__arrow carousel__arrow_right">
      <img src="/assets/images/icons/angle-icon.svg" alt="icon">
    </div>`);
  }

  createAllSlides() {
    let allSlidesStr = this.slides.map(slide => `<div class="carousel__slide" data-id="${slide.id}">
      <img src="/assets/images/carousel/${slide.image}" class="carousel__img" alt="slide">
      <div class="carousel__caption">
        <span class="carousel__price">€${slide.price.toFixed(2)}</span>
        <div class="carousel__title">${slide.name}</div>
        <button type="button" class="carousel__button">
          <img src="/assets/images/icons/plus-icon.svg" alt="icon">
        </button>
      </div>
     </div>`).join('');

    return createElement(`<div class="carousel__inner">` + allSlidesStr + `</div>`);
  }

  addProductOnClick(event) {
    if (!event.target.closest('.carousel__button')) {
      return;
    }
    
    let eventAddProduct = new CustomEvent('product-add', {detail: event.target.closest('.carousel__slide').dataset.id, bubbles: true});
    this.elem.dispatchEvent(eventAddProduct);
  }

  switchSlidesOnClick(event) {
    //console.log("listener", this);
    //let position = 0;

    let arrowLeft = document.querySelector(".carousel__arrow_left");
    let arrowRight = document.querySelector(".carousel__arrow_right");
    let carouselInner = document.querySelector(".carousel__inner");
    let slideWidth = document.querySelector(".carousel__slide").offsetWidth;
    let numberOfSlides = document.querySelectorAll(".carousel__slide").length;
    let maxShift = slideWidth * (numberOfSlides - 1);

  
    if (event.target.closest(".carousel__arrow_right")) {
      
      arrowLeft.style.display = "";
      
      this.position += slideWidth;
      carouselInner.style.transform = `translateX(-${this.position}px)`;

      if (this.position == maxShift) {
        arrowRight.style.display = "none";
      }
    
    } 
    
    if (event.target.closest(".carousel__arrow_left")) {
    
      arrowRight.style.display = "";
      
      this.position -= slideWidth;
      carouselInner.style.transform = `translateX(-${this.position}px)`;

      if (this.position == 0) {
        arrowLeft.style.display = "none";
      }
    }

  }
}
