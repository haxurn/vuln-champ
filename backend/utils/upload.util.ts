import multer from 'multer';
import path from 'path';
import fs from 'fs';

const ensureUploadDirsExist = () => {
  const avatarFolder = 'uploads/avatars';
  const uploadsFolder = 'uploads';

  if (!fs.existsSync(uploadsFolder)) {
    fs.mkdirSync(uploadsFolder, { recursive: true });
  }

  if (!fs.existsSync(avatarFolder)) {
    fs.mkdirSync(avatarFolder, { recursive: true });
  }
};

ensureUploadDirsExist();


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const folder = file.fieldname === 'avatar' ? 'uploads/avatars' : 'uploads/';
    cb(null, folder);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const filename = `${file.fieldname}-${Date.now()}${ext}`;
    cb(null, filename);
  },
});

const fileFilter = (req: any, file: any, cb: any) => {
  const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type. Only JPEG, PNG, and GIF are allowed.'));
  }
};

const upload = multer({
  storage,
  fileFilter,
});

export default upload;
