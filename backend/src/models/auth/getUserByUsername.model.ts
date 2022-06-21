import prisma from '../../database/AppDatabase';

const getUserByUsername = async (username: string) => {
	const data = await prisma.user.findUnique({
		where: {
			USERNAME: username,
		},
	});

	return data;
};

export default getUserByUsername;
