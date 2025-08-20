import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock, MapPin, Star } from "lucide-react";

const packages = [
  {
    id: 1,
    title: "Hunza Valley Explorer",
    description:
      "Experience the breathtaking beauty of Hunza Valley with cherry blossoms and ancient forts",
    image:
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop&crop=center",
    duration: "7 Days",
    price: "$899",
    rating: 4.9,
    location: "Hunza Valley",
    groupSize: "8-12 people",
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
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop&crop=center",
    duration: "14 Days",
    price: "$2,499",
    rating: 4.8,
    location: "Karakoram Range",
    groupSize: "6-10 people",
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
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop&crop=center&q=80&auto=format&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    duration: "10 Days",
    price: "$1,299",
    rating: 4.7,
    location: "Skardu",
    groupSize: "8-15 people",
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
      "https://images.unsplash.com/photo-1464822759844-d150ad6d1c71?w=800&h=600&fit=crop&crop=center",
    duration: "5 Days",
    price: "$649",
    rating: 4.9,
    location: "Fairy Meadows",
    groupSize: "10-16 people",
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
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop&crop=center&q=80&auto=format&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    duration: "6 Days",
    price: "$799",
    rating: 4.6,
    location: "Deosai Plains",
    groupSize: "12-20 people",
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
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop&crop=center&q=80&auto=format&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    duration: "8 Days",
    price: "$1,099",
    rating: 4.8,
    location: "Chitral",
    groupSize: "8-14 people",
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
      return "bg-green-500/20 text-green-400 border-green-500/30";
    case "Moderate":
      return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
    case "Extreme":
      return "bg-red-500/20 text-red-400 border-red-500/30";
    default:
      return "bg-gray-500/20 text-gray-400 border-gray-500/30";
  }
};

const PopularPackages = () => {
  return (
    <section className="py-20 bg-red-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4 uppercase tracking-wide">
            DESTINATION TRAVEL TO
            <br />
            INSPIRE YOUR SOUL
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Discover the most breathtaking destinations in Northern Pakistan
            with our carefully curated adventure packages
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {packages.map((pkg, index) => (
            <motion.div
              key={pkg.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="group"
            >
              <div className="relative overflow-hidden rounded-2xl h-80 shadow-xl hover:shadow-2xl transition-all duration-500 cursor-pointer">
                <img
                  src={pkg.image || "/placeholder.svg"}
                  alt={pkg.title}
                  width={400}
                  height={320}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                <div className="absolute inset-0 p-6 flex flex-col justify-between">
                  <div className="flex justify-between items-start">
                    <Badge
                      className={`${getDifficultyColor(
                        pkg.difficulty
                      )} border backdrop-blur-sm`}
                    >
                      {pkg.difficulty}
                    </Badge>
                    <div className="bg-white/20 backdrop-blur-sm rounded-full px-3 py-1 flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="text-white text-sm font-medium">
                        {pkg.rating}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <h3 className="text-2xl font-bold text-white mb-2">
                        {pkg.title}
                      </h3>
                      <p className="text-white/90 text-sm line-clamp-2">
                        {pkg.description}
                      </p>
                    </div>

                    <div className="flex items-center justify-between text-white/80 text-sm">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          <span>{pkg.location}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          <span>{pkg.duration}</span>
                        </div>
                      </div>
                      <div className="text-xl font-bold text-white">
                        {pkg.price}
                      </div>
                    </div>

                    <Button className="w-full bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                      Book Now
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Button
            size="lg"
            className="bg-gradient-to-r from-orange-500 via-yellow-500 to-red-500 hover:from-orange-600 hover:via-yellow-600 hover:to-red-600 text-white border-0 shadow-xl hover:shadow-2xl hover:shadow-orange-500/40 transition-all duration-300 px-8 py-3 transform hover:scale-105"
          >
            View All Packages
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default PopularPackages;
