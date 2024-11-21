import * as Yup from 'yup'

const AtracaoValidator = Yup.object().shape({
    nome: Yup.string()
        .required('O nome da atração é obrigatório')
        .min(3, 'O nome deve ter pelo menos 3 caracteres')
        .max(100, 'O nome pode ter no máximo 100 caracteres'),

    tipo: Yup.string()
        .required('O tipo de atração é obrigatório')
        .oneOf(['Piscina', 'Toboágua', 'Espaço Infantil', 'Jacuzzi', 'Rio Lento'], 'Tipo de atração inválido'),

    capacidade: Yup.number()
        .required('A capacidade é obrigatória')
        .min(1, 'A capacidade mínima é 1 pessoa')
        .max(50, 'A capacidade máxima é 50 pessoas'),

    ocupado: Yup.boolean()
        .required('O status de ocupação é obrigatório'),
})

export default AtracaoValidator
