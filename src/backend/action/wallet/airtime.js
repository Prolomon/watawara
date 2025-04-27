"use server"

export async function airtime (formData) {
    const card = {
        provider: formData("provider"),
        phoneNumber: formData("phone_no"),
        amount: formData("amount")
    }
    console.log(card)
}