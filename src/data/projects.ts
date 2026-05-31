export interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  longDescription: string;
  tags: string[];
  client: string;
  year: string;
  stats: { label: string; value: string }[];
  gradient: string;
}

export const projects: Project[] = [
  {
    id: "quantum-finance",
    title: "QuantumPay Санхүүгийн Портал",
    category: "Финтек Вэб Систем",
    description: "Крипто гүйлгээний бүртгэл болон арилжааг хянах өндөр хурдны бодит цагийн систем.",
    longDescription: "Бид QuantumPay компанид зориулан бодит цагийн арилжааны портал болон хөрвөх чадварын удирдлагын системийг хөгжүүлсэн. Энэхүү платформ нь бодит цагийн WebSockets өгөгдөл, арилжааны гүнийг харуулах WebGL график болон өндөр хамгаалалттай нэвтрэх системийг агуулсан.",
    tags: ["React", "TypeScript", "TailwindCSS", "ChartJS", "WebSockets"],
    client: "QuantumPay ХХК",
    year: "2025",
    stats: [
      { label: "Хүсэлтийн хурд", value: "<12мс" },
      { label: "Сар тутмын эргэлт", value: "$4.2М" },
      { label: "Ачаалах хугацаа", value: "0.8сек" }
    ],
    gradient: "linear-gradient(135deg, #1e3a8a 0%, #0d9488 100%)"
  },
  {
    id: "aurora-commerce",
    title: "Aurora Брэнд Хувцасны Онлайн Дэлгүүр",
    category: "Цахим Худалдаа",
    description: "Гоёмсог хөдөлгөөн бүхий худалдан авалтын системтэй орчин үеийн онлайн дэлгүүр.",
    longDescription: "Aurora брэндэд зориулан бүтээсэн цахим худалдааны платформ. Хэрэглэгчийг татах анимаци, маш хурдан бүтээгдэхүүн шүүлтүүр болон Stripe-ийн тусламжтайгаар 1 товшилтоор төлбөрөө төлөх найдвартай системийг суурилуулсан.",
    tags: ["Vite", "React", "CSS Modules", "Stripe API", "Framer Motion"],
    client: "Aurora Clothing брэнд",
    year: "2025",
    stats: [
      { label: "Борлуулалт өсөлт", value: "+32%" },
      { label: "Сайтаас гарах хувь", value: "-18%" },
      { label: "Гар утасны арилжаа", value: "74%" }
    ],
    gradient: "linear-gradient(135deg, #4c1d95 0%, #db2777 100%)"
  },
  {
    id: "nexus-logistics",
    title: "Nexus Олон Улсын Логистик Хяналтын Систем",
    category: "Логистикийн SaaS Систем",
    description: "Тээврийн хэрэгслийн байршил, жолоочийн хуваарилалт болон шатахуун зарцуулалтыг бодит цагт хянах систем.",
    longDescription: "Олон улсын чингэлэг тээвэрлэлтийн логистикийг хянах интерактив вэб платформыг зохион бүтээсэн. Автомат и-мэйл болон утасны мэдэгдэл, интерактив вектор газрын зураг болон бодит цагийн нарийн аналитикийг багтаасан.",
    tags: ["React", "Mapbox GL", "Node.js", "PostgreSQL", "TailwindCSS"],
    client: "Nexus Global ХХК",
    year: "2024",
    stats: [
      { label: "Нийт машин", value: "450+ Тэрэг" },
      { label: "Тээврийн зардал", value: "-14%" },
      { label: "Нарийвчлал", value: "99.8%" }
    ],
    gradient: "linear-gradient(135deg, #111827 0%, #374151 100%)"
  }
];
