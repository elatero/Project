window.addEventListener('DOMContentLoaded', () => {

  'use strict';

  let tab = document.querySelectorAll('.info-header-tab'),
      info = document.querySelector('.info-header'),
      tabContent = document.querySelectorAll('.info-tabcontent');

  const hideTabContent = (a) => {
    for (let i = a; i < tabContent.length; i++) {
      tabContent[i].classList.remove('show');
      tabContent[i].classList.add('hide');
    }
  }

  hideTabContent(1);

  const showTabContent = (b) => {
    if (tabContent[b].classList.contains('hide')) {
      tabContent[b].classList.remove('hide');
      tabContent[b].classList.add('show');
    }
  }

  info.addEventListener('click', (event) => {
    let target = event.target;
    if (target && target.classList.contains('info-header-tab')) {
      for (let i = 0; i < tab.length; i++) {
        if (target == tab[i]) {
          hideTabContent(0);
          showTabContent(i);
          break;
        }
      }
    }
  });

  // Timer

  let deadline = '2019-09-30';

  const getTimeRemaining = (endtime) => {
    let t = Date.parse(endtime) - Date.parse(new Date()),
        seconds = Math.floor((t / 1000) % 60),
        minutes = Math.floor((t / 1000 / 60) % 60),
        hours = Math.floor((t / (1000 * 60 * 60)));

        return {
          'total' : t,
          'hours' : hours,
          'minutes' : minutes,
          'seconds' : seconds
        };
  }

  const setClock = (id, endtime) => {
    let timer = document.getElementById(id),
        hours = timer.querySelector('.hours'),
        minutes = timer.querySelector('.minutes'),
        seconds = timer.querySelector('.seconds'),
        timeInterval = setInterval(updateClock, 1000);

    function updateClock () {
      let t = getTimeRemaining(endtime);

      const addZero = (num) => {
        if(num <= 9) {
          return '0' + num;
        } else {
          return num;
        }
      }

      hours.textContent = addZero(t.hours);
      minutes.textContent = addZero(t.minutes);
      seconds.textContent = addZero(t.seconds);

      if (t.total <= 0) {
        clearInterval(timeInterval);
        hours.textContent = '00';
        minutes.textContent = '00';
        seconds.textContent = '00';
      }
    }
  }

  setClock('timer', deadline);

  // Modal window

  let more = document.querySelector('.more'),
      overlay = document.querySelector('.overlay'),
      close = document.querySelector('.popup-close');

  more.addEventListener('click', () => {
    overlay.style.display = 'block';
    more.classList.add('more-splash');
    document.body.style.overflow = 'hidden';
  });

  close.addEventListener('click', () => {
    overlay.style.display = 'none';
    more.classList.remove('more-splash');
    document.body.style.overflow = '';
  });

  //Form

  let message = {
    loading: 'Загрузка...',
    success: 'Спасибо! Скоро мы с вами свяжемся!',
    failure: 'Что-то пошло не так...'
  };

  let form = document.querySelector('.main-form'),
      input = form.getElementsByTagName('input'),
      statusMessage = document.createElement('div');
      statusMessage.classList.add('status');

  form.addEventListener('submit', function(event) {
    event.preventDefault();
    form.appendChild(statusMessage);

    let formData = new FormData(form);

    function postData(data) {

      return new Promise((resolve, reject) => {

        let request = new XMLHttpRequest();

        request.open('POST', 'server.php');
        request.setRequestHeader('Content-type', 'application/json; charset=utf-8');

        request.addEventListener('onreadystatechange', function() {
          if (request.readyState < 4) {
            resolve();
          } else if(request.readyState === 4 && request.status == 200) {
            resolve();
          } else {
            reject();
          }
        });
        request.send(data);
      });
    }

    function clearInput() {
      for (let i = 0; i < input.length; i++) {
        input[i].value = '';
      }
    }

    postData(formData)
    .then(() => statusMessage.textContent = message.loading)
    .then(() => statusMessage.textContent = message.success)
    .catch(() => statusMessage.textContent = message.failure)
    .then(clearInput);

  });

  // Slider

  let sliderIndex = 1,
      slides = document.querySelectorAll('.slider-item'),
      prev = document.querySelector('.prev'),
      next = document.querySelector('.next'),
      dotWrap = document.querySelector('.slider-dots'),
      dots = document.querySelectorAll('.dot');

  showSlides(sliderIndex);

  function showSlides(n) {

    if(n > slides.length) {
      sliderIndex = 1;
    }

    if(n < 1) {
      sliderIndex = slides.length;
    }

    slides.forEach((item) => item.style.display = 'none');

    dots.forEach((item) => item.classList.remove('dot-active'));

    slides[sliderIndex - 1].style.display = 'block';
    dots[sliderIndex - 1].classList.add('dot-active');
  }

  function plusSlides(n) {
    showSlides(sliderIndex += n);
  }

  function currentSlide(n) {
    showSlides(sliderIndex = n);
  }

  prev.addEventListener('click', () => {
    plusSlides(-1);
  });

  next.addEventListener('click', () => {
    plusSlides(1);
  });

  dotWrap.addEventListener('click', (event) =>  {
    for (let i = 0; i < dots.length + 1; i++) {
      if (event.target.classList.contains('dot')
          && event.target === dots[i-1]) {
            currentSlide(i);
          }
    }
  });

  function autoSlider() {
    if( sliderIndex === slides.length) {
      sliderIndex = 1;
      showSlides(sliderIndex);
    } else {
      showSlides(sliderIndex++)
    }    
  }

  setInterval(autoSlider, 5000);

});