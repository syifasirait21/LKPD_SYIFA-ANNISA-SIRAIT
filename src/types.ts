export interface WorkbookState {
  // Metadata
  studentName: string;
  studentLeader: string;
  studentMembers: string[]; // 4 Anggota Kelompok
  studentGroup: string;
  studentClass: string;

  // Langkah 1: Orientasi Masalah
  langkah1: {
    masalahUtama: string;
    penyebabUtama: string;
    dampakUtama: string;
  };

  // Langkah 2: Mengorganisasikan Siswa
  langkah2: {
    selectedFacts: string[]; // IDs of facts chosen from list
    additionalInfo: string;
    categorization: {
      alami: string[]; // IDs
      manusia: string[]; // IDs
    };
    thingsToLearn: string[]; // 4 items
  };

  // Langkah 3: Membimbing Penyelidikan
  langkah3: {
    investigationRows: InvestigationRow[];
    shockingFact: string;
    discussionQuestions: {
      faktorBerpengaruh: string;
      dampakNyata: string;
      upayaTindakan: string;
      pihakTerlibat: string;
    };
  };

  // Langkah 4: Mengembangkan Solusi
  langkah4: {
    ideSolusi: {
      pencegahan: string[]; // 4 items
      kesiapsiagaan: string[]; // 4 items
      penanganan: string[]; // 4 items
      pemulihan: string[]; // 4 items
    };
    solusiTerbaik: {
      pencegahan: { solusi: string; alasan: string };
      kesiapsiagaan: { solusi: string; alasan: string };
      penanganan: { solusi: string; alasan: string };
      pemulihan: { solusi: string; alasan: string };
    };
    rancanganSolusi: string; // Drawing or description
    mediaPenyajian: string[]; // selected format e.g. Poster, Infografis
    mediaPenyajianLainnya: string;
    sajianPoin: string[]; // 4 items presentation points
    refleksiDiri: {
      partisipasi: boolean;
      bermanfaat: boolean;
      percayaDiri: boolean;
      siapMenerapkan: boolean;
    };
  };

  // Langkah 5: Menganalisis & Mengevaluasi
  langkah5: {
    evaluasiBaris: EvaluasiRow[];
    analisisTerbaik: string;
    kelebihanSolusi: string;
    kelemahanSolusi: string;
    perbaikanSolusiBaris: PerbaikanRow[];
    refleksiAkhir: {
      aktifEvaluasi: boolean;
      pahamKelebihan: boolean;
      bisaSaran: boolean;
      kerjaSama: boolean;
      siapMenerapkanHari: boolean;
    };
  };
}

export interface FactItem {
  id: string;
  label: string;
  icon: string; // Icon identifier
  desc: string; // Explanation of the factor
}

export interface InvestigationRow {
  dataDitemukan: string;
  sumberInformasi: string;
  faktaPenting: string;
  maknaHubungan: string;
}

export interface EvaluasiRow {
  id: string;
  solusi: string;
  kelayakan: number; // 1-4
  efektivitas: number; // 1-4
  dampakPositif: number; // 1-4
  keberlanjutan: number; // 1-4
}

export interface PerbaikanRow {
  id: string;
  solusiPerluDiperbaiki: string;
  bagianPerluDiperbaiki: string;
  rencanaPerbaikan: string;
  sumberDayaDibutuhkan: string;
  siapamelakukan: string;
}
