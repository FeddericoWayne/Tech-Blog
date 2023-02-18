// selects html elements
const newPost = document.getElementById('new-post');
const post = document.getElementById('post-button');


// displays input boxes for new blog posts
function displayPostBox() {
    
    const box = document.getElementById('post-container');
    box.setAttribute('style','display:block');
    newPost.setAttribute('style','cursor:auto');

};

// POST request to submit new blog posts
async function createPost(e) {

    e.preventDefault();

    const title = document.getElementById('post-title').value.trim();
    const text = document.getElementById('post-content').value.trim();

    if (title && text) {

        const response = await fetch('/api/blogpost/new',{
            method: 'POST',
            body: JSON.stringify({title,text}),
            headers: { 'Content-type': 'application/json' }
        });
    
        if (response.ok) {
            window.location.replace("/api/user/dashboard")
        }

    }

};

// event listeners
post.addEventListener("click",createPost);
newPost.addEventListener("click",displayPostBox);

