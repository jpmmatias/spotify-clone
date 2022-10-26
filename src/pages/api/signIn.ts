import bycript from 'bcrypt';
import jwt from 'jsonwebtoken';
import cookie from 'cookie';
import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../lib/prisma';

export default async (req: NextApiRequest, res: NextApiResponse) => {
	const { email, password } = req.body;

	let user;

	try {
		user = await prisma.user.findUnique({
			where: {
				email,
			},
		});

		const correctPassword = bycript.compareSync(password, user.password);

		if (!correctPassword) {
			res.status(401);
			res.json({ message: 'Wrong password' });
			return;
		}
	} catch (error) {
		res.status(401);
		res.json({ message: 'Inexintent user with this email' });
		return;
	}

	const token = jwt.sign(
		{
			email: user.email,
			id: user.id,
			name: user.name,
			time: Date.now(),
		},
		'secret',
		{ expiresIn: '8h' }
	);

	res.setHeader(
		'Set-Cookie',
		cookie.serialize('TRAX_ACCESS_TOKEN', token, {
			httpOnly: true,
			maxAge: 8 * 60 * 60,
			path: '/',
			sameSite: 'lax',
			secure: process.env.NODE_ENV === 'production',
		})
	);

	return res.json(user);
};
