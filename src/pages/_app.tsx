import { ChakraProvider } from '@chakra-ui/react';
import PlayerLayout from '../components/playerLayout';
import { theme } from '../styles/theme';

function MyApp({ Component, pageProps }) {
	return (
		<ChakraProvider theme={theme}>
			{Component.authPage ? (
				<Component {...pageProps} />
			) : (
				<PlayerLayout>
					<Component {...pageProps} />
				</PlayerLayout>
			)}
		</ChakraProvider>
	);
}

export default MyApp;
