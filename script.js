
/* =========================
   PORTFOLIO SCRIPT
========================= */

document.documentElement.classList.add("js");


/* =========================
   MOBILE MENU
========================= */

const menuToggle = document.getElementById("menuToggle");
const navLinksBox = document.getElementById("navLinks");
const navLinks = document.querySelectorAll(".nav-link");

function setMenu(open) {
    navLinksBox.classList.toggle("open", open);
    menuToggle.setAttribute("aria-expanded", String(open));
    menuToggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
}

menuToggle.addEventListener("click", function () {
    setMenu(!navLinksBox.classList.contains("open"));
});

navLinks.forEach(function (link) {
    link.addEventListener("click", function () {
        setMenu(false);
    });
});

document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
        setMenu(false);
    }
});


/* =========================
   ACTIVE LINK WHILE SCROLLING
========================= */

const sections = document.querySelectorAll("main section[id]");

function updateActiveLink() {
    const marker = window.scrollY + window.innerHeight * 0.35;
    let currentId = sections[0].id;

    sections.forEach(function (section) {
        if (section.offsetTop <= marker) {
            currentId = section.id;
        }
    });

    navLinks.forEach(function (link) {
        link.classList.toggle(
            "active",
            link.getAttribute("href") === "#" + currentId
        );
    });
}

window.addEventListener("scroll", updateActiveLink, { passive: true });
window.addEventListener("resize", updateActiveLink);
updateActiveLink();


/* =========================
   FADE IN ON SCROLL
========================= */

const revealItems = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {

    const observer = new IntersectionObserver(
        function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                    observer.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.12 }
    );

    revealItems.forEach(function (item, index) {
        item.style.transitionDelay = (index % 3) * 80 + "ms";
        observer.observe(item);
    });

} else {

    revealItems.forEach(function (item) {
        item.classList.add("visible");
    });

}
    