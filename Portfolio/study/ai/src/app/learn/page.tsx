import Link from "next/link";
import {
  chapters,
  allTopics,
  topicHref,
} from "@/data/hierarchicalCurriculum";

export default function LearnPage() {
  return (
    <section className="section curriculum-index">
      <div className="section-title">
        <div>
          <div className="eyebrow">LEARNING CURRICULUM</div>
          <h2>Chapter → Topic → Concept</h2>
          <p className="muted">
            AI 전체 지도를 먼저 잡고 각 분야를 균형 있게 학습하도록 커리큘럼을 계층형으로 재설계했습니다.
          </p>
        </div>
        <div className="muted">{chapters.length} Chapters · {allTopics.length} Topics</div>
      </div>

      <div className="curriculum-chapter-grid">
        {chapters.map((chapter) => {
          const first = chapter.topics[0];
          return (
            <Link
              className="curriculum-chapter-card"
              href={topicHref(chapter.slug, first.slug)}
              key={chapter.id}
            >
              <div className="curriculum-chapter-number">{chapter.id}</div>
              <div>
                <strong>{chapter.title}</strong>
                <span>{chapter.korean}</span>
                <p>{chapter.description}</p>
              </div>
              <em>{chapter.topics.length} Topics</em>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
