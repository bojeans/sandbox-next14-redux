import { ComponentType, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useAppSelector } from "../../lib/hooks";

type WithAuthProps = {
  // Define any additional props you need for the HOC here
};

const Authorised = <P extends WithAuthProps>(
  WrappedComponent: ComponentType<P>
) => {
  return (props: P) => {
    const { status } = useSession();
    const { isLoggedIn, user } = useAppSelector((state) => state.auth);
    const router = useRouter();

    useEffect(() => {
      if (status !== "loading" && (!isLoggedIn || !user?.isAdmin)) {
        router.push("/login");
      }
    }, [status, isLoggedIn, user]);

    return isLoggedIn && user?.isAdmin ? <WrappedComponent {...props} /> : null;
  };
};

export default Authorised;
