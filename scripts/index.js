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
    popup.classList.add("popup_opened");
  }

  function closeModal(popup) {
    popup.classList.remove("popup_opened");
  }

  // ===== EDIT PROFILE =====
  editButton.addEventListener("click", function () {
    // llenar inputs al abrir
    nameInput.value = profileName.textContent;
    jobInput.value = profileJob.textContent;
    openModal(editPopup);
  });

  // 🔥 SUBMIT (con alert para verificar)
  editForm.addEventListener("submit", function (evt) {
    evt.preventDefault();

    alert("SUBMIT OK"); // 👈 verificación

    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;

    closeModal(editPopup);
  });

  // ===== CARDS =====
  function createCard(data) {
    const template = document
      .querySelector("#card-template")
      .content.querySelector(".card");

    const card = template.cloneNode(true);

    const img = card.querySelector(".card__image");
    const title = card.querySelector(".card__title");
    const like = card.querySelector(".card__like-button");
    const del = card.querySelector(".card__delete-button");

    img.src = data.link;
    img.alt = data.name;
    title.textContent = data.name;

    img.addEventListener("click", () => {
      popupImage.src = data.link;
      popupImage.alt = data.name;
      popupCaption.textContent = data.name;
      openModal(imagePopup);
    });

    like.addEventListener("click", () => {
      like.classList.toggle("card__like-button_is-active");
    });

    del.addEventListener("click", () => {
      card.remove();
    });

    return card;
  }

  // render inicial
  initialCards.forEach((item) => {
    cardsContainer.append(createCard(item));
  });

  // ===== NUEVA CARD =====
  addButton.addEventListener("click", () => {
    openModal(newCardPopup);
  });

  newCardForm.addEventListener("submit", function (evt) {
    evt.preventDefault();

    const card = createCard({
      name: inputTitle.value,
      link: inputLink.value,
    });

    cardsContainer.prepend(card);

    newCardForm.reset();
    closeModal(newCardPopup);
  });

  // ===== CERRAR POPUPS =====
  closeButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      closeModal(btn.closest(".popup"));
    });
  });
});
