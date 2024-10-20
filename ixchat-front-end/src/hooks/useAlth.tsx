import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { api } from '@/utils/api'; // Supondo que você tenha um arquivo api.js ou api.ts para chamadas HTTP
import { toast } from 'react-hot-toast';

interface UserTypes {
  id: number;
  name: string;
  username: string;
  email: string;
  photo: string;
}

interface AuthState {
  data: {
    user: UserTypes | null;
  };
  login: (username: string, password: string, router: any) => Promise<void>;
  logout: () => void;
}

export const useAuth = create<AuthState>()(
  persist(
    (set) => ({
      data: { user: null },

      login: async (username: string, password: string, router: any) => {
        try {
          const res = await api.post("/users/login/", { username, password });

          console.log("Login response:", res);
          console.log("Login es.data.use:", res.data.use);

          if (res.status === 200 && res.data.user) {
            set({
              data: { user: res.data.user },
            });

            toast.success(res.data.message);

            router.push("/chat");
          } else {
            console.warn("Login response did not return a valid user.");
          }
        } catch (error: any) {
          toast.error(error.response?.data?.message || "Login failed");
          console.error("Error during login:", error);
        }
      },
      //todo chamar essa func ao sair 
      logout: () => {
        set({ data: { user: null } })
        console.log("logged out");
      },

    }),
    {
      name: '@IXChat',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
