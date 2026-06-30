import throttle from 'lodash.throttle';

const FEEDBACK_KEY = 'feedback-form-state';

const form = document.querySelector('.feedback-form');
const data = JSON.parse(localStorage.getItem(FEEDBACK_KEY)) ?? {};

form.addEventListener('input', throttle(onInput, 500));
form.addEventListener('submit', onSubmit);

onUpdate();

function onSubmit(evt) {
  evt.preventDefault();
  evt.currentTarget.reset();
  console.log(data);
  localStorage.removeItem(FEEDBACK_KEY);
}

function onInput(evt) {
  data[evt.target.name] = evt.target.value;

  localStorage.setItem(FEEDBACK_KEY, JSON.stringify(data));
}

function onUpdate() {
  const { email, message } = form.elements;

  email.value = data.email ?? '';
  message.value = data.message ?? '';
}
