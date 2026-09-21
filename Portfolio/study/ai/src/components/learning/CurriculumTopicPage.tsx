import Link from "next/link";
import {
  allTopics,
  topicHref,
} from "@/data/hierarchicalCurriculum";
import { getTopicContent } from "@/data/topicContent";
import AccordionCurriculumNav from "./AccordionCurriculumNav";
import TopicVisual from "./TopicVisual";
import DynamicConceptLab from "./DynamicConceptLab";
import SpecializedCoreLab from "./SpecializedCoreLab";
import VisionNlpTransformerLabs from "./VisionNlpTransformerLabs";
import LlmVectorLabs from "./LlmVectorLabs";
import RagPromptAgentLabs from "./RagPromptAgentLabs";
import MultimodalGenerativeSystemLabs from "./MultimodalGenerativeSystemLabs";
import InferenceOpsSecurityLabs from "./InferenceOpsSecurityLabs";
import ModernBuildResearchLabs from "./ModernBuildResearchLabs";

export default function CurriculumTopicPage({
  chapterSlug,
  topicSlug,
}: {
  chapterSlug: string;
  topicSlug: string;
}) {
  const current = allTopics.find(
    (item) => item.chapter.slug === chapterSlug && item.slug === topicSlug
  );

  if (!current) return null;

  const index = allTopics.findIndex((item) => item.code === current.code);
  const previous = allTopics[index - 1];
  const next = allTopics[index + 1];
  const content = getTopicContent(current.code);

  return (
    <div className="hierarchical-learning-shell">
      <AccordionCurriculumNav />

      <article className="curriculum-topic-main">
        <header className="curriculum-topic-header">
          <div className="topic-breadcrumb">
            {current.chapter.id}. {current.chapter.title} / {current.code}
          </div>
          <div className="topic-title-row">
            <div>
              <h1>{current.title}</h1>
              <h2>{current.korean}</h2>
            </div>
            <span className={`topic-level ${current.level.toLowerCase()}`}>
              {current.level}
            </span>
          </div>
          <p>{content.summary}</p>
        </header>

        <section className="topic-why-grid">
          <div className="topic-info-card important">
            <div className="concept-label">WHY SHOULD I KNOW THIS?</div>
            <h3>왜 알아야 하나?</h3>
            <p>{content.why}</p>
          </div>
          <div className="topic-info-card">
            <div className="concept-label">WHERE IS IT USED?</div>
            <h3>어디에 사용되나?</h3>
            <div className="topic-row">
              {content.usedFor.map((item) => (
                <span className="chip" key={item}>{item}</span>
              ))}
            </div>
          </div>
        </section>

        <TopicVisual code={current.code} content={content} />

        <SpecializedCoreLab code={current.code} title={current.title} />

        <VisionNlpTransformerLabs code={current.code} />

        <LlmVectorLabs code={current.code} />

        <RagPromptAgentLabs code={current.code} />

        <MultimodalGenerativeSystemLabs code={current.code} />

        <InferenceOpsSecurityLabs code={current.code} />

        <ModernBuildResearchLabs code={current.code} />

        <DynamicConceptLab code={current.code} title={current.title} keyPoints={content.keyPoints} />

        <section className="topic-detail-grid">
          <div className="rich-card">
            <div className="rich-card-title">이 Topic에서 알아야 할 핵심</div>
            <div className="topic-checklist">
              {content.keyPoints.map((item) => (
                <div key={item}><span>✓</span>{item}</div>
              ))}
            </div>
          </div>

          <div className="rich-card">
            <div className="rich-card-title">이해 확인 질문</div>
            <div className="topic-questions">
              {content.questions.map((item, i) => (
                <div key={item}><span>Q{i + 1}</span>{item}</div>
              ))}
            </div>
          </div>
        </section>

        <section className="topic-context-card">
          <div>
            <div className="concept-label">CATEGORY</div>
            <strong>{current.chapter.title}</strong>
            <p>{current.chapter.description}</p>
          </div>
          <div>
            <div className="concept-label">CURRENT PATH</div>
            <strong>{current.code} {current.title}</strong>
            <p>이 Topic의 위치와 앞뒤 순서를 항상 Curriculum 기준으로 유지합니다.</p>
          </div>
        </section>

        <nav className="step-nav">
          <div>
            {previous && (
              <Link href={topicHref(previous.chapter.slug, previous.slug)}>
                ← {previous.code} {previous.title}
              </Link>
            )}
          </div>
          <div>
            {next && (
              <Link href={topicHref(next.chapter.slug, next.slug)}>
                {next.code} {next.title} →
              </Link>
            )}
          </div>
        </nav>
      </article>
    </div>
  );
}
