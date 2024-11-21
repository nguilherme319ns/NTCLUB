'use client'

import Pagina from "@/app/components/Pagina"
import { Formik } from "formik"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button, Card, Col, Form, Row } from "react-bootstrap"
import { FaCheck } from "react-icons/fa"
import { MdOutlineArrowBack } from "react-icons/md"
import { mask } from "remask"
import { v4 } from "uuid"
import { useEffect, useState } from "react"
import apiLocalidade from "@/services/ApiLocalidade"
import VisitanteValidator from "@/validators/VisitanteValidator"

export default function Page({ params }) {
    const route = useRouter()
    const visitantes = JSON.parse(localStorage.getItem('visitantes')) || []
    const visitante = visitantes.find(item => item.id === params.id?.[0]) || {
        nome: '',
        email: '',
        telefone: '',
        cpf: '',
        endereco: '',
        cidade: '',
        estado: '',
        cep: '',
        data_nascimento: ''
    }

    const [estados, setEstados] = useState([])
    const [cidades, setCidades] = useState([])

    useEffect(() => {
        apiLocalidade.get('estados?orderBy=nome').then(response => {
            setEstados(response.data)
        })
    }, [])

    useEffect(() => {
        if (visitante.estado) {
            apiLocalidade.get(`estados/${visitante.estado}/municipios`).then(response => {
                setCidades(response.data)
            })
        }
    }, [visitante.estado])

    function salvar(dados) {
        if (params.id) {
            const index = visitantes.findIndex(item => item.id === params.id[0])
            visitantes[index] = { ...visitantes[index], ...dados }
        } else {
            dados.id = v4()
            visitantes.push(dados)
        }

        localStorage.setItem('visitantes', JSON.stringify(visitantes))
        route.push('/visitantes')
    }

    return (
        <Pagina titulo={params.id ? "Alterar Visitante" : "Novo Visitante"}>
            <Card className="border-0 shadow-sm">
                <Card.Body>
                    <Formik
                        initialValues={visitante}
                        onSubmit={values => salvar(values)}
                        validationSchema={VisitanteValidator}
                    >
                        {({ values, handleChange, handleSubmit, errors, touched, setFieldValue }) => (
                            <Form>
                                <Row>
                                    <Col md={6}>
                                        <Form.Group className="mb-3" controlId="nome">
                                            <Form.Label className="fw-bold">Nome:</Form.Label>
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
                                    </Col>

                                    <Col md={6}>
                                        <Form.Group className="mb-3" controlId="endereco">
                                            <Form.Label className="fw-bold">Endereço:</Form.Label>
                                            <Form.Control
                                                isInvalid={errors.endereco && touched.endereco}
                                                type="text"
                                                name="endereco"
                                                value={values.endereco}
                                                onChange={handleChange}
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                {errors.endereco}
                                            </Form.Control.Feedback>
                                        </Form.Group>

                                        <Form.Group className="mb-3" controlId="estado">
                                            <Form.Label className="fw-bold">Estado:</Form.Label>
                                            <Form.Select
                                                isInvalid={errors.estado && touched.estado}
                                                name="estado"
                                                value={values.estado}
                                                onChange={(e) => {
                                                    const estadoId = e.target.value
                                                    setFieldValue('estado', estadoId)
                                                    setFieldValue('cidade', '')
                                                    apiLocalidade.get(`estados/${estadoId}/municipios`).then(response => {
                                                        setCidades(response.data)
                                                    })
                                                }}
                                            >
                                                <option value="">Selecione o estado...</option>
                                                {estados.map(estado => (
                                                    <option key={estado.id} value={estado.id}>{estado.nome}</option>
                                                ))}
                                            </Form.Select>
                                            <Form.Control.Feedback type="invalid">
                                                {errors.estado}
                                            </Form.Control.Feedback>
                                        </Form.Group>

                                        <Form.Group className="mb-3" controlId="cidade">
                                            <Form.Label className="fw-bold">Cidade:</Form.Label>
                                            <Form.Select
                                                isInvalid={errors.cidade && touched.cidade}
                                                name="cidade"
                                                value={values.cidade}
                                                onChange={handleChange}
                                            >
                                                <option value="">Selecione a cidade...</option>
                                                {cidades.map(cidade => (
                                                    <option key={cidade.id} value={cidade.id}>{cidade.nome}</option>
                                                ))}
                                            </Form.Select>
                                            <Form.Control.Feedback type="invalid">
                                                {errors.cidade}
                                            </Form.Control.Feedback>
                                        </Form.Group>

                                        <Form.Group className="mb-3" controlId="cep">
                                            <Form.Label className="fw-bold">CEP:</Form.Label>
                                            <Form.Control
                                                isInvalid={errors.cep && touched.cep}
                                                type="text"
                                                name="cep"
                                                value={values.cep}
                                                onChange={(e) => {
                                                    setFieldValue('cep', mask(e.target.value, '99999-999'))
                                                }}
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                {errors.cep}
                                            </Form.Control.Feedback>
                                        </Form.Group>

                                        <Form.Group className="mb-3" controlId="data_nascimento">
                                            <Form.Label className="fw-bold">Data de Nascimento:</Form.Label>
                                            <Form.Control
                                                isInvalid={errors.data_nascimento && touched.data_nascimento}
                                                type="date"
                                                name="data_nascimento"
                                                value={values.data_nascimento}
                                                onChange={handleChange}
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                {errors.data_nascimento}
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                    </Col>
                                </Row>

                                <div className="text-center mt-4">
                                    <Button onClick={handleSubmit} variant="dark" className="me-2 px-4">
                                        <FaCheck className="me-2" /> Salvar
                                    </Button>
                                    <Link href="/visitantes" className="btn btn-outline-dark px-4">
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
