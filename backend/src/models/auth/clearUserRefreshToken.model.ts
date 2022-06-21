import prisma from '../../database/AppDatabase';

const clearUserRefreshToken = async (username: string) => {
	const data = await prisma.user.update({
		where: {
			USERNAME: username,
		},
		data: {
			REFRESH_TOKEN: '',
		},
	});

	return data;
};

export default clearUserRefreshToken;
