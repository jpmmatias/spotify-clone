import jwt from 'jsonwebtoken';
import { NextApiRequest, NextApiResponse } from 'next';
import prisma from './prisma';

export const validateRoute = (handler) => {
	return async (req: NextApiRequest, res: NextApiResponse) => {
		const { TRAX_ACCESS_TOKEN: token } = req.cookies;

		if (!token) {
			res.status(401);
			res.json({ error: 'Not Authorized' });
			return;
		}

		let user;

		try {
			const response = validateToken(token);
			user = await prisma.user.findUnique({
				where: { id: (<{ id: number }>response).id },
			});

			if (!user) {
				throw new Error('Not real user');
			}
		} catch (error) {
			res.status(401);
			res.json({ error: 'Not Authorized' });
			return;
		}

		return handler(req, res, user);
	};
};

interface JWTPayload {
	id: number;
}

export const validateToken = (token) => {
	const user = jwt.verify(token, 'secret') as JWTPayload;
	return user;
};
