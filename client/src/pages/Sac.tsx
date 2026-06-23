import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Copy, Share2, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';

export default function Sac() {
  const [userBalance, setUserBalance] = useState(0);
  const [dailyEarnings, setDailyEarnings] = useState(0);
  const [referralCount, setReferralCount] = useState(0);
  const [requiredReferrals, setRequiredReferrals] = useState(5);
  const [canWithdraw, setCanWithdraw] = useState(false);
  const [showWithdrawForm, setShowWithdrawForm] = useState(false);
  const [withdrawData, setWithdrawData] = useState({
    name: '',
    cpf: '',
    email: '',
    pixKey: '',
    pixType: 'email',
  });
  const [referralLink, setReferralLink] = useState('');
  const [userId, setUserId] = useState('');

  useEffect(() => {
    // Carregar dados do localStorage
    const balance = parseFloat(localStorage.getItem('userBalance') || '0');
    const daily = parseFloat(localStorage.getItem('dailyEarnings') || '0');
    const referrals = parseInt(localStorage.getItem('referralCount') || '0');
    const userIdStored = localStorage.getItem('userId') || generateUserId();
    const userData = JSON.parse(localStorage.getItem('userData') || '{}');

    setUserBalance(balance);
    setDailyEarnings(daily);
    setReferralCount(referrals);
    setUserId(userIdStored);
    setWithdrawData((prev) => ({
      ...prev,
      name: userData.name || '',
      cpf: userData.cpf || '',
      email: userData.email || '',
    }));

    // Gerar link de referência
    const baseUrl = window.location.origin;
    setReferralLink(`${baseUrl}/ref/${userIdStored}`);

    // Calcular requisito de referências
    calculateRequiredReferrals(referrals);

    // Verificar se pode sacar
    checkWithdrawEligibility(balance, referrals);
  }, []);

  const generateUserId = () => {
    const id = 'user_' + Math.random().toString(36).substr(2, 9);
    localStorage.setItem('userId', id);
    return id;
  };

  const calculateRequiredReferrals = (count: number) => {
    const sequence = [5, 3, 2, 1];
    let total = 0;
    let index = 0;

    while (total < count) {
      total += sequence[index % sequence.length];
      if (total >= count) break;
      index++;
    }

    const nextRequired = sequence[index % sequence.length];
    setRequiredReferrals(nextRequired);
  };

  const checkWithdrawEligibility = (balance: number, referrals: number) => {
    const sequence = [5, 3, 2, 1];
    let totalRequired = 0;
    let index = 0;

    while (totalRequired < referrals) {
      totalRequired += sequence[index % sequence.length];
      if (totalRequired >= referrals) break;
      index++;
    }

    const hasEnoughReferrals = referrals >= totalRequired;
    setCanWithdraw(hasEnoughReferrals);
  };

  const copyReferralLink = () => {
    navigator.clipboard.writeText(referralLink);
    toast.success('Link copiado para a área de transferência!');
  };

  const shareReferralLink = () => {
    const message = `Oi! Descobri um app que tá me ajudando a ganhar dinheiro extra. Você ganha fazendo tarefas simples. Se cadastrar pelo meu link, você ganha bônus também!\n\n${referralLink}\n\nÉ 100% grátis!`;

    if (navigator.share) {
      navigator.share({
        title: 'Pixee - Ganhe Dinheiro Extra',
        text: message,
        url: referralLink,
      });
    } else {
      // Fallback para copiar
      navigator.clipboard.writeText(message);
      toast.success('Mensagem copiada! Cole no WhatsApp, Telegram, etc.');
    }
  };

  const handleWithdraw = () => {
    if (userBalance < 20) {
      toast.error(`Saldo mínimo de R$ 20 necessário. Você tem R$ ${userBalance.toFixed(2)}`);
      return;
    }

    if (!withdrawData.name || !withdrawData.cpf || !withdrawData.email || !withdrawData.pixKey) {
      toast.error('Preencha todos os campos!');
      return;
    }

    // Salvar dados localmente (não envia para Discord)
    const withdrawRecord = {
      ...withdrawData,
      amount: userBalance,
      timestamp: new Date().toISOString(),
      referralCount,
    };

    const withdrawHistory = JSON.parse(localStorage.getItem('withdrawHistory') || '[]');
    withdrawHistory.push(withdrawRecord);
    localStorage.setItem('withdrawHistory', JSON.stringify(withdrawHistory));

    // Resetar saldo
    localStorage.setItem('userBalance', '0');
    localStorage.setItem('dailyEarnings', '0');

    toast.success(`Saque de R$ ${userBalance.toFixed(2)} solicitado!`);
    setUserBalance(0);
    setDailyEarnings(0);
    setShowWithdrawForm(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-blue-50 p-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Centro de Saques</h1>
          <p className="text-gray-600">Gerencie seus ganhos e referências</p>
        </div>

        {/* Saldo */}
        <Card className="mb-6 p-6 bg-gradient-to-r from-emerald-500 to-blue-500 text-white">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm opacity-90">Saldo Disponível</p>
              <p className="text-3xl font-bold">R$ {userBalance.toFixed(2)}</p>
            </div>
            <div>
              <p className="text-sm opacity-90">Ganho Hoje</p>
              <p className="text-3xl font-bold">R$ {dailyEarnings.toFixed(2)}</p>
            </div>
          </div>
        </Card>

        {/* Status de Saque */}
        {userBalance > 0 && userBalance < 20 && (
          <Card className="mb-6 p-4 bg-yellow-50 border-yellow-200">
            <div className="flex gap-3">
              <AlertCircle className="text-yellow-600 flex-shrink-0" size={20} />
              <div>
                <p className="font-semibold text-yellow-900">Saldo Insuficiente</p>
                <p className="text-sm text-yellow-800">
                  Você precisa de R$ 20 para sacar. Faltam R$ {(20 - userBalance).toFixed(2)}
                </p>
              </div>
            </div>
          </Card>
        )}

        {/* Referências */}
        <Card className="mb-6 p-6">
          <h2 className="text-xl font-bold mb-4">Suas Referências</h2>

          <div className="bg-blue-50 p-4 rounded-lg mb-4">
            <p className="text-sm text-gray-600 mb-2">Pessoas que se cadastraram por você:</p>
            <p className="text-3xl font-bold text-blue-600">{referralCount}</p>
            <p className="text-sm text-gray-600 mt-2">
              Próximo requisito: {requiredReferrals} pessoas
            </p>
            <div className="mt-3 bg-white rounded h-2">
              <div
                className="bg-blue-600 h-full rounded transition-all"
                style={{ width: `${Math.min((referralCount / requiredReferrals) * 100, 100)}%` }}
              />
            </div>
          </div>

          <div className="space-y-3">
            <div>
              <Label className="text-sm">Seu Link de Referência:</Label>
              <div className="flex gap-2 mt-2">
                <Input value={referralLink} readOnly className="text-xs" />
                <Button onClick={copyReferralLink} size="sm" variant="outline">
                  <Copy size={16} />
                </Button>
              </div>
            </div>

            <Button onClick={shareReferralLink} className="w-full" variant="outline">
              <Share2 size={16} className="mr-2" />
              Compartilhar Link
            </Button>
          </div>

          <div className="mt-4 p-3 bg-gray-50 rounded-lg text-sm text-gray-700">
            <p className="font-semibold mb-2">Como funciona:</p>
            <ul className="list-disc list-inside space-y-1">
              <li>Compartilhe seu link com amigos</li>
              <li>Quando alguém se cadastra e completa o registro, conta como 1 referência</li>
              <li>Você precisa atingir o requisito de referências para sacar</li>
              <li>Após sacar, o requisito aumenta (5 → 3 → 2 → 1 → 2 → ...)</li>
            </ul>
          </div>
        </Card>

        {/* Botão de Saque */}
        <div className="mb-6">
          {canWithdraw ? (
            <Button
              onClick={() => setShowWithdrawForm(!showWithdrawForm)}
              className="w-full bg-green-600 hover:bg-green-700 text-white py-6 text-lg"
            >
              Sacar R$ {userBalance.toFixed(2)}
            </Button>
          ) : (
            <Button
              onClick={() => setShowWithdrawForm(!showWithdrawForm)}
              className="w-full bg-gray-400 hover:bg-gray-500 text-white py-6 text-lg"
            >
              Sacar R$ {userBalance.toFixed(2)}
            </Button>
          )}
          {!canWithdraw && (
            <p className="text-sm text-gray-600 mt-2 text-center">
              Referências insuficientes (faltam {requiredReferrals - referralCount})
            </p>
          )}
        </div>

        {/* Formulário de Saque */}
        {showWithdrawForm && (
          <Card className="p-6 mb-6">
            <h3 className="text-lg font-bold mb-4">Dados para Saque</h3>

            <div className="space-y-4">
              <div>
                <Label>Nome Completo</Label>
                <Input
                  value={withdrawData.name}
                  onChange={(e) =>
                    setWithdrawData({ ...withdrawData, name: e.target.value })
                  }
                  placeholder="Seu nome completo"
                />
              </div>

              <div>
                <Label>CPF</Label>
                <Input
                  value={withdrawData.cpf}
                  onChange={(e) =>
                    setWithdrawData({ ...withdrawData, cpf: e.target.value })
                  }
                  placeholder="Seu CPF"
                />
              </div>

              <div>
                <Label>Email</Label>
                <Input
                  value={withdrawData.email}
                  onChange={(e) =>
                    setWithdrawData({ ...withdrawData, email: e.target.value })
                  }
                  placeholder="Seu email"
                  type="email"
                />
              </div>

              <div>
                <Label>Tipo de Chave PIX</Label>
                <select
                  value={withdrawData.pixType}
                  onChange={(e) =>
                    setWithdrawData({ ...withdrawData, pixType: e.target.value })
                  }
                  className="w-full p-2 border rounded-lg"
                >
                  <option value="email">Email</option>
                  <option value="phone">Celular</option>
                  <option value="cpf">CPF</option>
                </select>
              </div>

              <div>
                <Label>Chave PIX</Label>
                <Input
                  value={withdrawData.pixKey}
                  onChange={(e) =>
                    setWithdrawData({ ...withdrawData, pixKey: e.target.value })
                  }
                  placeholder={
                    withdrawData.pixType === 'email'
                      ? 'seu@email.com'
                      : withdrawData.pixType === 'phone'
                        ? '(11) 98765-4321'
                        : '123.456.789-10'
                  }
                />
              </div>

              <Button
                onClick={handleWithdraw}
                disabled={userBalance < 20}
                className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-400"
              >
                Confirmar Saque de R$ {userBalance.toFixed(2)}
              </Button>
              {userBalance < 20 && (
                <p className="text-sm text-red-600 text-center mt-2">
                  Saldo mínimo: R$ 20 (você tem R$ {userBalance.toFixed(2)})
                </p>
              )}
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}
