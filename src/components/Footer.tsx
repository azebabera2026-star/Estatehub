export default function Footer() {
  return (
    <footer className="bg-navy-950 text-white/50 mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 grid sm:grid-cols-4 gap-8">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <span className="w-6 h-6 rounded-sm bg-emerald-500 flex items-center justify-center font-display font-semibold text-navy-950 text-sm">E</span>
            <span className="font-display text-white text-base">EstateHub</span>
          </div>
          <p className="text-sm max-w-xs">A precision-built property marketplace concept — every listing measured, verified, and drawn to scale.</p>
        </div>
        <div>
          <p className="eyebrow text-white/40 mb-3">Explore</p>
          <ul className="space-y-2 text-sm">
            <li>Houses for sale</li>
            <li>Apartments for rent</li>
            <li>Land & lots</li>
            <li>Featured listings</li>
          </ul>
        </div>
        <div>
          <p className="eyebrow text-white/40 mb-3">Company</p>
          <ul className="space-y-2 text-sm">
            <li>About EstateHub</li>
            <li>Our agents</li>
            <li>Careers</li>
            <li>Press</li>
          </ul>
        </div>
        <div>
          <p className="eyebrow text-white/40 mb-3">Demo notice</p>
          <p className="text-sm">This is a frontend-only prototype. All listings, users, and figures are illustrative mock data.</p>
        </div>
      </div>
      <div className="border-t border-white/10 py-5 text-center text-xs text-white/30">
        © 2026 EstateHub — a UI concept, not a real listing service.
      </div>
    </footer>
  );
}
