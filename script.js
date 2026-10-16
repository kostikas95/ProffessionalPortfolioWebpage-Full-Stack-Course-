const menuToggle = document.querySelector(".menu-toggle");
const navigation = document.querySelector("#primary-navigation");
const siteHeader = document.querySelector(".site-header");
const mobileBreakpoint = window.matchMedia("(max-width: 769px)");

function updateNavigationForScreenSize() {
    if (mobileBreakpoint.matches) {
        menuToggle.hidden = false;
        navigation.hidden = true;
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Open navigation");
    } else {
        menuToggle.hidden = true;
        navigation.hidden = false;
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Open navigation");
    }
}

function toggleMenu() {
    const isExpanded = menuToggle.getAttribute("aria-expanded") === "true";
    navigation.hidden = isExpanded;
    menuToggle.hidden = !isExpanded;
    menuToggle.setAttribute("aria-expanded", String(!isExpanded));
    menuToggle.setAttribute("aria-label", isExpanded ? "Open navigation" : "Close navigation");
}

menuToggle.addEventListener("click", toggleMenu);

document.addEventListener("click", (event) => {
    if (mobileBreakpoint.matches &&
        menuToggle.getAttribute("aria-expanded") === "true" &&
        !siteHeader.contains(event.target)) {
        toggleMenu();
    }
});

navigation.addEventListener("click", (event) => {
    if (event.target.closest("a") && mobileBreakpoint.matches &&
        menuToggle.getAttribute("aria-expanded") === "true") {
        toggleMenu();
    }
});

document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !navigation.hidden && mobileBreakpoint.matches) {
        toggleMenu();
        menuToggle.focus();
    }
});

updateNavigationForScreenSize();
mobileBreakpoint.addEventListener("change", updateNavigationForScreenSize);