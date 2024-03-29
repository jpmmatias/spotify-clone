import { PrismaClient } from '@prisma/client';
import bycript from 'bcrypt';
import { artistsData } from './songsData';

const prisma = new PrismaClient();

const run = async () => {
	await Promise.all(
		artistsData.map(async (artist) => {
			return prisma.artist.upsert({
				where: { name: artist.name },
				update: {},
				create: {
					name: artist.name,
					songs: {
						create: artist.songs.map((song) => ({
							name: song.name,
							duration: song.duration,
							url: song.url,
						})),
					},
				},
			});
		})
	);

	const salt = bycript.genSaltSync();

	const user = await prisma.user.upsert({
		where: { email: 'user@email.com' },
		update: {},
		create: {
			email: 'user@email.com',
			password: bycript.hashSync('senha', salt),
			name: 'User',
		},
	});

	const songs = await prisma.song.findMany({});
	await Promise.all(
		new Array(10).fill(null).map((_, i) => {
			return prisma.playlist.create({
				data: {
					name: `Playlist ${i + 1}`,
					user: {
						connect: { id: user.id },
					},
					songs: {
						connect: songs.map((song) => ({
							id: song.id,
						})),
					},
				},
			});
		})
	);
};

run()
	.then()
	.catch((err) => {
		console.error(err);
		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});
