document.addEventListener('DOMContentLoaded', () => {
    const regForm = document.querySelector('form');
    if (regForm) {
        regForm.addEventListener('submit', function (event) {
            event.preventDefault();

            let action = document.querySelector('input[name="action"]:checked').value;
            let login = document.getElementById("nickname").value;
            let password = document.getElementById("pass").value;
            let repass = document.getElementById("repass").value;

            if (action === 'signup') {
                if (!login || !password || !repass) {
                    alert("All fields are required for Sign up!");
                    return;
                }

                if (password !== repass) {
                    alert("Passwords do not match!");
                    return;
                }
                sendRegistrationRequest({ login: login, password: password });
            } else if (action === 'signin') {
                if (!login || !password) {
                    alert("Nickname and Password are required for Sign in!");
                    return;
                }
                sendLoginRequest({ login: login, password: password });
            }
        });
    }
    if (window.location.href.includes('/menu')) {
        fetch('/getinterfacesettings', {
            method: 'GET'
        })
            .then(r => r.json())
            .then(j => {
                if (j.status === 200) {
                    const { sound, fullscreen } = j.data;
                    if (fullscreen) {
                        document.documentElement.requestFullscreen();
                    }
                    else {
                        document.exitFullscreen();
                    }

                }
            })
    }
})

function sendRegistrationRequest(data) {

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
                    //alert(j.statusMessage);

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

function sendLoginRequest(data) {
    // Code to handle login request
    console.log(data);
    fetch('/auth', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(response => {
            if (response.status === 200) {
                window.location.href = "/menu";
            } else {
                return response.json();
            }
        })
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
                // case 201:
                //     console.log(j);
                //     window.location.href = "/menu";
                //     break;
            }
        })
        .catch((error) => {
            console.error('Error:', error);
            alert('An error occurred. Please try again later.');
        });
}