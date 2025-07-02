
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Film, 
  Users, 
  Zap, 
  Globe, 
  Star, 
  ArrowRight, 
  Play,
  Camera,
  Music,
  Edit3,
  Palette,
  Mic,
  Video,
  CheckCircle
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

const LandingPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Redirect authenticated users to feed
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const handleGetStarted = () => {
    navigate('/login');
  };

  const categories = [
    { icon: Camera, name: "Directors", count: "1.2k+", color: "bg-red-500" },
    { icon: Film, name: "Actors", count: "2.8k+", color: "bg-blue-500" },
    { icon: Edit3, name: "Editors", count: "890+", color: "bg-green-500" },
    { icon: Music, name: "Composers", count: "650+", color: "bg-purple-500" },
    { icon: Palette, name: "Art Directors", count: "420+", color: "bg-pink-500" },
    { icon: Mic, name: "Sound Engineers", count: "380+", color: "bg-yellow-500" },
    { icon: Video, name: "Cinematographers", count: "720+", color: "bg-indigo-500" },
    { icon: Users, name: "Producers", count: "540+", color: "bg-orange-500" }
  ];

  const features = [
    {
      step: "01",
      title: "Create Your Profile",
      description: "Showcase your work, experience, and creative vision with a stunning profile.",
      icon: Users
    },
    {
      step: "02", 
      title: "Connect & Collaborate",
      description: "Find like-minded professionals and join exciting film projects.",
      icon: Zap
    },
    {
      step: "03",
      title: "Share Your Story",
      description: "Upload your reels, behind-the-scenes content, and completed projects.",
      icon: Film
    }
  ];

  const testimonials = [
    {
      name: "Rajesh Kumar",
      role: "Film Director",
      content: "MovCon helped me connect with amazing cinematographers for my debut feature. The platform is a game-changer for indie filmmakers.",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face"
    },
    {
      name: "Priya Sharma", 
      role: "Art Director",
      content: "I've found incredible opportunities through MovCon. The quality of connections and projects here is unmatched.",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face"
    },
    {
      name: "Vikram Singh",
      role: "Music Composer", 
      content: "From short films to web series, MovCon has opened doors I never knew existed. Highly recommend to any creative professional.",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-orange-50 to-slate-100">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md border-b border-orange-100 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 bg-gradient-to-br from-orange-500 to-red-500 rounded-lg flex items-center justify-center">
                <Film className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold text-slate-800">MovCon</span>
            </div>
            <div className="flex items-center gap-4">
              <Button variant="ghost" onClick={() => navigate('/login')}>
                Sign In
              </Button>
              <Button onClick={handleGetStarted} className="bg-orange-500 hover:bg-orange-600">
                Get Started
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-24 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className={`text-center transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <div className="mb-6">
              <Badge className="mb-4 bg-orange-100 text-orange-800 hover:bg-orange-200">
                🎬 Connecting Film Minds to Creative Work
              </Badge>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold text-slate-800 mb-6 leading-tight">
              Where Film
              <span className="bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent"> Professionals</span>
              <br />
              Connect & Create
            </h1>
            
            <p className="text-xl text-slate-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              Join India's premier network for filmmakers, artists, and creative professionals. 
              Discover opportunities, showcase your work, and collaborate on the next big project.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <Button 
                size="lg" 
                onClick={handleGetStarted}
                className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
              >
                Join the Network
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                className="border-orange-200 text-orange-700 hover:bg-orange-50 px-8 py-4 text-lg font-semibold rounded-xl"
              >
                <Play className="mr-2 h-5 w-5" />
                Watch Demo
              </Button>
            </div>

            {/* Hero Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
              {[
                { number: "8.5k+", label: "Active Creators" },
                { number: "2.1k+", label: "Projects Completed" },
                { number: "150+", label: "Cities Connected" },
                { number: "95%", label: "Success Rate" }
              ].map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl font-bold text-slate-800">{stat.number}</div>
                  <div className="text-slate-600">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-800 mb-4">
              Find Your Creative Community
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Connect with professionals across every aspect of filmmaking
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {categories.map((category, index) => (
              <Card key={index} className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-orange-100">
                <CardContent className="p-6 text-center">
                  <div className={`h-12 w-12 ${category.color} rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-200`}>
                    <category.icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="font-semibold text-slate-800 mb-1">{category.name}</h3>
                  <p className="text-slate-600 text-sm">{category.count}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-gradient-to-br from-orange-50 to-red-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-800 mb-4">
              How MovCon Works
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Three simple steps to transform your creative career
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="relative overflow-hidden border-orange-100 bg-white/70 backdrop-blur-sm">
                <CardContent className="p-8">
                  <div className="text-6xl font-bold text-orange-100 absolute -top-4 -right-4">
                    {feature.step}
                  </div>
                  <div className="relative z-10">
                    <div className="h-12 w-12 bg-orange-500 rounded-xl flex items-center justify-center mb-6">
                      <feature.icon className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold text-slate-800 mb-3">
                      {feature.title}
                    </h3>
                    <p className="text-slate-600 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-800 mb-4">
              What Creators Are Saying
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Real stories from real professionals in the industry
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="border-orange-100 hover:shadow-lg transition-all duration-300">
                <CardContent className="p-8">
                  <div className="flex items-center mb-4">
                    <img 
                      src={testimonial.avatar} 
                      alt={testimonial.name}
                      className="h-12 w-12 rounded-full object-cover mr-4"
                    />
                    <div>
                      <h4 className="font-semibold text-slate-800">{testimonial.name}</h4>
                      <p className="text-slate-600 text-sm">{testimonial.role}</p>
                    </div>
                  </div>
                  <p className="text-slate-700 italic leading-relaxed">
                    "{testimonial.content}"
                  </p>
                  <div className="flex text-orange-400 mt-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-current" />
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-orange-500 to-red-500">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Start Your Journey?
          </h2>
          <p className="text-xl text-orange-100 mb-8 leading-relaxed">
            Join thousands of filmmakers, artists, and creative professionals who are already making their mark in the industry.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            <Button 
              size="lg" 
              onClick={handleGetStarted}
              className="bg-white text-orange-600 hover:bg-orange-50 px-8 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
            >
              Create Your Profile
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
          
          <div className="flex items-center justify-center gap-6 text-orange-100 text-sm">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4" />
              <span>Free to join</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4" />
              <span>No hidden fees</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4" />
              <span>Start connecting today</span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="h-8 w-8 bg-gradient-to-br from-orange-500 to-red-500 rounded-lg flex items-center justify-center">
                  <Film className="h-5 w-5 text-white" />
                </div>
                <span className="text-xl font-bold">MovCon</span>
              </div>
              <p className="text-slate-400 mb-4">
                Connecting film minds to creative work across India and beyond.
              </p>
              <div className="flex gap-4">
                <Globe className="h-5 w-5 text-slate-400 hover:text-orange-400 cursor-pointer" />
                <Users className="h-5 w-5 text-slate-400 hover:text-orange-400 cursor-pointer" />
                <Film className="h-5 w-5 text-slate-400 hover:text-orange-400 cursor-pointer" />
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Platform</h4>
              <ul className="space-y-2 text-slate-400">
                <li><a href="#" className="hover:text-orange-400">How it works</a></li>
                <li><a href="#" className="hover:text-orange-400">Pricing</a></li>
                <li><a href="#" className="hover:text-orange-400">Features</a></li>
                <li><a href="#" className="hover:text-orange-400">Success stories</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Community</h4>
              <ul className="space-y-2 text-slate-400">
                <li><a href="#" className="hover:text-orange-400">Directors</a></li>
                <li><a href="#" className="hover:text-orange-400">Actors</a></li>
                <li><a href="#" className="hover:text-orange-400">Editors</a></li>
                <li><a href="#" className="hover:text-orange-400">Composers</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-slate-400">
                <li><a href="#" className="hover:text-orange-400">Help center</a></li>
                <li><a href="#" className="hover:text-orange-400">Contact us</a></li>
                <li><a href="#" className="hover:text-orange-400">Privacy policy</a></li>
                <li><a href="#" className="hover:text-orange-400">Terms of service</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-slate-800 pt-8 text-center text-slate-400">
            <p>&copy; 2024 MovCon. All rights reserved. Made with ❤️ for the film community.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
