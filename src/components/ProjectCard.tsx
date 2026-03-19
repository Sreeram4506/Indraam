import { motion } from "framer-motion";
import { Heart, Share2, Bookmark } from "lucide-react";
import { type Project } from "@/data/projects";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface ProjectCardProps {
  project: Project;
  index: number;
}

export const ProjectCard = ({ project }: ProjectCardProps) => {
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const navigate = useNavigate();

  return (
    <motion.article
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
      className="border-b border-border pb-10 mb-10 last:border-0"
    >
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
        className="flex items-center justify-between mb-4"
      >
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-secondary border border-border flex items-center justify-center">
            <span className="text-[10px] font-semibold text-foreground">TW</span>
          </div>
          <span className="font-medium text-sm tracking-tight text-foreground">{project.title}</span>
        </div>
        <span className="font-mono-meta">
          {project.status}
        </span>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: -60 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.8, delay: 0.1, ease: [0.23, 1, 0.32, 1] }}
        onClick={() => navigate(`/project/${project.id}`)}
        className="relative aspect-[4/5] overflow-hidden bg-secondary rounded-sm border border-border cursor-pointer group"
      >
        <motion.img
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-foreground/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        <div className="absolute bottom-0 left-0 right-0 p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-t from-foreground/60 to-transparent">
          <div className="flex gap-6">
            <div>
              <p className="font-mono-meta text-primary-foreground/70">Stack</p>
              <p className="text-sm font-medium text-primary-foreground mt-1">{project.stack}</p>
            </div>
            <div>
              <p className="font-mono-meta text-primary-foreground/70">Timeline</p>
              <p className="text-sm font-medium text-primary-foreground mt-1">{project.timeline}</p>
            </div>
            <div>
              <p className="font-mono-meta text-primary-foreground/70">Progress</p>
              <p className="text-sm font-medium text-primary-foreground mt-1">{project.progress}%</p>
            </div>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.6, delay: 0.2, ease: [0.23, 1, 0.32, 1] }}
        className="flex gap-4 py-4"
      >
        <button onClick={() => setLiked(!liked)} className="hover:scale-110 transition-transform ease-quintic">
          <Heart className={`w-5 h-5 ${liked ? "fill-accent text-accent" : "text-foreground"}`} />
        </button>
        <button className="hover:scale-110 transition-transform ease-quintic">
          <Share2 className="w-5 h-5 text-foreground" />
        </button>
        <div className="flex-grow" />
        <button onClick={() => setSaved(!saved)} className="hover:scale-110 transition-transform ease-quintic">
          <Bookmark className={`w-5 h-5 ${saved ? "fill-foreground text-foreground" : "text-foreground"}`} />
        </button>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 40 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.7, delay: 0.25, ease: [0.23, 1, 0.32, 1] }}
      >
        <p className="font-mono-meta mb-2">{project.likes + (liked ? 1 : 0)} reactions</p>
        <p className="text-sm leading-relaxed text-muted-foreground max-w-[50ch]">
          <span className="font-semibold text-foreground mr-2">Tech Work</span>
          {project.description}
        </p>
      </motion.div>
    </motion.article>
  );
};
