import { useOutletContext } from "react-router-dom";
import SweetCard from "../../Components/SweetCard";
import { shirinliklar } from "../../data";
import { useState } from "react";

export default function Katalog() {
  // Layout faylidan global savatga qo'shish funksiyasini olamiz
  const { savatgaQoshish } = useOutletContext();

  // Kategoriya bo'yicha saralash holati
  const [tanlanganKategoriya, setTanlanganKategoriya] = useState("barchasi");

  const kategoriyalar = [
    { id: "barchasi", nomi: "Barchasi" },
    { id: "tortlar", nomi: "Tortlar 🎂" },
    { id: "pecheniylar", nomi: "Pecheniylar 🍪" },
    { id: "pishiriqlar", nomi: "Pishiriqlar 🥐" },
  ];

  const saralanganShirinliklar =
    tanlanganKategoriya === "barchasi"
      ? shirinliklar
      : shirinliklar.filter((item) => item.kategoriya === tanlanganKategoriya);

  return (
    <div className="max-w-6xl mx-auto py-8 px-4">
      <div className="text-center mb-8">
        <p className="text-rose-400 text-xs font-semibold tracking-widest uppercase mb-1">
          Xolamning pishiriqlari
        </p>
        <h2 className="text-3xl font-extrabold text-stone-800">
          Shirinliklar Katalogi 🍰
        </h2>
        <p className="text-stone-400 text-sm mt-2">
          Bizning sarxil va lazzatli shirinliklarimiz orasidan o'zingizga yoqqanini tanlang
        </p>
      </div>

      {/* Kategoriya filtri tugmalari */}
      <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-10">
        {kategoriyalar.map((kat) => (
          <button
            key={kat.id}
            onClick={() => setTanlanganKategoriya(kat.id)}
            className={`px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              tanlanganKategoriya === kat.id
                ? "bg-linear-to-r from-rose-500 to-pink-500 text-white shadow-md shadow-pink-200"
                : "bg-white text-stone-600 border border-stone-200 hover:border-rose-200 hover:text-rose-500"
            }`}
          >
            {kat.nomi}
          </button>
        ))}
      </div>

      {/* Shirinliklar to'ri */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
        {saralanganShirinliklar.map((shirinlik) => (
          <SweetCard
            key={shirinlik.id}
            shirinlik={shirinlik}
            onSavatgaQoshish={savatgaQoshish}
          />
        ))}
      </div>
    </div>
  );
}
