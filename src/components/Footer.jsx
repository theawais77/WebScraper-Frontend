const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-gray-50 border-t border-gray-200 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-gray-900">PropertyScraper</h3>
            <p className="text-sm text-gray-600 max-w-xs">
              Aggregating real estate listings from multiple sources to help you find your perfect property.
            </p>
          </div>
          
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">Features</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>• Real-time data scraping</li>
            </ul>
          </div>
          
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">Status</h4>
            <div className="flex items-center space-x-2 text-sm">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-gray-600">All systems operational</span>
            </div>
          </div>
        </div>
        
        <div className="mt-8 pt-6 border-t border-gray-200">
          <p className="text-center text-sm text-gray-500">
            © {currentYear} PropertyScraper.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;