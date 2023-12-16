import { Route, Routes } from 'react-router-dom';
import React, { Suspense, lazy } from 'react';
import './App.css';
import { Container } from 'react-bootstrap';
import ScrollToTop from './ScrollToTop';
import Home from './Components/Home';
/* import Footer from './Components/Footer';
import Header from './Components/Header'; */
import Sidebar from './Components/Sidebar';
import Signup from './Components/Signup.jsx';
import SignupSuccess from './Components/SignupSuccess';
import UserCourses from './Components/UserCourses';
import Admin from './Components/AdminIndex';
import AdminLogin from './Components/AdminLogin';
import AdminRegister from './Components/AdminRegister';
import AdminUsers from './Components/AdminUsers';
import AdminCourses from './Components/AdminCourses';
import AdminAdministrators from './Components/AdminAdministrators';
import AdminCourseRegistration from './Components/AdminCourseRegistration';
import Login from './Components/Login';
import SearchCourses from './Components/SearchCourses.jsx'
import Courses from './Components/Courses';
import CourseRegistration from './Components/CourseRegistration';
import ConfirmCourseRegistration from './Components/ConfirmCourseRegistration';
import EditCourse from './Components/EditCourse';
import NewCourse from './Components/NewCourse';
import UserProfile from './Components/UserProfile';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import { ProtectedUserRoute, ProtectedAdminRoute } from'./ProtectedRoute';
import { AuthProvider } from './AuthContext';
import { useLocation } from 'react-router-dom';


function App() {

const location = useLocation();

const Header = lazy(() => import('./Components/Header'));
const Footer = lazy(() => import('./Components/Footer'));

return (

  <AuthProvider>
    <ScrollToTop />
    <Suspense fallback={<div>Cargando...</div>}>
    <div> 
    <Header />
    </div>
    <div className='app'>
      <div className='sidebar border border-top-0 border-bottom-0 border-tertiary ps-4 pe-2'>
      <Sidebar />
      </div>
      <Container fluid className='content'>
        <Routes>
          <Route path='/*'>
            <Route index element={<Home />} />
            <Route path='courses/detail' element={<Courses />} />
            <Route path='courses/search' element={<SearchCourses/>}/>
            <Route path='login' element={<Login location={location}/>}/>
            <Route path='signup' element={<Signup />} />
            <Route path='signup-success' element={<SignupSuccess />} />
            <Route path='user-profile' element={ 
              <ProtectedUserRoute>
                  <UserProfile />
              </ProtectedUserRoute>}/>
            <Route path='user-courses' element={
              <ProtectedUserRoute>
                <UserCourses/>
              </ProtectedUserRoute>}/>
            <Route path='courses/registration' element={<CourseRegistration/>}/>
            <Route path='courses/registration/confirmation'element={
                        <ProtectedUserRoute>
                        <ConfirmCourseRegistration
                        />
                        </ProtectedUserRoute>}/>
                    <Route path='admin-login' element={<AdminLogin />} />
                </Route>

        <Route path='/admin/*'>
        
                      <Route index element={ <ProtectedAdminRoute> <Admin /> </ProtectedAdminRoute>} />
                      <Route path='crear-cursos' element={<ProtectedAdminRoute> <NewCourse /> </ProtectedAdminRoute>} />
                      <Route path='editcourse/' element={<ProtectedAdminRoute> <EditCourse /> </ProtectedAdminRoute>} />
                      <Route path='registro' element={<ProtectedAdminRoute> <AdminRegister /> </ProtectedAdminRoute>} />
                      <Route path='usuarios' element={<ProtectedAdminRoute> <AdminUsers /> </ProtectedAdminRoute>} />
                      <Route path='cursos' element={<ProtectedAdminRoute> <AdminCourses /> </ProtectedAdminRoute>} />
                      <Route path='administradores' element={<ProtectedAdminRoute> <AdminAdministrators /></ProtectedAdminRoute>} />
                      <Route path='course-registration' element={<ProtectedAdminRoute> <AdminCourseRegistration /></ProtectedAdminRoute>} />
                  </Route>
              </Routes>
        </Container>
    </div>
    <div> 
      <Footer />
      </div>
  </Suspense>
      
    </AuthProvider>
    );}

export default App;
