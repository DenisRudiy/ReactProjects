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
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { FC, useState } from 'react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { useProfile } from '../../../../hooks/useProfile'
import { ITransferMoney, UserService } from '../../../../services/user.service'
import { formatCardNumber } from '../../../../utils/format_cardNumber'
import SuccessAlert from './SuccessAlert'
import { ITransferData } from './transfer.interface'

interface ITransferModule {
	isOpen: boolean
	onClose: () => void
}

const TransferModal: FC<ITransferModule> = ({ isOpen, onClose }) => {
	const { user } = useProfile()

	const [isSuccess, setIsSuccess] = useState(false)

	const {
		handleSubmit,
		register,
		control,
		reset,
		formState: { errors }
	} = useForm<ITransferData>({
		mode: 'onChange',
		defaultValues: {
			balance: 0
		}
	})

	const queryClient = useQueryClient()

	const { mutate, isLoading } = useMutation(
		['transfer money'],
		(data: ITransferMoney) => UserService.transferMoney(data),
		{
			async onSuccess() {
				setIsSuccess(true)
				reset()
				queryClient.invalidateQueries(['profile'])

				setTimeout(() => {
					setIsSuccess(false)
				}, 5000)
			}
		}
	)

	const onSubmit: SubmitHandler<ITransferData> = (data) => {
		if (!user?.card) return

		mutate({
			card: data.card,
			balance: Number(data.balance),
			fromCard: user.card
		})
	}

	return (
		<Modal
			isOpen={isOpen}
			onClose={onClose}
			size='lg'
			motionPreset='slideInBottom'
		>
			<ModalOverlay />
			<ModalContent bg='#171717'>
				<SuccessAlert isSuccess={isSuccess} />
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
											maxLength={19 || ''}
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
									{...register('balance', {
										required: 'This is required'
									})}
								/>
							</InputGroup>
							<Button
								colorScheme='green'
								variant='outline'
								isLoading={isLoading}
								loadingText='Sending money...'
								type='submit'
							>
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
