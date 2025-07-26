import React, { useState } from 'react';
import { MapPin, Package, Calendar, DollarSign } from 'lucide-react';

interface DeliveryFormProps {
  onSubmit: () => void;
}

export function DeliveryForm({ onSubmit }: DeliveryFormProps) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    itemType: '',
    size: 'small' as 'small' | 'medium' | 'large',
    weight: '',
    pickupAddress: '',
    dropoffAddress: '',
    preferredDate: '',
    urgency: 'medium' as 'low' | 'medium' | 'high',
    budget: '',
    specialInstructions: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};
    if (!formData.title.trim()) newErrors.title = 'Title is required';
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    if (!formData.pickupAddress.trim()) newErrors.pickupAddress = 'Pickup address is required';
    if (!formData.dropoffAddress.trim()) newErrors.dropoffAddress = 'Drop-off address is required';
    if (!formData.budget) newErrors.budget = 'Budget is required';

    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      console.log('Submitting delivery request:', formData);
      onSubmit();
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8" id="main-content">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Post a Delivery Request</h1>
        <p className="text-gray-400">
          Provide details about your item and where it needs to go. The more information you provide, 
          the better we can match you with the right traveler.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Basic Information */}
        <div className="bg-dark-800 p-6 rounded-lg shadow-md border border-dark-700">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
            <Package className="h-5 w-5 mr-2" />
            Item Information
          </h3>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-300 mb-1">
                Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="title"
                className={`w-full px-3 py-2 bg-dark-700 text-white border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.title ? 'border-red-500' : 'border-dark-600'
                }`}
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              />
              {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
            </div>

            <div>
              <label htmlFor="itemType" className="block text-sm font-medium text-gray-300 mb-1">
                Item Type
              </label>
              <select
                id="itemType"
                className="w-full px-3 py-2 bg-dark-700 text-white border border-dark-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={formData.itemType}
                onChange={(e) => setFormData({ ...formData, itemType: e.target.value })}
              >
                <option value="">Select item type</option>
                <option value="electronics">Electronics</option>
                <option value="documents">Documents</option>
                <option value="clothing">Clothing</option>
                <option value="food">Food & Beverages</option>
                <option value="books">Books</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div className="md:col-span-2">
              <label htmlFor="description" className="block text-sm font-medium text-gray-300 mb-1">
                Description <span className="text-red-500">*</span>
              </label>
              <textarea
                id="description"
                rows={3}
                className={`w-full px-3 py-2 bg-dark-700 text-white border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.description ? 'border-red-500' : 'border-dark-600'
                }`}
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              />
              {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
            </div>

            <div>
              <label htmlFor="size" className="block text-sm font-medium text-gray-300 mb-1">
                Size
              </label>
              <select
                id="size"
                className="w-full px-3 py-2 bg-dark-700 text-white border border-dark-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={formData.size}
                onChange={(e) => setFormData({ ...formData, size: e.target.value as 'small' | 'medium' | 'large' })}
              >
                <option value="small">Small (fits in a bag)</option>
                <option value="medium">Medium (fits in a backpack)</option>
                <option value="large">Large (requires car space)</option>
              </select>
            </div>

            <div>
              <label htmlFor="weight" className="block text-sm font-medium text-gray-300 mb-1">
                Approximate Weight (lbs)
              </label>
              <input
                type="number"
                id="weight"
                className="w-full px-3 py-2 bg-dark-700 text-white border border-dark-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={formData.weight}
                onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
              />
            </div>
          </div>
        </div>

        {/* Location Information */}
        <div className="bg-dark-800 p-6 rounded-lg shadow-md border border-dark-700">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
            <MapPin className="h-5 w-5 mr-2" />
            Pickup & Drop-off Locations
          </h3>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="pickupAddress" className="block text-sm font-medium text-gray-300 mb-1">
                Pickup Address <span className="text-red-500">*</span>
              </label>
              <textarea
                id="pickupAddress"
                rows={3}
                className={`w-full px-3 py-2 bg-dark-700 text-white border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.pickupAddress ? 'border-red-500' : 'border-dark-600'
                }`}
                value={formData.pickupAddress}
                onChange={(e) => setFormData({ ...formData, pickupAddress: e.target.value })}
              />
              {errors.pickupAddress && <p className="text-red-500 text-sm mt-1">{errors.pickupAddress}</p>}
            </div>

            <div>
              <label htmlFor="dropoffAddress" className="block text-sm font-medium text-gray-300 mb-1">
                Drop-off Address <span className="text-red-500">*</span>
              </label>
              <textarea
                id="dropoffAddress"
                rows={3}
                className={`w-full px-3 py-2 bg-dark-700 text-white border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.dropoffAddress ? 'border-red-500' : 'border-dark-600'
                }`}
                value={formData.dropoffAddress}
                onChange={(e) => setFormData({ ...formData, dropoffAddress: e.target.value })}
              />
              {errors.dropoffAddress && <p className="text-red-500 text-sm mt-1">{errors.dropoffAddress}</p>}
            </div>
          </div>
        </div>

        {/* Timing & Budget */}
        <div className="bg-dark-800 p-6 rounded-lg shadow-md border border-dark-700">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
            <Calendar className="h-5 w-5 mr-2" />
            Timing & Budget
          </h3>

          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <label htmlFor="preferredDate" className="block text-sm font-medium text-gray-300 mb-1">
                Preferred Delivery Date
              </label>
              <input
                type="date"
                id="preferredDate"
                className="w-full px-3 py-2 bg-dark-700 text-white border border-dark-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={formData.preferredDate}
                onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                min={new Date().toISOString().split('T')[0]}
              />
            </div>

            <div>
              <label htmlFor="urgency" className="block text-sm font-medium text-gray-300 mb-1">
                Urgency Level
              </label>
              <select
                id="urgency"
                className="w-full px-3 py-2 bg-dark-700 text-white border border-dark-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={formData.urgency}
                onChange={(e) => setFormData({ ...formData, urgency: e.target.value as 'low' | 'medium' | 'high' })}
              >
                <option value="low">Low - Flexible timing</option>
                <option value="medium">Medium - Within a few days</option>
                <option value="high">High - ASAP</option>
              </select>
            </div>

            <div>
              <label htmlFor="budget" className="block text-sm font-medium text-gray-300 mb-1">
                Budget ($) <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="number"
                  id="budget"
                  className={`w-full pl-10 pr-3 py-2 bg-dark-700 text-white border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.budget ? 'border-red-500' : 'border-dark-600'
                  }`}
                  value={formData.budget}
                  onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                />
              </div>
              {errors.budget && <p className="text-red-500 text-sm mt-1">{errors.budget}</p>}
            </div>
          </div>
        </div>

        {/* Special Instructions */}
        <div className="bg-dark-800 p-6 rounded-lg shadow-md border border-dark-700">
          <h3 className="text-lg font-semibold text-white mb-4">Special Instructions (Optional)</h3>
          <textarea
            id="specialInstructions"
            rows={4}
            className="w-full px-3 py-2 bg-dark-700 text-white border border-dark-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={formData.specialInstructions}
            onChange={(e) => setFormData({ ...formData, specialInstructions: e.target.value })}
          />
        </div>

        {/* Submit Button */}
        <div className="flex justify-end space-x-4">
          <button
            type="button"
            className="px-6 py-2 border border-gray-400 text-white rounded-md hover:bg-dark-600 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500"
          >
            Save as Draft
          </button>
          <button
            type="submit"
            className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Post Delivery Request
          </button>
        </div>
      </form>
    </div>
  );
}
