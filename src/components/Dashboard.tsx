// import React from 'react';
import { Package, Truck, Users, Star, TrendingUp, Clock, MapPin, DollarSign } from 'lucide-react';
import type { User } from '../types';

interface DashboardProps {
  user?: User;
  onGetStarted?: () => void;
} 

export function Dashboard({ user, onGetStarted }: DashboardProps) {
  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-dark-900 to-dark-800 flex items-center justify-center p-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-8">
            <Package className="h-16 w-16 text-blue-400 mx-auto mb-4" />
            <h1 className="text-4xl font-bold text-white mb-4">
              Community Courier Connection
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Connect with your community for peer-to-peer deliveries. 
              Safe, affordable, and efficient item transport when you need it.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <div className="bg-dark-800 p-6 rounded-lg shadow-md border border-dark-700">
              <Package className="h-8 w-8 text-blue-400 mb-3 mx-auto" />
              <h3 className="font-semibold text-white mb-2">Post Requests</h3>
              <p className="text-gray-400 text-sm">Easily post what you need delivered with pickup and drop-off details</p>
            </div>
            <div className="bg-dark-800 p-6 rounded-lg shadow-md border border-dark-700">
              <Truck className="h-8 w-8 text-green-400 mb-3 mx-auto" />
              <h3 className="font-semibold text-white mb-2">Earn Money</h3>
              <p className="text-gray-400 text-sm">Make money by delivering items on your existing travel routes</p>
            </div>
            <div className="bg-dark-800 p-6 rounded-lg shadow-md border border-dark-700">
              <Users className="h-8 w-8 text-purple-400 mb-3 mx-auto" />
              <h3 className="font-semibold text-white mb-2">Build Community</h3>
              <p className="text-gray-400 text-sm">Connect with verified community members and build trust through ratings</p>
            </div>
          </div>

          <button
            onClick={onGetStarted}
            className="bg-blue-500 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-blue-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Get Started Today
          </button>
        </div>
      </div>
    );
  }

  const stats = [
    { label: 'Active Requests', value: '12', icon: Package, color: 'text-blue-400' },
    { label: 'Completed Deliveries', value: user.totalDeliveries.toString(), icon: Truck, color: 'text-green-400' },
    { label: 'Rating', value: user.rating.toFixed(1), icon: Star, color: 'text-yellow-400' },
    { label: 'Earnings', value: '$234', icon: DollarSign, color: 'text-purple-400' },
  ];

  const recentActivity = [
    { id: 1, type: 'delivery', description: 'Delivered laptop to Yousef M.', time: '2 hours ago', status: 'completed' },
    { id: 2, type: 'request', description: 'Posted request for art supplies', time: '4 hours ago', status: 'active' },
    { id: 3, type: 'message', description: 'New message from traveler Hamad D.', time: '6 hours ago', status: 'unread' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8" id="main-content">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">
          Welcome back, {user.name}!
        </h1>
        <p className="text-gray-400">
          Here's what's happening with your deliveries today.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className="bg-dark-800 p-6 rounded-lg shadow-md border border-dark-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-400">{stat.label}</p>
                  <p className="text-2xl font-bold text-white">{stat.value}</p>
                </div>
                <Icon className={`h-8 w-8 ${stat.color}`} />
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Quick Actions */}
        <div className="lg:col-span-1">
          <div className="bg-dark-800 p-6 rounded-lg shadow-md border border-dark-700">
            <h3 className="text-lg font-semibold text-white mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <button className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 text-left">
                <Package className="h-4 w-4 inline mr-2" />
                Post New Request
              </button>
              <button className="w-full bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 text-left">
                <Truck className="h-4 w-4 inline mr-2" />
                Browse Delivery Opportunities
              </button>
              <button className="w-full bg-purple-500 text-white py-2 px-4 rounded-md hover:bg-purple-600 transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 text-left">
                <MapPin className="h-4 w-4 inline mr-2" />
                Track Active Deliveries
              </button>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="lg:col-span-2">
          <div className="bg-dark-800 p-6 rounded-lg shadow-md border border-dark-700">
            <h3 className="text-lg font-semibold text-white mb-4">Recent Activity</h3>
            <div className="space-y-4">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-center justify-between p-3 bg-dark-700 rounded-md">
                  <div className="flex items-center space-x-3">
                    <div className={`w-2 h-2 rounded-full ${
                      activity.status === 'completed' ? 'bg-green-400' :
                      activity.status === 'active' ? 'bg-blue-400' : 'bg-yellow-400'
                    }`}></div>
                    <div>
                      <p className="text-sm font-medium text-white">{activity.description}</p>
                      <p className="text-xs text-gray-400 flex items-center">
                        <Clock className="h-3 w-3 mr-1" />
                        {activity.time}
                      </p>
                    </div>
                  </div>
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    activity.status === 'completed' ? 'bg-green-100 text-green-800' :
                    activity.status === 'active' ? 'bg-blue-100 text-blue-800' : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {activity.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Performance Chart Placeholder */}
      <div className="mt-8 bg-dark-800 p-6 rounded-lg shadow-md border border-dark-700">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-white">Delivery Performance</h3>
          <TrendingUp className="h-5 w-5 text-green-400" />
        </div>
        <div className="h-64 bg-dark-700 rounded-md flex items-center justify-center">
          <p className="text-gray-400">Performance chart would be displayed here</p>
        </div>
      </div>
    </div>
  );
}