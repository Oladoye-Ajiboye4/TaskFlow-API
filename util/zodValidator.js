const z = require('zod');
const mongoose = require('mongoose');



const updateFormValidator = (title, description, status) => {
    const schema = z.object({
        title: z.string().min(2).max(100).optional(),
        description: z.string().min(10).max(200).optional(),
        status: z.enum(['pending', 'completed']).optional(),
    });

    const result = schema.safeParse({ title, description, status });
    if (!result.success) return { error: result.error };
    return { message: 'Validation successful', data: result.data };
};

const createFormValidator = (title, description, status) => {
    const schema = z.object({
        title: z.string().min(2).max(100),
        description: z.string().min(10).max(200),
        status: z.enum(['pending', 'completed']).default('pending'),
    });

    const result = schema.safeParse({ title, description, status });
    if (!result.success) return { error: result.error };
    return { message: 'Validation successful', data: result.data };
};

const validateID = (id) => {
    if (!id) {
        return { error: 'ID is required' };
    }
    // Define a Zod schema for validating MongoDB ObjectId  
    const schema = z.string().refine((value) => mongoose.Types.ObjectId.isValid(value), {
        message: 'Invalid ID format',
    });

    const result = schema.safeParse(id);
    if (!result.success) return { error: result.error };
    return { message: 'ID validation successful', data: result.data };
};

module.exports = { updateFormValidator, createFormValidator, validateID };