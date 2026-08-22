export type Sleeve = {
  id: string;
  packageId: string;
  type: "front_cover" | "inner_sleeve_a" | "inner_sleeve_b" | "gatefold";
  typeLabel: string;
  album: string;
  artist: string;
  artwork: string;
  note?: string;
};

export type AlbumPackage = {
  id: string;
  albumTitle: string;
  artist: string;
  query: string;
  songQueries: string[];
  bpm: number;
  mood: string;
  country: string;
  hasObi?: boolean;
  sleeves: Sleeve[];
};

export const VERIFIED_ALBUM_PACKAGES: AlbumPackage[] = [
  {
    id: "pb-lost-weekend",
    albumTitle: "Lost Weekend",
    artist: "Phoebe Bridgers",
    query: "Phoebe Bridgers As Above",
    songQueries: ["Phoebe Bridgers As Above", "Phoebe Bridgers So Much"],
    bpm: 66,
    mood: "MELANCHOLIC INDIE FOLK",
    country: "US",
    hasObi: false,
    sleeves: [
      {
        id: "pb-lw-front",
        packageId: "pb-lost-weekend",
        type: "front_cover",
        typeLabel: "FRONT COVER",
        album: "Lost Weekend",
        artist: "Phoebe Bridgers",
        artwork: "https://is1-ssl.mzstatic.com/image/thumb/Music211/v4/aa/9e/a6/aa9ea64a-bbf2-470e-b447-fa407b4645fa/66852.jpg/1200x1200bb.jpg",
        note: "Original 12\" Edition Jacket Scan"
      },
      {
        id: "pb-lw-sleeve-a",
        packageId: "pb-lost-weekend",
        type: "inner_sleeve_a",
        typeLabel: "LYRIC & LINER INSERT",
        album: "Lost Weekend",
        artist: "Phoebe Bridgers",
        artwork: "https://is1-ssl.mzstatic.com/image/thumb/Music112/v4/95/7b/7c/957b7c50-eac5-4a78-2070-5f30ef4c15c4/dj.auehhwxs.jpg/1200x1200bb.jpg",
        note: "Archival Liner Notes & Session Commentary"
      },
      {
        id: "pb-lw-sleeve-b",
        packageId: "pb-lost-weekend",
        type: "inner_sleeve_b",
        typeLabel: "STUDIO & ARTWORK PRINT",
        album: "Lost Weekend",
        artist: "Phoebe Bridgers",
        artwork: "https://is1-ssl.mzstatic.com/image/thumb/Music125/v4/5a/5d/1f/5a5d1fde-7f6f-9997-3bca-d75f1e799464/656605154565.jpg/1200x1200bb.jpg",
        note: "Monochrome Studio Photography Print"
      },
      {
        id: "pb-lw-gatefold",
        packageId: "pb-lost-weekend",
        type: "gatefold",
        typeLabel: "GATEFOLD CENTERSPREAD",
        album: "Lost Weekend",
        artist: "Phoebe Bridgers",
        artwork: "https://is1-ssl.mzstatic.com/image/thumb/Music221/v4/20/4c/6e/204c6ef3-8e95-4cee-2256-202ca62aebed/60220.jpg/1200x1200bb.jpg",
        note: "Complete Gatefold Artwork Index"
      }
    ]
  },
  {
    id: "pb-punisher",
    albumTitle: "Punisher",
    artist: "Phoebe Bridgers",
    query: "Phoebe Bridgers Savior Complex",
    songQueries: ["Phoebe Bridgers Savior Complex", "Phoebe Bridgers Kyoto"],
    bpm: 66,
    mood: "SAD ACOUSTIC FOLK",
    country: "US",
    hasObi: false,
    sleeves: [
      {
        id: "pb-pun-front",
        packageId: "pb-punisher",
        type: "front_cover",
        typeLabel: "FRONT COVER",
        album: "Punisher",
        artist: "Phoebe Bridgers",
        artwork: "https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/39/91/4f/39914f60-e9aa-4ae9-3962-44b0a5e5d570/656605150062.jpg/1200x1200bb.jpg",
        note: "12\" Red Galaxy Vinyl Edition Jacket Scan"
      },
      {
        id: "pb-pun-sleeve-a",
        packageId: "pb-punisher",
        type: "inner_sleeve_a",
        typeLabel: "LYRIC & LINER INSERT",
        album: "Punisher",
        artist: "Phoebe Bridgers",
        artwork: "https://is1-ssl.mzstatic.com/image/thumb/Music125/v4/5a/5d/1f/5a5d1fde-7f6f-9997-3bca-d75f1e799464/656605154565.jpg/1200x1200bb.jpg",
        note: "Illustrated Silver Foil Inner Sleeve Scan"
      },
      {
        id: "pb-pun-sleeve-b",
        packageId: "pb-punisher",
        type: "inner_sleeve_b",
        typeLabel: "STUDIO & ARTWORK PRINT",
        album: "Punisher",
        artist: "Phoebe Bridgers",
        artwork: "https://is1-ssl.mzstatic.com/image/thumb/Music112/v4/95/7b/7c/957b7c50-eac5-4a78-2070-5f30ef4c15c4/dj.auehhwxs.jpg/1200x1200bb.jpg",
        note: "Lyric Booklet & Credits Insert"
      }
    ]
  },
  {
    id: "pb-stranger",
    albumTitle: "Stranger in the Alps",
    artist: "Phoebe Bridgers",
    query: "Phoebe Bridgers Motion Sickness",
    songQueries: ["Phoebe Bridgers Motion Sickness", "Phoebe Bridgers Funeral"],
    bpm: 72,
    mood: "INDIE FOLK · NOSTALGIA",
    country: "US",
    hasObi: false,
    sleeves: [
      {
        id: "pb-str-front",
        packageId: "pb-stranger",
        type: "front_cover",
        typeLabel: "FRONT COVER",
        album: "Stranger in the Alps",
        artist: "Phoebe Bridgers",
        artwork: "https://is1-ssl.mzstatic.com/image/thumb/Music221/v4/20/4c/6e/204c6ef3-8e95-4cee-2256-202ca62aebed/60220.jpg/1200x1200bb.jpg",
        note: "Lavender Vinyl Edition Front Jacket Scan"
      },
      {
        id: "pb-str-sleeve-a",
        packageId: "pb-stranger",
        type: "inner_sleeve_a",
        typeLabel: "LYRIC & LINER INSERT",
        album: "Stranger in the Alps",
        artist: "Phoebe Bridgers",
        artwork: "https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/39/91/4f/39914f60-e9aa-4ae9-3962-44b0a5e5d570/656605150062.jpg/1200x1200bb.jpg",
        note: "Painted Ghost Inlay Scan by Angela Deane"
      }
    ]
  },
  {
    id: "bg-boygenius",
    albumTitle: "boygenius EP",
    artist: "boygenius",
    query: "boygenius Bite The Hand",
    songQueries: ["boygenius Bite The Hand", "boygenius Me & My Dog"],
    bpm: 68,
    mood: "POWER INDIE TRIO",
    country: "US",
    hasObi: false,
    sleeves: [
      {
        id: "bg-ep-front",
        packageId: "bg-boygenius",
        type: "front_cover",
        typeLabel: "FRONT COVER",
        album: "boygenius EP",
        artist: "boygenius",
        artwork: "https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/51/97/81/519781a7-bb89-623f-e8b2-b5e1975e5421/656605144160.jpg/1200x1200bb.jpg",
        note: "12\" EP Original Jacket Scan"
      },
      {
        id: "bg-ep-sleeve-a",
        packageId: "bg-boygenius",
        type: "inner_sleeve_a",
        typeLabel: "LYRIC & LINER INSERT",
        album: "boygenius EP",
        artist: "boygenius",
        artwork: "https://is1-ssl.mzstatic.com/image/thumb/Music114/v4/5f/88/44/5f884488-874b-e8d1-d225-7832870e62a1/656605158365.jpg/1200x1200bb.jpg",
        note: "Band Portrait Insert Scan by LVL Up"
      }
    ]
  },
  {
    id: "bg-the-record",
    albumTitle: "the record",
    artist: "boygenius",
    query: "boygenius Not Strong Enough",
    songQueries: ["boygenius Not Strong Enough", "boygenius Cool About It"],
    bpm: 64,
    mood: "HARMONIC ROCK",
    country: "US",
    hasObi: false,
    sleeves: [
      {
        id: "bg-rec-front",
        packageId: "bg-the-record",
        type: "front_cover",
        typeLabel: "FRONT COVER",
        album: "the record",
        artist: "boygenius",
        artwork: "https://is1-ssl.mzstatic.com/image/thumb/Music114/v4/5f/88/44/5f884488-874b-e8d1-d225-7832870e62a1/656605158365.jpg/1200x1200bb.jpg",
        note: "12\" LP Gatefold Sleeve Front Scan"
      },
      {
        id: "bg-rec-sleeve-a",
        packageId: "bg-the-record",
        type: "inner_sleeve_a",
        typeLabel: "LYRIC & LINER INSERT",
        album: "the record",
        artist: "boygenius",
        artwork: "https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/51/97/81/519781a7-bb89-623f-e8b2-b5e1975e5421/656605144160.jpg/1200x1200bb.jpg",
        note: "Illustrated Lyric Inner Sleeve Scan"
      }
    ]
  },
  {
    id: "cl-sling",
    albumTitle: "Sling",
    artist: "Clairo",
    query: "Clairo Amoeba",
    songQueries: ["Clairo Amoeba", "Clairo Blouse"],
    bpm: 70,
    mood: "INTIMATE SOPHISTI-POP",
    country: "US",
    hasObi: false,
    sleeves: [
      {
        id: "cl-sl-front",
        packageId: "cl-sling",
        type: "front_cover",
        typeLabel: "FRONT COVER",
        album: "Sling",
        artist: "Clairo",
        artwork: "https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/ce/27/ef/ce27efc9-2ef5-f7aa-a9ff-520e5e0a05a1/21UMGIM47668.rgb.jpg/1200x1200bb.jpg",
        note: "12\" Heavyweight Gatefold Jacket Scan"
      },
      {
        id: "cl-sl-sleeve-a",
        packageId: "cl-sling",
        type: "inner_sleeve_a",
        typeLabel: "LYRIC & LINER INSERT",
        album: "Sling",
        artist: "Clairo",
        artwork: "https://is1-ssl.mzstatic.com/image/thumb/Music112/v4/95/7b/7c/957b7c50-eac5-4a78-2070-5f30ef4c15c4/dj.auehhwxs.jpg/1200x1200bb.jpg",
        note: "Booklet Insert & Production Notes Scan"
      }
    ]
  },
  {
    id: "bt-dragon",
    albumTitle: "Dragon New Warm Mountain I Believe in You",
    artist: "Big Thief",
    query: "Big Thief Simulation Swarm",
    songQueries: ["Big Thief Simulation Swarm", "Big Thief Certainty"],
    bpm: 78,
    mood: "EXPANSIVE FOLK ROCK",
    country: "US",
    hasObi: false,
    sleeves: [
      {
        id: "bt-dr-front",
        packageId: "bt-dragon",
        type: "front_cover",
        typeLabel: "FRONT COVER",
        album: "Dragon New Warm Mountain I Believe in You",
        artist: "Big Thief",
        artwork: "https://is1-ssl.mzstatic.com/image/thumb/Music116/v4/5a/8e/31/5a8e31b6-52c6-11f8-00aa-b9398f6a978f/191404119912.jpg/1200x1200bb.jpg",
        note: "Double LP Gatefold Front Jacket Scan"
      },
      {
        id: "bt-dr-sleeve-a",
        packageId: "bt-dragon",
        type: "inner_sleeve_a",
        typeLabel: "LYRIC & LINER INSERT",
        album: "Dragon New Warm Mountain I Believe in You",
        artist: "Big Thief",
        artwork: "https://is1-ssl.mzstatic.com/image/thumb/Music125/v4/5a/5d/1f/5a5d1fde-7f6f-9997-3bca-d75f1e799464/656605154565.jpg/1200x1200bb.jpg",
        note: "Archival Session Sketches & Lyric Sleeve Scan"
      }
    ]
  },
  {
    id: "es-eo",
    albumTitle: "Either/Or",
    artist: "Elliott Smith",
    query: "Elliott Smith Between the Bars",
    songQueries: ["Elliott Smith Between the Bars", "Elliott Smith Angeles"],
    bpm: 76,
    mood: "RAW ACOUSTIC POETRY",
    country: "US",
    hasObi: false,
    sleeves: [
      {
        id: "es-eo-front",
        packageId: "es-eo",
        type: "front_cover",
        typeLabel: "FRONT COVER",
        album: "Either/Or",
        artist: "Elliott Smith",
        artwork: "https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/44/2c/80/442c8065-faec-9602-53b9-1d4889c25f4f/mzi.sckgvgvj.jpg/1200x1200bb.jpg",
        note: "Original 12\" Heavyweight Pressing Sleeve Scan"
      },
      {
        id: "es-eo-sleeve-a",
        packageId: "es-eo",
        type: "inner_sleeve_a",
        typeLabel: "LYRIC & LINER INSERT",
        album: "Either/Or",
        artist: "Elliott Smith",
        artwork: "https://is1-ssl.mzstatic.com/image/thumb/Music112/v4/95/7b/7c/957b7c50-eac5-4a78-2070-5f30ef4c15c4/dj.auehhwxs.jpg/1200x1200bb.jpg",
        note: "KRS Records Archival Liner Sheet Scan"
      }
    ]
  },
  {
    id: "ss-carrie",
    albumTitle: "Carrie & Lowell",
    artist: "Sufjan Stevens",
    query: "Sufjan Stevens Should Have Known Better",
    songQueries: ["Sufjan Stevens Should Have Known Better", "Sufjan Stevens Mystery of Love"],
    bpm: 65,
    mood: "EHEREAL FOLK AMBIENCE",
    country: "US",
    hasObi: false,
    sleeves: [
      {
        id: "ss-cl-front",
        packageId: "ss-carrie",
        type: "front_cover",
        typeLabel: "FRONT COVER",
        album: "Carrie & Lowell",
        artist: "Sufjan Stevens",
        artwork: "https://is1-ssl.mzstatic.com/image/thumb/Music124/v4/1b/47/33/1b4733eb-7a76-285d-aa3e-0faeb761efeb/656605139067.jpg/1200x1200bb.jpg",
        note: "12\" Clear Vinyl LP Jacket Scan"
      },
      {
        id: "ss-cl-sleeve-a",
        packageId: "ss-carrie",
        type: "inner_sleeve_a",
        typeLabel: "LYRIC & LINER INSERT",
        album: "Carrie & Lowell",
        artist: "Sufjan Stevens",
        artwork: "https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/aa/9e/a6/aa9ea64a-bbf2-470e-b447-fa407b4645fa/66852.jpg/1200x1200bb.jpg",
        note: "Asthmatic Kitty Archival Lyric Insert Scan"
      }
    ]
  },
  {
    id: "wb-titanic",
    albumTitle: "Titanic Rising",
    artist: "Weyes Blood",
    query: "Weyes Blood Andromeda",
    songQueries: ["Weyes Blood Andromeda", "Weyes Blood Everyday"],
    bpm: 68,
    mood: "BAROQUE POP DREAM",
    country: "US",
    hasObi: false,
    sleeves: [
      {
        id: "wb-tr-front",
        packageId: "wb-titanic",
        type: "front_cover",
        typeLabel: "FRONT COVER",
        album: "Titanic Rising",
        artist: "Weyes Blood",
        artwork: "https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/0d/16/d2/0d16d2ca-b040-d7d8-18e4-8473ef7b1d11/098787123212.jpg/1200x1200bb.jpg",
        note: "Sub Pop 12\" LP Jacket Scan"
      },
      {
        id: "wb-tr-sleeve-a",
        packageId: "wb-titanic",
        type: "inner_sleeve_a",
        typeLabel: "LYRIC & LINER INSERT",
        album: "Titanic Rising",
        artist: "Weyes Blood",
        artwork: "https://is1-ssl.mzstatic.com/image/thumb/Music125/v4/5a/5d/1f/5a5d1fde-7f6f-9997-3bca-d75f1e799464/656605154565.jpg/1200x1200bb.jpg",
        note: "Underwater Bedroom Session Photography Scan"
      }
    ]
  },
  {
    id: "ms-so-tonight",
    albumTitle: "So Tonight That I Might See",
    artist: "Mazzy Star",
    query: "Mazzy Star Fade Into You",
    songQueries: ["Mazzy Star Fade Into You", "Mazzy Star Into Dust"],
    bpm: 60,
    mood: "DREAM POP SLOWCORE",
    country: "US",
    hasObi: false,
    sleeves: [
      {
        id: "ms-st-front",
        packageId: "ms-so-tonight",
        type: "front_cover",
        typeLabel: "FRONT COVER",
        album: "So Tonight That I Might See",
        artist: "Mazzy Star",
        artwork: "https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/0a/76/97/0a76974e-5e8a-028f-7965-385fb93c0d89/00602547285116.rgb.jpg/1200x1200bb.jpg",
        note: "Capitol 12\" Vinyl LP Front Jacket Scan"
      },
      {
        id: "ms-st-sleeve-a",
        packageId: "ms-so-tonight",
        type: "inner_sleeve_a",
        typeLabel: "LYRIC & LINER INSERT",
        album: "So Tonight That I Might See",
        artist: "Mazzy Star",
        artwork: "https://is1-ssl.mzstatic.com/image/thumb/Music112/v4/95/7b/7c/957b7c50-eac5-4a78-2070-5f30ef4c15c4/dj.auehhwxs.jpg/1200x1200bb.jpg",
        note: "Archival Velvet Inlay Insert Scan"
      }
    ]
  },
  {
    id: "jb-sprained",
    albumTitle: "Sprained Ankle",
    artist: "Julien Baker",
    query: "Julien Baker Sprained Ankle",
    songQueries: ["Julien Baker Sprained Ankle", "Julien Baker Something"],
    bpm: 65,
    mood: "CONFESSIONAL FOLK",
    country: "US",
    hasObi: false,
    sleeves: [
      {
        id: "jb-sa-front",
        packageId: "jb-sprained",
        type: "front_cover",
        typeLabel: "FRONT COVER",
        album: "Sprained Ankle",
        artist: "Julien Baker",
        artwork: "https://is1-ssl.mzstatic.com/image/thumb/Music124/v4/0d/16/d2/0d16d2ca-b040-d7d8-18e4-8473ef7b1d11/656605141060.jpg/1200x1200bb.jpg",
        note: "12\" LP White Vinyl Edition Jacket Scan"
      },
      {
        id: "jb-sa-sleeve-a",
        packageId: "jb-sprained",
        type: "inner_sleeve_a",
        typeLabel: "LYRIC & LINER INSERT",
        album: "Sprained Ankle",
        artist: "Julien Baker",
        artwork: "https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/aa/9e/a6/aa9ea64a-bbf2-470e-b447-fa407b4645fa/66852.jpg/1200x1200bb.jpg",
        note: "6131 Records Archival Lyric Insert Scan"
      }
    ]
  }
];

export const EXPANDED_JAPANESESLEEVES = VERIFIED_ALBUM_PACKAGES.flatMap((pkg) => pkg.sleeves);
export const EXPANDED_SONG_SEEDS = VERIFIED_ALBUM_PACKAGES.map((pkg) => pkg.query);
export const COUNTRY_CODES = ["US", "JP", "GB", "DE", "FR"];
