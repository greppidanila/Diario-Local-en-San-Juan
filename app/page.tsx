'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Search, 
  Facebook, 
  Instagram, 
  Twitter, 
  MessageCircle, 
  ChevronRight, 
  Clock,
  Menu,
  X,
  Send
} from 'lucide-react';

// --- DATA ---
const headlines = [
  "El gobernador presentó el plan de obras públicas para 2026",
  "Nueva licitación minera por $500 millones en Calingasta",
  "San Juan suma 1.200 puestos de trabajo en el sector privado",
  "Vecinos reclaman por el estado de las calles en Rawson",
  "Operativo policial en el centro: tres detenidos",
];

const categories = {
  gestion: { name: "Gestión Pública", color: "bg-[#009639]" },
  mineria: { name: "Minería & Desarrollo", color: "bg-[#1e293b]" },
  empleo: { name: "Empleo & Producción", color: "bg-[#1d4ed8]" },
  sociedad: { name: "Sociedad", color: "bg-purple-700" },
  policiales: { name: "Policiales", color: "bg-red-700" },
};

const newsItems = [
  {
    id: 1,
    title: "El gobernador presentó el plan de obras públicas para 2026",
    excerpt: "El ambicioso plan incluye la construcción de nuevos hospitales y la mejora de la red vial en departamentos alejados de la capital. Se espera una inversión sin precedentes para el próximo bienio.",
    content: "En un acto multitudinario frente a la Casa de Gobierno, el primer mandatario provincial detalló los ejes de su gestión para el año entrante. El plan contempla 15 nuevos centros de salud y la repavimentación de rutas clave para la producción minera y agrícola. 'Es un compromiso con cada sanjuanino', afirmó el gobernador. Además, se anunció la creación de un fondo especial para emergencias climáticas. El presupuesto ha sido aprobado por la legislatura con amplio consenso.",
    category: "gestion",
    date: "29 ABR 2026",
    image: "https://picsum.photos/seed/sanjuan1/800/600",
    featured: true
  },
  {
    id: 2,
    title: "Nueva licitación minera por $500 millones en Calingasta",
    excerpt: "El proyecto busca reactivar la extracción en zonas antes inexploradas, prometiendo un impacto económico masivo.",
    content: "La Secretaría de Minería de la Nación, en conjunto con el Ministerio de Minería de San Juan, lanzó oficialmente la convocatoria para empresas interesadas en el yacimiento 'Calingasta Norte'. La inversión inicial de 500 millones de dólares se destinará a infraestructura básica y exploración profunda. Se estima que el proyecto generará ingresos por regalías que duplicarán el presupuesto actual del departamento.",
    category: "mineria",
    date: "29 ABR 2026",
    image: "https://picsum.photos/seed/sanjuan2/800/600"
  },
  {
    id: 3,
    title: "San Juan suma 1.200 puestos de trabajo en el sector privado",
    excerpt: "Nuevas radicaciones industriales y expansión del sector servicios impulsan el empleo registrado.",
    content: "Según el último informe de la Secretaría de Industria, la provincia ha logrado marcar un hito en la generación de empleo durante el primer trimestre del año. Las industrias tecnológicas y textiles han sido las más dinámicas. El gobierno provincial ofrece beneficios fiscales para las empresas que contraten mano de obra local. 'Estamos viendo los frutos de la estabilidad jurídica', señaló el ministro de Economía.",
    category: "empleo",
    date: "28 ABR 2026",
    image: "https://picsum.photos/seed/sanjuan3/800/600"
  },
  {
    id: 4,
    title: "Vecinos reclaman por el estado de las calles en Rawson",
    excerpt: "Un grupo de manifestantes cortó parcialmente una avenida pidiendo soluciones urgentes al municipio.",
    content: "La situación de las arterias principales en el departamento Rawson ha llegado a un punto crítico según los propios vecinos. Los baches y la falta de señalización han causado múltiples incidentes menores en las últimas semanas. Las autoridades municipales aseguran que ya hay un plan bacheo en marcha, pero los plazos no convencen a los frentistas afectados.",
    category: "sociedad",
    date: "28 ABR 2026",
    image: "https://picsum.photos/seed/sanjuan4/800/600"
  }
];

const categoryNews = {
  gestion: [
    { id: 101, title: "El intendente anunció mejoras en el sistema de salud municipal", date: "27 ABR 2026", image: "https://picsum.photos/seed/sanjuan5/400/300" },
    { id: 102, title: "Nuevas luminarias LED en barrios del Gran San Juan", date: "26 ABR 2026", image: "https://picsum.photos/seed/sanjuan6/400/300" },
    { id: 103, title: "Plan de arborización provincial: 5.000 nuevos ejemplares", date: "25 ABR 2026", image: "https://picsum.photos/seed/sanjuan7/400/300" },
  ],
  mineria: [
    { id: 201, title: "Minera Lundin Gold expande operaciones en la provincia", date: "27 ABR 2026", image: "https://picsum.photos/seed/sanjuan8/400/300" },
    { id: 202, title: "Veladero reporta récord de producción sustentable", date: "26 ABR 2026", image: "https://picsum.photos/seed/sanjuan9/400/300" },
    { id: 203, title: "Encuentro nacional de proveedores mineros en San Juan", date: "25 ABR 2026", image: "https://picsum.photos/seed/sanjuan10/400/300" },
  ],
  empleo: [
    { id: 301, title: "Convocatoria abierta: 300 empleos en el sector minero", date: "27 ABR 2026", image: "https://picsum.photos/seed/sanjuan11/400/300" },
    { id: 302, title: "Feria del Empleo Joven: más de 50 empresas presentes", date: "26 ABR 2026", image: "https://picsum.photos/seed/sanjuan12/400/300" },
    { id: 303, title: "Cursos de capacitación en oficios digitales para desempleados", date: "25 ABR 2026", image: "https://picsum.photos/seed/sanjuan13/400/300" },
  ]
};

const latestNews = [
  { id: 501, title: "Asamblea vecinal en Rivadavia por el uso del espacio público", category: "sociedad", date: "29 ABR", fullDate: "2026-04-29", image: "https://picsum.photos/seed/sanjuan14/400/300", excerpt: "Vecinos se reunieron para debatir sobre la instalación de nuevos foodtrucks en plazas del barrio.", content: "La plaza departamental de Rivadavia fue el escenario de una intensa discusión ciudadana. Mientras algunos ven con ojos positivos la dinámica comercial, otros temen por la limpieza y la tranquilidad nocturna. El Concejo Deliberante actuará como mediador en el conflicto." },
  { id: 502, title: "Operativo policial en el centro: tres detenidos", category: "policiales", date: "29 ABR", fullDate: "2026-04-29", image: "https://picsum.photos/seed/sanjuan15/400/300", excerpt: "Efectivos de la Comisaría 1ra desbarataron una banda dedicada al robo de neumáticos.", content: "Tras semanas de investigación, la brigada central logró capturar a tres individuos infraganti mientras operaban en la zona de las clínicas céntricas. Se secuestró un vehículo y herramientas de alta precisión." },
  { id: 503, title: "Allanamiento en barrio Marquesado: secuestran mercadería ilegal", category: "policiales", date: "28 ABR", fullDate: "2026-04-28", image: "https://picsum.photos/seed/sanjuan16/400/300", excerpt: "Un galpón clandestino almacenaba artículos sin documentación de aduana.", content: "La Policía de San Juan, actuando bajo orden del juez federal, ingresó a una propiedad en Marquesado donde se hallaron miles de bultos con indumentaria y electrónica sin aval aduanero correspondiente." },
  { id: 504, title: "Calingasta: habilitan nuevo puente sobre el Río Castaño", category: "gestion", date: "28 ABR", fullDate: "2026-04-28", image: "https://picsum.photos/seed/sanjuan17/400/300", excerpt: "La obra mejora la conectividad de los productores locales durante la temporada de deshielo.", content: "Vialidad Provincial entregó finalmente la obra del puente 'Castaño II'. Con una estructura reforzada para soportar grandes caudales, el paso asegura que el departamento no quede aislado durante la creciente de los ríos." },
  { id: 505, title: "Estudiantes sanjuaninos premiados en feria de ciencias", category: "sociedad", date: "27 ABR", fullDate: "2026-04-27", image: "https://picsum.photos/seed/sanjuan18/400/300", excerpt: "Un proyecto sobre riego solar automatizado ganó la medalla de oro en la etapa nacional.", content: "Alumnos de la Escuela Industrial Domingo Faustino Sarmiento representaron a San Juan en Buenos Aires obteniendo el máximo galardón por un sistema de riego eficiente pensado para zonas áridas." },
  { id: 506, title: "Censo de minería artesanal: resultados preliminares", category: "mineria", date: "27 ABR", fullDate: "2026-04-27", image: "https://picsum.photos/seed/sanjuan19/400/300", excerpt: "El estudio revela que más de 200 familias dependen directamente de la extracción de bentonita.", content: "El relevamiento realizado por Desarrollo Minero busca formalizar a los pequeños productores para que accedan a créditos y seguros de salud. 'Es un sector que queremos visibilizar', dijeron desde el ministerio." },
  { id: 507, title: "Inauguran nuevo polideportivo en Pocito", category: "gestion", date: "26 ABR", fullDate: "2026-04-26", image: "https://picsum.photos/seed/sanjuan20/400/300", excerpt: "El complejo cuenta con canchas profesionales de voley y básquet.", content: "El municipio de Pocito suma un espacio recreativo de gran magnitud. El polideportivo servirá como epicentro para las ligas locales y escuelas deportivas gratuitas. Durante la inauguración hubo exhibiciones de patín artístico." },
  { id: 508, title: "Alerta por tormentas: Defensa Civil pide precaución", category: "sociedad", date: "26 ABR", fullDate: "2026-04-26", image: "https://picsum.photos/seed/sanjuan21/400/300", excerpt: "Se esperan ráfagas fuertes y caída de granizo en el Valle del Tulúm.", content: "Las condiciones meteorológicas son inestables por el ingreso de un frente frío. Se recomienda no dejar vehículos bajo árboles y asegurar elementos que puedan volar. Las zonas cordilleranas podrían registrar nevadas leves." },
  { id: 509, title: "Capacitación minera para egresados de escuelas técnicas", category: "empleo", date: "25 ABR", fullDate: "2026-04-25", image: "https://picsum.photos/seed/sanjuan22/400/300", excerpt: "Empresas del sector ofrecen becas para especialización en operación de maquinaria pesada.", content: "Gracias a un convenio público-privado, 50 jóvenes sanjuaninos podrán capacitarse con simuladores de última generación para operar camiones mineros. El curso dura seis meses e incluye pasantías pagas." },
  { id: 510, title: "Búsqueda activa: Ingenieros y Geólogos para proyeto Josemaría", category: "empleo", date: "25 ABR", fullDate: "2026-04-25", image: "https://picsum.photos/seed/sanjuan23/400/300", excerpt: "El gigante minero abre su etapa de contratación de alta jerarquía.", content: "Deprominsa inició el proceso de selección de perfiles técnicos superiores. Los puestos requieren residencia en San Juan y experiencia en alta montaña. Es una de las búsquedas más esperadas del año en el rubro." },
];


const mostRead = [
  "Cronograma de pagos y aguinaldo: cuándo cobran los estatales",
  "Minería: San Juan lidera la atracción de inversiones en el país",
  "Nuevas vacantes en el proyecto minero Josemaría",
  "Alerta Zonda: recomendaciones de Defensa Civil",
  "¿Cómo suscribirse al Canal de WhatsApp del Diario de San Juan?"
];

// --- COMPONENTS ---

const CategoryBadge = ({ category }: { category: string }) => {
  const cat = categories[category as keyof typeof categories] || { name: category, color: "bg-gray-500" };
  return (
    <span className={`px-2 py-1 text-[10px] lowercase font-black text-white ${cat.color} tracking-wider inline-block mb-1`}>
      {cat.name}
    </span>
  );
};

const NewsModal = ({ article, isOpen, onClose }: { article: any, isOpen: boolean, onClose: () => void }) => {
  if (!isOpen || !article) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
      />
      <motion.div 
        layoutId={`article-${article.id}`}
        initial={{ scale: 0.95, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        className="relative bg-white w-full max-w-4xl max-h-[95vh] overflow-y-auto shadow-2xl rounded-none md:rounded-sm"
      >
        <button 
          onClick={onClose}
          className="absolute top-2 right-2 md:top-4 md:right-4 z-50 p-2 bg-black/50 text-white hover:bg-black transition-colors rounded-full"
        >
          <X className="w-5 h-5 md:w-6 md:h-6" />
        </button>

        <div className="relative aspect-video w-full bg-gray-100">
          <Image 
            src={article.image.replace('400/300', '800/600')} 
            alt={article.title} 
            fill 
            className="object-cover"
            referrerPolicy="no-referrer"
          />
        </div>

        <div className="p-5 md:p-10">
          <div className="flex flex-wrap items-center gap-3 mb-4">
             <CategoryBadge category={article.category} />
             <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{article.date}</span>
          </div>
          
          <h2 className="text-xl md:text-4xl font-black text-gray-900 leading-tight mb-6">
            {article.title}
          </h2>

          <div className="flex items-center space-x-4 mb-8 border-y border-gray-100 py-4">
             <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-[#009639] flex-shrink-0 flex items-center justify-center text-white font-black text-xs md:text-sm">DSJ</div>
             <div className="flex flex-col min-w-0">
                <span className="text-[10px] md:text-xs font-black uppercase text-gray-900 truncate">Redacción Diario de San Juan</span>
                <span className="text-[9px] md:text-[10px] text-gray-500 font-bold uppercase tracking-widest">Hace 2 horas</span>
             </div>
             <div className="flex-grow"></div>
             <div className="flex space-x-1 md:space-x-2">
                <button className="p-2 bg-gray-100 text-gray-600 hover:bg-[#009639] hover:text-white transition-colors rounded-sm"><Facebook className="w-3 h-3 md:w-4 md:h-4" /></button>
                <button className="p-2 bg-gray-100 text-gray-600 hover:bg-[#25D366] hover:text-white transition-colors rounded-sm"><MessageCircle className="w-3 h-3 md:w-4 md:h-4" /></button>
             </div>
          </div>

          <p className="text-base md:text-lg font-bold text-gray-700 leading-relaxed mb-6 border-l-4 border-[#009639] pl-4 md:pl-6 italic">
            {article.excerpt}
          </p>

          <div className="prose prose-sm md:prose-lg max-w-none text-gray-600 font-medium space-y-4">
            <p>{article.content || "Contenido en desarrollo. Esta nota está siendo actualizada minuto a minuto para brindarle la mejor información institucional de la provincia de San Juan."}</p>
            <p>San Juan sigue marcando el camino en la región con políticas claras y transparentes. Las autoridades locales invitan a la comunidad a participar de los canales oficiales de información para evitar la propagación de noticias falsas.</p>
          </div>

          <div className="mt-12 pt-8 border-t border-gray-100 grid grid-cols-1 md:grid-cols-2 gap-6">
             <AdBanner width={300} height={100} className="w-full" />
             <div className="bg-gray-50 p-5 md:p-6 flex flex-col items-center justify-center text-center">
                <h5 className="font-black text-[10px] md:text-xs uppercase tracking-widest mb-2">Suscríbete a alertas</h5>
                <div className="flex w-full">
                  <input type="text" placeholder="Correo..." className="bg-white border border-gray-200 px-3 py-2 text-xs flex-grow outline-none" />
                  <button className="bg-black text-white px-4 py-2"><Send className="w-4 h-4" /></button>
                </div>
             </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

const AdBanner = ({ width, height, className }: { width: number, height: number, className?: string }) => (
  <div 
    className={`border-2 border-dashed border-gray-300 bg-gray-100 flex flex-col items-center justify-center text-gray-400 p-4 transition-colors hover:border-gray-400 w-full overflow-hidden ${className}`}
    style={{ minHeight: height }}
    id={`ad-${width}x${height}`}
  >
    <div className="flex items-center space-x-2 mb-1">
      <span className="text-[10px] font-bold uppercase tracking-widest underline decoration-[#009639]">Publicidad</span>
    </div>
    <span className="text-xs font-black text-gray-400 text-center uppercase tracking-tighter">Espacio publicitario disponible</span>
    <span className="text-[9px] mt-1 font-mono opacity-50">{width} x {height} px</span>
  </div>
);

const BreakingNews = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % headlines.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-[#009639] text-white py-2 overflow-hidden border-b border-black/10">
      <div className="container mx-auto px-4 flex items-center">
        <div className="flex-shrink-0 bg-white text-[#009639] px-3 py-0.5 text-xs font-black uppercase tracking-tighter mr-4 italic">
          ÚLTIMO MOMENTO
        </div>
        <div className="relative h-6 flex-grow overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0 flex items-center text-sm font-semibold truncate hover:underline cursor-pointer"
            >
              {headlines[index]}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default function LandingPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedArticle, setSelectedArticle] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [dateFilter, setDateFilter] = useState('');

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "NewsMediaOrganization",
    "name": "Diario de San Juan",
    "url": "https://diariosanjuan.com.ar",
    "logo": "https://diariosanjuan.com.ar/logo.png",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "San Juan",
      "addressRegion": "SJ",
      "addressCountry": "AR"
    }
  };

  const filteredNews = latestNews.filter((item) => {
    const matchesFilter = activeFilter === 'all' || item.category === activeFilter;
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          (item.excerpt && item.excerpt.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesDate = !dateFilter || item.fullDate === dateFilter;
    return matchesFilter && matchesSearch && matchesDate;
  }).slice(0, 10);

  return (
    <div className="flex flex-col min-h-screen">
      {/* SEO Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      {/* MODAL */}
      <AnimatePresence>
        {selectedArticle && (
          <NewsModal 
            article={selectedArticle} 
            isOpen={!!selectedArticle} 
            onClose={() => setSelectedArticle(null)} 
          />
        )}
      </AnimatePresence>

      {/* HEADER */}
      <header className="bg-white border-b-4 border-[#009639] sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <div className="flex items-center space-x-2 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
              <div className="w-10 h-10 bg-[#009639] flex items-center justify-center">
                <span className="text-white font-black text-2xl">D</span>
              </div>
              <div className="flex flex-col">
                <h1 className="text-2xl font-black tracking-tighter leading-none text-gray-900">
                  DIARIO <span className="text-[#009639]">DE SAN JUAN</span>
                </h1>
                <span className="text-[10px] font-bold text-gray-500 tracking-[0.2em] uppercase">Excelencia Informativa</span>
              </div>
            </div>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center space-x-6">
              {["Inicio", "Gestión Pública", "Minería", "Empleo", "Sociedad", "Policiales", "Contacto"].map((item) => (
                <a 
                  key={item} 
                  href="#" 
                  className="text-[11px] font-black uppercase tracking-[0.1em] text-gray-700 hover:text-[#009639] transition-colors"
                >
                  {item}
                </a>
              ))}
            </nav>

            <div className="hidden xl:flex items-center space-x-6 border-l border-gray-100 pl-6">
                <div className="flex flex-col items-end">
                   <p className="text-[9px] font-black text-[#009639] leading-none uppercase tracking-widest">Pauta Comercial</p>
                   <a href="#" className="text-[9px] font-bold text-gray-400 hover:text-black transition-colors uppercase">Anuncie aquí</a>
                </div>
                <div className="flex space-x-3">
                  <a href="#" className="hover:text-[#009639] transition-colors"><Facebook className="w-4 h-4" /></a>
                  <a href="#" className="hover:text-[#009639] transition-colors"><Instagram className="w-4 h-4" /></a>
                  <a href="#" className="hover:text-[#009639] transition-colors" title="TikTok Oficial">
                    <svg className="w-4 h-4 border border-current rounded-full p-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" /></svg>
                  </a>
                </div>
            </div>

            {/* Search */}
            <div className="hidden md:flex items-center bg-gray-100 px-3 py-1.5 rounded-none border border-gray-200">
              <input 
                type="text" 
                placeholder="Buscar noticia..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-transparent border-none outline-none text-xs w-48 font-medium"
              />
              <Search className="w-4 h-4 text-gray-500" />
            </div>

            {/* Mobile Menu Toggle */}
            <button className="lg:hidden p-2" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="lg:hidden bg-white border-t border-gray-100 overflow-hidden"
            >
              <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
                {["Inicio", "Gestión Pública", "Minería", "Empleo", "Sociedad", "Policiales", "Contacto"].map((item) => (
                  <a key={item} href="#" className="font-bold text-lg uppercase tracking-tight py-2 border-b border-gray-50">
                    {item}
                  </a>
                ))}
                <div className="flex items-center bg-gray-100 px-3 py-3">
                  <input type="text" placeholder="Buscar..." className="bg-transparent w-full outline-none" />
                  <Search className="w-5 h-5 text-gray-400" />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* BREAKING NEWS */}
      <BreakingNews />

      <main className="container mx-auto px-4 py-8 flex-grow">
        {/* HERO GRID */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
          {/* Main Featured */}
          <div className="lg:col-span-8 flex flex-col">
            <div 
              className="relative group cursor-pointer overflow-hidden aspect-[16/9] mb-4 bg-gray-200"
              onClick={() => setSelectedArticle(newsItems[0])}
            >
              <Image 
                src={newsItems[0].image} 
                alt={newsItems[0].title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-6 md:p-10">
                <CategoryBadge category={newsItems[0].category} />
                <h2 className="text-2xl md:text-4xl font-black text-white mt-2 mb-3 leading-tight group-hover:underline decoration-white/30 decoration-2">
                  {newsItems[0].title}
                </h2>
                <p className="text-gray-200 text-sm md:text-base line-clamp-2 max-w-2xl font-medium">
                  {newsItems[0].excerpt}
                </p>
                <div className="flex items-center mt-6 text-white/50 text-xs font-bold space-x-4">
                  <span className="flex items-center"><Clock className="w-3 h-3 mr-1" /> {newsItems[0].date}</span>
                </div>
              </div>
            </div>

            {/* Secondary Hero Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {newsItems.slice(1).map((item) => (
                <div key={item.id} className="group cursor-pointer" onClick={() => setSelectedArticle(item)}>
                  <div className="relative aspect-[16/10] overflow-hidden mb-3 bg-gray-100">
                    <Image 
                      src={item.image} 
                      alt={item.title} 
                      fill 
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <CategoryBadge category={item.category} />
                  <h3 className="font-bold text-base mt-1 leading-tight group-hover:text-[#009639] transition-colors line-clamp-2">
                    {item.title}
                  </h3>
                  <div className="text-[10px] font-bold text-gray-400 mt-2 uppercase">{item.date}</div>
                </div>
              ))}
            </div>
          </div>

          {/* SIDEBAR */}
          <aside className="lg:col-span-4 flex flex-col space-y-8">
            {/* WHATSAPP CTA - ALTA PRIORIDAD */}
            <div className="bg-[#25D366] p-6 text-white shadow-xl relative overflow-hidden group cursor-pointer border-b-4 border-black/20">
               <div className="absolute top-0 right-0 -mr-4 -mt-4 opacity-10 group-hover:scale-110 transition-transform duration-500">
                  <MessageCircle className="w-32 h-32" />
               </div>
               <div className="relative z-10">
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] mb-2 text-white/80">Canal Exclusivo</p>
                  <h4 className="text-xl font-black uppercase tracking-tighter mb-4 leading-tight">Únete al Canal de WhatsApp Oficial</h4>
                  <p className="text-[10px] font-bold text-white/70 uppercase mb-5">Recibe las noticias de gestión y mineria antes que nadie.</p>
                  <button className="bg-white text-[#25D366] px-5 py-2.5 font-black text-[10px] uppercase tracking-widest hover:bg-gray-100 transition-colors flex items-center">
                     SUSCRIBIRME <ChevronRight className="w-3 h-3 ml-1" />
                  </button>
               </div>
            </div>

            {/* PUBLICIDAD SIDEBAR */}
            <div className="bg-gray-50 border-2 border-dashed border-gray-200 p-8 flex flex-col items-center justify-center text-center group hover:border-[#009639] transition-colors cursor-pointer bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]">
               <div className="w-12 h-12 bg-white rounded-full shadow-sm flex items-center justify-center mb-4 text-gray-400 group-hover:text-[#009639] transition-colors">
                  <Send className="w-6 h-6" />
               </div>
               <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1">Pauta Publicitaria</p>
               <h5 className="text-xs font-black text-gray-800 uppercase tracking-tighter leading-tight mb-4">Posicione su marca frente a los líderes de la provincia</h5>
               <button className="text-[10px] font-black text-[#009639] border-b border-[#009639] pb-0.5">PUBLICITE CON NOSOTROS</button>
            </div>

            {/* Most Read */}
            <div className="bg-white border-t-4 border-gray-900 shadow-sm p-6">
              <h4 className="text-lg font-black uppercase tracking-tighter mb-6 flex items-center">
                LO MÁS LEÍDO
                <span className="ml-2 w-full h-[2px] bg-gray-100 flex-grow"></span>
              </h4>
              <div className="flex flex-col space-y-5">
                {mostRead.map((title, i) => (
                  <div key={i} className="flex space-x-4 group cursor-pointer">
                    <span className="text-4xl font-black text-gray-100 group-hover:text-[#009639] transition-colors leading-none italic">{i + 1}</span>
                    <p className="text-sm font-bold leading-tight group-hover:underline">
                      {title}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Side Ad */}
            <AdBanner width={300} height={250} className="w-full" />

            {/* Socials */}
            <div className="bg-white border border-gray-100 p-6">
              <h4 className="text-sm font-black uppercase tracking-widest text-gray-400 mb-6">SÍGUENOS</h4>
              <div className="grid grid-cols-2 gap-3">
                <button className="flex items-center justify-center space-x-2 py-3 bg-black text-white text-[10px] font-bold uppercase tracking-widest hover:opacity-80 transition-opacity">
                  <Instagram className="w-4 h-4" /> <span>Instagram</span>
                </button>
                <button className="flex items-center justify-center space-x-2 py-3 bg-[#1D9BF0] text-white text-[10px] font-bold uppercase tracking-widest hover:opacity-80 transition-opacity">
                  <Twitter className="w-4 h-4" /> <span>X News</span>
                </button>
                <button className="flex items-center justify-center space-x-2 py-3 bg-[#1877F2] text-white text-[10px] font-bold uppercase tracking-widest hover:opacity-80 transition-opacity">
                  <Facebook className="w-4 h-4" /> <span>Facebook</span>
                </button>
                <button className="flex items-center justify-center space-x-2 py-3 bg-[#25D366] text-white text-[10px] font-bold uppercase tracking-widest hover:opacity-80 transition-opacity">
                  <MessageCircle className="w-4 h-4" /> <span>WhatsApp</span>
                </button>
              </div>
            </div>
          </aside>
        </section>

        {/* CATEGORY SECTIONS FIXED */}
        <section className="space-y-12 mb-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {Object.entries(categoryNews).map(([key, items]) => (
              <div key={key} className="flex flex-col">
                <div className="flex items-center justify-between mb-6 border-b-2 border-gray-900 pb-2">
                  <h3 className="text-xl font-black uppercase tracking-tighter">
                    {categories[key as keyof typeof categories].name}
                  </h3>
                  <a href="#" className="text-[10px] font-black uppercase tracking-widest text-[#009639] flex items-center hover:underline">
                    VER TODO <ChevronRight className="w-3 h-3 ml-0.5" />
                  </a>
                </div>
                <div className="flex flex-col space-y-6">
                  {items.map((item, i) => (
                    <div key={item.id} className="flex space-x-4 group cursor-pointer" onClick={() => setSelectedArticle({ ...item, category: key })}>
                      <div className="relative w-24 h-24 flex-shrink-0 overflow-hidden bg-gray-50">
                        <Image 
                          src={item.image} 
                          alt={item.title} 
                          fill 
                          className="object-cover group-hover:scale-110 transition-transform duration-500"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                      <div>
                        <h4 className="font-bold text-sm leading-snug group-hover:text-[#009639] transition-colors line-clamp-3">
                          {item.title}
                        </h4>
                        <div className="text-[10px] font-bold text-gray-400 mt-2 flex items-center">
                          <Clock className="w-3 h-3 mr-1" /> {item.date}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* FULL WIDTH AD */}
        <div className="flex justify-center mb-16">
          <AdBanner width={728} height={90} className="w-full max-w-4xl" />
        </div>

        {/* FILTRABLE LATEST NEWS */}
        <section className="bg-white p-6 md:p-10 border border-gray-100 shadow-sm relative">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-6">
            <div className="flex flex-col sm:flex-row sm:items-center gap-6">
               <h3 className="text-3xl font-black uppercase tracking-tighter border-l-8 border-[#009639] pl-6">
                  ÚLTIMAS NOTICIAS
               </h3>
               {/* Date Filter */}
               <div className="flex items-center space-x-2 bg-gray-50 border border-gray-200 px-3 py-1.5 text-xs text-gray-600 font-bold uppercase tracking-widest">
                  <Clock className="w-4 h-4 text-gray-400" />
                  <span>Publicado:</span>
                  <input 
                    type="date" 
                    value={dateFilter}
                    onChange={(e) => setDateFilter(e.target.value)}
                    className="bg-transparent border-none outline-none font-bold uppercase" 
                  />
                  {dateFilter && (
                    <button onClick={() => setDateFilter('')} className="ml-2 hover:text-red-500"><X className="w-3 h-3" /></button>
                  )}
               </div>
            </div>
            
            {/* Filter Bar */}
            <div className="flex flex-wrap gap-2">
              <button 
                onClick={() => setActiveFilter('all')}
                className={`px-4 py-2 text-[10px] font-black uppercase tracking-widest transition-all ${activeFilter === 'all' ? 'bg-[#009639] text-white' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'}`}
              >
                Todo
              </button>
              {Object.entries(categories).map(([key, cat]) => (
                <button 
                  key={key}
                  onClick={() => setActiveFilter(key)}
                  className={`px-4 py-2 text-[10px] font-black uppercase tracking-widest transition-all ${activeFilter === key ? cat.color + ' text-white' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'}`}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-12 min-h-[400px]">
            <AnimatePresence mode="popLayout">
              {filteredNews.map((item) => (
                <motion.div 
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  className="flex flex-col group cursor-pointer" 
                  onClick={() => setSelectedArticle(item)}
                >
                  <div className="relative aspect-video mb-4 overflow-hidden bg-gray-100">
                    <Image 
                      src={item.image} 
                      alt={item.title} 
                      fill 
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-2 left-2 shadow-lg">
                       <CategoryBadge category={item.category} />
                    </div>
                  </div>
                  <h4 className="font-black text-lg leading-tight mb-3 group-hover:text-[#009639] transition-colors line-clamp-2">
                    {item.title}
                  </h4>
                  <p className="text-gray-500 text-xs font-medium line-clamp-2 mb-4 leading-relaxed">
                    {item.excerpt || "Contenido disponible ingresando a la nota para ver más detalles institucionales."}
                  </p>
                  <div className="mt-auto flex items-center text-[10px] font-bold text-gray-400 space-x-3 uppercase tracking-widest">
                    <span>{item.date}</span>
                    <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                    <span className="flex items-center text-[#009639]">Leer más <ChevronRight className="w-3 h-3 ml-1" /></span>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
          
          {filteredNews.length === 0 && (
             <div className="flex flex-col items-center justify-center py-20 text-gray-400">
                <Search className="w-12 h-12 mb-4 opacity-20" />
                <p className="font-bold uppercase tracking-widest text-xs">No se encontraron noticias con los filtros aplicados</p>
                <button 
                   onClick={() => { setActiveFilter('all'); setDateFilter(''); setSearchQuery(''); }}
                   className="mt-6 text-[10px] font-black text-gray-900 underline underline-offset-4 hover:text-[#009639]"
                >
                   Limpiar todos los filtros
                </button>
             </div>
          )}

          <div className="flex justify-center mt-16">
            <div className="text-center">
               <button className="group relative bg-gray-900 text-white px-10 py-5 font-black uppercase tracking-widest text-xs overflow-hidden transition-all hover:bg-white hover:text-black border-2 border-transparent hover:border-black shadow-2xl">
                 <span className="relative z-10 flex items-center">
                   Explorar Archivo Histórico Completo <Clock className="w-4 h-4 ml-2" />
                 </span>
               </button>
            </div>
          </div>
        </section>

        {/* PROMINENT NEWSLETTER SECTION */}
        <section className="bg-[#009639] py-16 px-4 mb-8">
           <div className="container mx-auto max-w-4xl text-center">
              <div className="inline-block p-3 bg-white text-[#009639] rounded-full mb-6">
                 <Send className="w-8 h-8" />
              </div>
              <h2 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tighter mb-4 leading-none">
                 TU PROVINCIA EN TU CORREO
              </h2>
              <p className="text-white/80 font-bold uppercase tracking-widest text-xs mb-10">
                 Suscríbete al boletín oficial del Diario de San Juan y recibe lo más importante cada mañana.
              </p>
              <form className="flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto" onSubmit={(e) => e.preventDefault()}>
                 <input 
                    type="email" 
                    placeholder="Escribe tu correo electrónico..."
                    className="flex-grow bg-white/10 border-2 border-white/30 text-white placeholder:text-white/50 px-6 py-4 outline-none focus:border-white transition-colors font-bold uppercase tracking-widest text-xs"
                 />
                 <button className="bg-white text-[#009639] px-10 py-4 font-black uppercase tracking-widest text-xs hover:bg-gray-100 transition-colors shadow-2xl">
                    SUSCRIBIRME AHORA
                 </button>
              </form>
              <p className="text-white/50 text-[10px] font-bold uppercase tracking-widest mt-6">
                 * Al suscribirte, aceptas nuestras políticas de privacidad e institucionalidad.
              </p>
           </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="bg-gray-900 text-white pt-16 pb-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
            {/* Brand */}
            <div className="flex flex-col">
              <div className="flex items-center space-x-2 mb-6 text-white">
                <div className="w-8 h-8 bg-[#009639] flex items-center justify-center uppercase font-black text-xl">D</div>
                <h2 className="text-xl font-black tracking-tighter">DIARIO <span className="text-[#009639]">DE SAN JUAN</span></h2>
              </div>
              <p className="text-gray-400 text-[11px] font-bold uppercase tracking-widest leading-loose mb-6 italic">
                Líder en información institucional, minera y de gestión pública. Diseñado para el impacto empresarial.
              </p>
              <div className="flex space-x-4">
                <Facebook className="w-5 h-5 text-gray-500 hover:text-white cursor-pointer transition-colors" />
                <Instagram className="w-5 h-5 text-gray-500 hover:text-white cursor-pointer transition-colors" />
                <svg className="w-5 h-5 text-gray-500 hover:text-white cursor-pointer transition-colors border border-current rounded-full p-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" /></svg>
                <MessageCircle className="w-5 h-5 text-gray-500 hover:text-white cursor-pointer transition-colors" />
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h5 className="font-black text-[10px] uppercase tracking-[0.2em] mb-8 border-l-4 border-[#009639] pl-3 text-gray-500">Secciones Clave</h5>
              <div className="flex flex-col space-y-4">
                <a href="#" className="text-[11px] font-bold text-gray-400 hover:text-white uppercase tracking-widest transition-colors">Gestión Pública</a>
                <a href="#" className="text-[11px] font-bold text-gray-400 hover:text-white uppercase tracking-widest transition-colors">Minería & Desarrollo</a>
                <a href="#" className="text-[11px] font-bold text-gray-400 hover:text-white uppercase tracking-widest transition-colors">Empleo & Producción</a>
                <a href="#" className="text-[11px] font-bold text-gray-400 hover:text-white uppercase tracking-widest transition-colors">Sociedad & Servicios</a>
              </div>
            </div>

            {/* Advertising */}
            <div>
              <h5 className="font-black text-[10px] uppercase tracking-[0.2em] mb-8 border-l-4 border-[#009639] pl-3 text-[#009639]">Pauta Comercial</h5>
              <div className="flex flex-col space-y-4">
                <a href="#" className="text-[11px] font-black text-white hover:text-[#009639] uppercase tracking-widest transition-colors">Anuncie con nosotros</a>
                <a href="#" className="text-[11px] font-bold text-gray-400 hover:text-white uppercase tracking-widest transition-colors">Tarifario 2026</a>
                <a href="#" className="text-[11px] font-bold text-gray-400 hover:text-white uppercase tracking-widest transition-colors">Audiencia & Métricas</a>
                <a href="#" className="text-[11px] font-bold text-gray-400 hover:text-white uppercase tracking-widest transition-colors">Convenios Institucionales</a>
              </div>
            </div>

            {/* Newsletter */}
            <div>
              <h5 className="font-black text-[10px] uppercase tracking-[0.2em] mb-8 border-l-4 border-[#009639] pl-3 text-gray-500">Suscríbete</h5>
              <p className="text-[11px] text-gray-500 mb-6 font-bold uppercase tracking-widest leading-relaxed">Únete a los líderes que ya se informan con el boletín oficial.</p>
              <div className="flex">
                <input 
                  type="email" 
                  placeholder="Tu correo institucional" 
                  className="bg-gray-800 border-none px-4 py-3 text-[10px] flex-grow outline-none focus:ring-1 focus:ring-[#009639] text-white font-bold uppercase"
                />
                <button className="bg-[#009639] px-5 py-3 hover:bg-[#009639]/80 transition-colors">
                  <Send className="w-5 h-5 text-white" />
                </button>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex flex-col items-center md:items-start">
              <div className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">
                © 2026 DIARIO DE SAN JUAN - TODOS LOS DERECHOS RESERVADOS
              </div>
              <div className="text-[10px] font-black text-[#009639] uppercase tracking-[0.2em] mt-1">
                DISEÑADO POR DANILA DIGITAL
              </div>
            </div>
            <div className="flex space-x-6 text-[10px] font-bold text-gray-500 uppercase tracking-widest">
              <a href="#" className="hover:text-white transition-colors underline decoration-[#009639]/30">Términos y condiciones</a>
              <a href="#" className="hover:text-white transition-colors underline decoration-[#009639]/30">Política de privacidad</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
