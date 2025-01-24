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


    //Reactividad de pagina destino
    const destName = document.querySelector('.destinationText h1');
    const destText = document.querySelector('.destinationText p');
    const destNav = document.querySelector('.destinationNav');
    const destImg = document.querySelector('.destinationImage img');
    const destDistance = document.querySelector('.destinationDistance h5');
    const destTravel = document.querySelector('.destinationTravel h5');

    fetch("../assets/data.json")
        .then(response => {
            if (!response.ok) {
                throw new Error(`!Error HTTP con status: ${response.status}`);
            }
            return response.json(); // Devuelve el contenido del archivo data.json
        })
        .then(data => {
            const destinations = data.destinations;
            // Menu de destinos
            destinations.forEach((destination, index) => {
                const li = document.createElement('li');
                const a = document.createElement('a');
                a.textContent = destination.name.toUpperCase();
                li.appendChild(a);
                destNav.appendChild(li);

                if (index === 0) {
                    // Agregar la clase active al primer elemento por defecto
                    a.parentElement.classList.add('dest-active');
                    // Contenido por defecto de la pagina destino
                    destName.textContent = destination.name.toUpperCase();
                    destText.textContent = destination.description;
                    destImg.src = destination.images.webp;
                    destDistance.textContent = formatUnit(destination.distance);
                    destTravel.textContent = formatUnit(destination.travel);
                }
                a.addEventListener('click', (e) => {
                    e.preventDefault();
                    // Elimina la clase active de todos los elementos li
                    const allLinks = document.querySelectorAll('.destinationNav li');
                    allLinks.forEach(link => { link.classList.remove('dest-active') });
                    // Agrega la clase active al elemento seleccionado
                    a.parentElement.classList.add('dest-active');
                    // Cambia el contenido de la pagina destino
                    destName.textContent = destination.name.toUpperCase();
                    destText.textContent = destination.description;
                    destImg.src = destination.images.webp;
                    destDistance.textContent = formatUnit(destination.distance);
                    destTravel.textContent = formatUnit(destination.travel);
                });
            })

        })
});
//Funcion para dar formato a las unidades de distancia y tiempo
function formatUnit(value) {
    const parts = value.split(' ');
    if (parts.length === 2) {
        return `${parts[ 0 ]} ${parts[ 1 ]?.toUpperCase()}`;
    } else if (parts.length === 3) {
        return `${parts[ 0 ]} ${parts[ 1 ].toUpperCase()} ${parts[ 2 ].toUpperCase()}`;
    }
    return value;
}