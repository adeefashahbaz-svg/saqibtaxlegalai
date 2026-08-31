import React, { useState } from 'react';
import { 
  Search, 
  ShieldCheck, 
  AlertTriangle, 
  Tag, 
  Building, 
  Percent, 
  Info, 
  ArrowRight,
  CheckCircle2,
  FileSpreadsheet
} from 'lucide-react';
import { SALES_TAX_SCHEDULE_DATABASE, ATL_RATES_DATABASE } from '../utils/taxEngine';
import { SalesTaxItem, ATLRateItem } from '../types';

export const SalesTaxDirectoryView: React.FC = () => {
  const [activeSubTab, setActiveSubTab] = useState<'atl' | 'sales_tax'>('atl');
  const [searchQuery, setSearchQuery] = useState('');
  const [scheduleFilter, setScheduleFilter] = useState<string>('all');

  const filteredSalesTax = SALES_TAX_SCHEDULE_DATABASE.filter(item => {
    const matchesSearch = item.heading.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.conditions.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSchedule = scheduleFilter === 'all' || item.schedule === scheduleFilter;
    return matchesSearch && matchesSchedule;
  });

  const filteredATL = ATL_RATES_DATABASE.filter(item => {
    return item.section.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.natureOfTransaction.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.notes.toLowerCase().includes(searchQuery.toLowerCase());
  });

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 space-y-6">
      
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-900 via-emerald-950 to-slate-900 rounded-2xl p-6 text-white shadow-lg border border-emerald-900/40">
        <div className="flex items-center gap-2 mb-1.5">
          <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
            FBR Regulatory Directory & Schedules
          </span>
          <span className="text-xs text-slate-400">Sales Tax Act 1990 & Tenth Schedule ITO 2001</span>
        </div>
        <h1 className="text-2xl font-black tracking-tight flex items-center gap-2.5">
          <Search className="w-6 h-6 text-emerald-400" />
          <span>Active Taxpayer List (ATL) & Sales Tax Directory</span>
        </h1>
        <p className="text-xs text-slate-300 mt-1 max-w-3xl">
          Quickly verify legal tax withholding rates for Filers vs Non-Filers and cross-reference Sixth, Eighth, and Third Schedule sales tax exemptions.
        </p>

        {/* Tab Switcher */}
        <div className="flex items-center gap-2 mt-4">
          <button
            onClick={() => { setActiveSubTab('atl'); setSearchQuery(''); }}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
              activeSubTab === 'atl'
                ? 'bg-emerald-500 text-slate-950 shadow-md'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            <ShieldCheck className="w-4 h-4" />
            <span>ATL Filer vs Non-Filer Penal Surcharges</span>
          </button>

          <button
            onClick={() => { setActiveSubTab('sales_tax'); setSearchQuery(''); }}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
              activeSubTab === 'sales_tax'
                ? 'bg-emerald-500 text-slate-950 shadow-md'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            <Percent className="w-4 h-4" />
            <span>Sales Tax Schedules & Exemptions</span>
          </button>
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
        <div className="relative w-full sm:w-96">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={activeSubTab === 'atl' ? 'Search Section (e.g. 236K, property, cash, dividend)...' : 'Search commodity (e.g. food, medicine, IT, books)...'}
            className="w-full pl-10 pr-4 py-2 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none"
          />
        </div>

        {activeSubTab === 'sales_tax' && (
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <span className="text-xs font-bold text-slate-600">Schedule:</span>
            <select
              value={scheduleFilter}
              onChange={(e) => setScheduleFilter(e.target.value)}
              className="px-3 py-1.5 text-xs font-semibold border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none bg-white"
            >
              <option value="all">All Schedules</option>
              <option value="6th_schedule_exempt">6th Schedule (0% Exempt)</option>
              <option value="8th_schedule_reduced">8th Schedule (Reduced Rates)</option>
              <option value="3rd_schedule_retail">3rd Schedule (Printed MRP Goods)</option>
            </select>
          </div>
        )}
      </div>

      {/* ATL VIEW */}
      {activeSubTab === 'atl' && (
        <div className="space-y-4">
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 text-xs text-amber-900 flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold">Tenth Schedule Legal Mandate:</span> Under the Tenth Schedule of the Income Tax Ordinance 2001, any individual or enterprise not appearing on the active taxpayer list (ATL) is subject to 100% to 400% higher withholding tax deductions at source.
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="bg-slate-900 text-white font-bold">
                    <th className="py-3 px-4">Statutory Section</th>
                    <th className="py-3 px-4">Nature of Transaction</th>
                    <th className="py-3 px-4 text-emerald-400">Active Filer Rate</th>
                    <th className="py-3 px-4 text-red-400">Non-Filer Penal Rate</th>
                    <th className="py-3 px-4">Statutory Notes</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredATL.map((item, idx) => (
                    <tr key={idx} className="hover:bg-slate-50 transition">
                      <td className="py-3.5 px-4 font-bold text-slate-900 whitespace-nowrap">
                        {item.section}
                      </td>
                      <td className="py-3.5 px-4 font-semibold text-slate-800">
                        {item.natureOfTransaction}
                      </td>
                      <td className="py-3.5 px-4 font-bold text-emerald-700 bg-emerald-50/50">
                        {item.filerRate}
                      </td>
                      <td className="py-3.5 px-4 font-bold text-red-700 bg-red-50/50">
                        {item.nonFilerRate}
                      </td>
                      <td className="py-3.5 px-4 text-slate-600 max-w-xs text-[11px]">
                        {item.notes}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* SALES TAX VIEW */}
      {activeSubTab === 'sales_tax' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredSalesTax.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs hover:border-emerald-300 transition flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                    {item.schedule.replace(/_/g, ' ')}
                  </span>
                  <div className="text-xs font-black text-emerald-700">
                    Applicable: {item.applicableRate}
                  </div>
                </div>

                <h3 className="text-sm font-bold text-slate-900 mb-1.5">
                  {item.heading}
                </h3>
                <p className="text-xs text-slate-600 mb-3">
                  {item.description}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100 text-[11px] text-slate-500">
                <span className="font-semibold text-slate-700">Legal Criteria: </span>
                {item.conditions}
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
};
