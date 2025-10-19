import type { UserDeps } from './register.js'

interface UpdatePayload {
  id: string
  name?: string
  email?: string
  phoneNumber?: string
  password?: string
}

export async function updateUserData(
  { userService }: UserDeps,
  { id, ...data }: UpdatePayload
) {
  const foundUser = await userService.findById(id)
  if (!foundUser) throw new Error('User not found')

  const updatedUser = await userService.updateOne(id, data)
  return updatedUser
}
