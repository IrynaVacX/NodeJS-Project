document.querySelector('form').addEventListener('submit', function(event) {
    event.preventDefault();

    let action = document.querySelector('input[name="action"]:checked').value;
    let nickname = document.getElementById("nickname").value;
    let pass = document.getElementById("pass").value;
    let repass = document.getElementById("repass").value;

    
    if (action === 'signup') {
        if (!nickname || !pass || !repass) {
            alert("All fields are required for Sign up!");
            return;
        }
        if (pass !== repass) {
            alert("Passwords do not match!");
            return;
        }
    } else if (action === 'signin') {
        if (!nickname || !pass) {
            alert("Nickname and Password are required for Sign in!");
            return;
        }
    }

    
    sendDataToServer(action, nickname, pass);
});

function sendDataToServer(action, nickname, password) {
    let data = {
        action: action,
        nickname: nickname,
        password: password
    };

    fetch('/registration', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert('Success!');
        } else {
            alert('Error: ' + data.message);
        }
    })
    .catch((error) => {
        console.error('Error:', error);
        alert('An error occurred. Please try again later.');
    });
}