import {
  allTopics,
} from "@/data/hierarchicalCurriculum";
import CurriculumTopicPage from "@/components/learning/CurriculumTopicPage";

export function generateStaticParams() {
  return allTopics.map(({ chapter, slug }) => ({
    chapter: chapter.slug,
    topic: slug,
  }));
}

export default async function Page({
  params,
}: {
  params: Promise<{ chapter: string; topic: string }>;
}) {
  const { chapter, topic } = await params;
  return <CurriculumTopicPage chapterSlug={chapter} topicSlug={topic} />;
}
