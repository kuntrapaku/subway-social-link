
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '@/integrations/supabase/client'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useToast } from '@/hooks/use-toast'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useAuth } from '@/context/AuthContext'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { InfoCircle } from 'lucide-react'

const Auth = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [skipEmailConfirmation, setSkipEmailConfirmation] = useState(false)
  const { toast } = useToast()
  const navigate = useNavigate()
  const { user } = useAuth()
  
  // If already logged in, redirect to home page
  if (user) {
    navigate('/')
    return null
  }

  // Get the current URL for redirect
  const getRedirectUrl = () => {
    // Use the current origin (protocol + domain + port)
    return `${window.location.origin}/auth/callback`;
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      setLoading(true)
      
      if (skipEmailConfirmation) {
        // For development, use signInWithPassword after signUp to auto-verify
        const { error: signUpError } = await supabase.auth.signUp({
          email,
          password,
        })
        
        if (signUpError) throw signUpError
        
        // Auto sign in after sign up (for development only)
        const { error: signInError } = await supabase.auth.signInWithPassword({
          email,
          password,
        })
        
        if (signInError) throw signInError
        
        toast({
          title: "Account created",
          description: "You've been automatically signed in!",
        })
        
        // Redirect to home page
        navigate('/')
      } else {
        // Normal sign up flow with email confirmation
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: getRedirectUrl(),
          },
        })

        if (error) throw error
        
        toast({
          title: "Check your email",
          description: "We've sent you a confirmation link!",
        })
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive"
      })
    } finally {
      setLoading(false)
    }
  }

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      setLoading(true)
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) throw error
      
      toast({
        title: "Welcome back!",
        description: "You've successfully signed in.",
      })
      
      // Redirect to home page on successful sign in
      navigate('/')
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive"
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Welcome to Movcon</CardTitle>
        <CardDescription>Connect with film industry professionals</CardDescription>
      </CardHeader>
      <Tabs defaultValue="signin">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="signin">Sign In</TabsTrigger>
          <TabsTrigger value="signup">Sign Up</TabsTrigger>
        </TabsList>
        <TabsContent value="signin">
          <form onSubmit={handleSignIn}>
            <CardContent className="space-y-4 pt-4">
              <div className="space-y-2">
                <Input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full" type="submit" disabled={loading}>
                {loading ? 'Signing in...' : 'Sign In'}
              </Button>
            </CardFooter>
          </form>
        </TabsContent>
        <TabsContent value="signup">
          <form onSubmit={handleSignUp}>
            <CardContent className="space-y-4 pt-4">
              <div className="space-y-2">
                <Input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={6}
                />
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="skip-confirmation" 
                  checked={skipEmailConfirmation}
                  onCheckedChange={(checked) => 
                    setSkipEmailConfirmation(checked === true)
                  }
                />
                <Label htmlFor="skip-confirmation">
                  Skip email confirmation (development only)
                </Label>
              </div>
              
              {skipEmailConfirmation && (
                <Alert variant="default" className="bg-yellow-50 border-yellow-200">
                  <AlertDescription className="flex items-center gap-2 text-amber-700">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-info">
                      <circle cx="12" cy="12" r="10" />
                      <path d="M12 16v-4" />
                      <path d="M12 8h.01" />
                    </svg>
                    Using direct sign-in for development. Disable this in production.
                  </AlertDescription>
                </Alert>
              )}
            </CardContent>
            <CardFooter>
              <Button className="w-full" type="submit" disabled={loading}>
                {loading ? 'Signing up...' : 'Sign Up'}
              </Button>
            </CardFooter>
          </form>
        </TabsContent>
      </Tabs>
    </Card>
  )
}

export default Auth
