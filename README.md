# TaskFlow API

TaskFlow is a simple REST API for managing tasks. It uses Express, MongoDB, Mongoose, and Zod for validation.

## Features

- Create, read, update, and delete tasks
- Task pagination and status filtering
- Request validation with Zod
- Global API rate limiting
- CORS enabled for frontend integration

## Tech Stack

- Node.js
- Express
- MongoDB
- Mongoose
- Zod
- express-rate-limit

## Project Structure

- `app.js` - Express app entry point
- `config/mongoose.js` - MongoDB connection setup
- `controllers/` - Route handlers
- `models/task.js` - Task schema
- `routes/routes.tasks.js` - Task routes
- `util/zodValidator.js` - Validation helpers

## Prerequisites

- Node.js 18+
- MongoDB running locally or a MongoDB Atlas connection string

## Installation

```bash
npm install
```

## Environment Variables

Create a `.env` file in the project root:

```env
URI=mongodb://127.0.0.1:27017/TaskFlow
PORT=7680
```

If you use MongoDB Atlas, replace `URI` with your Atlas connection string.

## Running the API

```bash
npm start
```

If you use `nodemon`, run:

```bash
nodemon app.js
```

## Rate Limiting

The API applies a rate limiter to all `/api/` routes using `express-rate-limit`.

- Window: 15 minutes
- Max requests: 100 per IP

## API Endpoints

Base URL: `https://taskflow-api-czwr.onrender.com/api/tasks`

### Create a task

`POST /api/tasks`

Request body:

```json
{
	"title": "Go shopping",
	"description": "Buy groceries for the week",
	"status": "pending"
}
```

### Get all tasks

`GET /api/tasks`

Optional query params:

- `status=pending|completed`
- `page=1`
- `limit=10`

### Get a task by id

`GET /api/tasks/:id`

### Update a task

`PUT /api/tasks/:id`

Request body:

```json
{
	"title": "Updated title",
	"description": "Updated description",
	"status": "completed"
}
```

### Delete a task

`DELETE /api/tasks/:id`

## Notes

- There is no authentication in this project yet.
- The API is intended to be consumed by any frontend that can send HTTP requests and read JSON responses.
- Task status values are limited to `pending` and `completed`.

## Example Frontend Usage

```js
const response = await fetch('https://taskflow-api-czwr.onrender.com/api/tasks');
const data = await response.json();
console.log(data.tasks);
```

## License

MIT
