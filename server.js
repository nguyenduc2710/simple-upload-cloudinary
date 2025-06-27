const express = require('express');
const multer = require('multer');
const { v2: cloudinary } = require('cloudinary');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config();

//change env file for connect to cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

//Adjust param for push to different folder
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'Blog',
    transformation: [{ quality: 'auto', fetch_format: 'auto' }],
  },
});

const upload = multer({ storage });

const app = express();
app.use(express.static('public')); // Serve frontend

app.post('/upload', upload.single('image'), async (req, res) => {
  try {
    return res.json({ imageUrl: req.file.path });
  } catch (error) {
    console.error('Error during upload:', error);
    res.status(500).json({ error: 'Upload failed' });
  }
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
