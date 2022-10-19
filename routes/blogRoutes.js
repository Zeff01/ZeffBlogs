const express = require("express");

const blogController = require("../controller/blogController");
const router = express.Router();


// blog routes

//go to new blog
router.get("/create",  blogController.blog_create_get);

//get all blogs
router.get("/",  blogController.blog_index);

//create new blogs
router.post("/",  blogController.blog_create_post);

//go to each blog description using  blog id
router.get("/:id", blogController.blog_details);

//delete each blog using blog id
router.delete("/:id",  blogController.blog_delete);



module.exports = router;
