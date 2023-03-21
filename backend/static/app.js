
// // window.onload = function (){
// // async function login(event, el){
// //     event.preventDefault()

// //     const response = await fetch(el.action, {
// //         method: el.method,
// //         headers: {
// //             'Content-Type': 'application/json'
// //         },
// //         body: JSON.stringify({
// //             username: el.querySelector("[name=username]").value,
            
// //             password: el.querySelector("[name=password]").value,
// //         })
// //     })  
// //     console.log(username)

// //     if (response.status === 200) {
// //         alert("Welcome")
// //         window.location.replace("/")
// //     } else {
// //         alert("Incorrect username or password")
// //     }
// // }}

// window.onload = function () {
//     var form = document.getElementById("login-form");
//         form.addEventListener('submit', async event => {
//         event.preventDefault()
//         const formData = new FormData(form)
//         try {
//         const response = await axios.get('/login', formData)
//         response.data
//         document.cookie(`${respone.data.access_tocken}`)
//         // const respone = await axios.get('users/me', { withCredentials: true });
//         // console.log(respone.data)
//         } catch (error) {
// alert('Authentication failed!')
// }

// })
