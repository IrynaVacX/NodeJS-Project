document.querySelector('form').addEventListener('submit', function (event) {
    event.preventDefault();

    let action = document.querySelector('input[name="action"]:checked').value;
    let login = document.getElementById("nickname").value;
    let password = document.getElementById("pass").value;
    let repass = document.getElementById("repass").value;


    if (action === 'signup') {
        if (!login || !password /*||!repas */) {
            alert("All fields are required for Sign up!");
            return;
        }
        // Поле "Повторите пароль" куда-то исчезло
        // if (password !== repass) {
        //     alert("Passwords do not match!");
        //     return;
        // }
    } else if (action === 'signin') {
        if (!login || !password) {
            alert("Nickname and Password are required for Sign in!");
            return;
        }
    }


    sendDataToServer({ login, password });
});

function sendDataToServer(data) {
    // let data = {
    //     action: action,
    //     nickname: nickname,
    //     password: password
    // };

    fetch('/registration', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(response => response.json())
        .then(j => {
            /*JSON DATA:
            -fields: 
            --status
            --statusMessage
            --data is object array({fieldName, errorMessage}) 
            */
            switch (j.status) {
                case 400:
                    console.log(j);
                    // wrong request data
                    // missing fields: login, password
                    break;
                case 403:
                    console.log(j);
                    if (Array.isArray(j.data)) {
                        let errorMessages = j.data;
                        // errorMessages[0].fieldName
                        // errorMessages[0].errorMessage
                    }
                    break;
                case 500:
                    console.log(j);
                    // j.statusMessage
                    break;
                case 201:
                    console.log(j);
                    //success
                    break;
            }
        })
        .catch((error) => {
            console.error('Error:', error);
            alert('An error occurred. Please try again later.');
        });
}