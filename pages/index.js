import { useState, useEffect } from 'react';
import Head from 'next/head';
import NoticeForm from '../components/NoticeForm';
import NoticeCard from '../components/NoticeCard';

export default function Home() {
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const [showForm, setShowForm] = useState(false);
  const [editingNotice, setEditingNotice] = useState(null);

  const fetchNotices = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/notices');
      if (!res.ok) throw new Error('Failed to fetch notices');
      const data = await res.json();
      setNotices(data);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotices();
  }, []);

  
  const handleAddNew = () => {
    setEditingNotice(null);
    setShowForm(true);
  };

  const handleEdit = (notice) => {
    setEditingNotice(notice);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`/api/notices/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete notice');
      
      fetchNotices();
    } catch (err) {
      alert(err.message);
    }
  };

  const handleFormSuccess = () => {
    setShowForm(false);
    setEditingNotice(null);
    fetchNotices(); 
  };

  const handleFormCancel = () => {
    setShowForm(false);
    setEditingNotice(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <Head>
        <title>Reno Notice Board</title>
      </Head>

      <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Reno Notice Board</h1>
          {!showForm && (
            <button 
              onClick={handleAddNew}
              className="bg-gray-900 hover:bg-gray-800 text-white px-5 py-2 rounded-md font-medium transition-colors shadow-sm"
            >
              + Add Notice
            </button>
          )}
        </div>
      </header>

      
      <main className="max-w-5xl mx-auto px-4 py-8">
        {error && (
          <div className="bg-red-100 text-red-700 p-4 rounded-md mb-6 shadow-sm border border-red-200">
            Error: {error}
          </div>
        )}

        
        {showForm ? (
          <div className="max-w-2xl mx-auto">
            <NoticeForm 
              initialData={editingNotice} 
              onSuccess={handleFormSuccess} 
              onCancel={handleFormCancel} 
            />
          </div>
        ) : (
          <>
            {loading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-gray-900"></div>
              </div>
            ) : notices.length === 0 ? (
              <div className="text-center py-20 bg-white rounded-lg border border-gray-200 border-dashed">
                <p className="text-gray-500 mb-4">No notices found.</p>
                <button onClick={handleAddNew} className="text-blue-600 hover:underline font-medium">Create the first notice</button>
              </div>
            ) : (
             
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {notices.map((notice) => (
                  <NoticeCard 
                    key={notice.id} 
                    notice={notice} 
                    onEdit={handleEdit} 
                    onDelete={handleDelete} 
                  />
                ))}
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
}