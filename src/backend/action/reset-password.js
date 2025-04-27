"use server"

export async function resetPassword (formData) {
    const resetPasswordCredentials = {
        otp: formData.get("otp"),
        password: formData.get("password")
    }

    console.log(resetPasswordCredentials)
}