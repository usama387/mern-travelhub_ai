import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Home } from "lucide-react";

const winterDestinations = [
  {
    id: 1,
    name: "Skardu",
    price: "PKR 112,000–224,000",
    hotel: "Shangrila Resort",
    image:
      "https://i.pinimg.com/736x/84/1c/84/841c8480a1be5206325e3dc1390636f4.jpg",
    badge: null,
    size: "normal",
  },
  {
    id: 2,
    name: "Hunza Valley",
    price: "PKR 84,000–168,000",
    hotel: "Serena Hotel, Karimabad",
    image:
      "https://i.pinimg.com/1200x/12/8f/27/128f27844dbaddf4ee37ed028fe9e7ad.jpg",
    badge: {
      text: "Exclusive Trip in Winter",
      color: "bg-gradient-to-r from-green-600 to-green-700",
    },
    size: "large",
  },
  {
    id: 3,
    name: "Fairy Meadows",
    price: "PKR 140,000–252,000",
    hotel: "Raikot Sarai",
    image:
      "https://i.pinimg.com/736x/e8/38/6f/e8386fb234372fca762f9b64a0f85168.jpg",
    badge: null,
    size: "normal",
  },
  {
    id: 4,
    name: "Deosai Plains",
    price: "PKR 126,000–210,000",
    hotel: "Skardu Hotel",
    image:
      "https://i.pinimg.com/736x/a8/0b/fa/a80bfa079fe9ca803465027710a24ba9.jpg",
    badge: {
      text: "Save 60% Today",
      color: "bg-gradient-to-r from-green-600 to-green-700",
    },
    size: "normal",
  },
  {
    id: 5,
    name: "Kaghan Valley",
    price: "PKR 98,000–182,000",
    hotel: "Pine Park Hotel",
    image:
      "https://images.unsplash.com/photo-1544735716-392fe2489ffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80",
    badge: {
      text: "Save 40% Today",
      color: "bg-gradient-to-r from-green-600 to-green-700",
    },
    size: "normal",
  },
];

const WinterSpecial = () => {
  return (
    <section className="py-20 px-4 bg-gradient-to-b from-background to-green-50/30">
      <div className="max-w-7xl mx-auto">
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
            Why Choose Winter Special
          </Badge>
          <h2 className="text-4xl font-bold text-green-700 mb-4">
            Winter Special
          </h2>
          <p className="text-xl font-medium text-green-600 max-w-2xl mx-auto">
            Plan, book, and embark on your dream adventure with our expert guidance and tailored experiences.
          </p>
        </motion.div>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 h-auto md:h-[600px]">
          {/* Skardu - Top Left */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="md:col-span-1 md:row-span-1 relative group cursor-pointer overflow-hidden rounded-2xl h-64 md:h-auto"
          >
            <img
              src={winterDestinations[0].image}
              alt={winterDestinations[0].name}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
            <div className="absolute bottom-6 left-6 text-green-100">
              <h3 className="text-2xl font-bold mb-2">{winterDestinations[0].name}</h3>
              <p className="text-base font-medium">{winterDestinations[0].price}</p>
              <div className="flex items-center gap-1 text-base font-medium">
                <Home className="w-4 h-4" />
                <span>{winterDestinations[0].hotel}</span>
              </div>
            </div>
          </motion.div>

          {/* Hunza Valley - Center Large */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="md:col-span-2 md:row-span-2 relative group cursor-pointer overflow-hidden rounded-2xl h-64 md:h-auto"
          >
            <img
              src={winterDestinations[1].image}
              alt={winterDestinations[1].name}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
            {winterDestinations[1].badge && (
              <Badge
                className={`absolute top-6 left-6 ${winterDestinations[1].badge.color} text-green-100 border-0 px-4 py-2 text-sm`}
              >
                {winterDestinations[1].badge.text}
              </Badge>
            )}
            <div className="absolute bottom-8 left-8 text-green-100">
              <h3 className="text-3xl font-bold mb-3">{winterDestinations[1].name}</h3>
              <p className="text-base font-medium">{winterDestinations[1].price}</p>
              <div className="flex items-center gap-1 text-base font-medium">
                <Home className="w-4 h-4" />
                <span>{winterDestinations[1].hotel}</span>
              </div>
            </div>
          </motion.div>

          {/* Fairy Meadows - Top Right */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="md:col-span-1 md:row-span-1 relative group cursor-pointer overflow-hidden rounded-2xl h-64 md:h-auto"
          >
            <img
              src={winterDestinations[2].image}
              alt={winterDestinations[2].name}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
            <div className="absolute bottom-6 left-6 text-green-100">
              <h3 className="text-2xl font-bold mb-2">{winterDestinations[2].name}</h3>
              <p className="text-base font-medium">{winterDestinations[2].price}</p>
              <div className="flex items-center gap-1 text-base font-medium">
                <Home className="w-4 h-4" />
                <span>{winterDestinations[2].hotel}</span>
              </div>
            </div>
          </motion.div>

          {/* Deosai Plains - Bottom Left */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="md:col-span-1 md:row-span-1 relative group cursor-pointer overflow-hidden rounded-2xl h-64 md:h-auto"
          >
            <img
              src={winterDestinations[3].image}
              alt={winterDestinations[3].name}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
            {winterDestinations[3].badge && (
              <Badge
                className={`absolute top-6 left-6 ${winterDestinations[3].badge.color} text-green-100 border-0 px-3 py-1 text-sm`}
              >
                {winterDestinations[3].badge.text}
              </Badge>
            )}
            <div className="absolute bottom-6 left-6 text-green-100">
              <h3 className="text-2xl font-bold mb-2">{winterDestinations[3].name}</h3>
              <p className="text-base font-medium">{winterDestinations[3].price}</p>
              <div className="flex items-center gap-1 text-base font-medium">
                <Home className="w-4 h-4" />
                <span>{winterDestinations[3].hotel}</span>
              </div>
            </div>
          </motion.div>

          {/* Kaghan Valley - Bottom Right */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="md:col-span-1 md:row-span-1 relative group cursor-pointer overflow-hidden rounded-2xl h-64 md:h-auto"
          >
            <img
              src={winterDestinations[4].image}
              alt={winterDestinations[4].name}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
            {winterDestinations[4].badge && (
              <Badge
                className={`absolute top-6 left-6 ${winterDestinations[4].badge.color} text-green-100 border-0 px-3 py-1 text-sm`}
              >
                {winterDestinations[4].badge.text}
              </Badge>
            )}
            <div className="absolute bottom-6 left-6 text-green-100">
              <h3 className="text-2xl font-bold mb-2">{winterDestinations[4].name}</h3>
              <p className="text-base font-medium">{winterDestinations[4].price}</p>
              <div className="flex items-center gap-1 text-base font-medium">
                <Home className="w-4 h-4" />
                <span>{winterDestinations[4].hotel}</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default WinterSpecial;