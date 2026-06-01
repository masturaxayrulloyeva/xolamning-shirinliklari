import { useOutletContext } from "react-router-dom";
import SweetCard from "../../Components/SweetCard";
import { shirinliklar } from "../../data";

export default function Katalog() {
  // Layout faylidan global funksiyani sug'urib olamiz
  const { savatgaQoshish } = useOutletContext();

  return (
    <div className="max-w-6xl mx-auto py-8">
      <div className="text-center mb-12">
        <p className="text-rose-400 text-xs font-semibold tracking-widest uppercase mb-1">
          Xolamning pishiriqlari
        </p>
        <h2 className="text-3xl font-extrabold text-stone-800">
          Shirinliklar Katalogi 🍰
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center px-4">
        {shirinliklar.map((shirinlik) => (
          <SweetCard
            key={shirinlik.id}
            shirinlik={shirinlik}
            onSavatgaQoshish={savatgaQoshish} // Global funksiya shu yerga ulandi!
          />
        ))}
      </div>
    </div>
  );
}