document.addEventListener("DOMContentLoaded", function () {
  console.log("JS funcionando");

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

  const cardsContainer = document.querySelector(".cards__list");

  const editPopup = document.querySelector("#edit-popup");
  const editButton = document.querySelector(".profile__edit-button");

  const profileName = document.querySelector(".profile__title");
  const profileJob = document.querySelector(".profile__description");

  const editForm = document.querySelector("#edit-profile-form");
  const nameInput = editForm.querySelector('[name="name"]');
  const jobInput = editForm.querySelector('[name="description"]');

  const newCardPopup = document.querySelector("#new-card-popup");
  const newCardForm = document.querySelector("#new-card-form");
  const inputTitle = newCardForm.querySelector('[name="place-name"]');
  const inputLink = newCardForm.querySelector('[name="link"]');

  const addButton = document.querySelector(".profile__add-button");

  const imagePopup = document.querySelector("#image-popup");
  const popupImage = imagePopup.querySelector(".popup__image");
  const popupCaption = imagePopup.querySelector(".popup__caption");

  const closeButtons = document.querySelectorAll(".popup__close");

  function openModal(popup) {
    popup.classList.add("popup_is-opened");
  }

  function closeModal(popup) {
    popup.classList.remove("popup_is-opened");
  }

  function fillProfileForm() {
    nameInput.value = profileName.textContent;
    jobInput.value = profileJob.textContent;
  }

  editButton.addEventListener("click", function () {
    fillProfileForm();
    openModal(editPopup);
  });

  editForm.addEventListener("submit", function (evt) {
    evt.preventDefault();

    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;

    closeModal(editPopup);
  });

  function getCardElement(
    name = "Sin título",
    link = "./images/placeholder.jpg",
  ) {
    const template = document
      .querySelector("#card-template")
      .content.querySelector(".card");

    const cardElement = template.cloneNode(true);

    const cardTitle = cardElement.querySelector(".card__title");
    const cardImage = cardElement.querySelector(".card__image");
    const like = cardElement.querySelector(".card__like-button");
    const del = cardElement.querySelector(".card__delete-button");

    cardTitle.textContent = name;
    cardImage.src = link;
    cardImage.alt = name;

    cardImage.addEventListener("click", () => {
      popupImage.src = link;
      popupImage.alt = name;
      popupCaption.textContent = name;
      openModal(imagePopup);
    });

    like.addEventListener("click", () => {
      like.classList.toggle("card__like-button_is-active");
    });

    del.addEventListener("click", () => {
      cardElement.remove();
    });

    return cardElement;
  }

  function renderCard(name, link, container) {
    const cardElement = getCardElement(name, link);
    container.prepend(cardElement);
  }

  initialCards.forEach((item) => {
    renderCard(item.name, item.link, cardsContainer);
  });

  addButton.addEventListener("click", () => {
    openModal(newCardPopup);
  });

  function handleCardFormSubmit(evt) {
    evt.preventDefault();

    renderCard(inputTitle.value, inputLink.value, cardsContainer);

    newCardForm.reset();
    closeModal(newCardPopup);
  }

  newCardForm.addEventListener("submit", handleCardFormSubmit);

  closeButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      closeModal(btn.closest(".popup"));
    });
  });
});
