// // src/features/auth/store/auth.store.ts

// import { create } from "zustand";
// import { persist } from "zustand/middleware";

// type AuthState = {
//   accessToken: string | null;
//   refreshToken: string | null;
//   role: string | null;
//   loginTime: number | null;

//   setAuth: (data: {
//     access: string;
//     refresh: string;
//     role: string | null;
//   }) => void;

//   logout: () => void;
// };

// export const useAuthStore = create<AuthState>()(
//   persist(
//     (set) => ({
//       accessToken: null,
//       refreshToken: null,
//       role: null,
//       loginTime: null,

//       setAuth: (data) =>
//         set({
//           accessToken: data.access,
//           refreshToken: data.refresh,
//           role: data.role,
//           loginTime: Date.now(),
//         }),

//       logout: () =>
//         set({
//           accessToken: null,
//           refreshToken: null,
//           role: null,
//           loginTime: null,
//         }),
//     }),
//     {
//       name: "auth-storage",
//     }
//   )
// );

// import { create } from "zustand";
// import { persist } from "zustand/middleware";

// type AuthState = {
//   accessToken: string | null;
//   refreshToken: string | null;
//   role: string | null;
//   loginTime: number | null;
//   isHydrated: boolean;

//   setAuth: (data: {
//     access: string;
//     refresh: string;
//     role: string | null;
//   }) => void;

//   logout: () => void;
//   setHydrated: () => void;
// };

// export const useAuthStore = create<AuthState>()(
//   persist(
//     (set) => ({
//       accessToken: null,
//       refreshToken: null,
//       role: null,
//       loginTime: null,
//       isHydrated: false,

//       setAuth: (data) =>
//         set({
//           accessToken: data.access,
//           refreshToken: data.refresh,
//           role: data.role,
//           loginTime: Date.now(),
//         }),

//       logout: () =>
//         set({
//           accessToken: null,
//           refreshToken: null,
//           role: null,
//           loginTime: null,
//         }),

//       setHydrated: () => set({ isHydrated: true }),
//     }),
//     {
//       name: "auth-storage",
//       onRehydrateStorage: () => (state) => {
//         state?.setHydrated();
//       },
//     }
//   )
// );




import { create } from "zustand";
import { persist } from "zustand/middleware";

type Role = "customer" | "vendor" | "admin" | null;

type AuthState = {
  accessToken: string | null;
  refreshToken: string | null;
  role: Role;
  loginTime: number | null;
  isHydrated: boolean;

  setAuth: (data: {
    access: string;
    refresh: string;
    role: Role;
  }) => void;

  logout: () => void;
  setHydrated: () => void;

  // 🔥 derived helpers
  isAuthenticated: () => boolean;
  isAdmin: () => boolean;
  isVendor: () => boolean;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      accessToken: null,
      refreshToken: null,
      role: null,
      loginTime: null,
      isHydrated: false,

      setAuth: (data) =>
        set({
          accessToken: data.access,
          refreshToken: data.refresh,
          role: data.role,
          loginTime: Date.now(),
        }),

      logout: () =>
        set({
          accessToken: null,
          refreshToken: null,
          role: null,
          loginTime: null,
        }),

      setHydrated: () => set({ isHydrated: true }),

      // 🔥 helpers
      isAuthenticated: () => !!get().accessToken,
      isAdmin: () => get().role === "admin",
      isVendor: () => get().role === "vendor",
    }),
    {
      name: "auth-storage",
      onRehydrateStorage: () => (state) => {
        state?.setHydrated();
      },
    }
  )
);