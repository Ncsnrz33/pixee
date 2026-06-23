import { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';
import { ArrowLeft, TrendingUp, Calendar, DollarSign } from 'lucide-react';
import { useLocation } from 'wouter';

interface GanhosDia {
  data: string;
  ganho: number;
  missoes: number;
}

interface EstatisticasGerais {
  totalGanho: number;
  totalMissoes: number;
  mediaGanhoPorMissao: number;
  melhorDia: number;
  piorDia: number;
}

export default function Historico() {
  const [, setLocation] = useLocation();
  const [periodo, setPeriodo] = useState<'dia' | 'semana' | 'mes'>('semana');
  const [dadosGraficos, setDadosGraficos] = useState<GanhosDia[]>([]);
  const [estatisticas, setEstatisticas] = useState<EstatisticasGerais>({
    totalGanho: 0,
    totalMissoes: 0,
    mediaGanhoPorMissao: 0,
    melhorDia: 0,
    piorDia: 0,
  });

  useEffect(() => {
    // Simular dados de histórico baseado no período selecionado
    const gerarDados = () => {
      let dados: GanhosDia[] = [];
      let dataAtual = new Date();

      if (periodo === 'dia') {
        // Dados por hora do dia atual
        for (let i = 0; i < 24; i++) {
          const hora = i.toString().padStart(2, '0') + ':00';
          dados.push({
            data: hora,
            ganho: Math.random() * 30,
            missoes: Math.floor(Math.random() * 5),
          });
        }
      } else if (periodo === 'semana') {
        // Dados dos últimos 7 dias
        const diasSemana = ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab', 'Dom'];
        for (let i = 6; i >= 0; i--) {
          const data = new Date(dataAtual);
          data.setDate(data.getDate() - i);
          dados.push({
            data: diasSemana[data.getDay() === 0 ? 6 : data.getDay() - 1],
            ganho: Math.random() * 200 + 30,
            missoes: Math.floor(Math.random() * 15) + 3,
          });
        }
      } else if (periodo === 'mes') {
        // Dados dos últimos 30 dias
        for (let i = 29; i >= 0; i--) {
          const data = new Date(dataAtual);
          data.setDate(data.getDate() - i);
          const dia = data.getDate().toString();
          dados.push({
            data: `${dia}/${(data.getMonth() + 1).toString().padStart(2, '0')}`,
            ganho: Math.random() * 250 + 20,
            missoes: Math.floor(Math.random() * 20) + 2,
          });
        }
      }

      // Calcular estatísticas
      const totalGanho = dados.reduce((acc, d) => acc + d.ganho, 0);
      const totalMissoes = dados.reduce((acc, d) => acc + d.missoes, 0);
      const mediaGanhoPorMissao = totalMissoes > 0 ? totalGanho / totalMissoes : 0;
      const melhorDia = Math.max(...dados.map(d => d.ganho));
      const piorDia = Math.min(...dados.map(d => d.ganho));

      setDadosGraficos(dados);
      setEstatisticas({
        totalGanho: Math.round(totalGanho * 100) / 100,
        totalMissoes,
        mediaGanhoPorMissao: Math.round(mediaGanhoPorMissao * 100) / 100,
        melhorDia: Math.round(melhorDia * 100) / 100,
        piorDia: Math.round(piorDia * 100) / 100,
      });
    };

    gerarDados();
  }, [periodo]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-white">
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
            <button
              onClick={() => setLocation('/missoes')}
              className="flex items-center gap-2 text-emerald-600 hover:text-emerald-700 font-medium"
            >
              <ArrowLeft className="w-5 h-5" />
              Voltar
            </button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Título */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Histórico de Ganhos</h1>
          <p className="text-gray-600">Acompanhe seus ganhos em detalhes</p>
        </div>

        {/* Seletor de Período */}
        <div className="flex gap-3 mb-8">
          <button
            onClick={() => setPeriodo('dia')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              periodo === 'dia'
                ? 'bg-emerald-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Hoje
          </button>
          <button
            onClick={() => setPeriodo('semana')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              periodo === 'semana'
                ? 'bg-emerald-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Esta Semana
          </button>
          <button
            onClick={() => setPeriodo('mes')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              periodo === 'mes'
                ? 'bg-emerald-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Este Mês
          </button>
        </div>

        {/* Estatísticas Resumidas */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-600 text-sm font-medium">Total Ganho</span>
              <DollarSign className="w-5 h-5 text-emerald-600" />
            </div>
            <p className="text-2xl font-bold text-gray-900">R$ {estatisticas.totalGanho.toFixed(2)}</p>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-600 text-sm font-medium">Missões Completas</span>
              <TrendingUp className="w-5 h-5 text-blue-600" />
            </div>
            <p className="text-2xl font-bold text-gray-900">{estatisticas.totalMissoes}</p>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-600 text-sm font-medium">Média por Missão</span>
              <Calendar className="w-5 h-5 text-purple-600" />
            </div>
            <p className="text-2xl font-bold text-gray-900">R$ {estatisticas.mediaGanhoPorMissao.toFixed(2)}</p>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-600 text-sm font-medium">Melhor Dia</span>
              <TrendingUp className="w-5 h-5 text-green-600" />
            </div>
            <p className="text-2xl font-bold text-gray-900">R$ {estatisticas.melhorDia.toFixed(2)}</p>
          </div>
        </div>

        {/* Gráfico de Ganhos */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 mb-8">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Ganhos por {periodo === 'dia' ? 'Hora' : periodo === 'semana' ? 'Dia' : 'Data'}</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={dadosGraficos}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="data" />
              <YAxis />
              <Tooltip formatter={(value: any) => `R$ ${typeof value === 'number' ? value.toFixed(2) : value}`} />
              <Legend />
              <Bar dataKey="ganho" fill="#10b981" name="Ganho (R$)" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Gráfico de Missões */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Missões Completadas por {periodo === 'dia' ? 'Hora' : periodo === 'semana' ? 'Dia' : 'Data'}</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={dadosGraficos}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="data" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="missoes" stroke="#3b82f6" name="Missões" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Dica */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-blue-900 text-sm">
            <strong>Dica:</strong> Complete mais missões difíceis para aumentar seus ganhos! Cada missão difícil rende até R$ 150.
          </p>
        </div>
      </div>
    </div>
  );
}
