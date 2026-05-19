import { enableValidation } from "../scripts/validate.js";

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

const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");

const profilePopup = document.querySelector("#profile-popup");
const addCardPopup = document.querySelector("#add-card-popup");
const imagePopup = document.querySelector("#image-popup");

const profileForm = document.forms["profile-form"];
const nameInput = profileForm.elements.name;
const descriptionInput = profileForm.elements.description;

const addCardForm = document.forms["add-card-form"];
const cardTitleInput = addCardForm.elements.title;
const cardLinkInput = addCardForm.elements.link;

const cardsList = document.querySelector(".cards__list");
const cardTemplate = document.querySelector("#card-template").content;

const popupImage = imagePopup.querySelector(".popup__image");
const popupCaption = imagePopup.querySelector(".popup__caption");

const popups = document.querySelectorAll(".popup");

function handleEscClose(evt) {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector(".popup_opened");
    closeModal(openedPopup);
  }
}

function openModal(popup) {
  popup.classList.add("popup_opened");
  document.addEventListener("keydown", handleEscClose);
}

function closeModal(popup) {
  popup.classList.remove("popup_opened");
  document.removeEventListener("keydown", handleEscClose);
}

function createCard(cardData) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  const likeButton = cardElement.querySelector(".card__like-button");
  const deleteButton = cardElement.querySelector(".card__delete-button");

  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  cardTitle.textContent = cardData.name;

  likeButton.addEventListener("click", () => {
    likeButton.classList.toggle("card__like-button_active");
  });

  deleteButton.addEventListener("click", () => {
    cardElement.remove();
  });

  cardImage.addEventListener("click", () => {
    popupImage.src = cardData.link;
    popupImage.alt = cardData.name;
    popupCaption.textContent = cardData.name;
    openModal(imagePopup);
  });

  return cardElement;
}

function renderCard(cardData) {
  const cardElement = createCard(cardData);
  cardsList.prepend(cardElement);
}

function fillProfileForm() {
  nameInput.value = profileTitle.textContent;
  descriptionInput.value = profileDescription.textContent;
  openModal(profilePopup);
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();

  profileTitle.textContent = nameInput.value;
  profileDescription.textContent = descriptionInput.value;

  closeModal(profilePopup);
}

function handleAddCardFormSubmit(evt) {
  evt.preventDefault();

  const newCard = {
    name: cardTitleInput.value,
    link: cardLinkInput.value,
  };

  renderCard(newCard);
  addCardForm.reset();
  closeModal(addCardPopup);
}

initialCards.reverse().forEach((cardData) => {
  renderCard(cardData);
});

profileEditButton.addEventListener("click", fillProfileForm);

profileAddButton.addEventListener("click", () => {
  openModal(addCardPopup);
});

profileForm.addEventListener("submit", handleProfileFormSubmit);
addCardForm.addEventListener("submit", handleAddCardFormSubmit);

popups.forEach((popup) => {
  const closeButton = popup.querySelector(".popup__close");

  closeButton.addEventListener("click", () => {
    closeModal(popup);
  });

  popup.addEventListener("mousedown", (evt) => {
    if (evt.target === popup) {
      closeModal(popup);
    }
  });
});

enableValidation({
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
});
