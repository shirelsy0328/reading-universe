import Header from "@/components/Header";
import Hero from "@/components/Hero";
import CurrentlyReading from "@/components/CurrentlyReading";
import WantToRead from "@/components/WantToRead";
import Archive from "@/components/Archive";
import { getArchivedBooks, getReadingBooks, getWantToReadBooks } from "@/lib/books/store";

export default async function Home() {
  const readingBooks = await getReadingBooks(8);
  const wantToReadBooks = await getWantToReadBooks(8);
  const archivedBooks = await getArchivedBooks(8);

  return (
    <>
      <Header />
      <main>
        <Hero />
        <div id="library" className="space-y-24 pb-24 md:space-y-32 md:pb-32 lg:space-y-40 lg:pb-40">
          <CurrentlyReading books={readingBooks} />
          <WantToRead books={wantToReadBooks} />
          <Archive books={archivedBooks} />
        </div>
      </main>
    </>
  );
}
