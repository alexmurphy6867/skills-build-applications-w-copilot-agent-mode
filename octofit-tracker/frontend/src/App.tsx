import { Link, Routes, Route } from 'react-router-dom';

function Home() {
  return (
    <div className="container py-5">
      <h1>OctoFit Tracker</h1>
      <p>Modern multi-tier tracker with React, Express, MongoDB, and TypeScript.</p>
      <Link className="btn btn-primary" to="/about">About</Link>
    </div>
  );
}

function About() {
  return (
    <div className="container py-5">
      <h1>About</h1>
      <p>This is the OctoFit Tracker frontend.</p>
    </div>
  );
}

export default function App() {
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container">
          <Link className="navbar-brand" to="/">OctoFit</Link>
          <div className="collapse navbar-collapse">
            <div className="navbar-nav">
              <Link className="nav-link" to="/">Home</Link>
              <Link className="nav-link" to="/about">About</Link>
            </div>
          </div>
        </div>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </div>
  );
}
