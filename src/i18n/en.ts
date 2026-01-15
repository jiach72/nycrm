import type { MessageSchema } from './zh-TW'

const en: MessageSchema = {
    services: {
        pageTitle: 'Solutions',
        pageSubtitle: 'Comprehensive cross-border solutions for Taiwanese entrepreneurs and high-net-worth families',
        corporate: {
            title: 'Corporate Services',
            intro: 'We provide full-cycle corporate administrative services in Singapore and Malaysia to help you launch your business quickly.',
            basic: {
                title: 'Basic Services',
                items: [
                    'Singapore/Malaysia Company Registration',
                    'Corporate Secretary Services',
                    'Annual Review & Filing',
                    'Amendment Services',
                    'Accounting & Bookkeeping'
                ]
            },
            banking: {
                title: 'Banking Assistance',
                priority: {
                    title: 'Priority Banking',
                    bank: 'Bank',
                    requirement: 'Minimum Deposit'
                },
                private: {
                    title: 'Private Banking',
                    top: 'Top Tier',
                    core: 'Core Tier',
                    select: 'Select Tier'
                }
            }
        },
        asset: {
            title: 'Asset Management & Real Estate',
            intro: 'Achieve wealth preservation, growth, and succession through diversified asset allocation tools.',
            financial: {
                title: 'Financial Asset Management',
                items: [
                    'Singapore Insurance Planning',
                    'VCC (Variable Capital Company) Fund Structuring',
                    'Family Trust Setup & Management',
                    'Family Office Operational Support'
                ]
            },
            realestate: {
                title: 'Real Estate Allocation',
                items: [
                    'Singapore: Premium commercial offices & private residential investment',
                    'Malaysia: Johor property opportunities (focus on rental yield & value preservation)'
                ]
            }
        },
        identity: {
            title: 'Identity & Talent Planning',
            intro: 'Plan legal and long-term residency for business owners, executives, and family members.',
            singapore: {
                title: 'Singapore Pathways',
                items: [
                    'Employment Pass (EP) Application & Renewal',
                    'Self-employed EP (Entrepreneur)',
                    'Equity Investment Immigration',
                    'Permanent Resident (PR) Application Planning'
                ]
            },
            malaysia: {
                title: 'Malaysia Pathways',
                items: [
                    'Malaysia My Second Home (MM2H) Consultation & Application'
                ]
            }
        },
        education: {
            title: 'Education Planning',
            intro: 'Leveraging 28 years of professional experience, we provide comprehensive education solutions from kindergarten to university.',
            planning: {
                title: 'Study Abroad Planning',
                items: [
                    'Singapore government & international school application guidance',
                    'University admission counseling'
                ]
            },
            special: {
                title: 'Featured Services',
                desc: 'Full-service student apartments (providing accommodation, guardianship, and academic support in one stop, giving parents peace of mind)'
            }
        },
        brand: {
            title: 'Brand Transformation & Corporate Visits',
            intro: 'Empower corporate brand internationalization and provide in-depth industry site visits.',
            branding: {
                title: 'Brand Internationalization',
                items: [
                    'Build Singapore brand image',
                    'Establish Singapore global headquarters (HQ)',
                    'Trademark registration'
                ]
            },
            value: {
                title: 'Business Value-add',
                items: [
                    'Technology upgrade consulting',
                    'Jilin-Singapore Food Zone (IFSS standards) entry',
                    'E-commerce operations coaching',
                    'IPO support (Singapore/US)'
                ]
            },
            visit: {
                title: 'Corporate Visit Programs (Bookable)',
                medical: 'Healthcare Industry',
                medicalDesc: 'Listed medical device company (OEL), specialist/general clinics under listed companies',
                tech: 'Manufacturing & Technology',
                techDesc: '3D printing center, motorcycle manufacturing, AI smart robotic vertical farm (SUN POWER), WatchWater water treatment'
            }
        },
        tax: {
            title: 'Government Grants & Tax',
            intro: 'Maximize policy benefits and optimize corporate and personal tax costs.',
            grants: {
                title: 'Grant Applications',
                desc: 'Singapore and Malaysia government grant application consultation'
            },
            taxation: {
                title: 'Tax Services',
                items: [
                    'Corporate Tax filing',
                    'Personal Income Tax planning',
                    'International tax consultation',
                    'Charitable tax consultation'
                ]
            }
        },
        cta: {
            title: 'Learn More',
            subtitle: 'Contact our professional advisors for customized solutions',
            button: 'Book Consultation'
        }
    },
    industries: {
        pageTitle: 'Industry Solutions',
        pageSubtitle: 'Deep industry expertise providing precise market entry and growth strategies',
        items: [
            {
                id: 'food',
                title: '食品與保健品',
                titleEn: 'Food & Wellness',
                painPoint: 'Complex local compliance, time-consuming supply chain certification, and branding localization barriers.',
                solution: 'One-stop regulatory consulting, IFSS standard docking, and international brand upgrading.'
            },
            {
                id: 'pharma',
                title: '醫藥與醫療',
                titleEn: 'Pharma & Healthcare',
                painPoint: 'High barriers for medical device registration, difficulty in talent matching, and clinical resource gaps.',
                solution: 'HSA registration assistance, OEL resource docking, and professional healthcare talent immigration planning.'
            },
            {
                id: 'fintech',
                title: '金融科技',
                titleEn: 'FinTech',
                painPoint: 'Long license application process, strict MAS compliance, and capital market accessibility issues.',
                solution: 'Regulatory sandbox guidance, legal framework design, and capital market resource docking.'
            },
            {
                id: 'ecommerce',
                title: '跨境電商',
                titleEn: 'Cross-border E-commerce',
                painPoint: 'High tax costs, logistical inefficiencies, and fragmented ASEAN markets.',
                solution: 'Regional tax structure optimization, FTA benefit utilization, and Singapore HQ setup solutions.'
            },
            {
                id: 'familyoffice',
                title: '家族辦公室與資產管理',
                titleEn: 'Family Office & Asset Management',
                painPoint: 'Shifting tax exemption thresholds, unstable asset structures, and lack of succession mechanisms.',
                solution: '13O/13U tax incentive planning, VCC & Family Trust structuring, and long-term compliance support.'
            }
        ],
        labels: {
            painPoints: 'Common Pain Points',
            solutions: 'Our Solution'
        }
    },
    nav: {
        brand: 'TongHai Nanyang',
        home: 'Home',
        services: 'Services',
        industries: 'Industries',
        about: 'About',
        team: 'Team',
        contact: 'Contact',
        ctaButton: 'Get Started'
    },
    home: {
        hero: {
            title: 'Singapore Gateway: Expand with Confidence, Build a Legacy',
            subtitle: 'One-Stop Solution for Market Entry × Residency × Wealth Structuring × Asset Allocation',
            description: 'Comprehensive professional services for Chinese-speaking entrepreneurs and HNWIs seeking Singapore market access, residency, tax optimization, and asset allocation',
            btn1: 'Explore Services',
            btn2: 'Schedule a Discovery Call'
        },
        whatWeDo: {
            title: 'What We Do',
            learnMore: 'Learn More',
            service1: {
                title: 'Market Entry & Execution',
                desc: 'Incorporation/structuring, banking, licensing, government & industrial park liaison'
            },
            service2: {
                title: 'Residency & Talent Planning',
                desc: 'EP/PR pathways, family office support, education & relocation, executive mobility'
            },
            service3: {
                title: 'Wealth & Tax Structuring',
                desc: 'Treaty planning, VCC/trust/family office, CRS compliance, legacy solutions'
            },
            service4: {
                title: 'Real Estate & Allocation',
                desc: 'SG commercial/residential, Johor opportunities, portfolio allocation, leasing & preservation'
            }
        },
        howWeWork: {
            title: 'How We Work',
            step1: {
                title: 'Discovery',
                desc: 'Understand your goals, resources, and timeline'
            },
            step2: {
                title: 'Design',
                desc: 'Customized pathway and structure recommendations'
            },
            step3: {
                title: 'Execution',
                desc: 'Document prep, institutional liaison, full follow-through'
            },
            step4: {
                title: 'Support',
                desc: 'Compliance maintenance, policy updates, resource connection'
            }
        },
        whyUs: {
            title: 'Why Choose Us',
            reason1: {
                title: 'Deep Local Network',
                desc: 'Established partnerships with Singapore government and professional institutions'
            },
            reason2: {
                title: 'End-to-End Service',
                desc: 'From offshore planning to on-ground execution, one-stop solution'
            },
            reason3: {
                title: 'Professional Team',
                desc: 'Licensed accountants, lawyers, and immigration consultants'
            },
            reason4: {
                title: 'Native Communication',
                desc: 'Fluent in Chinese, understanding the real needs of Chinese entrepreneurs'
            }
        },
        cta: {
            title: 'Ready to Get Started?',
            subtitle: 'Book a complimentary discovery session to learn how to expand with confidence and build a legacy',
            button: 'Book Consultation'
        }
    },
    footer: {
        companyName: 'TongHai Nanyang',
        tagline: 'Expand with Confidence · Build a Legacy',
        quickLinks: 'Quick Links',
        contactInfo: 'Contact',
        disclaimer: 'Content on this website is for general information and client education only and does not constitute legal, tax, or investment advice. Recommendations are case-specific and subject to applicable laws and qualified/licensed professional advice.',
        copyright: '© 2026 TongHai Nanyang Consulting. All rights reserved.'
    }
}

export default en
