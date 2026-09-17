import { signOut } from "firebase/auth";
import { useState } from "react";

import Container from "../../components/Container/Container";
import { auth } from "../../config/firebase";
import { useAuth } from "../../context/useAuth";

function Account() {
  const { user } = useAuth();

  const [isSigningOut, setIsSigningOut] = useState(false);
  const [signOutError, setSignOutError] = useState("");

  async function handleSignOut() {
    try {
      setIsSigningOut(true);
      setSignOutError("");

      await signOut(auth);
    } catch {
      setSignOutError("Unable to sign out. Please try again.");
      setIsSigningOut(false);
    }
  }

  return (
    <main className="bg-[#f7f5f1]">
      <Container>
        <section className="py-10 sm:py-14 md:py-16">
          <div className="mx-auto w-full max-w-[760px]">
            <div className="mb-7 text-center sm:mb-9">
              <h1 className="font-display text-[32px] leading-none font-medium sm:text-[38px] md:text-[44px]">
                Your account
              </h1>

              <p className="mx-auto mt-3 max-w-[480px] text-[13px] leading-6 text-text-secondary">
                Manage your account and keep your beauty favorites close.
              </p>
            </div>

            <div className="border border-border bg-surface p-6 sm:p-8">
              <div className="border-b border-border pb-6">
                <p className="mb-4 text-[10px] font-medium uppercase tracking-[0.16em] text-text-secondary">
                  Account details
                </p>

                <div className="grid gap-6 sm:grid-cols-2">
                  <div>
                    <p className="mb-1.5 text-[9px] uppercase tracking-[0.12em] text-text-secondary">
                      Name
                    </p>

                    <p className="text-[14px]">
                      {user?.displayName || "IVORIA customer"}
                    </p>
                  </div>

                  <div>
                    <p className="mb-1.5 text-[9px] uppercase tracking-[0.12em] text-text-secondary">
                      Email
                    </p>

                    <p className="break-all text-[14px]">{user?.email}</p>
                  </div>
                </div>
              </div>

              <div className="pt-6">
                <p className="mb-4 text-[10px] font-medium uppercase tracking-[0.16em] text-text-secondary">
                  Session
                </p>

                <button
                  className="h-12 cursor-pointer border border-text-primary bg-transparent px-6 text-[10px] font-medium uppercase tracking-[0.12em] transition-colors hover:bg-text-primary hover:text-white focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-3 focus-visible:outline-text-primary disabled:cursor-not-allowed disabled:opacity-50 sm:text-[11px]"
                  type="button"
                  disabled={isSigningOut}
                  onClick={handleSignOut}
                >
                  {isSigningOut ? "Signing out..." : "Sign out"}
                </button>

                {signOutError && (
                  <p className="mt-3 text-[11px] text-accent" role="alert">
                    {signOutError}
                  </p>
                )}
              </div>
            </div>
          </div>
        </section>
      </Container>
    </main>
  );
}

export default Account;
