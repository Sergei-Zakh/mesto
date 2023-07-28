const initialCards = [
    {
        name: "Архыз",
        link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
    },
    {
        name: "Челябинская область",
        link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
    },
    {
        name: "Иваново",
        link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
    },
    {
        name: "Камчатка",
        link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
    },
    {
        name: "Холмогорский район",
        link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
    },
    {
        name: "Байкал",
        link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
    },
];

// ul-контейнер для рендера карточек
const elementsContainer = document.querySelector(".elements__container");
// все попапы
let popup = document.querySelector(".popup");
let popupEditProfile = document.querySelector(".popup_type_edit-profile");
let popupAddCard = document.querySelector(".popup_type_add-card");
let popupFullscreenImage = document.querySelector(".popup_type_open-image");
// формы попапов
let formElementProfile = document.querySelector(".popup__form_edit-profile");
let formElementAddCard = document.querySelector(".popup__form_add-card");
// для редактирования профиля
let nameInput = document.querySelector(".popup__input_profile_name");
let aboutInput = document.querySelector(".popup__input_profile_about");
let profileAutor = document.querySelector(".profile__author");
let profileDescription = document.querySelector(".profile__description");
// для добаления карточки с картинкой
let imageNameInput = document.querySelector(".popup__input_image_name");
let imageLinkInput = document.querySelector(".popup__input_image_link");
let imageName = element.querySelector(".element__title");
let imageLink = element.querySelector(".element__image");

// автонаполнение карточками из массива (пошагово, потому что я крайне смутно понимаю, что делаю)
function addInitialCard(name, link) {
    // Чтобы получить содержимое template, нужно обратиться к его свойству content:
    const сardTemplate = document.querySelector("#element").content;
    // клонируем содержимое тега template:
    const userElement = сardTemplate.querySelector(".element").cloneNode(true);
    // наполняем содержимым
    userElement.querySelector(".element__image").src = link;
    userElement.querySelector(".element__title").textContent = name;
    // отображаем на странице
    elementsContainer.prepend(userElement);
}
initialCards.forEach((element) => {
    addInitialCard(element.name, element.link);
    // криво прикручиваем лайк
    elementsContainer.querySelector(".element__like-button").addEventListener("click", function (evt) {
        evt.target.classList.toggle("element__like-button_active");
    });
    // не менее криво прикручиваем мусорку
    const userElement = document.querySelector(".element");
    elementsContainer.querySelector(".element__trash-button").addEventListener("click", () => userElement.remove());
    // слушатель для фулскрин-изображений
    elementsContainer.querySelector(".element__image").addEventListener("click", function (evt) {
        popupOpenImageFunction(evt.target);
    });
    // + открытие попапа фулскрин
    let popupOpenImage = elementsContainer.querySelector(".element__image");
    popupOpenImage.addEventListener("click", popupOpenImageFunction);
    function popupOpenImageFunction() {
        let fullscreenPic = popupFullscreenImage.querySelector(".popup__image");
        let fullscreenCaption = popupFullscreenImage.querySelector(".popup__caption");
        let imageName = document.querySelector(".element__title");
        fullscreenPic.src = popupOpenImage.src;
        fullscreenCaption.textContent = imageName.textContent;
        openPopupFullscreen(popupFullscreenImage);
    }

    function openPopupFullscreen() {
        popupFullscreenImage.classList.add("popup_opened");
    }
});

// добавление карточек вручную
function addCard(imageLink, imageName) {
    const сardTemplate = document.querySelector("#element").content;
    const userElement = сardTemplate.querySelector(".element").cloneNode(true);
    userElement.querySelector(".element__image").src = imageLink;
    userElement.querySelector(".element__title").textContent = imageName;
    elementsContainer.prepend(userElement);
    // добавил в массив initialCards
    initialCards.unshift({ name: imageName, link: imageLink });
    // аналогично прикручиваем лайк
    elementsContainer.querySelector(".element__like-button").addEventListener("click", function (evt) {
        evt.target.classList.toggle("element__like-button_active");
    });
    // и снова прикручиваем мусорку
    elementsContainer.querySelector(".element__trash-button").addEventListener("click", () => userElement.remove());
    // слушатель для фулскрин-изображений
    elementsContainer.querySelector(".element__image").addEventListener("click", function (evt) {
        popupOpenImageFunction(evt.target);
    });
    // + открытие попапа фулскрин
    let popupOpenImage = elementsContainer.querySelector(".element__image");
    popupOpenImage.addEventListener("click", popupOpenImageFunction);
    function popupOpenImageFunction() {
        let fullscreenPic = popupFullscreenImage.querySelector(".popup__image");
        let fullscreenCaption = popupFullscreenImage.querySelector(".popup__caption");
        let imageName = document.querySelector(".element__title");
        fullscreenPic.src = popupOpenImage.src;
        fullscreenCaption.textContent = imageName.textContent;
        openPopupFullscreen(popupFullscreenImage);
    }
    function openPopupFullscreen() {
        popupFullscreenImage.classList.add("popup_opened");
    }
}

// открытие попапа профиля
const popupButtonOpen = document.querySelector(".profile__edit-button");
popupButtonOpen.addEventListener("click", popupButtonOpenFunction);
function popupButtonOpenFunction(evt) {
    evt.preventDefault();
    setPopupInputValueFunction();
    openPopup(popupEditProfile);
}
function openPopup() {
    popupEditProfile.classList.add("popup_opened");
}

// default-значение полей попапа профиля
function setPopupInputValueFunction() {
    nameInput.value = profileAutor.textContent;
    aboutInput.value = profileDescription.textContent;
}

// открытие попапа добавления карточки
const popup_addСardButtonOpen = document.querySelector(".profile__add-button");
popup_addСardButtonOpen.addEventListener("click", popup_addCardButtonOpenFunction);
function popup_addCardButtonOpenFunction(evt) {
    evt.preventDefault();
    openPopupAddCard(popupAddCard);
}
function openPopupAddCard() {
    popupAddCard.classList.add("popup_opened");
}


// закрытие попапа картинки-фулскрин
const popupOpenImageButtonClose = popupFullscreenImage.querySelector(".popup__button-close");
popupOpenImageButtonClose.addEventListener("click", closePopup);

// закрытие попапа профиля
const popupButtonClose = popupEditProfile.querySelector(".popup__button-close");
popupButtonClose.addEventListener("click", closePopup);

// закрытие попапа добавления карточки
const popupAddCardButtonClose = popupAddCard.querySelector(".popup__button-close");
popupAddCardButtonClose.addEventListener("click", closePopup);

function closePopup() {
    popup.classList.remove("popup_opened");
    popupAddCard.classList.remove("popup_opened");
    popupFullscreenImage.classList.remove("popup_opened");
}

// сохранение изменений в полях профиля
function saveChangesPopupFunction() {
    profileAutor.textContent = nameInput.value;
    profileDescription.textContent = aboutInput.value;
}

// сохранение изменений в полях добавления карточки
function saveChangesPopup_addCardFunction() {
    imageName = imageNameInput.value;
    imageLink = imageLinkInput.value;
    addCard(imageLink, imageName);
}

formElementProfile.addEventListener("submit", handleFormSubmit);
formElementAddCard.addEventListener("submit", handleFormSubmitAddCard);

// submit попапа профиля
function handleFormSubmit(evt) {
    evt.preventDefault();
    saveChangesPopupFunction();
    closePopup();
}

// submit попапа добавления карточки
function handleFormSubmitAddCard(evt) {
    evt.preventDefault();
    saveChangesPopup_addCardFunction();
    closePopup();
}

