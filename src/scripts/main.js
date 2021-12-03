const breakpoints = {
  sm: 576,
  md: 768,
  lg: 1024,
  xl: 1280,
  xxl: 1600
}
const $wrapper = document.querySelector('.wrapper');
const $header = document.querySelector('.header');

import 'lazysizes';

document.addEventListener("DOMContentLoaded", function() {
  CustomInteractionEvents.init();

  document.querySelectorAll('.header-search').forEach($this => {
    new HeaderSearch($this).init();
  })
  document.querySelectorAll('.lang-toggle').forEach($this => {
    new LangToggle($this).init();
  })
});

const CustomInteractionEvents = Object.create({
  targets: {
    value: 'a, button, [data-custom-interaction]'
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

class HeaderSearch {
  constructor($parent) {
    this.$parent = $parent;
  }

  init() {
    this._trigger_ = '.header-search__trigger';
    this._form_ = '.header-search__form';
    this.$trigger = this.$parent.querySelector(this._trigger_);
    this.$form = this.$parent.querySelector(this._form_);

    this.show = () => {
      this.state = true;
      this.$form.classList.add('active');
      this.$trigger.classList.add('active');
    }

    this.hide = () => {
      this.state = false;
      this.$form.classList.remove('active');
      this.$trigger.classList.remove('active');
    }

    this.$trigger.addEventListener('click', () => {
      if (!this.state) {
        this.show();
      } else {
        this.hide();
      }
    })

    document.addEventListener('click', (event) => {
      if (!event.target.closest(this._trigger_) && !event.target.closest(this._form_) && this.state) {
        this.hide();
      }
    })
  }
}

class LangToggle {
  constructor($parent) {
    this.$parent = $parent;
  }

  init() {
    this._trigger_ = '.lang-toggle__selected';
    this._langs_ = '.lang-toggle__langs';

    this.$trigger = this.$parent.querySelector(this._trigger_);
    this.$langs = this.$parent.querySelector(this._langs_);

    this.show = () => {
      this.state = true;
      this.$langs.classList.add('active');
      this.$trigger.classList.add('active');
    }

    this.hide = () => {
      this.state = false;
      this.$langs.classList.remove('active');
      this.$trigger.classList.remove('active');
    }

    this.$trigger.addEventListener('click', () => {
      if (!this.state) {
        this.show();
      } else {
        this.hide();
      }
    })

    document.addEventListener('click', (event) => {
      if (!event.target.closest(this._trigger_) && !event.target.closest(this._langs_) && this.state) {
        this.hide();
      }
    })
  }
}