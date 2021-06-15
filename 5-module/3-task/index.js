function initCarousel() {
  let arrowLeft = document.querySelector(".carousel__arrow_left");
  let arrowRight = document.querySelector(".carousel__arrow_right");
  let slideWidth = document.querySelector(".carousel__slide").offsetWidth;
  let numberOfSlides = document.querySelectorAll(".carousel__slide").length;
  let maxShift = slideWidth * (numberOfSlides - 1);
  let carouselInner = document.querySelector(".carousel__inner");
  let position = 0;


  arrowLeft.style.display = "none";

  document.addEventListener("click", function(event) {
    if (event.target.closest(".carousel__arrow_right")) {
      
      arrowLeft.style.display = "";

      position += slideWidth;

      carouselInner.style.transform = `translateX(-${position}px)`;

      if (position == maxShift) {
        arrowRight.style.display = "none";
      }
    
    } 
    
    if (event.target.closest(".carousel__arrow_left")) {

      arrowRight.style.display = "";
      
      position -= slideWidth;
      carouselInner.style.transform = `translateX(-${position}px)`;
      
      if (position == 0) {
        arrowLeft.style.display = "none";
      }
    }
  });
} 
