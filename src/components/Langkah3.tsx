import React, { useState } from "react";
import { 
  Search, 
  ChevronLeft, 
  ChevronRight, 
  Image, 
  FileText, 
  BarChart, 
  CheckCircle,
  Sparkles,
  Info,
  MapPin,
  Users,
  UserX,
  Droplets,
  Trees,
  Trash2,
  AlertTriangle,
  ZoomIn,
  ZoomOut
} from "lucide-react";
import { WorkbookState, InvestigationRow } from "../types";

interface LangkahProp {
  state: WorkbookState;
  onChange: (updater: (draft: WorkbookState) => void) => void;
  onNext: () => void;
  onPrev: () => void;
  subStep: 1 | 2 | 3;
  onSubStepChange: (val: number) => void;
}

export default function Langkah3({ state, onChange, onNext, onPrev, subStep, onSubStepChange }: LangkahProp) {
  const [isPosterMaximized, setIsPosterMaximized] = useState(false);
  const [activePosterTab, setActivePosterTab] = useState<"image" | "text">("image");
  const [posterPathIdx, setPosterPathIdx] = useState(0);
  const [hasImageError, setHasImageError] = useState(false);

  const posterPaths = [
    "/src/components/PosterACEH.png",
    "/src/components/PosterACEH.jpg",
    "/src/components/PosterACEH.PNG",
    "/src/components/PosterACEH.jpeg",
    "PosterACEH.png",
    "/PosterACEH.png",
    "https://images.unsplash.com/photo-1545088741-21389a172c54?auto=format&fit=crop&w=1200&q=80"
  ];

  const handlePosterError = () => {
    if (posterPathIdx < posterPaths.length - 1) {
      setPosterPathIdx(prev => prev + 1);
    } else {
      setHasImageError(true);
      setActivePosterTab("text"); // Switch to text if image completely fails
    }
  };

  const subPage = subStep;
  const setSubPage = (val: number) => onSubStepChange(val);

  // Update a specific cell in the investigation table
  const handleTableCellChange = (rowIndex: number, colName: keyof InvestigationRow, value: string) => {
    onChange((draft) => {
      draft.langkah3.investigationRows[rowIndex][colName] = value;
    });
  };

  const handleDiscussionChange = (key: keyof WorkbookState["langkah3"]["discussionQuestions"], value: string) => {
    onChange((draft) => {
      draft.langkah3.discussionQuestions[key] = value;
    });
  };

  return (
    <div id="langkah3-container" className="space-y-6 text-slate-800">
      {/* Step Header Badge */}
      <div className="flex items-center justify-end">
        <div className="flex items-center space-x-1 text-slate-500 text-xs font-medium">
          <Search className="w-3.5 h-3.5 text-teal-600" />
          <span>Sintaks PBL</span>
        </div>
      </div>

      {/* Main Title */}
      <div className="space-y-2">
        <h2 className="text-2xl font-black text-slate-850 tracking-tight leading-tight uppercase">
          {subPage === 1 && "Membimbing Penyelidikan • Aktivitas 1: Analisis Poster"}
          {subPage === 2 && "Membimbing Penyelidikan • Aktivitas 2: Data Portal BPBA"}
          {subPage === 3 && "Membimbing Penyelidikan • Kolaborasi & Diskusi"}
        </h2>
        <p className="text-slate-600 text-sm font-medium">
          {subPage === 1 && "Amati poster mitigasi bencana di bawah ini secara saksama untuk menganalisis keterkaitan kondisi hulu-hilir dan catat temuan Anda."}
          {subPage === 2 && "Bacalah laporan rilis data resmi kebencanaan dari Portal BPBA Provinsi Aceh dan rumuskan poin-poin penting darinya."}
          {subPage === 3 && "Diskusikan temuan yang Anda dapatkan dengan anggota kelompok untuk menjawab pertanyaan kritis."}
        </p>
      </div>

      {subPage === 1 && (
        <div className="space-y-5 animate-fade-in">
          {/* DIGITAL POSTER CONTAINER */}
          <div className="border border-slate-200 p-4 sm:p-5 md:p-6 rounded-3xl bg-slate-900 text-white shadow-xl font-sans space-y-5 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none -z-10" />
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-teal-500/10 rounded-full blur-3xl pointer-events-none -z-10" />
            
            <div className="space-y-1">
              <p className="text-[9px] font-mono font-bold tracking-widest text-emerald-450 uppercase">
                MEDIA BELAJAR MANDIRI & KELOMPOK
              </p>
              <h4 className="text-lg font-black text-white uppercase tracking-tight leading-snug">
                Penyebab Banjir Bandang & Luapan Lumpur di Bantaran Hulu Aceh
              </h4>
              <p className="text-xs text-slate-300 font-medium">
                Saksama analisis infografis visual di bawah ini secara saksama untuk mengisi borang laporan penyelidikan.
              </p>
            </div>
            
            {/* THE UNIFIED DIRECT DISPLAY: Centered Beautiful Poster Only */}
            <div className="flex flex-col items-center justify-center bg-slate-950 rounded-2xl border border-slate-800 p-4 sm:p-5 shadow-inner">
              <div className="relative w-full max-w-xl aspect-[3/4.5] sm:aspect-[3/4] rounded-xl overflow-hidden bg-slate-950 flex items-center justify-center border border-slate-900 shadow-2xl">
                <img
                  src={posterPaths[posterPathIdx]}
                  onError={handlePosterError}
                  alt="Poster Mitigasi Bencana Aceh"
                  className="max-w-full max-h-full object-contain select-none"
                />
              </div>
            </div>


          </div>

          {/* ANALYSIS FORM COLUMN 1 (VIDEO INDEX 0) */}
          <div className="bg-white border border-slate-200 rounded-3xl p-5 md:p-6 space-y-5 shadow-md">
            <div className="border-b border-slate-100 pb-3">
              <h3 className="text-sm font-black text-slate-900 uppercase tracking-wide flex items-center space-x-1.5">
                <span className="w-5 h-5 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-black flex items-center justify-center font-mono">1</span>
                <span>Analisis Hasil Pengamatan Poster Edukasi</span>
              </h3>
            </div>

            <div className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-[10px] font-black uppercase text-slate-600 tracking-wider block">
                  🔍 Data Yang Ditemukan
                </label>
                <textarea
                  id="video-data-found"
                  value={state.langkah3.investigationRows[0].dataDitemukan}
                  onChange={(e) => handleTableCellChange(0, "dataDitemukan", e.target.value)}
                  placeholder="Seberapa sering bencana terjadi & apa data visual kunci yang tampak di hulu dan hilir berdasarkan poster?"
                  rows={3}
                  className="w-full text-xs p-3 bg-slate-50 border border-slate-200 focus:bg-white focus:ring-2 focus:ring-indigo-500 rounded-xl outline-none font-semibold leading-relaxed resize-none text-slate-800 shadow-inner placeholder-slate-400 font-sans"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-black uppercase text-slate-600 tracking-wider block">
                  📌 Fakta Penting Lapangan
                </label>
                <textarea
                  id="video-facts"
                  value={state.langkah3.investigationRows[0].faktaPenting}
                  onChange={(e) => handleTableCellChange(0, "faktaPenting", e.target.value)}
                  placeholder="Kondisi riil lapangan yang digambarkan (misal: kondisi hutan gundul di hulu, penyumbatan parit di hilir)..."
                  rows={3}
                  className="w-full text-xs p-3 bg-slate-50 border border-slate-200 focus:bg-white focus:ring-2 focus:ring-indigo-500 rounded-xl outline-none font-semibold leading-relaxed resize-none text-slate-800 shadow-inner placeholder-slate-400 font-sans"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-black uppercase text-slate-600 tracking-wider block">
                  🔗 Hubungan Dengan Kejadian Banjir
                </label>
                <textarea
                  id="video-relation"
                  value={state.langkah3.investigationRows[0].maknaHubungan}
                  onChange={(e) => handleTableCellChange(0, "maknaHubungan", e.target.value)}
                  placeholder="Bagaimana keterkaitan faktor alam di hulu dan perilaku manusia di hilir memicu luapan banjir bandang?"
                  rows={3}
                  className="w-full text-xs p-3 bg-slate-50 border border-slate-200 focus:bg-white focus:ring-2 focus:ring-indigo-500 rounded-xl outline-none font-semibold leading-relaxed resize-none text-slate-800 shadow-inner placeholder-slate-400 font-sans"
                />
              </div>
            </div>
          </div>

          {/* FORWARDBACKWARD CONTROLS */}
          <div className="flex items-center justify-between pt-2">
            <button
              onClick={onPrev}
              className="flex items-center space-x-1 border border-slate-300 bg-white hover:bg-slate-50 text-slate-600 active:scale-95 font-bold text-xs uppercase px-4 py-2.5 rounded-xl transition-all cursor-pointer shadow-sm"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Kembali</span>
            </button>

            <button
              onClick={() => { setSubPage(2); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className="flex items-center space-x-1.5 bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white font-extrabold text-xs tracking-wider uppercase px-5 py-3 rounded-xl shadow transition-all cursor-pointer"
            >
              <span>Lanjut</span>
              <ChevronRight className="w-4 h-4 text-white" />
            </button>
          </div>
        </div>
      )}

      {subPage === 2 && (
        <div className="space-y-5 animate-fade-in">
          {/* ARTICLE CONTAINER */}
          <div className="border border-slate-200 p-4 sm:p-5 md:p-6 rounded-3xl bg-slate-900 text-white shadow-xl font-sans space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
              <div className="flex items-center space-x-2">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse" />
                <span className="text-[10px] font-mono font-bold tracking-wider text-red-400 uppercase">
                  SITUASI DARURAT SIAGA BANJIR ACEH
                </span>
              </div>
              <span className="text-[10px] inline-block bg-slate-800 text-slate-300 border border-slate-700 rounded px-2.5 py-1 font-mono font-bold uppercase tracking-wider">
                DIREKTORAT PUSDATIN BPBA ACEH
              </span>
            </div>
            
            <div className="space-y-1.5">
              <p className="text-[10px] font-mono font-bold tracking-widest text-slate-400 uppercase">
                PORTAL RESMI BADAN PENANGGULANGAN BENCANA ACEH
              </p>
              <h4 className="text-base font-black text-white uppercase tracking-tight leading-snug">
                Laporan Situasi Terkini Bencana Hidrometeorologi Provinsi Aceh (Per 27 November)
              </h4>
            </div>

            {/* METRICS GRID */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 py-1">
              {/* Card 1: Wilayah Terdampak */}
              <div className="bg-slate-950/40 p-2 rounded-lg border border-amber-500/20 shadow-[0_0_8px_rgba(245,158,11,0.02)] flex flex-col justify-between h-14 hover:border-amber-500/40 transition-all select-none">
                <div className="flex items-center space-x-1.5">
                  <div className="p-0.5 bg-amber-500/10 text-amber-400 rounded-md shrink-0">
                    <MapPin className="w-3 h-3" />
                  </div>
                  <span className="text-[8px] font-mono font-bold tracking-wider text-slate-400 uppercase truncate">
                    Wilayah
                  </span>
                </div>
                <span className="text-[10px] sm:text-xs font-extrabold text-amber-400 block font-sans">
                  16 Kab/Kota
                </span>
              </div>

              {/* Card 2: Total Mengungsi */}
              <div className="bg-slate-950/40 p-2 rounded-lg border border-red-500/20 shadow-[0_0_8px_rgba(239,68,68,0.02)] flex flex-col justify-between h-14 hover:border-red-500/40 transition-all select-none">
                <div className="flex items-center space-x-1.5">
                  <div className="p-0.5 bg-red-500/10 text-red-400 rounded-md shrink-0">
                    <Users className="w-3 h-3" />
                  </div>
                  <span className="text-[8px] font-mono font-bold tracking-wider text-slate-400 uppercase truncate">
                    Mengungsi
                  </span>
                </div>
                <span className="text-[10px] sm:text-xs font-extrabold text-red-400 block font-sans">
                  20.759 Jiwa
                </span>
              </div>

              {/* Card 3: Korban (Hilang) */}
              <div className="bg-slate-950/40 p-2 rounded-lg border border-rose-500/25 shadow-[0_0_8px_rgba(244,63,94,0.02)] flex flex-col justify-between h-14 hover:border-rose-500/45 transition-all select-none">
                <div className="flex items-center space-x-1.5">
                  <div className="p-0.5 bg-rose-500/10 text-rose-400 rounded-md shrink-0">
                    <UserX className="w-3 h-3" />
                  </div>
                  <span className="text-[8px] font-mono font-bold tracking-wider text-slate-400 uppercase truncate">
                    Korban
                  </span>
                </div>
                <span className="text-[10px] sm:text-xs font-extrabold text-rose-400 block font-sans">
                  1 Org Hilang
                </span>
              </div>

              {/* Card 4: Tinggi Genangan */}
              <div className="bg-slate-950/40 p-2 rounded-lg border border-sky-500/20 shadow-[0_0_8px_rgba(14,165,233,0.02)] flex flex-col justify-between h-14 hover:border-sky-500/40 transition-all select-none">
                <div className="flex items-center space-x-1.5">
                  <div className="p-0.5 bg-sky-500/10 text-sky-400 rounded-md shrink-0">
                    <Droplets className="w-3 h-3" />
                  </div>
                  <span className="text-[8px] font-mono font-bold tracking-wider text-slate-400 uppercase truncate">
                    Genangan
                  </span>
                </div>
                <span className="text-[10px] sm:text-xs font-extrabold text-sky-400 block font-sans">
                  0.5-1.5 Mtr
                </span>
              </div>
            </div>
            
            <div className="space-y-3 pt-1 border-t border-slate-800 text-slate-300 text-xs leading-relaxed text-justify">
              <p className="indent-5">
                Pusat Data dan Informasi (Pusdatin) BPBA melaporkan bahwa rentetan daerah aliran sungai (DAS) utama meluap melampaui batas tanggul secara kritis akibat curah hujan harian ekstrem selama sepekan terakhir. Wilayah terdampak mencakup Aceh Selatan, Aceh Tenggara, Aceh Barat, Aceh Barat Daya, Aceh Jaya, Singkil, hingga wilayah pesisir timur termasuk Bireuen, Utara, dan Tamiang.
              </p>
              <p className="indent-5">
                Konfirmasi data dari Kepala Pelaksana BPBA menyebutkan total warga yang terpaksa mengungsi mencapai <span className="font-bold text-red-300">20.759 jiwa</span> dari ribuan KK yang dilaporkan terdampak langsung. Selain itu, <span className="font-bold text-red-400">satu orang warga dilaporkan hilang terseret arus deras</span> luapan sungai di hulu Kabupaten Aceh Selatan saat evakuasi mandiri sedang dimobilisasi. Tim SAR Gabungan masih terus disiagakan menyisir rute hulu-hilir sungai guna melakukan aksi pencarian koordinatif. Ketinggian air genangan di pemukiman berkisar antara 50 sentimeter hingga 1.5 meter, melumpuhkan total sendi perekonomian daerah.
              </p>
              <p className="indent-5 text-[11px] text-slate-400 italic bg-slate-950 p-3 rounded-2xl border border-slate-800 font-sans">
                "Kondisi tanah di perbukitan hulu Aceh saat ini sudah mencapai titik jenuh air (saturated soil) yang ekstrem dikarenakan intensitas presipitasi harian berkisar antara 150-300 mm. Mengingat kapasitas asimilasi/daya serap hutan perbukitan sudah berkurang drastis akibat terjadinya alih fungsi lahan, limpasan air hujan langsung bergerak bebas sebagai air permukaan (run-off) berkecepatan tinggi pembawa sedimen tebal ke hilir lereng," papar dokumen paparan analisis kebencanaan Pusdatin BPBA.
              </p>
            </div>
          </div>

          {/* ANALYSIS FORM COLUMN 2 (ARTICLE INDEX 1) */}
          <div className="bg-white border border-slate-200 rounded-3xl p-5 md:p-6 space-y-5 shadow-md">
            <div className="border-b border-slate-100 pb-3">
              <h3 className="text-sm font-black text-slate-900 uppercase tracking-wide flex items-center space-x-1.5">
                <span className="w-5 h-5 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-black flex items-center justify-center font-mono">2</span>
                <span>Analisis Hasil Laporan BPBA Aceh</span>
              </h3>
            </div>

            <div className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-[10px] font-black uppercase text-slate-600 tracking-wider block">
                  🔍 Data Yang Ditemukan
                </label>
                <textarea
                  id="article-data-found"
                  value={state.langkah3.investigationRows[1].dataDitemukan}
                  onChange={(e) => handleTableCellChange(1, "dataDitemukan", e.target.value)}
                  placeholder="Berapa banyak kabupaten/kota yang terendam banjir? Sebutkan statistik jumlah warga mengungsi dan korban hilang berdasarkan rilis BPBA Aceh!"
                  rows={3}
                  className="w-full text-xs p-3 bg-slate-50 border border-slate-200 focus:bg-white focus:ring-2 focus:ring-indigo-500 rounded-xl outline-none font-semibold leading-relaxed resize-none text-slate-800 shadow-inner placeholder-slate-400 font-sans"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-black uppercase text-slate-600 tracking-wider block">
                  📌 Fakta Penting Lapangan
                </label>
                <textarea
                  id="article-facts"
                  value={state.langkah3.investigationRows[1].faktaPenting}
                  onChange={(e) => handleTableCellChange(1, "faktaPenting", e.target.value)}
                  placeholder="Apa saja dampak fatal kebencanaan di lapangan yang disebutkan? (Ketinggian banjir, lumpuhnya aktivitas, kendala proses evakuasi)..."
                  rows={3}
                  className="w-full text-xs p-3 bg-slate-50 border border-slate-200 focus:bg-white focus:ring-2 focus:ring-indigo-500 rounded-xl outline-none font-semibold leading-relaxed resize-none text-slate-800 shadow-inner placeholder-slate-400 font-sans"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-black uppercase text-slate-600 tracking-wider block">
                  🔗 Hubungan Dengan Kejadian Banjir
                </label>
                <textarea
                  id="article-relation"
                  value={state.langkah3.investigationRows[1].maknaHubungan}
                  onChange={(e) => handleTableCellChange(1, "maknaHubungan", e.target.value)}
                  placeholder="Berdasarkan pakar hidro-meteorologi di rilis berita, mengapa curah hujan ekstrem yang berpadu dengan berkurangnya kapasitas resapan hutan langsung memicu luapan banjir bandang deras berlumpur di wilayah hilir?"
                  rows={3}
                  className="w-full text-xs p-3 bg-slate-50 border border-slate-200 focus:bg-white focus:ring-2 focus:ring-indigo-500 rounded-xl outline-none font-semibold leading-relaxed resize-none text-slate-800 shadow-inner placeholder-slate-400 font-sans"
                />
              </div>
            </div>
          </div>

          {/* FORWARDBACKWARD CONTROLS */}
          <div className="flex items-center justify-between pt-2">
            <button
              onClick={() => { setSubPage(1); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className="flex items-center space-x-1 border border-slate-300 bg-white hover:bg-slate-50 text-slate-600 active:scale-95 font-bold text-xs uppercase px-4 py-2.5 rounded-xl transition-all cursor-pointer shadow-sm"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Kembali</span>
            </button>

            <button
              onClick={() => { setSubPage(3); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className="flex items-center space-x-1.5 bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white font-extrabold text-xs tracking-wider uppercase px-5 py-3 rounded-xl shadow transition-all cursor-pointer"
            >
              <span>Lanjut</span>
              <ChevronRight className="w-4 h-4 text-white" />
            </button>
          </div>
        </div>
      )}

      {subPage === 3 && (
        <div className="space-y-5 animate-fade-in">
          {/* SECTION C: Diskusi Kelompok */}
          <div className="space-y-4">
            <div className="bg-teal-600 text-white font-extrabold text-xs uppercase px-4 py-2.5 rounded-xl shadow-sm tracking-wider flex items-center justify-between">
              <span>Lembar Diskusi Hasil Penyelidikan Kelompok</span>
              <span className="text-[10px] bg-teal-850 px-2 py-0.5 rounded font-mono font-bold">4 Pertanyaan Inti</span>
            </div>

            <div className="space-y-5 bg-white p-5 border border-slate-200 rounded-3xl shadow-md">
              {/* Question 1 */}
              <div className="space-y-1.5">
                <p className="text-xs font-black text-slate-800 flex items-start space-x-1.5 leading-tight">
                  <span className="text-teal-600 font-mono text-sm">1.</span>
                  <span>Faktor apa saja yang paling berpengaruh rill menyebabkan banjir bandang dan longsor lereng di Aceh?</span>
                </p>
                <textarea
                  id="diskusi-faktor"
                  value={state.langkah3.discussionQuestions.faktorBerpengaruh}
                  onChange={(e) => handleDiscussionChange("faktorBerpengaruh", e.target.value)}
                  placeholder="Sebutkan faktor alam (hujan super lebat) & faktor antropogenik manusia (penebangan, tumpukan sampah, kapasitas selokan yang buruk)..."
                  rows={2.5}
                  className="w-full text-xs p-3.5 border border-slate-250 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-teal-400 outline-none rounded-xl transition-all font-semibold font-sans text-slate-800 shadow-inner"
                />
              </div>

              {/* Question 2 */}
              <div className="space-y-1.5">
                <p className="text-xs font-black text-slate-805 flex items-start space-x-1.5 leading-tight">
                  <span className="text-teal-600 font-mono text-sm">2.</span>
                  <span>Apa dampak nyata secara sosial, ekonomi, maupun fisik yang dirasakan langsung oleh masyarakat bantaran hilir?</span>
                </p>
                <textarea
                  id="diskusi-dampak"
                  value={state.langkah3.discussionQuestions.dampakNyata}
                  onChange={(e) => handleDiscussionChange("dampakNyata", e.target.value)}
                  placeholder="Kerugian material bangunan, terisolasi akibat jembatan putus, krisis kebersihan air, resiko luka fisik, kesulitan mengungsi cepat..."
                  rows={2.5}
                  className="w-full text-xs p-3.5 border border-slate-250 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-teal-400 outline-none rounded-xl transition-all font-semibold font-sans text-slate-800 shadow-inner"
                />
              </div>

              {/* Question 3 */}
              <div className="space-y-1.5">
                <p className="text-xs font-black text-slate-805 flex items-start space-x-1.5 leading-tight">
                  <span className="text-teal-600 font-mono text-sm">3.</span>
                  <span>Upaya dan tindakan darurat apa saja yang sudah dilakukan (oleh BPBD, warga, maupun relawan) untuk menanggulangi bencana tersebut?</span>
                </p>
                <textarea
                  id="diskusi-upaya"
                  value={state.langkah3.discussionQuestions.upayaTindakan}
                  onChange={(e) => handleDiscussionChange("upayaTindakan", e.target.value)}
                  placeholder="Penggunaan perahu karet evakuasi, penyaluran logistik sembako dapur umum BPBD, pembangunan tanggul penahan darurat..."
                  rows={2.5}
                  className="w-full text-xs p-3.5 border border-slate-250 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-teal-400 outline-none rounded-xl transition-all font-semibold font-sans text-slate-805 shadow-inner"
                />
              </div>

              {/* Question 4 */}
              <div className="space-y-1.5">
                <p className="text-xs font-black text-slate-805 flex items-start space-x-1.5 leading-tight">
                  <span className="text-teal-600 font-mono text-sm">4.</span>
                  <span>Siapa saja pihak yang mutlak harus terlibat berkolaborasi dalam mencegah dampak terulangnya bencana ini di kemudian hari?</span>
                </p>
                <textarea
                  id="diskusi-pihak"
                  value={state.langkah3.discussionQuestions.pihakTerlibat}
                  onChange={(e) => handleDiscussionChange("pihakTerlibat", e.target.value)}
                  placeholder="Aparatur daerah BPBD/BMKG selaku pemandu, tokoh desa pelopor ronda banjir, pimpinan kehutanan hulu, serta kontribusi aktif kedisiplinan warga..."
                  rows={2.5}
                  className="w-full text-xs p-3.5 border border-slate-250 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-teal-400 outline-none rounded-xl transition-all font-semibold font-sans text-slate-805 shadow-inner"
                />
              </div>
            </div>

            {/* Motivational cheer footer */}
            <div className="bg-emerald-50 border border-emerald-250 text-emerald-850 p-4 rounded-3xl flex items-start space-x-3 shadow-xs">
              <div className="p-1.5 bg-emerald-100 rounded-xl text-emerald-600 flex-shrink-0">
                <CheckCircle className="w-5 h-5" />
              </div>
              <p className="text-[12px] leading-relaxed font-semibold text-emerald-950">
                <span className="font-extrabold block text-emerald-900 mb-0.5 uppercase tracking-wide">Luar Biasa!</span>
                Kelompok Anda telah menuntaskan seluruh proses pengumpulan serta analisis data penyelidikan ilmiah. Mari kita rumuskan solusi pencegahannya di langkah berikutnya!
              </p>
            </div>
          </div>

          {/* Bottom Actions */}
          <div className="flex items-center justify-between pt-2">
            <button
              onClick={() => { setSubPage(2); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className="flex items-center space-x-1 border border-slate-300 bg-white hover:bg-slate-50 text-slate-600 active:scale-95 font-bold text-xs uppercase px-4 py-2.5 rounded-xl transition-all cursor-pointer shadow-sm"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Kembali</span>
            </button>

            <button
              id="btn-submit-step3"
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
