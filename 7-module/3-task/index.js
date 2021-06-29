export default class StepSlider {
  constructor({ steps, value = 0 }) {
    this.value = value;
    this.steps = steps;
    this.render();
  }

  render() {
    if (!this.elem) {
      this.elem = this.createSlider();
      this.elem.addEventListener('click', this.shiftSlider.bind(this));
      this.elem.addEventListener('click', this.changeValue.bind(this));
    }
  }

  createSlider() {
    let slider = document.createElement('div');
 
    let stepsStr = (`<span></span>`).repeat(this.steps - 1);

    let sliderStr = `<div class="slider">
    <div class="slider__thumb">
      <span class="slider__value">${this.value}</span>
    </div>
    <div class="slider__progress"></div>
  
    <div class="slider__steps">
    <span class="slider__step-active"></span>
      ${stepsStr}
    </div>
  </div>`;

    slider.insertAdjacentHTML('beforeend', sliderStr);
    return slider.firstElementChild;
  }

  shiftSlider(e) {
    let left = e.clientX - this.elem.getBoundingClientRect().left;
    let leftRelative = left / this.elem.offsetWidth;
    let segments = this.steps - 1;
    let approximateValue = leftRelative * segments;
    let value = Math.round(approximateValue);
    let valuePercents = value / segments * 100;

    this.value = value;
    
    let sliderValue = this.elem.querySelector('.slider__value');
    sliderValue.innerHTML = this.value;
    
    let allSteps = this.elem.querySelector('.slider__steps').children;

    for (let i = 0; i < allSteps.length; i++) {
      allSteps[i].classList.remove('slider__step-active');
    }

    allSteps[value].classList.add('slider__step-active');

    let thumb = this.elem.querySelector('.slider__thumb');
    let progress = this.elem.querySelector('.slider__progress');

    thumb.style.left = `${valuePercents}%`;
    progress.style.width = `${valuePercents}%`;
  }

  changeValue() {
    let newValue = new CustomEvent('slider-change', {detail: this.value, bubbles: true});
    this.elem.dispatchEvent(newValue);
  }
}
 