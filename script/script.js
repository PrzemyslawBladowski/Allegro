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

    if (availabilityItems.length > 0) {
        availabilityItems[0].addEventListener("click", () => {
            document.querySelectorAll("p, span, ul").forEach(el => {
                if (!el.closest(".mobile-buy-container")) {
                    el.style.fontSize = ""; // Przywróć nowy domyślny rozmiar z CSS
                }
            });
            if (categories) {
                categories.querySelectorAll("p").forEach(el => {
                    el.style.fontSize = ""; // Przywróć domyślny rozmiar tekstu w .mobile-categories
                });
            }
            isAPlusClicked = false;
            isAPlusPlusClicked = false;
        });

        availabilityItems[1].addEventListener("click", () => {
            if (!isAPlusClicked) {
                document.querySelectorAll("p, span, ul").forEach(el => {
                    if (!el.closest(".mobile-buy-container") && !el.closest(".mobile-categories")) {
                        const currentSize = parseFloat(window.getComputedStyle(el).fontSize);
                        el.style.fontSize = `${currentSize + fontSizeAPlusIncrement}px`;
                    }
                });
                if (categories) {
                    categories.querySelectorAll("p").forEach(el => {
                        const currentSize = parseFloat(window.getComputedStyle(el).fontSize);
                        el.style.fontSize = `${currentSize + fontSizeAPlusIncrement}px`;
                    });
                }
                isAPlusClicked = true;
            }
        });

        availabilityItems[2].addEventListener("click", () => {
            if (!isAPlusPlusClicked) {
                document.querySelectorAll("p, span, ul").forEach(el => {
                    if (!el.closest(".mobile-buy-container") && !el.closest(".mobile-categories")) {
                        const currentSize = parseFloat(window.getComputedStyle(el).fontSize);
                        el.style.fontSize = `${currentSize + fontSizeAPlusPlusIncrement}px`;
                    }
                });
                if (categories) {
                    categories.querySelectorAll("p").forEach(el => {
                        const currentSize = parseFloat(window.getComputedStyle(el).fontSize);
                        el.style.fontSize = `${currentSize + fontSizeAPlusPlusIncrement}px`;
                    });
                }
                isAPlusPlusClicked = true;
            }
        });

        availabilityItems[3].addEventListener("click", () => {
            isHighContrastMode = !isHighContrastMode;
            document.body.classList.toggle("high-contrast-mode", isHighContrastMode);

            // Ustawienia dla wysokiego kontrastu
            if (isHighContrastMode) {
                document.documentElement.style.backgroundColor = "black"; // Zmień tło <html> na czarne
                document.body.style.backgroundColor = "black"; // Zmień tło <body> na czarne
                document.querySelectorAll("div").forEach(el => {
                    el.style.backgroundColor = "black";
                });
                document.querySelectorAll(".mobile-navbar-btn, .mobile-add-to-basket-button, .mobile-buy-button, .mobile-first-color-box, .mobile-memory-box, .mobile-ram-box").forEach(el => {
                    el.style.backgroundColor = "yellow";
                    el.style.color = "black";
                    el.style.borderColor = "yellow";
                });
                document.querySelectorAll("p, span, a").forEach(el => {
                    el.style.color = "yellow";
                });

                // Zmień kolor tekstu w boxach w mobile-buy-container na czarny
                document.querySelectorAll(".mobile-buy-container .mobile-first-color-box p, .mobile-buy-container .mobile-ram-box p, .mobile-buy-container .mobile-memory-box p").forEach(el => {
                    el.style.color = "black";
                });

                // Zmień kolor tekstu w drugim boxie (mobile-second-color-box) na żółty
                document.querySelectorAll(".mobile-buy-container .mobile-second-color-box p").forEach(el => {
                    el.style.color = "yellow";
                });

                // Zmień kolor pozostałych elementów <p> w mobile-buy-container na żółty
                document.querySelectorAll(".mobile-buy-container p:not(.mobile-first-color-box p):not(.mobile-second-color-box p):not(.mobile-ram-box p):not(.mobile-memory-box p)").forEach(el => {
                    el.style.color = "yellow";
                });

                // Zmień kolor listy pod specyfikacją urządzenia na żółty
                document.querySelectorAll(".mobile-long-description ul li").forEach(el => {
                    el.style.color = "yellow";
                });

                // Zmień styl dla mobile-second-color-box
                document.querySelectorAll(".mobile-second-color-box").forEach(el => {
                    el.style.borderColor = "yellow";
                });

                // Zmień styl dla mobile-quanity-boxes
                document.querySelectorAll(".mobile-guantity-boxes div").forEach(el => {
                    el.style.borderColor = "yellow";
                    el.style.color = "yellow";
                });

                // Zmień kolor tekstu w mobile-first-input na żółty
                document.querySelector(".mobile-first_input").style.color = "yellow";

                // Zmień kolor ikon SVG na żółty
                document.querySelectorAll("svg").forEach(el => {
                    el.style.stroke = "yellow";
                    el.style.fill = "yellow";
                });
            } else {
                // Przywróć domyślne style
                document.documentElement.style.backgroundColor = ""; // Przywróć domyślne tło <html>
                document.body.style.backgroundColor = ""; // Przywróć domyślne tło <body>
                document.querySelectorAll("div").forEach(el => {
                    el.style.backgroundColor = "";
                });
                document.querySelectorAll(".mobile-navbar-btn, .mobile-add-to-basket-button, .mobile-buy-button, .mobile-first-color-box, .mobile-memory-box, .mobile-ram-box").forEach(el => {
                    el.style.backgroundColor = "";
                    el.style.color = "";
                    el.style.borderColor = "";
                });
                document.querySelectorAll("p, span, a").forEach(el => {
                    el.style.color = "";
                });

                // Przywróć domyślny kolor tekstu w boxach w mobile-buy-container
                document.querySelectorAll(".mobile-buy-container .mobile-first-color-box p, .mobile-buy-container .mobile-ram-box p, .mobile-buy-container .mobile-memory-box p").forEach(el => {
                    el.style.color = "";
                });

                // Przywróć domyślny kolor tekstu w drugim boxie (mobile-second-color-box)
                document.querySelectorAll(".mobile-buy-container .mobile-second-color-box p").forEach(el => {
                    el.style.color = "";
                });

                // Przywróć domyślny kolor pozostałych elementów <p> w mobile-buy-container
                document.querySelectorAll(".mobile-buy-container p:not(.mobile-first-color-box p):not(.mobile-second-color-box p):not(.mobile-ram-box p):not(.mobile-memory-box p)").forEach(el => {
                    el.style.color = "";
                });

                // Przywróć domyślny kolor listy pod specyfikacją urządzenia
                document.querySelectorAll(".mobile-long-description ul li").forEach(el => {
                    el.style.color = "";
                });

                // Przywróć domyślny styl dla mobile-second-color-box
                document.querySelectorAll(".mobile-second-color-box").forEach(el => {
                    el.style.borderColor = "";
                });

                // Przywróć domyślny styl dla mobile-quanity-boxes
                document.querySelectorAll(".mobile-guantity-boxes div").forEach(el => {
                    el.style.borderColor = "";
                    el.style.color = "";
                });

                // Przywróć domyślny kolor tekstu w mobile-first-input
                document.querySelector(".mobile-first_input").style.color = "";

                // Przywróć domyślny kolor ikon SVG
                document.querySelectorAll("svg").forEach(el => {
                    el.style.stroke = "";
                    el.style.fill = "";
                });
            }
        });
    }

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
});
