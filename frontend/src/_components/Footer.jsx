import { motion } from "framer-motion";
import {
  MapPin,
  Phone,
  Mail,
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  Plane,
  Heart,
} from "lucide-react";

const footerLinks = {
  destinations: [
    "Hunza Valley",
    "Skardu",
    "Swat Valley",
    "Fairy Meadows",
    "Kaghan Valley",
    "Chitral",
  ],
  services: [
    "Travel Packages",
    "Hotel Booking",
    "Transportation",
    "Tour Guides",
    "Adventure Tours",
    "Cultural Tours",
  ],
  support: [
    "Help Center",
    "Contact Us",
    "Travel Insurance",
    "Booking Policy",
    "Cancellation",
    "Safety Guidelines",
  ],
};

const socialLinks = [
  { icon: Facebook, href: "#", label: "Facebook" },
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: Youtube, href: "#", label: "YouTube" },
];

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-1"
          >
            <div className="flex items-center mb-6">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{
                  duration: 8,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "linear",
                }}
                className="mr-3"
              >
                <Plane className="w-8 h-8 text-green-400" />
              </motion.div>
              <h3 className="text-2xl font-bold">Travel Hub</h3>
            </div>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Your AI-powered travel companion for exploring Pakistan's most
              beautiful destinations. Creating unforgettable memories, one
              journey at a time.
            </p>

            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center text-gray-300">
                <MapPin className="w-5 h-5 text-green-400 mr-3" />
                <span>Islamabad, Pakistan</span>
              </div>
              <div className="flex items-center text-gray-300">
                <Phone className="w-5 h-5 text-green-400 mr-3" />
                <span>+92 300 1234567</span>
              </div>
              <div className="flex items-center text-gray-300">
                <Mail className="w-5 h-5 text-green-400 mr-3" />
                <span>info@travelhub.pk</span>
              </div>
            </div>
          </motion.div>

          {/* Destinations */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h4 className="text-lg font-semibold mb-6 text-green-400">
              Popular Destinations
            </h4>
            <ul className="space-y-3">
              {footerLinks.destinations.map((destination, index) => (
                <li key={destination}>
                  <motion.a
                    href="#"
                    className="text-gray-300 hover:text-green-400 transition-colors"
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    {destination}
                  </motion.a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Services */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h4 className="text-lg font-semibold mb-6 text-green-400">
              Our Services
            </h4>
            <ul className="space-y-3">
              {footerLinks.services.map((service, index) => (
                <li key={service}>
                  <motion.a
                    href="#"
                    className="text-gray-300 hover:text-green-400 transition-colors"
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    {service}
                  </motion.a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Support */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h4 className="text-lg font-semibold mb-6 text-green-400">
              Support
            </h4>
            <ul className="space-y-3 mb-6">
              {footerLinks.support.map((item, index) => (
                <li key={item}>
                  <motion.a
                    href="#"
                    className="text-gray-300 hover:text-green-400 transition-colors"
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    {item}
                  </motion.a>
                </li>
              ))}
            </ul>

            {/* Social Links */}
            <div>
              <h5 className="text-sm font-semibold mb-4 text-green-400">
                Follow Us
              </h5>
              <div className="flex space-x-4">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center text-gray-300 hover:bg-green-600 hover:text-white transition-colors"
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label={social.label}
                  >
                    <social.icon className="w-5 h-5" />
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom Bar */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="border-t border-gray-800 py-6"
      >
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center text-gray-400 mb-4 md:mb-0">
              <span>© 2024 Travel Hub. Made with</span>
              <Heart className="w-4 h-4 text-red-500 mx-2" />
              <span>in Pakistan</span>
            </div>
            <div className="flex space-x-6 text-sm text-gray-400">
              <a href="#" className="hover:text-green-400 transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-green-400 transition-colors">
                Terms of Service
              </a>
              <a href="#" className="hover:text-green-400 transition-colors">
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </motion.div>
    </footer>
  );
};

export default Footer;
