import React, { useState, useEffect } from 'react';
import { MapPin, Clock, CheckCircle, Truck, Package, Phone, MessageCircle, Navigation } from 'lucide-react';

export function TrackingPage() {
  const [activeDelivery, setActiveDelivery] = useState({
    id: 'DEL-001',
    title: 'Laptop delivery to downtown office',
    status: 'in-transit',
    travelerName: 'Yousef Thompson',
    travelerPhone: '+1 (555) 987-6543',
    estimatedArrival: '2:30 PM',
    currentLocation: 'Mission Street & 5th Street',
    pickupTime: '1:15 PM',
    dropoffAddress: '456 Business Ave, San Francisco, CA 94105'
  });

  const [currentStep, setCurrentStep] = useState(2);

  const steps = [
    { id: 1, title: 'Request Accepted', description: 'Traveler accepted your delivery request', completed: true, timestamp: '12:45 PM' },
    { id: 2, title: 'Item Picked Up', description: 'Item collected from pickup location', completed: true, timestamp: '1:15 PM' },
    { id: 3, title: 'In Transit', description: 'Item is on the way to destination', completed: false, timestamp: 'Current', current: true },
    { id: 4, title: 'Delivered', description: 'Item delivered successfully', completed: false, timestamp: 'Est. 2:30 PM' }
  ];

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate location updates
      const locations = [
        'Mission Street & 5th Street',
        'Mission Street & 3rd Street',
        'Market Street & 2nd Street',
        'Business Ave & Main Street'
      ];
      const randomLocation = locations[Math.floor(Math.random() * locations.length)];
      setActiveDelivery(prev => ({ ...prev, currentLocation: randomLocation }));
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8" id="main-content">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Track Your Delivery</h1>
        <p className="text-gray-400">
          Real-time updates on your delivery progress.
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Delivery Status */}
        <div className="lg:col-span-2">
          <div className="bg-dark-800 rounded-lg shadow-md border border-dark-700 p-6 mb-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-semibold text-white">{activeDelivery.title}</h2>
                <p className="text-gray-400">Delivery ID: {activeDelivery.id}</p>
              </div>
              <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                In Transit
              </span>
            </div>

            {/* Progress Steps */}
            <div className="relative">
              {steps.map((step, index) => (
                <div key={step.id} className={`flex items-start ${index !== steps.length - 1 ? 'pb-8' : ''}`}>
                  {index !== steps.length - 1 && (
                    <div className={`absolute left-4 top-8 w-0.5 h-8 ${
                      step.completed ? 'bg-green-400' : 'bg-dark-600'
                    }`}></div>
                  )}
                  
                  <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                    step.completed ? 'bg-green-400 text-white' :
                    step.current ? 'bg-blue-500 text-white' : 'bg-dark-600 text-gray-400'
                  }`}>
                    {step.completed ? (
                      <CheckCircle className="h-5 w-5" />
                    ) : step.current ? (
                      <Truck className="h-4 w-4" />
                    ) : (
                      <span className="text-sm font-medium">{step.id}</span>
                    )}
                  </div>
                  
                  <div className="ml-4 flex-1">
                    <h3 className={`text-sm font-medium ${
                      step.completed || step.current ? 'text-white' : 'text-gray-500'
                    }`}>
                      {step.title}
                    </h3>
                    <p className={`text-sm ${
                      step.completed || step.current ? 'text-gray-300' : 'text-gray-500'
                    }`}>
                      {step.description}
                    </p>
                    <p className="text-xs text-gray-400 mt-1">{step.timestamp}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Live Location */}
          <div className="bg-dark-800 rounded-lg shadow-md border border-dark-700 p-6">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
              <Navigation className="h-5 w-5 mr-2 text-blue-400" />
              Live Location
            </h3>
            
            <div className="bg-dark-700 rounded-lg h-64 flex items-center justify-center mb-4">
              <div className="text-center">
                <MapPin className="h-12 w-12 text-blue-400 mx-auto mb-2" />
                <p className="text-gray-400">Interactive map would be displayed here</p>
                <p className="text-sm text-gray-500 mt-1">Current location: {activeDelivery.currentLocation}</p>
              </div>
            </div>

            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center text-gray-400">
                <Clock className="h-4 w-4 mr-1" />
                ETA: {activeDelivery.estimatedArrival}
              </div>
              <div className="flex items-center text-green-400">
                <CheckCircle className="h-4 w-4 mr-1" />
                On schedule
              </div>
            </div>
          </div>
        </div>

        {/* Traveler Info & Actions */}
        <div className="space-y-6">
          {/* Traveler Card */}
          <div className="bg-dark-800 rounded-lg shadow-md border border-dark-700 p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Your Traveler</h3>
            
            <div className="flex items-center space-x-4 mb-4">
              <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white font-semibold">
                YT
              </div>
              <div>
                <h4 className="font-medium text-white">{activeDelivery.travelerName}</h4>
                <div className="flex items-center text-sm text-gray-400">
                  <span className="flex items-center mr-3">
                    ⭐ 4.9 (127 deliveries)
                  </span>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <button className="w-full bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 flex items-center justify-center">
                <Phone className="h-4 w-4 mr-2" />
                Call Traveler
              </button>
              <button className="w-full border border-dark-600 text-gray-300 py-2 px-4 rounded-md hover:bg-dark-700 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 flex items-center justify-center">
                <MessageCircle className="h-4 w-4 mr-2" />
                Send Message
              </button>
            </div>
          </div>

          {/* Delivery Details */}
          <div className="bg-dark-800 rounded-lg shadow-md border border-dark-700 p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Delivery Details</h3>
            
            <div className="space-y-4 text-sm">
              <div>
                <h4 className="font-medium text-white mb-1">Pickup Time</h4>
                <p className="text-gray-400">{activeDelivery.pickupTime}</p>
              </div>
              
              <div>
                <h4 className="font-medium text-white mb-1">Destination</h4>
                <p className="text-gray-400">{activeDelivery.dropoffAddress}</p>
              </div>
              
              <div>
                <h4 className="font-medium text-white mb-1">Estimated Arrival</h4>
                <p className="text-gray-400">{activeDelivery.estimatedArrival}</p>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-dark-800 rounded-lg shadow-md border border-dark-700 p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Quick Actions</h3>
            
            <div className="space-y-3">
              <button className="w-full text-left text-blue-400 hover:text-blue-300 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-md p-2 hover:bg-dark-700">
                View Full Delivery History
              </button>
              <button className="w-full text-left text-blue-400 hover:text-blue-300 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-md p-2 hover:bg-dark-700">
                Download Receipt
              </button>
              <button className="w-full text-left text-red-400 hover:text-red-300 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 rounded-md p-2 hover:bg-dark-700">
                Report an Issue
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}