import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ChevronLeft,
  ChevronRight,
  Edit,
  Trash2,
  Eye,
  Calendar,
  MapPin,
  DollarSign,
  RefreshCw,
  Clock,
  Users,
  Home,
  Utensils,
  Car,
} from "lucide-react";
import UpdatePackageDialog from "./UpdatePackageDialog";
import DeletePackageDialog from "./DeletePackageDialog";
import { useGetAllPackagesQuery } from "@/features/api/packageApi";
import { Skeleton } from "@/components/ui/skeleton";

// Skeleton component for table rows
const TableRowSkeleton = () => (
  <TableRow>
    <TableCell>
      <div className="flex items-start gap-3">
        <Skeleton className="w-16 h-16 rounded-lg" />
        <div className="space-y-2">
          <Skeleton className="h-5 w-40" />
          <Skeleton className="h-4 w-60" />
          <div className="flex gap-1">
            <Skeleton className="h-6 w-16" />
            <Skeleton className="h-6 w-16" />
          </div>
        </div>
      </div>
    </TableCell>
    <TableCell>
      <div className="space-y-2">
        <Skeleton className="h-4 w-32" />
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-6 w-16" />
      </div>
    </TableCell>
    <TableCell>
      <div className="space-y-2">
        <Skeleton className="h-4 w-20" />
        <Skeleton className="h-6 w-16" />
      </div>
    </TableCell>
    <TableCell>
      <div className="space-y-1">
        <Skeleton className="h-3 w-28" />
        <Skeleton className="h-3 w-28" />
      </div>
    </TableCell>
    <TableCell>
      <div className="flex justify-end gap-2">
        <Skeleton className="h-8 w-8" />
        <Skeleton className="h-8 w-8" />
      </div>
    </TableCell>
  </TableRow>
);

const PackagesTable = () => {
  const { data, isLoading, error, refetch } = useGetAllPackagesQuery();
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [isUpdateDialogOpen, setIsUpdateDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [packagesData, setPackagesData] = useState([]);

  // Update local state when data changes
  useEffect(() => {
    if (data && data.packages) {
      setPackagesData(data.packages);
    }
  }, [data]);

  const packagesPerPage = 5;
  const totalPages = Math.ceil(packagesData.length / packagesPerPage);

  const startIndex = (currentPage - 1) * packagesPerPage;
  const endIndex = startIndex + packagesPerPage;
  const currentPackages = packagesData.slice(startIndex, endIndex);

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

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case "EASY":
        return "bg-green-100 text-green-800";
      case "MODERATE":
        return "bg-yellow-100 text-yellow-800";
      case "EXTREME":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getHotelTypeColor = (type) => {
    switch (type) {
      case "STANDARD":
        return "bg-blue-100 text-blue-800";
      case "DELUXE":
        return "bg-purple-100 text-purple-800";
      case "LUXURY":
        return "bg-orange-100 text-orange-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const handleEdit = (pkg) => {
    setSelectedPackage(pkg);
    setIsUpdateDialogOpen(true);
  };

  const handleDelete = (pkg) => {
    setSelectedPackage(pkg);
    setIsDeleteDialogOpen(true);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
    >
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-gray-700">
            <Eye className="h-5 w-5" />
            All Packages
          </CardTitle>
          <Button 
            onClick={refetch} 
            variant="outline" 
            size="sm"
            disabled={isLoading}
          >
            <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
        </CardHeader>
        <CardContent>
          {error && (
            <div className="mb-4 p-4 bg-red-50 rounded-lg text-red-700">
              Error loading packages. Please try again.
            </div>
          )}

          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Package Details</TableHead>
                  <TableHead>Location & Hotel</TableHead>
                  <TableHead>Package Info</TableHead>
                  <TableHead>Price & Difficulty</TableHead>
                  <TableHead>Recent Activity</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  // Show skeleton loaders while loading
                  Array.from({ length: packagesPerPage }).map((_, index) => (
                    <TableRowSkeleton key={index} />
                  ))
                ) : packagesData.length > 0 ? (
                  // Render actual package data
                  currentPackages.map((pkg) => (
                    <TableRow key={pkg.id} className="hover:bg-gray-50">
                      <TableCell>
                        <div className="flex items-start gap-3">
                          <img
                            src={pkg.imageUrl || "/placeholder.svg"}
                            alt={pkg.destination}
                            className="w-16 h-16 rounded-lg object-cover"
                          />
                          <div>
                            <h3 className="font-semibold text-gray-900">
                              {pkg.destination}
                            </h3>
                            <p className="text-sm text-gray-600 line-clamp-2 max-w-xs">
                              {pkg.description}
                            </p>
                            <div className="flex flex-wrap gap-1 mt-1">
                              {pkg.features.slice(0, 2).map((feature, index) => (
                                <Badge
                                  key={index}
                                  variant="outline"
                                  className="text-xs"
                                >
                                  {feature}
                                </Badge>
                              ))}
                              {pkg.features.length > 2 && (
                                <Badge variant="outline" className="text-xs">
                                  +{pkg.features.length - 2} more
                                </Badge>
                              )}
                            </div>
                          </div>
                        </div>
                      </TableCell>

                      <TableCell>
                        <div className="space-y-2">
                          <div className="flex items-center gap-1 text-sm">
                            <MapPin className="h-3 w-3 text-gray-500" />
                            <span className="text-gray-700">{pkg.location}</span>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-900">
                              {pkg.hotelName}
                            </p>
                            <Badge
                              className={`text-xs ${getHotelTypeColor(
                                pkg.hotelType
                              )}`}
                            >
                              {pkg.hotelType}
                            </Badge>
                          </div>
                        </div>
                      </TableCell>

                      <TableCell>
                        <div className="space-y-2">
                          <div className="flex items-center gap-1 text-sm">
                            <Clock className="h-3 w-3 text-gray-500" />
                            <span>{pkg.duration} days</span>
                          </div>
                          <div className="flex items-center gap-1 text-sm">
                            <Users className="h-3 w-3 text-gray-500" />
                            <span>{pkg.peopleCount} people</span>
                          </div>
                          <div className="flex items-center gap-1 text-sm">
                            <Home className="h-3 w-3 text-gray-500" />
                            <span>{pkg.roomsCount} rooms</span>
                          </div>
                          {pkg.complementaryBreakfast && (
                            <div className="flex items-center gap-1 text-sm">
                              <Utensils className="h-3 w-3 text-green-600" />
                              <span className="text-green-600">Breakfast included</span>
                            </div>
                          )}
                          {pkg.pickAndDrop && (
                            <div className="flex items-center gap-1 text-sm">
                              <Car className="h-3 w-3 text-blue-600" />
                              <span className="text-blue-600">Pick & drop</span>
                            </div>
                          )}
                        </div>
                      </TableCell>

                      <TableCell>
                        <div className="space-y-2">
                          <div className="flex items-center gap-1">
                            <DollarSign className="h-3 w-3 text-green-600" />
                            <span className="font-semibold text-green-600">
                              {formatPrice(pkg.price)}
                            </span>
                          </div>
                          <Badge
                            className={`text-xs ${getDifficultyColor(
                              pkg.difficulty
                            )}`}
                          >
                            {pkg.difficulty}
                          </Badge>
                        </div>
                      </TableCell>

                      <TableCell>
                        <div className="space-y-1">
                          <div className="flex items-center gap-1 text-xs text-gray-500">
                            <Calendar className="h-3 w-3" />
                            <span>Created: {formatDate(pkg.createdAt)}</span>
                          </div>
                          <div className="flex items-center gap-1 text-xs text-gray-500">
                            <Calendar className="h-3 w-3" />
                            <span>Updated: {formatDate(pkg.updatedAt)}</span>
                          </div>
                        </div>
                      </TableCell>

                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleEdit(pkg)}
                            className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                          >
                            <Edit className="h-3 w-3" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDelete(pkg)}
                            className="text-red-600 hover:text-red-700 hover:bg-red-50"
                          >
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8 text-gray-500">
                      No packages found. Create your first package to get started.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>

          {/* Pagination */}
          {packagesData.length > 0 && (
            <div className="flex flex-col sm:flex-row items-center justify-between mt-6 gap-4">
              <div className="text-sm text-gray-600">
                Showing {startIndex + 1} to{" "}
                {Math.min(endIndex, packagesData.length)} of{" "}
                {packagesData.length} packages
              </div>

              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handlePageChange(Math.max(currentPage - 1, 1))}
                  disabled={currentPage === 1}
                >
                  <ChevronLeft className="h-4 w-4" />
                  Previous
                </Button>

                <div className="flex items-center gap-1">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                    (page) => (
                      <Button
                        key={page}
                        variant={currentPage === page ? "default" : "outline"}
                        size="sm"
                        onClick={() => handlePageChange(page)}
                        className={
                          currentPage === page
                            ? "bg-green-600 hover:bg-green-700"
                            : ""
                        }
                      >
                        {page}
                      </Button>
                    )
                  )}
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handlePageChange(Math.min(currentPage + 1, totalPages))}
                  disabled={currentPage === totalPages}
                >
                  Next
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Update Package Dialog */}
      <UpdatePackageDialog
        isOpen={isUpdateDialogOpen}
        onClose={() => setIsUpdateDialogOpen(false)}
        packageData={selectedPackage}
        onSuccess={() => refetch()}
      />

      {/* Delete Package Dialog */}
      <DeletePackageDialog
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        packageData={selectedPackage}
        onSuccess={() => refetch()}
      />
    </motion.div>
  );
};

export default PackagesTable;