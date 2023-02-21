import { instance } from '../api'
import { IUser } from '../types/user.interface'

export interface ITransferMoney {
	balance: number
	card: number
	fromCard: number
}

export const UserService = {
	async getProfile() {
		const response = await instance.get<IUser>(`/users/3`)
		return response.data
	},

	async getUsers() {
		const response = await instance.get<IUser[]>(`/users`)

		return response.data.filter((user) => user.id != 1)
	},

	async getOneUser(card: number) {
		const response = await instance.get<IUser[]>(`/users/`, {
			params: {
				card
			}
		})

		return response.data[0]
	},

	async transferMoney({ balance, card, fromCard }: ITransferMoney) {
		const userFrom = await this.getOneUser(fromCard)
		const userTo = await this.getOneUser(card)

		await instance.patch(`/users/${userFrom.id}`, {
			balance: userFrom.balance - balance
		})

		await instance.patch(`/users/${userTo.id}`, {
			balance: userTo.balance + balance
		})
	}
}
