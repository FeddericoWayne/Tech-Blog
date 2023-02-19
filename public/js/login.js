// selects html elements
const signUp = document.getElementById("signup-button");
const login = document.getElementById("login-button");

// handles new user signup requests
async function handleSignUp(e) {

    e.preventDefault();

    const username = document.getElementById("username-signup").value.trim();
    const password = document.getElementById("password-signup").value.trim();

    // if either username or password is left blank
    if (!username || !password) {
        window.alert("Please Enter Both Username and Password to Sign Up!");
        return;
    }

    if (username && password) {

        // POST request to sign up
        const response = await fetch('/api/user/signup',{
            method: "POST",
            body: JSON.stringify({username,password}),
            headers: { 'Content-Type': 'application/json' }
        });

        // takes user back to homepage
        if (response.ok) {
            window.location.replace('/');
        };

        // if username is already in use
        if (response.status == 409) {
            window.alert("Username Already Taken. Please Try Again!");
            window.location.reload();
        }

    }


}

// handles existing user login requests
async function handleLogin(e) {

    e.preventDefault();

    const username = document.getElementById("username-login").value.trim();
    const password = document.getElementById("password-login").value.trim();

    // if either username or password is left blank
    if (!username || !password) {
        window.alert("Please Enter Both Username and Password to Login!");
        return;
    }

    if (username && password) {

        // POST request to login
        const response = await fetch('/api/user/login',{
            method: 'POST',
            body: JSON.stringify({username,password}), 
            headers: { 'Content-Type':'application/json' }
        });

        // takes user back to homepage
        if (response.ok) {
            window.location.replace('/');
        }; 
        // invalid username
        if (response.status == 404) {
            window.alert("User Not Found. Please Try Again!");
            window.location.reload();
        };
        // invalid password
        if (response.status == 401) {
            window.alert("Invalid Password. Please Try Again!");
            window.location.reload();
        }
    }

}

// event listeners
signUp.addEventListener("click",handleSignUp);
login.addEventListener("click",handleLogin);
