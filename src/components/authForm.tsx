import { Box, Flex, Input, Button } from '@chakra-ui/react';
import Image from 'next/image';
import Router, { useRouter } from 'next/router';
import { FormEvent, useState } from 'react';
import { useSWRConfig } from 'swr';
import { auth } from '../lib/mutations';

type Props = {
	mode: 'signUp' | 'signIn';
};

function AuthForm({ mode }: Props) {
	const [email, setEmail] = useState('');
	const [name, setName] = useState('');
	const [password, setPassword] = useState('');
	const [isLoading, setIsLoading] = useState(false);
	const { push } = useRouter();

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();
		setIsLoading(true);

		const response = await auth(mode, { email, password, name });

		if (response.status !== 200 && response.status !== 201) {
			setIsLoading(false);
			return;
		}
		push('/');
		setIsLoading(false);
	};

	return (
		<Box height='100vh' width='100vw' bg='black'>
			<Flex
				borderBottom='white 1px solid'
				justify='center'
				align='center'
				height='100px'
			>
				<Image src='/logo.svg' width={120} height={240} />
			</Flex>
			<Flex justify='center' align='center' height='calc(100vh - 100px)'>
				<Box padding='50px' bg='gray.900' borderRadius='6px'>
					<form onSubmit={handleSubmit}>
						{mode === 'signUp' && (
							<Input
								color='#fff'
								placeholder='name'
								type='text'
								onChange={({ target }) => {
									setName(target.value);
								}}
							/>
						)}
						<Input
							color='#fff'
							placeholder='email'
							type='email'
							onChange={({ target }) => {
								setEmail(target.value);
							}}
						/>
						<Input
							placeholder='password'
							type='password'
							color='#fff'
							onChange={({ target }) => {
								setPassword(target.value);
							}}
						/>
						<Button
							type='submit'
							bg='green.500'
							sx={{
								'&:hover': {
									bg: 'green.300',
								},
							}}
							isLoading={isLoading}
						>
							{mode === 'signIn' ? 'Sign In' : 'Sign Up'}
						</Button>
					</form>
				</Box>
			</Flex>
		</Box>
	);
}

export default AuthForm;
