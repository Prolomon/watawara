"use server"
import { redirect } from "next/navigation"
import { User } from "../models/user.schema"
import { dbConnect } from "../server/server"

export async function forgottenPassword (e) {
    await dbConnect()

    const email = e.get("email")

    const user = await User.findOne({email})

    // if(!user) redirect("/auth/forgotten-password?validate=true");
    
}