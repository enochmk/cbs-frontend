import getUserDetailsModel from '../../models/user/getUserDetail.model';
import HttpError from '../../utils/errors/HttpError';

const getDetails = async (username: string) => {
	const result = await getUserDetailsModel(username);

	// ! User not found
	if (!result) throw new HttpError('User does not exist', 404);

	const details = {
		id: result.ID,
		firstName: result.FIRST_NAME,
		lastName: result.LAST_NAME,
		msisdn: result.MSISDN,
		username: result.USERNAME,
		active: result.ACTIVE ? true : false,
		role: result.ROLE.KEYWORD,
	};

	return details;
};

export default getDetails;
