import { Link, useRouteError } from "react-router-dom";

export default function NotFound() {
  const error = useRouteError();
  console.error(error); // Konsolda xatolikni ko'rib turish uchun

  return (
    <div className="min-h-screen bg-stone-50 flex flex-col items-center justify-center p-6 text-center">
      {/* Shirin va qiziqarli vizual qism */}
      <div className="text-9xl font-extrabold text-pink-600 animate-bounce">
        404
      </div>
      
      <div className="mt-4 text-4xl font-bold text-stone-800">
        Ehh, sahifa topilmadi! 🧁
      </div>
      
      <p className="mt-3 text-lg text-stone-600 max-w-md">
        Xavotir olmang, ehtimol bu sahifani kimdir allaqachon yeb qo‘ygan yoki u hali oxirigacha pishib yetilmagan.
      </p>

      {/* Yo'naltiruvchi tugmalar */}
      <div className="mt-8 flex flex-col sm:flex-row gap-4">
        <Link
          to="/"
          className="px-6 py-3 bg-pink-600 text-white font-medium rounded-full shadow-md hover:bg-pink-700 transition-all duration-300 transform hover:scale-105"
        >
          Bosh sahifaga qaytish
        </Link>
        <Link
          to="/katalog"
          className="px-6 py-3 bg-white text-stone-700 font-medium rounded-full border border-stone-300 shadow-sm hover:bg-stone-100 transition-all duration-300"
        >
          Shirinliklarni ko'rish 🍰
        </Link>
      </div>

      <div className="mt-12 text-xs text-stone-400 font-mono">
        Xatolik turi: {error?.statusText || error?.message || "Sahifa mavjud emas"}
      </div>
    </div>
  );
}