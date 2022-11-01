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
import ReactHowler from 'react-howler';
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
import { formatTime } from '../lib/formatters';

const Player = ({ songs, activeSong }) => {
	const [isPlaying, setIsPlaying] = useState(true);
	const [index, setindex] = useState(
		songs.findIndex((song) => song.id === activeSong.id)
	);
	const [seek, setSeek] = useState(0.0);
	const [duration, setDuration] = useState(0.0);
	const [isShuffle, setIsShuffle] = useState(false);
	const [isRepeat, setIsRepeat] = useState(false);
	const [isSeeking, setIsSeeking] = useState(false);
	const soundRef = useRef(null);
	const setActiveSong = useStoreActions((store: any) => store.changeActiveSong);

	useEffect(() => {
		let timerId;

		if (isPlaying && !isSeeking) {
			const f = () => {
				setSeek(soundRef.current.seek());
				timerId = requestAnimationFrame(f);
			};

			timerId = requestAnimationFrame(f);
			return () => cancelAnimationFrame(timerId);
		}

		cancelAnimationFrame(timerId);
	}, [isPlaying, isSeeking]);

	useEffect(() => {
		setActiveSong(songs[index]);
	}, [index, setActiveSong, songs]);

	const setPLayingState = (value: boolean) => {
		setIsPlaying(value);
	};

	const onShuffle = () => {
		setIsShuffle((prev) => !prev);
	};

	const onRepeat = () => {
		setIsRepeat((prev) => !prev);
	};

	const nextSong = () => {
		setindex((state) => {
			if (!isShuffle) {
				return state === songs.length - 1 ? 0 : state + 1;
			}

			const next = Math.floor(Math.random() * songs.length);

			if (next === state) {
				return nextSong();
			}

			return next;
		});
	};

	const onEnd = () => {
		if (isRepeat) {
			setSeek(0);
			soundRef.current.seek(0);
			return;
		}

		nextSong();
	};

	const onLoad = () => {
		const songDuration = soundRef.current.duration();
		setDuration(songDuration);
	};

	const onSeek = (e) => {
		setSeek(parseFloat(e[0]));
		soundRef.current.seek(e[0]);
	};

	const prevSong = () => {
		setindex((state) => (state === 0 ? songs.length - 1 : state - 1));
	};

	return (
		<Box>
			<Box>
				<ReactHowler
					onLoad={onLoad}
					onEnd={() => onEnd()}
					ref={soundRef}
					playing={isPlaying}
					src={activeSong?.url}
				/>
			</Box>
			<Center mb='8px'>
				<ButtonGroup>
					<IconButton
						onClick={onShuffle}
						aria-label='Shuffle'
						icon={<MdShuffle />}
						outline='none'
						fontSize='24px'
						variant='link'
						color={isShuffle ? 'white' : 'gray.600'}
					/>
					<IconButton
						onClick={prevSong}
						aria-label='Previous'
						icon={<MdSkipPrevious />}
						outline='none'
						fontSize='24px'
						variant='link'
						color='gray.600'
					/>
					<IconButton
						hidden={isPlaying}
						aria-label='Play'
						onClick={() => setPLayingState(true)}
						icon={<MdOutlinePlayCircleFilled />}
						outline='none'
						fontSize='48px'
						variant='link'
						color='white'
					/>
					<IconButton
						hidden={!isPlaying}
						onClick={() => setPLayingState(false)}
						aria-label='Pause'
						icon={<MdOutlinePauseCircleFilled />}
						outline='none'
						fontSize='48px'
						variant='link'
						color='white'
					/>
					<IconButton
						onClick={nextSong}
						aria-label='Next'
						icon={<MdSkipNext />}
						outline='none'
						fontSize='24px'
						variant='link'
						color='gray.600'
					/>
					<IconButton
						onClick={onRepeat}
						color={isRepeat ? 'white' : 'gray.600'}
						aria-label='Repeat'
						icon={<MdRepeat />}
						outline='none'
						fontSize='24px'
						variant='link'
					/>
				</ButtonGroup>
			</Center>
			<Box color='gray.600'>
				<Flex justify='center' align='center'>
					<Box pt='5px' width='10%'>
						<Text fontSize='xs'>{formatTime(seek)}</Text>
					</Box>
					<Box width='80%'>
						<RangeSlider
							aria-label={['min', 'max']}
							step={0.1}
							min={0}
							max={duration ? Number(duration.toFixed(2)) : 0}
							onChange={onSeek}
							id='player-range'
							value={[seek]}
							onChangeStart={() => setIsSeeking(true)}
							onChangeEnd={() => setIsSeeking(false)}
						>
							<RangeSliderTrack bg='gray.800'>
								<RangeSliderFilledTrack bg='green.500' />
							</RangeSliderTrack>
							<RangeSliderThumb index={0} />
						</RangeSlider>
					</Box>
					<Box pt='5px' width='10%' textAlign='right'>
						<Text fontSize='xs'>{formatTime(duration)}</Text>
					</Box>
				</Flex>
			</Box>
		</Box>
	);
};

export default Player;
