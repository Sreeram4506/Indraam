import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Search } from "lucide-react";
import { projects } from "@/data/projects";
import { ProjectCard } from "./ProjectCard";

const filters = ["All", "SaaS", "AI", "Platform", "Ongoing", "Completed"] as const;

export const ProjectFeed = () => {
  const [activeFilter, setActiveFilter] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filtered = useMemo(() => {
    return projects.filter((project) => {
      const matchesSearch =
        !searchQuery ||
        project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.description.toLowerCase().includes(searchQuery.toLowerCase());

      if (!matchesSearch) return false;
      if (activeFilter === "All") return true;
      if (activeFilter === "Ongoing") return project.status === "ongoing";
      if (activeFilter === "Completed") return project.status === "completed";
      return project.category === activeFilter.toLowerCase();
    });
  }, [activeFilter, searchQuery]);

  return (
    <section id="projects" className="py-24 px-4 md:px-0">
      <div className="max-w-xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
          className="mb-12"
        >
          <p className="font-mono-meta mb-4">Live Feed</p>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tighter text-foreground leading-[0.9]">
            Tech Works Feed
          </h2>
        </motion.div>

        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search tech projects..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-secondary border border-border rounded-sm text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-accent transition-shadow"
          />
        </div>

        <div className="flex flex-wrap gap-2 mb-12">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-4 py-2 rounded-sm text-xs font-medium tracking-tight transition-colors ease-quintic ${
                activeFilter === filter
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-muted-foreground hover:text-foreground"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        {filtered.length === 0 ? (
          <p className="text-sm text-muted-foreground text-center py-12">No projects found.</p>
        ) : (
          filtered.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))
        )}
      </div>
    </section>
  );
};
