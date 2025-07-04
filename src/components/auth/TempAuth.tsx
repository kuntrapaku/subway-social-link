
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Card, CardDescription, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Loader2 } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

const TempAuth = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const { toast } = useToast()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    
    console.log('Login attempt:', { username, password: '***' })
    
    if (!username.trim() || !password.trim()) {
      console.log('Validation failed: empty fields')
      toast({
        title: "Validation Error",
        description: "Please enter both username and password",
        variant: "destructive",
      })
      return
    }
    
    setLoading(true)
    console.log('Starting login process...')
    
    // Simulate a brief loading delay
    setTimeout(() => {
      try {
        // Store temporary user data in localStorage
        const tempUser = {
          id: `temp_${Date.now()}`,
          username: username.trim(),
          isTemporary: true
        }
        
        console.log('Storing temp user:', tempUser)
        localStorage.setItem('tempUser', JSON.stringify(tempUser))
        
        // Trigger a storage event to notify other components
        window.dispatchEvent(new StorageEvent('storage', {
          key: 'tempUser',
          newValue: JSON.stringify(tempUser)
        }))
        
        console.log('Login successful, navigating to home')
        toast({
          title: "Welcome!",
          description: `Successfully logged in as ${username}`,
        })
        setLoading(false)
        
        // Navigate to home page with replace to prevent back navigation to login
        navigate('/', { replace: true })
        
      } catch (error) {
        console.error('Login error:', error)
        toast({
          title: "Login Failed",
          description: "Login failed. Please try again.",
          variant: "destructive",
        })
        setLoading(false)
      }
    }, 500)
  }

  return (
    <div className="container max-w-5xl mx-auto py-10">
      <div className="max-w-md mx-auto">
        <Card className="w-full shadow-lg border-orange-100">
          <CardHeader>
            <CardTitle className="text-xl text-orange-600">Welcome to MovConnect</CardTitle>
            <CardDescription>Temporary login - Enter any username and password</CardDescription>
          </CardHeader>
          
          <form onSubmit={handleLogin}>
            <CardContent className="space-y-4">
              <Alert className="bg-yellow-50 border-yellow-200">
                <AlertDescription className="text-amber-700">
                  Temporary mode: Any username and password will work for testing
                </AlertDescription>
              </Alert>
              
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  type="text"
                  placeholder="Enter any username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  className="bg-white"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter any password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="bg-white"
                />
              </div>
            </CardContent>
            
            <CardFooter>
              <Button 
                className="w-full bg-orange-500 hover:bg-orange-600" 
                type="submit" 
                disabled={loading}
              >
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
        </Card>
      </div>
    </div>
  )
}

export default TempAuth
