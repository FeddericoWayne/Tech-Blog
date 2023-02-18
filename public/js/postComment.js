

const submitComment = document.getElementById('submit-comment');

async function postComment(e) {

    e.preventDefault();

    const commentText = document.getElementById('comment').value.trim();
    const postId = document.getElementById('submit-comment').getAttribute("data-id");

    if (commentText) {

        const response = await fetch('/api/blogpost/comment',{
            method: 'POST',
            body: JSON.stringify({postId,commentText}),
            headers: { 'Content-Type': 'application/json' }
        });

        if (response.ok) {
            location.reload();
        }
        
    }



}


submitComment.addEventListener("click",postComment);