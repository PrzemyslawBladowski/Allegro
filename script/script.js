document.addEventListener("DOMContentLoaded", () => {
    const fontSizeDefault = 21; // Nowy domyślny rozmiar czcionki (A+)
    const fontSizeAPlusIncrement = 2; // Powiększenie o 2px dla A+ w .mobile-categories
    const fontSizeAPlusPlusIncrement = 4; // Powiększenie o 4px dla A++ w .mobile-categories
    let isAPlusClicked = false;
    let isAPlusPlusClicked = false;

    const availabilityItems = document.querySelectorAll(".mobile-availability-item");
    const categories = document.querySelector(".mobile-categories");

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
            // Ostatnie A - brak akcji
        });
    }
});
