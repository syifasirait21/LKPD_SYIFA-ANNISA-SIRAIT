import React, { useState } from "react";
import { 
  Play, 
  Sparkles, 
  BookOpen, 
  AlertTriangle, 
  HelpCircle, 
  MapPin, 
  Milestone, 
  Award, 
  ChevronRight, 
  ChevronLeft,
  CheckCircle,
  Users,
  Compass,
  FileSpreadsheet,
  Layers,
  GraduationCap
} from "lucide-react";
import { WorkbookState } from "../types";

interface StartProps {
  state: WorkbookState;
  onChange: (updater: (draft: WorkbookState) => void) => void;
  onStart: () => void;
}

export default function StartScreen({ state, onChange, onStart }: StartProps) {
  // We have 4 slides: 0 = Cover, 1 = Kompetensi, 2 = Petunjuk, 3 = Identitas Kelompok
  const [currentSlide, setCurrentSlide] = useState<number>(0);

  const isFormValid = (state.studentLeader || "").trim() !== "" && 
                      (state.studentGroup || "").trim() !== "" && 
                      (state.studentClass || "").trim() !== "";

  const syncStudentName = (draft: WorkbookState) => {
    const leaderStr = draft.studentLeader || "";
    const membersArr = draft.studentMembers || [];
    const activeMembers = membersArr.filter(m => (m || "").trim() !== "");
    draft.studentName = leaderStr.trim() 
      ? leaderStr.trim() + (activeMembers.length > 0 ? " & " + activeMembers.map(m => m.trim()).join(", ") : "")
      : (activeMembers.length > 0 ? activeMembers.map(m => m.trim()).join(", ") : "");
  };

  const handleStartClick = () => {
    onChange((draft) => {
      if (!draft.studentLeader) draft.studentLeader = "";
      if (!draft.studentLeader.trim()) draft.studentLeader = "Siswa Mandiri";
      
      if (!draft.studentMembers) draft.studentMembers = [];

      if (!draft.studentGroup) draft.studentGroup = "";
      if (!draft.studentGroup.trim()) draft.studentGroup = "Kelompok 1";
      if (!draft.studentClass) draft.studentClass = "";
      if (!draft.studentClass.trim()) draft.studentClass = "Kelas VII-A";
      
      syncStudentName(draft);
    });
    onStart();
  };

  return (
    <div className="space-y-6 text-slate-800">
      
      {/* APP HEADER SYSTEM - Subtle watermarked navigation bar on top */}
      <div className="flex items-center justify-between px-1">
        <div className="flex items-center space-x-2">
          <Layers className="w-4 h-4 text-indigo-500" />
          <span className="text-[10px] font-sans font-black tracking-widest text-indigo-600 uppercase">
            Alur Persiapan LKPD
          </span>
        </div>
        <div className="bg-indigo-50 text-indigo-700 font-mono text-[9px] px-2.5 py-0.5 rounded-full border border-indigo-200">
          PBL Offline-First
        </div>
      </div>

      {/* RENDER ACTIVE LAYER PANEL */}
      <div className="transition-all duration-300">

        {/* ============================================================== */}
        {/* LAYER 1: COVER APLIKASI (Index 0)                             */}
        {/* ============================================================== */}
        {currentSlide === 0 && (
          <div className="bg-white border border-slate-200 rounded-3xl p-6 md:p-10 space-y-8 animate-fade-in text-center relative overflow-hidden shadow-lg">
            {/* Ambient gradients */}
            <div className="absolute top-0 right-0 w-36 h-36 bg-teal-400/10 rounded-full blur-2xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-36 h-36 bg-blue-400/10 rounded-full blur-2xl pointer-events-none" />

            {/* Earth Core Structure Interactive Avatar */}
            <div className="relative w-36 h-36 md:w-40 md:h-40 mx-auto flex items-center justify-center">
              <div className="absolute inset-0 bg-teal-500/10 rounded-full blur-2xl animate-pulse" />
              <div className="absolute inset-2 bg-indigo-400/10 rounded-full blur-xl" />
              
              {/* Earth interior diagram sphere */}
              <div className="relative w-28 h-28 md:w-32 md:h-32 bg-indigo-950 border-4 border-indigo-200 rounded-full flex items-center justify-center overflow-hidden shadow-2xl relative select-none animate-spin-slow">
                {/* Outer earth crust */}
                <div className="absolute inset-0 border border-teal-500/20 rounded-full" />
                {/* Core layers */}
                <div className="absolute w-6 h-6 bg-amber-400 rounded-full animate-ping opacity-60" />
                <div className="absolute w-8 h-8 bg-amber-400 rounded-full flex items-center justify-center shadow-lg shadow-amber-400/50 z-10">
                  <span className="text-[7px] font-bold text-slate-950 uppercase tracking-widest font-mono">INTI</span>
                </div>
                {/* Mantle */}
                <div className="absolute w-16 h-16 bg-orange-500/30 border border-orange-500/40 rounded-full" />
                {/* Lithosphere */}
                <div className="absolute w-24 h-24 bg-rose-600/10 border border-rose-500/20 rounded-full" />
                {/* Continents */}
                <div className="absolute top-3 left-4 w-6 h-3 bg-emerald-500/60 rounded-full rotate-45 opacity-60" />
                <div className="absolute bottom-5 right-3 w-8 h-4 bg-emerald-500/70 rounded-full -rotate-12 opacity-65" />
                <div className="absolute top-1/2 -translate-y-1/2 left-3 w-4 h-2.5 bg-emerald-600/60 rounded-full opacity-60" />
              </div>
            </div>

            {/* Title Block */}
            <div className="space-y-3 max-w-2xl mx-auto">
              <div className="bg-rose-50 text-rose-600 inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full border border-rose-200 font-mono text-[9px] font-black uppercase tracking-widest animate-pulse shadow-xs">
                <span className="w-1.5 h-1.5 bg-rose-500 rounded-full" />
                <span>STUDI KASUS: MITIGASI BANJIR ACEH</span>
              </div>
              
              <h1 className="text-2xl md:text-3.5xl font-black tracking-tight uppercase leading-tight text-transparent bg-clip-text bg-gradient-to-r from-teal-600 via-indigo-600 to-blue-600">
                STRUKTUR BUMI & MITIGASI BENCANA
              </h1>
              
              <p className="text-xs md:text-sm text-slate-600 font-semibold max-w-lg mx-auto leading-relaxed">
                Platform Lembar Kerja Peserta Didik (LKPD) Interaktif berbasis sains nyata, dirancang melatih kolaborasi, nalar kritis, dan pemecahan masalah (PBL) bagi siswa kelas VII.
              </p>
            </div>

            {/* Features list */}
            <div className="grid grid-cols-3 gap-3 max-w-xl mx-auto pt-2 text-[#2D51BC] font-mono text-[9px] font-bold">
              <div className="bg-indigo-50/50 border border-indigo-100 p-3 rounded-2xl flex flex-col items-center justify-center space-y-1 text-center shadow-xs">
                <span className="text-lg">🌍</span>
                <p className="text-indigo-950 mt-1">Struktur Lapisan Bumi</p>
              </div>
              <div className="bg-indigo-50/50 border border-indigo-100 p-3 rounded-2xl flex flex-col items-center justify-center space-y-1 text-center shadow-xs">
                <span className="text-lg">🌊</span>
                <p className="text-indigo-950 mt-1">Simulasi Banjir Hulu</p>
              </div>
              <div className="bg-indigo-50/50 border border-indigo-100 p-3 rounded-2xl flex flex-col items-center justify-center space-y-1 text-center shadow-xs">
                <span className="text-lg">📋</span>
                <p className="text-indigo-950 mt-1">PBL & Cetak Laporan</p>
              </div>
            </div>

            {/* Actions Footer */}
            <div className="pt-4 flex flex-col items-center space-y-3">
              <button
                id="btn-cover-next"
                onClick={() => setCurrentSlide(1)}
                className="px-8 py-3.5 bg-gradient-to-r from-indigo-500 to-indigo-600 text-white font-extrabold uppercase rounded-2xl shadow-lg hover:from-indigo-600 hover:to-indigo-550 transition-all active:scale-95 text-xs flex items-center space-x-2 cursor-pointer"
              >
                <span>Mulai Alur Pembelajaran</span>
                <ChevronRight className="w-4 h-4 fill-current text-white" />
              </button>
              <p className="text-[10px] text-slate-500 font-mono">
                Menyimpan data kelompok secara otomatis di peranti Anda
              </p>
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* LAYER 2: KOMPETENSI & CP/TP (Index 1)                         */}
        {/* ============================================================== */}
        {currentSlide === 1 && (
          <div className="bg-white border border-slate-200 rounded-3xl p-5 md:p-8 space-y-6 animate-fade-in text-slate-700 shadow-md">
            <div className="space-y-2 border-b border-slate-200 pb-4">
              <h3 className="text-xs font-black font-mono tracking-widest text-indigo-700 uppercase flex items-center space-x-1.5">
                <Compass className="w-4 h-4" />
                <span>Capaian & Kompetensi Pembelajaran</span>
              </h3>
              <p className="text-xs text-slate-500">
                Berikut adalah target kompetensi ilmiah yang harus Anda kuasai dalam LKPD PBL ini.
              </p>
            </div>

            {/* CP Box */}
            <div className="space-y-2">
              <span className="text-[10px] uppercase font-mono tracking-widest text-indigo-600 font-black block">
                Capaian Pembelajaran (CP)
              </span>
              <div className="p-4 bg-sky-50/50 border border-sky-100 rounded-xl leading-relaxed text-xs font-sans text-sky-950 font-semibold shadow-xs">
                "Peserta didik memahami struktur lapisan bumi untuk menjelaskan fenomena alam yang terjadi dalam rangka mitigasi bencana."
              </div>
            </div>

            {/* TP Array Container */}
            <div className="bg-gradient-to-br from-indigo-50/40 to-blue-50/20 border border-slate-200 rounded-xl p-5 space-y-3">
              <span className="text-[10px] uppercase font-mono tracking-widest text-indigo-700 font-extrabold block">
                Tujuan Pembelajaran
              </span>
              <ul className="space-y-3.5 text-xs text-slate-750 font-sans font-semibold">
                <li className="flex items-start space-x-3">
                  <span className="w-5 h-5 bg-indigo-50 text-indigo-700 border border-indigo-200 font-mono font-black text-[9px] rounded-full flex items-center justify-center shrink-0">1</span>
                  <span className="leading-relaxed">Menganalisis penyebab dan dampak bencana banjir serta longsor berdasarkan permasalahan yang disajikan.</span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="w-5 h-5 bg-indigo-50 text-indigo-700 border border-indigo-200 font-mono font-black text-[9px] rounded-full flex items-center justify-center shrink-0">2</span>
                  <span className="leading-relaxed">Menilai berbagai solusi yang dapat dilakukan untuk mengurangi risiko bencana di lingkungan sekitar.</span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="w-5 h-5 bg-indigo-50 text-indigo-700 border border-indigo-200 font-mono font-black text-[9px] rounded-full flex items-center justify-center shrink-0">3</span>
                  <span className="leading-relaxed">Merancang solusi sederhana untuk mengurangi dampak bencana banjir dan longsor dalam kehidupan sehari-hari.</span>
                </li>
              </ul>
            </div>

            {/* Stepper controls */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-200">
              <button
                id="btn-comp-prev"
                onClick={() => setCurrentSlide(0)}
                className="px-4 py-2 hover:bg-slate-55 border border-slate-200 rounded-xl text-xs font-bold text-slate-600 bg-white flex items-center space-x-1.5 cursor-pointer active:scale-95 transition-all shadow-sm"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Kembali</span>
              </button>
              
              <button
                id="btn-comp-next"
                onClick={() => setCurrentSlide(2)}
                className="px-5 py-2 hover:bg-indigo-100 border border-indigo-200 text-indigo-750 bg-indigo-50 rounded-xl text-xs font-black flex items-center space-x-1.5 cursor-pointer active:scale-95 transition-all shadow-sm"
              >
                <span>Lanjut</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* LAYER 3: PETUNJUK LKPD (Index 2)                               */}
        {/* ============================================================== */}
        {currentSlide === 2 && (
          <div className="bg-white border border-slate-200 rounded-3xl p-5 md:p-8 space-y-6 animate-fade-in text-slate-750 shadow-md">
            <div className="space-y-1 border-b border-slate-200 pb-4">
              <h3 className="text-xs font-black font-mono tracking-widest text-indigo-700 uppercase flex items-center space-x-1.5">
                <HelpCircle className="w-4 h-4" />
                <span>Petunjuk Penggunaan LKPD Digital</span>
              </h3>
              <p className="text-xs text-slate-550">
                Pelajari cara kerja sistem PBL (Problem-Based Learning) interaktif ini sebelum mulai.
              </p>
            </div>

            <div className="space-y-4 text-xs font-sans">
              <p className="leading-relaxed font-semibold text-slate-700">
                Pembelajaran menggunakan modul digital ini terbagi menjadi <strong className="text-indigo-605">5 Langkah Sintaks Ilmiah</strong>. Berikut adalah ringkasan yang harus dikerjakan:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 ">
                <div className="bg-slate-50/70 p-3.5 rounded-xl border border-slate-200 space-y-1 shadow-sm">
                  <p className="font-extrabold text-slate-900 flex items-center space-x-2">
                    <span className="w-5 h-5 bg-indigo-50 border border-indigo-150 text-indigo-705 text-[10px] font-black font-mono rounded-full flex items-center justify-center">1</span>
                    <span>Langkah 1: Pahami Masalah</span>
                  </p>
                  <p className="text-[11px] text-slate-600 pl-7 leading-relaxed font-medium">
                    Menganalisis skenario banjir bandang di hulu-hilir Aceh, memainkan simulasi, dan merumuskan masalah-masalah utama.
                  </p>
                </div>

                <div className="bg-slate-50/70 p-3.5 rounded-xl border border-slate-200 space-y-1 shadow-sm">
                  <p className="font-extrabold text-slate-900 flex items-center space-x-2">
                    <span className="w-5 h-5 bg-indigo-50 border border-indigo-150 text-indigo-705 text-[10px] font-black font-mono rounded-full flex items-center justify-center">2</span>
                    <span>Langkah 2: Organisasi Tim</span>
                  </p>
                  <p className="text-[11px] text-slate-600 pl-7 leading-relaxed font-medium">
                    Memilih fakta-fakta penting dari peristiwa dan mengklasifikasikan hal yang perlu dipelajari untuk penyelidikan kelompok.
                  </p>
                </div>

                <div className="bg-slate-50/70 p-3.5 rounded-xl border border-slate-200 space-y-1 shadow-sm">
                  <p className="font-extrabold text-slate-900 flex items-center space-x-2">
                    <span className="w-5 h-5 bg-indigo-50 border border-indigo-150 text-indigo-705 text-[10px] font-black font-mono rounded-full flex items-center justify-center">3</span>
                    <span>Langkah 3: Selidiki Sains</span>
                  </p>
                  <p className="text-[11px] text-slate-600 pl-7 leading-relaxed font-medium">
                    Tabel pengamatan meteorologis BMKG, klasifikasi penyebab alami vs manusia, dan melakukan koordinasi penyelidikan kritis.
                  </p>
                </div>

                <div className="bg-slate-50/70 p-3.5 rounded-xl border border-slate-200 space-y-1 shadow-sm">
                  <p className="font-extrabold text-slate-900 flex items-center space-x-2">
                    <span className="w-5 h-5 bg-indigo-50 border border-indigo-150 text-indigo-705 text-[10px] font-black font-mono rounded-full flex items-center justify-center">4</span>
                    <span>Langkah 4-5: Rancang Solusi</span>
                  </p>
                  <p className="text-[11px] text-slate-600 pl-7 leading-relaxed font-medium">
                    Merumuskan aksi kesiapsiagaan (keselamatan, pencegahan, pemulihan), mengevaluasi solusi, dan mencetak lembar kualifikasi kelulusan.
                  </p>
                </div>
              </div>

              {/* Saved notification */}
              <div className="p-3 bg-amber-50 border border-amber-200 text-amber-800 rounded-xl flex items-start space-x-2.5 text-[11px] font-sans">
                <Sparkles className="w-4 h-4 shrink-0 text-amber-600 mt-0.5 animate-pulse" />
                <span>
                  <strong>Keamanan Penyimpanan Lokal:</strong> Semua draf isian teks, jawaban kuesioner, dan catatan eksperimen akan terus disimpan secara realtime pada web browser ini. Anda aman memuat ulang (reload) halaman asalkan menggunakan peranti/browser yang sama.
                </span>
              </div>
            </div>

            {/* Stepper controls */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-200">
              <button
                id="btn-guide-prev"
                onClick={() => setCurrentSlide(1)}
                className="px-4 py-2 hover:bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-600 bg-white flex items-center space-x-1.5 cursor-pointer active:scale-95 transition-all shadow-sm"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Kembali</span>
              </button>
              
              <button
                id="btn-guide-next"
                onClick={() => setCurrentSlide(3)}
                className="px-5 py-2 hover:bg-indigo-100 border border-indigo-200 text-indigo-750 bg-indigo-50 rounded-xl text-xs font-black flex items-center space-x-1.5 cursor-pointer active:scale-95 transition-all shadow-sm"
              >
                <span>Lanjut</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* LAYER 4: IDENTITAS KELOMPOK (Index 3)                          */}
        {/* ============================================================== */}
        {currentSlide === 3 && (
          <div className="bg-white border border-slate-205 rounded-3xl p-5 md:p-8 space-y-6 animate-fade-in text-slate-750 shadow-md">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between border-b border-slate-200 pb-4 gap-4">
              <div className="space-y-1">
                <h3 className="text-xs font-black tracking-wide text-slate-900 uppercase flex items-center space-x-1.5">
                  <Milestone className="w-4 h-4 text-indigo-600" />
                  <span>Isi Identitas Pengenal Kelompok</span>
                </h3>
                <p className="text-slate-500 text-[11px]">
                  Silakan isi data pengonal di bawah ini dengan lengkap untuk membuka Lembar Kerja.
                </p>
              </div>
              <div className="bg-emerald-50 border border-emerald-250 text-emerald-850 inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-xl font-mono text-[10px] font-bold uppercase shrink-0 shadow-sm">
                <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                <span>💾 Auto-Save Aktif</span>
              </div>
            </div>

            <div className="space-y-4 font-mono">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Input 1 Ketua Kelompok */}
                <div className="space-y-1.5 font-sans">
                  <div className="flex items-center space-x-1.5">
                    <span className="w-2 h-2 bg-amber-500 rounded-full" />
                    <label className="text-[10px] font-black uppercase text-slate-600 tracking-wider block">
                      Nama Ketua Kelompok (Leader)
                    </label>
                  </div>
                  <input
                    id="input-leader"
                    type="text"
                    value={state.studentLeader || ""}
                    onChange={(e) => onChange((draft) => { 
                      draft.studentLeader = e.target.value; 
                      syncStudentName(draft);
                    })}
                    placeholder="e.g. Syifa Sirait (Ketua)"
                    className="w-full text-xs px-3.5 py-2.5 bg-slate-50 hover:bg-white focus:bg-white border border-slate-200 focus:border-indigo-500 text-slate-800 rounded-xl outline-none transition-all font-semibold font-sans shadow-inner placeholder-slate-400"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3 font-sans">
                  {/* Input 2 Group name */}
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black uppercase text-slate-500 tracking-wider block">
                      Nama Kelompok
                    </label>
                    <input
                      id="input-group-name"
                      type="text"
                      value={state.studentGroup || ""}
                      onChange={(e) => onChange((draft) => { draft.studentGroup = e.target.value; })}
                      placeholder="e.g. Kelompok 1"
                      className="w-full text-xs px-3.5 py-2.5 bg-slate-50 hover:bg-white focus:bg-white border border-slate-200 focus:border-indigo-500 text-slate-800 rounded-xl outline-none transition-all font-semibold font-sans shadow-inner placeholder-slate-400"
                    />
                  </div>

                  {/* Input 3 Grade */}
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black uppercase text-slate-500 tracking-wider block">
                      Kelas
                    </label>
                    <input
                      id="input-class"
                      type="text"
                      value={state.studentClass || ""}
                      onChange={(e) => onChange((draft) => { draft.studentClass = e.target.value; })}
                      placeholder="e.g. VII-A"
                      className="w-full text-xs px-3.5 py-2.5 bg-slate-50 hover:bg-white focus:bg-white border border-slate-200 focus:border-indigo-500 text-slate-800 rounded-xl outline-none transition-all font-semibold font-sans shadow-inner placeholder-slate-400"
                    />
                  </div>
                </div>
              </div>

              {/* Input Anggota Kelompok (4 Kolom) */}
              <div className="space-y-2 font-sans pt-3 border-t border-slate-100">
                <div className="flex items-center space-x-1.5">
                  <Users className="w-4 h-4 text-indigo-500" />
                  <label className="text-[10px] font-black uppercase text-slate-600 tracking-wider block">
                    Nama Anggota Kelompok (Maksimal 4 Anggota)
                  </label>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
                  {[0, 1, 2, 3].map((idx) => (
                    <div key={idx} className="space-y-1 animate-fade-in">
                      <label className="text-[9px] font-bold text-slate-400 uppercase tracking-widest pl-1">
                        Anggota {idx + 1}
                      </label>
                      <input
                        id={`input-member-${idx}`}
                        type="text"
                        value={state.studentMembers?.[idx] || ""}
                        onChange={(e) => onChange((draft) => {
                          if (!draft.studentMembers) {
                            draft.studentMembers = ["", "", "", ""];
                          }
                          draft.studentMembers[idx] = e.target.value;
                          syncStudentName(draft);
                        })}
                        placeholder={`Nama Anggota ${idx + 1}`}
                        className="w-full text-xs px-3.5 py-2.5 bg-slate-50 hover:bg-white focus:bg-white border border-slate-200 focus:border-indigo-500 text-slate-800 rounded-xl outline-none transition-all font-semibold font-sans shadow-inner placeholder-slate-400"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Soft hint instead of error */}
            {!isFormValid && (
              <p className="text-[11px] text-[#425992] font-bold font-mono tracking-tight flex items-center justify-center space-x-1.5 text-center leading-tight">
                <Sparkles className="w-3.5 h-3.5 text-indigo-500" />
                <span>Bisa langsung klik tombol di bawah untuk menggunakan profil bawaan Kelompok 1 (Kelas VII-A)!</span>
              </p>
            )}

            <div className="text-[10px] text-slate-600 font-mono tracking-tight leading-relaxed pt-2 bg-slate-50 p-3 rounded-xl border border-slate-200 shadow-xs">
              🔒 <strong>PBL Offline-First:</strong> Semua data nama kelompok, ketua, dan 4 anggota tersimpan secara realtime otomatis ke penyimpanan lokal browser Anda. Anda bebas mereload tanpa khawatir kehilangan jawaban.
            </div>

            {/* Stepper controls with Launch action */}
            <div className="flex flex-col-reverse sm:flex-row sm:items-center sm:justify-between gap-4 pt-4 border-t border-slate-200">
              <button
                id="btn-ident-prev"
                onClick={() => setCurrentSlide(2)}
                className="w-full sm:w-auto px-4 py-2 hover:bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-600 bg-white flex items-center justify-center space-x-1.5 cursor-pointer active:scale-95 transition-all shadow-sm"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Kembali</span>
              </button>

              <button
                id="btn-ident-submit"
                onClick={handleStartClick}
                className="w-full sm:w-auto px-8 py-3.5 rounded-2xl font-black uppercase tracking-wider text-xs flex items-center justify-center space-x-2 shadow-sm transition-all bg-gradient-to-r from-teal-500 to-[#5BC0BE] hover:from-teal-600 hover:to-teal-500 text-slate-950 hover:text-black cursor-pointer active:scale-98"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>Mulai Kerjakan LKPD</span>
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
