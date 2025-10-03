const express = require('express');
const router = express.Router();

let users = [ 'shantanu' ];

router.get('/', (req, res) => {
    res.status(200).json(users);
});

router.get('/:name', (req, res) => {
    const user = users.find(u => u === req.params.name);
    if (user) res.status(200).send(`Welcome ${user}`);
    else res.status(404).send('User Not Found.');
});

router.post('/', (req, res) => {
    const name = req.body.name;

    if (!name || typeof name !== 'string' || name.trim() === '') {
        return res.status(400).send('Invalid user name.');
    }

    const userExists = users.find(u => u === name);
    if (userExists) {
        return res.status(409).send('User already exists.');
    }

    users.push(name.trim());
    res.status(201).send(`User ${name.trim()} added.`);
});

router.put('/:name', (req, res) => {
    const oldName = req.params.name;
    const newName = req.body.name;

    if (!newName || typeof newName !== 'string' || newName.trim() === '') {
        return res.status(400).send('Invalid new user name.');
    }

    const userIndex = users.findIndex(u => u === oldName);
    if (userIndex === -1) {
        return res.status(404).send('User Not Found.');
    }

    users[userIndex] = newName.trim();
    res.status(200).send(`User ${oldName} updated to ${newName.trim()}.`);
});

router.delete('/:name', (req, res) => {
    const name = req.params.name;
    const isUserExists = users.find(u => u === name);
    if(!isUserExists) return res.status(404).send('User Not Found.');
    users.forEach((user, index) => {
        if(user === name) users.splice(index, 1);
    });

    res.status(200).send(`User ${ name } Deleted Successfully.`);
});

module.exports = router;