"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  chapters,
  findTopicByPath,
  topicHref,
} from "@/data/hierarchicalCurriculum";

export default function AccordionCurriculumNav() {
  const pathname = usePathname();
  const current = findTopicByPath(pathname);
  const [openChapter, setOpenChapter] = useState(
    current?.chapter.id ?? chapters[0].id
  );

  useEffect(() => {
    if (current) setOpenChapter(current.chapter.id);
  }, [current?.chapter.id]);

  return (
    <aside className="accordion-curriculum-nav">
      <section className="accordion-nav-card">
        <div className="accordion-nav-title">LEARNING CURRICULUM</div>

        {chapters.map((chapter) => {
          const open = openChapter === chapter.id;
          const currentInChapter = current?.chapter.id === chapter.id;

          return (
            <div className="accordion-chapter" key={chapter.id}>
              <button
                type="button"
                className={`accordion-chapter-button ${
                  currentInChapter ? "current" : ""
                }`}
                onClick={() =>
                  setOpenChapter((prev) =>
                    prev === chapter.id ? "" : chapter.id
                  )
                }
                aria-expanded={open}
              >
                <span>{open ? "▼" : "▶"}</span>
                <strong>
                  {chapter.id}. {chapter.title}
                </strong>
                <small>{chapter.topics.length}</small>
              </button>

              {open && (
                <nav className="accordion-topic-list">
                  {chapter.topics.map((topic) => {
                    const active = current?.code === topic.code;

                    return (
                      <Link
                        key={topic.code}
                        href={topicHref(chapter.slug, topic.slug)}
                        className={`accordion-topic ${active ? "active" : ""}`}
                      >
                        <span>{active ? "●" : "○"}</span>
                        <div>
                          <strong>{topic.code} {topic.title}</strong>
                          <small>{topic.korean}</small>
                        </div>
                        <em className={topic.level.toLowerCase()}>
                          {topic.level === "CORE"
                            ? "CORE"
                            : topic.level === "RECOMMENDED"
                            ? "REC"
                            : topic.level === "REFERENCE"
                            ? "REF"
                            : "ADV"}
                        </em>
                      </Link>
                    );
                  })}
                </nav>
              )}
            </div>
          );
        })}
      </section>

      <section className="accordion-nav-card compact">
        <div className="accordion-nav-title">QUICK PATH</div>
        <Link href="/learn/curriculum/ai-foundation/what-is-ai/">START FROM ZERO →</Link>
        <Link href="/learn/curriculum/deep-learning-foundation/neuron/">NEURAL NETWORK →</Link>
        <Link href="/learn/curriculum/transformer/why-transformer/">TRANSFORMER →</Link>
        <Link href="/lab/">LAB →</Link>
      </section>
    </aside>
  );
}
