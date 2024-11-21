import * as Yup from 'yup'

const IngressoValidator = Yup.object().shape({
    visitante_id: Yup.string()
        .required('Selecione um visitante'),

    atracao_id: Yup.string()
        .required('Selecione uma atração'),

    data_entrada: Yup.date()
        .required('A data de entrada é obrigatória')
        .min(new Date(), 'A data de entrada não pode ser no passado'),

    data_saida: Yup.date()
        .required('A data de saída é obrigatória')
        .min(Yup.ref('data_entrada'), 'A data de saída deve ser após a data de entrada'),

    observacoes: Yup.string()
        .max(500, 'As observações podem ter no máximo 500 caracteres'),
})

export default IngressoValidator
