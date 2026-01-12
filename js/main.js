document.addEventListener('DOMContentLoaded', () => {
    // Language Handling
    const langSelector = document.querySelector('.lang-selector');
    const currentLangDisplay = document.getElementById('current-lang-text');
    const langDropdown = document.querySelector('.lang-dropdown');
    const langOptions = document.querySelectorAll('.lang-option');

    // Toggle dropdown
    if (langSelector) {
        langSelector.addEventListener('click', (e) => {
            e.stopPropagation();
            langDropdown.classList.toggle('show');
        });

        // Close dropdown when clicking outside
        document.addEventListener('click', () => {
            langDropdown.classList.remove('show');
        });
    }

    // Language selection
    langOptions.forEach(option => {
        option.addEventListener('click', () => {
            const lang = option.getAttribute('data-lang');
            setLanguage(lang);
        });
    });

    // Mobile Menu
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (hamburger) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }

    // Close mobile menu when link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Initialize language
    const savedLang = localStorage.getItem('repairadvice_lang') || 'en';
    setLanguage(savedLang);

    // Update WhatsApp link based on language
    updateWhatsAppLink(savedLang);
});

function setLanguage(lang) {
    // Save to localStorage
    localStorage.setItem('repairadvice_lang', lang);

    // Update display text
    const langNames = {
        'en': 'English',
        'zh': '中文',
        'ms': 'Melayu',
        'ta': 'தமிழ்'
    };

    const currentLangText = document.getElementById('current-lang-text');
    if (currentLangText) {
        currentLangText.textContent = langNames[lang];
    }

    // Update HTML lang attribute
    document.documentElement.lang = lang;

    // Update all translatable elements
    const elements = document.querySelectorAll('[data-i18n]');
    elements.forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (translations[lang] && translations[lang][key]) {
            el.textContent = translations[lang][key];
        }
    });

    // Update WhatsApp link
    updateWhatsAppLink(lang);
}

function updateWhatsAppLink(lang) {
    const whatsappLink = document.getElementById('whatsapp-link');
    if (whatsappLink && translations[lang] && translations[lang]['whatsapp_msg']) {
        const msg = encodeURIComponent(translations[lang]['whatsapp_msg']);
        whatsappLink.href = `https://wa.me/6583650599?text=${msg}`;
    }
}
