const data = require('../myData.json');
const router = require('express').Router();


function getProjects(alias) {
    if (alias) {
        var index = data.projectIndex[alias];
        console.log(index);
        return data.myProjects[index];
    } else {
        return data.myProjects;
    }
}



router.get('/', (req, res) => {
    res.render('admin/admin', {
        title: 'admin',
        layout: 'layout-admin'
    })
})


router.get('/projects', (req,res) => {
    res.render('admin/projects',{
        title: 'Project List',
        layout: 'layout-admin',
        navProjects: true,
        projects: getProjects()
    })
});

router.get('/projects/:alias', (req,res) => {
    let alias = req.params.alias
    res.render('admin/project-detail',{
        title: 'Project Detail',
        layout: 'layout-admin',
        navProjects: true,
        project: getProjects(alias)
    })
})

router.get('/projects-create', (req,res) => {
    res.render('admin/project-create', {
        title: 'Project Create',
        layout: 'layout-admin',
    })
})





module.exports = router;