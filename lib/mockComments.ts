export interface VisitorComment {
  id: string;
  bookId: string;
  author: string;
  content: string;
  createdAt: string;
}

export const mockVisitorComments: VisitorComment[] = [
  {
    id: "vc-001",
    bookId: "book-001",
    author: "林间读者",
    content: "读第三遍才看懂时间的循环。每读一次，都能在新的年龄里遇见不同的自己。",
    createdAt: "2025-11-12",
  },
  {
    id: "vc-002",
    bookId: "book-001",
    author: "书页旅人",
    content: "马尔克斯的文字像一场不会醒来的梦，合上书页后仍有余韵。",
    createdAt: "2025-12-03",
  },
  {
    id: "vc-003",
    bookId: "book-002",
    author: "夜读笔记",
    content: "福贵的一生让我重新理解了「活着」这两个字的分量。",
    createdAt: "2026-01-08",
  },
  {
    id: "vc-004",
    bookId: "book-003",
    author: "渡边君",
    content: "青春是一场无法回头的雨，村上春树写尽了那种透明的 sadness。",
    createdAt: "2025-10-20",
  },
  {
    id: "vc-005",
    bookId: "book-005",
    author: "小狐狸",
    content: "成年人也需要童话。每次读到玫瑰与狐狸，都会眼眶发热。",
    createdAt: "2026-02-14",
  },
  {
    id: "vc-006",
    bookId: "book-006",
    author: "科幻迷",
    content: "黑暗森林法则改变了我看宇宙的方式。刘慈欣的想象力令人敬畏。",
    createdAt: "2025-09-30",
  },
  {
    id: "vc-007",
    bookId: "book-008",
    author: "经济笔记",
    content: "兰小欢把复杂的宏观逻辑讲得像故事一样好读，强烈推荐。",
    createdAt: "2026-01-22",
  },
  {
    id: "vc-008",
    bookId: "book-009",
    author: "河流之子",
    content: "悉达多在河边悟道的那段，是我今年读到的最美文字之一。",
    createdAt: "2025-12-18",
  },
];

export function getVisitorCommentsForBook(bookId: string): VisitorComment[] {
  return mockVisitorComments.filter((comment) => comment.bookId === bookId);
}
