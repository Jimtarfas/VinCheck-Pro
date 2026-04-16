export interface MakeInfo {
  slug: string;
  name: string;
  country: string;
  description: string;
  vinPrefix: string;
  founded: string;
  popular: string[];
}

export const makes: MakeInfo[] = [
  { slug: "toyota", name: "Toyota", country: "Japan", description: "the world's largest automaker by sales volume", vinPrefix: "JT", founded: "1937", popular: ["Camry", "RAV4", "Corolla", "Highlander", "Tacoma"] },
  { slug: "ford", name: "Ford", country: "USA", description: "America's iconic automaker and inventor of the assembly line", vinPrefix: "1F", founded: "1903", popular: ["F-150", "Mustang", "Explorer", "Bronco", "Escape"] },
  { slug: "chevrolet", name: "Chevrolet", country: "USA", description: "one of America's most popular vehicle brands under General Motors", vinPrefix: "1G", founded: "1911", popular: ["Silverado", "Equinox", "Tahoe", "Traverse", "Camaro"] },
  { slug: "honda", name: "Honda", country: "Japan", description: "renowned for reliability and fuel efficiency", vinPrefix: "1H", founded: "1948", popular: ["Civic", "CR-V", "Accord", "Pilot", "HR-V"] },
  { slug: "nissan", name: "Nissan", country: "Japan", description: "a leading Japanese automaker known for innovation", vinPrefix: "1N", founded: "1933", popular: ["Altima", "Rogue", "Sentra", "Pathfinder", "Frontier"] },
  { slug: "hyundai", name: "Hyundai", country: "South Korea", description: "South Korea's largest automaker with award-winning vehicles", vinPrefix: "5N", founded: "1967", popular: ["Tucson", "Elantra", "Santa Fe", "Sonata", "Palisade"] },
  { slug: "kia", name: "Kia", country: "South Korea", description: "a fast-growing Korean brand known for value and design", vinPrefix: "5X", founded: "1944", popular: ["Sportage", "Forte", "Telluride", "Seltos", "K5"] },
  { slug: "bmw", name: "BMW", country: "Germany", description: "the Ultimate Driving Machine and luxury performance leader", vinPrefix: "WB", founded: "1916", popular: ["3 Series", "X3", "X5", "5 Series", "X1"] },
  { slug: "mercedes-benz", name: "Mercedes-Benz", country: "Germany", description: "the inventor of the automobile and global luxury leader", vinPrefix: "WD", founded: "1926", popular: ["C-Class", "GLE", "GLC", "E-Class", "A-Class"] },
  { slug: "audi", name: "Audi", country: "Germany", description: "a premium German brand known for Quattro all-wheel drive", vinPrefix: "WA", founded: "1909", popular: ["A4", "Q5", "Q7", "A6", "Q3"] },
  { slug: "volkswagen", name: "Volkswagen", country: "Germany", description: "the people's car company and Europe's largest automaker", vinPrefix: "WV", founded: "1937", popular: ["Jetta", "Tiguan", "Atlas", "Taos", "ID.4"] },
  { slug: "subaru", name: "Subaru", country: "Japan", description: "known for symmetrical AWD and boxer engines", vinPrefix: "JF", founded: "1953", popular: ["Outback", "Forester", "Crosstrek", "Impreza", "WRX"] },
  { slug: "mazda", name: "Mazda", country: "Japan", description: "the zoom-zoom brand focused on driving pleasure", vinPrefix: "JM", founded: "1920", popular: ["CX-5", "Mazda3", "CX-50", "CX-9", "MX-5 Miata"] },
  { slug: "jeep", name: "Jeep", country: "USA", description: "the legendary off-road brand and SUV pioneer", vinPrefix: "1C4", founded: "1941", popular: ["Grand Cherokee", "Wrangler", "Cherokee", "Compass", "Gladiator"] },
  { slug: "ram", name: "Ram", country: "USA", description: "America's premium truck brand", vinPrefix: "1C6", founded: "2010", popular: ["1500", "2500", "3500", "ProMaster"] },
  { slug: "gmc", name: "GMC", country: "USA", description: "General Motors' professional-grade truck and SUV brand", vinPrefix: "1GT", founded: "1911", popular: ["Sierra", "Terrain", "Acadia", "Yukon", "Canyon"] },
  { slug: "dodge", name: "Dodge", country: "USA", description: "known for muscle cars and performance vehicles", vinPrefix: "2C3", founded: "1900", popular: ["Charger", "Challenger", "Durango", "Hornet"] },
  { slug: "lexus", name: "Lexus", country: "Japan", description: "Toyota's luxury division and top-rated premium brand", vinPrefix: "JT", founded: "1989", popular: ["RX", "ES", "NX", "IS", "GX"] },
  { slug: "acura", name: "Acura", country: "Japan", description: "Honda's luxury and performance division", vinPrefix: "19U", founded: "1986", popular: ["MDX", "RDX", "TLX", "Integra"] },
  { slug: "infiniti", name: "Infiniti", country: "Japan", description: "Nissan's luxury vehicle division", vinPrefix: "JN", founded: "1989", popular: ["QX60", "QX50", "QX80", "Q50"] },
  { slug: "tesla", name: "Tesla", country: "USA", description: "the electric vehicle pioneer and market leader", vinPrefix: "5YJ", founded: "2003", popular: ["Model Y", "Model 3", "Model X", "Model S", "Cybertruck"] },
  { slug: "volvo", name: "Volvo", country: "Sweden", description: "the Swedish brand synonymous with safety", vinPrefix: "YV", founded: "1927", popular: ["XC90", "XC60", "XC40", "S60", "V60"] },
  { slug: "porsche", name: "Porsche", country: "Germany", description: "the iconic sports car manufacturer", vinPrefix: "WP", founded: "1931", popular: ["Cayenne", "Macan", "911", "Taycan", "Panamera"] },
  { slug: "cadillac", name: "Cadillac", country: "USA", description: "America's iconic luxury brand", vinPrefix: "1G6", founded: "1902", popular: ["Escalade", "XT5", "CT5", "XT4", "Lyriq"] },
  { slug: "buick", name: "Buick", country: "USA", description: "GM's premium mainstream brand", vinPrefix: "1G4", founded: "1903", popular: ["Encore GX", "Enclave", "Envision"] },
  { slug: "chrysler", name: "Chrysler", country: "USA", description: "an American automotive icon", vinPrefix: "2C3", founded: "1925", popular: ["Pacifica", "300"] },
  { slug: "lincoln", name: "Lincoln", country: "USA", description: "Ford's luxury vehicle division", vinPrefix: "5LM", founded: "1917", popular: ["Navigator", "Corsair", "Aviator", "Nautilus"] },
  { slug: "genesis", name: "Genesis", country: "South Korea", description: "Hyundai's award-winning luxury brand", vinPrefix: "KM", founded: "2015", popular: ["GV70", "G70", "GV80", "G80", "G90"] },
  { slug: "land-rover", name: "Land Rover", country: "UK", description: "the world's premier luxury SUV brand", vinPrefix: "SAL", founded: "1948", popular: ["Range Rover", "Defender", "Discovery", "Range Rover Sport"] },
  { slug: "jaguar", name: "Jaguar", country: "UK", description: "the British luxury performance brand", vinPrefix: "SAJ", founded: "1922", popular: ["F-PACE", "E-PACE", "F-TYPE", "XF"] },
  { slug: "mini", name: "MINI", country: "UK", description: "the iconic small car brand owned by BMW", vinPrefix: "WM", founded: "1959", popular: ["Cooper", "Countryman", "Clubman"] },
  { slug: "mitsubishi", name: "Mitsubishi", country: "Japan", description: "a Japanese brand known for durable SUVs", vinPrefix: "JA", founded: "1970", popular: ["Outlander", "Eclipse Cross", "Mirage"] },
  { slug: "alfa-romeo", name: "Alfa Romeo", country: "Italy", description: "the Italian brand known for passionate driving", vinPrefix: "ZAR", founded: "1910", popular: ["Giulia", "Stelvio", "Tonale"] },
];

export function getMakeBySlug(slug: string): MakeInfo | undefined {
  return makes.find((m) => m.slug === slug);
}
