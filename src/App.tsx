import { useEffect, useState } from "react";
import { PhoneCall, PhoneOff, Volume2 } from "lucide-react";
import Vapi from "@vapi-ai/web";

const vapi = new Vapi("c9983a9c-8094-4096-8898-ebc60c76a964");

const assistantOptions = {
  name: "Call Maitri AI",
  firstMessage: "Namaste! Main MaitriAI se bol raha hun. Aapki kya help kar sakta hun?",
  transcriber: {
    provider: "deepgram",
    model: "nova-2",
    language: "hi",
  },
  voice: {
    provider: "cartesia",
    voiceId: "bdab08ad-4137-4548-b9db-6142854c7525",
  },
  model: {
    provider: "openai",
    model: "gpt-4",
    messages: [
      {
        role: "system",
        content: `Aapko Maitri AI ka sales representative banna hai. Aapka goal hai customers se friendly tareeke se baat karke unki problems samajhna aur unhe sahi AI solution suggest karna. Unka welcome warmly karein, business problems samjhein, aur perfect AI solution offer karein.

        AI Utilities Maintenance System ke fayde:
        
        Machine problems ko pehle se predict kar leta hai.
        Maintenance ka kharcha kam ho jata hai.
        Equipment ko bina rukavat ke chalta rehta hai.
        
        Advanced Gas Monitoring System ke fayde:
        
        Real-time mein gas levels ko monitor karta hai.
        Safety ke liye khatron ko pehle se detect kar leta hai.
        Production needs ko predict karta hai.
        
        Temperature Monitoring System ke fayde:
        
        Accurate temperature tracking karta hai.
        Safety standards ko maintain karta hai.
        Critical temperatures ko control mein rakhta hai.
        
        Integrated Surveillance System ke fayde:
        
        24/7 security monitoring provide karta hai.
        Audio aur video dono track karta hai.
        Koi gadbad hone par turant alert kar deta hai.
        
        Manufacturing Process Solutions ke fayde:
        
        Production ko optimize karta hai.
        Waste kam karta hai.
        Equipment ki efficiency badhata hai.
        Real-time monitoring karta hai.
        
        Object Detection System ke fayde:
        
        Real-time mein objects ko detect karta hai.
        Security aur quality control mein help karta hai.
        Inventory management automatic ho jata hai.
        
        OCR Technology ke fayde:
        
        Papers ko digital format mein convert karta hai.
        Manual data entry ki zarurat nahi padti.
        ID cards, invoices sab kuch process kar leta hai.
        
        AI Avatar ke fayde:
        
        Photos ko speaking videos mein convert karta hai.
        Marketing aur training mein use kar sakte hain.
        Personalized messages create kar sakte hain.
        

        Custom AI Solutions: "Kuch special chahiye? Maitri AI aapke business ke liye special solutions bana sakta hai. Details discuss karne ke liye aapka naam, phone number, aur email address de dijiye. Humare experts jald hi aapse contact karenge aur aapki requirements samjhenge." (Customer ka contact details zaroor lein)
        
        Agar koi customer price pooche ya kuch khareedna chahe, toh unka phone number, email aur naam le lein, aur bolein ki company se jaldi call ayega. Unko ye bhi batayein ki aap Mumbai, Chicago, Hong Kong, Delhi, Los Angeles, New York, aur Surat mein offices hain.

        Contact Details:
        Phone: +91 9022049092, +919004175207
        Email: contact@maitriai.com, pradeep@maitriai.nyc
        Head Office: Shop-9, Clover Grove CHSL, Garden Grove Complex, Borivali West, Mumbai - 400092

        Customer ki problems achhe se samjhein, product ke fayde clearly batayein, aur return on investment pe focus karein. Confident aur excited rehna important hai - Maitri AI ki latest technology ke saath aap deals close kar sakte hain aur long-term partnerships bana sakte hain.`,
      },
    ],
  },
};

const App = () => {
  const [connecting, setConnecting] = useState(false);
  const [connected, setConnected] = useState(false);
  const [assistantIsSpeaking, setAssistantIsSpeaking] = useState(false);
  const [volumeLevel, setVolumeLevel] = useState(0);
  const [showPublicKeyInvalidMessage, setShowPublicKeyInvalidMessage] = useState(false);

  useEffect(() => {
    vapi.on("call-start", () => {
      setConnecting(false);
      setConnected(true);
      setShowPublicKeyInvalidMessage(false);
    });

    vapi.on("call-end", () => {
      setConnecting(false);
      setConnected(false);
      setShowPublicKeyInvalidMessage(false);
    });

    vapi.on("speech-start", () => setAssistantIsSpeaking(true));
    vapi.on("speech-end", () => setAssistantIsSpeaking(false));
    vapi.on("volume-level", setVolumeLevel);

    vapi.on("error", (error) => {
      console.error(error);
      setConnecting(false);
      if (error.message?.includes("Missing API key")) {
        setShowPublicKeyInvalidMessage(true);
      }
    });
  }, []);

  useEffect(() => {
    if (showPublicKeyInvalidMessage) {
      const timer = setTimeout(() => {
        setShowPublicKeyInvalidMessage(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [showPublicKeyInvalidMessage]);

  const startCall = () => {
    if (localStorage.getItem('featureUsed')) {
      alert('You can only use this feature once.');
      return;
    }
    setConnecting(true);
    vapi.start(assistantOptions);
    localStorage.setItem('featureUsed', 'true');
  };

  const endCall = () => vapi.stop();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex flex-col items-center justify-center p-4"
    style={{
      backgroundImage: 'url("https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=1920&q=80")',
      backgroundColor: 'rgba(255, 255, 255, 0.9)',
      backgroundBlendMode: 'overlay'
    }}>
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <img
            src="https://images.unsplash.com/photo-1596524430615-b46475ddff6e?w=400&h=300&fit=crop"
            alt="AI Assistant"
            className="w-24 h-24 rounded-full mx-auto mb-4 object-cover shadow-lg"
          />
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Maitri AI Assistant</h1>
          <p className="text-gray-600">Your 24/7 Customer Support Partner</p>
        </div>
        
        {/* Call Interface */}
        {!connected ? (
          <div className="bg-white rounded-2xl shadow-xl p-6 text-center">
            <button
              onClick={startCall}
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
        ) : (
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
                onClick={endCall}
                className="mt-4 py-3 px-6 rounded-xl bg-red-500 text-white font-medium hover:bg-red-600 transition-colors flex items-center space-x-2"
              >
                <PhoneOff className="w-5 h-5" />
                <span>End Call</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Error Message */}
      {showPublicKeyInvalidMessage && (
        <div className="fixed bottom-6 left-6 bg-red-500 text-white px-4 py-2 rounded-lg shadow-lg">
          Is your Vapi Public Key missing? (recheck your code)
        </div>
      )}

      {/* External Link */}
      {/* <a
        href="https://maitriai-chatbot.streamlit.app/"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed top-6 right-6 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-lg shadow-md hover:bg-white/95 transition-colors text-gray-700 font-medium"
      >
        Check out Maitri AI Chatbot
      </a> */}
    </div>
  );
};

export default App;