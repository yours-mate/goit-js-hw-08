import throttle from 'lodash.throttle';

const formEl = document.querySelector('.feedback-form');
const STORAGE_KEY = 'feedback-form-state';
const emailEl = document.querySelector('input[name="email"]');
const messageEL = document.querySelector('textarea[name="message"]');

fillData();

function fillData() {
  const savedData = localStorage.getItem(STORAGE_KEY);
  if (savedData) {
    const parsedData = JSON.parse(savedData);
    emailEl.value = parsedData.email;
    messageEL.value = parsedData.message;
  }
}

formEl.addEventListener('input', throttle(onFormInputHandle, 500));
formEl.addEventListener('submit', onFormSubmitHandle);

const data = {
  email: '',
  message: '',
};

function onFormInputHandle(evt) {
  data[evt.target.name] = evt.target.value;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

function onFormSubmitHandle(evt) {
  evt.preventDefault();
  evt.currentTarget.reset();
  console.log(JSON.parse(localStorage.getItem(STORAGE_KEY)));
  localStorage.removeItem(STORAGE_KEY);
}
