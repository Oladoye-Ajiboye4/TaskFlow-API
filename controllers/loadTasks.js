const Task = require('../models/task');

const loadTasks = async (req, res) => {
    try {
        const { status, page = 1, limit = 10 } = req.query;

        const query = {};
        if (status) {
            query.status = status;
        }

        const pageNumber = Math.max(parseInt(page, 10), 1);
        const limitNumber = Math.max(parseInt(limit, 10), 1);
        const skip = (pageNumber - 1) * limitNumber;

        const [tasks, total] = await Promise.all([
            Task.find(query).skip(skip).limit(limitNumber).sort({ createdAt: -1 }),
            Task.countDocuments(query),
        ]);

        res.status(200).json({
            tasks,
            pagination: {
                total,
                page: pageNumber,
                limit: limitNumber,
                pages: Math.ceil(total / limitNumber),
            },
        });
    } catch (err) {
        console.error('Error loading tasks', err);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = loadTasks;