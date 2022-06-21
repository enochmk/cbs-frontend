import prisma from '../../database/AppDatabase';

const saveUserRefreshToken = async (username: string, refreshToken: string) => {
	const updateUser = await prisma.user.update({
		data: {
			REFRESH_TOKEN: refreshToken,
		},
		where: {
			USERNAME: username,
		},
	});

	return updateUser;
};

export default saveUserRefreshToken;
