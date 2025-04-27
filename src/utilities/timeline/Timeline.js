import TimeLineList from "./TimeLineList";
import {
  ShoppingCart,
  CreditCard,
  Package,
  Truck,
  CheckCircle,
  Box,
} from "lucide-react";
import TimeBtn from "./TimeBtn";

export default function Timeline({ order }) {
  // Validate order object structure
  if (!order || !order.timeline) {
    return (
      <div className="w-4/12 max-md:w-full h-auto bg-white rounded-md border border-gray-300 p-4">
        <p className="text-red-500">Invalid order data</p>
      </div>
    );
  }

  const timelineSteps = [
    {
      title: "Order Placed",
      state: order.timeline.orderPlaced,
      icon: <ShoppingCart size={18} />,
      value: order.timeline.orderPlaced ? 100 : 0,
    },
    {
      title: "Payment Confirmed",
      state: order.timeline.paymentConfirmed,
      icon: <CreditCard size={18} />,
      value: order.timeline.paymentConfirmed ? 100 : 0,
    },
    {
      title: "Order Processed",
      state: order.timeline.orderProcessing,
      icon: <Package size={18} />,
      value: order.timeline.orderProcessing ? 100 : 0,
    },
    {
      title: "Order Shipped",
      state: order.timeline.orderShipped,
      icon: <Truck size={18} />,
      value: order.timeline.orderShipped ? 100 : 0,
    },
    {
      title:
        order.delivery === "pickup" ? "Ready for Pickup" : "Order Delivered",
      state: order.timeline.ready,
      icon:
        order.delivery === "pickup" ? (
          <Box size={18} />
        ) : (
          <CheckCircle size={18} />
        ),
      value: order.timeline.ready ? 100 : 0,
    },
  ];

  return (
    <div className="w-4/12 max-md:w-full h-auto bg-white rounded-md border border-gray-300">
      <div className="w-full p-4 border-b border-gray-300">
        <h1 className="text-lg text-gray-700 uppercase font-semibold">
          Order ID #{order.orderId}
        </h1>
      </div>
      <ul className="p-4 space-y-4">
        {timelineSteps.map((step) => (
          <TimeLineList
            key={step.title}
            title={step.title}
            state={step.state}
            icon={step.icon}
            value={step.value}
          />
        ))}
      </ul>
      <TimeBtn orderId={order.orderId} />
    </div>
  );
}