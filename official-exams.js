// Gabaritos oficiais após recursos: transcrição conferida visualmente, 01/11/2026.
// null = questão anulada; o PDF original permanece no site que hospeda a prova.
window.FOCO_EXAMS = Object.freeze([
  { id:'pmmg-cfsd-2022', title:'CFSd PMMG 2022', edition:2022, applicationYear:2021,
    label:'Polícia Militar de Minas Gerais · Soldado · CFSd 2022', notice:'Edital DRH/CRS 06/2021', minutes:180,
    pdf:'https://vanguardamilitar.com/download/1616/', answerSource:'https://vanguardamilitar.com/download/1681/', pdfFirstQuestionPage:3,
    hasLiterature:false,
    answers:['D','A','B','C','B','A','B','D','D','C','A','C','A','B','D','B','C','D','A','C','B','D','C','A','A','D','B','C','D','A','B','C','C','A','D','C','B','D','B','A'],
    note:'Gabarito oficial do CFSd 2022, Edital 06/2021, aplicado em 15/08/2021, publicado em 16/08/2021. Grade antiga: 40 questões, sem disciplina de Literatura.'
  },
  { id:'pmmg-cfsd-2025', title:'CFSd PMMG 2025', edition:2025, applicationYear:2024,
    hasLiterature:true, label:'Soldado · PMMG · CFSd 2025', notice:'Edital DRH/CRS 10/2024', minutes:180,
    pdf:'https://arquivos.qconcursos.com/prova/arquivo_prova/121468/pm-mg-2024-pm-mg-soldado-prova.pdf',
    answerSource:'https://vanguardamilitar.com/download/2392/',
    pdfFirstQuestionPage:4,
    answers:['C','D','D','C','B',null,'A','A','B','C','D','C','B',null,'B',null,'B','A','A','A','B','C','D','C','B','B','B','C','A','D','C','D','B','A','B','C','D','B','C','D','B','A','D','C','C','A','C','B','D','C'],
    note:'Gabarito definitivo publicado em 19/11/2024. Q1 foi alterada para C; questões 6, 14 e 16 foram anuladas.'
  },
  { id:'pmmg-cfsd-2023', title:'CFSd PMMG 2023', edition:2023, applicationYear:2023,
    hasLiterature:true, label:'Soldado · PMMG · CFSd 2023', notice:'Edital DRH/CRS 11/2022', minutes:180,
    pdf:'https://arquivos.qconcursos.com/prova/arquivo_prova/93633/pm-mg-2023-pm-mg-soldado-prova.pdf',
    answerSource:'https://arquivos.qconcursos.com/prova/arquivo_gabarito/93633/pm-mg-2023-pm-mg-soldado-gabarito.pdf',
    pdfFirstQuestionPage:4,
    answers:['D',null,'A','C','B','A','C','A','D','A','A',null,'C','A','C','A','B','B','D','B','C','A','C','D','A','C','A','B','A','D','D','A','C','D','C','D',null,'D','C','D','D','B','B','A','D',null,'C',null,'B','D'],
    note:'Gabarito oficial de 07/06/2023. Questões 2, 12, 37, 46 e 48 foram anuladas.'
  }
]);
for(const e of window.FOCO_EXAMS){if(![40,50].includes(e.answers.length))throw Error('Gabarito oficial incompleto: '+e.id);}