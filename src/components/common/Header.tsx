"use client";

import React, { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Locale } from "@/types";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { t } from "@/lib/translations";
import {
  BSES_OFFICIAL_PHONE_DISPLAY,
  getBsesWhatsAppUrl,
} from "@/lib/constants";
import {
  ShoppingBag,
  Heart,
  Menu,
  X,
  Search,
  ChevronDown,
  LayoutDashboard,
  MessageCircle,
} from "lucide-react";

interface HeaderProps {
  locale: Locale;
}

export function Header({ locale }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCategoryMenuOpen, setIsCategoryMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [mounted, setMounted] = useState(false);

  const hamburgerButtonRef = useRef<HTMLButtonElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  const pathname = usePathname();
  const { openDrawer, itemCount } = useCart();
  const { count: wishlistCount } = useWishlist();

  useEffect(() => {
    setMounted(true);
  }, []);

  // Scroll detection for sticky transparent-to-solid transition
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsCategoryMenuOpen(false);
    setIsSearchOpen(false);
  }, [pathname]);

  // Lock body scroll and manage focus when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
      const timer = setTimeout(() => {
        closeButtonRef.current?.focus();
      }, 50);
      return () => clearTimeout(timer);
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  // Close menus on Escape key and return focus to hamburger trigger
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (isMobileMenuOpen) {
          setIsMobileMenuOpen(false);
          hamburgerButtonRef.current?.focus();
        }
        setIsCategoryMenuOpen(false);
        setIsSearchOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isMobileMenuOpen]);

  const categories = [
    { slug: "women", label: t(locale, "nav.women") },
    { slug: "men", label: t(locale, "nav.men") },
    { slug: "shoes", label: t(locale, "nav.shoes") },
    { slug: "bags", label: t(locale, "nav.bags") },
    { slug: "accessories", label: t(locale, "nav.accessories") },
  ];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/${locale}/shop?search=${encodeURIComponent(searchQuery.trim())}`;
    }
  };

  return (
    <header
      className={`sticky top-0 z-30 transition-all duration-300 ${
        isScrolled
          ? "bg-white/95 backdrop-blur-md shadow-luxury-sm border-b border-ivory-dark py-3.5"
          : "bg-white/80 backdrop-blur-sm border-b border-ivory/60 py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Mobile menu trigger */}
          <div className="flex items-center lg:hidden">
            <button
              ref={hamburgerButtonRef}
              onClick={() => setIsMobileMenuOpen(true)}
              className="p-2 -ml-2 text-ink hover:text-camel transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center rtl:-ml-0 rtl:-mr-2"
              aria-label="Ouvrir le menu de navigation"
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-nav-dialog"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-7 text-xs font-sans font-medium tracking-widest uppercase">
            <Link
              href={`/${locale}/shop`}
              className="text-ink hover:text-camel transition-colors py-1 relative group"
            >
              {t(locale, "nav.shop")}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-camel transition-all duration-300 group-hover:w-full"></span>
            </Link>

            {/* Category Mega Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setIsCategoryMenuOpen(true)}
              onMouseLeave={() => setIsCategoryMenuOpen(false)}
            >
              <button
                className="flex items-center gap-1 text-ink hover:text-camel transition-colors py-1 uppercase"
                aria-expanded={isCategoryMenuOpen}
              >
                <span>{t(locale, "home.categoriesTitle")}</span>
                <ChevronDown className="w-3 h-3 text-muted" />
              </button>

              {isCategoryMenuOpen && (
                <div className="absolute top-full left-0 w-52 bg-white border border-ivory-dark shadow-luxury-lg py-2 animate-slide-down">
                  {categories.map((cat) => (
                    <Link
                      key={cat.slug}
                      href={`/${locale}/shop?category=${cat.slug}`}
                      className="block px-4 py-2 text-xs text-ink hover:bg-ivory hover:text-camel-dark transition-colors tracking-wider"
                    >
                      {cat.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link
              href={`/${locale}/lookbook`}
              className="text-ink hover:text-camel transition-colors py-1 relative group"
            >
              {t(locale, "nav.lookbook")}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-camel transition-all duration-300 group-hover:w-full"></span>
            </Link>

            <Link
              href={`/${locale}/about`}
              className="text-ink hover:text-camel transition-colors py-1 relative group"
            >
              {t(locale, "nav.about")}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-camel transition-all duration-300 group-hover:w-full"></span>
            </Link>

            <Link
              href={`/${locale}/admin-demo`}
              className="flex items-center gap-1.5 px-2.5 py-1 text-camel font-semibold tracking-wider hover:bg-ivory transition-colors border border-camel/30"
            >
              <LayoutDashboard className="w-3.5 h-3.5" />
              <span>{t(locale, "nav.adminDemo")}</span>
            </Link>
          </nav>

          {/* Central Luxury Logo */}
          <div className="text-center">
            <Link
              href={`/${locale}`}
              className="font-serif text-2xl sm:text-3xl tracking-[0.25em] text-ink font-bold hover:text-camel transition-colors uppercase inline-block"
            >
              VELORA
            </Link>
            <p className="text-[9px] tracking-[0.3em] uppercase text-muted font-sans font-light hidden sm:block">
              Haute Confection
            </p>
          </div>

          {/* Right Action Icons: Search, Wishlist, Cart */}
          <div className="flex items-center gap-3 sm:gap-5">
            {/* Search Icon / Toggle */}
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="p-1.5 text-ink hover:text-camel transition-colors"
              aria-label="Rechercher"
            >
              <Search className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>

            {/* Wishlist Link */}
            <Link
              href={`/${locale}/wishlist`}
              className="p-1.5 text-ink hover:text-camel transition-colors relative"
              aria-label="Favoris"
            >
              <Heart className="w-4 h-4 sm:w-5 sm:h-5" />
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-camel text-white text-[10px] rounded-full flex items-center justify-center font-mono">
                  {wishlistCount}
                </span>
              )}
            </Link>

            {/* Cart Trigger Button */}
            <button
              onClick={openDrawer}
              className="p-1.5 text-ink hover:text-camel transition-colors relative flex items-center gap-1.5 group"
              aria-label="Panier d'achat"
            >
              <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5" />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-ink text-ivory text-[10px] rounded-full flex items-center justify-center font-mono group-hover:bg-camel transition-colors">
                  {itemCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Expandable Search Input Bar */}
        {isSearchOpen && (
          <div className="mt-3 pt-3 border-t border-ivory-dark animate-slide-down">
            <form onSubmit={handleSearchSubmit} className="relative flex items-center">
              <Search className="absolute left-3 w-4 h-4 text-muted rtl:left-auto rtl:right-3" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t(locale, "common.search")}
                className="w-full pl-10 pr-20 py-2.5 bg-ivory text-sm text-ink placeholder:text-muted focus:outline-none focus:ring-1 focus:ring-camel border border-ivory-dark font-sans rtl:pl-20 rtl:pr-10"
                autoFocus
              />
              <button
                type="submit"
                className="absolute right-2.5 px-3 py-1 bg-ink text-white text-xs font-sans uppercase tracking-wider hover:bg-camel transition-colors rtl:right-auto rtl:left-2.5"
              >
                {t(locale, "common.filter")}
              </button>
            </form>
          </div>
        )}
      </div>

      {/* Mobile Navigation Drawer rendered via Portal to escape header backdrop-filter containing block */}
      {mounted &&
        isMobileMenuOpen &&
        typeof document !== "undefined" &&
        createPortal(
          <div
            id="mobile-nav-dialog"
            dir={locale === "ar" ? "rtl" : "ltr"}
            role="dialog"
            aria-modal="true"
            aria-label={t(locale, "nav.shop")}
            className="fixed inset-0 z-[100] lg:hidden"
          >
            {/* Full Viewport Backdrop */}
            <div
              className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300 animate-fade-in"
              onClick={() => setIsMobileMenuOpen(false)}
              aria-hidden="true"
            />

            {/* Mobile Drawer Panel with true 100dvh viewport height and width min(85vw, 360px) */}
            <aside
              data-testid="mobile-drawer"
              className={`fixed inset-y-0 w-[min(85vw,360px)] h-full h-[100dvh] max-h-[100dvh] bg-white shadow-luxury-drawer flex flex-col justify-between overflow-hidden z-[101] font-sans ${
                locale === "ar" ? "right-0" : "left-0"
              }`}
            >
              {/* 1. Header (Sticky Top, Logo + Close Button) */}
              <div className="flex-shrink-0 flex items-center justify-between px-6 py-5 border-b border-ivory-dark bg-white">
                <Link
                  href={`/${locale}`}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="font-serif text-xl tracking-[0.2em] font-bold text-ink uppercase"
                >
                  VELORA
                </Link>
                <button
                  ref={closeButtonRef}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 -mr-2 text-muted hover:text-ink hover:bg-ivory transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center rtl:-mr-0 rtl:-ml-2"
                  aria-label="Fermer le menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* 2. Scrollable Navigation Links (Independent Scroll, Over-scroll Contain) */}
              <div className="flex-1 overflow-y-auto overscroll-contain px-6 py-6 space-y-4 text-sm font-sans tracking-widest uppercase">
                <Link
                  href={`/${locale}/shop`}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block py-2 text-ink hover:text-camel font-medium border-b border-ivory/50 transition-colors"
                >
                  {t(locale, "nav.shop")}
                </Link>

                <div className="pl-3 rtl:pl-0 rtl:pr-3 flex flex-col gap-2.5 text-xs text-muted-dark lowercase first-letter:uppercase">
                  {categories.map((c) => (
                    <Link
                      key={c.slug}
                      href={`/${locale}/shop?category=${c.slug}`}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="py-1 hover:text-camel transition-colors min-h-[36px] flex items-center"
                    >
                      {c.label}
                    </Link>
                  ))}
                </div>

                <Link
                  href={`/${locale}/lookbook`}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block py-2 text-ink hover:text-camel font-medium border-b border-ivory/50 transition-colors"
                >
                  {t(locale, "nav.lookbook")}
                </Link>

                <Link
                  href={`/${locale}/about`}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block py-2 text-ink hover:text-camel font-medium border-b border-ivory/50 transition-colors"
                >
                  {t(locale, "nav.about")}
                </Link>

                <Link
                  href={`/${locale}/contact`}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block py-2 text-ink hover:text-camel font-medium border-b border-ivory/50 transition-colors"
                >
                  {t(locale, "nav.contact")}
                </Link>

                <Link
                  href={`/${locale}/delivery`}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block py-2 text-ink hover:text-camel font-medium border-b border-ivory/50 transition-colors"
                >
                  {t(locale, "nav.delivery")}
                </Link>

                <Link
                  href={`/${locale}/faq`}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block py-2 text-ink hover:text-camel font-medium border-b border-ivory/50 transition-colors"
                >
                  {t(locale, "nav.faq")}
                </Link>

                <Link
                  href={`/${locale}/admin-demo`}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center gap-2.5 py-3.5 px-3.5 bg-ivory text-camel font-semibold tracking-wider hover:bg-camel hover:text-white transition-colors min-h-[44px] border border-ivory-dark"
                >
                  <LayoutDashboard className="w-4 h-4 flex-shrink-0" />
                  <span>{t(locale, "nav.adminDemo")}</span>
                </Link>

                {/* Direct WhatsApp Consultation in Mobile Drawer */}
                <a
                  href={getBsesWhatsAppUrl(t(locale, "bses.whatsappMessage"))}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 py-3.5 px-3.5 bg-ink text-white text-xs font-mono tracking-wider hover:bg-camel transition-colors min-h-[44px] shadow-sm"
                  aria-label="Contacter BSES sur WhatsApp"
                >
                  <MessageCircle className="w-4 h-4 text-camel flex-shrink-0" />
                  <span>WhatsApp BSES ({BSES_OFFICIAL_PHONE_DISPLAY})</span>
                </a>
              </div>

              {/* 3. Drawer Footer with Language switch & Agency Attribution */}
              <div className="flex-shrink-0 px-6 py-5 border-t border-ivory-dark bg-ivory/30 text-xs space-y-3 font-mono">
                <div className="flex items-center justify-between text-muted">
                  <span>Langue / اللغة :</span>
                  <div className="flex items-center gap-2">
                    <Link
                      href={`/fr${pathname ? pathname.replace(/^\/(fr|en|ar)/, "") : ""}`}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`py-1 px-2 min-h-[36px] flex items-center ${
                        locale === "fr" ? "font-bold text-camel underline" : "hover:text-ink"
                      }`}
                    >
                      FR
                    </Link>
                    <span>·</span>
                    <Link
                      href={`/en${pathname ? pathname.replace(/^\/(fr|en|ar)/, "") : ""}`}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`py-1 px-2 min-h-[36px] flex items-center ${
                        locale === "en" ? "font-bold text-camel underline" : "hover:text-ink"
                      }`}
                    >
                      EN
                    </Link>
                    <span>·</span>
                    <Link
                      href={`/ar${pathname ? pathname.replace(/^\/(fr|en|ar)/, "") : ""}`}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`py-1 px-2 min-h-[36px] flex items-center ${
                        locale === "ar" ? "font-bold text-camel underline" : "hover:text-ink"
                      }`}
                    >
                      العربية
                    </Link>
                  </div>
                </div>
                <p className="text-[10px] text-muted text-center tracking-wider">
                  BSES — Benchalh Solution E-commerce
                </p>
              </div>
            </aside>
          </div>,
          document.body
        )}
    </header>
  );
}

