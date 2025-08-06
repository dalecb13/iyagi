import { Page } from "@/lib/models";

type Props = {
  page: Page
  aspectRatio: string
}

const StoryCreatorContent: React.FC<Props> = ({ page, aspectRatio }) => {
  if (!page) {
    return null;
  }

  // if (aspectRatio === '3x4') {
  //   return (
  //     <canvas id="myCanvas" width="1024" height="768">
  //       <h1>{page.pageName}</h1>
  //     </canvas>
  //   )
  // } else if (aspectRatio === '16x9') {
  //   return (
  //     <canvas id="myCanvas" width="1920" height="1080">
  //       <h1>{page.pageName}</h1>
  //     </canvas>
  //   )
  // }

  return (
    
    <canvas id="myCanvas" width="1080" height="810">
      <h1>{page.pageName}</h1>
    </canvas>
  )
}

export default StoryCreatorContent;
