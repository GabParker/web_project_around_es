import { Section } from "./components/Section.js";
import { FormValidator } from "./components/FormValidator.js";
import { defaultFormConfig } from "./utils/constants.js";
import { Card } from "./components/Card.js";
import { PopupWithImage } from "./components/PopupWithImage.js";
import { PopupWithForm } from "./components/PopupWithForm.js";
import { UserInfo } from "./components/UserInfo.js";
const initialCards = [
    {
        name: "Valle de Yosemite",
        link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_yosemite.jpg",
    },
    {
        name: "Lago Louise",
        link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lake-louise.jpg",
    },
    {
        name: "Montañas Calvas",
        link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_bald-mountains.jpg",
    },
    {
        name: "Latemar",
        link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_latemar.jpg",
    },
    {
        name: "Parque Nacional de la Vanoise",
        link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_vanoise.jpg",
    },
    {
        name: "Lago di Braies",
        link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lago.jpg",
    },
];
const profileEditButton = document.querySelector(".profile__edit-button");
const profileAddButton = document.querySelector(".profile__add-button");
const profileForm = document.forms.namedItem("profile-form");
const nameInput = profileForm.elements.namedItem("name");
const descriptionInput = profileForm.elements.namedItem("description");
const addCardForm = document.forms.namedItem("add-card-form");
const profileFormValidator = new FormValidator(defaultFormConfig, profileForm);
const addCardFormValidator = new FormValidator(defaultFormConfig, addCardForm);
profileFormValidator.enableValidation();
addCardFormValidator.enableValidation();
const userInfo = new UserInfo({
    nameSelector: ".profile__title",
    descriptionSelector: ".profile__description",
});
const imagePopup = new PopupWithImage("#image-popup");
imagePopup.setEventListeners();
function createCard(cardData) {
    const card = new Card(cardData, "#card-template", (name, link) => {
        imagePopup.open(name, link);
    });
    return card.generateCard();
}
const cardSection = new Section({
    items: initialCards,
    renderer: (cardData) => {
        const cardElement = createCard(cardData);
        cardSection.addItem(cardElement);
    },
}, ".cards__list");
const profilePopup = new PopupWithForm("#profile-popup", (inputValues) => {
    userInfo.setUserInfo({
        name: inputValues.name,
        description: inputValues.description,
    });
    profilePopup.close();
});
profilePopup.setEventListeners();
const addCardPopup = new PopupWithForm("#add-card-popup", (inputValues) => {
    const newCard = {
        name: inputValues.title,
        link: inputValues.link,
    };
    const cardElement = createCard(newCard);
    cardSection.addItem(cardElement);
    addCardPopup.close();
});
addCardPopup.setEventListeners();
cardSection.renderItems();
profileEditButton?.addEventListener("click", () => {
    const currentUserInfo = userInfo.getUserInfo();
    nameInput.value = currentUserInfo.name;
    descriptionInput.value = currentUserInfo.description;
    profileFormValidator.resetValidation();
    profilePopup.open();
});
profileAddButton?.addEventListener("click", () => {
    addCardFormValidator.resetValidation();
    addCardPopup.open();
});
//# sourceMappingURL=index.js.map