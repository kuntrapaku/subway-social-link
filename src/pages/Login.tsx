
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Eye, EyeOff, Film, Users, Camera, Star } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const [loginForm, setLoginForm] = useState({
    email: '',
    password: ''
  });

  const [registerForm, setRegisterForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: '',
    location: '',
    agreeToTerms: false
  });

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Store temp user for demo
      const tempUser = {
        id: 'temp-user-1',
        username: 'Demo User',
        isTemporary: true
      };
      localStorage.setItem('tempUser', JSON.stringify(tempUser));
      
      toast({
        title: "Welcome to MovCon!",
        description: "You have successfully signed in.",
      });
      
      // Trigger storage event for auth context
      window.dispatchEvent(new StorageEvent('storage', {
        key: 'tempUser',
        newValue: JSON.stringify(tempUser)
      }));
      
      navigate('/feed');
    } catch (error) {
      toast({
        title: "Sign in failed",
        description: "Please check your credentials and try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (registerForm.password !== registerForm.confirmPassword) {
      toast({
        title: "Password mismatch",
        description: "Please ensure both passwords match.",
        variant: "destructive",
      });
      return;
    }

    if (!registerForm.agreeToTerms) {
      toast({
        title: "Terms required",
        description: "Please agree to the terms and conditions.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Store temp user for demo
      const tempUser = {
        id: 'temp-user-1',
        username: registerForm.name,
        isTemporary: true
      };
      localStorage.setItem('tempUser', JSON.stringify(tempUser));
      
      toast({
        title: "Welcome to MovCon!",
        description: "Your account has been created successfully.",
      });
      
      // Trigger storage event for auth context
      window.dispatchEvent(new StorageEvent('storage', {
        key: 'tempUser',
        newValue: JSON.stringify(tempUser)
      }));
      
      navigate('/feed');
    } catch (error) {
      toast({
        title: "Registration failed",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-block">
            <span className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
              MovCon
            </span>
          </Link>
          <p className="text-gray-600 mt-2">Connect with the film industry</p>
        </div>

        <Card className="shadow-xl border-orange-100">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold">Join MovCon</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="login" className="w-full">
              <TabsList className="grid w-full grid-cols-2 bg-orange-50">
                <TabsTrigger 
                  value="login" 
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-600 data-[state=active]:to-red-600 data-[state=active]:text-white"
                >
                  Sign In
                </TabsTrigger>
                <TabsTrigger 
                  value="register"
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-600 data-[state=active]:to-red-600 data-[state=active]:text-white"
                >
                  Sign Up
                </TabsTrigger>
              </TabsList>

              <TabsContent value="login" className="mt-6">
                <form onSubmit={handleLogin} className="space-y-4">
                  <div>
                    <Label htmlFor="login-email">Email</Label>
                    <Input
                      id="login-email"
                      type="email"
                      placeholder="your@email.com"
                      value={loginForm.email}
                      onChange={(e) => setLoginForm({...loginForm, email: e.target.value})}
                      className="border-orange-200 focus:border-orange-500"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="login-password">Password</Label>
                    <div className="relative">
                      <Input
                        id="login-password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
                        value={loginForm.password}
                        onChange={(e) => setLoginForm({...loginForm, password: e.target.value})}
                        className="border-orange-200 focus:border-orange-500 pr-10"
                        required
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="remember" />
                      <Label htmlFor="remember" className="text-sm">Remember me</Label>
                    </div>
                    <Button variant="link" className="text-sm text-orange-600 hover:text-orange-700">
                      Forgot password?
                    </Button>
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700"
                    disabled={isLoading}
                  >
                    {isLoading ? "Signing in..." : "Sign In"}
                  </Button>
                </form>
              </TabsContent>

              <TabsContent value="register" className="mt-6">
                <form onSubmit={handleRegister} className="space-y-4">
                  <div>
                    <Label htmlFor="register-name">Full Name</Label>
                    <Input
                      id="register-name"
                      type="text"
                      placeholder="Your full name"
                      value={registerForm.name}
                      onChange={(e) => setRegisterForm({...registerForm, name: e.target.value})}
                      className="border-orange-200 focus:border-orange-500"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="register-email">Email</Label>
                    <Input
                      id="register-email"
                      type="email"
                      placeholder="your@email.com"
                      value={registerForm.email}
                      onChange={(e) => setRegisterForm({...registerForm, email: e.target.value})}
                      className="border-orange-200 focus:border-orange-500"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="register-role">Professional Role</Label>
                    <Select value={registerForm.role} onValueChange={(value) => setRegisterForm({...registerForm, role: value})}>
                      <SelectTrigger className="border-orange-200">
                        <SelectValue placeholder="Select your role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="director">Director</SelectItem>
                        <SelectItem value="actor">Actor</SelectItem>
                        <SelectItem value="producer">Producer</SelectItem>
                        <SelectItem value="cinematographer">Cinematographer</SelectItem>
                        <SelectItem value="editor">Editor</SelectItem>
                        <SelectItem value="writer">Writer</SelectItem>
                        <SelectItem value="composer">Music Composer</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="register-location">Location</Label>
                    <Input
                      id="register-location"
                      type="text"
                      placeholder="City, Country"
                      value={registerForm.location}
                      onChange={(e) => setRegisterForm({...registerForm, location: e.target.value})}
                      className="border-orange-200 focus:border-orange-500"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="register-password">Password</Label>
                    <Input
                      id="register-password"
                      type="password"
                      placeholder="Create a password"
                      value={registerForm.password}
                      onChange={(e) => setRegisterForm({...registerForm, password: e.target.value})}
                      className="border-orange-200 focus:border-orange-500"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="register-confirm">Confirm Password</Label>
                    <Input
                      id="register-confirm"
                      type="password"
                      placeholder="Confirm your password"
                      value={registerForm.confirmPassword}
                      onChange={(e) => setRegisterForm({...registerForm, confirmPassword: e.target.value})}
                      className="border-orange-200 focus:border-orange-500"
                      required
                    />
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="terms" 
                      checked={registerForm.agreeToTerms}
                      onCheckedChange={(checked) => setRegisterForm({...registerForm, agreeToTerms: checked as boolean})}
                    />
                    <Label htmlFor="terms" className="text-sm">
                      I agree to the{' '}
                      <Button variant="link" className="text-orange-600 hover:text-orange-700 p-0 h-auto">
                        Terms of Service
                      </Button>
                      {' '}and{' '}
                      <Button variant="link" className="text-orange-600 hover:text-orange-700 p-0 h-auto">
                        Privacy Policy
                      </Button>
                    </Label>
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700"
                    disabled={isLoading}
                  >
                    {isLoading ? "Creating Account..." : "Create Account"}
                  </Button>
                </form>
              </TabsContent>
            </Tabs>

            {/* Role Categories */}
            <div className="mt-6 pt-6 border-t border-gray-200">
              <p className="text-sm text-gray-600 text-center mb-4">Join thousands of film professionals:</p>
              <div className="grid grid-cols-4 gap-2">
                {[
                  { name: 'Directors', icon: Camera, color: 'from-orange-500 to-red-500' },
                  { name: 'Actors', icon: Star, color: 'from-red-500 to-pink-500' },
                  { name: 'Producers', icon: Film, color: 'from-orange-600 to-yellow-500' },
                  { name: 'Crew', icon: Users, color: 'from-red-600 to-orange-600' }
                ].map((category) => (
                  <div key={category.name} className="text-center">
                    <div className={`h-8 w-8 rounded-full bg-gradient-to-r ${category.color} flex items-center justify-center mx-auto mb-1`}>
                      <category.icon className="h-4 w-4 text-white" />
                    </div>
                    <p className="text-xs text-gray-600">{category.name}</p>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="text-center mt-6">
          <Button asChild variant="link" className="text-gray-600 hover:text-gray-800">
            <Link to="/">← Back to Home</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Login;
