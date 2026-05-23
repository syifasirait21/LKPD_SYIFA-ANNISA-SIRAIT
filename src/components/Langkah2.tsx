import React, { useState } from "react";
import { 
  Users, 
  HelpCircle, 
  ChevronRight, 
  ChevronLeft, 
  Check, 
  Plus, 
  ArrowRightLeft, 
  Trash2, 
  Sparkles,
  CloudRain, 
  Waves, 
  Mountain, 
  Droplets, 
  Trees, 
  Home, 
  Grid, 
  Signpost, 
  UserX 
} from "lucide-react";
import { WorkbookState, FactItem } from "../types";
import { FACTS_LIST } from "../data";

interface LangkahProp {
  state: WorkbookState;
  onChange: (updater: (draft: WorkbookState) => void) => void;
  onNext: () => void;
  onPrev: () => void;
}

function getIconComponent(iconName: string) {
  switch(iconName) {
    case "CloudRain": return CloudRain;
    case "Waves": return Waves;
    case "Trash2": return Trash2;
    case "Mountain": return Mountain;
    case "Droplets": return Droplets;
    case "Trees": return Trees;
    case "Home": return Home;
    case "Grid": return Grid;
    case "Signpost": return Signpost;
    case "UserX": return UserX;
    default: return HelpCircle;
  }
}

export default function Langkah2({ state, onChange, onNext, onPrev }: LangkahProp) {
  const [subPage, setSubPage] = useState<1 | 2 | 3>(1);
  const selectedFactsSet = new Set(state.langkah2.selectedFacts);

  // Toggle selecting a fact
  const handleToggleFact = (factId: string) => {
    onChange((draft) => {
      const idx = draft.langkah2.selectedFacts.indexOf(factId);
      if (idx > -1) {
        draft.langkah2.selectedFacts.splice(idx, 1);
        // Also remove from categorizations if deselected
        draft.langkah2.categorization.alami = draft.langkah2.categorization.alami.filter(id => id !== factId);
        draft.langkah2.categorization.manusia = draft.langkah2.categorization.manusia.filter(id => id !== factId);
      } else {
        draft.langkah2.selectedFacts.push(factId);
        // Default assignment helper
        const isAlami = ["hujan_deras", "sungai_meluap", "lereng_terjal", "tanah_jenuh"].includes(factId);
        if (isAlami) {
          draft.langkah2.categorization.alami.push(factId);
        } else {
          draft.langkah2.categorization.manusia.push(factId);
        }
      }
    });
  };

  // Switch category of an assigned pill
  const handleToggleCategory = (factId: string, currentCat: "alami" | "manusia") => {
    onChange((draft) => {
      if (currentCat === "alami") {
        draft.langkah2.categorization.alami = draft.langkah2.categorization.alami.filter(id => id !== factId);
        if (!draft.langkah2.categorization.manusia.includes(factId)) {
          draft.langkah2.categorization.manusia.push(factId);
        }
      } else {
        draft.langkah2.categorization.manusia = draft.langkah2.categorization.manusia.filter(id => id !== factId);
        if (!draft.langkah2.categorization.alami.includes(factId)) {
          draft.langkah2.categorization.alami.push(factId);
        }
      }
    });
  };

  const updateThingsToLearn = (index: number, val: string) => {
    onChange((draft) => {
      draft.langkah2.thingsToLearn[index] = val;
    });
  };

  return (
    <div className="space-y-6">
      {/* Step Header Badge */}
      <div className="flex items-center justify-end">
        <div className="flex items-center space-x-1 text-slate-500 text-xs font-medium">
          <Users className="w-3.5 h-3.5 text-blue-500" />
          <span>Sintaks PBL</span>
        </div>
      </div>

      {/* Main Title */}
      <div className="space-y-2">
        <h2 className="text-2xl font-black text-slate-800 tracking-tight leading-tight uppercase">
          {subPage === 1 
            ? "Mengorganisasikan Siswa" 
            : subPage === 2 
              ? "Klasifikasi Akar Penyebab Masalah" 
              : "Rencana Pembelajaran Kelompok"}
        </h2>
        <p className="text-slate-600 text-sm">
          {subPage === 1 
            ? "Mari berdiskusi mengidentifikasi fakta penting dari kasus bencana!"
            : subPage === 2 
              ? "Petakan akar penyebab masalah bencana ke kategori Alami vs Aktivitas Manusia."
              : "Tentukan 4 fokus pembelajaran utama kelompok Anda berdasarkan hasil temuan sains."}
        </p>
      </div>

      {subPage === 1 ? (
        <div className="space-y-6 animate-fade-in">
          {/* SECTION A: Identifikasi Informasi Penting */}
          <div className="space-y-4">
            <div className="bg-emerald-600 text-white font-extrabold text-xs uppercase px-4 py-2.5 rounded-xl shadow-sm tracking-wider flex items-center justify-between">
              <span>A. Identifikasi Informasi Penting</span>
              <span className="text-[10px] bg-emerald-800 text-white border border-emerald-500 rounded px-2 font-mono">10 Faktor</span>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed italic px-1">
              Pilihlah informasi/faktor penting dari kasus di Langkah 1 yang berhubungan dengan pemicu banjir di Aceh (klik kartu untuk berkontribusi):
            </p>

            {/* Checkbox Grid */}
            <div className="grid grid-cols-2 gap-3">
              {FACTS_LIST.map((item) => {
                const IconC = getIconComponent(item.icon);
                const isSelected = selectedFactsSet.has(item.id);

                return (
                  <button
                    key={item.id}
                    id={`fact-card-${item.id}`}
                    onClick={() => handleToggleFact(item.id)}
                    className={`text-left p-2.5 rounded-xl border transition-all duration-300 relative flex flex-col justify-between h-32 select-none group focus:outline-none ${
                      isSelected 
                        ? "bg-slate-900 border-emerald-500 text-white shadow-md scale-[1.01]" 
                        : "bg-white border-slate-200 text-slate-700 hover:border-slate-300 hover:bg-slate-55"
                    }`}
                  >
                    {/* Upper row: icon and check bubble */}
                    <div className="flex items-start justify-between w-full">
                      <div className={`p-1.5 rounded-lg transition-colors ${isSelected ? 'bg-emerald-500/10 text-emerald-400' : 'bg-slate-100 text-slate-500 group-hover:bg-slate-200/50'}`}>
                        <IconC className="w-4.5 h-4.5" />
                      </div>
                      
                      <div className={`w-5 h-5 rounded-full flex items-center justify-center border transition-all ${
                        isSelected 
                          ? "bg-emerald-500 border-emerald-400 text-slate-900 scale-110" 
                          : "border-slate-300 bg-white"
                      }`}>
                        {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                      </div>
                    </div>

                    {/* Bottom text */}
                    <div className="space-y-0.5 mt-2">
                      <p className={`text-[11px] font-black leading-tight tracking-wide ${isSelected ? 'text-white' : 'text-slate-800'}`}>
                        {item.label}
                      </p>
                      <p className={`text-[9px] line-clamp-2 leading-tight ${isSelected ? 'text-slate-400' : 'text-slate-500'}`}>
                        {item.desc}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Additional info textbox */}
            <div className="space-y-1.5 bg-slate-50 p-3 rounded-xl border border-slate-220">
              <label className="text-[11px] font-black tracking-wide text-slate-700 block">
                ✍️ Temuan atau informasi penting tambahan kelolaan mandiri:
              </label>
              <textarea
                value={state.langkah2.additionalInfo}
                onChange={(e) => onChange((draft) => { draft.langkah2.additionalInfo = e.target.value; })}
                placeholder="Ketik informasi penting lainnya yang ditemukan tim..."
                rows={2}
                className="w-full text-xs p-2.5 border border-slate-250 bg-white rounded-lg focus:ring-2 focus:ring-blue-400 outline-none transition-all font-mono text-slate-800"
              />
            </div>
          </div>

          {/* Bottom Actions for Subpage 1 */}
          <div className="flex items-center justify-between pt-2">
            <button
              onClick={onPrev}
              className="flex items-center space-x-1 border border-slate-300 bg-white hover:bg-slate-50 text-slate-600 active:scale-95 font-bold text-xs uppercase px-4 py-2.5 rounded-xl transition-all cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Kembali</span>
            </button>

            <button
              onClick={() => setSubPage(2)}
              className="flex items-center space-x-1.5 bg-slate-900 hover:bg-slate-800 active:scale-95 text-white font-extrabold text-xs tracking-wider uppercase px-5 py-3 rounded-xl shadow transition-all cursor-pointer"
            >
              <span>Lanjut</span>
              <ChevronRight className="w-4 h-4 text-emerald-400" />
            </button>
          </div>
        </div>
      ) : subPage === 2 ? (
        <div className="space-y-6 animate-fade-in">
          {/* SECTION B: Kelompokkan Penyebab */}
          <div className="space-y-4">
            <div className="bg-indigo-600 text-white font-extrabold text-xs uppercase px-4 py-2.5 rounded-xl shadow-sm tracking-wider flex items-center justify-between">
              <span>B. Pengelompokan Penyebab Masalah</span>
              <ArrowRightLeft className="w-4 h-4 text-indigo-300" />
            </div>

            <p className="text-xs text-slate-600 leading-normal italic px-1">
              Faktor yang Anda centang otomatis masuk ke klasifikasi awal. Klik ikon tukar <span className="font-bold">⇄</span> untuk mengalihkan pemetaan kategorinya:
            </p>

            {state.langkah2.selectedFacts.length === 0 ? (
              <div className="border-2 border-dashed border-slate-200 rounded-xl p-6 text-center text-xs text-slate-400 font-medium bg-white">
                ⚠️ Belum ada informasi terpilih. Silakan kembali ke Halaman 1 untuk mencentang faktor penting terlebih dahulu.
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-3.5">
                {/* Natural Causes Area */}
                <div className="bg-emerald-500/5 hover:bg-emerald-500/10 transition-colors border-2 border-dashed border-emerald-200 rounded-2xl p-3 flex flex-col min-h-[22rem] justify-between">
                  <div>
                    <span className="text-[10px] font-black uppercase tracking-wider text-emerald-700 bg-emerald-100 border border-emerald-300 py-1 px-2.5 rounded-full block text-center mb-3">
                      🌳 Penyebab Alami
                    </span>
                    <div className="space-y-1.5 pr-1">
                      {state.langkah2.categorization.alami.map((factId) => {
                        const factObj = FACTS_LIST.find(f => f.id === factId);
                        if (!factObj) return null;
                        return (
                          <div 
                            key={factId} 
                            className="bg-emerald-600/10 border border-emerald-500/20 text-emerald-800 rounded-lg p-2 flex items-center justify-between text-[11px] font-bold fill-white shadow-xs"
                          >
                            <span className="truncate pr-1">{factObj.label}</span>
                            <button
                              onClick={() => handleToggleCategory(factId, "alami")}
                              className="p-1 hover:bg-emerald-500/20 text-emerald-600 hover:text-emerald-800 rounded transition-colors flex-shrink-0 cursor-pointer"
                              title="Pindahkan ke Penyebab Manusia"
                            >
                              <ArrowRightLeft className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        );
                      })}
                      {state.langkah2.categorization.alami.length === 0 && (
                        <p className="text-[10px] text-slate-450 italic text-center py-6">Klik tukar untuk mengisi...</p>
                      )}
                    </div>
                  </div>
                  <span className="text-[9px] text-slate-400 text-center font-semibold mt-2 pt-2 border-t border-emerald-100/40">Sifat murni alamiah / geologis</span>
                </div>

                {/* Human Causes Area */}
                <div className="bg-red-500/5 hover:bg-red-500/10 transition-colors border-2 border-dashed border-red-200 rounded-2xl p-3 flex flex-col min-h-[22rem] justify-between">
                  <div>
                    <span className="text-[10px] font-black uppercase tracking-wider text-red-700 bg-red-100 border border-red-300 py-1 px-2.5 rounded-full block text-center mb-3">
                      👷 Penyebab Manusia
                    </span>
                    <div className="space-y-1.5 pr-1">
                      {state.langkah2.categorization.manusia.map((factId) => {
                        const factObj = FACTS_LIST.find(f => f.id === factId);
                        if (!factObj) return null;
                        return (
                          <div 
                            key={factId} 
                            className="bg-red-600/10 border border-red-500/20 text-red-800 rounded-lg p-2 flex items-center justify-between text-[11px] font-bold shadow-xs"
                          >
                            <span className="truncate pr-1">{factObj.label}</span>
                            <button
                              onClick={() => handleToggleCategory(factId, "manusia")}
                              className="p-1 hover:bg-red-500/20 text-red-600 hover:text-red-800 rounded transition-colors flex-shrink-0 cursor-pointer"
                              title="Pindahkan ke Penyebab Alami"
                            >
                              <ArrowRightLeft className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        );
                      })}
                      {state.langkah2.categorization.manusia.length === 0 && (
                        <p className="text-[10px] text-slate-450 italic text-center py-6">Klik tukar untuk mengisi...</p>
                      )}
                    </div>
                  </div>
                  <span className="text-[9px] text-slate-400 text-center font-semibold mt-2 pt-2 border-t border-red-100/40">Ulah antropogenik / aktivitas sosial</span>
                </div>
              </div>
            )}
          </div>

          {/* Bottom Actions for Subpage 2 */}
          <div className="flex items-center justify-between pt-4">
            <button
              onClick={() => setSubPage(1)}
              className="flex items-center space-x-1 border border-slate-300 bg-white hover:bg-slate-55 text-slate-600 active:scale-95 font-bold text-xs uppercase px-4 py-2.5 rounded-xl transition-all cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Kembali</span>
            </button>

            <button
              onClick={() => setSubPage(3)}
              className="flex items-center space-x-1.5 bg-slate-900 hover:bg-slate-800 active:scale-95 text-white font-extrabold text-xs tracking-wider uppercase px-5 py-3 rounded-xl shadow transition-all cursor-pointer"
            >
              <span>Lanjut</span>
              <ChevronRight className="w-4 h-4 text-emerald-400" />
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-6 animate-fade-in">
          {/* SECTION C: Tentukan hal yang perlu dipelajari */}
          <div className="space-y-4">
            <div className="bg-amber-600 text-white font-extrabold text-xs uppercase px-4 py-2.5 rounded-xl shadow-sm tracking-wider flex items-center justify-between animate-pulse">
              <span>C. Tentukan Hal yang Perlu Dipelajari</span>
              <Sparkles className="w-4 h-4 text-amber-200" />
            </div>

            <p className="text-xs text-slate-600 leading-normal italic px-1">
              Asosiasikan hasil temuan di atas menjadi rencana studi. Tuliskan 4 fokus pembelajaran utama kelompok Anda:
            </p>

            <div className="space-y-3 bg-white p-4 border border-slate-200 rounded-2xl shadow-sm">
              {state.langkah2.thingsToLearn.map((val, idx) => (
                <div key={idx} className="flex items-center space-x-3">
                  <span className="w-7 h-7 rounded-full bg-slate-900 text-white text-xs font-black flex items-center justify-center flex-shrink-0 font-mono">
                    {idx + 1}
                  </span>
                  <input
                    type="text"
                    value={val}
                    onChange={(e) => updateThingsToLearn(idx, e.target.value)}
                    placeholder={`Fokus studi ${idx + 1}. misal: Hubungan curah hujan tinggi dengan kapasitas serapan lereng`}
                    className="flex-1 text-xs px-3.5 py-3.5 border border-slate-250 rounded-xl bg-slate-50 outline-none focus:bg-white focus:ring-2 focus:ring-blue-400 font-semibold font-sans text-slate-850"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Actions for Subpage 3 */}
          <div className="flex items-center justify-between pt-2">
            <button
              onClick={() => setSubPage(2)}
              className="flex items-center space-x-1 border border-slate-300 bg-white hover:bg-slate-55 text-slate-600 active:scale-95 font-bold text-xs uppercase px-4 py-2.5 rounded-xl transition-all cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Kembali</span>
            </button>

            <button
              onClick={onNext}
              className="flex items-center space-x-1.5 bg-slate-900 hover:bg-slate-800 active:scale-95 text-white font-extrabold text-xs tracking-wider uppercase px-5 py-3 rounded-xl shadow transition-all cursor-pointer"
            >
              <span>Lanjut</span>
              <ChevronRight className="w-4 h-4 text-emerald-400" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
