import * as Yup from 'yup'

const VisitanteValidator = Yup.object().shape({
    nome: Yup.string()
        .min(3, 'Nome muito curto')
        .required('Campo obrigatório'),
    
    cpf: Yup.string()
        .min(14, 'CPF incompleto')
        .max(14, 'CPF inválido')
        .required('Campo obrigatório'),
    
    email: Yup.string()
        .email('Email inválido')
        .required('Campo obrigatório'),
    
    telefone: Yup.string()
        .min(15, 'Telefone incompleto')
        .max(15, 'Telefone inválido')
        .required('Campo obrigatório'),
    
    endereco: Yup.string()
        .min(5, 'Endereço muito curto')
        .required('Campo obrigatório'),
    
    cidade: Yup.string()
        .min(3, 'Cidade muito curta')
        .required('Campo obrigatório'),
    
    estado: Yup.string()
        .min(2, 'Estado inválido')
        .max(2, 'Use a sigla do estado')
        .required('Campo obrigatório'),
    
    cep: Yup.string()
        .min(9, 'CEP incompleto')
        .max(9, 'CEP inválido')
        .required('Campo obrigatório'),
    
    data_nascimento: Yup.date()
        .max(new Date(), 'Data não pode ser futura')
        .required('Campo obrigatório')
})

export default VisitanteValidator
