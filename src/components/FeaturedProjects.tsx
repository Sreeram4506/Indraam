import { motion } from "framer-motion";
import type { KeyboardEvent } from "react";
import { useNavigate } from "react-router-dom";
import { projects } from "@/data/projects";

const categoryTags: Record<string, string[]> = {
  saas: ["SAAS", "PRODUCT"],
  ai: ["AI", "INTELLIGENCE"],
  platform: ["PLATFORM", "SYSTEMS"],
};

export const FeaturedProjects = () => {
  const navigate = useNavigate();

  const activateProject = (id: string) => {
    navigate(`/project/${id}`);
  };

  const handleProjectKeyDown = (event: KeyboardEvent<HTMLElement>, id: string) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      activateProject(id);
    }
  };

  return (
    <section id="projects" className="relative overflow-hidden bg-[#080808] py-20 text-white md:py-40">
      <motion.div
        className="pointer-events-none absolute bottom-0 left-1/2 h-[300px] w-[800px] -translate-x-1/2 opacity-10"
        animate={{
          opacity: [0.08, 0.14, 0.09],
          scale: [1, 1.06, 0.98],
          y: [0, -12, 8],
        }}
        transition={{
          duration: 14,
          ease: "easeInOut",
          repeat: Infinity,
          repeatType: "mirror",
        }}
        style={{
          background: "radial-gradient(ellipse, #00F5FF, transparent 60%)",
          filter: "blur(80px)",
        }}
      />

      <div className="relative z-10 mx-auto max-w-[1400px] px-5 md:px-12">
        <div className="mb-14 flex flex-col items-start gap-3 border-b border-white/10 pb-6 md:mb-32 md:flex-row md:items-end md:justify-between md:gap-0 md:pb-8">
          <motion.span
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
            className="section-label mb-0"
          >
            Tech Works
          </motion.span>
          <span className="text-[10px] uppercase tracking-[0.2em] text-white/30">
            {projects.length} Builds
          </span>
        </div>

        <div className="space-y-16 md:space-y-40">
          {projects.slice(0, 4).map((project, index) => (
            <motion.article
              key={project.id}
              initial={{ opacity: 0, y: 80 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -8 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 1.1, ease: [0.23, 1, 0.32, 1] }}
              onClick={() => activateProject(project.id)}
              onKeyDown={(event) => handleProjectKeyDown(event, project.id)}
              data-cursor="discover"
              data-cursor-size="large"
              role="link"
              tabIndex={0}
              aria-label={`Open ${project.title} project`}
              className="group relative flex cursor-pointer flex-col outline-none"
            >
              <div className="mb-5 flex flex-col gap-4 md:mb-8 md:flex-row md:items-end md:justify-between">
                <div className="flex items-end gap-4 md:gap-10">
                  <span className="mb-1 text-[10px] font-medium tabular-nums text-white/20 md:text-[11px]">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3
                    className="font-bold leading-[0.9] tracking-tighter text-white transition-all duration-500 group-hover:italic group-hover:text-[#f3e4d8]"
                    style={{ fontSize: "clamp(1.8rem, 9.5vw, 6rem)" }}
                  >
                    {project.title}
                  </h3>
                </div>

                <div className="mt-2 hidden items-center gap-2 self-start md:flex">
                  {(project.tags.length ? project.tags : categoryTags[project.category])
                    ?.slice(0, 3)
                    .map((tag) => (
                      <span key={tag} className="tag-pill transition-transform duration-500 group-hover:-translate-y-1">
                        {tag}
                      </span>
                    ))}
                </div>
              </div>

              <div className="mb-5 flex flex-wrap gap-2 md:hidden">
                {(project.tags.length ? project.tags : categoryTags[project.category])?.slice(0, 2).map((tag) => (
                  <span key={tag} className="tag-pill">
                    {tag}
                  </span>
                ))}
              </div>

              <div className="relative aspect-[4/5] overflow-hidden rounded-[28px] bg-[#111] sm:aspect-[16/9] md:aspect-[21/9] md:rounded-none">
                <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-100 transition-opacity duration-700 group-hover:opacity-60" />
                <div className="absolute inset-0 z-10 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.12),transparent_55%)] opacity-0 transition-opacity duration-700 group-hover:opacity-100" />

                <motion.img
                  src={project.image}
                  alt={project.title}
                  className="h-full w-full scale-100 object-cover brightness-75 grayscale transition-transform duration-1000 ease-out group-hover:scale-105 group-hover:brightness-90 group-hover:grayscale-0"
                  loading="lazy"
                />
              </div>

              <div className="mt-5 grid grid-cols-1 gap-4 border-b border-white/8 pb-6 transition-colors duration-500 group-hover:border-white/16 sm:grid-cols-2 md:grid-cols-3 md:gap-6">
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] uppercase tracking-[0.2em] text-white/35">Stack</span>
                  <span className="text-[13px] font-medium text-white/80 transition-colors duration-500 group-hover:text-white/95">
                    {project.stack}
                  </span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] uppercase tracking-[0.2em] text-white/35">Timeline</span>
                  <span className="text-[13px] font-medium text-white/80 transition-colors duration-500 group-hover:text-white/95">
                    {project.timeline}
                  </span>
                </div>
                <div className="flex flex-col gap-1 sm:col-span-2 md:col-span-1 md:items-end">
                  <span className="text-[10px] uppercase tracking-[0.2em] text-white/35">Impact</span>
                  <span className={`text-[13px] font-medium ${project.status === "ongoing" ? "text-[#00F5FF]" : "text-white/70"}`}>
                    {project.impact}
                  </span>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-16 flex justify-center md:mt-40"
        >
          <a href="#services" className="btn-premium w-full justify-center sm:w-auto">
            Explore Tech Stack
          </a>
        </motion.div>
      </div>
    </section>
  );
};
