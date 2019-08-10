import axios from 'axios';
const getUserData = () => {
  if (localStorage.getItem('user')) {
    return JSON.parse(localStorage.getItem('user'));
  }
};
const isAdmin = async (arg, to, from, next) => {
  console.log(arg, to, from, next);
  await axios.get('/checkToken').then((response) => {
    const $res = JSON.parse(response.data);
    if ($res.mes === 'JWT Error' && getUserData.roles[0].id === 1) {
      next('/login');
    } else if ($res.mes === 'JWT all right' && getUserData.roles[0].id === 1) {
      next('/');
    }
  }).catch((err) => {
  });
};
export default {
  isAdmin,
};
