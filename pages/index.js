const popup = document.querySelector('.popup');

let nameInput = document.querySelector('.popup__input_name');
let aboutInput = document.querySelector('.popup__input_about');

let profileAutor = document.querySelector('.profile__author');
let profileDescription = document.querySelector('.profile__description');


const popupButtonOpen = document.querySelector('.profile__edit-button');
popupButtonOpen.addEventListener('click', popupButtonOpenFunction);
function popupButtonOpenFunction(evt) {
    evt.preventDefault();
    setPopupInputValueFunction();
    openPopup(popup);
}

const popupButtonSave = document.querySelector('.popup__button-save');
popupButtonSave.addEventListener('click', popupButtonSaveFunction);
function popupButtonSaveFunction(evt) {
    evt.preventDefault();
    saveChangesPopupFunction();
    closePopup(popup);
}

const popupButtonClose = document.querySelector('.popup__button-close');
popupButtonClose.addEventListener('click', popupButtonCloseFunction);
function popupButtonCloseFunction(evt) {
    closePopup(popup);
}


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

