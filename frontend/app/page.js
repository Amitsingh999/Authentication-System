export default function Home() {
  return (
    <main className="container py-5">
      <div className="text-center">
        <h1>Authentication System</h1>
        <p className="text-muted">
          Welcome to the Authentication Module
        </p>

        <div className="mt-4">
          <a href="/signup" className="btn btn-primary me-3">
            Signup
          </a>

          <a href="/signin" className="btn btn-outline-primary">
            Sign In
          </a>
        </div>
      </div>
    </main>
  );
}