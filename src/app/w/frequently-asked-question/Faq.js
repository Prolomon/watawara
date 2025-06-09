import DropDownCard from "./DropDownCard"

export default function Faq () {
    const faq = [
        [
            {
              "id": "1",
              "title": "What is your return policy?",
              "body": "Our return policy allows you to return items within 30 days of receipt. Items must be in their original condition and packaging. Please visit our Returns Center to initiate a return."
            },
            {
              "id": "2",
              "title": "How do I track my order?",
              "body": "You can track your order by logging into your account and visiting the 'My Orders' section. You will find the tracking information for each order there."
            },
            {
              "id": "3",
              "title": "What payment methods do you accept?",
              "body": "We accept various payment methods including credit/debit cards, PayPal, and other secure payment options. You can select your preferred payment method at checkout."
            },
            {
              "id": "4",
              "title": "How do I cancel my order?",
              "body": "To cancel your order, please contact our customer support team as soon as possible. If your order has not yet been shipped, we will process the cancellation and issue a refund."
            },
            {
              "id": "5",
              "title": "Do you offer international shipping?",
              "body": "Yes, we offer international shipping to many countries. Shipping fees and delivery times may vary depending on the destination. Please check our Shipping Policy for more details."
            },
            {
              "id": "6",
              "title": "How do I change my shipping address?",
              "body": "To change your shipping address, log into your account and go to the 'My Addresses' section. You can add, edit, or delete addresses from there. Please note that changes to the shipping address cannot be made once an order has been placed."
            },
            {
              "id": "7",
              "title": "What should I do if I receive a damaged item?",
              "body": "If you receive a damaged item, please contact our customer support team immediately. Provide your order number and a photo of the damaged item. We will assist you with a replacement or refund."
            },
            {
              "id": "8",
              "title": "How do I apply a discount code?",
              "body": "To apply a discount code, enter the code in the 'Promo Code' field at checkout and click 'Apply'. The discount will be applied to your order total."
            },
            {
              "id": "9",
              "title": "Can I change my order after it has been placed?",
              "body": "Once an order has been placed, changes cannot be made. If you need to cancel the order, please contact our customer support team as soon as possible."
            },
            {
              "id": "10",
              "title": "How do I contact customer support?",
              "body": "You can contact our customer support team via email, phone, or live chat. Visit our Contact Us page for more information and support hours."
            }
          ]
    ]
    return (
        <div className="w-full">
            <h1 className="text-xl font-bold text-black capitalize text-center mt-2 mb-4">frequently asked questions</h1>
            <ul className="mt-3 grid gap-y-1.5">
                {faq[0].map((f, index) => (
                    <DropDownCard key={index} {...f}/>
                ))}
            </ul>
        </div>
    )
}