"use server"

export async function eletricity (formData) {
    const data = {
        provider: formData.get("provider"),
        type: formData.get("type"),
        meter: formData.get("meter_no"),
        amount: formData.get("amount")
    }

    console.log(data)
}