import { Box, Flex, Stack, Text } from '@chakra-ui/layout';
import { Image } from '@chakra-ui/react';
import { ReactNode } from 'react';

type Props = {
	title: string;
	color: string;
	children: ReactNode;
	subtitle: string;
	description: string;
	roundeImage?: boolean;
	image?: string;
};

const GradientLayout = ({
	children,
	color,
	description,
	image,
	roundeImage = false,
	subtitle,
	title,
}: Props) => {
	return (
		<Box
			height='100%'
			width='100%'
			overflowY='auto'
			bgGradient={`linear(${color}.500 0%, ${color}.600 15%, ${color}.700 40%, rgba(0,0,0,1.95) 75%)`}
		>
			<Flex mb='2rem' bg={`${color}.600`} padding='2rem' align='end'>
				<Box padding='1rem'>
					<Image
						boxSize='10rem'
						boxShadow='2xl'
						src={image}
						borderRadius={roundeImage ? '100%' : '3px'}
					/>
				</Box>
				<Stack
					direction='column'
					color='white'
					padding='1.4rem'
					lineHeight='48px'
				>
					<Text fontSize='sm' fontWeight='bold' casing='uppercase'>
						{subtitle}
					</Text>
					<Text fontSize='6xl'>{title}</Text>
					<Text fontSize='sm' fontWeight='100'>
						{description}
					</Text>
				</Stack>
			</Flex>
			{children}
		</Box>
	);
};

export default GradientLayout;
