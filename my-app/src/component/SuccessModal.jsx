import { X, CheckCircle } from 'lucide-react';


export default function SuccessModal({ isOpen, onClose, message, onNavigate, onChoose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none">
      <div className="bg-white rounded-lg shadow-xl max-w-sm w-full mx-4 p-6 animate-in fade-in zoom-in duration-300 pointer-events-auto relative">
        {/* Close Button - Top Right Corner */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-4">
          <CheckCircle className="w-6 h-6 text-green-500" />
          <h2 className="text-xl font-semibold text-gray-800">Berhasil!</h2>
        </div>

        {/* Message */}
        <p className="text-gray-600 mb-6">{message}</p>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <button
            onClick={onChoose}
            className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
          >
            Lanjut Belanja
          </button>
          <button
            onClick={onNavigate}
            className="flex-1 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors font-medium"
          >
            Ke Checkout
          </button>
        </div>
      </div>
    </div>
  );
}