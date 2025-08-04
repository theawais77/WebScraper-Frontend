
const Loader = () => {
  return (
    <div className="flex flex-col items-center justify-center py-16 space-y-6">
  
      <div className="relative">
        <div className="w-16 h-16 border-4 border-gray-200 border-t-blue-600 rounded-full animate-spin"></div>
        <div className="absolute inset-0 w-16 h-16 border-4 border-transparent border-r-purple-600 rounded-full animate-spin animation-delay-150"></div>
      </div>
     
      <div className="text-center space-y-2">
        <h3 className="text-lg font-semibold text-gray-900">Scraping Properties</h3>
        <p className="text-sm text-gray-600 max-w-md">
          Fetching the latest listings from multiple sources. This may take a few moments...
        </p>
      </div>
      
      <div className="flex space-x-2">
        <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce"></div>
        <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce animation-delay-100"></div>
        <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce animation-delay-200"></div>
      </div>
   
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 max-w-sm w-full">
        <div className="space-y-3">
          <div className="flex items-center space-x-3">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-sm text-gray-600">Fetching listings</span>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse"></div>
            <span className="text-sm text-gray-600">Processing data</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loader;