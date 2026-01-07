export default function ConfirmationModal({ order, onClose }) {
  if (!order) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
      <div className="bg-white rounded-2xl shadow-lg w-full max-w-md p-6 sm:p-8">
        <div className="flex justify-center mb-4">
          <div className="bg-blue-100 w-16 h-16 flex items-center justify-center rounded-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 text-blue-600"
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

        <h2 className="text-center text-2xl font-semibold mb-2">
          Success! Your order is placed.
        </h2>
        <p className="text-center text-gray-500 mb-6">
          Check your email for confirmation and further instructions.
        </p>

        <div className="bg-gray-100 rounded-lg p-4 mb-6 space-y-2">
          <div className="flex justify-between">
            <span className="text-gray-600">Order Number</span>
            <span className="font-medium">{order.id}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Order Date</span>
            <span className="font-medium">{order.date}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Event Name</span>
            <span className="font-medium">{order.eventName}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Event Date</span>
            <span className="font-medium">{order.eventDate}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Register Date</span>
            <span className="font-medium">{order.registerDate}</span>
          </div>
        </div>

        <button
          onClick={onClose}
          className="w-full py-3 rounded-xl bg-blue-600 text-white font-medium hover:bg-blue-700 transition"
        >
          Back to Home
        </button>
      </div>
    </div>
  );
}
