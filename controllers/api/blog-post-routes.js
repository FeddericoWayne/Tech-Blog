const router = require('express').Router();
const { User , BlogPost, Comment } = require('../../models');

// get all the blogposts
router.get('/',async (req,res)=>{

    try {

        const blogPostData = await BlogPost.findAll({
            include:[{model: User, attributes: ['username']}]  
          })
      
        const blogPosts = blogPostData.map((blogPost) =>
        blogPost.get({ plain: true }));

        res.status(200).render('blogposts',{
            blogPosts, 
            loggedIn: req.session.loggedIn
        })

    } catch(err) {
        res.status(400).json(err);
    }

});

// displays one single blog post 
router.get('/:id',async (req,res)=>{

    try {
        const postData = await BlogPost.findByPk(req.params.id,{
            include:[{model:User}]
        });
    
        const post = postData.get({plain:true});
    
        const postId = post.id;
        const authorId = post.author_id;
    
        let isOwnPost;
    
        if (authorId === req.session.user_id) {
            isOwnPost = true;
        } else {
            isOwnPost = false;
        }
    
        const commentData = await Comment.findAll({
            include: [{model:User}],
            where: {
                post_id: postId
            }
        });


    
        const comments = commentData.map((comment)=>
        comment.get({plain:true}));

        for (comment of comments) {
            if (comment.commenter_id === req.session.user_id) {
                comment.isOwnComment = true;
                continue;
            };

            if (comment.commenter_id !== req.session.user_id) {
                comment.isOwnComment = false;
                continue;
            };
        };
    
        req.session.save(async ()=>{
            req.session.loggedIn = true;   
            req.session.ownPost = isOwnPost;
    
            res.status(200).render('viewpost',{ post, comments, loggedIn: req.session.loggedIn, ownPost: req.session.ownPost})
        })

    } catch(err) {
        res.status(400).json(err);
    }






})

// creates new blog posts
router.post('/new',async (req,res)=>{

    try{
        await BlogPost.create({
            blog_title: req.body.title,
            blog_text: req.body.text,
            author_id: req.session.user_id
        });
    
        res.status(200).render('dashboard',{
            loggedIn: req.session.loggedIn,
            userId: req.session.user_id
        })
    } catch(err) {
        res.status(400).json(err);
    }
});


// updates a blog post
router.put('/:id',async (req,res)=>{

    try {

        await BlogPost.update({blog_title: req.body.updatedTitle, blog_text: req.body.updatedText},{
            where: { id: req.params.id }
        });
    
        req.session.save(()=>{
            req.session.loggedIn = true
        });
    
        res.status(200).json({message: "Post Updated!"});

        
    } catch(err) {
        res.status(400).json(err);
    }

})

// deletes a blog post
router.delete('/:id',async(req,res)=>{

    try {
        await BlogPost.destroy({
            where:{
                id: req.params.id
            }
        });

        req.session.save(async ()=>{
            req.session.loggedIn = true;
            
            res.status(200).json({message:"Post Deleted!"})

        });

    } catch(err) {
        res.status(400).json(err);
    }

});

// creates new blog comments
router.post('/comment',async (req,res)=>{
    
    try {

        const userId = req.session.user_id;

        await Comment.create({
            comment_text: req.body.commentText,
            post_id: req.body.postId,
            commenter_id: userId
        });

        req.session.save(async ()=>{
            req.session.loggedIn = true;
            res.status(200).json({message:'Comment Submitted!'}); 
        })
    


    } catch(err) {
        res.status(400).json(err);
    }

});

// updates comments
router.put('/comment/:id',async (req,res)=>{

    try {

        const updatedComment = req.body.updatedComment;

        await Comment.update({comment_text: updatedComment},{
            where: {
                id: req.params.id
            }
        });
    
        req.session.save(()=>{
            req.session.loggedIn = true
        });
    
        res.status(200).json({message: "Comment Updated!"});

        
    } catch(err) {

        res.status(400).json(err);

    }

});

// deletes a comment
router.delete('/comment/:id',async (req,res)=>{

    try {
        await Comment.destroy({
            where:{
                id: req.params.id
            }
        });
    
        req.session.save(()=>{
            req.session.loggedIn = true
            res.status(200).json({message: "Comment Deleted!"});
        });

    } catch(err) {
        res.status(400).json(err);
    }

});




module.exports = router;
