
import React from 'react';
import { useApp } from '../../context/AppContext';

const StudentSpotlight: React.FC = () => {
  const { students } = useApp();

  return (
    <section id="spotlight" className="py-24 bg-navy text-white overflow-hidden relative">
      <div className="absolute top-0 right-0 w-1/3 h-full bg-yellow/5 skew-x-12 transform translate-x-20"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row items-end justify-between mb-16">
          <div className="max-w-xl">
            <h2 className="text-yellow font-black uppercase tracking-widest text-sm mb-4">Pride of Uganda</h2>
            <h3 className="text-4xl md:text-5xl font-black mb-6">Student <span className="text-yellow">Spotlight</span></h3>
            <p className="text-gray-400 text-lg">Celebrating the exceptional students shaping the future of our nation through innovation, leadership, and resilience.</p>
          </div>
          <button className="mt-8 md:mt-0 bg-white text-navy px-8 py-4 rounded-2xl font-black shadow-lg hover:bg-yellow transition active:scale-95">
            Nominate a Student
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {students.map(student => (
            <div key={student.id} className="flex flex-col sm:flex-row bg-white/5 backdrop-blur border border-white/10 rounded-[3rem] p-6 hover:bg-white/10 transition group">
              <div className="sm:w-48 h-48 sm:h-auto mb-6 sm:mb-0 rounded-[2.5rem] overflow-hidden flex-shrink-0">
                <img src={student.image} alt={student.name} className="w-full h-full object-cover group-hover:scale-110 transition duration-700" />
              </div>
              <div className="sm:ml-8 flex flex-col justify-center">
                <div className="flex items-center mb-3">
                  <span className="bg-yellow text-navy px-3 py-1 rounded-full text-[10px] font-black uppercase">{student.field}</span>
                  <span className="ml-3 text-gray-500 text-xs font-bold">{student.university}</span>
                </div>
                <h4 className="text-2xl font-black mb-4">{student.name}</h4>
                <p className="text-gray-300 italic leading-relaxed">"{student.achievement}"</p>
                <div className="mt-6 flex space-x-4">
                   <a href="#" className="text-yellow text-xl hover:text-white transition"><i className="fa-brands fa-linkedin"></i></a>
                   <a href="#" className="text-yellow text-xl hover:text-white transition"><i className="fa-brands fa-x-twitter"></i></a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StudentSpotlight;
