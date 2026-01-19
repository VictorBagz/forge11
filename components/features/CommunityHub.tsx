
import React, { useState, useMemo } from 'react';
import { useApp } from '../../context/AppContext';

const CommunityHub: React.FC = () => {
  // Fix: Directly destructure from useApp() instead of spreading into a new object which was causing binding errors
  const { posts } = useApp();
  const [activeTab, setActiveTab] = useState<'news' | 'event' | 'job'>('news');

  const tabs = (['news', 'event', 'job'] as const);
  const activeIndex = tabs.indexOf(activeTab);

  const newsPosts = useMemo(() => posts.filter(p => p.type === 'news'), [posts]);
  const eventPosts = useMemo(() => posts.filter(p => p.type === 'event'), [posts]);
  const jobPosts = useMemo(() => posts.filter(p => p.type === 'job'), [posts]);

  const renderPostCard = (post: any) => (
    <div key={post.id} className="group bg-gray-50 rounded-[2.5rem] p-4 border border-gray-100 transition hover:shadow-xl hover:-translate-y-2 h-full flex flex-col">
      {post.image ? (
        <div className="relative h-48 overflow-hidden rounded-[2rem] mb-6 flex-shrink-0">
          <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition" />
          <div className="absolute top-4 left-4 bg-yellow text-navy px-4 py-1 rounded-full text-[10px] font-black uppercase shadow-sm">
            {post.type}
          </div>
        </div>
      ) : (
        <div className="h-48 rounded-[2rem] mb-6 bg-navy flex items-center justify-center p-8 relative overflow-hidden flex-shrink-0">
           <i className="fa-solid fa-briefcase text-yellow/20 text-8xl absolute -right-4 -bottom-4 rotate-12"></i>
           <div className="text-center relative z-10">
             <div className="bg-yellow/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 border border-yellow/10">
                <i className="fa-solid fa-briefcase text-yellow text-2xl"></i>
             </div>
             <p className="text-yellow font-black uppercase tracking-widest text-[10px]">Opportunity</p>
           </div>
        </div>
      )}
      
      <div className="px-4 pb-4 flex flex-col flex-grow">
        <p className="text-navy/40 font-bold text-xs mb-2">{post.date}</p>
        <h4 className="text-xl font-black text-navy mb-3 leading-tight line-clamp-2">{post.title}</h4>
        <p className="text-gray-500 text-sm leading-relaxed mb-6 line-clamp-2 flex-grow">{post.description}</p>
        <button className="text-navy font-bold text-sm flex items-center hover:text-yellow transition mt-auto group/btn">
          Read More <i className="fa-solid fa-arrow-right-long ml-2 group-hover/btn:translate-x-2 transition-transform"></i>
        </button>
      </div>
    </div>
  );

  return (
    <section id="community" className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-1 rounded-full bg-navy/5 border border-navy/10 text-navy/40 font-black text-[10px] uppercase tracking-widest mb-6">
            Campus Pulse
          </div>
          <h2 className="text-5xl md:text-6xl font-black text-navy mb-4 tracking-tighter">Community <span className="text-yellow italic">Hub.</span></h2>
          <p className="text-gray-500 max-w-xl mx-auto text-lg">Stay ahead with real-time campus updates, trending social events, and your next career move.</p>
        </div>

        <div className="flex justify-center mb-16">
          <div className="inline-flex bg-gray-100 p-2 rounded-[2rem] shadow-inner relative">
            {tabs.map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`relative z-10 px-10 py-4 rounded-[1.5rem] font-black text-sm transition-all duration-300 capitalize ${
                  activeTab === tab 
                    ? 'text-yellow' 
                    : 'text-gray-500 hover:text-navy'
                }`}
              >
                {tab === 'news' ? 'News' : tab === 'job' ? 'Jobs' : 'Events'}
              </button>
            ))}
            {/* Sliding background indicator for tabs */}
            <div 
              className="absolute top-2 bottom-2 bg-navy rounded-[1.5rem] transition-all duration-500 cubic-bezier shadow-xl shadow-navy/20"
              style={{ 
                left: `calc(0.5rem + ${activeIndex * 33.333}%)`,
                width: 'calc(33.333% - 0.66rem)',
                zIndex: 0
              }}
            ></div>
          </div>
        </div>

        <div className="relative overflow-visible">
          <div 
            className="flex transition-transform duration-700 cubic-bezier gpu-accel"
            style={{ transform: `translateX(-${activeIndex * 100}%)` }}
          >
            {/* News Panel */}
            <div className="w-full flex-shrink-0 px-1">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
                {newsPosts.map(renderPostCard)}
                {newsPosts.length === 0 && <div className="col-span-full text-center py-20 text-gray-400 font-bold">No news at the moment.</div>}
              </div>
            </div>

            {/* Events Panel */}
            <div className="w-full flex-shrink-0 px-1">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
                {eventPosts.map(renderPostCard)}
                {eventPosts.length === 0 && <div className="col-span-full text-center py-20 text-gray-400 font-bold">No upcoming events.</div>}
              </div>
            </div>

            {/* Jobs Panel */}
            <div className="w-full flex-shrink-0 px-1">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
                {jobPosts.map(renderPostCard)}
                {jobPosts.length === 0 && <div className="col-span-full text-center py-20 text-gray-400 font-bold">No job openings found.</div>}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CommunityHub;
