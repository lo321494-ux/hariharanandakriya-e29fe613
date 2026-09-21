export type MemberResource = {
  id: string;
  title: string;
  kind: "audio" | "document";
  collection: string;
};

export const MEMBER_DRIVE_URL =
  "https://drive.google.com/drive/folders/1dDgHkTdXE6iTksf1_jbCRrOehSpy-4oR?usp=sharing";

export const memberAudios: MemberResource[] = [
  { id: "1LEeBcylw2uhnbefW-O3IRBr2lHWavZJt", title: "1 Swami Hariharananda Giri", kind: "audio", collection: "Enseñanzas de Baba Hariharananda" },
  { id: "13tcouDB03lG3TmGKE9RrrSBaSPNwmm63", title: "1A Swami Hariharananda Giri", kind: "audio", collection: "Enseñanzas de Baba Hariharananda" },
  { id: "1fACk0qnTTFFyPJfcKrgn7q3NeaIWXJz3", title: "1B Swami Hariharananda Giri", kind: "audio", collection: "Enseñanzas de Baba Hariharananda" },
  { id: "1D1KkmhChsVMhnzyN99uGVhKklJOozoPS", title: "1C Swami Hariharananda Giri", kind: "audio", collection: "Enseñanzas de Baba Hariharananda" },
  { id: "1RJtwAbXOATnBGNqL8hXonTPLWJeeinz7", title: "1D Swami Hariharananda Giri", kind: "audio", collection: "Enseñanzas de Baba Hariharananda" },
  { id: "13QBHDOd7jVM-F7CfT7QA6XhtkAbEFIqu", title: "2 Swami Hariharananda Giri", kind: "audio", collection: "Enseñanzas de Baba Hariharananda" },
  { id: "1DypIMvC9PFcLLpGqucEgYS_UoZRs58Ow", title: "3 Swami Hariharananda Giri", kind: "audio", collection: "Enseñanzas de Baba Hariharananda" },
  { id: "1hsLs8eacdJ2ouTPqNhREtG1Kfs45wkmn", title: "4 Swami Hariharananda Giri", kind: "audio", collection: "Enseñanzas de Baba Hariharananda" },
  { id: "1oiTF0MlPf5Wi3UtQTs02hFDw0zw-5YOE", title: "5 Swami Hariharananda Giri", kind: "audio", collection: "Enseñanzas de Baba Hariharananda" },
  { id: "1kOUE9fLOPFdPqktlCI8m6MkAbaik2lPk", title: "7 Swami Hariharananda Giri", kind: "audio", collection: "Enseñanzas de Baba Hariharananda" },
  { id: "14I_djSHAF1CPzohEClZUXeoBz0oW8-kB", title: "8 Swami Hariharananda Giri", kind: "audio", collection: "Enseñanzas de Baba Hariharananda" },
  { id: "18mh-pqBjgjIBDjhfbs9UubSL-8YrvJg9", title: "8A Swami Hariharananda Giri", kind: "audio", collection: "Enseñanzas de Baba Hariharananda" },
  { id: "1vJgA3YsOrUFQa38u-myQisNL3wQEw3Qv", title: "8B Swami Hariharananda Giri", kind: "audio", collection: "Enseñanzas de Baba Hariharananda" },
  { id: "1yvZh9XyMrGNqQzcOE1yiqBFnLYp3y85o", title: "9 Swami Hariharananda Giri", kind: "audio", collection: "Enseñanzas de Baba Hariharananda" },
  { id: "1r3ZXqDsCtzhCjfdEkkswktEejV_sG6f7", title: "10 Swami Hariharananda Giri", kind: "audio", collection: "Enseñanzas de Baba Hariharananda" },
  { id: "17Y9QrDLo7yOfFXBY2d5StZ9cjtW5wUPI", title: "11 Swami Hariharananda Giri", kind: "audio", collection: "Enseñanzas de Baba Hariharananda" },
  { id: "17XfeqK_XbK-UyK_W8sfpzRfc0Z9RAQvU", title: "SwamiHariharanandaSinging1991", kind: "audio", collection: "Cantos de Hariharananda" },
];

export const memberDocuments: MemberResource[] = [
  { id: "1QGbgYErZ0oVQga7IEBC5YP86-H2VUmDL", title: "Kriya Yoga - The Scientific Process of Soul-Culture and the Essence of all Religions", kind: "document", collection: "Biblioteca Kriya Yoga" },
  { id: "1_BjZQmqo-cFYcnfauBRqqWewaWffDPeb", title: "A los pies del Ser Cosmico Editorial", kind: "document", collection: "Biblioteca Kriya Yoga" },
  { id: "1cj-EPCxZmEjSvsFgsHFk3opko0f2A26P", title: "Discourses On Kriya Yoga", kind: "document", collection: "Biblioteca Kriya Yoga" },
  { id: "1f-FVTxmI-6kX-1u85CiA8WY5YoEgux_k", title: "Each Human Body is a BG by shg", kind: "document", collection: "Biblioteca Kriya Yoga" },
  { id: "1qPiKzrBxGkEKCrHaFjZC8ndR5s_yE-P_", title: "EL BHAGAVAD GITA EN LA LUZ DEL KRIYA YOGA tomo 1 editorial", kind: "document", collection: "Biblioteca Kriya Yoga" },
  { id: "12VzUrU652C4hBPwrvBwVu1yl3jvSl2pG", title: "La ciencia del Kriya Yoga", kind: "document", collection: "Biblioteca Kriya Yoga" },
  { id: "1xwK5Ae5e2elhGPAAMbq1KTRNGNmvlWwB", title: "Libro baghabat gita a la luz del kriya yoga 2 editorial", kind: "document", collection: "Biblioteca Kriya Yoga" },
  { id: "1PKyAa_kgNf_31uyyXZzGAFGEIWA74ZZN", title: "Libro baghabat gita a la luz del kriya yoga 3 EDITORIAL", kind: "document", collection: "Biblioteca Kriya Yoga" },
  { id: "1eV6VD-GTHg-jmOPrW97rgA0rX3TlRmrV", title: "The Bhagavad Gita Bk. 3 In the Light of Kriya Yoga Hariharananda", kind: "document", collection: "Biblioteca Kriya Yoga" },
  { id: "1jCfY6SnEJ90SVGrhfZj_L6hd0t4Q5IPg", title: "The-Science-of-Kriya-Yoga-of-Swami-Hariharananda", kind: "document", collection: "Biblioteca Kriya Yoga" },
  { id: "1sQA3dlxk9zmYX3imX-q5abtDVUmIGutD", title: "50 Bijas Soul Culture Mag Winter 1997", kind: "document", collection: "Biblioteca Kriya Yoga" },
  { id: "1qBAbkUbB4vOmClNReeDFGmu6yGbHQjhg", title: "1945. ANTASTHABORNA original 110645 Baba Document", kind: "document", collection: "Biblioteca Kriya Yoga" },
  { id: "1drGCzTmCLc00huMkaoKDUQuo_a0-gvP2", title: "1978 Karar Ashram Diamon Jubilee", kind: "document", collection: "Biblioteca Kriya Yoga" },
  { id: "1tT9nP2zCsoj8MAjeEddwCqq3vJgwqx-S", title: "Afirmaciones Cientificas Para La Curacion (Paramahansa Yogananda)", kind: "document", collection: "Biblioteca Kriya Yoga" },
  { id: "1VI2ipcxhsMD3_IKA6P6cFZaBzgK3YOXB", title: "ALifeDivine", kind: "document", collection: "Biblioteca Kriya Yoga" },
  { id: "1svSDXQwlyZXdCF9ZTVCQ4Ns6ZDM_Banb", title: "Autobiografía de un Yogui (Paramahansa Yogananda)", kind: "document", collection: "Biblioteca Kriya Yoga" },
  { id: "1GY3BNlyGGVRUadMw_MEf7y0xRvNGddAo", title: "autobiography-of-a-yogi-paramahansa-yogananda-1946-edition", kind: "document", collection: "Biblioteca Kriya Yoga" },
  { id: "1_Qw550k8FepaYJ7gvHTxpVMv8G1wWsp6", title: "Beyond-Biofeedback-Green-Green-Searchable", kind: "document", collection: "Biblioteca Kriya Yoga" },
  { id: "1TTEK5aylyQ3uTWdkkbUNP-Jss69ZjkBU", title: "biografia baba ragabananda", kind: "document", collection: "Biblioteca Kriya Yoga" },
  { id: "1L1Vte3xPOJTA-DapE3gVc4bUWumt0Cs8", title: "cantos del alma- Yogananda", kind: "document", collection: "Biblioteca Kriya Yoga" },
  { id: "1yj830AwbOxnYM9pyIPC9girUez5Fqc9m", title: "Case for Continence by Tripurari Swami", kind: "document", collection: "Biblioteca Kriya Yoga" },
  { id: "1BkYtDccJuTUWmn1fvZCz18UnkdEDFXYy", title: "El Yoga de Jesus (Yogananda)", kind: "document", collection: "Biblioteca Kriya Yoga" },
  { id: "1BPv3MQEulzsN-ERQoIA82HTMq-d6ZrS3", title: "Hamsa", kind: "document", collection: "Biblioteca Kriya Yoga" },
  { id: "16AxPQ-yvucj1a7QAt64CGCATa7SH2M2B", title: "Infinite Within Finite", kind: "document", collection: "Biblioteca Kriya Yoga" },
  { id: "1Ie3nGbE6YRtgW04TNy3xjAXQo1SZqIa0", title: "ISHA UPANISHAD SWAMI H GIRI", kind: "document", collection: "Biblioteca Kriya Yoga" },
  { id: "1XdGN51BNDHD_gMrVtjZ4JCToD7o-EE6q", title: "KRIYA YOGA - EASIEST MEANS TOWARDS LIBERATION", kind: "document", collection: "Biblioteca Kriya Yoga" },
  { id: "13ywl-SGJ7vrxcH5DS-YMvE4l3oekj1R8", title: "kriya-yutes-pdf compress", kind: "document", collection: "Biblioteca Kriya Yoga" },
  { id: "10jyep8k9DCzuc0_2wJkSuuomR1Wp-Urm", title: "Kriyaban 1987", kind: "document", collection: "Biblioteca Kriya Yoga" },
  { id: "1unBltNgUe8uu_3nNwtwPSi7RXy8lHp-_", title: "Kriyaban Quarterly Magazine 1981 Vol 2", kind: "document", collection: "Biblioteca Kriya Yoga" },
  { id: "1FWXGTHvOtvRKfHTkytJrZruYQpIuwZZu", title: "Kriyayoga Book", kind: "document", collection: "Biblioteca Kriya Yoga" },
  { id: "1mIVPkPszJ2Wj9vIfI9tuQ0W7q8-Be1D3", title: "la-respiracion-de-dios-es-nuestra-respiracion-de-vida-por-paramahamsa-hariharananda compress", kind: "document", collection: "Biblioteca Kriya Yoga" },
  { id: "1BGBTl-U46Yg3lq_oCmmTOhVtLJTx1ibo", title: "los-seis-niveles-del-kriya-yoga-por-paramahamsa-hariharananda compress", kind: "document", collection: "Biblioteca Kriya Yoga" },
  { id: "1_uQMD7rHEN5l3WtLDVK9Mm-1B5Jd9wEb", title: "Mahavatar Babaji. The Ever Living Saint. Raghabananda", kind: "document", collection: "Biblioteca Kriya Yoga" },
  { id: "1smIrN9wUncih-Z4iZ6zjxhfPbazUxmhS", title: "Nada Yoga Spanish", kind: "document", collection: "Biblioteca Kriya Yoga" },
  { id: "1zWjcOBczxyyGQ5QinD2SJ7IyBduBYI91", title: "Nada Yoga Brahmananda Sarasvati", kind: "document", collection: "Biblioteca Kriya Yoga" },
  { id: "1bKIAM6r42NAI3lYw3-xEEwFy76KeF00R", title: "OM Samadhi by Paramahamsa Hariharananda", kind: "document", collection: "Biblioteca Kriya Yoga" },
  { id: "1bfKxK29h0F_FTo5OUijUxGtwMszSrXPP", title: "Om", kind: "document", collection: "Biblioteca Kriya Yoga" },
  { id: "1kBY6n4l3ulyufqb8CEVsf0XKAZL9oVX-", title: "Paramahansa Yogananda Ch 26 Science of Kriya Yoga", kind: "document", collection: "Biblioteca Kriya Yoga" },
  { id: "1InuTKbyqKOroy0vhdZWUJO2K4-gyo0Bg", title: "Pingala Upanishad by Swami Premananda", kind: "document", collection: "Biblioteca Kriya Yoga" },
  { id: "1lNS92QXnU0CP5QViM6s1HhdD9clIXOUp", title: "SAMADHI - FUNDAMENTALS OF YOGA DR MISHRA", kind: "document", collection: "Biblioteca Kriya Yoga" },
  { id: "12RrX3K-ujgrfr3nF0KqDs6gCE34herg9", title: "Self Realization Fellowship Lessons. Lesson 4 The Hong-Sau Technique Yoga Science of Concentration (Paramahansa Yogananda) (Z-Library)", kind: "document", collection: "Biblioteca Kriya Yoga" },
  { id: "1WTc41KltVv5q-W0sAvgoOYZvr5rNECEZ", title: "Self-Realization Fellowship Kriya Yoga Lesson 3 (Paramahansa Yogananda)", kind: "document", collection: "Biblioteca Kriya Yoga" },
  { id: "1AW6JHUt2UEJyb-6dxKKgBKcTd-Gj7wc6", title: "Self-Realization Fellowship Lessons - Kriya Yoga - with bookmarks (Paramahansa Yogananda)", kind: "document", collection: "Biblioteca Kriya Yoga" },
  { id: "1KK0ayjTeT3iB59DvnrKYx5CsAu5fV3yl", title: "Self-Realization Fellowship Lessons 1 (Self-Realization Fellowship)", kind: "document", collection: "Biblioteca Kriya Yoga" },
  { id: "1TctG5LifcVVnWNwYBu1tkiKXwNeZu5-P", title: "sri-yukteshwar-giri", kind: "document", collection: "Biblioteca Kriya Yoga" },
  { id: "17CHZZQdTkGtVCUpnFueqKPyTSk63hqFB", title: "Swami Hariharananda Ch III Science Of Kriya Yoga", kind: "document", collection: "Biblioteca Kriya Yoga" },
  { id: "1V-mJ0t9I_9Pmx6KQ358LR2WRhle8nUag", title: "Swami Hariharananda in Mysteries Miracles - 1978 Yogacharya SS Rath", kind: "document", collection: "Biblioteca Kriya Yoga" },
  { id: "1tGK5hAz-gbJZZDaXmFfRc-rho2J2eQP6", title: "SwamiHariharananda-TheSupremeKriyaYogi KararAshramSouvenir1973", kind: "document", collection: "Biblioteca Kriya Yoga" },
  { id: "1kX-H_MXPnf9S7QlaZoyQpsm_kiiXRbkm", title: "The Breath of God - by SHG - Hinduism Today 1998", kind: "document", collection: "Biblioteca Kriya Yoga" },
  { id: "1bqeLYAhe4KkaAmTIm3BLvERTmLbgJDRk", title: "The Essence Of All Religions by Swami H Giri", kind: "document", collection: "Biblioteca Kriya Yoga" },
  { id: "1DOtzQ-blAFjTtyWCvrlwLD3IY1KVl6zp", title: "THE FIVE GREAT SUGGESTIONS FUNDAMENTALS DR MISHRA", kind: "document", collection: "Biblioteca Kriya Yoga" },
  { id: "1ENLJeByoAug218BsqBt3JDd4TlkOMcLA", title: "The Higher Kriyas of the Original Kriya Yoga by Paramahamsa Hariharananda", kind: "document", collection: "Biblioteca Kriya Yoga" },
  { id: "1aW-a4NFiHD6EHpKimvPwXthgr42Gi254", title: "The Role of Guru - Kriya Yoga by Swami H.Giri", kind: "document", collection: "Biblioteca Kriya Yoga" },
  { id: "1A7ocoAaKAwi-VBTMhjbn5PlAh4_qL4NV", title: "The Theory of Kriya Yoga", kind: "document", collection: "Biblioteca Kriya Yoga" },
];

export const driveViewUrl = (id: string) => `https://drive.google.com/file/d/${id}/view`;
export const drivePreviewUrl = (id: string) => `https://drive.google.com/file/d/${id}/preview`;
export const driveDownloadUrl = (id: string) => `https://drive.google.com/uc?export=download&id=${id}`;
export const driveAudioUrl = (id: string) =>
  `https://drive.usercontent.google.com/download?id=${id}&export=download&confirm=t`;
