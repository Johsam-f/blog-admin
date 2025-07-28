import { authClient } from "@/lib/auth-client";
import { useEffect, useState } from "react";
import { FaUserCircle } from "react-icons/fa";

function HeaderProfile() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    async function loadSession() {
      const { data: session } = await authClient.getSession();
      if (session?.user) {
        setUser(session.user);
      }
    }

    loadSession();
  }, []);

  return (
    <div>
      {user?.image ? (
        <img
          src={user.image}
          alt="Profile"
          className="w-10 h-10 rounded-full object-cover border border-white/20 shadow-sm"
        />
      ) : (
        <FaUserCircle className="w-10 h-10 text-white/60" />
      )}
    </div>
  );
}

export default HeaderProfile;
