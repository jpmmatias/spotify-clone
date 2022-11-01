import { Box, Flex, Text } from '@chakra-ui/layout';
import Player from './player';

const PlayerBar = () => {
	return (
		<Box height='100%' px='25px' width='100vw' bg='gray.900'>
			<Flex align='center'>
				<Box paddingY='20px' color='white' width='30%'>
					<Text fontSize='lg'>Song Name</Text>
					<Text fontSize='sm'>Artist Name</Text>
				</Box>
				<Box width='40%'>
					<Player />
				</Box>
			</Flex>
		</Box>
	);
};

export default PlayerBar;
