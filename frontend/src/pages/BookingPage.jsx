import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  CalendarIcon,
  MapPin,
  Clock,
  Star,
  Plane,
  Train,
  Hotel,
  CreditCard,
} from "lucide-react";
import { format, differenceInDays } from "date-fns";

const BookingPage = () => {
  
    const [selectedPackage, setSelectedPackage] = useState({
    id: 1,
    name: "Northern Pakistan Adventure",
    basePrice: 45000,
    duration: "7 Days",
    location: "Hunza Valley",
    image: "/hunza-valley-landscape.png",
    description:
      "Experience the breathtaking beauty of Northern Pakistan with guided tours, local cuisine, and comfortable accommodations.",
  });

  const [bookingDetails, setBookingDetails] = useState({
    persons: 2,
    checkIn: null,
    checkOut: null,
    transportation: "pia",
    hotel: "standard",
  });

  const [showInvoice, setShowInvoice] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);

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

  const hotelOptions = [
    {
      value: "standard",
      label: "Standard Hotel",
      price: 8000,
      rating: 3,
      amenities: ["Free WiFi", "Breakfast", "AC"],
      color: "bg-orange-500",
      bgColor: "bg-orange-50 border-orange-200",
    },
    {
      value: "deluxe",
      label: "Deluxe Hotel",
      price: 15000,
      rating: 4,
      amenities: ["Free WiFi", "Breakfast", "AC", "Pool", "Gym"],
      color: "bg-purple-500",
      bgColor: "bg-purple-50 border-purple-200",
    },
    {
      value: "luxury",
      label: "Luxury Resort",
      price: 25000,
      rating: 5,
      amenities: [
        "Free WiFi",
        "All Meals",
        "AC",
        "Pool",
        "Gym",
        "Spa",
        "Room Service",
      ],
      color: "bg-amber-500",
      bgColor: "bg-amber-50 border-amber-200",
    },
  ];

  const getAvailableTimings = () => {
    if (!bookingDetails.checkIn) return [];
    const selectedTransport = transportationOptions.find(
      (t) => t.value === bookingDetails.transportation
    );
    return selectedTransport?.timings || [];
  };

  const calculateTotalPrice = () => {
    if (!bookingDetails.checkIn || !bookingDetails.checkOut) return 0;

    const days = differenceInDays(
      bookingDetails.checkOut,
      bookingDetails.checkIn
    );
    const packagePrice = selectedPackage.basePrice * bookingDetails.persons;
    const transportPrice =
      transportationOptions.find(
        (t) => t.value === bookingDetails.transportation
      )?.price * bookingDetails.persons || 0;
    const hotelPrice =
      hotelOptions.find((h) => h.value === bookingDetails.hotel)?.price *
        bookingDetails.persons *
        days || 0;

    return packagePrice + transportPrice + hotelPrice;
  };

  useEffect(() => {
    setTotalPrice(calculateTotalPrice());
  }, [bookingDetails, selectedPackage]);

  const handleBooking = () => {
    setShowInvoice(true);
  };

  const getDays = () => {
    if (!bookingDetails.checkIn || !bookingDetails.checkOut) return 0;
    return differenceInDays(bookingDetails.checkOut, bookingDetails.checkIn);
  };

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
            {/* Package Details */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="lg:col-span-2"
            >
              <Card className="mb-6 bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
                <CardHeader className="bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-t-lg">
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="h-5 w-5" />
                    Package Details
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="flex gap-4 mb-4">
                    <img
                      src={selectedPackage.image || "/placeholder.svg"}
                      alt={selectedPackage.name}
                      className="w-32 h-24 object-cover rounded-lg shadow-md"
                    />
                    <div>
                      <h3 className="text-xl font-semibold text-gray-800">
                        {selectedPackage.name}
                      </h3>
                      <p className="text-gray-600 mb-2">
                        {selectedPackage.description}
                      </p>
                      <div className="flex gap-4 text-sm text-gray-500">
                        <span className="flex items-center gap-1">
                          <Clock className="h-4 w-4 text-blue-500" />
                          {selectedPackage.duration}
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin className="h-4 w-4 text-green-500" />
                          {selectedPackage.location}
                        </span>
                      </div>
                    </div>
                  </div>
                  <Badge className="bg-gradient-to-r from-green-500 to-green-600 text-white">
                    Base Price: PKR {selectedPackage.basePrice.toLocaleString()}{" "}
                    per person
                  </Badge>
                </CardContent>
              </Card>

              {/* Booking Form */}
              <Card className="bg-white shadow-lg border-0">
                <CardHeader className="bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-t-lg">
                  <CardTitle>Booking Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6 p-6">
                  {/* Number of Persons */}
                  <div>
                    <Label
                      htmlFor="persons"
                      className="text-gray-700 font-medium"
                    >
                      Number of Persons
                    </Label>
                    <Select
                      value={bookingDetails.persons.toString()}
                      onValueChange={(value) =>
                        setBookingDetails({
                          ...bookingDetails,
                          persons: Number.parseInt(value),
                        })
                      }
                    >
                      <SelectTrigger className="border-purple-200 focus:border-purple-500">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                          <SelectItem key={num} value={num.toString()}>
                            {num} {num === 1 ? "Person" : "Persons"}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Date Selection */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="text-gray-700 font-medium">
                        Check-in Date
                      </Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className="w-full justify-start text-left font-normal bg-blue-50 border-blue-200 hover:bg-blue-100"
                          >
                            <CalendarIcon className="mr-2 h-4 w-4 text-blue-500" />
                            {bookingDetails.checkIn
                              ? format(bookingDetails.checkIn, "PPP")
                              : "Select date"}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar
                            mode="single"
                            selected={bookingDetails.checkIn}
                            onSelect={(date) =>
                              setBookingDetails({
                                ...bookingDetails,
                                checkIn: date,
                              })
                            }
                            disabled={(date) => date < new Date()}
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                    <div>
                      <Label className="text-gray-700 font-medium">
                        Check-out Date
                      </Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className="w-full justify-start text-left font-normal bg-green-50 border-green-200 hover:bg-green-100"
                          >
                            <CalendarIcon className="mr-2 h-4 w-4 text-green-500" />
                            {bookingDetails.checkOut
                              ? format(bookingDetails.checkOut, "PPP")
                              : "Select date"}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar
                            mode="single"
                            selected={bookingDetails.checkOut}
                            onSelect={(date) =>
                              setBookingDetails({
                                ...bookingDetails,
                                checkOut: date,
                              })
                            }
                            disabled={(date) =>
                              date < bookingDetails.checkIn || date < new Date()
                            }
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                  </div>

                  {getDays() > 0 && (
                    <Badge className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">
                      Duration: {getDays()} days
                    </Badge>
                  )}

                  <div>
                    <Label className="text-gray-700 font-medium">
                      Transportation from Karachi
                    </Label>
                    <Select
                      value={bookingDetails.transportation}
                      onValueChange={(value) =>
                        setBookingDetails({
                          ...bookingDetails,
                          transportation: value,
                        })
                      }
                    >
                      <SelectTrigger className="border-blue-200 focus:border-blue-500">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {transportationOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            <div className="flex items-center gap-2">
                              {option.value === "pia" ? (
                                <Plane className="h-4 w-4 text-blue-500" />
                              ) : (
                                <Train className="h-4 w-4 text-green-500" />
                              )}
                              <span>
                                {option.label} - PKR{" "}
                                {option.price.toLocaleString()} (
                                {option.duration})
                              </span>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    {bookingDetails.checkIn && (
                      <div className="mt-3">
                        <Label className="text-sm text-gray-600">
                          Available Timings for{" "}
                          {format(bookingDetails.checkIn, "PPP")}
                        </Label>
                        <div className="flex flex-wrap gap-2 mt-2">
                          {getAvailableTimings().map((time, index) => (
                            <Badge
                              key={index}
                              className={`${
                                transportationOptions.find(
                                  (t) =>
                                    t.value === bookingDetails.transportation
                                )?.color
                              } text-white`}
                            >
                              <Clock className="h-3 w-3 mr-1" />
                              {time}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  <div>
                    <Label className="text-gray-700 font-medium">
                      Hotel Category
                    </Label>
                    <div className="grid gap-3 mt-2">
                      {hotelOptions.map((hotel) => (
                        <Card
                          key={hotel.value}
                          className={`cursor-pointer transition-all border-2 ${
                            bookingDetails.hotel === hotel.value
                              ? `ring-2 ring-green-500 ${hotel.bgColor}`
                              : `hover:${hotel.bgColor} border-gray-200`
                          }`}
                          onClick={() =>
                            setBookingDetails({
                              ...bookingDetails,
                              hotel: hotel.value,
                            })
                          }
                        >
                          <CardContent className="p-4">
                            <div className="flex justify-between items-start">
                              <div>
                                <div className="flex items-center gap-2 mb-1">
                                  <div className={`p-1 rounded ${hotel.color}`}>
                                    <Hotel className="h-4 w-4 text-white" />
                                  </div>
                                  <h4 className="font-semibold text-gray-800">
                                    {hotel.label}
                                  </h4>
                                  <div className="flex">
                                    {[...Array(hotel.rating)].map((_, i) => (
                                      <Star
                                        key={i}
                                        className="h-3 w-3 fill-yellow-400 text-yellow-400"
                                      />
                                    ))}
                                  </div>
                                </div>
                                <div className="flex flex-wrap gap-1 mb-2">
                                  {hotel.amenities.map((amenity) => (
                                    <Badge
                                      key={amenity}
                                      variant="secondary"
                                      className="text-xs bg-gray-100 text-gray-700"
                                    >
                                      {amenity}
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                              <div className="text-right">
                                <p
                                  className={`font-semibold text-lg ${hotel.color.replace(
                                    "bg-",
                                    "text-"
                                  )}`}
                                >
                                  PKR {hotel.price.toLocaleString()}
                                </p>
                                <p className="text-xs text-gray-500">
                                  per person/night
                                </p>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Card className="sticky top-24 bg-gradient-to-br from-white to-green-50 shadow-xl border-0">
                <CardHeader className="bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-t-lg">
                  <CardTitle className="flex items-center gap-2">
                    <CreditCard className="h-5 w-5" />
                    Price Summary
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 p-6">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-2 bg-blue-50 rounded">
                      <span className="text-gray-700">
                        Package ({bookingDetails.persons} persons)
                      </span>
                      <span className="font-semibold text-blue-600">
                        PKR{" "}
                        {(
                          selectedPackage.basePrice * bookingDetails.persons
                        ).toLocaleString()}
                      </span>
                    </div>

                    <div className="flex justify-between items-center p-2 bg-purple-50 rounded">
                      <span className="text-gray-700">Transportation</span>
                      <span className="font-semibold text-purple-600">
                        PKR{" "}
                        {(
                          transportationOptions.find(
                            (t) => t.value === bookingDetails.transportation
                          )?.price * bookingDetails.persons || 0
                        ).toLocaleString()}
                      </span>
                    </div>

                    {getDays() > 0 && (
                      <div className="flex justify-between items-center p-2 bg-orange-50 rounded">
                        <span className="text-gray-700">
                          Hotel ({getDays()} nights)
                        </span>
                        <span className="font-semibold text-orange-600">
                          PKR{" "}
                          {(
                            hotelOptions.find(
                              (h) => h.value === bookingDetails.hotel
                            )?.price *
                              bookingDetails.persons *
                              getDays() || 0
                          ).toLocaleString()}
                        </span>
                      </div>
                    )}
                  </div>

                  <Separator />

                  <div className="flex justify-between font-bold text-xl p-3 bg-gradient-to-r from-green-100 to-blue-100 rounded-lg">
                    <span className="text-gray-800">Total</span>
                    <span className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                      PKR {totalPrice.toLocaleString()}
                    </span>
                  </div>

                  <Dialog open={showInvoice} onOpenChange={setShowInvoice}>
                    <DialogTrigger asChild>
                      <Button
                        className="w-full bg-green-600 hover:bg-green-700"
                        size="lg"
                        onClick={handleBooking}
                        disabled={
                          !bookingDetails.checkIn ||
                          !bookingDetails.checkOut ||
                          totalPrice === 0
                        }
                      >
                        Book Now
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                      <DialogHeader>
                        <DialogTitle className="text-center text-green-600">
                          Booking Invoice
                        </DialogTitle>
                      </DialogHeader>

                      <div className="space-y-6">
                        {/* Invoice Header */}
                        <div className="text-center border-b pb-4">
                          <h2 className="text-2xl font-bold text-green-600">
                            Travel Hub
                          </h2>
                          <p className="text-gray-600">
                            Your AI-Powered Travel Companion
                          </p>
                          <p className="text-sm text-gray-500">
                            Invoice #TH-{Date.now().toString().slice(-6)}
                          </p>
                        </div>

                        {/* Customer & Trip Details */}
                        <div className="grid md:grid-cols-2 gap-6">
                          <div>
                            <h3 className="font-semibold mb-2">Trip Details</h3>
                            <div className="space-y-1 text-sm">
                              <p>
                                <strong>Package:</strong> {selectedPackage.name}
                              </p>
                              <p>
                                <strong>Destination:</strong>{" "}
                                {selectedPackage.location}
                              </p>
                              <p>
                                <strong>Persons:</strong>{" "}
                                {bookingDetails.persons}
                              </p>
                              {bookingDetails.checkIn &&
                                bookingDetails.checkOut && (
                                  <>
                                    <p>
                                      <strong>Check-in:</strong>{" "}
                                      {format(bookingDetails.checkIn, "PPP")}
                                    </p>
                                    <p>
                                      <strong>Check-out:</strong>{" "}
                                      {format(bookingDetails.checkOut, "PPP")}
                                    </p>
                                    <p>
                                      <strong>Duration:</strong> {getDays()}{" "}
                                      days
                                    </p>
                                  </>
                                )}
                            </div>
                          </div>

                          <div>
                            <h3 className="font-semibold mb-2">
                              Services Included
                            </h3>
                            <div className="space-y-1 text-sm">
                              <p>
                                •{" "}
                                {
                                  transportationOptions.find(
                                    (t) =>
                                      t.value === bookingDetails.transportation
                                  )?.label
                                }
                              </p>
                              <p>
                                •{" "}
                                {
                                  hotelOptions.find(
                                    (h) => h.value === bookingDetails.hotel
                                  )?.label
                                }
                              </p>
                              <p>• Tour Guide & Activities</p>
                              <p>• Travel Insurance</p>
                              <p>• 24/7 Support</p>
                            </div>
                          </div>
                        </div>

                        {/* Price Breakdown */}
                        <div className="border rounded-lg p-4">
                          <h3 className="font-semibold mb-3">
                            Price Breakdown
                          </h3>
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span>
                                Package Cost ({bookingDetails.persons} persons)
                              </span>
                              <span>
                                PKR{" "}
                                {(
                                  selectedPackage.basePrice *
                                  bookingDetails.persons
                                ).toLocaleString()}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span>
                                Transportation ({bookingDetails.persons}{" "}
                                persons)
                              </span>
                              <span>
                                PKR{" "}
                                {(
                                  transportationOptions.find(
                                    (t) =>
                                      t.value === bookingDetails.transportation
                                  )?.price * bookingDetails.persons || 0
                                ).toLocaleString()}
                              </span>
                            </div>
                            {getDays() > 0 && (
                              <div className="flex justify-between">
                                <span>
                                  Accommodation ({getDays()} nights ×{" "}
                                  {bookingDetails.persons} persons)
                                </span>
                                <span>
                                  PKR{" "}
                                  {(
                                    hotelOptions.find(
                                      (h) => h.value === bookingDetails.hotel
                                    )?.price *
                                      bookingDetails.persons *
                                      getDays() || 0
                                  ).toLocaleString()}
                                </span>
                              </div>
                            )}
                            <Separator />
                            <div className="flex justify-between font-bold text-lg">
                              <span>Total Amount</span>
                              <span className="text-green-600">
                                PKR {totalPrice.toLocaleString()}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Payment Details */}
                        <div className="bg-green-50 p-4 rounded-lg">
                          <h3 className="font-semibold mb-2 text-green-800">
                            Payment Details
                          </h3>
                          <div className="space-y-1 text-sm text-green-700">
                            <p>
                              <strong>Bank:</strong> Travel Hub Bank
                            </p>
                            <p>
                              <strong>Account Title:</strong> Travel Hub (Pvt)
                              Ltd
                            </p>
                            <p>
                              <strong>Account Number:</strong>{" "}
                              0123-4567-8901-2345
                            </p>
                            <p>
                              <strong>IBAN:</strong> PK36TRHB0123456789012345
                            </p>
                            <p>
                              <strong>Branch Code:</strong> 1234
                            </p>
                          </div>
                          <div className="mt-3 p-2 bg-yellow-100 rounded text-xs text-yellow-800">
                            <strong>Note:</strong> Please transfer the amount
                            and send payment confirmation to
                            bookings@travelhub.pk
                          </div>
                        </div>

                        {/* Terms */}
                        <div className="text-xs text-gray-500 space-y-1">
                          <p>
                            <strong>Terms & Conditions:</strong>
                          </p>
                          <p>• Full payment required 7 days before departure</p>
                          <p>• Cancellation charges apply as per policy</p>
                          <p>• Travel insurance is mandatory</p>
                          <p>
                            • Valid CNIC/Passport required for all travelers
                          </p>
                        </div>

                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            className="flex-1 bg-transparent"
                            onClick={() => setShowInvoice(false)}
                          >
                            Close
                          </Button>
                          <Button
                            className="flex-1 bg-green-600 hover:bg-green-700"
                            onClick={() => window.print()}
                          >
                            Print Invoice
                          </Button>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default BookingPage;
