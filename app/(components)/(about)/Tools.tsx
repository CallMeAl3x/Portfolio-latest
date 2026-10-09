"use client";
import { useMessages } from "next-intl";
import { useEffect, useRef, useState } from "react";
import { useReveal } from "../../(utils)/useReveal";

interface Tech {
  name: string;
  icon: string;
  invert?: boolean;
}
interface ToolGroup {
  title: string;
  technologies: Tech[];
}
const GROUPS = ["front", "back", "ops"] as const;

// Trois blocs reliés en pointillés : Interface / Serveur / Mise en ligne
export default function Tools() {
  const messages = useMessages() as unknown as { About: { tools: { groups: Record<string, ToolGroup> } } };
  const groups = messages.About.tools.groups;
  const dgRef = useReveal<HTMLDivElement>();
  const svgRef = useRef<SVGSVGElement>(null);
  // bloc survolé : les liaisons qui y arrivent s'animent
  const [active, setActive] = useState<number | null>(null);

  // liaisons entre blocs : calculées sur les vrais blocs, recalculées au redimensionnement
  useEffect(() => {
    const dg = dgRef.current;
    const svg = svgRef.current;
    if (!dg || !svg) return;
    const layout = () => {
      const r = dg.getBoundingClientRect();
      const nodes = [...dg.querySelectorAll(".hm-node")].map((n) => n.getBoundingClientRect());
      svg.setAttribute("viewBox", `0 0 ${r.width} ${r.height}`);
      const paths = svg.querySelectorAll("path");
      paths.forEach((path, i) => {
        const a = nodes[i];
        const b = nodes[i + 1];
        if (innerWidth < 760 || !a || !b) {
          path.setAttribute("d", "");
          return;
        }
        const y = a.top + a.height / 2 - r.top;
        path.setAttribute("d", `M${a.right - r.left} ${y} H${b.left - r.left}`);
      });
    };
    layout();
    const ro = new ResizeObserver(layout);
    ro.observe(dg);
    document.fonts?.ready.then(layout);
    return () => ro.disconnect();
  }, [dgRef]);

  return (
    <div className="hm-rv hm-diagram" ref={dgRef}>
      <svg className="hm-dg-svg" ref={svgRef} aria-hidden="true">
        {GROUPS.slice(1).map((g, i) => (
          <path key={g} className={active !== null && (i === active || i + 1 === active) ? "flow" : undefined} />
        ))}
      </svg>
      {GROUPS.map((g, i) => (
        <div
          className="hm-node"
          key={g}
          onMouseEnter={() => setActive(i)}
          onMouseLeave={() => setActive(null)}
        >
          <p className="hm-mono">{groups[g].title}</p>
          <ul>
            {groups[g].technologies.map((tech) => (
              <li key={tech.name}>
                <img src={tech.icon} alt="" data-invert={tech.invert ? "" : undefined} width={22} height={22} />
                {tech.name}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
