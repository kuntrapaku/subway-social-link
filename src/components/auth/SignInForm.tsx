
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '@/integrations/supabase/client'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useToast } from '@/hooks/use-toast'
import { CardContent, CardFooter } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Loader2 } from 'lucide-react'
import { toast } from 'sonner'

const SignInForm = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const { toast: uiToast } = useToast()
  const navigate = useNavigate()

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrorMessage(null)
    
    try {
      setLoading(true)
      console.log("Attempting sign in with email:", email)
      
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) {
        console.error("Sign in error:", error.message)
        throw error
      }
      
      console.log("Sign in successful, redirecting...")
      toast.success("Welcome back!")
      
      // We don't need to navigate here as the AuthContext will handle the redirect
    } catch (error: any) {
      console.error("Sign in error:", error.message)
      
      // Set a user-friendly error message
      if (error.message.includes('Invalid login credentials')) {
        setErrorMessage('Invalid email or password. Please try again or sign up if you don\'t have an account.')
      } else {
        setErrorMessage(error.message)
      }
      
      toast.error(error.message || "Sign in failed")
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSignIn}>
      <CardContent className="space-y-4 pt-4">
        {errorMessage && (
          <Alert variant="destructive" className="border-red-300">
            <AlertDescription>{errorMessage}</AlertDescription>
          </Alert>
        )}
        
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="bg-white"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="bg-white"
          />
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full bg-orange-500 hover:bg-orange-600" type="submit" disabled={loading}>
          {loading ? (
            <span className="flex items-center gap-2">
              <Loader2 className="h-4 w-4 animate-spin" />
              Signing in...
            </span>
          ) : (
            'Sign In'
          )}
        </Button>
      </CardFooter>
    </form>
  )
}

export default SignInForm
