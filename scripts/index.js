console.log("JS funcionando");

// =====================
// 1. DATOS
// =====================
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

// =====================
// 2. SELECTORES
// =====================
const cardsContainer = document.querySelector(".cards__list");

// popup imagen
const imagePopup = document.querySelector("#image-popup");
const popupImage = imagePopup.querySelector(".popup__image");
const popupCaption = imagePopup.querySelector(".popup__caption");

// popup nueva card
const addButton = document.querySelector(".profile__add-button");
const newCardPopup = document.querySelector("#new-card-popup");
const newCardForm = document.querySelector("#new-card-form");
const inputTitle = newCardForm.querySelector('[name="place-name"]');
const inputLink = newCardForm.querySelector('[name="link"]');

// popup editar perfil
const editButton = document.querySelector(".profile__edit-button");
const editPopup = document.querySelector("#edit-popup");
const editForm = document.querySelector("#edit-profile-form");
const nameInput = editForm.querySelector('[name="name"]');
const jobInput = editForm.querySelector('[name="description"]');
const profileName = document.querySelector(".profile__title");
const profileJob = document.querySelector(".profile__description");

// botones cerrar
const closeButtons = document.querySelectorAll(".popup__close");

// =====================
// 3. FUNCIONES
// =====================
function createCard(data) {
  const cardTemplate = document
    .querySelector("#card-template")
    .content.querySelector(".card");

  const cardElement = cardTemplate.cloneNode(true);

  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  const likeButton = cardElement.querySelector(".card__like-button");
  const deleteButton = cardElement.querySelector(".card__delete-button");

  // datos
  cardImage.src = data.link;
  cardImage.alt = data.name;
  cardTitle.textContent = data.name;

  // 🖼️ popup imagen
  cardImage.addEventListener("click", function () {
    popupImage.src = data.link;
    popupImage.alt = data.name;
    popupCaption.textContent = data.name;

    imagePopup.classList.add("popup_opened");
  });

  // ❤️ like
  likeButton.addEventListener("click", function () {
    likeButton.classList.toggle("card__like-button_is-active");
  });

  // 🗑️ delete
  deleteButton.addEventListener("click", function () {
    cardElement.remove();
  });

  return cardElement;
}

// =====================
// 4. EVENTOS
// =====================

// abrir popup nueva card
addButton.addEventListener("click", function () {
  newCardPopup.classList.add("popup_opened");
  inputTitle.focus();
});

// cerrar popups
closeButtons.forEach((button) => {
  button.addEventListener("click", function () {
    const popup = button.closest(".popup");
    popup.classList.remove("popup_opened");
  });
});

// submit nueva card
newCardForm.addEventListener("submit", function (evt) {
  evt.preventDefault();

  if (!inputTitle.value || !inputLink.value) return;

  const newCard = {
    name: inputTitle.value,
    link: inputLink.value,
  };

  const cardElement = createCard(newCard);
  cardsContainer.prepend(cardElement);

  newCardForm.reset();
  newCardPopup.classList.remove("popup_opened");
});

// abrir editar perfil
editButton.addEventListener("click", function () {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;

  editPopup.classList.add("popup_opened");
  nameInput.focus();
});

// guardar perfil
editForm.addEventListener("submit", function (evt) {
  evt.preventDefault();

  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;

  editPopup.classList.remove("popup_opened");
});

// =====================
// 5. RENDER INICIAL
// =====================
initialCards.forEach((card) => {
  const cardElement = createCard(card);
  cardsContainer.append(cardElement);
});
