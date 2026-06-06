"use client";

import { useState, useEffect } from "react";
import { Lock, LogOut, Plus, Trash, ArrowUp, ArrowDown, Save, Image as ImageIcon, Type, Video, ChevronLeft } from "lucide-react";

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedProjectIndex, setSelectedProjectIndex] = useState<number | null>(null);

  useEffect(() => {
    const auth = localStorage.getItem("adminAuth");
    if (auth === "true") {
      setIsAuthenticated(true);
      fetchProjects();
    } else {
      setLoading(false);
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === "admin123") {
      localStorage.setItem("adminAuth", "true");
      setIsAuthenticated(true);
      setError("");
      fetchProjects();
    } else {
      setError("كلمة المرور غير صحيحة");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("adminAuth");
    setIsAuthenticated(false);
    setProjects([]);
  };

  const fetchProjects = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/projects");
      if (res.ok) {
        const data = await res.json();
        setProjects(data);
      }
    } catch (err) {
      console.error("Failed to fetch projects");
    }
    setLoading(false);
  };

  const saveProjects = async () => {
    try {
      const res = await fetch("/api/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(projects),
      });
      if (res.ok) {
        alert("تم الحفظ بنجاح!");
      } else {
        alert("فشل الحفظ!");
      }
    } catch (err) {
      alert("حدث خطأ أثناء الحفظ");
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#050505] p-4">
        <div className="bg-[#111] p-8 rounded-2xl border border-white/10 w-full max-w-md">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-orange-500/20 rounded-full flex items-center justify-center">
              <Lock className="w-8 h-8 text-orange-400" />
            </div>
          </div>
          <h1 className="text-2xl font-bold text-center text-white mb-8">تسجيل الدخول للإدارة</h1>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="كلمة المرور..."
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-orange-500 transition-colors"
                dir="rtl"
              />
            </div>
            {error && <p className="text-red-400 text-sm text-right">{error}</p>}
            <button
              type="submit"
              className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold rounded-xl px-4 py-3 transition-colors"
            >
              دخول
            </button>
          </form>
        </div>
      </div>
    );
  }

  if (loading) return <div className="min-h-screen flex items-center justify-center"><p>جاري التحميل...</p></div>;

  const currentProject = selectedProjectIndex !== null ? projects[selectedProjectIndex] : null;

  const updateProjectField = (field: string, value: any) => {
    if (selectedProjectIndex === null) return;
    const newProjects = [...projects];
    newProjects[selectedProjectIndex] = { ...newProjects[selectedProjectIndex], [field]: value };
    setProjects(newProjects);
  };

  const addGalleryItem = (type: string) => {
    if (selectedProjectIndex === null) return;
    const newProjects = [...projects];
    const newItem = { id: `item-${Date.now()}`, type, content: "" };
    newProjects[selectedProjectIndex].gallery = [...(newProjects[selectedProjectIndex].gallery || []), newItem];
    setProjects(newProjects);
  };

  const updateGalleryItem = (index: number, content: string) => {
    if (selectedProjectIndex === null) return;
    const newProjects = [...projects];
    newProjects[selectedProjectIndex].gallery[index].content = content;
    setProjects(newProjects);
  };

  const removeGalleryItem = (index: number) => {
    if (selectedProjectIndex === null) return;
    const newProjects = [...projects];
    newProjects[selectedProjectIndex].gallery.splice(index, 1);
    setProjects(newProjects);
  };

  const moveGalleryItem = (index: number, direction: 'up' | 'down') => {
    if (selectedProjectIndex === null) return;
    if (direction === 'up' && index === 0) return;
    const gallery = projects[selectedProjectIndex].gallery;
    if (direction === 'down' && index === gallery.length - 1) return;

    const newProjects = [...projects];
    const items = [...newProjects[selectedProjectIndex].gallery];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    
    [items[index], items[targetIndex]] = [items[targetIndex], items[index]];
    newProjects[selectedProjectIndex].gallery = items;
    setProjects(newProjects);
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white p-6 md:p-12" dir="rtl">
      <div className="max-w-6xl mx-auto">
        <header className="flex items-center justify-between mb-12 bg-white/5 p-6 rounded-2xl border border-white/10">
          <div>
            <h1 className="text-3xl font-bold mb-2">لوحة التحكم</h1>
            <p className="text-white/50">إدارة مشاريع المعرض الخاص بك</p>
          </div>
          <div className="flex gap-4">
            <button onClick={saveProjects} className="flex items-center gap-2 bg-orange-600 hover:bg-orange-700 px-6 py-3 rounded-xl font-bold transition-colors">
              <Save className="w-5 h-5" /> حفظ التغييرات
            </button>
            <button onClick={handleLogout} className="flex items-center gap-2 bg-red-600/20 text-red-500 hover:bg-red-600/30 px-6 py-3 rounded-xl transition-colors">
              <LogOut className="w-5 h-5" /> خروج
            </button>
          </div>
        </header>

        {selectedProjectIndex === null ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, i) => (
              <div key={project.id} className="bg-[#111] border border-white/10 rounded-2xl overflow-hidden cursor-pointer hover:border-orange-500/50 transition-colors" onClick={() => setSelectedProjectIndex(i)}>
                <img src={project.heroImage} alt={project.title} className="w-full h-48 object-cover opacity-70" />
                <div className="p-6">
                  <div className="text-orange-400 text-sm mb-2">{project.category}</div>
                  <h3 className="text-xl font-bold">{project.title}</h3>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-[#111] border border-white/10 rounded-2xl p-8">
            <button onClick={() => setSelectedProjectIndex(null)} className="flex items-center gap-2 text-white/50 hover:text-white mb-8 transition-colors">
              <ChevronLeft className="w-5 h-5" /> العودة للمشاريع
            </button>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div className="space-y-6">
                <h2 className="text-2xl font-bold border-b border-white/10 pb-4">تفاصيل المشروع</h2>
                
                <div>
                  <label className="block text-white/70 mb-2">عنوان المشروع</label>
                  <input type="text" value={currentProject.title} onChange={(e) => updateProjectField("title", e.target.value)} className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-orange-500" />
                </div>
                
                <div>
                  <label className="block text-white/70 mb-2">القسم / التصنيف</label>
                  <input type="text" value={currentProject.category} onChange={(e) => updateProjectField("category", e.target.value)} className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-orange-500" />
                </div>

                <div>
                  <label className="block text-white/70 mb-2">صورة الغلاف (رابط URL أو مسار)</label>
                  <input type="text" value={currentProject.heroImage} onChange={(e) => updateProjectField("heroImage", e.target.value)} className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-orange-500" dir="ltr" />
                  {currentProject.heroImage && <img src={currentProject.heroImage} className="mt-4 w-full h-32 object-cover rounded-xl border border-white/10" />}
                </div>

                <div>
                  <label className="block text-white/70 mb-2">نبذة عن المشروع</label>
                  <textarea value={currentProject.overview} onChange={(e) => updateProjectField("overview", e.target.value)} rows={4} className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-orange-500"></textarea>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
                  <h2 className="text-2xl font-bold">المعرض (الصور/النصوص/الفيديو)</h2>
                  <div className="flex gap-2">
                    <button onClick={() => addGalleryItem('image')} className="p-2 bg-white/5 hover:bg-white/10 rounded-lg text-white tooltip" title="إضافة صورة"><ImageIcon className="w-5 h-5" /></button>
                    <button onClick={() => addGalleryItem('video')} className="p-2 bg-white/5 hover:bg-white/10 rounded-lg text-white tooltip" title="إضافة فيديو"><Video className="w-5 h-5" /></button>
                    <button onClick={() => addGalleryItem('text')} className="p-2 bg-white/5 hover:bg-white/10 rounded-lg text-white tooltip" title="إضافة نص"><Type className="w-5 h-5" /></button>
                  </div>
                </div>

                <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
                  {currentProject.gallery && currentProject.gallery.map((item: any, i: number) => (
                    <div key={item.id || i} className="flex gap-4 items-start bg-black border border-white/10 p-4 rounded-xl">
                      <div className="flex flex-col gap-2">
                        <button onClick={() => moveGalleryItem(i, 'up')} disabled={i === 0} className="p-1 text-white/40 hover:text-white disabled:opacity-30"><ArrowUp className="w-4 h-4" /></button>
                        <button onClick={() => moveGalleryItem(i, 'down')} disabled={i === currentProject.gallery.length - 1} className="p-1 text-white/40 hover:text-white disabled:opacity-30"><ArrowDown className="w-4 h-4" /></button>
                      </div>
                      
                      <div className="flex-grow space-y-3">
                        <div className="flex items-center gap-2 text-sm text-orange-400">
                          {item.type === 'image' && <><ImageIcon className="w-4 h-4" /> مسار الصورة</>}
                          {item.type === 'video' && <><Video className="w-4 h-4" /> رابط الفيديو</>}
                          {item.type === 'text' && <><Type className="w-4 h-4" /> النص</>}
                        </div>
                        
                        {item.type === 'text' ? (
                          <textarea value={item.content} onChange={(e) => updateGalleryItem(i, e.target.value)} rows={3} className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 focus:border-orange-500 outline-none" />
                        ) : (
                          <input type="text" value={item.content} onChange={(e) => updateGalleryItem(i, e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 focus:border-orange-500 outline-none" dir="ltr" />
                        )}
                        
                        {item.type === 'image' && item.content && (
                          <img src={item.content} className="h-24 object-contain bg-white/5 rounded-lg border border-white/10" />
                        )}
                      </div>

                      <button onClick={() => removeGalleryItem(i)} className="p-2 text-red-500/50 hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-colors">
                        <Trash className="w-5 h-5" />
                      </button>
                    </div>
                  ))}
                  {(!currentProject.gallery || currentProject.gallery.length === 0) && (
                    <div className="text-center p-8 text-white/40 border border-dashed border-white/10 rounded-xl">
                      لا يوجد عناصر في المعرض. قم بإضافة صورة أو نص أو فيديو.
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
