export class FormValidator {
    constructor(configForm, formElement) {
        this._formSelector = configForm.formSelector;
        this._inputSelector = configForm.inputSelector;
        this._submitButtonSelector = configForm.submitButtonSelector;
        this._inactiveButtonClass = configForm.inactiveButtonClass;
        this._inputErrorClass = configForm.inputErrorClass;
        this._errorClass = configForm.errorClass;
    
        this._formElement = formElement;
        // Находим все поля внутри формы, сделаем из них массив методом Array.from
        this._inputList = Array.from(formElement.querySelectorAll(configForm.inputSelector));
        // Найдём в текущей форме кнопку отправки
        this._submitButton = this._formElement.querySelector(configForm.submitButtonSelector);
    }

    _showInputError(inputElement) {
        const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.add(this._inputErrorClass);
        // Показываем сообщение об ошибке
        errorElement.textContent = inputElement.validationMessage;
        errorElement.classList.add(this._errorClass);
      };

    _hideInputError(inputElement) {
        const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.remove(this._inputErrorClass);
        // Скрываем сообщение об ошибке
        errorElement.classList.remove(this._errorClass);
        // Очистим ошибку
        errorElement.textContent = '';
      };

    _isValid(inputElement) {
        if (!inputElement.validity.valid) {
          // Если поле в указанной форме не проходит валидацию, покажем ошибку
          this._showInputError(inputElement);
        } else {
          // Если проходит, скроем
          this._hideInputError(inputElement);
        }
      };

    _setEventListeners() {
        // Вызовем toggleButtonState, чтобы не ждать ввода данных в поля
        this._toggleButtonState(this._inputList, this._submitButton);
        // Обойдём все элементы полученной коллекции
        this._inputList.forEach((inputElement) => {
          // Каждому полю добавим обработчик события input
          inputElement.addEventListener('input', () => {
            // Внутри колбэка вызовем isValid, передав ей форму и проверяемый элеме
            this._isValid(inputElement);
            // Вызовем toggleButtonState и передадим ей массив полей и кнопку
            this._toggleButtonState(this._inputList, this._submitButton);
          });
        });
      }; 

    _toggleButtonState() {
        // Если есть хотя бы один невалидный инпут
        if (this._hasInvalidInput(this._inputList)) {
          // сделай кнопку неактивной
          this._disableButton(this._submitButton);
        } else {
          // иначе сделай кнопку активной
          this._enableButton(this._submitButton);
        }; 
      };

    _enableButton() {
        this._submitButton.classList.remove(this._inactiveButtonClass);
        this._submitButton.disabled = false;
    };

    _disableButton() {
        this._submitButton.classList.add(this._inactiveButtonClass);
        this._submitButton.disabled = true;
    };

    _hasInvalidInput() {
        // Проходим по массиву полей методом some
        return this._inputList.some((inputElement) => {
        // Если поле не валидно, колбэк вернёт true, обход массива прекратится и вся функция вернёт true
        return !inputElement.validity.valid;
        })
      }; 

    enableValidation() {
        this._setEventListeners();
    };
};
