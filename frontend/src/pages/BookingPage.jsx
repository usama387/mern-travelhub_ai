import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useParams } from "react-router-dom";
import { useGetPackageDetailsQuery } from "@/features/api/packageApi";
import PackageDetails from "@/_components/Booking/PackageDetails";
import BookingForm from "@/_components/Booking/BookingForm";
import PriceSummary from "@/_components/Booking/PriceSummary";

const BookingPage = () => {
  const { id } = useParams();
  const { data: packageData, isLoading, error } = useGetPackageDetailsQuery(id);

  const [bookingDetails, setBookingDetails] = useState({
    persons: 2,
    checkIn: null,
    checkOut: null,
    transportation: "pia",
    hotel: "standard",
  });

  const [totalPrice, setTotalPrice] = useState(0);

  const packageDetails = packageData?.package || {};

  const transportationOptions = [
    {
      value: "pia",
      label: "PIA Flight",
      price: 15000,
      duration: "2 hours",
      timings: ["06:00 AM", "10:30 AM", "02:15 PM", "06:45 PM"],
      color: "bg-blue-500",
    },
    {
      value: "train",
      label: "Green Line Express",
      price: 3500,
      duration: "18 hours",
      timings: ["07:30 PM", "08:15 PM"],
      color: "bg-green-500",
    },
  ];

  const hotelCategories = {
    standard: { label: "Standard Hotel", price: 0, order: 1 },
    deluxe: { label: "Deluxe Hotel", price: 5000, order: 2 },
    luxury: { label: "Luxury Resort", price: 15000, order: 3 },
  };

  const packageHotelType = packageDetails.hotelType?.toLowerCase() || "standard";

  useEffect(() => {
    if (packageDetails.hotelType) {
      setBookingDetails(prev => ({
        ...prev,
        hotel: packageHotelType
      }));
    }
  }, [packageDetails.hotelType]);

  const hasHotelUpgrade = () => {
    const selectedOrder = hotelCategories[bookingDetails.hotel]?.order || 1;
    const packageOrder = hotelCategories[packageHotelType]?.order || 1;
    return selectedOrder > packageOrder;
  };

  const getHotelUpgradeCost = () => {
    if (!hasHotelUpgrade()) return 0;
    const selectedPrice = hotelCategories[bookingDetails.hotel]?.price || 0;
    const packagePrice = hotelCategories[packageHotelType]?.price || 0;
    return selectedPrice - packagePrice;
  };

  const getExtraDays = () => {
    if (!bookingDetails.checkIn || !bookingDetails.checkOut) return 0;
    const stayDays = (new Date(bookingDetails.checkOut) - new Date(bookingDetails.checkIn)) / (1000 * 60 * 60 * 24);
    return Math.max(0, stayDays - packageDetails.duration);
  };

  const calculateTotalPrice = () => {
    if (!bookingDetails.checkIn || !bookingDetails.checkOut) return 0;

    const packagePrice = packageDetails.price * bookingDetails.persons;
    const transportPrice = transportationOptions.find(
      (t) => t.value === bookingDetails.transportation
    )?.price * bookingDetails.persons || 0;
    const hotelUpgradeCost = getHotelUpgradeCost() * bookingDetails.persons * packageDetails.duration;
    const extraDaysCost = (hotelCategories[bookingDetails.hotel]?.price || 0) * bookingDetails.persons * getExtraDays();

    return packagePrice + transportPrice + hotelUpgradeCost + extraDaysCost;
  };

  useEffect(() => {
    setTotalPrice(calculateTotalPrice());
  }, [bookingDetails, packageDetails]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading package details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600">Error loading package details. Please try again later.</p>
          <button 
            className="mt-4 bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => window.location.reload()}
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50">
      <div className="container mx-auto px-4 py-8 mt-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl font-bold text-center mb-8 bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
            Book Your Dream Trip
          </h1>
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <PackageDetails packageDetails={packageDetails} />
              <BookingForm
                packageDetails={packageDetails}
                bookingDetails={bookingDetails}
                setBookingDetails={setBookingDetails}
              />
            </div>
            <PriceSummary
              packageDetails={packageDetails}
              bookingDetails={bookingDetails}
              totalPrice={totalPrice}
              calculateTotalPrice={calculateTotalPrice}
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default BookingPage;