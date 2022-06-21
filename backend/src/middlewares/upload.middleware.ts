import config from 'config';
import multer from 'multer';

const destination = config.get('upload.destination') as string;

const middleware = multer.diskStorage({
	destination: destination,
	filename: (req, file, cb) => {
		cb(null, file.originalname);
	},
});

const upload = multer({ storage: middleware });

export default upload;
