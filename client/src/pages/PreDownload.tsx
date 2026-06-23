import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ArrowDownCircle, Star, Users, Zap } from "lucide-react";
import { useEffect, useState } from "react";

export default function PreDownload() {
  const [downloadsToday, setDownloadsToday] = useState(0);
  const [slotsRemaining, setSlotsRemaining] = useState(100);
  const [progressValue, setProgressValue] = useState(0);

  useEffect(() => {
    // Capturar referrer da URL
    const params = new URLSearchParams(window.location.search);
    const ref = params.get("ref");
    if (ref) {
      localStorage.setItem("referrer", ref);
    }

    // Simular downloads em tempo real
    const interval = setInterval(() => {
      setDownloadsToday(prev => prev + Math.floor(Math.random() * 5) + 1);
      setSlotsRemaining(prev => Math.max(0, prev - (Math.floor(Math.random() * 3) + 1)));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    setProgressValue(100 - (slotsRemaining / 100) * 100);
  }, [slotsRemaining]);

  const reviews = [
    {
      name: "Ana Paula S.",
      comment: "Nunca imaginei que seria tão fácil! Em uma semana já saquei R$350. O Pixee é real!",
      rating: 5,
    },
    {
      name: "João M.",
      comment: "Finalmente um app que cumpre o que promete. As missões são divertidas e o dinheiro cai na hora.",
      rating: 5,
    },
    {
      name: "Carla R.",
      comment: "Estava cética, mas o Pixee me surpreendeu. Renda extra garantida e sem burocracia. Baixem agora!",
      rating: 5,
    },
  ];

  const handleDownload = () => {
    // Lógica para iniciar o download do APK
    window.location.href = 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663788356460/ZSofAOLfZSjRbCTm.apk'; // Caminho direto para o APK
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-500 to-green-700 text-white flex flex-col items-center justify-center p-4">
      <div className="max-w-4xl w-full bg-white rounded-xl shadow-2xl p-8 md:p-12 text-gray-900 text-center relative overflow-hidden">
        {/* Fundo com efeito de brilho */}
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-100 to-green-50 opacity-20 animate-pulse-slow"></div>

        <h1 className="text-4xl md:text-5xl font-extrabold mb-4 relative z-10 leading-tight">
          <span className="block text-emerald-600">ATENÇÃO: Oportunidade ÚNICA!</span>
          Ganhe Dinheiro AGORA com o Pixee!
        </h1>
        <p className="text-lg md:text-xl mb-8 relative z-10 font-medium">
          Milhares de brasileiros estão transformando tempo livre em PIX. Não perca essa chance!
        </p>

        {/* Seção de Urgência e Escassez */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10 relative z-10">
          <Card className="bg-red-50 border-red-200 text-red-800">
            <CardHeader>
              <CardTitle className="flex items-center justify-center gap-2 text-red-600">
                <Zap className="h-6 w-6 animate-pulse" /> Vagas Limitadas!
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold mb-2">Apenas <span className="text-red-700">{slotsRemaining}</span> vagas restantes!</p>
              <Progress value={progressValue} className="w-full bg-red-200 h-3 [&>*]:bg-red-600" />
              <p className="text-sm mt-2">Corra antes que acabem!</p>
            </CardContent>
          </Card>
          <Card className="bg-blue-50 border-blue-200 text-blue-800">
            <CardHeader>
              <CardTitle className="flex items-center justify-center gap-2 text-blue-600">
                <Users className="h-6 w-6 animate-bounce" /> Downloads Hoje!
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold mb-2"><span className="text-blue-700">+{downloadsToday}</span> pessoas baixaram hoje!</p>
              <p className="text-sm mt-2">Junte-se a elas e comece a ganhar!</p>
            </CardContent>
          </Card>
        </div>

        {/* Botão de Download Principal */}
        <Button
          onClick={handleDownload}
          className="bg-emerald-600 hover:bg-emerald-700 text-white text-2xl md:text-3xl font-bold py-4 px-10 rounded-full shadow-lg transform transition-all duration-300 ease-in-out hover:scale-105 active:scale-95 animate-pulse-fast relative z-10"
        >
          <ArrowDownCircle className="h-8 w-8 mr-4" /> BAIXAR PIXEE AGORA E GANHAR R$50!
        </Button>
        <p className="text-sm text-gray-600 mt-4 relative z-10">Compatível com Android 7.0+ | Download Seguro e Gratuito</p>

        {/* Seção de Prova Social - Avaliações Falsas */}
        <div className="mt-12 relative z-10">
          <h2 className="text-3xl font-bold mb-6 text-emerald-700">O que nossos usuários estão dizendo:</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {reviews.map((review, index) => (
              <Card key={index} className="bg-white border-gray-200 shadow-md">
                <CardContent className="p-6">
                  <div className="flex items-center justify-center mb-3">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-gray-700 italic mb-3">\" {review.comment} \"</p>
                  <p className="font-semibold text-gray-800">- {review.name}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Chamada para Ação Final */}
        <div className="mt-12 bg-emerald-50 border-emerald-200 p-6 rounded-lg shadow-inner relative z-10">
          <h3 className="text-2xl font-bold text-emerald-800 mb-4">Não perca mais tempo!</h3>
          <p className="text-lg text-emerald-700 mb-6">Aproveite a chance de ter uma renda extra significativa. As vagas são limitadas e estão acabando rápido!</p>
          <Button
            onClick={handleDownload}
            className="bg-emerald-600 hover:bg-emerald-700 text-white text-xl font-bold py-3 px-8 rounded-full shadow-lg transform transition-all duration-300 ease-in-out hover:scale-105 active:scale-95"
          >
            <ArrowDownCircle className="h-6 w-6 mr-3" /> GARANTA SUA VAGA E BAIXE O PIXEE!
          </Button>
        </div>
      </div>
    </div>
  );
}
