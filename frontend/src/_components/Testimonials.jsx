import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    location: "New York, USA",
    avatar: "/woman-traveler.png",
    rating: 5,
    text: "The Hunza Valley trip was absolutely magical! The AI assistant helped me plan every detail perfectly. The cherry blossoms and mountain views were breathtaking.",
    destination: "Hunza Valley",
    bgGradient: "from-pink-500 via-purple-500 to-indigo-600",
    textColor: "text-white",
  },
  {
    id: 2,
    name: "Ahmed Hassan",
    location: "Dubai, UAE",
    avatar: "/placeholder-qvkpk.png",
    rating: 5,
    text: "K2 Base Camp trek was the adventure of a lifetime! Travel Hub's planning made it seamless. The guides were exceptional and the experience unforgettable.",
    destination: "K2 Base Camp",
    bgGradient: "from-orange-400 via-red-500 to-pink-600",
    textColor: "text-white",
  },
  {
    id: 3,
    name: "Emma Thompson",
    location: "London, UK",
    avatar: "/woman-hiker.png",
    rating: 5,
    text: "Fairy Meadows exceeded all expectations! The AI recommendations were spot-on. Waking up to Nanga Parbat views was pure magic.",
    destination: "Fairy Meadows",
    bgGradient: "from-green-400 via-blue-500 to-purple-600",
    textColor: "text-white",
  },
  {
    id: 4,
    name: "Carlos Rodriguez",
    location: "Madrid, Spain",
    avatar: "/man-photographer.png",
    rating: 5,
    text: "Skardu's lakes and mountains are photographer's paradise! Travel Hub's itinerary was perfect. Every moment was Instagram-worthy!",
    destination: "Skardu",
    bgGradient: "from-yellow-400 via-orange-500 to-red-500",
    textColor: "text-white",
  },
  {
    id: 5,
    name: "Priya Sharma",
    location: "Mumbai, India",
    avatar: "/woman-adventurer.png",
    rating: 5,
    text: "Deosai Plains was like stepping into another world! The AI assistant's suggestions for the best viewing spots were incredible. Truly a once-in-a-lifetime experience.",
    destination: "Deosai Plains",
    bgGradient: "from-cyan-400 via-teal-500 to-green-600",
    textColor: "text-white",
  },
  {
    id: 6,
    name: "Michael Chen",
    location: "Toronto, Canada",
    avatar: "/man-explorer.png",
    rating: 5,
    text: "The Baltoro Glacier trek was absolutely phenomenal! Travel Hub's AI planning made the complex logistics so easy. The team support was outstanding throughout.",
    destination: "Baltoro Glacier",
    bgGradient: "from-indigo-500 via-purple-600 to-pink-500",
    textColor: "text-white",
  },
];

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    }, 4000); // Change every 4 seconds

    return () => clearInterval(interval);
  }, []);

  const currentTestimonial = testimonials[currentIndex];

  return (
    <section className="py-20 px-4 bg-red-50">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600 bg-clip-text text-transparent mb-4">
            What Our Travelers Say
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Real experiences from adventurers who discovered the magic of
            northern Pakistan with Travel Hub
          </p>
        </motion.div>

        {/* Main Testimonial Card */}
        <div className="relative h-[400px] md:h-[350px] flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentTestimonial.id}
              initial={{ opacity: 0, scale: 0.8, rotateY: -90 }}
              animate={{ opacity: 1, scale: 1, rotateY: 0 }}
              exit={{ opacity: 0, scale: 0.8, rotateY: 90 }}
              transition={{
                duration: 0.8,
                type: "spring",
                stiffness: 100,
                damping: 20,
              }}
              className="w-full max-w-4xl"
            >
              <Card
                className={`relative overflow-hidden bg-gradient-to-br ${currentTestimonial.bgGradient} border-0 shadow-2xl`}
              >
                <div className="absolute inset-0 bg-black/10" />
                <div className="relative p-8 md:p-12">
                  <div className="flex flex-col md:flex-row items-center gap-8">
                    {/* Avatar and User Info */}
                    <motion.div
                      initial={{ opacity: 0, x: -50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3, duration: 0.6 }}
                      className="flex-shrink-0 text-center md:text-left"
                    >
                      <Avatar className="w-20 h-20 mx-auto md:mx-0 mb-4 ring-4 ring-white/30">
                        <AvatarImage
                          src={currentTestimonial.avatar || "/placeholder.svg"}
                          alt={currentTestimonial.name}
                        />
                        <AvatarFallback className="bg-white/20 text-white text-xl font-bold">
                          {currentTestimonial.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <h3
                        className={`text-xl font-bold ${currentTestimonial.textColor} mb-1`}
                      >
                        {currentTestimonial.name}
                      </h3>
                      <p
                        className={`${currentTestimonial.textColor} opacity-90 text-sm mb-3`}
                      >
                        {currentTestimonial.location}
                      </p>
                      <div className="flex justify-center md:justify-start gap-1">
                        {[...Array(currentTestimonial.rating)].map((_, i) => (
                          <Star
                            key={i}
                            className="w-4 h-4 fill-yellow-300 text-yellow-300"
                          />
                        ))}
                      </div>
                    </motion.div>

                    {/* Testimonial Content */}
                    <motion.div
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5, duration: 0.6 }}
                      className="flex-1"
                    >
                      <div className="mb-4">
                        <span
                          className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${currentTestimonial.textColor} bg-white/20 backdrop-blur-sm`}
                        >
                          {currentTestimonial.destination}
                        </span>
                      </div>
                      <blockquote
                        className={`text-lg md:text-xl ${currentTestimonial.textColor} leading-relaxed italic`}
                      >
                        "{currentTestimonial.text}"
                      </blockquote>
                    </motion.div>
                  </div>
                </div>
              </Card>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Testimonial Indicators */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.6 }}
          className="flex justify-center gap-3 mt-8"
        >
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? "bg-gradient-to-r from-orange-500 to-pink-500 scale-125"
                  : "bg-slate-300 hover:bg-slate-400"
              }`}
            />
          ))}
        </motion.div>

        {/* Small Testimonial Cards Grid */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.8 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16"
        >
          {testimonials.slice(0, 3).map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              whileHover={{ scale: 1.05, y: -5 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <Card
                className={`bg-gradient-to-br ${testimonial.bgGradient} border-0 shadow-lg hover:shadow-xl transition-shadow duration-300`}
              >
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Avatar className="w-12 h-12 ring-2 ring-white/30">
                      <AvatarImage
                        src={testimonial.avatar || "/placeholder.svg"}
                        alt={testimonial.name}
                      />
                      <AvatarFallback className="bg-white/20 text-white font-bold">
                        {testimonial.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h4 className={`font-semibold ${testimonial.textColor}`}>
                        {testimonial.name}
                      </h4>
                      <div className="flex gap-1">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star
                            key={i}
                            className="w-3 h-3 fill-yellow-300 text-yellow-300"
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                  <p
                    className={`text-sm ${testimonial.textColor} opacity-90 line-clamp-3`}
                  >
                    "{testimonial.text}"
                  </p>
                  <span
                    className={`inline-block mt-3 px-2 py-1 rounded text-xs font-medium ${testimonial.textColor} bg-white/20`}
                  >
                    {testimonial.destination}
                  </span>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;
