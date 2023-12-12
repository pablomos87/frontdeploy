import { Route, Routes } from 'react-router-dom';
import './App.css';
import { Container } from 'react-bootstrap';
import ScrollToTop from './ScrollToTop';
import Home from './Components/Home';
import Footer from './Components/Footer';
import Header from './Components/Header';
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
import Courses from './Components/Courses';
import CourseRegistration from './Components/CourseRegistration';
import ConfirmCourseRegistration from './Components/ConfirmCourseRegistration';
import EditCourse from './Components/EditCourse';
import SidebarAdmin from './Components/SidebarAdmin';
import NewCourse from './Components/NewCourse';
import UserProfile from './Components/UserProfile';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import React, { useState,  useEffect } from 'react'
import { useLocation, Navigate, useNavigate } from 'react-router-dom';


function App() {

  const [adminIsAuthenticated, setAdminIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [name, setName] = useState('');
  const location = useLocation();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userId, setUserId] = useState('');
  const [adminId, setAdminId] = useState('');
  const navigate = useNavigate();

  

  useEffect(() => {
    const userToken = localStorage.getItem('userToken');
    const storedUserId = localStorage.getItem('userId');
    const storedUsername = localStorage.getItem('username');
  
    if (userToken) {
      setIsAuthenticated(true);
      setAdminIsAuthenticated(false);
      setUserId(storedUserId);
      setUsername(storedUsername);
      setName('')
      setAdminId('')
      localStorage.removeItem('adminToken');
    } else {
      setIsAuthenticated(false);
      setUserId('');
      setUsername('');
    }
  }, []);
  
  useEffect(() => {
    const adminToken = localStorage.getItem('adminToken');
    const storedAdminId = localStorage.getItem('adminId');
    const storedName = localStorage.getItem('name');
    
  
    if (adminToken) {
      setAdminIsAuthenticated(true);
      setIsAuthenticated(false);
      setUserId('');
      setUsername('');
      setAdminId(storedAdminId);
      setName(storedName);
      localStorage.removeItem('userToken');
    } else {
      setAdminIsAuthenticated(false);
      setAdminId('');
      setName('');
    }
  }, []);

  
  const handleUserLogout = () => {
    
    localStorage.removeItem('userToken');
    
    setIsAuthenticated(false);
    setUserId('');
    setUsername('');
  };

  const handleAdminLogout = () => {
    
    localStorage.removeItem('adminToken');
    
    setAdminIsAuthenticated(false);
    setAdminId('');
    setName('');
    navigate('/');   
  };


  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route
          path='/*'
          element={
            <>
              <Header
                  isAuthenticated={isAuthenticated}
                  adminIsAuthenticated={adminIsAuthenticated}
                  name={name}
                  username={username}
                  userId={userId}
                  adminId={adminId}
                  handleUserLogout={handleUserLogout}
                  handleAdminLogout={handleAdminLogout}
                setName={setName}
              />

              <div className='app'>
                <div className='sidebar border border-top-0 border-bottom-0 border-tertiary ps-4 pe-2'>
                  <Sidebar />
                </div>
                <Container fluid className='content'>
                  <Routes>
                    <Route index element={<Home />} />
                    <Route path='/courses/detail' element={<Courses />} />
                    <Route
                      path='/login'
                      element={
                        <Login
                        setUsername={setUsername}
                        location={location}
                        setIsAuthenticated={setIsAuthenticated} 
                        setUserId ={setUserId}
                        />
                      }
                    />
                    <Route path='/signup' element={<Signup />} />
                    <Route path='/signup-success' element={<SignupSuccess />} />
                    <Route
                      path='/user-profile'
                      element={
                        isAuthenticated ? (
                          <UserProfile 
                          
                          loggedInUsername={username} />
                          ) : (
                            <Navigate to='/login' />
                          )
                      }
                    />
                    
                    <Route
                      path='/user-courses'
                      element={
                        isAuthenticated ? (
                        <UserCourses
                          
                          loggedInUsername={username}
                          />
                        ) : (
                          <Navigate to='/login' />
                        )
                      }
                    />
                    <Route
                      path='/courses/registration'
                      element={
                        <CourseRegistration
                          userId={userId}
                          isAuthenticated={isAuthenticated}
                        />
                      }
                    />
                    <Route
                      path='/courses/registration/confirmation'
                      element={
                        isAuthenticated ? (
                        <ConfirmCourseRegistration
                          userId={userId}
                          isAuthenticated={isAuthenticated}
                          username={username}
                        />
                        ) : (
                          <Navigate to='/login' />
                        )
                      }
                    />
                  </Routes>
                </Container>
              </div>
              <Footer />
            </>
          }
        />

        <Route
          path='/admin/*'
          element={
            <>
              <Header
                isAuthenticated={isAuthenticated}
                adminIsAuthenticated={adminIsAuthenticated}
                name={name}
                username={username}
                userId={userId}
                adminId={adminId}
                handleUserLogout={handleUserLogout}
                handleAdminLogout={handleAdminLogout}
                setName={setName}
              />

              {adminIsAuthenticated ? (
                <div className='app'>
                  <div className='sidebar border border-top-0 border-bottom-0 border-tertiary ps-4 pe-2'>
                    <SidebarAdmin />
                  </div>
                  <Container fluid className='content'>
                    <Routes>
                      <Route
                        index
                        element={  
                            <Admin/>
                        }
                      />
                      <Route
                        path='/crear-cursos'
                        element={
                          
                          <NewCourse/>
                        }
                      />

                      <Route
                        path='/editcourse/'
                        element={
                          
                          <EditCourse/>
                        }
                      />
                      <Route
                        path='/registro'
                        element={
                          
                          <AdminRegister />
                        }
                      />
                      <Route
                        path='/usuarios'
                        element={
                          
                          <AdminUsers/>
                        }
                      />
                      <Route
                        path='/cursos'
                        element={
                          
                          <AdminCourses/>
                        }
                      />
                      <Route
                        path='/administradores'
                        element={
                        
                          <AdminAdministrators/>
                        
                        }
                      />
                      <Route
                        path='/course-registration'
                        element={
                          <AdminCourseRegistration/>
                        }
                      />
                    </Routes>
                  </Container>
                </div>
              ) : (
                <Routes>
                  <Route path='/*' element={<Navigate to='/admin/login' />} />
                  <Route
                    path='/login'
                    element={
                      <AdminLogin
                        setAdminIsAuthenticated={setAdminIsAuthenticated}
                        setName={setName}
                        setAdminId={setAdminId}
                      />
                    }
                  />
                </Routes>
              )}

              <Footer />
            </>
          }
        />
      </Routes>
    </>
  );
}

export default App;
