import multer from 'multer';

const storage = multer.memoryStorage(); // Use memory storage instead of disk storage
const upload = multer({ 
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },
});

export default upload;