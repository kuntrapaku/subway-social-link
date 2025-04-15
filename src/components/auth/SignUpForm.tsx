
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
import { Info } from 'lucide-react'

interface SignUpFormProps {
  getRedirectUrl: () => string
}

const SignUpForm = ({ getRedirectUrl }: SignUpFormProps) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [skipEmailConfirmation, setSkipEmailConfirmation] = useState(false)
  const { toast } = useToast()
  const navigate = useNavigate()

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      setLoading(true)
      
      if (skipEmailConfirmation) {
        const { error: signUpError } = await supabase.auth.signUp({
          email,
          password,
        })
        
        if (signUpError) throw signUpError
        
        const { error: signInError } = await supabase.auth.signInWithPassword({
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

  return (
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
              <Info width={18} height={18} />
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
  )
}

export default SignUpForm
