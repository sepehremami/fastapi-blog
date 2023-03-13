const burger = document.querySelector('#navbar_button');
const menu = document.querySelector('#navbar-default');

burger.addEventListener('click', () => {
    if (menu.classList.contains('hidden')) {
        menu.classList.remove('hidden');
    } else {
        menu.classList.add('hidden');
    }
})

const filter = document.querySelector('#dropdownSearchButton');
const filter_menu = document.querySelector('#dropdownSearch')
filter.addEventListener('click', () => {
    if (filter_menu.classList.contains('hidden')) {
        filter_menu.classList.remove('hidden');
    } else {
        filter_menu.classList.add('hidden');
    }
})

const burger1 = document.querySelector('#burger');
const menu1 = document.querySelector('#menu');

burger1.addEventListener('click', () => {
    if (menu1.classList.contains('hidden')) {
        menu1.classList.remove('hidden');
    } else {
        menu1.classList.add('hidden');
    }
})