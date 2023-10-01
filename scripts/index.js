import { Card } from './Card.js';
import { FormValidator } from './FormValidator.js';
import { initialCards } from './initialCards.js';

const configForm = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button-save',
    inactiveButtonClass: 'popup__button-save_inactive',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__input-error_active'
  }; 

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
// кнопки вызова/закрытия/submit попапов
const popupEditProfileButton = document.querySelector(".profile__edit-button");
const popupAddCardButton = document.querySelector(".profile__add-button");
const popupOpenImageButtonClose = popupFullscreenImage.querySelector(".popup__button-close");
const popupProfileButtonClose = popupEditProfile.querySelector(".popup__button-close");
const popupAddCardButtonClose = popupAddCard.querySelector(".popup__button-close");
// экземпляры класса FormValidator
const editProfileForm = new FormValidator(configForm, popupEditProfile); 
const addCardForm = new FormValidator(configForm, popupAddCard); 


// автонаполнение карточками из массива
initialCards.forEach((item) => {
    // Создаём экземпляр карточки
    const card = new Card(item.name, item.link, '#element', handleOpenPopup);
    // Создаём карточку и возвращаем наружу
    const cardElement = card.generateCard();
    // Добавляем в DOM
    //const cardsContainer = document.querySelector(".elements__container");
    cardsContainer.prepend(cardElement);
  });

// общая функция открытия ЛЮБОГО попапа 
function openPopup(activePopup) {
    activePopup.classList.add("popup_opened");
    // слушатель закрытия на Esc добавляется при открытии модального окна
    document.addEventListener('keydown', handleClosePopupByEsc);
}

// открытие попапа профиля
function openPopupEditProfileButton() {
    // очищаем форму от ошибок предыдущей попытки ввода
    editProfileForm._resetValidation();
    setProfileFormValues();
    openPopup(popupEditProfile);
}

// default-значение полей попапа профиля
function setProfileFormValues() {
    nameInput.value = profileAuthor.textContent;
    aboutInput.value = profileDescription.textContent;
}

// открытие попапа добавления карточки
function openPopupAddCardButtonFunction() {
    openPopup(popupAddCard);
}

// общая функция закрытия ЛЮБОГО попапа 
function closePopup(activePopup) {
    // слушатель закрытия на Esc удаляется при закрытии попапа
    document.removeEventListener('keydown', handleClosePopupByEsc);
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
function handleClosePopupByEsc(evt) {
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

const popupImage = popupFullscreenImage.querySelector(".popup__image");
const popupImageCaption = popupFullscreenImage.querySelector(".popup__caption");

// открытие попапа изображения-фуллскрин
function handleOpenPopup(name, link) {
    popupImage.src = link; 
    popupImage.alt = name; 
    popupImageCaption.textContent = name; 
    openPopup(popupFullscreenImage);
}   

// сохранение изменений в полях + добавление карточки + очистка полей ввода
function saveChangesPopupAddCard() {
    const imageName = imageNameInput.value;
    const imageLink = imageLinkInput.value;
    // добавляем в DOM готовую карточку
    cardsContainer.prepend(createCard(imageName, imageLink));
    // сброс формы
    formElementAddCard.reset(); 
}

// инстанцирование класса Card и генерация разметки
function createCard(name, link) {
    // Создаём экземпляр класса Card
    const card = new Card(name, link, '#element', handleOpenPopup);
    // Создаём/рендерим карточку 
    const cardElement = card.generateCard();
    // Возвращаем готовую карточку
    return cardElement;
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


// валидация форм
editProfileForm.enableValidation();
addCardForm.enableValidation();


formElementProfile.addEventListener("submit", handleFormSubmitEditProfile);
formElementAddCard.addEventListener("submit", handleFormSubmitAddCard);
popupEditProfileButton.addEventListener("click", openPopupEditProfileButton);
popupAddCardButton.addEventListener("click", openPopupAddCardButtonFunction);

// большое спасибо за универсальный инструмент! Самостоятельно так сделать бы не смог из-за скудных знаний/умений
// закрытие всех попапов по крестику
document.querySelectorAll('.popup__button-close').forEach(button => {
    const buttonsClosePopup = button.closest('.popup'); // нашли родителя с нужным классом
    button.addEventListener('click', () => closePopup(buttonsClosePopup)); // закрыли попап
  });