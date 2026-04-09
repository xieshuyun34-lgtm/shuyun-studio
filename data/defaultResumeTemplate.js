const TEMPLATE_VERSION = "lina-singer-20260308-clean";
export const defaultPublishedSlug = "lina-live";

export const defaultResumeTemplate = {
  __templateVersion: TEMPLATE_VERSION,
  name: "Sylvie",
  tagline: "独立唱作歌手，擅长电子流行、情绪叙事与现场舞台表达。",
  about:
    "我是谢树云，本科攻读财务管理专业，与25年炙热的夏天毕业，短暂从事过HR的岗位。回顾在校学生干部经历还是社会工作经历，可以复盘出自己的闪光点与不足之处。\n闪光点：1、目标感强：mbti是一个j人，喜欢做计划，也享受目标被完成的过程；2、抗压能力不错：可以多任务进行工作；3、为人真诚、友善：喜欢与人交流、享受与人思想碰撞的过程；4、具有终身学习的意识：不管是对专业技能的学习，还是业余爱好的学习，不会随着年龄与琐事的影响而消磨。因为终身学习即是对这个世界保持好奇心，它是对这个社会、时代最好的链接渠道。\n不足之处：时有的完美主义：因为想要足够好，而耽误先要有才能好。已经意识到这个问题的存在，遇到这种情况也会提醒自己不要犯这种错误。",
  experiences:
    "2025.10-2025.12 丨人事行政丨韩蕾（上海）科技有限公司丨\n1.招聘执行支持：支持招聘工作执行参与3+个岗位招聘流程，协助招聘渠道维护、简历筛选200+份、面试安排40场。2.人事数据维护：参与人力资源系统与数据维护，更新员工信息、花名册及人事台账，确保人事数据准确率100%3.制度与绩效规则支持：协助整理绩效考核相关制度与管理规则，参与绩效指标口径梳理与说明，完成3份规则类文档。\n2025.03-2025.05丨实习会计助理丨广州敖贸商贸有限公司丨\n1.凭证整理：审核凭证及其附件，依据各类单据所需的资料进行整合，累计处理凭证400张。2.发票开具：负责公司日常发票开具，整理审核发票开具的相关资料，累计处理发票300张。",
  skills:
    "熟练word/ppt/excel、用友软件、Power BI、了解SQL基础语法、熟练使用ChatGPT、Gemini、Claude Code、Codex等AI辅助工具\n证书：初级会计师证、大学英语四级",
  awards: "荣誉奖项",
  projects: "",
  projectItems: [
    {
      period: "2026.1-2026.2",
      title: "模拟母婴市场销售分析",
      subtitle: "Power BI 数据分析练习",
      summary:
        "使用Power BI对母婴市场模拟数据进行清洗、整理与可视化，并辅助使用Claude code进行报告输出。",
      details:
        "项目职责：使用Power BI对母婴市场模拟数据进行清洗、整理与可视化，并辅助使用Claude code进行报告输出。项目描述：对销售趋势、品类表现及区域分布进行分析，完成从数据处理到结果呈现的模拟分析流程。项目成果：完成销售分析看板及综合分析报告输出，梳理重点品类与销售差异，提升数据分析与报告表达能力。",
      media: null,
    },
    {
      period: "2023.11-2023.12",
      title: "模拟企业经营管理",
      subtitle: "财务总监",
      summary:
        "制定企业年度预算，协调生产、营销部门资金需求，平衡现金流与经营成本，促进企业市场份额扩大。",
      details:
        "项目职责：制定企业年度预算，协调生产、营销部门资金需求，平衡现金流与经营成本，促进企业市场份额扩大。项目描述：通过角色协作，完成四个会计年度企业经营与实操。项目成果：与团队成员协作配合，利用excel制定财务预算，助力团队在评比中获得第二名成绩。",
      media: null,
    },
  ],
  profilePosition: "",
  profileEmail: "",
  profileCustom1Title: "",
  profileCustom1Value: "",
  profileCustom2Title: "",
  profileCustom2Value: "",
  profileCustom3Title: "",
  profileCustom3Value: "",
  interactionAudio: null,
  aboutMedia: { url: "/hero/base.png", type: "image" },
  mediaItems: [
    { type: "image", url: "/honors/20f3ac82483c46f0f0821ece39ed027e.jpg" },
    { type: "image", url: "/honors/0126f9f2aa4f9f991560bfab60a4db25.jpg" },
    { type: "image", url: "/honors/87068d3369c838baa2bc7f676b904760.jpg" },
    { type: "image", url: "/honors/338776e5054101379400e5321123fee7.jpg" },
    { type: "image", url: "/honors/dbb6efa7793d1612e5e831abef319495.jpg" },
    { type: "image", url: "/honors/f5fe30f8c5369092a41cc2b7658e56bc.jpg" },
  ],
  customSections: [],
};

export const defaultResumeTemplateVersion = TEMPLATE_VERSION;

function cloneItem(value) {
  return value ? JSON.parse(JSON.stringify(value)) : value;
}

export function buildTemplateDraft(saved) {
  const base = cloneDefaultResumeTemplate();
  if (!saved || typeof saved !== "object") return base;

  if (saved.aboutMedia?.url) {
    base.aboutMedia = cloneItem(saved.aboutMedia);
  }

  if (Array.isArray(saved.mediaItems) && saved.mediaItems.length > 0) {
    base.mediaItems = saved.mediaItems.map((item) => cloneItem(item)).filter(Boolean);
  }

  if (saved.interactionAudio?.url) {
    base.interactionAudio = cloneItem(saved.interactionAudio);
  }

  if (Array.isArray(saved.projectItems) && saved.projectItems.length > 0) {
    base.projectItems = saved.projectItems.map((item) => cloneItem(item)).filter(Boolean);
  }

  if (Array.isArray(saved.customSections) && saved.customSections.length > 0) {
    base.customSections = saved.customSections
      .map((section) => ({
        ...section,
        mediaItems: Array.isArray(section?.mediaItems)
          ? section.mediaItems.map((item) => cloneItem(item)).filter(Boolean)
          : [],
      }))
      .filter(Boolean);
  }

  return base;
}

function hasLegacyPlaceholderProjects(projectItems = []) {
  if (!Array.isArray(projectItems)) return false;
  const titles = projectItems.map((item) => String(item?.title || "").trim());
  return titles.includes("MotionCV Web") || titles.includes("Portfolio System");
}

export function shouldSeedImportedTemplate(saved) {
  if (!saved || typeof saved !== "object") return true;
  if (saved.__templateVersion === TEMPLATE_VERSION) return false;

  const name = String(saved.name || "").trim();
  const email = String(saved.profileEmail || saved.email || "").trim();
  const about = String(saved.about || "").trim();
  const experiences = String(saved.experiences || "").trim();
  const isEmpty = !name && !email && !about && !experiences;
  const isLegacyPlaceholder =
    about.includes("我专注于复杂产品的信息架构与体验优化") ||
    hasLegacyPlaceholderProjects(saved.projectItems);

  return isEmpty || isLegacyPlaceholder;
}

export function cloneDefaultResumeTemplate() {
  return JSON.parse(JSON.stringify(defaultResumeTemplate));
}
