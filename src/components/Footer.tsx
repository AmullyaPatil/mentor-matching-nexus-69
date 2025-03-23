
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-navy-900 py-12 md:py-16 text-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12">
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="inline-flex items-center gap-2 mb-4">
              <div className="h-8 w-8 rounded-lg bg-cobalt-500 flex items-center justify-center">
                <span className="text-white font-display text-sm font-semibold">SG</span>
              </div>
              <span className="font-display text-lg font-medium text-white">Startup Growth</span>
            </Link>
            <p className="text-navy-100 mb-4 max-w-md">
              Connecting founders, mentors, investors, and service providers to fuel the next generation of startups.
            </p>
          </div>

          <div>
            <h3 className="font-medium text-base mb-3 text-white">Platform</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/search" className="text-navy-200 hover:text-white transition-colors">
                  Find Connections
                </Link>
              </li>
              <li>
                <Link to="/community" className="text-navy-200 hover:text-white transition-colors">
                  Community Hub
                </Link>
              </li>
              <li>
                <Link to="/dashboard" className="text-navy-200 hover:text-white transition-colors">
                  Dashboard
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-medium text-base mb-3 text-white">Resources</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-navy-200 hover:text-white transition-colors">
                  Blog
                </a>
              </li>
              <li>
                <a href="#" className="text-navy-200 hover:text-white transition-colors">
                  Startup Toolkit
                </a>
              </li>
              <li>
                <a href="#" className="text-navy-200 hover:text-white transition-colors">
                  Events
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-medium text-base mb-3 text-white">Company</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-navy-200 hover:text-white transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="text-navy-200 hover:text-white transition-colors">
                  Careers
                </a>
              </li>
              <li>
                <a href="#" className="text-navy-200 hover:text-white transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-navy-800 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-navy-300 mb-4 md:mb-0">
            © {new Date().getFullYear()} Startup Growth. All rights reserved.
          </p>
          <div className="flex gap-8">
            <a href="#" className="text-sm text-navy-300 hover:text-white transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-sm text-navy-300 hover:text-white transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
