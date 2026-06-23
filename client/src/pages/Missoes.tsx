import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Zap, TrendingUp, Award, Clock } from "lucide-react";

interface Missao {
  id: number;
  titulo: string;
  descricao: string;
  valor: number;
  dificuldade: "facil" | "medio" | "dificil";
  tempo: number;
  tipo: string;
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
    titulo: "Pesquisa de Opinião - Google",
    descricao: "Responda 5 perguntas sobre seus hábitos de uso de tecnologia",
    valor: 15,
    dificuldade: "facil",
    tempo: 2,
    tipo: "Pesquisa",
    empresa: "Google",
  },
  {
    id: 2,
    titulo: "Validação de Dados - Amazon",
    descricao: "Valide 10 informações de produtos para qualidade de dados",
    valor: 45,
    dificuldade: "medio",
    tempo: 5,
    tipo: "Validação",
    empresa: "Amazon",
  },
  {
    id: 3,
    titulo: "Análise de Conteúdo - Meta",
    descricao: "Analise e categorize 8 imagens por relevância e qualidade",
    valor: 120,
    dificuldade: "dificil",
    tempo: 8,
    tipo: "Análise",
    empresa: "Meta",
  },
  {
    id: 4,
    titulo: "Teste de App - Spotify",
    descricao: "Teste a navegação do app e reporte bugs encontrados",
    valor: 60,
    dificuldade: "medio",
    tempo: 6,
    tipo: "Teste",
    empresa: "Spotify",
  },
  {
    id: 5,
    titulo: "Pesquisa Rápida - Netflix",
    descricao: "Responda 3 perguntas sobre preferências de conteúdo",
    valor: 10,
    dificuldade: "facil",
    tempo: 1,
    tipo: "Pesquisa",
    empresa: "Netflix",
  },
  {
    id: 6,
    titulo: "Categorização - Airbnb",
    descricao: "Categorize 15 imagens de propriedades por tipo",
    valor: 80,
    dificuldade: "medio",
    tempo: 7,
    tipo: "Categorização",
    empresa: "Airbnb",
  },
  {
    id: 7,
    titulo: "Análise Avançada - Microsoft",
    descricao: "Analise complexidade de 5 interfaces de software",
    valor: 150,
    dificuldade: "dificil",
    tempo: 10,
    tipo: "Análise",
    empresa: "Microsoft",
  },
  {
    id: 8,
    titulo: "Pesquisa - Apple",
    descricao: "Responda sobre sua experiência com produtos Apple",
    valor: 20,
    dificuldade: "facil",
    tempo: 3,
    tipo: "Pesquisa",
    empresa: "Apple",
  },
];

export default function Missoes() {
  const [saldo, setSaldo] = useState(0);
  const [ganhoHoje, setGanhoHoje] = useState(0);
  const [missaoAtiva, setMissaoAtiva] = useState<Missao | null>(null);
  const [progresso, setProgresso] = useState(0);
  const [missoesConcluidas, setMissoesConcluidas] = useState<MissaoCompletada[]>([]);
  const [badges, setBadges] = useState<Badge[]>([
    { id: "primeira", nome: "Primeira Missão", descricao: "Complete sua primeira missão", desbloqueado: false, progresso: 0, meta: 1 },
    { id: "ganho100", nome: "Ganho de R$ 100", descricao: "Ganhe R$ 100 em um dia", desbloqueado: false, progresso: 0, meta: 100 },
    { id: "ganho250", nome: "Limite Atingido", descricao: "Ganhe R$ 250 em um dia", desbloqueado: false, progresso: 0, meta: 250 },
    { id: "acuraciaPerfeita", nome: "Acurácia Perfeita", descricao: "Complete 5 missões com 100% de acurácia", desbloqueado: false, progresso: 0, meta: 5 },
  ]);
  const [tempoRestante, setTempoRestante] = useState(0);
  const [mostrarSucesso, setMostrarSucesso] = useState(false);
  const [ultimoGanho, setUltimoGanho] = useState(0);

  const LIMITE_DIARIO = 250;

  useEffect(() => {
    if (missaoAtiva && tempoRestante > 0) {
      const timer = setTimeout(() => {
        setTempoRestante(tempoRestante - 1);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [tempoRestante, missaoAtiva]);

  const getDificuldadeColor = (dificuldade: string) => {
    switch (dificuldade) {
      case "facil":
        return "bg-green-100 text-green-700";
      case "medio":
        return "bg-yellow-100 text-yellow-700";
      case "dificil":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const getDificuldadeLabel = (dificuldade: string) => {
    switch (dificuldade) {
      case "facil":
        return "Fácil";
      case "medio":
        return "Médio";
      case "dificil":
        return "Difícil";
      default:
        return "Normal";
    }
  };

  const iniciarMissao = (missao: Missao) => {
    setMissaoAtiva(missao);
    setProgresso(0);
    setTempoRestante(missao.tempo * 60);
  };

  const completarMissao = () => {
    if (!missaoAtiva) return;

    const novoGanho = missaoAtiva.valor;
    const novoSaldo = saldo + novoGanho;
    const novoGanhoHoje = ganhoHoje + novoGanho;

    // Bônus por acurácia (10% extra)
    const bonus = Math.floor(novoGanho * 0.1);
    const totalComBonus = novoGanho + bonus;

    setSaldo(novoSaldo + bonus);
    setGanhoHoje(novoGanhoHoje + bonus);
    setUltimoGanho(totalComBonus);

    // Adicionar ao histórico
    const novaMissaoConcluida: MissaoCompletada = {
      id: missaoAtiva.id,
      titulo: missaoAtiva.titulo,
      valor: totalComBonus,
      timestamp: Date.now(),
    };
    setMissoesConcluidas([novaMissaoConcluida, ...missoesConcluidas]);

    // Atualizar badges
    const novasBadges = [...badges];
    
    // Badge: Primeira Missão
    if (missoesConcluidas.length === 0) {
      novasBadges[0].desbloqueado = true;
      novasBadges[0].progresso = 1;
    }

    // Badge: Ganho de R$ 100
    if (novoGanhoHoje >= 100 && !novasBadges[1].desbloqueado) {
      novasBadges[1].desbloqueado = true;
      novasBadges[1].progresso = 100;
    }

    // Badge: Limite Atingido
    if (novoGanhoHoje >= 250 && !novasBadges[2].desbloqueado) {
      novasBadges[2].desbloqueado = true;
      novasBadges[2].progresso = 250;
    }

    // Badge: Acurácia Perfeita
    if (missoesConcluidas.length + 1 >= 5) {
      novasBadges[3].desbloqueado = true;
      novasBadges[3].progresso = 5;
    }

    setBadges(novasBadges);

    setMostrarSucesso(true);
    setTimeout(() => {
      setMissaoAtiva(null);
      setMostrarSucesso(false);
    }, 2000);
  };

  const podeCompletarMais = ganhoHoje < LIMITE_DIARIO;

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white pb-12">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <img 
                src="https://files.manuscdn.com/user_upload_by_module/session_file/310519663621133054/XCzPMTUpgMBhOytr.png" 
                alt="Pixee Logo" 
                className="w-8 h-8"
              />
              <span className="font-bold text-gray-900">Pixee</span>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-600">Saldo Total</p>
              <p className="text-2xl font-bold text-emerald-600">R$ {saldo.toFixed(2)}</p>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-4">
            <Card className="p-4 border border-gray-200">
              <p className="text-xs text-gray-600 mb-1">Ganho Hoje</p>
              <p className="text-xl font-bold text-gray-900">R$ {ganhoHoje.toFixed(2)}</p>
              <div className="mt-2 bg-gray-200 rounded-full h-2">
                <div
                  className="bg-emerald-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${(ganhoHoje / LIMITE_DIARIO) * 100}%` }}
                ></div>
              </div>
              <p className="text-xs text-gray-500 mt-1">Limite: R$ {LIMITE_DIARIO}</p>
            </Card>

            <Card className="p-4 border border-gray-200">
              <p className="text-xs text-gray-600 mb-1">Missões Completadas</p>
              <p className="text-xl font-bold text-gray-900">{missoesConcluidas.length}</p>
              <p className="text-xs text-gray-500 mt-3">Hoje</p>
            </Card>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {missaoAtiva ? (
          // Modal de Missão
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <Card className="w-full max-w-md border-0 shadow-2xl">
              {mostrarSucesso ? (
                <div className="p-8 text-center">
                  <div className="mb-6 flex justify-center">
                    <div className="relative">
                      <div className="absolute inset-0 bg-emerald-200 rounded-full animate-ping opacity-75"></div>
                      <div className="relative w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center">
                        <CheckCircle2 className="w-8 h-8 text-emerald-600" />
                      </div>
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Missão Aprovada!</h3>
                  <p className="text-emerald-600 font-bold text-3xl mb-4">+R$ {ultimoGanho.toFixed(2)}</p>
                  <p className="text-sm text-gray-600">Bônus de acurácia incluído</p>
                </div>
              ) : (
                <div className="p-6">
                  <div className="mb-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-xl font-bold text-gray-900">{missaoAtiva.titulo}</h3>
                        <p className="text-sm text-gray-600 mt-1">{missaoAtiva.empresa}</p>
                      </div>
                      <p className="text-2xl font-bold text-emerald-600">R$ {missaoAtiva.valor}</p>
                    </div>

                    <p className="text-gray-700 mb-4">{missaoAtiva.descricao}</p>

                    <div className="flex gap-2 mb-4">
                      <Badge className={getDificuldadeColor(missaoAtiva.dificuldade)}>
                        {getDificuldadeLabel(missaoAtiva.dificuldade)}
                      </Badge>
                      <Badge className="bg-blue-100 text-blue-700">
                        <Clock className="w-3 h-3 mr-1" />
                        {missaoAtiva.tempo} min
                      </Badge>
                    </div>
                  </div>

                  {/* Progresso da Missão */}
                  <div className="mb-6">
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-sm font-semibold text-gray-900">Progresso</p>
                      <p className="text-sm text-gray-600">{Math.floor((progresso / 100) * 100)}%</p>
                    </div>
                    <div className="bg-gray-200 rounded-full h-3">
                      <div
                        className="bg-emerald-600 h-3 rounded-full transition-all duration-300"
                        style={{ width: `${progresso}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Timer */}
                  <div className="text-center mb-6">
                    <p className="text-sm text-gray-600 mb-2">Tempo Restante</p>
                    <p className="text-3xl font-bold text-gray-900">
                      {Math.floor(tempoRestante / 60)}:{(tempoRestante % 60).toString().padStart(2, "0")}
                    </p>
                  </div>

                  {/* Buttons */}
                  <div className="space-y-3">
                    <Button
                      onClick={() => {
                        setProgresso(Math.min(100, progresso + 25));
                        if (progresso >= 75) {
                          completarMissao();
                        }
                      }}
                      className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3"
                    >
                      Avançar Missão
                    </Button>
                    <Button
                      onClick={() => setMissaoAtiva(null)}
                      variant="outline"
                      className="w-full"
                    >
                      Cancelar
                    </Button>
                  </div>
                </div>
              )}
            </Card>
          </div>
        ) : (
          <>
            {/* Badges Section */}
            <div className="mb-12">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Conquistas</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {badges.map((badge) => (
                  <Card
                    key={badge.id}
                    className={`p-4 text-center border-2 transition-all ${
                      badge.desbloqueado
                        ? "border-emerald-200 bg-emerald-50"
                        : "border-gray-200 bg-gray-50 opacity-60"
                    }`}
                  >
                    <div className="mb-2 flex justify-center">
                      <Award className={`w-6 h-6 ${badge.desbloqueado ? "text-emerald-600" : "text-gray-400"}`} />
                    </div>
                    <p className="text-xs font-semibold text-gray-900">{badge.nome}</p>
                    <p className="text-xs text-gray-600 mt-1">{badge.progresso}/{badge.meta}</p>
                  </Card>
                ))}
              </div>
            </div>

            {/* Missões Section */}
            <div className="mb-12">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Missões Disponíveis</h2>
              {!podeCompletarMais && (
                <Card className="p-4 bg-blue-50 border border-blue-200 mb-6">
                  <p className="text-sm text-blue-800">
                    Você atingiu o limite diário de R$ {LIMITE_DIARIO}. Volte amanhã para mais missões!
                  </p>
                </Card>
              )}
              <div className="grid gap-4">
                {missoes.map((missao) => (
                  <Card
                    key={missao.id}
                    className="p-4 border border-gray-200 hover:shadow-md transition-all cursor-pointer"
                    onClick={() => podeCompletarMais && iniciarMissao(missao)}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <h3 className="font-bold text-gray-900">{missao.titulo}</h3>
                        <p className="text-sm text-gray-600 mt-1">{missao.descricao}</p>
                      </div>
                      <p className="text-lg font-bold text-emerald-600 ml-4">R$ {missao.valor}</p>
                    </div>

                    <div className="flex items-center gap-2 flex-wrap">
                      <Badge className={getDificuldadeColor(missao.dificuldade)}>
                        {getDificuldadeLabel(missao.dificuldade)}
                      </Badge>
                      <Badge className="bg-purple-100 text-purple-700">{missao.tipo}</Badge>
                      <Badge className="bg-blue-100 text-blue-700">
                        <Clock className="w-3 h-3 mr-1" />
                        {missao.tempo} min
                      </Badge>
                    </div>

                    {podeCompletarMais && (
                      <Button
                        onClick={(e) => {
                          e.stopPropagation();
                          iniciarMissao(missao);
                        }}
                        className="w-full mt-4 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold"
                      >
                        Iniciar Missão
                      </Button>
                    )}
                  </Card>
                ))}
              </div>
            </div>

            {/* Histórico */}
            {missoesConcluidas.length > 0 && (
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-4">Histórico de Ganhos</h2>
                <div className="space-y-3">
                  {missoesConcluidas.slice(0, 10).map((missao, index) => (
                    <Card key={index} className="p-4 border border-gray-200">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                          <div>
                            <p className="font-semibold text-gray-900">{missao.titulo}</p>
                            <p className="text-xs text-gray-500">
                              {new Date(missao.timestamp).toLocaleTimeString("pt-BR")}
                            </p>
                          </div>
                        </div>
                        <p className="font-bold text-emerald-600">+R$ {missao.valor.toFixed(2)}</p>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
