import { PhoneOff, Volume2 } from "lucide-react";

interface ActiveCallProps {
  assistantIsSpeaking: boolean;
  volumeLevel: number;
  onEndCall: () => void;
}

const ActiveCall = ({ assistantIsSpeaking, volumeLevel, onEndCall }: ActiveCallProps) => {
  return (
    <div className="bg-white rounded-2xl shadow-xl p-6">
      <div className="flex flex-col items-center space-y-4">
        <div className={`relative w-24 h-24 rounded-full flex items-center justify-center ${
          assistantIsSpeaking ? 'bg-blue-50' : 'bg-gray-50'
        }`}>
          <Volume2 className={`w-12 h-12 ${
            assistantIsSpeaking ? 'text-blue-500' : 'text-gray-400'
          }`} />
          {assistantIsSpeaking && (
            <div className="absolute inset-0 rounded-full border-2 border-blue-500 animate-ping" />
          )}
        </div>
        
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-blue-500 h-2 rounded-full transition-all duration-300"
            style={{ width: `${volumeLevel * 100}%` }}
          />
        </div>

        <button
          onClick={onEndCall}
          className="mt-4 py-3 px-6 rounded-xl bg-red-500 text-white font-medium hover:bg-red-600 transition-colors flex items-center space-x-2"
        >
          <PhoneOff className="w-5 h-5" />
          <span>End Call</span>
        </button>
      </div>
    </div>
  );
};

export default ActiveCall;