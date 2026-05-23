import React, { useState } from "react";
import { 
  ChevronLeft, 
  ChevronRight,
  BarChart3, 
  Sparkles,
  Award,
  BookCheck,
  Check,
  ArrowRight,
  Info 
} from "lucide-react";
import { WorkbookState, EvaluasiRow, PerbaikanRow } from "../types";

interface LangkahProp {
  state: WorkbookState;
  onChange: (updater: (draft: WorkbookState) => void) => void;
  onPrev: () => void;
  onFinish: () => void;
}

export default function Langkah5({ state, onChange, onPrev, onFinish }: LangkahProp) {
  const [subPage, setSubPage] = useState<number>(1);
  const [evalTablePage, setEvalTablePage] = useState<1 | 2>(1);
  const [repairTablePage, setRepairTablePage] = useState<1 | 2>(1);

  // Handle rating modifications (increment / click or specific selection 1-4)
  const handleRatingChange = (rowIndex: number, criterion: keyof Omit<EvaluasiRow, "id" | "solusi">, score: number) => {
    onChange((draft) => {
      draft.langkah5.evaluasiBaris[rowIndex][criterion] = score;
    });
  };

  const handlePerbaikanChange = (rowIndex: number, column: keyof Omit<PerbaikanRow, "id">, value: string) => {
    onChange((draft) => {
      draft.langkah5.perbaikanSolusiBaris[rowIndex][column] = value;
    });
  };

  const handleRefleksiToggle = (key: keyof WorkbookState["langkah5"]["refleksiAkhir"]) => {
    onChange((draft) => {
      draft.langkah5.refleksiAkhir[key] = !draft.langkah5.refleksiAkhir[key];
    });
  };

  // Safe scroll to top on sub-page change
  React.useEffect(() => {
    const el = document.getElementById("langkah5-container");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  }, [subPage]);

  return (
    <div id="langkah5-container" className="space-y-6 text-slate-800">
      {/* Step Header Badge with Subpage Tabs */}
      <div className="flex items-center justify-between">
        {/* Simple Page Steps Indicator */}
        <div className="flex items-center space-x-2">
          <button 
            type="button"
            onClick={() => setSubPage(1)}
            className={`px-3 py-1 rounded-full text-[10px] sm:text-xs font-black uppercase tracking-wider transition-all cursor-pointer ${
              subPage === 1 
                ? "bg-purple-650 bg-indigo-600 text-white shadow" 
                : "bg-slate-100 text-slate-550 hover:bg-slate-200"
            }`}
          >
            Bagian A & B
          </button>
          <div className="w-4 h-0.5 bg-slate-300" />
          <button 
            type="button"
            onClick={() => setSubPage(2)}
            className={`px-3 py-1 rounded-full text-[10px] sm:text-xs font-black uppercase tracking-wider transition-all cursor-pointer ${
              subPage === 2 
                ? "bg-purple-650 bg-indigo-600 text-white shadow" 
                : "bg-slate-100 text-slate-555 hover:bg-slate-200"
            }`}
          >
            Bagian C & D
          </button>
        </div>

        <div className="flex items-center space-x-1 text-slate-500 text-xs font-medium">
          <BarChart3 className="w-3.5 h-3.5 text-rose-500" />
          <span>Sintaks PBL</span>
        </div>
      </div>

      {/* Main Title */}
      <div className="space-y-2">
        <h2 className="text-2xl font-black text-slate-800 tracking-tight leading-tight uppercase">
          Evaluasi Solusi Masalah {subPage === 1 ? "(Bagian 1/2)" : "(Bagian 2/2)"}
        </h2>
        <p className="text-slate-600 text-sm font-medium">
          {subPage === 1 
            ? "Langkah Pertama: Nilai tingkat kelayakan, efektivitas, dampak positif, dan keberlanjutan ide solusi kelompok Anda!"
            : "Langkah Kedua: Uraikan rencana perbaikan taktis pembenahan kelayakan serta laksanakan refleksi akhir kelompok!"}
        </p>
      </div>

      {/* ALL CONTENT IN A CONCISE COLLABORATIVE LIST FLOW */}
      <div className="space-y-6">
        
        {subPage === 1 && (
          <div className="space-y-6 animate-fade-in bg-transparent">
            {/* SECTION A: Evaluasi Solusi */}
            <div className="space-y-4">
              <div className="bg-emerald-600 text-white font-extrabold text-xs uppercase px-4 py-2.5 rounded-xl shadow-sm tracking-wider flex items-center justify-between">
                <span>A. Pengujian Kelayakan Gagasan Solusi</span>
                <span className="text-[10px] bg-emerald-800 text-white border border-emerald-500 rounded px-2 font-mono">Pola 1 - 4</span>
              </div>

              <p className="text-xs text-slate-600 italic px-1 leading-normal">
                Berikan penilaian kritis untuk setiap solusi yang diajukan. Ketuk angka skor <span className="font-bold">1 sampai 4</span> pada masing-masing kolom:
                <br />
                <span className="text-[10px] text-slate-500 font-mono">(Keterangan: 1 = Kurang | 2 = Cukup | 3 = Baik | 4 = Sangat Baik)</span>
              </p>

              {/* Table pagination controller */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 bg-slate-900 border border-slate-800 p-2 rounded-2xl shadow-inner text-white">
                <span className="text-[10px] font-mono font-black text-[#f43f5e] uppercase tracking-wider flex items-center space-x-1.5 px-1.5 py-0.5">
                  <span className="w-1.5 h-1.5 bg-[#f43f5e] rounded-full animate-pulse" />
                  <span>Pengujian Solusi: Halaman {evalTablePage} dari 2</span>
                </span>
                <div className="flex items-center bg-slate-950 p-1 border border-slate-800 rounded-xl space-x-1">
                  <button
                    type="button"
                    onClick={() => setEvalTablePage(1)}
                    className={`px-3 py-1.5 rounded-lg text-[9px] sm:text-[10px] tracking-wide font-black uppercase transition-all cursor-pointer ${
                      evalTablePage === 1
                        ? "bg-rose-500 text-white font-sans font-black shadow"
                        : "text-slate-400 hover:text-slate-200 hover:bg-slate-900"
                    }`}
                  >
                    Solusi Ke-1 & 2
                  </button>
                  <button
                    type="button"
                    onClick={() => setEvalTablePage(2)}
                    className={`px-3 py-1.5 rounded-lg text-[9px] sm:text-[10px] tracking-wide font-black uppercase transition-all cursor-pointer ${
                      evalTablePage === 2
                        ? "bg-rose-500 text-white font-sans font-black shadow"
                        : "text-slate-400 hover:text-slate-200 hover:bg-slate-900"
                    }`}
                  >
                    Solusi Ke-3 & 4
                  </button>
                </div>
              </div>

              {/* DESKTOP/TABLET LAYOUT: Compact Table */}
              <div className="hidden md:block overflow-x-auto border border-slate-200 rounded-2xl shadow-sm bg-white">
                <table className="w-full text-xs text-left border-collapse bg-white">
                  <thead className="bg-slate-900 text-[10px] font-black uppercase tracking-wider text-slate-200">
                    <tr>
                      <th className="p-3 border-r border-slate-800 w-[30%]">Solusi Diajukan</th>
                      <th className="p-2 border-r border-slate-800 text-center w-[17.5%]">Kelayakan</th>
                      <th className="p-2 border-r border-slate-800 text-center w-[17.5%]">Efektivitas</th>
                      <th className="p-2 border-r border-slate-800 text-center w-[17.5%]">Dampak (+)</th>
                      <th className="p-2 text-center w-[17.5%]">Keberlanjutan</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 font-mono">
                    {state.langkah5.evaluasiBaris
                      .map((row, idx) => ({ ...row, originalIndex: idx }))
                      .filter((_row, idx) => (evalTablePage === 1 ? idx < 2 : idx >= 2))
                      .map((row) => (
                        <tr key={row.id} className="hover:bg-slate-55 transition-colors text-slate-800 text-[11px] bg-white">
                          <td className="p-3 border-r border-slate-200 font-sans font-bold leading-tight">
                            {row.solusi}
                          </td>

                          {/* Kelayakan */}
                          <td className="p-2 border-r border-slate-200 text-center">
                            <div className="flex justify-center items-center space-x-1">
                              {[1, 2, 3, 4].map((num) => (
                                <button
                                  key={num}
                                  type="button"
                                  onClick={() => handleRatingChange(row.originalIndex, "kelayakan", num)}
                                  className={`w-5 h-5 rounded-md flex items-center justify-center font-bold text-[10px] transition-all cursor-pointer ${
                                    row.kelayakan === num 
                                      ? "bg-emerald-600 text-white font-extrabold scale-110 shadow-sm" 
                                      : "bg-slate-100 hover:bg-slate-200 text-slate-500"
                                  }`}
                                >
                                  {num}
                                </button>
                              ))}
                            </div>
                          </td>

                          {/* Efektivitas */}
                          <td className="p-2 border-r border-slate-200 text-center">
                            <div className="flex justify-center items-center space-x-1">
                              {[1, 2, 3, 4].map((num) => (
                                <button
                                  key={num}
                                  type="button"
                                  onClick={() => handleRatingChange(row.originalIndex, "efektivitas", num)}
                                  className={`w-5 h-5 rounded-md flex items-center justify-center font-bold text-[10px] transition-all cursor-pointer ${
                                    row.efektivitas === num 
                                      ? "bg-indigo-600 text-white font-extrabold scale-110 shadow-sm" 
                                      : "bg-slate-100 hover:bg-slate-200 text-slate-500"
                                  }`}
                                >
                                  {num}
                                </button>
                              ))}
                            </div>
                          </td>

                          {/* Dampak Positif */}
                          <td className="p-2 border-r border-slate-200 text-center">
                            <div className="flex justify-center items-center space-x-1">
                              {[1, 2, 3, 4].map((num) => (
                                <button
                                  key={num}
                                  type="button"
                                  onClick={() => handleRatingChange(row.originalIndex, "dampakPositif", num)}
                                  className={`w-5 h-5 rounded-md flex items-center justify-center font-bold text-[10px] transition-all cursor-pointer ${
                                    row.dampakPositif === num 
                                      ? "bg-amber-600 text-white font-extrabold scale-110 shadow-sm" 
                                      : "bg-slate-100 hover:bg-slate-200 text-slate-500"
                                  }`}
                                >
                                  {num}
                                </button>
                              ))}
                            </div>
                          </td>

                          {/* Keberlanjutan */}
                          <td className="p-2 text-center">
                            <div className="flex justify-center items-center space-x-1">
                              {[1, 2, 3, 4].map((num) => (
                                <button
                                  key={num}
                                  type="button"
                                  onClick={() => handleRatingChange(row.originalIndex, "keberlanjutan", num)}
                                  className={`w-5 h-5 rounded-md flex items-center justify-center font-bold text-[10px] transition-all cursor-pointer ${
                                    row.keberlanjutan === num 
                                      ? "bg-rose-600 text-white font-extrabold scale-110 shadow-sm" 
                                      : "bg-slate-100 hover:bg-slate-200 text-slate-500"
                                  }`}
                                >
                                  {num}
                                </button>
                              ))}
                            </div>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>

              {/* MOBILE LAYOUT */}
              <div className="block md:hidden space-y-4">
                {state.langkah5.evaluasiBaris
                  .map((row, idx) => ({ ...row, originalIndex: idx }))
                  .filter((_row, idx) => (evalTablePage === 1 ? idx < 2 : idx >= 2))
                  .map((row) => (
                    <div 
                      key={row.id} 
                      className="bg-white border border-slate-200 rounded-2xl p-4 space-y-3.5 shadow-sm animate-fade-in text-slate-800"
                    >
                      <div className="flex items-center space-x-2 bg-slate-900 text-[#f43f5e] px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest font-mono">
                        <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse" />
                        <span>SOLUSI: {row.solusi || "Belum Mengisi Tindakan"}</span>
                      </div>

                      {/* Criteria 1: Kelayakan */}
                      <div className="flex items-center justify-between border-b border-slate-100 pb-2.5 pt-1">
                        <span className="text-[11px] font-black tracking-wide text-slate-600 uppercase">
                          A. KELAYAKAN
                        </span>
                        <div className="flex space-x-1">
                          {[1, 2, 3, 4].map((num) => (
                            <button
                              key={num}
                              type="button"
                              onClick={() => handleRatingChange(row.originalIndex, "kelayakan", num)}
                              className={`w-7 h-7 rounded-lg flex items-center justify-center font-black text-xs transition-all cursor-pointer ${
                                row.kelayakan === num 
                                  ? "bg-[#10b981] text-white font-bold scale-110 shadow-sm" 
                                  : "bg-slate-100 hover:bg-slate-200 text-slate-500"
                              }`}
                            >
                              {num}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Criteria 2: Efektivitas */}
                      <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
                        <span className="text-[11px] font-black tracking-wide text-slate-600 uppercase">
                          B. EFEKTIVITAS
                        </span>
                        <div className="flex space-x-1">
                          {[1, 2, 3, 4].map((num) => (
                            <button
                              key={num}
                              type="button"
                              onClick={() => handleRatingChange(row.originalIndex, "efektivitas", num)}
                              className={`w-7 h-7 rounded-lg flex items-center justify-center font-black text-xs transition-all cursor-pointer ${
                                row.efektivitas === num 
                                  ? "bg-indigo-600 text-white font-bold scale-110 shadow-sm" 
                                  : "bg-slate-100 hover:bg-slate-200 text-slate-500"
                              }`}
                            >
                              {num}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Criteria 3: Dampak Positif */}
                      <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
                        <span className="text-[11px] font-black tracking-wide text-slate-600 uppercase">
                          C. DAMPAK POSITIF
                        </span>
                        <div className="flex space-x-1">
                          {[1, 2, 3, 4].map((num) => (
                            <button
                              key={num}
                              type="button"
                              onClick={() => handleRatingChange(row.originalIndex, "dampakPositif", num)}
                              className={`w-7 h-7 rounded-lg flex items-center justify-center font-black text-xs transition-all cursor-pointer ${
                                row.dampakPositif === num 
                                  ? "bg-amber-500 text-white font-bold scale-110 shadow-sm" 
                                  : "bg-slate-100 hover:bg-slate-200 text-slate-500"
                              }`}
                            >
                              {num}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Criteria 4: Keberlanjutan */}
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-black tracking-wide text-slate-600 uppercase">
                          D. KEBERLANJUTAN
                        </span>
                        <div className="flex space-x-1">
                          {[1, 2, 3, 4].map((num) => (
                            <button
                              key={num}
                              type="button"
                              onClick={() => handleRatingChange(row.originalIndex, "keberlanjutan", num)}
                              className={`w-7 h-7 rounded-lg flex items-center justify-center font-black text-xs transition-all cursor-pointer ${
                                row.keberlanjutan === num 
                                  ? "bg-rose-500 text-white font-bold scale-110 shadow-sm" 
                                  : "bg-slate-100 hover:bg-slate-200 text-slate-500"
                              }`}
                            >
                              {num}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>

            {/* SECTION B: Analisis Hasil Evaluasi */}
            <div className="space-y-4">
              <div className="bg-amber-500 text-slate-900 font-extrabold text-xs uppercase px-4 py-2.5 rounded-xl shadow-sm tracking-wider flex items-center justify-between">
                <span>B. Lembar Analisis Evaluasi Kelompok</span>
                <BookCheck className="w-4 h-4 fill-slate-900" />
              </div>

              <div className="space-y-4 bg-white p-4 border border-slate-200 rounded-2xl shadow-sm">
                <div className="space-y-1.5 bg-white">
                  <p className="text-xs font-black text-slate-800 flex items-start space-x-1 leading-tight">
                    <span>1. Solusi manakah yang mendapatkan skor tertinggi dari tabel kelayakan di atas? Mengapa?</span>
                  </p>
                  <textarea
                    value={state.langkah5.analisisTerbaik}
                    onChange={(e) => onChange((draft) => { draft.langkah5.analisisTerbaik = e.target.value; })}
                    placeholder="Contoh: Solusi reboisasi & pembersihan rutin karena memiliki efektivitas sangat tinggi mereduksi sumbatan..."
                    rows={2.5}
                    className="w-full text-xs p-3 border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-amber-400 outline-none rounded-xl transition-all font-mono text-slate-800"
                  />
                </div>

                <div className="space-y-1.5 bg-white">
                  <p className="text-xs font-black text-slate-800 flex items-start space-x-1 leading-tight">
                    <span>2. Apa kelebihan solusi pilihan tersebut dibandingkan alternatif lainnya?</span>
                  </p>
                  <textarea
                    value={state.langkah5.kelebihanSolusi}
                    onChange={(e) => onChange((draft) => { draft.langkah5.kelebihanSolusi = e.target.value; })}
                    placeholder="Contoh: Dapat memanfaatkan tenaga gotong-royong swadaya warga desa tanpa biaya mahal..."
                    rows={2.5}
                    className="w-full text-xs p-3 border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-amber-400 outline-none rounded-xl transition-all font-mono text-slate-800"
                  />
                </div>

                <div className="space-y-1.5 bg-white">
                  <p className="text-xs font-black text-slate-800 flex items-start space-x-1 leading-tight">
                    <span>3. Apa kelemahan solusi yang masih perlu diperbaiki agar benar-benar efektif meredam musibah?</span>
                  </p>
                  <textarea
                    value={state.langkah5.kelemahanSolusi}
                    onChange={(e) => onChange((draft) => { draft.langkah5.kelemahanSolusi = e.target.value; })}
                    placeholder="Contoh: Susahnya mengonsolidasikan komitmen kedisiplinan warga jangka panjang..."
                    rows={2.5}
                    className="w-full text-xs p-3 border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-amber-400 outline-none rounded-xl transition-all font-mono text-slate-800"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {subPage === 2 && (
          <div className="space-y-6 animate-fade-in bg-transparent">
            {/* SECTION C: Perbaikan Solusi */}
            <div className="space-y-4">
              <div className="bg-indigo-600 text-white font-extrabold text-xs uppercase px-4 py-2.5 rounded-xl tracking-wider flex items-center justify-between">
                <span>C. Lembar Rencana Perbaikan Masalah</span>
                <Sparkles className="w-4 h-4 text-amber-300" />
              </div>

              <p className="text-xs text-slate-600 italic px-1 leading-normal">
                Uraikan rencana penyempurnaan taktis terhadap kelemahan solusi yang terdeteksi sebelumnya:
              </p>

              {/* Table pagination controller */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 bg-slate-900 border border-slate-800 p-2 rounded-2xl shadow-inner text-white mb-2">
                <span className="text-[10px] font-mono font-black text-indigo-400 uppercase tracking-wider flex items-center space-x-1.5 px-1.5 py-0.5">
                  <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-pulse" />
                  <span>Rencana Perbaikan: Halaman {repairTablePage} dari 2</span>
                </span>
                <div className="flex items-center bg-slate-950 p-1 border border-slate-800 rounded-xl space-x-1">
                  <button
                    type="button"
                    onClick={() => setRepairTablePage(1)}
                    className={`px-3 py-1.5 rounded-lg text-[9px] sm:text-[10px] tracking-wide font-black uppercase transition-all cursor-pointer ${
                      repairTablePage === 1
                        ? "bg-indigo-600 text-white font-sans font-black shadow"
                        : "text-slate-400 hover:text-slate-200 hover:bg-slate-900"
                    }`}
                  >
                    Solusi Ke-1 & 2
                  </button>
                  <button
                    type="button"
                    onClick={() => setRepairTablePage(2)}
                    className={`px-3 py-1.5 rounded-lg text-[9px] sm:text-[10px] tracking-wide font-black uppercase transition-all cursor-pointer ${
                      repairTablePage === 2
                        ? "bg-indigo-600 text-white font-sans font-black shadow"
                        : "text-slate-400 hover:text-slate-200 hover:bg-slate-900"
                    }`}
                  >
                    Solusi Ke-3 & 4
                  </button>
                </div>
              </div>

              {/* DESKTOP/TABLET LAYOUT: Compact Table */}
              <div className="hidden md:block overflow-x-auto border border-slate-200 rounded-2xl shadow-sm bg-white">
                <table className="w-full text-xs text-left border-collapse bg-white">
                  <thead className="bg-slate-900 text-[10px] font-black uppercase tracking-wider text-slate-200">
                    <tr>
                      <th className="p-3 border-r border-slate-800 w-[24%]">Solusi Diperbaiki</th>
                      <th className="p-3 border-r border-slate-800 w-[24%]">Bagian Diperbaiki</th>
                      <th className="p-3 border-r border-slate-800 w-[24%]">Rencana Perbaikan</th>
                      <th className="p-3 border-r border-slate-800 w-[14%]">Alat & Bahan</th>
                      <th className="p-3 w-[14%]">Pelaksana</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 font-mono">
                    {state.langkah5.perbaikanSolusiBaris
                      .map((row, idx) => ({ ...row, originalIndex: idx }))
                      .filter((_row, idx) => (repairTablePage === 1 ? idx < 2 : idx >= 2))
                      .map((row) => (
                        <tr key={row.id} className="hover:bg-slate-50 transition-colors bg-white text-slate-800">
                          <td className="p-2 border-r border-slate-200">
                            <input
                              type="text"
                              value={row.solusiPerluDiperbaiki}
                              onChange={(e) => handlePerbaikanChange(row.originalIndex, "solusiPerluDiperbaiki", e.target.value)}
                              className="w-full text-[11px] p-1.5 border border-slate-200 rounded focus:ring-1 focus:ring-blue-400 bg-transparent font-sans font-bold text-slate-800 outline-none"
                            />
                          </td>

                          <td className="p-2 border-r border-slate-200">
                            <textarea
                              value={row.bagianPerluDiperbaiki}
                              onChange={(e) => handlePerbaikanChange(row.originalIndex, "bagianPerluDiperbaiki", e.target.value)}
                              rows={2.5}
                              className="w-full text-[11px] p-1 border border-transparent focus:border-blue-200 focus:bg-white rounded outline-none leading-relaxed resize-none text-slate-800 bg-white font-sans"
                            />
                          </td>

                          <td className="p-2 border-r border-slate-200 bg-white">
                            <textarea
                              value={row.rencanaPerbaikan}
                              onChange={(e) => handlePerbaikanChange(row.originalIndex, "rencanaPerbaikan", e.target.value)}
                              rows={2.5}
                              className="w-full text-[11px] p-1 border border-transparent focus:border-blue-200 focus:bg-white rounded outline-none leading-relaxed resize-none text-slate-800 font-sans"
                            />
                          </td>

                          <td className="p-2 border-r border-slate-200">
                            <input
                              type="text"
                              value={row.sumberDayaDibutuhkan}
                              onChange={(e) => handlePerbaikanChange(row.originalIndex, "sumberDayaDibutuhkan", e.target.value)}
                              className="w-full text-[11px] p-1 border border-slate-200 rounded focus:ring-1 focus:ring-blue-400 bg-transparent text-slate-800 outline-none font-sans"
                            />
                          </td>

                          <td className="p-2">
                            <input
                              type="text"
                              value={row.siapamelakukan}
                              onChange={(e) => handlePerbaikanChange(row.originalIndex, "siapamelakukan", e.target.value)}
                              className="w-full text-[11px] p-1 border border-slate-200 rounded focus:ring-1 focus:ring-blue-400 bg-transparent font-bold text-slate-800 outline-none font-sans"
                            />
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>

              {/* MOBILE LAYOUT */}
              <div className="block md:hidden space-y-4">
                {state.langkah5.perbaikanSolusiBaris
                  .map((row, idx) => ({ ...row, originalIndex: idx }))
                  .filter((_row, idx) => (repairTablePage === 1 ? idx < 2 : idx >= 2))
                  .map((row) => (
                    <div 
                      key={row.id} 
                      className="bg-white border border-slate-200 rounded-2xl p-4.5 space-y-3.5 shadow-sm animate-fade-in text-slate-800"
                    >
                      <div className="space-y-1 bg-white">
                        <label className="text-[10px] font-black uppercase text-slate-500 tracking-wider block">
                          🔧 Tindakan / Solusi Diperbaiki
                        </label>
                        <input
                          type="text"
                          value={row.solusiPerluDiperbaiki}
                          onChange={(e) => handlePerbaikanChange(row.originalIndex, "solusiPerluDiperbaiki", e.target.value)}
                          className="w-full text-xs px-3 py-2 border border-slate-200 focus:ring-1 focus:ring-indigo-500 focus:bg-white rounded-xl outline-none font-sans font-bold text-slate-800"
                          placeholder="Nama tindakan/solusi..."
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-2.5">
                        <div className="space-y-1">
                          <label className="text-[10px] font-black uppercase text-[#475569] tracking-wider block">
                            Alat & Bahan
                          </label>
                          <input
                            type="text"
                            value={row.sumberDayaDibutuhkan}
                            onChange={(e) => handlePerbaikanChange(row.originalIndex, "sumberDayaDibutuhkan", e.target.value)}
                            className="w-full text-[11px] px-3 py-2 border border-slate-200 bg-slate-50 focus:bg-white rounded-xl outline-none text-slate-800"
                            placeholder="e.g. Cangkul, Bibit pohon"
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="text-[10px] font-black uppercase text-[#475569] tracking-wider block">
                            Pelaksana
                          </label>
                          <input
                            type="text"
                            value={row.siapamelakukan}
                            onChange={(e) => handlePerbaikanChange(row.originalIndex, "siapamelakukan", e.target.value)}
                            className="w-full text-[11px] px-3 py-2 border border-slate-200 bg-slate-50 focus:bg-white rounded-xl outline-none text-slate-800 font-bold"
                            placeholder="e.g. Pengurus RT, Warga"
                          />
                        </div>
                      </div>

                      <div className="space-y-1 bg-white">
                        <label className="text-[10px] font-black uppercase text-[#475569] tracking-wider block">
                          ⚠️ Bagian Yang Perlu Disempurnakan
                        </label>
                        <textarea
                          value={row.bagianPerluDiperbaiki}
                          onChange={(e) => handlePerbaikanChange(row.originalIndex, "bagianPerluDiperbaiki", e.target.value)}
                          rows={2.5}
                          className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 focus:bg-white focus:ring-1 focus:ring-indigo-500 rounded-xl outline-none leading-relaxed resize-none text-slate-800 font-sans"
                          placeholder="Identifikasi bagian apa yang masih kurang optimal..."
                        />
                      </div>

                      <div className="space-y-1 bg-white">
                        <label className="text-[10px] font-black uppercase text-[#475569] tracking-wider block">
                          🚀 Rencana Tindakan Perbaikan Nyata
                        </label>
                        <textarea
                          value={row.rencanaPerbaikan}
                          onChange={(e) => handlePerbaikanChange(row.originalIndex, "rencanaPerbaikan", e.target.value)}
                          rows={2.5}
                          className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 focus:bg-white focus:ring-1 focus:ring-indigo-500 rounded-xl outline-none leading-relaxed resize-none text-slate-800 font-sans"
                          placeholder="Uraikan strategi konkret penyempurnaan..."
                        />
                      </div>
                    </div>
                  ))}
              </div>
            </div>

            {/* SECTION D: REFLEKSI AKHIR SISWA & BPBD success badge */}
            <div className="space-y-4">
              <div className="bg-purple-55 border border-purple-200 rounded-2xl p-4 bg-purple-50">
                <span className="text-xs font-black tracking-wide text-purple-900 uppercase block mb-1">
                  ⭐ D. REFLEKSI AKHIR SISWA (Kebanggaan & komitmen)
                </span>
                <div className="space-y-2 text-slate-800 text-[11px] select-none font-medium">
                  {/* Reflect item 1 */}
                  <button
                    type="button"
                    onClick={() => handleRefleksiToggle("aktifEvaluasi")}
                    className="flex items-center space-x-2.5 text-left w-full cursor-pointer bg-transparent py-0 px-0"
                  >
                    <div className={`w-4.5 h-4.5 rounded border flex items-center justify-center shrink-0 ${
                      state.langkah5.refleksiAkhir.aktifEvaluasi ? "bg-purple-600 text-white border-purple-500" : "border-slate-350 bg-white"
                    }`}>
                      {state.langkah5.refleksiAkhir.aktifEvaluasi && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                    </div>
                    <span>Saya aktif mengevaluasi kepincangan solusi agar menghasilkan rincian perbaikan yang andal.</span>
                  </button>

                  {/* Reflect item 2 */}
                  <button
                    type="button"
                    onClick={() => handleRefleksiToggle("pahamKelebihan")}
                    className="flex items-center space-x-2.5 text-left w-full cursor-pointer bg-transparent py-0 px-0"
                  >
                    <div className={`w-4.5 h-4.5 rounded border flex items-center justify-center shrink-0 ${
                      state.langkah5.refleksiAkhir.pahamKelebihan ? "bg-purple-600 text-white border-purple-500" : "border-slate-355 bg-white"
                    }`}>
                      {state.langkah5.refleksiAkhir.pahamKelebihan && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                    </div>
                    <span>Saya paham pentingnya menilai kelebihan & kelemahan rencana aksi kebencanaan desa.</span>
                  </button>

                  {/* Reflect item 3 */}
                  <button
                    type="button"
                    onClick={() => handleRefleksiToggle("bisaSaran")}
                    className="flex items-center space-x-2.5 text-left w-full cursor-pointer bg-transparent py-0 px-0"
                  >
                    <div className={`w-4.5 h-4.5 rounded border flex items-center justify-center shrink-0 ${
                      state.langkah5.refleksiAkhir.bisaSaran ? "bg-purple-600 text-white border-purple-500" : "border-slate-355 bg-white"
                    }`}>
                      {state.langkah5.refleksiAkhir.bisaSaran && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                    </div>
                    <span>Saya dapat memberikan saran konstruktif untuk mempererat kesiapan tanggap darurat warga.</span>
                  </button>

                  {/* Reflect item 4 */}
                  <button
                    type="button"
                    onClick={() => handleRefleksiToggle("kerjaSama")}
                    className="flex items-center space-x-2.5 text-left w-full cursor-pointer bg-transparent py-0 px-0"
                  >
                    <div className={`w-4.5 h-4.5 rounded border flex items-center justify-center shrink-0 ${
                      state.langkah5.refleksiAkhir.kerjaSama ? "bg-purple-600 text-white border-purple-500" : "border-slate-355 bg-white"
                    }`}>
                      {state.langkah5.refleksiAkhir.kerjaSama && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                    </div>
                    <span>Kami belajar saling mendengar dan menghormati perspektif berbeda di dalam kerja kelompok.</span>
                  </button>

                  {/* Reflect item 5 */}
                  <button
                    type="button"
                    onClick={() => handleRefleksiToggle("siapMenerapkanHari")}
                    className="flex items-center space-x-2.5 text-left w-full cursor-pointer bg-transparent py-0 px-0"
                  >
                    <div className={`w-4.5 h-4.5 rounded border flex items-center justify-center shrink-0 ${
                      state.langkah5.refleksiAkhir.siapMenerapkanHari ? "bg-purple-600 text-white border-purple-500" : "border-slate-355 bg-white"
                    }`}>
                      {state.langkah5.refleksiAkhir.siapMenerapkanHari && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                    </div>
                    <span>Saya siap menyosialisasikan pentingnya melestarikan hutan & menjaga parit bersih sekeliling.</span>
                  </button>
                </div>
              </div>

              {/* BPBD alert box summary of evaluation success */}
              <div className="bg-emerald-50 border border-emerald-250 text-emerald-850 p-4 rounded-2xl flex items-start space-x-3 shadow-inner bg-emerald-50 text-slate-800">
                <Award className="w-10 h-10 text-emerald-600 shrink-0 mt-0.5 animate-bounce" />
                <div className="space-y-1">
                  <p className="text-xs font-black text-slate-900 uppercase tracking-widest font-mono">
                    SINTAKS EVALUASI COMPLETED! 🎓
                  </p>
                  <p className="text-[10px] text-slate-700 leading-relaxed font-semibold">
                    Kritisisasi Anda sangat cerdas demi perlindungan nyawa warga Aceh! Ketuk tombol "Lanjut" di bawah untuk melihat laporan kelulusan dan mengisi umpan balik kelompok Anda!
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Unified Bottom Actions with Kembali / Lanjut translation */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-200 mt-2">
          {subPage === 1 ? (
            <button
              type="button"
              onClick={onPrev}
              className="flex items-center space-x-1 border border-slate-300 bg-white hover:bg-slate-50 text-slate-600 active:scale-95 font-bold text-xs uppercase px-4 py-2.5 rounded-xl transition-all cursor-pointer shadow-sm"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Kembali</span>
            </button>
          ) : (
            <button
              type="button"
              onClick={() => { setSubPage(1); window.scrollTo({ top: 0, behavior: "smooth" }); }}
              className="flex items-center space-x-1 border border-slate-300 bg-white hover:bg-slate-50 text-slate-600 active:scale-95 font-bold text-xs uppercase px-4 py-2.5 rounded-xl transition-all cursor-pointer shadow-sm"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Kembali</span>
            </button>
          )}

          {subPage === 1 ? (
            <button
              type="button"
              onClick={() => { setSubPage(2); window.scrollTo({ top: 0, behavior: "smooth" }); }}
              className="flex items-center space-x-1.5 bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white font-extrabold text-xs tracking-wider uppercase px-5 py-3 rounded-xl shadow transition-all cursor-pointer"
            >
              <span>Lanjut</span>
              <ChevronRight className="w-4 h-4 text-indigo-200" />
            </button>
          ) : (
            <button
              type="button"
              onClick={onFinish}
              className="flex items-center space-x-1.5 bg-slate-900 hover:bg-slate-800 active:scale-95 text-white font-extrabold text-xs tracking-wider uppercase px-5 py-3 rounded-xl shadow transition-all cursor-pointer"
            >
              <span>Lanjut</span>
              <ChevronRight className="w-4 h-4 text-emerald-400" />
            </button>
          )}
        </div>

      </div>
    </div>
  );
}
