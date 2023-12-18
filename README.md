Proyecto Final: Plataforma de Cursos Online
Este proyecto consta de un backend desarrollado en Node.js, una base de datos MongoDB, y un frontend desarrollado en React.

Backend (Node.js)

Dependencias:

bcrypt: para el hashing de contraseñas.
cors: para permitir el intercambio de recursos entre distintos orígenes.
dotenv: para la configuración de variables de entorno.
express: para la creación de la API REST.
jsonwebtoken: para la autenticación basada en tokens JWT.
moment-timezone: para la gestión de zonas horarias.
mongoose: para la conexión y manipulación de la base de datos MongoDB.
morgan: para el logging de las solicitudes HTTP.
path: para la gestión de rutas de archivo y directorio.

Base de Datos (MongoDB)

Utilizada para almacenar datos relacionados con usuarios, cursos, inscripciones y administradores.

Frontend (React)

Dependencias:

axios: para realizar peticiones HTTP al backend.
bootstrap: para el diseño y estilos de la interfaz.
moment: para el manejo de fechas y horas.
react-bootstrap, react-fontawesome, react-icons: para componentes y estilos adicionales.
react-router-dom: para la navegación entre distintas vistas en la aplicación.


Descripción del Proyecto

Sitio web para publicación e inscripción a cursos online.
Permite a los usuarios registrarse, acceder, buscar e inscribirse a cursos.
Ofrece un perfil para que los usuarios gestionen sus datos y actividad.
Los administradores pueden gestionar cursos, usuarios, inscripciones y otros administradores.

Características

La aplicación cuenta con las siguientes funciones: 
- Descubrir cursos online y acceder a sus características.
- Inscribirse a cursos online mediante un formulario.
- Servirse de un buscador que permite encontrar cursos a partir de palabras clave. 
- Registrarse en el sitio, completando un formulario, y acceder al perfil personal. 
- Ingresar al sitio como usuario, e ingresar al perfil del usuario. 
- Añadir, editar y eliminar cursos. 
- Eliminar usuarios. 
- Añadir y eliminar adminsitradores.


Tecnologías Utilizadas

React, React Router Dom, Bootstrap, FontAwesome, React Icons.

Uso

Clona este repositorio en tu máquina local usando el siguiente comando:
bash
Copy code
git clone https://github.com/pablomos87/proyecto-final-app

Instala las dependencias con el siguiente comando:
Copy code
npm install

Ejecuta la aplicación con el comando:
sql
Copy code
npm start


El proyecto se abrirá en tu navegador en la dirección http://localhost:3000.
También puedes acceder a la aplicación en línea en https://proyecto-final-app.vercel.app/Home.





