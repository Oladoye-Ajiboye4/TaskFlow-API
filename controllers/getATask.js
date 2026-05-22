const Task = require('../models/task');
const {validateID} = require('../util/zodValidator');

const getATask = async (req, res) => {
    try {
        const { id } = req.params;
        const idValidation = validateID(id);
        if (idValidation.error) {
            return res.status(400).json({ error: idValidation.error.issues[0].message });
        }

        // Load the task from the database
        const task = await Task.findById(id);
        if (!task) {
            return res.status(404).json({ error: 'Task not found' });
        }

        return res.status(200).json(task);
    } catch (err) {
        console.error('Error loading task', err);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = getATask;