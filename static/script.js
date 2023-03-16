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

async function postData(url = "", data = {}) {
    // Default options are marked with *
    const response = await fetch(url, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify(data), // body data type must match "Content-Type" header
    });
    return response.json(); // parses JSON response into native JavaScript objects
  }
  
//   postData("https://example.com/answer", { answer: 42 }).then((data) => {
//     console.log(data); // JSON data parsed by `data.json()` call
//   });