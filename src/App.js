import { Route, Routes } from 'react-router-dom';
import React  from 'react';
import './App.css';
import { Container } from 'react-bootstrap';
import ScrollToTop from './ScrollToTop';
import Home from './Pages/Home';
import Footer from './Components/Footer';
import Header from './Components/Header'; 
import Sidebar from './Components/Sidebar';
import Signup from './Pages/Signup.jsx';
import SignupSuccess from './Pages/SignupSuccess';
import UserCourses from './Pages/UserCourses';
import Admin from './Pages/AdminIndex';
import AdminLogin from './Pages/AdminLogin';
import AdminSignup from './Pages/AdminSignup.jsx';
import AdminUsers from './Pages/AdminUsers';
import AdminCourses from './Pages/AdminCourses';
import AdminAdministrators from './Pages/AdminAdministrators';
import AdminCourseRegistration from './Pages/AdminCourseRegistration';
import Login from './Pages/Login';
import SearchCourses from './Pages/SearchCourses.jsx'
import Courses from './Pages/Courses'; 
import CourseRegistration from './Pages/CourseRegistration';
import ConfirmCourseRegistration from './Pages/ConfirmCourseRegistration';
import EditCourse from './Pages/EditCourse';
import NewCourse from './Pages/AddCourse.jsx';
import UserProfile from './Pages/UserProfile';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import { ProtectedUserRoute, ProtectedAdminRoute } from'./ProtectedRoute';
import { AuthProvider } from './Context/AuthContext';
import { useLocation } from 'react-router-dom';


function App() {

  const location = useLocation();

return (

  <AuthProvider>
    <ScrollToTop />
          <div>
            <Header/>
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
            <Route path='user-profile/courses' element={
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
                      <Route path='add-course' element={<ProtectedAdminRoute> <NewCourse /> </ProtectedAdminRoute>} />
                      <Route path='edit-course' element={<ProtectedAdminRoute> <EditCourse /> </ProtectedAdminRoute>} />
                      <Route path='signup' element={<ProtectedAdminRoute> <AdminSignup /> </ProtectedAdminRoute>} />
                      <Route path='users' element={<ProtectedAdminRoute> <AdminUsers /> </ProtectedAdminRoute>} />
                      <Route path='courses' element={<ProtectedAdminRoute> <AdminCourses /> </ProtectedAdminRoute>} />
                      <Route path='administrators' element={<ProtectedAdminRoute> <AdminAdministrators /></ProtectedAdminRoute>} />
                      <Route path='course-registration' element={<ProtectedAdminRoute> <AdminCourseRegistration /></ProtectedAdminRoute>} />
                  </Route>
              </Routes>
        </Container>
    </div>
          <div>
            <Footer />
        </div>
    </AuthProvider>
  );
}

export default App;
