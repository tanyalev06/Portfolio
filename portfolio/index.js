import i18Obj from './translate.js';

const portfolioBtnWinter = document.querySelector('.portfolio-btn-winter');
const portfolioBtnSpring = document.querySelector('.portfolio-btn-spring');
const portfolioBtnSummer = document.querySelector('.portfolio-btn-summer');
const portfolioBtnAutumn = document.querySelector('.portfolio-btn-autumn');
const photosAll = document.querySelectorAll('.img-portfolio');
const btnEn = document.querySelector('.btn-en');
const btnRu = document.querySelector('.btn-ru');
let lang = 'en';

portfolioBtnWinter.addEventListener('click', () => {
    photosAll.forEach((img, index) => img.src = `./assets/img/winter/${index + 1}.jpg`);
});
portfolioBtnSpring.addEventListener('click', () => {
    photosAll.forEach((img, index) => img.src = `./assets/img/spring/${index + 1}.jpg`);
});
portfolioBtnSummer.addEventListener('click', () => {
    photosAll.forEach((img, index) => img.src = `./assets/img/summer/${index + 1}.jpg`);
});
portfolioBtnAutumn.addEventListener('click', () => {
    photosAll.forEach((img, index) => img.src = `./assets/img/autumn/${index + 1}.jpg`);
});

function translate(lang){
  const collection = document.querySelectorAll('[data-i18]')
  collection.forEach(function(element) {
      element.textContent = i18Obj[lang][element.dataset.i18];
      if (element.placeholder){
        element.placeholder = i18Obj[lang][element.dataset.i18];
        el.textContent = '';
    }
  })
}

btnEn.addEventListener('click', () => translate('en'));
btnRu.addEventListener('click', () => translate('ru'));

function setLocalStorage() {
  localStorage.setItem('lang', lang);
}
window.addEventListener('beforeunload', setLocalStorage);

function getLocalStorage() {
  if(localStorage.getItem('lang')) {
    const lg = localStorage.getItem('lang');
    translate(lg);
  }
}
window.addEventListener('load', getLocalStorage);

const player = document.querySelector('.div-video');
const video = player.querySelector('.player');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const rangeRate = player.querySelector('.player__slider__rate');
const volumeBtn = player.querySelector('.player__button__volume');
const rangeVolume = player.querySelector('.player__slider');
const btnPlayer = document.querySelector('.btn-player');

function togglePlay() {
  const method = video.paused ? 'play' : 'pause';
  showBtn();
  video[method]();
}

function showBtn() {
  btnPlayer.classList.toggle('active');
}

function updateButton() {
  const icon = this.paused ? '►' : '❚ ❚'
  console.log(icon);
  toggle.textContent = icon;
}

function skip() {
  // console.log(this.dataset.skip);
  video.currentTime += parseFloat(this.dataset.skip);
}

function handleRangeUpdate() {
  video[this.name] = this.value;
  // console.log(this.name)
  // console.log(this.value);
}

function handleProgress() {
  const percent = (video.currentTime / video.duration) * 100;
  progressBar.style.flexBasis = `${percent}%`;
}

function scrub(e) {
  const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = scrubTime;
  console.log(e);
}

function changeVolumeBtn() {
  volumeBtn.classList.toggle('mute');
  if (volumeBtn.className == 'player__button__volume') {
      video.volume = rangeVolume.value / 100;
  } 
  else {
      video.volume = 0;
  }
}

function changeVolumeRange(e) {
  video.volume = rangeVolume.value / 100;
  if (!video.volume) {
    volumeBtn.classList.add('mute');
  }
  if(video.volume) {
    volumeBtn.classList.remove('mute');
  }
}

video.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
video.addEventListener('timeupdate', handleProgress);
volumeBtn.addEventListener('click', changeVolumeBtn);
btnPlayer.addEventListener('click', togglePlay);
rangeVolume.addEventListener('change', changeVolumeRange);
rangeVolume.addEventListener('change', handleRangeUpdate)

toggle.addEventListener('click', togglePlay);
skipButtons.forEach(button => button.addEventListener('click', skip));
rangeRate.addEventListener('change', handleRangeUpdate);
progress.addEventListener('click', scrub);
// progress.addEventListener('mousemove', scrub);
