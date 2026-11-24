import { useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Components/Navbar";
import { CheckCircle2, AlertCircle, X } from "lucide-react";

export default function Layout() {
  const [savat, setSavat] = useState([]);
  const [toast, setToast] = useState({ ochik: false, xabar: "", tur: "success" });

  // Zamonaviy Toastify xabarnomasi funksiyasi
  const toastKorsatish = (xabar, tur = "success") => {
    setToast({ ochik: true, xabar, tur });
    setTimeout(() => {
      setToast((prev) => ({ ...prev, ochik: false }));
    }, 2800);
  };

  // Savatga qo'shish (alert o'rniga chiroyli toast bilan)
  const savatgaQoshish = (shirinlik) => {
    setSavat((prevSavat) => {
      const mavjudmi = prevSavat.some((item) => item.id === shirinlik.id);
      if (mavjudmi) {
        toastKorsatish(`"${shirinlik.nomi}" allaqachon savatda bor!`, "warning");
        return prevSavat;
      }
      toastKorsatish(`"${shirinlik.nomi}" savatga qo'shildi! 🧁`, "success");
      return [...prevSavat, shirinlik];
    });
  };

  // Savatdan o'chirish
  const savatdanOchirish = (id) => {
    setSavat((prevSavat) => prevSavat.filter((item) => item.id !== id));
    toastKorsatish("Mahsulot savatdan olib tashlandi", "warning");
  };

  // Savatni butunlay tozalash
  const savatniTozalash = () => {
    setSavat([]);
  };

  return (
    <div className="min-h-screen bg-stone-50 text-stone-800 flex flex-col relative">
      <Navbar savatSoni={savat.length} />

      {/* ================= ZAMONAVIY TOASTIFY (ESKI ALERT O'RNIGA) ================= */}
      {toast.ochik && (
        <div className="fixed top-20 right-4 sm:right-6 z-50 animate-bounce transition-all duration-300">
          <div
            className={`flex items-center gap-3 px-5 py-3.5 rounded-2xl shadow-xl border backdrop-blur-md transition-all ${
              toast.tur === "success"
                ? "bg-white/95 border-emerald-200 text-emerald-800 shadow-emerald-100/60"
                : "bg-white/95 border-amber-200 text-amber-800 shadow-amber-100/60"
            }`}
          >
            {toast.tur === "success" ? (
              <CheckCircle2 size={20} className="text-emerald-500 shrink-0" />
            ) : (
              <AlertCircle size={20} className="text-amber-500 shrink-0" />
            )}
            <p className="text-xs sm:text-sm font-bold">{toast.xabar}</p>
            <button
              onClick={() => setToast((prev) => ({ ...prev, ochik: false }))}
              className="text-stone-400 hover:text-stone-600 ml-2 cursor-pointer"
            >
              <X size={15} />
            </button>
          </div>
        </div>
      )}

      <main className="flex-1">
        <Outlet context={{ savatgaQoshish, savat, savatdanOchirish, savatniTozalash, toastKorsatish }} />
      </main>

      <footer className="bg-white border-t border-stone-100 mt-auto">
        <div className="max-w-6xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">

          {/* 1-Blok: Brend va Shior */}
          <div className="flex flex-col gap-2">
            <h4 className="text-xl font-extrabold text-stone-800 tracking-wide flex items-center justify-center md:justify-start gap-2">
              🧁 Xolamning Shirinliklari
            </h4>
            <p className="text-sm text-stone-400 max-w-sm">
              Har bir pishiriqda uy harorati va cheksiz mehr bor. Eng sarxil va tabiiy masalliqlardan tayyorlangan shirinliklar.
            </p>
          </div>

          {/* 2-Blok: Ish vaqti va Aloqa */}
          <div className="flex flex-col gap-2">
            <h5 className="font-bold text-stone-700 text-base">Ish vaqti & Aloqa</h5>
            <p className="text-sm text-stone-500">⏰ Har kuni: 09:00 - 20:00</p>
            <p className="text-sm text-stone-500">📞 Tel: +998 (90) 123-45-67</p>
          </div>

          {/* 3-Blok: Ijtimoiy tarmoqlar */}
          <div className="flex flex-col gap-2 items-center md:items-start">
            <h5 className="font-bold text-stone-700 text-base">Bizni kuzating</h5>
            <div className="flex gap-4 mt-1">
              <a
                href="https://t.me/html_css_js_club"
                target="_blank"
                rel="noreferrer"
                className="text-sm bg-stone-50 hover:bg-rose-50 hover:text-rose-500 text-stone-500 px-4 py-2 rounded-xl border border-stone-100 transition-all font-medium"
              >
                ✈️ Telegram Kanal
              </a>
            </div>
          </div>

        </div>

        {/* Eng pastki mualliflik qatori */}
        <div className="border-t border-stone-50 py-4 text-center text-xs text-stone-400 bg-stone-50/50">
          &copy; {new Date().getFullYear()} Xolamning Shirinliklari. Barcha huquqlar himoyalangan.
        </div>
      </footer>
    </div>
  );
}
