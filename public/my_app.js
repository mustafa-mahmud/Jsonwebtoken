const formEl = document.querySelector('form');
const nameInputEl = document.querySelector('.username-input');
const passwordInputEl = document.querySelector('.password-input');
const msgEl = document.querySelector('.text-small');
const getDataBtn = document.getElementById('data');
const tokenEl = document.querySelector('.token');

const hideMsg = () => {
  setTimeout(() => {
    msgEl.textContent = '';
    msgEl.className = 'text-small form-alert';
  }, 2000);
};

const showMsg = (msg, clsAdd) => {
  msgEl.textContent = msg;
  msgEl.classList.add(clsAdd);
  msgEl.classList.remove('form-alert');

  hideMsg();
};

const saveToken = (token) => {
  localStorage.setItem('token', `Bearer ${token}`);
};

const tokenStatus = (cls, msg) => {
  tokenEl.textContent = msg;
  tokenEl.className = cls;
};

const getData = async () => {
  try {
    const { data } = await axios.get('/api/v1/dashboard', {
      headers: {
        Authorization: localStorage.getItem('token'),
      },
    });

    console.log(data);
    tokenStatus('token text-success', data.msg);
  } catch (err) {
    tokenStatus('token', err.response.data.msg);
  }
};

const submitHandle = async (e) => {
  e.preventDefault();

  const name = nameInputEl.value;
  const password = passwordInputEl.value;

  try {
    const { data } = await axios.post('/api/v1/login', { name, password });

    saveToken(data.token);
    showMsg(data.msg, 'alert-success');
  } catch (err) {
    showMsg(err.response.data.msg, 'alert-danger');
  }
};

//////////////////////////////////////////////////////////////////////////
formEl.addEventListener('submit', submitHandle);
getDataBtn.addEventListener('click', getData);
