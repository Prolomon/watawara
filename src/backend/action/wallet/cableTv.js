"use server"

export async function cableTv (formData) {
    const cable = {
        provider: formData.get("provider"),
        smartcard: formData.get("smartcard_no"),
        duration: formData.get("duration"),
        subscription: formData.get("subscription")
    }
    console.log(cable)
}