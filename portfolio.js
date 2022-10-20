const configPortfolio = {

    sliderPosition: 0,
    slides: 1,
    columns: 2,
    rows: 2,
    auto: false
}, 

itemsPortfolio = [

    {name:'Tierra Verde Tours', img:'img/tierra_verde_tours.png', link:'https://www.tourstierraverde.com', text: `This is probably not my best work but it is special for me because this is the website I made for my travel agency in Peru. It is made with jquery and without flexbox only with display: inline-block and block!!!!!. Both the design and programming was done by me.`}, 
    {name:'Shamiro Tours', img: 'img/shamiro_tours.jpg', link:'https://shamirotours.com', text:`This has been my last job for a client from Peru. It is also a website for a travel agency. It has two forms with a personalized budgets and a tailor made payment gateway. Both the design and programming was done by me.`}, 
    {name:'Tarapoto Tours', img:'img/tarapoto_tours.png', link:'https://tarapoto.tours/', text:`This was a tourist guide I created for Tarapoto, the city in Peru where I was living. However, its purpose also was to increase the SEO of my business website, Tierra Verde Tours, also included in this portfolio.The design , programming (and the content!!!!!) was done by me.`}
];

function initPortfolio() {

    createPortfolio();
    createPortfolioEventListeners();

} // INICIA PORTFOLIO

function createPortfolio() { // CREA PORTFOLIO SEGUN PARAMETROS DE CONFIG

    const innerPortfolio = document.querySelector('.innerPortfolio'),
        templateItemGrid = document.getElementById('itemGridPortfolio'),
        htmlModel = document.importNode(templateItemGrid.content, true).querySelector('div'),
        membersXSlide = Math.floor(itemsPortfolio.length / configPortfolio.slides);


    for (let index = 0; index < configPortfolio.slides; index++) {

        let items = itemsPortfolio.slice(membersXSlide * index, membersXSlide * (index + 1)),
            slide = document.createElement('div'), img;

        items.forEach((item) => {


            htmlElement = htmlModel.cloneNode(true);
            htmlElement.classList.add('imgPortfolio');

            img = htmlElement.querySelector('img');
            img.src = item.img;            
            htmlElement.style.height = 100 / configPortfolio.rows + "%";
            htmlElement.style.width = 100 / configPortfolio.columns + "%";

            slide.append(htmlElement);
        })

        slide.style.width = 100 / configPortfolio.slides + "%";
        innerPortfolio.append(slide);
    }

    innerPortfolio.style.width = configPortfolio.slides * 100 + "%";

}


function moveSliderPortfolio(direction) { // MUEVE A IZQUIERDA Y DERECHA EL SLIDER

    const inner = document.querySelector('.innerPortfolio');

    configPortfolio.sliderPosition = configPortfolio.sliderPosition + direction;

    if (is_last_slide(direction, configPortfolio.sliderPosition)) {

        configPortfolio.sliderPosition = direction == 1 ? 0 : (configPortfolio.slides - 1) * configPortfolio.columns;
    }

    inner.style.left = configPortfolio.sliderPosition * (-100 / configPortfolio.columns) + "%";
}


function is_last_slide(direction, position) { // SI ES EL ULTIMO SLIDE

    const lastRight = (configPortfolio.slides - 1) * configPortfolio.columns,
        lastLeft = 0;

    return (position > lastRight && direction == 1) || (position < lastLeft && direction == -1);
}


function changeSliderAuto() { // CAMBIA SLIDER AUTO Y EL ICONO

    const icon = document.getElementById('btnAuto').querySelector("i");

    icon.classList = "";

    if (configPortfolio.auto) {

        clearInterval(configPortfolio.auto);

        icon.classList.add(...["bi", "bi-play"]);

        return configPortfolio.auto = false;
    }
    icon.classList.add(...["bi", "bi-stop"]);
    configPortfolio.auto = setInterval(() => moveSliderPortfolio(1), 2000)
}

function createPortfolioEventListeners() { // CREA EVENT LISTENERS PARA OFFSET

    let elements = document.getElementsByClassName('imgPortfolio'),
        element;

    Object.keys(elements).forEach((key,i) => {

        element = elements[key];
        element.addEventListener('click', (e) => checkImage(i), false);
    });
}

function checkImage(indexItem) { // MUESTRA ITEM PORTFOLIO EN OFFCANVAS


    let item = itemsPortfolio[indexItem], imgOBj, link, img, title, text;

    imgOBj = document.createElement('img');
    imgOBj.src = item.img;

    link = document.getElementById('linkItemPortfolio');
    img = document.getElementById('imgPortfolioItem');
    title = document.getElementById('offcanvasRightLabel');
    text = document.getElementById('itemPortfolioText');


    link.innerHTML = item.link;
    link.setAttribute('href', item.link);

    title.innerHTML = item.name;
    text.innerHTML = item.text;

    img.innerHTML = "";
    img.append(imgOBj);

}

