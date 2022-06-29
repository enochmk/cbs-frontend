import prisma from '../../database/AppDatabase';

const getUserDetails = async (username: string) => {
	const user = await prisma.user.findUnique({
		where: {
			USERNAME: username,
		},
		select: {
			ID: true,
			FIRST_NAME: true,
			LAST_NAME: true,
			MSISDN: true,
			USERNAME: true,
			ACTIVE: true,
			ROLE_ID: true,
			ROLE: {
				select: {
					KEYWORD: true,
				},
			},
			CREATED_AT: true,
			UPDATE_AT: true,
		},
	});

	return user;
};

export default getUserDetails;
