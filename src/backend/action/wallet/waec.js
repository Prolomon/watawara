"use server"

export async function waec (formData) {
    const data = {
        payment: formData.get("payment"),
        amount: formData.get("amount"),
        network: formData.get("network"),
        number: formData.get("number")
    }
    console.log(data)
}