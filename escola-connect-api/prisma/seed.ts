import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('🔄 Iniciando a limpeza da base de dados...');

  // Eliminar dados antigos em ordem reversa de relacionamento
  await prisma.forumReply.deleteMany();
  await prisma.forumTopic.deleteMany();
  await prisma.user.deleteMany();
  await prisma.school.deleteMany();
  await prisma.course.deleteMany();

  console.log('🧹 Base de dados limpa com sucesso!');

  // --- 1. CRIAR UTILIZADORES ---
  console.log('👤 Criando utilizadores...');
  const hashedPassword = await bcrypt.hash('123456', 10);

  const studentUser = await prisma.user.create({
    data: {
      name: 'Josué Antunes',
      email: 'josue@gmail.com',
      password: hashedPassword,
      phone: '+244923456789',
      province: 'Luanda',
      role: 'student'
    }
  });

  const parentUser = await prisma.user.create({
    data: {
      name: 'Manuel Mateus',
      email: 'manuel@gmail.com',
      password: hashedPassword,
      phone: '+244912345678',
      province: 'Benguela',
      role: 'parent'
    }
  });

  const adminUser = await prisma.user.create({
    data: {
      name: 'Administrador Connect',
      email: 'admin@escolaconnect.ao',
      password: hashedPassword,
      phone: '+244931234567',
      province: 'Luanda',
      role: 'admin'
    }
  });

  const mariaUser = await prisma.user.create({
    data: {
      name: 'Maria Silva',
      email: 'maria@gmail.com',
      password: hashedPassword,
      phone: '+244921112233',
      province: 'Luanda',
      role: 'parent'
    }
  });

  const joaoUser = await prisma.user.create({
    data: {
      name: 'João Mendes',
      email: 'joao@gmail.com',
      password: hashedPassword,
      phone: '+244932223344',
      province: 'Huambo',
      role: 'student'
    }
  });

  const anaUser = await prisma.user.create({
    data: {
      name: 'Ana Costa',
      email: 'ana@gmail.com',
      password: hashedPassword,
      phone: '+244923334455',
      province: 'Benguela',
      role: 'student'
    }
  });

  const carlosUser = await prisma.user.create({
    data: {
      name: 'Prof. Carlos Antunes',
      email: 'carlos@gmail.com',
      password: hashedPassword,
      phone: '+244914445566',
      province: 'Luanda',
      role: 'institution_admin'
    }
  });

  console.log('✅ Utilizadores criados!');

  // --- 2. CRIAR ESCOLAS ---
  console.log('🏫 Criando escolas em Angola com dados estendidos...');

  const elizangela = await prisma.school.create({
    data: {
      name: 'Colégio Elizângela Filomena',
      tagline: 'Excelência no ensino médio e primário',
      description: 'Uma das instituições privadas de ensino mais conceituadas de Luanda, focada em preparar os alunos para os desafios do ensino superior e do mercado de trabalho.',
      type: 'private',
      province: 'Luanda',
      address: 'Via AL14, Talatona, Luanda',
      verified: true,
      rating: 4.8,
      phone: '+244222001122',
      email: 'geral@elizangela.co.ao',
      website: 'https://elizangelafilomena.co.ao',
      images: [
        'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=600&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=600&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?q=80&w=600&auto=format&fit=crop'
      ],
      courses: ["Ensino Primário", "Ensino Secundário Geral", "Ciências Físicas e Biológicas"],
      latitude: -8.9094,
      longitude: 13.1844,
      reviews_count: 124,
      students_count: 850,
      founded_year: 1992,
      pricing: {
        infantil: 25000,
        primario: 35000,
        secundario: 45000,
        currency: 'Kz',
        period: 'mês'
      },
      facilities: [
        { name: 'Biblioteca', available: true },
        { name: 'Laboratório de Ciências', available: true },
        { name: 'Wi-Fi', available: true }
      ],
      schedule: {
        weekdays: '07:30 - 17:00',
        saturday: '08:00 - 12:00',
        sunday: 'Fechado'
      },
      stats: {
        views: 2847,
        contacts: 156,
        response_rate: 94
      }
    }
  });

  const imil = await prisma.school.create({
    data: {
      name: 'Instituto Médio Industrial de Luanda (IMIL)',
      tagline: 'Referência em formação técnico-profissional',
      description: 'O IMIL (também conhecido como Makarenko) é uma instituição pública histórica de Luanda, altamente reconhecida pela qualidade na formação técnica de nível médio em Informática, Eletrónica, Telecomunicações e Construção Civil.',
      type: 'public',
      province: 'Luanda',
      address: 'Avenida Hoji Ya Henda, Largo das Escolas, Luanda',
      verified: true,
      rating: 4.6,
      phone: '+244925000001',
      email: 'contacto@imil.edu.ao',
      website: 'https://imil.edu.ao',
      images: [
        'https://images.unsplash.com/photo-1562774053-701939374585?q=80&w=600&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1581092921461-eab62e97a780?q=80&w=600&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=600&auto=format&fit=crop'
      ],
      courses: ["Informática", "Eletrónica e Telecomunicações", "Construção Civil", "Energia e Instalações Elétricas"],
      latitude: -8.8156,
      longitude: 13.2345,
      reviews_count: 245,
      students_count: 1500,
      founded_year: 1978,
      pricing: {
        infantil: 0,
        primario: 0,
        secundario: 0,
        currency: 'Kz',
        period: 'mês'
      },
      facilities: [
        { name: 'Biblioteca', available: true },
        { name: 'Laboratório de Química', available: true },
        { name: 'Oficina Mecânica', available: true },
        { name: 'Wi-Fi', available: false }
      ],
      schedule: {
        weekdays: '07:00 - 18:30',
        saturday: 'Fechado',
        sunday: 'Fechado'
      },
      stats: {
        views: 4120,
        contacts: 320,
        response_rate: 85
      }
    }
  });

  const cardeal = await prisma.school.create({
    data: {
      name: 'Complexo Escolar Cardeal Alexandre do Nascimento',
      tagline: 'Educação integral com valores éticos',
      description: 'Complexo educacional privado com excelentes infraestruturas, laboratórios modernos e foco numa formação humana, cívica e científica rigorosa.',
      type: 'private',
      province: 'Luanda',
      address: 'Centralidade do Kilamba, Luanda',
      verified: true,
      rating: 4.7,
      phone: '+244930999888',
      email: 'info@cardeal-alexandre.ao',
      images: [
        'https://images.unsplash.com/photo-1580582932707-520aed937b7b?q=80&w=600&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?q=80&w=600&auto=format&fit=crop'
      ],
      courses: ["Ensino Primário", "Ensino Secundário Geral"],
      latitude: -8.9567,
      longitude: 13.1901,
      reviews_count: 88,
      students_count: 950,
      founded_year: 2018,
      pricing: {
        infantil: 30000,
        primario: 40000,
        secundario: 50000,
        currency: 'Kz',
        period: 'mês'
      },
      facilities: [
        { name: 'Biblioteca', available: true },
        { name: 'Quadra Polidesportiva', available: true },
        { name: 'Laboratório de Informática', available: true }
      ],
      schedule: {
        weekdays: '07:30 - 16:30',
        saturday: '08:00 - 12:00',
        sunday: 'Fechado'
      },
      stats: {
        views: 1850,
        contacts: 98,
        response_rate: 90
      }
    }
  });

  const esperanca = await prisma.school.create({
    data: {
      name: 'Colégio Esperança de Benguela',
      tagline: 'Construindo o futuro na província de Benguela',
      description: 'Instituição privada de ensino que abrange o ensino primário e secundário (I e II ciclos). Conhecida pelo excelente ambiente pedagógico e corpo docente qualificado na província de Benguela.',
      type: 'private',
      province: 'Benguela',
      address: 'Zona Comercial, Benguela',
      verified: false,
      rating: 4.2,
      phone: '+244272221144',
      email: 'benguela@colegioesperanca.ao',
      images: [
        'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?q=80&w=600&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=600&auto=format&fit=crop'
      ],
      courses: ["Ensino Primário", "Ensino Geral"],
      latitude: -12.5783,
      longitude: 13.4072,
      reviews_count: 42,
      students_count: 600,
      founded_year: 2005,
      pricing: {
        infantil: 18000,
        primario: 25000,
        secundario: 30000,
        currency: 'Kz',
        period: 'mês'
      },
      facilities: [
        { name: 'Biblioteca', available: true },
        { name: 'Cantina', available: true }
      ],
      schedule: {
        weekdays: '08:00 - 17:00',
        saturday: 'Fechado',
        sunday: 'Fechado'
      },
      stats: {
        views: 920,
        contacts: 45,
        response_rate: 88
      }
    }
  });

  const liceuHuambo = await prisma.school.create({
    data: {
      name: 'Liceu do Huambo (Escola Secundária Ngola Kabangu)',
      tagline: 'Tradição académica no planalto central',
      description: 'Escola secundária pública de referência no Huambo, com longa tradição na formação de quadros na região do planalto central angolano.',
      type: 'public',
      province: 'Huambo',
      address: 'Bairro Académico, Cidade do Huambo',
      verified: true,
      rating: 4.0,
      phone: null,
      email: 'liceuhuambo@governo.gov.ao',
      images: [
        'https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=600&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1516534775068-ba3e84589d90?q=80&w=600&auto=format&fit=crop'
      ],
      courses: ["Ciências Físicas e Biológicas", "Ciências Sociais e Humanas"],
      latitude: -12.7761,
      longitude: 15.7336,
      reviews_count: 30,
      students_count: 1200,
      founded_year: 1950,
      pricing: {
        infantil: 0,
        primario: 0,
        secundario: 0,
        currency: 'Kz',
        period: 'mês'
      },
      facilities: [
        { name: 'Biblioteca', available: true },
        { name: 'Laboratório de Física', available: true }
      ],
      schedule: {
        weekdays: '07:30 - 18:00',
        saturday: 'Fechado',
        sunday: 'Fechado'
      },
      stats: {
        views: 750,
        contacts: 15,
        response_rate: 70
      }
    }
  });

  console.log('✅ Escolas criadas!');

  // --- 3. CRIAR CURSOS PREPARATÓRIOS ---
  console.log('📚 Criando cursos preparatórios...');

  await prisma.course.createMany({
    data: [
      {
        title: 'Preparatório de Engenharia e Tecnologias',
        description: 'Curso intensivo preparatório para os exames de admissão das faculdades de Engenharia da Universidade Agostinho Neto (UAN) e Universidade Metodista, focando em Matemática, Física e Desenho Técnico.',
        instructor: 'Prof. Eng. Carlos Antunes',
        price: 25000.0
      },
      {
        title: 'Preparatório de Medicina e Ciências da Saúde',
        description: 'Preparação completa para exames de acesso a Medicina, Enfermagem e Farmácia. Aulas intensivas de Biologia, Química e Língua Portuguesa com simulações de exames passados.',
        instructor: 'Dra. Sandra Simão',
        price: 30000.0
      },
      {
        title: 'Preparatório Geral de Ciências Sociais e Humanas',
        description: 'Preparatório focado para Direito, Economia, Psicologia e Relações Internacionais. Conteúdos abrangentes de História, Geografia, Língua Portuguesa e Cultura Geral de Angola.',
        instructor: 'Dr. Valter Cassule',
        price: 20000.0
      }
    ]
  });

  console.log('✅ Cursos criados!');

  // --- 4. CRIAR TÓPICOS NO FÓRUM ---
  console.log('💬 Criando tópicos e respostas no fórum...');

  // Tópico 1 - EXAMES (UAN)
  const topic1 = await prisma.forumTopic.create({
    data: {
      title: 'Quais as melhores dicas para o exame de admissão da UAN?',
      content: 'Olá a todos! Vou concorrer para Engenharia Informática na UAN este ano e estou um pouco nervoso. Alguém que já tenha passado pelo processo tem dicas de estudo, livros ou materiais que recomendam focar mais?',
      excerpt: 'Vou concorrer para Engenharia Informática na UAN este ano e estou um pouco nervoso. Alguém tem dicas de estudo ou materiais recomendados?',
      category: 'Exames',
      tags: ['UAN', 'Exames de Admissão', 'Engenharia', 'Luanda'],
      views: 245,
      likes: 42,
      isPinned: true,
      isAnswered: true,
      userId: studentUser.id,
      createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000) // Há 5 dias
    }
  });

  await prisma.forumReply.create({
    data: {
      content: 'Foca muito em limites e derivadas para matemática, e cinemática para física. Faz os exames de admissão dos anos anteriores (de 2018 a 2024). Eles costumam repetir o estilo das perguntas. Boa sorte!',
      likes: 12,
      topicId: topic1.id,
      userId: carlosUser.id,
      createdAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000)
    }
  });

  await prisma.forumReply.create({
    data: {
      content: 'Eu estudei pelo preparatório de Engenharia e ajudou-me imenso. Consegui entrar no ano passado. Recomendo também estudares em grupo!',
      likes: 8,
      topicId: topic1.id,
      userId: parentUser.id,
      createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000)
    }
  });

  // Tópico 2 - DÚVIDAS (Pública vs Privada)
  const topic2 = await prisma.forumTopic.create({
    data: {
      title: 'UAN (Pública) ou UCAN (Privada) para o curso de Direito?',
      content: 'Estou num dilema gigante. Fui admitido em Direito na Universidade Agostinho Neto (UAN) e também consegui vaga na Universidade Católica de Angola (UCAN). Sei que a UAN é prestigiada e gratuita, mas dizem que a UCAN é mais organizada e os professores faltam menos. Vale a pena pagar a mensalidade da UCAN?',
      excerpt: 'Fui admitido em Direito na UAN e também na UCAN. A UAN é prestigiada e gratuita, mas dizem que a UCAN é mais organizada. Vale a pena pagar a propina?',
      category: 'Dúvidas',
      tags: ['UAN', 'UCAN', 'Direito', 'Propinas'],
      views: 189,
      likes: 24,
      userId: anaUser.id,
      createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000) // Há 3 dias
    }
  });

  await prisma.forumReply.create({
    data: {
      content: 'Olha, eu fiz Direito na UCAN e não me arrependo. A organização é fantástica, tens acesso a uma excelente biblioteca e o calendário académico é cumprido à risca. Se a tua família tem condições de pagar sem passar aperto, recomendo a Católica de olhos fechados.',
      likes: 15,
      topicId: topic2.id,
      userId: mariaUser.id,
      createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000)
    }
  });

  await prisma.forumReply.create({
    data: {
      content: 'A Faculdade de Direito da UAN (FDUAN) continua a ser o maior berço de juristas de Angola. O rigor de lá é absurdo e a exigência dos professores prepara-te muito bem para as maiores pressões do mercado. A questão das greves melhorou bastante nos últimos anos. Se queres poupar dinheiro e ter prestígio clássico, vai para a UAN!',
      likes: 19,
      topicId: topic2.id,
      userId: adminUser.id,
      createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000)
    }
  });

  // Tópico 3 - BOLSAS (INAGBE)
  const topic3 = await prisma.forumTopic.create({
    data: {
      title: 'Como funciona o processo de candidatura às bolsas do INAGBE?',
      content: 'Alguém aqui já conseguiu bolsa interna do INAGBE? Gostaria de saber quando costumam abrir as candidaturas este ano, quais são os critérios de média mais importantes e se o processo é muito demorado. Toda ajuda é bem-vinda!',
      excerpt: 'Gostaria de saber como funciona a candidatura para as bolsas internas do INAGBE, quando abrem e quais são os critérios principais.',
      category: 'Bolsas',
      tags: ['Bolsas de Estudo', 'INAGBE', 'Financiamento'],
      views: 312,
      likes: 56,
      isPinned: true,
      userId: joaoUser.id,
      createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000) // Há 10 dias
    }
  });

  await prisma.forumReply.create({
    data: {
      content: 'As bolsas internas costumam abrir sempre entre Outubro e Novembro, logo após o início do ano letivo. O critério principal é teres média igual ou superior a 14 valores no ensino médio (para ingressantes) ou no ano letivo anterior (para quem já está na faculdade). Tens de preparar o teu certificado de notas, atestado de pobreza (emitido pela administração municipal) e o bilhete de identidade.',
      likes: 27,
      topicId: topic3.id,
      userId: adminUser.id,
      createdAt: new Date(Date.now() - 9 * 24 * 60 * 60 * 1000)
    }
  });

  await prisma.forumReply.create({
    data: {
      content: 'Excelente explicação! Adiciono apenas que o processo costuma demorar de 3 a 6 meses para sair o resultado final e começar o pagamento do subsídio. Recomendo submeter a candidatura logo nas primeiras semanas pois o portal do INAGBE costuma congestionar nos últimos dias.',
      likes: 18,
      topicId: topic3.id,
      userId: studentUser.id,
      createdAt: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000)
    }
  });

  // Tópico 4 - DICAS (ISUTIC)
  const topic4 = await prisma.forumTopic.create({
    data: {
      title: 'Dicas para os caloiros do ISUTIC (Telecomunicações e Informática)',
      content: 'Parabéns a todos que entraram no ISUTIC! Como veterano de Engenharia de Telecomunicações, decidi criar este tópico para partilhar algumas dicas essenciais: 1. Não faltem às aulas de Álgebra e Análise Matemática (são as que mais reprovam); 2. Aproveitem os laboratórios da Huawei no campus, são de nível mundial; 3. Criem grupos de estudo desde a primeira semana. Se tiverem dúvidas sobre professores ou horários, perguntem aqui!',
      excerpt: 'Dicas de ouro de um veterano para os caloiros que acabaram de entrar no ISUTIC: laboratórios, estudos e disciplinas críticas.',
      category: 'Dicas',
      tags: ['ISUTIC', 'Dicas', 'Telecomunicações', 'Informática'],
      views: 178,
      likes: 38,
      userId: studentUser.id,
      createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000) // Há 2 dias
    }
  });

  await prisma.forumReply.create({
    data: {
      content: 'Grande iniciativa Josué! Eu entrei este ano para Engenharia Informática e estava mesmo à procura de conselhos sobre a faculdade. Os professores de física são muito exigentes?',
      likes: 4,
      topicId: topic4.id,
      userId: joaoUser.id,
      createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000)
    }
  });

  await prisma.forumReply.create({
    data: {
      content: 'Sim, João. Física I e II exigem muita dedicação prática. Resolvam muitos exercícios do livro "Halliday" e não fiquem apenas pelos apontamentos das aulas teóricas. O segredo é praticar muito!',
      likes: 7,
      topicId: topic4.id,
      userId: carlosUser.id,
      createdAt: new Date(Date.now() - 12 * 60 * 60 * 1000) // Há 12 horas
    }
  });

  // Tópico 5 - EXPERIÊNCIAS (UKB Benguela)
  const topic5 = await prisma.forumTopic.create({
    data: {
      title: 'Minha experiência a estudar Economia na Universidade Katyavala Bwila (UKB)',
      content: 'Olá comunidade! Terminei recentemente a minha licenciatura em Economia na UKB em Benguela e gostaria de deixar o meu depoimento. O corpo docente é excelente, muitos doutorados cooperantes. O campus tem uma atmosfera maravilhosa e a biblioteca é bem recheada. O único ponto negativo é a burocracia na secretaria para emissão de documentos finais, que costuma demorar meses. Recomendo muito a UKB para quem é do centro/sul de Angola!',
      excerpt: 'Depoimento honesto sobre o curso de Economia na Universidade Katyavala Bwila (UKB) em Benguela: corpo docente, campus e pontos negativos.',
      category: 'Experiências',
      tags: ['UKB', 'Benguela', 'Economia', 'Graduação'],
      views: 121,
      likes: 19,
      userId: anaUser.id,
      createdAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000) // Há 4 dias
    }
  });

  await prisma.forumReply.create({
    data: {
      content: 'Parabéns pela graduação Ana! Que bom saber disso, estou a pensar em colocar a UKB como a minha primeira opção para Gestão de Empresas no próximo ano. Tens ideia se as médias de corte são muito altas?',
      likes: 3,
      topicId: topic5.id,
      userId: joaoUser.id,
      createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000)
    }
  });

  // Tópico 6 - GERAL (Transporte Universitário)
  const topic6 = await prisma.forumTopic.create({
    data: {
      title: 'Dificuldade de transporte para a Centralidade do Kilamba / Camama',
      content: 'Alguém mais sofre diariamente para conseguir táxi ou autocarro universitário para ir estudar no Campus da UAN na Camama ou nas faculdades do Kilamba? Saio do Cazenga muito cedo e às vezes apanho 3 táxis. As rotas dos autocarros públicos universitários ainda estão ativas? Partilhem aqui as vossas rotas e alternativas!',
      excerpt: 'Discussão sobre as rotas de transporte universitário, dificuldades de táxi e alternativas para os campi do Kilamba e Camama.',
      category: 'Geral',
      tags: ['Transporte', 'Talatona', 'Camama', 'UAN'],
      views: 154,
      likes: 12,
      userId: joaoUser.id,
      createdAt: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000) // Há 6 dias
    }
  });

  await prisma.forumReply.create({
    data: {
      content: 'É um sofrimento terrível! Eu saio de Viana e é uma autêntica odisseia. Os autocarros azuis da UAN têm horários muito restritos (saem às 06:15 e regressam às 16:30). O melhor que fiz foi juntar-me a colegas do mesmo bairro para partilharmos boleias com custos divididos. Fica muito mais barato e seguro!',
      likes: 10,
      topicId: topic6.id,
      userId: studentUser.id,
      createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000)
    }
  });

  // Tópico 7 - DÚVIDAS (Propinas Medicina)
  const topic7 = await prisma.forumTopic.create({
    data: {
      title: 'Qual é o valor atualizado das propinas de Medicina nas universidades privadas?',
      content: 'Olá a todos! Quero muito estudar Medicina, mas como o exame da UAN é extremamente concorrido, gostaria de saber os preços atuais das mensalidades/propinas em universidades privadas como a Jean Piaget, Universidade Metropolitana ou no Instituto Superior Politécnico Privado de Menongue. Alguém tem a tabela de preços atualizada?',
      excerpt: 'Pesquisa sobre os valores de mensalidade/propina para o curso de Medicina em faculdades privadas de Luanda e outras províncias.',
      category: 'Dúvidas',
      tags: ['Medicina', 'Propinas', 'Jean Piaget', 'Privadas'],
      views: 290,
      likes: 21,
      userId: mariaUser.id,
      createdAt: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000) // Há 8 dias
    }
  });

  await prisma.forumReply.create({
    data: {
      content: 'Na Jean Piaget em Luanda, a propina mensal de Medicina está atualmente na casa dos 95.000 Kz a 110.000 Kz, dependendo se pagas com desconto anual ou mensal. Tens de contar também com a taxa de inscrição inicial que é bastante alta.',
      likes: 14,
      topicId: topic7.id,
      userId: parentUser.id,
      createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
    }
  });

  await prisma.forumReply.create({
    data: {
      content: 'Confirmo o valor da Piaget. Na Universidade Metodista de Angola (UMA), ronda os 85.000 Kz para cursos de saúde. O curso de Medicina requer muito gasto extra com materiais, jalecos, livros especializados, etc. É bom ter isso em mente no planeamento familiar.',
      likes: 9,
      topicId: topic7.id,
      userId: mariaUser.id,
      createdAt: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000)
    }
  });

  // Tópico 8 - DICAS (Bibliotecas em Luanda)
  const topic8 = await prisma.forumTopic.create({
    data: {
      title: 'Melhores bibliotecas com internet rápida para estudar em Luanda',
      content: 'Para quem está na fase de preparação de exames ou monografias de fim de curso, partilho a minha lista das 3 melhores bibliotecas públicas em Luanda com bom ambiente, silêncio e internet Wi-Fi rápida: 1. Biblioteca Nacional de Angola (na Baixa) - muito clássica e com ótimo acervo físico; 2. Mediateca de Luanda (no Cazenga ou Zango) - computadores modernos e cabines de estudo individuais incríveis; 3. Biblioteca do CCBA (Centro Cultural Brasil-Angola) - excelente ar condicionado e Wi-Fi estável. Conhecem mais alguma?',
      excerpt: 'Guia completo com as melhores bibliotecas públicas e mediatecas em Luanda para estudar com tranquilidade, tomadas e internet Wi-Fi estável.',
      category: 'Dicas',
      tags: ['Bibliotecas', 'Dicas', 'Estudo', 'Luanda'],
      views: 198,
      likes: 35,
      userId: studentUser.id,
      createdAt: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000) // Há 12 dias
    }
  });

  await prisma.forumReply.create({
    data: {
      content: 'Excelente partilha! Costumo frequentar a Mediateca do Cazenga e a internet lá é fantástica, perfeita para descarregar livros e artigos científicos. Só recomendo chegar cedo (antes das 08:30) porque as filas para entrar costumam ser longas nos períodos de exames.',
      likes: 12,
      topicId: topic8.id,
      userId: joaoUser.id,
      createdAt: new Date(Date.now() - 11 * 24 * 60 * 60 * 1000)
    }
  });

  // Tópico 9 - EXPERIÊNCIAS (UMN Huambo)
  const topic9 = await prisma.forumTopic.create({
    data: {
      title: 'Como é a vida de estudante universitário no Huambo?',
      content: 'Olá! Sou de Luanda mas fui colocado na Universidade José Eduardo dos Santos (UJES) no Huambo para Agronomia. Como é o custo de vida, arrendamento de quartos para estudantes perto da faculdade e o clima no planalto central? Algum conselho prático?',
      excerpt: 'Dúvidas sobre o custo de vida, clima e alojamento estudantil para um aluno de Luanda colocado na UJES no Huambo.',
      category: 'Experiências',
      tags: ['Huambo', 'UJES', 'Custo de Vida', 'Estudantes'],
      views: 167,
      likes: 22,
      userId: joaoUser.id,
      createdAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000) // Há 15 dias
    }
  });

  await prisma.forumReply.create({
    data: {
      content: 'Seja muito bem-vindo ao Huambo! O custo de vida aqui é infinitamente mais barato do que em Luanda. Consegues arrendar um quarto simpático perto do Bairro Académico por cerca de 15.000 Kz a 25.000 Kz por mês. O conselho número um: compra bons agasalhos! O clima aqui de Maio a Agosto é extremamente frio (chega a bater os 10 graus de noite). De resto, as pessoas são super acolhedoras e a comida local é maravilhosa!',
      likes: 25,
      topicId: topic9.id,
      userId: carlosUser.id,
      createdAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000)
    }
  });

  console.log('✅ Tópicos e respostas do fórum criados!');
  console.log('🎉 Semeação da base de dados terminada com sucesso!');
}

main()
  .catch((e) => {
    console.error('❌ Erro na semeadura:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
