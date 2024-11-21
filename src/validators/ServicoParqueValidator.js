import * as Yup from 'yup'

const ServicoParqueValidator = Yup.object().shape({
    nome: Yup.string()
        .min(3, 'O nome deve ter pelo menos 3 caracteres')
        .max(100, 'O nome pode ter no máximo 100 caracteres')
        .required('O nome é obrigatório'),

    descricao: Yup.string()
        .min(10, 'A descrição deve ter pelo menos 10 caracteres')
        .max(500, 'A descrição pode ter no máximo 500 caracteres')
        .required('A descrição é obrigatória'),

    preco: Yup.number()
        .typeError('O preço deve ser um número')
        .positive('O preço deve ser positivo')
        .required('O preço é obrigatório'),

    categoria: Yup.string()
        .oneOf(['Limpeza', 'Manutenção', 'Alimentação', 'Lazer', 'Bem-estar'], 'Categoria inválida')
        .required('A categoria é obrigatória'),
})

export default ServicoParqueValidator
