import * as Yup from 'yup';

const TimeValidator = Yup.object({
  nomeTime: Yup.string().required('Nome do time é obrigatório'),
  tecnico: Yup.string().required('Técnico é obrigatório'),
  campeonato: Yup.string().required('Campeonato é obrigatório'),
  jogadores: Yup.string().required('Jogadores é obrigatório'),
  estado: Yup.string()
    .length(2, 'Estado (UF) deve ter exatamente 2 caracteres')
    .matches(/^[A-Za-z]{2}$/, 'Estado (UF) deve conter apenas letras')
    .required('Estado (UF) é obrigatório'),
  cidade: Yup.string().required('Cidade é obrigatória'),
  data_criacao: Yup.string()
    .matches(/^\d{2}\/\d{2}\/\d{4}$/, 'Data de criação inválida')
    .required('Data de criação é obrigatória'),
});

export default TimeValidator;
