const buildPortuguese50=function buildPortuguese50(){
 const words=[
 ['café','ox','ca-fé','oxítona terminada em e'],['avó','ox','a-vó','oxítona terminada em o'],['cipó','ox','ci-pó','oxítona terminada em o'],['maracujá','ox','ma-ra-cu-já','oxítona terminada em a'],['também','ox','tam-bém','oxítona terminada em em'],['ninguém','ox','nin-guém','oxítona terminada em em'],['parabéns','ox','pa-ra-béns','oxítona terminada em ens'],['armazém','ox','ar-ma-zém','oxítona terminada em em'],['jacaré','ox','ja-ca-ré','oxítona terminada em e'],['vatapá','ox','va-ta-pá','oxítona terminada em a'],
 ['fácil','par','fá-cil','paroxítona terminada em l'],['útil','par','ú-til','paroxítona terminada em l'],['lápis','par','lá-pis','paroxítona terminada em is'],['bônus','par','bô-nus','paroxítona terminada em us'],['vírus','par','ví-rus','paroxítona terminada em us'],['tórax','par','tó-rax','paroxítona terminada em x'],['órfã','par','ór-fã','paroxítona terminada em ã'],['fórum','par','fó-rum','paroxítona terminada em um'],['órgão','par','ór-gão','paroxítona terminada em ditongo nasal'],['amável','par','a-má-vel','paroxítona terminada em l'],['caráter','par','ca-rá-ter','paroxítona terminada em r'],
 ['médico','pro','mé-di-co','proparoxítona'],['lâmpada','pro','lâm-pa-da','proparoxítona'],['pêssego','pro','pês-se-go','proparoxítona'],['público','pro','pú-bli-co','proparoxítona'],['trânsito','pro','trân-si-to','proparoxítona'],['sílaba','pro','sí-la-ba','proparoxítona'],['matemática','pro','ma-te-má-ti-ca','proparoxítona'],['página','pro','pá-gi-na','proparoxítona'],
 ['saúde','hi','sa-ú-de','hiato com u tônico'],['saída','hi','sa-í-da','hiato com i tônico'],['baú','hi','ba-ú','hiato com u tônico'],['país','hi','pa-ís','hiato com i tônico']];
 const crases=[
 ['A equipe chegou ___ escola antes das sete.','à','O verbo chegar exige a preposição a e escola é substantivo feminino definido.'],
 ['O relatório foi entregue ___ diretora do setor.','à','Entregar algo a alguém; a destinatária é determinada por artigo feminino.'],
 ['Voltamos ___ cidade em que a turma nasceu.','à','Voltar a + a cidade especificada por oração adjetiva produz à.'],
 ['A viatura retornou ___ base ao término da operação.','à','Retornar a + a base determinada: ocorre fusão de preposição e artigo.'],
 ['O instrutor se referiu ___ norma publicada ontem.','à','Referir-se a + a norma definida exige crase.'],
 ['Fizemos referência ___ legislação estadual.','à','Referência a + a legislação admite a contração à.'],
 ['O aluno assistiu ___ apresentação final do curso.','à','Assistir no sentido de presenciar exige preposição a; apresentação definida admite artigo.'],
 ['A secretaria enviou a convocação ___ candidata aprovada.','à','O destinatário feminino singular determinado é introduzido por a + a.'],
 ['O servidor obedeceu ___ determinação formal da chefia.','à','Obedecer a + a determinação definida resulta em à.'],
 ['A responsabilidade pela escala cabe ___ administração da unidade.','à','Caber a + a administração indicada determina uso de à.'],
 ['A testemunha fez alusão ___ ocorrência anterior.','à','Alusão a + a ocorrência determinada exige crase.'],
 ['O documento se destina ___ chefia imediata.','à','Destinar-se a + a chefia determinada origina à.'],
 ['O planejamento atende ___ exigência normativa prevista.','à','Atender a exigência determinada no contexto: ocorre a + a, com crase.'],
 ['O candidato ficou ___ disposição para esclarecer dúvidas.','à','À disposição é uma locução adverbial feminina de uso consagrado.'],
 ['Os agentes estudaram ___ noite para a avaliação.','à','À noite é locução adverbial feminina com crase.'],
 ['A equipe retornará ___ tarde para concluir o serviço.','à','À tarde é locução adverbial de tempo feminina.'],
 ['O veículo deve manter-se ___ direita da pista.','à','À direita é locução adverbial feminina de lugar.'],
 ['Os materiais eram conferidos ___ medida que chegavam.','à','À medida que é locução conjuntiva proporcional com crase.'],
 ['O consumo aumentava ___ proporção que crescia a demanda.','à','À proporção que é locução conjuntiva feminina.'],
 ['O instrutor começou ___ explicar o conteúdo.','a','Antes de verbo no infinitivo, não há artigo feminino: apenas a preposição.'],
 ['A turma ficou cara ___ cara depois do exercício.','a','Entre palavras repetidas em expressão como cara a cara, não se usa crase.'],
 ['A equipe decidiu voltar ___ pé após o treino.','a','Pé é substantivo masculino; não há artigo feminino.'],
 ['O equipamento foi colocado ___ cem metros do portão.','a','A locução indica distância não especificada por substantivo feminino.'],
 ['A comissão comunicou a decisão ___ todos os candidatos.','a','Todos é pronome masculino plural; não se usa artigo feminino.'],
 ['O evento começará daqui ___ dez minutos.','a','Daqui a indica tempo futuro; não há artigo feminino.'],
 ['As aulas terminaram ___ dez horas da manhã.','às','Indicação definida das horas: a preposição se funde ao artigo feminino plural.'],
 ['O encontro foi marcado para ___ duas horas da tarde.','as','Depois da preposição para, usa-se apenas o artigo as: para as duas horas, sem crase.'],
 ['As equipes saíram ___ oito horas em ponto.','às','As horas determinadas exigem às depois da preposição a.'],
 ['A reunião ocorrerá ___ três horas.','às','A indicação de horário definido usa às.'],
 ['A coordenação deu atenção ___ necessidades dos alunos.','às','Atenção a + as necessidades determinadas produz às.'],
 ['Prestamos apoio ___ famílias afetadas pela chuva.','às','Apoio a + as famílias determinadas exige às.'],
 ['O documento foi encaminhado ___ unidades regionais responsáveis.','às','Encaminhar a + as unidades determinadas: às.'],
 ['As instruções foram enviadas ___ equipes participantes.','às','Enviar a + as equipes determinadas: às.']
 ];
 const optionsA=['Oxítona acentuada pela terminação.','Paroxítona acentuada pela terminação.','Proparoxítona: todas são acentuadas.','Hiato com i ou u tônico, conforme a regra.'];
 const optionsCrase=['a','à','às','as'];
 const result=[];const subject='Português';
 function emit(topic,stem,options,answer,explanation){
  const k=result.length+1,r=(k*3)%4,o=options.slice(r).concat(options.slice(0,r));
  const idx=o.indexOf(answer);
  if(idx<0)throw Error('Not found '+answer);
  result.push({id:'FP27-QP2-'+String(k).padStart(4,'0'),subject,topic,stem,options:o,answer:idx,explanation,origin:'autoral',source_label:'Autoral · Revisão de acentuação e crase 2026',review_status:'revisao_editorial',difficulty:'Média',is_active:true});
 }
 for(let i=0;i<words.length;i++){
  const [word,type,split,rule]=words[i];
  const stem=[
   `Na grafia de “${word}”, qual regra explica a presença do acento gráfico?`,
   `Ao revisar uma redação, qual justificativa correta mantém o acento em “${word}”?`,
   `Sobre a acentuação da palavra “${word}”, identifique a explicação normativa correta.`,
   `A palavra “${word}” está corretamente acentuada porque se aplica qual regra?`
  ][i%4];
  const label={ox:optionsA[0],par:optionsA[1],pro:optionsA[2],hi:optionsA[3]}[type];
  emit('Acentuação',stem,optionsA,label,`A divisão ${split} mostra que “${word}” segue a regra de ${rule}. A classificação não depende apenas de haver acento na palavra.`);
 }
 for(let i=0;i<crases.length;i++){
  const [frase,answer,explain]=crases[i];
  emit('Crase',`Assinale a forma adequada para completar a frase, segundo a norma-padrão: “${frase}”`,optionsCrase,answer,`${explain} A lacuna deve ser preenchida por “${answer}”.`);
 }
 return {questions:result,countByTopic:{Acentuação:words.length,Crase:crases.length}};
};
module.exports=buildPortuguese50;
