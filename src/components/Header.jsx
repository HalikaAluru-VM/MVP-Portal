import { RotateCcw, User } from "lucide-react";


const Header = ({ username, onReset }) => {
  return (
  <header className="bg-gradient-to-br from-white/10 to-black/20 backdrop-blur-lg p-6 rounded-2xl shadow-xl flex justify-between items-center mb-8 border border-white/10">
      <div className="flex items-center gap-4">
        <div className="bg-gradient-to-br from-purple-400/80 to-blue-400/80 rounded-full p-3">
          <User className="w-8 h-8 text-white" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-white">Hello, {username}!</h1>
          <p className="text-white text-opacity-80 text-sm mt-1">Welcome to your dashboard</p>
        </div>
      </div>
      <button
        onClick={onReset}
        className="flex items-center gap-2 px-8 py-3 bg-white/10 hover:bg-white/20 text-white rounded-xl transition border border-white/10 font-medium text-lg backdrop-blur"
        style={{ minWidth: 100, justifyContent: 'center' }}
      >
        <RotateCcw className="w-5 h-5 text-white" />
        <span className="text-white">Reset</span>
      </button>
    </header>
  );
};

export default Header;
