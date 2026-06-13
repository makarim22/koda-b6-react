import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../features/user/authSlice";

function OAuthCallback() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const token = searchParams.get("token");

    if (token) {
      try {
        // Parse the JWT payload to extract user info
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));

        const decoded = JSON.parse(jsonPayload);
        
        // Dispatch loginSuccess action
        dispatch(
          loginSuccess({
            id: decoded.user_id, // Adjust based on your JWT payload keys
            email: decoded.email,
            role: decoded.role || "user", // Fallback to user if not in token
            token: token,
          })
        );

        // Redirect to homepage
        navigate("/");
      } catch (error) {
        console.error("Failed to parse OAuth token:", error);
        navigate("/login");
      }
    } else {
      console.error("No token found in callback URL");
      navigate("/login");
    }
  }, [searchParams, navigate, dispatch]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50" style={{ fontFamily: "'Outfit', sans-serif" }}>
      <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700&display=swap" rel="stylesheet" />
      <div className="text-center bg-white p-10 rounded-3xl shadow-sm border border-slate-200 animate-fade-in-up">
        <div className="w-16 h-16 border-4 border-slate-200 border-t-orange-500 rounded-full animate-spin shadow-sm mx-auto mb-6" />
        <h2 className="text-2xl font-extrabold text-zinc-950 mb-2 tracking-tighter">Authenticating...</h2>
        <p className="text-sm font-medium text-zinc-500">Please wait while we securely log you in.</p>
      </div>

      <style jsx>{`
        @keyframes fade-in-up {
          0% { opacity: 0; transform: translateY(10px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.4s ease-out forwards;
        }
      `}</style>
    </div>
  );
}

export default OAuthCallback;
