import { Link, useLocation } from "react-router-dom";
import { Home, PlusSquare, MessageSquare, User } from "lucide-react";
import { cn } from "@/lib/utils";

export function BottomNav() {
  const location = useLocation();
  const pathname = location.pathname;

  const navItems = [
    { name: "主页", path: "/", icon: Home },
    { name: "发帖", path: "/publish", icon: PlusSquare },
    { name: "消息", path: "/messages", icon: MessageSquare },
    { name: "个人", path: "/profile", icon: User },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-surface border-t border-slate-100 pb-[env(safe-area-inset-bottom)] shadow-[0_-4px_24px_rgba(0,0,0,0.02)]">
      <div className="flex items-center justify-around h-[60px] max-w-[1200px] mx-auto px-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "flex flex-col items-center justify-center w-full h-full gap-1 transition-colors",
                isActive ? "text-primary" : "text-text-muted hover:text-text-main"
              )}
            >
              <Icon className={cn("w-6 h-6", isActive && "fill-primary/20")} strokeWidth={isActive ? 2.5 : 2} />
              <span className="text-[10px] font-medium">{item.name}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
