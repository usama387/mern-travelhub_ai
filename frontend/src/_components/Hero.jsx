import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Bot,
  Users,
  Calendar,
  MapPin,
  Wallet,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const carouselData = [
  {
    id: 1,
    image: "/hunza-valley-landscape.png",
    title: "Hunza Valley",
    description:
      "Experience the breathtaking beauty of Hunza Valley with its crystal-clear lakes and snow-capped peaks.",
    location: "Gilgit-Baltistan",
  },
  {
    id: 3,
    image: "/swat.avif",
    title: "Swat Valley",
    description:
      "Known as the Switzerland of Pakistan, featuring lush green valleys and pristine rivers.",
    location: "Khyber Pakhtunkhwa",
  },
  {
    id: 4,
    image: "/fairy-meadows-nanga-parbat.png",
    title: "Fairy Meadows",
    description:
      "A magical plateau offering spectacular views of Nanga Parbat, the world's 9th highest peak.",
    location: "Gilgit-Baltistan",
  },
  {
    id: 5,
    image: "/kaghan-valley-lake.png",
    title: "Kaghan Valley",
    description:
      "Home to the legendary Saif ul Malook lake and stunning alpine scenery.",
    location: "Khyber Pakhtunkhwa",
  },
];

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [formData, setFormData] = useState({
    region: "",
    duration: "",
    groupSize: "",
    budget: "",
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselData.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % carouselData.length);
  };

  const prevSlide = () => {
    setCurrentSlide(
      (prev) => (prev - 1 + carouselData.length) % carouselData.length
    );
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <section className="min-h-screen bg-gradient-to-br from-green-50 to-white py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - AI Travel Planner */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            {/* Hero Text */}
            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="flex items-center space-x-3"
              >
                <div className="p-3 bg-primary/10 rounded-full">
                  <Bot className="h-8 w-8 text-primary" />
                </div>
                <span className="text-primary font-semibold text-lg">
                  AI-Powered Travel Planning
                </span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="text-4xl lg:text-6xl font-bold text-gray-900 leading-tight"
              >
                Plan Your Perfect
                <span className="text-primary block">Pakistan Adventure</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="text-xl text-gray-600 leading-relaxed"
              >
                Let our AI assistant create personalized travel itineraries for
                you. Discover hidden gems, plan your budget, and experience the
                beauty of Pakistan with intelligent recommendations tailored
                just for you.
              </motion.p>
            </div>

            {/* Planning Form */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <Card className="border-2 border-primary/20 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-2xl text-primary flex items-center">
                    <MapPin className="mr-2 h-6 w-6" />
                    Plan Your Journey
                  </CardTitle>
                  <CardDescription>
                    Tell us your preferences and let AI create the perfect
                    itinerary
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    {/* Region Selection */}
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700 flex items-center">
                        <MapPin className="mr-1 h-4 w-4 text-primary" />
                        Region
                      </label>
                      <Select
                        onValueChange={(value) =>
                          handleInputChange("region", value)
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select region" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="northern">
                            Northern Areas
                          </SelectItem>
                          <SelectItem value="southern">
                            Southern Pakistan
                          </SelectItem>
                          <SelectItem value="central">
                            Central Pakistan
                          </SelectItem>
                          <SelectItem value="western">
                            Western Pakistan
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Duration Selection */}
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700 flex items-center">
                        <Calendar className="mr-1 h-4 w-4 text-primary" />
                        Duration
                      </label>
                      <Select
                        onValueChange={(value) =>
                          handleInputChange("duration", value)
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select duration" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="3-5">3-5 Days</SelectItem>
                          <SelectItem value="6-10">6-10 Days</SelectItem>
                          <SelectItem value="11-15">11-15 Days</SelectItem>
                          <SelectItem value="15+">15+ Days</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Group Size */}
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700 flex items-center">
                        <Users className="mr-1 h-4 w-4 text-primary" />
                        Group Size
                      </label>
                      <Select
                        onValueChange={(value) =>
                          handleInputChange("groupSize", value)
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select group size" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="solo">Solo Traveler</SelectItem>
                          <SelectItem value="couple">
                            Couple (2 people)
                          </SelectItem>
                          <SelectItem value="small">
                            Small Group (3-5)
                          </SelectItem>
                          <SelectItem value="large">
                            Large Group (6+)
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Budget Range */}
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700 flex items-center">
                        <Wallet className="mr-1 h-4 w-4 text-primary" />
                        Budget (PKR)
                      </label>
                      <Select
                        onValueChange={(value) =>
                          handleInputChange("budget", value)
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select budget range" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="budget">
                            Budget (50,000 - 100,000 PKR)
                          </SelectItem>
                          <SelectItem value="mid">
                            Mid-range (100,000 - 200,000 PKR)
                          </SelectItem>
                          <SelectItem value="luxury">
                            Luxury (200,000 - 500,000 PKR)
                          </SelectItem>
                          <SelectItem value="premium">
                            Premium (500,000+ PKR)
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <Button className="w-full bg-primary hover:bg-primary/90 text-white py-3 text-lg font-semibold">
                    <Bot className="mr-2 h-5 w-5" />
                    Generate AI Itinerary
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>

          {/* Right Side - Carousel */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative"
          >
            <Card className="overflow-hidden border-2 border-primary/20 shadow-2xl">
              <div className="relative h-[500px]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentSlide}
                    initial={{ opacity: 0, x: 300 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -300 }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                    className="absolute inset-0"
                  >
                    <img
                      src={
                        carouselData[currentSlide].image || "/placeholder.svg"
                      }
                      alt={carouselData[currentSlide].title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                      <motion.h3
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-2xl font-bold text-primary-foreground mb-2"
                      >
                        {carouselData[currentSlide].title}
                      </motion.h3>
                      <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="text-sm text-primary/90 mb-1"
                      >
                        📍 {carouselData[currentSlide].location}
                      </motion.p>
                      <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="text-white/90 leading-relaxed"
                      >
                        {carouselData[currentSlide].description}
                      </motion.p>
                    </div>
                  </motion.div>
                </AnimatePresence>

                {/* Navigation Buttons */}
                <button
                  onClick={prevSlide}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-2 transition-all duration-200"
                >
                  <ChevronLeft className="h-6 w-6 text-white" />
                </button>
                <button
                  onClick={nextSlide}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-2 transition-all duration-200"
                >
                  <ChevronRight className="h-6 w-6 text-white" />
                </button>

                {/* Slide Indicators */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
                  {carouselData.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentSlide(index)}
                      className={`w-3 h-3 rounded-full transition-all duration-200 ${
                        index === currentSlide
                          ? "bg-primary scale-125"
                          : "bg-white/50 hover:bg-white/70"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
