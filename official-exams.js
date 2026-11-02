// Gabaritos oficiais após recursos: transcrição conferida visualmente, 01/11/2026.
// null = questão anulada; o PDF original permanece no site que hospeda a prova.
window.FOCO_EXAMS = Object.freeze([
  { id:'pmmg-cfsd-2025', title:'CFSd PMMG 2025', edition:2025, applicationYear:2024,
    label:'Soldado · PMMG · CFSd 2025', notice:'Edital DRH/CRS 10/2024', minutes:180,
    pdf:'https://arquivos.qconcursos.com/prova/arquivo_gabarito/121468/pm-mg-2024-pm-mg-soldado-gabarito.pdf',
    answerSource:'https://vanguardamilitar.com/download/2392/',
    pdfFirstQuestionPage:5,
    answers:['C','D','D','C','B',null,'A','A','B','C','D','C','B',null,'B',null,'B','A','A','A','B','C','D','C','B','B','B','C','A','D','C','D','B','A','B','C','D','B','C','D','B','A','D','C','C','A','C','B','D','C'],
    note:'Gabarito definitivo publicado em 19/11/2024. Q1 foi alterada para C; questões 6, 14 e 16 foram anuladas.'
  },
  { id:'pmmg-cfsd-2023', title:'CFSd PMMG 2023', edition:2023, applicationYear:2023,
    label:'Soldado · PMMG · CFSd 2023', notice:'Edital DRH/CRS 11/2022', minutes:180,
    pdf:'https://arquivos.qconcursos.com/prova/arquivo_prova/93633/pm-mg-2023-pm-mg-soldado-prova.pdf',
    answerSource:'https://arquivos.qconcursos.com/prova/arquivo_gabarito/93633/pm-mg-2023-pm-mg-soldado-gabarito.pdf',
    pdfFirstQuestionPage:4,
    answers:['D',null,'A','C','B','A','C','A','D','A','A',null,'C','A','C','A','B','B','D','B','C','A','C','D','A','C','A','B','A','D','D','A','C','D','C','D',null,'D','C','D','D','B','B','A','D',null,'C',null,'B','D'],
    note:'Gabarito oficial de 07/06/2023. Questões 2, 12, 37, 46 e 48 foram anuladas.'
  }
]);
for(const e of window.FOCO_EXAMS){if(e.answers.length!==50)throw Error('Gabarito oficial incompleto: '+e.id);}