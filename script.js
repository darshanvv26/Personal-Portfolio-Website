/**************** TAB SWITCH (ABOUT SECTION) ****************/
var tablinks = document.getElementsByClassName("tab-links");
var tabcontents = document.getElementsByClassName("tab-contents");

function opentab(tabname, event) {
    for (let tablink of tablinks) {
        tablink.classList.remove("active-link");
    }
    for (let tabcontent of tabcontents) {
        tabcontent.classList.remove("active-tab");
    }
    event.currentTarget.classList.add("active-link");
    document.getElementById(tabname).classList.add("active-tab");
}

/**************** EDUCATION CARD TOGGLE ****************/
function toggleDetails(card) {
    const allCards = document.querySelectorAll('.education-card');

    allCards.forEach(otherCard => {
        if (otherCard !== card) {
            otherCard.classList.remove('expanded');
            otherCard.querySelector('.edu-details').style.display = "none";
            otherCard.style.display = "flex";
        }
    });

    const details = card.querySelector('.edu-details');

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
        $('html, body').animate(
            { scrollTop: $(this.hash).offset().top },
            800
        );
    }
});

/**************** SCROLL TO TOP ****************/
const scrollTopBtn = document.getElementById("scroll-top");

window.onscroll = function () {
    if (document.documentElement.scrollTop > 100) {
        scrollTopBtn.style.display = "block";
    } else {
        scrollTopBtn.style.display = "none";
    }
};

scrollTopBtn.onclick = function () {
    window.scrollTo({ top: 0, behavior: "smooth" });
};

/**************** DOWNLOAD RESUME ****************/
function downloadResume() {
    const filePath = "images/Darshan_Msis_Resume.pdf"; // 🔁 rename file accordingly

    const link = document.createElement("a");
    link.href = filePath;
    link.download = "Darshan_V_V_Resume.pdf";

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

/**************** TYPING EFFECT ****************/
let textArray = [
    "I'm Darshan V V",
    "Big Data Analytics Engineer",
    "Data Engineer | ML Enthusiast"
];

let index = 0;
let charIndex = 0;
const typingElement = document.querySelector(".typing");

function typeEffect() {
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
    sidemenu.style.right = "0";
}

function closemenu() {
    sidemenu.style.right = "-200px";
}

/**************** GOOGLE FORM SUBMISSION ****************/
const scriptURL =
    'https://script.google.com/macros/s/AKfycbyVJdoLSjTakHv0p1tXdq3FV2Uo3doxBIX8r6OPHjj2aa_4LfKHDJWfzZMccKQuCkW41Q/exec';

const form = document.forms['submit-to-google-sheet'];
const msg = document.getElementById("msg");

if (form) {
    form.addEventListener('submit', e => {
        e.preventDefault();

        fetch(scriptURL, { method: 'POST', body: new FormData(form) })
            .then(() => {
                msg.innerHTML = "Message sent successfully ✔";
                setTimeout(() => (msg.innerHTML = ""), 5000);
                form.reset();
            })
            .catch(error => {
                msg.innerHTML = "Error submitting form ❌";
                console.error('Error!', error.message);
            });
    });
}
