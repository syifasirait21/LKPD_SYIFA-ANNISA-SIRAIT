import React, { useState } from "react";
import { AlertTriangle, BookOpen, ChevronRight, ChevronLeft, HelpCircle, Info, Landmark, Lightbulb, MapPin, Play } from "lucide-react";
import { WorkbookState } from "../types";

interface LangkahProp {
  state: WorkbookState;
  onChange: (updater: (draft: WorkbookState) => void) => void;
  onNext: () => void;
}

export default function Langkah1({ state, onChange, onNext }: LangkahProp) {
  const [subPage, setSubPage] = useState<1 | 2>(1);

  const handleTextChange = (key: keyof WorkbookState["langkah1"], value: string) => {
    onChange((draft) => {
      draft.langkah1[key] = value;
    });
  };

  return (
    <div className="space-y-6">
      {/* Step Header Badge */}
      <div className="flex items-center justify-end">
        <div className="flex items-center space-x-1 text-slate-500 text-xs font-medium">
          <BookOpen className="w-3.5 h-3.5 text-amber-500" />
          <span>Sintaks PBL</span>
        </div>
      </div>

      {/* Main Title */}
      <div className="space-y-2">
        <h2 className="text-2xl font-black text-slate-800 tracking-tight leading-tight uppercase">
          {subPage === 1 ? "Orientasi Masalah" : "Lembar Tugas"}
        </h2>
        <p className="text-slate-600 text-sm">
          {subPage === 1 
            ? "Perhatikan dan pahami kasus bencana di bawah ini dengan cermat!" 
            : "Jawablah pertanyaan analisis akar masalah banjir berdasarkan studi kasus!"}
        </p>
      </div>

      {subPage === 1 ? (
        <div className="space-y-6 animate-fade-in">
          {/* Case Study Card */}
          <div className="bg-gradient-to-br from-slate-50 to-amber-50/20 border border-slate-200/80 rounded-2xl p-4 shadow-sm space-y-4">
            {/* Banner with warning */}
            <div className="flex items-center justify-between bg-red-600 text-white rounded-xl px-4 py-2 shadow-sm">
              <div className="flex items-center space-x-2">
                <span className="text-xl font-bold">🚨</span>
                <span className="text-xs font-black tracking-wider uppercase font-mono">
                  Kasus Nyata Mitigasi
                </span>
              </div>
              <span className="px-2 py-0.5 bg-black/30 rounded text-[10px] uppercase tracking-wide font-mono font-bold">
                Aceh, Indonesia
              </span>
            </div>

            {/* Big case title */}
            <h3 className="text-lg font-black text-slate-900 tracking-tight flex items-center justify-between">
              <span>BANJIR BANDANG DI ACEH</span>
              <span className="text-[11px] font-mono text-slate-500 bg-slate-200/50 px-2.5 py-1 rounded-full flex items-center space-x-1.5 font-bold">
                <MapPin className="w-3 h-3 text-red-500" />
                <span>Provinsi Aceh</span>
              </span>
            </h3>

            {/* Visual Case Representation: Interactive Map / Video Player */}
            <div className="relative aspect-video bg-slate-900 rounded-xl overflow-hidden border border-slate-300 shadow-md">
              <iframe
                src="https://www.youtube.com/embed/9MX3mZdArkw"
                title="Video Dokumenter Bencana - Banjir Bandang di Aceh"
                className="absolute inset-0 w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>

            {/* Narrative Text */}
            <p className="text-xs text-slate-700 leading-relaxed font-medium bg-white p-3.5 rounded-xl border border-slate-200">
              Hujan deras yang mengguyur selama <span className="font-bold text-red-600">2 hari berturut-turut</span> menyebabkan sungai utama meluap melampaui batas tanggul alami. Air keruh berlumpur dengan cepat menggenangi rumah warga di bantaran. 
              <br /><br />
              Banyak <span className="font-bold text-amber-700">saluran air (drainase) tersumbat sampah</span> rumah tangga, memperparah genangan air di jalan raya. Sebagian warga panik, bergegas menyelamatkan barang berharga tanpa petunjuk evakuasi yang jelas. Mereka kebingungan karena belum tahu rute evakuasi yang aman mendaki bukit terdekat.
            </p>

            {/* Alert box */}
            <div className="bg-amber-100/60 border border-amber-200 rounded-xl p-3 flex items-start space-x-2.5">
              <Info className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <p className="text-[11px] text-slate-700 leading-tight">
                <span className="font-bold text-slate-900 block mb-0.5">Motivasi PBL:</span>
                Setiap masalah besar di bumi bisa diselesaikan jika kita memahami akar penyebab dan mencari alternatif solusi mitigasi terbaik dari sekarang!
              </p>
            </div>
          </div>

          {/* Bottom Actions Centered */}
          <div className="flex justify-center pt-2">
            <button
              onClick={() => setSubPage(2)}
              className="flex items-center space-x-1.5 bg-slate-900 hover:bg-slate-800 active:scale-95 text-white font-extrabold text-xs tracking-wider uppercase px-5 py-3 rounded-xl shadow transition-all cursor-pointer"
            >
              <span>Lanjut</span>
              <ChevronRight className="w-4 h-4 text-emerald-400" />
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-6 animate-fade-in">
          {/* Student Assignment Title Section */}
          <div className="bg-amber-500 text-slate-950 py-3 px-4 rounded-xl flex items-center space-x-2.5 font-extrabold uppercase text-sm shadow-sm">
            <Lightbulb className="w-4 h-4 fill-slate-950" />
            <span>✍️ LEMBAR TUGAS SISWA</span>
          </div>

          {/* Answer Inputs Box */}
          <div className="space-y-5 bg-white p-4 border border-slate-200 rounded-2xl shadow-sm">
            <p className="text-xs font-bold text-slate-700 italic">
              Jawablah pertanyaan analisis berikut berdasarkan pembacaan kasus di atas!
            </p>

            {/* Question 1 */}
            <div className="space-y-2">
              <label className="text-xs font-black text-slate-800 leading-tight block">
                1. Apa masalah utama pada kasus banjir di Aceh di atas?
              </label>
              <div className="relative">
                <textarea
                  value={state.langkah1.masalahUtama}
                  onChange={(e) => handleTextChange("masalahUtama", e.target.value)}
                  placeholder="Contoh: Terjadinya banjir bandang berlumpur yang menggenangi pemukiman warga..."
                  rows={3}
                  className="w-full text-xs p-3.5 border border-slate-300 rounded-xl bg-slate-55 focus:bg-white focus:ring-2 focus:ring-amber-400 focus:border-amber-400 outline-none transition-all placeholder:text-slate-400 leading-relaxed font-mono text-slate-800"
                />
              </div>
            </div>

            {/* Question 2 */}
            <div className="space-y-2">
              <label className="text-xs font-black text-slate-800 leading-tight block">
                2. Apa saja penyebab awal banjir yang teridentifikasi dalam teks?
              </label>
              <div className="relative">
                <textarea
                  value={state.langkah1.penyebabUtama}
                  onChange={(e) => handleTextChange("penyebabUtama", e.target.value)}
                  placeholder="Contoh: Hujan deras 2 hari, saluran air tersumbat plastik dan sampah rumah tangga..."
                  rows={3}
                  className="w-full text-xs p-3.5 border border-slate-300 rounded-xl bg-slate-55 focus:bg-white focus:ring-2 focus:ring-amber-400 focus:border-amber-400 outline-none transition-all placeholder:text-slate-400 leading-relaxed font-mono text-slate-800"
                />
              </div>
            </div>

            {/* Question 3 */}
            <div className="space-y-2">
              <label className="text-xs font-black text-slate-800 leading-tight block">
                3. Apa dampak buruk nyata yang dihadapi oleh masyarakat Aceh tersebut?
              </label>
              <div className="relative">
                <textarea
                  value={state.langkah1.dampakUtama}
                  onChange={(e) => handleTextChange("dampakUtama", e.target.value)}
                  placeholder="Contoh: Rumah kebanjiran lumps, warga panik karena rute evakuasi tidak dipahami..."
                  rows={3}
                  className="w-full text-xs p-3.5 border border-slate-300 rounded-xl bg-slate-55 focus:bg-white focus:ring-2 focus:ring-amber-400 focus:border-amber-400 outline-none transition-all placeholder:text-slate-400 leading-relaxed font-mono text-slate-400 text-slate-800"
                />
              </div>
            </div>
          </div>

          {/* Bottom Actions with Back and Finish Next */}
          <div className="flex items-center justify-between pt-2">
            <button
              onClick={() => setSubPage(1)}
              className="flex items-center space-x-1 border border-slate-300 bg-white hover:bg-slate-50 text-slate-600 active:scale-95 font-bold text-xs uppercase px-4 py-2.5 rounded-xl transition-all cursor-pointer"
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
