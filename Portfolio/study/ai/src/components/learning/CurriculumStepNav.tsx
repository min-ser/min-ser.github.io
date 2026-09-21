"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { curriculum, getCurrentCurriculum } from "@/data/curriculum";

export default function CurriculumStepNav() {
  const pathname = usePathname();
  const current = getCurrentCurriculum(pathname);

  if (!current) return null;

  const index = curriculum.findIndex((item) => item.id === current.id);
  const previous = curriculum[index - 1];
  const next = curriculum[index + 1];

  return (
    <nav className="step-nav curriculum-step-nav" aria-label="다음 학습 단계">
      <div>
        {previous && (
          <Link href={previous.route}>
            ← {String(previous.order).padStart(2, "0")} {previous.title}
          </Link>
        )}
      </div>

      <div>
        {next && (
          <Link href={next.route}>
            {String(next.order).padStart(2, "0")} {next.title} →
          </Link>
        )}
      </div>
    </nav>
  );
}
