
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

interface SignUpFormProps {
  getRedirectUrl: () => string
}

const SignUpForm = ({ getRedirectUrl }: SignUpFormProps) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [skipEmailConfirmation, setSkipEmailConfirmation] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const { toast } = useToast()
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
      
      // Removed the check for existing users since the profiles table doesn't exist
      
      if (skipEmailConfirmation) {
        // First try to sign up the user
        const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
          email,
          password,
        })
        
        if (signUpError) {
          if (signUpError.message.includes('already registered')) {
            throw new Error('This email is already registered. Please use a different email or try signing in.')
          }
          throw signUpError
        }
        
        // If signup successful, then sign in
        if (signUpData.user) {
          const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
            email,
            password,
          })
          
          if (signInError) throw signInError
          
          toast({
            title: "Account created",
            description: "You've been automatically signed in!",
          })
          
          navigate('/')
        } else {
          throw new Error('Failed to create account')
        }
      } else {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: getRedirectUrl(),
          },
        })

        if (error) {
          if (error.message.includes('already registered')) {
            throw new Error('This email is already registered. Please use a different email or try signing in.')
          }
          throw error
        }
        
        toast({
          title: "Check your email",
          description: "We've sent you a confirmation link!",
        })
      }
    } catch (error: any) {
      setErrorMessage(error.message)
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
