// utilits/format.js faylingiz ichidagi funksiyani mana shunday himoyalash kerak:
export function narxniFormatlash(narx) {
  // Agar narx kelmasa yoki xato bo'lsa, srazi 0 qaytarsin, sahifa qulab tushmaydi
  if (narx === undefined || narx === null) return "0"; 
  
  return Number(narx).toLocaleString('uz-UZ'); // yoki .toFixed() ishlatilgan qismi
}