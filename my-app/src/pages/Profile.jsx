import { useState, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import Header from "../layouts/Header";
import Footer from "../layouts/Footer";
import http from "../lib/http";
import { selectUser, loginSuccess } from "../features/user/authSlice";
import { User, Mail, Phone, Lock, MapPin, Camera, CheckCircle, AlertCircle } from "lucide-react";
import { Button } from "../component/Button";

function InputField({ label, icon: Icon, error, children }) {
  return (
    <div className="space-y-2">
      <label className="block text-xs font-semibold text-zinc-500 uppercase tracking-widest">{label}</label>
      <div className="relative flex items-center bg-white border border-slate-200 rounded-xl transition-all focus-within:ring-2 focus-within:ring-orange-400 focus-within:border-transparent shadow-sm">
        <div className="absolute left-4 flex items-center justify-center pointer-events-none text-zinc-400">
          <Icon size={18} />
        </div>
        {children}
      </div>
      {error && (
        <p className="text-xs font-medium text-red-500 flex items-center gap-1.5 mt-1.5">
          <AlertCircle size={14} /> {error}
        </p>
      )}
    </div>
  );
}

function Profile() {
  const fileInputRef = useRef(null);
  const dispatch = useDispatch();
  const authUser = useSelector(selectUser);

  const [user, setUser] = useState({ fullname: "", email: "", phone: "", address: "", profileImage: null });
  const [saveStatus, setSaveStatus] = useState(null); // 'success' | 'error' | null
  const [uploadingPhoto, setUploadingPhoto] = useState(false);

  const { register, handleSubmit, setValue, formState: { errors, isSubmitting } } = useForm({
    defaultValues: { fullName: "", email: "", phone: "", address: "", password: "" },
  });

  useEffect(() => {
    if (!authUser?.id) return;
    http(`/api/users/${authUser.id}`)
      .then(r => r.json())
      .then(({ data }) => {
        setUser({
          fullname: data.name,
          email: data.email,
          phone: data.phone || "",
          address: data.address || "",
          profileImage: data.profile_image ? `http://localhost:3002${data.profile_image}` : null,
        });
        setValue("fullName", data.name);
        setValue("email", data.email);
        setValue("phone", data.phone || "");
        setValue("address", data.address || "");
      })
      .catch(err => console.error("Failed to fetch user data", err));
  }, [authUser?.id, setValue]);

  const handlePhotoUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file || !authUser?.id) return;
    if (!file.type.startsWith("image/")) return;

    setUploadingPhoto(true);
    const formData = new FormData();
    formData.append("photo", file);

    try {
      const res = await http(`/api/users/${authUser.id}/photo`, formData, { method: "POST" });
      if (res.ok) {
        const { data } = await res.json();
        setUser(u => ({ ...u, profileImage: `http://localhost:3002${data.profile_image}` }));
      }
    } catch (error) {
      console.error("Photo upload failed:", error);
    } finally {
      setUploadingPhoto(false);
    }
  };

  const onSubmit = async (data) => {
    if (!authUser?.id) return;
    setSaveStatus(null);
    try {
      const res = await http(`/api/users/${authUser.id}`, {
        name: data.fullName,
        email: data.email,
        phone: data.phone || "",
        address: data.address || "",
        password: data.password || "",
      }, { method: "PUT" });

      if (res.ok) {
        setUser(u => ({ ...u, fullname: data.fullName, email: data.email, phone: data.phone, address: data.address }));
        dispatch(loginSuccess({ ...authUser, fullName: data.fullName, email: data.email }));
        setSaveStatus('success');
        setTimeout(() => setSaveStatus(null), 3000);
      } else {
        setSaveStatus('error');
      }
    } catch {
      setSaveStatus('error');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Header bgColor="bg-zinc-950" />

      {/* Top Banner Context */}
      <div className="bg-zinc-950 pt-28 pb-10 px-6 md:px-8 shadow-sm isolate relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-orange-500/10 rounded-full blur-[100px] pointer-events-none" />
        <div className="max-w-7xl mx-auto relative z-10 animate-fade-in-up flex flex-col items-center justify-center py-10 text-center">
          <div className="w-16 h-16 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center mb-6 shadow-sm backdrop-blur-sm">
            <User size={28} className="text-white" />
          </div>
          <h1 className="text-5xl md:text-6xl font-extrabold text-white tracking-tighter leading-tight">
            Profile <span className="text-orange-400">Settings</span>
          </h1>
          <p className="text-zinc-400 text-lg mt-4 font-medium max-w-xl">
            Manage your personal information and account preferences.
          </p>
        </div>
      </div>

      <main className="flex-1 max-w-5xl mx-auto w-full px-6 md:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start animate-fade-in-up">
          {/* Left: Avatar Card */}
          <div className="md:col-span-1">
            <div className="bg-white rounded-3xl border border-slate-200 p-8 flex flex-col items-center text-center shadow-sm">
              {/* Avatar */}
              <div className="relative mb-6">
                <div className="w-32 h-32 rounded-full border-4 border-slate-100 overflow-hidden bg-slate-50 shadow-inner">
                  {user.profileImage ? (
                    <img
                      src={user.profileImage}
                      alt="Profile"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = `https://picsum.photos/seed/${user.fullname || 'user'}/112/112`;
                      }}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <User size={48} className="text-slate-300" />
                    </div>
                  )}
                </div>
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={uploadingPhoto}
                  className="absolute bottom-1 right-1 w-10 h-10 bg-orange-500 hover:bg-orange-600 text-white rounded-full flex items-center justify-center shadow-lg transition active:scale-95 disabled:opacity-60 border-2 border-white"
                >
                  {uploadingPhoto
                    ? <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    : <Camera size={16} />
                  }
                </button>
                <input ref={fileInputRef} type="file" accept="image/*" onChange={handlePhotoUpload} className="hidden" />
              </div>

              <h2 className="text-xl font-extrabold text-zinc-950 tracking-tight">{user.fullname || "Your Name"}</h2>
              <p className="text-sm font-medium text-zinc-500 mb-8">{user.email || "—"}</p>

              <div className="w-full space-y-3 mb-8">
                {user.phone && (
                  <div className="flex items-center gap-3 text-sm font-medium text-zinc-600 bg-slate-50 p-3 rounded-xl border border-slate-100">
                    <Phone size={16} className="text-orange-400" /> {user.phone}
                  </div>
                )}
                {user.address && (
                  <div className="flex gap-3 text-sm font-medium text-zinc-600 bg-slate-50 p-3 rounded-xl border border-slate-100 text-left">
                    <MapPin size={16} className="text-orange-400 shrink-0 mt-0.5" /> 
                    <span className="leading-snug">{user.address}</span>
                  </div>
                )}
              </div>

              <div className="w-full pt-6 border-t border-slate-100 flex flex-col gap-1">
                <p className="text-xs font-semibold text-zinc-400 uppercase tracking-widest">Member since</p>
                <p className="text-sm font-bold text-zinc-950">
                  {new Date().toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}
                </p>
              </div>
            </div>
          </div>

          {/* Right: Form */}
          <div className="md:col-span-2">
            <div className="bg-white rounded-3xl border border-slate-200 p-8 md:p-10 shadow-sm">
              <h2 className="text-2xl font-extrabold text-zinc-950 mb-8 tracking-tighter">Personal Information</h2>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <InputField label="Full Name" icon={User} error={errors.fullName?.message}>
                    <input
                      type="text"
                      {...register("fullName", { required: "Full name is required" })}
                      className="w-full pl-12 pr-4 py-3.5 bg-transparent text-sm font-medium text-zinc-900 placeholder:text-slate-400 focus:outline-none"
                      placeholder="Your full name"
                    />
                  </InputField>

                  <InputField label="Email Address" icon={Mail} error={errors.email?.message}>
                    <input
                      type="email"
                      {...register("email", {
                        required: "Email is required",
                        pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, message: "Invalid email" },
                      })}
                      className="w-full pl-12 pr-4 py-3.5 bg-transparent text-sm font-medium text-zinc-900 placeholder:text-slate-400 focus:outline-none"
                      placeholder="your@email.com"
                    />
                  </InputField>
                </div>

                <InputField label="Phone Number" icon={Phone}>
                  <input
                    type="tel"
                    {...register("phone")}
                    className="w-full pl-12 pr-4 py-3.5 bg-transparent text-sm font-medium text-zinc-900 placeholder:text-slate-400 focus:outline-none"
                    placeholder="+62 8xx xxxx xxxx"
                  />
                </InputField>

                <InputField label="Address" icon={MapPin}>
                  <input
                    type="text"
                    {...register("address")}
                    className="w-full pl-12 pr-4 py-3.5 bg-transparent text-sm font-medium text-zinc-900 placeholder:text-slate-400 focus:outline-none"
                    placeholder="Your delivery address"
                  />
                </InputField>

                <div className="border-t border-slate-200 pt-8 mt-4">
                  <div className="flex items-center justify-between mb-3">
                    <label className="block text-xs font-semibold text-zinc-500 uppercase tracking-widest">New Password</label>
                    <span className="text-xs font-medium text-zinc-400">Leave blank to keep current</span>
                  </div>
                  <div className="relative flex items-center bg-white border border-slate-200 rounded-xl transition-all focus-within:ring-2 focus-within:ring-orange-400 focus-within:border-transparent shadow-sm">
                    <div className="absolute left-4 flex items-center justify-center pointer-events-none text-zinc-400">
                      <Lock size={18} />
                    </div>
                    <input
                      type="password"
                      {...register("password")}
                      className="w-full pl-12 pr-4 py-3.5 bg-transparent text-sm font-medium text-zinc-900 placeholder:text-slate-400 focus:outline-none"
                      placeholder="New password"
                    />
                  </div>
                </div>

                {/* Submit row */}
                <div className="flex flex-col sm:flex-row items-center justify-between pt-6 gap-4">
                  <div className="h-6">
                    {saveStatus === 'success' && (
                      <p className="text-sm font-bold text-emerald-500 flex items-center gap-2 animate-fade-in-up">
                        <CheckCircle size={16} /> Profile saved successfully.
                      </p>
                    )}
                    {saveStatus === 'error' && (
                      <p className="text-sm font-bold text-red-500 flex items-center gap-2 animate-fade-in-up">
                        <AlertCircle size={16} /> Something went wrong.
                      </p>
                    )}
                  </div>

                  <Button
                    type="submit"
                    variant="primary"
                    disabled={isSubmitting}
                    className="w-full sm:w-auto"
                  >
                    {isSubmitting ? (
                      <><div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" /> Saving...</>
                    ) : 'Save Changes'}
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default Profile;
