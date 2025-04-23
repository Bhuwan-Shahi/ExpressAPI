import express from 'express';
import path from 'path';
import posts from './routes/post.js';
import logger  from './middleware/logger.js';
import { log } from 'console';

const port = process.env.PORT || 5000;
const app = express();

// Body parser with express
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Logger middleware
app.use(logger)

// Setting up static folder
// app.use(express.static(path.join(__dirname, 'public')));

// Use the posts router
app.use('/api/posts', posts);

app.listen(port, () => console.log(`Server is running on port ${port}`));
