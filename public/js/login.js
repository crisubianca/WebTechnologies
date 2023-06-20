let username = {
    input: document.getElementById("username"),
    valid: false,
};

let password = {
    input: document.getElementById("password"),
    valid: false,
};

formInputs = [username, password];

const isRequired = (value) => (value === "" ? false : true);

username.input.addEventListener("input", () => {
    if(isRequired(username.input.value.trim())){
        username.input.style.outlineColor = "hsl(145, 63%, 40%)";
        username.valid = true;
    }else{
        username.input.style.outlineColor = "hsl(0, 100%, 34%)";
        username.valid = false;
    }
});

password.input.addEventListener("input", () => {
    if(isRequired(password.input.value.trim())){
        password.input.style.outlineColor = "hsl(145, 63%, 40%)";
        password.valid = true;
    }else{
        password.input.style.outlineColor = "hsl(0, 100%, 34%)";
        password.valid = false;
    }
});

function loginUser(){
    let valid = true;

    for (let i = 0; i < formInputs.length; i++) {
        if (!formInputs[i].valid && formInputs[i].input.value == "") {
            formInputs[i].input.style.outlineColor = "hsl(0, 100%, 34%)";
            valid = false;
        }
    }

    if (!valid) {
        return;
    }

    const userData = {
        username: username.input.value,
        password: password.input.value,
    };

    fetch("./loginUser", {
        method: "POST",
        mode: "cors",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
    })
        .then((res) => {
            console.log(res);
            if (res.status == 200) {
                console.log("succes");
                window.location.href = './homePage';
            } else if (res.status == 401) {
                console.log("bad request");
            }
        })
        .catch((err) => {
            console.log("error");
        });
}