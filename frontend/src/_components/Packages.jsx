import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock, MapPin, Star, Home, Users, Utensils, Car } from "lucide-react";
import { useGetAllPackagesQuery } from "@/features/api/packageApi";
import { Skeleton } from "@/components/ui/skeleton";
import { useNavigate } from "react-router-dom";

// Helper function to format price
const formatPrice = (price) => {
  return `PKR ${price.toLocaleString()}`;
};

// Helper function to get difficulty display text
const getDifficultyText = (difficulty) => {
  switch (difficulty) {
    case "EASY":
      return "Easy";
    case "MODERATE":
      return "Moderate";
    case "EXTREME":
      return "Extreme";
    default:
      return difficulty;
  }
};

const getDifficultyColor = (difficulty) => {
  switch (difficulty) {
    case "EASY":
      return "bg-green-500/30 text-green-400 border-green-500/30";
    case "MODERATE":
      return "bg-yellow-500/30 text-yellow-400 border-yellow-500/30";
    case "EXTREME":
      return "bg-red-500/30 text-red-400 border-red-500/30";
    default:
      return "bg-gray-500/30 text-gray-400 border-gray-500/30";
  }
};

// Skeleton component for loading state
const PackageCardSkeleton = () => (
  <Card className="h-full overflow-hidden border-0 shadow-lg">
    <Skeleton className="h-48 w-full" />
    <CardHeader className="pb-3">
      <Skeleton className="h-7 w-3/4 mb-2" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-2/3 mt-1" />
    </CardHeader>
    <CardContent>
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full col-span-2" />
        </div>
        <Skeleton className="h-6 w-20" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
        </div>
        <Skeleton className="h-10 w-full" />
      </div>
    </CardContent>
  </Card>
);

const PopularPackages = () => {
  // to get all packages
  const { data, isLoading, error, refetch } = useGetAllPackagesQuery();

  const navigate = useNavigate();

  // to push user on booking page with package id
  const handleBookNow = (packageId) => {
    navigate(`/booking/${packageId}`);
    window.scrollTo(0, 0);
  };

  return (
    <section className="py-20 bg-gradient-to-b from-background to-green-50/30">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 bg-green-50 rounded-lg py-8"
        >
          <Badge
            variant="outline"
            className="mb-4 border-green-200 text-green-700 text-sm px-3 py-1"
          >
            Why Choose Our Packages
          </Badge>
          <h2 className="text-4xl font-bold text-green-700 mb-4">
            Destination Travel to Inspire Your Soul
          </h2>
          <p className="text-xl font-medium text-green-600 max-w-3xl mx-auto">
            Discover the most breathtaking destinations in Northern Pakistan
            with our carefully curated adventure packages
          </p>
        </motion.div>

        {/* Error State */}
        {error && (
          <div className="text-center mb-8 p-4 bg-red-50 rounded-lg">
            <p className="text-red-700 mb-4">
              Error loading packages. Please try again.
            </p>
            <Button onClick={refetch} className="bg-red-600 hover:bg-red-700">
              Retry
            </Button>
          </div>
        )}

        {/* Packages Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {isLoading ? (
            // Show skeleton loaders while loading
            Array.from({ length: 6 }).map((_, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <PackageCardSkeleton />
              </motion.div>
            ))
          ) : data && data.packages && data.packages.length > 0 ? (
            // Render actual package cards
            data.packages.slice(0, 3).map((pkg, index) => (
              <motion.div
                key={pkg.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="group"
              >
                <Card className="h-full overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                  {/* Package Image */}
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={pkg.imageUrl}
                      alt={pkg.destination}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    <div className="absolute bottom-4 left-4">
                      <Badge className="bg-green-600 hover:bg-green-700 text-white text-sm px-3 py-1">
                        <MapPin className="w-4 h-4 mr-1" />
                        {pkg.destination}
                      </Badge>
                    </div>
                  </div>

                  <CardHeader className="pb-3">
                    <CardTitle className="text-2xl font-bold text-gray-800 group-hover:text-green-700 transition-colors">
                      {pkg.destination}
                    </CardTitle>
                    <CardDescription className="text-base text-gray-700 leading-6">
                      {pkg.description}
                    </CardDescription>
                  </CardHeader>

                  <CardContent>
                    <div className="space-y-4">
                      {/* Package Details */}
                      <div className="grid grid-cols-2 gap-4 text-base text-gray-700">
                        <div className="flex items-center gap-1">
                          <MapPin className="w-4 h-4 text-green-600" />
                          <span>{pkg.location}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4 text-green-600" />
                          <span>{pkg.duration} Days</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 text-green-600" />
                          {/* Using a dummy rating for now */}
                          <span>4.8</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <span className="font-bold text-green-600">
                            {formatPrice(pkg.price)}
                          </span>
                        </div>
                        <div className="flex items-center gap-1 col-span-2">
                          <Home className="w-4 h-4 text-green-600" />
                          <span>{pkg.hotelName}</span>
                        </div>
                        <div className="flex items-center gap-1 col-span-2">
                          <Users className="w-4 h-4 text-green-600" />
                          <span>{pkg.peopleCount} people</span>
                        </div>
                        <div className="flex items-center gap-1 col-span-2">
                          <Home className="w-4 h-4 text-green-600" />
                          <span>{pkg.roomsCount} rooms</span>
                        </div>
                        {pkg.complementaryBreakfast && (
                          <div className="flex items-center gap-1 col-span-2">
                            <Utensils className="w-4 h-4 text-green-600" />
                            <span>Complementary Breakfast</span>
                          </div>
                        )}
                        {pkg.pickAndDrop && (
                          <div className="flex items-center gap-1 col-span-2">
                            <Car className="w-4 h-4 text-green-600" />
                            <span>Pick & Drop Service</span>
                          </div>
                        )}
                      </div>
                      <Badge
                        className={`${getDifficultyColor(
                          pkg.difficulty
                        )} border text-sm px-3 py-1`}
                      >
                        {getDifficultyText(pkg.difficulty)}
                      </Badge>
                      {/* Highlights - using features from API */}
                      <ul className="space-y-2">
                        {pkg.features &&
                          pkg.features.map((feature, featureIndex) => (
                            <li
                              key={featureIndex}
                              className="flex items-center text-base font-medium text-gray-700 leading-5"
                            >
                              <div className="w-1.5 h-1.5 bg-green-600 rounded-full mr-3" />
                              {feature}
                            </li>
                          ))}
                      </ul>
                      {/* Book now button */}
                      <Button
                        className="w-full bg-green-600 hover:bg-green-700 text-white border-0 shadow-lg hover:shadow-xl hover:shadow-green-600/30 transition-all duration-300"
                        onClick={() => handleBookNow(pkg.id)}
                      >
                        Book Now
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))
          ) : (
            // No packages found
            <div className="col-span-full text-center py-12">
              <p className="text-gray-500 text-lg">No packages found.</p>
            </div>
          )}
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-16"
        >
          <Button
            size="lg"
            className="bg-green-600 hover:bg-green-700 text-white border-0 shadow-lg hover:shadow-xl hover:shadow-green-600/30 transition-all duration-300 px-8 py-3 transform hover:scale-105"
            onClick={() => (window.location.href = "/packages")}
          >
            View All Packages
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default PopularPackages;
