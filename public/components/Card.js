export class Card {
    data;
    cardElement;
    templateSelector;
    handleCardClick;
    constructor(data, templateSelector, handleCardClick) {
        this.data = data;
        this.templateSelector = templateSelector;
        this.handleCardClick = handleCardClick;
    }
    getTemplate() {
        const cardTemplate = document.querySelector(this.templateSelector);
        return cardTemplate.content
            .querySelector(".card")
            .cloneNode(true);
    }
    handleLikeClick() {
        const likeButton = this.cardElement.querySelector(".card__like-button");
        likeButton?.classList.toggle("card__like-button_is-active");
    }
    handleDeleteClick() {
        this.cardElement.remove();
    }
    setEventListeners() {
        const cardImage = this.cardElement.querySelector(".card__image");
        const likeButton = this.cardElement.querySelector(".card__like-button");
        const deleteButton = this.cardElement.querySelector(".card__delete-button");
        cardImage?.addEventListener("click", () => {
            this.handleCardClick(this.data.name, this.data.link);
        });
        likeButton?.addEventListener("click", () => {
            this.handleLikeClick();
        });
        deleteButton?.addEventListener("click", () => {
            this.handleDeleteClick();
        });
    }
    generateCard() {
        this.cardElement = this.getTemplate();
        const cardImage = this.cardElement.querySelector(".card__image");
        const cardTitle = this.cardElement.querySelector(".card__title");
        if (cardImage) {
            cardImage.src = this.data.link;
            cardImage.alt = this.data.name;
        }
        if (cardTitle) {
            cardTitle.textContent = this.data.name;
        }
        this.setEventListeners();
        return this.cardElement;
    }
}
//# sourceMappingURL=Card.js.map