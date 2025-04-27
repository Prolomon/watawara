"use server"
import { auth } from "../../../auth"

export const userSession = async () => {
    const session = await auth()
    const user = session?.user

    if (!user) return null

    return user
}