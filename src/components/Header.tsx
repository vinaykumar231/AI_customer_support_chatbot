const Header = () => {
  return (
    <div className="text-center mb-8">
      <img
        src="https://images.unsplash.com/photo-1596524430615-b46475ddff6e?w=400&h=300&fit=crop"
        alt="AI Assistant"
        className="w-24 h-24 rounded-full mx-auto mb-4 object-cover shadow-lg"
      />
      <h1 className="text-2xl font-bold text-gray-800 mb-2">Maitri AI Assistant</h1>
      <p className="text-gray-600">Your 24/7 Customer Support Partner</p>
    </div>
  );
};

export default Header;