const headerPlaceholder = document.querySelector('.header-placeholder');

fetch('./header.html')
.then(response => {
    if (!response.ok) {
        throw new Error(`!Error HTTP con status: ${response.status}`);
    }

    return response.text();  
})
.then(data => {
    console.log(data);
    
    headerPlaceholder.innerHTML = data;
})
.catch(error => {
    console.error('Ocurrió un error!, error:', error);
});