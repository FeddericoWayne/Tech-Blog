// selects html elements
const newPost = document.getElementById('new-post');
const post = document.getElementById('post-button');


// displays input boxes for new blog posts
function displayPostBox() {
    
    const box = document.getElementById('post-container');
    box.setAttribute('style','display:block');
    newPost.setAttribute('style','display:none');

};

// POST request to submit new blog posts
async function createPost(e) {

    e.preventDefault();

    const title = document.getElementById('post-title').value.trim();
    const text = document.getElementById('post-content').value;

    // if either title or text is left blank
    if (!title) {
        window.alert("Post Title Cannot be Blank!");
        return;
    };

    if (!text) {
        window.alert("Post Content Cannot be Blank!");
        return;
    };

    if (title && text) {

        const response = await fetch('/api/blogpost/new',{
            method: 'POST',
            body: JSON.stringify({title,text}),
            headers: { 'Content-type': 'application/json' }
        });
    
        if (response.ok) {
            window.location.replace("/api/user/dashboard")
        }

        // if cookie timed out
        if (response.status == 408) {
            window.location.replace("/api/user/login");
        }

    }

};

// event listeners
post.addEventListener("click",createPost);
newPost.addEventListener("click",displayPostBox);

