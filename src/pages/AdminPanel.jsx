import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  loginAdmin,
  getWebsites,
  createWebsite,
  updateWebsite,
  deleteWebsite,
  getSalesInfo,
  createSalesInfo,
  updateSalesInfo,
  deleteSalesInfo,
  getCars,
  createCar,
  updateCar,
  deleteCar,
  getTestimonials,
  createTestimonial,
  updateTestimonial,
  deleteTestimonial,
  getFaqs,
  createFaq,
  updateFaq,
  deleteFaq,
  getAdmins,
  createAdmin,
  updateAdmin,
  deleteAdmin,
} from '../api';
import { MagnifyingGlassIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/outline';

const AdminPanel = () => {
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [data, setData] = useState([]);
  const [formData, setFormData] = useState({});
  const [editingId, setEditingId] = useState(null);
  const [selectedWebsiteId, setSelectedWebsiteId] = useState(null);
  const [websites, setWebsites] = useState([]);
  const [imagePreview, setImagePreview] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const section = location.pathname.split('/admin/')[1] || 'dashboard';

  useEffect(() => {
    if (token) {
      fetchWebsites();
      if (section !== 'dashboard') {
        fetchSectionData();
      }
    }
  }, [token, section, selectedWebsiteId]);

  const fetchWebsites = async () => {
    try {
      const websites = await getWebsites();
      setWebsites(websites);
      if (websites.length > 0 && !selectedWebsiteId) {
        setSelectedWebsiteId(websites[0].id);
      }
    } catch (err) {
      setError('Failed to fetch websites: ' + err);
    }
  };

  const fetchSectionData = async () => {
    try {
      let response;
      switch (section) {
        case 'websites':
          response = await getWebsites();
          break;
        case 'sales_info':
          response = await getSalesInfo(selectedWebsiteId);
          break;
        case 'cars':
          response = await getCars(selectedWebsiteId);
          break;
        case 'testimonials':
          response = await getTestimonials(selectedWebsiteId);
          break;
        case 'faqs':
          response = await getFaqs(selectedWebsiteId);
          break;
        case 'admins':
          response = await getAdmins();
          break;
        default:
          response = [];
      }
      setData(response);
    } catch (err) {
      setError('Failed to fetch data: ' + err);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const data = await loginAdmin(username, password);
      localStorage.setItem('token', data.token);
      setToken(data.token);
      setError('');
      navigate('/admin');
    } catch (err) {
      setError(err || 'Login failed');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken('');
    setData([]);
    setSelectedWebsiteId(null);
    navigate('/admin');
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, image_url: file });
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePriceChange = (e) => {
    const rawValue = e.target.value.replace(/[^0-9]/g, '');
    setFormData({ ...formData, price: rawValue });
  };

  const formatPrice = (value) => {
    if (!value) return '';
    const numberValue = parseInt(value, 10);
    return `Rp ${numberValue.toLocaleString('id-ID')}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let response;
      if (section === 'websites') {
        const dataToSend = { domain: formData.domain, name: formData.name };
        response = editingId
          ? await updateWebsite(editingId, dataToSend)
          : await createWebsite(dataToSend);
      } else if (section === 'sales_info') {
        const dataToSend = new FormData();
        const dataWithWebsiteId = { ...formData, website_id: selectedWebsiteId };
        Object.keys(dataWithWebsiteId).forEach((key) => {
          if (key === 'image_url' && dataWithWebsiteId[key] instanceof File) {
            dataToSend.append(key, dataWithWebsiteId[key]);
          } else {
            dataToSend.append(key, dataWithWebsiteId[key] || '');
          }
        });
        response = editingId
          ? await updateSalesInfo(editingId, dataToSend)
          : await createSalesInfo(dataToSend);
      } else if (section === 'cars') {
        const dataToSend = new FormData();
        const featuresArray = formData.features
          ? formData.features.split(',').map((item) => item.trim())
          : [];
        const specsObject = formData.specs
          ? formData.specs.split(';').reduce((acc, item) => {
              const [key, value] = item.split(':').map((part) => part.trim());
              if (key && value) acc[key] = value;
              return acc;
            }, {})
          : {};
        const dataWithWebsiteId = {
          ...formData,
          website_id: selectedWebsiteId,
          features: featuresArray,
          specs: specsObject,
          price: formData.price ? parseInt(formData.price, 10) : 0,
        };
        Object.keys(dataWithWebsiteId).forEach((key) => {
          if (key === 'features' || key === 'specs') {
            dataToSend.append(key, JSON.stringify(dataWithWebsiteId[key]));
          } else {
            dataToSend.append(key, dataWithWebsiteId[key] || '');
          }
        });
        response = editingId
          ? await updateCar(editingId, dataToSend)
          : await createCar(dataToSend);
      } else if (section === 'testimonials') {
        const dataToSend = new FormData();
        const dataWithWebsiteId = { ...formData, website_id: selectedWebsiteId };
        Object.keys(dataWithWebsiteId).forEach((key) => {
          if (key === 'image_url' && dataWithWebsiteId[key] instanceof File) {
            dataToSend.append(key, dataWithWebsiteId[key]);
          } else {
            dataToSend.append(key, dataWithWebsiteId[key] || '');
          }
        });
        response = editingId
          ? await updateTestimonial(editingId, dataToSend)
          : await createTestimonial(dataToSend);
      } else if (section === 'faqs') {
        const dataWithWebsiteId = { ...formData, website_id: selectedWebsiteId };
        response = editingId
          ? await updateFaq(editingId, dataWithWebsiteId)
          : await createFaq(dataWithWebsiteId);
      } else if (section === 'admins') {
        response = editingId
          ? await updateAdmin(editingId, formData)
          : await createAdmin(formData);
      }
      if (!response) throw new Error('No response from server');
      setFormData({});
      setEditingId(null);
      setImagePreview(null);
      fetchSectionData();
    } catch (err) {
      setError('Failed to save data: ' + err.message);
      console.error('Submission error:', err);
    }
  };

  const handleEdit = (item) => {
    const formattedItem = {
      ...item,
      features: item.features ? item.features.join(', ') : '',
      specs: item.specs
        ? Object.entries(item.specs)
            .map(([key, value]) => `${key}: ${value}`)
            .join('; ')
        : '',
      price: item.price ? item.price.toString() : '',
      image_url: item.image_url || '',
    };
    setFormData(formattedItem);
    setEditingId(item.id);
    if (item.image_url) {
      setImagePreview(
        `${import.meta.env.VITE_API_URL || 'http://localhost:5000'}${item.image_url}?t=${new Date().getTime()}`
      );
    } else {
      setImagePreview(null);
    }
  };

  const handleDelete = async (id) => {
    try {
      if (section === 'websites') {
        await deleteWebsite(id);
      } else if (section === 'sales_info') {
        await deleteSalesInfo(id);
      } else if (section === 'cars') {
        await deleteCar(id);
      } else if (section === 'testimonials') {
        await deleteTestimonial(id);
      } else if (section === 'faqs') {
        await deleteFaq(id);
      } else if (section === 'admins') {
        await deleteAdmin(id);
      }
      fetchSectionData();
    } catch (err) {
      setError('Failed to delete data: ' + err);
    }
  };

  const filteredData = useMemo(() => {
    if (!searchTerm) return data;
    return data.filter((item) => {
      const searchLower = searchTerm.toLowerCase();
      switch (section) {
        case 'websites':
          return (
            item.domain.toLowerCase().includes(searchLower) ||
            item.name.toLowerCase().includes(searchLower)
          );
        case 'sales_info':
          return (
            item.name.toLowerCase().includes(searchLower) ||
            item.phone.toLowerCase().includes(searchLower) ||
            (item.location && item.location.toLowerCase().includes(searchLower))
          );
        case 'cars':
          return (
            item.name.toLowerCase().includes(searchLower) ||
            item.variant.toLowerCase().includes(searchLower) ||
            item.price.toString().includes(searchLower)
          );
        case 'testimonials':
          return (
            item.name.toLowerCase().includes(searchLower) ||
            item.car.toLowerCase().includes(searchLower) ||
            item.stars.toString().includes(searchLower)
          );
        case 'faqs':
          return item.question.toLowerCase().includes(searchLower);
        case 'admins':
          return item.username.toLowerCase().includes(searchLower);
        default:
          return true;
      }
    });
  }, [data, searchTerm, section]);

  const renderForm = () => {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {section === 'websites' && (
          <>
            <div>
              <label className="block text-gray-700 font-medium mb-1">Domain</label>
              <input
                type="text"
                name="domain"
                value={formData.domain || ''}
                onChange={handleFormChange}
                placeholder="Enter domain"
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-1">Website Name</label>
              <input
                type="text"
                name="name"
                value={formData.name || ''}
                onChange={handleFormChange}
                placeholder="Enter website name"
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          </>
        )}
        {section === 'sales_info' && (
          <>
            <div>
              <label className="block text-gray-700 font-medium mb-1">Website</label>
              <select
                name="website_id"
                value={selectedWebsiteId || ''}
                onChange={(e) => setSelectedWebsiteId(e.target.value)}
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">Select Website</option>
                {websites.map((website) => (
                  <option key={website.id} value={website.id}>
                    {website.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-1">Sales Name</label>
              <input
                type="text"
                name="name"
                value={formData.name || ''}
                onChange={handleFormChange}
                placeholder="Enter sales name"
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-1">Phone</label>
              <input
                type="text"
                name="phone"
                value={formData.phone || ''}
                onChange={handleFormChange}
                placeholder="Enter phone number"
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-1">Location</label>
              <input
                type="text"
                name="location"
                value={formData.location || ''}
                onChange={handleFormChange}
                placeholder="Enter location"
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-1">Image</label>
              <input
                type="file"
                name="image_url"
                onChange={handleImageChange}
                className="w-full p-3 border rounded-lg"
                accept="image/*"
              />
              {imagePreview && (
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="mt-2 w-24 h-24 object-cover rounded-lg"
                />
              )}
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-1">Instagram URL</label>
              <input
                type="text"
                name="instagram_url"
                value={formData.instagram_url || ''}
                onChange={handleFormChange}
                placeholder="Enter Instagram URL"
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-1">TikTok URL</label>
              <input
                type="text"
                name="tiktok_url"
                value={formData.tiktok_url || ''}
                onChange={handleFormChange}
                placeholder="Enter TikTok URL"
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </>
        )}
        {section === 'cars' && (
          <>
            <div>
              <label className="block text-gray-700 font-medium mb-1">Website</label>
              <select
                name="website_id"
                value={selectedWebsiteId || ''}
                onChange={(e) => setSelectedWebsiteId(e.target.value)}
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">Select Website</option>
                {websites.map((website) => (
                  <option key={website.id} value={website.id}>
                    {website.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-1">Slug</label>
              <input
                type="text"
                name="slug"
                value={formData.slug || ''}
                onChange={handleFormChange}
                placeholder="Enter slug"
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-1">Car Name</label>
              <input
                type="text"
                name="name"
                value={formData.name || ''}
                onChange={handleFormChange}
                placeholder="Enter car name"
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-1">Variant</label>
              <input
                type="text"
                name="variant"
                value={formData.variant || ''}
                onChange={handleFormChange}
                placeholder="Enter variant"
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-1">Image</label>
              <input
                type="file"
                name="image_url"
                onChange={handleImageChange}
                className="w-full p-3 border rounded-lg"
                accept="image/*"
              />
              {imagePreview && (
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="mt-2 w-24 h-24 object-cover rounded-lg"
                />
              )}
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-1">Price (Rp)</label>
              <input
                type="text"
                name="price"
                value={formatPrice(formData.price)}
                onChange={handlePriceChange}
                placeholder="Enter price (e.g., 560000000)"
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-1">Promo</label>
              <input
                type="text"
                name="promo"
                value={formData.promo || ''}
                onChange={handleFormChange}
                placeholder="Enter promo"
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-1">Type</label>
              <input
                type="text"
                name="type"
                value={formData.type || ''}
                onChange={handleFormChange}
                placeholder="Enter type"
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-gray-700 font-medium mb-1">Description</label>
              <input
                type="text"
                name="description"
                value={formData.description || ''}
                onChange={handleFormChange}
                placeholder="Enter description"
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-gray-700 font-medium mb-1">Features (comma-separated)</label>
              <textarea
                name="features"
                value={formData.features || ''}
                onChange={handleFormChange}
                placeholder="Enter features (e.g., ABS, Airbag, Sunroof)"
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-gray-700 font-medium mb-1">Specs (key:value;key:value)</label>
              <textarea
                name="specs"
                value={formData.specs || ''}
                onChange={handleFormChange}
                placeholder="Enter specs (e.g., engine:2.0L;transmission:Automatic)"
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </>
        )}
        {section === 'testimonials' && (
          <>
            <div>
              <label className="block text-gray-700 font-medium mb-1">Website</label>
              <select
                name="website_id"
                value={selectedWebsiteId || ''}
                onChange={(e) => setSelectedWebsiteId(e.target.value)}
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">Select Website</option>
                {websites.map((website) => (
                  <option key={website.id} value={website.id}>
                    {website.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-1">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name || ''}
                onChange={handleFormChange}
                placeholder="Enter name"
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-1">Image</label>
              <input
                type="file"
                name="image_url"
                onChange={handleImageChange}
                className="w-full p-3 border rounded-lg"
                accept="image/*"
              />
              {imagePreview && (
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="mt-2 w-24 h-24 object-cover rounded-lg"
                />
              )}
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-1">Car</label>
              <input
                type="text"
                name="car"
                value={formData.car || ''}
                onChange={handleFormChange}
                placeholder="Enter car"
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-1">Stars (1-5)</label>
              <input
                type="number"
                name="stars"
                value={formData.stars || ''}
                onChange={handleFormChange}
                placeholder="Enter stars (1-5)"
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                min="1"
                max="5"
                required
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-gray-700 font-medium mb-1">Testimonial Text</label>
              <textarea
                name="text"
                value={formData.text || ''}
                onChange={handleFormChange}
                placeholder="Enter testimonial text"
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          </>
        )}
        {section === 'faqs' && (
          <>
            <div>
              <label className="block text-gray-700 font-medium mb-1">Website</label>
              <select
                name="website_id"
                value={selectedWebsiteId || ''}
                onChange={(e) => setSelectedWebsiteId(e.target.value)}
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">Select Website</option>
                {websites.map((website) => (
                  <option key={website.id} value={website.id}>
                    {website.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="md:col-span-2">
              <label className="block text-gray-700 font-medium mb-1">Question</label>
              <input
                type="text"
                name="question"
                value={formData.question || ''}
                onChange={handleFormChange}
                placeholder="Enter question"
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-gray-700 font-medium mb-1">Answer</label>
              <textarea
                name="answer"
                value={formData.answer || ''}
                onChange={handleFormChange}
                placeholder="Enter answer"
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          </>
        )}
        {section === 'admins' && (
          <>
            <div>
              <label className="block text-gray-700 font-medium mb-1">Website</label>
              <select
                name="website_id"
                value={formData.website_id || ''}
                onChange={handleFormChange}
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">Select Website</option>
                {websites.map((website) => (
                  <option key={website.id} value={website.id}>
                    {website.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-1">Username</label>
              <input
                type="text"
                name="username"
                value={formData.username || ''}
                onChange={handleFormChange}
                placeholder="Enter username"
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-1">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password || ''}
                onChange={handleFormChange}
                placeholder="Enter password"
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                required={!editingId}
              />
            </div>
          </>
        )}
      </div>
    );
  };

  const renderTableHeaders = () => {
    switch (section) {
      case 'websites':
        return ['ID', 'Domain', 'Name', 'Actions'];
      case 'sales_info':
        return ['ID', 'Name', 'Phone', 'Location', 'Image', 'Actions'];
      case 'cars':
        return ['ID', 'Name', 'Variant', 'Price', 'Image', 'Actions'];
      case 'testimonials':
        return ['ID', 'Name', 'Car', 'Stars', 'Image', 'Actions'];
      case 'faqs':
        return ['ID', 'Question', 'Actions'];
      case 'admins':
        return ['ID', 'Username', 'Actions'];
      default:
        return [];
    }
  };

  const renderTableRows = () => {
    return filteredData.map((item) => (
      <tr key={item.id} className="border-b hover:bg-gray-50 transition-colors">
        <td className="p-4">{item.id}</td>
        {section === 'websites' && (
          <>
            <td className="p-4">{item.domain}</td>
            <td className="p-4">{item.name}</td>
          </>
        )}
        {section === 'sales_info' && (
          <>
            <td className="p-4">{item.name}</td>
            <td className="p-4">{item.phone}</td>
            <td className="p-4">{item.location || '-'}</td>
            <td className="p-4">
              {item.image_url ? (
                <img
                  src={`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}${item.image_url}?t=${new Date().getTime()}`}
                  alt="Image"
                  className="w-12 h-12 object-cover rounded-lg"
                  onError={() => console.error(`Failed to load image: ${item.image_url}`)}
                />
              ) : (
                <span className="text-gray-500">No image</span>
              )}
            </td>
          </>
        )}
        {section === 'cars' && (
          <>
            <td className="p-4">{item.name}</td>
            <td className="p-4">{item.variant}</td>
            <td className="p-4">{formatPrice(item.price)}</td>
            <td className="p-4">
              {item.image_url ? (
                <img
                  src={`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}${item.image_url}?t=${new Date().getTime()}`}
                  alt="Image"
                  className="w-12 h-12 object-cover rounded-lg"
                  onError={() => console.error(`Failed to load image: ${item.image_url}`)}
                />
              ) : (
                <span className="text-gray-500">No image</span>
              )}
            </td>
          </>
        )}
        {section === 'testimonials' && (
          <>
            <td className="p-4">{item.name}</td>
            <td className="p-4">{item.car}</td>
            <td className="p-4">{item.stars}</td>
            <td className="p-4">
              {item.image_url ? (
                <img
                  src={`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}${item.image_url}?t=${new Date().getTime()}`}
                  alt="Image"
                  className="w-12 h-12 object-cover rounded-lg"
                  onError={() => console.error(`Failed to load image: ${item.image_url}`)}
                />
              ) : (
                <span className="text-gray-500">No image</span>
              )}
            </td>
          </>
        )}
        {section === 'faqs' && (
          <>
            <td className="p-4">{item.question}</td>
          </>
        )}
        {section === 'admins' && (
          <>
            <td className="p-4">{item.username}</td>
          </>
        )}
        <td className="p-4 flex space-x-2">
          <button
            onClick={() => handleEdit(item)}
            className="p-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors"
            title="Edit"
          >
            <PencilIcon className="w-5 h-5" />
          </button>
          <button
            onClick={() => handleDelete(item.id)}
            className="p-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
            title="Delete"
          >
            <TrashIcon className="w-5 h-5" />
          </button>
        </td>
      </tr>
    ));
  };

  if (!token) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">Admin Login</h2>
          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-1">Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-1">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Login
            </button>
            {error && <p className="text-red-500 mt-4 text-center">{error}</p>}
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      <div className="w-64 bg-gray-800 text-white fixed h-full shadow-xl">
        <div className="p-6">
          <h2 className="text-xl font-bold mb-6">Admin Panel</h2>
          <nav>
            <ul>
              {[
                { path: '/admin', label: 'Dashboard', key: 'dashboard' },
                { path: '/admin/websites', label: 'Websites', key: 'websites' },
                { path: '/admin/sales_info', label: 'Sales Info', key: 'sales_info' },
                { path: '/admin/cars', label: 'Cars', key: 'cars' },
                { path: '/admin/testimonials', label: 'Testimonials', key: 'testimonials' },
                { path: '/admin/faqs', label: 'FAQs', key: 'faqs' },
                { path: '/admin/admins', label: 'Admins', key: 'admins' },
              ].map((item) => (
                <li key={item.key} className="mb-2">
                  <a
                    href={item.path}
                    className={`block p-3 rounded-lg transition-colors ${
                      section === item.key ? 'bg-gray-700' : 'hover:bg-gray-700'
                    }`}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <button
            onClick={handleLogout}
            className="w-full bg-red-600 text-white p-3 rounded-lg mt-6 hover:bg-red-700 transition-colors"
          >
            Logout
          </button>
        </div>
      </div>

      <div className="ml-64 p-6 flex-1 overflow-auto">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-800">
            Admin Panel - {section.charAt(0).toUpperCase() + section.slice(1)}
          </h2>
          {error && <p className="text-red-500 mt-2">{error}</p>}
        </div>

        {section !== 'dashboard' && (
          <div className="mb-8">
            <h3 className="text-xl font-bold text-gray-800 mb-4">
              {editingId ? 'Edit' : 'Add'} Data
            </h3>
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg">
              {renderForm()}
              <div className="mt-6 flex space-x-4">
                <button
                  type="submit"
                  className="bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  {editingId ? 'Update' : 'Save'}
                </button>
                {editingId && (
                  <button
                    type="button"
                    onClick={() => {
                      setFormData({});
                      setEditingId(null);
                      setImagePreview(null);
                    }}
                    className="bg-gray-600 text-white p-3 rounded-lg hover:bg-gray-700 transition-colors"
                  >
                    Cancel
                  </button>
                )}
              </div>
            </form>
          </div>
        )}

        {section !== 'dashboard' && (
          <div>
            <h3 className="text-xl font-bold text-gray-800 mb-4">Data List</h3>
            <div className="mb-4 flex space-x-4">
              <div className="relative flex-1">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search..."
                  className="w-full p-3 pl-10 border rounded-lg focus:ring-2 focus:ring-blue-500"
                />
                <MagnifyingGlassIcon className="w-5 h-5 absolute left-3 top-3.5 text-gray-400" />
              </div>
              {['sales_info', 'cars', 'testimonials', 'faqs'].includes(section) && (
                <select
                  value={selectedWebsiteId || ''}
                  onChange={(e) => setSelectedWebsiteId(e.target.value)}
                  className="p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">All Websites</option>
                  {websites.map((website) => (
                    <option key={website.id} value={website.id}>
                      {website.name}
                    </option>
                  ))}
                </select>
              )}
            </div>
            {filteredData.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full bg-white rounded-lg shadow-lg">
                  <thead>
                    <tr className="bg-gray-100 text-gray-700">
                      {renderTableHeaders().map((header) => (
                        <th key={header} className="p-4 text-left font-medium">
                          {header}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>{renderTableRows()}</tbody>
                </table>
              </div>
            ) : (
              <p className="text-gray-600">No data found.</p>
            )}
          </div>
        )}

        {section === 'dashboard' && (
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Dashboard</h3>
            <p className="text-gray-600 mb-4">
              Welcome to the Admin Panel. Select an option to manage data:
            </p>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { path: '/admin/websites', label: 'Manage Websites' },
                { path: '/admin/sales_info', label: 'Manage Sales Info' },
                { path: '/admin/cars', label: 'Manage Cars' },
                { path: '/admin/testimonials', label: 'Manage Testimonials' },
                { path: '/admin/faqs', label: 'Manage FAQs' },
                { path: '/admin/admins', label: 'Manage Admins' },
              ].map((item) => (
                <li key={item.path}>
                  <a
                    href={item.path}
                    className="block p-4 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPanel;