// selects necessary elements
const submitComment = document.getElementById('submit-comment');
const editComments = document.getElementsByClassName('edit-comment');
const deleteComments = document.getElementsByClassName('delete-comment');


// handles comment posting
async function postComment(e) {

    e.preventDefault();

    const commentText = document.getElementById('comment').value;
    const postId = document.getElementById('submit-comment').getAttribute("data-id");

    if (!commentText) {
        window.alert("Comment Cannot be Blank!");
        return;
    }

    if (commentText) {

        const response = await fetch('/api/blogpost/comment',{
            method: 'POST',
            body: JSON.stringify({postId,commentText}),
            headers: { 'Content-Type': 'application/json' }
        });

        if (response.ok) {
            window.location.reload();
        };

        // if cookie timed out
        if (response.status == 408) {
            window.location.replace('/api/user/login');
        }


        
    }

};

// handles comment update
async function updateComment(e) {

    e.preventDefault();

    e.target.textContent = "Update Comment";
    e.target.parentElement.parentElement.querySelector('textarea').removeAttribute('readonly');

    async function saveComment() {

        const updatedComment = e.target.parentElement.parentElement.querySelector('textarea').value;

        if (!updatedComment) {
            window.alert("Comment Cannot be Blank!");
            window.location.reload();
            return;
        };

        const updatedCommentId = e.target.getAttribute('data-id');

        const response = await fetch(`/api/blogpost/comment/${updatedCommentId}`,{
            method: 'PUT',
            body: JSON.stringify({updatedComment}),
            headers: { 'Content-Type': 'application/json'}
        });

        if (response.ok) {
            window.location.reload();
        };

        // if cookie timed out
        if (response.status == 408) {
            window.location.replace('/api/user/login');
        }

    }

    e.target.addEventListener("click",saveComment);

};

// handle comment deletion
async function removeComment(e) {

    e.preventDefault();

    const deletedCommentId = e.target.getAttribute('data-id');

    const response = await fetch(`/api/blogpost/comment/${deletedCommentId}`,{
        method: 'DELETE',
        headers: { 'Content-Type':'application/json'}
    });

    if (response.ok) {
        window.location.reload();
    };

    // if cookie timed out
    if (response.status == 408) {
        window.location.replace('/api/user/login')
    }

}


// event listeners
for (editComment of editComments) {
    editComment.addEventListener("click",updateComment);
};
for (deleteComment of deleteComments) {
    deleteComment.addEventListener("click",removeComment);
};
submitComment.addEventListener("click",postComment);

