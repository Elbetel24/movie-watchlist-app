import express from 'express';
import watchlistRouter from './routes/watchlist.routes.js';
import moviesRouter from './routes/movies.routes.js';
import authRouter from './routes/auth.routes.js';
import {PORT as ENV_PORT} from './config/env.js'
import connectToDB from './Database/mongodb.js';
import errorMiddleware from './middleware/error.middleware.js';
import cors from 'cors'
const app=express();

const allowedOrigins = [
  "http://localhost:5173",
 " https://movie-watchlist-tmdb.vercel.app/",
];

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (e.g. Postman)
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
  })
);

app.use(express.json());
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/movies',moviesRouter);
app.use('/api/v1/watchlist',watchlistRouter);
app.get('/',(req,res) => {
    res.send('Welcome to your movie watch list!')
});

app.use(errorMiddleware);


const startServer= async () => {
    try {
        await connectToDB();
        const server=app.listen(ENV_PORT, '0.0.0.0', () => {
            console.log(`Movie list API is running on http://localhost:${ENV_PORT}`);
            
        });

        server.on('error', (error) => {
            if(error.code === 'EADDRINUSE'){
                console.error(`Port ${ENV_PORT} is already in use.Use another one!`);
            } else {
                console.error('Failed to start the server:',error.message);
            }
            process.exit(1);
        });
    } catch(error){
        console.error('Failed to start the server:', error.message);
        process.exit(1);
    }
};


startServer();

export default app;