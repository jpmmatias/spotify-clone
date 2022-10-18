import {
	List,
	Center,
	ListItem,
	Box,
	ListIcon,
	Divider,
	LinkBox,
	LinkOverlay,
} from '@chakra-ui/layout';

import NextImage from 'next/image';
import Link from 'next/link';

import {
	MdHome,
	MdSearch,
	MdLibraryMusic,
	MdPlaylistAdd,
	MdFavorite,
} from 'react-icons/md';

type Props = {};

const navMenu = [
	{ name: 'Home', icon: MdHome, route: '/' },
	{ name: 'Search', icon: MdSearch, route: '/search' },
	{ name: 'Libary', icon: MdLibraryMusic, route: '/libary' },
];

const musicMenu = [
	{ name: 'Create PlayList', icon: MdPlaylistAdd, route: '/' },
	{ name: 'Favorites', icon: MdFavorite, route: '/favorites' },
];

const playlists = new Array(30).fill(1).map((_, i) => `Playlist ${i + 1}`);

const Sidebar = (props: Props) => {
	return (
		<Box
			paddingTop='20px'
			bgColor='black'
			color='gray'
			width='100%'
			height='100%'
		>
			<Box marginBottom='32px' paddingX='10px' pl='10%'>
				<NextImage width={120} height={60} src='/logo.svg'></NextImage>
			</Box>
			<List mb='16px' spacing={2} pl='10%'>
				{navMenu.map((item, index) => (
					<ListItem key={index}>
						<LinkBox>
							<Link href={item.route} passHref>
								<LinkOverlay>
									<ListIcon marginRight='10px' color='white' as={item.icon} />
									{item.name}
								</LinkOverlay>
							</Link>
						</LinkBox>
					</ListItem>
				))}
			</List>
			<List spacing={2} pl='10%'>
				{musicMenu.map((item, index) => (
					<ListItem key={index}>
						<LinkBox>
							<Link href={item.route} passHref>
								<LinkOverlay>
									<ListIcon marginRight='10px' color='white' as={item.icon} />
									{item.name}
								</LinkOverlay>
							</Link>
						</LinkBox>
					</ListItem>
				))}
			</List>
			<Divider color='gray.900' my='8px' />
			<Box height='57.4%' overflowY='auto'>
				<List spacing={2} pl='10%'>
					{playlists.map((playlist, index) => (
						<ListItem key={index}>
							<LinkBox>
								<Link href='/' passHref>
									<LinkOverlay>{playlist}</LinkOverlay>
								</Link>
							</LinkBox>
						</ListItem>
					))}
				</List>
			</Box>
		</Box>
	);
};

export default Sidebar;
