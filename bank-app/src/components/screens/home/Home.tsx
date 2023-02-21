import { ArrowRightIcon } from '@chakra-ui/icons'
import {
	Box,
	Center,
	Heading,
	IconButton,
	Text,
	useDisclosure
} from '@chakra-ui/react'
import { FC } from 'react'
import { useProfile } from '../../../hooks/useProfile'
import Balance from './Balance'
import TransferModal from './transfer-money/TransferModal'

const Home: FC = () => {
	const { isOpen, onOpen, onClose } = useDisclosure()
	const { user } = useProfile()

	return (
		<Center>
			<Box bg='black' p='6' h={'100vh'} width='550px'>
				<Box>
					<Text fontSize='xl' color='whiteAlpha.500'>
						Good Morning!
					</Text>
					<Heading fontSize='2xl'>{user?.name}</Heading>
				</Box>
				<Balance />
				<IconButton
					m='auto'
					mt={8}
					display='block'
					variant='outline'
					aria-label='Transfer'
					fontSize='18px'
					colorScheme='green'
					icon={<ArrowRightIcon />}
					onClick={onOpen}
				/>

				<TransferModal isOpen={isOpen} onClose={onClose} />
			</Box>
		</Center>
	)
}

export default Home
