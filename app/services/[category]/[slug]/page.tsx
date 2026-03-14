"use client";

import { use } from "react";
import ServiceTemplate from "@/pages/services/ServiceTemplate";
import { notFound } from "next/navigation";

type ServiceData = {
  title: string;
  category: string;
  description: string;
  problem: string;
  solution: string;
  process: string[];
  benefits: string[];
  forWho: string[];
  image?: string;
};

type ServicesRegistry = {
  [category: string]: {
    [slug: string]: ServiceData;
  };
};

const servicesData: ServicesRegistry = {
  training: {
    bi: {
      title: "Business Intelligence Master Program",
      category: "Training",
      image: "https://images.unsplash.com/photo-1551288049-bbbda536339a?auto=format&fit=crop&q=80&w=2070",
      description: "Master the art of data-driven decision making with our comprehensive BI Master Program.",
      problem: "Organizations today are drowning in data but starving for insights, leading to missed opportunities and strategic errors.",
      solution: "We provide an end-to-end curriculum covering data warehousing, ETL processes, and advanced visualization to create actionable intelligence.",
      process: ["Data Architecture", "ETL Mastery", "Visualization & Dashboarding", "Predictive Analytics"],
      benefits: ["Industry-leading certifications", "Real-world project portfolio", "Career coaching", "Expert mentorship"],
      forWho: ["Data Analysts", "Business Managers", "IT Professionals"]
    },
    fullstack: {
      title: "Full Stack Master Program",
      category: "Training",
      image: "/images/saas-concept-collage.jpg",
      description: "Become an elite engineer mastering the entire web stack from frontend to cloud deployment.",
      problem: "The rapid evolution of web technologies creates a massive skill gap in developers who can build end-to-end production systems.",
      solution: "An intensive, project-based program covering modern JS frameworks, backend architecture, and DevOps practices.",
      process: ["Frontend Engineering", "Backend & API Design", "Database Management", "Deployment & Scaling"],
      benefits: ["Modern tech stack mastery", "Professional portfolio", "Live project experience", "Placement support"],
      forWho: ["Aspiring Developers", "Software Engineers", "Computer Science Students"]
    },
    uiux: {
      title: "Ui/Ux Master Program",
      category: "Training",
      image: "/images/ux_ui.jpg",
      description: "Learn to design world-class digital products that combine aesthetic beauty with peak usability.",
      problem: "Poorly designed interfaces lead to low user retention and high acquisition costs, regardless of the underlying technology.",
      solution: "Master design thinking, wireframing, and interactive prototyping to create seamless user journeys.",
      process: ["User Research", "Wireframing & UX", "Visual Design", "Prototyping & Testing"],
      benefits: ["Figma proficiency", "Design systems expertise", "UX research skills", "Portfolio reviews"],
      forWho: ["Graphic Designers", "Product Managers", "Frontend Developers"]
    },
    datascience: {
      title: "Data Science Master Program",
      category: "Training",
      image: "/images/data_science.jpg",
      description: "Dive into machine learning, statistical modeling, and advanced predictive analytics.",
      problem: "Companies lack the specialized talent to harness big data for predictive modeling and automated decision systems.",
      solution: "Learn Python-based data science libraries, regression models, and neural networks to solve complex business problems.",
      process: ["Statistical Foundations", "Machine Learning", "Deep Learning", "Model Deployment"],
      benefits: ["AI integration skills", "Big data processing", "Mathematical modeling", "Algorithm design"],
      forWho: ["Math Enthusiasts", "Analysts", "Engineers"]
    },
    visualisation: {
      title: "Data Visualisation Master Program",
      category: "Training",
      image: "https://images.unsplash.com/photo-1543286386-713bdd548da4?auto=format&fit=crop&q=80&w=2070",
      description: "Transform complex datasets into compelling visual stories that drive organizational change.",
      problem: "Even the best analysis fails if it cannot be communicated clearly to non-technical stakeholders.",
      solution: "Master the principles of visual communication using Tableau, Power BI, and D3.js to create impactful data stories.",
      process: ["Visual Storytelling", "Advanced Tooling", "Interactivity Design", "Stakeholder Communication"],
      benefits: ["Design-thinking for data", "Enterprise dashboard skills", "Visual communication mastery", "Cross-functional impact"],
      forWho: ["Analysts", "Marketers", "Consultants"]
    }
  },
  ecommerce: {
    registration: {
      title: "Account Registration",
      category: "E-Commerce",
      image: "/images/account-registration-new.jpg",
      description: "Complete assistance in registering seller accounts across leading e-commerce marketplaces.",
      problem: "Complex compliance requirements, inconsistent documentation, and platform-specific hurdles often delay or prevent market entry for months.",
      solution: "We handle the entire registration pipeline including GST verification, brand registry, and category approvals with a 100% success rate guarantee.",
      process: ["Compliance Audit", "Document Preparation", "Portal Setup & Submission", "Final Verification & Live"],
      benefits: ["Guaranteed Platform Approval", "Minimized Market Entry Time", "Direct Brand Registry Support", "End-to-End Compliance Handle"],
      forWho: ["Manufacturers", "New D2C Brands", "Global Retailers", "Wholesalers"]
    },
    management: {
      title: "Account Management",
      category: "E-Commerce",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=2426",
      description: "Daily management of marketplace accounts, including monitoring, updates, and performance optimization.",
      problem: "Managing multiple marketplace accounts is time-intensive and requires specialized knowledge to monitor performance metrics effectively.",
      solution: "Our dedicated account managers handle daily operations, price tracking, listing health, and account performance metrics to maintain elite seller status.",
      process: ["Account Health Audit", "Daily Ops Monitoring", "Listing Optimization", "Performance Reporting"],
      benefits: ["Elite Seller Ratings", "Zero Policy Violations", "24/7 Account Recovery Support", "Growth Curve Sustainment"],
      forWho: ["Marketplace Sellers", "Established Brands", "Direct-to-Consumer Startups"]
    },
    inventory: {
      title: "Inventory Management",
      category: "E-Commerce",
      image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=2070",
      description: "Smart inventory tracking and stock planning to ensure smooth order fulfillment.",
      problem: "Stock-outs lead to platform penalties, while overstocking ties up valuable capital. Inaccurate sync ruins customer trust.",
      solution: "Automated inventory management systems integrated with your warehouse for real-time stock updates and intelligent demand forecasting.",
      process: ["Live Stock Audit", "WMS Integration", "Demand Forecasting Model", "Automated Channel Sync"],
      benefits: ["Zero Stock-Out Penalties", "Optimized Working Capital", "Multichannel Sync Accuracy", "Automated Reordering System"],
      forWho: ["Multichannel Sellers", "Distributors", "Scaling Retailers", "Enterprise Brands"]
    },
    returns: {
      title: "Returns Management",
      category: "E-Commerce",
      image: "https://images.unsplash.com/photo-1566576721346-d4a3b4eaad5b?auto=format&fit=crop&q=80&w=2070",
      description: "Handling return requests and reverse logistics while maintaining customer satisfaction.",
      problem: "Unmanaged returns lead to massive revenue leakage, high RTO costs, and significant inventory wastage.",
      solution: "A robust reverse logistics framework that handles everything from customer return requests to QC check and restocking sellable items.",
      process: ["Return Request Handling", "Reverse Logistics Route", "QC & Sorting Protocol", "Refund & Restock Sync"],
      benefits: ["30% Lower Reverse Ops Cost", "98% QC Matching Accuracy", "Faster Customer Credits", "Minimized Inventory Leakage"],
      forWho: ["Fashion & Apparel Brands", "Electronics Sellers", "High-volume Marketplaces"]
    },
    ads: {
      title: "Sponsored Ads & Sales Boosting",
      category: "E-Commerce",
      image: "/images/sponsored-ads.jpg",
      description: "Running targeted advertising campaigns and promotions to increase product visibility and drive higher sales.",
      problem: "Unoptimized ad spend leads to high ACoS and budget depletion without a proportional increase in organic ranking.",
      solution: "Data-driven performance marketing focused on Buy-Box wins, keyword dominance, and continuous ROI optimization.",
      process: ["In-depth Keyword Research", "Strategic Bid Management", "Creative Ad Optimization", "Attribution & ROI Tracking"],
      benefits: ["Average 15% Lower ACoS", "Improved Organic Rankings", "Higher Buy-Box Win Rate", "Scaleable Revenue Model"],
      forWho: ["Performance Marketers", "Brand Owners", "Amazon & Flipkart Sellers"]
    },
    reconciliation: {
      title: "Payment Reconciliation",
      category: "E-Commerce",
      image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&q=80&w=2211",
      description: "Tracking, verifying, and reconciling marketplace payments and settlements.",
      problem: "Complex marketplace fees, hidden charges, and unsettled orders can cause 2-5% revenue loss for high-volume sellers.",
      solution: "Automated reconciliation software that flags discrepancies in marketplace settlements and helps file claims for recovery.",
      process: ["Sales Data Aggregation", "Fee Schedule Validation", "Settlement Matching", "Dispute Claim Management"],
      benefits: ["Identified Revenue Recovery", "100% Transparent Audits", "Accurate Financial Reporting", "Marketplace Fee Control"],
      forWho: ["CFOs", "Accounting Departments", "Large Scale Sellers"]
    },
    warehousing: {
      title: "Warehousing",
      category: "E-Commerce",
      image: "/images/warehousing.jpg",
      description: "Secure warehousing solutions that support efficient order processing and storage.",
      problem: "Managing your own warehouse is complex, expensive to scale, and often located far from your core customer base.",
      solution: "Plug into our network of Grade-A, tech-enabled warehouses that offer flexible storage and 24/7 secure monitoring.",
      process: ["Inventory Inwarding", "Strategic Storage Mapping", "Real-time WMS Tracking", "Secure Facility Access"],
      benefits: ["No Fixed Infrastructure Cost", "Rapid Scaling Capability", "Reduced Transit Times", "Fully Insured Storage"],
      forWho: ["Importers", "Enterprise Retailers", "High-growth Brands"]
    },
    photography: {
      title: "Product Photography",
      category: "E-Commerce",
      image: "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?auto=format&fit=crop&q=80&w=2070",
      description: "Professional product photography designed to enhance product presentation and improve conversion rates.",
      problem: "Low-quality images lead to high bounce rates and lower perceived brand value on premium marketplaces.",
      solution: "Industry-standard studio shoots including White Background, Infographics, and Lifestyle context images for every SKU.",
      process: ["Shoot Concept Design", "Product Preparation", "Professional Session", "Post-Processing & Retouching"],
      benefits: ["2x Click-Through Rate", "Lower Product Returns", "Premium Brand Perception", "Marketplace Compliant Shots"],
      forWho: ["Private Label Brands", "Catalog Managers", "Lifestyle Startups"]
    },
    cataloguing: {
      title: "Cataloguing",
      category: "E-Commerce",
      image: "https://images.unsplash.com/photo-1507925921958-8a62f3d1a50d?auto=format&fit=crop&q=80&w=2076",
      description: "Creating optimized product listings including descriptions, images, and keywords, to maximize discoverability.",
      problem: "Missing attributes and poor descriptions make products invisible to marketplace search algorithms and filters.",
      solution: "Expert cataloguing including A+ content creation, keyword-rich descriptions, and complete technical attribute mapping.",
      process: ["Data Collection", "SEO Content Writing", "Attribute Mapping", "Bulk Portal Upload"],
      benefits: ["Top Organic Search Slots", "Complete Filter Visibility", "Improved Conversion Rates", "Seamless Bulk Management"],
      forWho: ["Category Managers", "Brands with large SKUs", "Marketplace Specialists"]
    },
    offline: {
      title: "Offline Store Launch & Distribution Network",
      category: "E-Commerce",
      image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=2070",
      description: "Helping businesses establish physical retail stores and distribution networks to expand market reach.",
      problem: "Directing an online brand to the physical world is complex, requiring completely different logistics and partnership structures.",
      solution: "Setup of your physical store presence and a nationwide distribution network for a true omnichannel customer journey.",
      process: ["Location Intelligence Audit", "Retail Store Design", "Partner & Disto Sourcing", "Physical Launch Execution"],
      benefits: ["Omnichannel Revenue Growth", "Physical Brand Interaction", "Vast Market Penetration", "Local Stock Accessibility"],
      forWho: ["Established D2C Brands", "Global Brands Entering Retail", "Omnichannel Companies"]
    },
    logistics: {
      title: "Logistics",
      category: "E-Commerce",
      image: "/images/logistics.jpg",
      description: "End-to-end logistics support, including shipping coordination, order fulfillment, and delivery management.",
      problem: "Inconsistent delivery timelines and high RTO rates lead to customer dissatisfaction and increased operational losses.",
      solution: "A multi-carrier logistics platform that intelligently routes orders based on pin-code performance and delivery speed.",
      process: ["Logistics Strategy Audit", "Carrier Integration", "Real-time Tracking Setup", "RTO Management Protocol"],
      benefits: ["24-48 Hour Delivery Cycles", "Minimized RTO Losses", "100% Tracking Transparency", "Global Reach Fulfillment"],
      forWho: ["All Online Sellers", "D2C Brands", "Logistics Managers", "International Shippers"]
    }
  },
  it: {
    dev: {
      title: "App & Web Development",
      category: "IT Services",
      image: "/images/app-web.jpg",
      description: "Design and development of modern web and mobile applications tailored to business requirements.",
      problem: "Legacy code and non-scalable architectures prevent businesses from handling growth and evolving user needs.",
      solution: "Full-cycle software engineering using modern stacks (React, Next.js, Node, Go) for robust performance.",
      process: ["Requirement Analysis", "Architecture Design", "Agile Development", "Deployment"],
      benefits: ["Scalable code", "Modern stack", "High performance", "Post-launch support"],
      forWho: ["Founders", "Tech Leaders", "Enterprises"]
    },
    design: {
      title: "Design",
      category: "IT Services",
      image: "https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&q=80&w=1964",
      description: "Creative UI/UX design services focused on creating engaging and intuitive digital experiences.",
      problem: "Poorly designed interfaces lead to low user retention and high acquisition costs, regardless of the underlying technology.",
      solution: "A hollistic design approach covering branding, design systems, and marketing assets.",
      process: ["User Research", "Wireframing & UX", "Visual Design", "Prototyping & Testing"],
      benefits: ["Figma proficiency", "Design systems expertise", "UX research skills", "Portfolio reviews"],
      forWho: ["Startups", "Rebranding Teams", "Marketing Managers"]
    },
    marketing: {
      title: "Digital Marketing",
      category: "IT Services",
      image: "/images/marketing.jpg",
      description: "Strategic digital marketing services including SEO, performance marketing, and online brand growth.",
      problem: "Marketing spend often fails to materialize into revenue due to poor tracking and untargeted messaging.",
      solution: "Multi-channel growth strategies encompassing SEO, SEM, and automated lead nurturing.",
      process: ["Growth Audit", "Multi-channel Strategy", "Execution & A/B Testing", "Analytics & Reporting"],
      benefits: ["Higher ROI", "Qualified leads", "Brand authority", "Market dominance"],
      forWho: ["B2B Tech", "Service Businesses", "Product Companies"]
    },
    analytics: {
      title: "Data Analytics",
      category: "IT Services",
      image: "https://images.unsplash.com/photo-1551288049-bbbda536339a?auto=format&fit=crop&q=80&w=2070",
      description: "Advanced analytics solutions that help organizations leverage data for smarter business decisions.",
      problem: "Organizations struggle to find vetted data talent who can both build infrastructure and communicate insights.",
      solution: "Custom data pipelines and analytics platforms that turn raw data into strategic assets.",
      process: ["Data Ingestion", "Transformation (dbt)", "Modeling", "Actionable Insight Delivery"],
      benefits: ["Single source of truth", "Predictive modeling", "Real-time dashboards", "Operational clarity"],
      forWho: ["Data-driven Leaders", "Operations Teams", "Product Managers"]
    },
    "ai-bi": {
      title: "AI & Business Intelligence",
      category: "IT Services",
      image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=2070",
      description: "Implementation of AI-driven systems and business intelligence tools to automate processes and generate actionable insights.",
      problem: "Manual processes and slow reporting cycles hamper the speed of modern business execution.",
      solution: "Integration of Large Language Models (LLMs) and automated BI reporting to drive efficiency.",
      process: ["Sytem Audit", "Model Selection", "Integration & Tuning", "Automation Setup"],
      benefits: ["Automated workflows", "Real-time reporting", "AI-driven efficiency", "Competitive edge"],
      forWho: ["Forward-thinking Enterprises", "SaaS Founders", "CTOs"]
    }
  },
  consulting: {
    payroll: {
      title: "Payroll Management",
      category: "Consulting",
      image: "/images/payroll.jpg",
      description: "SwiftScale supports organizations with consulting and workforce management services that streamline operations and enable business growth.",
      problem: "Managing payroll internally is time-consuming and prone to regulatory errors that impact employee satisfaction.",
      solution: "End-to-end payroll solutions covering tax compliance, benefits administration, and automated disbursements.",
      process: ["System Setup", "Compliance Audit", "Onboarding", "Monthly Processing"],
      benefits: ["100% Tax Compliance", "Automated Disbursements", "Reduced Admin Overhead", "Employee Self-Service portals"],
      forWho: ["Startups", "Mid-size Enterprises", "Global Corporations"]
    },
    analytics: {
      title: "Data Analytics Consulting",
      category: "Consulting",
      image: "https://images.unsplash.com/photo-1551288049-bbbda536339a?auto=format&fit=crop&q=80&w=2070",
      description: "Advanced analytics solutions that help organizations leverage data for smarter business decisions.",
      problem: "Organizations struggle to find vetted data talent who can both build infrastructure and communicate insights.",
      solution: "We provide expert consulting and placement for data roles, ensuring your analytics team is built on a foundation of elite talent.",
      process: ["Strategic Needs Audit", "Expert Talent Vetting", "Role Alignment", "Placement & Integration"],
      benefits: ["Elite 1% Data Talent", "Reduced Hiring Cycles", "Strategic Analytics Roadmap", "Cultural & Technical Fit"],
      forWho: ["HR Leaders", "Data Directors", "Scaling Tech Companies"]
    },
    dev: {
      title: "Software Development Consulting",
      category: "Consulting",
      image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=2070",
      description: "Helping organizations access the right expertise, manage operations efficiently, and build high-performing teams.",
      problem: "Rapidly scaling teams often face technical debt and architectural bottlenecks that slow down product delivery.",
      solution: "Consultancy from veteran architects and developers to streamline your SDLC and engineering culture.",
      process: ["Architecture Review", "SDLC Optimization", "Tech Stack Consulting", "Team Scaling Strategy"],
      benefits: ["Future-Proof Architecture", "Lower Technical Debt", "Faster Shipping Velocity", "Professional Engineering Culture"],
      forWho: ["CTOs", "Product Owners", "Engineering Managers"]
    },
    devops: {
      title: "Cloud & DevOps",
      category: "Consulting",
      image: "/images/devops.jpg",
      description: "Modernizing your infrastructure through automated deployments and robust cloud architectures.",
      problem: "Manual infrastructure management leads to instability, high costs, and slow release cycles.",
      solution: "Expert DevOps consulting to implement CI/CD, Infrastructure as Code, and secure cloud environments.",
      process: ["Infra Health Audit", "Automation Roadmap", "IaC Implementation", "Security Hardening"],
      benefits: ["Zero-Downtime Releases", "Cloud Cost Optimization", "Automated Scalability", "Enterprise Security"],
      forWho: ["DevOps Leads", "Infrastructure Teams", "SaaS Companies"]
    },
    cyber: {
      title: "Cybersecurity",
      category: "Consulting",
      image: "/images/cybersecurity.avif",
      description: "Protecting your digital assets through comprehensive security audits and hardening protocols.",
      problem: "Increasingly sophisticated cyber threats put customer data and business continuity at constant risk.",
      solution: "Strategic security consulting including penetration testing, compliance audits, and architectural hardening.",
      process: ["Vulnerability Assessment", "Penetration Testing", "Security Protocol Setup", "Compliance Audit"],
      benefits: ["Minimized Breach Risk", "Regulatory Compliance", "Secure Data Ecosystem", "Business Continuity Assurance"],
      forWho: ["Risk Officers", "IT Managers", "Financial Tech Companies"]
    },
    infra: {
      title: "IT Support & Infrastructure Roles",
      category: "Consulting",
      image: "/images/it-infra.jpg",
      description: "Specialized talent acquisition for critical IT infrastructure and support functions.",
      problem: "High turnover and skill gaps in IT support roles lead to system instability and poor internal service.",
      solution: "We source and vet top-tier IT support and infrastructure specialists for permanent and contract roles.",
      process: ["Role Definition", "Global Sourcing", "Technical Screening", "Onboarding Support"],
      benefits: ["99.9% System Uptime", "Expert Support Quality", "Reduced Internal IT Load", "Scaleable Infra Teams"],
      forWho: ["IT Directors", "Operations Managers", "Managed Service Providers"]
    },
    "marketing-tech": {
      title: "Digital & Marketing Technology Roles",
      category: "Consulting",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=2426",
      description: "Strategic talent acquisition at the intersection of marketing strategy and technical execution.",
      problem: "Marketing teams often lack the technical depth to fully leverage complex MarTech stacks and data.",
      solution: "Placing MarTech specialists who bridge the gap between creative marketing and technical architecture.",
      process: ["Tech Stack Audit", "Talent Blueprinting", "Specialized Search", "Integration Strategy"],
      benefits: ["Maximized MarTech ROI", "Data-Driven Marketing", "Technical Marketing Agility", "Enhanced Campaign Tracking"],
      forWho: ["CMOs", "Growth Leaders", "Digital Agencies"]
    }
  }
};

interface PageProps {
  params: Promise<{
    category: string;
    slug: string;
  }>;
}

export default function ServicePage({ params }: PageProps) {
  const { category, slug } = use(params);
  
  const categoryData = servicesData[category];
  if (!categoryData) {
    notFound();
  }

  const serviceData = categoryData[slug];
  if (!serviceData) {
    notFound();
  }

  return <ServiceTemplate {...serviceData} />;
}
