import {
	Button,
	FormControl,
	FormErrorMessage,
	Input,
	InputGroup,
	InputLeftElement,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
	Stack
} from '@chakra-ui/react'
import { FC } from 'react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { useProfile } from '../../../../hooks/useProfile'
import { formatCardNumber } from '../../../../utils/format_cardNumber'
import { ITransferData } from './transfer.interface'

interface ITransferModule {
	isOpen: boolean
	onClose: () => void
}

const TransferModal: FC<ITransferModule> = ({ isOpen, onClose }) => {
	const {
		handleSubmit,
		register,
		control,
		formState: { errors }
	} = useForm<ITransferData>({
		mode: 'onChange',
		defaultValues: {
			amount: 0
		}
	})

	const { user } = useProfile()

	const onSubmit: SubmitHandler<ITransferData> = (data) => {}

	return (
		<Modal
			isOpen={isOpen}
			onClose={onClose}
			size='lg'
			motionPreset='slideInBottom'
		>
			<ModalOverlay />
			<ModalContent bg='#171717'>
				<ModalHeader>Transfer your money</ModalHeader>
				<ModalCloseButton />

				<ModalBody>
					<form onSubmit={handleSubmit(onSubmit)}>
						<Stack spacing={3}>
							<Input
								placeholder='From card'
								size='md'
								focusBorderColor='green.400'
								defaultValue={formatCardNumber(user?.card || 0)}
								disabled
							/>
							<Controller
								control={control}
								name='card'
								render={({ field: { onChange, name, value } }) => (
									<FormControl>
										<Input
											id={name}
											size='md'
											placeholder='To card'
											focusBorderColor='green.400'
											value={formatCardNumber(value)}
											onChange={(e) => onChange(e.target.value)}
										/>

										<FormErrorMessage>{errors.card?.message}</FormErrorMessage>
									</FormControl>
								)}
								rules={{
									required: 'This is required',
									minLength: {
										value: 16,
										message: 'Minimum length should be 16'
									}
								}}
							/>

							<InputGroup>
								<InputLeftElement
									pointerEvents='none'
									color='gray.300'
									fontSize='1.2em'
									children='$'
								/>
								<Input
									size='md'
									placeholder='Enter Amount'
									focusBorderColor='green.400'
									{...register('amount', {
										required: 'This is required'
									})}
								/>
							</InputGroup>
							<Button colorScheme='green' variant='outline'>
								Send Money
							</Button>
						</Stack>
					</form>
				</ModalBody>

				<ModalFooter>
					<Button onClick={onClose} variant='outline'>
						Close
					</Button>
				</ModalFooter>
			</ModalContent>
		</Modal>
	)
}

export default TransferModal
