// Helper to generate a random coordinate near a center point
const generateRandomPoint = (center, radiusInDegrees) => {
  const r = radiusInDegrees * Math.sqrt(Math.random());
  const theta = Math.random() * 2 * Math.PI;
  return [
    center[0] + r * Math.cos(theta),
    center[1] + r * Math.sin(theta)
  ];
};

const JAKARTA_CENTER = [-6.2088, 106.8456]; // Central Jakarta
const RADIUS = 0.08; // Roughly 8-10km

const DUMMY_LOCATIONS = Array.from({ length: 30 }).map((_, i) => {
  const position = generateRandomPoint(JAKARTA_CENTER, RADIUS);
  return {
    id: i + 1,
    name: `Koda Coffee - Store ${i + 1}`,
    address: `Jl. Jend. Sudirman No.${Math.floor(Math.random() * 100) + 1}, Jakarta Selatan`,
    position: position,
  };
});

// Adding some real-sounding names for better feel
const CUSTOM_NAMES = [
  "Koda Coffee - Kemang",
  "Koda Coffee - Senopati",
  "Koda Coffee - SCBD",
  "Koda Coffee - Menteng",
  "Koda Coffee - PIK",
  "Koda Coffee - Kelapa Gading",
  "Koda Coffee - Pondok Indah",
  "Koda Coffee - Bintaro",
  "Koda Coffee - Tebet",
  "Koda Coffee - Kuningan",
];

export const locations = DUMMY_LOCATIONS.map((loc, i) => ({
  ...loc,
  name: i < CUSTOM_NAMES.length ? CUSTOM_NAMES[i] : loc.name,
}));
