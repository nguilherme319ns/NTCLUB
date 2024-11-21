'use client'

import Pagina from "@/app/components/Pagina"
import FuncionarioValidator from "@/validators/FuncionarioValidator"
import { Formik } from "formik"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button, Card, Col, Form, Row } from "react-bootstrap"
import { FaCheck } from "react-icons/fa"
import { MdOutlineArrowBack } from "react-icons/md"
import { mask } from "remask"
import { v4 } from "uuid"

export default function Page({ params }) {
    const route = useRouter()
    const funcionariosParque = JSON.parse(localStorage.getItem('funcionariosParque')) || []
    const funcionario = funcionariosParque.find(item => item.id === params.id?.[0]) || {
        nome: '',
        email: '',
        telefone: '',
        cpf: '',
        cargo: '',
        salario: '',
        data_contratacao: ''
    }

    function salvar(dados) {
        if (params.id) {
            const index = funcionariosParque.findIndex(item => item.id === params.id[0])
            funcionariosParque[index] = { ...funcionariosParque[index], ...dados }
        } else {
            dados.id = v4()
            funcionariosParque.push(dados)
        }

        localStorage.setItem('funcionariosParque', JSON.stringify(funcionariosParque))
        route.push('/funcionariosParque')
    }

    return (
        <Pagina titulo={params.id ? "Alterar Funcionário do Parque" : "Novo Funcionário do Parque"}>
            <Card className="border-0 shadow-sm">
                <Card.Body>
                    <Formik
                        initialValues={funcionario}
                        onSubmit={values => salvar(values)}
                        validationSchema={FuncionarioValidator}
                    >
                        {({ values, handleChange, handleSubmit, errors, touched, setFieldValue }) => (
                            <Form>
                                <Row>
                                    <Col md={6}>
                                        <Form.Group className="mb-3" controlId="nome">
                                            <Form.Label className="fw-bold">Nome do Funcionário:</Form.Label>
                                            <Form.Control
                                                isInvalid={errors.nome && touched.nome}
                                                type="text"
                                                name="nome"
                                                value={values.nome}
                                                onChange={handleChange}
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                {errors.nome}
                                            </Form.Control.Feedback>
                                        </Form.Group>

                                        <Form.Group className="mb-3" controlId="cpf">
                                            <Form.Label className="fw-bold">CPF:</Form.Label>
                                            <Form.Control
                                                isInvalid={errors.cpf && touched.cpf}
                                                type="text"
                                                name="cpf"
                                                value={values.cpf}
                                                onChange={(e) => {
                                                    setFieldValue('cpf', mask(e.target.value, '999.999.999-99'))
                                                }}
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                {errors.cpf}
                                            </Form.Control.Feedback>
                                        </Form.Group>

                                        <Form.Group className="mb-3" controlId="email">
                                            <Form.Label className="fw-bold">Email:</Form.Label>
                                            <Form.Control
                                                isInvalid={errors.email && touched.email}
                                                type="email"
                                                name="email"
                                                value={values.email}
                                                onChange={handleChange}
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                {errors.email}
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                    </Col>

                                    <Col md={6}>
                                        <Form.Group className="mb-3" controlId="telefone">
                                            <Form.Label className="fw-bold">Telefone:</Form.Label>
                                            <Form.Control
                                                isInvalid={errors.telefone && touched.telefone}
                                                type="text"
                                                name="telefone"
                                                value={values.telefone}
                                                onChange={(e) => {
                                                    setFieldValue('telefone', mask(e.target.value, '(99) 99999-9999'))
                                                }}
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                {errors.telefone}
                                            </Form.Control.Feedback>
                                        </Form.Group>

                                        <Form.Group className="mb-3" controlId="cargo">
                                            <Form.Label className="fw-bold">Cargo:</Form.Label>
                                            <Form.Select
                                                isInvalid={errors.cargo && touched.cargo}
                                                name="cargo"
                                                value={values.cargo}
                                                onChange={handleChange}
                                            >
                                                <option value="">Selecione o cargo...</option>
                                                <option value="Atendente">Atendente</option>
                                                <option value="Salva-vidas">Salva-vidas</option>
                                                <option value="Manutenção">Manutenção</option>
                                                <option value="Operador de Atrações">Operador de Atrações</option>
                                                <option value="Segurança">Segurança</option>
                                                <option value="Gerente">Gerente</option>
                                            </Form.Select>
                                            <Form.Control.Feedback type="invalid">
                                                {errors.cargo}
                                            </Form.Control.Feedback>
                                        </Form.Group>

                                        <Form.Group className="mb-3" controlId="salario">
                                            <Form.Label className="fw-bold">Salário:</Form.Label>
                                            <Form.Control
                                                isInvalid={errors.salario && touched.salario}
                                                type="text"
                                                name="salario"
                                                value={values.salario}
                                                onChange={(e) => {
                                                    const value = e.target.value.replace(/\D/g, '')
                                                    setFieldValue('salario', value)
                                                }}
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                {errors.salario}
                                            </Form.Control.Feedback>
                                        </Form.Group>

                                        <Form.Group className="mb-3" controlId="data_contratacao">
                                            <Form.Label className="fw-bold">Data de Contratação:</Form.Label>
                                            <Form.Control
                                                isInvalid={errors.data_contratacao && touched.data_contratacao}
                                                type="date"
                                                name="data_contratacao"
                                                value={values.data_contratacao}
                                                onChange={handleChange}
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                {errors.data_contratacao}
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                    </Col>
                                </Row>

                                <div className="text-center mt-4">
                                    <Button onClick={handleSubmit} variant="dark" className="me-2 px-4">
                                        <FaCheck className="me-2" /> Salvar
                                    </Button>
                                    <Link href="/funcionariosParque" className="btn btn-outline-dark px-4">
                                        <MdOutlineArrowBack className="me-2" /> Voltar
                                    </Link>
                                </div>
                            </Form>
                        )}
                    </Formik>
                </Card.Body>
            </Card>
        </Pagina>
    )
}
