// selects html elements
const signUp = document.getElementById("signup-button");
const login = document.getElementById("login-button");

// handles new user signup requests
async function handleSignUp(e) {

    e.preventDefault();

    const username = document.getElementById("username-signup").value.trim();
    const email = document.getElementById("email-signup").value.trim();
    const password = document.getElementById("password-signup").value.trim();

    if (username && email && password) {


        const response = await fetch('/api/user/signup',{
            method: "POST",
            body: JSON.stringify({username,email,password}),
            headers: { 'Content-Type': 'application/json' }
        });

        if (response.ok) {
            document.location.replace('/api/blogpost');
        } else {
            window.alert("Failed to Sign Up. Please try again!")
        };
    }


}

// handles existing user login requests
async function handleLogin(e) {

    e.preventDefault();

    const username = document.getElementById("username-login").value.trim();
    const password = document.getElementById("password-login").value.trim();

    if (username && password) {

        const response = await fetch('/api/user/login',{
            method: 'POST',
            body: JSON.stringify({username,password}), 
            headers: { 'Content-Type':'application/json' }
        });

        if (response.ok) {
            document.location.replace('/api/blogpost');

        } else {
            window.alert("Failed to Login. Please try again!")
        };
    }

}

// event listeners
signUp.addEventListener("click",handleSignUp);
login.addEventListener("click",handleLogin);
