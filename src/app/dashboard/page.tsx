import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { useEffect, useState } from 'react';
import { ThemeProvider } from 'next-themes';
import { AuthContextProvider } from '@/contexts/AuthContext';
import { UserDocProvider } from '@/contexts/UserDocContext';
import { UsersProvider } from '@/contexts/UsersContext';
import { Toaster } from 'react-hot-toast';
import { useRouter } from 'next/router';
import { useAuthContext } from "@/hooks/useAuthContext.js";
import { auth } from '@/firebase/config';

// pages/_app.tsx

function page({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const { user, authIsReady } = useAuthContext();

  const [rerender, setRerender] = useState(false);
  const [selectedPriority, setSelectedPriority] = useState(null);
  const [chatIsOpen, setChatIsOpen] = useState(false);
  const [selectedChat, setSelectedChat] = useState(null);

  useEffect(() => {
    console.log(selectedPriority);
  }, [selectedPriority]);

  return (
    <AuthContextProvider>
      <ThemeProvider attribute="class">
        <UserDocProvider user={user}>
          <UsersProvider>
            <Toaster />
            {user ? (
              <>
                <Component
                  {...pageProps}
                  rerender={rerender}
                  setRerender={setRerender}
                  selectedPriority={selectedPriority}
                  setSelectedPriority={setSelectedPriority}
                  chatIsOpen={chatIsOpen}
                  setChatIsOpen={setChatIsOpen}
                  selectedChat={selectedChat}
                  setSelectedChat={setSelectedChat}
                />
              </>
            ) : (
              router.pathname !== '/login' && <Login />
            )}
          </UsersProvider>
        </UserDocProvider>
      </ThemeProvider>
    </AuthContextProvider>
  );
}

export default MyApp;
