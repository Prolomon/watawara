"use server"

export async function betting (formData) {
    const bet = {
        betSite: formData.get("bettingSites"),
        userId: formData.get("userId"),
        amount: formData.get("amount")
    }

    console.log(bet)
}