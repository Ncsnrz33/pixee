import { useEffect } from 'react';
import { useLocation } from 'wouter';

export function useReferral() {
  const [location] = useLocation();

  useEffect(() => {
    // Verificar se está na rota de referência
    const match = location.match(/^\/ref\/(.+)$/);
    if (match) {
      const referrerId = match[1];
      // Salvar referenciador no localStorage
      localStorage.setItem('referrer', referrerId);
    }
  }, [location]);

  const getReferrer = () => {
    return localStorage.getItem('referrer');
  };

  const incrementReferralCount = (referrerId: string) => {
    if (!referrerId) return;

    const key = `referralCount_${referrerId}`;
    const current = parseInt(localStorage.getItem(key) || '0');
    localStorage.setItem(key, (current + 1).toString());
  };

  const getReferralCount = (referrerId: string) => {
    if (!referrerId) return 0;
    const key = `referralCount_${referrerId}`;
    return parseInt(localStorage.getItem(key) || '0');
  };

  return {
    getReferrer,
    incrementReferralCount,
    getReferralCount,
  };
}
