import axios from 'axios';

export const handleAddCourse = async (e, formData, navigate) => {
    e.preventDefault();

    try {
        const adminToken = localStorage.getItem('adminToken');
        await axios.post('https://backdeploy-proyectofinal-utn.up.railway.app/courses/newcourse', formData, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${adminToken}`
            },
        });
        navigate('/admin')

    } catch (error) {
        console.error('Error:', error);
    }
};

export const handleChange = (e, setFormData, formData) => {
    setFormData({
        ...formData,
        [e.target.name]: e.target.value,
    });
};

export const handleReset = (setFormData, initialFormData) => {
    setFormData(initialFormData);
};