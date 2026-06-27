function cargarRecurso(tagSelector,archivo){
    const elemento = document.querySelector(tagSelector);
    fetch(archivo)
            .then(rpta => rpta.text())
            .then(html => elemento.innerHTML = html);
}

fetch("HTML/header.html")
    .then(rpta =>rpta.text())
    .then(html =>{
        document.getElementById("header").innerHTML = html;
        cargarRecurso("#footer","HTML/footer.html");
        cargarRecurso("#main","HTML/inicio.html");
        document.querySelector("nav ul").addEventListener("click",(e)=>{
            const link = e.target.closest("a");
            e.preventDefault();
            if(link){
                document.getElementById("prueba-header").checked = false;
                cargarRecurso("#main",link.dataset.page);
            }
        });
    });



