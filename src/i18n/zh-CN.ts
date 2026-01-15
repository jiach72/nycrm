import type { MessageSchema } from './zh-TW'

const zhCN: MessageSchema = {
    services: {
        pageTitle: '服务方案',
        pageSubtitle: '为台湾企业家与高净值家族提供全方位跨境解决方案',
        corporate: {
            title: '企业出海与落地',
            intro: '我们在新加坡与马来西亚提供全周期的企业行政服务，助您快速启动业务。',
            basic: {
                title: '基础服务',
                items: [
                    '新马公司注册',
                    '法定秘书服务',
                    '年审年报',
                    '变更服务',
                    '会计记账'
                ]
            },
            banking: {
                title: '银行开户协助',
                priority: {
                    title: '零售高级账户 (Priority Banking)',
                    bank: '银行',
                    requirement: '最低存款要求'
                },
                private: {
                    title: '私人银行账户 (Private Banking)',
                    top: '顶级梯队',
                    core: '核心梯队',
                    select: '精选梯队'
                }
            }
        },
        asset: {
            title: '资产管理与房产',
            intro: '通过多元化的资产配置工具，实现财富的保值、增值与传承。',
            financial: {
                title: '金融资产管理',
                items: [
                    '新加坡保险配置',
                    'VCC (Variable Capital Company) 基金架构搭建',
                    '家族信托 (Family Trust) 设立与管理',
                    '家族办公室 (Family Office) 运营支持'
                ]
            },
            realestate: {
                title: '不动产配置',
                items: [
                    '新加坡：优质商办写字楼、私人住宅投资建议',
                    '马来西亚：柔佛区域房产机遇（关注长租收益与保值增值）'
                ]
            }
        },
        identity: {
            title: '身份与人才规划',
            intro: '为企业主、高管及家庭成员规划合法、长期的居留身份。',
            singapore: {
                title: '新加坡路径',
                items: [
                    '就业准证 (EP) 申请与续签',
                    '自雇创业移民 (Self-employed EP)',
                    '股权投资移民',
                    '永久居民 (PR) 申请规划',
                    'GIP 全球投资者计划',
                    '家族办公室'
                ]
            },
            malaysia: {
                title: '马来西亚路径',
                items: [
                    '第二家园计划 (MM2H) 咨询与代办'
                ]
            }
        },
        education: {
            title: '教育留学规划',
            intro: '依托28年专业经验，为下一代提供从幼儿园到大学的全龄段教育解决方案。',
            planning: {
                title: '留学规划',
                items: [
                    '新加坡政府学校、国际学校申请指导',
                    '大学升学指导'
                ]
            },
            special: {
                title: '特色服务',
                desc: '全托管式学生公寓（提供住宿、监护、学业辅导一站式服务,解决家长后顾之忧）'
            }
        },
        brand: {
            title: '品牌转型与企业考察',
            intro: '助力企业品牌国际化，并提供深入行业的实地考察机会。',
            branding: {
                title: '品牌出海',
                items: [
                    '打造新加坡品牌形象',
                    '设立新加坡全球总部 (HQ)',
                    '商标注册'
                ]
            },
            value: {
                title: '商业增值',
                items: [
                    '技术提升咨询',
                    '入驻吉林中新食品区 (IFSS标准)',
                    '电商运营辅导',
                    '陪跑新/美上市'
                ]
            },
            visit: {
                title: '企业考察项目（可预约）',
                medical: '医疗行业',
                medicalDesc: '上市医疗器械公司 (OEL)、上市公司旗下专科/全科诊所',
                tech: '制造与科技',
                techDesc: '3D打印中心、摩托车制造厂、AI智能机器人植物工厂 (SUN POWER)、WatchWater 水处理企业'
            }
        },
        tax: {
            title: '政府津贴与税务',
            intro: '最大化利用政策红利，优化企业与个人税务成本。',
            grants: {
                title: '津贴申请',
                desc: '新加坡与马来西亚企业政府津贴 (Government Grants) 申请咨询'
            },
            taxation: {
                title: '税务服务',
                items: [
                    '企业税 (Corporate Tax) 申报',
                    '个人所得税 (Personal Income Tax) 规划',
                    '国际税务咨询',
                    '慈善事业税务咨询'
                ]
            }
        },
        cta: {
            title: '了解更多详情',
            subtitle: '联络我们的专业顾问,获取定制化解决方案',
            button: '预约咨询'
        }
    },
    industries: {
        pageTitle: '产业解决方案',
        pageSubtitle: '深耕行业特性，提供精准的出海与落地策略',
        items: [
            {
                id: 'food',
                title: '食品与保健品',
                titleEn: 'Food & Wellness',
                painPoint: '在地法规准入复杂、供应链认证耗时、品牌在地化困难。',
                solution: '提供一站式合规咨询、对接吉林中新食品区 (IFSS) 标准、协助品牌国际化升级。'
            },
            {
                id: 'pharma',
                title: '医药与医疗',
                titleEn: 'Pharma & Healthcare',
                painPoint: '医疗器械注册门槛高、专业人才匹配难、临床资源对接不畅。',
                solution: '协助 HSA 注册、对接上市医疗器械公司 (OEL) 资源、规划高端医疗人才引引路径。'
            },
            {
                id: 'fintech',
                title: '金融科技',
                titleEn: 'FinTech',
                painPoint: '牌照申请流程冗长、金管局 (MAS) 合规要求高、资本市场对接困难。',
                solution: '提供监管沙盒申请指导、法律架构设计、对接东方投融等资本市场资源。'
            },
            {
                id: 'ecommerce',
                title: '跨境电商',
                titleEn: 'Cross-border E-commerce',
                painPoint: '税务成本高企、物流效率待提升、东南亚多国市场碎片化。',
                solution: '优化区域税务架构、利用自贸协定 (FTA) 红利、提供新加坡总部 (HQ) 设立方案。'
            },
            {
                id: 'familyoffice',
                title: '家族办公室与资产管理',
                titleEn: 'Family Office & Asset Management',
                painPoint: '税务豁免门槛变动、资产架构不稳健、财富传承机制缺失。',
                solution: '规划 13O/13U 税务激励申请、设计 VCC 与家族信托结构、提供长期合规陪跑。'
            }
        ],
        labels: {
            painPoints: '常见痛点',
            solutions: '我们的解决方式'
        }
    },
    nav: {
        brand: '通海南洋',
        home: '首页',
        services: '服务方案',
        industries: '产业解决方案',
        about: '关于我们',
        team: '团队',
        contact: '联络我们',
        ctaButton: '立即咨询'
    },
    home: {
        hero: {
            title: '新加坡 出海无忧 传承有道',
            subtitle: '一站式企业落地 × 身份规划 × 财富架构 × 资产配置',
            description: '为华语企业家与高净值家庭提供新加坡市场准入、身份取得、税务优化、资产配置的全方位专业服务',
            btn1: '探索服务方案',
            btn2: '安排第一次诊断会'
        },
        whatWeDo: {
            title: '我们提供什么',
            learnMore: '了解更多',
            service1: {
                title: '企业出海与落地',
                desc: '注册/架构、银行开户、准入许可、园区与招商对接'
            },
            service2: {
                title: '身份与人才规划',
                desc: 'EP/PR路径、家族办公室配套、子女教育与安顿、人才引进'
            },
            service3: {
                title: '财富与税务架构',
                desc: '税务协定/优化、VCC/信托/家办、CRS合规、传承工具'
            },
            service4: {
                title: '房地产与资产配置',
                desc: '新加坡商办/住宅、柔佛机遇、资产组合配置、长租与保值增值'
            }
        },
        howWeWork: {
            title: '我们如何工作',
            step1: {
                title: '初步诊断',
                desc: '了解您的目标、资源与时间表'
            },
            step2: {
                title: '方案设计',
                desc: '定制化路径与架构建议'
            },
            step3: {
                title: '执行落地',
                desc: '文件准备、对接机构、全程跟进'
            },
            step4: {
                title: '持续支持',
                desc: '合规维护、政策更新、资源对接'
            },
        },
        whyUs: {
            title: '为什么选择我们',
            reason1: {
                title: '深度在地网络',
                desc: '与新加坡政府部门、专业机构建立长期合作'
            },
            reason2: {
                title: '全流程服务',
                desc: '从出海规划到落地执行,一站式解决方案'
            },
            reason3: {
                title: '专业团队',
                desc: '持牌会计师、律师、移民顾问组成的复合团队'
            },
            reason4: {
                title: '华语服务',
                desc: '母语沟通,理解华人企业家的真实需求'
            }
        },
        cta: {
            title: '准备好开始了吗?',
            subtitle: '预约免费诊断会议,了解如何稳健出海、传承未来',
            button: '预约咨询'
        }
    },
    footer: {
        companyName: '通海南洋',
        tagline: '稳健出海 · 传承未来',
        quickLinks: '快速链接',
        contactInfo: '联络资讯',
        disclaimer: '本网站内容仅供一般资讯与客户教育之用,不构成法律、税务或投资建议。具体方案需依个案背景与当地法规评估,并由持牌/合资格专业人士提供意见。',
        copyright: '© 2026 通海南洋咨询有限公司 版权所有'
    }
}

export default zhCN
