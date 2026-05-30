export interface MakeInfo {
  slug: string;
  name: string;
  country: string;
  description: string;
  vinPrefix: string;
  founded: string;
  popular: string[];
  /** Brand-specific VIN / WMI structure detail buyers can verify themselves. */
  vinNote: string;
  /** Well-documented model issues worth confirming through history + recall data. */
  commonIssues: string;
  /** Notable recall history for the brand. */
  recallContext: string;
  /** One practical, brand-specific tip for buying this make used. */
  buyingTip: string;
}

export const makes: MakeInfo[] = [
  {
    slug: "toyota", name: "Toyota", country: "Japan", description: "the world's largest automaker by sales volume", vinPrefix: "JT", founded: "1937", popular: ["Camry", "RAV4", "Corolla", "Highlander", "Tacoma"],
    vinNote: "Japan-built Toyotas begin with \"JT\", but many top sellers are assembled in North America — US-built Camrys and Tundras start with \"4T\" or \"5T\", and Canadian-built RAV4s with \"2T\". The 10th character encodes the model year.",
    commonIssues: "Some 2007–2011 four-cylinder models with the 2AZ-FE engine are known for excess oil consumption, and early Tacoma/Tundra frames in salt-belt states had rust-perforation issues. A VIN history can flag accident, flood, or frame-repair records before purchase.",
    recallContext: "Millions of Toyotas were covered by the Takata airbag inflator recall (2002–2015 model years) and the 2009–2011 unintended-acceleration floor-mat/pedal campaigns. Always confirm open recalls by VIN.",
    buyingTip: "Toyota's strong resale value makes them a frequent target for title washing and odometer rollback. Verify the mileage trail and title brand history on any Camry, Corolla, or Tacoma before paying a premium.",
  },
  {
    slug: "ford", name: "Ford", country: "USA", description: "America's iconic automaker and inventor of the assembly line", vinPrefix: "1F", founded: "1903", popular: ["F-150", "Mustang", "Explorer", "Bronco", "Escape"],
    vinNote: "Ford WMIs start with \"1F\" (US passenger), \"1FT/1FD\" (US trucks), \"2F\" (Canada) or \"3F\" (Mexico). On the F-150 the VIN also encodes cab style and bed length, so you can confirm a listing matches the actual truck.",
    commonIssues: "2011–2016 Fiesta and Focus models with the PowerShift dual-clutch automatic were the subject of a class-action over shuddering and premature failure. Some 1.6L EcoBoost engines had coolant-intrusion concerns. History data helps confirm transmission or engine replacements.",
    recallContext: "Ford vehicles were heavily affected by the Takata airbag recall, and Explorers from 2011–2017 saw exhaust-odor campaigns. F-Series trucks are among the most stolen vehicles in the US, so cloning is a real fraud vector.",
    buyingTip: "Because the F-150 is the most-stolen and most-cloned vehicle in America, match the dashboard VIN to the door-jamb sticker and the title — a mismatch is a red flag for a cloned or stolen truck.",
  },
  {
    slug: "chevrolet", name: "Chevrolet", country: "USA", description: "one of America's most popular vehicle brands under General Motors", vinPrefix: "1G", founded: "1911", popular: ["Silverado", "Equinox", "Tahoe", "Traverse", "Camaro"],
    vinNote: "Chevrolet shares GM's \"1G\" / \"1GC\" (US trucks) / \"2G\" (Canada) / \"3G\" (Mexico) WMIs. The VIN identifies the engine family — useful for confirming whether a Silverado has the 5.3L or 6.2L V8.",
    commonIssues: "Some 2010–2017 Equinox models with the 2.4L engine were known for high oil consumption, and 2014–2018 Silverado/Tahoe 5.3L engines had AFM lifter concerns. A history report can surface engine repairs or replacements.",
    recallContext: "GM's 2014 ignition-switch recall covered millions of compact models (Cobalt, HHR, Ion) for a defect linked to stalling and airbag non-deployment. Takata airbag campaigns also apply to many model years.",
    buyingTip: "On high-mileage Silverado and Tahoe trucks, use the history report to check for prior commercial or fleet use and tow-related wear, which heavily affects drivetrain longevity.",
  },
  {
    slug: "honda", name: "Honda", country: "Japan", description: "renowned for reliability and fuel efficiency", vinPrefix: "1H", founded: "1948", popular: ["Civic", "CR-V", "Accord", "Pilot", "HR-V"],
    vinNote: "US-built Accords and Odysseys begin with \"1HG\" or \"5FN\", while Japan-built models use \"JHM\". The VIN's 4th–8th characters decode trim, engine, and body, so you can confirm an EX-L really is an EX-L.",
    commonIssues: "2003–2007 Accord/Odyssey/Pilot V6 automatics were prone to failure (extended warranty applied at the time), and some 1.5L turbo CR-V/Civic engines had fuel-dilution complaints in cold climates. History data flags transmission replacements.",
    recallContext: "Honda was the manufacturer hardest hit by the Takata airbag crisis — certain older Civics and Accords carry \"Alpha\" inflators rated extremely dangerous. Confirming the airbag recall is closed by VIN is essential.",
    buyingTip: "Civics and CR-Vs are among the most-stolen vehicles in the US. Verify the title isn't salvage or rebuilt, and that the VIN plate shows no signs of tampering, before buying.",
  },
  {
    slug: "nissan", name: "Nissan", country: "Japan", description: "a leading Japanese automaker known for innovation", vinPrefix: "1N", founded: "1933", popular: ["Altima", "Rogue", "Sentra", "Pathfinder", "Frontier"],
    vinNote: "US-built Nissans (Altima, Rogue, Frontier) start with \"1N4\" / \"1N6\", while Japan-built models use \"JN\". The VIN encodes the engine and whether the car has the CVT or a conventional automatic.",
    commonIssues: "Many 2013-onward Altima, Sentra, Rogue, and Pathfinder models use Nissan's Xtronic CVT, which has been the subject of multiple lawsuits over overheating and premature failure. A history report can reveal prior CVT replacement.",
    recallContext: "Nissan models were included in the Takata airbag recall, and several years had separate campaigns for hood-latch and braking issues. Verify recall status by VIN.",
    buyingTip: "On any CVT-equipped Nissan, prioritise a VIN history showing documented transmission service — and budget for the fact that a CVT replacement can approach the value of an older car.",
  },
  {
    slug: "hyundai", name: "Hyundai", country: "South Korea", description: "South Korea's largest automaker with award-winning vehicles", vinPrefix: "5N", founded: "1967", popular: ["Tucson", "Elantra", "Santa Fe", "Sonata", "Palisade"],
    vinNote: "US-built Hyundais (Sonata, Santa Fe, some Elantras) begin with \"5NP\" / \"5NM\", while Korea-built models use \"KM\". The VIN confirms engine family — important given the Theta II engine history below.",
    commonIssues: "Certain 2011–2019 Sonata and Santa Fe models with the 2.0L/2.4L Theta II engine were recalled for bearing failure that could cause stalling or engine fires. A history report and recall check by VIN are critical here.",
    recallContext: "Beyond the Theta II engine recalls, many 2011–2022 Hyundais built without an engine immobilizer became high-theft targets in the viral \"Kia Boys\" trend, prompting a free anti-theft software update.",
    buyingTip: "Confirm both the Theta II engine recall AND the anti-theft software update are completed by VIN — and check whether the car qualifies for Hyundai's extended powertrain coverage.",
  },
  {
    slug: "kia", name: "Kia", country: "South Korea", description: "a fast-growing Korean brand known for value and design", vinPrefix: "5X", founded: "1944", popular: ["Sportage", "Forte", "Telluride", "Seltos", "K5"],
    vinNote: "US-built Kias (some Sportage, Telluride, Sorento) begin with \"5XY\", while Korea-built models use \"KN\". The 10th character gives model year — useful for separating affected and unaffected engine years.",
    commonIssues: "Like Hyundai, certain Kia models with the 2.0L/2.4L Theta II engine (e.g. 2011–2019 Optima, Sorento, Sportage) were recalled for bearing failure and fire risk. Verify engine recall completion by VIN.",
    recallContext: "Many 2011–2021 Kias built without an engine immobilizer were targeted in the \"Kia Boys\" theft trend; Kia issued a free anti-theft software update and steering-lock remedy.",
    buyingTip: "Check that both the engine recall and the anti-theft update are closed by VIN, and confirm whether the previous owner installed the wheel/steering-lock remedy on theft-prone models.",
  },
  {
    slug: "bmw", name: "BMW", country: "Germany", description: "the Ultimate Driving Machine and luxury performance leader", vinPrefix: "WB", founded: "1916", popular: ["3 Series", "X3", "X5", "5 Series", "X1"],
    vinNote: "German-built BMWs begin with \"WBA\" (passenger) or \"WBS\" (M models); US-built X3/X5/X7 from Spartanburg start with \"5UX\". The VIN decodes engine code, which matters for the known issues below.",
    commonIssues: "Some N20/N26 four-cylinder engines (2012–2016) had timing-chain wear, and N63 V8s were known for high oil consumption. Cooling-system and VANOS components are common high-mileage repairs. A service history is invaluable.",
    recallContext: "BMW was part of the Takata airbag recall and issued several campaigns for blower-motor and EGR-related fire risks on certain diesels. Confirm recall status by VIN.",
    buyingTip: "BMW ownership cost lives or dies on service history. Use the VIN report to confirm regular maintenance and look for the timing-chain and cooling-system work that older models typically need.",
  },
  {
    slug: "mercedes-benz", name: "Mercedes-Benz", country: "Germany", description: "the inventor of the automobile and global luxury leader", vinPrefix: "WD", founded: "1926", popular: ["C-Class", "GLE", "GLC", "E-Class", "A-Class"],
    vinNote: "German-built models begin with \"WDD\" / \"WDC\", while US-built GLE/GLS from Alabama use \"4JG\". The VIN identifies the engine and whether the car is 4MATIC all-wheel drive.",
    commonIssues: "Some 2003–2009 models had rust concerns from earlier water-based paint processes, and certain 7G-Tronic transmissions and air-suspension (Airmatic) systems are costly high-mileage repairs. A history report flags major work.",
    recallContext: "Mercedes-Benz vehicles were included in the Takata airbag recall and issued separate campaigns for steering and emissions-related software. Verify open recalls by VIN.",
    buyingTip: "On any model with Airmatic air suspension, factor in eventual strut replacement, and use the history report to confirm the car wasn't a flood or accident write-off — common on depreciated luxury cars.",
  },
  {
    slug: "audi", name: "Audi", country: "Germany", description: "a premium German brand known for Quattro all-wheel drive", vinPrefix: "WA", founded: "1909", popular: ["A4", "Q5", "Q7", "A6", "Q3"],
    vinNote: "Audi WMIs begin with \"WAU\" (Germany) or \"WA1\" (SUVs); some models share VW Group plants. The VIN confirms engine code and whether the car is genuine Quattro all-wheel drive.",
    commonIssues: "2009–2011 2.0T (EA888 Gen 2) engines were notorious for excessive oil consumption and timing-chain tensioner failure. Carbon buildup on direct-injection engines is also common. Service history is key.",
    recallContext: "Audi diesels (TDI) were part of the VW Group emissions scandal, and gasoline models were included in Takata airbag campaigns. Confirm the emissions remedy and any open recalls by VIN.",
    buyingTip: "For 2009–2011 2.0T models, ask for evidence the oil-consumption fix or piston-ring service was performed, and verify it on the history report before buying.",
  },
  {
    slug: "volkswagen", name: "Volkswagen", country: "Germany", description: "the people's car company and Europe's largest automaker", vinPrefix: "WV", founded: "1937", popular: ["Jetta", "Tiguan", "Atlas", "Taos", "ID.4"],
    vinNote: "German-built VWs begin with \"WVW\" / \"WV1\"; Mexico-built Jettas/Tiguans use \"3VW\", and US-built Atlas/Passat use \"1VW\". The VIN decodes the engine — relevant to the Dieselgate history below.",
    commonIssues: "Some 1.8T/2.0T engines had timing-chain tensioner and carbon-buildup issues, and the DSG dual-clutch transmission needs scheduled fluid service. A history report helps confirm these were maintained.",
    recallContext: "2009–2015 TDI diesel models were at the centre of the \"Dieselgate\" emissions scandal; affected cars received an emissions modification or buyback. Always confirm the fix status by VIN on a used TDI.",
    buyingTip: "If you're looking at a TDI diesel, verify the emissions recall was completed and whether the car was part of the buyback program — un-fixed cars can have registration complications.",
  },
  {
    slug: "subaru", name: "Subaru", country: "Japan", description: "known for symmetrical AWD and boxer engines", vinPrefix: "JF", founded: "1953", popular: ["Outback", "Forester", "Crosstrek", "Impreza", "WRX"],
    vinNote: "Japan-built Subarus begin with \"JF1\" / \"JF2\", while US-built Outback, Legacy, Ascent, and Impreza from Indiana use \"4S\". The VIN confirms the boxer engine and whether the car has the CVT.",
    commonIssues: "2011–2014 models with the FB25 engine were the subject of an oil-consumption class action, and earlier 2.5L engines (EJ25) were known for head-gasket failure. A history report can reveal engine or head-gasket repairs.",
    recallContext: "Subaru issued Takata airbag recalls and several campaigns for fuel-pump and brake-related defects. Confirm open recalls by VIN, especially on the high-volume Outback and Forester.",
    buyingTip: "On older 2.5L models, ask specifically about head-gasket history, and on 2011–2014 cars confirm the oil-consumption remedy — both materially affect the value of a used Subaru.",
  },
  {
    slug: "mazda", name: "Mazda", country: "Japan", description: "the zoom-zoom brand focused on driving pleasure", vinPrefix: "JM", founded: "1920", popular: ["CX-5", "Mazda3", "CX-50", "CX-9", "MX-5 Miata"],
    vinNote: "Japan-built Mazdas begin with \"JM1\" (passenger) or \"JM3\" (SUVs); some US-market models built in Mexico or the US use \"3MZ\" or \"MM\". The VIN decodes the SkyActiv engine variant.",
    commonIssues: "Mazda's modern SkyActiv lineup is generally reliable, but older models (pre-2014) and the RX-8 rotary had documented rust and engine-wear concerns. A history report flags accident or flood damage that affects these unibody cars.",
    recallContext: "Mazda was part of the Takata airbag recall (Takata was a major supplier to Mazda) and issued campaigns for corrosion and fuel-system parts. Verify recall completion by VIN.",
    buyingTip: "Mazdas hold up well mechanically, so focus the history check on accident and flood records and on confirming the Takata airbag recall is closed.",
  },
  {
    slug: "jeep", name: "Jeep", country: "USA", description: "the legendary off-road brand and SUV pioneer", vinPrefix: "1C4", founded: "1941", popular: ["Grand Cherokee", "Wrangler", "Cherokee", "Compass", "Gladiator"],
    vinNote: "Jeep WMIs begin with \"1C4\" / \"1J4\" (US) or \"3C4\" (Mexico). The VIN decodes the model and engine, helping confirm whether a Grand Cherokee has the V6, V8, or EcoDiesel.",
    commonIssues: "Solid-axle Wranglers and Grand Cherokees can develop the front-end \"death wobble,\" and 2.4L Tigershark engines (Cherokee/Compass) had oil-consumption complaints. Off-road use also accelerates drivetrain wear — history data helps.",
    recallContext: "Certain 2014–2019 Grand Cherokee/Durango models had electronic shifter and stalling recalls, and many years were part of the Takata campaign. Confirm open recalls by VIN.",
    buyingTip: "Because Jeeps are bought to be driven off-road, use the history report to look for accident, flood (water-fording damage), and frame-repair records that casual inspection can miss.",
  },
  {
    slug: "ram", name: "Ram", country: "USA", description: "America's premium truck brand", vinPrefix: "1C6", founded: "2010", popular: ["1500", "2500", "3500", "ProMaster"],
    vinNote: "Ram trucks begin with \"1C6\" (US) or \"3C6\" (Mexico). The VIN encodes cab configuration, bed length, and engine — useful for confirming whether a 1500 has the Hemi V8 or the EcoDiesel.",
    commonIssues: "EcoDiesel V6 models (2014–2019) had emissions-system and EGR-cooler concerns, and heavy-duty 2500/3500 trucks used for towing show drivetrain and suspension wear. A history report reveals commercial or fleet use.",
    recallContext: "Ram trucks were part of the Takata airbag recall and had separate campaigns for tie-rod and electrical issues. Verify recall status by VIN.",
    buyingTip: "Trucks are work vehicles — use the VIN report to check for prior commercial registration, accident history, and tow-related abuse before buying a used 1500 or 2500.",
  },
  {
    slug: "gmc", name: "GMC", country: "USA", description: "General Motors' professional-grade truck and SUV brand", vinPrefix: "1GT", founded: "1911", popular: ["Sierra", "Terrain", "Acadia", "Yukon", "Canyon"],
    vinNote: "GMC trucks begin with \"1GT\" (US) or \"3GT\" (Mexico); the Terrain and Acadia share GM passenger WMIs. The VIN identifies the engine — helpful for distinguishing Sierra 5.3L and 6.2L V8 trucks.",
    commonIssues: "GMC shares GM mechanicals: 5.3L AFM lifter concerns on 2014–2018 Sierra/Yukon, and 2.4L oil consumption on early Terrain. A history report can confirm engine repairs and prior fleet use.",
    recallContext: "GMC vehicles were covered by GM's broad Takata airbag campaigns and shared truck recalls for power-steering and electrical issues. Confirm open recalls by VIN.",
    buyingTip: "Sierra and Yukon trucks are popular fleet and tow vehicles — check the history report for commercial use and tow wear, which affect transmission and rear-end longevity.",
  },
  {
    slug: "dodge", name: "Dodge", country: "USA", description: "known for muscle cars and performance vehicles", vinPrefix: "2C3", founded: "1900", popular: ["Charger", "Challenger", "Durango", "Hornet"],
    vinNote: "Dodge WMIs begin with \"2C3\" / \"1C3\" (US/Canada). The VIN decodes the engine, which matters greatly on Charger/Challenger — distinguishing V6, 5.7L, 6.4L, and supercharged Hellcat models.",
    commonIssues: "High-performance Charger and Challenger models are frequently driven hard, so check for accident and drivetrain history. Some 5.7L Hemi engines develop the well-known lifter \"tick.\" A history report flags abuse and repairs.",
    recallContext: "Dodge vehicles were part of the Takata airbag recall and had campaigns for electronic shifter and alternator issues. Verify recall completion by VIN.",
    buyingTip: "Muscle cars are theft and abuse magnets — match the VIN across dash, door, and title to rule out cloning, and use the history report to detect hidden accident or track damage.",
  },
  {
    slug: "lexus", name: "Lexus", country: "Japan", description: "Toyota's luxury division and top-rated premium brand", vinPrefix: "JT", founded: "1989", popular: ["RX", "ES", "NX", "IS", "GX"],
    vinNote: "Most Lexus models begin with \"JT\" (Japan-built); the US-built ES and some RX models use \"58A\" or \"2T\". The VIN confirms hybrid versus gas drivetrain on RX and NX models.",
    commonIssues: "Lexus shares Toyota's strong reliability, but some 2007–2011 models had the 2GR-FE V6 oil-line concern, and high-mileage hybrids may need battery service. A history report flags accident or flood damage.",
    recallContext: "Lexus models were included in the Takata airbag recall and shared Toyota's unintended-acceleration campaigns. Confirm open recalls by VIN.",
    buyingTip: "Lexus reliability commands a price premium that attracts title washing — verify the title brand and mileage history, and confirm any hybrid battery service on older RX and ES models.",
  },
  {
    slug: "acura", name: "Acura", country: "Japan", description: "Honda's luxury and performance division", vinPrefix: "19U", founded: "1986", popular: ["MDX", "RDX", "TLX", "Integra"],
    vinNote: "US-built Acuras (MDX, TLX) begin with \"19U\" / \"5J8\", while Japan-built models use \"JH4\". The VIN decodes engine and whether the car has SH-AWD all-wheel drive.",
    commonIssues: "Some 2003–2007 MDX/TL V6 automatics shared Honda's transmission-failure history, and certain models had the same Takata airbag exposure as Honda. A history report can reveal transmission replacements.",
    recallContext: "Acura, as a Honda brand, was affected by the large Takata airbag recall. Confirm the airbag inflator recall is closed by VIN.",
    buyingTip: "Acuras share Honda's strong drivetrains but are also frequent theft targets — verify the title isn't rebuilt and that the airbag recall is completed before buying.",
  },
  {
    slug: "infiniti", name: "Infiniti", country: "Japan", description: "Nissan's luxury vehicle division", vinPrefix: "JN", founded: "1989", popular: ["QX60", "QX50", "QX80", "Q50"],
    vinNote: "Infiniti models begin with \"JN\" (Japan) or \"5N\" (US-built QX60). The VIN confirms engine and drivetrain — important for distinguishing the QX50's VC-Turbo from earlier V6 models.",
    commonIssues: "The QX60 (and its Nissan Pathfinder twin) uses a CVT subject to the same overheating complaints as other Nissan CVTs. A history report can reveal prior transmission replacement.",
    recallContext: "Infiniti models were part of the Takata airbag recall and shared Nissan campaigns for braking and electrical issues. Verify open recalls by VIN.",
    buyingTip: "On CVT-equipped QX60 models, prioritise a history showing documented transmission service, and budget for the higher cost of luxury-brand parts and repairs.",
  },
  {
    slug: "tesla", name: "Tesla", country: "USA", description: "the electric vehicle pioneer and market leader", vinPrefix: "5YJ", founded: "2003", popular: ["Model Y", "Model 3", "Model X", "Model S", "Cybertruck"],
    vinNote: "Tesla VINs begin with \"5YJ\" (Fremont, California) or \"7SA\" (Texas); European cars use \"LRW\" (Shanghai) or \"XP7\" (Berlin). The VIN decodes the model, battery, and motor configuration.",
    commonIssues: "Older 2012–2018 Model S/X units had MCU eMMC memory failures and occasional air-suspension faults. The biggest used-EV risk is hidden battery damage — a salvage or flood title can mask a degraded pack. A history report is essential.",
    recallContext: "Tesla resolves many issues via over-the-air software updates, but it still issues formal NHTSA recalls (e.g. for Autopilot/Autosteer and seat-belt chimes). Confirm any open recall by VIN.",
    buyingTip: "Never buy a used Tesla with a salvage, flood, or rebuilt title without a battery health check — water or crash damage to the pack is expensive and not always visible. Verify the title is clean on the history report.",
  },
  {
    slug: "volvo", name: "Volvo", country: "Sweden", description: "the Swedish brand synonymous with safety", vinPrefix: "YV", founded: "1927", popular: ["XC90", "XC60", "XC40", "S60", "V60"],
    vinNote: "Volvo WMIs begin with \"YV1\" (passenger) or \"YV4\" (SUVs); US-built S60 models from South Carolina use \"7JR\". The VIN confirms the Drive-E engine and whether the car is a plug-in hybrid (Recharge).",
    commonIssues: "Some 2.0L Drive-E engines had carbon-buildup and timing-related concerns, and the complex electronics on loaded trims can be costly to repair out of warranty. A service history is valuable on these cars.",
    recallContext: "Volvo issued Takata airbag recalls and several campaigns for fuel-pump and seat-belt components. Confirm recall status by VIN.",
    buyingTip: "Volvo safety tech is excellent but repair-intensive once aged — use the history report to confirm regular dealer service and rule out accident damage to the advanced driver-assist sensors.",
  },
  {
    slug: "porsche", name: "Porsche", country: "Germany", description: "the iconic sports car manufacturer", vinPrefix: "WP", founded: "1931", popular: ["Cayenne", "Macan", "911", "Taycan", "Panamera"],
    vinNote: "Porsche WMIs begin with \"WP0\" (sports cars) or \"WP1\" (SUVs). The VIN decodes the exact model variant — critical on the 911, where Carrera, S, Turbo, and GT trims differ enormously in value.",
    commonIssues: "1997–2008 water-cooled 911/Boxster/Cayman models with the M96/M97 engine are known for IMS-bearing and bore-scoring risk; early Cayennes had coolant-pipe issues. A documented service and repair history is essential.",
    recallContext: "Porsche issued Takata airbag recalls on certain models and campaigns for fuel-line and seat-rail components. Verify open recalls by VIN.",
    buyingTip: "On any pre-2009 911/Boxster/Cayman, ask whether the IMS bearing was addressed, and always confirm the VIN-decoded variant matches the seller's claim — Porsche values swing wildly by trim.",
  },
  {
    slug: "cadillac", name: "Cadillac", country: "USA", description: "America's iconic luxury brand", vinPrefix: "1G6", founded: "1902", popular: ["Escalade", "XT5", "CT5", "XT4", "Lyriq"],
    vinNote: "Cadillac WMIs begin with \"1G6\" (passenger) or \"1GY\" (Escalade/SUV). The VIN identifies the engine — useful for confirming whether an Escalade has the 6.2L V8 or the diesel.",
    commonIssues: "Cadillac shares GM mechanicals, so 6.2L V8 AFM lifter concerns apply to Escalade, and CUE infotainment screens on 2013–2017 models were prone to cracking. A history report flags major repairs.",
    recallContext: "Cadillac vehicles were covered by GM's Takata airbag campaigns and shared ignition-switch and electrical recalls. Confirm open recalls by VIN.",
    buyingTip: "Escalades are popular livery and fleet vehicles — use the history report to check for prior commercial use and high-mileage drivetrain wear before paying luxury-SUV prices.",
  },
  {
    slug: "buick", name: "Buick", country: "USA", description: "GM's premium mainstream brand", vinPrefix: "1G4", founded: "1903", popular: ["Encore GX", "Enclave", "Envision"],
    vinNote: "Buick WMIs begin with \"1G4\" (passenger) or share GM SUV codes; the Envision is China-built and uses \"LRB\". The VIN confirms the engine and whether the car has all-wheel drive.",
    commonIssues: "Buick shares GM platforms — the Enclave's 3.6L V6 can develop timing-chain wear at higher mileage, and small turbo engines need regular oil service. A history report helps confirm maintenance.",
    recallContext: "Buick vehicles were part of GM's Takata airbag recalls and shared platform-level campaigns. Verify recall status by VIN.",
    buyingTip: "Buicks are often one-owner, low-mileage cars — confirm that profile on the history report, since their value rests heavily on gentle prior use and a clean accident record.",
  },
  {
    slug: "chrysler", name: "Chrysler", country: "USA", description: "an American automotive icon", vinPrefix: "2C3", founded: "1925", popular: ["Pacifica", "300"],
    vinNote: "Chrysler WMIs begin with \"2C3\" / \"2C4\" (Canada-built, including the Pacifica) or \"1C3\" (US). The VIN confirms whether a Pacifica is the gas model or the plug-in hybrid.",
    commonIssues: "The Pacifica Hybrid had early battery and electrical campaigns, and the 300's 3.6L Pentastar V6 can develop cylinder-head issues on early years. A history report reveals battery or engine work.",
    recallContext: "Chrysler vehicles were part of the Takata airbag recall, and the Pacifica Hybrid had a fire-risk recall affecting certain 2017–2018 units. Confirm completion by VIN.",
    buyingTip: "On a Pacifica Hybrid, verify the battery-related recalls are closed by VIN, and check the history report for the accident and flood records that minivans (used as family haulers) often accumulate.",
  },
  {
    slug: "lincoln", name: "Lincoln", country: "USA", description: "Ford's luxury vehicle division", vinPrefix: "5LM", founded: "1917", popular: ["Navigator", "Corsair", "Aviator", "Nautilus"],
    vinNote: "Lincoln WMIs begin with \"5LM\" (SUVs) or \"1LN\" (sedans). The VIN decodes the EcoBoost engine and whether the vehicle has all-wheel drive — relevant on the twin-turbo Navigator and Aviator.",
    commonIssues: "Lincoln shares Ford EcoBoost mechanicals, so some turbo engines had coolant-intrusion concerns, and the Aviator's plug-in hybrid added electrical complexity. A history report flags powertrain repairs.",
    recallContext: "Lincoln vehicles shared Ford's Takata airbag and Explorer-platform campaigns (the Aviator shares the Explorer architecture). Confirm recall status by VIN.",
    buyingTip: "Navigators are popular livery vehicles — use the history report to rule out prior commercial use and high-mileage drivetrain wear before paying luxury prices.",
  },
  {
    slug: "genesis", name: "Genesis", country: "South Korea", description: "Hyundai's award-winning luxury brand", vinPrefix: "KM", founded: "2015", popular: ["GV70", "G70", "GV80", "G80", "G90"],
    vinNote: "Genesis models are Korea-built and begin with \"KM\" (SUVs) or \"KMT\". The VIN confirms engine — 2.5T, 3.5T twin-turbo, or the Electrified GV70/G80 battery model.",
    commonIssues: "As a newer brand, Genesis has a limited fault history, but it shares some Hyundai-Kia engine families, so confirming engine-related recalls by VIN is still worthwhile. A history report flags accident or flood damage.",
    recallContext: "Genesis models have had software, seat-belt, and electrical recalls; being Hyundai-derived, confirm engine and anti-theft campaigns apply or not by VIN.",
    buyingTip: "Genesis depreciates faster than established luxury brands, which makes a clean, well-documented used example a strong value — verify the title and service history before buying.",
  },
  {
    slug: "land-rover", name: "Land Rover", country: "UK", description: "the world's premier luxury SUV brand", vinPrefix: "SAL", founded: "1948", popular: ["Range Rover", "Defender", "Discovery", "Range Rover Sport"],
    vinNote: "Land Rover WMIs begin with \"SAL\" (UK-built). The VIN decodes the exact model and engine — important across the wide-ranging Range Rover, Sport, Velar, and Defender lineup.",
    commonIssues: "Land Rovers have a well-documented reputation for electrical, air-suspension, and engine-oil-leak concerns, especially out of warranty. A thorough service and repair history is more important here than on almost any other brand.",
    recallContext: "Land Rover issued Takata airbag recalls and several campaigns for fuel-system and electrical faults. Confirm open recalls by VIN.",
    buyingTip: "Buy on service history, not price. Use the VIN report to confirm consistent dealer maintenance and rule out flood damage — water-fording and electrical issues are a costly combination on these SUVs.",
  },
  {
    slug: "jaguar", name: "Jaguar", country: "UK", description: "the British luxury performance brand", vinPrefix: "SAJ", founded: "1922", popular: ["F-PACE", "E-PACE", "F-TYPE", "XF"],
    vinNote: "Jaguar WMIs begin with \"SAJ\" (UK-built). The VIN confirms the engine — supercharged V6/V8, four-cylinder Ingenium, or the I-PACE electric drivetrain.",
    commonIssues: "Some 2.0L Ingenium diesels had timing-chain concerns, and Jaguars share Land Rover's reputation for electrical gremlins. A documented service history is important on used examples.",
    recallContext: "Jaguar issued Takata airbag recalls and emissions-related campaigns on certain diesels. Verify recall status by VIN.",
    buyingTip: "Jaguars depreciate steeply, so a clean, fully-serviced used example can be a bargain — but confirm dealer maintenance and a clean accident/flood record on the history report first.",
  },
  {
    slug: "mini", name: "MINI", country: "UK", description: "the iconic small car brand owned by BMW", vinPrefix: "WM", founded: "1959", popular: ["Cooper", "Countryman", "Clubman"],
    vinNote: "MINI WMIs begin with \"WMW\" (UK-built, BMW-owned). The VIN confirms the engine and whether the car is the Cooper, Cooper S, or John Cooper Works performance variant.",
    commonIssues: "2007–2010 models with the N14 turbo engine were known for timing-chain rattle and carbon buildup, and clutch/transmission wear is common on hard-driven examples. A service history is valuable.",
    recallContext: "MINI, as a BMW brand, was part of the Takata airbag recall and shared engine-related campaigns. Confirm recall completion by VIN.",
    buyingTip: "On 2007–2010 turbo (N14) models, ask whether the timing chain and tensioner were replaced, and verify it on the history report — it's the defining repair for these cars.",
  },
  {
    slug: "mitsubishi", name: "Mitsubishi", country: "Japan", description: "a Japanese brand known for durable SUVs", vinPrefix: "JA", founded: "1970", popular: ["Outlander", "Eclipse Cross", "Mirage"],
    vinNote: "Mitsubishi WMIs begin with \"JA3\" / \"JA4\" (Japan-built). The VIN confirms engine and whether the Outlander is the gas model or the plug-in hybrid (PHEV).",
    commonIssues: "The Outlander PHEV's battery and charging system add complexity, and CVT-equipped models need regular fluid service. A history report can reveal battery or transmission work.",
    recallContext: "Mitsubishi models were part of the Takata airbag recall and had separate campaigns for braking and electrical issues. Verify recall status by VIN.",
    buyingTip: "Mitsubishi's long powertrain warranty is a selling point — confirm whether remaining coverage transfers, and use the history report to verify a clean title and accident record.",
  },
  {
    slug: "alfa-romeo", name: "Alfa Romeo", country: "Italy", description: "the Italian brand known for passionate driving", vinPrefix: "ZAR", founded: "1910", popular: ["Giulia", "Stelvio", "Tonale"],
    vinNote: "Alfa Romeo WMIs begin with \"ZAR\" (Italy-built). The VIN confirms the engine — the 2.0L turbo, the 2.9L Quadrifoglio V6, or the Tonale plug-in hybrid.",
    commonIssues: "Modern Alfas (Giulia, Stelvio) have documented electrical and infotainment gremlins, and the high-performance Quadrifoglio models reward careful service history. A history report flags major electrical or engine work.",
    recallContext: "Alfa Romeo issued recalls for electrical, brake, and software issues on the Giulia and Stelvio. Confirm open recalls by VIN.",
    buyingTip: "Alfas are character-rich but maintenance-sensitive — buy a fully-documented example, confirm warranty status, and use the history report to rule out accident and electrical-repair red flags.",
  },
];

export function getMakeBySlug(slug: string): MakeInfo | undefined {
  return makes.find((m) => m.slug === slug);
}
