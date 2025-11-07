// /JS/database.js (VERSÃO CORRIGIDA)
// Caminhos das imagens (IMG/) estão corretos

const allPets = [
    {
        id: 1,
        nome: "Tell",
        codigo: "305640",
        tipo: "cachorro",
        sexo: "Macho",
        porte: "Pequeno",
        idade: "Filhote",
        idadeTexto: "7 a 11 meses",
        raca: "SRD-ViraLata",
        localizacao: "Araçatuba - SP",
        img: "/img/animais/TellDog.webp", // <-- CORRIGIDO
        gallery: [
            "/img/animais/TellDog.webp", // <-- CORRIGIDO
            "/img/animais/TellDog2.webp"
        ],
        descricaoCurta: "Olá Bom dia estou doando esse cachorrinho macho teell ele e dócil amigo carinhoso...", // Para o card
        historia: "Olá Bom dia estou doando esse cachorrinho macho teell ele e dócil amigo carinhoso estamos doando porque trabalhamos saímos cedo e voltamos tarde da noite ele fica muito tempo sozinho quem se interessar chama no privado Obs:tem que gosta de animais eles gostam de carinho e amor.",
        cuidados: ["Vacinado", "Vermifugado"],
        temperamento: ["Brincalhão", "Dócil"],
        viveBemCom: ["Casa com quintal", "Apartamento"],
        sociavelCom: ["Crianças", "Cachorros"],
        doador: {
            nome: "Usuário do Site",
            email: "contato@petlar.com",
            telefone: "(18) 99999-9999"
        }
    },
    {
        id: 2,
        nome: "Nina",
        codigo: "305641",
        tipo: "cachorro",
        sexo: "Fêmea",
        porte: "Grande",
        idade: "Adulto",
        idadeTexto: "2 Anos",
        raca: "SRD-ViraLata",
        localizacao: "Araçatuba - SP",
        img: "/img/animais/NinaDog.webp", // <-- CORRIGIDO
        gallery: [
            "/img/animais/NinaDog.webp", // <-- CORRIGIDO
        ],
        descricaoCurta: "Adote a Nina, uma adorável cadela negra de 2 anos, e transforme sua vida! Ela está esperando por você...",
        historia: "Adote a Nina, uma adorável cadela negra de 2 anos, e transforme sua vida! Ela está esperando por você em Araçatuba. Venha conhecer! ????",
        cuidados: ["Vacinado", "Vermifugado", "Castrado"],
        temperamento: ["Brincalhão", "Dócil"],
        viveBemCom: ["Casa com quintal"],
        sociavelCom: ["Cachorros", "Crianças", "Desconhecidos", "Idosos"],
        doador: {
            nome: "Larissa Grecco",
            email: "greccoemessias@gmail.com",
            telefone: "(18) 98128-1413"
        }
    },
    {
        id: 3,
        nome: "Filhotes para doação",
        codigo: "305642",
        tipo: "cachorro",
        sexo: "Macho",
        porte: "Médio",
        idade: "Filhote",
        idadeTexto: "2 a 6 meses",
        raca: "SRD-ViraLata",
        localizacao: "Araçatuba - SP",
        img: "/img/animais/SemNome.webp", // <-- CORRIGIDO
        gallery: ["/img/animais/SemNome.webp"], // <-- CORRIGIDO
        descricaoCurta: "Estou doando 4 filhotes 5 meses todos tratado na raçao bem cuidados nao estou conseguindo porq sao 5...",
        historia: "Estou doando 4 filhotes 5 meses todos tratado na raçao bem cuidados nao estou conseguindo porq sao 5 predendo doar algums ta a disposição ve visitas sao todos lindos",
        cuidados: ["Vermifugado"],
        temperamento: [],
        viveBemCom: ["Casa com quintal"],
        sociavelCom: ["Cachorros", "Crianças"],
        doador: {
            nome: "Usuário do Site",
            email: "contato@petlar.com",
            telefone: "(18) 99999-9999"
        }
    },
    
{
        id: 4,
        nome: "Caramelo",
        codigo: "305643",
        tipo: "cachorro",
        sexo: "Macho",
        porte: "Médio",
        idade: "Filhote",
        idadeTexto: "7 a 11 meses",
        raca: "SRD-ViraLata",
        localizacao: "Araçatuba - SP",
        img: "/img/animais/caramelo1.webp", // <-- CORRIGIDO
        gallery: ["/img/animais/caramelo1.webp"], // <-- CORRIGIDO
        descricaoCurta: "encontrei na rua com risco de atropelamento.",
        historia: "Encontrei na rua com risco de atropelamento.",
        cuidados: ["Vermifugado"],
        temperamento: ["Dócil"],
        viveBemCom: ["Casa com quintal"],
        sociavelCom: ["Desconhecidos"],
        doador: {
            nome: "flavio rogerio favari",
            email: "contato@petlar.com",
            telefone: "(18) 99999-9999"
        }
    },
{
        id: 5,
        nome: "Gata sem nome",
        codigo: "305644",
        tipo: "gato",
        sexo: "Fêmea",
        porte: "Pequena",
        idade: "filhote",
        idadeTexto: "2 a 6 meses",
        raca: "SRD-ViraLata",
        localizacao: "Araçatuba - SP",
        img: "/img/animais/gatapretasemnome.webp", // <-- CORRIGIDO
        gallery: ["/img/animais/gatapretasemnome.webp"], // <-- CORRIGIDO
        descricaoCurta: "Essa gatinha foi abandonada e com aperto no coração preciso doar urgentemente pois moro com minha mãe e ela é mt alérgica. A gatinha me surpreendeu de tão carinhosa e quietinha, ama receber carinho coisa mais fofa e dengosa, e já está castrada :) procuro um bom lar para ela, ela merece pfv ajudem",
        historia: "Essa gatinha foi abandonada e com aperto no coração preciso doar urgentemente pois moro com minha mãe e ela é mt alérgica. A gatinha me surpreendeu de tão carinhosa e quietinha, ama receber carinho coisa mais fofa e dengosa, e já está castrada :) procuro um bom lar para ela, ela merece pfv ajudem",
        cuidados: [],
        temperamento: [],
        viveBemCom: [],
        sociavelCom: [],
        doador: {
            nome: "Maria Eduarda Dias martins",
            email: "mari.eduarda2903az@gmail.com",
            telefone: "(18) 98114-8833"
        }
    },
{
        id: 6,
        nome: "Jake",
        codigo: "305645",
        tipo: "cachorro",
        sexo: "Macho",
        porte: "medio",
        idade: "Filhote",
        idadeTexto: "7 a 11 meses",
        raca: "SRD-ViraLata",
        localizacao: "Araçatuba - SP",
        img: "/img/animais/cachorrojake1.webp", // <-- CORRIGIDO
        gallery: ["/img/animais/cachorrojake1.webp"], // <-- CORRIGIDO
        descricaoCurta: "dócil, brincalhão, adotamos porém o espaço ficou pequeno, não temos quintal e ele precisa de espaço.",
        historia: "dócil, brincalhão, adotamos porém o espaço ficou pequeno, não temos quintal e ele precisa de espaço.",
        cuidados: ["Vermifugado", "Vacinado"],
        temperamento: ["Brincalhão"],
        viveBemCom: ["Casa com quintal"],
        sociavelCom: ["Cachorros", "Crianças", "Desconhecidos", "Idosos"],
        doador: {
            nome: "Larissa Grecco",
            email: "greccoemessias@gmail.com",
            telefone: "(18) 98128-1413"
        }
    },
{
        id: 7,
        nome: "Lucky",
        codigo: "305646",
        tipo: "cachorro",
        sexo: "Macho",
        porte: "Grande",
        idade: "Filhote",
        idadeTexto: "7 a 11 meses",
        raca: "SRD-ViraLata",
        localizacao: "Araçatuba - SP",
        img: "/img/animais/cachorrolucky1.webp", // <-- CORRIGIDO
        gallery: ["/img/animais/cachorrolucky1.webp", "/img/animais/cachorrolucky2.webp", "/img/animais/cachorrolucky3.webp"], // <-- CORRIGIDO
        descricaoCurta: "Manso mas fica atento com estranhos é bem tranquilo, gosta de carinho e de brincar, sabe sentar e dar a pata.",
        historia: "Manso mas fica atento com estranhos é bem tranquilo, gosta de carinho e de brincar, sabe sentar e dar a pata.",
        cuidados: [],
        temperamento: [],
        viveBemCom: [],
        sociavelCom: [],
        doador: {
            nome: "Felipe Santos",
            email: "felipectbg@gmail.com",
            telefone: "(18) 99159-7801"
        }
    },
{
        id: 8,
        nome: "Milú",
        codigo: "305647",
        tipo: "Cachorro",
        sexo: "Macho",
        porte: "Pequeno",
        idade: "Filhote",
        idadeTexto: "2 a 6 meses",
        raca: "SRD-ViraLata",
        localizacao: "Araçatuba - SP",
        img: "/img/animais/miludog1.webp", // <-- CORRIGIDO
        gallery: ["/img/animais/miludog1.webp", "/img/animais/miludog2.webp"], // <-- CORRIGIDO
        descricaoCurta: "Cachorro porte médio, super dócil e bem comportado, está em casa há alguns dias, mas infelizmente não posso ficar com ele. Precisa de um novo lar urgente.",
        historia: "Cachorro porte médio, super dócil e bem comportado, está em casa há alguns dias, mas infelizmente não posso ficar com ele. Precisa de um novo lar urgente.",
        cuidados: [],
        temperamento: [],
        viveBemCom: [],
        sociavelCom: [],
        doador: {
            nome: "Lucas Bartolomei Vieira",
            email: "lucasbahvi@gmail.com",
            telefone: "(18) 9817-0377"
        }
    },
{
        id: 9,
        nome: "Theo",
        codigo: "305648",
        tipo: "gato",
        sexo: "Macho",
        porte: "Pequeno",
        idade: "filhote",
        idadeTexto: "2 a 6 meses",
        raca: "SRD-ViraLata",
        localizacao: "Araçatuba - SP",
        img: "/img/animais/gatotheo.webp", // <-- CORRIGIDO
        gallery: ["/img/animais/gatotheo.webp"], // <-- CORRIGIDO
        descricaoCurta: "Theo, gato resgatado da rua, está saudável e brincalhão. Preciso de um lar para ele. Tem 2 meses e meio e já é gordinho e cheio de energia.",
        historia: "Recolhi o Theo da rua, tava doente e mto magrinho. Hj já recuperado preciso encontrar um lar pra ele. è pretinho e super brincalhão. Está saudável e até gordinho para 2 meses e meio.",
        cuidados: [],
        temperamento: [],
        viveBemCom: [],
        sociavelCom: [],
        doador: {
            nome: "Marisa P da Silva",
            email: "maris.sth@gmail.com",
            telefone: "(18) 9971-5885"
        }
    },
{
        id: 10,
        nome: "Gatos",
        codigo: "305649",
        tipo: "gato",
        sexo: "Ambos",
        porte: "Pequeno",
        idade: "Filhote",
        idadeTexto: "Abaixo de 2 meses",
        raca: "SRD-ViraLata",
        localizacao: "Araçatuba - SP",
        img: "/img/animais/gatomickey.webp", // <-- CORRIGIDO
        gallery: ["/img/animais/gatomickey.webp", "/img/animais/gatamalu.webp", "/img/animais/gatanina.webp"], // <-- CORRIGIDO
        descricaoCurta: "1 gatinha toda branca a outra e branca e preta e o macho e branco com algumas manchinhas pretas sendo uma a marca do mickey",
        historia: "1 gatinha toda branca a outra e branca e preta e o macho e branco com algumas manchinhas pretas sendo uma a marca do mickey",
        cuidados: [],
        temperamento: [],
        viveBemCom: [],
        sociavelCom: [],
        doador: {
            nome: "Alessandra cardoso de Almeida",
            email: "ale_terapianatural@hotmail.com",
            telefone: "(18) 3304-5063"
        }
    },
{
        id: 11,
        nome: "Filhotes",
        codigo: "305650",
        tipo: "cachorro",
        sexo: "Ambos",
        porte: "Pequeno",
        idade: "Filhote",
        idadeTexto: "2 a 6 meses",
        raca: "SRD-ViraLata",
        localizacao: "Araçatuba - SP",
        img: "/img/animais/filhotesadocao.webp", // <-- CORRIGIDO
        gallery: ["/img/animais/filhotesadocao.webp"], // <-- CORRIGIDO
        descricaoCurta: "Lares temporários para animais geram altos custos com alimentação e saúde. Precisamos de doações, pois não temos abrigo e enfrentamos dificuldades financeiras.",
        historia: "Lares temporários para animais geram altos custos com alimentação e saúde. Precisamos de doações, pois não temos abrigo e enfrentamos dificuldades financeiras.",
        cuidados: ["Vermifugado"],
        temperamento: [],
        viveBemCom: ["Casa com quintal"],
        sociavelCom: ["Cachorros", "Crianças"],
        doador: {
            nome: "Clube Amigo dos Animais",
            email: "contato@procure1amigo.com.br",
            telefone: "(18) 9738-5046"
        }
    },
{
        id: 12,
        nome: "Gata sem nome",
        codigo: "305651",
        tipo: "gato",
        sexo: "Fêmea",
        porte: "Pequeno",
        idade: "Filhote",
        idadeTexto: "2 a 6 meses",
        raca: "SRD-ViraLata",
        localizacao: "Araçatuba - SP",
        img: "/img/animais/gatasemnome1.webp", // <-- CORRIGIDO
        gallery: ["/img/animais/gatasemnome1.webp", "/img/animais/gatasemnome2.webp", "/img/animais/gatasemnome3.webp"], // <-- CORRIGIDO
        descricaoCurta: "Está em uma casa onde as pessoaa foram embora e deixaram eles preciso de resgatar e o outro está preso em casa pois estava na rua eu não posso ficar com ele",
        historia: "Está em uma casa onde as pessoaa foram embora e deixaram eles preciso de resgatar e o outro está preso em casa pois estava na rua eu não posso ficar com ele",
        cuidados: [],
        temperamento: [],
        viveBemCom: ["Casa com quintal"],
        sociavelCom: [],
        doador: {
            nome: "Cristiane Aparecida Pedreiro",
            email: "cristianepedreiro39@gmail.com",
            telefone: "(18) 99643-9964"
        }
    },
{
        id: 13,
        nome: "Bobby",
        codigo: "305652",
        tipo: "cachorro",
        sexo: "Macho",
        porte: "Grande",
        idade: "Filhote",
        idadeTexto: "7 a 11 meses",
        raca: "Indeterminado",
        localizacao: "Araçatuba - SP",
        img: "/img/animais/BobbyDog.webp", // <-- CORRIGIDO
        gallery: ["/img/animais/BobbyDog.webp"], // <-- CORRIGIDO
        descricaoCurta: "Está em uma casa onde as pessoaa foram embora e deixaram eles preciso de resgatar e o outro está preso em casa pois estava na rua eu não posso ficar com ele",
        historia: "Está em uma casa onde as pessoaa foram embora e deixaram eles preciso de resgatar e o outro está preso em casa pois estava na rua eu não posso ficar com ele",
        cuidados: [],
        temperamento: [],
        viveBemCom: ["Casa com quintal"],
        sociavelCom: [],
        doador: {
            nome: "Priscila Cunha",
            email: "pcunha20@gmail.com",
            telefone: "(18) 9964-03450"
        }
    },
{
        id: 14,
        nome: "Maju e Lola",
        codigo: "305653",
        tipo: "cachorro",
        sexo: "Ambos",
        porte: "Médio",
        idade: "Filhote",
        idadeTexto: "7 a 11 meses",
        raca: "Indeterminado",
        localizacao: "Araçatuba - SP",
        img: "/img/animais/MajueLolaDog.webp", // <-- CORRIGIDO
        gallery: ["/img/animais/MajueLolaDog.webp", "/img/animais/majueloladog2.webp", "/img/animais/majueloladog3.webp"], // <-- CORRIGIDO
        descricaoCurta: "GEncontrei as 2 cachorrinhas na rua,provavelmente abandonarão elas,pois estava passando fome e frio, estava bem maltratadas. No momento estou cuidando, ja mediquei com remédio de verme e vacina,porém moro em condomínio pequeno e não tenho como ficar com elas. Estou a procura de uma lar para Maju e Lola são bem carinhosas, 2 fêmea, elas merecem ser amadas!",
        historia: "Encontrei as 2 cachorrinhas na rua,provavelmente abandonarão elas,pois estava passando fome e frio, estava bem maltratadas. No momento estou cuidando, ja mediquei com remédio de verme e vacina,porém moro em condomínio pequeno e não tenho como ficar com elas. Estou a procura de uma lar para Maju e Lola são bem carinhosas, 2 fêmea, elas merecem ser amadas!",
        cuidados: [],
        temperamento: [],
        viveBemCom: ["Casa com quintal"],
        sociavelCom: [],
        doador: {
            nome: "Priscila Cunha",
            email: "pcunha20@gmail.com",
            telefone: "(18) 9964-03450"
        }
    },
];