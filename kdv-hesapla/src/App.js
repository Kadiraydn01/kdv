import React, { useState } from "react";
import "./App.css";

const App = () => {
  const [amount, setAmount] = useState(""); // Alışveriş tutarını tutan state
  const [installments, setInstallments] = useState([]); // Taksit hesaplamalarını tutan state

  // Alışveriş tutarını sayısal formatta tutmak için fonksiyon
  const handleAmountChange = (e) => {
    const value = e.target.value.replace(/[^\d,]/g, "").replace(",", ".");
    setAmount(value);
  };

  // Girdiği değeri yerel para birimi formatında gösteren fonksiyon
  const formatCurrency = (value) => {
    if (!value) return "";
    const numericValue = parseFloat(value.replace(",", "."));
    return numericValue.toLocaleString("tr-TR", {
      style: "decimal",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    });
  };

  // Taksit hesaplamalarını yapan fonksiyon
  const handleCalculateInstallments = () => {
    if (!amount || isNaN(amount)) return;

    const calculatedInstallments = Object.keys(installmentRates).map(
      (month) => {
        const rate = installmentRates[month];
        const totalAmount = (amount * rate).toFixed(2);
        const monthlyPayment = (totalAmount / month).toFixed(2);

        return {
          month,
          totalAmount,
          monthlyPayment,
        };
      }
    );

    setInstallments(calculatedInstallments);
  };

  return (
    <div className="relative flex flex-col items-center min-h-screen py-8 bg-gray-100 ">
      <div className="absolute inset-0 bg-no-repeat bg-cover opacity-10"></div>
      <header className="mb-6 text-center header"></header>
      <main className="relative z-10 w-11/12 max-w-md p-6 bg-white rounded-lg shadow-lg main">
        <div>
          <img src="emin.jpg" alt="Emin İletişim" />
        </div>
        <div className="space-y-4 text-center">
          <label className="flex flex-col">
            <span className="my-3 font-bold text-gray-700 ">
              Alışveriş Tutarı (₺):
            </span>
            <input
              type="text"
              value={formatCurrency(amount)}
              onChange={handleAmountChange}
              placeholder="Tutarı giriniz"
              className="flex px-3 py-2 mt-2 text-center bg-white border border-gray-300 rounded-md shadow-sm hover:bg-slate-100 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </label>
          <button
            onClick={handleCalculateInstallments}
            className="flex px-4 py-2 mx-auto mt-3 text-center text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
          >
            Hesapla
          </button>
        </div>
        {installments.length > 0 && (
          <div className="mt-6 text-center details">
            <h2 className="py-3 mb-4 text-xl font-bold text-gray-700 border border-blue-400 rounded-2xl">
              Hesaplama Sonuçları
            </h2>
            <table className="w-full border border-collapse border-gray-300 table-auto">
              <thead>
                <tr className="bg-gray-200">
                  <th className="px-4 py-2 border border-gray-300">
                    Taksit Sayısı
                  </th>
                  <th className="px-4 py-2 border border-gray-300">
                    Aylık Taksit
                  </th>
                  <th className="px-4 py-2 border border-gray-300">
                    Toplam Tutar
                  </th>
                </tr>
              </thead>
              <tbody>
                {installments.map(({ month, totalAmount, monthlyPayment }) => (
                  <tr key={month} className="hover:bg-gray-100">
                    <td className="px-4 py-2 border border-gray-300">
                      {month === "1" ? "Peşin" : `${month} Ay`}
                    </td>
                    <td className="px-4 py-2 border border-gray-300">
                      {formatCurrency(monthlyPayment)} ₺
                    </td>
                    <td className="px-4 py-2 border border-gray-300">
                      {formatCurrency(totalAmount)} ₺
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  );
};

// Taksit hesaplama oranları
const installmentRates = {
  1: 1.0372,
  2: 1.0783,
  3: 1.1005,
  4: 1.1236,
  5: 1.1476,
  6: 1.1727,
  7: 1.199,
  8: 1.2265,
  9: 1.2553,
  10: 1.2855,
  11: 1.3172,
  12: 1.3504,
};

export default App;
