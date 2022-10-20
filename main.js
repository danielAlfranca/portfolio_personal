const images = getImages(), sections = ['home', 'profile', 'portfolio'];


function initApp() { // SE INICIA LA APP Y TODAS LAS SECCIONES

    initHome(images);
    initPortfolio();
    initProfile();
    listenURLChanges();

    if (window.location.href.indexOf('from') != -1) {

        manageURLChange(window.location.href)
    }
}

function listenURLChanges() { // SE CREAN LOS EVENT LISTENERS PARA DETECTAR CAMBIOS EN LA URL

    window.addEventListener('hashchange', function() {
        manageURLChange(window.location.href);
    });
};

function manageURLChange(url) { // SE ACTIVAN LOS PROCESOS DE ANIMACION DE TRANSICION Y SETUP DE LAS HREF DEL NAV PRINCIPAL

    if (isURLFromActiveSection(url)) return

    blockClicks(true);

    const params = getUrlParams(url);

    setUpAnimation(params.origin, params.destination);
    setUpNavURLs(params.destination);

    blockClicks(false);
}

function setUpAnimation(origin, destination) { // SE AÑADE LA CLASE QUE ACTIVA LA ANIMACION DE TRANSICION ENTRE SECCIONES

    let animationClasses = ['in_' + destination, 'from_' + origin];

    document.getElementById('appSlider').classList = '';
    document.getElementById('appSlider').classList.add(...animationClasses);
}

function setUpNavURLs(destination) { // SE CAMBIAN LOS PARAMETROS DEL ATRIBUTO HREF DE LAS A DE NAV PARA ADECUARLAS A LA NUEVA SECCION

    let a, hash;

    sections.forEach(section => {

        a = document.getElementById(section + 'Nav');
        hash = "#" + section;

        // LAS URL DE NAV QUE CORRESPONDEN A LA SECCION ACTIVA NO TIENEN PARAMETRO FROM 

        a.setAttribute('href', hash + (section != destination ? '?from=' + destination : ''));
    })
}

function getUrlParams(url) { // SE OBTIENEN EL HASH Y EL PARA METRO FROM DE LA URL (DESTINO Y ORIGEN DE LA TRANSICION)

    const originIndex = url.lastIndexOf('='),
        destinationIndex = url.lastIndexOf('#');

    return {

        origin: originIndex ? url.substr(originIndex + 1) : '',
        destination: destinationIndex ? url.substring(destinationIndex + 1, url.lastIndexOf('?')) : ''
    }
}

function isURLFromActiveSection(url) {

    // LAS URL DE NAV QUE CORRESPONDEN A LA SECCION ACTIVA NO TIENEN PARAMETRO FROM 

    return url.indexOf('from') == -1
}


function blockClicks(block) { // SE BLOQUEAN LOS CLICK DURANTE LAS TRANSICIONES ENTRE SECCIONES

    document.getElementsByTagName('body')[0].style.pointerEvents = block ? 'none' : 'initial';
}

function getImages() { // OBTENER LISTA ALEATORIA DE IMAGENES

    const imagesArray = [
            "https://picsum.photos/id/0/500/500",
            "https://picsum.photos/id/1/500/500",
            "https://picsum.photos/id/10/500/500",
            "https://picsum.photos/id/100/500/500",
            "https://picsum.photos/id/1001/500/500",
            "https://picsum.photos/id/1002/500/500",
            "https://picsum.photos/id/1004/500/500",
            "https://picsum.photos/id/1005/500/500",
            "https://picsum.photos/id/1006/500/500",
            "https://picsum.photos/id/101/500/500",
            "https://picsum.photos/id/1014/500/500",
            "https://picsum.photos/id/1015/500/500",
            "https://picsum.photos/id/1016/500/500",
            "https://picsum.photos/id/1018/500/500",
            "https://picsum.photos/id/1019/500/500",
            "https://picsum.photos/id/102/500/500",
            "https://picsum.photos/id/1020/500/500",
            "https://picsum.photos/id/1021/500/500",
            "https://picsum.photos/id/1022/500/500",
            "https://picsum.photos/id/1023/500/500",
            "https://picsum.photos/id/1026/500/500",
            "https://picsum.photos/id/1028/500/500", 
            "https://picsum.photos/id/1029/500/500",
            "https://picsum.photos/id/103/500/500",
            "https://picsum.photos/id/1031/500/500",
            "https://picsum.photos/id/1032/500/500",
            "https://picsum.photos/id/1033/500/500",
            "https://picsum.photos/id/1042/500/500",
            "https://picsum.photos/id/1048/500/500",
            "https://picsum.photos/id/1054/500/500",
            "https://picsum.photos/id/1056/500/500",
            "https://picsum.photos/id/1055/500/500",
            "https://picsum.photos/id/1060/500/500",
            "https://picsum.photos/id/1081/500/500",
        ],

        shuffle = function shuffle(a) {
            for (let i = a.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [a[i], a[j]] = [a[j], a[i]];
            }
            return a;
        }; // PARA DESORDENAR LA LISTA Y SACAR IMGS DIFERENTES CADA VEZ

    return shuffle(imagesArray);
}