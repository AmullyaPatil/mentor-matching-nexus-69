
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { 
  UserCircle, 
  Menu,
  X,
  ChevronDown,
  Heart,
  Home,
  Users,
  Globe,
  BookOpen
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Updated nav items
const NAV_ITEMS = [
  { path: "/", name: "Home", icon: <Home className="h-4 w-4 mr-2" /> },
  { path: "/search", name: "Find Connections", icon: <Users className="h-4 w-4 mr-2" /> },
  { path: "/community", name: "Community", icon: <Globe className="h-4 w-4 mr-2" /> },
  { path: "/knowledge-hub", name: "Knowledge Hub", icon: <BookOpen className="h-4 w-4 mr-2" /> },
];

export default function Navbar() {
  const { user, logout } = useAuth();
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/80 backdrop-blur-md border-b border-gray-200/50 py-4"
          : "bg-transparent py-6"
      }`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="h-10 w-10 rounded-lg bg-teal-600 flex items-center justify-center transition-transform duration-500 group-hover:rotate-6">
              <span className="text-white font-display text-lg font-semibold">SG</span>
            </div>
            <span className="font-display text-xl font-medium">Startup Growth</span>
          </Link>

          <div className="hidden md:flex items-center space-x-1">
            <nav className="flex items-center space-x-1 mr-4">
              {NAV_ITEMS.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors flex items-center ${
                    location.pathname === item.path
                      ? "bg-teal-100 text-teal-700"
                      : "text-foreground/70 hover:text-foreground hover:bg-teal-50"
                  }`}
                >
                  {item.icon}
                  {item.name}
                </Link>
              ))}
            </nav>

            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center space-x-2">
                    {user.avatar ? (
                      <img
                        src={user.avatar}
                        alt={user.name}
                        className="h-8 w-8 rounded-full object-cover"
                      />
                    ) : (
                      <UserCircle className="h-6 w-6" />
                    )}
                    <span className="text-sm font-medium hidden sm:inline-block">
                      {user.name}
                    </span>
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>
                    <div className="flex flex-col">
                      <span>{user.name}</span>
                      <span className="text-xs text-muted-foreground">{user.email}</span>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link to="/dashboard" className="w-full cursor-pointer">
                      Dashboard
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/wishlist" className="w-full cursor-pointer flex items-center">
                      <Heart className="h-4 w-4 mr-2" />
                      Wishlist
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/profile" className="w-full cursor-pointer">
                      Profile
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={logout}
                    className="text-red-500 cursor-pointer"
                  >
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex items-center space-x-2">
                <Button asChild variant="ghost" size="sm">
                  <Link to="/auth">Log In</Link>
                </Button>
                <Button asChild size="sm" className="bg-teal-600 hover:bg-teal-700">
                  <Link to="/auth?signup=true">Sign Up</Link>
                </Button>
              </div>
            )}
          </div>

          {/* Mobile menu trigger */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 rounded-md md:hidden"
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 animate-fade-in mt-2">
          <div className="container mx-auto px-4 py-4">
            <nav className="flex flex-col space-y-2">
              {NAV_ITEMS.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`px-4 py-3 rounded-md text-sm font-medium transition-colors flex items-center ${
                    location.pathname === item.path
                      ? "bg-teal-100 text-teal-700"
                      : "text-foreground/70 hover:text-foreground hover:bg-teal-50"
                  }`}
                >
                  {item.icon}
                  {item.name}
                </Link>
              ))}
              {!user && (
                <>
                  <Link
                    to="/auth"
                    className="px-4 py-3 rounded-md text-sm font-medium text-foreground/70 hover:text-foreground hover:bg-teal-50"
                  >
                    Log In
                  </Link>
                  <Link
                    to="/auth?signup=true"
                    className="px-4 py-3 rounded-md text-sm font-medium bg-teal-600 text-white hover:bg-teal-700"
                  >
                    Sign Up
                  </Link>
                </>
              )}
              {user && (
                <>
                  <Link
                    to="/dashboard"
                    className="px-4 py-3 rounded-md text-sm font-medium text-foreground/70 hover:text-foreground hover:bg-teal-50"
                  >
                    Dashboard
                  </Link>
                  <Link
                    to="/wishlist"
                    className="px-4 py-3 rounded-md text-sm font-medium text-foreground/70 hover:text-foreground hover:bg-teal-50 flex items-center"
                  >
                    <Heart className="h-4 w-4 mr-2" />
                    Wishlist
                  </Link>
                  <Link
                    to="/profile"
                    className="px-4 py-3 rounded-md text-sm font-medium text-foreground/70 hover:text-foreground hover:bg-teal-50"
                  >
                    Profile
                  </Link>
                  <button
                    onClick={logout}
                    className="text-left px-4 py-3 rounded-md text-sm font-medium text-red-500 hover:bg-red-50"
                  >
                    Logout
                  </button>
                </>
              )}
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}
