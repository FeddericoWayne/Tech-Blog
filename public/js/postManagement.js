// selects necessary elements
const editPost = document.getElementById('edit-post');
const deletePost = document.getElementById('delete-post');
const titleBox = document.getElementById('title-box');
const textBox = document.getElementById('text-box');

// handles blog edit requests
function editBlogPage(e) {

    e.preventDefault();

    const pathArray = window.location.href.split("/");
    const updatedPostId = pathArray[pathArray.length -1];


    titleBox.removeAttribute("readonly");
    textBox.removeAttribute("readonly");

    editPost.textContent = "Update Post";

    async function updatePost() {

        const updatedTitle = titleBox.value.trim();
        const updatedText = textBox.value.trim();

        const response = await fetch(`/api/blogpost/${updatedPostId}`,{
            method: 'PUT',
            body: JSON.stringify({updatedTitle,updatedText}),
            headers: { 'Content-Type':'application/json' }
        });

        if (response.ok) {
            window.location.replace("/api/user/dashboard")
        }

    }

    editPost.addEventListener('click',updatePost);


};

// handles blog deletion
async function deleteBlog(e) {

    e.preventDefault();

    const pathArray = window.location.href.split("/");
    const deletedPostId = pathArray[pathArray.length -1];

    const response = await fetch(`/api/blogpost/${deletedPostId}`,{
        method: 'DELETE',
        headers: { 'Content-Type':'application/json'}
    });

    if (response.ok) {
        window.location.replace("/api/user/dashboard")
    };

}


// event listeners
editPost.addEventListener("click",editBlogPage);
deletePost.addEventListener("click",deleteBlog);