console.log('coucou');


/*********************compétences**********************/



/*********************Expériences**********************/

(function () {
    "use strict";

    var items = document.querySelectorAll(".timeline li");

    function isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
    
        return (
            rect.top < window.innerHeight * 0.65 &&
            rect.bottom > 0
        );
    }

    function callbackFunc() {
        for (var i = 0; i < items.length; i++) {
            if (isElementInViewport(items[i])) {
                items[i].classList.add("in-view");
            }
        }
    }

    window.addEventListener("load", callbackFunc);
    window.addEventListener("resize", callbackFunc);
    window.addEventListener("scroll", callbackFunc);
})();



/*********************Formations**********************/

function animateElementsOnScroll() {
    const elements = document.querySelectorAll(".education-item");

    elements.forEach((element) => {
        if (isElementInViewport(element)) {
            element.classList.add("animate");
        }
    });
}

function isElementInViewport(element) {
    const rect = element.getBoundingClientRect();
    return rect.top <= window.innerHeight && rect.bottom >= 0;
}

window.addEventListener("scroll", animateElementsOnScroll);
animateElementsOnScroll();


/*********************Portfolio**********************/


const projects = document.querySelectorAll('.project');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');

function closeLightbox() {
    lightbox.style.display = 'none';
}

projects.forEach(project => {
    project.addEventListener('click', () => {
        lightboxImg.src = project.querySelector('img').src;
        lightbox.style.display = 'block';
    });
});



/* FILTRES DU PORTFOLIO */

document.querySelectorAll(".filter-btn").forEach(button => {
    button.addEventListener("click", () => {
        const filter = button.dataset.filter;

        // Mettre en évidence le bouton sélectionné
        document.querySelectorAll(".filter-btn").forEach(btn => {
            btn.classList.remove("active");
        });
        button.classList.add("active");

        // Afficher ou masquer les catégories
        document.querySelectorAll("[data-category]").forEach(section => {
            const show = filter === "all" || section.dataset.category === filter;
            section.style.display = show ? "" : "none";
        });
    });
});


/* Afficher / masquer les missions professionnelles */


document.querySelectorAll(".experience-toggle").forEach((button) => {
    const details = document.getElementById(
        button.getAttribute("aria-controls")
    );

    if (!details) return;

    const reduceButton = document.createElement("button");
    reduceButton.type = "button";
    reduceButton.className = "experience-reduce";
    reduceButton.innerHTML = 'RÉDUIRE <span aria-hidden="true">↑</span>';
    reduceButton.hidden = true;

    details.appendChild(reduceButton);
    details.style.overflow = "hidden";

    let animation = null;

    function toggleDetails(open) {
        if (animation) {
            animation.cancel();
            animation = null;
        }

        button.setAttribute("aria-expanded", String(open));
        button.hidden = open;

        if (open) {
            details.hidden = false;
            reduceButton.hidden = false;

            const height = details.scrollHeight;

            animation = details.animate(
                [
                    { height: "0px", opacity: 0 },
                    { height: height + "px", opacity: 1 }
                ],
                { duration: 450, easing: "ease-in-out" }
            );

            animation.onfinish = () => {
                animation = null;
            
                const card = button.closest("li").querySelector(":scope > div");
                const rect = card.getBoundingClientRect();
            
                const topLimit = 120;
                const availableHeight = window.innerHeight - topLimit - 25;
            
                const targetTop = rect.height <= availableHeight
                    ? topLimit + (availableHeight - rect.height) / 2
                    : topLimit;
            
                window.scrollTo({
                    top: window.scrollY + rect.top - targetTop,
                    behavior: "smooth"
                });
            };
        } else {
            const height = details.scrollHeight;

            animation = details.animate(
                [
                    { height: height + "px", opacity: 1 },
                    { height: "0px", opacity: 0 }
                ],
                { duration: 450, easing: "ease-in-out" }
            );

            animation.onfinish = () => {
                animation = null;
                details.hidden = true;
                reduceButton.hidden = true;

                

                button.closest("li").scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });
            };
        }
    }

    button.addEventListener("click", () => toggleDetails(true));
    reduceButton.addEventListener("click", () => toggleDetails(false));
});


/* Navigation — section active au défilement */


/* Navigation — section active au défilement */

const navLinks = document.querySelectorAll(".navbar .nav-link");

const navSections = [...navLinks]
    .map(link => {
        const href = link.getAttribute("href");
        if (!href || href === "#") return null;
        return document.querySelector(href);
    })
    .filter(Boolean);

function updateActiveNavigation() {
    const scrollPosition = window.scrollY + 150;
    let activeHref = "#";

    navSections.forEach(section => {
        if (section.getBoundingClientRect().top +
            window.scrollY <= scrollPosition) {
            activeHref = "#" + section.id;
        }
    });

    navLinks.forEach(link => {
        const isActive = link.getAttribute("href") === activeHref;

        link.classList.toggle("active", isActive);

        if (isActive) {
            link.setAttribute("aria-current", "location");
        } else {
            link.removeAttribute("aria-current");
        }
    });
}

window.addEventListener("scroll", updateActiveNavigation, {
    passive: true
});

window.addEventListener("resize", updateActiveNavigation);

updateActiveNavigation();


document.querySelectorAll('.navbar-collapse .nav-link').forEach(link => {
    link.addEventListener('click', () => {
        const menu = document.querySelector('.navbar-collapse');

        if (menu && menu.classList.contains('show')) {
            bootstrap.Collapse.getOrCreateInstance(menu).hide();
        }
    });
});

const backToTop = document.querySelector(".back-to-top");

function updateBackToTop() {
    backToTop.classList.toggle("visible", window.scrollY > 400);
}

window.addEventListener("scroll", updateBackToTop);
updateBackToTop();
