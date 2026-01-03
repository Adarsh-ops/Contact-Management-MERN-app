import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const API_URL = 'http://localhost:5000/api/contacts';

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
      const response = await axios.get(API_URL);
      setContacts(response.data);
    } catch (error) {
      console.error('Error fetching contacts:', error);
    }
  };

  // Validation
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
      await axios.post(API_URL, formData);
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        message: ''
      });
      
      // Show success message
      setSuccessMessage('Contact added successfully!');
      setTimeout(() => setSuccessMessage(''), 5000);
      
      // Refresh contacts list
      fetchContacts();
    } catch (error) {
      console.error('Error adding contact:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
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
    <div className="container">
      <div className="app-header">
        <h1>Contact Management System</h1>
        <p>Manage your contacts efficiently</p>
      </div>

      <div className="content-wrapper">
        {/* Contact Form */}
        <div className="form-card">
          <h2>Add New Contact</h2>
          
          {successMessage && (
            <div className="success-message">{successMessage}</div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Name *</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={errors.name ? 'input-error' : ''}
                placeholder="Enter full name"
              />
              {errors.name && <div className="error">{errors.name}</div>}
            </div>

            <div className="form-group">
              <label>Email *</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={errors.email ? 'input-error' : ''}
                placeholder="Enter email address"
              />
              {errors.email && <div className="error">{errors.email}</div>}
            </div>

            <div className="form-group">
              <label>Phone *</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className={errors.phone ? 'input-error' : ''}
                placeholder="Enter 10-digit phone number"
              />
              {errors.phone && <div className="error">{errors.phone}</div>}
            </div>

            <div className="form-group">
              <label>Message (Optional)</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Enter any additional message"
              />
            </div>

            <button 
              type="submit" 
              className="submit-btn"
              disabled={!isFormValid()}
            >
              Add Contact
            </button>
          </form>
        </div>

        <div className="contacts-card">
          <h2>Contacts List ({contacts.length})</h2>
          
          {contacts.length === 0 ? (
            <div className="no-contacts">
              <p>No contacts yet. Add your first contact!</p>
            </div>
          ) : (
            <div className="contacts-list">
              {contacts.map(contact => (
                <div key={contact._id} className="contact-item">
                  <button 
                    className="delete-btn"
                    onClick={() => handleDelete(contact._id)}
                  >
                    Delete
                  </button>
                  <h3>{contact.name}</h3>
                  <p><strong>Email:</strong> {contact.email}</p>
                  <p><strong>Phone:</strong> {contact.phone}</p>
                  {contact.message && (
                    <p><strong>Message:</strong> {contact.message}</p>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;