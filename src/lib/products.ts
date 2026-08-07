export interface ProductData {
  id: string;
  name: string;
  description: string;
  price: number;
  comparePrice: number | null;
  sku: string;
  stock: number;
  rating: number;
  reviewCount: number;
  sales: number;
  brand: string;
  category: string;
  has3D: boolean;
  modelUrl?: string;
  images: string[];
  variants: { id: string; name: string; value: string; stock: number; price: number | null }[];
  features: string[];
  reviews: { id: string; name: string; rating: number; title: string; comment: string; date: string }[];
  relatedProducts: string[];
}

export const productsDB: Record<string, ProductData> = {
  "1": {
    id: "1", name: "Audífonos Pro",
    description: "Experimenta un sonido envolvente con los nuevos Audífonos Pro. Diseñados con tecnología de cancelación de ruido activa, drivers de neodimio de 40mm y almohadillas de memory foam para máxima comodidad durante horas de uso.\n\nPerfectos para gaming, producción musical o simplemente disfrutar de tu música favorita con una calidad de audio excepcional.",
    price: 299900, comparePrice: 499900, sku: "AUD-PRO-001", stock: 50, rating: 4.8, reviewCount: 234, sales: 1234,
    brand: "AudioTech", category: "Tecnología", has3D: false, images: ["🎧", "🎵", "🎼", "🎤"],
    variants: [{ id: "v1", name: "Color", value: "Negro", stock: 20, price: null }, { id: "v2", name: "Color", value: "Blanco", stock: 15, price: null }, { id: "v3", name: "Color", value: "Azul", stock: 10, price: 29900 }],
    features: ["Cancelación de ruido activa", "Bluetooth 5.3", "40 horas de batería", "Carga rápida USB-C", "Almohadillas memory foam", "Micrófono incorporado"],
    reviews: [{ id: "r1", name: "Carlos M.", rating: 5, title: "¡Increíble calidad!", comment: "Los mejores audífonos que he tenido. La cancelación de ruido es espectacular y la batería dura muchísimo. 100% recomendados.", date: "2024-12-15" }, { id: "r2", name: "Ana G.", rating: 5, title: "Perfectos para gaming", comment: "Los uso para jugar y la calidad del sonido es impresionante. Puedo escuchar cada detalle del juego. Muy cómodos para sesiones largas.", date: "2024-12-10" }, { id: "r3", name: "Pedro L.", rating: 4, title: "Muy buenos", comment: "Excelente calidad de construcción y sonido. Les doy 4 estrellas porque el estuche podría ser más compacto.", date: "2024-11-28" }],
    relatedProducts: ["3", "2", "7", "12"],
  },
  "2": {
    id: "2", name: "Teclado Mecánico RGB",
    description: "Teclado mecánico con switches Cherry MX Red, retroiluminación RGB personalizable por tecla y construcción en aluminio. Perfecto para gaming y productividad.\n\nIncluye reposamuñecas magnético y cable USB-C desmontable.",
    price: 189900, comparePrice: 299900, sku: "KEY-RGB-001", stock: 30, rating: 4.7, reviewCount: 156, sales: 856,
    brand: "KeyPro", category: "Gaming", has3D: false, images: ["⌨️", "🎮", "💡", "⚡"],
    variants: [{ id: "k1", name: "Switch", value: "Cherry MX Red", stock: 15, price: null }, { id: "k2", name: "Switch", value: "Cherry MX Blue", stock: 10, price: null }, { id: "k3", name: "Switch", value: "Brown", stock: 5, price: 9900 }],
    features: ["Switches Cherry MX", "RGB por tecla", "Aluminio anodizado", "USB-C desmontable", "Reposamuñecas magnético", "Anti-ghosting"],
    reviews: [{ id: "t1", name: "Miguel S.", rating: 5, title: "El mejor teclado", comment: "La sensación al escribir es increíble. El RGB se ve espectacular. 100% recomendado para gaming.", date: "2024-12-08" }],
    relatedProducts: ["3", "1", "4", "5"],
  },
  "3": {
    id: "3", name: "Mouse Gaming",
    description: "Mouse gaming con sensor óptico de 25K DPI, 8 botones programables, peso ajustable y RGB sincronizable. Diseño ergonómico para largas sesiones de juego.",
    price: 149900, comparePrice: null, sku: "MOU-GMX-001", stock: 100, rating: 4.9, reviewCount: 312, sales: 2341,
    brand: "GameMax", category: "Gaming", has3D: false, images: ["🖱️", "🎯", "💨", "✨"],
    variants: [{ id: "m1", name: "Color", value: "Negro", stock: 60, price: null }, { id: "m2", name: "Color", value: "Blanco", stock: 40, price: null }],
    features: ["Sensor 25K DPI", "8 botones programables", "Peso ajustable", "RGB sincronizable", "Ergonómico", "Cable paracord"],
    reviews: [{ id: "m1r", name: "David P.", rating: 5, title: "Precisión absoluta", comment: "El mejor mouse que he tenido. La precisión es increíble y es muy cómodo.", date: "2024-12-20" }],
    relatedProducts: ["2", "1", "4", "8"],
  },
  "4": {
    id: "4", name: "Monitor 27\" 4K",
    description: "Monitor 4K UHD de 27 pulgadas con panel IPS, HDR10, 144Hz y tiempo de respuesta de 1ms. Conectividad HDMI 2.1, DisplayPort y USB-C.",
    price: 1249900, comparePrice: 1599900, sku: "MON-4K-001", stock: 15, rating: 4.6, reviewCount: 89, sales: 432,
    brand: "ViewPro", category: "Tecnología", has3D: false, images: ["🖥️", "🎨", "⚡", "📐"],
    variants: [{ id: "d1", name: "Tamaño", value: "27\"", stock: 10, price: null }, { id: "d2", name: "Tamaño", value: "32\"", stock: 5, price: 300000 }],
    features: ["4K UHD IPS", "144Hz", "1ms respuesta", "HDR10", "HDMI 2.1", "USB-C con carga"],
    reviews: [{ id: "m2r", name: "Andrea C.", rating: 4, title: "Excelente monitor", comment: "Los colores son increíbles. Ideal para diseño y gaming. Le doy 4 porque el menú OSD podría ser mejor.", date: "2024-11-30" }],
    relatedProducts: ["1", "3", "5", "12"],
  },
  "5": {
    id: "5", name: "Silla Ergonómica",
    description: "Silla ergonómica premium con soporte lumbar ajustable, reposacabezas, reposabrazos 4D y mecanismo de inclinación. Tapizada en malla transpirable.",
    price: 899900, comparePrice: null, sku: "ERG-CHAIR-01", stock: 20, rating: 4.5, reviewCount: 98, sales: 678,
    brand: "ErgoPlus", category: "Oficina", has3D: false, images: ["💺", "🔄", "📏", "✅"],
    variants: [{ id: "c1", name: "Color", value: "Negro", stock: 12, price: null }, { id: "c2", name: "Color", value: "Gris", stock: 8, price: null }],
    features: ["Soporte lumbar ajustable", "Reposacabezas", "Reposabrazos 4D", "Malla transpirable", "150kg capacidad", "Garantía 5 años"],
    reviews: [{ id: "s1r", name: "Fernando L.", rating: 5, title: "Mi espalda lo agradece", comment: "Después de 3 meses usándola, mis dolores de espalda desaparecieron. La mejor inversión.", date: "2024-12-01" }],
    relatedProducts: ["4", "9", "2", "3"],
  },
  "6": {
    id: "6", name: "Impresora 3D Pro",
    description: "Impresora 3D de alta precisión ideal para creadores, diseñadores y entusiastas. Tecnología FDM con volumen de impresión de 220x220x250mm, pantalla táctil a color y nivelación automática.\n\nCompatible con PLA, ABS, PETG y TPU.",
    price: 1899900, comparePrice: 2499900, sku: "3DP-PRO-001", stock: 8, rating: 4.8, reviewCount: 56, sales: 234,
    brand: "PrintMax", category: "Impresiones 3D", has3D: true, modelUrl: "/models/helmet.glb", images: ["🖨️", "⚙️", "🎯", "🔩"],
    variants: [{ id: "p1", name: "Color", value: "Negro", stock: 5, price: null }, { id: "p2", name: "Color", value: "Gris", stock: 3, price: null }],
    features: ["220x220x250mm", "Pantalla táctil", "Nivelación automática", "PLA/ABS/PETG/TPU", "Reanudación de impresión", "Sensor de filamento"],
    reviews: [{ id: "i1r", name: "Diego R.", rating: 5, title: "Excelente", comment: "Fácil de armar, excelente calidad de impresión. La uso para la universidad.", date: "2024-12-05" }],
    relatedProducts: ["13", "14", "15", "16"],
  },
  "7": {
    id: "7", name: "Cámara Web 4K",
    description: "Cámara web profesional 4K con autoenfoque, corrección de luz, micrófono estéreo integrado y obturador de privacidad. Perfecta para streaming y videollamadas.",
    price: 349900, comparePrice: 449900, sku: "WEB-4K-001", stock: 45, rating: 4.4, reviewCount: 67, sales: 987,
    brand: "ViewPro", category: "Tecnología", has3D: false, images: ["📸", "🎥", "🔒", "💻"],
    variants: [{ id: "w1", name: "Color", value: "Negro", stock: 30, price: null }, { id: "w2", name: "Color", value: "Blanco", stock: 15, price: null }],
    features: ["4K 30fps", "Autoenfoque", "Corrección de luz", "Micrófono estéreo", "Obturador privacidad", "Plug & Play"],
    reviews: [{ id: "c1r", name: "Patricia M.", rating: 4, title: "Buena calidad", comment: "Excelente para mis reuniones. La calidad de video es muy superior a la webcam de la laptop.", date: "2024-11-15" }],
    relatedProducts: ["1", "4", "8", "12"],
  },
  "8": {
    id: "8", name: "Hub USB-C",
    description: "Hub USB-C multipuerto con HDMI 4K, 3x USB 3.0, lector SD/TF y carga passthrough de 100W. Compacto y compatible con laptops y tablets.",
    price: 89900, comparePrice: null, sku: "HUB-USBC-01", stock: 200, rating: 4.3, reviewCount: 234, sales: 1543,
    brand: "TechLink", category: "Accesorios", has3D: false, images: ["🔌", "💻", "📱", "⚡"],
    variants: [{ id: "h1", name: "Color", value: "Gris espacial", stock: 100, price: null }, { id: "h2", name: "Color", value: "Plateado", stock: 100, price: null }],
    features: ["HDMI 4K 60Hz", "3x USB 3.0", "Lector SD/TF", "Carga 100W PD", "Plug & Play", "Aluminio"],
    reviews: [{ id: "h1r", name: "Roberto G.", rating: 4, title: "Muy útil", comment: "Perfecto para mi MacBook. Tener todos los puertos en uno es súper conveniente.", date: "2024-12-02" }],
    relatedProducts: ["7", "11", "12", "3"],
  },
  "9": {
    id: "9", name: "Lámpara LED Escritorio",
    description: "Lámpara LED de escritorio con brazo ajustable, 5 modos de brillo, 3 temperaturas de color y puerto USB de carga. Diseño minimalista.",
    price: 79900, comparePrice: 129900, sku: "LED-LAMP-01", stock: 60, rating: 4.2, reviewCount: 43, sales: 321,
    brand: "LightPro", category: "Oficina", has3D: false, images: ["💡", "✨", "📐", "🔆"],
    variants: [{ id: "l1", name: "Color", value: "Negro", stock: 35, price: null }, { id: "l2", name: "Color", value: "Blanco", stock: 25, price: null }],
    features: ["Brazo ajustable", "5 modos de brillo", "3 temperaturas", "USB carga", "Minimalista", "Ahorro energético"],
    reviews: [{ id: "l1r", name: "Claudia V.", rating: 4, title: "Buena iluminación", comment: "Perfecta para mi escritorio. Me gusta poder cambiar la temperatura de color.", date: "2024-10-28" }],
    relatedProducts: ["5", "4", "7", "14"],
  },
  "10": {
    id: "10", name: "Mochila Antirrobo",
    description: "Mochila antirrobo con puerto USB de carga, compartimento acolchado para laptop 15.6\", material impermeable y cremallera oculta. Ideal para viajes y uso diario.",
    price: 159900, comparePrice: null, sku: "MOC-BAG-01", stock: 35, rating: 4.6, reviewCount: 78, sales: 567,
    brand: "SafeBag", category: "Accesorios", has3D: false, images: ["🎒", "🔒", "💻", "✈️"],
    variants: [{ id: "b1", name: "Color", value: "Negro", stock: 20, price: null }, { id: "b2", name: "Color", value: "Gris", stock: 15, price: null }],
    features: ["Puerto USB carga", "Laptop 15.6\"", "Impermeable", "Cremallera oculta", "Antirrobo", "Ergonómica"],
    reviews: [{ id: "b1r", name: "Javier R.", rating: 5, title: "Excelente calidad", comment: "La uso a diario para ir al trabajo. Muy cómoda y el compartimento anti robo me da tranquilidad.", date: "2024-12-12" }],
    relatedProducts: ["8", "11", "15", "19"],
  },
  "11": {
    id: "11", name: "Cargador Inalámbrico",
    description: "Cargador inalámbrico rápido 15W compatible con todos los smartphones Qi. Diseño ultrafino con indicador LED y protección contra sobrecalentamiento.",
    price: 49900, comparePrice: 79900, sku: "CAR-WIRE-01", stock: 150, rating: 4.1, reviewCount: 189, sales: 2109,
    brand: "TechLink", category: "Accesorios", has3D: false, images: ["🔋", "📱", "⚡", "💨"],
    variants: [{ id: "w1", name: "Color", value: "Negro", stock: 80, price: null }, { id: "w2", name: "Color", value: "Blanco", stock: 70, price: null }],
    features: ["15W carga rápida", "Qi universal", "Ultrafino 6mm", "LED indicador", "Protección térmica", "Case friendly"],
    reviews: [{ id: "cr1", name: "Natalia S.", rating: 4, title: "Práctico", comment: "Muy cómodo solo dejar el celular y ya. La carga es rápida.", date: "2024-11-08" }],
    relatedProducts: ["8", "12", "10", "15"],
  },
  "12": {
    id: "12", name: "Auriculares Bluetooth",
    description: "Auriculares Bluetooth 5.3 con cancelación de ruido ambiental, 30 horas de batería, controles táctiles y estuche de carga compacto. Resistencia IPX5.",
    price: 159900, comparePrice: 249900, sku: "AUR-BT-001", stock: 75, rating: 4.7, reviewCount: 245, sales: 1890,
    brand: "AudioTech", category: "Tecnología", has3D: false, images: ["🎵", "🎧", "🏃", "📱"],
    variants: [{ id: "a1", name: "Color", value: "Negro", stock: 40, price: null }, { id: "a2", name: "Color", value: "Blanco", stock: 25, price: null }, { id: "a3", name: "Color", value: "Azul", stock: 10, price: null }],
    features: ["Bluetooth 5.3", "Cancelación ruido", "30h batería", "Controles táctiles", "IPX5 resistente", "Estuche compacto"],
    reviews: [{ id: "ar1", name: "Gabriel T.", rating: 5, title: "Increíble sonido", comment: "La calidad de audio es espectacular para ser inalámbricos. La batería dura una eternidad.", date: "2024-12-18" }],
    relatedProducts: ["1", "7", "8", "3"],
  },
  "13": {
    id: "13", name: "Figura 3D Hollow Knight",
    description: "Figura detallada de Hollow Knight impresa en 3D con filamento PLA de alta calidad. Incluye todos los detalles del personaje, postura dinámica y acabado profesional.\n\nPerfecta para coleccionistas, decoración de escritorio o regalo para fans. Cada pieza es revisada a mano.",
    price: 49900, comparePrice: null, sku: "3DP-HK-001", stock: 25, rating: 4.9, reviewCount: 89, sales: 567,
    brand: "PrintMax", category: "Impresiones 3D", has3D: true, modelUrl: "/models/knight.stl", images: ["🐉", "✨", "🎨", "📐"],
    variants: [{ id: "f1", name: "Color", value: "Negro", stock: 10, price: null }, { id: "f2", name: "Color", value: "Blanco", stock: 8, price: null }, { id: "f3", name: "Color", value: "Gris", stock: 7, price: null }],
    features: ["Filamento PLA", "Diseño detallado", "Postura dinámica", "Revisado a mano", "Coleccionable", "Empaque de regalo"],
    reviews: [{ id: "d1r", name: "Martín L.", rating: 5, title: "Increíble detalle", comment: "El nivel de detalle es asombroso. Queda perfecto en mi setup.", date: "2024-12-18" }, { id: "d2r", name: "Valentina C.", rating: 5, title: "Regalo perfecto", comment: "Lo compré para regalo y les encantó. Muy bien hecho.", date: "2024-12-12" }],
    relatedProducts: ["6", "14", "15", "16"],
  },
  "14": {
    id: "14", name: "Portalápices Geométrico",
    description: "Portalápices con diseño geométrico moderno impreso en 3D. Forma de panal hexagonal que organiza tus bolígrafos, lápices y herramientas de escritorio con estilo. Fabricado en PLA resistente con acabado mate.",
    price: 29900, comparePrice: 39900, sku: "3DP-PENCIL-01", stock: 50, rating: 4.6, reviewCount: 45, sales: 432,
    brand: "PrintMax", category: "Impresiones 3D", has3D: true, modelUrl: "/models/helmet.glb", images: ["🖊️", "⬡", "📐", "✨"],
    variants: [{ id: "g1", name: "Color", value: "Blanco mate", stock: 20, price: null }, { id: "g2", name: "Color", value: "Negro mate", stock: 18, price: null }],
    features: ["Diseño geométrico", "PLA resistente", "Acabado mate", "8-10 bolígrafos", "Base antideslizante", "Compacto"],
    reviews: [{ id: "p1r", name: "Lucía P.", rating: 5, title: "Hermoso diseño", comment: "Queda perfecto en mi escritorio. Muy moderno.", date: "2024-12-08" }],
    relatedProducts: ["6", "13", "16", "9"],
  },
  "15": {
    id: "15", name: "Soporte para Celular",
    description: "Soporte ajustable para celular impreso en 3D. Diseño minimalista, compatible con cualquier smartphone. Ángulo de visión óptimo para videollamadas, ver contenido o seguir recetas.",
    price: 19900, comparePrice: null, sku: "3DP-SUPPORT-01", stock: 100, rating: 4.7, reviewCount: 112, sales: 892,
    brand: "PrintMax", category: "Impresiones 3D", has3D: true, modelUrl: "/models/helmet.glb", images: ["📱", "🔧", "📐", "✋"],
    variants: [{ id: "s1", name: "Color", value: "Negro", stock: 50, price: null }, { id: "s2", name: "Color", value: "Blanco", stock: 50, price: null }],
    features: ["Compatible smartphones", "Ángulo ajustable", "Plegable", "PLA resistente", "Base antideslizante", "Minimalista"],
    reviews: [{ id: "spr", name: "Andrés G.", rating: 5, title: "Práctico", comment: "Lo uso todos los días. Muy práctico y se ve bien.", date: "2024-12-22" }],
    relatedProducts: ["6", "13", "14", "10"],
  },
  "16": {
    id: "16", name: "Maceta Geométrica",
    description: "Maceta con diseño geométrico impresa en 3D. Forma dodecaédrica única. Ideal para suculentas, cactus o plantas pequeñas. Incluye orificio de drenaje y plato base.",
    price: 34900, comparePrice: 49900, sku: "3DP-PLANT-01", stock: 40, rating: 4.5, reviewCount: 63, sales: 321,
    brand: "PrintMax", category: "Impresiones 3D", has3D: true, modelUrl: "/models/helmet.glb", images: ["🪴", "🌿", "💎", "🏠"],
    variants: [{ id: "m1", name: "Color", value: "Blanco", stock: 15, price: null }, { id: "m2", name: "Color", value: "Negro", stock: 12, price: null }, { id: "m3", name: "Color", value: "Terracota", stock: 13, price: null }],
    features: ["Diseño único", "PLA ecológico", "Drenaje incluido", "Plato base", "Suculentas", "Varios colores"],
    reviews: [{ id: "macr", name: "Camila R.", rating: 5, title: "Hermosa", comment: "Se ve increíble en mi sala. Muy elegante.", date: "2024-12-01" }],
    relatedProducts: ["6", "13", "14", "23"],
  },
  "17": {
    id: "17", name: "Comedero para Mascotas", price: 59900, comparePrice: null, sku: "PET-BOWL-01", stock: 45, rating: 4.4, reviewCount: 34, sales: 654,
    description: "Comedero elevado para mascotas con diseño moderno. Fabricado en cerámica con base antideslizante. Ideal para perros y gatos de tamaño pequeño a mediano.",
    brand: "PetPro", category: "Mascotas", has3D: false, images: ["🐕", "🐈", "🍖", "💧"],
    variants: [{ id: "pb1", name: "Tamaño", value: "Pequeño", stock: 25, price: null }, { id: "pb2", name: "Tamaño", value: "Mediano", stock: 20, price: null }],
    features: ["Cerámica premium", "Base antideslizante", "Fácil limpieza", "Diseño elevado", "Apto lavavajillas"],
    reviews: [],
    relatedProducts: ["18", "23", "24"],
  },
  "18": {
    id: "18", name: "Juguete Interactivo", price: 29900, comparePrice: 39900, sku: "PET-TOY-01", stock: 80, rating: 4.3, reviewCount: 56, sales: 1209,
    description: "Juguete interactivo para mascotas con láser automático y temporizador. Mantiene a tu mascota entretenida mientras no estás en casa.",
    brand: "PetPro", category: "Mascotas", has3D: false, images: ["🎾", "🐕", "🔴", "⏰"],
    variants: [{ id: "t1", name: "Color", value: "Rojo", stock: 40, price: null }, { id: "t2", name: "Color", value: "Azul", stock: 40, price: null }],
    features: ["Láser automático", "Temporizador", "Batería recargable", "Seguro para mascotas", "Silencioso"],
    reviews: [],
    relatedProducts: ["17", "23", "24"],
  },
  "19": {
    id: "19", name: "Camiseta Premium", price: 89900, comparePrice: null, sku: "CLO-SHIRT-01", stock: 200, rating: 4.5, reviewCount: 456, sales: 2100,
    description: "Camiseta premium 100% algodón orgánico. Corte moderno, costuras reforzadas y estampado de alta durabilidad. Disponible en varios colores y tallas.",
    brand: "StyleMax", category: "Ropa", has3D: false, images: ["👕", "✨", "📏", "🎨"],
    variants: [{ id: "cs1", name: "Talla", value: "S", stock: 50, price: null }, { id: "cs2", name: "Talla", value: "M", stock: 60, price: null }, { id: "cs3", name: "Talla", value: "L", stock: 50, price: null }, { id: "cs4", name: "Talla", value: "XL", stock: 40, price: null }],
    features: ["100% algodón orgánico", "Corte moderno", "Costuras reforzadas", "Estampado durable", "Lavable a máquina"],
    reviews: [],
    relatedProducts: ["20", "10", "11"],
  },
  "20": {
    id: "20", name: "Chaqueta Deportiva", price: 189900, comparePrice: 249900, sku: "CLO-JACKET-01", stock: 60, rating: 4.6, reviewCount: 134, sales: 876,
    description: "Chaqueta deportiva con tecnología impermeable y transpirable. Ideal para running y actividades al aire libre. Incluye capucha plegable y bolsillos con cremallera.",
    brand: "StyleMax", category: "Ropa", has3D: false, images: ["🧥", "🏃", "💨", "🌧️"],
    variants: [{ id: "cj1", name: "Talla", value: "M", stock: 20, price: null }, { id: "cj2", name: "Talla", value: "L", stock: 25, price: null }, { id: "cj3", name: "Talla", value: "XL", stock: 15, price: null }],
    features: ["Impermeable", "Transpirable", "Capucha plegable", "Bolsillos cremallera", "Ligera", "Resistente al viento"],
    reviews: [],
    relatedProducts: ["19", "10", "22"],
  },
  "21": {
    id: "21", name: "Taladro Inalámbrico", price: 249900, comparePrice: 349900, sku: "TOOL-DRILL-01", stock: 35, rating: 4.7, reviewCount: 67, sales: 543,
    description: "Taladro inalámbrico 20V con batería de litio, 2 velocidades, 21 posiciones de torque y mandril de 13mm. Incluye maletín y accesorios.",
    brand: "PowerTool", category: "Herramientas", has3D: false, images: ["🔧", "⚡", "🔩", "📦"],
    variants: [{ id: "tl1", name: "Kit", value: "Básico", stock: 20, price: null }, { id: "tl2", name: "Kit", value: "Completo", stock: 15, price: 49900 }],
    features: ["20V litio", "2 velocidades", "21 posiciones torque", "Mandril 13mm", "Maletín incluido", "LED integrado"],
    reviews: [],
    relatedProducts: ["22", "14", "15"],
  },
  "22": {
    id: "22", name: "Juego de Destornilladores", price: 59900, comparePrice: null, sku: "TOOL-SCREW-01", stock: 150, rating: 4.4, reviewCount: 89, sales: 3210,
    description: "Juego de destornilladores de precisión con 32 puntas intercambiables. Incluye puntas magnéticas, mango ergonómico y estuche organizador.",
    brand: "PowerTool", category: "Herramientas", has3D: false, images: ["🪛", "🔩", "📦", "✅"],
    variants: [{ id: "ds1", name: "Piezas", value: "32 piezas", stock: 100, price: null }, { id: "ds2", name: "Piezas", value: "56 piezas", stock: 50, price: 19900 }],
    features: ["32 puntas", "Magnético", "Mango ergonómico", "Estuche incluido", "Precisión", "Acero cromado"],
    reviews: [],
    relatedProducts: ["21", "8", "15"],
  },
  "23": {
    id: "23", name: "Cojín Decorativo", price: 39900, comparePrice: null, sku: "HOME-CUSH-01", stock: 300, rating: 4.2, reviewCount: 234, sales: 4567,
    description: "Cojín decorativo con funda removible de terciopelo. Relleno de fibra hipoalergénica. Ideal para sala, dormitorio o cualquier espacio.",
    brand: "HomeStyle", category: "Hogar", has3D: false, images: ["🛋️", "✨", "🎨", "🏠"],
    variants: [{ id: "cu1", name: "Color", value: "Gris", stock: 100, price: null }, { id: "cu2", name: "Color", value: "Beige", stock: 100, price: null }, { id: "cu3", name: "Color", value: "Azul", stock: 100, price: null }],
    features: ["Terciopelo", "Funda removible", "Hipoalergénico", "Lavable", "45x45cm", "Decorativo"],
    reviews: [],
    relatedProducts: ["24", "16", "19"],
  },
  "24": {
    id: "24", name: "Set de Velas Aromáticas", price: 49900, comparePrice: 69900, sku: "HOME-CANDLE-01", stock: 120, rating: 4.5, reviewCount: 156, sales: 2341,
    description: "Set de 3 velas aromáticas de soya con fragancias naturales. Lavanda, Vainilla y Eucalipto. 40 horas de duración cada una. Empaque de regalo incluido.",
    brand: "HomeStyle", category: "Hogar", has3D: false, images: ["🕯️", "🌸", "✨", "🎁"],
    variants: [{ id: "cv1", name: "Set", value: "3 velas", stock: 120, price: null }],
    features: ["Cera de soya", "3 fragancias", "40h cada vela", "Mecha de algodón", "Empaque regalo"],
    reviews: [],
    relatedProducts: ["23", "16", "10"],
  },
};

export const productsList = Object.values(productsDB);

export function getProduct(id: string): ProductData | undefined {
  return productsDB[id];
}

export const categoryInfo: Record<string, { name: string; icon: string; description: string }> = {
  tecnologia: { name: "Tecnología", icon: "💻", description: "Lo último en computadores, tablets, accesorios y gadgets tecnológicos." },
  gaming: { name: "Gaming", icon: "🎮", description: "Consolas, periféricos, sillas gamer y todo para el mejor setup." },
  hogar: { name: "Hogar", icon: "🏠", description: "Decoración, muebles, iluminación y todo para tu espacio perfecto." },
  oficina: { name: "Oficina", icon: "🖨️", description: "Escritorios, sillas ergonómicas, papelería y equipos de oficina." },
  accesorios: { name: "Accesorios", icon: "⌚", description: "Relojes, bolsos, lentes, cargadores y accesorios esenciales." },
  mascotas: { name: "Mascotas", icon: "🐾", description: "Alimentos, juguetes, accesorios y todo para consentir a tu mascota." },
  ropa: { name: "Ropa", icon: "👕", description: "Camisetas, chaquetas, zapatos y moda para todas las ocasiones." },
  herramientas: { name: "Herramientas", icon: "🔧", description: "Herramientas eléctricas, manuales, jardinería y más." },
  "impresiones-3d": { name: "Impresiones 3D", icon: "🖨️", description: "Figuras, piezas personalizadas, decoración y productos impresos en 3D con la más alta calidad." },
};

export function getProductSummary(id: string) {
  const p = productsDB[id];
  if (!p) return null;
  return {
    id: p.id,
    name: p.name,
    price: p.price,
    comparePrice: p.comparePrice,
    image: p.images[0],
    rating: p.rating,
    category: p.category,
    brand: p.brand,
    stock: p.stock,
    isNew: false,
    is3D: p.has3D,
    sales: p.sales,
  };
}
