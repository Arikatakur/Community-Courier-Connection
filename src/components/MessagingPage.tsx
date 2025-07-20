import React, { useState } from 'react';
import { Send, Search, Phone, Video, MoreVertical, Paperclip, Smile } from 'lucide-react';
import type { Message } from '../types';

export function MessagingPage() {
  const [selectedConversation, setSelectedConversation] = useState('1');
  const [newMessage, setNewMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const conversations = [
    {
      id: '1',
      name: 'Yousef Thompson',
      lastMessage: 'Perfect! I\'ll pick up the laptop around 1 PM.',
      timestamp: '2:15 PM',
      unread: 0,
      avatar: 'YT',
      deliveryId: 'DEL-001',
      status: 'active'
    },
    {
      id: '2',
      name: 'Hamad Johnson',
      lastMessage: 'Thank you for the quick delivery!',
      timestamp: 'Yesterday',
      unread: 0,
      avatar: 'HJ',
      deliveryId: 'DEL-002',
      status: 'completed'
    },
    {
      id: '3',
      name: 'Mohamed Chen',
      lastMessage: 'Hi! I saw your delivery request for art supplies...',
      timestamp: '2 days ago',
      unread: 2,
      avatar: 'MC',
      deliveryId: 'DEL-003',
      status: 'pending'
    }
  ];

  const messages: Message[] = [
    {
      id: '1',
      senderId: '1',
      receiverId: 'current-user',
      content: 'Hi! I can help deliver your laptop. I\'m traveling from your area to downtown today.',
      timestamp: '2025-01-22T13:30:00Z',
      read: true,
      deliveryId: 'DEL-001'
    },
    {
      id: '2',
      senderId: 'current-user',
      receiverId: '1',
      content: 'That would be perfect! What time works best for pickup?',
      timestamp: '2025-01-22T13:32:00Z',
      read: true,
      deliveryId: 'DEL-001'
    },
    {
      id: '3',
      senderId: '1',
      receiverId: 'current-user',
      content: 'I can pick it up around 1 PM if that works for you. I\'ll be careful with it.',
      timestamp: '2025-01-22T13:35:00Z',
      read: true,
      deliveryId: 'DEL-001'
    },
    {
      id: '4',
      senderId: 'current-user',
      receiverId: '1',
      content: 'Perfect! I\'ll have it ready. It\'s in the original packaging.',
      timestamp: '2025-01-22T13:37:00Z',
      read: true,
      deliveryId: 'DEL-001'
    },
    {
      id: '5',
      senderId: '1',
      receiverId: 'current-user',
      content: 'Perfect! I\'ll pick up the laptop around 1 PM.',
      timestamp: '2025-01-22T14:15:00Z',
      read: true,
      deliveryId: 'DEL-001'
    }
  ];

  const filteredConversations = conversations.filter(conv =>
    conv.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const selectedConv = conversations.find(conv => conv.id === selectedConversation);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim()) {
      console.log('Sending message:', newMessage);
      setNewMessage('');
    }
  };

  const formatTime = (timestamp: string) => {
    if (timestamp.includes('PM') || timestamp.includes('AM')) {
      return timestamp;
    }
    return new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 h-screen" id="main-content">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-white mb-2">Messages</h1>
        <p className="text-gray-400">
          Communicate securely with requesters and travelers about your deliveries.
        </p>
      </div>

      <div className="bg-dark-800 rounded-lg shadow-md border border-dark-700 h-[calc(100vh-200px)] flex">
        {/* Conversations List */}
        <div className="w-1/3 border-r border-dark-700 flex flex-col">
          {/* Search */}
          <div className="p-4 border-b border-dark-700">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
              <input
                type="text"
                className="w-full pl-10 pr-3 py-2 border border-dark-600 bg-dark-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Search conversations..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          {/* Conversation List */}
          <div className="flex-1 overflow-y-auto">
            {filteredConversations.map((conversation) => (
              <button
                key={conversation.id}
                onClick={() => setSelectedConversation(conversation.id)}
                className={`w-full p-4 text-left hover:bg-dark-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-inset ${
                  selectedConversation === conversation.id ? 'bg-dark-700 border-r-2 border-blue-500' : ''
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-medium text-sm">
                    {conversation.avatar}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-medium text-white truncate">{conversation.name}</h3>
                      <span className="text-xs text-gray-400">{conversation.timestamp}</span>
                    </div>
                    <p className="text-sm text-gray-400 truncate">{conversation.lastMessage}</p>
                    <div className="flex items-center justify-between mt-1">
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        conversation.status === 'active' ? 'bg-green-100 text-green-800' :
                        conversation.status === 'completed' ? 'bg-gray-100 text-gray-800' :
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {conversation.status}
                      </span>
                      {conversation.unread > 0 && (
                        <span className="bg-blue-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                          {conversation.unread}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex-1 flex flex-col">
          {selectedConv ? (
            <>
              {/* Chat Header */}
              <div className="p-4 border-b border-dark-700">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-medium">
                      {selectedConv.avatar}
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-white">{selectedConv.name}</h3>
                      <p className="text-sm text-gray-400">Delivery: {selectedConv.deliveryId}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button className="p-2 text-gray-400 hover:text-blue-400 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-full">
                      <Phone className="h-5 w-5" />
                    </button>
                    <button className="p-2 text-gray-400 hover:text-blue-400 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-full">
                      <Video className="h-5 w-5" />
                    </button>
                    <button className="p-2 text-gray-400 hover:text-gray-300 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 rounded-full">
                      <MoreVertical className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.senderId === 'current-user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                        message.senderId === 'current-user'
                          ? 'bg-blue-500 text-white'
                          : 'bg-dark-700 text-white'
                      }`}
                    >
                      <p className="text-sm">{message.content}</p>
                      <p className={`text-xs mt-1 ${
                        message.senderId === 'current-user' ? 'text-blue-100' : 'text-gray-400'
                      }`}>
                        {formatTime(message.timestamp)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Message Input */}
              <form onSubmit={handleSendMessage} className="p-4 border-t border-dark-700">
                <div className="flex items-center space-x-2">
                  <button
                    type="button"
                    className="p-2 text-gray-400 hover:text-gray-300 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 rounded-full"
                  >
                    <Paperclip className="h-5 w-5" />
                  </button>
                  <div className="flex-1 relative">
                    <input
                      type="text"
                      className="w-full px-4 py-2 pr-12 border border-dark-600 bg-dark-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Type your message..."
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 text-gray-400 hover:text-gray-300 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 rounded-full"
                    >
                      <Smile className="h-4 w-4" />
                    </button>
                  </div>
                  <button
                    type="submit"
                    disabled={!newMessage.trim()}
                    className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Send className="h-5 w-5" />
                  </button>
                </div>
              </form>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <div className="w-16 h-16 bg-dark-700 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MessageCircle className="h-8 w-8 text-gray-500" />
                </div>
                <h3 className="text-lg font-medium text-white mb-2">Select a conversation</h3>
                <p className="text-gray-400">Choose a conversation from the sidebar to start messaging.</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}