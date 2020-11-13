const menuToggle = document.querySelector('#menu-togle');
const mobileNavContainer = document.querySelector('#mobile-nav');


menuToggle.onclick = function(){
    menuToggle.classList.toggle('menu-icon-active');
    mobileNavContainer.classList.toggle('mobile-nav--active');
}

//Slider
let items = document.querySelectorAll('.pets__cards-list');
let currentItem = 0;
let isEnabled = true;

function changeCurrentItem(n){
    currentItem = (n+items.length) % items.length;
}
function hideItem(direction){
    isEnabled = false;
    items[currentItem].classList.add(direction);
    items[currentItem].addEventListener('animationend',function(){
        this.classList.remove('active', direction);
    });
}
function showItem(direction){
    items[currentItem].classList.add('next', direction);
    items[currentItem].addEventListener('animationend',function(){
        this.classList.remove('next', direction);
        this.classList.add('active');
        isEnabled = true;
    });
}
function previousItem(n){
    hideItem('to-right');
    changeCurrentItem(n - 1);
    showItem('from-left');
}
function nextItem(n){
    hideItem('to-left');
    changeCurrentItem(n + 1);
    showItem('from-right');
}
document.querySelector('.slider__button.left').addEventListener('click',function(){
    if(isEnabled){
        previousItem(currentItem);
    }
});

document.querySelector('.slider__button_reverted.right').addEventListener('click',function(){
    if(isEnabled){
        nextItem(currentItem);
    }
});

const swipedetect = (el) =>{
    let surface = el;
    let startX = 0;
    let startY = 0;
    let distX = 0;
    let distY = 0;

    let startTime = 0;
    let elapsedTime = 0;

    let threshold = 150;
    let restraint = 100;
    let allowedTime = 300;

    surface.addEventListener('mousedown', function(e){
        startX = e.pageX;
        startY = e.pageY;
        startTime = new Date().getTime();
        e.preventDeafult();
    });

    surface.addEventListener('mouseup', function(e){
        distX = e.pageX - startX;
        distY = e.pageY - startY;
        elapsedTime = new Date().getTime() - startTime;

        if(elapsedTime <= allowedTime){
            if(Math.abs(distX) >= threshold && Math.abs(distY) <= restraint){
                if(distX > 0){
                    if (isEnabled){
                        previousItem(currentItem);
                    }
                }else {
                    if (isEnabled){
                        nextItem(currentItem);
                    }
                }
            }
        }

        e.preventDeafult();
    });
    surface.addEventListener('touchstart', function(e){
        if(e.target.classList.contains('slider__button')||e.target.classList.contains('slider__button')){
            if(e.target.classList.contains('left')){
                if (isEnabled){
                    previousItem(currentItem);
                }
            }else if(e.target.classList.contains('right')){
                if (isEnabled){
                    nextItem(currentItem);
                }
            }
        }
        let touchObj = e.changedTouches[0];
        startX = touchObj.pageX;
        startY = touchObj.pageY;
        startTime = new Date().getTime();
        e.preventDeafult();
    });
    surface.addEventListener('touchmove', function(e){
        e.preventDeafult();
    });

    surface.addEventListener('touchend', function(e){
        let touchObj = e.changedTouches[0];
        distX = touchObj.pageX - startX;
        distY = touchObj.pageY - startY;
        elapsedTime = new Date().getTime() - startTime;

        if(elapsedTime <= allowedTime){
            if(Math.abs(distX) >= threshold && Math.abs(distY) <= restraint){
                if(distX > 0){
                    if (isEnabled){
                        previousItem(currentItem);
                    }
                }else {
                    if (isEnabled){
                        nextItem(currentItem);
                    }
                }
            }
        }

        e.preventDeafult();
    })
}

let el = document.querySelector('.pets__cards');
swipedetect(el);