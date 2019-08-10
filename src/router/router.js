import Vue from 'vue';
import Router from 'vue-router';
import Main from '@/views/portal/Main';
import AdminLogin from '@/views/administration/AdminLogin';
import AdminMain from '@/views/administration/AdminMain';
import AdminCategory from '@/views/administration/AdminCategory';
import AdminUsersList from '@/views/administration/AdminUsersList';
import AdminDesign from '@/views/administration/AdminDesign';
import AdminAdminList from '@/views/administration/AdminAdminList';
import AdminChats from '@/views/administration/AdminChats';
import AddCountryCity from '@/views/administration/Add_country_city';
import GoodSettings from '@/views/administration/Good_settings';
import Subcategory_promotion from '@/views/administration/Subcategory_promotion';
import AdminCategory_group from '@/views/administration/AdminCategories/group';
import AdminCategory_category from '@/views/administration/AdminCategories/category';
import AdminCategory_subcategory from '@/views/administration/AdminCategories/subcategory';
import AddCategories from '@/views/administration/AdminCategories/addCategories';
import UpdateCategories from '@/views/administration/AdminCategories/updateCategories';
import userList from '@/views/administration/UserAndCompanyList/userList';
import companyList from '@/views/administration/UserAndCompanyList/companyList';
import UpdateUser from '@/views/administration/UserAndCompanyList/updateUser';
import UpdateCompany from '@/views/administration/UserAndCompanyList/updateCompany';
import UpdateAdmin from '@/views/administration/UpdateAdmin';
import Video_content from '@/views/administration/Video_content';
import MyAccountMain from '@/views/portal/My_account/MyAccountMain';
import GoodsList from '@/views/portal/My_account/GoodsList';
import AccountChats from '@/views/portal/My_account/AccountChats';
import AccountOptions from '@/views/portal/My_account/AccountOptions';
import CompanyOptions from '@/views/portal/My_account/CompanyOptions';
import createGood from '@/views/portal/My_account/CreateGood';
import SearchPage from '@/views/portal/Search_page/Search_page';
import Registration from '@/views/portal/Login/Registration';
import Login from '@/views/portal/Login/LoginPage';
import Goodpage from '@/views/portal/My_account/Goodpage';
import Subcategories_page from '@/views/portal/Categories_pages/Subcategories_page';
import AllGroup_page from '@/views/portal/Categories_pages/AllGroup_page';
import Shop_page from '@/views/portal/Shop/Shop_page';
import AuthFunction from '@/functions/Auth';
import Add_country_city from "../views/administration/Add_country_city";
import Good_settings from "../views/administration/Good_settings";

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Main',
      component: Main,
    },
    {
      path: '/registration',
      name: 'Registration',
      component: Registration,
      meta: { admin: true },
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
      meta: { admin: true },
    },
    {
      path: '/myaccount',
      component: MyAccountMain,
      meta: { admin: false },
      // beforeEnter: (to, from, next) => {
      //   const path = AuthFunction().verifiedUserAccount();
      //   if (path) {
      //     next(path);
      //   } else {
      //     next();
      //   }
      // },
      children: [
        {
          path: '',
          component: GoodsList,
          meta: { admin: false },
        },
        {
          path: 'chats',
          component: AccountChats,
          meta: { admin: false },
        },
        {
          path: 'options',
          component: AccountOptions,
          meta: { admin: false },
        },
        {
          path: 'options_company',
          component: CompanyOptions,
          meta: { admin: false },
        },
      ],
    },
    {
      path: '/good/:uniq_url',
      name: 'goodPage',
      component: Goodpage,
      meta: { admin: false },
    },
    {
      path: '/company/:uniq_url',
      name: 'Shop_page',
      component: Shop_page,
      meta: { admin: false },
    },
    {
      path: '/group_page/:uniqurl',
      name: 'group_page',
      component: Subcategories_page,
      meta: { admin: false,
        childrenCategories: true },
    },
    {
      path: '/categories_page/:uniqurl',
      name: 'categories_page',
      component: Subcategories_page,
      meta: { admin: false,
        childrenCategories: true },
    },
    {
      path: '/subcategories_page/:uniqurl',
      name: 'subcategories_page',
      component: Subcategories_page,
      meta: { admin: false,
        childrenCategories: false },
    },
    {
      path: '/create_advertisement',
      name: 'createGood',
      component: createGood,
      meta: { admin: false },
      beforeEnter: (to, from, next) => {
        const path = AuthFunction().verifiedUserAccount();
        if (path) {
          next(path);
        } else {
          next();
        }
      },
    },
    {
      path: '/update_advertisement/:uniqurl',
      name: 'updateGood',
      component: createGood,
      meta: { admin: false },
      beforeEnter: (to, from, next) => {
        const path = AuthFunction().verifiedUserAccount();
        if (path) {
          next(path);
        } else {
          next();
        }
      },
    },
    {
      path: '/search-page',
      name: 'search_page',
      component: SearchPage,
      meta: { admin: false },
    },
    {
      path: '/groups-all',
      name: 'AllGroup_page',
      component: AllGroup_page,
      meta: { admin: false },
    },
    {
      path: '/signinadmin',
      name: 'AdminLogin',
      component: AdminLogin,
      meta: { admin: true },
    },
    {
      path: '/administration',
      component: AdminMain,
      beforeEnter: (to, from, next) => {
        const resp = AuthFunction().isAdminCheck();
        if (resp) {
          next(resp);
        } else {
          next();
        }
      },
      children: [
        {
          path: '',
          component: AdminCategory,
          meta: { admin: true },
          children: [
            {
              path: '',
              component: AdminCategory_group,
              meta: { admin: true },
            },
            {
              path: 'category',
              component: AdminCategory_category,
              meta: { admin: true },
            },
            {
              path: 'subcategory',
              component: AdminCategory_subcategory,
              meta: { admin: true },
            },
          ],
        },
        {
          path: 'addCategories/:type',
          component: AddCategories,
          meta: { admin: true },
        },
        {
          path: 'updateCategories/:type/:id',
          component: UpdateCategories,
          meta: { admin: true },
        },
        {
          path: 'userslistmain',
          component: AdminUsersList,
          meta: { admin: true },
          children: [
            {
              path: '',
              component: userList,
              meta: { admin: true },
            },
            {
              path: 'companylist',
              component: companyList,
              meta: { admin: true },
            },
          ],
        },
        {
          path: 'updateuser/:id',
          component: UpdateUser,
          meta: { admin: true },
        },
        {
          path: 'updateadmin/:id',
          component: UpdateAdmin,
          meta: { admin: true },
        },
        {
          path: 'addadmin/',
          component: UpdateAdmin,
          meta: { admin: true },
        },
        {
          path: 'updatecompany/:id',
          component: UpdateCompany,
          meta: { admin: true },
        },
        {
          path: 'design',
          component: AdminDesign,
          meta: { admin: true },
        },
        {
          path: 'adminslist',
          component: AdminAdminList,
          meta: { admin: true },
        },
        {
          name: 'adminChats',
          path: 'adminchats',
          component: AdminChats,
          meta: { admin: true },
        },
        {
          name: 'Subcategory_promotion',
          path: 'Subcategory_promotion',
          component: Subcategory_promotion,
          meta: { admin: true },
        },
        {
          name: 'video_content',
          path: 'video_content',
          component: Video_content,
          meta: { admin: true },
        },
        {
          name: 'add_country_city',
          path: 'add_country_city',
          component: AddCountryCity,
          meta: { admin: true },
        },
        {
          name: 'good_settings',
          path: 'good_settings',
          component: GoodSettings,
          meta: { admin: true },
        },


      ],
    },
  ],
});
