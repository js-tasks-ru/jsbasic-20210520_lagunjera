export default class StepSlider {
  constructor({ steps, value = 0 }) {
    this.value = value;
    this.steps = steps;
    this.render();
    this.addListeners();
  }

  render() {
    if (!this.elem) {
      this.elem = this.createSlider();
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

  addListeners() {
    this.elem.addEventListener('click', this.shiftOnClick.bind(this));
    this.elem.addEventListener('click', this.changeValue.bind(this));

    let thumb = this.elem.querySelector('.slider__thumb');
    thumb.addEventListener('pointerdown', this.shiftOnDragAndDrop.bind(this));
  }

  shiftOnDragAndDrop(onPointerDownEvent) {
    let thumb = this.elem.querySelector('.slider__thumb');
    let progress = this.elem.querySelector('.slider__progress');
    let sliderValue = this.elem.querySelector('.slider__value');

    let onPointerMove = (pointerEvent) => {
      this.elem.classList.add('slider_dragging');

      let left = pointerEvent.clientX - this.elem.getBoundingClientRect().left;
      let leftRelative = left / this.elem.offsetWidth;

      if (leftRelative < 0) {
        leftRelative = 0;
      }

      if (leftRelative > 1) {
        leftRelative = 1;
      }

      let segments = this.steps - 1;
      let approximateValue = leftRelative * segments;

      let value = Math.round(approximateValue);
      this.value = value;
      sliderValue.innerHTML = this.value;

      let allSteps = this.elem.querySelector('.slider__steps').children;

      for (let i = 0; i < allSteps.length; i++) {
        allSteps[i].classList.remove('slider__step-active');
      }
  
      allSteps[value].classList.add('slider__step-active');

      //let leftPercents = value / segments * 100;
      let leftPercents = leftRelative * 100;

      thumb.style.left = `${leftPercents}%`;
      progress.style.width = `${leftPercents}%`;

      pointerEvent.preventDefault(); 
    };


    let onPointerUp = (pointerEvent) => {
      document.removeEventListener('pointermove', onPointerMove);

      this.changeValue();

      this.elem.classList.remove('slider_dragging');
      pointerEvent.preventDefault();
    };


    document.addEventListener('pointermove', onPointerMove);
    document.addEventListener('pointerup', onPointerUp);

    thumb.ondragstart = () => false;
  }

  shiftOnClick(onClickEvent) {
    let allSteps = this.elem.querySelector('.slider__steps').children;
    let thumb = this.elem.querySelector('.slider__thumb');
    let progress = this.elem.querySelector('.slider__progress');

    let left = onClickEvent.clientX - this.elem.getBoundingClientRect().left;
    let leftRelative = left / this.elem.offsetWidth;
    let segments = this.steps - 1;
    let approximateValue = leftRelative * segments;
    let value = Math.round(approximateValue);
    let valuePercents = value / segments * 100;

    this.value = value;
    
    let sliderValue = this.elem.querySelector('.slider__value');
    sliderValue.innerHTML = this.value;
    
    for (let i = 0; i < allSteps.length; i++) {
      allSteps[i].classList.remove('slider__step-active');
    }

    allSteps[value].classList.add('slider__step-active');

    thumb.style.left = `${valuePercents}%`;
    progress.style.width = `${valuePercents}%`;
  }
 
  changeValue() {
    let newValue = new CustomEvent('slider-change', {detail: this.value, bubbles: true});
    this.elem.dispatchEvent(newValue);
  }
}
