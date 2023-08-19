// ul-контейнер для рендера карточек
const elementsContainer = document.querySelector(".elements__container");
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
const profileAutor = document.querySelector(".profile__author");
const profileDescription = document.querySelector(".profile__description");
// для добавления карточки с картинкой
const imageNameInput = document.querySelector(".popup__input_image_name");
const imageLinkInput = document.querySelector(".popup__input_image_link");
// для попапа картинки-фулскрин
const fullscreenPic = popupFullscreenImage.querySelector(".popup__image");
const fullscreenCaption = popupFullscreenImage.querySelector(".popup__caption");
// для получения содержимого template
const сardTemplate = document.querySelector("#element").content;
const cardElement = сardTemplate.querySelector(".element");

// создание карточки
function createCard(name, link) {
    // клонируем содержимое тега template:
    const cardElement = сardTemplate.querySelector(".element").cloneNode(true);
    // наполняем содержимым
    cardElement.querySelector(".element__image").src = link;
    cardElement.querySelector(".element__image").alt = name;
    cardElement.querySelector(".element__title").textContent = name;
    // прикручиваем лайк
    cardElement.querySelector(".element__like-button").addEventListener("click", function (evt) {
        evt.target.classList.toggle("element__like-button_active");
    });
    // прикручиваем мусорку
    cardElement.querySelector(".element__trash-button").addEventListener("click", () => cardElement.remove());
    // прикручиваем слушатель для фулскрин-изображений 
    cardElement.querySelector(".element__image").addEventListener("click", function (evt) {
        popupOpenImageFunction(evt.target);
    });
    function popupOpenImageFunction() {
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
    elementsContainer.prepend(createCard(element.name, element.link));
});

// общая функция открытия ЛЮБОГО попапа 
function openPopup(activePopup) {
    activePopup.classList.add("popup_opened");
}

// открытие попапа профиля
function openPopupButtonFunction(evt) {
    evt.preventDefault();
    setPopupInputValueFunction();
    openPopup(popupEditProfile);
}
const popupEditProfileButtonOpen = document.querySelector(".profile__edit-button");
popupEditProfileButtonOpen.addEventListener("click", openPopupButtonFunction);

// default-значение полей попапа профиля
function setPopupInputValueFunction() {
    nameInput.value = profileAutor.textContent;
    aboutInput.value = profileDescription.textContent;
}

// открытие попапа добавления карточки
function openPopupAddCardButtonFunction(evt) {
    evt.preventDefault();
    openPopup(popupAddCard);
}
const popupAddСardButtonOpen = document.querySelector(".profile__add-button");
popupAddСardButtonOpen.addEventListener("click", openPopupAddCardButtonFunction);


// общая функция закрытия ЛЮБОГО попапа 
function closePopup(activePopup) {
    activePopup.classList.remove("popup_opened");
}

// закрытие попапа картинки-фулскрин
function closePopupFullscreenImage() {
    closePopup(popupFullscreenImage);
}
const popupOpenImageButtonClose = popupFullscreenImage.querySelector(".popup__button-close");
popupOpenImageButtonClose.addEventListener("click", closePopupFullscreenImage);

// закрытие попапа профиля
function closePopupEditProfile() {
    closePopup(popupEditProfile);
}
const popupButtonClose = popupEditProfile.querySelector(".popup__button-close");
popupButtonClose.addEventListener("click", closePopupEditProfile);

// закрытие попапа добавления карточки
function closepopupAddCard() {
    closePopup(popupAddCard);
}
const popupAddCardButtonClose = popupAddCard.querySelector(".popup__button-close");
popupAddCardButtonClose.addEventListener("click", closepopupAddCard);

// сохранение изменений в полях профиля
function saveChangesPopupFunction() {
    profileAutor.textContent = nameInput.value;
    profileDescription.textContent = aboutInput.value;
}

// сохранение изменений в полях добавления карточки + очистка полей ввода
function saveChangesPopupAddCard() {
    imageName = imageNameInput.value;
    imageLink = imageLinkInput.value;
    elementsContainer.prepend(createCard(imageName, imageLink));
    imageNameInput.value = '';
    imageLinkInput.value = '';
}

// submit попапа профиля
function handleFormSubmitEditProfile(evt) {
    evt.preventDefault();
    saveChangesPopupFunction();
    closePopupEditProfile();
}

// submit попапа добавления карточки
function handleFormSubmitAddCard(evt) {
    evt.preventDefault();
    saveChangesPopupAddCard();
    closepopupAddCard();
}

formElementProfile.addEventListener("submit", handleFormSubmitEditProfile);
formElementAddCard.addEventListener("submit", handleFormSubmitAddCard);