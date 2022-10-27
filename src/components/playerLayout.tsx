import { Box, Grid, GridItem } from '@chakra-ui/layout';
import Sidebar from './siderbar';

type Props = {
	children: React.ReactNode;
};

const PlayerLayout = ({ children }: Props) => {
	return (
		<Grid
			height='100vh'
			width='100vw'
			gridTemplateColumns='20vw auto'
			gridTemplateRows='90vh 10vh'
		>
			<GridItem as='aside' rowStart={1} rowEnd={2} colStart={1} colEnd={2}>
				<Sidebar />
			</GridItem>
			<GridItem rowStart={1} rowEnd={2} colStart={2} colEnd={3}>
				{children}
			</GridItem>
			<GridItem rowStart={2} rowEnd={3} as='div'>
				Player
			</GridItem>
		</Grid>
	);
};

export default PlayerLayout;
