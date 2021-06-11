function initCarousel() {
  let arrowLeft = document.querySelector(".carousel__arrow_left");
  let arrowRight = document.querySelector(".carousel__arrow_right");
  let slideWidth = document.querySelector(".carousel__slide").offsetWidth;
  let numberOfSlides = document.querySelectorAll(".carousel__slide").length;
  let maxShiftWidth = slideWidth * (numberOfSlides - 1);
  let carouselInner = document.querySelector(".carousel__inner");
  let position = 0;


  arrowLeft.style.display = "none";

  document.addEventListener("click", function(event) {
    if (event.target.tagName == "IMG" &&
        event.target.parentElement.classList.contains("carousel__arrow_right") &&
        position < maxShiftWidth) {
      
      arrowLeft.style.display = "";

      position += slideWidth;
      carouselInner.style.transform = `translateX(-${position}px)`;

      if (position == maxShiftWidth) {
        arrowRight.style.display = "none";
      }
    
    } 
    
    if (event.target.tagName == "IMG" &&
        event.target.parentElement.classList.contains("carousel__arrow_left")) {

      arrowRight.style.display = "";
      
      position -= slideWidth;
      carouselInner.style.transform = `translateX(-${position}px)`;
      
      if (position == 0) {
        arrowLeft.style.display = "none";
      }
    }
  });
  

  


}
