const configForm = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button-save',
  inactiveButtonClass: 'popup__button-save_inactive',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'
}; 

// Функция, которая добавляет класс с ошибкой
const showInputError = (formElement, inputElement, errorMessage, config) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(config.inputErrorClass);
  // Показываем сообщение об ошибке
  errorElement.textContent = errorMessage;
  errorElement.classList.add(config.errorClass);
};

// Функция, которая удаляет класс с ошибкой
const hideInputError = (formElement, inputElement, config) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(config.inputErrorClass);
  // Скрываем сообщение об ошибке
  errorElement.classList.remove(config.errorClass);
  // Очистим ошибку
  errorElement.textContent = '';
};

// Функция, которая проверяет валидность поля
const isValid = (formElement, inputElement, config) => {
  if (!inputElement.validity.valid) {
    // Если поле в указанной форме не проходит валидацию, покажем ошибку
    showInputError(formElement, inputElement, inputElement.validationMessage, config);
  } else {
    // Если проходит, скроем
    hideInputError(formElement, inputElement, config);
  }
};

const setEventListeners = (formElement, config) => {
  // Находим все поля внутри формы, сделаем из них массив методом Array.from
  const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
  // Найдём в текущей форме кнопку отправки
  const submitButton = formElement.querySelector(config.submitButtonSelector);
  // Вызовем toggleButtonState, чтобы не ждать ввода данных в поля
  toggleButtonState(inputList, submitButton, config);
  // Обойдём все элементы полученной коллекции
  inputList.forEach((inputElement) => {
    // Каждому полю добавим обработчик события input
    inputElement.addEventListener('input', () => {
      // Внутри колбэка вызовем isValid, передав ей форму и проверяемый элемент
      isValid(formElement, inputElement, config);
      // Вызовем toggleButtonState и передадим ей массив полей и кнопку
      toggleButtonState(inputList, submitButton, config);
    });
  });
}; 

// Функция принимает массив полей ввода и элемент кнопки, состояние которой нужно менять
const toggleButtonState = (inputList, submitButton, config) => {
  // Если есть хотя бы один невалидный инпут
  if (hasInvalidInput(inputList)) {
    // сделай кнопку неактивной
    disableButton(submitButton, config);
  } else {
    // иначе сделай кнопку активной
    enableButton(submitButton, config);
  }; 
};

function enableButton(submitButton, config) {
    submitButton.classList.remove(config.inactiveButtonClass);
    submitButton.disabled = false;
};

function disableButton(submitButton, config) {
    submitButton.classList.add(config.inactiveButtonClass);
    submitButton.disabled = true;
};

// Функция принимает массив полей
const hasInvalidInput = (inputList) => {
  // Проходим по этому массиву методом some
  return inputList.some((inputElement) => {
    // Если поле не валидно, колбэк вернёт true, обход массива прекратится и вся функция вернёт true
    return !inputElement.validity.valid;
  })
}; 

function enableValidation(config) {
  // Найдём все формы с указанным классом в DOM, сделаем из них массив методом Array.from
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  // Переберём полученную коллекцию
  formList.forEach((formElement) => {
    // Для каждой формы вызовем функцию setEventListeners, передав ей элемент формы
    setEventListeners(formElement, config);
  });
};

// Вызовем функцию
enableValidation(configForm);