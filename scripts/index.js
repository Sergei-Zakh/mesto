const popup = document.querySelector('.popup');

let nameInput = document.querySelector('.popup__input_profile_name');
let aboutInput = document.querySelector('.popup__input_profile_about');

let profileAutor = document.querySelector('.profile__author');
let profileDescription = document.querySelector('.profile__description');


const popupButtonOpen = document.querySelector('.profile__edit-button');
popupButtonOpen.addEventListener('click', popupButtonOpenFunction);
function popupButtonOpenFunction(evt) {
    evt.preventDefault();
    setPopupInputValueFunction();
    openPopup(popup);
}

// Из брифа по ПР4:
// "После внесения изменений и нажатия кнопки «Сохранить» информация на странице
//  должна обновиться, а попап автоматически закрыться"

const popupButtonSave = document.querySelector('.popup__button-save');
popupButtonSave.addEventListener('click', popupButtonSaveFunction);
nameInput.addEventListener('submit', popupButtonSaveFunction);
aboutInput.addEventListener('submit', popupButtonSaveFunction);

function popupButtonSaveFunction(evt) {
    evt.preventDefault();
    saveChangesPopupFunction();
    closePopup();
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