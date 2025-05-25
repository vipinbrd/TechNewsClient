import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import Home from './Pages/MainApp/Home';
import About from './Pages/MainApp/About';
import Users from './Pages/Admin/Users';
import Categories from './Pages/Admin/Categories';
import MainLayout from './Layout/MainLayout';
import AdminLayout from './Layout/AdminLayout';
import AdminLogin from './Pages/Admin/Login';
import Dashboard from './Pages/Admin/Dashboard';
import CategoryPage from './Pages/MainApp/CategoryPage';
import NewsPage from './Pages/MainApp/NewsPage';
import RegisterPage from './Pages/MainApp/Register';
import AdminCategories from './Pages/Admin/AllCategories';
import NewsManagement from './Pages/Admin/addNews';
import NewsList from './Pages/Admin/AllNews';
import EditNews from './Pages/Admin/editNews';
import Category from './Pages/MainApp/Categories';
import CategoryArticles from './Pages/MainApp/CategoryArticles';
import ArticleDetails from './Pages/MainApp/ArticleDetails';
import CreateSubCategory from './Pages/Admin/CreateSubCategory';
import SubCategory from './Pages/MainApp/SubCategory';
import Contact from './Pages/MainApp/Contact';
import './SlideDown.css';
import PrivateRoute from './Pages/Admin/PrivateRoute';

const App = () => {
  return (
    <Router>
      <RouteHandler />
    </Router>
  );
};

const RouteHandler = () => {
  return (
    <Routes>
      {/* Main App Routes */}
      <Route path='/' element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="category" element={<Category />} />
        <Route path="/category/:categoryId" element={<CategoryArticles />} />
        <Route path="categories" element={<CategoryPage />} />
        <Route path="/news/:id" element={<ArticleDetails />} />
        <Route path='about' element={<About />} />
        <Route path='register' element={<RegisterPage />} />
        <Route path="/news/:slug" element={<NewsPage />} />
        <Route path="/subcategory/:id" element={<SubCategory />} />
        <Route path="/contact" element={<Contact />} />
      </Route>

     
     
<Route path='/admin/login' element={<AdminLogin />} />  {/* Public Route */}

<Route path='/admin' element={
  <PrivateRoute>
    <AdminLayout />
  </PrivateRoute>
}>
  <Route index element={<Dashboard />} />
  <Route path='dashboard' element={<Dashboard />} />
  <Route path='users' element={<Users />} />
  <Route path='categories' element={<Categories />} />
  <Route path='all-cat' element={<AdminCategories />} />
  <Route path='sub-categories' element={<CreateSubCategory />} />
  <Route path='news' element={<NewsManagement />} />
  <Route path='all-article' element={<NewsList />} />
  <Route path='all-article/edit/:id' element={<EditNews />} />
</Route>

<Route path='/admin/*' element={<Navigate to='/admin/dashboard' />} />
    </Routes>
  );
};

export default App;
