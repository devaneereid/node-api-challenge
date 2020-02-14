const express = require('express');
const Actions = require('../data/helpers/actionModel');
const Projects = require('../data/helpers/projectModel');

const router = express.Router();

// GET Request (working)
router.get('/', (req, res) => {
    Actions.get(req.query)
           .then(action => {
               res.status(200).json(action)
           })
           .catch(error => {
               console.log(error);
               res.status(500).json({ message: "Error retrieving actions" });
           });
});

// GET ID Request (working)
router.get('/:id', (req, res) => {
    Actions.get(req.params.id)
           .then(user => {
               if(user) {
                   res.status(200).json(user);
               } else {
                   res.status(404).json({ message: "Error retrieving the Action"})
               };
           });
});





module.exports = router;
