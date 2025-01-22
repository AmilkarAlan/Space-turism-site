document.addEventListener('DOMContentLoaded', () => {
    const headerPlaceholder = document.querySelector('.header-placeholder');
    // Inyeccion del header al DOM
    fetch('./header.html') // Realiza una petición HTTP al archivo header.html
        .then(response => {
            if (!response.ok) {
                throw new Error(`!Error HTTP con status: ${response.status}`);
            }

            return response.text(); // Devuelve el contenido del archivo header.html como texto
        })
        .then(data => {
            headerPlaceholder.innerHTML = data; // Inserta el contenido del archivo header.html en el elemento con la clase header-placeholder

            // navegacion
            const navigation = document.querySelector('.navList');
            const navToggle = document.querySelector('.nav-toggle');
            const navLinks = document.querySelectorAll('#navList a');
            const currentPath = window.location.pathname.replace(/^\//, ''); // Elimina la barra inicial

            // Evento click para el botón de abrir y cerrar navegación
            navToggle.addEventListener('click', () => {
                const visibility = navigation.getAttribute('data-visible');
                if (visibility === 'false') {
                    navigation.setAttribute('data-visible', 'true');
                    navToggle.setAttribute('aria-expanded', 'true');
                } else {
                    navigation.setAttribute('data-visible', 'false');
                    navToggle.setAttribute('aria-expanded', 'false');
                }
            });

            // Indicador de la página actual en la navegación
            navLinks.forEach(link => {

                if (link.getAttribute('href') === currentPath) {

                    link.parentElement.classList.add('active'); // Agrega la clase active al elemento padre
                } else {
                    link.parentElement.classList.remove('active'); // Elimina la clase active al elemento padre que no es el actual
                }
            });

        })
        .catch(error => {
            console.error('Ocurrió un error!, error:', error);
        });

});
