import React, { useState } from 'react';

const RefreshButton = ({ callback, loading }) => {
  const [lastRefresh, setLastRefresh] = useState(null);

  const handleRefresh = async () => {
    if (loading) return;
    
    setLastRefresh(new Date());
    await callback();
  };

  const formatLastRefresh = () => {
    if (!lastRefresh) return null;
    
    const now = new Date();
    const diff = Math.floor((now - lastRefresh) / 1000);
    
    if (diff < 60) return `${diff}s ago`;
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
    return `${Math.floor(diff / 3600)}h ago`;
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-6">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
          <div className="text-center sm:text-left">
            <h2 className="text-lg font-semibold text-gray-900">Property Listings</h2>
            <p className="text-sm text-gray-600 mt-1">
              {lastRefresh ? `Last updated ${formatLastRefresh()}` : 'Click refresh to get the latest listings'}
            </p>
          </div>
          
          <div className="flex items-center space-x-4">
            {lastRefresh && (
              <div className="hidden sm:flex items-center space-x-2 text-sm text-gray-500">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>{formatLastRefresh()}</span>
              </div>
            )}
            
            <button
              onClick={handleRefresh}
              disabled={loading}
              className={`
                inline-flex items-center px-6 py-3 rounded-lg font-medium text-sm transition-all duration-200
                ${loading 
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                  : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 hover:shadow-lg transform hover:-translate-y-0.5'
                }
              `}
            >
              {loading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Refreshing...
                </>
              ) : (
                <>
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  Refresh Listings
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RefreshButton;