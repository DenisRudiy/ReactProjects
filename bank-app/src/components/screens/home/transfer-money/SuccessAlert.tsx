import {
	Alert,
	AlertDescription,
	AlertIcon,
	AlertTitle,
	Collapse,
	useDisclosure
} from '@chakra-ui/react'
import { FC } from 'react'

const SuccessAlert: FC<{ isSuccess: boolean }> = ({ isSuccess }) => {
	return (
		<Collapse in={isSuccess} animateOpacity>
			<Alert
				status='success'
				variant='subtle'
				flexDirection='column'
				alignItems='center'
				justifyContent='center'
				textAlign='center'
				height='200px'
			>
				<AlertIcon boxSize='40px' mr={0} />
				<AlertTitle mt={4} mb={1} fontSize='lg'>
					Money has been sent!
				</AlertTitle>
				<AlertDescription maxWidth='sm'>
					Thanks for use our App.
				</AlertDescription>
			</Alert>
		</Collapse>
	)
}

export default SuccessAlert
