import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-navy text-white pt-12 pb-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="col-span-1 md:col-span-1">
            <h2 className="text-2xl font-black text-yellow mb-4">UNISTAY</h2>
            <p className="text-gray-400 text-sm leading-relaxed">
              Empowering Ugandan university students to find safe, affordable, and comfortable accommodation since 2024.
            </p>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-4 text-white">Quick Links</h3>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li><a href="#" className="hover:text-yellow transition">Find Hostels</a></li>
              <li><a href="#" className="hover:text-yellow transition">University Guide</a></li>
              <li><a href="#" className="hover:text-yellow transition">Student Discounts</a></li>
              <li><a href="#" className="hover:text-yellow transition">List Your Hostel</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-4 text-white">Contact</h3>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li><i className="fa-solid fa-envelope mr-2 text-yellow"></i> hello@unistay.ug</li>
              <li><i className="fa-solid fa-phone mr-2 text-yellow"></i> +256 700 000 000</li>
              <li><i className="fa-solid fa-location-dot mr-2 text-yellow"></i> Kampala, Uganda</li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-4 text-white">Newsletter</h3>
            <form className="flex">
              <label htmlFor="newsletter-email" className="sr-only">Newsletter Email</label>
              <input 
                id="newsletter-email"
                type="email" 
                placeholder="Email" 
                className="bg-navy-light px-3 py-2 rounded-l-md w-full focus:outline-none focus:ring-1 focus:ring-yellow text-sm"
              />
              <button type="submit" className="bg-yellow text-navy px-4 py-2 rounded-r-md font-bold hover:bg-yellow-hover transition">Go</button>
            </form>
          </div>
        </div>
        <div className="border-t border-navy-light pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-xs">&copy; 2024 UniStay Uganda. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-gray-500 hover:text-yellow text-xl" aria-label="Facebook"><i className="fa-brands fa-facebook"></i></a>
            <a href="#" className="text-gray-500 hover:text-yellow text-xl" aria-label="Twitter"><i className="fa-brands fa-twitter"></i></a>
            <a href="#" className="text-gray-500 hover:text-yellow text-xl" aria-label="Instagram"><i className="fa-brands fa-instagram"></i></a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;