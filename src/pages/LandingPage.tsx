
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Film, Users, MessageSquare, Camera, Play, Star, Search, Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState } from 'react';

const LandingPage = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50">
      {/* Professional Navigation Header */}
      <nav className="bg-white/95 backdrop-blur-md border-b border-orange-100 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center">
              <Link to="/" className="flex-shrink-0 flex items-center">
                <span className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                  MovCon
                </span>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <Link to="/" className="text-gray-700 hover:text-orange-600 px-3 py-2 rounded-md text-sm font-medium transition-colors">
                Home
              </Link>
              <Link to="#features" className="text-gray-700 hover:text-orange-600 px-3 py-2 rounded-md text-sm font-medium transition-colors">
                Features
              </Link>
              <Link to="#how-it-works" className="text-gray-700 hover:text-orange-600 px-3 py-2 rounded-md text-sm font-medium transition-colors">
                How it Works
              </Link>
              <Link to="#creators" className="text-gray-700 hover:text-orange-600 px-3 py-2 rounded-md text-sm font-medium transition-colors">
                For Creators
              </Link>
            </div>

            {/* Search Bar (Desktop) */}
            <div className="hidden lg:flex items-center flex-1 max-w-md mx-8">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <input
                  type="text"
                  placeholder="Search creators, projects..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white/50"
                />
              </div>
            </div>

            {/* Right side buttons */}
            <div className="hidden md:flex items-center space-x-4">
              <Button asChild variant="ghost" className="text-gray-700 hover:text-orange-600">
                <Link to="/login">Sign In</Link>
              </Button>
              <Button asChild className="bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white">
                <Link to="/login">Join Network</Link>
              </Button>
            </div>

            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <div className="md:hidden border-t border-gray-200 py-4">
              <div className="space-y-2">
                {/* Mobile Search */}
                <div className="px-3 py-2">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <input
                      type="text"
                      placeholder="Search creators, projects..."
                      className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    />
                  </div>
                </div>
                
                {/* Mobile Navigation Links */}
                <Link to="/" className="block px-3 py-2 text-gray-700 hover:text-orange-600 hover:bg-orange-50 rounded-md">
                  Home
                </Link>
                <Link to="#features" className="block px-3 py-2 text-gray-700 hover:text-orange-600 hover:bg-orange-50 rounded-md">
                  Features
                </Link>
                <Link to="#how-it-works" className="block px-3 py-2 text-gray-700 hover:text-orange-600 hover:bg-orange-50 rounded-md">
                  How it Works
                </Link>
                <Link to="#creators" className="block px-3 py-2 text-gray-700 hover:text-orange-600 hover:bg-orange-50 rounded-md">
                  For Creators
                </Link>
                
                {/* Mobile Auth Buttons */}
                <div className="px-3 py-2 space-y-2">
                  <Button asChild variant="outline" className="w-full">
                    <Link to="/login">Sign In</Link>
                  </Button>
                  <Button asChild className="w-full bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700">
                    <Link to="/login">Join Network</Link>
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="animate-fade-in">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                Connect. Create. Collaborate.
              </span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              The premier platform for film industry professionals to network, 
              discover projects, and build their careers in cinema.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700">
                <Link to="/login">Start Your Journey</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-orange-300 text-orange-600 hover:bg-orange-50">
                <Link to="#how-it-works">Learn More</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose MovCon?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-orange-100 hover:shadow-lg transition-shadow">
              <CardContent className="p-6 text-center">
                <Users className="h-12 w-12 text-orange-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Global Network</h3>
                <p className="text-gray-600">Connect with over 50,000+ film professionals worldwide.</p>
              </CardContent>
            </Card>
            <Card className="border-orange-100 hover:shadow-lg transition-shadow">
              <CardContent className="p-6 text-center">
                <Film className="h-12 w-12 text-orange-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Live Projects</h3>
                <p className="text-gray-600">Discover and apply to 1000+ active film projects.</p>
              </CardContent>
            </Card>
            <Card className="border-orange-100 hover:shadow-lg transition-shadow">
              <CardContent className="p-6 text-center">
                <MessageSquare className="h-12 w-12 text-orange-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Direct Communication</h3>
                <p className="text-gray-600">Message directors, producers, and talent directly.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">How MovCon Works</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-orange-100 hover:shadow-lg transition-shadow">
              <CardContent className="p-6 text-center">
                <div className="h-12 w-12 rounded-full bg-gradient-to-r from-orange-500 to-red-500 flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold text-lg">1</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">Create Your Profile</h3>
                <p className="text-gray-600">Showcase your skills, experience, and portfolio to stand out.</p>
              </CardContent>
            </Card>
            <Card className="border-orange-100 hover:shadow-lg transition-shadow">
              <CardContent className="p-6 text-center">
                <div className="h-12 w-12 rounded-full bg-gradient-to-r from-orange-500 to-red-500 flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold text-lg">2</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">Discover & Connect</h3>
                <p className="text-gray-600">Find projects and professionals that match your interests.</p>
              </CardContent>
            </Card>
            <Card className="border-orange-100 hover:shadow-lg transition-shadow">
              <CardContent className="p-6 text-center">
                <div className="h-12 w-12 rounded-full bg-gradient-to-r from-orange-500 to-red-500 flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold text-lg">3</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">Collaborate & Create</h3>
                <p className="text-gray-600">Work together on amazing film projects and build your network.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Creator Categories */}
      <section id="creators" className="py-20 bg-white/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Join Your Creative Community</h2>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { name: 'Directors', icon: Camera, color: 'from-orange-500 to-red-500', count: '12K+' },
              { name: 'Actors', icon: Star, color: 'from-red-500 to-pink-500', count: '28K+' },
              { name: 'Producers', icon: Film, color: 'from-orange-600 to-yellow-500', count: '8K+' },
              { name: 'Crew', icon: Users, color: 'from-red-600 to-orange-600', count: '15K+' }
            ].map((category) => (
              <Card key={category.name} className="border-orange-100 hover:shadow-lg transition-all group cursor-pointer">
                <CardContent className="p-6 text-center">
                  <div className={`h-16 w-16 rounded-full bg-gradient-to-r ${category.color} flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}>
                    <category.icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold">{category.name}</h3>
                  <p className="text-sm text-gray-500 mt-1">{category.count} professionals</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">What Creators Say</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Rajesh Kumar",
                role: "Director",
                quote: "MovCon helped me find the perfect cinematographer for my latest project. The networking features are incredible!",
                rating: 5
              },
              {
                name: "Priya Sharma",
                role: "Producer",
                quote: "I've connected with amazing talent through MovCon. It's revolutionized how I cast for my films.",
                rating: 5
              },
              {
                name: "Vikram Singh",
                role: "Actor",
                quote: "The platform is intuitive and has opened doors to opportunities I never would have found otherwise.",
                rating: 5
              }
            ].map((testimonial, index) => (
              <Card key={index} className="border-orange-100">
                <CardContent className="p-6">
                  <div className="flex mb-3">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-orange-400 text-orange-400" />
                    ))}
                  </div>
                  <p className="text-gray-600 mb-4 italic">"{testimonial.quote}"</p>
                  <div className="flex items-center">
                    <div className="h-10 w-10 rounded-full bg-gradient-to-r from-orange-400 to-red-400 flex items-center justify-center text-white font-semibold">
                      {testimonial.name.charAt(0)}
                    </div>
                    <div className="ml-3">
                      <p className="font-semibold">{testimonial.name}</p>
                      <p className="text-sm text-gray-500">{testimonial.role}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-orange-600 to-red-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white mb-6">Ready to Start Your Film Journey?</h2>
          <p className="text-xl text-orange-100 mb-8">
            Join thousands of film professionals who are already building their careers on MovCon.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-white text-orange-600 hover:bg-orange-50">
              <Link to="/login">Get Started Today</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-white text-white hover:bg-white/10">
              <Link to="#features">Learn More</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4 bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">
                MovCon
              </h3>
              <p className="text-gray-400">Connecting the global film community, one story at a time.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Platform</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#features" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="#how-it-works" className="hover:text-white transition-colors">How it Works</a></li>
                <li><a href="#creators" className="hover:text-white transition-colors">For Creators</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">About</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Cookie Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">GDPR</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 MovCon. All rights reserved. Made with ❤️ for the film community.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
