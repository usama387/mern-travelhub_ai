import { useState } from "react";
import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  MapPin,
  Clock,
  Users,
  Star,
  Heart,
  Mountain,
  Wallet,
  Camera,
  Home,
  Utensils,
  Car,
} from "lucide-react";
import PackagesStats from "@/_components/PackagesStats";
import { useGetAllPackagesQuery } from "@/features/api/packageApi";
import { useNavigate } from "react-router-dom";

const packageTypes = [
  {
    value: "all",
    label: "All Packages",
    icon: Camera,
    color: "from-blue-400 to-purple-500",
  },
  {
    value: "family",
    label: "Family Packages",
    icon: Users,
    color: "from-green-400 to-emerald-600",
  },
  {
    value: "adventure",
    label: "Adventure Tours",
    icon: Mountain,
    color: "from-orange-400 to-red-500",
  },
  {
    value: "honeymoon",
    label: "Honeymoon Specials",
    icon: Heart,
    color: "from-pink-400 to-rose-600",
  },
  {
    value: "budget",
    label: "Budget Friendly",
    icon: Wallet,
    color: "from-yellow-400 to-amber-600",
  },
];

const areas = [
  { value: "all", label: "All Areas" },
  { value: "hunza", label: "Hunza Valley" },
  { value: "swat", label: "Swat Valley" },
  { value: "skardu", label: "Skardu" },
  { value: "kaghan", label: "Kaghan Valley" },
  { value: "fairy-meadows", label: "Fairy Meadows" },
  { value: "karakoram", label: "Karakoram Range" },
  { value: "deosai", label: "Deosai Plains" },
  { value: "chitral", label: "Chitral" },
];

const priceRanges = [
  { value: "all", label: "All Prices" },
  { value: "0-50000", label: "PKR 0 - 50,000" },
  { value: "50000-100000", label: "PKR 50,000 - 100,000" },
  { value: "100000-150000", label: "PKR 100,000 - 150,000" },
  { value: "150000+", label: "PKR 150,000+" },
];

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

const OurPackages = () => {
  const [selectedType, setSelectedType] = useState("all");
  const [selectedArea, setSelectedArea] = useState("all");
  const [selectedPriceRange, setSelectedPriceRange] = useState("all");

  const { data: packagesResponse, isLoading, error } = useGetAllPackagesQuery();

  // Extract packages from response or use empty array as fallback
  const packagesData = packagesResponse?.packages || [];

  // Function to determine package type based on content
  const getPackageType = (pkg) => {
    const lowerDesc = pkg.description.toLowerCase();
    const lowerDest = pkg.destination.toLowerCase();

    if (
      lowerDesc.includes("honeymoon") ||
      lowerDest.includes("honeymoon") ||
      lowerDesc.includes("romantic")
    ) {
      return "honeymoon";
    } else if (lowerDesc.includes("family") || lowerDest.includes("family")) {
      return "family";
    } else if (
      lowerDesc.includes("adventure") ||
      lowerDest.includes("adventure") ||
      lowerDesc.includes("trek") ||
      lowerDest.includes("trek") ||
      lowerDesc.includes("camp") ||
      lowerDest.includes("camp")
    ) {
      return "adventure";
    } else if (pkg.price < 50000) {
      return "budget";
    }
    return "standard";
  };

  // Function to map API location to area filter values
  const getPackageArea = (location) => {
    const lowerLoc = location.toLowerCase();
    if (lowerLoc.includes("hunza")) return "hunza";
    if (lowerLoc.includes("swat")) return "swat";
    if (lowerLoc.includes("skardu")) return "skardu";
    if (lowerLoc.includes("kaghan")) return "kaghan";
    if (lowerLoc.includes("fairy")) return "fairy-meadows";
    if (lowerLoc.includes("karakoram")) return "karakoram";
    if (lowerLoc.includes("deosai")) return "deosai";
    if (lowerLoc.includes("chitral")) return "chitral";
    return "other";
  };

  // Filter packages based on selected filters
  const filteredPackages = packagesData.filter((pkg) => {
    const typeMatch =
      selectedType === "all" || getPackageType(pkg) === selectedType;
    const areaMatch =
      selectedArea === "all" || getPackageArea(pkg.location) === selectedArea;

    let priceMatch = true;
    if (selectedPriceRange !== "all") {
      const [min, max] = selectedPriceRange
        .split("-")
        .map((p) => Number.parseInt(p.replace("+", "")));
      if (selectedPriceRange.includes("+")) {
        priceMatch = pkg.price >= min;
      } else {
        priceMatch = pkg.price >= min && pkg.price <= max;
      }
    }

    return typeMatch && areaMatch && priceMatch;
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  // hook for navigation
  const navigate = useNavigate();

  // naviagtes user on booking page with the package selected
  const handleBookNow = (packageId) => {
    navigate(`/booking/${packageId}`);
    window.scrollTo(0, 0);
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading packages...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600">
            Error loading packages. Please try again later.
          </p>
          <Button
            className="mt-4 bg-green-600 hover:bg-green-700"
            onClick={() => window.location.reload()}
          >
            Retry
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header Section with background image */}
      <motion.section
        className="relative py-16 bg-cover bg-center mx-2 mt-2"
        style={{
          backgroundImage: `url('https://i.pinimg.com/1200x/92/98/6e/92986e30a1500706f5037fcaebfb7013.jpg')`,
        }}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Overlay for readability */}
        <div className="absolute inset-0 bg-black/50"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center">
            <motion.h1
              className="text-4xl md:text-5xl font-bold text-green-300 mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              Explore Our Travel Packages
            </motion.h1>
            <motion.p
              className="text-xl text-green-300 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              Discover amazing destinations across Pakistan with our carefully
              curated travel packages
            </motion.p>
          </div>
        </div>
      </motion.section>

      {/* Package Types Section with color combinations */}
      <motion.section
        className="py-12 bg-white"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.6 }}
      >
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {packageTypes.slice(1).map((type, index) => {
              const Icon = type.icon;
              return (
                <motion.div
                  key={type.value}
                  className="text-center"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.8 + index * 0.1, duration: 0.4 }}
                >
                  <Card
                    className={`hover:shadow-lg transition-shadow cursor-pointer bg-gradient-to-br ${type.color} text-white`}
                  >
                    <CardContent className="p-6">
                      <Icon className="h-8 w-8 text-white mx-auto mb-3" />
                      <h3 className="font-semibold">{type.label}</h3>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </motion.section>

      {/* Filters Section */}
      <motion.section
        className="py-8 bg-white border-b"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.6 }}
      >
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap gap-4 items-center justify-between mb-6">
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-gray-700">
                  Package Type:
                </span>
                <Select value={selectedType} onValueChange={setSelectedType}>
                  <SelectTrigger className="w-48 border-green-600 text-green-600">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    {packageTypes.map((type) => (
                      <SelectItem key={type.value} value={type.value}>
                        {type.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-gray-700">Area:</span>
                <Select value={selectedArea} onValueChange={setSelectedArea}>
                  <SelectTrigger className="w-48 border-green-600 text-green-600">
                    <SelectValue placeholder="Select area" />
                  </SelectTrigger>
                  <SelectContent>
                    {areas.map((area) => (
                      <SelectItem key={area.value} value={area.value}>
                        {area.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-gray-700">
                  Price Range:
                </span>
                <Select
                  value={selectedPriceRange}
                  onValueChange={setSelectedPriceRange}
                >
                  <SelectTrigger className="w-48 border-green-600 text-green-600">
                    <SelectValue placeholder="Select price range" />
                  </SelectTrigger>
                  <SelectContent>
                    {priceRanges.map((range) => (
                      <SelectItem key={range.value} value={range.value}>
                        {range.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Add the ChartDialog component here */}
            <PackagesStats />
          </div>
        </div>
      </motion.section>

      {/* Packages Grid */}
      <motion.section
        className="py-12"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="container mx-auto px-4">
          <div className="mb-6">
            <p className="text-gray-600">
              Showing {filteredPackages.length} package
              {filteredPackages.length !== 1 ? "s" : ""}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPackages.map((pkg) => {
              const packageType = getPackageType(pkg);
              const packageArea = getPackageArea(pkg.location);

              return (
                <motion.div
                  key={pkg.id}
                  variants={itemVariants}
                  whileHover={{ y: -5 }}
                  className="group"
                >
                  <Card className="overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 h-full">
                    {/* Package Image */}
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={pkg.imageUrl || "/placeholder.svg"}
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

                        <div className="flex items-center gap-2">
                          <Badge
                            className={`${getDifficultyColor(
                              pkg.difficulty
                            )} border text-sm px-3 py-1`}
                          >
                            {getDifficultyText(pkg.difficulty)}
                          </Badge>

                          {/* Package Type Badge */}
                          <Badge className="bg-green-600 hover:bg-green-700">
                            {packageTypes.find((t) => t.value === packageType)
                              ?.label ||
                              packageType.charAt(0).toUpperCase() +
                                packageType.slice(1)}
                          </Badge>
                        </div>

                        {/* Highlights - using features from API */}
                        <ul className="space-y-2">
                          {pkg.features &&
                            pkg.features
                              .slice(0, 3)
                              .map((feature, featureIndex) => (
                                <li
                                  key={featureIndex}
                                  className="flex items-center text-base font-medium text-gray-700 leading-5"
                                >
                                  <div className="w-1.5 h-1.5 bg-green-600 rounded-full mr-3" />
                                  {feature}
                                </li>
                              ))}
                        </ul>

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
              );
            })}
          </div>

          {filteredPackages.length === 0 && (
            <motion.div
              className="text-center py-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <p className="text-gray-500 text-lg">
                No packages found matching your criteria.
              </p>
              <p className="text-gray-400">
                Try adjusting your filters to see more options.
              </p>
            </motion.div>
          )}
        </div>
      </motion.section>
    </div>
  );
};

export default OurPackages;
