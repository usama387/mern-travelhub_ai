import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import { format } from "date-fns";
import { CalendarIcon, Plane, Train, Hotel, Clock } from "lucide-react";

const BookingForm = ({ packageDetails, bookingDetails, setBookingDetails }) => {
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

  const hasHotelUpgrade = () => {
    const selectedOrder = hotelCategories[bookingDetails.hotel]?.order || 1;
    const packageOrder = hotelCategories[packageHotelType]?.order || 1;
    return selectedOrder > packageOrder;
  };

  const getAvailableTimings = () => {
    if (!bookingDetails.checkIn) return [];
    const selectedTransport = transportationOptions.find(
      (t) => t.value === bookingDetails.transportation
    );
    return selectedTransport?.timings || [];
  };

  return (
    <Card className="bg-white shadow-lg border-0">
      <CardHeader className="bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-t-lg">
        <CardTitle>Booking Details</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6 p-6">
        {/* Number of Persons */}
        <div>
          <Label htmlFor="persons" className="text-gray-700 font-medium">
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
              {Array.from({ length: packageDetails.peopleCount || 8 }, (_, i) => i + 1).map((num) => (
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
            <Label className="text-gray-700 font-medium">Check-in Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <button
                  className="w-full justify-start text-left font-normal bg-blue-50 border-blue-200 hover:bg-blue-100 border rounded-md px-3 py-2 flex items-center"
                >
                  <CalendarIcon className="mr-2 h-4 w-4 text-blue-500" />
                  {bookingDetails.checkIn
                    ? format(bookingDetails.checkIn, "PPP")
                    : "Select date"}
                </button>
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
            <Label className="text-gray-700 font-medium">Check-out Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <button
                  className="w-full justify-start text-left font-normal bg-green-50 border-green-200 hover:bg-green-100 border rounded-md px-3 py-2 flex items-center"
                >
                  <CalendarIcon className="mr-2 h-4 w-4 text-green-500" />
                  {bookingDetails.checkOut
                    ? format(bookingDetails.checkOut, "PPP")
                    : "Select date"}
                </button>
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

        {bookingDetails.checkIn && bookingDetails.checkOut && (
          <Badge className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">
            Duration: {(new Date(bookingDetails.checkOut) - new Date(bookingDetails.checkIn)) / (1000 * 60 * 60 * 24)} days
            {(new Date(bookingDetails.checkOut) - new Date(bookingDetails.checkIn)) / (1000 * 60 * 60 * 24) > packageDetails.duration && (
              <span className="ml-2">({(new Date(bookingDetails.checkOut) - new Date(bookingDetails.checkIn)) / (1000 * 60 * 60 * 24) - packageDetails.duration} extra days)</span>
            )}
          </Badge>
        )}

        {/* Transportation */}
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
                      {option.label} - PKR {option.price.toLocaleString()} (
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
                Available Timings for {format(bookingDetails.checkIn, "PPP")}
              </Label>
              <div className="flex flex-wrap gap-2 mt-2">
                {getAvailableTimings().map((time, index) => (
                  <Badge
                    key={index}
                    className={`${transportationOptions.find((t) => t.value === bookingDetails.transportation)?.color} text-white`}
                  >
                    <Clock className="h-3 w-3 mr-1" />
                    {time}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Hotel Category */}
        <div>
          <Label className="text-gray-700 font-medium">Hotel Category</Label>
          <div className="text-sm text-gray-600 mb-2">
            Package includes: {hotelCategories[packageHotelType]?.label}
            {hasHotelUpgrade() && (
              <span className="ml-2 text-green-600">
                (Upgrading to {hotelCategories[bookingDetails.hotel]?.label})
              </span>
            )}
          </div>
          <div className="grid gap-3 mt-2">
            {Object.entries(hotelCategories).map(([value, hotel]) => {
              const isIncluded = value === packageHotelType;
              const isSelected = bookingDetails.hotel === value;
              const isUpgrade = hotel.order > hotelCategories[packageHotelType]?.order;
              return (
                <Card
                  key={value}
                  className={`cursor-pointer transition-all border-2 ${
                    isSelected
                      ? `ring-2 ring-green-500 bg-green-50 border-green-200`
                      : `hover:bg-gray-50 border-gray-200`
                  }`}
                  onClick={() =>
                    setBookingDetails({
                      ...bookingDetails,
                      hotel: value,
                    })
                  }
                >
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <div className="p-1 rounded bg-blue-500">
                            <Hotel className="h-4 w-4 text-white" />
                          </div>
                          <h4 className="font-semibold text-gray-800">
                            {hotel.label}
                            {isIncluded && (
                              <Badge className="ml-2 bg-green-500 text-xs">
                                Included
                              </Badge>
                            )}
                          </h4>
                        </div>
                        {isUpgrade && (
                          <p className="text-sm text-green-600 mb-2">
                            + PKR {hotel.price.toLocaleString()} per person per night
                          </p>
                        )}
                      </div>
                      <div className="text-right">
                        {isUpgrade ? (
                          <>
                            <p className="font-semibold text-lg text-green-600">
                              + PKR {hotel.price.toLocaleString()}
                            </p>
                            <p className="text-xs text-gray-500">
                              upgrade per night
                            </p>
                          </>
                        ) : (
                          <p className="text-sm text-gray-500">
                            {isIncluded ? "Included" : "Not available"}
                          </p>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BookingForm;