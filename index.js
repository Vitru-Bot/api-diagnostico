const express = require('express');
const app = express();
const PORT = 3000;

// Middleware para permitir que o Express leia JSON do corpo da requisição
app.use(express.json());

// --- BASE DE CONHECIMENTO (Extraída do seu documento) ---
// Mapeia cada resposta possível para o seu perfil correspondente.
const respostasParaPerfil = {
    // Iniciante
    "O medo de dar errado antes mesmo de começar": "Iniciante",
    "Ainda é tudo na base do improviso e da intuição": "Iniciante",
    "Vou apagando incêndios na hora": "Iniciante",
    "Ainda estou tentando conquistar os primeiros": "Iniciante",
    "Entender como o negócio pode dar certo": "Iniciante",

    // Em Crescimento
    "A confusão de ter muita demanda e pouca organização": "Em Crescimento",
    "Já tenho algum controle, mas ainda me enrolo com fluxo de caixa": "Em Crescimento",
    "Corro atrás de processos para organizar, mas sinto que não dou conta": "Em Crescimento",
    "Tenho clientes, mas ainda dependo de indicação ou redes sociais básicas": "Em Crescimento",
    "Organizar processos e equipes para crescer sem perder o controle": "Em Crescimento",

    // Consolidado
    "A estagnação de fazer mais do mesmo sem enxergar futuro": "Consolidado",
    "Tenho planilhas, relatórios e até consultorias": "Consolidado",
    "Tenho equipe, plano e estratégia para lidar com crises": "Consolidado",
    "Já tenho base sólida de clientes e canais de relacionamento estruturados": "Consolidado",
    "Evitar ficar na zona de conforto e manter o ritmo": "Consolidado",

    // Visionário
    "A ilusão de ter mil ideias mas sem saber como colocar em prática": "Visionário",
    "Uso finanças como ferramenta estratégica para apostar em projetos": "Visionário",
    "Já penso em como transformar o problema em uma oportunidade de inovação": "Visionário",
    "Busco expandir para outros mercados e criar experiências únicas": "Visionário",
    "Transformar ideias ousadas em realidade sem se perder no caminho": "Visionário"
};

// Mapeia cada perfil para sua letra e diagnóstico correspondente
const diagnosticos = {
    "Iniciante": { letra: "A", titulo: "Iniciante: O Fantasma do Medo" },
    "Em Crescimento": { letra: "B", titulo: "Em Crescimento: O Fantasma da Confusão" },
    "Consolidado": { letra: "C", titulo: "Consolidado – O Fantasma da Estagnação" },
    "Visionário": { letra: "D", titulo: "Visionário – O Fantasma da Ilusão" }
};
// --- FIM DA BASE DE CONHECIMENTO ---

/**
 * Endpoint para receber as respostas e retornar o diagnóstico.
 * Método: POST
 * URL: /diagnostico
 * Corpo da Requisição (JSON):
 * {
 * "respostas": [
 * "String com a resposta da primeira pergunta",
 * "String com a resposta da segunda pergunta",
 * ...
 * ]
 * }
 */
app.post('/diagnostico', (req, res) => {
    // Pega o array de respostas do corpo da requisição
    const { respostas } = req.body;

    // Validação básica
    if (!respostas || !Array.isArray(respostas) || respostas.length === 0) {
        return res.status(400).json({ error: 'O campo "respostas" é obrigatório e deve ser um array de strings.' });
    }

    // Objeto para contar a frequência de cada perfil
    const contagem = {
        "Iniciante": 0,
        "Em Crescimento": 0,
        "Consolidado": 0,
        "Visionário": 0
    };

    // Itera sobre as respostas enviadas pelo usuário
    for (const resposta of respostas) {
        const perfil = respostasParaPerfil[resposta];
        if (perfil) {
            contagem[perfil]++;
        }
    }

    // Encontra o perfil com a maior contagem
    let perfilFinal = "Iniciante"; // Perfil padrão
    let maxContagem = 0;
    for (const perfil in contagem) {
        if (contagem[perfil] > maxContagem) {
            maxContagem = contagem[perfil];
            perfilFinal = perfil;
        }
    }

    // Pega o diagnóstico correspondente (letra e título)
    const diagnosticoFinal = diagnosticos[perfilFinal];

    // Retorna a resposta final no formato JSON
    res.status(200).json({
        diagnosticoFinal: diagnosticoFinal.letra,
        perfil: diagnosticoFinal.titulo,
        detalhesContagem: contagem // Opcional: para ver a contagem de cada perfil
    });
});

// Inicia o servidor na porta definida
app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
});