import ServiceTemplate from "./ServiceTemplate";
import NotFound from "@/pages/not-found";
import { useRoute } from "wouter";

type ServiceData = {
  title: string;
  category: string;
  description: string;
  problem: string;
  solution: string;
  process: string[];
  benefits: string[];
  forWho: string[];
};

type ServicesRegistry = {
  [category: string]: {
    [slug: string]: ServiceData;
  };
};

const servicesData: ServicesRegistry = {
  training: {
    bi: {
      title: "BI Master Program",
      category: "Training",
      description: "Master Business Intelligence with our comprehensive program designed to turn data into actionable insights.",
      problem: "Many professionals struggle to make sense of complex data, leading to missed opportunities and inefficient decision-making in a fast-paced environment.",
      solution: "Our BI Master Program provides hands-on experience with industry-leading tools, teaching you to build robust data models and compelling visualizations.",
      process: ["Data Fundamentals", "Tool Mastery", "Advanced Modeling", "Real-world Projects"],
      benefits: ["Industry-recognized certification", "Hands-on project experience", "Career placement support", "Expert mentorship"],
      forWho: ["Data Analysts", "Business Professionals", "Recent Graduates"]
    },
    fullstack: {
      title: "Full Stack Master",
      category: "Training",
      description: "Become a proficient Full Stack Developer mastering both frontend and backend modern technologies.",
      problem: "The technology landscape evolves rapidly, making it difficult for aspiring developers to know what skills are actually demanded by top tech companies.",
      solution: "An intensive curriculum covering React, Node.js, databases, and deployment, designed to make you job-ready from day one.",
      process: ["Frontend Foundations", "Backend Architecture", "Database Design", "Full Stack Integration"],
      benefits: ["Modern tech stack", "Portfolio building", "Code reviews", "Interview prep"],
      forWho: ["Aspiring Developers", "Career Switchers", "Self-taught Coders"]
    },
    uiux: {
      title: "UI/UX Master",
      category: "Training",
      description: "Learn to design intuitive, beautiful, and user-centric digital experiences that convert.",
      problem: "Products with poor user experience suffer from high churn rates and low engagement, hurting the bottom line.",
      solution: "Master design thinking, wireframing, prototyping, and user testing to create seamless and visually stunning interfaces.",
      process: ["User Research", "Wireframing", "High-fidelity Design", "Prototyping"],
      benefits: ["Figma mastery", "Design systems", "Usability testing", "Portfolio reviews"],
      forWho: ["Designers", "Product Managers", "Frontend Devs"]
    },
    datascience: {
      title: "Data Science",
      category: "Training",
      description: "Dive deep into machine learning, statistical modeling, and predictive data analytics.",
      problem: "Companies are sitting on mountains of data but lack the talent to extract predictive models and strategic insights from it.",
      solution: "Learn Python, machine learning algorithms, deep learning, and data engineering to become a highly sought-after data scientist.",
      process: ["Python & Math", "Data Processing", "Machine Learning", "Deep Learning"],
      benefits: ["Real datasets", "Advanced algorithms", "Cloud deployment", "AI fundamentals"],
      forWho: ["Analysts", "Software Engineers", "Math Enthusiasts"]
    }
  },
  ecommerce: {
    registration: {
      title: "Platform Registration",
      category: "E-Commerce",
      description: "Get your business officially registered and set up on major e-commerce platforms seamlessly.",
      problem: "Navigating the complex compliance, documentation, and approval processes of major e-commerce platforms can delay your launch by months.",
      solution: "We handle the entire onboarding process, ensuring your accounts are verified, compliant, and ready to sell immediately.",
      process: ["Documentation", "Account Setup", "Verification", "Store Launch"],
      benefits: ["Faster approval", "Compliance guaranteed", "Expert guidance", "Zero hassle"],
      forWho: ["Retailers", "Brands", "Wholesalers"]
    },
    ads: {
      title: "Sponsored Ads",
      category: "E-Commerce",
      description: "Maximize your ROI with targeted, data-driven sponsored ad campaigns across major marketplaces.",
      problem: "Brands often waste thousands of dollars on poorly optimized ad campaigns that fail to convert or target the wrong audience.",
      solution: "Our experts design, execute, and optimize multi-channel ad strategies to lower your acquisition costs and scale your revenue.",
      process: ["Keyword Research", "Campaign Creation", "A/B Testing", "Optimization"],
      benefits: ["Higher ROI", "Lower ACoS", "Brand visibility", "Detailed reporting"],
      forWho: ["E-commerce Brands", "Sellers", "Agencies"]
    },
    logistics: {
      title: "Logistics Solutions",
      category: "E-Commerce",
      description: "Streamline your supply chain with our end-to-end logistics and rapid delivery services.",
      problem: "Inefficient logistics lead to delayed shipments, high shipping costs, and unhappy customers who leave negative reviews.",
      solution: "A fully managed logistics network that guarantees fast, cost-effective, and trackable shipping from warehouse to doorstep.",
      process: ["Inventory Sync", "Order Routing", "Fulfillment", "Last-mile Delivery"],
      benefits: ["Reduced shipping costs", "Faster delivery", "Real-time tracking", "Global reach"],
      forWho: ["D2C Brands", "Marketplace Sellers", "Distributors"]
    },
    warehousing: {
      title: "Warehousing",
      category: "E-Commerce",
      description: "Secure, scalable, and efficient warehousing solutions for your physical inventory.",
      problem: "Managing your own inventory leads to high overhead costs, space constraints, and operational bottlenecks as you scale.",
      solution: "Leverage our strategic fulfillment centers equipped with advanced inventory management systems for secure storage and rapid dispatch.",
      process: ["Receiving", "Storage", "Inventory Tracking", "Pick & Pack"],
      benefits: ["Scalable space", "24/7 security", "Live inventory data", "Reduced overhead"],
      forWho: ["Growing Brands", "Importers", "Enterprise Retailers"]
    }
  },
  it: {
    dev: {
      title: "App/Web Dev",
      category: "IT Services",
      description: "Custom, scalable, and high-performance web and mobile applications built for your specific needs.",
      problem: "Off-the-shelf software often fails to meet unique business requirements, limiting growth and operational efficiency.",
      solution: "We build bespoke software solutions using cutting-edge tech stacks that scale seamlessly with your user base.",
      process: ["Requirement Analysis", "Architecture Design", "Agile Development", "Deployment"],
      benefits: ["Custom functionality", "Scalable architecture", "High performance", "Post-launch support"],
      forWho: ["Startups", "Enterprises", "SMEs"]
    },
    marketing: {
      title: "Digital Marketing",
      category: "IT Services",
      description: "Drive growth and brand visibility with our comprehensive, multi-channel digital marketing strategies.",
      problem: "Struggling to stand out in a crowded digital landscape and acquire high-quality leads at a sustainable cost.",
      solution: "A data-driven marketing approach encompassing SEO, content, social media, and paid acquisition to dominate your niche.",
      process: ["Audience Research", "Strategy Formulation", "Campaign Execution", "Performance Tracking"],
      benefits: ["Increased traffic", "Better conversion rates", "Brand authority", "Clear attribution"],
      forWho: ["B2B Companies", "Local Businesses", "Online Brands"]
    },
    cyber: {
      title: "Cybersecurity",
      category: "IT Services",
      description: "Protect your business assets with enterprise-grade security protocols, audits, and continuous monitoring.",
      problem: "Cyber threats are evolving rapidly, and a single data breach can cost millions and permanently damage brand reputation.",
      solution: "Comprehensive security audits, vulnerability assessments, and robust defense implementations to safeguard your infrastructure.",
      process: ["Risk Assessment", "Penetration Testing", "Security Implementation", "24/7 Monitoring"],
      benefits: ["Data protection", "Compliance readiness", "Threat mitigation", "Peace of mind"],
      forWho: ["Financial Services", "Healthcare", "Tech Companies"]
    },
    cloud: {
      title: "Cloud & DevOps",
      category: "IT Services",
      description: "Modernize your infrastructure with secure cloud migrations and automated CI/CD pipelines.",
      problem: "Legacy on-premise servers are slow, expensive to maintain, and prone to downtime during traffic spikes.",
      solution: "Seamless migration to AWS/GCP/Azure with automated deployment pipelines for zero-downtime releases and infinite scalability.",
      process: ["Infrastructure Audit", "Cloud Architecture", "Migration Execution", "CI/CD Setup"],
      benefits: ["99.99% Uptime", "Cost optimization", "Faster deployments", "Elastic scaling"],
      forWho: ["SaaS Providers", "Enterprises", "Growing Tech Teams"]
    }
  },
  consulting: {
    payroll: {
      title: "Payroll Management",
      category: "Consulting",
      description: "Streamline your HR processes with our accurate, compliant, and timely payroll solutions.",
      problem: "Managing payroll internally is time-consuming, prone to costly human errors, and requires constant regulatory updates.",
      solution: "End-to-end automated payroll processing that ensures your team is paid accurately and on time, fully compliant with local laws.",
      process: ["System Integration", "Data Migration", "Automated Processing", "Tax Compliance"],
      benefits: ["Zero errors", "Time savings", "Regulatory compliance", "Employee portals"],
      forWho: ["Growing Startups", "Mid-size Companies", "Large Enterprises"]
    },
    strategy: {
      title: "Growth Strategy",
      category: "Consulting",
      description: "Data-driven business strategies to optimize operations, scale your market presence, and increase profitability.",
      problem: "Businesses often hit a growth plateau, lacking the strategic direction needed to penetrate new markets or optimize margins.",
      solution: "Deep-dive market analysis and operational restructuring by seasoned consultants to unlock new revenue streams.",
      process: ["Business Audit", "Market Research", "Strategy Blueprint", "Execution Plan"],
      benefits: ["Revenue growth", "Operational efficiency", "Market expansion", "Competitive edge"],
      forWho: ["Founders", "C-Suite Execs", "Scaling Businesses"]
    },
    infra: {
      title: "IT Infra Roles",
      category: "Consulting",
      description: "Expert consulting for IT infrastructure design, talent acquisition, and systems management.",
      problem: "Finding the right talent to build and manage complex IT infrastructure is a major bottleneck for growing tech companies.",
      solution: "We help you design the optimal IT org chart and place top-tier infrastructure engineers, architects, and sysadmins.",
      process: ["Needs Assessment", "Architecture Review", "Talent Sourcing", "Onboarding Support"],
      benefits: ["Top 1% talent", "Optimized systems", "Reduced hiring time", "Expert guidance"],
      forWho: ["Tech Enterprises", "IT Departments", "CTOs"]
    }
  }
};

export default function DynamicServicePage() {
  const [match, params] = useRoute("/services/:category/:slug");

  if (!match || !params) {
    return <NotFound />;
  }

  const { category, slug } = params;
  
  const categoryData = servicesData[category];
  if (!categoryData) {
    return <NotFound />;
  }

  const serviceData = categoryData[slug];
  if (!serviceData) {
    return <NotFound />;
  }

  return <ServiceTemplate {...serviceData} />;
}