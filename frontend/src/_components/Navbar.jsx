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
  Package,
  Bot,
  Phone,
  Package2,
} from "lucide-react";
import { useUser, UserButton, SignInButton, SignUpButton } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";

const navigationItems = [
  { name: "Home", href: "/", icon: null },
  { name: "Packages", href: "/packages", icon: Package },
  { name: "AI Assistant", href: "/ai-assistant", icon: Bot },
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
  const { user, isSignedIn } = useUser();
  const role = user?.publicMetadata?.role;
  const navigate = useNavigate();

  return (
    <nav className="bg-white border-b border-border sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
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
                        <NavigationMenuTrigger>
                          {item.icon && <item.icon className="mr-2 h-4 w-4" />}
                          {item.name}
                        </NavigationMenuTrigger>
                        <NavigationMenuContent>
                          <div className="grid w-[400px] gap-3 p-4 md:w-[500px] lg:w-[600px] md:grid-cols-2">
                            {item.dropdown.map((dropdownItem) => (
                              <NavigationMenuLink
                                key={dropdownItem.name}
                                href={dropdownItem.href}
                                className="block rounded-md p-3 hover:bg-accent"
                              >
                                <div className="text-sm font-medium text-primary">
                                  {dropdownItem.name}
                                </div>
                                <p className="text-sm text-muted-foreground">
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
                        className="inline-flex items-center px-4 py-2 text-sm font-medium hover:bg-accent rounded-md"
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

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {role === "admin" && (
              <Button
                onClick={() => navigate("/dashboard")}
              >
                Admin Dashboard
              </Button>
            )}
            {isSignedIn ? (
              <UserButton afterSignOutUrl="/" />
            ) : (
              <>
                <SignInButton mode="modal">
                  <Button variant="ghost">Sign In</Button>
                </SignInButton>
                <SignUpButton mode="modal">
                  <Button className="bg-primary text-primary-foreground">
                    Sign Up
                  </Button>
                </SignUpButton>
              </>
            )}
          </div>

          {/* Mobile menu button */}
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
                  className="flex items-center px-3 py-2 rounded-md text-base font-medium hover:bg-accent"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.icon && <item.icon className="mr-2 h-4 w-4" />}
                  {item.name}
                </a>
              ))}
              <div className="flex flex-col space-y-2 pt-4 border-t border-border">
                {isSignedIn ? (
                  <UserButton afterSignOutUrl="/" />
                ) : (
                  <>
                    <SignInButton mode="modal">
                      <Button variant="ghost" className="justify-start">
                        Sign In
                      </Button>
                    </SignInButton>
                    <SignUpButton mode="modal">
                      <Button className="bg-primary text-primary-foreground justify-start">
                        Sign Up
                      </Button>
                    </SignUpButton>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
