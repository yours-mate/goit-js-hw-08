import throttle from 'lodash.throttle';

const formEl = document.querySelector('.feedback-form');
const STORAGE_KEY = 'feedback-form-state';
const emailEl = document.querySelector('input[name="email"]');
const messageEL = document.querySelector('textarea[name="message"]');
const savedData = localStorage.getItem(STORAGE_KEY);
const data = {
  email: '',
  message: '',
};

fillData();

function fillData() {
  if (savedData) {
    const parsedData = JSON.parse(savedData);
    emailEl.value = parsedData.email;
    messageEL.value = parsedData.message;
  }
}

formEl.addEventListener('input', throttle(onFormInputHandle, 500));
formEl.addEventListener('submit', onFormSubmitHandle);

function onFormInputHandle(evt) {
  if (savedData) {
    const parsedData = JSON.parse(savedData);
    data.email = parsedData.email;
    data.message = parsedData.message;
  }
  data[evt.target.name] = evt.target.value;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

function onFormSubmitHandle(evt) {
  evt.preventDefault();
  evt.currentTarget.reset();
  console.log(JSON.parse(localStorage.getItem(STORAGE_KEY)));
  localStorage.removeItem(STORAGE_KEY);
}
