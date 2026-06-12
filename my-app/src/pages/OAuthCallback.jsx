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
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="text-center">
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">Authenticating...</h2>
        <p className="text-gray-500">Please wait while we log you in.</p>
        <div className="mt-4 animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500 mx-auto"></div>
      </div>
    </div>
  );
}

export default OAuthCallback;
