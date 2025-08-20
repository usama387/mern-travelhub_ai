import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";

const winterDestinations = [
  {
    id: 1,
    name: "Skardu",
    price: "From $400-800",
    image:
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop&crop=center",
    badge: null,
    size: "normal",
  },
  {
    id: 2,
    name: "Hunza Valley",
    price: "From $300-600",
    image:
      "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800&h=600&fit=crop&crop=center",
    badge: {
      text: "Exclusive trip in winter",
      color: "bg-gradient-to-r from-pink-500 to-purple-500",
    },
    size: "large",
  },
  {
    id: 3,
    name: "Fairy Meadows",
    price: "From $500-900",
    image:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop&crop=center",
    badge: null,
    size: "normal",
  },
  {
    id: 4,
    name: "Deosai Plains",
    price: "From $450-750",
    image:
      "https://images.unsplash.com/photo-1464822759844-d150ad6d1c71?w=800&h=600&fit=crop&crop=center",
    badge: {
      text: "Save 60% today",
      color: "bg-gradient-to-r from-yellow-400 to-orange-500",
    },
    size: "normal",
  },
  {
    id: 5,
    name: "Kaghan Valley",
    price: "From $350-650",
    image:
      "https://images.unsplash.com/photo-1551632811-561732d1e306?w=800&h=600&fit=crop&crop=center",
    badge: {
      text: "Save 40% today",
      color: "bg-gradient-to-r from-yellow-400 to-orange-500",
    },
    size: "normal",
  },
];

const WinterSpecial = () => {
  return (
    <section className="py-20 px-4 bg-red-50">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            Winter Special
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Plan, book, and embark on your dream adventure with our expert
            guidance and tailored experiences.
          </p>
        </motion.div>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 h-auto md:h-[600px]">
          {/* Nepal - Top Left */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="md:col-span-1 md:row-span-1 relative group cursor-pointer overflow-hidden rounded-2xl h-64 md:h-auto"
          >
            <img
              src={winterDestinations[1].image || "/placeholder.svg"}
              alt={winterDestinations[1].name}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
            <div className="absolute bottom-6 left-6 text-white">
              <h3 className="text-2xl font-bold mb-2">
                {winterDestinations[0].name}
              </h3>
              <p className="text-sm opacity-90">
                {winterDestinations[0].price}
              </p>
            </div>
          </motion.div>

          {/* Switzerland - Center Large */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="md:col-span-2 md:row-span-2 relative group cursor-pointer overflow-hidden rounded-2xl h-64 md:h-auto"
          >
            <img
              src={winterDestinations[2].image || "/placeholder.svg"}
              alt={winterDestinations[2].name}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
            {winterDestinations[1].badge && (
              <Badge
                className={`absolute top-6 left-6 ${winterDestinations[1].badge.color} text-white border-0 px-4 py-2`}
              >
                {winterDestinations[1].badge.text}
              </Badge>
            )}
            <div className="absolute bottom-8 left-8 text-white">
              <h3 className="text-3xl md:text-4xl font-bold mb-3">
                {winterDestinations[1].name}
              </h3>
              <p className="text-base opacity-90">
                {winterDestinations[1].price}
              </p>
            </div>
          </motion.div>

          {/* Tibet - Top Right */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="md:col-span-1 md:row-span-1 relative group cursor-pointer overflow-hidden rounded-2xl h-64 md:h-auto"
          >
            <img
              src={winterDestinations[3].image || "/placeholder.svg"}
              alt={winterDestinations[3].name}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
            <div className="absolute bottom-6 left-6 text-white">
              <h3 className="text-2xl font-bold mb-2">
                {winterDestinations[2].name}
              </h3>
              <p className="text-sm opacity-90">
                {winterDestinations[2].price}
              </p>
            </div>
          </motion.div>

          {/* Kashmir - Bottom Left */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="md:col-span-1 md:row-span-1 relative group cursor-pointer overflow-hidden rounded-2xl h-64 md:h-auto"
          >
            <img
              src={winterDestinations[4].image || "/placeholder.svg"}
              alt={winterDestinations[4].name}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
            {winterDestinations[3].badge && (
              <Badge
                className={`absolute top-6 left-6 ${winterDestinations[3].badge.color} text-white border-0 px-3 py-1 text-sm`}
              >
                {winterDestinations[3].badge.text}
              </Badge>
            )}
            <div className="absolute bottom-6 left-6 text-white">
              <h3 className="text-2xl font-bold mb-2">
                {winterDestinations[3].name}
              </h3>
              <p className="text-sm opacity-90">
                {winterDestinations[3].price}
              </p>
            </div>
          </motion.div>

          {/* South Korea - Bottom Right */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="md:col-span-1 md:row-span-1 relative group cursor-pointer overflow-hidden rounded-2xl h-64 md:h-auto"
          >
            <img
              src={winterDestinations[4].image || "/placeholder.svg"}
              alt={winterDestinations[4].name}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
            {winterDestinations[4].badge && (
              <Badge
                className={`absolute top-6 left-6 ${winterDestinations[4].badge.color} text-white border-0 px-3 py-1 text-sm`}
              >
                {winterDestinations[4].badge.text}
              </Badge>
            )}
            <div className="absolute bottom-6 left-6 text-white">
              <h3 className="text-2xl font-bold mb-2">
                {winterDestinations[4].name}
              </h3>
              <p className="text-sm opacity-90">
                {winterDestinations[4].price}
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default WinterSpecial;
