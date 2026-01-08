import React, { useState, useEffect } from 'react';
import './index.css'


const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api/contacts';

function App() {
  const [contacts, setContacts] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      setContacts(data);
    } catch (error) {
      console.error('Error fetching contacts:', error);
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone is required';
    } else if (!/^\d{10}$/.test(formData.phone.replace(/\D/g, ''))) {
      newErrors.phone = 'Phone must be 10 digits';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    try {
      await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      setFormData({
        name: '',
        email: '',
        phone: '',
        message: ''
      });
      
      setSuccessMessage('Contact added successfully!');
      setTimeout(() => setSuccessMessage(''), 5000);
      
      fetchContacts();
    } catch (error) {
      console.error('Error adding contact:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
      });
      fetchContacts();
    } catch (error) {
      console.error('Error deleting contact:', error);
    }
  };

  const isFormValid = () => {
    return formData.name.trim() && 
           formData.email.trim() && 
           /\S+@\S+\.\S+/.test(formData.email) &&
           formData.phone.trim() &&
           /^\d{10}$/.test(formData.phone.replace(/\D/g, ''));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white mb-3 tracking-tight">
            Contact Manager
          </h1>
          <p className="text-blue-200 text-lg">Streamline your contact management</p>
        </div>

        <div className="grid lg:grid-cols-[400px_1fr] gap-6">
          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-8 shadow-2xl h-fit">
            <h2 className="text-2xl font-bold text-white mb-6">Add Contact</h2>
            
            {successMessage && (
              <div className="bg-blue-500/20 border border-blue-400 text-blue-200 px-4 py-3 rounded-lg mb-6 text-center font-medium">
                {successMessage}
              </div>
            )}

            <div className="space-y-5">
              <div>
                <label className="block text-sm font-semibold text-slate-200 mb-2">
                  Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 bg-slate-900/50 border ${errors.name ? 'border-red-500' : 'border-slate-600'} rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all`}
                  placeholder="Adarsh Nagar"
                />
                {errors.name && <p className="text-red-400 text-sm mt-1">{errors.name}</p>}
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-200 mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 bg-slate-900/50 border ${errors.email ? 'border-red-500' : 'border-slate-600'} rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all`}
                  placeholder="adarsh@example.com"
                />
                {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email}</p>}
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-200 mb-2">
                  Phone *
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 bg-slate-900/50 border ${errors.phone ? 'border-red-500' : 'border-slate-600'} rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all`}
                  placeholder="1234567890"
                />
                {errors.phone && <p className="text-red-400 text-sm mt-1">{errors.phone}</p>}
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-200 mb-2">
                  Message
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-slate-900/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all resize-none"
                  placeholder="Additional notes..."
                  rows="3"
                />
              </div>

              <button 
                onClick={handleSubmit}
                disabled={!isFormValid()}
                className="w-full py-3 bg-gradient-to-r from-blue-600 to-blue-500 text-white font-semibold rounded-lg hover:from-blue-500 hover:to-blue-400 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-blue-500/30 hover:-translate-y-0.5"
              >
                Add Contact
              </button>
            </div>
          </div>

          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-8 shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white">Contacts</h2>
              <span className="bg-blue-500/20 text-blue-300 px-4 py-1 rounded-full text-sm font-semibold">
                {contacts.length}
              </span>
            </div>
            
            {contacts.length === 0 ? (
              <div className="text-center py-16">
                <div className="text-slate-400 text-lg">No contacts yet</div>
                <p className="text-slate-500 mt-2">Add your first contact to get started</p>
              </div>
            ) : (
              <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
                {contacts.map(contact => (
                  <div key={contact._id} className="bg-slate-900/50 border border-slate-700 rounded-xl p-6 hover:border-blue-500/50 transition-all duration-200 relative group">
                    <button 
                      onClick={() => handleDelete(contact._id)}
                      className="absolute top-4 right-4 bg-red-500/20 hover:bg-red-500 text-red-400 hover:text-white px-3 py-1 rounded-lg text-sm font-medium transition-all duration-200"
                    >
                      Delete
                    </button>
                    <h3 className="text-xl font-bold text-white mb-3 pr-20">{contact.name}</h3>
                    <div className="space-y-2 text-sm">
                      <p className="text-slate-300">
                        <span className="text-blue-400 font-semibold">Email:</span> {contact.email}
                      </p>
                      <p className="text-slate-300">
                        <span className="text-blue-400 font-semibold">Phone:</span> {contact.phone}
                      </p>
                      {contact.message && (
                        <p className="text-slate-300 mt-3 pt-3 border-t border-slate-700">
                          <span className="text-blue-400 font-semibold">Message:</span> {contact.message}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;