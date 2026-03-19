import { motion } from "framer-motion";

export const ContactSection = () => (
  <section id="contact" className="py-24 px-4 md:px-0 border-t border-border">
    <div className="max-w-xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
      >
        <p className="font-mono-meta mb-4">Get in Touch</p>
        <h2 className="text-3xl md:text-4xl font-bold tracking-tighter text-foreground leading-[0.9] mb-8">
          Request a Prospectus
        </h2>
        <p className="text-sm text-muted-foreground leading-relaxed mb-10 max-w-[50ch]">
          Interested in learning more about our developments? Complete the form below and our team will be in touch within 24 hours.
        </p>

        <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
          <input
            type="text"
            placeholder="Full Name"
            className="w-full px-4 py-3 bg-secondary border border-border rounded-sm text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-accent"
          />
          <input
            type="email"
            placeholder="Email Address"
            className="w-full px-4 py-3 bg-secondary border border-border rounded-sm text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-accent"
          />
          <textarea
            placeholder="Message"
            rows={4}
            className="w-full px-4 py-3 bg-secondary border border-border rounded-sm text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-accent resize-none"
          />
          <button
            type="submit"
            className="w-full py-4 bg-primary text-primary-foreground text-sm font-medium rounded-sm hover:opacity-90 transition-opacity ease-quintic"
          >
            Send Enquiry
          </button>
        </form>
      </motion.div>
    </div>
  </section>
);
