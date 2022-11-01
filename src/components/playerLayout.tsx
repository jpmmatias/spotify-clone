import { Box, Grid, GridItem } from '@chakra-ui/layout';
import PlayerBar from './playerBar';
import Sidebar from './siderbar';

type Props = {
	children: React.ReactNode;
};

const PlayerLayout = ({ children }: Props) => {
	return (
		<Grid
			height='100vh'
			width='100vw'
			gridTemplateColumns='20% auto'
			gridTemplateRows='90% auto'
		>
			<GridItem as='aside' rowStart={1} rowEnd={2} colStart={1} colEnd={2}>
				<Sidebar />
			</GridItem>
			<GridItem rowStart={1} rowEnd={2} colStart={2} colEnd={2}>
				{children}
			</GridItem>
			<GridItem rowStart={2} rowEnd={2}>
				<PlayerBar />
			</GridItem>
		</Grid>
	);
};

export default PlayerLayout;
