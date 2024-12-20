import express from 'express';
import dotenv from 'dotenv';
import userRoutes from './routes/user.router.js';
import adminRoutes from './routes/admin.route.js';
import songRoutes from './routes/song.route.js';
import albumRoutes from './routes/album.route.js';
import authRoutes from './routes/auth.route.js';
import statRoute from './routes/stat.route.js';
import { connectDB } from './lib/db.js';
import { clerkMiddleware } from '@clerk/express';
import fileUpload from 'express-fileupload';
dotenv.config();
const app = express();
const PORT = process.env.PORT;
const URI = process.env.MONGODB_URL;
app.use(express.json());
app.use(clerkMiddleware()); // this will add auth to req obj =>req.auth.userId
// Pass options
// app.use(clerkMiddleware(options));
const __dirname = path.resolve();
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: path.join(__dirname, 'tmp'),
    createParentPath: true,
    limits: {
      fileSize: 10 * 1024 * 1024,
    },
  })
);

app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/songs', songRoutes);
app.use('/api/albums', albumRoutes);
app.use('/api/stat', statRoute);

app.use((error, req, res, next) => {
  res
    .status(500)
    .json({
      message:
        process.env.NODE_ENV === 'production'
          ? 'Internal server error'
          : error.message,
    });
});
app.listen(PORT, () => {
  console.log(`server listening on port ${PORT}`);
  connectDB(URI);
});
