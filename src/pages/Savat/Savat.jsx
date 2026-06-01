import { useOutletContext, Link } from "react-router-dom";
import { Trash2, ArrowLeft, ShoppingBag } from "lucide-react";
import { narxniFormatlash } from "../../utils/format";
import { useState, useRef } from "react";

export default function Savat() {
  // 1. Context ma'lumotlari
  const { savat, savatdanOchirish, savatniTozalash } = useOutletContext();

  // 2. Modal oynani boshqarish va Input Ref'lari
  const [isModalOpen, setIsModalOpen] = useState(false);
  const ismRef = useRef(null);
  const raqamRef = useRef(null);

  // Savat bo'sh bo'lsa srazi ushbu UI qaytadi
  if (savat.length === 0) {
    return (
      <div className="max-w-md mx-auto text-center py-16 px-4">
        <div className="w-20 h-20 bg-rose-50 rounded-full flex items-center justify-center mx-auto mb-6 text-rose-400">
          <ShoppingBag size={40} />
        </div>
        <h2 className="text-2xl font-bold text-stone-800 mb-2">Savatchangiz bo'sh</h2>
        <p className="text-stone-400 text-sm mb-8">
          Katalog sahifasiga o'ting va o'zingizga yoqqan shirinliklarni qo'shing.
        </p>
        <Link
          to="/katalog"
          className="inline-flex items-center gap-2 bg-linear-to-r from-rose-400 to-pink-500 text-white font-semibold px-6 py-3 rounded-2xl shadow-md hover:from-rose-500 hover:to-pink-600 transition-all"
        >
          <ArrowLeft size={18} />
          Xarid qilishni boshlash
        </Link>
      </div>
    );
  }

  // Jami summani hisoblash
  const umumiySumma = savat.reduce((sum, item) => sum + item.narxi, 0);

  // 3. Telegram botga yuborish mantiqi
  const yuborishTelegram = (e) => {
    e.preventDefault();

    // ⚠️ O'zingizning shaxsiy token va Chat ID raqamingizni kiriting!
    const TOKEN = import.meta.env.VITE_TELEGRAM_TOKEN;
    const CHAT_ID = import.meta.env.VITE_TELEGRAM_CHAT_ID;

    const mijozIsmi = ismRef.current.value;
    const mijozRaqami = raqamRef.current.value;

    let xabar = `🧁 <b>XOLAMNING SHIRINLIKLARI</b> 🧁\n\n`;
    xabar += `👤 <b>Mijoz:</b> ${mijozIsmi}\n`;
    xabar += `📞 <b>Telefon:</b> ${mijozRaqami}\n\n`;
    xabar += `🛒 <b>Buyurtma ro'yxati:</b>\n`;

    // Savat massivini xabarga qo'shish mantiqi
    savat.forEach((item) => {
      xabar += `🎂 <b>${item.nomi}</b> - ${narxniFormatlash(item.narxi)}\n`;
    });

    xabar += `\n💰 <b>Jami summa:</b> ${narxniFormatlash(umumiySumma)}\n`;

    const URL = `https://api.telegram.org/bot${TOKEN}/sendMessage`;

    fetch(URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: CHAT_ID,
        text: xabar,
        parse_mode: "HTML",
      }),
    })
      .then((res) => {
        if (res.ok) {
          alert("Buyurtmangiz muvaffaqiyatli yuborildi! 🎉");
          setIsModalOpen(false); // Modalni yopish
          savatniTozalash()
        } else {
          alert("Xatolik yuz berdi, qaytadan urinib ko'ring.");
        }
      })
      .catch((err) => console.error("Xatolik:", err));
  };

  // 4. Vizual dizayn (JSX)
  return (
    <div className="max-w-4xl mx-auto py-10 px-4">
      <h2 className="text-3xl font-extrabold text-stone-800 mb-8 flex items-center gap-2">
        Savatdagi mahsulotlar 🛒
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Tanlangan shirinliklar ro'yxati */}
        <div className="lg:col-span-2 flex flex-col gap-4">
          {savat.map((shirinlik) => (
            <div
              key={shirinlik.id}
              className="flex items-center gap-4 bg-white p-4 rounded-2xl border border-stone-100 shadow-sm group hover:border-rose-100 transition-all"
            >
              <img
                src={shirinlik.rasm}
                alt={shirinlik.nomi}
                className="w-20 h-20 object-cover rounded-xl"
              />
              <div className="flex-1">
                <span className="text-xs font-semibold text-rose-400 bg-rose-50 px-2 py-0.5 rounded-full">
                  {shirinlik.kategoriya}
                </span>
                <h4 className="text-base font-bold text-stone-800 mt-1">
                  {shirinlik.nomi}
                </h4>
                <p className="text-rose-500 font-extrabold text-sm mt-0.5">
                  {narxniFormatlash(shirinlik.narxi)}
                </p>
              </div>

              <button
                onClick={() => savatdanOchirish(shirinlik.id)}
                className="p-2.5 text-stone-400 hover:text-rose-500 hover:bg-rose-50 rounded-xl transition-all cursor-pointer"
                title="Savatdan o'chirish"
              >
                <Trash2 size={20} />
              </button>
            </div>
          ))}
        </div>

        {/* Buyurtma hisob-kitob bloki */}
        <div className="bg-white p-6 rounded-3xl border border-stone-100 shadow-md flex flex-col gap-4">
          <h3 className="text-lg font-bold text-stone-800 border-b border-stone-100 pb-3">
            Buyurtma tafsiloti
          </h3>
          <div className="flex justify-between text-sm text-stone-500">
            <span>Mahsulotlar soni:</span>
            <span className="font-semibold text-stone-800">
              {savat.length} ta
            </span>
          </div>

          <div className="flex justify-between items-center border-t border-stone-100 pt-3 gap-2">
            <span className="font-bold text-stone-800 text-sm sm:text-base">
              Umumiy summa:
            </span>
            <span className="font-extrabold text-rose-500 text-base sm:text-lg whitespace-nowrap">
              {narxniFormatlash(umumiySumma)}
            </span>
          </div>

          {/* TO'G'RILANDI: Bu tugma endi modalni ochadi */}
          <button
            onClick={() => setIsModalOpen(true)}
            className="w-full bg-linear-to-r from-rose-400 to-pink-500 hover:from-rose-500 hover:to-pink-600 text-white font-bold py-3 rounded-2xl shadow-md transition-all mt-2 cursor-pointer"
          >
            Buyurtma berish
          </button>
        </div>
      </div>

      {/* MODAL OYNA QISMI */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-2xl shadow-2xl max-w-md w-full mx-4 relative">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-stone-400 hover:text-stone-600 cursor-pointer"
            >
              ✕
            </button>

            <h3 className="text-2xl font-bold text-stone-800 text-center mb-1">
              Buyurtmani tasdiqlash
            </h3>
            <p className="text-stone-400 text-sm text-center mb-6">
              Xolamiz shirinliklarni tayyorlashni boshlashlari uchun ma'lumotlaringizni qoldiring
            </p>

            <form onSubmit={yuborishTelegram} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-stone-500 mb-1">
                  Ismingiz
                </label>
                <input
                  ref={ismRef}
                  type="text"
                  required
                  placeholder="Ismingizni kiriting..."
                  className="w-full px-4 py-3 rounded-xl border border-stone-200 outline-none focus:border-pink-500 transition"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-stone-500 mb-1">
                  Telefon raqamingiz
                </label>
                <input
                  ref={raqamRef}
                  type="tel"
                  required
                  placeholder="+998 (90) 123-45-67"
                  className="w-full px-4 py-3 rounded-xl border border-stone-200 outline-none focus:border-pink-500 transition"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-linear-to-r from-rose-400 to-pink-500 text-white font-semibold rounded-xl shadow-md hover:from-rose-500 hover:to-pink-600 transition-all cursor-pointer"
              >
                Tasdiqlash va Yuborish
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

