import { SalaryStructure, PayrollPreview } from '../types/staffAndJobs';

export const MOCK_SALARY_STRUCTURES: Record<string, SalaryStructure> = {
  '1': {
    staffId: '1',
    baseSalaryOrStipend: 120000,
    allowances: { conveyance: 15000, medical: 10000, mobile: 5000 },
    deductions: { tax: 12000, providentFund: 10000 },
    effectiveDate: '2024-01-01',
    paymentMethod: 'Bank Transfer (EFT)',
  },
  '2': {
    staffId: '2',
    baseSalaryOrStipend: 65000,
    allowances: { conveyance: 6000, medical: 4000, mobile: 2000 },
    deductions: { tax: 5000, providentFund: 6500 },
    effectiveDate: '2025-03-15',
    paymentMethod: 'Bank Transfer (EFT)',
  },
  '3': {
    staffId: '3',
    baseSalaryOrStipend: 45000,
    allowances: { conveyance: 4000, medical: 3000, mobile: 1000 },
    deductions: { tax: 2000, providentFund: 4500 },
    effectiveDate: '2025-11-01',
    paymentMethod: 'Bank Transfer (EFT)',
  },
  '4': {
    staffId: '4',
    baseSalaryOrStipend: 15000,
    allowances: { conveyance: 2000, medical: 1000, mobile: 500 },
    deductions: { tax: 0, providentFund: 0 },
    effectiveDate: '2023-01-10',
    paymentMethod: 'Bank Account Deposit',
  },
  '5': {
    staffId: '5',
    baseSalaryOrStipend: 15000,
    allowances: { conveyance: 2000, medical: 1000, mobile: 500 },
    deductions: { tax: 0, providentFund: 0 },
    effectiveDate: '2023-05-20',
    paymentMethod: 'Bank Account Deposit',
  },
};

export const MOCK_PAYROLL_PREVIEWS: PayrollPreview[] = [
  {
    id: 'pr-1',
    staffId: '2',
    staffName: 'Kabir Hasan',
    role: 'Manager',
    baseSalaryOrStipend: 65000,
    allowances: 12000, // 6k + 4k + 2k
    deductions: 11500, // 5k + 6.5k
    netPayPreview: 65500, // 65000 + 12000 - 11500
    paymentStatus: 'Prepared',
    period: 'July 2026',
  },
  {
    id: 'pr-2',
    staffId: '3',
    staffName: 'Nusrat Jahan',
    role: 'Senior',
    baseSalaryOrStipend: 45000,
    allowances: 8000,
    deductions: 6500,
    netPayPreview: 46500,
    paymentStatus: 'Prepared',
    period: 'July 2026',
  },
  {
    id: 'pr-3',
    staffId: '4',
    staffName: 'Sajid Ahmed',
    role: 'Article Student',
    baseSalaryOrStipend: 15000,
    allowances: 3500,
    deductions: 0,
    netPayPreview: 18500,
    paymentStatus: 'Draft',
    period: 'July 2026',
  },
  {
    id: 'pr-4',
    staffId: '5',
    staffName: 'Tahmid Rahman',
    role: 'Article Student',
    baseSalaryOrStipend: 15000,
    allowances: 3500,
    deductions: 0,
    netPayPreview: 18500,
    paymentStatus: 'Draft',
    period: 'July 2026',
  }
];
