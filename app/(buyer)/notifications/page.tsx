'use client';

import { useState } from 'react';
import Link from 'next/link';
import type { Notification, NotificationType } from '@/types';

export default function NotificationsPage() {
  const [filter, setFilter] = useState<'all' | NotificationType>('all');
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: 1,
      type: 'bid',
      title: "You've been outbid!",
      message: 'Someone placed a higher bid on the 2021 Toyota Camry SE. Current bid: $18,200',
      timestamp: '5 minutes ago',
      read: false,
      actionUrl: '/vehicle/2',
    },
    {
      id: 2,
      type: 'auction',
      title: 'Auction ending soon',
      message: "2022 Honda Civic EX auction ends in 2 hours. You're currently winning!",
      timestamp: '1 hour ago',
      read: false,
      actionUrl: '/vehicle/1',
    },
    {
      id: 3,
      type: 'bid',
      title: 'Congratulations! You won',
      message: 'You won the auction for 2020 Ford F-150 XLT at $28,500. Complete payment within 48 hours.',
      timestamp: '3 hours ago',
      read: false,
      actionUrl: '/account?tab=bids',
    },
    {
      id: 4,
      type: 'message',
      title: 'New message from dealer',
      message: 'AutoMax Motors sent you a message about the 2022 Honda Civic EX',
      timestamp: '5 hours ago',
      read: true,
      actionUrl: '/messages',
    },
    {
      id: 5,
      type: 'auction',
      title: 'New vehicle matching your preferences',
      message: 'A 2023 Mazda CX-5 that matches your saved search was just listed',
      timestamp: '1 day ago',
      read: true,
      actionUrl: '/vehicle/4',
    },
    {
      id: 6,
      type: 'system',
      title: 'Payment successful',
      message: 'Your payment of $28,500 for the 2020 Ford F-150 XLT has been processed',
      timestamp: '2 days ago',
      read: true,
    },
    {
      id: 7,
      type: 'system',
      title: 'Account verified',
      message: 'Your phone number has been successfully verified',
      timestamp: '3 days ago',
      read: true,
    },
    {
      id: 8,
      type: 'auction',
      title: 'Watchlist item starting soon',
      message: 'Auction for 2021 Subaru Outback starts in 1 hour',
      timestamp: '4 days ago',
      read: true,
      actionUrl: '/vehicle/5',
    },
  ]);

  const markAsRead = (id: number) => {
    setNotifications(
      notifications.map((notif) =>
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map((notif) => ({ ...notif, read: true })));
  };

  const deleteNotification = (id: number) => {
    setNotifications(notifications.filter((notif) => notif.id !== id));
  };

  const filteredNotifications =
    filter === 'all'
      ? notifications
      : notifications.filter((notif) => notif.type === filter);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const getIcon = (type: NotificationType) => {
    switch (type) {
      case 'bid':
        return '🏷️';
      case 'auction':
        return '🔔';
      case 'message':
        return '💬';
      case 'system':
        return '⚙️';
      default:
        return '📢';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Page Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-curb-navy">Notifications</h1>
            {unreadCount > 0 && (
              <p className="text-gray-600 mt-1">
                You have {unreadCount} unread notification{unreadCount !== 1 ? 's' : ''}
              </p>
            )}
          </div>
          {unreadCount > 0 && (
            <button
              onClick={markAllAsRead}
              className="text-curb-orange hover:underline font-semibold"
            >
              Mark all as read
            </button>
          )}
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-lg font-semibold transition ${
                filter === 'all'
                  ? 'bg-curb-orange text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              All ({notifications.length})
            </button>
            <button
              onClick={() => setFilter('bid')}
              className={`px-4 py-2 rounded-lg font-semibold transition ${
                filter === 'bid'
                  ? 'bg-curb-orange text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              🏷️ Bids ({notifications.filter((n) => n.type === 'bid').length})
            </button>
            <button
              onClick={() => setFilter('auction')}
              className={`px-4 py-2 rounded-lg font-semibold transition ${
                filter === 'auction'
                  ? 'bg-curb-orange text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              🔔 Auctions ({notifications.filter((n) => n.type === 'auction').length})
            </button>
            <button
              onClick={() => setFilter('message')}
              className={`px-4 py-2 rounded-lg font-semibold transition ${
                filter === 'message'
                  ? 'bg-curb-orange text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              💬 Messages ({notifications.filter((n) => n.type === 'message').length})
            </button>
            <button
              onClick={() => setFilter('system')}
              className={`px-4 py-2 rounded-lg font-semibold transition ${
                filter === 'system'
                  ? 'bg-curb-orange text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              ⚙️ System ({notifications.filter((n) => n.type === 'system').length})
            </button>
          </div>
        </div>

        {/* Notifications List */}
        <div className="space-y-3">
          {filteredNotifications.length === 0 ? (
            <div className="bg-white rounded-xl shadow-sm p-12 text-center">
              <div className="text-6xl mb-4">📭</div>
              <p className="text-xl text-gray-600 mb-2">No notifications</p>
              <p className="text-gray-500">You're all caught up!</p>
            </div>
          ) : (
            filteredNotifications.map((notif) => (
              <div
                key={notif.id}
                className={`bg-white rounded-xl shadow-sm p-6 transition hover:shadow-md ${
                  !notif.read ? 'border-l-4 border-curb-orange' : ''
                }`}
              >
                <div className="flex items-start gap-4">
                  <div className="text-3xl flex-shrink-0">{getIcon(notif.type)}</div>

                  <div className="flex-1">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3
                          className={`font-bold text-lg ${
                            !notif.read ? 'text-curb-navy' : 'text-gray-700'
                          }`}
                        >
                          {notif.title}
                        </h3>
                        <p className="text-gray-600 mt-1">{notif.message}</p>
                        <p className="text-sm text-gray-400 mt-2">{notif.timestamp}</p>
                      </div>

                      <div className="flex gap-2">
                        {!notif.read && (
                          <button
                            onClick={() => markAsRead(notif.id)}
                            className="text-curb-orange hover:underline text-sm whitespace-nowrap"
                          >
                            Mark read
                          </button>
                        )}
                        <button
                          onClick={() => deleteNotification(notif.id)}
                          className="text-gray-400 hover:text-red-600 text-sm"
                          title="Delete notification"
                        >
                          🗑️
                        </button>
                      </div>
                    </div>

                    {notif.actionUrl && (
                      <Link
                        href={notif.actionUrl}
                        className="inline-block mt-3 bg-curb-orange text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition text-sm font-semibold"
                        onClick={() => markAsRead(notif.id)}
                      >
                        View Details →
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Notification Preferences */}
        <div className="bg-white rounded-xl shadow-sm p-6 mt-8">
          <h3 className="font-bold text-curb-navy text-lg mb-4">Notification Preferences</h3>
          <div className="space-y-3">
            <label className="flex items-center justify-between">
              <span className="text-gray-700">Email notifications for outbid alerts</span>
              <input
                type="checkbox"
                defaultChecked
                className="w-5 h-5 text-curb-orange border-gray-300 rounded focus:ring-curb-orange"
              />
            </label>
            <label className="flex items-center justify-between">
              <span className="text-gray-700">SMS alerts for auctions ending soon</span>
              <input
                type="checkbox"
                defaultChecked
                className="w-5 h-5 text-curb-orange border-gray-300 rounded focus:ring-curb-orange"
              />
            </label>
            <label className="flex items-center justify-between">
              <span className="text-gray-700">New vehicles matching saved searches</span>
              <input
                type="checkbox"
                defaultChecked
                className="w-5 h-5 text-curb-orange border-gray-300 rounded focus:ring-curb-orange"
              />
            </label>
            <label className="flex items-center justify-between">
              <span className="text-gray-700">Marketing and promotional emails</span>
              <input
                type="checkbox"
                className="w-5 h-5 text-curb-orange border-gray-300 rounded focus:ring-curb-orange"
              />
            </label>
          </div>
          <button className="mt-4 bg-curb-orange text-white px-6 py-2 rounded-lg hover:bg-orange-600 transition font-semibold">
            Save Preferences
          </button>
        </div>
      </div>
    </div>
  );
}
