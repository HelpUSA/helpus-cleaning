import { useState, useEffect, useCallback } from 'react';

export interface GoogleUser {
  id: string;
  email: string;
  name: string;
  givenName?: string;
  familyName?: string;
  picture?: string;
  locale?: string;
  loginTime?: number;
}

export interface UseGoogleAuthOptions {
  clientId?: string;
  allowedEmails?: string[] | null;
  onSuccess?: (user: GoogleUser) => void;
  onError?: (errorMessage: string, rawUser?: any) => void;
  storageKey?: string;
}

export interface UseGoogleAuthReturn {
  user: GoogleUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string;
  login: () => void;
  logout: () => void;
  clearError: () => void;
}

declare global {
  interface Window {
    google?: {
      accounts?: {
        oauth2?: {
          initTokenClient: (config: any) => any;
        };
      };
    };
  }
}

export function useGoogleAuth(options: UseGoogleAuthOptions = {}): UseGoogleAuthReturn {
  const {
    clientId = (typeof import.meta !== 'undefined' && (import.meta as any).env?.VITE_GOOGLE_CLIENT_ID) ||
               '812202824664-s716306ibb7c15jh7aok2v0lfnuocpkn.apps.googleusercontent.com',
    allowedEmails = null,
    onSuccess = null,
    onError = null,
    storageKey = 'helpus_google_auth_user'
  } = options;

  const [user, setUser] = useState<GoogleUser | null>(() => {
    if (typeof window === 'undefined') return null;
    try {
      const savedUser = localStorage.getItem(storageKey);
      if (savedUser) {
        const parsed = JSON.parse(savedUser);
        if (parsed && parsed.email) return parsed;
      }
    } catch (e) {
      console.warn('[googleAuth] Falha ao ler sessão do localStorage:', e);
    }
    return null;
  });

  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => !!user);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  // 1. Auto-injetar SDK do Google Identity Services (GSI)
  useEffect(() => {
    if (typeof window === 'undefined') return;

    if (!window.google?.accounts?.oauth2 && !document.getElementById('google-gsi-script')) {
      const script = document.createElement('script');
      script.id = 'google-gsi-script';
      script.src = 'https://accounts.google.com/gsi/client';
      script.async = true;
      script.defer = true;
      document.head.appendChild(script);
    }
  }, []);

  // 2. Processar dados recebidos do perfil do Google
  const processGoogleUserInfo = useCallback(
    (googleUser: any, pendingTab: Window | null = null) => {
      if (!googleUser || !googleUser.email) {
        if (pendingTab && !pendingTab.closed) pendingTab.close();
        setIsLoading(false);
        const errMsg = 'Não foi possível obter os dados do usuário do Google.';
        setError(errMsg);
        if (onError) onError(errMsg);
        return false;
      }

      const cleanEmail = googleUser.email.toLowerCase().trim();

      // Validação de Whitelist (se configurada)
      if (allowedEmails && Array.isArray(allowedEmails) && allowedEmails.length > 0) {
        const isAllowed = allowedEmails.some((e) => e.toLowerCase().trim() === cleanEmail);
        if (!isAllowed) {
          if (pendingTab && !pendingTab.closed) pendingTab.close();
          setIsLoading(false);
          setIsAuthenticated(false);
          const errMsg = `Acesso Negado: O e-mail (${cleanEmail}) não possui permissão de acesso.`;
          setError(errMsg);
          localStorage.removeItem(storageKey);
          if (onError) onError(errMsg, googleUser);
          return false;
        }
      }

      const userObj: GoogleUser = {
        id: googleUser.sub || googleUser.id,
        email: cleanEmail,
        name: googleUser.name || cleanEmail.split('@')[0],
        givenName: googleUser.given_name || '',
        familyName: googleUser.family_name || '',
        picture: googleUser.picture || '',
        locale: googleUser.locale || 'pt-BR',
        loginTime: Date.now()
      };

      try {
        localStorage.setItem(storageKey, JSON.stringify(userObj));
      } catch (e) {
        console.warn('[googleAuth] Não foi possível salvar sessão no localStorage:', e);
      }

      setUser(userObj);
      setIsAuthenticated(true);
      setIsLoading(false);
      setError('');

      if (pendingTab && !pendingTab.closed) {
        pendingTab.close();
      }

      if (onSuccess) {
        onSuccess(userObj);
      }

      return true;
    },
    [allowedEmails, onError, onSuccess, storageKey]
  );

  // 3. Capturar token de hash URL (#access_token=) ou postMessage cross-window
  useEffect(() => {
    if (typeof window === 'undefined') return;

    if (window.location.hash.includes('access_token=')) {
      const hashParams = new URLSearchParams(window.location.hash.replace('#', '?'));
      const token = hashParams.get('access_token');
      if (token) {
        setIsLoading(true);
        fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
          headers: { Authorization: `Bearer ${token}` }
        })
          .then((res) => res.json())
          .then((googleUser) => {
            if (window.opener && !window.opener.closed) {
              window.opener.postMessage({ type: 'GOOGLE_AUTH_SUCCESS', user: googleUser }, window.location.origin);
              window.close();
            } else {
              processGoogleUserInfo(googleUser);
              window.history.replaceState(null, '', window.location.pathname + window.location.search);
            }
          })
          .catch((err) => {
            console.error('[googleAuth] Erro ao consultar perfil Google via Hash Token:', err);
            setIsLoading(false);
          });
      }
    }

    const handleMessage = (event: MessageEvent) => {
      if (event.origin !== window.location.origin) return;
      if (event.data?.type === 'GOOGLE_AUTH_SUCCESS' && event.data?.user) {
        processGoogleUserInfo(event.data.user);
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [processGoogleUserInfo]);

  // 4. Função de Login principal
  const login = useCallback(() => {
    setError('');
    setIsLoading(true);

    // Método Primário: Google Identity Services SDK
    if (window.google?.accounts?.oauth2) {
      try {
        const client = window.google.accounts.oauth2.initTokenClient({
          client_id: clientId,
          scope: 'email profile openid',
          prompt: 'select_account',
          callback: async (tokenResponse: any) => {
            if (tokenResponse && tokenResponse.access_token) {
              try {
                const res = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
                  headers: { Authorization: `Bearer ${tokenResponse.access_token}` }
                });
                const googleUser = await res.json();
                processGoogleUserInfo(googleUser);
              } catch (fetchErr) {
                console.error('[googleAuth] Erro ao consultar UserInfo do Google:', fetchErr);
                setIsLoading(false);
                setError('Erro de comunicação com o servidor do Google.');
              }
            } else {
              setIsLoading(false);
            }
          },
          error_callback: (err: any) => {
            console.warn('[googleAuth] Popup do Google cancelado ou fechado:', err);
            setIsLoading(false);
          }
        });

        client.requestAccessToken({ prompt: 'select_account' });
        return;
      } catch (e) {
        console.warn('[googleAuth] Falha no GIS SDK. Acionando fallback...', e);
      }
    }

    // Método Secundário: Fallback para Popup OAuth Direto
    const redirectUri = encodeURIComponent(window.location.origin);
    const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=token&scope=email%20profile%20openid&prompt=select_account`;

    const width = 500;
    const height = 650;
    const left = window.screenX + (window.outerWidth - width) / 2;
    const top = window.screenY + (window.outerHeight - height) / 2;

    const popup = window.open(
      authUrl,
      'GoogleSignInPopup',
      `width=${width},height=${height},top=${top},left=${left},scrollbars=yes,status=yes`
    );

    if (popup) {
      popup.focus();
    } else {
      setIsLoading(false);
      setError('O navegador bloqueou a abertura da janela de login. Por favor, permita popups.');
    }
  }, [clientId, processGoogleUserInfo]);

  // 5. Função de Logout
  const logout = useCallback(() => {
    setUser(null);
    setIsAuthenticated(false);
    setError('');
    setIsLoading(false);
    try {
      localStorage.removeItem(storageKey);
    } catch (e) {
      console.warn('[googleAuth] Erro ao remover sessão do localStorage:', e);
    }
  }, [storageKey]);

  const clearError = useCallback(() => setError(''), []);

  return {
    user,
    isAuthenticated,
    isLoading,
    error,
    login,
    logout,
    clearError
  };
}
