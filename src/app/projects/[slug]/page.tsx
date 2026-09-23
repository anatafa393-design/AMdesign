import Link from "next/link";
import { ArrowLeft, CheckCircle2, ExternalLink } from "lucide-react";
import { getProjects } from "@/lib/getProjects";
import ProjectGallery from "@/components/ui/project-gallery";
import ImageWithFallback from "@/components/ui/ImageWithFallback";
import TextReveal from "@/components/ui/text-reveal";
import DownloadButton from "@/components/ui/download-button";

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
          {project.liveUrl && (
            <div className="mt-6 flex items-center gap-3">
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full bg-emerald-500 hover:bg-emerald-400 text-black font-extrabold text-sm shadow-xl shadow-emerald-500/40 transition-all hover:scale-105"
              >
                <span className="w-2.5 h-2.5 rounded-full bg-black animate-pulse" />
                <span>زيارة وتصفح الموقع الحي ↗ ({project.liveUrl})</span>
              </a>
            </div>
          )}
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

          {project.liveUrl && (
            <div className="mt-8 p-6 rounded-2xl bg-gradient-to-r from-emerald-950/40 to-black border border-emerald-500/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xl">
              <div>
                <div className="text-emerald-400 font-bold text-sm uppercase tracking-wider mb-1 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" /> Live Production Website
                </div>
                <p className="text-white/70 text-sm">
                  الموقع متاح ويعمل مباشرة على الإنترنت بكامل وظائفه وتجاوبه. يمكنك تصفحه مباشرة الآن:
                </p>
                <span className="text-emerald-300 font-mono text-xs underline mt-1 block">
                  {project.liveUrl}
                </span>
              </div>
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="shrink-0 inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-sm shadow-lg transition-all hover:scale-105"
              >
                <span>دخول الموقع الحي</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          )}
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
                <DownloadButton href={project.pdfUrl} projectTitle={project.title} />
              </div>
            )}
            {project.liveUrl && (
              <div className="mt-6 pt-6 border-t border-white/10 flex flex-col gap-3">
                <p className="text-xs text-white/40 font-bold uppercase tracking-widest">Live Experience</p>
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2.5 w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 text-white font-bold text-sm shadow-xl shadow-orange-600/30 transition-all hover:scale-[1.02] group"
                >
                  <span>Visit Live Website</span>
                  <ExternalLink className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
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
            
            <ProjectGallery gallery={project.gallery} layout={project.layout} />
          </div>
        </section>
      )}

      {/* Next Project / Footer */}
      <section className="border-t border-white/10 py-32 text-center bg-white/[0.02]">
        <h2 className="text-3xl text-white/50 mb-6">Ready to start your project?</h2>
        <a href="mailto:anatafa393@gmail.com" className="text-5xl md:text-7xl font-bold hover:text-[#E8A5B3] transition-colors">
          Let&apos;s Work Together
        </a>
      </section>
    </main>
  );
}
