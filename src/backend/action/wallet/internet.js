"use server"

export async function internet (formData) {
    const data = {
        provider: fornData("provider"),
        internet: formData("internet"),
        phoneNumber: formData("phone_no")
    }
    console.log(data)
}