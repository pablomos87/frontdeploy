import { useState, useEffect } from 'react';
import axios from 'axios';

const useAdminData = () => {
    const [admins, setAdmins] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const adminToken = localStorage.getItem('adminToken');
                const response = await axios.get(
                    'https://backdeploy-proyectofinal-utn.up.railway.app/admin',
                    {
                        headers: {
                            Authorization: `Bearer ${adminToken}`,
                        },
                    }
                );
                setAdmins(response.data.admins);
            } catch (error) {
                console.error('Error al obtener la lista de administradores:', error);
            }
        };
        fetchData();
    }, []);

   

    return { admins };
};

export default useAdminData;
