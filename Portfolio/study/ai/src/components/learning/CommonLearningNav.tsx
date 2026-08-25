"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { curriculum, curriculumPhases, getCurrentCurriculum } from "@/data/curriculum";

const quickPaths = [
  {
    label: "START FROM ZERO",
    description: "AI부터 순서대로",
    href: "/learn/foundation/01-ai/",
    className: "blue",
  },
  {
    label: "NEURAL NETWORK",
    description: "뉴런부터 내부 계산",
    href: "/learn/01-neuron/",
    className: "purple",
  },
  {
    label: "TRANSFORMER",
    description: "LLM 핵심 구조부터",
    href: "/learn/12-token-embedding/",
    className: "green",
  },
  {
    label: "LAB",
    description: "직접 조작하고 실험",
    href: "/lab/",
    className: "amber",
  },
] as const;

export default function CommonLearningNav() {
  const pathname = usePathname();
  const current = getCurrentCurriculum(pathname);
  const currentIndex = current
    ? curriculum.findIndex((item) => item.id === current.id)
    : -1;

  return (
    <aside className="common-learning-nav">
      <section className="common-nav-section">
        <div className="common-nav-title">학습 시작점</div>
        <div className="common-quick-paths">
          {quickPaths.map((item) => (
            <Link
              key={item.label}
              className={`common-quick-path ${item.className}`}
              href={item.href}
            >
              <strong>{item.label}</strong>
              <small>{item.description}</small>
            </Link>
          ))}
        </div>
      </section>

      <section className="common-nav-section">
        <div className="common-nav-title-row">
          <div className="common-nav-title">전체 학습 목차</div>
          <span>{curriculum.length} Steps</span>
        </div>

        <nav className="common-curriculum-nav" aria-label="전체 AI 학습 목차">
          {curriculumPhases.map((phase) => {
            const phaseItems = curriculum.filter((item) => item.phase === phase);

            return (
              <div className="common-phase-group" key={phase}>
                <div className="common-phase-title">{phase}</div>

                {phaseItems.map((item) => {
                  const index = curriculum.findIndex((x) => x.id === item.id);
                  const active = current?.id === item.id;
                  const passed = currentIndex > index;

                  return (
                    <Link
                      key={item.id}
                      href={item.route}
                      className={`common-curriculum-link ${
                        active ? "active" : ""
                      } ${passed ? "passed" : ""}`}
                    >
                      <span className="common-step-state">
                        {active ? "●" : passed ? "✓" : "○"}
                      </span>

                      <span className="common-step-number">
                        {String(item.order).padStart(2, "0")}
                      </span>

                      <span className="common-step-name">
                        <strong>{item.title}</strong>
                        <small>{item.korean}</small>
                      </span>

                      <span
                        className={`common-priority ${item.priority.toLowerCase()}`}
                      >
                        {item.priority === "REQUIRED" ? "REQ" : "REC"}
                      </span>
                    </Link>
                  );
                })}
              </div>
            );
          })}
        </nav>
      </section>

      <section className="common-nav-section common-current-section">
        <div className="common-nav-title">현재 위치</div>

        {current ? (
          <>
            <strong>
              {String(current.order).padStart(2, "0")} {current.title}
            </strong>
            <small>{current.phase}</small>
          </>
        ) : (
          <>
            <strong>Learning Roadmap</strong>
            <small>학습할 단계를 선택하세요.</small>
          </>
        )}

        <Link className="btn common-roadmap-button" href="/learn/">
          전체 로드맵 보기 →
        </Link>
      </section>
    </aside>
  );
}
