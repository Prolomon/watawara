

export default function Currency (text) {
    return new Intl.NumberFormat("en-NG", {
        style: "currency",
        currency: "NGN",
        minimumFractionDigits: 0, // Add this line
        maximumFractionDigits: 0  // Add this line
    }).format(text)
}