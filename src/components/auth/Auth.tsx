
import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useToast } from '@/hooks/use-toast'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { AlertCircle } from 'lucide-react'

const Auth = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()

  // Check if Supabase is properly configured
  if (!supabase) {
    return (
      <Card className="w-full max-w-md mx-auto">
        <CardHeader>
          <CardTitle className="text-red-500 flex items-center gap-2">
            <AlertCircle size={20} />
            Configuration Error
          </CardTitle>
          <CardDescription>
            Supabase configuration is missing. Please set the required environment variables:
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="bg-amber-50 p-4 rounded border border-amber-200 text-amber-800">
            <p className="font-medium mb-2">Required Environment Variables:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>VITE_SUPABASE_URL</li>
              <li>VITE_SUPABASE_ANON_KEY</li>
            </ul>
            <p className="mt-3 text-sm">
              These can be found in your Supabase project dashboard under Project Settings &gt; API.
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      setLoading(true)
      const { error } = await supabase.auth.signUp({
        email,
        password,
      })

      if (error) throw error
      
      toast({
        title: "Check your email",
        description: "We've sent you a confirmation link!",
      })
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
