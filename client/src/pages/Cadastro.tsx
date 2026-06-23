import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AlertCircle, CheckCircle2, Loader2 } from "lucide-react";
import { useLocation } from "wouter";

export default function Cadastro() {
  const [location] = useLocation();
  const [, setLocation] = useLocation();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [referrer, setReferrer] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    telefone: "",
    cpf: "",
    tipoPix: "",
  });

  useEffect(() => {
    // Extrair referenciador da URL
    const match = location.match(/^\/(ref|cadastro)\/?(.*)$/);
    if (match && match[2]) {
      const referrerId = match[2];
      setReferrer(referrerId);
      localStorage.setItem('referrer', referrerId);
    } else {
      // Tentar obter do localStorage se já foi salvo
      const savedReferrer = localStorage.getItem('referrer');
      if (savedReferrer) {
        setReferrer(savedReferrer);
      }
    }
  }, [location]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePixChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      tipoPix: value,
    }));
  };

  const formatTelefone = (value: string) => {
    const numbers = value.replace(/\D/g, "");
    if (numbers.length <= 2) return numbers;
    if (numbers.length <= 7) return `(${numbers.slice(0, 2)}) ${numbers.slice(2)}`;
    return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 7)}-${numbers.slice(7, 11)}`;
  };

  const formatCPF = (value: string) => {
    const numbers = value.replace(/\D/g, "");
    if (numbers.length <= 3) return numbers;
    if (numbers.length <= 6) return `${numbers.slice(0, 3)}.${numbers.slice(3)}`;
    if (numbers.length <= 9) return `${numbers.slice(0, 3)}.${numbers.slice(3, 6)}.${numbers.slice(6)}`;
    return `${numbers.slice(0, 3)}.${numbers.slice(3, 6)}.${numbers.slice(6, 9)}-${numbers.slice(9, 11)}`;
  };

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const validateCPF = (cpf: string) => {
    const numbers = cpf.replace(/\D/g, "");
    return numbers.length === 11;
  };

  const validateTelefone = (telefone: string) => {
    const numbers = telefone.replace(/\D/g, "");
    return numbers.length === 11;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Validações
    if (!formData.nome.trim()) {
      setError("Nome é obrigatório");
      return;
    }
    if (!validateEmail(formData.email)) {
      setError("Email inválido");
      return;
    }
    if (!validateTelefone(formData.telefone)) {
      setError("Telefone deve ter 11 dígitos");
      return;
    }
    if (!validateCPF(formData.cpf)) {
      setError("CPF deve ter 11 dígitos");
      return;
    }
    if (!formData.tipoPix) {
      setError("Selecione um tipo de chave PIX");
      return;
    }

    setLoading(true);

    try {
      // Enviar para a Netlify Function
      const response = await fetch("/.netlify/functions/enviar-formulario", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nome: formData.nome,
          email: formData.email,
          telefone: formData.telefone,
          cpf: formData.cpf,
          tipoPix: formData.tipoPix,
        }),
      });

      if (!response.ok) {
        throw new Error("Erro ao enviar formulário");
      }

      setSuccess(true);
      
      // Incrementar contador de referências se houver referenciador
      if (referrer) {
        const key = `referralCount_${referrer}`;
        const current = parseInt(localStorage.getItem(key) || '0');
        localStorage.setItem(key, (current + 1).toString());
      }
      
      setTimeout(() => {
        setLocation("/missoes");
      }, 1500);
    } catch (err) {
      setError("Erro ao enviar dados. Tente novamente.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-white flex items-center justify-center p-4">
        <Card className="w-full max-w-md p-8 text-center border-0 shadow-lg">
          <div className="mb-6 flex justify-center">
            <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center">
              <CheckCircle2 className="w-8 h-8 text-emerald-600" />
            </div>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Cadastro Realizado!</h2>
          <p className="text-gray-600 mb-6">Bem-vindo ao Pixee. Agora vamos às missões!</p>
          <div className="animate-spin inline-block">
            <Loader2 className="w-5 h-5 text-emerald-600" />
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-white py-12 px-4">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <img 
              src="https://files.manuscdn.com/user_upload_by_module/session_file/310519663621133054/XCzPMTUpgMBhOytr.png" 
              alt="Pixee Logo" 
              className="w-10 h-10"
            />
            <span className="text-2xl font-bold text-gray-900">Pixee</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Cadastro</h1>
          <p className="text-gray-600">Preencha seus dados para começar a ganhar</p>
          {referrer && (
            <p className="text-xs text-emerald-600 mt-2">Você foi indicado por um amigo!</p>
          )}
        </div>

        {/* Form Card */}
        <Card className="p-6 border border-gray-200 shadow-md">
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Error Message */}
            {error && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-red-700">{error}</p>
              </div>
            )}

            {/* Nome */}
            <div>
              <Label htmlFor="nome" className="block text-sm font-semibold text-gray-900 mb-2">
                Nome Completo
              </Label>
              <Input
                id="nome"
                name="nome"
                type="text"
                placeholder="João Silva"
                value={formData.nome}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-600"
              />
            </div>

            {/* Email */}
            <div>
              <Label htmlFor="email" className="block text-sm font-semibold text-gray-900 mb-2">
                Email
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="seu@email.com"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-600"
              />
            </div>

            {/* Telefone */}
            <div>
              <Label htmlFor="telefone" className="block text-sm font-semibold text-gray-900 mb-2">
                Número de Telefone
              </Label>
              <Input
                id="telefone"
                name="telefone"
                type="tel"
                placeholder="(11) 98765-4321"
                value={formatTelefone(formData.telefone)}
                onChange={(e) => {
                  const numbers = e.target.value.replace(/\D/g, "");
                  setFormData((prev) => ({
                    ...prev,
                    telefone: numbers,
                  }));
                }}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-600"
              />
            </div>

            {/* CPF */}
            <div>
              <Label htmlFor="cpf" className="block text-sm font-semibold text-gray-900 mb-2">
                CPF do Destinatário da Conta PIX
              </Label>
              <p className="text-xs text-gray-500 mb-2">
                Este é o CPF da pessoa que receberá o dinheiro. Seus dados estão seguros.
              </p>
              <Input
                id="cpf"
                name="cpf"
                type="text"
                placeholder="000.000.000-00"
                value={formatCPF(formData.cpf)}
                onChange={(e) => {
                  const numbers = e.target.value.replace(/\D/g, "");
                  setFormData((prev) => ({
                    ...prev,
                    cpf: numbers,
                  }));
                }}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-600"
              />
            </div>

            {/* Tipo de PIX */}
            <div>
              <Label htmlFor="tipoPix" className="block text-sm font-semibold text-gray-900 mb-2">
                Tipo de Chave PIX
              </Label>
              <Select value={formData.tipoPix} onValueChange={handlePixChange}>
                <SelectTrigger className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-600">
                  <SelectValue placeholder="Selecione uma opção" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="email">Email</SelectItem>
                  <SelectItem value="celular">Celular</SelectItem>
                  <SelectItem value="cpf">CPF</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 rounded-lg transition-all disabled:opacity-50"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Enviando...
                </>
              ) : (
                "Começar a Ganhar"
              )}
            </Button>

            {/* Info */}
            <p className="text-xs text-gray-500 text-center">
              Seus dados são seguros e criptografados.
            </p>
          </form>
        </Card>
      </div>
    </div>
  );
}
