function validateEmail(mail) {
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail);
}

function validatePassword(password) {
    return /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/.test(
        password
    );
}

function validateUsername(username) {
    return /^\w{3,25}$/.test(username);
}

const isRequired = (value) => (value === "" ? false : true);

let username = {
    input: document.getElementById("username"),
    valid: false,
};

let email = {
    input: document.getElementById("email"),
    valid: false,
};

let password = {
    input: document.getElementById("password"),
    valid: false,
};

let confirmPassword = {
    input: document.getElementById("confirm-password"),
    valid: false,
};

let signUpButton = document.getElementById("sign-up");

let formInputs = [username, email, password, confirmPassword];

window.addEventListener("click", (e) => {
    for (let i = 0; i < formInputs.length; i++) {
        if (e.currentTarget == formInputs[i].input) {
            formInputs[i].input.nextElementSibling.classList.remove("hidden");
        } else {
            formInputs[i].input.nextElementSibling.classList.add("hidden");
        }
    }
});

username.input.addEventListener("input", () => {
    username.input.style.outlineWidth = "3px";
    if (isRequired(username.input.value.trim()) && validateUsername(username.input.value)) {
        username.input.style.outlineColor = "hsl(145, 63%, 40%)";
        username.valid = true;
    } else {
        username.input.style.outlineColor = "hsl(0, 100%, 34%)";
        username.valid = false;
    }
});

email.input.addEventListener("input", () => {
    email.input.style.outlineWidth = "3px";
    if (validateEmail(email.input.value)) {
        email.input.style.outlineColor = "hsl(145, 63%, 40%)";
        email.valid = true;
    } else {
        email.input.style.outlineColor = "hsl(0, 100%, 34%)";
        email.valid = false;
    }
});

password.input.addEventListener("input", () => {
    password.input.style.outlineWidth = "3px";
    if (validatePassword(password.input.value)) {
        password.input.style.outlineColor = "hsl(145, 63%, 40%)";
        password.valid = true;
    } else {
        password.input.style.outlineColor = "hsl(0, 100%, 34%)";
        password.valid = false;
    }

    confirmPasswordFunction();

});

function confirmPasswordFunction() {
    confirmPassword.input.style.outlineWidth = "3px";
    password.input.style.outlineWidth = "3px";
    if (confirmPassword.input.value == password.input.value) {
        confirmPassword.input.style.outlineColor = "hsl(145, 63%, 40%)";
        confirmPassword.valid = true;
    } else {
        confirmPassword.input.style.outlineColor = "hsl(0, 100%, 34%)";
        confirmPassword.valid = false;
    }
}

confirmPassword.input.addEventListener("input", () => {
    confirmPasswordFunction();
});

function registerUser() {
    let valid = true;
    for (let i = 0; i < formInputs.length; i++) {
        if (!formInputs[i].valid) {
            formInputs[i].input.style.outlineColor = "hsl(0, 100%, 34%)";
            valid = false;
        }
    }

    if (!valid) {
        return;
    }

    const userData = {
        userName: username.input.value,
        email: email.input.value,
        password: password.input.value,
    };

    fetch("./registerUser", {
        method: "POST",
        mode: "cors",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
    })
        .then(async (res) => {
            if (res.status == 201) {
                window.location.href = "./login";
            } else {
                let message = await res.text() == "email_constraint" ? " Email already in use" : "Username already in use";
            }
        })
        .catch((err) => {
            console.log("error");
        });
}



