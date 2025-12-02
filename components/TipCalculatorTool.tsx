
import React, { useState, useMemo } from 'react';
import { calculateTotals } from '../utils/TipMath';
import { RoundingOption } from '../types';

const TipCalculatorTool: React.FC = () => {
  const [bill, setBill] = useState<string>('');
  const [tipPercent, setTipPercent] = useState<number>(18);
  const [customTip, setCustomTip] = useState<string>('');
  const [people, setPeople] = useState<string>('1');
  const [rounding, setRounding] = useState<RoundingOption>(RoundingOption.NONE);

  const handleBillChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBill(e.target.value.replace(/[^0-9.]/g, ''));
  };

  const handlePeopleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPeople(e.target.value.replace(/[^0-9]/g, ''));
  };
  
  const handleCustomTipChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCustomTip(e.target.value.replace(/[^0-9.]/g, ''));
    setTipPercent(0);
  };
  
  const selectTip = (percentage: number) => {
    setTipPercent(percentage);
    setCustomTip('');
  };

  const currentTipPercent = customTip ? parseFloat(customTip) || 0 : tipPercent;

  const { tipAmount, totalBill, perPerson } = useMemo(() => {
    const billNum = parseFloat(bill) || 0;
    const peopleNum = parseInt(people, 10) || 1;
    return calculateTotals({ bill: billNum, tipPercent: currentTipPercent, people: peopleNum, rounding });
  }, [bill, currentTipPercent, people, rounding]);
  
  const formatCurrency = (value: number) => {
      return isNaN(value) || !isFinite(value) ? '0.00' : value.toFixed(2);
  };

  return (
    <div className="w-full max-w-4xl bg-gray-900/60 backdrop-blur-md rounded-3xl shadow-2xl border border-white/10 p-6 md:p-10 relative overflow-hidden">
      {/* Decorative Glow */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-64 h-64 bg-pink-500/20 rounded-full blur-3xl pointer-events-none"></div>

      <div className="text-center mb-10 relative z-10">
        <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight">
            Bill Splitter
        </h1>
        <p className="text-purple-200 mt-3 text-lg font-light">Precision finance for your dining experience.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 md:gap-12 relative z-10">
        {/* Left Side - Inputs */}
        <div className="space-y-8">
          <div className="group">
            <label className="block text-sm font-bold text-purple-300 uppercase tracking-wider mb-2">Bill Amount</label>
            <div className="relative transform transition-transform duration-300 group-focus-within:scale-105">
              <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-purple-400 text-2xl font-light">$</span>
              <input 
                type="text"
                inputMode="decimal"
                value={bill}
                onChange={handleBillChange}
                placeholder="0.00"
                className="w-full bg-gray-800/80 border border-gray-600 rounded-xl py-4 pl-10 pr-4 text-3xl font-bold text-white placeholder-gray-600 focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition shadow-inner"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-bold text-purple-300 uppercase tracking-wider mb-3">Select Tip %</label>
            <div className="grid grid-cols-4 gap-3">
              {[15, 18, 20].map(p => (
                <button 
                    key={p} 
                    onClick={() => selectTip(p)} 
                    className={`py-3 rounded-xl font-bold text-lg transition-all transform active:scale-95 ${tipPercent === p && !customTip ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-500/30' : 'bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white'}`}
                >
                    {p}%
                </button>
              ))}
              <input 
                type="text"
                inputMode="decimal"
                value={customTip}
                onChange={handleCustomTipChange}
                placeholder="Custom"
                className={`w-full bg-gray-800 border text-center rounded-xl py-3 px-1 font-bold text-lg transition focus:outline-none ${customTip ? 'border-purple-500 ring-2 ring-purple-500 text-white' : 'border-gray-600 text-gray-300'}`}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-purple-300 uppercase tracking-wider mb-2">Split Count</label>
            <div className="relative flex items-center">
                 <button onClick={() => setPeople(Math.max(1, (parseInt(people) || 0) - 1).toString())} className="absolute left-0 w-12 h-full bg-gray-700 hover:bg-gray-600 rounded-l-xl text-white text-xl font-bold transition">-</button>
                 <input 
                  type="text"
                  inputMode="numeric"
                  value={people}
                  onChange={handlePeopleChange}
                  className="w-full bg-gray-800/80 border border-gray-600 rounded-xl py-4 px-12 text-center text-2xl font-bold text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition"
                />
                 <button onClick={() => setPeople(((parseInt(people) || 0) + 1).toString())} className="absolute right-0 w-12 h-full bg-gray-700 hover:bg-gray-600 rounded-r-xl text-white text-xl font-bold transition">+</button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-purple-300 uppercase tracking-wider mb-3">Rounding</label>
            <div className="flex bg-gray-800 p-1 rounded-xl">
                {[
                    { label: 'None', value: RoundingOption.NONE },
                    { label: 'Up', value: RoundingOption.UP },
                    { label: 'Down', value: RoundingOption.DOWN }
                ].map((opt) => (
                    <button 
                        key={opt.label}
                        onClick={() => setRounding(opt.value)} 
                        className={`flex-1 py-2 rounded-lg font-medium text-sm transition-all ${rounding === opt.value ? 'bg-gray-700 text-white shadow' : 'text-gray-400 hover:text-white'}`}
                    >
                        {opt.label}
                    </button>
                ))}
            </div>
          </div>
        </div>

        {/* Right Side - Outputs */}
        <div className="bg-gradient-to-br from-indigo-900/80 to-purple-900/80 rounded-2xl p-8 flex flex-col justify-between space-y-8 border border-white/5 shadow-inner relative overflow-hidden">
            {/* Glossy overlay effect */}
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-white/5 to-transparent pointer-events-none"></div>
            
          <div className="space-y-6 relative z-10">
            <div className="flex justify-between items-end">
              <div>
                  <span className="text-gray-300 text-sm font-medium uppercase tracking-wider">Tip Amount</span>
                  <p className="text-xs text-purple-300">Total gratuity</p>
              </div>
              <span className="text-4xl font-bold text-white tracking-tight">${formatCurrency(tipAmount)}</span>
            </div>
            <div className="flex justify-between items-end">
                <div>
                  <span className="text-gray-300 text-sm font-medium uppercase tracking-wider">Total Bill</span>
                  <p className="text-xs text-purple-300">Including tip</p>
                </div>
              <span className="text-4xl font-bold text-white tracking-tight">${formatCurrency(totalBill)}</span>
            </div>
          </div>
          
          <div className="border-t border-purple-500/30 my-2"></div>
          
          <div className="flex-grow flex flex-col justify-end relative z-10">
              <span className="text-gray-300 text-lg mb-2 text-center font-medium">Amount Per Person</span>
              <div className="flex items-center justify-center">
                  <span className="text-6xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-orange-400 to-red-400 drop-shadow-lg">
                    ${formatCurrency(perPerson)}
                  </span>
              </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TipCalculatorTool;
