// App.js
import React, { useState } from "react";
import "./App.css";

const App = () => {
  const [amount, setAmount] = useState("");
  const [months, setMonths] = useState(1);
  const [installmentData, setInstallmentData] = useState(null);

  const handleCalculate = () => {
    if (amount && months) {
      const rate = installmentRates[months];
      const totalAmount = (amount * rate).toFixed(2);
      const monthlyPayment = (totalAmount / months).toFixed(2);
      setInstallmentData({ totalAmount, monthlyPayment });
    }
  };

  return (
    <div className="app bg-gray-100 min-h-screen flex flex-col items-center py-8">
      <header className="header text-center mb-6">
        <h1 className="text-3xl font-bold text-indigo-600">
          Kredi Kartı Taksit Hesaplama
        </h1>
      </header>
      <main className="main bg-white p-6 rounded-lg shadow-lg w-11/12 max-w-md">
        <InstallmentCalculator
          amount={amount}
          setAmount={setAmount}
          months={months}
          setMonths={setMonths}
          onCalculate={handleCalculate}
        />
        {installmentData && (
          <InstallmentDetails
            totalAmount={installmentData.totalAmount}
            monthlyPayment={installmentData.monthlyPayment}
            months={months}
          />
        )}
      </main>
    </div>
  );
};

const InstallmentCalculator = ({
  amount,
  setAmount,
  months,
  setMonths,
  onCalculate,
}) => (
  <div className="calculator space-y-4">
    <label className="block">
      <span className="text-gray-700">Alışveriş Tutarı (TL):</span>
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Tutarı giriniz"
        className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
      />
    </label>
    <label className="block">
      <span className="text-gray-700">Taksit Sayısı:</span>
      <select
        value={months}
        onChange={(e) => setMonths(Number(e.target.value))}
        className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
      >
        <option value={1}>Peşin</option>
        {Object.keys(installmentRates).map(
          (month) =>
            month > 1 && (
              <option key={month} value={month}>
                {month} Ay
              </option>
            )
        )}
      </select>
    </label>
    <button
      onClick={onCalculate}
      className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg shadow hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
    >
      Hesapla
    </button>
  </div>
);

const InstallmentDetails = ({ totalAmount, monthlyPayment, months }) => (
  <div className="details mt-6 text-center">
    <h2 className="text-xl font-bold border border-blue-400 rounded-2xl py-3 text-gray-700 mb-4">
      Hesaplama Sonucu
    </h2>
    <p className="text-gray-600 border bg-blue-100 cursor-default hover:bg-blue-300 border-blue-400 rounded-2xl py-3 mb-2">
      Toplam Tutar:{" "}
      <span className="font-bold text-indigo-600">{totalAmount} TL</span>
    </p>
    <p className="text-gray-600 border bg-blue-100 cursor-default hover:bg-blue-300 border-blue-400 rounded-2xl py-3 mb-4">
      Aylık Taksit:{" "}
      <span className="font-bold text-indigo-600">{monthlyPayment} TL</span>
    </p>
    <div className="tabs grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 ">
      {Array.from({ length: months }, (_, i) => (
        <div
          key={i}
          className="tab bg-slate-100 hover:bg-slate-300 cursor-default p-4 rounded-lg shadow"
        >
          <h3 className="text-gray-700 text-center font-medium">{i + 1}. Ay</h3>
          <p className="text-gray-600 text-center">{monthlyPayment} TL</p>
        </div>
      ))}
    </div>
  </div>
);

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
