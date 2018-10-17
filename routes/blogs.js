const data = require('../myData.json');
const router = require('express').Router();


function getBlogs(alias) {
    if (alias) {
        var index = data.blogIndex[alias];
        console.log(index);
        return data.myBlog[index];
    } else {
        return data.myBlog;
    }
}


router.get('/', (req, res) => {
    const random = Math.floor(Math.random() * data.myBlog.length)
    res.render('blog', {
        title: 'Blogs',
        layout: 'layout',
        navBlogs: true,
        blogs: getBlogs(),
        featuredBlog: getBlogs()[random]
    })
})


router.get('/', (req, res) => {
    let alias = req.params.alias;
    res.render('blog-detail', {
        title: 'Blogs',
        layout: 'layout',
        navBlogs: true,
        blog: getBlogs(alias),
        blogCategory: data.blogCategories
    })
})



module.exports = router;