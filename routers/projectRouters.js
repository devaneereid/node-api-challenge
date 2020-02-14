const express = require('express');
const Projects = require('../data/helpers/projectModel');

const router = express.Router();

// GET Request
router.get('/', (req, res) => {
    Projects.get()
            .then(project => {
                res.status(200).json(project)
            })
            .catch(error => {
                console.log(error)
                res.status(500).json({ message: "Error retrieving project" })
            });
});

// GET ID Request
router.get('/:id', (req, res) => {
    Projects.get(req.params.id)
            .then(project => {
                if (project) {
                    res.status(200).json(project);
                } else {
                    res.status(404).json({ message: "Error retrieving the Project Id" })
                };
            });
});

// DELETE Request 
router.delete('/:id', (req, res) => {
    Projects.remove(req.params.id) 
            .then(count => {
                if (count > 0) {
                res.status(200).json({ message: "The project has been nuked" })
                } else {
                    res.status(404).json({ message: "The project could not be found" })
                }
            })
            .catch(error => {
                console.log(error);
                res.status(500).json({ message: "Error deleting the project" })
            });
});

// PUT Request
router.put('/:id', (req, res) => {
    const id = req.params.id
    Projects.update(id, req.body)
            .then(user => {
                if (user) {
                    res.status(201).json({...req.body, id: id })
                } else {
                    res.status(404).json({ message: "Error finding project" })
                }
            })
            .catch(error => {
                console.log(error);
                res.status(5000).json({ message: "Error updating project" })
            });
});

// POST Request 
router.post('/', (req, res) => {
    const project = {...req.body, project_id: req.params.id};
    Projects.add(project)
            .then(projects => {
                res.status(201).json(projects)
            })
            .catch(error => {
                res.status(500).json({ message: "Error posting to projects"})
            });
});

module.exports = router;