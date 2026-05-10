function LoginPage() {
  return (
    <div className="login-page">
      <div className="login-hero">
        <p className="eyebrow">Welcome back</p>
        <h1>Plan your next journey in minutes.</h1>
        <p className="lead">
          Sign in to organize multi-city itineraries, budget smarter, and share
          travel plans with your crew.
        </p>
        <div className="login-highlights">
          <div>
            <h3>Trips in sync</h3>
            <p>Keep stops, costs, and activities aligned across the group.</p>
          </div>
          <div>
            <h3>Budget clarity</h3>
            <p>Auto-calculated totals with alerts when you go over.</p>
          </div>
        </div>
      </div>

      <div className="login-card">
        <header>
          <h2>Login</h2>
          <p>Use your email to access your saved itineraries.</p>
        </header>
        <form className="login-form">
          <label>
            Email
            <input type="email" name="email" placeholder="you@email.com" />
          </label>
          <label>
            Password
            <input type="password" name="password" placeholder="••••••••" />
          </label>
          <div className="login-meta">
            <label className="checkbox">
              <input type="checkbox" name="remember" />
              Remember me
            </label>
            <button type="button" className="link-button">
              Forgot password?
            </button>
          </div>
          <button className="primary" type="submit">
            Login
          </button>
        </form>
        <div className="login-footer">
          <span>New to Traveloop?</span>
          <button type="button" className="link-button">
            Create an account
          </button>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
