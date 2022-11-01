import { Box, Flex, Text } from '@chakra-ui/layout';
import { Image } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import GradientLayout from '../../components/gradientLayout';
import SongsTable from '../../components/songsTable';
import { validateToken } from '../../lib/auth';
import { useMe } from '../../lib/hooks/useMe';
import prisma from '../../lib/prisma';

interface IPlaylistPageProps {
	playlist: any;
}

const getRGBColor = (id) => {
	const colors = [
		'red',
		'green',
		'blue',
		'yellow',
		'orange',
		'purple',
		'pink',
		'teal',
		'cyan',
	];
	const randomNumber = Math.floor(Math.random() * colors.length);

	return colors[id - 1] || colors[randomNumber];
};

export default function Playlist({ playlist }: IPlaylistPageProps) {
	return (
		<GradientLayout
			subtitle='playlist'
			title={playlist.name}
			description={`${playlist.songsCount} songs`}
			color={getRGBColor(playlist.id)}
		>
			<Box color='white' paddingX='40px'>
				<Box marginBottom='40px'>
					<SongsTable songs={playlist.songs} />
				</Box>
				<Flex></Flex>
			</Box>
		</GradientLayout>
	);
}

export const getServerSideProps = async ({ params, req }) => {
	let user;

	const { id } = params;

	try {
		user = validateToken(req.cookies.TRAX_ACCESS_TOKEN);
	} catch (error) {
		return {
			redirect: {
				destination: '/sign-in',
				permanent: false,
			},
		};
	}

	const playlists = await prisma.playlist.findMany({
		where: {
			id: Number(id),
			userId: user.id,
		},
		include: {
			songs: {
				include: {
					artist: {
						select: {
							name: true,
							id: true,
						},
					},
				},
			},
		},
	});

	if (!playlists) {
		return {
			redirect: {
				permanent: false,
				destination: `/`,
			},
		};
	}

	const playlist = playlists[0];

	const songsCount = playlist.songs.length;

	return {
		props: { playlist: { ...playlist, songsCount } },
	};
};
