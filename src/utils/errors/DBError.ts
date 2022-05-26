import messages from '../messages/db.messages';

class DBError extends Error {
	statusCode: number;

	constructor(message: string, statusCode: number) {
		super(message || messages.GENERAL_DB_ERROR);
		this.name = this.constructor.name;
		this.statusCode = statusCode || 500;
	}
}

export default DBError;
