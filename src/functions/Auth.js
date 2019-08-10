import axios from 'axios';

const getToken = () => {
  if (localStorage.getItem('token')) {
    return localStorage.getItem('token');
  }
};

const getAuthData = () => {
  if (localStorage.getItem('token')) {
    return atob(getToken().split(' ')[1]).split(':');
  }
};

const saveToken = (token) => {
  localStorage.setItem('token', token);
};

const saveUser = (user) => {
  localStorage.setItem('user', JSON.stringify(user));
};

const saveLikes = (likes) => {
  localStorage.setItem('MyLikes', JSON.stringify(likes));
};

const getUser = () => {
  if (localStorage.getItem('user')) {
    return JSON.parse(localStorage.getItem('user'));
  }
};

const getLikes = () => {
  console.warn('=====');
  if (localStorage.getItem('MyLikes')) {
    return JSON.parse(localStorage.getItem('MyLikes'));
  }
};


const isLoggedIn = () => {
  const user = getUser();
  if (user) {
    return true;
  }
  return false;
};

const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
};

const verifiedAdmin = () => {
  if (isLoggedIn()) {
    if (getUser().roles[0].name === 'CLIENT') {
      return '/client';
    } else if (getUser().roles[0].name === 'FORWADER') {
      return '/forwader';
    }
    return null;
  }
  return '/';
};

const verifiedForwader = () => {
  if (isLoggedIn()) {
    if (getUser().roles[0].name === 'CLIENT') {
      return '/client';
    } else if (getUser().roles[0].name === 'ADMIN') {
      return '/adminpanel';
    }
    return null;
  }
  return '/';
};
const verifiedUserAccount = () => {
  if (isLoggedIn()) {
    if (getUser().roles[0].name === 'USER' || getUser().roles[0].name === 'ADMIN' || getUser().roles[0].name === 'MANAGER') {
      return null;
    }
    return '/';
  }
  return '/';
};

const verifiedUser = () => {
  if (isLoggedIn()) {
    if (getUser().roles[0].name === 'ADMIN') {
      return '/administration';
    } else if (getUser().roles[0].name === 'MANAGER') {
      return '/administration';
    } else if (getUser().roles[0].name === 'ADMIN') {
      return '/';
    }
    return null;
  }
  return '/';
};

const isAdminCheck = async () => {
  let jwtCorrect = false,
    returnedPath = '';
  await axios.get('/checkToken').then((response) => {
    const $res = response.data;
    if ($res.mes === 'JWT Error') {
      jwtCorrect = false;
    } else if ($res.mes === 'JWT all right') {
      jwtCorrect = true;
    }
    if (isLoggedIn()) {
      if (getUser().roles[0].name === 'ADMIN' || getUser().roles[0].name === 'MANAGER') {
        if (jwtCorrect) {
          returnedPath = '/administration';
        }else {
          returnedPath = '/signinadmin';
        }
      } else if (getUser().roles[0].name === 'USER') {
        if (jwtCorrect) {
          returnedPath = '/';
        }else {
          returnedPath = '/login';
        }
      }
    } else {
      returnedPath = '/login';
    }
  }).catch((err) => {
    console.warn(err);
  });
  // console.log('returnedPath', returnedPath);
  return returnedPath;
};

export default () => ({
  getToken,
  getAuthData,
  saveLikes,
  getLikes,
  saveToken,
  saveUser,
  getUser,
  logout,
  isLoggedIn,
  verifiedUser,
  verifiedAdmin,
  isAdminCheck,
  verifiedUserAccount,
  // verifiedForwader,
  // verifiedClient,
  // setLanguage,
  // getLanguage,
});
// const setLanguage = (lang) => {
//   localStorage.setItem('app_lang', lang);
// };

// const getLanguage = () => {
//   if (localStorage.getItem('app_lang')) {
//     return localStorage.getItem('app_lang');
//   }
//   return 'ru';
// };

// const setLanguage = (lang) => {
//     localStorage.setItem('app_lang', lang)
// }

// const getLanguage = () => {
//     if (localStorage.getItem('app_lang')) {
//         return localStorage.getItem('app_lang')
//     }
//     else {
//         return 'ru'
//     }
// }
