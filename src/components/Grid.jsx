import React, { useState, useMemo } from 'react';

const PropertyCard = ({ property }) => {
  const [imageError, setImageError] = useState(false);
  
  // Validation for required fields
  const isValidProperty = useMemo(() => {
    return property && 
           typeof property.title === 'string' && 
           property.title.trim() !== '' &&
           typeof property.price === 'string' && 
           property.price.trim() !== '';
  }, [property]);

  if (!isValidProperty) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <p className="text-red-600 text-sm">Invalid property data</p>
      </div>
    );
  }

  const formatPrice = (price) => {
    if (!price) return 'Price not available';
    return price.replace(/[^\d,]/g, '').replace(/,/g, ',') || 'Contact for price';
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
      {/* Image Section */}
      <div className="relative h-48 bg-gray-100">
        {property.image && !imageError ? (
          <img
            src={property.image}
            alt={property.title}
            className="w-full h-full object-cover"
            onError={() => setImageError(true)}
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
            <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-4m-5 0H9m0 0H5m0 0h2M7 7h10M7 11h6m-6 4h6" />
            </svg>
          </div>
        )}
        
        {/* Price Badge */}
        <div className="absolute top-3 right-3">
          <span className="bg-white/90 backdrop-blur-sm text-gray-900 px-3 py-1 rounded-full text-sm font-semibold shadow-sm">
            {formatPrice(property.price)}
          </span>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-5">
        <h3 className="font-semibold text-gray-900 text-lg mb-2 line-clamp-2 leading-tight">
          {property.title}
        </h3>
        
        {property.location && (
          <div className="flex items-center text-gray-600 text-sm mb-3">
            <svg className="w-4 h-4 mr-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span className="truncate">{property.location}</span>
          </div>
        )}

        {/* Property Details */}
        <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
          {property.bedrooms && (
            <div className="flex items-center">
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
              </svg>
              <span>{property.bedrooms} bed</span>
            </div>
          )}
          
          {property.bathrooms && (
            <div className="flex items-center">
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10v11M20 10v11" />
              </svg>
              <span>{property.bathrooms} bath</span>
            </div>
          )}
        </div>

        {/* Property Type */}
        {property.type && (
          <div className="mb-4">
            <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full font-medium">
              {property.type}
            </span>
          </div>
        )}

        {/* Action Button */}
        {property.link && (
          <a
            href={property.link}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2 px-4 rounded-lg text-sm font-medium hover:from-gray-500 hover:to-gray-700 transition-all duration-200 flex items-center justify-center"
          >
            View Details
            <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        )}
      </div>
    </div>
  );
};

const Grid = ({ listings }) => {
  // Validation for listings prop
  const validListings = useMemo(() => {
    if (!Array.isArray(listings)) {
      console.warn('Grid component: listings prop should be an array');
      return [];
    }
    return listings.filter(listing => listing && typeof listing === 'object');
  }, [listings]);

  if (validListings.length === 0) {
    return (
      <div className="w-full max-w-4xl mx-auto px-4 py-12">
        <div className="text-center bg-white rounded-xl shadow-sm border border-gray-200 p-12">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-4m-5 0H9m0 0H5m0 0h2M7 7h10M7 11h6m-6 4h6" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No Properties Found</h3>
          <p className="text-gray-600 mb-6 max-w-md mx-auto">
            We couldn't find any property listings at the moment. Try refreshing to get the latest data.
          </p>
          <button 
            onClick={() => window.location.reload()} 
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-lg text-sm font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-200"
          >
            Refresh Page
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-6">
      {/* Results Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Property Listings
        </h2>
        <p className="text-gray-600">
          Found {validListings.length} {validListings.length === 1 ? 'property' : 'properties'}
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {validListings.map((property, index) => (
          <PropertyCard 
            key={property.id || property.link || index} 
            property={property} 
          />
        ))}
      </div>

      {/* Load More Section (if needed) */}
      {validListings.length > 0 && (
        <div className="mt-12 text-center">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              End of Results
            </h3>
            <p className="text-gray-600 mb-4">
              You've viewed all {validListings.length} available properties
            </p>
            <div className="flex items-center justify-center space-x-2 text-sm text-gray-500">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span>All listings displayed</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Grid;
