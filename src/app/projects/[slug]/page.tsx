import Link from "next/link";
import { ArrowLeft, CheckCircle2, Download } from "lucide-react";
import { getProjects } from "@/lib/getProjects";
import ProjectGallery from "@/components/ui/project-gallery";
import ImageWithFallback from "@/components/ui/ImageWithFallback";
import TextReveal from "@/components/ui/text-reveal";

export async function generateStaticParams() {
  const projects = getProjects();
  return projects.map((project: any) => ({
    slug: project.id,
  }));
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const projects = getProjects();
  const project = projects.find((p: any) => p.id === slug) || projects[0];

  return (
    <main className="min-h-screen bg-[#050505] text-white selection:bg-purple-500/30">
      
      {/* Hero Image Section */}
      <section className="relative w-full h-[60vh] md:h-[80vh] overflow-hidden">
        <ImageWithFallback 
          src={project.heroImage} 
          alt={project.title} 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/30 to-transparent flex flex-col justify-end p-8 md:p-20 z-10">
          <Link href="/#projects" className="inline-flex items-center gap-2 text-white/50 hover:text-white transition-colors mb-6 pb-2 border-b border-white/10 w-max">
            <ArrowLeft className="w-4 h-4" /> Back to Projects
          </Link>
          <div className="text-purple-400 font-medium mb-4 text-xl">{project.category}</div>
          <h1 className="text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter">
            <TextReveal text={project.title} />
          </h1>
        </div>
      </section>

      {/* Project Details */}
      <section className="max-w-7xl px-6 py-20 mx-auto grid grid-cols-1 lg:grid-cols-3 gap-16">
        {/* Left Column: Overview */}
        <div className="lg:col-span-2">
          <h2 className="text-3xl font-bold mb-6 text-white/90">Project Overview</h2>
          <p className="text-xl text-white/60 leading-relaxed">
            {project.overview}
          </p>
        </div>

        {/* Right Column: Deliverables */}
        <div className="space-y-8">
          <div className="p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md">
            <h3 className="text-xl font-bold mb-6 border-b border-white/10 pb-4">Deliverables</h3>
            <ul className="space-y-4">
              {project.deliverables.map((item: string, i: number) => (
                <li key={i} className="flex items-center gap-3 text-white/70">
                  <CheckCircle2 className="w-5 h-5 text-purple-400" />
                  {item}
                </li>
              ))}
            </ul>
            {project.pdfUrl && (
              <div className="mt-8 pt-6 border-t border-white/10 flex flex-col gap-3">
                <p className="text-xs text-white/40 font-bold uppercase tracking-widest">Document download</p>
                <a
                  href={project.pdfUrl}
                  download
                  className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-gradient-to-r from-orange-500 to-red-600 text-white font-bold text-sm hover:shadow-lg hover:shadow-orange-500/30 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 group"
                >
                  <Download className="w-4 h-4 transition-transform group-hover:translate-y-0.5" />
                  Download PDF Brand Book
                </a>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Premium Gallery Section */}
      {project.gallery && project.gallery.length > 0 && (
        <section className="w-full bg-[#0a0a0a] py-20">
          <div className="max-w-[1400px] mx-auto px-4 md:px-8">
            <div className="text-center mb-16">
               <h2 className="text-4xl font-bold text-white mb-4">Complete Brand Showcase</h2>
               <p className="text-white/50">Click on any image to view it in full screen.</p>
            </div>
            
            <ProjectGallery gallery={project.gallery} />
          </div>
        </section>
      )}

      {/* Next Project / Footer */}
      <section className="border-t border-white/10 py-32 text-center bg-white/[0.02]">
        <h2 className="text-3xl text-white/50 mb-6">Ready to start your project?</h2>
        <a href="mailto:anatafa393@gmail.com" className="text-5xl md:text-7xl font-bold hover:text-orange-500 transition-colors">
          Let&apos;s Work Together
        </a>
      </section>
    </main>
  );
}
