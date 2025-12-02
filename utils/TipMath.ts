
import { RoundingOption } from '../types';

interface CalculationInputs {
  bill: number;
  tipPercent: number;
  people: number;
  rounding: RoundingOption;
}

interface CalculationOutputs {
  tipAmount: number;
  totalBill: number;
  perPerson: number;
  originalTotalBill: number;
}

export const calculateTotals = ({ bill, tipPercent, people, rounding }: CalculationInputs): CalculationOutputs => {
  if (bill < 0 || tipPercent < 0 || people < 1) {
    return { tipAmount: 0, totalBill: 0, perPerson: 0, originalTotalBill: 0 };
  }

  const tipAmount = bill * (tipPercent / 100);
  const originalTotalBill = bill + tipAmount;

  let finalTotalBill = originalTotalBill;

  if (rounding === RoundingOption.UP) {
    finalTotalBill = Math.ceil(originalTotalBill);
  } else if (rounding === RoundingOption.DOWN) {
    finalTotalBill = Math.floor(originalTotalBill);
  }

  const perPerson = finalTotalBill / people;

  return {
    tipAmount,
    totalBill: finalTotalBill,
    perPerson,
    originalTotalBill,
  };
};
