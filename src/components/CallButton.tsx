import { PhoneCall } from "lucide-react";

interface CallButtonProps {
  connecting: boolean;
  onStart: () => void;
}

const CallButton = ({ connecting, onStart }: CallButtonProps) => {
  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 text-center">
      <button
        onClick={onStart}
        disabled={connecting}
        className={`w-full py-4 px-6 rounded-xl text-white font-medium transition-all transform hover:scale-105 ${
          connecting
            ? 'bg-gray-400'
            : 'bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700'
        }`}
      >
        <div className="flex items-center justify-center space-x-2">
          <PhoneCall className="w-5 h-5" />
          <span>{connecting ? 'Connecting...' : 'Start Conversation'}</span>
        </div>
      </button>
    </div>
  );
};

export default CallButton;