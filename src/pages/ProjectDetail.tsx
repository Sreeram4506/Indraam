import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { projects } from "@/data/projects";
import CustomCursor from "@/components/CustomCursor";

const Stat = ({ label, value }: { label: string; value: string }) => (
  <div className="flex flex-col gap-2 border-t border-black/10 pt-4">
    <p className="text-[10px] uppercase tracking-widest opacity-40">
      {label}
    </p>
    <p className="text-[14px] font-medium text-black">{value}</p>
  </div>
);

const ProjectDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const project = projects.find((p) => p.id === id);

  if (!project) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <p className="text-black opacity-40 text-[10px] uppercase tracking-widest">Project not found.</p>
      </div>
    );
  }

  return (
    <>
      <CustomCursor />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="min-h-screen bg-white text-black selection:bg-black selection:text-white"
      >
        <div className="flex flex-col lg:flex-row min-h-screen">
          <motion.div
            initial={{ x: -60, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
            className="w-full lg:w-1/2 p-8 md:p-16 lg:p-24 flex flex-col justify-center border-r border-black/10 z-10"
          >
            <button
              onClick={() => navigate("/")}
              className="group flex gap-2 items-center text-[10px] uppercase tracking-widest opacity-40 hover:opacity-100 transition-opacity mb-24 w-fit"
            >
              <span className="group-hover:-translate-x-1 transition-transform">{"<-"}</span>
              Back to Works
            </button>

            <span className="text-[10px] uppercase tracking-widest opacity-40 mb-6 inline-block">
              {project.status === "ongoing" ? "Active Build" : "Shipped"}
            </span>

            <h1 className="text-[3rem] md:text-[5rem] font-bold tracking-tighter leading-[0.9] mb-8 hover:font-serif-italic transition-all duration-500 max-w-[12ch]">
              {project.title}
            </h1>

            <p className="text-[14px] opacity-60 leading-[1.8] mb-16 max-w-[40ch]">
              {project.description}
            </p>

            <div className="grid grid-cols-2 gap-8 mb-16">
              <Stat label="Stack" value={project.stack} />
              <Stat label="Timeline" value={project.timeline} />
              <Stat label="Impact" value={project.impact} />
              <Stat label="Progress" value={`${project.progress}%`} />
            </div>
            
            {project.features && project.features.length > 0 && (
              <div className="mb-16">
                <p className="text-[10px] uppercase tracking-widest opacity-40 mb-6">Expert Services & Specialties</p>
                <div className="grid grid-cols-2 gap-x-12 gap-y-3">
                  {project.features.map(feature => (
                    <div key={feature} className="flex items-center gap-3">
                      <div className="w-1.5 h-1.5 bg-[#F58220] rounded-full" />
                      <span className="text-[12px] opacity-70 border-b border-transparent hover:border-black/10 transition-colors cursor-default">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="flex flex-wrap gap-4 mt-auto">
              <button className="btn-premium w-fit border-black/20 text-black hover:bg-black hover:text-white">
                Request Case Study
              </button>
              {project.url && (
                <a 
                  href={project.url} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="btn-premium w-fit border-black/20 text-black hover:bg-black hover:text-white"
                >
                  Visit Project
                </a>
              )}
            </div>
          </motion.div>

          <motion.div
            initial={{ scale: 1.05, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
            className="w-full lg:w-1/2 h-[50vh] lg:h-screen lg:sticky lg:top-0 order-first lg:order-last overflow-hidden"
          >
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover grayscale opacity-80 hover:grayscale-0 hover:opacity-100 transition-all duration-1000"
            />
          </motion.div>
        </div>
      </motion.div>
    </>
  );
};

export default ProjectDetail;
