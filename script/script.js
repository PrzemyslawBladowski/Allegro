document.addEventListener("DOMContentLoaded", () => {
    const fontSizeDefault = 21; // Nowy domyślny rozmiar czcionki (A+)
    const fontSizeAPlusIncrement = 2; // Powiększenie o 2px dla A+ w .mobile-categories
    const fontSizeAPlusPlusIncrement = 4; // Powiększenie o 4px dla A++ w .mobile-categories
    let isAPlusClicked = false;
    let isAPlusPlusClicked = false;
    let isHighContrastMode = false;

    const availabilityItems = document.querySelectorAll(".mobile-availability-item");
    const categories = document.querySelector(".mobile-categories");

    // Ustaw domyślnie wyłączone czytanie tekstu
    document.body.dataset.readingEnabled = "false";

    // Funkcja do odczytywania tekstu
    const readText = (text) => {
        if (document.body.dataset.readingEnabled === "false") return; // Sprawdź, czy czytanie jest włączone
        const speech = new SpeechSynthesisUtterance(text);
        speech.lang = "pl-PL"; // Ustaw język na polski
        window.speechSynthesis.speak(speech);
    };

    // Dodaj obsługę kliknięcia dla elementów tekstowych
    document.querySelectorAll("p, span, a").forEach(el => {
        el.addEventListener("click", () => {
            if (!el.dataset.read) { // Sprawdź, czy tekst został już odczytany
                readText(el.textContent.trim());
                el.dataset.read = "true"; // Oznacz element jako odczytany
            }
        });
    });

    // Dodaj obsługę kliknięcia dla obrazków, aby czytać tekst alternatywny
    document.querySelectorAll("img").forEach(img => {
        img.addEventListener("click", () => {
            if (!img.dataset.read) { // Sprawdź, czy tekst alternatywny został już odczytany
                readText(img.alt.trim());
                img.dataset.read = "true"; // Oznacz obrazek jako odczytany
            }
        });
    });

    // Dodano sprawdzenie, czy obrazki mają poprawne źródła
    document.querySelectorAll("img").forEach(img => {
        if (!img.src || img.src.trim() === "") {
            console.error(`Obrazek z alt="${img.alt}" nie ma ustawionego src.`);
        }
    });

    // Usunięto potencjalne konflikty z klasami i atrybutami
    document.querySelectorAll("img").forEach(img => {
        img.addEventListener("error", () => {
            console.error(`Nie udało się załadować obrazka: ${img.src}`);
        });
    });

    // Sprawdź, czy istnieje tylko jeden element .mobile-categories
    const existingMobileCategories = document.querySelectorAll(".mobile-categories");
    if (existingMobileCategories.length > 1) {
        for (let i = 1; i < existingMobileCategories.length; i++) {
            existingMobileCategories[i].remove(); // Usuń duplikaty
        }
    }

    function handleClick(idx) {
        // reset
        if (idx === 0) {
            document.querySelectorAll("p, span, ul").forEach(el => el.style.fontSize = "");
            isAPlusClicked = isAPlusPlusClicked = false;
            return;
        }
        // A+
        if (idx === 1 && !isAPlusClicked) {
            document.querySelectorAll("p, span, ul").forEach(el => {
                const size = parseFloat(getComputedStyle(el).fontSize);
                el.style.fontSize = `${size + fontSizeAPlusIncrement}px`;
            });
            isAPlusClicked = true;
            return;
        }
        // A++
        if (idx === 2 && !isAPlusPlusClicked) {
            document.querySelectorAll("p, span, ul").forEach(el => {
                const size = parseFloat(getComputedStyle(el).fontSize);
                el.style.fontSize = `${size + fontSizeAPlusPlusIncrement}px`;
            });
            isAPlusPlusClicked = true;
            return;
        }
        // high contrast
        if (idx === 3) {
            isHighContrastMode = !isHighContrastMode;
            document.body.classList.toggle("high-contrast-mode", isHighContrastMode);
        }
    }

    // wspólna inicjalizacja dla desktop i mobile
    ['.availability-item', '.mobile-availability-item'].forEach(selector => {
        document.querySelectorAll(selector).forEach((el, idx) => {
            el.addEventListener('click', () => handleClick(idx));
        });
    });

    const toggleReadingButton = document.getElementById("toggle-reading");
    const scrollToTopButton = document.getElementById("scroll-to-top");

    let isReadingEnabled = true;

    toggleReadingButton.addEventListener("click", () => {
        isReadingEnabled = !isReadingEnabled;
        toggleReadingButton.textContent = isReadingEnabled ? "Wyłącz czytanie tekstu" : "Włącz czytanie tekstu";
        toggleReadingButton.setAttribute("aria-pressed", isReadingEnabled.toString());
        document.body.dataset.readingEnabled = isReadingEnabled;
    });

    scrollToTopButton.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });

    window.addEventListener("scroll", () => {
        scrollToTopButton.style.display = window.scrollY > 300 ? "block" : "none";
    });

    // Przykładowe skrypty z allegro.html
    const exampleFunction = () => {
        console.log("Skrypt z allegro.html został przeniesiony.");
    };

    exampleFunction();

    // Sprawdzenie, czy div.search istnieje i ma poprawne dzieci
    const searchDiv = document.querySelector(".search");
    if (!searchDiv) {
        console.error("Nie znaleziono elementu .search");
    } else {
        const input1 = searchDiv.querySelector(".input1");
        const input2 = searchDiv.querySelector(".input2");
        const button = searchDiv.querySelector(".navbar-btn");

        if (!input1 || !input2 || !button) {
            console.error("Nie znaleziono elementów .input1, .input2 lub .navbar-btn w .search");
        }
    }

    // Sprawdzenie, czy div.search istnieje i ma poprawne dzieci
    if (searchDiv) {
        const inputs = searchDiv.querySelectorAll("input");
        if (inputs.length === 0) {
            console.error("Nie znaleziono elementów <input> w .search");
        }
    }
});
