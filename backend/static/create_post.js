const cancel = document.querySelector('#cancel');
const create_post = document.querySelector("#create_post");
const post_button = document.querySelector("#post_button");


cancel.addEventListener('click', () => {
    create_post.classList.add('hidden');

})

post_button.addEventListener('click', () => {
    create_post.classList.remove('hidden');

})