document.addEventListener("DOMContentLoaded", () => {


let mainColors = localStorage.getItem("color_option");

if (mainColors !== null) { 
    // console.log("local storage is not empty")

    document.documentElement.style.setProperty('--main-color', mainColors);

    // remove active class from all 
    document.querySelectorAll(".colors-list li").forEach(Element => {
        Element.classList.remove("active");

    // add active to the clicked one 
    // e.target.classList.add("active");
    if (Element.dataset.color === mainColors)
        Element.classList.add("active");
    })

}




// toggle spin class on Icon 
document.querySelector(".settings-box .fa-gear").onclick = function () {
    this.classList.toggle("fa-spin");

    document.querySelector(".settings-box").classList.toggle("open")
}

// switch main color 


const colorLi = document.querySelectorAll(".colors-list li");


colorLi.forEach(li => {
    li.addEventListener("click", (e) => {
        // set color on root 
        const newColor = e.target.dataset.color;
        document.documentElement.style.setProperty('--main-color', newColor);


        // set color on local storage 
        localStorage.setItem("color_option", newColor);

        handleActive(e);
    })
});


let bgOption = true;
let bgInterval;
let background = localStorage.getItem("bg-option");

if (background !== null) {

    // remove active class from all spans 
    document.querySelectorAll(".random-bg span").forEach(element => {
        element.classList.remove("active");
    });

    if (background === "true") {
        bgOption = true;
        document.querySelector(".random-bg .yes").classList.add('active');
    } else {
        bgOption = false;
        document.querySelector(".random-bg .no").classList.add('active');

    }

}

// switch random bg option

const randomBg = document.querySelectorAll(".random-bg span");
randomBg.forEach(span => {
    span.addEventListener("click", (e) => {
        
        handleActive(e);

        if(span.dataset.bg == "yes") {
            bgOption = true;
            randomizeImgs();
        } else {
            bgOption = false;
            clearInterval(bgInterval);
        }
            localStorage.setItem("bg-option", bgOption)
    });
});

// select landing page elements 
let landingPage = document.querySelector(".landing-page");

// arr of images 
let images = ["landing1.jpg", "landing2.jpg", "landing3.jpg", "landing4.jpg", "landing5.jpg" ];


// console.log(random);

function randomizeImgs () {
    if (bgOption == true) {

        bgInterval = setInterval(() => {

            // get random number 
            let random = Math.floor(Math.random() * images.length);

            // change bg image url 
            landingPage.style.backgroundImage = 'url("imgs/' + images[random] + '")';

        }, 2000);
    }
}

randomizeImgs();

})


// handle active class 
function handleActive (e) {
    // remove active class from all 
    e.target.parentElement.querySelectorAll(".active").forEach(Element => {
        Element.classList.remove("active");
    })
    // add active to the clicked one 
    e.target.classList.add("active");
}


// show-bullets
let bulletsSpan = document.querySelectorAll(".show-bullets span");
let bulletsContainer = document.querySelector(".nav-bullets");
let bulletsLocal = localStorage.getItem("bullets_option");

if (localStorage.getItem("bullets_option") !== null) {
    bulletsSpan.forEach(span => {
        span.classList.remove("active");
    });

    bulletsContainer.style.display = localStorage.getItem("bullets_option");

    if (bulletsLocal === "block") {
        document.querySelector('.show-bullets .yes').classList.add("active");
    } else {
        document.querySelector('.show-bullets .no').classList.add("active");
    }
    // let selectedSpan = document.querySelector('.show-bullets span').dataset.bullets = localStorage.getItem("bullets_option")
    // selectedSpan.classList.add("active");
}

bulletsSpan.forEach(span => {
    span.addEventListener("click", (e) => {
        // data-bullets in spans contains block and none values, no need for if condition 
        handleActive(e);
        localStorage.setItem("bullets_option", span.dataset.bullets);
        bulletsContainer.style.display = localStorage.getItem("bullets_option");
    })
})

/* select skills */
let ourSkills = document.querySelector(".skills");

window.onscroll = function () {

    // let skillsOffSet = ourSkills.offsetTop;

    // let skillsOuterHeight = ourSkills.offsetHeight;

    // let windowHeight = this.innerHeight;

    // console.log(windowScroll);

    let allSkills = document.querySelectorAll(".skill-box .skill-progress span");

    // if (windowScrollTop >= (skillsOffSet + skillsOuterHeight - windowHeight)) {
    //    // this.console.log('skills');
    //     allSkills.forEach((skill) => {
    //             skill.style.width = skill.dataset.progress;
    //     })
    // }


    if (window.scrollY >= (ourSkills.offsetTop + ourSkills.offsetHeight - this.innerHeight - 400)) {
        allSkills.forEach((skill) => {
            skill.style.width = skill.dataset.progress;
        })
    } else {
        allSkills.forEach((skill) => {
        skill.style.width = 0;
        })
    }

    // to the top btn 
    let toTopBtn = document.querySelector(".toTop");
    if (window.scrollY > (toTopBtn.offsetTop - 200)) {
        toTopBtn.classList.add("toTopBlack");
    } else {
        toTopBtn.classList.remove("toTopBlack");
    }

    // toggle to black 
    let toggleBlack = document.querySelector(".toggle");
    if (window.scrollY >= (toggleBlack.offsetTop + 500)) {
        toggleBlack.style.color = "#222222";
    } else {
        toggleBlack.style.color = "white";
    }

}


// create popup with the img 

let ourGallary = document.querySelectorAll(".gallary img");

ourGallary.forEach(img => {

    img.addEventListener('click', (e) => {

        // create overlay element
        let overlay  = document.createElement("div");
        overlay.className = 'popup-overlay';
        document.body.appendChild(overlay);

        // create popup box 
        let popupBox = document.createElement('div');
        popupBox.className = 'popup-box';


        if (img.alt !== null) {
            let imgHead = document.createElement("h3");

            // create text for heading
            let headText = document.createTextNode(img.alt);

            imgHead.appendChild(headText);
            popupBox.appendChild(imgHead);

        }

        // create popup img
        let popupImg = document.createElement('img');
        popupImg.src = img.src;

        popupBox.appendChild(popupImg);
        document.body.appendChild(popupBox);

        // close span 
        let closeBtn = document.createElement("span");
        let closeText = document.createTextNode("X");

        closeBtn.appendChild(closeText);
        closeBtn.className = "close-btn";

        popupBox.appendChild(closeBtn);

    })

// close popup while clicking on close btn 

document.addEventListener("click", function (e) {
    if (e.target.className == "close-btn") {
        // remove popup box node
        e.target.parentNode.remove();

        // remove overlay (another way to remove element)
        document.querySelector(".popup-overlay").remove();
    }
})

})


// nav bullets 
let allBullets  = document.querySelectorAll(".nav-bullets .bullet");
// navbar 
let navbar = document.querySelectorAll(".header-area .links a");

// scroll IntoView >>>>> web ABI 

function scrollToSection (elements) {
    elements.forEach(ele => {
        ele.addEventListener("click", (e) => {
            e.preventDefault();
            document.querySelector(e.target.dataset.section).scrollIntoView({
                behavior: "smooth"
            })
        })
    })
}
scrollToSection(allBullets);
scrollToSection(navbar);


// reset button 
document.querySelector(".reset-options").onclick = function () {
    // localStorage.clear(); // to clear all the Items

    localStorage.removeItem("color_option");
    localStorage.removeItem("bg-option");
    localStorage.removeItem("bullets_option");

    // reload
    window.location.reload();
}

// toggle menu btn 
let toggleBtn = document.querySelector(".header-area .toggle");
let menuLinks = document.querySelector(".header-area .links");

toggleBtn.onclick = function (e) {
    e.stopPropagation();
    this.classList.toggle("menu-active");
    menuLinks.classList.toggle("open");
}

// click elsewhere outside the btn and the menu to close it

document.addEventListener('click', event => {
    // console.log(event.target)
    if (toggleBtn !== event.target && menuLinks !== event.target){
        if (menuLinks.classList.contains("open")) {
        menuLinks.classList.remove("open");
        toggleBtn.classList.remove("menu-active");
        }}
});


// stop menu propagation 
menuLinks.onclick = function (e) {
    e.stopPropagation();
}


// function onClickOutside(ele1, ele2) {
//     document.addEventListener('click', event => {
//         if (!ele1.contains(event.target) || !ele2.contains(event.target)) () => {
//             ele1.classList.remove("open");
//             ele2.classList.toggle("menu-active");
//         };
//     });
// };


// onClickOutside(menuLinks, toggleBtn);

