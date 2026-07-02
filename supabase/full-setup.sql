-- Theory Desk / READING.UNIVERSE books table
-- Run once in Supabase Dashboard → SQL Editor, or via: npm run db:setup

create table if not exists public.books (
  id text primary key,
  title text not null,
  author text not null,
  cover_url text not null,
  rating numeric(4, 1) not null default 0,
  status text not null check (status in ('reading', 'archived', 'want-to-read')),
  progress text,
  quote text,
  thoughts text,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists books_status_idx on public.books (status);
create index if not exists books_sort_order_idx on public.books (sort_order);

alter table public.books enable row level security;

drop policy if exists "books_public_read" on public.books;
create policy "books_public_read"
  on public.books
  for select
  using (true);

-- Writes are handled server-side (service role bypasses RLS).
-- Fallback policies for anon key during local development:
drop policy if exists "books_public_insert" on public.books;
drop policy if exists "books_public_update" on public.books;
drop policy if exists "books_public_delete" on public.books;

create policy "books_public_insert"
  on public.books
  for insert
  with check (true);

create policy "books_public_update"
  on public.books
  for update
  using (true)
  with check (true);

create policy "books_public_delete"
  on public.books
  for delete
  using (true);

create or replace function public.set_books_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists books_updated_at on public.books;
create trigger books_updated_at
  before update on public.books
  for each row
  execute function public.set_books_updated_at();


insert into public.books (id, title, author, cover_url, rating, status, progress, quote, thoughts, sort_order)
values
('book-001', '百年孤独', '加西亚·马尔克斯', 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=600&fit=crop&q=80', 9.8, 'want-to-read', '65%', '许多年后，面对行刑队，奥雷里亚诺·布恩迪亚上校将会回想起父亲带他去见识冰块的那个遥远的下午。', '魔幻现实主义的巅峰之作。每一页都像在翻阅一个家族的梦境，时间在这里不再是线性的，而是循环的、重叠的。', 0),
('book-002', '活着', '余华', 'https://images.unsplash.com/photo-1519682337058-a94d519337bc?w=400&h=600&fit=crop&q=80', 9.6, 'reading', '42%', '人是为了活着本身而活着的，而不是为了活着之外的任何事物而活着。', '福贵的一生是中国近代史的缩影。苦难没有将他击垮，反而让他活得更通透。读这本书，需要勇气。', 1),
('book-008', '置身事内', '兰小欢', 'https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=400&h=600&fit=crop&q=80', 9.3, 'reading', '28%', '理解中国经济，需要理解地方政府的行为逻辑。', '用通俗的语言拆解宏观经济的底层逻辑。每读一章，对身边世界的感知就清晰一分。', 2),
('book-009', '悉达多', '赫尔曼·黑塞', 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=600&fit=crop&q=80', 9.4, 'reading', '18%', '知识可以传授，但智慧不能。', '一场关于自我寻找的河流之旅。黑塞的文字像水一样，缓慢却深刻地渗透进内心。', 3),
('book-013', '房思琪的初恋乐园', '林奕含', 'https://images.unsplash.com/photo-1476275466078-4007374efbbe?w=400&h=600&fit=crop&q=80', 9.5, 'reading', '55%', '我要活下去，我为活下去而奋斗，我要对得起我所经历的苦难。', '极其痛苦也极其美丽的文字。阅读它需要勇气，但书中对人性与权力的凝视值得被记住。', 4),
('book-014', '围城', '钱钟书', 'https://images.unsplash.com/photo-1532012197267-da84d127e765?w=400&h=600&fit=crop&q=80', 9.3, 'reading', '33%', '城里的人想逃出来，城外的人想冲进去。', '钱钟书的幽默里藏着锋利的洞察。婚姻、事业、人生——每一座围城都似曾相识。', 5),
('book-015', '看不见的城市', '伊塔洛·卡尔维诺', 'https://images.unsplash.com/photo-1589998059171-988d887df646?w=400&h=600&fit=crop&q=80', 9.1, 'reading', '12%', '你所不喜欢的，你喜欢的，比你自己所想的就是你。', '每一座城市都是一首散文诗。卡尔维诺用想象力建造了一座座梦境般的迷宫。', 6),
('book-016', '秋园', '杨本芬', 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=600&fit=crop&q=80', 9.4, 'reading', '76%', '我知道一个道理：人该为自己而活，先为自己，再为别人。', '一位普通老人笔下的母亲一生。朴素、克制，却有撼动心灵的力量。', 7),
('book-003', '挪威的森林', '村上春树', 'https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=400&h=600&fit=crop&q=80', 9.2, 'archived', null, '哪里会有人喜欢孤独，不过是不喜欢失望罢了。', '青春是一场无法回头的雨。渡边、直子、绿子——三个名字，三种人生态度。', 8),
('book-004', '人类简史', '尤瓦尔·赫拉利', 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=600&fit=crop&q=80', 9.4, 'archived', null, '历史的铁则就是：事后看来无可避免的事，在当时看来总是毫不明显。', '从认知革命到科学革命，赫拉利用宏大的叙事框架重新解读了人类七万年的历史。', 9),
('book-005', '小王子', '安托万·德·圣-埃克苏佩里', 'https://images.unsplash.com/photo-1476275466078-4007374efbbe?w=400&h=600&fit=crop&q=80', 9.7, 'archived', null, '真正重要的东西，用眼睛是看不见的，只有用心才能看见。', '一部写给成年人的童话。每次重读，都能在新的年龄里发现不同的自己。', 10),
('book-006', '三体', '刘慈欣', 'https://images.unsplash.com/photo-1532012197267-da84d127e765?w=400&h=600&fit=crop&q=80', 9.5, 'archived', null, '给岁月以文明，而不是给文明以岁月。', '中国科幻的里程碑。黑暗森林法则、降维打击——这些概念已经超越了小说本身，成为文化符号。', 11),
('book-007', '月亮与六便士', '威廉·萨默塞特·毛姆', 'https://images.unsplash.com/photo-1589998059171-988d887df646?w=400&h=600&fit=crop&q=80', 9.1, 'archived', null, '满地都是六便士，他却抬头看见了月亮。', '斯特里克兰德的选择极端而纯粹——为了艺术，他放弃了家庭、事业和世俗的一切。', 12),
('book-010', '1984', '乔治·奥威尔', 'https://images.unsplash.com/photo-1532012197267-da84d127e765?w=400&h=600&fit=crop&q=80', 9.3, 'archived', null, '战争即和平，自由即奴役，无知即力量。', '反乌托邦的经典。每次重读，都能在时代的镜像里看到令人不安的熟悉感。', 13),
('book-011', '刀锋', '威廉·萨默塞特·毛姆', 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=600&fit=crop&q=80', 9, 'archived', null, '剃刀锋利，难以越过；智者之路，险阻萌生。', '拉里追寻真理的旅程，是对世俗成功最安静的反叛。', 14),
('book-012', '追风筝的人', '卡勒德·胡赛尼', 'https://images.unsplash.com/photo-1589998059171-988d887df646?w=400&h=600&fit=crop&q=80', 9.2, 'archived', null, '为你，千千万万遍。', '关于背叛与救赎的故事。阿富汗的风沙里，藏着人性最柔软的角落。', 15)
on conflict (id) do update set
  title = excluded.title,
  author = excluded.author,
  cover_url = excluded.cover_url,
  rating = excluded.rating,
  status = excluded.status,
  progress = excluded.progress,
  quote = excluded.quote,
  thoughts = excluded.thoughts,
  sort_order = excluded.sort_order,
  updated_at = now();
