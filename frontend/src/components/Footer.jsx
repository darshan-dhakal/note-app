import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="mt-10 border-t border-slate-200/80 bg-white/90 dark:border-slate-800 dark:bg-slate-950/80">
      <div className="section-shell flex flex-col items-start justify-between gap-3 py-5 text-sm text-slate-600 dark:text-slate-400 md:flex-row md:items-center">
        <p>© 2026 Notify. Crafted for focused note-taking.</p>
        <div className="flex items-center gap-4">
          <Link to="/about" className="hover:text-slate-900 dark:hover:text-white">
            About
          </Link>
          <Link to="/services" className="hover:text-slate-900 dark:hover:text-white">
            Services
          </Link>
          <Link to="/contact" className="hover:text-slate-900 dark:hover:text-white">
            Contact
          </Link>
        </div>
      </div>
    </footer>
  );
}
