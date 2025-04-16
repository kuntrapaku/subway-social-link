
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useAuth } from '@/context/AuthContext'
import SignInForm from './SignInForm'
import SignUpForm from './SignUpForm'
import { getRedirectUrl } from './utils/authUtils'

const Auth = () => {
  const navigate = useNavigate()
  const { user, isLoading } = useAuth()
  
  useEffect(() => {
    if (user && !isLoading) {
      console.log("User is authenticated, redirecting to home");
      navigate('/', { replace: true });
    }
  }, [user, isLoading, navigate])

  // Show nothing while checking authentication status
  if (isLoading) return null

  // If user is already authenticated, we'll be redirected by the effect above
  if (user) return null

  return (
    <Card className="w-full max-w-md mx-auto shadow-lg border-orange-100">
      <CardHeader>
        <CardTitle className="text-xl text-orange-600">Welcome to MovConnect</CardTitle>
        <CardDescription>Connect with film industry professionals and grow your network</CardDescription>
      </CardHeader>
      <Tabs defaultValue="signin">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="signin">Sign In</TabsTrigger>
          <TabsTrigger value="signup">Sign Up</TabsTrigger>
        </TabsList>
        <TabsContent value="signin">
          <SignInForm />
        </TabsContent>
        <TabsContent value="signup">
          <SignUpForm getRedirectUrl={getRedirectUrl} />
        </TabsContent>
      </Tabs>
    </Card>
  )
}

export default Auth
