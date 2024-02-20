import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CourseRegistrationUtils = () => {
    const navigate = useNavigate();
    const [acceptedTerms, setAcceptedTerms] = useState(false);


    const handleCourseRegistration = async (isAuthenticated, userId, course, courses, location) => {
        if (!isAuthenticated) {
            console.log('El usuario no ha iniciado sesión. Redirigiendo...');
            navigate('/login');
            return;
        }

        if (!userId) {
            console.error('userId está indefinido');
            return;
        }

        if (!course) {
            console.error('course está indefinido');
            return;
        }

        try {
            const userToken = localStorage.getItem('userToken');
            const response = await axios.post(`https://backdeploy-proyectofinal-utn.up.railway.app/courses/inscripcion/${userId}/${course._id}`, null, {
              headers: {
                Authorization: `Bearer ${userToken}`
              }
            });

            if (response.status === 200) {
                alert('Inscripción exitosa');
                navigate(`/courses/registration/confirmation`, {
                    state: {
                        userId,
                        courseId: course._id,
                        acceptedTerms,
                        selectedPaymentMethod: document.querySelector('input[name="metodoPago"]:checked').id,
                        selectedCourseName: course.nombre,
                        selectedCoursePrice: course.precio,
                        registrationId: response.data.registrationId,
                      },
                });
            }
        } catch (error) {
            if (error.response && error.response.status === 400) {
                alert('Ya estás inscrito en este curso');
            } else {
                console.error('Error al inscribirse en el curso:', error);
                if (error.response) {
                    console.error('Detalles específicos del error:', error.response.data);
                } else if (error.request) {
                    console.error('El servidor no respondió:', error.request);
                } else {
                    console.error('Ocurrió un error al enviar la solicitud:', error.message);
                }
            }
        }
    };

    return { handleCourseRegistration, acceptedTerms, setAcceptedTerms };
};

export default CourseRegistrationUtils;