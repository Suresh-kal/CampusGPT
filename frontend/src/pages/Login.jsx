import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { login } from '../api/auth'

function Login() {
  const navigate = useNavigate()

  const [showPassword, setShowPassword] = useState(false)
  const [identifier, setIdentifier] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()

    setError('')
    setLoading(true)

    try {
      const data = await login(identifier, password)

      console.log('Login response:', data)

      if (!data.success) {
        setError(data.message || 'Unable to sign in. Please try again.')
        return
      }

      // Save authentication data
      localStorage.setItem('token', data.token)
      localStorage.setItem('user', JSON.stringify(data.user))

      // Check if user must change password
      if (data.mustChangePassword) {
        navigate('/change-password')
        return
      }

      // Role-based routing
      switch (data.user.role) {
        case 'student':
          navigate('/student')
          break

        case 'teacher':
          navigate('/teacher')
          break

        case 'admin':
          navigate('/admin')
          break

        default:
          setError('Your account role is not recognized.')
      }
    } catch (err) {
      console.error(err)
      setError('Unable to connect to CampusGPT. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-slate-100 lg:grid lg:grid-cols-2">
      {/* Branding Section */}
      <section className="hidden bg-slate-900 p-12 lg:flex lg:flex-col lg:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-white">
            CampusGPT
          </h1>
        </div>

        <div className="max-w-md">
          <p className="mb-6 text-sm font-medium uppercase tracking-[0.2em] text-slate-400">
            Academic Intelligence
          </p>

          <h2 className="text-5xl font-semibold leading-tight text-white">
            Built for your campus.
          </h2>

          <p className="mt-6 text-lg leading-relaxed text-slate-400">
            A unified academic workspace for students, teachers, and
            administrators.
          </p>
        </div>

        <p className="text-sm text-slate-500">
          CampusGPT Academic Platform
        </p>
      </section>

      {/* Login Section */}
      <section className="flex min-h-screen items-center justify-center px-6 py-12">
        <div className="w-full max-w-md">
          <div className="mb-12 lg:hidden">
            <h1 className="text-2xl font-semibold text-slate-900">
              CampusGPT
            </h1>
          </div>

          <div className="mb-8">
            <h2 className="text-3xl font-semibold tracking-tight text-slate-900">
              Welcome back
            </h2>

            <p className="mt-2 text-slate-500">
              Sign in to continue to your academic workspace.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label
                htmlFor="identifier"
                className="mb-2 block text-sm font-medium text-slate-700"
              >
                Email or University ID
              </label>

              <input
                id="identifier"
                type="text"
                placeholder="Enter your email or ID"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                required
                className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-slate-900 focus:ring-1 focus:ring-slate-900"
              />
            </div>

            <div>
              <div className="mb-2 flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="text-sm font-medium text-slate-700"
                >
                  Password
                </label>

                <button
                  type="button"
                  className="text-sm font-medium text-slate-700 transition hover:text-slate-900"
                >
                  Forgot password?
                </button>
              </div>

              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 pr-16 text-slate-900 outline-none transition focus:border-slate-900 focus:ring-1 focus:ring-slate-900"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-medium text-slate-500 hover:text-slate-900"
                >
                  {showPassword ? 'Hide' : 'Show'}
                </button>
              </div>
            </div>

            {error && (
              <p className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-lg bg-slate-900 px-4 py-3 font-medium text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? 'Signing in...' : 'Sign in'}
            </button>
          </form>
        </div>
      </section>
    </main>
  )
}

export default Login