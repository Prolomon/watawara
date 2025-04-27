"use server"

export async function jamb (formData) {
    const data = {
        exam: formData.get("exam"),
        profileCode: formData.get("profileCode"),
        number: formData.get("number"),
        amount: formData.get("amount")
    }
    console.log(data)
}