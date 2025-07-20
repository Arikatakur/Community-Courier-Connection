import React, { useState } from 'react';
import { Star, MapPin, Calendar, Phone, Mail, Camera, Edit, Shield, Truck, Package } from 'lucide-react';
import type { User } from '../types';

interface ProfilePageProps {
  user: User;
}

export function ProfilePage({ user }: ProfilePageProps) {
  const [editing, setEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: user.name,
    phone: user.phone || '',
    location: user.location || '',
    bio: 'Reliable community member who loves helping others with deliveries. Available most weekdays and weekends.'
  });

  const handleSave = () => {
    // Save profile changes
    console.log('Saving profile:', profileData);
    setEditing(false);
  };

  const reviews = [
    {
      id: '1',
      reviewer: 'Yousef Johnson',
      rating: 5,
      comment: 'Saleem was incredibly professional and delivered my laptop safely and on time. Great communication throughout!',
      date: '2025-01-20',
      deliveryType: 'traveler'
    },
    {
      id: '2',
      reviewer: 'Hamad Chen',
      rating: 4,
      comment: 'Good delivery service, item arrived as expected. Would recommend.',
      date: '2025-01-18',
      deliveryType: 'traveler'
    },
    {
      id: '3',
      reviewer: 'Mohamed Rodriguez',
      rating: 5,
      comment: 'Very clear instructions and easy pickup. Great person to work with!',
      date: '2025-01-15',
      deliveryType: 'requester'
    }
  ];

  const stats = [
    { label: 'Total Deliveries', value: user.totalDeliveries, icon: Truck },
    { label: 'Average Rating', value: user.rating.toFixed(1), icon: Star },
    { label: 'Successful Requests', value: '15', icon: Package },
    { label: 'Response Time', value: '< 2hrs', icon: Calendar }
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8" id="main-content">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">My Profile</h1>
        <p className="text-gray-400">
          Manage your profile information and view your delivery history.
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Profile Information */}
        <div className="lg:col-span-2 space-y-6">
          {/* Basic Info Card */}
          <div className="bg-dark-800 rounded-lg shadow-md border border-dark-700 p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-white">Basic Information</h3>
              <button
                onClick={() => editing ? handleSave() : setEditing(true)}
                className="flex items-center space-x-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                <Edit className="h-4 w-4" />
                <span>{editing ? 'Save Changes' : 'Edit Profile'}</span>
              </button>
            </div>

            <div className="flex items-start space-x-6 mb-6">
              <div className="relative">
                <div className="w-24 h-24 bg-blue-500 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                  {user.name.split(' ').map(n => n[0]).join('')}
                </div>
                <button className="absolute bottom-0 right-0 bg-dark-700 border-2 border-dark-600 rounded-full p-1 hover:bg-dark-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                  <Camera className="h-4 w-4 text-gray-400" />
                </button>
              </div>
              
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <h2 className="text-2xl font-bold text-white">{user.name}</h2>
                  {user.verificationStatus === 'verified' && (
                    <Shield className="h-5 w-5 text-green-400" />
                  )}
                </div>
                <div className="flex items-center space-x-4 text-sm text-gray-400">
                  <span className="flex items-center">
                    <Star className="h-4 w-4 mr-1 text-yellow-400" />
                    {user.rating} ({user.totalDeliveries} deliveries)
                  </span>
                  <span className="flex items-center">
                    <Calendar className="h-4 w-4 mr-1" />
                    Joined {new Date(user.joinDate).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">
                  Full Name
                </label>
                {editing ? (
                  <input
                    type="text"
                    id="name"
                    className="w-full px-3 py-2 border border-dark-600 bg-dark-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={profileData.name}
                    onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                  />
                ) : (
                  <p className="text-white">{profileData.name}</p>
                )}
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
                  Email Address
                </label>
                <div className="flex items-center space-x-2">
                  <Mail className="h-4 w-4 text-gray-500" />
                  <span className="text-white">{user.email}</span>
                </div>
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-1">
                  Phone Number
                </label>
                {editing ? (
                  <input
                    type="tel"
                    id="phone"
                    className="w-full px-3 py-2 border border-dark-600 bg-dark-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={profileData.phone}
                    onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                  />
                ) : (
                  <div className="flex items-center space-x-2">
                    <Phone className="h-4 w-4 text-gray-500" />
                    <span className="text-white">{profileData.phone || 'Not provided'}</span>
                  </div>
                )}
              </div>

              <div>
                <label htmlFor="location" className="block text-sm font-medium text-gray-300 mb-1">
                  Location
                </label>
                {editing ? (
                  <input
                    type="text"
                    id="location"
                    className="w-full px-3 py-2 border border-dark-600 bg-dark-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={profileData.location}
                    onChange={(e) => setProfileData({ ...profileData, location: e.target.value })}
                  />
                ) : (
                  <div className="flex items-center space-x-2">
                    <MapPin className="h-4 w-4 text-gray-500" />
                    <span className="text-white">{profileData.location || 'Not provided'}</span>
                  </div>
                )}
              </div>

              <div className="md:col-span-2">
                <label htmlFor="bio" className="block text-sm font-medium text-gray-300 mb-1">
                  Bio
                </label>
                {editing ? (
                  <textarea
                    id="bio"
                    rows={3}
                    className="w-full px-3 py-2 border border-dark-600 bg-dark-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={profileData.bio}
                    onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })}
                  />
                ) : (
                  <p className="text-white">{profileData.bio}</p>
                )}
              </div>
            </div>
          </div>

          {/* Reviews Section */}
          <div className="bg-dark-800 rounded-lg shadow-md border border-dark-700 p-6">
            <h3 className="text-lg font-semibold text-white mb-6">Reviews & Ratings</h3>
            
            <div className="space-y-4">
              {reviews.map((review) => (
                <div key={review.id} className="border-b border-dark-700 pb-4 last:border-b-0">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-dark-600 rounded-full flex items-center justify-center text-gray-300 text-sm font-medium">
                        {review.reviewer.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <h4 className="font-medium text-white">{review.reviewer}</h4>
                        <div className="flex items-center space-x-2">
                          <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`h-4 w-4 ${
                                  i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-600'
                                }`}
                              />
                            ))}
                          </div>
                          <span className="text-sm text-gray-400">
                            as {review.deliveryType}
                          </span>
                        </div>
                      </div>
                    </div>
                    <span className="text-sm text-gray-400">{new Date(review.date).toLocaleDateString()}</span>
                  </div>
                  <p className="text-gray-300">{review.comment}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Stats & Actions Sidebar */}
        <div className="space-y-6">
          {/* Stats Card */}
          <div className="bg-dark-800 rounded-lg shadow-md border border-dark-700 p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Performance Stats</h3>
            
            <div className="space-y-4">
              {stats.map((stat) => {
                const Icon = stat.icon;
                return (
                  <div key={stat.label} className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Icon className="h-4 w-4 text-gray-400" />
                      <span className="text-sm text-gray-400">{stat.label}</span>
                    </div>
                    <span className="font-semibold text-white">{stat.value}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Verification Status */}
          <div className="bg-dark-800 rounded-lg shadow-md border border-dark-700 p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Verification Status</h3>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-400">Identity Verification</span>
                <span className={`px-2 py-1 text-xs rounded-full ${
                  user.verificationStatus === 'verified' ? 'bg-green-100 text-green-800' :
                  user.verificationStatus === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {user.verificationStatus}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-400">Phone Verification</span>
                <span className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full">
                  Verified
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-400">Email Verification</span>
                <span className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full">
                  Verified
                </span>
              </div>
            </div>

            {user.verificationStatus !== 'verified' && (
              <button className="w-full mt-4 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 text-sm">
                Complete Verification
              </button>
            )}
          </div>

          {/* Quick Actions */}
          <div className="bg-dark-800 rounded-lg shadow-md border border-dark-700 p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Quick Actions</h3>
            
            <div className="space-y-3">
              <button className="w-full text-left text-blue-400 hover:text-blue-300 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-md p-2 hover:bg-dark-700">
                Download Delivery History
              </button>
              <button className="w-full text-left text-blue-400 hover:text-blue-300 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-md p-2 hover:bg-dark-700">
                Privacy Settings
              </button>
              <button className="w-full text-left text-blue-400 hover:text-blue-300 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-md p-2 hover:bg-dark-700">
                Account Settings
              </button>
              <button className="w-full text-left text-red-400 hover:text-red-300 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 rounded-md p-2 hover:bg-dark-700">
                Deactivate Account
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}