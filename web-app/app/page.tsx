import Footer from "./ui/footer";
import StoryCreator from "./ui/story-creator";

export default function Home() {
  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-[32px] row-start-2 sm:items-start">
        <StoryCreator />
      </main>
      <Footer />
    </div>
  );
}
