"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AIController = void 0;
const openai_1 = __importDefault(require("openai"));
const client_1 = require("../prisma/client");
class AIController {
    static async recommendSchools(req, res) {
        try {
            const { prompt } = req.body;
            if (!prompt) {
                return res.status(400).json({
                    success: false,
                    message: 'O campo prompt é obrigatório'
                });
            }
            const apiKey = process.env.OPENAI_API_KEY;
            if (!apiKey) {
                return res.status(500).json({
                    success: false,
                    message: 'A chave da API da OpenAI (OPENAI_API_KEY) não está configurada no servidor. Por favor, adicione-a ao ficheiro .env.'
                });
            }
            // 1. Obter todas as escolas do banco
            const schools = await client_1.prisma.school.findMany({
                orderBy: {
                    rating: 'desc'
                }
            });
            if (schools.length === 0) {
                return res.json({
                    success: true,
                    data: {
                        justification: 'Atualmente não existem escolas registadas no sistema para podermos recomendar. Por favor, adicione algumas escolas primeiro.',
                        schools: []
                    }
                });
            }
            // Simplificar lista de escolas para economizar tokens
            const schoolsContext = schools.map(s => ({
                id: s.id,
                name: s.name,
                tagline: s.tagline || '',
                description: s.description,
                type: s.type,
                province: s.province,
                address: s.address,
                rating: s.rating,
                verified: s.verified
            }));
            // 2. Inicializar cliente OpenAI
            const openai = new openai_1.default({ apiKey });
            const systemPrompt = `Você é um assistente de recomendação escolar altamente inteligente para a plataforma Escola Connect em Angola.
Com base nas seguintes escolas registadas no nosso sistema:

${JSON.stringify(schoolsContext, null, 2)}

Recomende as melhores opções para atender à pesquisa do utilizador.
Você deve responder ESTRITAMENTE com um objeto JSON válido que respeite o seguinte formato:
{
  "justification": "Um texto explicativo e amigável em português de Angola, formatado em Markdown, justificando as escolhas sugeridas com base no pedido do utilizador. Use marcadores (bullets) e enfatize pontos fortes.",
  "recommendedSchoolIds": ["lista-de-ids-das-escolas-sugeridas-que-estao-no-contexto"]
}

Se nenhuma escola corresponder minimamente aos critérios do utilizador, explique isso detalhadamente em "justification" de forma prestativa e retorne a lista "recommendedSchoolIds" vazia. Não crie ou invente IDs que não existem na lista fornecida.`;
            // 3. Chamar a API da OpenAI
            const response = await openai.chat.completions.create({
                model: 'gpt-4o-mini',
                response_format: { type: 'json_object' },
                messages: [
                    { role: 'system', content: systemPrompt },
                    { role: 'user', content: `Utilizador procura: "${prompt}"` }
                ],
                temperature: 0.7
            });
            const rawContent = response.choices[0]?.message?.content;
            if (!rawContent) {
                return res.status(500).json({
                    success: false,
                    message: 'Não foi possível obter resposta da Inteligência Artificial'
                });
            }
            const parsedResponse = JSON.parse(rawContent);
            const justification = parsedResponse.justification || '';
            const recommendedSchoolIds = parsedResponse.recommendedSchoolIds || [];
            // 4. Buscar as escolas sugeridas na base de dados para garantir informações completas
            const recommendedSchools = schools.filter(s => recommendedSchoolIds.includes(s.id));
            return res.json({
                success: true,
                data: {
                    justification,
                    schools: recommendedSchools
                }
            });
        }
        catch (error) {
            console.error('Erro ao recomendar escolas com IA:', error);
            return res.status(500).json({
                success: false,
                message: 'Erro interno ao processar a recomendação por IA'
            });
        }
    }
}
exports.AIController = AIController;
//# sourceMappingURL=ai.controller.js.map