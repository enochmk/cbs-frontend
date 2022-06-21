import prisma from '../../database/AppDatabase';

const getUserByRefreshToken = async (refreshToken: string) => {
	const data = await prisma.user.findFirst({
		where: {
			REFRESH_TOKEN: refreshToken,
		},
		select: {
			USERNAME: true,
		},
	});

	return data;
};

export default getUserByRefreshToken;
