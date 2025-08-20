import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sparkles,
  MapPin,
  Users,
  Calendar,
  Search,
  Clock,
  DollarSign,
  Star,
  ArrowRight,
  Shield,
  Globe,
  Heart,
  Cpu,
  Zap,
} from "lucide-react";

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [preferredRegion, setPreferredRegion] = useState("");
  const [duration, setDuration] = useState("");
  const [groupSize, setGroupSize] = useState("");
  const [budgetRange, setBudgetRange] = useState("");

  const pakistanImages = [
    {
      src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop&crop=center",
      alt: "Tourist Viewpoint Pakistan",
      title: "Scenic Viewpoints",
    },
    {
      src: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800&h=600&fit=crop&crop=center",
      alt: "Luxury Mountain Resort Pakistan",
      title: "Mountain Resorts",
    },
    {
      src: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&h=600&fit=crop&crop=center",
      alt: "Boutique Hotel Pakistan",
      title: "Boutique Hotels",
    },
    {
      src: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&h=600&fit=crop&crop=center",
      alt: "Heritage Accommodation Pakistan",
      title: "Heritage Stays",
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % pakistanImages.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [pakistanImages.length]);

  // Floating animation variants
  const floatingAnimation = {
    animate: {
      y: [0, -15, 0],
      transition: {
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  // Pulse animation variants
  const pulseAnimation = {
    animate: {
      scale: [1, 1.05, 1],
      opacity: [0.7, 1, 0.7],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  return (
    <section className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.1),transparent_50%)]"></div>

      {/* Circuit-like grid pattern */}
      <div className="absolute inset-0 opacity-20 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>

      {/* Floating particles */}
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            width: `${Math.random() * 10 + 3}px`,
            height: `${Math.random() * 10 + 3}px`,
            background: `radial-gradient(circle, rgba(96,165,250,0.6) 0%, transparent 70%)`,
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, Math.random() * 40 - 20, 0],
            opacity: [0, Math.random() * 0.5 + 0.3, 0],
            scale: [0, 1, 0],
          }}
          transition={{
            duration: Math.random() * 10 + 10,
            repeat: Infinity,
            delay: Math.random() * 5,
          }}
        />
      ))}

      {/* Animated gradient blobs */}
      <motion.div
        className="absolute top-1/4 -left-40 w-96 h-96 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-full filter blur-3xl"
        animate={{
          x: [0, 100, 0],
          y: [0, -50, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute bottom-1/4 -right-40 w-96 h-96 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-full filter blur-3xl"
        animate={{
          x: [0, -100, 0],
          y: [0, 50, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
      />

      <div className="container mx-auto px-4 py-16 lg:py-24 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="flex items-center gap-2 text-cyan-400"
              >
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                >
                  <Cpu className="w-5 h-5" />
                </motion.div>
                <span className="text-sm font-medium tracking-wide uppercase bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                  AI-Powered Travel Assistant
                </span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight"
              >
                <motion.span
                  className="bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400 bg-clip-text text-transparent"
                  animate={{
                    backgroundPosition: ["0%", "100%"],
                  }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    repeatType: "reverse",
                  }}
                  style={{
                    backgroundSize: "200% 100%",
                  }}
                >
                  Discover Your Perfect
                </motion.span>
                <br />
                <motion.span
                  className="bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent"
                  animate={{
                    backgroundPosition: ["100%", "0%"],
                  }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    repeatType: "reverse",
                    delay: 0.5,
                  }}
                  style={{
                    backgroundSize: "200% 100%",
                  }}
                >
                  Travel Experience
                </motion.span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="text-lg md:text-xl text-slate-300 leading-relaxed max-w-xl font-medium"
              >
                Let our AI-powered platform help you plan unforgettable journeys
                to Pakistan's most breathtaking destinations. From mountain
                peaks to cultural treasures, we make travel planning effortless.
              </motion.p>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="bg-slate-800/40 backdrop-blur-xl rounded-2xl p-6 border border-slate-700/50 shadow-2xl"
              whileHover={{
                scale: 1.01,
                boxShadow: "0 25px 50px -12px rgba(59,130,246,0.3)",
              }}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                {[
                  {
                    icon: MapPin,
                    label: "Preferred Region",
                    value: preferredRegion,
                    setValue: setPreferredRegion,
                    options: [
                      { value: "northern", label: "Northern Areas" },
                      { value: "hunza", label: "Hunza Valley" },
                      { value: "skardu", label: "Skardu & Baltistan" },
                      { value: "kaghan", label: "Kaghan Valley" },
                      { value: "swat", label: "Swat Valley" },
                      { value: "chitral", label: "Chitral" },
                    ],
                  },
                  {
                    icon: Clock,
                    label: "Duration",
                    value: duration,
                    setValue: setDuration,
                    options: [
                      { value: "3-5", label: "3-5 Days" },
                      { value: "6-8", label: "6-8 Days" },
                      { value: "9-12", label: "9-12 Days" },
                      { value: "13-15", label: "13-15 Days" },
                      { value: "15+", label: "15+ Days" },
                    ],
                  },
                  {
                    icon: Users,
                    label: "Group Size",
                    value: groupSize,
                    setValue: setGroupSize,
                    options: [
                      { value: "solo", label: "Solo Traveler" },
                      { value: "couple", label: "Couple (2)" },
                      { value: "small", label: "Small Group (3-6)" },
                      { value: "medium", label: "Medium Group (7-12)" },
                      { value: "large", label: "Large Group (13+)" },
                    ],
                  },
                  {
                    icon: DollarSign,
                    label: "Budget Range",
                    value: budgetRange,
                    setValue: setBudgetRange,
                    options: [
                      { value: "budget", label: "Budget ($500-1000)" },
                      { value: "mid", label: "Mid-range ($1000-2500)" },
                      { value: "premium", label: "Premium ($2500-5000)" },
                      { value: "luxury", label: "Luxury ($5000+)" },
                    ],
                  },
                ].map((field, index) => (
                  <motion.div
                    key={index}
                    className="space-y-2"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                  >
                    <label className="text-sm font-medium text-slate-300 flex items-center gap-2">
                      <field.icon className="w-4 h-4" />
                      {field.label}
                    </label>
                    <Select value={field.value} onValueChange={field.setValue}>
                      <SelectTrigger className="bg-slate-700/30 border-slate-600 text-white hover:bg-slate-700/50 transition-colors">
                        <SelectValue
                          placeholder={`Select ${field.label.toLowerCase()}`}
                        />
                      </SelectTrigger>
                      <SelectContent className="bg-slate-800 border-slate-700 text-white">
                        {field.options.map((option) => (
                          <SelectItem
                            key={option.value}
                            value={option.value}
                            className="focus:bg-slate-700"
                          >
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </motion.div>
                ))}
              </div>

              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 1 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  size="lg"
                  className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-semibold py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border-0 group"
                >
                  <motion.div
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="flex items-center justify-center"
                  >
                    <Zap className="w-5 h-5 mr-2" />
                    Find Perfect Trip
                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                  </motion.div>
                </Button>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="grid grid-cols-3 gap-6 pt-8 border-t border-slate-700/50"
            >
              {[
                {
                  value: "50K+",
                  label: "Happy Travelers",
                  color: "text-cyan-400",
                  icon: Heart,
                },
                {
                  value: "200+",
                  label: "Destinations",
                  color: "text-blue-400",
                  icon: Globe,
                },
                {
                  value: "24/7",
                  label: "AI Support",
                  color: "text-indigo-400",
                  icon: Shield,
                },
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  className="text-center p-4 bg-slate-800/40 rounded-xl backdrop-blur-sm border border-slate-700/50"
                  whileHover={{
                    scale: 1.05,
                    backgroundColor: "rgba(30,41,59,0.6)",
                  }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <div
                    className={`text-2xl font-bold ${stat.color} flex items-center justify-center`}
                  >
                    {stat.value}
                    <stat.icon className="w-5 h-5 ml-1" />
                  </div>
                  <div className="text-sm text-slate-400 mt-1">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50, rotate: 5 }}
            animate={{ opacity: 1, x: 0, rotate: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
            variants={floatingAnimation}
          >
            <motion.div
              className="relative rounded-2xl overflow-hidden shadow-2xl bg-slate-800/30 backdrop-blur-md border border-slate-700/50"
              whileHover={{
                rotate: -1,
                transition: { duration: 0.5 },
              }}
            >
              <Carousel className="w-full">
                <CarouselContent>
                  {pakistanImages.map((image, index) => (
                    <CarouselItem key={index}>
                      <Card className="border-0 bg-transparent">
                        <CardContent className="p-0">
                          <motion.div
                            className="relative aspect-[4/3] overflow-hidden"
                            initial={{ opacity: 0, scale: 1.1 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.7 }}
                          >
                            <motion.img
                              src={image.src || "/placeholder.svg"}
                              alt={image.alt}
                              fill
                              className="object-cover object-center"
                              sizes="(max-width: 768px) 100vw, 50vw"
                              whileHover={{ scale: 1.1 }}
                              transition={{ duration: 0.7 }}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 via-transparent to-transparent" />
                            <motion.div
                              className="absolute bottom-4 left-4 right-4"
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.5, delay: 0.3 }}
                            >
                              <h3 className="text-white text-xl font-semibold mb-2 drop-shadow-md">
                                {image.title}
                              </h3>
                              <div className="flex items-center gap-2 text-cyan-200 drop-shadow-md">
                                <Calendar className="w-4 h-4" />
                                <span className="text-sm">
                                  Available Year Round
                                </span>
                              </div>
                            </motion.div>
                          </motion.div>
                        </CardContent>
                      </Card>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="left-4 bg-slate-800/80 border-slate-600 text-white hover:bg-slate-700 backdrop-blur-sm" />
                <CarouselNext className="right-4 bg-slate-800/80 border-slate-600 text-white hover:bg-slate-700 backdrop-blur-sm" />
              </Carousel>

              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                {pakistanImages.map((_, index) => (
                  <motion.button
                    key={index}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      index === currentSlide
                        ? "bg-cyan-400 w-6"
                        : "bg-slate-600 hover:bg-slate-500"
                    }`}
                    onClick={() => setCurrentSlide(index)}
                    whileHover={{ scale: 1.5 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  />
                ))}
              </div>
            </motion.div>

            {/* Decorative elements */}
            <motion.div
              className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-r from-cyan-400/30 to-blue-400/30 rounded-full blur-xl"
              variants={pulseAnimation}
              animate="animate"
            />
            <motion.div
              className="absolute -bottom-4 -left-4 w-20 h-20 bg-gradient-to-r from-indigo-400/20 to-purple-400/20 rounded-full blur-xl"
              variants={pulseAnimation}
              animate="animate"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
