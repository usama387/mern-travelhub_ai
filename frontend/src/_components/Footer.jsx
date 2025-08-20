import { motion } from "framer-motion";
import {
  Plane,
  Mail,
  Phone,
  MapPin,
  Facebook,
  Twitter,
  Instagram,
  Youtube,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-white">
      {/* Newsletter Section */}
      <div className="bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 py-12">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              Subscribe to Our Newsletter
            </h3>
            <p className="text-lg mb-6 opacity-90">
              Get the latest travel deals and destination updates delivered to
              your inbox
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <Input
                type="email"
                placeholder="Enter your email"
                className="bg-white/20 border-white/30 text-white placeholder:text-white/70 backdrop-blur-sm"
              />
              <Button className="bg-white text-purple-600 hover:bg-white/90 font-semibold px-8">
                Subscribe
              </Button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div className="flex items-center gap-2 mb-4">
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
                className="p-2 bg-gradient-to-r from-orange-400 to-yellow-400 rounded-full"
              >
                <Plane className="h-6 w-6 text-white" />
              </motion.div>
              <span className="text-2xl font-bold bg-gradient-to-r from-orange-400 to-yellow-400 bg-clip-text text-transparent">
                Travel Hub
              </span>
            </div>
            <p className="text-slate-300 mb-4">
              Your AI-powered travel companion for exploring the breathtaking
              northern areas of Pakistan and beyond.
            </p>
            <div className="flex space-x-4">
              {[Facebook, Twitter, Instagram, Youtube].map((Icon, index) => (
                <motion.a
                  key={index}
                  href="#"
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  className="p-2 bg-slate-800 rounded-full hover:bg-gradient-to-r hover:from-purple-500 hover:to-pink-500 transition-all duration-300"
                >
                  <Icon className="h-5 w-5" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h4 className="text-lg font-semibold mb-4 text-orange-400">
              Quick Links
            </h4>
            <ul className="space-y-2">
              {[
                "Home",
                "Destinations",
                "Packages",
                "AI Assistant",
                "Services",
                "Contact",
              ].map((link) => (
                <li key={link}>
                  <motion.a
                    href="#"
                    whileHover={{ x: 5 }}
                    className="text-slate-300 hover:text-orange-400 transition-colors duration-300"
                  >
                    {link}
                  </motion.a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Popular Destinations */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h4 className="text-lg font-semibold mb-4 text-orange-400">
              Popular Destinations
            </h4>
            <ul className="space-y-2">
              {[
                "Hunza Valley",
                "Skardu Lakes",
                "K2 Base Camp",
                "Fairy Meadows",
                "Deosai Plains",
                "Naran Kaghan",
              ].map((destination) => (
                <li key={destination}>
                  <motion.a
                    href="#"
                    whileHover={{ x: 5 }}
                    className="text-slate-300 hover:text-orange-400 transition-colors duration-300"
                  >
                    {destination}
                  </motion.a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h4 className="text-lg font-semibold mb-4 text-orange-400">
              Contact Us
            </h4>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <MapPin className="h-5 w-5 text-orange-400 flex-shrink-0" />
                <span className="text-slate-300">Islamabad, Pakistan</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-orange-400 flex-shrink-0" />
                <span className="text-slate-300">+92 300 1234567</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-orange-400 flex-shrink-0" />
                <span className="text-slate-300">info@travelhub.pk</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-slate-800">
        <div className="container mx-auto px-4 py-6">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col md:flex-row justify-between items-center gap-4"
          >
            <p className="text-slate-400 text-sm">
              © 2024 Travel Hub. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm">
              <motion.a
                href="#"
                whileHover={{ scale: 1.05 }}
                className="text-slate-400 hover:text-orange-400 transition-colors duration-300"
              >
                Privacy Policy
              </motion.a>
              <motion.a
                href="#"
                whileHover={{ scale: 1.05 }}
                className="text-slate-400 hover:text-orange-400 transition-colors duration-300"
              >
                Terms of Service
              </motion.a>
              <motion.a
                href="#"
                whileHover={{ scale: 1.05 }}
                className="text-slate-400 hover:text-orange-400 transition-colors duration-300"
              >
                Cookie Policy
              </motion.a>
            </div>
          </motion.div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
