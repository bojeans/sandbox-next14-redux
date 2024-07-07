"use client";

import { SessionProvider, useSession } from "next-auth/react";
import { Provider as ReduxProvider } from "react-redux";
import { useEffect } from "react";
import { useAppDispatch } from "../../lib/hooks";
import { login, logout } from "../../lib/features/auth/authSlice";
import store from "../../lib/store";

interface ClientProvidersProps {
  children: React.ReactNode;
}

function AuthSync({ children }: { children: React.ReactNode }) {
  const { data: session } = useSession();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (session?.user?.email) {
      dispatch(login({ email: session.user.email, isAdmin: true }));
    } else {
      dispatch(logout());
    }
  }, [session, dispatch]);

  return <>{children}</>;
}

export default function ClientProviders({ children }: ClientProvidersProps) {
  return (
    <SessionProvider>
      <ReduxProvider store={store}>
        <AuthSync>{children}</AuthSync>
      </ReduxProvider>
    </SessionProvider>
  );
}
