import { useState } from "react";
import Link from "next/link";
import { ReactNode } from "react";

interface NavItem {
  name: string;
  link: string;
  icon?: ReactNode;
}

interface FloatingNavProps {
  navItems: NavItem[];
  className?: string;
  authButton?: ReactNode;
}

const FloatingNav = ({ navItems, className, authButton }: FloatingNavProps) => {
  return (
    <div className="fixed top-4 inset-x-0 mx-auto z-50 flex justify-center items-center gap-4">
      <nav className={`flex items-center space-x-6 bg-lavender-200 text-lavender-900 px-6 py-2 rounded-full shadow-sm border border-lavender-300 ${className}`}>
        {navItems.map((item) => (
          <Link
            key={item.name}
            href={item.link}
            className="text-lavender-900 hover:text-lavender-700 transition-colors"
          >
            {item.icon} {item.name}
          </Link>
        ))}
      </nav>
      {authButton && <div>{authButton}</div>}
    </div>
  );
};

export default FloatingNav;
