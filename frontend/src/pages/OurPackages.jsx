// OurPackages.jsx (updated)
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
} from "lucide-react";
import PackagesStats from "@/_components/PackagesStats";

// Sample data for packages
const packagesData = [
  {
    id: 1,
    title: "Hunza Valley Family Adventure",
    type: "family",
    area: "hunza",
    price: 85000,
    duration: "7 days",
    groupSize: "4-8 people",
    rating: 4.8,
    image: "/hunza-valley-landscape.png",
    description:
      "Perfect family getaway to the stunning Hunza Valley with comfortable accommodations and kid-friendly activities.",
    features: [
      "Family-friendly hotels",
      "Guided tours",
      "Local cuisine",
      "Cultural experiences",
    ],
  },
  {
    id: 2,
    title: "K2 Base Camp Trek",
    type: "adventure",
    area: "skardu",
    price: 150000,
    duration: "14 days",
    groupSize: "6-12 people",
    rating: 4.9,
    image: "https://i.pinimg.com/736x/f9/e7/9c/f9e79cb1beb58126911f1e84f571e5b7.jpg",
    description:
      "Ultimate adventure trek to K2 Base Camp for experienced hikers and mountaineers.",
    features: [
      "Professional guides",
      "Camping equipment",
      "High altitude training",
      "Emergency support",
    ],
  },
  {
    id: 3,
    title: "Romantic Swat Honeymoon",
    type: "honeymoon",
    area: "swat",
    price: 65000,
    duration: "5 days",
    groupSize: "2 people",
    rating: 4.7,
    image: "https://i.pinimg.com/736x/94/3c/56/943c562876ef4ebed048226044b50e4a.jpg",
    description:
      "Romantic escape to the Switzerland of Pakistan with luxury accommodations and private tours.",
    features: [
      "Luxury resorts",
      "Private dining",
      "Couple activities",
      "Spa treatments",
    ],
  },
  {
    id: 4,
    title: "Budget Kaghan Valley Tour",
    type: "budget",
    area: "kaghan",
    price: 35000,
    duration: "4 days",
    groupSize: "8-15 people",
    rating: 4.5,
    image: "/kaghan-valley-lake.png",
    description:
      "Affordable group tour to beautiful Kaghan Valley with basic but comfortable accommodations.",
    features: [
      "Group discounts",
      "Shared accommodations",
      "Local transport",
      "Guided sightseeing",
    ],
  },
  {
    id: 5,
    title: "Fairy Meadows Family Camp",
    type: "family",
    area: "fairy-meadows",
    price: 95000,
    duration: "6 days",
    groupSize: "4-10 people",
    rating: 4.6,
    image: "/fairy-meadows-nanga-parbat.png",
    description:
      "Family camping experience at Fairy Meadows with stunning views of Nanga Parbat.",
    features: [
      "Family tents",
      "Bonfire nights",
      "Nature walks",
      "Photography sessions",
    ],
  },
  {
    id: 6,
    title: "Skardu Adventure Expedition",
    type: "adventure",
    area: "skardu",
    price: 120000,
    duration: "10 days",
    groupSize: "6-8 people",
    rating: 4.8,
    image: "https://i.pinimg.com/736x/84/1c/84/841c8480a1be5206325e3dc1390636f4.jpg",
    description:
      "Thrilling adventure in Skardu with jeep safaris, rock climbing, and desert camping.",
    features: [
      "4WD jeep tours",
      "Rock climbing",
      "Desert camping",
      "Local guides",
    ],
  },
];

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
];

const priceRanges = [
  { value: "all", label: "All Prices" },
  { value: "0-50000", label: "PKR 0 - 50,000" },
  { value: "50000-100000", label: "PKR 50,000 - 100,000" },
  { value: "100000-150000", label: "PKR 100,000 - 150,000" },
  { value: "150000+", label: "PKR 150,000+" },
];

const OurPackages = () => {
  const [selectedType, setSelectedType] = useState("all");
  const [selectedArea, setSelectedArea] = useState("all");
  const [selectedPriceRange, setSelectedPriceRange] = useState("all");

  // Filter packages based on selected filters
  const filteredPackages = packagesData.filter((pkg) => {
    const typeMatch = selectedType === "all" || pkg.type === selectedType;
    const areaMatch = selectedArea === "all" || pkg.area === selectedArea;

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
            {filteredPackages.map((pkg) => (
              <motion.div key={pkg.id} variants={itemVariants}>
                <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 group">
                  <div className="relative overflow-hidden">
                    <img
                      src={pkg.image || "/placeholder.svg"}
                      alt={pkg.title}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-4 left-4">
                      <Badge className="bg-green-600 hover:bg-green-700">
                        {packageTypes.find((t) => t.value === pkg.type)
                          ?.label ||
                          pkg.type.charAt(0).toUpperCase() + pkg.type.slice(1)}
                      </Badge>
                    </div>
                    <div className="absolute top-4 right-4">
                      <div className="flex items-center gap-1 bg-white/90 px-2 py-1 rounded-full">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-medium">
                          {pkg.rating}
                        </span>
                      </div>
                    </div>
                  </div>

                  <CardHeader>
                    <CardTitle className="text-xl text-gray-900">
                      {pkg.title}
                    </CardTitle>
                    <CardDescription>{pkg.description}</CardDescription>
                  </CardHeader>

                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between text-sm text-gray-600">
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          <span>{pkg.duration}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Users className="h-4 w-4" />
                          <span>{pkg.groupSize}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          <span className="capitalize">
                            {pkg.area.replace("-", " ")}
                          </span>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-1">
                        {pkg.features.slice(0, 3).map((feature, index) => (
                          <Badge
                            key={index}
                            variant="secondary"
                            className="text-xs"
                          >
                            {feature}
                          </Badge>
                        ))}
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-2xl font-bold text-green-600">
                            PKR {pkg.price.toLocaleString()}
                          </span>
                          <span className="text-sm text-gray-500 ml-1">
                            per person
                          </span>
                        </div>
                        <Button className="bg-green-600 hover:bg-green-700">
                          Book Now
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
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