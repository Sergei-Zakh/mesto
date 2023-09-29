import { openPopup } from './index.js';

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

export class Card {
    constructor(name, link, template) {
        this._name = name;
        this._link = link;
        this._template = template;
    }

    _getTemplate() {

        const cardElement = document
        .querySelector(this._template)
        .content
        .querySelector('.element')
        .cloneNode(true);
        // вернём DOM-элемент карточки
        return cardElement;
    }

    generateCard() {
        // запишем разметку в приватное поле _element, так у других элементов появится доступ к ней
        this._element = this._getTemplate();
        // добавим обработчики
        this._setEventListeners();   
        // добавим данные
        this._element.querySelector('.element__image').src = this._link;
        this._element.querySelector('.element__image').alt = this._name;
        this._element.querySelector('.element__title').textContent = this._name;
        // вернём элемент наружу
        return this._element;
      } 
   
    _setEventListeners() {
        this._element.querySelector('.element__like-button').addEventListener('click', () => {
          this._handleLikeClick();
        });

        this._element.querySelector('.element__trash-button').addEventListener('click', () => {
            this._handleTrashClick();
        });

        this._popupFullscreenImage = document.querySelector(".popup_type_open-image");
        this._fullscreenPic = this._popupFullscreenImage.querySelector(".popup__image");
        this._fullscreenCaption = this._popupFullscreenImage.querySelector(".popup__caption");
        this._element.querySelector(".element__image").addEventListener('click', (evt) => {
            this._handleImageClick(evt.target);
        });
      }
      
      _handleLikeClick() {
        this._element.querySelector('.element__like-button').classList.toggle('element__like-button_active')
      } 

      _handleTrashClick() {
        this._element.remove();
      } 

      _handleImageClick() {
        this._fullscreenPic.src = this._link;
        this._fullscreenPic.alt = this._name;
        this._fullscreenCaption.textContent = this._name;
        openPopup(this._popupFullscreenImage);
      }
}
 

// автонаполнение карточками из массива
initialCards.forEach((item) => {
    // Создаём экземпляр карточки
    const card = new Card(item.name, item.link, '#element');
    // Создаём карточку и возвращаем наружу
    const cardElement = card.generateCard();
    // Добавляем в DOM
    const cardsContainer = document.querySelector(".elements__container");
    cardsContainer.prepend(cardElement);
  });