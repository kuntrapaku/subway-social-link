
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '@/integrations/supabase/client'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useToast } from '@/hooks/use-toast'
import { CardContent, CardFooter } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Info, Loader2 } from 'lucide-react'
import { toast } from 'sonner'

interface SignUpFormProps {
  getRedirectUrl: () => string
}

const SignUpForm = ({ getRedirectUrl }: SignUpFormProps) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [skipEmailConfirmation, setSkipEmailConfirmation] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const { toast: uiToast } = useToast()
  const navigate = useNavigate()

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrorMessage(null)
    
    if (password.length < 6) {
      setErrorMessage('Password must be at least 6 characters long')
      return
    }
    
    try {
      setLoading(true)
      console.log("Attempting sign up with email:", email, "Skip confirmation:", skipEmailConfirmation)
      
      if (skipEmailConfirmation) {
        // First try to sign up the user
        const { error: signUpError, data } = await supabase.auth.signUp({
          email,
          password,
        })
        
        if (signUpError) {
          console.error("Sign up error:", signUpError.message)
          if (signUpError.message.includes('already registered')) {
            throw new Error('This email is already registered. Please use a different email or try signing in.')
          }
          throw signUpError
        }
        
        console.log("Sign up successful:", data)
        
        // If signup successful, then sign in immediately
        const { error: signInError } = await supabase.auth.signInWithPassword({
          email,
          password,
        })
        
        if (signInError) {
          console.error("Auto sign-in error:", signInError.message)
          throw signInError
        }
        
        console.log("Auto sign-in successful, will redirect shortly")
        toast.success("Account created! You've been signed in.")
        
        // We don't need to navigate here as the AuthContext will handle the redirect
      } else {
        // Standard flow with email confirmation
        console.log("Using email confirmation flow with redirect URL:", getRedirectUrl())
        const { error, data } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: getRedirectUrl(),
          },
        })

        console.log("Sign up with confirmation response:", data)

        if (error) {
          console.error("Sign up with email confirmation error:", error.message)
          if (error.message.includes('already registered')) {
            throw new Error('This email is already registered. Please use a different email or try signing in.')
          }
          throw error
        }
        
        toast.success("Check your email for a confirmation link")
        
        // No navigation needed here as the user needs to confirm their email
      }
    } catch (error: any) {
      console.error("Signup error:", error.message)
      setErrorMessage(error.message)
      toast.error(error.message || "Sign up failed")
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSignUp}>
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
            placeholder="Create a password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={6}
            className="bg-white"
          />
          <p className="text-xs text-gray-500">Must be at least 6 characters</p>
        </div>
        
        <div className="flex items-center space-x-2">
          <Checkbox 
            id="skip-confirmation" 
            checked={skipEmailConfirmation}
            onCheckedChange={(checked) => 
              setSkipEmailConfirmation(checked === true)
            }
          />
          <Label htmlFor="skip-confirmation" className="text-sm">
            Skip email confirmation (development only)
          </Label>
        </div>
        
        {skipEmailConfirmation && (
          <Alert variant="default" className="bg-yellow-50 border-yellow-200">
            <AlertDescription className="flex items-center gap-2 text-amber-700">
              <Info width={18} height={18} />
              Using direct sign-in for development. Disable this in production.
            </AlertDescription>
          </Alert>
        )}
      </CardContent>
      <CardFooter>
        <Button className="w-full bg-orange-500 hover:bg-orange-600" type="submit" disabled={loading}>
          {loading ? (
            <span className="flex items-center gap-2">
              <Loader2 className="h-4 w-4 animate-spin" />
              Creating account...
            </span>
          ) : (
            'Create Account'
          )}
        </Button>
      </CardFooter>
    </form>
  )
}

export default SignUpForm
