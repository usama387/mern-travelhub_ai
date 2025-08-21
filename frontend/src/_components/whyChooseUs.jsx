import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  MapPin,
  Hotel,
  Car,
  Coffee,
  Mountain,
  Compass,
  Clock,
  Star,
  Users,
} from "lucide-react";

const services = [
  {
    icon: MapPin,
    title: "Travel Packages",
    description:
      "Curated travel experiences to Pakistan's most beautiful destinations",
    image:
      "https://i.pinimg.com/736x/14/75/73/14757335149213054e1600c231a68276.jpg",
    features: ["All-inclusive tours", "Expert guides", "Flexible itineraries"],
  },
  {
    icon: Hotel,
    title: "Hotel Bookings",
    description:
      "Premium accommodations in scenic locations across Northern Pakistan",
    image:
      "https://images.unsplash.com/photo-1596436889106-be35e843f974?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80",
    features: ["5-star hotels", "Mountain views", "Local hospitality"],
  },
  {
    icon: Car,
    title: "Pick & Drop Service",
    description:
      "Comfortable transportation from airports to your destinations",
    image:
      "https://i.pinimg.com/1200x/cd/c2/3e/cdc23e50f6f0998995e9787b6eab8c13.jpg",
    features: ["Professional drivers", "Clean vehicles", "24/7 availability"],
  },
  {
    icon: Coffee,
    title: "Complimentary Breakfast",
    description:
      "Start your day with delicious local and continental breakfast",
    image:
      "https://i.pinimg.com/736x/63/14/fd/6314fd96b09db15f1998ea884df20d9e.jpg",
    features: ["Local cuisine", "Fresh ingredients", "Dietary options"],
  },
  {
    icon: Mountain,
    title: "Curated Destinations",
    description: "Handpicked locations showcasing Pakistan's natural beauty",
    image:
      "https://i.pinimg.com/736x/62/89/71/6289716d4e5f75e86751ba45e11fe4b5.jpg",
    features: ["Hidden gems", "Photo spots", "Cultural sites"],
  },
  {
    icon: Compass,
    title: "Hiking & Trekking",
    description: "Adventure trails for all skill levels with safety equipment",
    image:
      "https://images.unsplash.com/photo-1526772662000-3f88f10405ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80",
    features: ["Safety gear", "Experienced guides", "All skill levels"],
  },
];

const stats = [
  { number: "10K+", label: "Happy Travelers", icon: Users },
  { number: "500+", label: "Destinations", icon: MapPin },
  { number: "24/7", label: "Support", icon: Clock },
  { number: "4.9★", label: "Rating", icon: Star },
];

const WhyChooseUs = () => {
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
            Why Choose Travel Hub
          </Badge>
          <h2 className="text-4xl font-bold text-green-700 mb-4">
            Your Perfect Travel Companion
          </h2>
          <p className="text-xl text-green-600 max-w-3xl mx-auto">
            Experience Pakistan's breathtaking beauty with our AI-powered travel
            planning, premium services, and local expertise that makes every
            journey unforgettable.
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16 bg-green-50 rounded-lg py-8"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="text-center"
            >
              <div className="inline-flex items-center justify-center w-12 h-12 bg-green-100 rounded-full mb-3">
                <stat.icon className="w-6 h-6 text-green-700" />
              </div>
              <div className="text-3xl font-bold text-green-700 mb-1">
                {stat.number}
              </div>
              <div className="text-green-600">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="group"
            >
              <Card className="h-full overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                {/* Service Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4">
                    <Badge className="bg-green-600 hover:bg-green-700 text-white text-sm px-3 py-1">
                      <service.icon className="w-4 h-4 mr-1" />
                      {service.title}
                    </Badge>
                  </div>
                </div>

                <CardHeader className="pb-3">
                  <CardTitle className="text-2xl font-bold text-gray-900 group-hover:text-green-600 transition-colors">
                    {service.title}
                  </CardTitle>
                  <CardDescription className="text-base text-gray-600 leading-6">
                    {service.description}
                  </CardDescription>
                </CardHeader>

                <CardContent>
                  <ul className="space-y-2">
                    {service.features.map((feature, featureIndex) => (
                      <li
                        key={featureIndex}
                        className="flex items-center text-base font-medium text-gray-600 leading-5"
                      >
                        <div className="w-1.5 h-1.5 bg-green-500 rounded-full mr-3" />
                        {feature}
                      </li>
                    ))}
                  </ul>
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
          <Card className="bg-gradient-to-r from-green-600 to-green-700 border-0 text-white">
            <CardContent className="py-12">
              <h3 className="text-3xl font-bold mb-4">
                Ready for Your Next Adventure?
              </h3>
              <p className="text-green-100 mb-8 max-w-2xl mx-auto">
                Let our AI assistant help you plan the perfect trip to
                Pakistan's most stunning destinations. From the peaks of K2 to
                the valleys of Hunza, your journey starts here.
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-green-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
              >
                Start Planning Now
              </motion.button>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
