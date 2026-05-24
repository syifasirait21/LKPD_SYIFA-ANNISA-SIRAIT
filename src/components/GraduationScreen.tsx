import React, { useState } from "react";
import { 
  Check, 
  GraduationCap, 
  CheckCircle, 
  Star,
  Send,
  Users,
  Sparkles,
  Home,
  Printer,
  Clipboard,
  ChevronDown,
  ChevronUp,
  FileText
} from "lucide-react";
import { WorkbookState } from "../types";
import { FACTS_LIST } from "../data";

interface GradProps {
  state: WorkbookState;
  onReset: () => void;
}

export default function GraduationScreen({ state, onReset }: GradProps) {
  const [rating, setRating] = useState<number>(0);
  const [hoverRating, setHoverRating] = useState<number>(0);
  const [comment, setComment] = useState("");
  const [submittedFeedback, setSubmittedFeedback] = useState(false);
  const [isRecapExpanded, setIsRecapExpanded] = useState(true);
  const [isCopied, setIsCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<number>(1);

  // Filter members that aren't empty strings
  const membersList = state.studentMembers ? state.studentMembers.filter(m => m.trim() !== "") : [];

  const handleCopyText = () => {
    const textReport = `===========================================
REKAP JAWABAN LKPD DIGITAL PBL (MITIGASI BANJIR)
===========================================
IDENTITAS KELOMPOK
- Nama Kelompok: ${state.studentGroup || "Kelompok Belajar"}
- Kelas: ${state.studentClass || "7-A"}
- Ketua: ${state.studentLeader || "Siswa Mandiri"}
- Anggota: ${membersList.join(", ") || "Tidak Ada"}

-------------------------------------------
LANGKAH 1: ORIENTASI MASALAH
-------------------------------------------
- Masalah Utama:
  ${state.langkah1?.masalahUtama || "-"}
- Penyebab Utama:
  ${state.langkah1?.penyebabUtama || "-"}
- Dampak Utama:
  ${state.langkah1?.dampakUtama || "-"}

-------------------------------------------
LANGKAH 2: MENGORGANISASIKAN SISWA
-------------------------------------------
- Faktor Terpilih:
  ${(state.langkah2?.selectedFacts || []).map(id => {
    const item = FACTS_LIST.find(f => f.id === id);
    return `* [${item?.label || id}] - ${item?.desc || ""}`;
  }).join("\n  ") || "Tidak ada faktor terpilih"}
- Informasi Tambahan:
  ${state.langkah2?.additionalInfo || "-"}
- Faktor Berdasarkan Kategori:
  * Alami: ${(state.langkah2?.categorization?.alami || []).map(id => FACTS_LIST.find(f => f.id === id)?.label || id).join(", ") || "-"}
  * Manusia: ${(state.langkah2?.categorization?.manusia || []).map(id => FACTS_LIST.find(f => f.id === id)?.label || id).join(", ") || "-"}
- Pertanyaan Penting yang Dikaji:
  ${(state.langkah2?.thingsToLearn || []).filter(item => item.trim() !== "").map((item, idx) => `${idx + 1}. ${item}`).join("\n  ") || "-"}

-------------------------------------------
LANGKAH 3: MEMBIMBING PENYELIDIKAN
-------------------------------------------
- Temuan Poster Lapangan:
  * Data: ${state.langkah3?.investigationRows?.[0]?.dataDitemukan || "-"}
  * Fakta Penting: ${state.langkah3?.investigationRows?.[0]?.faktaPenting || "-"}
  * Hubungan/Makna: ${state.langkah3?.investigationRows?.[0]?.maknaHubungan || "-"}

- Temuan Membaca Berita:
  * Data: ${state.langkah3?.investigationRows?.[1]?.dataDitemukan || "-"}
  * Fakta Penting: ${state.langkah3?.investigationRows?.[1]?.faktaPenting || "-"}
  * Hubungan/Makna: ${state.langkah3?.investigationRows?.[1]?.maknaHubungan || "-"}

- Temuan Analisis Grafik BMKG:
  * Data: ${state.langkah3?.investigationRows?.[2]?.dataDitemukan || "-"}
  * Fakta Penting: ${state.langkah3?.investigationRows?.[2]?.faktaPenting || "-"}
  * Hubungan/Makna: ${state.langkah3?.investigationRows?.[2]?.maknaHubungan || "-"}

- Temuan Diskusi Tim:
  * Data: ${state.langkah3?.investigationRows?.[3]?.dataDitemukan || "-"}
  * Fakta Penting: ${state.langkah3?.investigationRows?.[3]?.faktaPenting || "-"}
  * Hubungan/Makna: ${state.langkah3?.investigationRows?.[3]?.maknaHubungan || "-"}

- Hal Menakjubkan yang Baru Diketahui:
  ${state.langkah3?.shockingFact || "-"}

- Pertanyaan Diskusi:
  1. Dampak curah hujan tinggi ekstrem di DAS Aceh:
     ${state.langkah3?.discussionQuestions?.faktorBerpengaruh || "-"}
  2. Dampak nyata banjir rob & genangan di pesisir:
     ${state.langkah3?.discussionQuestions?.dampakNyata || "-"}
  3. Mengapa kesiapsiagaan krusial dibandingkan pascabencana:
     ${state.langkah3?.discussionQuestions?.upayaTindakan || "-"}
  4. Peran pemerintah, masyarakat, & relawan:
     ${state.langkah3?.discussionQuestions?.pihakTerlibat || "-"}

-------------------------------------------
LANGKAH 4: MENGEMBANGKAN SOLUSI
-------------------------------------------
- Bank Solusi 4 Pilar:
  * Pencegahan: ${(state.langkah4?.ideSolusi?.pencegahan || []).filter(x => x.trim() !== "").join(", ") || "-"}
  * Kesiapsiagaan: ${(state.langkah4?.ideSolusi?.kesiapsiagaan || []).filter(x => x.trim() !== "").join(", ") || "-"}
  * Penanganan: ${(state.langkah4?.ideSolusi?.penanganan || []).filter(x => x.trim() !== "").join(", ") || "-"}
  * Pemulihan: ${(state.langkah4?.ideSolusi?.pemulihan || []).filter(x => x.trim() !== "").join(", ") || "-"}

- Formulasi Solusi Terbaik & Alasan:
  * Pencegahan: ${state.langkah4?.solusiTerbaik?.pencegahan?.solusi || "-"} (Alasan: ${state.langkah4?.solusiTerbaik?.pencegahan?.alasan || "-"})
  * Kesiapsiagaan: ${state.langkah4?.solusiTerbaik?.kesiapsiagaan?.solusi || "-"} (Alasan: ${state.langkah4?.solusiTerbaik?.kesiapsiagaan?.alasan || "-"})
  * Penanganan: ${state.langkah4?.solusiTerbaik?.penanganan?.solusi || "-"} (Alasan: ${state.langkah4?.solusiTerbaik?.penanganan?.alasan || "-"})
  * Pemulihan: ${state.langkah4?.solusiTerbaik?.pemulihan?.solusi || "-"} (Alasan: ${state.langkah4?.solusiTerbaik?.pemulihan?.alasan || "-"})

- Konseptual Fisik & Presentasi:
  * Deskripsi Teknis: ${state.langkah4?.rancanganSolusi || "-"}
  * Rencana Media Penyajian: ${(state.langkah4?.mediaPenyajian || []).join(", ")}${state.langkah4?.mediaPenyajianLainnya ? ` (Lainnya: ${state.langkah4?.mediaPenyajianLainnya})` : ""}
  * Poin Penyajian Utama:
    ${(state.langkah4?.sajianPoin || []).filter(x => x.trim() !== "").map((p, i) => `${i + 1}. ${p}`).join("\n    ") || "-"}

-------------------------------------------
LANGKAH 5: MENGANALISIS & MENGEVALUASI
-------------------------------------------
- Tabel Kelayakan Solusi (Skor 1-4):
  ${(state.langkah5?.evaluasiBaris || []).map(row => {
    return `* ${row.solusi} => Kelayakan: ${row.kelayakan}/4, Efektivitas: ${row.efektivitas}/4, Dampak: ${row.dampakPositif}/4, Berkelanjutan: ${row.keberlanjutan}/4`;
  }).join("\n  ") || "-"}

- Solusi Paling Optimal:
  ${state.langkah5?.analisisTerbaik || "-"}
- Kelebihan Solusi:
  ${state.langkah5?.kelebihanSolusi || "-"}
- Kelemahan Solusi:
  ${state.langkah5?.kelemahanSolusi || "-"}

- Rencana Perbaikan Masalah Teknis:
  ${(state.langkah5?.perbaikanSolusiBaris || []).map((row, idx) => {
    return `* Perbaikan #${idx + 1}:
      - Solusi perlu diperbaiki: ${row.solusiPerluDiperbaiki || "-"}
      - Bagian/kendala: ${row.bagianPerluDiperbaiki || "-"}
      - Rencana perbaikan konkret: ${row.rencanaPerbaikan || "-"}
      - Sumber daya: ${row.sumberDayaDibutuhkan || "-"}
      - Siapa yg melakukan: ${row.siapamelakukan || "-"}`;
  }).join("\n  ") || "-"}

===========================================`;

    navigator.clipboard.writeText(textReport);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2500);
  };

  const handlePrint = () => {
    const printWindow = window.open("", "_blank");
    if (printWindow) {
      const selectedFactsHtml = (state.langkah2?.selectedFacts || []).map(id => {
        const item = FACTS_LIST.find(f => f.id === id);
        return `<li><b>${item?.label || id}</b>: ${item?.desc || ""}</li>`;
      }).join("") || "<li>Tidak ada</li>";

      const thingsToLearnHtml = (state.langkah2?.thingsToLearn || [])
        .filter(x => x.trim() !== "")
        .map(x => `<li>${x}</li>`).join("") || "<li>Tidak ada</li>";

      const alamiHtml = (state.langkah2?.categorization?.alami || []).map(id => FACTS_LIST.find(f => f.id === id)?.label || id).join(", ") || "-";
      const manusiaHtml = (state.langkah2?.categorization?.manusia || []).map(id => FACTS_LIST.find(f => f.id === id)?.label || id).join(", ") || "-";

      const tableRowsL3 = (state.langkah3?.investigationRows || []).map((row, index) => `
        <tr>
          <td><b>${index + 1}. ${row.sumberInformasi}</b></td>
          <td>${row.dataDitemukan || "-"}</td>
          <td>${row.faktaPenting || "-"}</td>
          <td>${row.maknaHubungan || "-"}</td>
        </tr>
      `).join("");

      const tableRowsL5 = (state.langkah5?.evaluasiBaris || []).map(row => `
        <tr>
          <td>${row.solusi}</td>
          <td style="text-align:center">${row.kelayakan}/4</td>
          <td style="text-align:center">${row.efektivitas}/4</td>
          <td style="text-align:center">${row.dampakPositif}/4</td>
          <td style="text-align:center">${row.keberlanjutan}/4</td>
        </tr>
      `).join("");

      const perbaikanRowsL5 = (state.langkah5?.perbaikanSolusiBaris || []).map((row, idx) => `
        <tr>
          <td><b>#${idx + 1}</b></td>
          <td>${row.solusiPerluDiperbaiki || "-"}</td>
          <td>${row.bagianPerluDiperbaiki || "-"}</td>
          <td>${row.rencanaPerbaikan || "-"}</td>
          <td>${row.sumberDayaDibutuhkan || "-"}</td>
          <td>${row.siapamelakukan || "-"}</td>
        </tr>
      `).join("");

      const htmlContent = `
        <!DOCTYPE html>
        <html>
          <head>
            <title>Laporan Hasil LKPD Digital PBL - ${state.studentGroup || ""}</title>
            <style>
              body { font-family: 'Helvetica Neue', Arial, sans-serif; padding: 40px; color: #1e293b; line-height: 1.6; background: #fff; }
              .header { text-align: center; border-bottom: 3px double #cbd5e1; padding-bottom: 20px; margin-bottom: 25px; }
              .header h1 { color: #1e3a8a; font-size: 24px; margin: 0 0 5px 0; text-transform: uppercase; letter-spacing: 0.5px; }
              .header p { color: #475569; font-size: 14px; margin: 0; font-weight: 500; }
              
              .info-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 15px; background: #f8fafc; border: 1px solid #e2e8f0; padding: 15px; border-radius: 8px; margin-bottom: 30px; }
              .info-item { font-size: 13px; }
              .info-item span { font-weight: bold; color: #475569; text-transform: uppercase; font-size: 11px; display: block; margin-bottom: 2px; }
              .info-item p { font-size: 14px; font-weight: bold; color: #0f172a; margin: 0; }
              
              h2 { color: #0f766e; font-size: 16px; border-bottom: 2px solid #0f766e; padding-bottom: 5px; margin-top: 30px; margin-bottom: 15px; text-transform: uppercase; letter-spacing: 0.5px; }
              
              .field { background: #fafafa; border-left: 4px solid #6366f1; padding: 12px; margin-bottom: 12px; border-radius: 0 6px 6px 0; }
              .field-label { font-weight: bold; font-size: 11px; text-transform: uppercase; color: #475569; margin-bottom: 4px; }
              .field-value { font-size: 13.5px; color: #0f172a; margin: 0; white-space: pre-wrap; }
              
              table { width: 100%; border-collapse: collapse; margin-top: 15px; margin-bottom: 20px; font-size: 12px; }
              table th, table td { border: 1px solid #cbd5e1; padding: 10px; text-align: left; vertical-align: top; }
              table th { background-color: #f1f5f9; font-weight: bold; color: #1e293b; text-transform: uppercase; font-size: 10px; letter-spacing: 0.5px; }
              
              ul { margin: 5px 0; padding-left: 20px; }
              li { font-size: 13px; margin-bottom: 3px; }
              
              .pilar-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 10px; margin-top: 10px; }
              .pilar-col { background: #f8fafc; border: 1px solid #e2e8f0; padding: 10px; border-radius: 6px; }
              .pilar-title { font-weight: bold; font-size: 11px; color: #475569; border-bottom: 1px solid #cbd5e1; margin-bottom: 8px; padding-bottom: 4px; text-transform: uppercase; }

              .footer { text-align: center; color: #94a3b8; font-size: 11px; margin-top: 50px; border-top: 1px solid #e2e8f0; padding-top: 15px; }
              
              @media print {
                body { padding: 0; }
                button { display: none; }
              }
            </style>
          </head>
          <body>
            <div class="header">
              <h1>Laporan Hasil Penyelidikan & Mitigasi Bencana</h1>
              <p>LKPD Digital Berbasis PBL (Problem-Based Learning) - DAS di Prov. Aceh</p>
            </div>
            
            <div class="info-grid">
              <div class="info-item">
                <span>Nama Kelompok</span>
                <p>${state.studentGroup || "-"}</p>
              </div>
              <div class="info-item">
                <span>Kelas</span>
                <p>${state.studentClass || "-"}</p>
              </div>
              <div class="info-item">
                <span>Ketua Kelompok</span>
                <p>${state.studentLeader || "-"}</p>
              </div>
              <div class="info-item">
                <span>Anggota Kelompok</span>
                <p>${membersList.join(", ") || "Tidak ada"}</p>
              </div>
            </div>

            <h2>Langkah 1: Orientasi Masalah</h2>
            <div class="field">
              <div class="field-label">Masalah Utama yang Dipilih</div>
              <p class="field-value">${state.langkah1?.masalahUtama || "-"}</p>
            </div>
            <div class="field">
              <div class="field-label">Penyebab Utama</div>
              <p class="field-value">${state.langkah1?.penyebabUtama || "-"}</p>
            </div>
            <div class="field">
              <div class="field-label">Dampak Utama</div>
              <p class="field-value">${state.langkah1?.dampakUtama || "-"}</p>
            </div>

            <h2>Langkah 2: Mengorganisasikan Siswa</h2>
            <div class="field" style="border-left-color: #0284c7">
              <div class="field-label">Faktor Kejadian Banjir yang Dipilih</div>
              <ul style="margin: 5px 0 0 0; padding-left: 18px;">${selectedFactsHtml}</ul>
            </div>
            <div class="field" style="border-left-color: #0284c7">
              <div class="field-label">Informasi/Kondisi Tambahan Lapangan</div>
              <p class="field-value">${state.langkah2?.additionalInfo || "-"}</p>
            </div>
            <div class="field" style="border-left-color: #0284c7">
              <div class="field-label">Pengelompokan Faktor Kejadian (Alami vs Manusia)</div>
              <p class="field-value"><b>Faktor Alami:</b> ${alamiHtml}</p>
              <p class="field-value" style="margin-top: 6px;"><b>Faktor Tindakan Manusia:</b> ${manusiaHtml}</p>
            </div>
            <div class="field" style="border-left-color: #0284c7">
              <div class="field-label">Pertanyaan Penting untuk Dikaji</div>
              <ul style="margin: 5px 0 0 0; padding-left: 18px;">${thingsToLearnHtml}</ul>
            </div>

            <h2>Langkah 3: Penyelidikan Masalah</h2>
            <p style="font-size: 13px; margin-top: -5px; color: #475569;">Tabel Pengamatan Data Empiris & Analitik:</p>
            <table>
              <thead>
                <tr>
                  <th style="width:20%">Sumber Informasi</th>
                  <th style="width:28%">Data penting ditemukan</th>
                  <th style="width:26%">Fakta penting kebencanaan</th>
                  <th style="width:26%">Makna hubungan mitigasi</th>
                </tr>
              </thead>
              <tbody>
                ${tableRowsL3}
              </tbody>
            </table>

            <div class="field" style="border-left-color: #059669">
              <div class="field-label">Hal Baru / Fakta Mengejutkan yang Ditemukan</div>
              <p class="field-value">${state.langkah3?.shockingFact || "-"}</p>
            </div>

            <h3 style="font-size:13px; color:#1e293b; margin-top:20px; text-transform:uppercase;">Tanggapan Pertanyaan Diskusi Tim</h3>
            <div class="field" style="border-left-color: #059669">
              <div class="field-label">1. Faktor dominan pemicu banjir di DAS Aceh</div>
              <p class="field-value">${state.langkah3?.discussionQuestions?.faktorBerpengaruh || "-"}</p>
            </div>
            <div class="field" style="border-left-color: #059669">
              <div class="field-label">2. Dampak nyata banjir rob di wilayah pesisir & pegunungan hulu</div>
              <p class="field-value">${state.langkah3?.discussionQuestions?.dampakNyata || "-"}</p>
            </div>
            <div class="field" style="border-left-color: #059669">
              <div class="field-label">3. Mengapa mitigasi kesiapsiagaan lebih penting daripada tindakan pasca bencana</div>
              <p class="field-value">${state.langkah3?.discussionQuestions?.upayaTindakan || "-"}</p>
            </div>
            <div class="field" style="border-left-color: #059669">
              <div class="field-label">4. Peran kolaboratif Pemerintah, Masyarakat, & Aliansi Relawan</div>
              <p class="field-value">${state.langkah3?.discussionQuestions?.pihakTerlibat || "-"}</p>
            </div>

            <h2>Langkah 4: Mengembangkan Solusi</h2>
            <div class="field" style="border-left-color: #d97706">
              <div class="field-label">Gagasan Bank Solusi (4 Pilar Mitigasi)</div>
              <div class="pilar-grid">
                <div class="pilar-col">
                  <div class="pilar-title">Pencegahan</div>
                  <ul style="padding-left:14px; margin:0;">
                    ${(state.langkah4?.ideSolusi?.pencegahan || []).filter(x => x).map(x => `<li>${x}</li>`).join("") || "<li>-</li>"}
                  </ul>
                </div>
                <div class="pilar-col">
                  <div class="pilar-title">Kesiapsiagaan</div>
                  <ul style="padding-left:14px; margin:0;">
                    ${(state.langkah4?.ideSolusi?.kesiapsiagaan || []).filter(x => x).map(x => `<li>${x}</li>`).join("") || "<li>-</li>"}
                  </ul>
                </div>
                <div class="pilar-col">
                  <div class="pilar-title">Penanganan</div>
                  <ul style="padding-left:14px; margin:0;">
                    ${(state.langkah4?.ideSolusi?.penanganan || []).filter(x => x).map(x => `<li>${x}</li>`).join("") || "<li>-</li>"}
                  </ul>
                </div>
                <div class="pilar-col">
                  <div class="pilar-title">Pemulihan</div>
                  <ul style="padding-left:14px; margin:0;">
                    ${(state.langkah4?.ideSolusi?.pemulihan || []).filter(x => x).map(x => `<li>${x}</li>`).join("") || "<li>-</li>"}
                  </ul>
                </div>
              </div>
            </div>

            <div class="field" style="border-left-color: #d97706">
              <div class="field-label">Formulasi Solusi Terbaik Setiap Pilar & Alasannya</div>
              <p style="margin: 4px 0; font-size:13px;"><b>1. Pilar Pencegahan:</b> ${state.langkah4?.solusiTerbaik?.pencegahan?.solusi || "-"}<br/><span style="color:#475569">Alasan: ${state.langkah4?.solusiTerbaik?.pencegahan?.alasan || "-"}</span></p>
              <p style="margin: 10px 0 4px 0; font-size:13px;"><b>2. Pilar Kesiapsiagaan:</b> ${state.langkah4?.solusiTerbaik?.kesiapsiagaan?.solusi || "-"}<br/><span style="color:#475569">Alasan: ${state.langkah4?.solusiTerbaik?.kesiapsiagaan?.alasan || "-"}</span></p>
              <p style="margin: 10px 0 4px 0; font-size:13px;"><b>3. Pilar Penanganan Darurat:</b> ${state.langkah4?.solusiTerbaik?.penanganan?.solusi || "-"}<br/><span style="color:#475569">Alasan: ${state.langkah4?.solusiTerbaik?.penanganan?.alasan || "-"}</span></p>
              <p style="margin: 10px 0 4px 0; font-size:13px;"><b>4. Pilar Pemulihan Pascabencana:</b> ${state.langkah4?.solusiTerbaik?.pemulihan?.solusi || "-"}<br/><span style="color:#475569">Alasan: ${state.langkah4?.solusiTerbaik?.pemulihan?.alasan || "-"}</span></p>
            </div>

            <div class="field" style="border-left-color: #d97706">
              <div class="field-label">Deskripsi Rancangan Teknis & Media Penyajian</div>
              <p style="font-size:13px; margin:0 0 6px 0;"><b>Jenis Media:</b> ${(state.langkah4?.mediaPenyajian || []).join(", ")}${state.langkah4?.mediaPenyajianLainnya ? ` (Lainnya: ${state.langkah4?.mediaPenyajianLainnya})` : ""}</p>
              <p style="font-size:13px; margin:0 0 6px 0;"><b>Deskripsi/Rancangan:</b><br/>${state.langkah4?.rancanganSolusi || "-"}</p>
              <p style="font-size:13px; margin:0;"><b>Poin Utama Alur Penyajian:</b></p>
              <ul style="margin:3px 0 0 0; padding-left:18px;">
                ${(state.langkah4?.sajianPoin || []).filter(x => x).map(x => `<li>${x}</li>`).join("") || "<li>-</li>"}
              </ul>
            </div>

            <h2>Langkah 5: Analisis & Evaluasi Solusi Belajar</h2>
            <p style="font-size: 13px; margin-top: -5px; color: #475569;">Tabel Penilaian Kelayakan & Bobot Solusi:</p>
            <table>
              <thead>
                <tr>
                  <th style="width:50%">Gagasan Solusi Diuji</th>
                  <th style="width:12.5%; text-align:center">Kelayakan</th>
                  <th style="width:12.5%; text-align:center">Efektivitas</th>
                  <th style="width:12.5%; text-align:center">Dampak</th>
                  <th style="width:12.5%; text-align:center">Keberlanjutan</th>
                </tr>
              </thead>
              <tbody>
                ${tableRowsL5}
              </tbody>
            </table>

            <div class="field" style="border-left-color: #e11d48">
              <div class="field-label">Solusi Paling Optimal / Rekomendasi Utama Kelompok</div>
              <p class="field-value"><b>${state.langkah5?.analisisTerbaik || "-"}</b></p>
              <p class="field-value" style="margin-top:8px;"><b>Kelebihan Solusi:</b> ${state.langkah5?.kelebihanSolusi || "-"}</p>
              <p class="field-value" style="margin-top:4px;"><b>Kelemahan Solusi:</b> ${state.langkah5?.kelemahanSolusi || "-"}</p>
            </div>

            <p style="font-size: 13px; margin-top: 20px; color: #475569;">Tabel Rencana Tindak Lanjut Perbaikan Teknis:</p>
            <table>
              <thead>
                <tr>
                  <th style="width:5%">#</th>
                  <th style="width:20%">Solusi Perlu Diperbaiki</th>
                  <th style="width:20%">Kendala / Bagian Lemah</th>
                  <th style="width:20%">Rencana Perbaikan Nyata</th>
                  <th style="width:17.5%">Sumber Daya Masukan</th>
                  <th style="width:17.5%">Aktor Pelaksana</th>
                </tr>
              </thead>
              <tbody>
                ${perbaikanRowsL5 || "<tr><td colspan='6' style='text-align:center; color:#94a3b8'>Tidak ada perbaikan diisi</td></tr>"}
              </tbody>
            </table>

            <div class="footer">
              <p>Laporan ini dicetak secara otomatis dari Platform Media Pembelajaran LKPD Digital PBL.</p>
              <p style="font-size:9px; margin-top:3px;">Diakses pada ${new Date().toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
            </div>

            <script>
              setTimeout(function() {
                window.print();
              }, 500);
            </script>
          </body>
        </html>
      `;
      printWindow.document.write(htmlContent);
      printWindow.document.close();
    }
  };

  return (
    <div id="graduation-screen-container" className="space-y-4 sm:space-y-6 text-slate-800 pb-6 animate-fade-in px-0">
      
      {/* 1. CELEBRATION BADGE & CONGRATULATION MESSAGE */}
      <div className="text-center space-y-2.5 bg-gradient-to-br from-indigo-900 to-slate-900 p-4 sm:p-6 rounded-xl sm:rounded-2xl border border-indigo-950 text-white relative overflow-hidden shadow-md animate-fade-in">
        <div className="absolute -top-12 -left-12 w-32 h-32 bg-indigo-500/20 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute -bottom-12 -right-12 w-32 h-32 bg-emerald-500/20 rounded-full blur-2xl pointer-events-none" />
        
        <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-tr from-amber-400 to-amber-200 text-indigo-950 rounded-full flex items-center justify-center mx-auto shadow-md animate-bounce">
          <GraduationCap className="w-7 h-7 sm:w-9 sm:h-9" />
        </div>

        <div className="space-y-1.5">
          <span className="text-[9px] sm:text-[10px] bg-emerald-500/20 text-emerald-300 font-black tracking-widest uppercase px-2.5 py-0.5 sm:py-1 rounded-full border border-emerald-500/30 inline-flex items-center gap-1">
            <Sparkles className="w-3 h-3 animate-pulse" />
            <span>SINI SELESAI</span>
          </span>
          <h2 className="text-base xs:text-lg sm:text-2xl font-black uppercase tracking-tight text-white leading-tight">
            Selamat, Kalian Sudah Menyelesaikan!
          </h2>
          <p className="text-[11px] sm:text-xs text-slate-300 max-w-md mx-auto leading-relaxed font-sans">
            Luar biasa! Seluruh rangkaian Lembar Kegiatan Peserta Didik (LKPD) berbasis <strong>Problem-Based Learning</strong> mitigasi kebencanaan banjir daerah aliran sungai di Aceh telah diselesaikan dengan sangat baik. 
          </p>
        </div>
      </div>

      {/* 2. GROUP INFORMATION CARD */}
      <div className="bg-white border border-slate-200 rounded-xl sm:rounded-2xl p-3 sm:p-5 shadow-sm space-y-3 relative">
        <div className="flex items-center space-x-2 border-b border-rose-50 pb-2">
          <div className="w-7 h-7 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold shrink-0">
            <Users className="w-3.5 h-3.5" />
          </div>
          <div>
            <h3 className="text-xs font-black uppercase tracking-wider text-slate-800">
              Informasi Kelompok Belajar
            </h3>
            <p className="text-[9px] sm:text-[10px] text-slate-500 font-medium font-sans">Data penanggung jawab pengisian instrumen</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 sm:gap-4 font-sans">
          <div className="bg-slate-50 p-2 sm:p-3 rounded-lg sm:rounded-xl border border-slate-100">
            <span className="text-[8px] sm:text-[9px] uppercase font-black tracking-wider text-slate-400 block mb-0.5">
              Ketua Kelompok
            </span>
            <p className="text-xs sm:text-sm font-black text-slate-800 break-words leading-tight">
              {state.studentLeader || state.studentName || "-"}
            </p>
          </div>

          <div className="bg-slate-50 p-2 sm:p-3 rounded-lg sm:rounded-xl border border-slate-100">
            <span className="text-[8px] sm:text-[9px] uppercase font-black tracking-wider text-slate-400 block mb-0.5">
              Nama Kelompok
            </span>
            <p className="text-xs sm:text-sm font-black text-indigo-600 break-words leading-tight">
              {state.studentGroup || "Kelompok 3"}
            </p>
          </div>

          <div className="bg-slate-50 p-2 sm:p-3 rounded-lg sm:rounded-xl border border-slate-100">
            <span className="text-[8px] sm:text-[9px] uppercase font-black tracking-wider text-slate-400 block mb-0.5">
              Kelas
            </span>
            <p className="text-xs sm:text-sm font-black text-slate-800 break-words leading-tight">
              {state.studentClass || "VII-A"}
            </p>
          </div>

          <div className="bg-slate-50 p-2 sm:p-3 rounded-lg sm:rounded-xl border border-slate-100">
            <span className="text-[8px] sm:text-[9px] uppercase font-black tracking-wider text-slate-400 block mb-0.5">
              Anggota Kelompok
            </span>
            <div className="text-[10px] sm:text-xs text-slate-700 font-semibold leading-normal break-words max-h-12 overflow-y-auto scrollbar-none">
              {membersList.length > 0 ? (
                membersList.join(", ")
              ) : (
                <span className="text-slate-400 italic text-[10px]">Tiada Anggota</span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* 3. PROGRESS INDICATOR */}
      <div className="bg-white border border-slate-200 rounded-xl sm:rounded-2xl p-3 sm:p-5 shadow-sm space-y-3">
        <div className="flex items-center justify-between border-b border-indigo-50 pb-2 gap-2">
          <h3 className="text-xs font-black uppercase tracking-wider text-slate-800 flex items-center gap-1.5">
            <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" />
            <span>Indikator Progress</span>
          </h3>
          <span className="text-[9px] sm:text-xs font-mono font-black text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-100 uppercase shrink-0">
            100% Selesai
          </span>
        </div>

        <div className="grid grid-cols-5 gap-0.5 xs:gap-1 pt-0.5">
          {[
            { tag: "L1", title: "Orientasi" },
            { tag: "L2", title: "Organisasi" },
            { tag: "L3", title: "Penyelidikan" },
            { tag: "L4", title: "Solusi" },
            { tag: "L5", title: "Evaluasi" },
          ].map((step, idx) => (
            <div key={idx} className="flex flex-col items-center text-center space-y-1">
              <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-emerald-500 text-white border border-emerald-100 flex items-center justify-center shadow-sm select-none font-sans shrink-0 font-extrabold text-[8px] sm:text-[10px]">
                <Check className="w-2.5 h-2.5 sm:w-4 sm:h-4 stroke-[3]" />
              </div>
              <div className="leading-tight">
                <span className="text-[8px] sm:text-[9px] uppercase font-mono font-black text-slate-400 block">
                  {step.tag}
                </span>
                <span className="text-[9px] sm:text-[10px] font-bold text-slate-750 hidden sm:inline">
                  {step.title}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="relative pt-0.5">
          <div className="overflow-hidden h-2 text-xs flex rounded-full bg-slate-100">
            <div className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-gradient-to-r from-emerald-500 to-indigo-600 w-full rounded-full transition-all duration-500" />
          </div>
        </div>
      </div>

      {/* PANEL PEMERIKSAAN JAWABAN (UNTUK GURU & MAHASISWA/SISWA) */}
      <div className="bg-white border border-slate-200 rounded-xl sm:rounded-2xl p-3 sm:p-5 shadow-sm space-y-3">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between border-b border-slate-100 pb-2.5 gap-3">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold shrink-0">
              <FileText className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-xs font-black uppercase tracking-wider text-slate-800">
                Panel Pemeriksaan & Rekap
              </h3>
              <p className="text-[10px] text-slate-500 font-medium font-sans">Buku kerja lengkap untuk koreksi guru</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-1.5 w-full lg:w-auto lg:justify-end">
            <button
              onClick={handleCopyText}
              className={`flex-1 sm:flex-initial flex items-center justify-center space-x-1 text-[9px] sm:text-[10px] font-black uppercase px-2.5 py-1.5 sm:px-3 sm:py-2 rounded-xl border transition-all cursor-pointer ${
                isCopied 
                  ? "bg-emerald-50 text-emerald-700 border-emerald-300 animate-pulse" 
                  : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
              }`}
            >
              {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" /> : <Clipboard className="w-3.5 h-3.5 text-slate-500 shrink-0" />}
              <span>{isCopied ? "Disalin!" : "Salin"}</span>
            </button>

            <button
              onClick={handlePrint}
              className="flex-1 sm:flex-initial flex items-center justify-center space-x-1 text-[9px] sm:text-[10px] bg-indigo-600 hover:bg-indigo-700 text-white font-black uppercase px-2.5 py-1.5 sm:px-3 sm:py-2 rounded-xl transition-all cursor-pointer shadow-sm active:scale-95"
            >
              <Printer className="w-3.5 h-3.5 shrink-0" />
              <span>Cetak / PDF</span>
            </button>

            <button
              onClick={() => setIsRecapExpanded(!isRecapExpanded)}
              className="flex items-center justify-center p-2 hover:bg-slate-50 rounded-xl border border-slate-100 text-slate-500 transition-all cursor-pointer shrink-0"
              title={isRecapExpanded ? "Sembunyikan Rekap" : "Tampilkan Rekap"}
            >
              {isRecapExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {isRecapExpanded && (
          <div className="space-y-3 animate-fade-in text-left">
            {/* Steps tabs */}
            <div className="flex border-b border-slate-100 overflow-x-auto gap-1 pb-1 scrollbar-none">
              {[1, 2, 3, 4, 5].map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-2.5 py-1 text-[10px] sm:text-[11px] font-extrabold uppercase rounded-lg border transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                    activeTab === tab
                      ? "bg-indigo-50 border-indigo-200 text-indigo-750 font-black"
                      : "bg-transparent border-transparent text-slate-500 hover:text-slate-800 hover:bg-slate-50"
                  }`}
                >
                  Langkah {tab}
                </button>
              ))}
            </div>

            {/* Tab content displays */}
            <div className="space-y-4 pt-1">
              {activeTab === 1 && (
                <div className="space-y-3 p-2.5 sm:p-4 bg-indigo-50/25 border-l-4 border-indigo-500 rounded-r-lg sm:rounded-r-xl">
                  <div className="flex items-center gap-1.5 pb-1.5 border-b border-indigo-100/30">
                    <span className="text-[10px] bg-indigo-100 text-indigo-700 font-black px-1.5 py-0.5 rounded uppercase font-mono">L1</span>
                    <h4 className="text-xs font-black text-slate-700 uppercase">Orientasi Masalah Kebencanaan</h4>
                  </div>
                  
                  <div className="space-y-2 font-sans">
                    <div>
                      <span className="text-[8px] sm:text-[9px] uppercase font-black tracking-wider text-slate-400 block">Masalah Utama</span>
                      <p className="text-xs text-slate-700 leading-relaxed font-semibold bg-white p-2.5 rounded-lg border border-slate-200 mt-0.5 shadow-sm break-words whitespace-pre-wrap">
                        {state.langkah1?.masalahUtama || <span className="text-slate-400 italic">Belum diisi</span>}
                      </p>
                    </div>

                    <div>
                      <span className="text-[8px] sm:text-[9px] uppercase font-black tracking-wider text-slate-400 block">Penyebab Utama</span>
                      <p className="text-xs text-slate-700 leading-relaxed font-semibold bg-white p-2.5 rounded-lg border border-slate-200 mt-0.5 shadow-sm break-words whitespace-pre-wrap">
                        {state.langkah1?.penyebabUtama || <span className="text-slate-400 italic">Belum diisi</span>}
                      </p>
                    </div>

                    <div>
                      <span className="text-[8px] sm:text-[9px] uppercase font-black tracking-wider text-slate-400 block">Dampak Utama</span>
                      <p className="text-xs text-slate-700 leading-relaxed font-semibold bg-white p-2.5 rounded-lg border border-slate-200 mt-0.5 shadow-sm break-words whitespace-pre-wrap">
                        {state.langkah1?.dampakUtama || <span className="text-slate-400 italic">Belum diisi</span>}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 2 && (
                <div className="space-y-3 p-2.5 sm:p-4 bg-sky-50/20 border-l-4 border-sky-500 rounded-r-lg sm:rounded-r-xl">
                  <div className="flex items-center gap-1.5 pb-1.5 border-b border-sky-100/30">
                    <span className="text-[10px] bg-sky-100 text-sky-700 font-black px-1.5 py-0.5 rounded uppercase font-mono">L2</span>
                    <h4 className="text-xs font-black text-slate-700 uppercase">Mengorganisasikan Siswa</h4>
                  </div>

                  <div className="space-y-2.5 font-sans">
                    <div>
                      <span className="text-[8px] sm:text-[9px] uppercase font-black tracking-wider text-slate-400 block">Faktor Terpilih</span>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-1">
                        {(state.langkah2?.selectedFacts || []).length > 0 ? (
                          (state.langkah2?.selectedFacts || []).map(id => {
                            const item = FACTS_LIST.find(f => f.id === id);
                            return (
                              <div key={id} className="bg-white p-2 rounded-lg border border-sky-100 text-left break-words">
                                <p className="text-xs font-black text-sky-950">{item?.label || id}</p>
                                <p className="text-[10px] text-slate-500 leading-tight mt-0.5">{item?.desc || ""}</p>
                              </div>
                            );
                          })
                        ) : (
                          <div className="col-span-2 text-xs text-slate-400 italic bg-white p-2.5 rounded-lg border border-slate-200 text-center">
                            Tidak ada faktor yang dipilih
                          </div>
                        )}
                      </div>
                    </div>

                    <div>
                      <span className="text-[8px] sm:text-[9px] uppercase font-black tracking-wider text-slate-400 block">Informasi Tambahan Lapangan</span>
                      <p className="text-xs text-slate-700 leading-relaxed font-semibold bg-white p-2.5 rounded-lg border border-slate-200 mt-0.5 shadow-sm break-words whitespace-pre-wrap">
                        {state.langkah2?.additionalInfo || <span className="text-slate-400 italic">Tidak ada tambahan</span>}
                      </p>
                    </div>

                    <div>
                      <span className="text-[8px] sm:text-[9px] uppercase font-black tracking-wider text-slate-400 block">Pengelompokan Faktor Kejadian</span>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-1">
                        <div className="bg-white p-2.5 rounded-lg border border-slate-200">
                          <span className="text-[8px] bg-emerald-50 text-emerald-700 font-black px-1.5 py-0.5 rounded uppercase tracking-wider block w-max">Faktor Alami</span>
                          <ul className="list-disc pl-4 text-[11px] text-slate-700 font-bold space-y-1 mt-1.5 leading-tight break-words">
                            {(state.langkah2?.categorization?.alami || []).length > 0 ? (
                              (state.langkah2?.categorization?.alami || []).map(id => (
                                <li key={id}>{FACTS_LIST.find(f => f.id === id)?.label || id}</li>
                              ))
                            ) : (
                              <span className="text-slate-400 italic text-[10px]">Kosong</span>
                            )}
                          </ul>
                        </div>

                        <div className="bg-white p-2.5 rounded-lg border border-slate-200">
                          <span className="text-[8px] bg-amber-50 text-amber-700 font-black px-1.5 py-0.5 rounded uppercase tracking-wider block w-max">Faktor Manusia</span>
                          <ul className="list-disc pl-4 text-[11px] text-slate-700 font-bold space-y-1 mt-1.5 leading-tight break-words">
                            {(state.langkah2?.categorization?.manusia || []).length > 0 ? (
                              (state.langkah2?.categorization?.manusia || []).map(id => (
                                <li key={id}>{FACTS_LIST.find(f => f.id === id)?.label || id}</li>
                              ))
                            ) : (
                              <span className="text-slate-400 italic text-[10px]">Kosong</span>
                            )}
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div>
                      <span className="text-[8px] sm:text-[9px] uppercase font-black tracking-wider text-slate-400 block">Pertanyaan Penting Yang Perlu Dikaji</span>
                      <div className="bg-white p-2.5 rounded-lg border border-slate-200 mt-0.5 shadow-sm space-y-1.5">
                        {(state.langkah2?.thingsToLearn || []).filter(x => x.trim() !== "").length > 0 ? (
                          (state.langkah2?.thingsToLearn || []).filter(x => x.trim() !== "").map((q, idx) => (
                            <div key={idx} className="flex gap-2 text-xs">
                              <span className="text-sky-600 font-mono font-black shrink-0">#{idx + 1}</span>
                              <p className="text-slate-700 font-semibold break-words">{q}</p>
                            </div>
                          ))
                        ) : (
                          <span className="text-slate-400 text-xs italic block">Tidak ada pertanyaan diisi</span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 3 && (
                <div className="space-y-3 p-2.5 sm:p-4 bg-emerald-50/20 border-l-4 border-emerald-500 rounded-r-lg sm:rounded-r-xl">
                  <div className="flex items-center gap-1.5 pb-1.5 border-b border-emerald-100/30">
                    <span className="text-[10px] bg-emerald-100 text-emerald-700 font-black px-1.5 py-0.5 rounded uppercase font-mono">L3</span>
                    <h4 className="text-xs font-black text-slate-700 uppercase">Membimbing Penyelidikan Mandiri & Kelompok</h4>
                  </div>

                  <div className="space-y-3 font-sans">
                    <div>
                      <span className="text-[8px] sm:text-[9px] uppercase font-black tracking-wider text-slate-400 block mb-1 font-sans">Hasil Observasi & Investigasi</span>
                      <div className="space-y-2">
                        {(state.langkah3?.investigationRows || []).map((row, idx) => (
                          <div key={idx} className="bg-white p-2.5 rounded-lg border border-slate-200 space-y-1">
                            <span className="text-[8px] bg-slate-100 text-slate-600 font-black px-1.5 py-0.5 rounded tracking-wide font-mono uppercase">{row.sumberInformasi || `Sumber #${idx+1}`}</span>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-1 font-sans">
                              <div>
                                <span className="text-[8px] uppercase tracking-wide font-black text-slate-400 block">Data ditemukan</span>
                                <p className="text-[11px] text-slate-800 font-bold leading-relaxed break-words whitespace-pre-wrap">{row.dataDitemukan || <span className="text-slate-400 italic text-[10px]">Belum diisi</span>}</p>
                              </div>
                              <div>
                                <span className="text-[8px] uppercase tracking-wide font-black text-slate-400 block">Fakta Kebencanaan</span>
                                <p className="text-[11px] text-slate-800 font-bold leading-relaxed break-words whitespace-pre-wrap">{row.faktaPenting || <span className="text-slate-400 italic text-[10px]">Belum diisi</span>}</p>
                              </div>
                              <div>
                                <span className="text-[8px] uppercase tracking-wide font-black text-slate-400 block">Makna Hubungan</span>
                                <p className="text-[11px] text-slate-800 font-bold leading-relaxed break-words whitespace-pre-wrap">{row.maknaHubungan || <span className="text-slate-400 italic text-[10px]">Belum diisi</span>}</p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <span className="text-[8px] sm:text-[9px] uppercase font-black tracking-wider text-slate-400 block font-sans">Temuan Menarik/Beda di Lapangan</span>
                      <p className="text-xs text-slate-700 leading-relaxed font-semibold bg-white p-2.5 rounded-lg border border-slate-200 mt-0.5 shadow-sm break-words whitespace-pre-wrap">
                        {state.langkah3?.shockingFact || <span className="text-slate-400 italic">Belum diisi</span>}
                      </p>
                    </div>

                    <div className="border-t border-emerald-100/50 pt-2.5 space-y-2.5">
                      <span className="text-[9px] uppercase font-black tracking-wider text-slate-400 block font-sans">Jawaban Pertanyaan Diskusi</span>
                      
                      <div className="space-y-1 bg-white/70 p-3 rounded-xl border border-slate-150/70">
                        <span className="text-[8px] uppercase font-black tracking-wider text-slate-500 block">1. Faktor dominan pemicu banjir di DAS Aceh</span>
                        <p className="text-xs text-slate-800 font-semibold leading-relaxed">{state.langkah3?.discussionQuestions?.faktorBerpengaruh || <span className="text-slate-400 italic">Belum diisi</span>}</p>
                      </div>

                      <div className="space-y-1 bg-white/70 p-3 rounded-xl border border-slate-150/70">
                        <span className="text-[8px] uppercase font-black tracking-wider text-slate-500 block">2. Dampak nyata banjir rob di pesisir & hulu</span>
                        <p className="text-xs text-slate-800 font-semibold leading-relaxed">{state.langkah3?.discussionQuestions?.dampakNyata || <span className="text-slate-400 italic">Belum diisi</span>}</p>
                      </div>

                      <div className="space-y-1 bg-white/70 p-3 rounded-xl border border-slate-150/70">
                        <span className="text-[8px] uppercase font-black tracking-wider text-slate-500 block">3. Mengapa kesiapsiagaan lebih utama dibanding pascabencana</span>
                        <p className="text-xs text-slate-800 font-semibold leading-relaxed">{state.langkah3?.discussionQuestions?.upayaTindakan || <span className="text-slate-400 italic">Belum diisi</span>}</p>
                      </div>

                      <div className="space-y-1 bg-white/70 p-3 rounded-xl border border-slate-150/70">
                        <span className="text-[8px] uppercase font-black tracking-wider text-slate-500 block">4. Peran kolaboratif Pemda, Masyarakat & Relawan</span>
                        <p className="text-xs text-slate-800 font-semibold leading-relaxed">{state.langkah3?.discussionQuestions?.pihakTerlibat || <span className="text-slate-400 italic">Belum diisi</span>}</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 4 && (
                <div className="space-y-3 p-2.5 sm:p-4 bg-amber-50/20 border-l-4 border-amber-500 rounded-r-lg sm:rounded-r-xl">
                  <div className="flex items-center gap-1.5 pb-1.5 border-b border-amber-100/30">
                    <span className="text-[10px] bg-amber-100 text-amber-700 font-black px-1.5 py-0.5 rounded uppercase font-mono">L4</span>
                    <h4 className="text-xs font-black text-slate-700 uppercase">Mengembangkan & Menyajikan Solusi</h4>
                  </div>

                  <div className="space-y-3 font-sans">
                    <div>
                      <span className="text-[8px] sm:text-[9px] uppercase font-black tracking-wider text-slate-400 block mb-1">Gagasan Bank Solusi (4 Pilar)</span>
                      <div className="grid grid-cols-2 gap-2">
                        {["pencegahan", "kesiapsiagaan", "penanganan", "pemulihan"].map(pilar => {
                          const list = (state.langkah4?.ideSolusi?.[pilar as keyof typeof state.langkah4.ideSolusi] || []) as string[];
                          return (
                            <div key={pilar} className="bg-white p-2 sm:p-2.5 rounded-lg border border-slate-200 text-left">
                              <span className="text-[8px] font-black uppercase text-amber-600 tracking-wider block mb-1">{pilar}</span>
                              <ul className="list-disc pl-3 text-[10px] text-slate-705 font-bold leading-snug space-y-0.5 max-h-24 overflow-y-auto scrollbar-none break-words">
                                {list.filter(x => x && x.trim()).length > 0 ? (
                                  list.filter(x => x && x.trim()).map((x, i) => <li key={i}>{x}</li>)
                                ) : (
                                  <span className="text-slate-400 italic text-[10px]">Tiada gagasan</span>
                                )}
                              </ul>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    <div>
                      <span className="text-[8px] sm:text-[9px] uppercase font-black tracking-wider text-slate-400 block mb-1">Formulasi Solusi Terbaik Setiap Pilar</span>
                      <div className="space-y-1.5">
                        {["pencegahan", "kesiapsiagaan", "penanganan", "pemulihan"].map(pilar => {
                          const detail = state.langkah4?.solusiTerbaik?.[pilar as keyof typeof state.langkah4.solusiTerbaik];
                          return (
                            <div key={pilar} className="bg-white p-2 sm:p-2.5 rounded-lg border border-slate-200">
                              <span className="text-[8px] font-black uppercase text-amber-700 block tracking-wider mb-0.5">{pilar}</span>
                              <p className="text-[11px] font-black text-slate-805 leading-tight break-words">
                                {detail?.solusi || <span className="text-slate-400 italic">Belum dirumuskan</span>}
                              </p>
                              {detail?.alasan && (
                                <p className="text-[10px] text-slate-500 italic mt-0.5 leading-snug break-words">Alasan: {detail.alasan}</p>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    <div>
                      <span className="text-[8px] sm:text-[9px] uppercase font-black tracking-wider text-slate-400 block">Rancangan Media & Teknis</span>
                      <div className="bg-white p-2.5 sm:p-3 rounded-lg border border-slate-200 mt-1 space-y-2">
                        <div>
                          <span className="text-[8px] uppercase tracking-wide font-black text-slate-400 block">Media Penyajian</span>
                          <p className="text-[11px] text-slate-800 font-extrabold leading-tight break-words">
                            {(state.langkah4?.mediaPenyajian || []).join(", ")} {state.langkah4?.mediaPenyajianLainnya ? `(Lainnya: ${state.langkah4.mediaPenyajianLainnya})` : ""}
                          </p>
                        </div>
                        <div>
                          <span className="text-[8px] uppercase tracking-wide font-black text-slate-400 block">Deskripsi Teknis Rancangan</span>
                          <p className="text-[11px] text-slate-800 font-semibold leading-relaxed mt-0.5 whitespace-pre-wrap break-words">{state.langkah4?.rancanganSolusi || "-"}</p>
                        </div>
                        <div>
                          <span className="text-[8px] uppercase tracking-wide font-black text-slate-400 block">Poin-Poin Pokok Alur Sajian</span>
                          <ol className="list-decimal pl-4 text-[10px] text-slate-705 font-bold space-y-0.5 mt-0.5 leading-tight break-words">
                            {(state.langkah4?.sajianPoin || []).filter(x => x && x.trim()).map((pt, i) => (
                              <li key={i}>{pt}</li>
                            ))}
                          </ol>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 5 && (
                <div className="space-y-3 p-2.5 sm:p-4 bg-rose-50/20 border-l-4 border-rose-500 rounded-r-lg sm:rounded-r-xl">
                  <div className="flex items-center gap-1.5 pb-1.5 border-b border-rose-100/30">
                    <span className="text-[10px] bg-rose-100 text-rose-700 font-black px-1.5 py-0.5 rounded uppercase font-mono">L5</span>
                    <h4 className="text-xs font-black text-slate-700 uppercase">Analisis & Evaluasi Solusi Mitigasi</h4>
                  </div>

                  <div className="space-y-3 font-sans">
                    <div>
                      <span className="text-[8px] sm:text-[9px] uppercase font-black tracking-wider text-slate-400 block mb-1">Skor Uji Kelayakan & Bobot Dampak</span>
                      <div className="space-y-1.5">
                        {(state.langkah5?.evaluasiBaris || []).map((row, idx) => (
                          <div key={idx} className="bg-white p-2.5 rounded-lg border border-slate-200">
                            <p className="text-xs font-black text-slate-850 leading-tight break-words">{row.solusi}</p>
                            <div className="grid grid-cols-4 gap-1 sm:gap-2 pt-1.5 text-center text-slate-500 font-mono text-[8px] sm:text-[9px] font-black">
                              <div className="bg-rose-50/30 p-1 rounded border border-rose-100/40">
                                <span className="block text-slate-400 uppercase text-[6px] sm:text-[7px]">Layak</span>
                                <span className="text-rose-700">{row.kelayakan}/4</span>
                              </div>
                              <div className="bg-emerald-50/30 p-1 rounded border border-emerald-100/40">
                                <span className="block text-slate-400 uppercase text-[6px] sm:text-[7px]">Efektif</span>
                                <span className="text-emerald-700">{row.efektivitas}/4</span>
                              </div>
                              <div className="bg-sky-50/30 p-1 rounded border border-sky-100/40">
                                <span className="block text-slate-400 uppercase text-[6px] sm:text-[7px]">Dampak</span>
                                <span className="text-sky-700">{row.dampakPositif}/4</span>
                              </div>
                              <div className="bg-amber-50/30 p-1 rounded border border-amber-100/40">
                                <span className="block text-slate-400 uppercase text-[6px] sm:text-[7px]">Lanjut</span>
                                <span className="text-amber-700">{row.keberlanjutan}/4</span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <span className="text-[8px] sm:text-[9px] uppercase font-black tracking-wider text-slate-400 block">Solusi Terpilih Kelompok & Analisis</span>
                      <div className="bg-white p-2.5 rounded-lg border border-slate-200 space-y-2 mt-0.5 shadow-sm">
                        <div>
                          <span className="text-[8px] uppercase tracking-wide font-black text-rose-500 block">Rekomendasi Utama Terbaik</span>
                          <p className="text-xs font-black text-slate-900 leading-tight break-words">{state.langkah5?.analisisTerbaik || "-"}</p>
                        </div>
                        <div className="grid grid-cols-2 gap-2 pt-1 border-t border-slate-100/70">
                          <div>
                            <span className="text-[8px] uppercase tracking-wide font-black text-emerald-600 block">Kelebihan Solusi</span>
                            <p className="text-[10px] text-slate-700 leading-snug font-semibold mt-0.5 break-words">{state.langkah5?.kelebihanSolusi || "-"}</p>
                          </div>
                          <div>
                            <span className="text-[8px] uppercase tracking-wide font-black text-rose-600 block">Kelemahan Solusi</span>
                            <p className="text-[10px] text-slate-700 leading-snug font-semibold mt-0.5 break-words">{state.langkah5?.kelemahanSolusi || "-"}</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <span className="text-[8px] sm:text-[9px] uppercase font-black tracking-wider text-slate-400 block mb-1">Rencana Nyata Memperbaiki Kelemahan</span>
                      <div className="space-y-1.5">
                        {(state.langkah5?.perbaikanSolusiBaris || []).map((row, idx) => (
                          <div key={idx} className="bg-white p-2 rounded-lg border border-slate-200 space-y-1.5 text-xs font-sans">
                            <div className="flex justify-between items-center bg-rose-50/20 p-1 rounded border border-rose-150/20">
                              <span className="font-mono font-black text-[9px] text-rose-750 shrink-0">PERBAIKAN #{idx + 1}</span>
                              <span className="text-[10px] text-slate-800 font-extrabold truncate ml-2 break-content">{row.solusiPerluDiperbaiki}</span>
                            </div>
                            <div className="grid grid-cols-3 gap-1.5 text-[9px] sm:text-[10px] leading-tight text-slate-600 pt-0.5">
                              <div className="break-words">
                                <span className="font-extrabold text-[7.5px] sm:text-[8px] text-slate-400 block uppercase">Bagian Lemah</span>
                                <span className="font-semibold text-slate-750">{row.bagianPerluDiperbaiki || "-"}</span>
                              </div>
                              <div className="break-words">
                                <span className="font-extrabold text-[7.5px] sm:text-[8px] text-slate-400 block uppercase">Rencana Solutif</span>
                                <span className="font-semibold text-slate-750">{row.rencanaPerbaikan || "-"}</span>
                              </div>
                              <div className="break-words font-sans">
                                <span className="font-extrabold text-[7.5px] sm:text-[8px] text-slate-400 block uppercase">Siapa & Alat</span>
                                <span className="font-semibold text-slate-750 block">{row.siapamelakukan || "-"}</span>
                                <span className="text-[8.5px] text-slate-500 italic block">Media: {row.sumberDayaDibutuhkan || "-"}</span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* 4. FEEDBACK FORM CARD */}
      <div className="bg-white border border-slate-200 rounded-xl sm:rounded-2xl p-3 sm:p-5 shadow-sm space-y-3 animate-fade-in animate-duration-300">
        <h3 className="text-xs font-black uppercase tracking-wider text-slate-800 flex items-center gap-1.5 border-b border-slate-100 pb-2">
          <Star className="w-4 h-4 text-amber-500 fill-amber-300 shrink-0" />
          <span>Formulir Umpan Balik LKPD PBL</span>
        </h3>

        {submittedFeedback ? (
          <div className="bg-indigo-50/80 border border-indigo-150 p-3 sm:p-4 rounded-xl text-center space-y-2.5 animate-fade-in text-slate-800 font-sans">
            <div className="w-9 h-9 bg-indigo-100 text-indigo-700 rounded-full flex items-center justify-center mx-auto shadow-sm">
              <Check className="w-4.5 h-4.5 stroke-[3]" />
            </div>
            <h4 className="text-xs sm:text-sm font-black text-indigo-950">Terima Kasih Atas Umpan Baliknya!</h4>
            <p className="text-[11px] sm:text-xs text-indigo-700 leading-relaxed max-w-sm mx-auto font-medium">
              Umpan balik kelompok Anda ({rating} dari 5 Bintang) berhasil direkam secara aman. Masukan Anda sangat berarti bagi pengembangan media ajar interaktif ini!
            </p>
            <button
              type="button"
              onClick={() => setSubmittedFeedback(false)}
              className="text-[9px] uppercase font-black text-indigo-600 hover:underline tracking-widest cursor-pointer font-sans"
            >
              Ubah Tanggapan
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            <div className="space-y-1.5 text-center">
              <label className="text-[9px] sm:text-[10px] font-black uppercase text-slate-505 tracking-wider block font-sans">
                Seberapa menarik dan mendidik aplikasi LKPD ini menurut Anda?
              </label>
              
              <div className="flex justify-center items-center gap-1.5 py-0.5">
                {[1, 2, 3, 4, 5].map((star) => {
                  const isGold = (hoverRating || rating) >= star;
                  return (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(0)}
                      className="p-1 transition-transform hover:scale-125 focus:outline-none cursor-pointer"
                      title={`${star} Bintang`}
                    >
                      <Star
                        className={`w-7 h-7 sm:w-8 sm:h-8 transition-all ${
                          isGold 
                            ? "fill-amber-400 text-amber-500 stroke-[1.5]" 
                            : "text-slate-300 stroke-[1.5]"
                        }`}
                      />
                    </button>
                  );
                })}
              </div>
              <div className="text-[10px] font-mono font-black text-slate-500 min-h-[16px]">
                {rating === 1 && "😞 Kurang Menarik"}
                {rating === 2 && "😐 Biasa Saja"}
                {rating === 3 && "🙂 Cukup Baik & Informatif"}
                {rating === 4 && "😊 Sangat Menarik & Seru"}
                {rating === 5 && "😍 Sempurna & Luar Biasa Interaktif!"}
                {rating === 0 && "Ketuk bintang di atas untuk memberi penilaian"}
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] font-black uppercase text-slate-500 tracking-wider block font-sans">
                Saran, Hambatan, atau Masukan Kelompok:
              </label>
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Bagikan pengalaman belajar kelompok Anda atau hal terseru selama berdiskusi..."
                rows={3}
                className="w-full text-xs p-3 bg-slate-50 border border-slate-200 focus:bg-white focus:ring-1 focus:ring-indigo-400 rounded-xl outline-none leading-relaxed resize-none text-slate-800 font-sans"
              />
            </div>

            <button
              type="button"
              disabled={rating === 0}
              onClick={() => setSubmittedFeedback(true)}
              className={`w-full py-2.5 rounded-xl text-xs font-black uppercase tracking-wider flex items-center justify-center space-x-1.5 transition-all text-white ${
                rating === 0 ? "bg-slate-300 cursor-not-allowed" : "bg-indigo-600 hover:bg-indigo-700 active:scale-95 shadow-sm cursor-pointer"
              }`}
            >
              <Send className="w-3.5 h-3.5" />
              <span>Kirim Umpan Balik</span>
            </button>
          </div>
        )}
      </div>

      {/* 5. DONE BUTTON */}
      <div className="pt-2 border-t border-slate-200">
        <button
          onClick={onReset}
          className="w-full py-3 sm:py-4 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 active:scale-95 text-white font-extrabold text-[12px] sm:text-sm tracking-widest uppercase rounded-xl sm:rounded-2xl flex items-center justify-center space-x-2 transition-all cursor-pointer shadow-md"
        >
          <Home className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
          <span>Selesai & Kembali</span>
        </button>
      </div>

    </div>
  );
}
