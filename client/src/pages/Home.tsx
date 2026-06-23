import { Card } from "@/components/ui/card";
import { ArrowRight, CheckCircle2, Zap, Users, TrendingUp, Star, Shield, Award } from "lucide-react";

export default function Home() {
  const reviews = [
    {
      name: "Marina Silva",
      location: "São Paulo, SP",
      rating: 5,
      comment: "Comecei há 3 meses e já ganhei mais de R$ 2.500. As missões são fáceis e o pagamento é rápido!",
      earnings: "R$ 2.540"
    },
    {
      name: "Carlos Mendes",
      location: "Rio de Janeiro, RJ",
      rating: 5,
      comment: "Excelente forma de ganhar uma renda extra. Recomendo para todos que querem complementar a renda.",
      earnings: "R$ 1.890"
    },
    {
      name: "Juliana Costa",
      location: "Belo Horizonte, MG",
      rating: 5,
      comment: "Muito bom! Consigo fazer as missões no meu tempo livre. Já saquei 3 vezes e tudo funcionou perfeitamente.",
      earnings: "R$ 3.120"
    },
    {
      name: "Roberto Oliveira",
      location: "Curitiba, PR",
      rating: 5,
      comment: "Aplicativo muito profissional. Interface limpa e fácil de usar. Ganho em média R$ 200 por semana.",
      earnings: "R$ 2.100"
    },
    {
      name: "Fernanda Souza",
      location: "Brasília, DF",
      rating: 5,
      comment: "Superou minhas expectativas! As tarefas são variadas e bem remuneradas. Muito satisfeita!",
      earnings: "R$ 2.850"
    },
    {
      name: "Lucas Pereira",
      location: "Salvador, BA",
      rating: 5,
      comment: "Uso há 2 meses. Ótimo para ganhar dinheiro extra sem sair de casa. Muito confiável!",
      earnings: "R$ 1.650"
    }
  ];

  const stats = [
    { label: "Usuários Ativos", value: "127.5K", icon: Users },
    { label: "Ganhos em 2026", value: "R$ 12.8M", icon: TrendingUp },
    { label: "Avaliação Média", value: "4.9★", icon: Star },
    { label: "Taxa de Aprovação", value: "98.7%", icon: CheckCircle2 }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header/Navigation */}
      <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img 
              src="https://files.manuscdn.com/user_upload_by_module/session_file/310519663621133054/XCzPMTUpgMBhOytr.png" 
              alt="Pixee Logo" 
              className="w-10 h-10"
            />
            <span className="text-xl font-bold text-gray-900">Pixee</span>
          </div>
          <nav className="hidden md:flex items-center gap-8">
            <a href="#como-funciona" className="text-gray-700 hover:text-emerald-600 transition font-medium">
              Como Funciona
            </a>
            <a href="#avaliacoes" className="text-gray-700 hover:text-emerald-600 transition font-medium">
              Avaliações
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

              <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => window.location.href = 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663788356460/ZSofAOLfZSjRbCTm.apk'}
                className="inline-flex items-center justify-center gap-2 bg-emerald-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-emerald-700 transition-colors"
              >
                Começar Agora
                <ArrowRight className="w-5 h-5" />
              </button>
                <a
                  href="#como-funciona"
                  className="inline-flex items-center justify-center gap-2 bg-gray-100 text-gray-900 px-8 py-4 rounded-lg font-semibold hover:bg-gray-200 transition-colors"
                >
                  Saiba Como Funciona
                </a>
              </div>

              <div className="flex items-center gap-6 pt-4">
                <div>
                  <p className="text-2xl font-bold text-gray-900">127.5K+</p>
                  <p className="text-sm text-gray-600">Usuários Ativos</p>
                </div>
                <div className="w-px h-12 bg-gray-300"></div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">4.9★</p>
                  <p className="text-sm text-gray-600">Avaliação Média</p>
                </div>
              </div>
            </div>

            {/* Right - Visual */}
            <div className="hidden md:flex justify-center">
              <div className="relative w-full max-w-sm">
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-emerald-600 rounded-3xl blur-2xl opacity-20"></div>
                <div className="relative bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-3xl p-8 border border-emerald-200">
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-semibold text-emerald-700">Saldo Disponível</span>
                      <Shield className="w-5 h-5 text-emerald-600" />
                    </div>
                    <div className="text-4xl font-bold text-emerald-900">R$ 2.540</div>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-700">Ganho esta semana</span>
                        <span className="font-semibold text-emerald-600">+R$ 450</span>
                      </div>
                      <div className="h-2 bg-emerald-200 rounded-full overflow-hidden">
                        <div className="h-full w-3/4 bg-emerald-600 rounded-full"></div>
                      </div>
                    </div>
                    <button className="w-full bg-emerald-600 text-white py-3 rounded-lg font-semibold hover:bg-emerald-700 transition-colors">
                      Sacar Agora
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, idx) => {
              const Icon = stat.icon;
              return (
                <div key={idx} className="text-center">
                  <div className="flex justify-center mb-4">
                    <Icon className="w-8 h-8 text-emerald-600" />
                  </div>
                  <p className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">{stat.value}</p>
                  <p className="text-gray-600 font-medium">{stat.label}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Como Funciona Section */}
      <section id="como-funciona" className="py-20 md:py-32 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 text-center mb-16">
            Como Funciona
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="space-y-4">
              <div className="w-12 h-12 bg-emerald-600 text-white rounded-full flex items-center justify-center font-bold text-lg">
                1
              </div>
              <h3 className="text-xl font-bold text-gray-900">Cadastre-se</h3>
              <p className="text-gray-600">
                Preencha seus dados básicos em menos de 2 minutos. Sem verificações complicadas.
              </p>
            </div>

            <div className="space-y-4">
              <div className="w-12 h-12 bg-emerald-600 text-white rounded-full flex items-center justify-center font-bold text-lg">
                2
              </div>
              <h3 className="text-xl font-bold text-gray-900">Escolha Missões</h3>
              <p className="text-gray-600">
                Selecione tarefas que se adequam ao seu tempo. De 5 minutos a 30 minutos cada.
              </p>
            </div>

            <div className="space-y-4">
              <div className="w-12 h-12 bg-emerald-600 text-white rounded-full flex items-center justify-center font-bold text-lg">
                3
              </div>
              <h3 className="text-xl font-bold text-gray-900">Ganhe e Saque</h3>
              <p className="text-gray-600">
                Receba seus ganhos via PIX em até 24 horas. Sem taxas, sem complicações.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Avaliações Section */}
      <section id="avaliacoes" className="py-20 md:py-32 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 text-center mb-4">
            O Que Nossos Usuários Dizem
          </h2>
          <p className="text-center text-gray-600 text-lg mb-16 max-w-2xl mx-auto">
            Mais de 127 mil pessoas já estão ganhando dinheiro extra com o Pixee. Veja o que eles têm a dizer.
          </p>

          <div className="grid md:grid-cols-3 gap-6">
            {reviews.map((review, idx) => (
              <Card key={idx} className="p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-full flex items-center justify-center text-white font-bold">
                      {review.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">{review.name}</p>
                      <p className="text-sm text-gray-500">{review.location}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-emerald-600">{review.earnings}</p>
                  </div>
                </div>

                <div className="flex gap-1 mb-4">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>

                <p className="text-gray-700 leading-relaxed">
                  "{review.comment}"
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Tarefas Section */}
      <section id="tarefas" className="py-20 md:py-32 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 text-center mb-16">
            Tipos de Tarefas
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4 p-6 bg-gray-50 rounded-xl border border-gray-200">
              <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-lg flex items-center justify-center">
                <Zap className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-gray-900">Pesquisas Rápidas</h3>
              <p className="text-gray-600">Responda pesquisas de opinião e ganhe de R$ 5 a R$ 50 por pesquisa.</p>
              <p className="text-sm text-emerald-600 font-semibold">Tempo: 2-5 minutos</p>
            </div>

            <div className="space-y-4 p-6 bg-gray-50 rounded-xl border border-gray-200">
              <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-lg flex items-center justify-center">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-gray-900">Validação de Dados</h3>
              <p className="text-gray-600">Verifique informações e categorize conteúdo. Ganhe R$ 15 a R$ 80.</p>
              <p className="text-sm text-emerald-600 font-semibold">Tempo: 5-10 minutos</p>
            </div>

            <div className="space-y-4 p-6 bg-gray-50 rounded-xl border border-gray-200">
              <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-lg flex items-center justify-center">
                <Award className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-gray-900">Análise de Conteúdo</h3>
              <p className="text-gray-600">Avalie qualidade de imagens e textos. Ganhe R$ 30 a R$ 150.</p>
              <p className="text-sm text-emerald-600 font-semibold">Tempo: 10-20 minutos</p>
            </div>

            <div className="space-y-4 p-6 bg-gray-50 rounded-xl border border-gray-200">
              <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-gray-900">Testes de Aplicativos</h3>
              <p className="text-gray-600">Teste novos apps e reporte problemas. Ganhe R$ 20 a R$ 120.</p>
              <p className="text-sm text-emerald-600 font-semibold">Tempo: 5-15 minutos</p>
            </div>
          </div>
        </div>
      </section>

      {/* Segurança Section */}
      <section className="py-20 md:py-32 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 text-center mb-16">
            Segurança e Confiabilidade
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">100% Seguro</h3>
              <p className="text-gray-600">Seus dados são criptografados e protegidos com os mais altos padrões de segurança.</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Certificado</h3>
              <p className="text-gray-600">Somos uma empresa registrada e certificada. Você pode confiar em nós.</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Pagamentos Garantidos</h3>
              <p className="text-gray-600">Seus ganhos são pagos 100% via PIX em até 24 horas. Sem exceções.</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 md:py-32 bg-white">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 text-center mb-16">
            Perguntas Frequentes
          </h2>

          <div className="space-y-6">
            {[
              {
                q: "Quanto posso ganhar por mês?",
                a: "Isso depende de quanto tempo você dedica. Usuários que fazem 1-2 horas por dia ganham em média R$ 800-1.500 por mês. Alguns ganham mais de R$ 3.000."
              },
              {
                q: "Preciso investir algo para começar?",
                a: "Não! O Pixee é 100% gratuito. Não há taxas, não há investimento inicial. Você só paga quando ganha."
              },
              {
                q: "Como recebo meu dinheiro?",
                a: "Você recebe via PIX diretamente na sua conta bancária. O saque é processado em até 24 horas."
              },
              {
                q: "Preciso ter experiência anterior?",
                a: "Não! Qualquer pessoa pode usar o Pixee. As tarefas são simples e não requerem habilidades especiais."
              },
              {
                q: "É seguro compartilhar meus dados?",
                a: "Sim! Usamos criptografia de nível bancário. Seus dados nunca são compartilhados com terceiros."
              },
              {
                q: "Posso usar em qualquer dispositivo?",
                a: "Sim! O Pixee funciona em Android e também em navegadores web. Você pode acessar de qualquer lugar."
              }
            ].map((faq, idx) => (
              <div key={idx} className="border-b border-gray-200 pb-6">
                <h3 className="text-lg font-bold text-gray-900 mb-2">{faq.q}</h3>
                <p className="text-gray-600 leading-relaxed">{faq.a}</p>
              </div>
            ))}
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
          
          <button 
            onClick={() => window.location.href = 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663788356460/ZSofAOLfZSjRbCTm.apk'}
            className="inline-flex items-center justify-center bg-white text-emerald-600 hover:bg-gray-100 rounded-lg text-base h-12 px-6 font-semibold transition-colors"
          >
            Baixar no Android
          </button>

          <p className="text-emerald-50 mt-8 text-sm">
            Disponível em Android 7.0+
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h4 className="text-white font-bold mb-4">Pixee</h4>
              <p className="text-sm">Ganhe dinheiro extra fazendo tarefas simples.</p>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4">Produto</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white transition">Como Funciona</a></li>
                <li><a href="#" className="hover:text-white transition">Tarefas</a></li>
                <li><a href="#" className="hover:text-white transition">Segurança</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4">Empresa</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white transition">Sobre</a></li>
                <li><a href="#" className="hover:text-white transition">Contato</a></li>
                <li><a href="#" className="hover:text-white transition">Blog</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white transition">Termos</a></li>
                <li><a href="#" className="hover:text-white transition">Privacidade</a></li>
                <li><a href="#" className="hover:text-white transition">Cookies</a></li>
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
