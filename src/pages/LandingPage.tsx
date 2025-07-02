
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Film, Users, MessageSquare, Camera, Play, Star } from 'lucide-react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-md border-b border-orange-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <span className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                MovCon
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <Button asChild variant="ghost">
                <Link to="/login">Sign In</Link>
              </Button>
              <Button asChild className="bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700">
                <Link to="/login">Join the Network</Link>
              </Button>
            </div>
          </div>
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

      {/* How It Works */}
      <section id="how-it-works" className="py-20 bg-white/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">How MovCon Works</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-orange-100 hover:shadow-lg transition-shadow">
              <CardContent className="p-6 text-center">
                <Users className="h-12 w-12 text-orange-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Build Your Network</h3>
                <p className="text-gray-600">Connect with directors, actors, producers, and crew members worldwide.</p>
              </CardContent>
            </Card>
            <Card className="border-orange-100 hover:shadow-lg transition-shadow">
              <CardContent className="p-6 text-center">
                <Film className="h-12 w-12 text-orange-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Discover Projects</h3>
                <p className="text-gray-600">Find and apply to exciting film projects that match your skills and interests.</p>
              </CardContent>
            </Card>
            <Card className="border-orange-100 hover:shadow-lg transition-shadow">
              <CardContent className="p-6 text-center">
                <MessageSquare className="h-12 w-12 text-orange-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Collaborate</h3>
                <p className="text-gray-600">Share your work, get feedback, and collaborate on creative projects.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Creator Categories */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Join Your Creative Community</h2>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { name: 'Directors', icon: Camera, color: 'from-orange-500 to-red-500' },
              { name: 'Actors', icon: Star, color: 'from-red-500 to-pink-500' },
              { name: 'Producers', icon: Film, color: 'from-orange-600 to-yellow-500' },
              { name: 'Crew', icon: Users, color: 'from-red-600 to-orange-600' }
            ].map((category) => (
              <Card key={category.name} className="border-orange-100 hover:shadow-lg transition-all group cursor-pointer">
                <CardContent className="p-6 text-center">
                  <div className={`h-16 w-16 rounded-full bg-gradient-to-r ${category.color} flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}>
                    <category.icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold">{category.name}</h3>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-white/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">What Creators Say</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Rajesh Kumar",
                role: "Director",
                quote: "MovCon helped me find the perfect cinematographer for my latest project. The networking features are incredible!"
              },
              {
                name: "Priya Sharma",
                role: "Producer",
                quote: "I've connected with amazing talent through MovCon. It's revolutionized how I cast for my films."
              },
              {
                name: "Vikram Singh",
                role: "Actor",
                quote: "The platform is intuitive and has opened doors to opportunities I never would have found otherwise."
              }
            ].map((testimonial, index) => (
              <Card key={index} className="border-orange-100">
                <CardContent className="p-6">
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
          <Button asChild size="lg" className="bg-white text-orange-600 hover:bg-orange-50">
            <Link to="/login">Get Started Today</Link>
          </Button>
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
              <p className="text-gray-400">Connecting the global film community.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Platform</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">How it Works</a></li>
                <li><a href="#" className="hover:text-white">Pricing</a></li>
                <li><a href="#" className="hover:text-white">Features</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">About</a></li>
                <li><a href="#" className="hover:text-white">Careers</a></li>
                <li><a href="#" className="hover:text-white">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white">Terms of Service</a></li>
                <li><a href="#" className="hover:text-white">Cookie Policy</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 MovCon. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
