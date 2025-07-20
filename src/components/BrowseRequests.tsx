import React, { useState } from 'react';
import { MapPin, Clock, DollarSign, Package, Filter, Search, Star, User } from 'lucide-react';
import type { DeliveryRequest } from '../types';

export function BrowseRequests() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterSize, setFilterSize] = useState('all');
  const [filterUrgency, setFilterUrgency] = useState('all');
  const [sortBy, setSortBy] = useState('newest');

  // Mock data for demonstration
  const requests: DeliveryRequest[] = [
    {
      id: '1',
      title: 'Laptop delivery to downtown office',
      description: 'MacBook Pro in original packaging. Needs to be delivered to 5th floor reception.',
      itemType: 'electronics',
      size: 'medium',
      weight: 3.5,
      pickupLocation: {
        address: '123 Residential St, San Francisco, CA 94102',
        lat: 37.7749,
        lng: -122.4194,
        city: 'San Francisco',
        state: 'CA',
        zipCode: '94102'
      },
      dropoffLocation: {
        address: '456 Business Ave, San Francisco, CA 94105',
        lat: 37.7849,
        lng: -122.4094,
        city: 'San Francisco',
        state: 'CA',
        zipCode: '94105'
      },
      requesterId: '1',
      requesterName: 'Yousef Johnson',
      requesterRating: 4.8,
      status: 'posted',
      budget: 25,
      preferredDate: '2025-01-25',
      urgency: 'medium',
      createdAt: '2025-01-22T10:30:00Z'
    },
    {
      id: '2',
      title: 'Art supplies for student',
      description: 'Canvas, paints, and brushes from art store to university dorm.',
      itemType: 'other',
      size: 'large',
      weight: 8,
      pickupLocation: {
        address: '789 Art Store Blvd, Berkeley, CA 94704',
        lat: 37.8715,
        lng: -122.2730,
        city: 'Berkeley',
        state: 'CA',
        zipCode: '94704'
      },
      dropoffLocation: {
        address: 'UC Berkeley Dorms, Berkeley, CA 94720',
        lat: 37.8715,
        lng: -122.2730,
        city: 'Berkeley',
        state: 'CA',
        zipCode: '94720'
      },
      requesterId: '2',
      requesterName: 'Hamad Chen',
      requesterRating: 4.9,
      status: 'posted',
      budget: 35,
      preferredDate: '2025-01-24',
      urgency: 'high',
      createdAt: '2025-01-22T14:15:00Z'
    },
    {
      id: '3',
      title: 'Important documents to law firm',
      description: 'Sealed envelope with legal documents. Must be delivered during business hours.',
      itemType: 'documents',
      size: 'small',
      weight: 0.5,
      pickupLocation: {
        address: '321 Home Ave, Palo Alto, CA 94301',
        lat: 37.4419,
        lng: -122.1430,
        city: 'Palo Alto',
        state: 'CA',
        zipCode: '94301'
      },
      dropoffLocation: {
        address: '654 Legal Plaza, San Jose, CA 95113',
        lat: 37.3382,
        lng: -121.8863,
        city: 'San Jose',
        state: 'CA',
        zipCode: '95113'
      },
      requesterId: '3',
      requesterName: 'Mohamed Rodriguez',
      requesterRating: 5.0,
      status: 'posted',
      budget: 40,
      preferredDate: '2025-01-23',
      urgency: 'high',
      createdAt: '2025-01-22T09:45:00Z'
    }
  ];

  const filteredRequests = requests.filter(request => {
    const matchesSearch = request.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         request.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSize = filterSize === 'all' || request.size === filterSize;
    const matchesUrgency = filterUrgency === 'all' || request.urgency === filterUrgency;
    
    return matchesSearch && matchesSize && matchesUrgency;
  });

  const sortedRequests = [...filteredRequests].sort((a, b) => {
    switch (sortBy) {
      case 'budget-high':
        return b.budget - a.budget;
      case 'budget-low':
        return a.budget - b.budget;
      case 'date':
        return new Date(a.preferredDate).getTime() - new Date(b.preferredDate).getTime();
      case 'urgency':
        const urgencyOrder = { high: 3, medium: 2, low: 1 };
        return urgencyOrder[b.urgency] - urgencyOrder[a.urgency];
      default: // newest
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    }
  });

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'high': return 'text-red-600 bg-red-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'low': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getSizeIcon = (size: string) => {
    switch (size) {
      case 'small': return '📦';
      case 'medium': return '📫';
      case 'large': return '🗳️';
      default: return '📦';
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8" id="main-content">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Browse Delivery Requests</h1>
        <p className="text-gray-400">
          Find delivery requests that match your travel route and earn money helping your community.
        </p>
      </div>

      {/* Filters and Search */}
      <div className="bg-dark-800 p-6 rounded-lg shadow-md border border-dark-700 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          <div className="lg:col-span-2">
            <label htmlFor="search" className="block text-sm font-medium text-gray-300 mb-1">
              Search Requests
            </label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
              <input
                type="text"
                id="search"
                className="w-full pl-10 pr-3 py-2 border border-dark-600 bg-dark-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Search by title or description..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <div>
            <label htmlFor="filterSize" className="block text-sm font-medium text-gray-300 mb-1">
              Size
            </label>
            <select
              id="filterSize"
              className="w-full px-3 py-2 border border-dark-600 bg-dark-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={filterSize}
              onChange={(e) => setFilterSize(e.target.value)}
            >
              <option value="all">All Sizes</option>
              <option value="small">Small</option>
              <option value="medium">Medium</option>
              <option value="large">Large</option>
            </select>
          </div>

          <div>
            <label htmlFor="filterUrgency" className="block text-sm font-medium text-gray-300 mb-1">
              Urgency
            </label>
            <select
              id="filterUrgency"
              className="w-full px-3 py-2 border border-dark-600 bg-dark-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={filterUrgency}
              onChange={(e) => setFilterUrgency(e.target.value)}
            >
              <option value="all">All Urgency</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
          </div>

          <div>
            <label htmlFor="sortBy" className="block text-sm font-medium text-gray-300 mb-1">
              Sort By
            </label>
            <select
              id="sortBy"
              className="w-full px-3 py-2 border border-dark-600 bg-dark-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="newest">Newest First</option>
              <option value="budget-high">Highest Budget</option>
              <option value="budget-low">Lowest Budget</option>
              <option value="date">Delivery Date</option>
              <option value="urgency">Most Urgent</option>
            </select>
          </div>
        </div>
      </div>

      {/* Results Count */}
      <div className="mb-6">
        <p className="text-gray-400">
          Showing {sortedRequests.length} of {requests.length} delivery requests
        </p>
      </div>

      {/* Request Cards */}
      <div className="space-y-6">
        {sortedRequests.map((request) => (
          <div key={request.id} className="bg-dark-800 rounded-lg shadow-md border border-dark-700 p-6 hover:shadow-lg transition-shadow">
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between">
              <div className="flex-1 mb-4 lg:mb-0 lg:mr-6">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-1">{request.title}</h3>
                    <div className="flex items-center space-x-4 text-sm text-gray-400">
                      <span className="flex items-center">
                        <User className="h-4 w-4 mr-1" />
                        {request.requesterName}
                      </span>
                      <span className="flex items-center">
                        <Star className="h-4 w-4 mr-1 text-yellow-400" />
                        {request.requesterRating}
                      </span>
                      <span className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        {new Date(request.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getUrgencyColor(request.urgency)}`}>
                      {request.urgency.toUpperCase()}
                    </span>
                    <span className="text-2xl">{getSizeIcon(request.size)}</span>
                  </div>
                </div>

                <p className="text-gray-300 mb-4">{request.description}</p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <h4 className="font-medium text-white mb-1 flex items-center">
                      <MapPin className="h-4 w-4 mr-1 text-green-400" />
                      Pickup
                    </h4>
                    <p className="text-sm text-gray-400">{request.pickupLocation.address}</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-white mb-1 flex items-center">
                      <MapPin className="h-4 w-4 mr-1 text-red-400" />
                      Drop-off
                    </h4>
                    <p className="text-sm text-gray-400">{request.dropoffLocation.address}</p>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400">
                  <span className="flex items-center">
                    <Package className="h-4 w-4 mr-1" />
                    {request.size} ({request.weight} lbs)
                  </span>
                  <span className="flex items-center">
                    <Calendar className="h-4 w-4 mr-1" />
                    Preferred: {new Date(request.preferredDate).toLocaleDateString()}
                  </span>
                </div>
              </div>

              <div className="lg:text-right">
                <div className="mb-4">
                  <span className="text-3xl font-bold text-green-400 flex items-center lg:justify-end">
                    <DollarSign className="h-6 w-6" />
                    {request.budget}
                  </span>
                  <p className="text-sm text-gray-400">Estimated earnings</p>
                </div>

                <div className="flex flex-col space-y-2">
                  <button className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 font-medium">
                    Accept Request
                  </button>
                  <button className="border border-dark-600 text-gray-300 px-6 py-2 rounded-md hover:bg-dark-700 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2">
                    View Details
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {sortedRequests.length === 0 && (
        <div className="text-center py-12">
          <Package className="h-12 w-12 text-gray-500 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-white mb-2">No requests found</h3>
          <p className="text-gray-400">Try adjusting your filters or search terms.</p>
        </div>
      )}
    </div>
  );
}