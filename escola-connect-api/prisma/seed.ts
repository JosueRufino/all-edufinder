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

  console.log('✅ Utilizadores criados!');

  // --- 2. CRIAR ESCOLAS ---
  console.log('🏫 Criando escolas em Angola...');

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
      ]
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
      ]
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
      ]
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
      ]
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
      ]
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

  const topic1 = await prisma.forumTopic.create({
    data: {
      title: 'Quais as melhores dicas para o exame de admissão da UAN?',
      content: 'Olá a todos! Vou concorrer para Engenharia Informática na UAN este ano e estou um pouco nervoso. Alguém que já tenha passado pelo processo tem dicas de estudo, livros ou materiais que recomendam focar mais?',
      views: 124,
      likes: 18,
      userId: studentUser.id
    }
  });

  await prisma.forumReply.create({
    data: {
      content: 'Foca muito em limites e derivadas para matemática, e cinemática para física. Faz os exames de admissão dos anos anteriores (de 2018 a 2024). Eles costumam repetir o estilo das perguntas. Boa sorte!',
      topicId: topic1.id,
      userId: adminUser.id
    }
  });

  await prisma.forumReply.create({
    data: {
      content: 'Eu estudei pelo preparatório de Engenharia e ajudou-me imenso. Consegui entrar no ano passado. Recomendo também estudares em grupo!',
      topicId: topic1.id,
      userId: parentUser.id
    }
  });

  const topic2 = await prisma.forumTopic.create({
    data: {
      title: 'IMIL ou Colégio Privado para Ensino Médio Técnico?',
      content: 'Quero matricular o meu filho em Informática no ensino médio. Estou na dúvida se vale mais a pena concorrer para o IMIL (Makarenko) ou matriculá-lo num colégio privado como o Elizângela. Opiniões sobre a qualidade de laboratórios e professores?',
      views: 85,
      likes: 9,
      userId: parentUser.id
    }
  });

  await prisma.forumReply.create({
    data: {
      content: 'O IMIL tem uma excelente fama histórica e professores técnicos muito experientes, mas as vagas são super concorridas. O Elizângela tem laboratórios mais modernos e menor número de alunos por turma. Se tens orçamento, o Elizângela dá um acompanhamento mais personalizado, mas o IMIL prepara muito bem para a realidade prática!',
      topicId: topic2.id,
      userId: studentUser.id
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
