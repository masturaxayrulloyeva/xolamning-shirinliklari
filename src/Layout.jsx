import { useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Components/Navbar";

export default function Layout() {
  const [savat, setSavat] = useState([]);

  const savatgaQoshish = (shirinlik) => {
    setSavat((prevSavat) => {
      const mavjudmi = prevSavat.some((item) => item.id === shirinlik.id);
      if (mavjudmi) {
        alert(`"${shirinlik.nomi}" allaqachon savatda bor!`);
        return prevSavat;
      }
      alert(`✅ "${shirinlik.nomi}" savatga qo'shildi!`);
      return [...prevSavat, shirinlik];
    });
  };

  // YANGI QO'SHILGAN O'CHIRISH FUNKSIYASI:
  const savatdanOchirish = (id) => {
    setSavat((prevSavat) => prevSavat.filter((item) => item.id !== id));
  };

  // 🔥 MANA BU YANGI FUNKSIYANI QO'SHING:
  const savatniTozalash = () => {
    setSavat([]); // Massivni butunlay bo'shatadi
  };

  return (
    <div className="min-h-screen bg-stone-50 text-stone-800 flex flex-col">
      <Navbar savatSoni={savat.length} />

      <main className="flex-1">
        {/* Endi o'chirish funksiyasini ham context orqali pastga uzatamiz */}
        <Outlet context={{ savatgaQoshish, savat, savatdanOchirish, savatniTozalash }} />
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
                href="https://t.me/html_css_js_club" // O'zingizning kanalingiz linki
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