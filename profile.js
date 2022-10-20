const skills = [

    { name: 'angular', level: 9, content: "I am quite confident with angular and have a good command and knowledge of all its functionalities. I can definitely carry out any type of project" },
    { name: 'wordpress', level: 7.5, content: 'Most of my portfolio and experience as a programmer is related to wordpress, so you can definitely ask me about this kind of projects.' },
    { name: 'sass', level: 7, content: 'I really like saas and the possibilities offered by the language. I am not an expert, but I feel comfortable working with him to structure the css of complex projects' },
    { name: 'php', level: 7, content: 'My relationship with php is mainly through wordpress and now with laravel. I used to use it simply to generate dynamic views but lately I have been involved in a project where I have programmed the controller and database parts.' },
    { name: 'laravel', level: 5, content: "I'm getting more and more interested in this elegant framework and I'm currently immersed in an exciting programming project where I'm in charge of views, controllers and models. I'm not an expert but it won't be long before I have a much better command of it." },
    { name: 'bootstrap', level: 9, content: 'I save A LOT of time with bootstrap and I know and use the most part of it . I think it is a must for any web project' },
    { name: 'sql', level: 6, content: 'For my last project at IT Academy i designed a database and use it to run all the information of the designed app. Now I am collaborating on another project with laravel where I am also designing the database and its interactions with the backend' },
    { name: 'git', level: 6, content: 'I know the basics of the languages and I know how to create branch and and push and pull from repositories. However i am above all use to work in the main branch  ' },
    { name: 'js', level: 8, content: 'This very portfolio is done with just vanilla javascript. I feel confortable with both js and typescript' },
];

function initProfile() {

    createAccordion(skills);
    fillAge();
}

function createAccordion(listOfSkills) {

    const accordionContainer = document.getElementById('accordionSkills'),
        items = configureAccordionItems(listOfSkills);

    items.forEach(item => accordionContainer.append(item));
}

function configureAccordionItems(listOfSkills) {

    const template = document.getElementById('itemAccordion'),
        htmlModel = document.importNode(template.content, true).querySelector('.accordion-item');

    let btnHeader, idContentContainer, idHeader, containerContent, icon, progressBar, clone;

    return listOfSkills.map(skill => {

        clone = htmlModel.cloneNode(true);

        btnHeader = clone.querySelector('.accordion-button');
        progressBar = btnHeader.querySelector('.progress-bar');
        icon = getSkillIcon(skill.name);

        idContentContainer = skill.name + 'AccordionContent';
        idHeader = skill.name + 'AccordionHeader';

        btnHeader.setAttribute("data-bs-target", '#' + idContentContainer);
        btnHeader.setAttribute("aria-controls", idContentContainer);
        btnHeader.setAttribute("id", idHeader);

        progressBar.setAttribute("aria-valuenow", skill.level);
        progressBar.style.width = (skill.level * 10) + "%";

        btnHeader.querySelector("span").innerText = skill.name;


        btnHeader.prepend(icon);

        containerContent = clone.querySelector('.accordion-collapse');

        containerContent.setAttribute("id", idContentContainer);
        containerContent.setAttribute("aria-labelledby", idHeader);

        containerContent.querySelector(".accordion-body").innerText = skill.content;
        containerContent.querySelector(".badge").innerText = qualifyLevel(skill.level)
        containerContent.querySelector(".badge").classList.add(...(getColorlevel(skill.level)));

        return clone;

    })


}

function qualifyLevel(level) {

    switch (true) {

        case level < 6.5:
            return 'beginner';
        case level < 8.5:
            return 'intermediate';
        default:
            return 'expert';
    }
}

function getColorlevel(level) {

    switch (true) {

        case level < 6.5:
            return ['bg-secondary', 'text-light'];
        case level < 8.5:
            return ['bg-green-yellow', 'text-dark'];
        default:
            return ['bg-danger', 'text-light'];
    }
}

function getSkillIcon(name) {

    const template = document.getElementById('refIcons');
    return document.importNode(template.content, true).getElementById(name + 'Icon');
}

function fillAge() {

    console.log(getAge(20, 9, 1981));
    document.getElementById('ageProfile').innerHTML = getAge(20, 9, 1981);
}


function getAge(bday, bmonth, byear) {

    var now = new Date();

    let yearNow = now.getFullYear(), monthNow = now.getMonth(), dateNow = now.getDate(), years, months, days, str;

    if (dateNow > bday) days = dateNow - bday;
    else if (dateNow == days) days = 0;
    else {

        days = 30 - (bday - dateNow);
        bmonth = bmonth - 1;
    }

    if (monthNow > bmonth) months = monthNow - bmonth;
    else if (monthNow == bmonth) months = 0;
    else {

        months = 12 - (bmonth - monthNow);
        byear--;
    }

    years = yearNow - byear;

    str = years + ' years';
    str += months == 0 ? '' : ', ' + months + (months == 1 ? ' month' : ' months');
    str += days == 0 ? '' : ', ' + days + (days == 1 ? ' day' : ' days');


    return str;

}