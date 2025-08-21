import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuContent,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import {
  Plane,
  Menu,
  X,
  MapPin,
  Package,
  Bot,
  Settings,
  Phone,
  Package2,
} from "lucide-react";

const navigationItems = [
  { name: "Home", href: "/", icon: null },
  {
    name: "Packages",
    href: "/packages",
    icon: Package,
    dropdown: [
      {
        name: "Family Packages",
        href: "/packages/family",
        description: "Perfect for family trips",
      },
      {
        name: "Honeymoon Specials",
        href: "/packages/honeymoon",
        description: "Romantic getaways",
      },
      {
        name: "Adventure Tours",
        href: "/packages/adventure",
        description: "For thrill seekers",
      },
      {
        name: "Budget Friendly",
        href: "/packages/budget",
        description: "Great value packages",
      },
    ],
  },
  { name: "AI Assistant", href: "/ai-assistant", icon: Bot },
  {
    name: "Services",
    href: "/services",
    icon: Settings,
    dropdown: [
      {
        name: "Hotel Booking",
        href: "/services/hotels",
        description: "Find perfect accommodations",
      },
      {
        name: "Flight Booking",
        href: "/services/flights",
        description: "Book domestic & international flights",
      },
      {
        name: "Car Rental",
        href: "/services/cars",
        description: "Rent vehicles for your journey",
      },
      {
        name: "Travel Insurance",
        href: "/services/insurance",
        description: "Stay protected while traveling",
      },
    ],
  },
  {
    name: "Bookings",
    href: "/my-bookings",
    icon: Package2,
    dropdown: [
      {
        name: "View Bookings",
        href: "/my-bookings",
        description: "View and manage your bookings",
      },
    ],
  },
  { name: "Contact", href: "/contact", icon: Phone },
];

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="bg-white border-b border-border sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo Section */}
          <div className="flex items-center space-x-2">
            <motion.div
              initial={{ rotate: 0 }}
              animate={{ rotate: 360 }}
              transition={{
                duration: 2,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "loop",
                ease: "linear",
              }}
              className="text-primary"
            >
              <Plane size={32} />
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="text-2xl font-bold text-primary"
            >
              Travel Hub
            </motion.h1>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <NavigationMenu>
              <NavigationMenuList className="space-x-1">
                {navigationItems.map((item) => (
                  <NavigationMenuItem key={item.name}>
                    {item.dropdown ? (
                      <>
                        <NavigationMenuTrigger className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50">
                          {item.icon && <item.icon className="mr-2 h-4 w-4" />}
                          {item.name}
                        </NavigationMenuTrigger>
                        <NavigationMenuContent>
                          <div className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                            {item.dropdown.map((dropdownItem) => (
                              <NavigationMenuLink
                                key={dropdownItem.name}
                                href={dropdownItem.href}
                                className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                              >
                                <div className="text-sm font-medium leading-none text-primary">
                                  {dropdownItem.name}
                                </div>
                                <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                                  {dropdownItem.description}
                                </p>
                              </NavigationMenuLink>
                            ))}
                          </div>
                        </NavigationMenuContent>
                      </>
                    ) : (
                      <NavigationMenuLink
                        href={item.href}
                        className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50"
                      >
                        {item.icon && <item.icon className="mr-2 h-4 w-4" />}
                        {item.name}
                      </NavigationMenuLink>
                    )}
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          {/* Authentication Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Button
              variant="ghost"
              className="text-primary hover:text-primary/80"
            >
              Sign In
            </Button>
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
              Sign Up
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-primary"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden border-t border-border"
          >
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navigationItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="flex items-center px-3 py-2 rounded-md text-base font-medium text-foreground hover:text-primary hover:bg-accent transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.icon && <item.icon className="mr-2 h-4 w-4" />}
                  {item.name}
                </a>
              ))}
              <div className="flex flex-col space-y-2 pt-4 border-t border-border">
                <Button
                  variant="ghost"
                  className="text-primary hover:text-primary/80 justify-start"
                >
                  Sign In
                </Button>
                <Button className="bg-primary hover:bg-primary/90 text-primary-foreground justify-start">
                  Sign Up
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
