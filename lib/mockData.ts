export type BookStatus = "reading" | "archived" | "want-to-read";

export interface Book {
  id: string;
  title: string;
  author: string;
  coverUrl: string;
  rating: number;
  status: BookStatus;
  progress?: string;
  quote?: string;
  thoughts?: string;
}

export const mockBooks: Book[] = [
  {
    id: "book-001",
    title: "百年孤独",
    author: "加西亚·马尔克斯",
    coverUrl:
      "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=600&fit=crop&q=80",
    rating: 9.8,
    status: "reading",
    progress: "65%",
    quote: "许多年后，面对行刑队，奥雷里亚诺·布恩迪亚上校将会回想起父亲带他去见识冰块的那个遥远的下午。",
    thoughts:
      "魔幻现实主义的巅峰之作。每一页都像在翻阅一个家族的梦境，时间在这里不再是线性的，而是循环的、重叠的。",
  },
  {
    id: "book-002",
    title: "活着",
    author: "余华",
    coverUrl:
      "https://images.unsplash.com/photo-1519682337058-a94d519337bc?w=400&h=600&fit=crop&q=80",
    rating: 9.6,
    status: "reading",
    progress: "42%",
    quote: "人是为了活着本身而活着的，而不是为了活着之外的任何事物而活着。",
    thoughts:
      "福贵的一生是中国近代史的缩影。苦难没有将他击垮，反而让他活得更通透。读这本书，需要勇气。",
  },
  {
    id: "book-008",
    title: "置身事内",
    author: "兰小欢",
    coverUrl:
      "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=400&h=600&fit=crop&q=80",
    rating: 9.3,
    status: "reading",
    progress: "28%",
    quote: "理解中国经济，需要理解地方政府的行为逻辑。",
    thoughts:
      "用通俗的语言拆解宏观经济的底层逻辑。每读一章，对身边世界的感知就清晰一分。",
  },
  {
    id: "book-009",
    title: "悉达多",
    author: "赫尔曼·黑塞",
    coverUrl:
      "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=600&fit=crop&q=80",
    rating: 9.4,
    status: "reading",
    progress: "18%",
    quote: "知识可以传授，但智慧不能。",
    thoughts:
      "一场关于自我寻找的河流之旅。黑塞的文字像水一样，缓慢却深刻地渗透进内心。",
  },
  {
    id: "book-013",
    title: "房思琪的初恋乐园",
    author: "林奕含",
    coverUrl:
      "https://images.unsplash.com/photo-1476275466078-4007374efbbe?w=400&h=600&fit=crop&q=80",
    rating: 9.5,
    status: "reading",
    progress: "55%",
    quote: "我要活下去，我为活下去而奋斗，我要对得起我所经历的苦难。",
    thoughts: "极其痛苦也极其美丽的文字。阅读它需要勇气，但书中对人性与权力的凝视值得被记住。",
  },
  {
    id: "book-014",
    title: "围城",
    author: "钱钟书",
    coverUrl:
      "https://images.unsplash.com/photo-1532012197267-da84d127e765?w=400&h=600&fit=crop&q=80",
    rating: 9.3,
    status: "reading",
    progress: "33%",
    quote: "城里的人想逃出来，城外的人想冲进去。",
    thoughts: "钱钟书的幽默里藏着锋利的洞察。婚姻、事业、人生——每一座围城都似曾相识。",
  },
  {
    id: "book-015",
    title: "看不见的城市",
    author: "伊塔洛·卡尔维诺",
    coverUrl:
      "https://images.unsplash.com/photo-1589998059171-988d887df646?w=400&h=600&fit=crop&q=80",
    rating: 9.1,
    status: "reading",
    progress: "12%",
    quote: "你所不喜欢的，你喜欢的，比你自己所想的就是你。",
    thoughts: "每一座城市都是一首散文诗。卡尔维诺用想象力建造了一座座梦境般的迷宫。",
  },
  {
    id: "book-016",
    title: "秋园",
    author: "杨本芬",
    coverUrl:
      "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=600&fit=crop&q=80",
    rating: 9.4,
    status: "reading",
    progress: "76%",
    quote: "我知道一个道理：人该为自己而活，先为自己，再为别人。",
    thoughts: "一位普通老人笔下的母亲一生。朴素、克制，却有撼动心灵的力量。",
  },
  {
    id: "book-003",
    title: "挪威的森林",
    author: "村上春树",
    coverUrl:
      "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=400&h=600&fit=crop&q=80",
    rating: 9.2,
    status: "archived",
    quote: "哪里会有人喜欢孤独，不过是不喜欢失望罢了。",
    thoughts: "青春是一场无法回头的雨。渡边、直子、绿子——三个名字，三种人生态度。",
  },
  {
    id: "book-004",
    title: "人类简史",
    author: "尤瓦尔·赫拉利",
    coverUrl:
      "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=600&fit=crop&q=80",
    rating: 9.4,
    status: "archived",
    quote: "历史的铁则就是：事后看来无可避免的事，在当时看来总是毫不明显。",
    thoughts:
      "从认知革命到科学革命，赫拉利用宏大的叙事框架重新解读了人类七万年的历史。",
  },
  {
    id: "book-005",
    title: "小王子",
    author: "安托万·德·圣-埃克苏佩里",
    coverUrl:
      "https://images.unsplash.com/photo-1476275466078-4007374efbbe?w=400&h=600&fit=crop&q=80",
    rating: 9.7,
    status: "archived",
    quote: "真正重要的东西，用眼睛是看不见的，只有用心才能看见。",
    thoughts: "一部写给成年人的童话。每次重读，都能在新的年龄里发现不同的自己。",
  },
  {
    id: "book-006",
    title: "三体",
    author: "刘慈欣",
    coverUrl:
      "https://images.unsplash.com/photo-1532012197267-da84d127e765?w=400&h=600&fit=crop&q=80",
    rating: 9.5,
    status: "archived",
    quote: "给岁月以文明，而不是给文明以岁月。",
    thoughts:
      "中国科幻的里程碑。黑暗森林法则、降维打击——这些概念已经超越了小说本身，成为文化符号。",
  },
  {
    id: "book-007",
    title: "月亮与六便士",
    author: "威廉·萨默塞特·毛姆",
    coverUrl:
      "https://images.unsplash.com/photo-1589998059171-988d887df646?w=400&h=600&fit=crop&q=80",
    rating: 9.1,
    status: "archived",
    quote: "满地都是六便士，他却抬头看见了月亮。",
    thoughts:
      "斯特里克兰德的选择极端而纯粹——为了艺术，他放弃了家庭、事业和世俗的一切。",
  },
  {
    id: "book-010",
    title: "1984",
    author: "乔治·奥威尔",
    coverUrl:
      "https://images.unsplash.com/photo-1532012197267-da84d127e765?w=400&h=600&fit=crop&q=80",
    rating: 9.3,
    status: "archived",
    quote: "战争即和平，自由即奴役，无知即力量。",
    thoughts: "反乌托邦的经典。每次重读，都能在时代的镜像里看到令人不安的熟悉感。",
  },
  {
    id: "book-011",
    title: "刀锋",
    author: "威廉·萨默塞特·毛姆",
    coverUrl:
      "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=600&fit=crop&q=80",
    rating: 9.0,
    status: "archived",
    quote: "剃刀锋利，难以越过；智者之路，险阻萌生。",
    thoughts: "拉里追寻真理的旅程，是对世俗成功最安静的反叛。",
  },
  {
    id: "book-012",
    title: "追风筝的人",
    author: "卡勒德·胡赛尼",
    coverUrl:
      "https://images.unsplash.com/photo-1589998059171-988d887df646?w=400&h=600&fit=crop&q=80",
    rating: 9.2,
    status: "archived",
    quote: "为你，千千万万遍。",
    thoughts: "关于背叛与救赎的故事。阿富汗的风沙里，藏着人性最柔软的角落。",
  },
];

export function getReadingBooks(limit?: number): Book[] {
  const books = mockBooks.filter((book) => book.status === "reading");
  return limit ? books.slice(0, limit) : books;
}

export function getArchivedBooks(limit?: number): Book[] {
  const books = mockBooks.filter((book) => book.status === "archived");
  return limit ? books.slice(0, limit) : books;
}
