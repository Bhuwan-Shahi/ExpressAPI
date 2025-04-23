import express, { json } from "express";

const router = express.Router();

let posts = [
    { id: 1, title: 'Post 1' },
    { id: 2, title: 'Post 2' },
    { id: 3, title: 'Post 3' }
];

// Endpoint for all posts
router.get('/', (req, res) => {
    const limit = parseInt(req.query.limit);
    if (!isNaN(limit) && limit > 0) {
        return res.status(200).json(posts.slice(0, limit));
    }
    res.status(200).json(posts);
});

// To get posts by id
router.get('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const post = posts.find(post => post.id === id);
    if (!post) {
        return res.status(404).json({ msg: "404 Post not found" });
    }
    res.status(200).json(post);
});


// Creating post 
router.post('/', (req, res) => {
    const newPost = {
        id: posts.length + 1, // Simple ID generation
        title: req.body.title // Assuming the title is sent in the body
    }
    if(!newPost.title){
      return  res.status(400).json({msg:'Please include message'})
    }
    posts.push(newPost);
    res.status(201).json(newPost);
})

//Update post
router.put('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const post = posts.find((post) => post.id === id);
    if(!post){
        return res.status(404).json({msg:`A post with ${id} not found`})
    }
    post.title = req.body.title
    res.status(200).json(posts)
})

//Delete post
router.delete('/:id',(req, res)=>{
    const id = parseInt(req.params.id)
    const post = posts.find((post)=>post.id === id)

    if(!post){
        return res.status(404).json({msg:`A post with ${id} not found`})
    }
    posts = posts.filter((posts)=> post.id !== id)
    res.status(200).json(posts)
})
export default router;
