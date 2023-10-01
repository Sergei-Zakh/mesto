export class Card {
    constructor(name, link, template, handleOpenPopup) {
        this._name = name;
        this._link = link;
        this._template = template;
        this._handleOpenPopup = handleOpenPopup;
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
        this._cardImage.src = this._link;
        this._cardImage.alt = this._name;
        this._element.querySelector('.element__title').textContent = this._name;
        // вернём элемент наружу
        return this._element;
      } 
   
    _setEventListeners() {
        this._likeButton = this._element.querySelector('.element__like-button');
        this._likeButton.addEventListener('click', () => {
          this._handleLikeClick();
        });

        this._element.querySelector('.element__trash-button').addEventListener('click', () => {
            this._handleTrashClick();
        });

        this._cardImage = this._element.querySelector('.element__image');
        this._cardImage.addEventListener('click', () => { 
            this._handleOpenPopup(this._name, this._link) 
          });   
      }
      
      _handleLikeClick() {
        this._likeButton.classList.toggle('element__like-button_active')
      } 

      _handleTrashClick() {
        this._element.remove();
        this._element = null;
      }     
}