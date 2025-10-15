// --- BASE DE CONHECIMENTO (Use esta que está fora da função) ---
const respostasParaPerfil = {
    "O medo de dar errado antes mesmo de começar": "Iniciante",
    "Ainda é tudo na base do improviso e da intuição": "Iniciante",
    "Vou apagando incêndios na hora": "Iniciante",
    "Ainda estou tentando conquistar os primeiros": "Iniciante",
    "Entender como o negócio pode dar certo": "Iniciante",
    "A confusão de ter muita demanda e pouca organização": "Em Crescimento",
    "Já tenho algum controle, mas ainda me enrolo com fluxo de caixa": "Em Crescimento",
    "Corro atrás de processos para organizar, mas sinto que não dou conta": "Em Crescimento",
    "Tenho clientes, mas ainda dependo de indicação ou redes sociais básicas": "Em Crescimento",
    "Organizar processos e equipes para crescer sem perder o controle": "Em Crescimento",
    "A estagnação de fazer mais do mesmo sem enxergar futuro": "Consolidado",
    "Tenho planilhas, relatórios e até consultorias": "Consolidado",
    "Tenho equipe, plano e estratégia para lidar com crises": "Consolidado",
    "Já tenho base sólida de clientes e canais de relacionamento estruturados": "Consolidado",
    "Evitar ficar na zona de conforto e manter o ritmo": "Consolidado",
    "A ilusão de ter mil ideias mas sem saber como colocar em prática": "Visionário",
    "Uso finanças como ferramenta estratégica para apostar em projetos": "Visionário",
    "Já penso em como transformar o problema em uma oportunidade de inovação": "Visionário",
    "Busco expandir para outros mercados e criar experiências únicas": "Visionário",
    "Transformar ideias ousadas em realidade sem se perder no caminho": "Visionário"
};

const diagnosticos = {
    "Iniciante": { letra: "A", titulo: "Iniciante: O Fantasma do Medo" },
    "Em Crescimento": { letra: "B", titulo: "Em Crescimento: O Fantasma da Confusão" },
    "Consolidado": { letra: "C", titulo: "Consolidado – O Fantasma da Estagnação" },
    "Visionário": { letra: "D", titulo: "Visionário – O Fantasma da Ilusão" }
};

// A função onRequestPost lida apenas com requisições do tipo POST
export const onRequestPost = async ({ request }) => {
    const { respostas } = await request.json();

    if (!respostas || !Array.isArray(respostas) || respostas.length === 0) {
        return new Response(
            JSON.stringify({
                error: 'O campo "respostas" é obrigatório e deve ser um array de strings.',
            }),
            { status: 400, headers: { "Content-Type": "application/json" } }
        );
    }

    const contagem = { "Iniciante": 0, "Em Crescimento": 0, "Consolidado": 0, "Visionário": 0 };

    for (const resposta of respostas) {
        const perfil = respostasParaPerfil[resposta];
        if (perfil) contagem[perfil]++;
    }

    const totalDeRespostasValidas = Object.values(contagem).reduce((acc, val) => acc + val, 0);

    if (totalDeRespostasValidas === 0) {
        return new Response(
            JSON.stringify({
                error: 'Nenhuma resposta válida foi encontrada na requisição.',
            }),
            { status: 400, headers: { "Content-Type": "application/json" } }
        );
    }

    let perfilFinal = "Iniciante";
    let maxContagem = 0;
    for (const perfil in contagem) {
        if (contagem[perfil] > maxContagem) {
            maxContagem = contagem[perfil];
            perfilFinal = perfil;
        }
    }

    const diagnosticoFinal = diagnosticos[perfilFinal];

    return new Response(
        JSON.stringify({
            diagnosticoFinal: diagnosticoFinal.letra,
            perfil: diagnosticoFinal.titulo,
            detalhesContagem: contagem,
        }),
        { headers: { "Content-Type": "application/json" } }
    );
};