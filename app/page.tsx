import Header from "@/components/Header";
import Hero from "@/components/Hero";
import CurrentlyReading from "@/components/CurrentlyReading";
import Archive from "@/components/Archive";
import { getArchivedBooks, getReadingBooks } from "@/lib/mockData";

export default function Home() {
  const readingBooks = getReadingBooks(8);
  const archivedBooks = getArchivedBooks(8);

  return (
    <>
      <Header />
      <main>
        <Hero />
        <div id="library" className="space-y-24 pb-24 md:space-y-32 md:pb-32 lg:space-y-40 lg:pb-40">
          <CurrentlyReading books={readingBooks} />
          <Archive books={archivedBooks} />
        </div>
      </main>
    </>
  );
}
