import Footer from "./ui/footer";
import StoryCreator from "./ui/story-creator";

export default function Home() {
  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] h-screen">
      <main className="">
        <StoryCreator />
      </main>
      {/* <Footer /> */}
    </div>
  );
}
