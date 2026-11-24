import { useOutletContext, Link } from "react-router-dom";
import { Trash2, ArrowLeft, ShoppingBag, AlertCircle, Send } from "lucide-react";
import { narxniFormatlash } from "../../utils/format";
import { useState, useRef } from "react";

export default function Savat() {
  // 1. Context ma'lumotlari
  const { savat, savatdanOchirish, savatniTozalash } = useOutletContext();

  // 2. State va Ref'lar
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [yuklanmoqda, setYuklanmoqda] = useState(false);
  const [xatoXabari, setXatoXabari] = useState("");
  const [telegramDirectUrl, setTelegramDirectUrl] = useState("");
  const [buyurtmaYakunlandi, setBuyurtmaYakunlandi] = useState(false);

  const ismRef = useRef(null);
  const raqamRef = useRef(null);

  // Toast bildirishnomalari uchun
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [showErrorToast, setShowErrorToast] = useState(false);

  // Agar buyurtma muvaffaqiyatli qabul qilingan bo'lsa, xushxabar oynasi chiqadi
  if (buyurtmaYakunlandi) {
    return (
      <div className="max-w-md mx-auto text-center py-16 px-4">
        <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-6 text-3xl animate-bounce">
          🎉
        </div>
        <h2 className="text-2xl font-bold text-stone-800 mb-2">Buyurtmangiz qabul qilindi! 🧁</h2>
        <p className="text-stone-500 text-sm mb-8 leading-relaxed">
          Buyurtmangiz muvaffaqiyatli yetkazildi. Tez orada siz bilan ko'rsatilgan telefon raqamingiz orqali bog'lanamiz!
        </p>
        <Link
          to="/katalog"
          onClick={() => setBuyurtmaYakunlandi(false)}
          className="inline-flex items-center gap-2 bg-linear-to-r from-rose-400 to-pink-500 text-white font-semibold px-6 py-3 rounded-2xl shadow-md hover:from-rose-500 hover:to-pink-600 transition-all cursor-pointer"
        >
          <ArrowLeft size={18} />
          Yana shirinlik tanlash
        </Link>
      </div>
    );
  }

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
  const yuborishTelegram = async (e) => {
    e.preventDefault();
    setXatoXabari("");
    setTelegramDirectUrl("");
    setYuklanmoqda(true);

    const TOKEN = import.meta.env.VITE_TELEGRAM_TOKEN || "8922159312:AAHQml99n8P-LZ-i5knguh5sPUQ3SUvYt14";
    const CHAT_ID = import.meta.env.VITE_TELEGRAM_CHAT_ID || "6537693406";

    const mijozIsmi = ismRef.current?.value || "Mijoz";
    const mijozRaqami = raqamRef.current?.value || "";

    // HTML formatdagi bot xabari
    let xabar = `🧁 <b>XOLAMNING SHIRINLIKLARI - YANGI BUYURTMA</b> 🧁\n\n`;
    xabar += `👤 <b>Mijoz:</b> ${mijozIsmi}\n`;
    xabar += `📞 <b>Telefon:</b> ${mijozRaqami}\n\n`;
    xabar += `🛒 <b>Buyurtma ro'yxati:</b>\n`;

    savat.forEach((item, index) => {
      xabar += `${index + 1}. 🎂 <b>${item.nomi}</b> - ${narxniFormatlash(item.narxi)}\n`;
    });

    xabar += `\n💰 <b>Jami summa:</b> ${narxniFormatlash(umumiySumma)}\n`;
    xabar += `⏰ <b>Vaqt:</b> ${new Date().toLocaleTimeString("uz-UZ", { hour: "2-digit", minute: "2-digit" })}\n`;

    // To'g'ridan-to'g'ri Telegram app orqali yuborish uchun toza matn
    const directMatn = `🧁 XOLAMNING SHIRINLIKLARI - YANGI BUYURTMA\n\n👤 Mijoz: ${mijozIsmi}\n📞 Tel: ${mijozRaqami}\n\n🛒 Mahsulotlar:\n` +
      savat.map((item, i) => `${i + 1}. ${item.nomi} - ${narxniFormatlash(item.narxi)}`).join("\n") +
      `\n\n💰 Jami: ${narxniFormatlash(umumiySumma)}`;

    const directLink = `https://t.me/xayrulloyeva_06?text=${encodeURIComponent(directMatn)}`;

    const URL = `https://api.telegram.org/bot${TOKEN}/sendMessage`;

    try {
      const res = await fetch(URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: CHAT_ID,
          text: xabar,
          parse_mode: "HTML",
        }),
      });

      const data = await res.json().catch(() => ({}));

      if (res.ok) {
        // Muvaffaqiyatli bot orqali ketdi
        setShowSuccessToast(true);
        setIsModalOpen(false);
        setBuyurtmaYakunlandi(true);
        savatniTozalash();

        setTimeout(() => {
          setShowSuccessToast(false);
        }, 4000);
      } else if (res.status === 429) {
        // Telegram serveri cheklov qo'ygan holat
        setTelegramDirectUrl(directLink);
        setXatoXabari("Telegram bot vaqtincha cheklovda (avvalgi testlar sababli). Quyidagi tugma orqali to'g'ridan-to'g'ri Telegramingizga yuborishingiz mumkin 👇");
        setShowErrorToast(true);
        setTimeout(() => setShowErrorToast(false), 5000);
      } else {
        setTelegramDirectUrl(directLink);
        setXatoXabari(data.description || "Telegram botga ulanishda xatolik yuz berdi. To'g'ridan-to'g'ri yuborishingiz mumkin:");
        setShowErrorToast(true);
        setTimeout(() => setShowErrorToast(false), 5000);
      }
    } catch (err) {
      console.error("Xatolik:", err);
      setTelegramDirectUrl(directLink);
      setXatoXabari("Internet bilan aloqa yo'q yoki tarmoq xatosi.");
      setShowErrorToast(true);
      setTimeout(() => setShowErrorToast(false), 5000);
    } finally {
      setYuklanmoqda(false);
    }
  };

  // 4. Vizual dizayn (JSX)
  return (
    <div className="max-w-4xl mx-auto py-10 px-4 relative">
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

          <button
            onClick={() => {
              setXatoXabari("");
              setTelegramDirectUrl("");
              setIsModalOpen(true);
            }}
            className="w-full bg-linear-to-r from-rose-400 to-pink-500 hover:from-rose-500 hover:to-pink-600 text-white font-bold py-3 rounded-2xl shadow-md transition-all mt-2 cursor-pointer"
          >
            Buyurtma berish
          </button>
        </div>
      </div>

      {/* MODAL OYNA QISMI */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white p-6 sm:p-8 rounded-3xl shadow-2xl max-w-md w-full relative">
            <button
              onClick={() => !yuklanmoqda && setIsModalOpen(false)}
              disabled={yuklanmoqda}
              className="absolute top-4 right-4 text-stone-400 hover:text-stone-600 cursor-pointer text-xl w-8 h-8 flex items-center justify-center rounded-full hover:bg-stone-50"
            >
              ✕
            </button>

            <h3 className="text-2xl font-bold text-stone-800 text-center mb-1">
              Buyurtmani tasdiqlash
            </h3>
            <p className="text-stone-400 text-xs sm:text-sm text-center mb-5">
              Xolamiz shirinliklarni tayyorlashni boshlashlari uchun ma'lumotlaringizni qoldiring
            </p>

            {/* Xatolik chiqsa modal ichida ko'rsatish */}
            {xatoXabari && (
              <div className="mb-4 bg-rose-50 border border-rose-200 text-rose-700 text-xs sm:text-sm p-3.5 rounded-2xl flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <AlertCircle size={18} className="text-rose-500 shrink-0" />
                  <p className="font-medium leading-snug">{xatoXabari}</p>
                </div>
                {telegramDirectUrl && (
                  <a
                    href={telegramDirectUrl}
                    target="_blank"
                    rel="noreferrer"
                    onClick={() => {
                      setIsModalOpen(false);
                      setBuyurtmaYakunlandi(true);
                      savatniTozalash();
                    }}
                    className="mt-1 flex items-center justify-center gap-2 bg-sky-500 hover:bg-sky-600 text-white font-bold py-2.5 px-4 rounded-xl text-xs transition-all shadow-md shadow-sky-200 cursor-pointer"
                  >
                    <Send size={15} />
                    <span>Telegram orqali to'g'ridan-to'g'ri yuborish</span>
                  </a>
                )}
              </div>
            )}

            <form onSubmit={yuborishTelegram} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-stone-600 mb-1">
                  Ismingiz
                </label>
                <input
                  ref={ismRef}
                  type="text"
                  required
                  placeholder="Ismingizni kiriting..."
                  className="w-full px-4 py-3 rounded-xl border border-stone-200 outline-none focus:border-rose-400 focus:ring-2 focus:ring-rose-100 transition"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-600 mb-1">
                  Telefon raqamingiz
                </label>
                <input
                  ref={raqamRef}
                  type="tel"
                  required
                  placeholder="+998 (90) 123-45-67"
                  className="w-full px-4 py-3 rounded-xl border border-stone-200 outline-none focus:border-rose-400 focus:ring-2 focus:ring-rose-100 transition"
                />
              </div>

              <button
                type="submit"
                disabled={yuklanmoqda}
                className={`w-full py-3.5 text-white font-bold rounded-xl shadow-md transition-all flex items-center justify-center gap-2 ${
                  yuklanmoqda
                    ? "bg-stone-300 cursor-not-allowed text-stone-500 shadow-none"
                    : "bg-linear-to-r from-rose-400 to-pink-500 hover:from-rose-500 hover:to-pink-600 cursor-pointer shadow-pink-200"
                }`}
              >
                {yuklanmoqda ? (
                  <>
                    <span className="w-4 h-4 border-2 border-stone-500 border-t-transparent rounded-full animate-spin"></span>
                    <span>Yuborilmoqda...</span>
                  </>
                ) : (
                  "Tasdiqlash va Yuborish"
                )}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* ================= TOAST BILDIRIShNOMALARI ================= */}

      {/* 1. Muvaffaqiyatli xabar */}
      {showSuccessToast && (
        <div className="fixed bottom-10 right-6 sm:right-10 z-50 bg-white border border-stone-100 shadow-2xl px-6 py-5 rounded-2xl flex items-center gap-4 transition-all duration-300 max-w-sm border-l-4 border-l-emerald-500">
          <div className="bg-emerald-50 w-12 h-12 rounded-xl flex items-center justify-center text-2xl">
            🎉
          </div>
          <div>
            <h5 className="font-bold text-stone-800 text-base">Muvaffaqiyatli!</h5>
            <p className="text-sm text-stone-500 mt-0.5">Buyurtmangiz Telegram orqali yuborildi! 🧁</p>
          </div>
        </div>
      )}

      {/* 2. Xatolik xabari */}
      {showErrorToast && (
        <div className="fixed bottom-10 right-6 sm:right-10 z-50 bg-white border border-stone-100 shadow-2xl px-6 py-5 rounded-2xl flex items-center gap-4 transition-all duration-300 max-w-sm border-l-4 border-l-rose-500">
          <div className="bg-rose-50 w-12 h-12 rounded-xl flex items-center justify-center text-2xl">
            ❌
          </div>
          <div>
            <h5 className="font-bold text-rose-600 text-base">Xatolik!</h5>
            <p className="text-sm text-stone-500 mt-0.5">{xatoXabari || "Xatolik yuz berdi. Qayta urinib ko'ring."}</p>
          </div>
        </div>
      )}
    </div>
  );
}
