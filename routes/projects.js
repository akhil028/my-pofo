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
    console.log(req.session.name)
    res.render('projects', {
        title: 'Projects',
        layout: 'layout',
        navProjects: true,
        projects: getProjects()
    })
})


router.get((req,res) => {
    var alias = req.params.alias;
    res.render('project-detail', {
        title:'Details',
        layout:'layout',
        project:getProjects(alias)
    })
})


module.exports = router;