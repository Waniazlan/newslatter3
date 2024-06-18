import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiMenu, FiX } from 'react-icons/fi';

function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className="bg-gradient-to-r from-gray-700 to-gray-900 text-white shadow-lg">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="text-2xl font-bold flex items-center">
          <Link to="/" className="flex items-center">
            <img src="/logo.png" alt="Logo" className="h-10 w-10 mr-2 rounded-full shadow-md" /> {/* Add your logo here */}
            MyApp
          </Link>
        </div>
        <div className="lg:hidden">
          <button onClick={toggleMenu} className="text-white focus:outline-none">
            {isOpen ? <FiX size={28} /> : <FiMenu size={28} />}
          </button>
        </div>
        <nav className="hidden lg:flex lg:items-center lg:space-x-6">
          <ul className="flex flex-row space-x-6">
            <li>
              <Link
                to="/"
                className="block text-lg font-semibold transition duration-300 ease-in-out transform hover:scale-105 hover:text-gray-300 px-3 py-2 rounded-md"
              >
                Post
              </Link>
            </li>
            <li>
              <Link
                to="/getContactDetails"
                className="block text-lg font-semibold transition duration-300 ease-in-out transform hover:scale-105 hover:text-gray-300 px-3 py-2 rounded-md"
              >
                Contact Details
              </Link>
            </li>
          </ul>
        </nav>
      </div>
      <nav className={`lg:hidden ${isOpen ? 'block' : 'hidden'} transition duration-300 ease-in-out`}>
        <ul className="flex flex-col items-center mt-4 space-y-4 bg-gray-800 py-4 rounded-md shadow-md">
          <li>
            <Link
              to="/"
              className="block font-semibold text-lg transition duration-300 ease-in-out transform hover:scale-105 hover:text-gray-300 px-3 py-2 rounded-md"
              onClick={() => setIsOpen(false)}
            >
              Post
            </Link>
          </li>
          <li>
            <Link
              to="/getContactDetails"
              className="block text-lg transition font-semibold duration-300 ease-in-out transform hover:scale-105 hover:text-gray-300 px-3 py-2 rounded-md"
              onClick={() => setIsOpen(false)}
            >
              Contact Details
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
