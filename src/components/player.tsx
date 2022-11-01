import {
	ButtonGroup,
	Box,
	IconButton,
	RangeSlider,
	RangeSliderFilledTrack,
	RangeSliderTrack,
	RangeSliderThumb,
	Center,
	Flex,
	Text,
} from '@chakra-ui/react';
import { useStoreActions } from 'easy-peasy';
import { useEffect, useState, useRef } from 'react';
import {
	MdOutlinePauseCircleFilled,
	MdOutlinePlayCircleFilled,
	MdRepeat,
	MdShuffle,
	MdSkipNext,
	MdSkipPrevious,
} from 'react-icons/md';

const Player = () => {
	return (
		<Box>
			<Box></Box>
			<Center>
				<ButtonGroup>
					<IconButton
						aria-label='Shuffle'
						icon={<MdShuffle />}
						outline='none'
						fontSize='24px'
						variant='link'
						color='gray.600'
					/>
					<IconButton
						aria-label='Previous'
						icon={<MdSkipPrevious />}
						outline='none'
						fontSize='24px'
						variant='link'
						color='gray.600'
					/>
					<IconButton
						aria-label='Play'
						icon={<MdOutlinePlayCircleFilled />}
						outline='none'
						fontSize='48px'
						variant='link'
						color='white'
					/>
					<IconButton
						aria-label='Pause'
						icon={<MdOutlinePauseCircleFilled />}
						outline='none'
						fontSize='48px'
						variant='link'
						color='white'
					/>
					<IconButton
						aria-label='Next'
						icon={<MdSkipNext />}
						outline='none'
						fontSize='24px'
						variant='link'
						color='gray.600'
					/>
					<IconButton
						aria-label='Repeat'
						icon={<MdRepeat />}
						outline='none'
						fontSize='24px'
						variant='link'
						color='gray.600'
					/>
				</ButtonGroup>
			</Center>
			<Box color='gray.600'>
				<Flex justify='center' align='center'>
					<Box pt='5px' width='10%'>
						<Text fontSize='xs'>0:00</Text>
					</Box>
					<Box width='80%'>
						<RangeSlider
							aria-label={['min', 'max']}
							step={0.1}
							min={0}
							max={120}
							id='player-range'
						>
							<RangeSliderTrack bg='gray.800'>
								<RangeSliderFilledTrack bg='green.500' />
							</RangeSliderTrack>
							<RangeSliderThumb index={0} />
						</RangeSlider>
					</Box>
					<Box pt='5px' width='10%' textAlign='right'>
						<Text fontSize='xs'>120</Text>
					</Box>
				</Flex>
			</Box>
		</Box>
	);
};

export default Player;
