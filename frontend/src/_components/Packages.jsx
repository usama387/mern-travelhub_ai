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
import { Clock, MapPin, Star, Home } from "lucide-react";

const packages = [
  {
    id: 1,
    title: "Hunza Valley Explorer",
    description:
      "Experience the breathtaking beauty of Hunza Valley with cherry blossoms and ancient forts",
    image:
      "https://i.pinimg.com/1200x/58/d2/c9/58d2c98f5d6ecc2bc4ed4b39927cac65.jpg",
    price: "PKR 251,720",
    rating: 4.9,
    location: "Hunza Valley",
    groupSize: "8-12 people",
    hotel: "Serena Hotel, Karimabad",
    highlights: [
      "Karimabad Fort",
      "Cherry Blossoms",
      "Attabad Lake",
      "Local Culture",
    ],
    difficulty: "Easy",
  },
  {
    id: 2,
    title: "K2 Base Camp Trek",
    description:
      "Ultimate adventure to the base camp of the world's second highest mountain",
    image:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80",
    duration: "14 Days",
    price: "PKR 699,720",
    rating: 4.8,
    location: "Karakoram Range",
    groupSize: "6-10 people",
    hotel: "Skardu Hotel",
    highlights: [
      "K2 Base Camp",
      "Concordia",
      "Baltoro Glacier",
      "Mountain Views",
    ],
    difficulty: "Extreme",
  },
  {
    id: 3,
    title: "Skardu Lakes Circuit",
    description:
      "Discover the pristine lakes and dramatic landscapes of Skardu region",
    image:
      "https://i.pinimg.com/736x/34/b6/86/34b6863c20f5a47caad61cb168c14068.jpg",
    duration: "10 Days",
    price: "PKR 363,720",
    rating: 4.7,
    location: "Skardu",
    groupSize: "8-15 people",
    hotel: "Shangrila Resort",
    highlights: [
      "Shangrila Resort",
      "Satpara Lake",
      "Deosai Plains",
      "Sheosar Lake",
    ],
    difficulty: "Moderate",
  },
  {
    id: 4,
    title: "Fairy Meadows Adventure",
    description:
      "Camp under the stars with stunning views of Nanga Parbat, the Killer Mountain",
    image:
      "https://i.pinimg.com/736x/07/fe/cc/07fecc3112140bb623c6018d0ba6535b.jpg",
    duration: "5 Days",
    price: "PKR 181,720",
    rating: 4.9,
    location: "Fairy Meadows",
    groupSize: "10-16 people",
    hotel: "Raikot Sarai",
    highlights: [
      "Nanga Parbat Views",
      "Alpine Camping",
      "Beyal Camp",
      "Raikot Bridge",
    ],
    difficulty: "Moderate",
  },
  {
    id: 5,
    title: "Deosai National Park",
    description:
      "Explore the world's second highest plateau with unique wildlife and flowers",
    image:
      "https://i.pinimg.com/1200x/93/70/77/9370771f2abc32fae80858188fe16f0f.jpg",
    duration: "6 Days",
    price: "PKR 223,720",
    rating: 4.6,
    location: "Deosai Plains",
    groupSize: "12-20 people",
    hotel: "Skardu Hotel",
    highlights: [
      "Brown Bears",
      "Wildflowers",
      "Sheosar Lake",
      "High Altitude Plains",
    ],
    difficulty: "Easy",
  },
  {
    id: 6,
    title: "Chitral & Kalash Valley",
    description:
      "Immerse yourself in the unique culture of the Kalash people and Chitral's beauty",
    image:
      "https://i.pinimg.com/736x/63/c2/49/63c2495c4843dec68916d06b6164bf7f.jpg",
    duration: "8 Days",
    price: "PKR 307,720",
    rating: 4.8,
    location: "Chitral",
    groupSize: "8-14 people",
      hotel: "Hindukush Heights",
    highlights: [
      "Kalash Culture",
      "Shandur Pass",
      "Chitral Fort",
      "Traditional Festivals",
    ],
    difficulty: "Easy",
  },
];

const getDifficultyColor = (difficulty) => {
  switch (difficulty) {
    case "Easy":
      return "bg-green-500/30 text-green-400 border-green-500/30";
    case "Moderate":
      return "bg-yellow-500/30 text-yellow-400 border-yellow-500/30";
    case "Extreme":
      return "bg-red-500/30 text-red-400 border-red-500/30";
    default:
      return "bg-gray-500/30 text-gray-400 border-gray-500/30";
  }
};

const PopularPackages = () => {
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
            Discover the most breathtaking destinations in Northern Pakistan with our carefully curated adventure packages
          </p>
        </motion.div>

        {/* Packages Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {packages.map((pkg, index) => (
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
                    src={pkg.image}
                    alt={pkg.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4">
                    <Badge className="bg-green-600 hover:bg-green-700 text-white text-sm px-3 py-1">
                      <MapPin className="w-4 h-4 mr-1" />
                      {pkg.title}
                    </Badge>
                  </div>
                </div>

                <CardHeader className="pb-3">
                  <CardTitle className="text-2xl font-bold text-gray-800 group-hover:text-green-700 transition-colors">
                    {pkg.title}
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
                        <span>{pkg.duration}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-green-600" />
                        <span>{pkg.rating}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <span className="font-bold text-green-600">{pkg.price}</span>
                      </div>
                      <div className="flex items-center gap-1 col-span-2">
                        <Home className="w-4 h-4 text-green-600" />
                        <span>{pkg.hotel}</span>
                      </div>
                    </div>
                    <Badge className={`${getDifficultyColor(pkg.difficulty)} border text-sm px-3 py-1`}>
                      {pkg.difficulty}
                    </Badge>
                    {/* Highlights */}
                    <ul className="space-y-2">
                      {pkg.highlights.map((highlight, highlightIndex) => (
                        <li
                          key={highlightIndex}
                          className="flex items-center text-base font-medium text-gray-700 leading-5"
                        >
                          <div className="w-1.5 h-1.5 bg-green-600 rounded-full mr-3" />
                          {highlight}
                        </li>
                      ))}
                    </ul>
                    <Button className="w-full bg-green-600 hover:bg-green-700 text-white border-0 shadow-lg hover:shadow-xl hover:shadow-green-600/30 transition-all duration-300">
                      Book Now
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
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
          >
            View All Packages
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default PopularPackages;
