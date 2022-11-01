import { ChakraProvider } from '@chakra-ui/react';
import PlayerLayout from '../components/playerLayout';
import { theme } from '../styles/theme';
import { StoreProvider } from 'easy-peasy';
import { store } from '../lib/store';

function MyApp({ Component, pageProps }) {
	return (
		<ChakraProvider theme={theme}>
			<StoreProvider store={store}>
				{Component.authPage ? (
					<Component {...pageProps} />
				) : (
					<PlayerLayout>
						<Component {...pageProps} />
					</PlayerLayout>
				)}
			</StoreProvider>
		</ChakraProvider>
	);
}

export default MyApp;
