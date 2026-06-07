export class Popup {
    popupElement;
    constructor(popupSelector) {
        this.popupElement = document.querySelector(popupSelector);
    }
    handleEscClose = (evt) => {
        if (evt.key === "Escape") {
            this.close();
        }
    };
    open(...args) {
        this.popupElement.classList.add("popup_opened");
        document.addEventListener("keydown", this.handleEscClose);
    }
    close() {
        this.popupElement.classList.remove("popup_opened");
        document.removeEventListener("keydown", this.handleEscClose);
    }
    setEventListeners() {
        const closeButton = this.popupElement.querySelector(".popup__close");
        closeButton?.addEventListener("click", () => {
            this.close();
        });
        this.popupElement.addEventListener("mousedown", (evt) => {
            if (evt.target === this.popupElement) {
                this.close();
            }
        });
    }
}
//# sourceMappingURL=Popup.js.map