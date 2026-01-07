export default function ConfirmationModal({ order, onClose }) {
  if (!order) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
      <div className="bg-white rounded-2xl shadow-lg w-full max-w-md p-6 sm:p-8 overflow-y-auto max-h-[90vh]">
        {/* Success Icon */}
        <div className="flex justify-center mb-4">
          <div className="bg-[#628141]/10 w-16 h-16 flex items-center justify-center rounded-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 text-[#628141]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
        </div>

        <h2 className="text-center text-2xl font-semibold mb-2 text-[#2A3A2A]">
          Success! Your order is placed.
        </h2>
        <p className="text-center text-black/60 mb-6">
          Check your email for confirmation and further instructions.
        </p>

        {/* Order Details */}
        <div className="bg-[#628141]/10 rounded-xl p-4 mb-6 space-y-2">
          <div className="flex justify-between">
            <span className="text-black/60">Date</span>
            <span className="font-medium">{order.registerDate}</span>
          </div>
        </div>

        {/* Items Summary */}
        {order.items && order.items.length > 0 && (
          <div className="bg-white rounded-xl p-4 mb-6 space-y-2 border border-black/10">
            <h3 className="font-semibold text-[#2A3A2A] mb-2">Items:</h3>
            {order.items.map((item, idx) => (
              <div key={idx} className="flex justify-between text-black/80">
                <span>
                  {item.name} {item.size ? `(Size: ${item.size})` : ''}
                </span>
                <span>Qty: {item.quantity}</span>
                <span>Rs {item.price * item.quantity}/-</span>
              </div>
            ))}
            <div className="flex justify-between font-bold mt-2 text-[#2A3A2A]">
              <span>Total</span>
              <span>Rs {order.total}/-</span>
            </div>
          </div>
        )}

        {/* Back Button */}
        <button
          onClick={onClose}
          className="w-full py-4 rounded-xl bg-[#628141] text-white font-medium hover:bg-[#516B36] transition"
        >
          Back
        </button>
      </div>
    </div>
  );
}
