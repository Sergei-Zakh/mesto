let popup = document.querySelector('.popup');

let formElement = document.querySelector('.popup__form');

let nameInput = document.querySelector('.popup__input_profile_name');
let aboutInput = document.querySelector('.popup__input_profile_about');

let profileAutor = document.querySelector('.profile__author');
let profileDescription = document.querySelector('.profile__description');

function handleFormSubmit (evt) {
    evt.preventDefault();
    profileAutor.textContent = nameInput.value;
    profileDescription.textContent = aboutInput.value;
}

formElement.addEventListener('submit', handleFormSubmit);


const popupButtonOpen = document.querySelector('.profile__edit-button');
popupButtonOpen.addEventListener('click', popupButtonOpenFunction);
function popupButtonOpenFunction(evt) {
    evt.preventDefault();
    setPopupInputValueFunction();
    openPopup(popup);
}


const popupButtonClose = document.querySelector('.popup__button-close');
popupButtonClose.addEventListener('click', closePopup);

function openPopup() {
    popup.classList.add('popup_opened');
}

function closePopup() {
    popup.classList.remove('popup_opened');
}

function saveChangesPopupFunction(){
    profileAutor.textContent = nameInput.value;
    profileDescription.textContent = aboutInput.value;
}

function setPopupInputValueFunction(){
    nameInput.value = profileAutor.textContent;
    aboutInput.value = profileDescription.textContent;
}