"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { CartLink } from "@/components/cart-link";

type HeaderItem = {
  label: string;
  href: string;
};

export function HeaderNav({ items }: { items: HeaderItem[] }) {
  const [isOpen, setIsOpen] = useState(false);

  const closeMenu = () => setIsOpen(false);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <>
      <nav className="headerNavDesktop">
        {items.map((item) => (
          <Link key={`${item.label}-${item.href}`} href={item.href}>
            {item.label}
          </Link>
        ))}
        <CartLink />
      </nav>

      <button
        type="button"
        className="menuToggle"
        aria-label="Открыть меню"
        aria-expanded={isOpen}
        onClick={() => setIsOpen(true)}
      >
        <span />
        <span />
        <span />
      </button>

      {isOpen ? (
        <div className="mobileMenuLayer">
          <button
            type="button"
            className="mobileMenuBackdrop"
            aria-label="Закрыть меню"
            onClick={closeMenu}
          />
          <aside className="mobileMenuPanel">
            <div className="mobileMenuTop">
              <p>Навигация</p>
              <button
                type="button"
                className="mobileMenuClose"
                aria-label="Закрыть меню"
                onClick={closeMenu}
              >
                ×
              </button>
            </div>
            <nav className="mobileMenuLinks">
              {items.map((item) => (
                <Link key={`${item.label}-${item.href}`} href={item.href} onClick={closeMenu}>
                  {item.label}
                </Link>
              ))}
              <div onClick={closeMenu}>
                <CartLink />
              </div>
            </nav>
          </aside>
        </div>
      ) : null}
    </>
  );
}
