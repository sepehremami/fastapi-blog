const burger1 = document.querySelector('#burger1');
const menu1 = document.querySelector('#menu1');
const burger2 = document.querySelector('#burger2');
const cards = document.querySelector('#post_button');

burger1.addEventListener('click', () => {
    if (menu1.classList.contains('hidden')) {
        menu1.classList.remove('hidden');
        burger2.classList.add('hidden')
    } else {
        menu1.classList.add('hidden');
        burger2.classList.remove('hidden');
    }
})

burger2.addEventListener('click', () => {
    if (menu1.classList.contains('hidden')) {
        menu1.classList.remove('hidden');
        burger2.classList.add('hidden')
    } else {
        menu1.classList.add('hidden');
        burger2.classList.remove('hidden');
    }
})

