import type { BookRecommendation } from "@/lib/types";

interface DemoBook extends BookRecommendation {
  keywords: string[];
}

const demoLibrary: DemoBook[] = [
  {
    keywords: ["孤独", "寂寞", "孤单", "一个人", "失去"],
    title: "挪威的森林",
    author: "村上春树",
    reason:
      "孤独并不丢人，它只是生命在提醒你：有些感受需要被温柔地看见。渡边与直子的故事，像一场安静的雨，陪你把说不出口的情绪慢慢摊开。",
  },
  {
    keywords: ["焦虑", "压力", "紧张", "疲惫", "累", "崩溃"],
    title: "瓦尔登湖",
    author: "亨利·戴维·梭罗",
    reason:
      "当世界太快，这本书会带你回到湖边。梭罗用极简的生活告诉你：慢下来，不是逃避，而是重新找回呼吸的节奏。",
  },
  {
    keywords: ["治愈", "温暖", "安慰", "难过", "伤心", "哭"],
    title: "小王子",
    author: "安托万·德·圣-埃克苏佩里",
    reason:
      "真正重要的东西，用眼睛看不见。这本书像一位老朋友，轻轻拍着你的肩说：你的柔软，恰恰是你最珍贵的地方。",
  },
  {
    keywords: ["迷茫", "困惑", "不知道", "方向", "未来", "选择"],
    title: "悉达多",
    author: "赫尔曼·黑塞",
    reason:
      "迷茫不是迷路，而是灵魂在寻找自己的河流。悉达多的旅程告诉我们：答案不在远方，而在你走过的每一步里。",
  },
  {
    keywords: ["愤怒", "不公", "压抑", "无力"],
    title: "1984",
    author: "乔治·奥威尔",
    reason:
      "当愤怒无处安放，阅读是一种清醒。这本书会让你在压抑中保持思考的能力，也让愤怒转化为对自由的珍视。",
  },
  {
    keywords: ["逃避", "现实", "幻想", "做梦", "旅行"],
    title: "百年孤独",
    author: "加西亚·马尔克斯",
    reason:
      "有时候我们需要一场魔幻的逃离。马尔克斯用瑰丽的故事包裹现实，让你在异世界的光影里，重新看清自己的生活。",
  },
];

const defaultRecommendation: BookRecommendation = {
  title: "活着",
  author: "余华",
  reason:
    "每一种心情都值得被认真对待。福贵的一生告诉我们：活着本身，就是一种了不起的勇气。愿这本书陪你度过此刻。",
};

export function getDemoRecommendation(mood: string): BookRecommendation {
  const normalizedMood = mood.toLowerCase();

  const matched = demoLibrary.find((book) =>
    book.keywords.some((keyword) => normalizedMood.includes(keyword))
  );

  if (matched) {
    const { title, author, reason } = matched;
    return {
      title,
      author,
      reason: reason.replace(/。$/, `。你提到「${mood}」——这本书或许正是此刻需要的陪伴。`),
    };
  }

  return {
    ...defaultRecommendation,
    reason: `你提到「${mood}」。${defaultRecommendation.reason}`,
  };
}
