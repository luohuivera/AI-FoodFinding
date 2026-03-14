import { Search, Settings, ArrowLeft } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";

export function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const isPublishPage = location.pathname === "/publish";

  if (isPublishPage) {
    return (
      <header className="w-full max-w-[640px] flex items-center mb-6 mx-auto pt-6 px-4">
        <button
          onClick={() => navigate(-1)}
          aria-label="返回"
          className="p-2 -ml-2 rounded-full hover:bg-text-muted/10 transition-colors text-text-main"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        <div className="flex-1 text-center pr-8">
          <h1 className="font-heading font-bold text-2xl tracking-wide">
            发布美味
          </h1>
        </div>
      </header>
    );
  }

  return (
    <header className="sticky top-0 z-40 bg-background-light/90 backdrop-blur-md border-b border-text-muted/10 px-4 md:px-10 py-3 shadow-sm transition-colors duration-300">
      <div className="max-w-[1200px] mx-auto flex items-center justify-between gap-4">
        {/* Logo & Title */}
        <Link to="/" className="flex items-center gap-3 shrink-0">
          <div className="flex items-center justify-center w-8 h-8 rounded-xl bg-primary/10 text-primary">
            <svg
              fill="none"
              viewBox="0 0 48 48"
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5"
            >
              <path
                d="M24 4C25.7818 14.2173 33.7827 22.2182 44 24C33.7827 25.7818 25.7818 33.7827 24 44C22.2182 33.7827 14.2173 25.7818 4 24C14.2173 22.2182 22.2182 14.2173 24 4Z"
                fill="currentColor"
              ></path>
            </svg>
          </div>
          <h1 className="text-xl font-bold tracking-tight hidden sm:block font-heading">
            烟火气
          </h1>
        </Link>

        {/* Search Bar */}
        {location.pathname === "/" && (
          <div className="flex-1 max-w-xl mx-auto hidden md:block">
            <div className="relative flex items-center w-full h-10 rounded-full bg-white border border-text-muted/20 overflow-hidden focus-within:ring-2 focus-within:ring-primary/50 transition-shadow">
              <div className="pl-4 flex items-center justify-center text-text-muted">
                <Search className="w-5 h-5" />
              </div>
              <input
                type="text"
                placeholder="搜索校内食堂、周边好店..."
                className="w-full h-full px-3 bg-transparent border-none focus:ring-0 text-sm placeholder:text-text-muted outline-none"
              />
            </div>
          </div>
        )}

        {/* User Profile Action */}
        <div className="shrink-0 flex items-center gap-4">
          {location.pathname === "/profile" ? (
            <button className="flex items-center justify-center overflow-hidden rounded-full h-10 w-10 bg-surface shadow-warm text-text-main hover:bg-primary/10 transition-colors">
              <Settings className="w-5 h-5" />
            </button>
          ) : (
            <Link
              to="/profile"
              className="w-10 h-10 rounded-full bg-slate-200 overflow-hidden border-2 border-transparent hover:border-primary transition-colors cursor-pointer"
            >
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuA7uQQwwVka5_HVkXh_tOx7_v4G9JBlRf6kK1u0L5iBYt2qJymgB2zQrcSrVqy9714BHLltRDKRmM4pnJL8qiK98JeV12qh7JCX28BDqQasmz9klX5fvAudVGdTPcLOs68HrvCrQhDZJb607g6SjidbDUCmiEP01GJtJUeLyfybbzY1AaNjoLCsssWqLw3m4IX7gf2me2xhXiehkPzz9IUnThIOaoKCw1q4qtr2wRUh6heatIcTc9o4DQhJeL5GccD92J7u9Kxd_18"
                alt="User Avatar"
                className="w-full h-full object-cover"
              />
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
