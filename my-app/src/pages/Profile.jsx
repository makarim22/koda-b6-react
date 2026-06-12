import { useState, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import Header from "../layouts/Header";
import Footer from "../layouts/Footer";
import http from "../lib/http";
import { selectUser, loginSuccess } from "../features/user/authSlice";
import { User, Mail, Phone, Lock, MapPin, Camera, CheckCircle, AlertCircle } from "lucide-react";

function InputField({ label, icon: Icon, error, children }) {
  return (
    <div className="space-y-1.5">
      <label className="block text-sm font-medium text-zinc-700">{label}</label>
      <div className="relative">
        <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400">
          <Icon size={16} />
        </div>
        {children}
      </div>
      {error && (
        <p className="text-xs text-red-500 flex items-center gap-1">
          <AlertCircle size={12} /> {error}
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
    <div className="min-h-screen bg-slate-50 flex flex-col" style={{ fontFamily: "'Outfit', sans-serif" }}>
      <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700&display=swap" rel="stylesheet" />
      <Header bgColor="bg-zinc-950" />

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 py-12 pt-28">
        <div className="mb-8">
          <p className="text-sm text-slate-500 font-medium mb-1">Account</p>
          <h1 className="text-3xl font-bold text-zinc-900 tracking-tight">Profile Settings</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
          {/* Left: Avatar Card */}
          <div className="md:col-span-1">
            <div className="bg-white rounded-2xl border border-slate-100 p-8 flex flex-col items-center text-center shadow-[0_4px_24px_-8px_rgba(0,0,0,0.06)]">
              {/* Avatar */}
              <div className="relative mb-5">
                <div className="w-28 h-28 rounded-full border-4 border-slate-100 overflow-hidden bg-slate-100">
                  {user.profileImage ? (
                    <img src={user.profileImage} alt="Profile" className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <User size={40} className="text-slate-300" />
                    </div>
                  )}
                </div>
                <button
                  onClick={() => fileInputRef.current?.click()}
                  disabled={uploadingPhoto}
                  className="absolute bottom-1 right-1 w-8 h-8 bg-orange-500 hover:bg-orange-600 text-white rounded-full flex items-center justify-center shadow-md transition active:scale-95 disabled:opacity-60"
                >
                  {uploadingPhoto
                    ? <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    : <Camera size={14} />
                  }
                </button>
                <input ref={fileInputRef} type="file" accept="image/*" onChange={handlePhotoUpload} className="hidden" />
              </div>

              <h2 className="text-lg font-bold text-zinc-900">{user.fullname || "Your Name"}</h2>
              <p className="text-sm text-slate-500 mb-6">{user.email || "—"}</p>

              {user.phone && (
                <div className="flex items-center gap-1.5 text-xs text-slate-500">
                  <Phone size={12} /> {user.phone}
                </div>
              )}
              {user.address && (
                <div className="flex items-center gap-1.5 text-xs text-slate-500 mt-1">
                  <MapPin size={12} /> {user.address}
                </div>
              )}

              <div className="w-full mt-6 pt-6 border-t border-slate-100">
                <p className="text-xs text-slate-400">Member since</p>
                <p className="text-sm font-medium text-zinc-700 mt-0.5">
                  {new Date().toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}
                </p>
              </div>
            </div>
          </div>

          {/* Right: Form */}
          <div className="md:col-span-2">
            <div className="bg-white rounded-2xl border border-slate-100 p-8 shadow-[0_4px_24px_-8px_rgba(0,0,0,0.06)]">
              <h2 className="text-base font-semibold text-zinc-900 mb-6">Personal Information</h2>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <InputField label="Full Name" icon={User} error={errors.fullName?.message}>
                    <input
                      type="text"
                      {...register("fullName", { required: "Full name is required" })}
                      className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-lg text-sm text-zinc-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500/30 focus:border-orange-400 transition"
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
                      className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-lg text-sm text-zinc-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500/30 focus:border-orange-400 transition"
                      placeholder="your@email.com"
                    />
                  </InputField>
                </div>

                <InputField label="Phone Number" icon={Phone}>
                  <input
                    type="tel"
                    {...register("phone")}
                    className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-lg text-sm text-zinc-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500/30 focus:border-orange-400 transition"
                    placeholder="+62 8xx xxxx xxxx"
                  />
                </InputField>

                <InputField label="Address" icon={MapPin}>
                  <input
                    type="text"
                    {...register("address")}
                    className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-lg text-sm text-zinc-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500/30 focus:border-orange-400 transition"
                    placeholder="Your delivery address"
                  />
                </InputField>

                <div className="border-t border-slate-100 pt-5">
                  <div className="flex items-center justify-between mb-3">
                    <label className="text-sm font-medium text-zinc-700">New Password</label>
                    <span className="text-xs text-slate-400">Leave blank to keep current</span>
                  </div>
                  <div className="relative">
                    <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400">
                      <Lock size={16} />
                    </div>
                    <input
                      type="password"
                      {...register("password")}
                      className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-lg text-sm text-zinc-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500/30 focus:border-orange-400 transition"
                      placeholder="New password"
                    />
                  </div>
                </div>

                {/* Submit row */}
                <div className="flex items-center justify-between pt-2">
                  {saveStatus === 'success' && (
                    <p className="text-sm text-emerald-600 flex items-center gap-1.5">
                      <CheckCircle size={14} /> Profile saved successfully.
                    </p>
                  )}
                  {saveStatus === 'error' && (
                    <p className="text-sm text-red-500 flex items-center gap-1.5">
                      <AlertCircle size={14} /> Something went wrong.
                    </p>
                  )}
                  {!saveStatus && <span />}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-6 py-2.5 bg-orange-500 hover:bg-orange-600 disabled:opacity-60 text-white text-sm font-semibold rounded-lg transition active:scale-[0.98] flex items-center gap-2"
                  >
                    {isSubmitting ? (
                      <><div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> Saving...</>
                    ) : 'Save Changes'}
                  </button>
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
