async function login(event){
    event.preventDefault();
    const username = document.querySelector("#username").value.trim();
    const password = document.querySelector("#password").value.trim();
    if( username ==="" || password === "") {
        showErrorMsg("Please enter correct username and password!");
        return;
    }
    const response = await fetch('http://localhost:3000/api/auth/login', {
        method: 'POST',
        body: JSON.stringify({
            username,
            password
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if(response.ok){
        console.log("post succesfully");
        const result = await response.json();
        sessionStorage.setItem('token', result.accessToken);
        sessionStorage.setItem('username', result.username);
        location.href = "./main.html";
    } else {
        showErrorMsg('Incorrect username and password');
    }   
}

function showErrorMsg(msg) {
    document.querySelector('#errorMsg').innerText = msg;
}