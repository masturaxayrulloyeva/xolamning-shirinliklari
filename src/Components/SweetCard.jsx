import { ShoppingCart, Star, Tag } from "lucide-react";
import { narxniFormatlash } from "../utils/format";

// --- Yordamchi funksiyalar ---

const yulduzlarniHisoblash = (reyting) => {
  const yulduzlar = [];
  for (let i = 1; i <= 5; i++) {
    if (reyting >= i) {
      yulduzlar.push("full");
    } else if (reyting >= i - 0.5) {
      yulduzlar.push("half");
    } else {
      yulduzlar.push("empty");
    }
  }
  return yulduzlar;
};

// --- Yulduzcha komponenti ---
const ReytingYulduzlari = ({ reyting }) => {
  const yulduzlar = yulduzlarniHisoblash(reyting);
  return (
    <div className="flex items-center gap-0.5">
      {yulduzlar.map((tur, index) => (
        <span key={index} className="relative inline-block text-base">
          <Star size={16} className="text-amber-200" fill="currentColor" strokeWidth={0} />
          {tur !== "empty" && (
            <span
              className="absolute inset-0 overflow-hidden"
              style={{ width: tur === "half" ? "50%" : "100%" }}
            >
              <Star size={16} className="text-amber-400" fill="currentColor" strokeWidth={0} />
            </span>
          )}
        </span>
      ))}
      <span className="ml-1 text-xs font-semibold text-amber-700">{reyting?.toFixed(1)}</span>
    </div>
  );
};

// --- Asosiy Card komponenti ---
export default function SweetCard({ shirinlik, onSavatgaQoshish }) {
  const { nomi, kategoriya, narxi, reyting, tarif, rasm } = shirinlik;

  return (
    <article className="group relative flex flex-col bg-white rounded-3xl overflow-hidden shadow-md shadow-pink-100/60 border border-pink-100 transition-all duration-300 ease-out hover:-translate-y-2 hover:shadow-xl hover:shadow-pink-200/50 max-w-sm w-full">
      {/* Rasm qismi */}
      <div className="relative overflow-hidden h-56 bg-linear-to-br from-pink-50 to-rose-100">
        <img
          src={rasm}
          alt={nomi}
          className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-110"
          loading="lazy"
        />
        <div className="absolute top-3 left-3 flex items-center gap-1 bg-white/80 backdrop-blur-sm text-rose-500 text-xs font-semibold px-2.5 py-1 rounded-full border border-rose-100">
          <Tag size={11} />
          {kategoriya}
        </div>
        <div className="absolute bottom-0 inset-x-0 h-16 bg-linear-to-t from-white/40 to-transparent" />
      </div>

      {/* Kontent qismi */}
      <div className="flex flex-col flex-1 p-5 gap-3">
        <h3 className="text-gray-800 font-bold text-lg leading-snug line-clamp-2">{nomi}</h3>
        <ReytingYulduzlari reyting={reyting} />
        <p className="text-gray-400 text-sm leading-relaxed line-clamp-2">{tarif}</p>
        <div className="border-t border-dashed border-pink-100 my-1" />

        {/* Narx va Tugma */}
        <div className="flex items-center justify-between gap-3 mt-auto">
          <div className="flex flex-col">
            <span className="text-xs text-gray-400 font-medium">Narxi</span>
            <span className="text-rose-500 font-extrabold text-lg leading-tight">
              {narxniFormatlash(narxi)}
            </span>
          </div>

          <button
            onClick={() => onSavatgaQoshish && onSavatgaQoshish(shirinlik)}
            className="flex items-center gap-2 bg-linear-to-r from-rose-400 to-pink-500 hover:from-rose-500 hover:to-pink-600 active:scale-95 text-white text-sm font-semibold px-4 py-2.5 rounded-2xl shadow-md shadow-pink-300/40 transition-all duration-200 ease-out cursor-pointer select-none"
          >
            <ShoppingCart size={15} strokeWidth={2.5} />
            Savatga
          </button>
        </div>
      </div>
    </article>
  );
}