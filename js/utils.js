const formValues = {}  // Сюда пишутся значения формы (Object как в Java, или dict из Python)
const formValidation = {
  'email': '',
  'password': '',
  'password-repeat': '' };
// Сюда пишутся статусы валидации каждого поля. Если поле ни разу не валидировалось,
// то при обращении к Object вернётся undefined, который при логическом сравнении обрабатывается как false


const sign_in_formValidation = {
  'sign_in_email': '',
  'sign_in_password': ''};
var curForm = formValidation
var buttonId = 'sign_up_btn'


// Объявляется и инициализируется константная переменная
// Инициализация функцией, заданной в стрелочном виде
export const validatePassword = (e, id) => {

  const regExp = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/
  const validationPass = String(e).match(regExp)

  if (validationPass) {
    document.getElementById(id).classList.remove("invalid")
  } else {
    document.getElementById(id).classList.add("invalid")
  }
  return validationPass
}


export const validatePasswordRepeat = (e, id) => {
  if (e === String(formValidation.password)) {
    document.getElementById(id).classList.remove("invalid")
    return String(e)
  } else {
    document.getElementById(id).classList.add("invalid")
    return null
  }
}


export const validateEmail = (email, key) => {
  // Создадим шаблон регулярного выражения. В нём применяются шаблонные строки
  // Гуглить по тегам: "шаблонные строки js", "регулярные выражения"
  const regExp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

  return String(email)
    .toLowerCase()
    .match(regExp);
}


// Функция возвращающая true если все валидации пройдены, и false если хотя бы одна не пройдена
export const getValidationStatus = (form) => {
  const valStatus = Object.values(form).every((validationStatus) => !!validationStatus)

  if (form == sign_in_formValidation) {
    buttonId = 'sign_in_btn'
  } else {
    buttonId = 'sign_up_btn'
  }

  if (valStatus) {
    document.getElementById(buttonId).disabled = false;
  } else {
    document.getElementById(buttonId).disabled = true;
  }
  return valStatus
}


// Функция возвращающая которая ставит значение поля в форме по ключу
export const setFormValue = (valueKey, newValue, validator) => {
  formValues[valueKey] = newValue
  if (validator !== undefined) {
    curForm[valueKey] = validator(newValue, valueKey)
  }
  getValidationStatus(curForm)
}


export const switchForms = () => {
  if (curForm == formValidation) {
    curForm = sign_in_formValidation
  } else {
    curForm = formValidation
  }
}


// Функция для обработки отправки формы регистрации
// В этой функции должен быть http запрос на сервер для регистрации пользователя (сейчас просто демонстрация)
export const submitForm = () => {
  if (!getValidationStatus(curForm)) {
    console.log("FORM IS INCORRECT")
    return false
  }
  console.log("FORM IS FINE")
  console.log(formValues)
  return true
}
