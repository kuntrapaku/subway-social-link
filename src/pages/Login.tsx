
import { Layout } from '@/components/layout/Layout'
import Auth from '@/components/auth/Auth'

const Login = () => {
  return (
    <Layout>
      <div className="container max-w-5xl mx-auto py-10">
        <div className="max-w-md mx-auto">
          <h1 className="text-2xl font-bold text-center mb-6 text-orange-600">Join MovConnect</h1>
          <p className="text-center mb-8 text-gray-600">Your gateway to the film industry network</p>
          <Auth />
        </div>
      </div>
    </Layout>
  )
}

export default Login
