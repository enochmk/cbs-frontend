import fs from 'fs';
import config from 'config';
import moment from 'moment';

const outputPath: string = config.get('upload.output');

const createOutputDestination = (fileName: string) => {
	const currentDate = moment().format('YYYYMMDD');
	const folder = `${outputPath}/${currentDate}`;

	if (!fs.existsSync(folder)) fs.mkdirSync(folder);

	const outputDestination = `${folder}/${fileName}.log`;

	// create file
	fs.writeFileSync(outputDestination, '');

	return outputDestination;
};

export default createOutputDestination;
