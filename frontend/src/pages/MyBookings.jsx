import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import {
  Calendar,
  MapPin,
  Users,
  Clock,
  Plane,
  Train,
  Hotel,
} from "lucide-react";
import { useUser } from "@clerk/clerk-react";
import {
  useCancelUserBookingMutation,
  useGetUserBookingsQuery,
} from "@/features/api/bookingApi";
import { toast } from "sonner";
import { Skeleton } from "@/components/ui/skeleton";
import { useNavigate } from "react-router-dom";

const MyBookings = () => {
  const { user, isLoaded: isUserLoaded } = useUser();
  const userId = user?.id;

  // Fetch user bookings
  const {
    data: bookingsData,
    isLoading,
    isError,
    refetch,
  } = useGetUserBookingsQuery(userId, {
    skip: !userId,
    refetchOnMountOrArgChange: true,
  });

  const [cancelUserBooking, { isLoading: isCancelling }] =
    useCancelUserBookingMutation();

  const [filteredBookings, setFilteredBookings] = useState([]);
  const [statusFilter, setStatusFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Process and filter bookings
  useEffect(() => {
    if (bookingsData?.bookings) {
      let filtered = [...bookingsData.bookings];

      if (statusFilter !== "all") {
        filtered = filtered.filter(
          (booking) => booking.status.toLowerCase() === statusFilter
        );
      }

      if (searchTerm) {
        filtered = filtered.filter(
          (booking) =>
            booking.package.destination
              .toLowerCase()
              .includes(searchTerm.toLowerCase()) ||
            booking.package.location
              .toLowerCase()
              .includes(searchTerm.toLowerCase()) ||
            booking.id.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }

      setFilteredBookings(filtered);
      setCurrentPage(1);
    }
  }, [statusFilter, searchTerm, bookingsData]);

  const navigate = useNavigate();

  // Handle cancel booking
  const handleCancel = async (bookingId) => {
    if (!userId) return;

    try {
      await cancelUserBooking({ userId, bookingId }).unwrap();
      toast.success("Booking cancelled successfully!");
      refetch(); // Refresh the bookings list
    } catch (err) {
      console.error("Cancel booking error:", err);
      toast.error("Failed to cancel booking");
    }
  };

  // Pagination
  const totalPages = Math.ceil(filteredBookings.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedBookings = filteredBookings.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  // Helper functions
  const getStatusColor = (status) => {
    switch (status) {
      case "CONFIRMED":
        return "bg-green-100 text-green-800 border-green-200";
      case "PENDING":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "CANCELLED":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case "EASY":
        return "bg-green-100 text-green-700";
      case "MODERATE":
        return "bg-yellow-100 text-yellow-700";
      case "EXTREME":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-PK", {
      style: "currency",
      currency: "PKR",
      minimumFractionDigits: 0,
    }).format(price);
  };

  // Loading state
  if (!isUserLoaded || isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50">
        <main className="container mx-auto px-4 py-8">
          <div className="mb-8">
            <Skeleton className="h-10 w-64 mb-2" />
            <Skeleton className="h-4 w-96" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            {[...Array(4)].map((_, i) => (
              <Card key={i}>
                <CardHeader className="pb-2">
                  <Skeleton className="h-4 w-32" />
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-7 w-16" />
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="mb-6">
            <CardHeader>
              <Skeleton className="h-6 w-32" />
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row gap-4">
                <Skeleton className="h-10 flex-1" />
                <Skeleton className="h-10 w-48" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <Skeleton className="h-6 w-40" />
              <Skeleton className="h-4 w-60" />
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[...Array(5)].map((_, i) => (
                  <Skeleton key={i} className="h-24 w-full" />
                ))}
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    );
  }

  // Error state
  if (isError) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 flex items-center justify-center">
        <Card className="w-full max-w-md mx-4">
          <CardHeader>
            <CardTitle className="text-red-600">
              Error Loading Bookings
            </CardTitle>
            <CardDescription>
              There was a problem loading your bookings. Please try again.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={refetch}>Retry</Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const bookings = bookingsData?.bookings || [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50">
      <main className="container mx-auto px-4 py-8 mt-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              My Bookings
            </h1>
            <p className="text-gray-600">
              Manage and track all your travel bookings
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">
                    Total Bookings
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{bookings.length}</div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">
                    Confirmed
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {bookings.filter((b) => b.status === "CONFIRMED").length}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <Card className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-white">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Pending</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {bookings.filter((b) => b.status === "PENDING").length}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">
                    Total Spent
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {formatPrice(
                      bookings.reduce((sum, b) => sum + b.totalPrice, 0)
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Filter Bookings</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1">
                    <Input
                      placeholder="Search by destination, location, or booking ID..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full"
                    />
                  </div>
                  <div className="w-full md:w-48">
                    <Select
                      value={statusFilter}
                      onValueChange={setStatusFilter}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Filter by status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Status</SelectItem>
                        <SelectItem value="confirmed">Confirmed</SelectItem>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="cancelled">Cancelled</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Bookings Table */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Booking Details</CardTitle>
                <CardDescription>
                  Showing {paginatedBookings.length} of{" "}
                  {filteredBookings.length} bookings
                </CardDescription>
              </CardHeader>
              <CardContent>
                {bookings.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-gray-500">
                      You don't have any bookings yet.
                    </p>
                    <Button className="mt-4">Explore Packages</Button>
                  </div>
                ) : (
                  <>
                    <div className="overflow-x-auto">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Package</TableHead>
                            <TableHead>Dates</TableHead>
                            <TableHead>Details</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Total Price</TableHead>
                            <TableHead>Actions</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {paginatedBookings.map((booking) => (
                            <TableRow key={booking.id}>
                              <TableCell>
                                <div className="flex items-center space-x-3">
                                  <img
                                    src={
                                      booking.package.imageUrl ||
                                      "/placeholder.svg"
                                    }
                                    alt={booking.package.destination}
                                    className="w-16 h-16 rounded-lg object-cover"
                                  />
                                  <div>
                                    <div className="font-semibold text-gray-900">
                                      {booking.package.destination}
                                    </div>
                                    <div className="text-sm text-gray-500 flex items-center">
                                      <MapPin className="w-3 h-3 mr-1" />
                                      {booking.package.location}
                                    </div>
                                    <Badge
                                      className={`text-xs mt-1 ${getDifficultyColor(
                                        booking.package.difficulty
                                      )}`}
                                    >
                                      {booking.package.difficulty}
                                    </Badge>
                                  </div>
                                </div>
                              </TableCell>
                              <TableCell>
                                <div className="space-y-1">
                                  <div className="flex items-center text-sm">
                                    <Calendar className="w-3 h-3 mr-1 text-green-600" />
                                    <span className="font-medium">
                                      Check-in:
                                    </span>
                                  </div>
                                  <div className="text-sm text-gray-600">
                                    {formatDate(booking.checkIn)}
                                  </div>
                                  <div className="flex items-center text-sm">
                                    <Calendar className="w-3 h-3 mr-1 text-red-600" />
                                    <span className="font-medium">
                                      Check-out:
                                    </span>
                                  </div>
                                  <div className="text-sm text-gray-600">
                                    {formatDate(booking.checkOut)}
                                  </div>
                                </div>
                              </TableCell>
                              <TableCell>
                                <div className="space-y-2">
                                  <div className="flex items-center text-sm">
                                    <Users className="w-3 h-3 mr-1 text-blue-600" />
                                    <span>{booking.persons} persons</span>
                                  </div>
                                  <div className="flex items-center text-sm">
                                    <Hotel className="w-3 h-3 mr-1 text-purple-600" />
                                    <span>{booking.hotel}</span>
                                  </div>
                                  <div className="flex items-center text-sm">
                                    {booking.transportation === "pia" ? (
                                      <Plane className="w-3 h-3 mr-1 text-green-600" />
                                    ) : (
                                      <Train className="w-3 h-3 mr-1 text-orange-600" />
                                    )}
                                    <span className="capitalize">
                                      {booking.transportation}
                                    </span>
                                  </div>
                                  <div className="flex items-center text-sm">
                                    <Clock className="w-3 h-3 mr-1 text-gray-600" />
                                    <span>{booking.package.duration} days</span>
                                  </div>
                                </div>
                              </TableCell>
                              <TableCell>
                                <Badge
                                  className={getStatusColor(booking.status)}
                                >
                                  {booking.status}
                                </Badge>
                              </TableCell>
                              <TableCell>
                                <div className="font-semibold text-lg text-green-600">
                                  {formatPrice(booking.totalPrice)}
                                </div>
                                <div className="text-xs text-gray-500">
                                  Base: {formatPrice(booking.package.price)}
                                </div>
                              </TableCell>
                              <TableCell>
                                <div className="flex flex-col space-y-2">
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    className="text-xs bg-transparent"
                                    onClick={() =>
                                      navigate(
                                        `/booking/${booking.package.id}`
                                      )
                                    }
                                  >
                                    View Details
                                  </Button>
                                  {booking.status === "PENDING" && (
                                    <Button
                                      size="sm"
                                      variant="destructive"
                                      className="text-xs"
                                      onClick={() => handleCancel(booking.id)}
                                      disabled={isCancelling}
                                    >
                                      {isCancelling
                                        ? "Cancelling..."
                                        : "Cancel"}
                                    </Button>
                                  )}
                                </div>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>

                    {/* Pagination */}
                    {totalPages > 1 && (
                      <div className="flex items-center justify-between mt-6">
                        <div className="text-sm text-gray-500">
                          Page {currentPage} of {totalPages}
                        </div>
                        <div className="flex space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() =>
                              setCurrentPage((prev) => Math.max(prev - 1, 1))
                            }
                            disabled={currentPage === 1}
                          >
                            Previous
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() =>
                              setCurrentPage((prev) =>
                                Math.min(prev + 1, totalPages)
                              )
                            }
                            disabled={currentPage === totalPages}
                          >
                            Next
                          </Button>
                        </div>
                      </div>
                    )}
                  </>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </main>
    </div>
  );
};

export default MyBookings;
