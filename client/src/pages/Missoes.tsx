import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Zap, TrendingUp, Award, Clock } from "lucide-react";
import { useLocation } from "wouter";
import ShopReviewGame from "@/components/minigames/ShopReviewGameAdvanced";
import DataValidationGame from "@/components/minigames/DataValidationGame";
import SurveyGame from "@/components/minigames/SurveyGame";
import ImageAnalysisGame from "@/components/minigames/ImageAnalysisGame";
import CategorizationGame from "@/components/minigames/CategorizationGame";
import UsabilityTestGame from "@/components/minigames/UsabilityTestGame";

interface Missao {
  id: number;
  titulo: string;
  descricao: string;
  valor: number;
  dificuldade: "facil" | "medio" | "dificil";
  tempo: number;
  tipo: "shop" | "validation" | "survey" | "image" | "categorization" | "usability";
  empresa: string;
}

interface MissaoCompletada {
  id: number;
  titulo: string;
  valor: number;
  timestamp: number;
}

interface Badge {
  id: string;
  nome: string;
  descricao: string;
  desbloqueado: boolean;
  progresso: number;
  meta: number;
}

const missoes: Missao[] = [
  {
    id: 1,
    titulo: "Avaliação de Lojas",
    descricao: "Avalie a experiência em diferentes lojas",
    valor: 15,
    dificuldade: "facil",
    tempo: 5,
    tipo: "shop",
    empresa: "Retail Co",
  },
  {
    id: 2,
    titulo: "Validação de Dados",
    descricao: "Valide informações de produtos para qualidade",
    valor: 45,
    dificuldade: "medio",
    tempo: 8,
    tipo: "validation",
    empresa: "Amazon",
  },
  {
    id: 3,
    titulo: "Pesquisa de Opinião",
    descricao: "Responda perguntas sobre seus hábitos",
    valor: 10,
    dificuldade: "facil",
    tempo: 3,
    tipo: "survey",
    empresa: "Google",
  },
  {
    id: 4,
    titulo: "Análise de Imagens",
    descricao: "Analise e descreva imagens de produtos",
    valor: 60,
    dificuldade: "medio",
    tempo: 10,
    tipo: "image",
    empresa: "eBay",
  },
  {
    id: 5,
    titulo: "Categorização de Dados",
    descricao: "Categorize itens em grupos corretos",
    valor: 18,
    dificuldade: "facil",
    tempo: 4,
    tipo: "categorization",
    empresa: "Shopify",
  },
  {
    id: 6,
    titulo: "Teste de Usabilidade",
    descricao: "Teste a usabilidade de um site",
    valor: 65,
    dificuldade: "dificil",
    tempo: 12,
    tipo: "usability",
    empresa: "Netflix",
  },
];

const badges: Badge[] = [
  {
    id: "iniciante",
    nome: "Iniciante",
    descricao: "Complete 5 missões",
    desbloqueado: false,
    progresso: 0,
    meta: 5,
  },
  {
    id: "ganhos_100",
    nome: "Ganhos de R$ 100",
    descricao: "Ganhe R$ 100",
    desbloqueado: false,
    progresso: 0,
    meta: 100,
  },
  {
    id: "streak_5",
    nome: "Streak de 5",
    descricao: "Complete 5 missões em um dia",
    desbloqueado: false,
    progresso: 0,
    meta: 5,
  },
];

export default function Missoes() {
  const [, navigate] = useLocation();
  const [saldoUsuario, setSaldoUsuario] = useState(0);
  const [ganhosDia, setGanhosDia] = useState(0);
  const [limiteDia] = useState(200);
  const [missaoAtiva, setMissaoAtiva] = useState<Missao | null>(null);
  const [missõesCompletadas, setMissõesCompletadas] = useState<MissaoCompletada[]>([]);
  const [badgesUsuario, setBadgesUsuario] = useState<Badge[]>(badges);
  const [referralCount, setReferralCount] = useState(0);

  useEffect(() => {
    // Carregar dados do localStorage
    const saldo = parseFloat(localStorage.getItem("userBalance") || "0");
    const ganhos = parseFloat(localStorage.getItem("dailyEarnings") || "0");
    const completadas = JSON.parse(localStorage.getItem("missõesCompletadas") || "[]");
    const referrals = parseInt(localStorage.getItem("referralCount") || "0");

    setSaldoUsuario(saldo);
    setGanhosDia(ganhos);
    setMissõesCompletadas(completadas);
    setReferralCount(referrals);

    // Carregar badges
    const badgesSalvas = JSON.parse(localStorage.getItem("badges") || "[]");
    if (badgesSalvas.length > 0) {
      setBadgesUsuario(badgesSalvas);
    }
  }, []);

  const getDificuldadeColor = (dificuldade: string) => {
    switch (dificuldade) {
      case "facil":
        return "bg-green-100 text-green-800";
      case "medio":
        return "bg-yellow-100 text-yellow-800";
      case "dificil":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const renderMinigame = (missao: Missao) => {
    const difficulty = missao.dificuldade === "facil" ? "easy" : missao.dificuldade === "medio" ? "medium" : "hard";

    const handleGameComplete = (reward: number) => {
      const novoSaldo = saldoUsuario + reward;
      const novoGanho = ganhosDia + reward;

      // Verificar se atingiu limite diário
      if (novoGanho > limiteDia) {
        const excesso = novoGanho - limiteDia;
        const rewardAjustado = reward - excesso;
        setSaldoUsuario(saldoUsuario + rewardAjustado);
        setGanhosDia(limiteDia);
        localStorage.setItem("userBalance", (saldoUsuario + rewardAjustado).toString());
        localStorage.setItem("dailyEarnings", limiteDia.toString());
      } else {
        setSaldoUsuario(novoSaldo);
        setGanhosDia(novoGanho);
        localStorage.setItem("userBalance", novoSaldo.toString());
        localStorage.setItem("dailyEarnings", novoGanho.toString());
      }

      // Registrar missão completada
      const novaCompletada: MissaoCompletada = {
        id: missao.id,
        titulo: missao.titulo,
        valor: reward,
        timestamp: Date.now(),
      };

      const novasList = [...missõesCompletadas, novaCompletada];
      setMissõesCompletadas(novasList);
      localStorage.setItem("missõesCompletadas", JSON.stringify(novasList));

      setMissaoAtiva(null);
    };

    switch (missao.tipo) {
      case "shop":
        return <ShopReviewGame difficulty={difficulty} onComplete={handleGameComplete} />;
      case "validation":
        return <DataValidationGame difficulty={difficulty} onComplete={handleGameComplete} />;
      case "survey":
        return <SurveyGame difficulty={difficulty} onComplete={handleGameComplete} />;
      case "image":
        return <ImageAnalysisGame difficulty={difficulty} onComplete={handleGameComplete} />;
      case "categorization":
        return <CategorizationGame difficulty={difficulty} onComplete={handleGameComplete} />;
      case "usability":
        return <UsabilityTestGame difficulty={difficulty} onComplete={handleGameComplete} />;
      default:
        return null;
    }
  };

  if (missaoAtiva) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-blue-50 p-4">
        <div className="max-w-2xl mx-auto">
          <div className="mb-6 flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-900">{missaoAtiva.titulo}</h1>
            <Button variant="outline" onClick={() => setMissaoAtiva(null)}>
              Voltar
            </Button>
          </div>

          <Card className="p-6">
            {renderMinigame(missaoAtiva)}
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-blue-50 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Missões Disponíveis</h1>
          <p className="text-gray-600">Complete tarefas e ganhe dinheiro</p>
        </div>

        {/* Saldo e Limite */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card className="p-6 bg-gradient-to-br from-blue-500 to-blue-600 text-white">
            <p className="text-sm opacity-90 mb-1">Saldo Atual</p>
            <p className="text-3xl font-bold">R$ {saldoUsuario.toFixed(2)}</p>
            <Button
              onClick={() => navigate("/sac")}
              size="sm"
              className="w-full bg-white text-blue-600 hover:bg-gray-100 font-semibold mt-3"
            >
              Sacar Dinheiro
            </Button>
          </Card>

          <Card className="p-6 bg-gradient-to-br from-emerald-500 to-emerald-600 text-white">
            <p className="text-sm opacity-90 mb-1">Ganho Hoje</p>
            <p className="text-3xl font-bold">R$ {ganhosDia.toFixed(2)}</p>
            <p className="text-xs opacity-75 mt-1">Limite: R$ {limiteDia.toFixed(2)}</p>
          </Card>


        </div>

        {/* Aviso de Limite */}
        {ganhosDia >= limiteDia && (
          <Card className="mb-8 p-4 bg-yellow-50 border-yellow-200">
            <p className="text-yellow-800 font-semibold">
              Você atingiu o limite diário de R$ {limiteDia.toFixed(2)}!
            </p>
            <p className="text-sm text-yellow-700">
              Volte amanhã para continuar ganhando.
            </p>
          </Card>
        )}

        {/* Missões */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Tarefas Disponíveis</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {missoes.map((missao) => (
              <Card key={missao.id} className="p-4 hover:shadow-lg transition-shadow">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-bold text-gray-900">{missao.titulo}</h3>
                    <p className="text-xs text-gray-500 mt-1">{missao.empresa}</p>
                  </div>
                  <Badge className={getDificuldadeColor(missao.dificuldade)}>
                    {missao.dificuldade === "facil" ? "Fácil" : missao.dificuldade === "medio" ? "Médio" : "Difícil"}
                  </Badge>
                </div>

                <p className="text-sm text-gray-600 mb-4">{missao.descricao}</p>

                <div className="flex items-center gap-4 mb-4 text-sm">
                  <div className="flex items-center gap-1 text-green-600 font-semibold">
                    <TrendingUp size={16} />
                    R$ {missao.valor.toFixed(2)}
                  </div>
                  <div className="flex items-center gap-1 text-gray-500">
                    <Clock size={16} />
                    {missao.tempo}min
                  </div>
                </div>

                <Button
                  onClick={() => setMissaoAtiva(missao)}
                  disabled={ganhosDia >= limiteDia}
                  className="w-full"
                >
                  Começar Missão
                </Button>
              </Card>
            ))}
          </div>
        </div>

        {/* Histórico */}
        {missõesCompletadas.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Histórico de Ganhos</h2>
            <Card className="p-4">
              <div className="space-y-2">
                {missõesCompletadas.slice(-5).reverse().map((missao, index) => (
                  <div key={index} className="flex items-center justify-between py-2 border-b last:border-b-0">
                    <div className="flex items-center gap-3">
                      <CheckCircle2 size={18} className="text-green-600" />
                      <div>
                        <p className="font-semibold text-gray-900">{missao.titulo}</p>
                        <p className="text-xs text-gray-500">
                          {new Date(missao.timestamp).toLocaleTimeString("pt-BR")}
                        </p>
                      </div>
                    </div>
                    <p className="font-bold text-green-600">+R$ {missao.valor.toFixed(2)}</p>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
