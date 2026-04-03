export const fincaInfo = {
    location: "Las Palmas de Gran Canaria"
};

export const zonesData = [
  { id: 'z_hogar', name: 'Hogar', cssClass: 'zone-hogar' },
  { id: 'z_bienvenida', name: 'Bienvenida', cssClass: 'zone-bienvenida' },
  { id: 'z_bosque', name: 'Bosque', cssClass: 'zone-bosque' },
  { id: 'z_ocio', name: 'Ocio Cultivado', cssClass: 'zone-ocio' },
  { id: 'z_sala', name: 'Sala de Actividades', cssClass: 'zone-sala' },
  { id: 'z_biopiscina', name: 'Biopiscina / Estanque', cssClass: 'zone-biopiscina' }
];

export const strataColors = {
  'Estrato Emergente': '#059669', 'Estrato Alto': '#10B981', 'Estrato Medio': '#EAB308',
  'Estrato Bajo': '#84CC16', 'Estrato Subterráneo': '#D97706', 'Cobertura / Rastrero': '#65A30D',
  'Funcionales': '#8B5CF6', 'Trepadoras / Verticales': '#EC4899', 'Casos Especiales': '#3B82F6',
  'frutal': '#F59E0B', 'arbol': '#15803D', 'aromatica': '#8B5CF6', 'suculenta': '#10B981', 'flor': '#F43F5E', 'cereal': '#EAB308',
  'leguminosa': '#84CC16', 'trepadora': '#EC4899', 'apoyo': '#6366F1'
};

export const strataOrder = {
  'Estrato Emergente': 1, 'Estrato Alto': 2, 'Estrato Medio': 3, 'Estrato Bajo': 4,
  'Estrato Subterráneo': 5, 'Cobertura / Rastrero': 6, 'Funcionales': 7, 'Trepadoras / Verticales': 8, 'Casos Especiales': 9
};

export const rawBeingsData = [
  { id: 'b_aguacatero', name: 'Aguacatero', cat: 'Estrato Emergente', icon: '🥑', role: 'Estructura.' },
  { id: 'b_mango', name: 'Mango', cat: 'Estrato Emergente', icon: '🥭', role: 'Estructura.' },
  { id: 'b_olivo', name: 'Olivo', cat: 'Estrato Emergente', icon: '🫒', role: 'Estructura.' },
  { id: 'b_almendro', name: 'Almendro', cat: 'Estrato Emergente', icon: '🌸', role: 'Estructura.' },
  { id: 'b_naranjero', name: 'Naranjero', cat: 'Estrato Emergente', icon: '🍊', role: 'Estructura.' },
  { id: 'b_limonero', name: 'Limonero', cat: 'Estrato Emergente', icon: '🍋', role: 'Estructura.' },
  { id: 'b_mandarino', name: 'Mandarino', cat: 'Estrato Emergente', icon: '🍊', role: 'Estructura.' },
  { id: 'b_higuera', name: 'Higuera', cat: 'Estrato Alto', icon: '🌿', role: 'Productivo principal.' },
  { id: 'b_manzanero', name: 'Manzanero', cat: 'Estrato Alto', icon: '🍎', role: 'Productivo principal.' },
  { id: 'b_peral', name: 'Peral', cat: 'Estrato Alto', icon: '🍐', role: 'Productivo principal.' },
  { id: 'b_melocotonero', name: 'Melocotonero', cat: 'Estrato Alto', icon: '🍑', role: 'Productivo principal.' },
  { id: 'b_nispero', name: 'Níspero', cat: 'Estrato Alto', icon: '🍑', role: 'Productivo principal.' },
  { id: 'b_guayabo', name: 'Guayabo', cat: 'Estrato Alto', icon: '🍈', role: 'Productivo principal.' },
  { id: 'b_papayo', name: 'Papayo', cat: 'Estrato Alto', icon: '🍈', role: 'Productivo principal.' },
  { id: 'b_cafetero', name: 'Cafetero', cat: 'Estrato Alto', icon: '☕', role: 'Productivo principal.' },
  { id: 'b_lavanda', name: 'Lavanda', cat: 'Estrato Medio', icon: '🪻', role: 'Regulación.' },
  { id: 'b_salvia', name: 'Salvia', cat: 'Estrato Medio', icon: '🌱', role: 'Regulación.' },
  { id: 'b_artemisa', name: 'Artemisa', cat: 'Estrato Medio', icon: '🌿', role: 'Regulación.' },
  { id: 'b_manzanilla', name: 'Manzanilla', cat: 'Estrato Medio', icon: '🌼', role: 'Regulación.' },
  { id: 'b_lechugas', name: 'Lechugas', cat: 'Estrato Bajo', icon: '🥬', role: 'Ciclo corto.' },
  { id: 'b_calabacin', name: 'Calabacín', cat: 'Estrato Bajo', icon: '🥒', role: 'Ciclo corto.' },
  { id: 'b_berenjena', name: 'Berenjena', cat: 'Estrato Bajo', icon: '🍆', role: 'Ciclo corto.' },
  { id: 'b_pimientos', name: 'Pimientos', cat: 'Estrato Bajo', icon: '🫑', role: 'Ciclo corto.' },
  { id: 'b_acelgas', name: 'Acelgas', cat: 'Estrato Bajo', icon: '🥬', role: 'Ciclo corto.' },
  { id: 'b_apio', name: 'Apio', cat: 'Estrato Bajo', icon: '🌿', role: 'Ciclo corto.' },
  { id: 'b_beroles', name: 'Beroles', cat: 'Estrato Bajo', icon: '🪴', role: 'Ciclo corto.' },
  { id: 'b_patatas', name: 'Patatas', cat: 'Estrato Subterráneo', icon: '🥔', role: 'Trabajo suelo.' },
  { id: 'b_remolacha', name: 'Remolacha', cat: 'Estrato Subterráneo', icon: '🧅', role: 'Trabajo suelo.' },
  { id: 'b_batata', name: 'Batata', cat: 'Estrato Subterráneo', icon: '🍠', role: 'Trabajo suelo.' },
  { id: 'b_cebollas', name: 'Cebollas', cat: 'Estrato Subterráneo', icon: '🧅', role: 'Trabajo suelo.' },
  { id: 'b_puerro', name: 'Puerro', cat: 'Estrato Subterráneo', icon: '🧄', role: 'Trabajo suelo.' },
  { id: 'b_fresas', name: 'Fresas', cat: 'Cobertura / Rastrero', icon: '🍓', role: 'Protección suelo.' },
  { id: 'b_tomillo', name: 'Tomillo', cat: 'Funcionales', icon: '🌿', role: 'Equilibrio.' },
  { id: 'b_oregano', name: 'Orégano', cat: 'Funcionales', icon: '🍃', role: 'Equilibrio.' },
  { id: 'b_perejil', name: 'Perejil', cat: 'Funcionales', icon: '🌿', role: 'Equilibrio.' },
  { id: 'b_cilantro', name: 'Cilantro', cat: 'Funcionales', icon: '🌱', role: 'Equilibrio.' },
  { id: 'b_poleo', name: 'Poleo', cat: 'Funcionales', icon: '🌿', role: 'Equilibrio.' },
  { id: 'b_judias', name: 'Judías', cat: 'Trepadoras / Verticales', icon: '🫘', role: 'Vertical.' },
  { id: 'b_tomatero', name: 'Tomatero', cat: 'Trepadoras / Verticales', icon: '🍅', role: 'Vertical.' },
  { id: 'b_fisalis', name: 'Fisalis', cat: 'Trepadoras / Verticales', icon: '🍒', role: 'Vertical.' },
  { id: 'b_maracuya', name: 'Maracuyá', cat: 'Trepadoras / Verticales', icon: '🌸', role: 'Vertical.' },
  { id: 'b_platanera', name: 'Platanera', cat: 'Casos Especiales', icon: '🍌', role: 'Biomasa.' },
  { id: 'b_cana', name: 'Caña', cat: 'Casos Especiales', icon: '🎋', role: 'Biomasa.' },
  { id: 'b_tunos', name: 'Tunos', cat: 'Casos Especiales', icon: '🌵', role: 'Frontera.' },
  { id: 'b_lirios', name: 'Lirios', cat: 'Casos Especiales', icon: '🪷', role: 'Agua.' }
];

export const extendedBeingsLibrary = [
  { name: "Aguacatero", icon: "🥑", cat: "frutal", role: "emergente" },
  { name: "Mango", icon: "🥭", cat: "frutal", role: "emergente" },
  { name: "Roble", icon: "🌳", cat: "arbol", role: "alto" },
  { name: "Lavanda", icon: "🌿", cat: "aromatica", role: "bajo" },
  { name: "Romero", icon: "🌿", cat: "aromatica", role: "bajo" },
  { name: "Aloe Vera", icon: "🌱", cat: "suculenta", role: "bajo" }
];

export const massiveBeingsLibrary = [
  { name: "Jazmín", icon: "💮", cat: "flor", role: "trepadora" },
  { name: "Buganvilla", icon: "🌺", cat: "trepadora", role: "ornamental" },
  { name: "Girasol", icon: "🌻", cat: "flor", role: "alto" },
  { name: "Tajinaste", icon: "🗼", cat: "flor", role: "endemismo" },
  { name: "Caléndula", icon: "🌼", cat: "flor", role: "apoyo" },
  { name: "Capuchina", icon: "🏵️", cat: "flor", role: "rastrera" },
  { name: "Tagete", icon: "🏵️", cat: "flor", role: "repelente" },
  { name: "Glicinia", icon: "🪻", cat: "trepadora", role: "ornamental" },
  { name: "Bignonia", icon: "🌺", cat: "trepadora", role: "ornamental" },
  { name: "Rosal", icon: "🌹", cat: "flor", role: "bajo" },
  { name: "Drago", icon: "🌴", cat: "arbol", role: "endemismo" },
  { name: "Palmera Canaria", icon: "🌴", cat: "arbol", role: "emergente" },
  { name: "Pino Canario", icon: "🌲", cat: "arbol", role: "emergente" },
  { name: "Moringa", icon: "🌿", cat: "arbol", role: "biomasa rápida" },
  { name: "Eucalipto", icon: "🌳", cat: "arbol", role: "biomasa" },
  { name: "Laurel", icon: "🌳", cat: "arbol", role: "alto" },
  { name: "Encina", icon: "🌳", cat: "arbol", role: "alto" },
  { name: "Pino", icon: "🌲", cat: "arbol", role: "alto" },
  { name: "Castaño", icon: "🌰", cat: "arbol", role: "alto" },
  { name: "Nogal", icon: "🌳", cat: "arbol", role: "alto" },
  { name: "Macadamia", icon: "🌳", cat: "arbol", role: "alto" },
  { name: "Sauce", icon: "🌳", cat: "arbol", role: "agua" },
  { name: "Vetiver", icon: "🌾", cat: "apoyo", role: "retención suelo" },
  { name: "Consuelda", icon: "🍃", cat: "apoyo", role: "acumulador dinámico" },
  { name: "Milenrama", icon: "🌿", cat: "apoyo", role: "acumulador dinámico" },
  { name: "Menta", icon: "🌿", cat: "aromatica", role: "rastrera" },
  { name: "Albahaca", icon: "🌱", cat: "aromatica", role: "bajo" },
  { name: "Ruda", icon: "🌿", cat: "aromatica", role: "repelente" },
  { name: "Hierbabuena", icon: "🌿", cat: "aromatica", role: "bajo" },
  { name: "Zanahoria", icon: "🥕", cat: "Estrato Subterráneo", role: "ciclo corto" },
  { name: "Rábano", icon: "🫥", cat: "Estrato Subterráneo", role: "descompactador" },
  { name: "Ajo", icon: "🧄", cat: "Estrato Subterráneo", role: "repelente" },
  { name: "Maíz", icon: "🌽", cat: "cereal", role: "vertical" },
  { name: "Garbanzo", icon: "🌱", cat: "leguminosa", role: "fijador N" },
  { name: "Lenteja", icon: "🌱", cat: "leguminosa", role: "fijador N" },
  { name: "Sorgo", icon: "🌾", cat: "cereal", role: "biomasa" },
  { name: "Passiflora", icon: "🌸", cat: "trepadora", role: "frutal" },
  { name: "Kiwano", icon: "🍈", cat: "frutal", role: "trepadora" },
  { name: "Frambueso", icon: "🍓", cat: "frutal", role: "medio" },
  { name: "Zarzamora", icon: "🫐", cat: "frutal", role: "trepadora" },
  { name: "Arándano", icon: "🫐", cat: "frutal", role: "bajo" },
  { name: "Vid / Parra", icon: "🍇", cat: "trepadora", role: "frutal" },
  { name: "Pitaya", icon: "🌵", cat: "suculenta", role: "frutal trepador" },
  { name: "Nopal", icon: "🌵", cat: "suculenta", role: "frontera" },
  { name: "Agave", icon: "🌵", cat: "suculenta", role: "frontera" },
  { name: "Bambú", icon: "🎋", cat: "Casos Especiales", role: "biomasa extrema" },
  { name: "Helecho", icon: "🌿", cat: "Estrato Bajo", role: "sombra" },
  { name: "Loto", icon: "🪷", cat: "Casos Especiales", role: "agua" },
  { name: "Nenúfar", icon: "🪷", cat: "Casos Especiales", role: "agua" }
];

export const ecologicalRules = {
  avoid: [
    { target: "Eucalipto", affects: ["Estrato Bajo", "hortaliza"], msg: "El eucalipto extrae demasiada agua y tiene un efecto alelopático severo sobre estratos inferiores." },
    { target: "Nogal", affects: ["Estrato Bajo", "Estrato Medio"], msg: "El nogal libera juglona en el suelo, lo cual es tóxico para la mayoría de plantas que crecen a su alrededor." }
  ],
  synergy: [
    { catA: "leguminosa", catB: "Estrato Alto", msg: "Excelente asociación: Las leguminosas están fijando nitrógeno atmosférico para los árboles de gran porte." },
    { catA: "aromatica", catB: "Estrato Bajo", msg: "Defensa natural: Las aromáticas están enmascarando olores y protegiendo los cultivos bajos contra plagas." }
  ]
};
