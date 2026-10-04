import { useEffect, useState } from 'react'

function App() {
  const [mode, setMode] = useState(() => window.location.hash === '#signup' ? 'signup' : 'login')
  const [notice, setNotice] = useState('')
  const isSignup = mode === 'signup'

  useEffect(() => {
    function syncMode() {
      setMode(window.location.hash === '#signup' ? 'signup' : 'login')
      setNotice('')
    }

    window.addEventListener('hashchange', syncMode)
    return () => window.removeEventListener('hashchange', syncMode)
  }, [])

  function handleSubmit(event) {
    event.preventDefault()
    setNotice('This demo form is ready to connect to your authentication service.')
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-stone-100 px-4 py-10 font-sans text-slate-900">
      <section className="w-full max-w-sm rounded-xl border border-slate-200 bg-white p-7 shadow-lg shadow-slate-200/60 sm:p-9">
        <h1 className="text-2xl font-semibold tracking-tight">
          {isSignup ? 'Create an account' : 'Welcome back'}
        </h1>
        <p className="mt-2 text-sm text-slate-600">
          {isSignup ? 'Sign up to get started.' : 'Log in to your account.'}
        </p>

        <form className="mt-7 space-y-5" onSubmit={handleSubmit}>
          {isSignup && (
            <label className="block space-y-2 text-sm font-medium">
              <span>Name</span>
              <input
                autoComplete="name"
                className="w-full rounded-md border border-slate-300 px-3 py-2.5 font-normal outline-none transition focus:border-emerald-700 focus:ring-2 focus:ring-emerald-700/20"
                name="name"
                placeholder="Your name"
                required
              />
            </label>
          )}

          <label className="block space-y-2 text-sm font-medium">
            <span>Email</span>
            <input
              autoComplete="email"
              className="w-full rounded-md border border-slate-300 px-3 py-2.5 font-normal outline-none transition focus:border-emerald-700 focus:ring-2 focus:ring-emerald-700/20"
              name="email"
              placeholder="you@example.com"
              required
              type="email"
            />
          </label>

          <label className="block space-y-2 text-sm font-medium">
            <span>Password</span>
            <input
              autoComplete={isSignup ? 'new-password' : 'current-password'}
              className="w-full rounded-md border border-slate-300 px-3 py-2.5 font-normal outline-none transition focus:border-emerald-700 focus:ring-2 focus:ring-emerald-700/20"
              minLength={8}
              name="password"
              placeholder="At least 8 characters"
              required
              type="password"
            />
          </label>

          <button
            className="w-full rounded-md bg-emerald-800 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-800"
            type="submit"
          >
            {isSignup ? 'Sign up' : 'Log in'}
          </button>
          {notice && <p className="text-sm text-emerald-800" role="status">{notice}</p>}
        </form>

        <p className="mt-6 text-center text-sm text-slate-600">
          {isSignup ? 'Already have an account? ' : "Don't have an account? "}
          <a
            className="font-semibold text-emerald-800 underline-offset-4 hover:underline"
            href={isSignup ? '#login' : '#signup'}
          >
            {isSignup ? 'Log in' : 'Sign up'}
          </a>
        </p>
      </section>
    </main>
  )
}

export default App
