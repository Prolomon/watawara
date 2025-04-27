"use server"

export async function bank (formData) {
    const data = {
        accountNo: formData.get("accountNo"),
        bank: formData.get("bank"),
        receipant: formData.get("name"),
        amount: formData.get("amount"),
        remark: formData.get("remark")
    }
    console.log(data)
}