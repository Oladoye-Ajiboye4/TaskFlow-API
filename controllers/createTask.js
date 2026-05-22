const Task = require('../models/task.js');
const { createFormValidator } = require('../util/zodValidator.js');

const createTask = (req, res) => {
    const { title, description, status } = req.body;

    const { error, data } = createFormValidator(title, description, status);
    if (error) {
        return res.status(400).json({ error });
    }

    const newTask = {
        title: data.title,
        description: data.description,
        status: data.status,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    };

    const saveTask = new Task(newTask);
    saveTask.save()
        .then(() => {
            console.log('Task created successfully');
            res.status(201).json({ message: 'Task created successfully' });
        })
        .catch(err => {
            if (err.code === 11000) {
                return res.status(409).json({ error: 'A task with this title already exists' });
            }

            console.error('Error creating task', err);
            return res.status(500).json({ error: 'Internal Server Error' });
        });
};

module.exports = createTask;