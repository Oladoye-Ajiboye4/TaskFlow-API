const Task = require('../models/task');
const { validateID } = require('../util/zodValidator');

const deleteTask = (req, res) => {
    try {
        const { id } = req.params;

        const idValidation = validateID(id);
        if (idValidation.error) {
            return res.status(400).json({ error: idValidation.error.issues[0].message });
        }

        Task.findByIdAndDelete(id)
            .then(task => {
                if (!task) {
                    return res.status(404).json({ error: 'Task not found' });
                }
                console.log('Task deleted successfully');
                res.status(200).json({ message: 'Task deleted successfully' });
            })
            .catch(err => {
                console.error('Error deleting task', err);
                return res.status(500).json({ error: 'Internal Server Error' });
            });

    } catch (err) {
        console.error('Error deleting task', err);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}


module.exports = deleteTask;