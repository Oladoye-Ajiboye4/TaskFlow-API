const Task = require('../models/task');
const {updateFormValidator} = require('../util/zodValidator');
const {validateID} = require('../util/zodValidator');

const updateTask = (req, res) => {
    try{      
        const { id } = req.params;
        const idValidation = validateID(id);
        if (idValidation.error) {
            return res.status(400).json({ error: idValidation.error.issues[0].message });
        }
        if (!req.body) {
            return res.status(400).json({ error: 'Missing request body' });
        }

        const { title, description, status } = req.body;
        const normalizedStatus = status ? status.toLowerCase() : undefined;
        const validateForm = updateFormValidator(title, description, normalizedStatus);
    
        if (validateForm.error) {
            return res.status(400).json({ error: validateForm.error.issues[0].message, field: validateForm.error.issues[0].path[0]  });
        }
 
        const updatedTask = {
            ...(title && { title }),
            ...(description && { description }),
            ...(normalizedStatus && { status: normalizedStatus }),
            updatedAt: new Date().toISOString(),
        };
        Task.findByIdAndUpdate(id, updatedTask, { returnDocument: 'after' })
        .then(task => {
            if (!task) {
                return res.status(404).json({ error: 'Task not found' });
            }
            console.log('Task updated successfully');
            res.status(200).json({ message: 'Task updated successfully', task });
        })
        .catch(err => {
            console.error('Error updating task', err);
            return res.status(500).json({ error: 'Internal Server Error' });
        });
    } catch (err) {
        console.error('Error updating task', err);
        return res.status(500).json({ error: 'Internal Server Error' });
    }

}

module.exports = updateTask;