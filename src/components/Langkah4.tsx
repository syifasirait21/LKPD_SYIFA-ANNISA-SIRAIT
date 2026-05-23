import React from "react";
import { 
  ChevronLeft, 
  ChevronRight, 
  Lightbulb, 
  ShieldCheck, 
  Users, 
  FileCheck,
  Check,
  Award,
  Sparkles
} from "lucide-react";
import { WorkbookState } from "../types";

interface LangkahProp {
  state: WorkbookState;
  onChange: (updater: (draft: WorkbookState) => void) => void;
  onNext: () => void;
  onPrev: () => void;
}

export default function Langkah4({ state, onChange, onNext, onPrev }: LangkahProp) {
  const [subPage, setSubPage] = React.useState<number>(1);

  const handleIdeChange = (category: keyof WorkbookState["langkah4"]["ideSolusi"], index: number, val: string) => {
    onChange((draft) => {
      draft.langkah4.ideSolusi[category][index] = val;
    });
  };

  const handleBestSolChange = (category: keyof WorkbookState["langkah4"]["solusiTerbaik"], field: "solusi" | "alasan", val: string) => {
    onChange((draft) => {
      draft.langkah4.solusiTerbaik[category][field] = val;
    });
  };

  const handleMediaCheckType = (mediaType: string) => {
    onChange((draft) => {
      const idx = draft.langkah4.mediaPenyajian.indexOf(mediaType);
      if (idx > -1) {
        draft.langkah4.mediaPenyajian.splice(idx, 1);
      } else {
        draft.langkah4.mediaPenyajian.push(mediaType);
      }
    });
  };

  const handleSajianPoinChange = (index: number, val: string) => {
    onChange((draft) => {
      draft.langkah4.sajianPoin[index] = val;
    });
  };

  const handleRefleksiToggle = (key: keyof WorkbookState["langkah4"]["refleksiDiri"]) => {
    onChange((draft) => {
      draft.langkah4.refleksiDiri[key] = !draft.langkah4.refleksiDiri[key];
    });
  };

  // Safe scroll to top on sub-page change
  React.useEffect(() => {
    const el = document.getElementById("langkah4-container");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  }, [subPage]);

  return (
    <div id="langkah4-container" className="space-y-6 text-slate-800">
      {/* Step Header Badge */}
      <div className="flex items-center justify-between">
        {/* Simple Page Steps Indicator */}
        <div className="flex items-center space-x-2">
          <button 
            type="button"
            onClick={() => setSubPage(1)}
            className={`px-3 py-1 rounded-full text-[10px] sm:text-xs font-black uppercase tracking-wider transition-all cursor-pointer ${
              subPage === 1 
                ? "bg-purple-600 text-white shadow" 
                : "bg-slate-100 text-slate-500 hover:bg-slate-200"
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
                ? "bg-purple-600 text-white shadow" 
                : "bg-slate-100 text-slate-500 hover:bg-slate-200"
            }`}
          >
            Bagian C & D
          </button>
        </div>

        <div className="flex items-center space-x-1 text-slate-500 text-xs font-medium">
          <Lightbulb className="w-3.5 h-3.5 text-purple-600" />
          <span>Sintaks PBL</span>
        </div>
      </div>

      {/* Main Title */}
      <div className="space-y-2">
        <h2 className="text-2xl font-black text-slate-850 tracking-tight leading-tight uppercase">
          Menyajikan Solusi Masalah {subPage === 1 ? "(Bagian 1/2)" : "(Bagian 2/2)"}
        </h2>
        <p className="text-slate-600 text-sm font-medium">
          {subPage === 1 
            ? "Langkah Pertama: Kembangkan berbagai ide kreatif kebencanaan lalu sepakati solusi terbaik kelompok Anda!"
            : "Langkah Kedua: Deskripsikan rencana rancangan strategi kelompok, pilih media penyajian, dan susun poin presentasi!"}
        </p>
      </div>

      {/* ALL CONTENT IN A CONCISE COLLABORATIVE LIST FLOW */}
      <div className="space-y-6">
        
        {subPage === 1 && (
          <div className="space-y-6 animate-fade-in">
            {/* SECTION A: Kembangkan Ide Solusi*/}
            <div className="space-y-4">
              <div className="bg-emerald-600 text-white font-extrabold text-xs uppercase px-4 py-2.5 rounded-xl shadow-sm tracking-wider flex items-center justify-between">
                <span>A. Kembangkan Ide Solusi (4 Kuadran)</span>
                <ShieldCheck className="w-4 h-4 text-emerald-200" />
              </div>

              <p className="text-xs text-slate-600 italic px-1 leading-relaxed">
                Tuliskan minimal 2 sampai 4 ide kreatif pada masing-masing kuadran manajemen kebencanaan di bawah ini:
              </p>

              {/* 4 Quadrants Grid layout */}
              <div className="grid grid-cols-1 gap-4">
                {/* Quadrant 1: Pencegahan */}
                <div className="bg-white border border-emerald-200 rounded-2xl p-3.5 shadow-sm space-y-3">
                  <span className="text-[11px] font-black uppercase tracking-wider text-emerald-700 bg-emerald-50 border border-emerald-200 py-1 px-3 rounded-2xl inline-flex items-center gap-1.5 max-w-full text-wrap leading-tight">
                    🌳 1. Pencegahan (Preventif)
                  </span>
                  <div className="space-y-2">
                    {state.langkah4.ideSolusi.pencegahan.map((val, idx) => (
                      <div key={idx} className="flex items-center space-x-1.5 w-full min-w-0">
                        <span className="w-5 h-5 rounded-full bg-emerald-600 text-white text-[10px] font-bold flex items-center justify-center font-mono shrink-0">
                          {idx + 1}
                        </span>
                        <input
                          type="text"
                          value={val}
                          onChange={(e) => handleIdeChange("pencegahan", idx, e.target.value)}
                          placeholder="misal: Reboisasi lahan lereng bukit terjal Aceh"
                          className="flex-1 w-full min-w-0 text-xs px-2.5 py-1.5 border border-slate-200 rounded-lg outline-none focus:ring-1 focus:ring-emerald-400 font-mono text-slate-800"
                        />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Quadrant 2: Kesiapsiagaan */}
                <div className="bg-white border border-amber-200 rounded-2xl p-3.5 shadow-sm space-y-3">
                  <span className="text-[11px] font-black uppercase tracking-wider text-amber-700 bg-amber-50 border border-amber-200 py-1 px-3 rounded-2xl inline-flex items-center gap-1.5 max-w-full text-wrap leading-tight">
                    🏠 2. Kesiapsiagaan (Preparedness)
                  </span>
                  <div className="space-y-2">
                    {state.langkah4.ideSolusi.kesiapsiagaan.map((val, idx) => (
                      <div key={idx} className="flex items-center space-x-1.5 w-full min-w-0">
                        <span className="w-5 h-5 rounded-full bg-amber-600 text-white text-[10px] font-bold flex items-center justify-center font-mono shrink-0">
                          {idx + 1}
                        </span>
                        <input
                          type="text"
                          value={val}
                          onChange={(e) => handleIdeChange("kesiapsiagaan", idx, e.target.value)}
                          placeholder="misal: Simulasi penunjuk arah jalur evakuasi berkala"
                          className="flex-1 w-full min-w-0 text-xs px-2.5 py-1.5 border border-slate-200 rounded-lg outline-none focus:ring-1 focus:ring-amber-400 font-mono text-slate-800"
                        />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Quadrant 3: Penanganan Saat Bencana */}
                <div className="bg-white border border-red-200 rounded-2xl p-3.5 shadow-sm space-y-3">
                  <span className="text-[11px] font-black uppercase tracking-wider text-red-700 bg-red-50 border border-red-200 py-1 px-3 rounded-2xl inline-flex items-center gap-1.5 max-w-full text-wrap leading-tight">
                    🛡️ 3. Penanganan Saat Bencana (Response)
                  </span>
                  <div className="space-y-2">
                    {state.langkah4.ideSolusi.penanganan.map((val, idx) => (
                      <div key={idx} className="flex items-center space-x-1.5 w-full min-w-0">
                        <span className="w-5 h-5 rounded-full bg-red-600 text-white text-[10px] font-bold flex items-center justify-center font-mono shrink-0">
                          {idx + 1}
                        </span>
                        <input
                          type="text"
                          value={val}
                          onChange={(e) => handleIdeChange("penanganan", idx, e.target.value)}
                          placeholder="misal: Tim Penyelamat perahu karet darurat"
                          className="flex-1 w-full min-w-0 text-xs px-2.5 py-1.5 border border-slate-200 rounded-lg outline-none focus:ring-1 focus:ring-red-400 font-mono text-slate-800 focus:border-red-500"
                        />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Quadrant 4: Pemulihan Setelah Bencana */}
                <div className="bg-white border border-blue-200 rounded-2xl p-3.5 shadow-sm space-y-3">
                  <span className="text-[11px] font-black uppercase tracking-wider text-blue-700 bg-blue-50 border border-blue-200 py-1 px-3 rounded-2xl inline-flex items-center gap-1.5 max-w-full text-wrap leading-tight">
                    🔧 4. Pemulihan Bencana (Recovery)
                  </span>
                  <div className="space-y-2">
                    {state.langkah4.ideSolusi.pemulihan.map((val, idx) => (
                      <div key={idx} className="flex items-center space-x-1.5 w-full min-w-0">
                        <span className="w-5 h-5 rounded-full bg-blue-600 text-white text-[10px] font-bold flex items-center justify-center font-mono shrink-0">
                          {idx + 1}
                        </span>
                        <input
                          type="text"
                          value={val}
                          onChange={(e) => handleIdeChange("pemulihan", idx, e.target.value)}
                          placeholder="misal: Renovasi tanggul sungai jebol & trauma healing"
                          className="flex-1 w-full min-w-0 text-xs px-2.5 py-1.5 border border-slate-200 rounded-lg outline-none focus:ring-1 focus:ring-blue-400 font-mono text-slate-800"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* SECTION B: Pilih Solusi Terbaik */}
            <div className="space-y-4 pt-2">
              <div className="bg-amber-500 text-slate-950 font-extrabold text-xs uppercase px-4 py-2.5 rounded-xl shadow-sm tracking-wider flex items-center justify-between">
                <span>B. Pemilihan Solusi Terbaik Kelompok</span>
                <Award className="w-4 h-4 fill-slate-955" />
              </div>

              <div className="space-y-4 bg-white p-4 border border-slate-200 rounded-2xl shadow-sm">
                {/* Preventif Solution row */}
                <div className="space-y-2 border-b border-slate-100 pb-3">
                  <p className="text-xs font-black text-slate-800 flex items-center space-x-1">
                    <span className="text-emerald-505">🟢</span>
                    <span>Kategori: Pencegahan (Preventif)</span>
                  </p>
                  <input
                    type="text"
                    value={state.langkah4.solusiTerbaik.pencegahan.solusi}
                    onChange={(e) => handleBestSolChange("pencegahan", "solusi", e.target.value)}
                    placeholder="Solusi terbaik pencegahan..."
                    className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:ring-1 focus:ring-amber-400 font-mono text-slate-800 font-semibold"
                  />
                  <textarea
                    value={state.langkah4.solusiTerbaik.pencegahan.alasan}
                    onChange={(e) => handleBestSolChange("pencegahan", "alasan", e.target.value)}
                    placeholder="Alasannya karena..."
                    rows={2}
                    className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:ring-1 focus:ring-amber-400 font-mono text-slate-800"
                  />
                </div>

                {/* Preparedness Solution row */}
                <div className="space-y-2 border-b border-slate-100 pb-3">
                  <p className="text-xs font-black text-slate-800 flex items-center space-x-1">
                    <span className="text-amber-505">🟡</span>
                    <span>Kategori: Kesiapsiagaan (Preparedness)</span>
                  </p>
                  <input
                    type="text"
                    value={state.langkah4.solusiTerbaik.kesiapsiagaan.solusi}
                    onChange={(e) => handleBestSolChange("kesiapsiagaan", "solusi", e.target.value)}
                    placeholder="Solusi terbaik kesiapsiagaan..."
                    className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:ring-1 focus:ring-amber-400 font-mono text-slate-800 font-semibold"
                  />
                  <textarea
                    value={state.langkah4.solusiTerbaik.kesiapsiagaan.alasan}
                    onChange={(e) => handleBestSolChange("kesiapsiagaan", "alasan", e.target.value)}
                    placeholder="Alasannya karena..."
                    rows={2}
                    className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:ring-1 focus:ring-amber-400 font-mono text-slate-800"
                  />
                </div>

                {/* Response Solution row */}
                <div className="space-y-2 border-b border-slate-100 pb-3">
                  <p className="text-xs font-black text-slate-800 flex items-center space-x-1">
                    <span className="text-red-505">🔴</span>
                    <span>Kategori: Penanganan Saat Bencana (Response)</span>
                  </p>
                  <input
                    type="text"
                    value={state.langkah4.solusiTerbaik.penanganan.solusi}
                    onChange={(e) => handleBestSolChange("penanganan", "solusi", e.target.value)}
                    placeholder="Solusi terbaik penanganan..."
                    className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:ring-1 focus:ring-amber-400 font-mono text-slate-800 font-semibold"
                  />
                  <textarea
                    value={state.langkah4.solusiTerbaik.penanganan.alasan}
                    onChange={(e) => handleBestSolChange("penanganan", "alasan", e.target.value)}
                    placeholder="Alasannya karena..."
                    rows={2}
                    className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:ring-1 focus:ring-amber-400 font-mono text-slate-800"
                  />
                </div>

                {/* Recovery Solution row */}
                <div className="space-y-2">
                  <p className="text-xs font-black text-slate-800 flex items-center space-x-1">
                    <span className="text-blue-505">🔵</span>
                    <span>Kategori: Pemulihan Bencana (Recovery)</span>
                  </p>
                  <input
                    type="text"
                    value={state.langkah4.solusiTerbaik.pemulihan.solusi}
                    onChange={(e) => handleBestSolChange("pemulihan", "solusi", e.target.value)}
                    placeholder="Solusi terbaik pemulihan..."
                    className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:ring-1 focus:ring-amber-400 font-mono text-slate-800 font-semibold"
                  />
                  <textarea
                    value={state.langkah4.solusiTerbaik.pemulihan.alasan}
                    onChange={(e) => handleBestSolChange("pemulihan", "alasan", e.target.value)}
                    placeholder="Alasannya karena..."
                    rows={2}
                    className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:ring-1 focus:ring-amber-400 font-mono text-slate-800"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {subPage === 2 && (
          <div className="space-y-6 animate-fade-in">
            {/* SECTION C: Rancangan Solusi & Media */}
            <div className="space-y-4">
              <div className="bg-indigo-600 text-white font-extrabold text-xs uppercase px-4 py-2.5 rounded-xl shadow-sm tracking-wider flex items-center justify-between">
                <span>C. Buat Rancangan & Media Penyajian</span>
                <FileCheck className="w-4 h-4 text-indigo-200" />
              </div>

              <div className="space-y-4 bg-white p-4 border border-slate-200 rounded-2xl shadow-sm">
                {/* Rancangan solusi text note layout */}
                <div className="space-y-1.5">
                  <label className="text-xs font-black text-slate-800 block">
                    💡 Deskripsikan Rancangan Strategi Solusi Kelompok:
                  </label>
                  <textarea
                    value={state.langkah4.rancanganSolusi}
                    onChange={(e) => onChange((draft) => { draft.langkah4.rancanganSolusi = e.target.value; })}
                    placeholder="misal: Membangun sistem pendeteksi ketinggian air sungai hulu beraliran otomatis nirkabel berbasis sensor piezoeletrik yang terhubung dengan sirine masjid desa..."
                    rows={4}
                    className="w-full text-[11px] p-3 text-slate-800 border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-indigo-400 outline-none rounded-xl transition-all font-mono"
                  />
                </div>

                {/* Media formats checkbox layout */}
                <div className="space-y-2 pt-1">
                  <label className="text-xs font-black text-slate-800 block">
                    ✔️ Media Penyajian Utama (Beri tanda centang):
                  </label>
                  <div className="grid grid-cols-2 gap-2 text-slate-800 select-none">
                    {["Poster", "Leaflet", "Infografis", "Powerpoint", "Video Pendek", "Drama Singkat"].map((media) => {
                      const isChecked = state.langkah4.mediaPenyajian.includes(media);

                      return (
                        <button
                          key={media}
                          type="button"
                          id={`media-check-btn-${media}`}
                          onClick={() => handleMediaCheckType(media)}
                          className={`flex items-center space-x-2 p-2.5 rounded-lg border text-left text-xs font-bold transition-all cursor-pointer ${
                            isChecked 
                              ? "bg-indigo-50 border-indigo-500 text-indigo-700" 
                              : "bg-white border-slate-200 hover:bg-slate-50"
                          }`}
                        >
                          <div className={`w-4 h-4 rounded border flex items-center justify-center shrink-0 ${
                            isChecked ? "bg-indigo-600 border-indigo-500 text-white" : "border-slate-300 bg-white"
                          }`}>
                            {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                          </div>
                          <span>{media}</span>
                        </button>
                      );
                    })}
                  </div>
                  
                  {/* Other media info */}
                  <input
                    type="text"
                    value={state.langkah4.mediaPenyajianLainnya}
                    onChange={(e) => onChange((draft) => { draft.langkah4.mediaPenyajianLainnya = e.target.value; })}
                    placeholder="Media penyajian Lainnya..."
                    className="w-full text-xs px-3 py-2 border border-slate-200 rounded-lg outline-none focus:ring-1 focus:ring-indigo-400 font-mono text-slate-800"
                  />
                </div>
              </div>
            </div>

            {/* SECTION D: Sajikan Solusi */}
            <div className="space-y-4 pt-2">
              <div className="bg-slate-700 text-white font-extrabold text-xs uppercase px-4 py-2.5 rounded-xl shadow-sm tracking-wider flex items-center justify-between">
                <span>D. Sajikan Solusi & Refleksi Mandiri</span>
                <Users className="w-4 h-4 text-slate-300" />
              </div>

              {/* Presentation points */}
              <div className="space-y-3 bg-white p-4 border border-slate-200 rounded-2xl shadow-sm">
                {/* Beautiful cartoon mockup vector of presentation */}
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5 flex flex-col items-center">
                  <span className="text-5xl animate-bounce">🧑‍🤝‍🧑</span>
                  <div className="bg-white px-4 py-1.5 rounded-lg border border-slate-300 shadow-sm mt-2 text-center text-[10px] font-black text-slate-700 tracking-tight flex items-center space-x-1 font-mono uppercase">
                    <Sparkles className="w-3 h-3 text-amber-500" />
                    <span>SOLUSI KAMI UNTUK ACEH</span>
                  </div>
                </div>

                <label className="text-xs font-black text-slate-800 block">
                  🎤 Tuliskan 4 Poin Utama untuk Presentasi di depan Kelas:
                </label>
                <div className="space-y-2.5">
                  {state.langkah4.sajianPoin.map((val, idx) => (
                    <div key={idx} className="flex items-center space-x-2">
                      <span className="w-6 h-6 rounded-full bg-slate-900 text-white text-xs font-black flex items-center justify-center shrink-0 font-mono">
                        {idx + 1}
                      </span>
                      <input
                        type="text"
                        value={val}
                        onChange={(e) => handleSajianPoinChange(idx, e.target.value)}
                        placeholder={`Poin penting presentasi ${idx + 1}...`}
                        className="flex-1 text-xs px-3 py-2 border border-slate-300 rounded-xl bg-slate-50 focus:bg-white focus:ring-1 focus:ring-blue-400 font-mono text-slate-800"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* SELF REFLECTION */}
              <div className="space-y-2 bg-purple-50 border border-purple-200 rounded-2xl p-4">
                <span className="text-xs font-black tracking-wide text-purple-900 uppercase block mb-1">
                  ⭐ REFLEKSI DIRI (Centang yang Sesuai)
                </span>
                <div className="space-y-2 text-slate-800 text-[11px] select-none font-medium">
                  {/* Reflect item 1 */}
                  <button
                    type="button"
                    onClick={() => handleRefleksiToggle("partisipasi")}
                    className="flex items-center space-x-2.5 text-left w-full cursor-pointer"
                  >
                    <div className={`w-4.5 h-4.5 rounded border flex items-center justify-center shrink-0 ${
                      state.langkah4.refleksiDiri.partisipasi ? "bg-purple-600 text-white border-purple-500" : "border-slate-300 bg-white"
                    }`}>
                      {state.langkah4.refleksiDiri.partisipasi && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                    </div>
                    <span>Saya berpartisipasi aktif dalam mengembangkan solusi kelompok.</span>
                  </button>

                  {/* Reflect item 2 */}
                  <button
                    type="button"
                    onClick={() => handleRefleksiToggle("bermanfaat")}
                    className="flex items-center space-x-2.5 text-left w-full cursor-pointer"
                  >
                    <div className={`w-4.5 h-4.5 rounded border flex items-center justify-center shrink-0 ${
                      state.langkah4.refleksiDiri.bermanfaat ? "bg-purple-600 text-white border-purple-500" : "border-slate-300 bg-white"
                    }`}>
                      {state.langkah4.refleksiDiri.bermanfaat && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                    </div>
                    <span>Solusi yang kami rancang bermanfaat dan logis dapat dilakukan di Aceh.</span>
                  </button>

                  {/* Reflect item 3 */}
                  <button
                    type="button"
                    onClick={() => handleRefleksiToggle("percayaDiri")}
                    className="flex items-center space-x-2.5 text-left w-full cursor-pointer"
                  >
                    <div className={`w-4.5 h-4.5 rounded border flex items-center justify-center shrink-0 ${
                      state.langkah4.refleksiDiri.percayaDiri ? "bg-purple-600 text-white border-purple-500" : "border-slate-300 bg-white"
                    }`}>
                      {state.langkah4.refleksiDiri.percayaDiri && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                    </div>
                    <span>Saya percaya diri saat mempresentasikan gagasan penyelidikan di depan kelas.</span>
                  </button>

                  {/* Reflect item 4 */}
                  <button
                    type="button"
                    onClick={() => handleRefleksiToggle("siapMenerapkan")}
                    className="flex items-center space-x-2.5 text-left w-full cursor-pointer"
                  >
                    <div className={`w-4.5 h-4.5 rounded border flex items-center justify-center shrink-0 ${
                      state.langkah4.refleksiDiri.siapMenerapkan ? "bg-purple-600 text-white border-purple-500" : "border-slate-300 bg-white"
                    }`}>
                      {state.langkah4.refleksiDiri.siapMenerapkan && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                    </div>
                    <span>Saya siap menerapkan perilaku tangguh bencana ini dalam kehidupan sehari-hari.</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Unified Bottom Actions */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-200">
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
              onClick={() => setSubPage(1)}
              className="flex items-center space-x-1 border border-slate-300 bg-white hover:bg-slate-50 text-slate-600 active:scale-95 font-bold text-xs uppercase px-4 py-2.5 rounded-xl transition-all cursor-pointer shadow-sm"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Kembali</span>
            </button>
          )}

          {subPage === 1 ? (
            <button
              type="button"
              onClick={() => setSubPage(2)}
              className="flex items-center space-x-1.5 bg-indigo-650 bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white font-extrabold text-xs tracking-wider uppercase px-5 py-3 rounded-xl shadow transition-all cursor-pointer"
            >
              <span>Lanjut</span>
              <ChevronRight className="w-4 h-4 text-indigo-200" />
            </button>
          ) : (
            <button
              type="button"
              onClick={onNext}
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
