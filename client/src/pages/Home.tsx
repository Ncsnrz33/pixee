import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, CheckCircle2, Zap, Users, TrendingUp } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header/Navigation */}
      <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img 
              src="/manus-storage/icone_rendaja_bbd8603c.png" 
              alt="Pixee Logo" 
              className="w-10 h-10"
            />
            <span className="text-xl font-bold text-gray-900">Pixee</span>
          </div>
          <nav className="hidden md:flex items-center gap-8">
            <a href="#como-funciona" className="text-gray-700 hover:text-emerald-600 transition font-medium">
              Como Funciona
            </a>
            <a href="#tarefas" className="text-gray-700 hover:text-emerald-600 transition font-medium">
              Tarefas
            </a>
            <a href="#download" className="text-gray-700 hover:text-emerald-600 transition font-medium">
              Download
            </a>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 md:py-32 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-8">
              <div className="inline-block">
                <span className="px-4 py-2 bg-emerald-50 text-emerald-700 rounded-lg text-sm font-semibold border border-emerald-200">
                  Novo em 2026
                </span>
              </div>
              
              <h1 className="text-5xl md:text-6xl font-bold text-gray-900 leading-tight">
                Ganhe Dinheiro <span className="text-emerald-600">Extra</span>
              </h1>
              
              <p className="text-lg text-gray-600 leading-relaxed">
                Transforme seu tempo livre em dinheiro real. Sem investimento inicial, sem taxas, sem segredos. Comece hoje mesmo.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button 
                  size="lg" 
                  className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-base h-12 gap-2 font-semibold"
                  onClick={() => document.getElementById('download')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  Baixar App Agora
                  <ArrowRight className="w-4 h-4" />
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="rounded-lg text-base h-12 border-gray-300 hover:bg-gray-50 font-semibold"
                  onClick={() => document.getElementById('como-funciona')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  Saiba Como Funciona
                </Button>
              </div>

              {/* Social Proof */}
              <div className="flex items-center gap-8 pt-8 border-t border-gray-200">
                <div>
                  <p className="text-3xl font-bold text-emerald-600">50K+</p>
                  <p className="text-sm text-gray-600 font-medium">Usuários Ativos</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-emerald-600">R$ 2M+</p>
                  <p className="text-sm text-gray-600 font-medium">Pagos em 2026</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-emerald-600">4.8</p>
                  <p className="text-sm text-gray-600 font-medium">Avaliação</p>
                </div>
              </div>
            </div>

            {/* Right Visual */}
            <div className="relative h-96 md:h-full flex items-center justify-center">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-100 to-blue-100 rounded-3xl blur-3xl opacity-50"></div>
              <div className="relative w-64 h-64 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-3xl shadow-2xl flex items-center justify-center transform hover:scale-105 transition-transform duration-300">
                <TrendingUp className="w-24 h-24 text-white" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Como Funciona Section */}
      <section id="como-funciona" className="py-20 md:py-32 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Como Funciona
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Apenas 3 passos simples para começar a ganhar dinheiro
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <Card className="p-8 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-16 h-16 bg-emerald-100 rounded-lg flex items-center justify-center mb-6">
                <span className="text-3xl font-bold text-emerald-600">1</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Baixe o App</h3>
              <p className="text-gray-600 leading-relaxed">
                Faça o download do Pixee gratuitamente na sua loja de aplicativos. Leva menos de um minuto.
              </p>
            </Card>

            {/* Step 2 */}
            <Card className="p-8 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-16 h-16 bg-emerald-100 rounded-lg flex items-center justify-center mb-6">
                <span className="text-3xl font-bold text-emerald-600">2</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Escolha Tarefas</h3>
              <p className="text-gray-600 leading-relaxed">
                Navegue por centenas de tarefas disponíveis e escolha aquelas que você quer fazer.
              </p>
            </Card>

            {/* Step 3 */}
            <Card className="p-8 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-16 h-16 bg-emerald-100 rounded-lg flex items-center justify-center mb-6">
                <span className="text-3xl font-bold text-emerald-600">3</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Receba Pagamento</h3>
              <p className="text-gray-600 leading-relaxed">
                Complete as tarefas e receba seus ganhos direto na sua conta. Rápido e seguro.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Tarefas Section */}
      <section id="tarefas" className="py-20 md:py-32 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Tipos de Tarefas
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Diversas oportunidades para ganhar dinheiro fazendo o que você gosta
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Task Card 1 */}
            <Card className="p-8 border border-gray-200 shadow-sm hover:shadow-md transition-all hover:translate-y-[-4px]">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Users className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">Pesquisas e Avaliações</h3>
                  <p className="text-gray-600 text-sm">
                    Responda pesquisas sobre seus hábitos e ganhe de R$ 5 a R$ 50 por pesquisa.
                  </p>
                </div>
              </div>
            </Card>

            {/* Task Card 2 */}
            <Card className="p-8 border border-gray-200 shadow-sm hover:shadow-md transition-all hover:translate-y-[-4px]">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <TrendingUp className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">Análise de Apps</h3>
                  <p className="text-gray-600 text-sm">
                    Teste novos aplicativos e dê feedback. Ganhe R$ 10 a R$ 100 por análise.
                  </p>
                </div>
              </div>
            </Card>

            {/* Task Card 3 */}
            <Card className="p-8 border border-gray-200 shadow-sm hover:shadow-md transition-all hover:translate-y-[-4px]">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-pink-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <CheckCircle2 className="w-6 h-6 text-pink-600" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">Validação de Dados</h3>
                  <p className="text-gray-600 text-sm">
                    Valide informações e categorize dados. Ganhe R$ 3 a R$ 20 por tarefa.
                  </p>
                </div>
              </div>
            </Card>

            {/* Task Card 4 */}
            <Card className="p-8 border border-gray-200 shadow-sm hover:shadow-md transition-all hover:translate-y-[-4px]">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Zap className="w-6 h-6 text-yellow-600" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">Tarefas Rápidas</h3>
                  <p className="text-gray-600 text-sm">
                    Microtarefas que levam 1 a 5 minutos. Ganhe R$ 1 a R$ 10 por tarefa.
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Benefícios Section */}
      <section className="py-20 md:py-32 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
                Por Que Escolher Pixee
              </h2>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <CheckCircle2 className="w-6 h-6 text-emerald-600 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-bold text-gray-900 mb-1">100% Gratuito</h4>
                    <p className="text-gray-600">Sem taxas de inscrição ou custos ocultos</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <CheckCircle2 className="w-6 h-6 text-emerald-600 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-bold text-gray-900 mb-1">Pagamentos Rápidos</h4>
                    <p className="text-gray-600">Receba seus ganhos em até 24 horas</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <CheckCircle2 className="w-6 h-6 text-emerald-600 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-bold text-gray-900 mb-1">Flexibilidade Total</h4>
                    <p className="text-gray-600">Trabalhe quando e onde quiser, no seu ritmo</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <CheckCircle2 className="w-6 h-6 text-emerald-600 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-bold text-gray-900 mb-1">Seguro e Confiável</h4>
                    <p className="text-gray-600">Seus dados estão protegidos com criptografia</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <CheckCircle2 className="w-6 h-6 text-emerald-600 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-bold text-gray-900 mb-1">Sem Limite de Ganhos</h4>
                    <p className="text-gray-600">Quanto mais você trabalha, mais você ganha</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative h-96 flex items-center justify-center">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-emerald-100 rounded-3xl blur-3xl opacity-50"></div>
              <div className="relative w-64 h-64 bg-gradient-to-br from-blue-500 to-emerald-500 rounded-3xl shadow-2xl flex items-center justify-center transform hover:scale-105 transition-transform duration-300">
                <TrendingUp className="w-24 h-24 text-white" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Download CTA Section */}
      <section id="download" className="py-20 md:py-32 bg-emerald-600">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Pronto para Começar
          </h2>
          <p className="text-lg text-emerald-50 mb-8 max-w-2xl mx-auto">
            Baixe o Pixee agora e comece a ganhar dinheiro em minutos. Sem investimento, sem riscos.
          </p>
          
          <Button 
            size="lg" 
            className="bg-white text-emerald-600 hover:bg-gray-100 rounded-lg text-base h-12 gap-2 font-semibold"
          >
            Baixar no Android
          </Button>

          <p className="text-emerald-50 mt-8 text-sm">
            Disponível em Android 7.0+
          </p>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 md:py-32 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Perguntas Frequentes
            </h2>
          </div>

          <div className="max-w-3xl mx-auto space-y-6">
            <Card className="p-6 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
              <h3 className="font-bold text-lg text-gray-900 mb-2">Quanto posso ganhar por mês?</h3>
              <p className="text-gray-600 text-sm">
                Depende de quantas tarefas você completa. Usuários ativos ganham entre R$ 500 a R$ 5.000 por mês, dedicando 1 a 3 horas diárias.
              </p>
            </Card>

            <Card className="p-6 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
              <h3 className="font-bold text-lg text-gray-900 mb-2">É realmente gratuito?</h3>
              <p className="text-gray-600 text-sm">
                Sim. Não há taxas de inscrição, mensalidade ou qualquer custo oculto. Você só ganha dinheiro.
              </p>
            </Card>

            <Card className="p-6 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
              <h3 className="font-bold text-lg text-gray-900 mb-2">Como recebo meu dinheiro?</h3>
              <p className="text-gray-600 text-sm">
                Você pode sacar seus ganhos via PIX, transferência bancária ou carteira digital. Processamos os saques em até 24 horas.
              </p>
            </Card>

            <Card className="p-6 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
              <h3 className="font-bold text-lg text-gray-900 mb-2">Preciso de experiência anterior?</h3>
              <p className="text-gray-600 text-sm">
                Não. Qualquer pessoa pode usar o Pixee. As tarefas são simples e não requerem habilidades especiais.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <img 
                  src="/manus-storage/icone_rendaja_bbd8603c.png" 
                  alt="Pixee Logo" 
                  className="w-8 h-8"
                />
                <span className="text-white font-bold">Pixee</span>
              </div>
              <p className="text-sm">Ganhe dinheiro extra de forma simples e rápida.</p>
            </div>
            
            <div>
              <h4 className="text-white font-semibold mb-4">Produto</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white transition">Como Funciona</a></li>
                <li><a href="#" className="hover:text-white transition">Tarefas</a></li>
                <li><a href="#" className="hover:text-white transition">Preços</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4">Empresa</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white transition">Sobre</a></li>
                <li><a href="#" className="hover:text-white transition">Blog</a></li>
                <li><a href="#" className="hover:text-white transition">Contato</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white transition">Privacidade</a></li>
                <li><a href="#" className="hover:text-white transition">Termos</a></li>
                <li><a href="#" className="hover:text-white transition">Segurança</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 text-center text-sm">
            <p>&copy; 2026 Pixee. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
