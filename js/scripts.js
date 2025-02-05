/* --------------------------------------- CONSTANTS  --------------------------------------- */ 
const DEFAULT_COLOR_1 = '#e4e4e4';
const DEFAULT_COLOR_2 = '#000000';
const DEFAULT_COLOR_3 = '#ca3030';

/* ---------------------------------------- SCRIPTS -------------------------------------------*/ 

const socialLinks = {
    instagram: "https://www.instagram.com/notfoundself/",
    tumblr: "https://upartman.tumblr.com/"
};

document.getElementById("igLink").href = socialLinks.instagram;
document.getElementById("tbLink").href = socialLinks.tumblr;

/* ------------------------------------- EVENT LISTENERS ------------------------------------- */ 
document.addEventListener("DOMContentLoaded", function() {

    /* listeners for menu */
    addMenuEventListeners();

    // menu-button for mobile devices
    document.getElementById("menu-button").addEventListener("click", function() {
        loadContent("html/menu.html");
    });     

    // color-swap button
    document.getElementById("colors").addEventListener("click", function() {
        swapColors();
    });

    // do-not-click button
    document.getElementById("do-not-click").addEventListener("click", function() {
        setRandomColors();
    });

});
/* ---------------------------------------- FUNCTIONS ---------------------------------------- */ 
/* load content page into the #content div */
function loadContent(page) {
    let content = document.getElementById("content");
    content.style.opacity = 0; 

    fetch(page)
        .then(response => response.text())
        .then(data => {
            content.innerHTML = data;
            setTimeout(() => content.style.opacity = 1, 1);
        })

        .catch(error => console.error("Chyba při načítání obsahu:", error));
}

/* add red color to active menu item */
function setActiveMenuItem(element) {
    // Remove active class from all menu items
    document.querySelectorAll(".menu-ul li").forEach(item => {
        item.classList.remove("active");
    });

    // Add active class to the selected menu item
    element.classList.add("active");
}

function swapColors() {
    const root = document.documentElement;
    const color1 = getComputedStyle(root).getPropertyValue('--color-1').trim();
    const color2 = getComputedStyle(root).getPropertyValue('--color-2').trim();

    if (color1 !== DEFAULT_COLOR_1 && color1 !== DEFAULT_COLOR_2) {
        root.style.setProperty('--color-1', DEFAULT_COLOR_1);
        root.style.setProperty('--color-2', DEFAULT_COLOR_2);
        root.style.setProperty('--color-3', DEFAULT_COLOR_3);
        // Set default icons
        setDefaultIcons();
    } else {
        root.style.setProperty('--color-1', color2);
        root.style.setProperty('--color-2', color1);
        // Swap icons
        swapIcon("instagram_white.png", "instagram.png");
        swapIcon("tumblr_white.png", "tumblr.png");
    }


}

function swapIcon(img1, img2) {
    document.querySelectorAll(".socials").forEach(img => {
        const currentSrc = img.getAttribute("src");
        if (currentSrc.includes(img1)) {
            img.setAttribute("src", currentSrc.replace(img1, img2));
        } else if (currentSrc.includes(img2)) {
            img.setAttribute("src", currentSrc.replace(img2, img1));
        }
    });
}

function setRandomColors() {
    const root = document.documentElement;

    root.style.setProperty('--color-1', getRandomColor());
    root.style.setProperty('--color-2', getRandomColor());
    root.style.setProperty('--color-3', getRandomColor());
}

function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function setDefaultIcons() {
    document.querySelectorAll(".socials").forEach(img => {
        if (img.getAttribute("alt") === "instagram_hyperlink") {
            img.setAttribute("src", "assets/icons/instagram_white.png");
        } else if (img.getAttribute("alt") === "tumbrl_hyperlink") {
            img.setAttribute("src", "assets/icons/tumblr_white.png");
        }
    });
}

function addMenuEventListeners() {

    document.querySelector(".load-main").addEventListener("click", function(event) {
        event.preventDefault();
        loadContent("html/photo.html");
        setActiveMenuItem(document.querySelector(".load-photo"));
    });

    document.querySelector(".load-photo").addEventListener("click", function(event) {
        event.preventDefault();
        loadContent("html/photo.html");
        setActiveMenuItem(this);
    });

    document.querySelector(".load-video").addEventListener("click", function(event) {
        event.preventDefault();
        loadContent("html/video.html");
        setActiveMenuItem(this);
    });

    document.querySelector(".load-print").addEventListener("click", function(event) {
        event.preventDefault();
        loadContent("html/print.html");
        setActiveMenuItem(this);
    });

    document.querySelector(".load-bio").addEventListener("click", function(event) {
        event.preventDefault();
        loadContent("html/bio.html");
        setActiveMenuItem(this);
    });

    document.querySelector(".load-contact").addEventListener("click", function(event) {
        event.preventDefault();
        loadContent("html/contact.html");
        setActiveMenuItem(this);
    });

    // Set default active menu item when loading the index.html
    setActiveMenuItem(document.querySelector(".load-photo"));

    // load default content
    loadContent("html/photo.html");

}