import { config } from 'dotenv';
config({ path: `.env.${process.env.NODE_ENV || 'development'}.local` });

export const{PORT ,
    DB_URI,
    JWT_SECRET,JWT_EXPIRES_IN,
    TMDB_API_KEY, TMDB_READ_ACCESS_TOKEN,
} = process.env;