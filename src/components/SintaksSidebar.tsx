import React from "react";
import { 
  Compass, 
  Users, 
  Image,
  FileText,
  BarChart3,
  MessageSquare,
  FileSpreadsheet, 
  Activity, 
  CheckCircle2 
} from "lucide-react";

interface SintaksSidebarProps {
  currentStep: number;
  onStepChange: (step: number) => void;
  completedSteps: number[];
}

export default function SintaksSidebar({ 
  currentStep, 
  onStepChange, 
  completedSteps 
}: SintaksSidebarProps) {
  const steps = [
    {
      num: 1,
      title: "ORIENTASI MASALAH",
      subtitle: "Langkah 1",
      icon: Compass,
      color: "from-amber-500 to-orange-600"
    },
    {
      num: 2,
      title: "MENGORGANISASI SISWA",
      subtitle: "Langkah 2",
      icon: Users,
      color: "from-blue-500 to-indigo-600"
    },
    {
      num: 3,
      title: "AMATI POSTER LAPANGAN",
      subtitle: "Langkah 3A",
      icon: Image,
      color: "from-red-500 to-rose-600"
    },
    {
      num: 4,
      title: "ANALISIS ARTIKEL BERITA",
      subtitle: "Langkah 3B",
      icon: FileText,
      color: "from-indigo-500 to-blue-600"
    },
    {
      num: 5,
      title: "DISKUSI TEMUAN TIM",
      subtitle: "Langkah 3C",
      icon: MessageSquare,
      color: "from-teal-500 to-emerald-600"
    },
    {
      num: 6,
      title: "MENYAJIKAN SOLUSI",
      subtitle: "Langkah 4",
      icon: FileSpreadsheet,
      color: "from-violet-500 to-purple-600"
    },
    {
      num: 7,
      title: "EVALUASI SOLUSI",
      subtitle: "Langkah 5",
      icon: Activity,
      color: "from-pink-500 to-rose-600"
    }
  ];

  return (
    <div className="w-80 bg-white border-r border-slate-200 text-slate-800 flex flex-col h-full scrollbar-thin">
      {/* Sidebar Header */}
      <div className="p-6 bg-gradient-to-b from-blue-50/50 via-slate-50/30 to-white border-b border-slate-200 flex flex-col items-center text-center">
        {/* Animated Earth Illustration Mockup */}
        <div className="relative w-24 h-24 mb-4 select-none">
          <div className="absolute inset-0 bg-blue-400/20 rounded-full animate-pulse blur-xl" />
          <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-blue-600 via-sky-400 to-emerald-400 border border-slate-200 flex items-center justify-center relative overflow-hidden animate-spin-slow">
            {/* Simple Earth Continents SVGs */}
            <div className="absolute w-8 h-6 bg-emerald-400 rounded-full top-4 left-4 rotate-12 opacity-80" />
            <div className="absolute w-12 h-8 bg-emerald-400 rounded-full bottom-4 right-2 -rotate-12 opacity-80" />
            <div className="absolute w-6 h-4 bg-emerald-505 rounded-full bottom-8 left-6 rotate-45 opacity-80" />
          </div>
          {/* Earth Eyes overlay (Cute face from workbook) */}
          <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-center space-x-3 z-10">
            <div className="w-3.5 h-3.5 bg-white rounded-full flex items-center justify-center p-0.5 shadow-md">
              <div className="w-1.5 h-1.5 bg-slate-900 rounded-full" />
            </div>
            <div className="w-3.5 h-3.5 bg-white rounded-full flex items-center justify-center p-0.5 shadow-md">
              <div className="w-1.5 h-1.5 bg-slate-900 rounded-full" />
            </div>
          </div>
          <div className="absolute inset-x-0 bottom-5 flex justify-center z-10">
            <div className="w-4 h-1.5 bg-rose-400 rounded-full border-b border-rose-600 animate-bounce" />
          </div>
        </div>

        <h1 className="text-sm font-black tracking-widest text-indigo-750 uppercase font-mono">
          MITIGASI BENCANA
        </h1>
        <p className="text-xs text-slate-500 mt-1 font-bold">
          Sintaks Problem-Based Learning
        </p>

        <span className="mt-3 px-3 py-1 text-[10px] uppercase tracking-wider font-mono font-bold text-white bg-red-500 rounded-full border border-red-400 shadow-sm">
          BANJIR DI ACEH ⚠️
        </span>
      </div>

      {/* Steps List */}
      <div className="flex-1 p-4 space-y-3 overflow-y-auto">
        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest pl-2 block">
          Alur Belajar Siswa
        </span>

        <div className="relative mt-2 pl-2">
          {/* Vertical Connecting Line */}
          <div className="absolute left-6.5 top-5 bottom-5 w-0.5 bg-slate-100" />

          <div className="space-y-4">
            {steps.map((step) => {
              const StepIcon = step.icon;
              const isActive = currentStep === step.num;
              const isCompleted = completedSteps.includes(step.num);

              return (
                <button
                  key={step.num}
                  id={`sidebar-step-btn-${step.num}`}
                  onClick={() => onStepChange(step.num)}
                  className={`w-full text-left relative flex items-start p-3 rounded-xl transition-all duration-300 group ${
                    isActive 
                      ? "bg-indigo-50 border-l-4 border-indigo-600 text-slate-850 shadow-sm" 
                      : "hover:bg-slate-50 text-slate-500 hover:text-slate-800"
                  }`}
                >
                  {/* Step Bubble Indicator */}
                  <div className="mr-3 mt-0.5 relative z-10">
                    <div 
                      className={`w-9 h-9 rounded-full flex items-center justify-center transition-all ${
                        isActive 
                          ? "bg-gradient-to-br from-indigo-500 to-blue-500 text-white scale-110 shadow-sm" 
                          : isCompleted 
                            ? "bg-emerald-50 text-emerald-600 border border-emerald-250" 
                            : "bg-slate-100 text-slate-400 border border-slate-200 group-hover:border-slate-300"
                      }`}
                    >
                      {isCompleted ? (
                        <CheckCircle2 className="w-5 h-5 animate-pulse-slow" />
                      ) : (
                        <StepIcon className="w-4 h-4" />
                      )}
                    </div>
                    {/* Tiny Number Badge */}
                    <div className="absolute -top-1 -right-1 bg-white border border-slate-200 text-slate-700 text-[9px] w-4.5 h-4.5 rounded-full flex items-center justify-center font-bold shadow-sm">
                      {step.num}
                    </div>
                  </div>

                  {/* Title & Detail */}
                  <div className="flex-1 min-w-0 pr-1">
                    <p className={`text-[10px] font-bold tracking-wider font-mono ${isActive ? 'text-indigo-600 font-bold' : 'text-slate-400'}`}>
                      {step.subtitle}
                    </p>
                    <p className={`text-xs font-extrabold leading-tight tracking-wide ${isActive ? 'text-slate-800' : 'text-slate-600'}`}>
                      {step.title}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Sidebar Footer Info */}
      <div className="p-4 bg-slate-50 border-t border-slate-200 text-[11px] text-slate-600">
        <div className="flex items-center space-x-2">
          <Activity className="w-3.5 h-3.5 text-emerald-600 animate-pulse" />
          <span className="font-bold">Pembelajaran Aktif Terintegrasi</span>
        </div>
        <p className="text-[10px] text-slate-500 mt-1 leading-relaxed">
          Sesuai standar kurikulum darurat & mitigasi bencana Geografi/Sains.
        </p>
      </div>
    </div>
  );
}
