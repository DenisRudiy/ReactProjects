import { Box, Flex, Heading, Text } from '@chakra-ui/react'
import { FC } from 'react'
import { user } from './Home'

const Balance: FC = () => {
	return (
		<Box mt={4} pos='relative' width={'50%'} m='auto'>
			<Flex
				justifyContent='center'
				alignItems='center'
				direction='column'
				zIndex={2}
				pos='relative'
			>
				<Heading fontSize='5xl'>$ {user.balance}</Heading>
				<Text fontSize='xl' color='whiteAlpha.500'>
					Balance
				</Text>
			</Flex>
			<Flex
				alignItems='center'
				justifyContent='center'
				pos='absolute'
				zIndex={1}
				top={-6}
				left={0}
				w='full'
				h='full'
			>
				<Box
					w={150}
					h={150}
					rounded={'50%'}
					pos='absolute'
					top={0}
					left={'20%'}
				>
					<Box
						boxShadow='200px 0px 120px rgba(130 255 113 / 43%)'
						h={100}
						w={100}
						pos='absolute'
						left={-180}
						top={6}
					/>
				</Box>
			</Flex>
		</Box>
	)
}

export default Balance
