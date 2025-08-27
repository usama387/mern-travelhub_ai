import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { CreditCard, Mail } from "lucide-react";
import { format } from "date-fns";
import { useCreateNewBookingMutation } from "@/features/api/bookingApi";
import { useUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const PriceSummary = ({
  packageDetails,
  bookingDetails,
  totalPrice,
  calculateTotalPrice,
}) => {
  const { user } = useUser();
  const userId = user?.id;

  const [showInvoice, setShowInvoice] = useState(false);
  const [createBooking, { isLoading, isSuccess, isError, error }] =
    useCreateNewBookingMutation();

  const navigate = useNavigate();

  useEffect(() => {
    if (isSuccess) {
      toast.success(
        "Your request for booking has been received and is waiting admin approval."
      );
      navigate("/my-bookings"); // redirect to My Bookings
    }
  }, [isSuccess, navigate]);

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

  const packageHotelType =
    packageDetails.hotelType?.toLowerCase() || "standard";

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
    const stayDays =
      (new Date(bookingDetails.checkOut) - new Date(bookingDetails.checkIn)) /
      (1000 * 60 * 60 * 24);
    return Math.max(0, stayDays - packageDetails.duration);
  };

  // In PriceSummary.jsx
  const handleConfirmBooking = async () => {
    if (!userId) {
      console.error("User not authenticated");
      return;
    }

    const requestData = {
      userId,
      packageId: packageDetails.id,
      persons: bookingDetails.persons,
      checkIn: bookingDetails.checkIn.toISOString(),
      checkOut: bookingDetails.checkOut.toISOString(),
      transportation: bookingDetails.transportation,
      hotel: bookingDetails.hotel.toUpperCase(),
      totalPrice,
    };
    try {
      await createBooking(requestData).unwrap();
      setShowInvoice(false);
    } catch (err) {
      console.error("Booking failed:", err);
    }
  };

  return (
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
                  packageDetails.price * bookingDetails.persons
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
            {hasHotelUpgrade() && (
              <div className="flex justify-between items-center p-2 bg-orange-50 rounded">
                <span className="text-gray-700">
                  Hotel Upgrade ({packageDetails.duration} nights)
                </span>
                <span className="font-semibold text-orange-600">
                  PKR{" "}
                  {(
                    getHotelUpgradeCost() *
                    bookingDetails.persons *
                    packageDetails.duration
                  ).toLocaleString()}
                </span>
              </div>
            )}
            {getExtraDays() > 0 && (
              <div className="flex justify-between items-center p-2 bg-yellow-50 rounded">
                <span className="text-gray-700">
                  Extra Days ({getExtraDays()} nights)
                </span>
                <span className="font-semibold text-yellow-600">
                  PKR{" "}
                  {(
                    (hotelCategories[bookingDetails.hotel]?.price || 0) *
                    bookingDetails.persons *
                    getExtraDays()
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
          {isSuccess && (
            <div className="text-green-600 text-sm">
              We have received your request for booking please pay the amount
              and share details.
            </div>
          )}
          {isError && (
            <div className="text-red-600 text-sm">
              Failed to create booking:{" "}
              {error?.data?.message || "Please try again."}
            </div>
          )}
          <Dialog open={showInvoice} onOpenChange={setShowInvoice}>
            <DialogTrigger asChild>
              <Button
                className="w-full bg-green-600 hover:bg-green-700"
                size="lg"
                disabled={
                  !bookingDetails.checkIn ||
                  !bookingDetails.checkOut ||
                  totalPrice === 0 ||
                  isLoading ||
                  !userId
                }
              >
                {isLoading ? "Processing..." : "Book Now"}
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle className="text-center text-green-600">
                  Booking Invoice
                </DialogTitle>
              </DialogHeader>
              <div className="space-y-6">
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
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold mb-2">Trip Details</h3>
                    <div className="space-y-1 text-sm">
                      <p>
                        <strong>Package:</strong> {packageDetails.destination}
                      </p>
                      <p>
                        <strong>Destination:</strong> {packageDetails.location}
                      </p>
                      <p>
                        <strong>Persons:</strong> {bookingDetails.persons}
                      </p>
                      {bookingDetails.checkIn && bookingDetails.checkOut && (
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
                            <strong>Duration:</strong>{" "}
                            {(new Date(bookingDetails.checkOut) -
                              new Date(bookingDetails.checkIn)) /
                              (1000 * 60 * 60 * 24)}{" "}
                            days
                          </p>
                        </>
                      )}
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Services Included</h3>
                    <div className="space-y-1 text-sm">
                      <p>
                        •{" "}
                        {
                          transportationOptions.find(
                            (t) => t.value === bookingDetails.transportation
                          )?.label
                        }
                      </p>
                      <p>
                        • {hotelCategories[packageHotelType]?.label} (included)
                        {hasHotelUpgrade() && (
                          <span>
                            {" "}
                            + Upgrade to{" "}
                            {hotelCategories[bookingDetails.hotel]?.label}
                          </span>
                        )}
                      </p>
                      <p>• Tour Guide & Activities</p>
                      <p>• Travel Insurance</p>
                      <p>• 24/7 Support</p>
                    </div>
                  </div>
                </div>
                <div className="border rounded-lg p-4">
                  <h3 className="font-semibold mb-3">Price Breakdown</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>
                        Package Cost ({bookingDetails.persons} persons)
                      </span>
                      <span>
                        PKR{" "}
                        {(
                          packageDetails.price * bookingDetails.persons
                        ).toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>
                        Transportation ({bookingDetails.persons} persons)
                      </span>
                      <span>
                        PKR{" "}
                        {(
                          transportationOptions.find(
                            (t) => t.value === bookingDetails.transportation
                          )?.price * bookingDetails.persons || 0
                        ).toLocaleString()}
                      </span>
                    </div>
                    {hasHotelUpgrade() && (
                      <div className="flex justify-between">
                        <span>
                          Hotel Upgrade ({packageDetails.duration} nights ×{" "}
                          {bookingDetails.persons} persons)
                        </span>
                        <span>
                          PKR{" "}
                          {(
                            getHotelUpgradeCost() *
                            bookingDetails.persons *
                            packageDetails.duration
                          ).toLocaleString()}
                        </span>
                      </div>
                    )}
                    {getExtraDays() > 0 && (
                      <div className="flex justify-between">
                        <span>
                          Extra Days ({getExtraDays()} nights ×{" "}
                          {bookingDetails.persons} persons)
                        </span>
                        <span>
                          PKR{" "}
                          {(
                            (hotelCategories[bookingDetails.hotel]?.price ||
                              0) *
                            bookingDetails.persons *
                            getExtraDays()
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
                <div className="bg-green-50 p-4 rounded-lg">
                  <h3 className="font-semibold mb-2 text-green-800">
                    Payment Details
                  </h3>
                  <div className="space-y-1 text-sm text-green-700">
                    <p>
                      <strong>Bank:</strong> Travel Hub Bank
                    </p>
                    <p>
                      <strong>Account Title:</strong> Travel Hub (Pvt) Ltd
                    </p>
                    <p>
                      <strong>Account Number:</strong> 0123-4567-8901-2345
                    </p>
                    <p>
                      <strong>IBAN:</strong> PK36TRHB0123456789012345
                    </p>
                    <p>
                      <strong>Branch Code:</strong> 1234
                    </p>
                  </div>
                  <div className="mt-3 p-2 bg-yellow-100 rounded text-xs text-yellow-800">
                    <strong>Note:</strong> Please transfer the amount and send
                    payment confirmation to bookings@travelhub.pk
                  </div>
                </div>
                <Card className="bg-blue-50 p-4 rounded-lg">
                  <CardHeader className="p-0 mb-2">
                    <CardTitle className="text-sm font-semibold text-blue-800 flex items-center gap-2">
                      <Mail className="h-4 w-4" />
                      Transaction Confirmation
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-0">
                    <p className="text-sm text-blue-700">
                      After paying the amount, please email your transaction
                      screenshot to{" "}
                      <a
                        href="mailto:bookings@travelhub.pk"
                        className="underline text-blue-600"
                      >
                        bookings@travelhub.pk
                      </a>{" "}
                      to confirm your payment.
                    </p>
                  </CardContent>
                </Card>
                <div className="text-xs text-gray-500 space-y-1">
                  <p>
                    <strong>Terms & Conditions:</strong>
                  </p>
                  <p>• Full payment required 7 days before departure</p>
                  <p>• Cancellation charges apply as per policy</p>
                  <p>• Travel insurance is mandatory</p>
                  <p>• Valid CNIC/Passport required for all travelers</p>
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
                    onClick={handleConfirmBooking}
                    disabled={isLoading || !userId}
                  >
                    {isLoading ? "Requesting..." : "Request Booking"}
                  </Button>
                  <Button
                    className="flex-1 bg-blue-600 hover:bg-blue-700"
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
  );
};

export default PriceSummary;
