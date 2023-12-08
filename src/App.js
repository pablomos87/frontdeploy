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
import React, { useState } from 'react';
import { useLocation, Navigate } from 'react-router-dom';


function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [adminIsAuthenticated, setAdminIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [name, setName] = useState('');
  const [userId, setUserId] = useState('');
  const location = useLocation();

  const logoutFunction = () => {
    setIsAuthenticated(false);
    setAdminIsAuthenticated(false);
    setUsername('');
    setName('');
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
                username={username}
                userId={userId}
                logout={logoutFunction}
                setUsername={setUsername}
                setUserId={setUserId}
                adminIsAuthenticated={adminIsAuthenticated}
                setName={setName}
                name={name}
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
                          setIsAuthenticated={setIsAuthenticated}
                          setUsername={setUsername}
                          setUserId={setUserId}
                          location={location}
                        />
                      }
                    />
                    <Route path='/signup' element={<Signup />} />
                    <Route path='/signup-success' element={<SignupSuccess />} />
                    <Route
                      path='/user-profile'
                      element={
                        isAuthenticated ? (
                          <UserProfile loggedInUsername={username} />
                        ) : (
                          <Navigate to='/login' />
                        )
                      }
                    />
                    SignupSuccess
                    <Route
                      path='/user-courses'
                      element={
                        isAuthenticated ? (
                          <UserCourses loggedInUsername={username} />
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
                        <ConfirmCourseRegistration
                          userId={userId}
                          isAuthenticated={isAuthenticated}
                          username={username}
                        />
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
                username={username}
                logout={logoutFunction}
                setUsername={setUsername}
                adminIsAuthenticated={adminIsAuthenticated}
                setName={setName}
                name={name}
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
                          adminIsAuthenticated ? (
                            <Admin />
                          ) : (
                            <Navigate
                              to='/admin/login'
                              setAdminIsAuthenticated={setAdminIsAuthenticated}
                              setName={setName}
                            />
                          )
                        }
                      />

                      <Route
                        path='/crear-cursos'
                        element={
                          <NewCourse
                            setAdminIsAuthenticated={setAdminIsAuthenticated}
                            setName={setName}
                          />
                        }
                      />
                      <Route
                        path='/editcourse/'
                        element={
                          <EditCourse
                            setAdminIsAuthenticated={setAdminIsAuthenticated}
                            setName={setName}
                          />
                        }
                      />
                      <Route
                        path='/registro'
                        element={
                          <AdminRegister
                            setAdminIsAuthenticated={setAdminIsAuthenticated}
                            setName={setName}
                          />
                        }
                      />
                      <Route
                        path='/usuarios'
                        element={
                          <AdminUsers
                            setAdminIsAuthenticated={setAdminIsAuthenticated}
                            setName={setName}
                          />
                        }
                      />
                      <Route
                        path='/cursos'
                        element={
                          <AdminCourses
                            setAdminIsAuthenticated={setAdminIsAuthenticated}
                            setName={setName}
                          />
                        }
                      />
                      <Route
                        path='/administradores'
                        element={
                          <AdminAdministrators
                            setAdminIsAuthenticated={setAdminIsAuthenticated}
                            setName={setName}
                          />
                        }
                      />
                      <Route
                        path='/course-registration'
                        element={
                          <AdminCourseRegistration
                            setAdminIsAuthenticated={setAdminIsAuthenticated}
                            setName={setName}
                          />
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
