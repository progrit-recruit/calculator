export type Artist = {
  id: number;
  name: string;
  handle: string;
  bio: string;
  followers: number;
  following: number;
  posts: number;
  avatarSeed: string;
  verified: boolean;
};

export type Video = {
  id: number;
  artistId: number;
  artworkId: number;
  videoUrl: string;
  description: string;
  price: string;
  likes: number;
  comments: number;
  shares: number;
  thumbnailSeed: string;
};

/**
 * Free art-process videos from Mixkit (mixkit.co/license — free for commercial use)
 * Focus: hand close-ups, painting/drawing process
 */
export const ART_VIDEO_URLS = [
  // Hands on canvas — acrylic brush strokes close-up
  "https://assets.mixkit.co/videos/5258/5258-720.mp4",
  // Painter's hand softly brushing canvas
  "https://assets.mixkit.co/videos/100467/100467-720.mp4",
  // Close shot of artist's hand painting with blue paint
  "https://assets.mixkit.co/videos/43446/43446-720.mp4",
  // Detail view of artist painting with small brush
  "https://assets.mixkit.co/videos/40310/40310-720.mp4",
  // Hand of woman painting with watercolors
  "https://assets.mixkit.co/videos/41602/41602-720.mp4",
  // Artist mixing paint on palette with spatula (extreme close-up)
  "https://assets.mixkit.co/videos/43438/43438-720.mp4",
  // Oil painting spatula technique close-up
  "https://assets.mixkit.co/videos/51015/51015-720.mp4",
  // Painter's hand painting oil portrait
  "https://assets.mixkit.co/videos/40319/40319-720.mp4",
  // Woman painting picture with brush close-up
  "https://assets.mixkit.co/videos/35999/35999-720.mp4",
  // Artist brushing paint across canvas
  "https://assets.mixkit.co/videos/43418/43418-720.mp4",
  // Hand of an artist drawing on canvas
  "https://assets.mixkit.co/videos/36721/36721-720.mp4",
  // Artist mixing paint on palette
  "https://assets.mixkit.co/videos/41611/41611-720.mp4",
  // Oil painting landscape — sunset
  "https://assets.mixkit.co/videos/46779/46779-720.mp4",
  // Digital art — drawing on tablet with stylus
  "https://assets.mixkit.co/videos/785/785-720.mp4",
  // Traditional calligraphy — ink brushwork
  "https://assets.mixkit.co/videos/50695/50695-720.mp4",
] as const;

export type Artwork = {
  id: number;
  artistId: number;
  seed: string;
  title: string;
  price: string;
  priceNum: number;
  description: string;
  likes: number;
  medium: string;   // e.g. "油彩原画", "水彩原画", "デジタルプリント"
  size: string;     // e.g. "F6号", "A3", "100×50cm"
  isOriginal: boolean; // true = 1点もの, false = 限定プリント等
};

export type VideoThumb = {
  id: number;
  seed: string;
  views: string;
  description?: string;
  artworkId?: number;
};

export const ARTISTS: Record<number, Artist> = {
  1: { id: 1, name: "Yuki Tanaka", handle: "@yuki.art", bio: "抽象画家 / 東京在住\n色と形で感情を表現する\nDM for commissions ✉️", followers: 28400, following: 312, posts: 147, avatarSeed: "face1", verified: true },
  2: { id: 2, name: "Hiro Nakamura", handle: "@hiro_creates", bio: "油絵アーティスト / 京都在住\n自然と人間の交差点を描く\n展示会情報はDMまで 🎨", followers: 15200, following: 489, posts: 93, avatarSeed: "face2", verified: false },
  3: { id: 3, name: "Saki Mori", handle: "@saki_illustration", bio: "イラストレーター / 大阪在住\n水彩と幻想世界が専門\n#watercolor #fantasy", followers: 42100, following: 201, posts: 208, avatarSeed: "face3", verified: true },
  4: { id: 4, name: "Ren Yamamoto", handle: "@ren_digital", bio: "デジタルアーティスト / 東京在住\n未来都市をデジタルで描く\n#cyberpunk #digitalart", followers: 63500, following: 156, posts: 312, avatarSeed: "face4", verified: true },
  5: { id: 5, name: "Mei Suzuki", handle: "@mei_fineart", bio: "日本画家 / 京都在住\n伝統と現代の融合を探求\n金箔・岩絵具を使用 ✨", followers: 18900, following: 84, posts: 67, avatarSeed: "face5", verified: false },
  6: { id: 6, name: "Kei Hayashi", handle: "@kei_satire", bio: "風刺画家 / 大阪在住\n社会の矛盾をペンで斬る\n政治・文化・日常を辛辣に描く ✒️", followers: 51200, following: 203, posts: 189, avatarSeed: "face6", verified: true },
};

export const VIDEOS: Video[] = [
  { id: 1, artistId: 1, artworkId: 101, videoUrl: ART_VIDEO_URLS[0], description: "深夜に描いた抽象画。眠れない夜の感情を色にした。#abstractart #digitalart #insomnia", price: "¥12,000", likes: 24200, comments: 342, shares: 89, thumbnailSeed: "picasso1" },
  { id: 2, artistId: 2, artworkId: 201, videoUrl: ART_VIDEO_URLS[1], description: "油絵で描いた夕暮れ。光と影のコントラストにこだわった作品。#oilpainting #sunset #art", price: "¥35,000", likes: 18700, comments: 256, shares: 112, thumbnailSeed: "landscape2" },
  { id: 3, artistId: 3, artworkId: 301, videoUrl: ART_VIDEO_URLS[2], description: "水彩で描いた幻想的な森。静寂と神秘を表現しました。#watercolor #fantasy #forest", price: "¥8,500", likes: 31400, comments: 521, shares: 203, thumbnailSeed: "nature3" },
  { id: 4, artistId: 4, artworkId: 401, videoUrl: ART_VIDEO_URLS[3], description: "デジタルアートで描いたサイバーパンクな都市。未来の東京をイメージ。#cyberpunk #digitalart #tokyo", price: "¥25,000", likes: 45800, comments: 867, shares: 445, thumbnailSeed: "city4" },
  { id: 5, artistId: 5, artworkId: 501, videoUrl: ART_VIDEO_URLS[4], description: "伝統的な日本画の技法を使った現代アート。金箔を使った特別な作品。#japanart #nihonga #goldleaf", price: "¥68,000", likes: 12100, comments: 198, shares: 76, thumbnailSeed: "texture5" },
  { id: 6, artistId: 6, artworkId: 601, videoUrl: ART_VIDEO_URLS[2], description: "資本主義の夢——誰もが幸せそうな顔して、誰も幸せじゃない。#satire #社会風刺 #art", price: "¥18,000", likes: 67300, comments: 2341, shares: 891, thumbnailSeed: "satire1" },
];

const ARTWORKS_LIST: Artwork[] = [
  { id: 101, artistId: 1, seed: "art1", title: "深夜の抽象", price: "¥12,000", priceNum: 12000, description: "深夜の静寂の中で生まれた作品。不眠の夜に浮かぶ感情を、暗色のアクリル絵具で表現しました。\n\nサイズ: F6号（410×318mm）\n素材: キャンバスにアクリル\n制作年: 2024", likes: 234, medium: "アクリル原画", size: "F6号", isOriginal: true },
  { id: 102, artistId: 1, seed: "art2", title: "光の記憶", price: "¥35,000", priceNum: 35000, description: "幼い頃の朝の光の記憶を題材にした作品。金と白を中心とした抽象表現。\n\nサイズ: F10号（530×455mm）\n素材: キャンバスにアクリル・金泥\n制作年: 2024", likes: 512, medium: "アクリル原画", size: "F10号", isOriginal: true },
  { id: 103, artistId: 1, seed: "art3", title: "夢の欠片", price: "¥8,500", priceNum: 8500, description: "夢の断片をコラージュ的に組み合わせた作品。小品ながら密度の高い仕上がり。\n\nサイズ: P3号（273×190mm）\n素材: ボードにアクリル\n制作年: 2023", likes: 89, medium: "アクリル原画", size: "P3号", isOriginal: true },
  { id: 104, artistId: 1, seed: "art4", title: "都市の詩", price: "¥22,000", priceNum: 22000, description: "東京の夜景から着想。無数の光を抽象的に再構成した作品。\n\nサイズ: F8号（455×380mm）\n素材: キャンバスにアクリル\n制作年: 2024", likes: 178, medium: "アクリル原画", size: "F8号", isOriginal: true },
  { id: 105, artistId: 1, seed: "art5", title: "静寂", price: "¥15,000", priceNum: 15000, description: "音のない世界を描いた作品。余白と色の対話。\n\nサイズ: F6号（410×318mm）\n素材: 和紙にアクリル\n制作年: 2023", likes: 345, medium: "アクリル原画", size: "F6号", isOriginal: true },
  { id: 106, artistId: 1, seed: "art6", title: "彼方の光", price: "¥45,000", priceNum: 45000, description: "遠い希望を描いた大作。金箔を部分的に使用した特別仕様。\n\nサイズ: F12号（606×500mm）\n素材: キャンバスにアクリル・24K金箔\n制作年: 2025", likes: 687, medium: "アクリル原画", size: "F12号", isOriginal: true },
  { id: 201, artistId: 2, seed: "land1", title: "夕暮れの丘", price: "¥35,000", priceNum: 35000, description: "京都郊外の夕暮れを油絵で描いた作品。暖色系の豊かな色彩が特徴。\n\nサイズ: F10号\n素材: キャンバスに油彩\n制作年: 2024", likes: 423, medium: "油彩原画", size: "F10号", isOriginal: true },
  { id: 202, artistId: 2, seed: "land2", title: "霧の朝", price: "¥28,000", priceNum: 28000, description: "晩秋の霧に包まれた朝の田園風景。静けさと神秘を表現。\n\nサイズ: F8号\n素材: キャンバスに油彩\n制作年: 2023", likes: 267, medium: "油彩原画", size: "F8号", isOriginal: true },
  { id: 203, artistId: 2, seed: "land3", title: "春の川辺", price: "¥42,000", priceNum: 42000, description: "春の川に桜の花びらが舞う情景。日本の美を油彩で。\n\nサイズ: F12号\n素材: キャンバスに油彩\n制作年: 2025", likes: 548, medium: "油彩原画", size: "F12号", isOriginal: true },
  { id: 204, artistId: 2, seed: "land4", title: "夏の終わり", price: "¥19,000", priceNum: 19000, description: "残夏の海辺を描いた作品。光と影の繊細な表現が見どころ。\n\nサイズ: F6号\n素材: キャンバスに油彩\n制作年: 2023", likes: 198, medium: "油彩原画", size: "F6号", isOriginal: true },
  { id: 301, artistId: 3, seed: "illust1", title: "森の精霊", price: "¥8,500", priceNum: 8500, description: "水彩で描いた幻想的な森の精霊。繊細な筆致が生み出す神秘の世界。\n\nサイズ: A4\n素材: 水彩紙に透明水彩\n制作年: 2024", likes: 312, medium: "水彩原画", size: "A4", isOriginal: true },
  { id: 302, artistId: 3, seed: "illust2", title: "月夜の旅人", price: "¥12,000", priceNum: 12000, description: "満月の夜を旅する人物を描いたイラスト。藍と白のコントラスト。\n\nサイズ: A3\n素材: 水彩紙に透明水彩\n制作年: 2024", likes: 456, medium: "水彩原画", size: "A3", isOriginal: true },
  { id: 303, artistId: 3, seed: "illust3", title: "花の海", price: "¥9,500", priceNum: 9500, description: "無数の花が海のように広がる幻想的な風景。パステルカラーが印象的。\n\nサイズ: A4\n素材: 水彩紙に透明水彩\n制作年: 2023", likes: 234, medium: "水彩原画", size: "A4", isOriginal: true },
  { id: 304, artistId: 3, seed: "illust4", title: "星降る夜", price: "¥15,000", priceNum: 15000, description: "星が降り注ぐ夜空を見上げる少女のイラスト。水彩の滲みが美しい。\n\nサイズ: A3\n素材: 水彩紙に透明水彩\n制作年: 2025", likes: 678, medium: "水彩原画", size: "A3", isOriginal: true },
  { id: 401, artistId: 4, seed: "cyber1", title: "Neo Tokyo 2099", price: "¥25,000", priceNum: 25000, description: "2099年の東京をテーマにしたデジタルアート。サイバーパンクの世界観を高精細で描写。\n\nサイズ: デジタルプリント A2\n限定: 20部（現在5部残）", likes: 1234, medium: "デジタルプリント", size: "A2", isOriginal: false },
  { id: 402, artistId: 4, seed: "cyber2", title: "Chrome Dreams", price: "¥18,000", priceNum: 18000, description: "クロームと光で構成された未来都市の夜景。\n\nサイズ: デジタルプリント A2\n限定: 20部（現在12部残）", likes: 892, medium: "デジタルプリント", size: "A2", isOriginal: false },
  { id: 403, artistId: 4, seed: "cyber3", title: "Digital Samurai", price: "¥32,000", priceNum: 32000, description: "デジタルと伝統が融合した戦士の肖像。限定10部のプリント作品。\n\nサイズ: デジタルプリント A1\n限定: 10部（現在2部残）", likes: 2341, medium: "デジタルプリント", size: "A1", isOriginal: false },
  { id: 404, artistId: 4, seed: "cyber4", title: "Neon Rain", price: "¥22,000", priceNum: 22000, description: "ネオンが反射する雨の夜を表現した作品。光と水のダンス。\n\nサイズ: デジタルプリント A2\n限定: 15部（現在8部残）", likes: 1567, medium: "デジタルプリント", size: "A2", isOriginal: false },
  { id: 405, artistId: 4, seed: "cyber5", title: "Memory Fragment", price: "¥15,000", priceNum: 15000, description: "記憶の断片をデジタルコラージュで表現。哲学的なテーマを持つ作品。\n\nサイズ: デジタルプリント A3\n限定: 30部（現在18部残）", likes: 743, medium: "デジタルプリント", size: "A3", isOriginal: false },
  { id: 501, artistId: 5, seed: "japan1", title: "金箔の波", price: "¥68,000", priceNum: 68000, description: "伝統的な日本画の技法を用いた波の作品。24金金箔を贅沢に使用。\n\nサイズ: 100×50cm\n素材: 和紙・岩絵具・24K金箔\n制作年: 2025", likes: 876, medium: "日本画原画", size: "100×50cm", isOriginal: true },
  { id: 502, artistId: 5, seed: "japan2", title: "梅と月", price: "¥45,000", priceNum: 45000, description: "梅の花と月を描いた掛軸作品。岩絵具と金泥を使用した正統派日本画。\n\nサイズ: 尺五立\n素材: 絹本・岩絵具・金泥\n制作年: 2024", likes: 543, medium: "日本画原画", size: "尺五立", isOriginal: true },
  { id: 503, artistId: 5, seed: "japan3", title: "紅葉", price: "¥38,000", priceNum: 38000, description: "秋の紅葉を丹念に描いた作品。繊細な筆致と鮮やかな朱色が特徴。\n\nサイズ: F8号\n素材: 麻紙・岩絵具\n制作年: 2023", likes: 412, medium: "日本画原画", size: "F8号", isOriginal: true },
  { id: 601, artistId: 6, seed: "satire1", title: "資本主義の夢", price: "¥18,000", priceNum: 18000, description: "笑顔で並ぶ群衆の影に映るのは、全員同じ顔。消費社会への皮肉を込めた作品。\n\nサイズ: B4\n素材: ペン・インク・水彩\n制作年: 2025", likes: 1823, medium: "風刺画", size: "B4", isOriginal: true },
  { id: 602, artistId: 6, seed: "satire2", title: "スマホ中毒", price: "¥12,000", priceNum: 12000, description: "画面を見つめる人々の首が、だんだん下を向いていく——現代病の解剖図。\n\nサイズ: A4\n素材: ペン・インク\n制作年: 2024", likes: 2567, medium: "風刺画", size: "A4", isOriginal: true },
  { id: 603, artistId: 6, seed: "satire3", title: "選挙のカーニバル", price: "¥25,000", priceNum: 25000, description: "仮面をつけた政治家たちの祭り。笑いと批評が交差する大作。\n\nサイズ: F10号\n素材: ペン・水彩・アクリル\n制作年: 2025", likes: 3412, medium: "風刺画", size: "F10号", isOriginal: true },
  { id: 604, artistId: 6, seed: "satire4", title: "SNSの王様", price: "¥9,500", priceNum: 9500, description: "「いいね」を集めるために生きる王様の肖像。虚栄と孤独の二重奏。\n\nサイズ: A4\n素材: ペン・インク\n制作年: 2024", likes: 4891, medium: "風刺画", size: "A4", isOriginal: true },
];

export type ExhibitionAd = {
  id: string;
  type: "個展" | "グループ展" | "アートフェア";
  title: string;
  subtitle: string;
  venue: string;
  area: string;
  dates: string;
  artistName: string;
  artistHandle: string;
  avatarSeed: string;
  bgSeed: string;
};

export const EXHIBITION_ADS: ExhibitionAd[] = [
  {
    id: "ad1",
    type: "個展",
    title: "深夜の抽象",
    subtitle: "Yuki Tanaka Solo Exhibition",
    venue: "Gallery NOA",
    area: "渋谷区神南",
    dates: "2026.03.20 — 04.05",
    artistName: "Yuki Tanaka",
    artistHandle: "@yuki.art",
    avatarSeed: "face1",
    bgSeed: "art1",
  },
  {
    id: "ad2",
    type: "グループ展",
    title: "NEW WAVE 2026",
    subtitle: "現代アーティスト6名による合同展",
    venue: "SOGO ART SPACE",
    area: "六本木",
    dates: "2026.04.01 — 04.20",
    artistName: "Saki Mori 他5名",
    artistHandle: "@saki_illustration",
    avatarSeed: "face3",
    bgSeed: "illust2",
  },
  {
    id: "ad3",
    type: "アートフェア",
    title: "TOKYO ART FAIR",
    subtitle: "国内外100ギャラリー参加",
    venue: "東京ビッグサイト",
    area: "有明",
    dates: "2026.04.10 — 04.13",
    artistName: "Ren Yamamoto 他",
    artistHandle: "@ren_digital",
    avatarSeed: "face4",
    bgSeed: "cyber1",
  },
  {
    id: "ad4",
    type: "個展",
    title: "金箔の宇宙",
    subtitle: "Mei Suzuki — 日本画新作展",
    venue: "京都 蒼天画廊",
    area: "京都・烏丸",
    dates: "2026.03.28 — 04.10",
    artistName: "Mei Suzuki",
    artistHandle: "@mei_fineart",
    avatarSeed: "face5",
    bgSeed: "japan1",
  },
];

export const ARTWORKS_BY_ARTIST: Record<number, Artwork[]> = {};
export const ARTWORK_MAP: Record<number, Artwork> = {};

for (const a of ARTWORKS_LIST) {
  if (!ARTWORKS_BY_ARTIST[a.artistId]) ARTWORKS_BY_ARTIST[a.artistId] = [];
  ARTWORKS_BY_ARTIST[a.artistId].push(a);
  ARTWORK_MAP[a.id] = a;
}

export const VIDEOS_BY_ARTIST: Record<number, VideoThumb[]> = {
  1: [
    { id: 1, seed: "picasso1", views: "12.4K", description: "深夜に描いた抽象画。眠れない夜の感情を色にした。#abstractart #insomnia", artworkId: 101 },
    { id: 2, seed: "nature10", views: "8.2K", description: "春の光をアクリルで表現。色と色の境界線が好き。", artworkId: 102 },
    { id: 3, seed: "abstract11", views: "24.1K", description: "新作完成。タイトルは「彼方」。見る角度で色が変わる。", artworkId: 106 },
    { id: 4, seed: "city4", views: "5.6K", description: "都市の喧騒を抽象化した小品。深夜3時の作業。", artworkId: 104 },
    { id: 5, seed: "texture5", views: "31.8K", description: "テクスチャーの実験。岩絵具と金箔の組み合わせ。", artworkId: 105 },
    { id: 6, seed: "landscape2", views: "9.3K", description: "最近気に入っているブルーの色調。空と海の狭間。", artworkId: 103 },
    { id: 7, seed: "nature3", views: "15.7K", description: "自然から着想。葉脈の構造を抽象化した作品。" },
    { id: 8, seed: "art20", views: "3.2K", description: "制作過程を記録。下地の塗り重ねが面白い段階。" },
    { id: 9, seed: "abstract21", views: "18.9K", description: "完成しました。一番好きな作品になったかも。" },
  ],
  2: [
    { id: 10, seed: "land1", views: "7.8K", description: "京都の夕暮れ。この光は油絵でしか表現できない。", artworkId: 201 },
    { id: 11, seed: "land2", views: "15.2K", description: "霧の中の田園。朝5時から描き始めた。#oilpainting", artworkId: 202 },
    { id: 12, seed: "land3", views: "5.1K", description: "桜の季節に描いた川辺。透明感を出すのに苦労した。", artworkId: 203 },
    { id: 13, seed: "land4", views: "22.4K", description: "夏の終わりの浜辺。光と影のコントラストが全て。", artworkId: 204 },
    { id: 14, seed: "nature10", views: "11.7K", description: "植物のスケッチから大作へ。制作過程の記録。" },
    { id: 15, seed: "nature3", views: "8.9K", description: "森の中の光。緑色が100種類以上ある気がする。" },
  ],
  3: [
    { id: 16, seed: "illust1", views: "18.3K", description: "森の精霊シリーズ新作。水彩の滲みが偶然の産物。", artworkId: 301 },
    { id: 17, seed: "illust2", views: "42.1K", description: "月夜の旅人。藍色と白だけで描いた一枚。#watercolor", artworkId: 302 },
    { id: 18, seed: "illust3", views: "9.7K", description: "花の海シリーズ。パステルカラーの海に溺れたい。", artworkId: 303 },
    { id: 19, seed: "illust4", views: "28.5K", description: "星降る夜、完成。3ヶ月かかった大作です。", artworkId: 304 },
    { id: 20, seed: "nature3", views: "14.2K", description: "自然観察スケッチ。これが全ての基礎になる。" },
    { id: 21, seed: "picasso1", views: "6.8K", description: "色の実験。水彩と墨の組み合わせを試している。" },
    { id: 22, seed: "art1", views: "19.4K", description: "新シリーズ開始。テーマは「夢と現実の境界」。" },
    { id: 23, seed: "art2", views: "11.1K", description: "制作中。完成はいつになることやら…笑" },
  ],
  4: [
    { id: 24, seed: "cyber1", views: "65.2K", description: "Neo Tokyo 2099 完成。過去最高傑作かもしれない。#cyberpunk", artworkId: 401 },
    { id: 25, seed: "cyber2", views: "48.7K", description: "クロームと光の実験。Blenderで500時間かけた。", artworkId: 402 },
    { id: 26, seed: "cyber3", views: "31.4K", description: "Digital Samurai 制作過程。限定10部のみ。", artworkId: 403 },
    { id: 27, seed: "cyber4", views: "55.9K", description: "ネオンレイン完成。雨の反射表現に命かけてる。", artworkId: 404 },
    { id: 28, seed: "cyber5", views: "22.8K", description: "記憶の断片シリーズ。哲学的なテーマを視覚化する。", artworkId: 405 },
    { id: 29, seed: "city4", views: "71.3K", description: "未来の東京を想像する。100年後はどんな景色だろう。" },
    { id: 30, seed: "art4", views: "29.6K", description: "新作ティーザー。来月公開予定。乞うご期待。" },
  ],
  5: [
    { id: 31, seed: "japan1", views: "8.4K", description: "金箔の波、制作中。一枚ずつ貼る作業が瞑想になる。", artworkId: 501 },
    { id: 32, seed: "japan2", views: "12.7K", description: "梅と月。絹本に岩絵具で描く伝統技法。#nihonga", artworkId: 502 },
    { id: 33, seed: "japan3", views: "5.9K", description: "紅葉シリーズ。朱色の表現に岩絵具は最高。", artworkId: 503 },
    { id: 34, seed: "texture5", views: "18.2K", description: "素材の研究。様々な和紙の質感を試している。" },
    { id: 35, seed: "art6", views: "7.3K", description: "師から受け継いだ技法。現代に伝えていきたい。" },
  ],
  6: [
    { id: 36, seed: "satire1", views: "89.2K", description: "資本主義の夢。描いてて自分が嫌になってくる笑 #風刺 #satire", artworkId: 601 },
    { id: 37, seed: "satire2", views: "124.5K", description: "スマホ中毒シリーズ。自分も描きながらスマホ見てた。#社会風刺", artworkId: 602 },
    { id: 38, seed: "satire3", views: "67.8K", description: "選挙のカーニバル制作中。どこの国の話でしょうか。#政治風刺", artworkId: 603 },
    { id: 39, seed: "satire4", views: "203.1K", description: "SNSの王様完成。バズったら皮肉だな。#irony #art", artworkId: 604 },
    { id: 40, seed: "picasso1", views: "45.6K", description: "次回作のスケッチ。社会の歪みを線一本で表現したい。" },
  ],
};
