const breakpoints = {
  sm: 576,
  md: 768,
  lg: 1024,
  xl: 1280,
  xxl: 1600
}
const $wrapper = document.querySelector('.wrapper');
const $header = document.querySelector('.header');

const msDuration = {
  1: +getComputedStyle(document.documentElement).getPropertyValue('--animation-duration-1').replace(/[^\d.-]/g, ''),
  2: +getComputedStyle(document.documentElement).getPropertyValue('--animation-duration-2').replace(/[^\d.-]/g, ''),
  3: +getComputedStyle(document.documentElement).getPropertyValue('--animation-duration-3').replace(/[^\d.-]/g, '')
}

//lazyloading
import 'lazysizes';
//animations
import {gsap} from "gsap";
gsap.defaults({
  ease: "power2.inOut",
  duration: msDuration[1] / 1000
});
gsap.registerEffect({
  name: "fadeIn",
  effect: ($element, config) => {
    return gsap.fromTo($element, {autoAlpha: 0}, {immediateRender: false, autoAlpha: 1, duration: config.duration || msDuration[1] / 1000,
      onStart: () => {
        $element.forEach($this => {
          $this.classList.add('d-block');
        })
      },
      onReverseComplete: () => {
        $element.forEach($this => {
          gsap.set($this, {clearProps: "all"});
          $this.classList.remove('d-block');
        })
      }
    })
  },
  extendTimeline: true
});
//scroll-lock
import {disablePageScroll, enablePageScroll} from 'scroll-lock';
//swiper
import Swiper, {Navigation, Pagination, Lazy} from 'swiper';

//lightbox
require('fslightbox');
document.addEventListener('click', (event) => {
  if (event.target.closest('[data-fslightbox]')) event.preventDefault();
})

if (fsLightboxInstances['lightbox']) {
  fsLightboxInstances['lightbox'].props.onOpen = () => {
    disablePageScroll();
  }
  fsLightboxInstances['lightbox'].props.onClose = () => {
    enablePageScroll();
  }
}



document.addEventListener("DOMContentLoaded", function() {
  CustomInteractionEvents.init();
  HeaderSearch.init();
  Modals.init();

  Components.add(HomeSlider, '.home-slider');
  Components.init();
});

const CustomInteractionEvents = Object.create({
  targets: {
    value: 'a, button, [data-custom-interaction], .swiper-button'
  },
  touchEndDelay: {
    value: 100
  }, 
  init() {
    this.events = (event) => {
      let $targets = [];
      $targets[0] = event.target!==document?event.target.closest(this.targets.value):null;
      let $element = $targets[0], i = 0;
  
      while($targets[0]) {
        $element = $element.parentNode;
        if($element!==document) {
          if($element.matches(this.targets.value)) {
            i++;
            $targets[i] = $element;
          }
        } 
        else {
          break;
        }
      }
  
      //touchstart
      if(event.type=='touchstart') {
        this.touched = true;
        if(this.timeout) clearTimeout(this.timeout);
        if($targets[0]) {
          for(let $target of $targets) $target.setAttribute('data-touch', '');
        }
      } 
      //touchend
      else if(event.type=='touchend' || (event.type=='contextmenu' && this.touched)) {
        this.timeout = setTimeout(() => {this.touched = false}, 500);
        if($targets[0]) {
          setTimeout(()=>{
            for(let $target of $targets) {
              $target.removeAttribute('data-touch');
            }
          }, this.touchEndDelay.value)
        }
      } 
      //mouseenter
      if(event.type=='mouseenter' && !this.touched && $targets[0] && $targets[0]==event.target) {
        $targets[0].setAttribute('data-hover', '');
      }
      //mouseleave
      else if(event.type=='mouseleave' && !this.touched && $targets[0] && $targets[0]==event.target) {
        $targets[0].removeAttribute('data-click');
        $targets[0].removeAttribute('data-hover');
      }
      //mousedown
      if(event.type=='mousedown' && !this.touched && $targets[0]) {
        $targets[0].setAttribute('data-click', '');
      } 
      //mouseup
      else if(event.type=='mouseup' && !this.touched  && $targets[0]) {
        $targets[0].removeAttribute('data-click');
      }
    }
    document.addEventListener('touchstart',  this.events);
    document.addEventListener('touchend',    this.events);
    document.addEventListener('mouseenter',  this.events, true);
    document.addEventListener('mouseleave',  this.events, true);
    document.addEventListener('mousedown',   this.events);
    document.addEventListener('mouseup',     this.events);
    document.addEventListener('contextmenu', this.events);
  }
})

const HeaderSearch = {
  init: function() {
    this._trigger_ = '.header-search-toggle';
    this._parent_ = '.header-search';
    this.$parent = document.querySelector(this._parent_);
    this.$trigger = document.querySelector(this._trigger_);

    this.show = () => {
      this.state = true;
      this.$trigger.classList.add('active');
      this.$parent.classList.add('active');
      document.documentElement.style.setProperty('--sticky-elements-safe-top', 'calc(var(--header-fixed-height) * 2)');
    }

    this.hide = () => {
      this.state = false;
      this.$trigger.classList.remove('active');
      this.$parent.classList.remove('active');
      document.documentElement.style.setProperty('--sticky-elements-safe-top', 'var(--header-fixed-height)');
    }

    this.$trigger.addEventListener('click', () => {
      if (!this.state) {
        this.show();
      } else {
        this.hide();
      }
    })

    document.addEventListener('click', (event) => {
      if (!event.target.closest(this._trigger_) && !event.target.closest(this._parent_) && this.state) {
        this.hide();
      }
    })
  }
}

const Modals = {
  init: function () {

    this.open = ($modal) => {
      if($modal == this.$active || (this.animation && this.animation.isActive())) return;

      let event = ()=> {
        this.animation = gsap.timeline({paused: true}).fadeIn($modal);
        
        //mobile nav
        if ($modal.classList.contains('mobile-nav')) {
          const $inner = $modal.querySelector('.mobile-nav__container');
          this.animation.add(
            gsap.fromTo($inner, {x: -50}, {x: 0, ease:'power2.out'}), '<'
          )
        }


        this.animation.play().eventCallback('onStart', () => {
          disablePageScroll();
        });

        this.$active = $modal;
      }
      
      if(this.$active) this.close(event);
      else event();
    }

    this.close = (callback) => {
      if(!this.$active || (this.animation && this.animation.isActive())) return;

      this.animation.reverse().eventCallback('onReverseComplete', () => {
        enablePageScroll();
        delete this.$active;
        if(callback) callback();
      })
    }

    document.addEventListener('click', (event) => {
      let $open = event.target.closest('[data-action="Modal:open"]'),
          $close = event.target.closest('[data-action="Modal:close"]');

      if ($open) {
        event.preventDefault();
        let $target = document.querySelector(`${$open.getAttribute('href')}`);
        if ($target) this.open($target);
      } else if ($close) {
        this.close();
      }
    })
    
    //this.open(document.querySelector('#mobile-nav'));
  }
}

const Components = {
  instances: [],

  add: function (clss, elements) {
    const $elements = document.querySelectorAll(elements);
    if (!$elements.length) return;
    $elements.forEach($element => {
      this.instances.push({
        instance: new clss($element)
      });
    });
  },

  init: function () {
    this.instances.forEach((obj) => {
      if (obj.state) return;
      obj.instance.init();
      obj.state = true;
    })
  }
}

class HomeSlider {
  constructor($parent) {
    this.$parent = $parent;
  }

  init() {
    this.$slider = this.$parent.querySelector('.swiper');
    this.$pagination = this.$parent.querySelector('.swiper-pagination');
    this.$prev = this.$parent.querySelector('.swiper-button-prev');
    this.$next = this.$parent.querySelector('.swiper-button-next');

    this.swiper = new Swiper(this.$slider, {
      modules: [Pagination, Navigation, Lazy],
      slidesPerView: 1,
      speed: msDuration[3],
      autoHeight: true,
      loop: true,
      pagination: {
        el: this.$pagination,
        clickable: true,
        bulletElement: 'button'
      },
      navigation: {
        prevEl: this.$prev,
        nextEl: this.$next
      },
      lazy: {
        loadPrevNext: true
      }
    })
  }
}