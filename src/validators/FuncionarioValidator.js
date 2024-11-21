import * as Yup from 'yup'

const FuncionarioParqueValidator = Yup.object().shape({
    nome: Yup.string()
        .min(3, 'Nome muito curto')
        .required('Campo obrigatório'),
    cpf: Yup.string()
        .required('Campo obrigatório')
        .min(14, 'CPF inválido'),
    email: Yup.string()
        .email('Email inválido')
        .required('Campo obrigatório'),
    telefone: Yup.string()
        .required('Campo obrigatório')
        .min(14, 'Telefone inválido'),
    cargo: Yup.string()
        .required('Campo obrigatório'),
    salario: Yup.string()
        .required('Campo obrigatório'),
    data_contratacao: Yup.string()
        .required('Campo obrigatório')
})

export default FuncionarioParqueValidator
