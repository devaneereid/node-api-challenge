const express = require('express');
const Actions = require('../data/helpers/actionModel');

const router = express.Router();

// GET Request 
router.get('/', (req, res) => {
    Actions.get()
           .then(action => {
               res.status(200).json(action)
           })
           .catch(error => {
               console.log(error);
               res.status(500).json({ message: "Error retrieving actions" });
           });
});

// GET ID Request 
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

// DELETE Request
router.delete('/:id', (req, res) => {
    Actions.remove(req.params.id)
            .then(count => {
                if (count > 0) {
                    res.status(200).json({ message: "The user has been nuked" })
                } else {
                    res.status(404).json({ message: "The user could not be found" })
                }
            })
            .catch(error => {
                console.log(error);
                res.status(500).json({ message: "Error deleting the user" })
            });
});

// PUT Request 
router.put('/:id', (req, res) => {
    const id = req.params.id
    Actions.update(id, req.body)
            .then(user => {
                if (user) {
                    res.status(201).json({...req.body, id: id})
                } else {
                    res.status(404).json({ message: "Error finding user" })
                }
            })
            .catch(error => {
                console.log(error);
                res.status(500).json({ message: "Error updating user" })
            });

});

// POST Request
router.post('/:id', (req, res) => {
    Actions.insert(req.body) 
            .then(action => {
                if(action) {
                    res.status(201).json(action)
                } else {
                    res.status(400).json({ message: "Error finding action" })
                }
            })
            .catch(error => {
                console.log(error)
                res.status(500).json({ message: "Error posting action"})
            });
});

module.exports = router;
