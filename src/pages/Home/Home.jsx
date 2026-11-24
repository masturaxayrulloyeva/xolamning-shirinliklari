import { Link } from "react-router-dom";
import { Cake, ShoppingBag, Truck, ShieldCheck, Heart } from "lucide-react";
import { shirinliklar } from "../../data";
import SweetCard from "../../Components/SweetCard";
import { useOutletContext } from "react-router-dom";

export default function Home() {
  // Savatga qo'shish funksiyasini Layout'dan olamiz (vitrinadagi kartochkalar ishlashi uchun)
  const { savatgaQoshish } = useOutletContext();

  // Bazadagi shirinliklardan eng birinchi 3 tasini "Sara shirinliklar" sifatida ajratib olamiz
  const saraShirinliklar = shirinliklar.slice(0, 3);

  return (
    <div className="space-y-20 pb-16">

      {/* 1. HERO SECTION (Asosiy Banner) */}
      <section className="max-w-6xl mx-auto px-4 pt-12 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div className="space-y-6 text-center md:text-left">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-rose-50 text-rose-500 border border-rose-100">
            <Heart size={12} className="fill-rose-500" /> 100% Tabiiy va Sifati Kafolatlangan
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-stone-800 leading-tight">
            Xolamning shirinliklar <br />
            <span className="bg-linear-to-r from-rose-500 to-pink-500 bg-clip-text text-transparent">
              dunyosiga xush kelibsiz!
            </span>
            <span> 🍰</span>
          </h1>
          <p className="text-stone-500 text-base max-w-md mx-auto md:mx-0 leading-relaxed">
            Bizda har bir pishiriq faqat va faqat eng sara, yangi mahsulotlardan, oʻzgacha mehr va muhabbat bilan tayyorlanadi. Ogʻizda eriydigan lazzat!
          </p>
          <div className="flex flex-col sm:flex-row justify-center md:justify-start gap-4 pt-2">
            {/* Mana shu yerda Cake ikonkasini ishlatib ESLint ogohlantirishini yo'qotamiz */}
            <Link
              to="/katalog"
              className="inline-flex items-center justify-center gap-2 bg-linear-to-r from-rose-400 to-pink-500 text-white font-bold px-8 py-4 rounded-2xl shadow-lg shadow-pink-100 hover:from-rose-500 hover:to-pink-600 transition-all transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
            >
              <Cake size={20} />
              Katalogni koʻrish
            </Link>
          </div>
          <p className="text-xs text-stone-400">
            Bazamizda hozirda <strong className="text-stone-600">{shirinliklar.length} ta</strong> ajoyib shirinlik turi mavjud.
          </p>
        </div>

        {/* Bannerning o'ng tarafidagi jozibador rasm */}
        <div className="relative justify-self-center md:justify-self-end">
          <div className="absolute inset-0 bg-linear-to-tr from-rose-200 to-pink-100 rounded-full filter blur-3xl opacity-40 -z-10 transform scale-110"></div>
          <img
            src="https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=600&q=80"
            alt="Asosiy shirinlik"
            className="w-full max-w-110 h-85 sm:h-100 object-cover rounded-[2.5rem] shadow-xl border-4 border-white"
          />
        </div>
      </section>

      {/* 2. AFZALLIKLARIMIZ (Features) */}
      <section className="bg-white border-y border-stone-100 py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center max-w-xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-800">
              Nega aynan bizni tanlashadi? ✨
            </h2>
            <p className="text-stone-400 text-sm mt-2">
              Sizning baxtiyor lahzalaringiz va shirin xotiralaringiz uchun qaygʻuramiz.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {/* 1-afzallik */}
            <div className="bg-stone-50 p-6 rounded-2xl border border-stone-100/50 text-center space-y-3">
              <div className="w-12 h-12 bg-rose-50 text-rose-500 rounded-xl flex items-center justify-center mx-auto">
                <ShieldCheck size={24} />
              </div>
              <h3 className="font-bold text-stone-800">Yuqori Sifat</h3>
              <p className="text-stone-500 text-xs leading-relaxed">
                Hech qanday sun'iy qoʻshimchalarsiz, faqat uy suti, sariyogʻ va tabiiy mevalardan foydalanamiz.
              </p>
            </div>

            {/* 2-afzallik */}
            <div className="bg-stone-50 p-6 rounded-2xl border border-stone-100/50 text-center space-y-3">
              <div className="w-12 h-12 bg-amber-50 text-amber-500 rounded-xl flex items-center justify-center mx-auto">
                <Truck size={24} />
              </div>
              <h3 className="font-bold text-stone-800">Tezkor Yetkazish</h3>
              <p className="text-stone-500 text-xs leading-relaxed">
                Toshkent shahri boʻylab buyurtmangizni oʻz vaqtida, buzilmagan va yangi holatida eshigingizga yetkazamiz.
              </p>
            </div>

            {/* 3-afzallik */}
            <div className="bg-stone-50 p-6 rounded-2xl border border-stone-100/50 text-center space-y-3">
              <div className="w-12 h-12 bg-emerald-50 text-emerald-500 rounded-xl flex items-center justify-center mx-auto">
                <ShoppingBag size={24} />
              </div>
              <h3 className="font-bold text-stone-800">Oson Buyurtma</h3>
              <p className="text-stone-500 text-xs leading-relaxed">
                Savat tizimi orqali oʻzingizga yoqqan pishiriqlarni bir necha soniyada tanlab, buyurtma bera olasiz.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. VITRINA (Sara mahsulotlar) */}
      <section className="max-w-6xl mx-auto px-4">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-10 gap-4">
          <div className="text-center sm:text-left">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-800">
              Eng ommabop shirinliklarimiz 🔥
            </h2>
            <p className="text-stone-400 text-sm mt-1">
              Mijozlarimiz tomonidan eng koʻp soʻraladigan va seviladigan bestsellerlar.
            </p>
          </div>
          <Link
            to="/katalog"
            className="text-sm font-bold text-rose-500 hover:text-rose-600 transition-all underline underline-offset-4"
          >
            Barcha mahsulotlarni koʻrish &rarr;
          </Link>
        </div>

        {/* 3 ta mahsulot kartochkasi */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
          {saraShirinliklar.map((shirinlik) => (
            <SweetCard
              key={shirinlik.id}
              shirinlik={shirinlik}
              onSavatgaQoshish={savatgaQoshish}
            />
          ))}
        </div>
      </section>

    </div>
  );
}