import {
	Box,
	Table,
	Thead,
	Td,
	Tr,
	Tbody,
	IconButton,
	Th,
	HStack,
} from '@chakra-ui/react';
import { BsFillPlayFill } from 'react-icons/bs';
import { AiOutlineClockCircle, AiOutlineHeart } from 'react-icons/ai';
import { formateDate, formatTime } from '../lib/formatters';
import { useStoreActions } from 'easy-peasy';
type Props = {
	songs: any[];
};

const SongsTable = ({ songs }: Props) => {
	const playSongs = useStoreActions((store: any) => store.changeActiveSongs);
	const playSong = useStoreActions((store: any) => store.changeActiveSong);

	const handlePlay = (activeSong: any = songs[0]) => {
		playSong(activeSong);
		playSongs(songs);
	};

	return (
		<Box color='white' bg='transparent'>
			<Box padding='10px' marginBottom='20px'>
				<HStack gap='4' marginBottom='20px'>
					<IconButton
						onClick={() => handlePlay()}
						icon={<BsFillPlayFill fontSize='30px' />}
						aria-label='play'
						colorScheme='green'
						size='lg'
						isRound
					/>
					<IconButton
						icon={<AiOutlineHeart fontSize='30px' />}
						aria-label='favorite'
						colorScheme='transparent'
						size='lg'
						isRound
					/>
				</HStack>
				<Table variant='unstyled'>
					<Thead borderBottom='1px solid' borderColor='rgba(255,255,255, 0.2)'>
						<Tr>
							<Th>#</Th>
							<Th>Tittle</Th>
							<Th>Date Added</Th>
							<Th>
								<AiOutlineClockCircle fontSize='20px' />
							</Th>
						</Tr>
					</Thead>
					<Tbody>
						{songs.map((song, i) => (
							<Tr
								onClick={() => handlePlay(song)}
								key={song.id}
								cursor='pointer'
								sx={{
									'&:hover': {
										transition: 'all 0.2s ease-in',
										backgroundColor: 'rgba(255,255,255, 0.1)',
									},
								}}
							>
								<Td>{i + 1}</Td>
								<Td>{song.name}</Td>
								<Td>{formateDate(song.createdAt)}</Td>
								<Td>{formatTime(song.duration)}</Td>
							</Tr>
						))}
					</Tbody>
				</Table>
			</Box>
		</Box>
	);
};

export default SongsTable;
