import { useEffect, useState } from "react";
import { useLocalStorage } from "@uidotdev/usehooks";
import axios from "axios";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Grid from "./components/Grid";
import Loader from "./components/Loader";
import RefreshButton from "./components/RefreshButton";

function App() {
  const [listings, setListings] = useLocalStorage("properties", []);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchListings = async () => {
    setLoading(true);
    setError("");
    
    try {
      const response = await axios.get("http://localhost:3000/scrape");
      
      if (!response.data || !Array.isArray(response.data)) {
        throw new Error("Invalid response format");
      }
      
      if (response.data.length === 0) {
        throw new Error("No listings found");
      }
      
      // Process and validate the data
      const processedListings = response.data.map((item, index) => ({
        id: `listing-${index}`,
        title: item.title || "Property Title Not Available",
        price: item.price || "Price not available",
        link: item.link ? `https://www.airbnb.com${item.link}` : null,
        location: extractLocation(item.title),
        type: extractPropertyType(item.title),
        // Add placeholder data for missing fields
        image: null, // No images in current API response
        bedrooms: null,
        bathrooms: null
      }));
      
      setListings(processedListings);
    } catch (err) {
      console.error("Fetch error:", err);
      setError(
        err.response?.data?.error || 
        err.message || 
        "Failed to fetch listings. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  // Helper function to extract location from title
  const extractLocation = (title) => {
    if (!title) return null;
    const match = title.match(/in\s+([A-Za-z\s]+)$/);
    return match ? match[1].trim() : null;
  };

  // Helper function to extract property type from title
  const extractPropertyType = (title) => {
    if (!title) return null;
    const match = title.match(/^([A-Za-z]+)\s+in/);
    return match ? match[1].trim() : null;
  };

  useEffect(() => {
    if (listings.length === 0) {
      fetchListings();
    }
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <Header />
      <RefreshButton callback={fetchListings} loading={loading} />
      <main className="flex flex-col items-center justify-center flex-1 w-full px-4 relative">
        {error && (
          <div className="w-full max-w-4xl mx-auto mb-6">
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <div className="flex items-center">
                <svg className="w-5 h-5 text-red-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="text-red-700 font-medium">{error}</p>
              </div>
            </div>
          </div>
        )}
        {loading ? <Loader /> : <Grid listings={listings} />}
      </main>
      <Footer />
    </div>
  );
}

export default App;