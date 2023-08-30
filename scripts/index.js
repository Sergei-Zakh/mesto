// ul-контейнер для рендера карточек
const cardsContainer = document.querySelector(".elements__container");
// все попапы
const popupEditProfile = document.querySelector(".popup_type_edit-profile");
const popupAddCard = document.querySelector(".popup_type_add-card");
const popupFullscreenImage = document.querySelector(".popup_type_open-image");
// формы попапов
const formElementProfile = document.querySelector(".popup__form_edit-profile");
const formElementAddCard = document.querySelector(".popup__form_add-card");
// для редактирования профиля
const nameInput = document.querySelector(".popup__input_profile_name");
const aboutInput = document.querySelector(".popup__input_profile_about");
const profileAuthor = document.querySelector(".profile__author");
const profileDescription = document.querySelector(".profile__description");
// для добавления карточки с картинкой
const imageNameInput = document.querySelector(".popup__input_image_name");
const imageLinkInput = document.querySelector(".popup__input_image_link");
// для попапа картинки-фулскрин
const fullscreenPic = popupFullscreenImage.querySelector(".popup__image");
const fullscreenCaption = popupFullscreenImage.querySelector(".popup__caption");
// для получения содержимого template
const cardTemplate = document.querySelector("#element").content;
// кнопки вызова/закрытия попапов
const popupEditProfileButton = document.querySelector(".profile__edit-button");
const popupAddCardButton = document.querySelector(".profile__add-button");
const popupOpenImageButtonClose = popupFullscreenImage.querySelector(".popup__button-close");
const popupProfileButtonClose = popupEditProfile.querySelector(".popup__button-close");
const popupAddCardButtonClose = popupAddCard.querySelector(".popup__button-close");


// создание карточки
function createCard(name, link) {
    // клонируем содержимое тега template:
    const cardElement = cardTemplate.querySelector(".element").cloneNode(true);
    // наполняем содержимым
    const cardImage = cardElement.querySelector(".element__image");
    cardImage.src = link;
    cardImage.alt = name;
    //cardElement.querySelector(".element__image").alt = name;
    cardElement.querySelector(".element__title").textContent = name;
    // прикручиваем лайк
    const buttonLike = cardElement.querySelector(".element__like-button");
    buttonLike.addEventListener("click", () => {
        buttonLike.classList.toggle("element__like-button_active");
    });
    // прикручиваем мусорку
    cardElement.querySelector(".element__trash-button").addEventListener("click", () => cardElement.remove());
    // прикручиваем слушатель для фулскрин-изображений 
    cardImage.addEventListener("click", function (evt) {
        openImagePopup(evt.target);
    });
    function openImagePopup() {
        fullscreenPic.src = link;
        fullscreenPic.alt = name;
        fullscreenCaption.textContent = name;
        openPopup(popupFullscreenImage);
    }
    // возвращаем результат
    return cardElement;
}

// автонаполнение карточками из массива
initialCards.forEach((element) => {
    cardsContainer.prepend(createCard(element.name, element.link));
});

// общая функция открытия ЛЮБОГО попапа 
function openPopup(activePopup) {
    activePopup.classList.add("popup_opened");
    // слушатель закрытия на Esc добавляется при открытии модального окна
    document.addEventListener('keydown', escapePopup);
}

// открытие попапа профиля
function openPopupEditProfileButton() {
    setProfileFormValues();
    openPopup(popupEditProfile);
    disableProfileSubmitButton();
}

// default-значение полей попапа профиля
function setProfileFormValues() {
    nameInput.value = profileAuthor.textContent;
    aboutInput.value = profileDescription.textContent;
}

// открытие попапа добавления карточки
function openPopupAddCardButtonFunction() {
    openPopup(popupAddCard);
    disableAddCardSubmitButton();
}

// общая функция закрытия ЛЮБОГО попапа 
function closePopup(activePopup) {
    // слушатель закрытия на Esc удаляется при закрытии попапа
    document.removeEventListener('keydown', escapePopup);
    activePopup.classList.remove("popup_opened");
}

// закрытие попапа картинки-фулскрин
function closePopupFullscreenImage() {
    closePopup(popupFullscreenImage);
}

// закрытие попапа профиля
function closePopupEditProfile() {
    closePopup(popupEditProfile);
}

// закрытие попапа добавления карточки
function closePopupAddCard() {
    closePopup(popupAddCard);
}

// закрытие попапа через оверлей
const popups = document.querySelectorAll('.popup');
popups.forEach((popup) => {
    popup.addEventListener('mousedown', (evt) => {
        if (evt.target.classList.contains('popup_opened')) {
            closePopup(popup);
        };
    });
});

// функция закрытия попапа через Escape (вызывается при открытии попапа)
function escapePopup(evt) {
    if (evt.key === 'Escape') {
        const openedPopup = document.querySelector(".popup_opened");
        closePopup(openedPopup);
    }
};

// сохранение изменений в полях профиля
function saveChangesProfilePopup() {
    profileAuthor.textContent = nameInput.value;
    profileDescription.textContent = aboutInput.value;
}

// сохранение изменений в полях добавления карточки + очистка полей ввода
function saveChangesPopupAddCard() {
    let imageName = imageNameInput.value;
    let imageLink = imageLinkInput.value;
    cardsContainer.prepend(createCard(imageName, imageLink));
    document.getElementById("popup__form_add-card").reset();
}

// submit попапа профиля
function handleFormSubmitEditProfile(evt) {
    evt.preventDefault();
    saveChangesProfilePopup();
    closePopupEditProfile();
}

// submit попапа добавления карточки
function handleFormSubmitAddCard(evt) {
    evt.preventDefault();
    saveChangesPopupAddCard();
    closePopupAddCard();
}

function disableProfileSubmitButton() {
    const submitButton = document.getElementById("button-save_edit-profile");
    submitButton.classList.add('popup__button-save_inactive');
    submitButton.disabled = true;
}

function disableAddCardSubmitButton() {
    const submitButton = document.getElementById("button-save_add-card");
    submitButton.classList.add('popup__button-save_inactive');
    submitButton.disabled = true;
}

formElementProfile.addEventListener("submit", handleFormSubmitEditProfile);
formElementAddCard.addEventListener("submit", handleFormSubmitAddCard);
popupEditProfileButton.addEventListener("click", openPopupEditProfileButton);
popupAddCardButton.addEventListener("click", openPopupAddCardButtonFunction);
popupOpenImageButtonClose.addEventListener("click", closePopupFullscreenImage);
popupProfileButtonClose.addEventListener("click", closePopupEditProfile);
popupAddCardButtonClose.addEventListener("click", closePopupAddCard);