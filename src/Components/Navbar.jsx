import { NavLink, Link } from "react-router-dom";
import { ShoppingBag } from "lucide-react";
import logoRasm from "../assets/logo.png"; 

export default function Navbar({ savatSoni }) {
  // Faol havolalar uchun chiroyli va moslashuvchan klasslar
  const linkKlassi = ({ isActive }) => 
    `text-xs sm:text-sm font-semibold transition-colors py-1 sm:py-2 flex items-center border-b-2 ${
      isActive 
        ? "text-rose-600 border-rose-500 font-bold" 
        : "text-stone-600 border-transparent hover:text-rose-500 hover:border-stone-200"
    }`;

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-stone-100 px-4 py-2 sm:py-3 sm:px-6">
      {/* flex-col: Mobil ekranda elementlar tepama-teng tushadi 
        sm:flex-row: Kompyuter ekranda esa yonma-yon qatorga aylanadi
        gap-3 sm:gap-0: Mobil ekranda bloklar orasida masofa bo'ladi
      */}
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-0">
        
        {/* LOGOTIP BLOKI (MOBILDA HAM MARKAZLANADI) */}
        <Link to="/" className="flex items-center gap-2 select-none group">
          <img 
            src={logoRasm} 
            alt="Xolamning Shirinliklari Logo" 
            className="w-20 h-20 sm:w-24 sm:h-24 object-contain shrink-0 scale-125 -my-3 sm:-my-4 transition-transform duration-300 group-hover:scale-135"
          />
          <div className="flex flex-col justify-center -ml-1">
            <span className="font-shirin text-lg sm:text-xl font-bold text-rose-600 leading-tight">
              Xolamning
            </span>
            <span className="font-shirin text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-amber-500 leading-none mt-1">
              shirinliklari
            </span>
          </div>
        </Link>

        {/* MENYULAR VA SAVATCHAM (MOBILDA HAM TEKIS VA KENG) */}
        {/* w-full sm:w-auto: Mobil ekranda pastki qism to'liq kenglikni oladi va elementlar chiroyli taqsimlanadi */}
        <div className="flex items-center justify-center sm:justify-end gap-4 sm:gap-6 w-full sm:w-auto border-t border-stone-50 sm:border-t-0 pt-2 sm:pt-0">
          <NavLink 
            to="/" 
            end 
            className={linkKlassi}
          >
            Bosh sahifa
          </NavLink>
          
          <NavLink 
            to="/katalog" 
            className={linkKlassi}
          >
            Katalog
          </NavLink>
          
          {/* SAVATCHAM TUGMASI (MOBILGA MOSLASHTIRILGAN) */}
          <NavLink
            to="/savat"
            className={({ isActive }) => 
              `relative flex items-center gap-1 sm:gap-1.5 px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl text-xs sm:text-sm font-bold transition-colors ${
                isActive 
                  ? "bg-rose-500 text-white" 
                  : "bg-rose-50 text-rose-600 hover:bg-rose-100"
              }`
            }
          >
            <ShoppingBag size={16} className="sm:w-4.5 sm:h-4.5" />
            <span>Savatcham</span>
            {savatSoni > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-linear-to-r from-rose-500 to-pink-500 text-white text-[10px] sm:text-[11px] font-bold w-4.5 h-4.5 sm:w-5 sm:h-5 rounded-full flex items-center justify-center shadow-sm">
                {savatSoni}
              </span>
            )}
          </NavLink>
        </div>

      </div>
    </header>
  );
}