const initGrid = false;

function initHome(imagesURL) { // INICIALIZA GRID (UNA VEZ) Y EVENT LISTENERS (CADA VEZ)

    createGrid(imagesURL);
}

// CREAR GRID Y INCORPORARLA AL DOM

function createGrid(imagesURL) {

    const homeGrid = document.getElementById('homeGrid'),
        items = configItemsFromTemplate(imagesURL);

    items.forEach(item => homeGrid.append(item));

    gridCreated = true;
}

function configItemsFromTemplate(imgUrls) { // CONFIGURAR PARA GRID LOS ITEMS DE LA PLANTILLA 

    const template = document.getElementById('itemGrid'),
        htmlModel = document.importNode(template.content, true).querySelector('div'),
        configClases = [ // CLASE PARA CADA IMG

            ['horizontal', 'angular'],
            ['vertical', 'wordpress'],
            ['horizontal', 'sass'],
            ['vertical', 'php'],
            ['horizontal', 'bootstrap'],
            ['horizontal', 'css'],
            ['vertical', 'laravel'],
            ['vertical', 'html5'],
            ['vertical', 'js']
        ];

    // PRIMERO SE CONFIGURA LA IMAGEN DEL NOMBRE YA EN EL HTML 

    let htmlElement, center = document.getElementById('name');

    center.style.backgroundImage = "url('" + imgUrls[configClases.length] + "')"; // SE SELECCIONA LA PRIMERA IMG DESPUES DE LAS QUE SE VAN A PROCESAR
    center.style.filter = colorFilter();

    // DESPUES SE PROCESA Y DEVUELVE EL RESTO PARA SER INYECTADOS EN EL DOM

    return configClases.map((classNames, index) => {

        htmlElement = htmlModel.cloneNode(true);
        htmlElement.classList.add('img');

        htmlElement.style.filter = colorFilter(); // EFECTO DE COLOR EN CONTAINER

        classNames.forEach(classname => htmlElement.classList.add(classname)); // CLASES PARA ANIMACIONES

        htmlElement.querySelector('img').src = imgUrls[index];

        return htmlElement
    });
}

function colorFilter() { // VALOR RANDOM PARA LA PROPIEDAD FILTER (ENTRE 1 Y 360 GRADOS)

    const filterValue = Math.floor(Math.random() * 360);

    return 'hue-rotate(' + filterValue + 'deg)';
}