/**************** TAB SWITCH (ABOUT SECTION) ****************/
var tablinks = document.getElementsByClassName("tab-links");
var tabcontents = document.getElementsByClassName("tab-contents");

function opentab(tabname) {
    const evt = window.event;

    for (let tablink of tablinks) {
        tablink.classList.remove("active-link");
    }

    for (let tabcontent of tabcontents) {
        tabcontent.classList.remove("active-tab");
    }

    if (evt && evt.currentTarget) {
        evt.currentTarget.classList.add("active-link");
    }

    document.getElementById(tabname).classList.add("active-tab");
}

/**************** EDUCATION CARD TOGGLE ****************/
function toggleDetails(card) {
    const allCards = document.querySelectorAll('.education-card');
    const details = card.querySelector('.edu-details');

    allCards.forEach(otherCard => {
        if (otherCard !== card) {
            otherCard.classList.remove('expanded');
            otherCard.style.display = "flex";
            otherCard.querySelector('.edu-details').style.display = "none";
        }
    });

    if (card.classList.contains('expanded')) {
        card.classList.remove('expanded');
        details.style.display = "none";
        allCards.forEach(c => c.style.display = "flex");
    } else {
        allCards.forEach(c => {
            if (c !== card) c.style.display = "none";
        });
        card.classList.add('expanded');
        details.style.display = "block";
    }
}

/**************** SMOOTH SCROLL ****************/
$('nav a').on('click', function (event) {
    if (this.hash !== "") {
        event.preventDefault();
        const target = $(this.hash);
        if (target.length) {
            $('html, body').animate(
                { scrollTop: target.offset().top },
                800
            );
        }
    }
});

/**************** SCROLL TO TOP ****************/
const scrollTopBtn = document.getElementById("scroll-top");

window.addEventListener("scroll", function () {
    if (!scrollTopBtn) return;

    scrollTopBtn.style.display =
        document.documentElement.scrollTop > 100 ? "block" : "none";
});

if (scrollTopBtn) {
    scrollTopBtn.onclick = function () {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };
}

/**************** DOWNLOAD RESUME ****************/
function downloadResume() {
    const filePath = "images/Darshan_Msis_Resume.pdf";

    const link = document.createElement("a");
    link.href = filePath;
    link.download = "Darshan_V_V_Resume.pdf";

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

/**************** TYPING EFFECT ****************/
const textArray = [
    "Hi, I'm Darshan V V",
    "I'm a Data Engineer",
    "I'm an ML Enthusiast"
];

let index = 0;
let charIndex = 0;
const typingElement = document.querySelector(".typing");

function typeEffect() {
    if (!typingElement) return;

    if (charIndex < textArray[index].length) {
        typingElement.textContent += textArray[index].charAt(charIndex);
        charIndex++;
        setTimeout(typeEffect, 100);
    } else {
        setTimeout(() => {
            typingElement.textContent = "";
            charIndex = 0;
            index = (index + 1) % textArray.length;
            typeEffect();
        }, 1500);
    }
}
typeEffect();

/**************** MOBILE MENU ****************/
var sidemenu = document.getElementById("sidemenu");

function openmenu() {
    if (sidemenu) sidemenu.style.right = "0";
}

function closemenu() {
    if (sidemenu) sidemenu.style.right = "-200px";
}

/**************** GOOGLE FORM SUBMISSION ****************/
const scriptURL =
    'https://script.google.com/macros/s/AKfycbyVJdoLSjTakHv0p1tXdq3FV2Uo3doxBIX8r6OPHjj2aa_4LfKHDJWfzZMccKQuCkW41Q/exec';

const form = document.forms['submit-to-google-sheet'];
const msg = document.getElementById("msg");

if (form) {
    form.addEventListener('submit', function (e) {
        e.preventDefault();

        fetch(scriptURL, {
            method: 'POST',
            body: new FormData(form)
        })
            .then(() => {
                if (msg) msg.innerHTML = "Message sent successfully ✔";
                setTimeout(() => {
                    if (msg) msg.innerHTML = "";
                }, 5000);
                form.reset();
            })
            .catch(error => {
                if (msg) msg.innerHTML = "Error submitting form ❌";
                console.error('Error!', error.message);
            });
}
