
import { Layout } from '@/components/layout/Layout'
import Auth from '@/components/auth/Auth'

const Login = () => {
  return (
    <Layout>
      <div className="container max-w-5xl mx-auto py-10">
        <Auth />
      </div>
    </Layout>
  )
}

export default Login
