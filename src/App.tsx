import React, { useState, useEffect } from "react";
import { RotateCcw } from "lucide-react";
import { WorkbookState } from "./types";
import { INITIAL_WORKBOOK_STATE } from "./data";

// Import custom views
import StartScreen from "./components/StartScreen";
import Langkah1 from "./components/Langkah1";
import Langkah2 from "./components/Langkah2";
import Langkah3 from "./components/Langkah3";
import Langkah4 from "./components/Langkah4";
import Langkah5 from "./components/Langkah5";
import GraduationScreen from "./components/GraduationScreen";

const STORAGE_KEY = "mitigasi_bencana_pbl_state_v2";

export default function App() {
  const [state, setState] = useState<WorkbookState>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        // Deep merge with INITIAL_WORKBOOK_STATE to restore missing fields
        const mergeObjects = (target: any, source: any): any => {
          if (!source) return target;
          const result = { ...source, ...target };
          for (const key of Object.keys(source)) {
            if (source[key] && typeof source[key] === "object" && !Array.isArray(source[key])) {
              result[key] = mergeObjects(target[key] || {}, source[key]);
            } else if (Array.isArray(source[key])) {
              result[key] = Array.isArray(target[key]) ? target[key] : [...source[key]];
            } else if (target[key] === undefined) {
              result[key] = source[key];
            }
          }
          return result;
        };
        return mergeObjects(parsed, INITIAL_WORKBOOK_STATE);
      }
    } catch (e) {
      console.warn("Could not load workbook state", e);
    }
    return INITIAL_WORKBOOK_STATE;
  });

  const [page, setPage] = useState<"start" | "workbook" | "finish">("start");

  const [currentStep, setCurrentStep] = useState<number>(1);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);

  // Sync state to local storage on save changes
  const updateState = (updater: (draft: WorkbookState) => void) => {
    setState((prev) => {
      // Shallow clone to allow direct mutations in drafting pattern
      const clone = JSON.parse(JSON.stringify(prev));
      updater(clone);
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(clone));
      } catch (e) {
        console.error("Could not save to localStorage", e);
      }
      return clone;
    });
  };

  // Evaluate if a Step has enough answers to be marked as "Completed"
  useEffect(() => {
    const completedList: number[] = [];
    
    // Check Step 1 Completion
    if ((state.langkah1?.masalahUtama || "").trim() && (state.langkah1?.penyebabUtama || "").trim()) {
      completedList.push(1);
    }
    // Check Step 2 Completion
    if ((state.langkah2?.selectedFacts || []).length > 0 && (state.langkah2?.thingsToLearn?.[0] || "").trim()) {
      completedList.push(2);
    }
    // Check Step 3 (Langkah 3A - Poster) Completion
    if ((state.langkah3?.investigationRows?.[0]?.dataDitemukan || "").trim()) {
      completedList.push(3);
    }
    // Check Step 4 (Langkah 3B - Artikel) Completion
    if ((state.langkah3?.investigationRows?.[1]?.dataDitemukan || "").trim()) {
      completedList.push(4);
    }
    // Check Step 5 (Langkah 3C - Diskusi Temuan Tim) Completion
    if (
      (state.langkah3?.discussionQuestions?.faktorBerpengaruh || "").trim() &&
      (state.langkah3?.discussionQuestions?.dampakNyata || "").trim()
    ) {
      completedList.push(5);
    }
    // Check Step 6 (Langkah 4) Completion
    if ((state.langkah4?.solusiTerbaik?.pencegahan?.solusi || "").trim() && (state.langkah4?.rancanganSolusi || "").trim()) {
      completedList.push(6);
    }
    // Check Step 7 (Langkah 5) Completion
    if ((state.langkah5?.analisisTerbaik || "").trim() && (state.langkah5?.kelebihanSolusi || "").trim()) {
      completedList.push(7);
    }

    setCompletedSteps(completedList);
  }, [state]);

  const handleStartApp = () => {
    setPage("workbook");
    setCurrentStep(1);
  };

  const handleFinishApp = () => {
    setPage("finish");
  };

  const handleCompleteFinish = () => {
    setState(INITIAL_WORKBOOK_STATE);
    localStorage.removeItem(STORAGE_KEY);
    setPage("start");
    setCurrentStep(1);
    setCompletedSteps([]);
  };

  const handleResetApp = () => {
    if (window.confirm("Apakah Anda yakin ingin menghapus semua jawaban dan mulai kembali dari awal?")) {
      setState(INITIAL_WORKBOOK_STATE);
      localStorage.removeItem(STORAGE_KEY);
      setPage("start");
      setCurrentStep(1);
      setCompletedSteps([]);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-emerald-50 flex font-sans overflow-x-hidden antialiased select-none selection:bg-emerald-200 selection:text-emerald-900">
      
      {/* MAIN WORKSPACE SCREEN CONTAINER (Full Screen / Full width area) */}
      <div className="flex-1 flex flex-col min-h-screen bg-transparent relative">
        
        {/* Ambient colored background lights for visual premium layout */}
        <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-blue-300/25 rounded-full blur-3xl -z-10 pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-emerald-300/20 rounded-full blur-3xl -z-10 pointer-events-none" />

        {/* Dynamic Responsive Navbar Header */}
        {page !== "start" && (
          <header className="h-16 bg-white/95 border-b border-slate-200/80 sticky top-0 z-30 flex items-center justify-between px-4 md:px-8 shrink-0 shadow-sm">
            <div className="flex items-center space-x-3">
              
              <div className="leading-none select-none">
                <span className="text-[10px] font-extrabold tracking-widest text-indigo-600 font-mono leading-none block uppercase">
                  LKPD Digital PBL
                </span>
                <p className="text-xs md:text-sm font-black text-slate-800 tracking-tight leading-none mt-1 font-sans">
                  {page === "finish" ? "KELULUSAN" : `LANGKAH ${
                    currentStep === 1 ? "1: ORIENTASI MASALAH" :
                    currentStep === 2 ? "2: MENGORGANISASI SISWA" :
                    currentStep === 3 ? "3A: AMATI POSTER LAPANGAN" :
                    currentStep === 4 ? "3B: BACA ARTIKEL BERITA" :
                    currentStep === 5 ? "3C: ANALISIS GRAFIK BMKG" :
                    currentStep === 6 ? "3D: DISKUSI TEMUAN TIM" :
                    currentStep === 7 ? "4: MENYAJIKAN SOLUSI" : "5: EVALUASI SOLUSI"
                  }`}
                </p>
              </div>
            </div>

            {/* Right Header Status / Identity Badge info */}
            <div className="flex items-center space-x-3">
              <button
                onClick={handleResetApp}
                className="flex items-center space-x-1 hover:text-red-600 text-slate-500 text-[10px] font-mono tracking-wider border border-slate-200 hover:border-red-300 hover:bg-red-50 px-2.5 py-1.5 rounded-lg bg-white transition-all cursor-pointer active:scale-95 shadow-sm"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Isi Ulang</span>
              </button>

              <button
                onClick={() => setPage("start")}
                className="px-2.5 py-1.5 bg-indigo-50 hover:bg-indigo-100/90 text-indigo-700 border border-indigo-200/70 font-mono text-[10px] font-extrabold uppercase rounded-lg transition-all cursor-pointer active:scale-95 flex items-center space-x-1 shadow-sm"
                title="Atur/Ubah Identitas Siswa Kelompok"
              >
                <span>{state.studentClass ? state.studentClass : "Isi Profil"}</span>
                <span className="text-[10px]">✏️</span>
              </button>
            </div>
          </header>
        )}

        {/* FULL SCREEN MAIN SCROLLABLE CONTENT BODY */}
        <main className="flex-1 overflow-y-auto p-2.5 sm:p-6 md:p-8 lg:p-10 scroll-smooth">
          <div className="w-full max-w-4xl mx-auto bg-white/95 border border-slate-200 rounded-2xl sm:rounded-3xl p-3.5 sm:p-6 md:p-8 shadow-xl relative">
            {/* Visual subtle ambient lights inside card */}
            <div className="absolute top-0 right-0 w-48 h-48 bg-teal-400/10 rounded-full blur-3xl pointer-events-none" />

            {page === "start" && (
              <StartScreen 
                state={state} 
                onChange={updateState} 
                onStart={handleStartApp} 
              />
            )}

            {page === "finish" && (
              <GraduationScreen 
                state={state} 
                onReset={handleCompleteFinish} 
              />
            )}

            {page === "workbook" && (
              <>
                {currentStep === 1 && (
                  <Langkah1 
                    state={state} 
                    onChange={updateState} 
                    onNext={() => setCurrentStep(2)} 
                  />
                )}
                {currentStep === 2 && (
                  <Langkah2 
                    state={state} 
                    onChange={updateState} 
                    onNext={() => setCurrentStep(3)} 
                    onPrev={() => setCurrentStep(1)} 
                  />
                )}
                {currentStep === 3 && (
                  <Langkah3 
                    state={state} 
                    onChange={updateState} 
                    onNext={() => setCurrentStep(4)} 
                    onPrev={() => setCurrentStep(2)} 
                    subStep={1}
                    onSubStepChange={(stepNum) => setCurrentStep(stepNum + 2)}
                  />
                )}
                {currentStep === 4 && (
                  <Langkah3 
                    state={state} 
                    onChange={updateState} 
                    onNext={() => setCurrentStep(5)} 
                    onPrev={() => setCurrentStep(3)} 
                    subStep={2}
                    onSubStepChange={(stepNum) => setCurrentStep(stepNum + 2)}
                  />
                )}
                {currentStep === 5 && (
                  <Langkah3 
                    state={state} 
                    onChange={updateState} 
                    onNext={() => setCurrentStep(6)} 
                    onPrev={() => setCurrentStep(4)} 
                    subStep={3}
                    onSubStepChange={(stepNum) => setCurrentStep(stepNum + 2)}
                  />
                )}
                {currentStep === 6 && (
                  <Langkah4 
                    state={state} 
                    onChange={updateState} 
                    onNext={() => setCurrentStep(7)} 
                    onPrev={() => setCurrentStep(5)} 
                  />
                )}
                {currentStep === 7 && (
                  <Langkah5 
                    state={state} 
                    onChange={updateState} 
                    onPrev={() => setCurrentStep(6)} 
                    onFinish={handleFinishApp} 
                  />
                )}
              </>
            )}
          </div>
        </main>

      </div>
    </div>
  );
}
