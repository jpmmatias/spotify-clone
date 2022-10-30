import { Box, Flex, Text } from '@chakra-ui/layout';
import { Image } from '@chakra-ui/react';
import GradientLayout from '../components/gradientLayout';
import { useMe } from '../lib/hooks/useMe';
import prisma from '../lib/prisma';

interface IHome {
	artists: any;
}

export default function Home({ artists }: IHome) {
	const { user, error } = useMe();
	return (
		<GradientLayout
			roundeImage
			subtitle='profile'
			title={user?.name}
			description={`${user?.playlistsCount} public playlists`}
			color='purple'
		>
			<Box color='white' paddingX='40px'>
				<Box marginBottom='40px'>
					<Text fontWeight='bold' fontSize='2xl'>
						Top artists this month
					</Text>
					<Text fontSize='md'>only visible to you</Text>
				</Box>
				<Flex>
					{artists.map((artist) => (
						<Box
							key={artist.id}
							px='1rem'
							width='20%'
							sx={{
								'&:first-child': {
									pl: '0',
								},
							}}
						>
							<Box bg='gray.900' borderRadius='4px' padding='15px'>
								<Image mb='10px' src='' borderRadius='100%' />
								<Box>
									<Text fontSize='l'>{artist.name}</Text>
									<Text fontSize='xs'>Artist</Text>
								</Box>
							</Box>
						</Box>
					))}
				</Flex>
			</Box>
		</GradientLayout>
	);
}

export const getServerSideProps = async () => {
	const artists = await prisma.artist.findMany({});

	return {
		props: { artists },
	};
};
