export default class StepSlider {
  constructor({ steps, value = 0}) {

    this.steps = steps;
    this.render();
    this.addListeners();
    this.setValue(value);
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
      <span class="slider__value"></span>
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

  setValue(value) {
    this.value = value;

    let segments = this.steps - 1;
    let valuePercents = (value / segments) * 100;

    let thumb = this.elem.querySelector('.slider__thumb');
    let progress = this.elem.querySelector('.slider__progress');
    let sliderValue = this.elem.querySelector('.slider__value');

    thumb.style.left = `${valuePercents}%`;
    progress.style.width = `${valuePercents}%`;

    sliderValue.innerHTML = value;

    let stepActive = this.elem.querySelector(`.slider__step-active`);
    let steps = this.elem.querySelector(`.slider__steps`);


    if (stepActive) {
      stepActive.classList.remove('slider__step-active');
    }

    steps.children[this.value].classList.add('slider__step-active');
  }

  addListeners() {
    this.elem.addEventListener('click', this.shiftOnClick.bind(this));
    this.elem.addEventListener('click', this.changeValue.bind(this));

    let thumb = this.elem.querySelector('.slider__thumb');
    thumb.addEventListener('pointerdown', this.shiftOnDragAndDrop.bind(this));
  }

  shiftOnDragAndDrop(onPointerDownEvent) {
    let thumb = this.elem.querySelector('.slider__thumb');
    thumb.ondragstart = () => false;

    document.addEventListener('pointermove', this.onPointerMove);
    document.addEventListener('pointerup', this.onPointerUp);

    this.elem.classList.add('slider_dragging');

  }

  onPointerMove = (pointerEvent) => {
    pointerEvent.preventDefault(); 

    let left = pointerEvent.clientX - this.elem.getBoundingClientRect().left;
    let leftRelative = left / this.elem.offsetWidth;

    if (leftRelative < 0) {
      leftRelative = 0;
    }

    if (leftRelative > 1) {
      leftRelative = 1;
    }

    let thumb = this.elem.querySelector('.slider__thumb');
    let progress = this.elem.querySelector('.slider__progress');
    let sliderValue = this.elem.querySelector('.slider__value');

    thumb.style.left = `${leftRelative * 100}%`;
    progress.style.width = `${leftRelative * 100}%`;

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
  }

  onPointerUp = (pointerEvent) => {
    pointerEvent.preventDefault();

    document.removeEventListener('pointermove', this.onPointerMove);
    document.removeEventListener('onPointerUp', this.onPointerUp);

    this.elem.classList.remove('slider_dragging');

    let thumb = this.elem.querySelector('.slider__thumb');
    let progress = this.elem.querySelector('.slider__progress');
    let segments = this.steps - 1;

    // stick to the final value
    thumb.style.left = `${(this.value / segments) * 100}%`;
    progress.style.width = `${(this.value / segments) * 100}%`;

    this.changeValue();
  }

  shiftOnClick(onClickEvent) {

    let left = onClickEvent.clientX - this.elem.getBoundingClientRect().left;
    let leftRelative = left / this.elem.offsetWidth;
    let segments = this.steps - 1;
    let approximateValue = leftRelative * segments;
    let value = Math.round(approximateValue);

    this.setValue(value);
  }
 
  changeValue() {
    let newValue = new CustomEvent('slider-change', {detail: this.value, bubbles: true});
    this.elem.dispatchEvent(newValue);

  }
}
