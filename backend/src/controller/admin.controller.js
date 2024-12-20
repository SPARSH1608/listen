import cloudinary from '../lib/cloudinary.js';
import { Album } from '../models/album.model.js';
import { Song } from '../models/song.model.js';

const UploadToCloudinary = async (file) => {
  try {
    const result = await cloudinary.uploader.upload(file.tempFilePath, {
      resource_type: 'auto',
    });
    return result.secure_url;
  } catch (error) {
    console.log('error in uploadtoCloudinary', error);
    throw new Error('Error uploadiing to cloudinary');
  }
};

export const createSong = async (req, res, next) => {
  try {
    if (!req.files || !req.files.audioFile || !req.files.imageFile) {
      return res.status(400).json({ message: 'Please upload all files' });
    }
    const { title, artist, albumId, duration } = req.body;
    const audioFile = req.files.audioFile;
    const imageFile = req.files.imageFile;

    const audioUrl = await UploadToCloudinary(audioFile);
    const imageUrl = await UploadToCloudinary(imageFile);

    const song = new Song.create({
      title,
      artist,
      audioUrl,
      albumId: albumId || null,
      duration,
      imageUrl,
    });
    await song.save();
    // if song belongs to album update album too
    if (albumId) {
      await Album.findByIdAndUpdate(albumId, {
        $push: { songs: song._id },
      });
    }
    res.status(201).json(song);
  } catch (error) {
    console.log('Error in creatign songs', error);
    next(error);
  }
};
