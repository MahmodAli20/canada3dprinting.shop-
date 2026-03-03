function scrollToSection(id) {
    document.getElementById(id).scrollIntoView({
        behavior: "smooth"
    });
}


/* ========================= */
/* HERO PARALLAX EFFECT */
/* ========================= */

const hero = document.querySelector(".hero");

hero.addEventListener("mousemove", (e) => {
    const x = (window.innerWidth / 2 - e.pageX) / 40;
    const y = (window.innerHeight / 2 - e.pageY) / 40;

    hero.style.backgroundPosition = `${x}px ${y}px`;
});


/* ========================= */
/* LANGUAGE TOGGLE SYSTEM */
/* ========================= */

const translations = {
    en: {
        nav_home: "Home",
        nav_gallery: "Gallery",
        nav_services: "Services",
        nav_contact: "Contact",

        hero_title: "We Print The Future",
        hero_sub: "Advanced Custom 3D Manufacturing Technology",
        hero_btn: "Explore The Future",

        gallery_title: "Gallery",

        services_title: "What We Do",
        service1_title: "Custom 3D Models",
        service1_desc: "Designed and printed precisely to your specifications.",
        service2_title: "Project-Based Pricing",
        service2_desc: "Cost depends on size, material, and complexity.",
        service3_title: "Precision Manufacturing",
        service3_desc: "Professional-grade quality with advanced technology.",

        contact_title: "Start Your Project",

        form_name: "Full Name",
        form_model: "Required Model",
        form_size: "Size (dimensions)",
        form_phone: "Phone Number",
        form_email: "Email Address",
        form_submit: "Submit Request",

        contact_info_title: "Contact Information",
        contact_phone: "Phone",
        contact_email: "Email"
    },

    fr: {
        nav_home: "Accueil",
        nav_gallery: "Galerie",
        nav_services: "Services",
        nav_contact: "Contact",

        hero_title: "Nous Imprimons Le Futur",
        hero_sub: "Technologie Avancée De Fabrication 3D Personnalisé",
        hero_btn: "Explorer Le Futur",

        gallery_title: "Galerie",

        services_title: "Nos Services",
        service1_title: "Modèles 3D Personnalisés",
        service1_desc: "Conçus et imprimés avec précision selon vos spécifications.",
        service2_title: "Tarification Par Projet",
        service2_desc: "Le coût dépend de la taille, du matériau et de la complexité.",
        service3_title: "Fabrication De Précision",
        service3_desc: "Qualité professionnelle avec technologie avancé.",

        contact_title: "Commencez Votre Projet",

        form_name: "Nom Complet",
        form_model: "Modèle Requis",
        form_size: "Dimensions (taille)",
        form_phone: "Numéro de Téléphone",
        form_email: "Adresse Email",
        form_submit: "Envoyer la Demande",

        contact_info_title: "Informations de Contact",
        contact_phone: "Téléphone",
        contact_email: "Email"
    }
};

/* ========================= */
/* LANGUAGE DROPDOWN SYSTEM */
/* ========================= */

let currentLang = "en";

const langSelector = document.querySelector(".lang-selector");
const langCurrent = document.querySelector(".lang-current");
const langOptions = document.querySelectorAll(".lang-option");

// Open / Close dropdown
langCurrent.addEventListener("click", () => {
    langSelector.classList.toggle("active");
});

// Select language
langOptions.forEach(option => {
    option.addEventListener("click", () => {
        const selectedLang = option.getAttribute("data-lang");
        currentLang = selectedLang;

        updateLanguage();
        langCurrent.textContent = selectedLang.toUpperCase() + " ▾";

        langSelector.classList.remove("active");
    });
});

// Close if clicked outside
document.addEventListener("click", (e) => {
    if (!langSelector.contains(e.target)) {
        langSelector.classList.remove("active");
    }
});

function updateLanguage() {
    document.querySelectorAll("[data-key]").forEach(element => {
        const key = element.getAttribute("data-key");
        const translation = translations[currentLang][key];

        if (!translation) return;

        if (element.tagName === "INPUT") {
            element.placeholder = translation;
        } else if (element.tagName === "BUTTON") {
            element.textContent = translation;
        } else {
            element.textContent = translation;

            if (element.classList.contains("glitch")) {
                element.setAttribute("data-text", translation);
            }
        }
    });
}


/* ========================= */
/* FORM SUBMISSION SYSTEM */
/* ========================= */

const form = document.getElementById("contact-form");
const submitBtn = document.getElementById("submit-btn");
const popup = document.getElementById("form-popup");
const popupClose = document.getElementById("popup-close");
const popupMessage = document.getElementById("popup-message");

form.addEventListener("submit", async function (e) {
    e.preventDefault();

    submitBtn.disabled = true;
    submitBtn.textContent = "Sending...";

    const formData = new FormData(form);

    try {
        const response = await fetch("https://formspree.io/f/mvgqblgo", {
            method: "POST",
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        });

        if (response.ok) {
            popupMessage.textContent = "Your request has been sent successfully!";
            popup.style.display = "flex";
            form.reset();
        } else {
            popupMessage.textContent = "Something went wrong. Please try again.";
            popup.style.display = "flex";
        }

    } catch (error) {
        popupMessage.textContent = "Network error. Please try again.";
        popup.style.display = "flex";
    }

    submitBtn.disabled = false;
    submitBtn.textContent = translations[currentLang]?.form_submit || "Submit Request";
});

popupClose.addEventListener("click", () => {
    popup.style.display = "none";
});