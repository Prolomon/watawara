

export default function Currency (text) {
    return new Intl.NumberFormat("en-NG", {
        style: "currency",
        currency: "NGN"
    }).format(text)
}