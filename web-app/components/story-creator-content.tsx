import { Page } from "@/lib/models";

type Props = {
  page: Page
}

const StoryCreatorContent: React.FC<Props> = ({ page }) => {
  if (!page) {
    return null;
  }

  return (
    <div>
      <h1>{page.pageName}</h1>
    </div>
  )
}

export default StoryCreatorContent;
