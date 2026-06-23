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
  const [showWithdrawForm, setShowWithdrawForm] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
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
    const submitted = localStorage.getItem('withdrawFormSubmitted') === 'true';

    setUserBalance(balance);
    setDailyEarnings(daily);
    setReferralCount(referrals);
    setUserId(userIdStored);
    setFormSubmitted(submitted);

    // Gerar link de referência
    const baseUrl = window.location.origin;
    setReferralLink(`${baseUrl}/pre-download?ref=${userIdStored}`);

    // Calcular requisito de referências
    calculateRequiredReferrals(referrals);
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setWithdrawData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFormSubmit = () => {
    if (!withdrawData.name || !withdrawData.cpf || !withdrawData.email || !withdrawData.pixKey) {
      toast.error('Preencha todos os campos!');
      return;
    }

    // Salvar dados
    localStorage.setItem('userData', JSON.stringify(withdrawData));
    localStorage.setItem('withdrawFormSubmitted', 'true');
    setFormSubmitted(true);
    toast.success('Dados salvos! Agora compartilhe seu link de referência.');
  };

  const handleWithdraw = () => {
    if (userBalance < 20) {
      toast.error(`Saldo mínimo de R$ 20 necessário. Você tem R$ ${userBalance.toFixed(2)}`);
      return;
    }

    if (referralCount < requiredReferrals) {
      toast.error(`Você precisa de ${requiredReferrals - referralCount} cadastros a mais para sacar.`);
      return;
    }

    // Salvar registro de saque
    const withdrawRecord = {
      ...withdrawData,
      amount: userBalance,
      timestamp: new Date().toISOString(),
    };

    const records = JSON.parse(localStorage.getItem('withdrawRecords') || '[]');
    records.push(withdrawRecord);
    localStorage.setItem('withdrawRecords', JSON.stringify(records));

    // Limpar saldo
    setUserBalance(0);
    localStorage.setItem('userBalance', '0');
    localStorage.setItem('dailyEarnings', '0');
    setShowWithdrawForm(false);
    setFormSubmitted(false);
    localStorage.setItem('withdrawFormSubmitted', 'false');

    toast.success(`Saque de R$ ${userBalance.toFixed(2)} solicitado com sucesso!`);
  };

  const copyLink = () => {
    navigator.clipboard.writeText(referralLink);
    toast.success('Link copiado para a área de transferência!');
  };

  const shareLink = () => {
    const message = `Oi! Descobri um app chamado Pixee que tá me ajudando a ganhar uma renda extra. Você pode se cadastrar pelo meu link e começar a ganhar também! ${referralLink}`;
    
    if (navigator.share) {
      navigator.share({
        title: 'Pixee - Ganhe Dinheiro Extra',
        text: message,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(message);
      toast.success('Mensagem copiada! Cole no WhatsApp ou outra rede social.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-white py-12 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Sacar Dinheiro</h1>
          <p className="text-gray-600">Gerencie seus ganhos e solicite seu saque</p>
        </div>

        {/* Saldo Disponível */}
        <Card className="mb-6 p-6 bg-gradient-to-r from-blue-500 to-blue-600 text-white">
          <p className="text-sm opacity-90 mb-2">Saldo Disponível</p>
          <p className="text-4xl font-bold mb-4">R$ {userBalance.toFixed(2)}</p>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Ganho hoje:</span>
              <span>R$ {dailyEarnings.toFixed(2)}</span>
            </div>
          </div>
        </Card>

        {/* Formulário de Saque */}
        {!showWithdrawForm ? (
          <Button
            onClick={() => setShowWithdrawForm(true)}
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 mb-6"
          >
            Solicitar Saque
          </Button>
        ) : (
          <Card className="mb-6 p-6 border-2 border-emerald-200">
            <h2 className="text-xl font-bold mb-4">Dados para Saque</h2>
            
            <div className="space-y-4 mb-6">
              <div>
                <Label htmlFor="name" className="block text-sm font-semibold mb-2">
                  Nome Completo
                </Label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="João Silva"
                  value={withdrawData.name}
                  onChange={handleInputChange}
                  className="w-full"
                />
              </div>

              <div>
                <Label htmlFor="cpf" className="block text-sm font-semibold mb-2">
                  CPF do Destinatário
                </Label>
                <Input
                  id="cpf"
                  name="cpf"
                  type="text"
                  placeholder="000.000.000-00"
                  value={withdrawData.cpf}
                  onChange={handleInputChange}
                  className="w-full"
                />
              </div>

              <div>
                <Label htmlFor="email" className="block text-sm font-semibold mb-2">
                  Email
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="seu@email.com"
                  value={withdrawData.email}
                  onChange={handleInputChange}
                  className="w-full"
                />
              </div>

              <div>
                <Label htmlFor="pixKey" className="block text-sm font-semibold mb-2">
                  Chave PIX
                </Label>
                <Input
                  id="pixKey"
                  name="pixKey"
                  type="text"
                  placeholder="seu@email.com ou (11) 98765-4321"
                  value={withdrawData.pixKey}
                  onChange={handleInputChange}
                  className="w-full"
                />
              </div>
            </div>

            {!formSubmitted ? (
              <Button
                onClick={handleFormSubmit}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2"
              >
                Salvar Dados
              </Button>
            ) : (
              <Button
                onClick={() => setShowWithdrawForm(false)}
                className="w-full bg-gray-600 hover:bg-gray-700 text-white font-semibold py-2"
              >
                Fechar
              </Button>
            )}
          </Card>
        )}

        {/* Referências - Só mostra após formulário */}
        {formSubmitted && (
          <Card className="mb-6 p-6 bg-purple-50 border-2 border-purple-200">
            <h2 className="text-xl font-bold mb-4 text-purple-900">Convide Amigos</h2>
            
            <div className="mb-4">
              <p className="text-sm text-gray-700 mb-2">Cadastros: {referralCount}/{requiredReferrals}</p>
              <div className="w-full bg-gray-300 rounded-full h-3">
                <div
                  className="bg-purple-600 h-3 rounded-full transition-all"
                  style={{ width: `${Math.min((referralCount / requiredReferrals) * 100, 100)}%` }}
                />
              </div>
            </div>

            {referralCount < requiredReferrals && (
              <div>
                <p className="text-sm text-purple-700 mb-2 font-semibold">
                  Faltam {requiredReferrals - referralCount} pessoas para poder sacar
                </p>
                <p className="text-xs text-red-600 mb-4 font-semibold bg-red-50 p-2 rounded">
                  ⚠️ Seus amigos precisam BAIXAR O APP e SE REGISTRAR para contar!
                </p>
              </div>
            )}

            {referralCount >= requiredReferrals && (
              <p className="text-sm text-green-700 mb-4 font-semibold">
                ✓ Você atingiu o requisito de referências!
              </p>
            )}

            <div className="space-y-2">
              <Button
                onClick={copyLink}
                className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2"
              >
                <Copy size={16} className="mr-2" />
                Copiar Link
              </Button>
              <Button
                onClick={shareLink}
                className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2"
              >
                <Share2 size={16} className="mr-2" />
                Compartilhar
              </Button>
            </div>

            <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-xs text-blue-700">
                <strong>Como funciona:</strong> Compartilhe seu link com amigos. Quando eles se cadastrarem e completarem o registro no app, o contador aumenta automaticamente.
              </p>
            </div>
          </Card>
        )}

        {/* Botão de Saque */}
        {formSubmitted && (
          <Card className="p-6 bg-green-50 border-2 border-green-200">
            <h2 className="text-lg font-bold mb-4 text-green-900">Confirmar Saque</h2>
            
            {userBalance < 20 && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg mb-4 flex items-start gap-2">
                <AlertCircle size={16} className="text-red-600 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-red-700">
                  Saldo mínimo: R$ 20 (você tem R$ {userBalance.toFixed(2)})
                </p>
              </div>
            )}

            {referralCount < requiredReferrals && (
              <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg mb-4 flex items-start gap-2">
                <AlertCircle size={16} className="text-yellow-600 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-yellow-700">
                  Você precisa de {requiredReferrals - referralCount} cadastros a mais para sacar
                </p>
              </div>
            )}

            <Button
              onClick={handleWithdraw}
              disabled={userBalance < 20 || referralCount < requiredReferrals}
              className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white font-semibold py-3"
            >
              Confirmar Saque de R$ {userBalance.toFixed(2)}
            </Button>
          </Card>
        )}
      </div>
    </div>
  );
}
