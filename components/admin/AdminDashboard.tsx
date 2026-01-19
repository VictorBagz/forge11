import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Hostel, CommunityPost, Student } from '../../types';

type Tab = 'hostels' | 'community' | 'students';

const AdminModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}> = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-navy/80 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="bg-white rounded-[2rem] w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl p-8 animate-in zoom-in duration-300">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-black text-navy">{title}</h2>
          <button onClick={onClose} className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center text-navy hover:bg-yellow transition-all"><i className="fa-solid fa-xmark"></i></button>
        </div>
        {children}
      </div>
    </div>
  );
};

export const AdminDashboard: React.FC = () => {
  const { 
    hostels, posts, students, universities, 
    setIsAdmin, deleteHostel, deletePost, deleteStudent,
    saveHostel, savePost, saveStudent 
  } = useApp();
  
  const [activeTab, setActiveTab] = useState<Tab>('hostels');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);

  const stats = [
    { label: 'Total Hostels', value: hostels.length, icon: 'fa-house' },
    { label: 'Community Posts', value: posts.length, icon: 'fa-users' },
    { label: 'Spotlight Students', value: students.length, icon: 'fa-star' },
  ];

  const handleEdit = (item: any) => {
    setEditingItem(item);
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const data = Object.fromEntries(formData);

    if (activeTab === 'hostels') {
      await saveHostel({ 
        ...editingItem, 
        name: data.name as string, 
        priceRange: data.priceRange as string,
        distance: data.distance as string,
        universityId: data.universityId as string,
        rating: Number(data.rating),
        amenities: (data.amenities as string).split(',').map(s => s.trim()),
        image: data.image as string || 'https://picsum.photos/800/600',
        isRecommended: !!data.isRecommended,
      } as Hostel);
    } else if (activeTab === 'community') {
      await savePost({
        ...editingItem,
        title: data.title as string,
        description: data.description as string,
        type: data.type as any,
        date: data.date as string,
        image: data.image as string
      } as CommunityPost);
    }

    setIsModalOpen(false);
    setEditingItem(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row">
      <aside className="w-full md:w-64 bg-navy text-white p-6 flex flex-col sticky top-0 md:h-screen">
        <div className="mb-10 flex items-center">
          <span className="text-xl font-black text-yellow tracking-tighter">UNISTAY</span>
          <span className="text-[10px] ml-2 text-gray-400 font-bold uppercase tracking-widest">ADMIN</span>
        </div>

        <nav className="space-y-2 flex-grow">
          {(['hostels', 'community', 'students'] as Tab[]).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`w-full text-left px-4 py-3 rounded-xl font-bold capitalize transition-all flex items-center gap-3 ${
                activeTab === tab ? 'bg-yellow text-navy shadow-lg' : 'hover:bg-white/5 text-gray-400'
              }`}
            >
              <i className={`fa-solid ${tab === 'hostels' ? 'fa-hotel' : tab === 'community' ? 'fa-bullhorn' : 'fa-user-graduate'}`}></i>
              {tab}
            </button>
          ))}
        </nav>

        <button 
          onClick={() => setIsAdmin(false)}
          className="mt-10 w-full bg-white/5 hover:bg-white/10 p-4 rounded-xl text-xs font-black uppercase tracking-widest border border-white/10 transition-all"
        >
          Exit Dashboard
        </button>
      </aside>

      <main className="flex-grow p-6 md:p-10">
        <header className="mb-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h1 className="text-3xl font-black text-navy capitalize">Manage {activeTab}</h1>
            <p className="text-gray-500">Live system management for the UniStay platform.</p>
          </div>
          <button 
            onClick={() => { setEditingItem(null); setIsModalOpen(true); }}
            className="bg-navy text-yellow px-6 py-3 rounded-xl font-black shadow-lg hover:shadow-xl transition-all btn-press"
          >
            Add New {activeTab.slice(0, -1)}
          </button>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
          {stats.map(stat => (
            <div key={stat.label} className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-navy text-yellow flex items-center justify-center text-xl">
                <i className={`fa-solid ${stat.icon}`}></i>
              </div>
              <div>
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{stat.label}</p>
                <p className="text-2xl font-black text-navy">{stat.value}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Identifier</th>
                  <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Context</th>
                  <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">State</th>
                  <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {activeTab === 'hostels' && hostels.map(h => (
                  <tr key={h.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 font-black text-navy">{h.name}</td>
                    <td className="px-6 py-4 text-sm text-gray-500">{h.priceRange}</td>
                    <td className="px-6 py-4">
                      {h.isRecommended ? <span className="bg-yellow/10 text-yellow-hover px-2 py-1 rounded-md text-[10px] font-black uppercase">Premium</span> : <span className="bg-gray-100 text-gray-400 px-2 py-1 rounded-md text-[10px] font-black uppercase">Standard</span>}
                    </td>
                    <td className="px-6 py-4 text-right space-x-2">
                      <button onClick={() => handleEdit(h)} className="text-navy hover:text-yellow p-2" aria-label="Edit"><i className="fa-solid fa-pen-to-square"></i></button>
                      <button onClick={() => deleteHostel(h.id)} className="text-red-400 hover:text-red-600 p-2" aria-label="Delete"><i className="fa-solid fa-trash-can"></i></button>
                    </td>
                  </tr>
                ))}
                {activeTab === 'community' && posts.map(p => (
                  <tr key={p.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 font-black text-navy truncate max-w-xs">{p.title}</td>
                    <td className="px-6 py-4 text-sm text-gray-500 capitalize">{p.type}</td>
                    <td className="px-6 py-4"><span className="bg-green-50 text-green-600 px-2 py-1 rounded-md text-[10px] font-black uppercase">Live</span></td>
                    <td className="px-6 py-4 text-right space-x-2">
                      <button onClick={() => handleEdit(p)} className="text-navy hover:text-yellow p-2" aria-label="Edit"><i className="fa-solid fa-pen-to-square"></i></button>
                      <button onClick={() => deletePost(p.id)} className="text-red-400 hover:text-red-600 p-2" aria-label="Delete"><i className="fa-solid fa-trash-can"></i></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <AdminModal 
          isOpen={isModalOpen} 
          onClose={() => setIsModalOpen(false)} 
          title={editingItem ? `Edit ${activeTab.slice(0, -1)}` : `Add New ${activeTab.slice(0, -1)}`}
        >
          <form onSubmit={handleSave} className="space-y-6">
            {activeTab === 'hostels' ? (
              <>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label htmlFor="admin-h-name" className="text-[10px] font-black text-gray-400 uppercase tracking-widest cursor-pointer">Hostel Name</label>
                    <input id="admin-h-name" name="name" defaultValue={editingItem?.name} className="w-full bg-gray-50 p-4 rounded-xl border border-gray-100" required />
                  </div>
                  <div className="space-y-1">
                    <label htmlFor="admin-h-uni" className="text-[10px] font-black text-gray-400 uppercase tracking-widest cursor-pointer">University</label>
                    <select id="admin-h-uni" name="universityId" defaultValue={editingItem?.universityId} className="w-full bg-gray-50 p-4 rounded-xl border border-gray-100" required>
                      {universities.map(u => <option key={u.id} value={u.id}>{u.name}</option>)}
                    </select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label htmlFor="admin-h-price" className="text-[10px] font-black text-gray-400 uppercase tracking-widest cursor-pointer">Price Range</label>
                    <input id="admin-h-price" name="priceRange" defaultValue={editingItem?.priceRange} placeholder="UGX 500k - 800k" className="w-full bg-gray-50 p-4 rounded-xl border border-gray-100" required />
                  </div>
                  <div className="space-y-1">
                    <label htmlFor="admin-h-dist" className="text-[10px] font-black text-gray-400 uppercase tracking-widest cursor-pointer">Distance</label>
                    <input id="admin-h-dist" name="distance" defaultValue={editingItem?.distance} placeholder="200m from gate" className="w-full bg-gray-50 p-4 rounded-xl border border-gray-100" required />
                  </div>
                </div>
                <div className="space-y-1">
                  <label htmlFor="admin-h-amenities" className="text-[10px] font-black text-gray-400 uppercase tracking-widest cursor-pointer">Amenities (comma separated)</label>
                  <input id="admin-h-amenities" name="amenities" defaultValue={editingItem?.amenities?.join(', ')} placeholder="WiFi, Shuttle, Security" className="w-full bg-gray-50 p-4 rounded-xl border border-gray-100" />
                </div>
                <div className="flex items-center gap-2">
                  <input type="checkbox" id="admin-h-premium" name="isRecommended" defaultChecked={editingItem?.isRecommended} className="w-4 h-4 accent-yellow" />
                  <label htmlFor="admin-h-premium" className="text-sm font-bold text-navy cursor-pointer">Mark as Premium Choice</label>
                </div>
              </>
            ) : (
              <div className="space-y-4">
                 <div className="space-y-1">
                    <label htmlFor="admin-p-title" className="text-[10px] font-black text-gray-400 uppercase tracking-widest cursor-pointer">Post Title</label>
                    <input id="admin-p-title" name="title" defaultValue={editingItem?.title} placeholder="Post Title" className="w-full bg-gray-50 p-4 rounded-xl border border-gray-100" required />
                 </div>
                 <div className="space-y-1">
                    <label htmlFor="admin-p-desc" className="text-[10px] font-black text-gray-400 uppercase tracking-widest cursor-pointer">Description</label>
                    <textarea id="admin-p-desc" name="description" defaultValue={editingItem?.description} placeholder="Content description..." className="w-full bg-gray-50 p-4 rounded-xl border border-gray-100" rows={4} required />
                 </div>
              </div>
            )}
            <button type="submit" className="w-full bg-navy text-yellow font-black py-5 rounded-2xl shadow-xl hover:shadow-2xl transition-all">
              {editingItem ? 'Update Item' : 'Create Item'}
            </button>
          </form>
        </AdminModal>
      </main>
    </div>
  );
};