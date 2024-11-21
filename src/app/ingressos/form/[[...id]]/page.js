'use client'

import Pagina from "@/app/components/Pagina"
import IngressoValidator from "@/validators/IngressoValidator"
import { Formik } from "formik"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { Button, Card, Col, Form, Row } from "react-bootstrap"
import { FaCheck } from "react-icons/fa"
import { MdOutlineArrowBack } from "react-icons/md"
import { v4 } from "uuid"

export default function Page({ params }) {
    const route = useRouter()
    const [visitantes, setVisitantes] = useState([])
    const [atracoes, setAtracoes] = useState([])

    const ingressos = JSON.parse(localStorage.getItem('ingressos')) || []
    const ingresso = ingressos.find(item => item.id === params.id?.[0]) || {
        visitante_id: '',
        atracao_id: '',
        data_entrada: '',
        data_saida: '',
        observacoes: ''
    }

    useEffect(() => {
        setVisitantes(JSON.parse(localStorage.getItem('visitantes')) || [])
        setAtracoes(JSON.parse(localStorage.getItem('atracoes')) || [])
    }, [])

    function salvar(dados) {
        if (params.id) {
            const index = ingressos.findIndex(item => item.id === params.id[0])
            ingressos[index] = { ...ingressos[index], ...dados }
        } else {
            dados.id = v4()
            ingressos.push(dados)

            // Atualiza o status da atração para "ocupado"
            const atracoes = JSON.parse(localStorage.getItem('atracoes')) || []
            const atracaoIndex = atracoes.findIndex(a => a.id === dados.atracao_id)
            if (atracaoIndex >= 0) {
                atracoes[atracaoIndex].ocupado = true
                localStorage.setItem('atracoes', JSON.stringify(atracoes))
            }
        }

        localStorage.setItem('ingressos', JSON.stringify(ingressos))
        route.push('/ingressos')
    }

    return (
        <Pagina titulo={params.id ? "Alterar Ingresso" : "Novo Ingresso"}>
            <Card className="border-0 shadow-sm">
                <Card.Body>
                    <Formik
                        initialValues={ingresso}
                        onSubmit={values => salvar(values)}
                        validationSchema={IngressoValidator}
                    >
                        {({ values, handleChange, handleSubmit, errors, touched }) => (
                            <Form>
                                <Row>
                                    <Col md={6}>
                                        <Form.Group className="mb-3" controlId="visitante_id">
                                            <Form.Label className="fw-bold">Visitante:</Form.Label>
                                            <Form.Select
                                                isInvalid={errors.visitante_id && touched.visitante_id}
                                                name="visitante_id"
                                                value={values.visitante_id}
                                                onChange={handleChange}
                                            >
                                                <option value="">Selecione o visitante...</option>
                                                {visitantes.map(visitante => (
                                                    <option key={visitante.id} value={visitante.id}>
                                                        {visitante.nome}
                                                    </option>
                                                ))}
                                            </Form.Select>
                                            <Form.Control.Feedback type="invalid">
                                                {errors.visitante_id}
                                            </Form.Control.Feedback>
                                        </Form.Group>

                                        <Form.Group className="mb-3" controlId="atracao_id">
                                            <Form.Label className="fw-bold">Atração:</Form.Label>
                                            <Form.Select
                                                isInvalid={errors.atracao_id && touched.atracao_id}
                                                name="atracao_id"
                                                value={values.atracao_id}
                                                onChange={handleChange}
                                            >
                                                <option value="">Selecione a atração...</option>
                                                {atracoes
                                                    .filter(atracao => !atracao.ocupado || atracao.id === values.atracao_id)
                                                    .map(atracao => (
                                                        <option key={atracao.id} value={atracao.id}>
                                                            {atracao.nome} - {atracao.tipo}
                                                        </option>
                                                    ))}
                                            </Form.Select>
                                            <Form.Control.Feedback type="invalid">
                                                {errors.atracao_id}
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                    </Col>

                                    <Col md={6}>
                                        <Form.Group className="mb-3" controlId="data_entrada">
                                            <Form.Label className="fw-bold">Data de Entrada:</Form.Label>
                                            <Form.Control
                                                isInvalid={errors.data_entrada && touched.data_entrada}
                                                type="date"
                                                name="data_entrada"
                                                value={values.data_entrada}
                                                onChange={handleChange}
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                {errors.data_entrada}
                                            </Form.Control.Feedback>
                                        </Form.Group>

                                        <Form.Group className="mb-3" controlId="data_saida">
                                            <Form.Label className="fw-bold">Data de Saída:</Form.Label>
                                            <Form.Control
                                                isInvalid={errors.data_saida && touched.data_saida}
                                                type="date"
                                                name="data_saida"
                                                value={values.data_saida}
                                                onChange={handleChange}
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                {errors.data_saida}
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                    </Col>

                                    <Col md={12}>
                                        <Form.Group className="mb-3" controlId="observacoes">
                                            <Form.Label className="fw-bold">Observações:</Form.Label>
                                            <Form.Control
                                                as="textarea"
                                                rows={3}
                                                name="observacoes"
                                                value={values.observacoes}
                                                onChange={handleChange}
                                            />
                                        </Form.Group>
                                    </Col>
                                </Row>

                                <div className="text-center mt-4">
                                    <Button onClick={handleSubmit} variant="dark" className="me-2 px-4">
                                        <FaCheck className="me-2" /> Salvar
                                    </Button>
                                    <Link href="/ingressos" className="btn btn-outline-dark px-4">
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
