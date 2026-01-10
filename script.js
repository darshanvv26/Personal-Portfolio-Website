var tablinks = document.getElementsByClassName("tab-links");
var tabcontents = document.getElementsByClassName("tab-contents");

function opentab(tabname) {
    for (tablink of tablinks) {
        tablink.classList.remove("active-link");
    }
    for (tabcontent of tabcontents) {
        tabcontent.classList.remove("active-tab");
    }
    event.currentTarget.classList.add('active-link');
    document.getElementById(tabname).classList.add("active-tab");
}

function toggleDetails(element) {
    var clickedCard = element.parentElement;
    var allCards = document.querySelectorAll('.education-card');
    var details = clickedCard.querySelector('.edu-details');

    // Check if it's already expanded
    if (clickedCard.classList.contains('expanded')) {
        // Reset all cards to normal
        allCards.forEach(card => {
            card.classList.remove('expanded');
            card.style.display = "flex";
            card.querySelector('.edu-details').style.display = "none"; // Hide details
        });
    } else {
        // Hide all cards except the clicked one
        allCards.forEach(card => {
            if (card !== clickedCard) {
                card.style.display = "none";
            }
        });

        // Expand clicked card to center
        clickedCard.classList.add('expanded');

        // Show education details inside the expanded card
        details.style.display = "block";
    }
}

// Smooth Scroll
$('nav a').on('click', function(event) {
    if (this.hash !== "") {
        event.preventDefault();
        $('html, body').animate({
            scrollTop: $(this.hash).offset().top
        }, 800);
    }
});

// Scroll to Top Button
const scrollTopBtn = document.getElementById("scroll-top");
window.onscroll = function() {
    if (document.documentElement.scrollTop > 100) {
        scrollTopBtn.style.display = "block";
    } else {
        scrollTopBtn.style.display = "none";
    }
};

scrollTopBtn.onclick = function() {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
};

// Download Resume
function downloadResume() {
    // Provide the correct file path for your resume (e.g., PDF file)
    const filePath = "images/Resume..pdf";

    // Create an anchor element dynamically
    const link = document.createElement("a");
    link.href = filePath;
    link.download = "Resume"; // Set the download file name

    // Append the anchor to the body, trigger the click, and remove it
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

// Typing Effect
let textArray = ["I'm Darshan V V", "I'm a Developer", "I write code"];
let index = 0;
let charIndex = 0;

function typeEffect() {
    if (charIndex < textArray[index].length) {
        document.querySelector(".typing").textContent += textArray[index].charAt(charIndex);
        charIndex++;
        setTimeout(typeEffect, 100);
    } else {
        setTimeout(() => {
            document.querySelector(".typing").textContent = "";
            charIndex = 0;
            index = (index + 1) % textArray.length;
            typeEffect();
        }, 1500);
    }
}
typeEffect();

function toggleDetails(card) {
    // Get all cards
    const allCards = document.querySelectorAll('.education-card');

    // Toggle the clicked card's details
    card.querySelector('.edu-details').classList.toggle('show-details');

    // Hide details for all other cards
    allCards.forEach(otherCard => {
        if (otherCard !== card) {
            otherCard.querySelector('.edu-details').classList.remove('show-details');
        }
    });
}

var sidemenu = document.getElementById("sidemenu");

function openmenu() {
    sidemenu.style.right = "0";
}

function closemenu() {
    sidemenu.style.right = "-200px";
}

const scriptURL = 'https://script.google.com/macros/s/AKfycbyVJdoLSjTakHv0p1tXdq3FV2Uo3doxBIX8r6OPHjj2aa_4LfKHDJWfzZMccKQuCkW41Q/exec';
const form = document.forms['submit-to-google-sheet'];
const msg = document.getElementById("msg");

if (form) {
    form.addEventListener('submit', e => {
        e.preventDefault();

        fetch(scriptURL, {
                method: 'POST',
                body: new FormData(form)
            })
            .then(response => {
                msg.innerHTML = "Message sent successfully";
                setTimeout(() => {
                    msg.innerHTML = "";
                }, 5000);
                form.reset();
            })
            .catch(error => {
                msg.innerHTML = "Error submitting form!";
                console.error('Error!', error.message);
            });
    });
} else {
    console.error("Form not found. Ensure the form has the correct name attribute.");
}
