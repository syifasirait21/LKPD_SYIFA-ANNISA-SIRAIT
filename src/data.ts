import { FactItem, WorkbookState } from "./types";

export const FACTS_LIST: FactItem[] = [
  {
    id: "hujan_deras",
    label: "Hujan deras berlangsung lama",
    icon: "CloudRain",
    desc: "Curah hujan yang ekstrim melebihi batas penyerapan alami tanah."
  },
  {
    id: "sungai_meluap",
    label: "Sungai meluap",
    icon: "Waves",
    desc: "Volume air sungai naik melampaui kapasitas tanggul sungai alami."
  },
  {
    id: "sampah_menyumbat",
    label: "Sampah menyumbat saluran air",
    icon: "Trash2",
    desc: "Plastik dan limbah domestik menghambat laju air di parit dan gorong-gorong."
  },
  {
    id: "lereng_terjal",
    label: "Lereng bukit terjal",
    icon: "Mountain",
    desc: "Kemiringan tanah tinggi meningkatkan kecepatan aliran air permukaan dan risiko longsor."
  },
  {
    id: "tanah_jenuh",
    label: "Tanah menjadi jenuh air",
    icon: "Droplets",
    desc: "Tanah tidak sanggup lagi menyerap air tambahan karena pori-pori tanah sudah terisi penuh air."
  },
  {
    id: "hutan_gundul",
    label: "Hutan gundul",
    icon: "Trees",
    desc: "Penebangan pohon mengurangi daya ikat tanah dan hilangnya kanopi penahan air hujan."
  },
  {
    id: "pembangunan_sungai",
    label: "Pembangunan di dekat sungai",
    icon: "Home",
    desc: "Pendirian hunian ilegal di bantaran sungai mempersempit aliran sungai dan meningkatkan kerentanan."
  },
  {
    id: "drainase_rusak",
    label: "Drainase tidak berfungsi",
    icon: "Grid",
    desc: "Dimensi selokan terlalu kecil, pecah, atau dipenuhi sedimen lumpur pecah."
  },
  {
    id: "evakuasi_minim",
    label: "Warga belum tahu jalur evakuasi",
    icon: "Signpost",
    desc: "Kurangnya papan penunjuk arah evakuasi dan simulasi tanggap darurat bencana."
  },
  {
    id: "kurang_kesadaran",
    label: "Kurang kesadaran menjaga lingkungan",
    icon: "UserX",
    desc: "Kebiasaan membuang sampah sembarangan dan ketidakpedulian terhadap kelestarian lingkungan."
  }
];

export const INITIAL_WORKBOOK_STATE: WorkbookState = {
  studentName: "",
  studentLeader: "",
  studentMembers: ["", "", "", ""],
  studentGroup: "",
  studentClass: "",

  langkah1: {
    masalahUtama: "",
    penyebabUtama: "",
    dampakUtama: ""
  },

  langkah2: {
    selectedFacts: [],
    additionalInfo: "",
    categorization: {
      alami: [],
      manusia: []
    },
    thingsToLearn: ["", "", "", ""]
  },

  langkah3: {
    investigationRows: [
      { dataDitemukan: "", sumberInformasi: "Amati Poster", faktaPenting: "", maknaHubungan: "" },
      { dataDitemukan: "", sumberInformasi: "Baca Artikel", faktaPenting: "", maknaHubungan: "" },
      { dataDitemukan: "", sumberInformasi: "Grafik Data", faktaPenting: "", maknaHubungan: "" },
      { dataDitemukan: "", sumberInformasi: "Diskusi Mandiri", faktaPenting: "", maknaHubungan: "" }
    ],
    shockingFact: "",
    discussionQuestions: {
      faktorBerpengaruh: "",
      dampakNyata: "",
      upayaTindakan: "",
      pihakTerlibat: ""
    }
  },

  langkah4: {
    ideSolusi: {
      pencegahan: ["", "", "", ""],
      kesiapsiagaan: ["", "", "", ""],
      penanganan: ["", "", "", ""],
      pemulihan: ["", "", "", ""]
    },
    solusiTerbaik: {
      pencegahan: { solusi: "", alasan: "" },
      kesiapsiagaan: { solusi: "", alasan: "" },
      penanganan: { solusi: "", alasan: "" },
      pemulihan: { solusi: "", alasan: "" }
    },
    rancanganSolusi: "",
    mediaPenyajian: [],
    mediaPenyajianLainnya: "",
    sajianPoin: ["", "", "", ""],
    refleksiDiri: {
      partisipasi: false,
      bermanfaat: false,
      percayaDiri: false,
      siapMenerapkan: false
    }
  },

  langkah5: {
    evaluasiBaris: [
      { id: "sol_1", solusi: "Penanaman pohon (Reboisasi) di wilayah hulu lereng bukit terjal", kelayakan: 1, efektivitas: 1, dampakPositif: 1, keberlanjutan: 1 },
      { id: "sol_2", solusi: "Pembersihan rutin got/selokan & perbaikan drainase pemukiman warga", kelayakan: 1, efektivitas: 1, dampakPositif: 1, keberlanjutan: 1 },
      { id: "sol_3", solusi: "Edukasi serta rambu jalur evakuasi & tas siaga bencana untuk warga", kelayakan: 1, efektivitas: 1, dampakPositif: 1, keberlanjutan: 1 }
    ],
    analisisTerbaik: "",
    kelebihanSolusi: "",
    kelemahanSolusi: "",
    perbaikanSolusiBaris: [
      { id: "perb_1", solusiPerluDiperbaiki: "Pembersihan rutin gorong-gorong", bagianPerluDiperbaiki: "Kurangnya keikutsertaan warga luar RT", rencanaPerbaikan: "Membuat jadwal gotong royong terpadu se-Kelurahan", sumberDayaDibutuhkan: "Peralatan kebersihan & konsumsi dari swadaya", siapamelakukan: "Seluruh warga & difasilitasi oleh Lurah" },
      { id: "perb_2", solusiPerluDiperbaiki: "Edukasi jalur rute evakuasi", bagianPerluDiperbaiki: "Warga lansia kesulitan membaca rambu kecil", rencanaPerbaikan: "Memasang rambu reflektif besar & ada tanda audio peluit darurat", sumberDayaDibutuhkan: "Megaphone bertenaga baterai & plang fosfor menyala malam", siapamelakukan: "Relawan pemuda & Tim Siaga Bencana Desa" }
    ],
    refleksiAkhir: {
      aktifEvaluasi: false,
      pahamKelebihan: false,
      bisaSaran: false,
      kerjaSama: false,
      siapMenerapkanHari: false
    }
  }
};
