"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { chapters, allTopics, findTopicByPath, topicHref } from "@/data/hierarchicalCurriculum";

export default function ChapterGlobalFlow() {
  const pathname = usePathname();

  if (!pathname.startsWith("/learn/")) return null;

  const current = findTopicByPath(pathname);
  const currentIndex = current
    ? allTopics.findIndex((item) => item.code === current.code)
    : -1;

  const progress =
    currentIndex >= 0
      ? Math.round(((currentIndex + 1) / allTopics.length) * 100)
      : 0;

  return (
    <section className="chapter-global-flow">
      <div className="chapter-flow-head">
        <div>
          <div className="eyebrow">GLOBAL LEARNING FLOW</div>
          <strong>AI 전체 학습 지도</strong>
          <span>
            {current
              ? `${current.code} ${current.title} · ${current.chapter.title}`
              : "Chapter를 선택해 학습을 시작하세요."}
          </span>
        </div>

        <div className="chapter-total-progress">
          <span>현재 위치 기준 전체 진행</span>
          <div><i style={{ width: `${progress}%` }} /></div>
          <b>{progress}%</b>
        </div>
      </div>

      <div className="chapter-flow-row">
        {chapters.map((chapter) => {
          const chapterTopicIndexes = chapter.topics.map((topic) =>
            allTopics.findIndex((item) => item.code === topic.code)
          );
          const firstIndex = Math.min(...chapterTopicIndexes);
          const lastIndex = Math.max(...chapterTopicIndexes);
          const active = current?.chapter.id === chapter.id;
          const passed = currentIndex > lastIndex;
          const chapterProgress =
            currentIndex < firstIndex
              ? 0
              : currentIndex >= lastIndex
              ? 100
              : Math.round(
                  ((currentIndex - firstIndex + 1) / chapter.topics.length) * 100
                );

          const first = chapter.topics[0];

          return (
            <Link
              key={chapter.id}
              href={topicHref(chapter.slug, first.slug)}
              className={`chapter-flow-card ${active ? "active" : ""} ${
                passed ? "passed" : ""
              }`}
            >
              <span>{chapter.id}</span>
              <strong>{chapter.title}</strong>
              <small>{chapter.korean}</small>
              <div className="mini-chapter-progress">
                <i style={{ width: `${chapterProgress}%` }} />
              </div>
              <em>{chapterProgress}%</em>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
