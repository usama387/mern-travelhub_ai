import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Clock, Users, Home, Utensils, Car } from "lucide-react";

const PackageDetails = ({ packageDetails }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
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
              src={packageDetails.imageUrl || "/placeholder.svg"}
              alt={packageDetails.destination}
              className="w-32 h-24 object-cover rounded-lg shadow-md"
            />
            <div>
              <h3 className="text-xl font-semibold text-gray-800">
                {packageDetails.destination}
              </h3>
              <p className="text-gray-600 mb-2">
                {packageDetails.description}
              </p>
              <div className="flex gap-4 text-sm text-gray-500">
                <span className="flex items-center gap-1">
                  <Clock className="h-4 w-4 text-blue-500" />
                  {packageDetails.duration} Days
                </span>
                <span className="flex items-center gap-1">
                  <MapPin className="h-4 w-4 text-green-500" />
                  {packageDetails.location}
                </span>
                <span className="flex items-center gap-1">
                  <Users className="h-4 w-4 text-purple-500" />
                  {packageDetails.peopleCount} people
                </span>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="flex items-center gap-2">
              <Home className="h-4 w-4 text-green-600" />
              <span className="text-sm">{packageDetails.hotelName}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm capitalize">
                {packageDetails.hotelType?.toLowerCase()} (included)
              </span>
            </div>
            {packageDetails.complementaryBreakfast && (
              <div className="flex items-center gap-2">
                <Utensils className="h-4 w-4 text-green-600" />
                <span className="text-sm">Complementary Breakfast</span>
              </div>
            )}
            {packageDetails.pickAndDrop && (
              <div className="flex items-center gap-2">
                <Car className="h-4 w-4 text-green-600" />
                <span className="text-sm">Pick & Drop Service</span>
              </div>
            )}
          </div>
          <Badge className="bg-gradient-to-r from-green-500 to-green-600 text-white">
            Base Price: PKR {packageDetails.price?.toLocaleString()} per person
          </Badge>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default PackageDetails;