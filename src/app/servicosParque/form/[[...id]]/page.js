'use client'

import Pagina from "@/app/components/Pagina"
import ServicoParqueValidator from "@/validators/ServicoParqueValidator"
import { Formik } from "formik"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button, Card, Col, Form, Row } from "react-bootstrap"
import { FaCheck, FaUmbrellaBeach, FaSwimmer, FaConciergeBell, FaHotTub, FaClock } from "react-icons/fa"
import { MdOutlineArrowBack } from "react-icons/md"
import { v4 } from "uuid"
import { useEffect, useState } from "react"

export default function Page({ params }) {
    const route = useRouter()
    const [servicosParque, setServicosParque] = useState([])

    // Carrega os serviços do localStorage no lado do cliente
    useEffect(() => {
        const storedServicos = JSON.parse(localStorage.getItem('servicosParque')) || []
        setServicosParque(storedServicos)
    }, [])

    const servico = servicosParque.find(item => item.id === params.id?.[0]) || {
        nome: '',
        descricao: '',
        preco: '',
        duracao: '',
        disponibilidade: '',
        categoria: ''
    }

    function salvar(dados) {
        const atualizados = params.id
            ? servicosParque.map(item => item.id === params.id[0] ? { ...item, ...dados } : item)
            : [...servicosParque, { ...dados, id: v4() }]

        setServicosParque(atualizados)
        localStorage.setItem('servicosParque', JSON.stringify(atualizados))
        route.push('/servicosParque')
    }

    return (
        <Pagina titulo={params.id ? "Alterar Serviço do Parque Aquático" : "Novo Serviço do Parque Aquático"}>
            <Card className="border-0 shadow-sm bg-light">
                <Card.Body>
                    <Formik
                        initialValues={servico}
                        onSubmit={values => salvar(values)}
                        validationSchema={ServicoParqueValidator}
                    >
                        {({ values, handleChange, handleSubmit, errors, touched, setFieldValue }) => (
                            <Form>
                                <Row>
                                    <Col md={6}>
                                        <Form.Group className="mb-3" controlId="nome">
                                            <Form.Label className="fw-bold text-primary">
                                                <FaUmbrellaBeach className="me-2" />
                                                Nome do Serviço:
                                            </Form.Label>
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

                                        <Form.Group className="mb-3" controlId="descricao">
                                            <Form.Label className="fw-bold text-primary">
                                                <FaConciergeBell className="me-2" />
                                                Descrição:
                                            </Form.Label>
                                            <Form.Control
                                                isInvalid={errors.descricao && touched.descricao}
                                                as="textarea"
                                                rows={3}
                                                name="descricao"
                                                value={values.descricao}
                                                onChange={handleChange}
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                {errors.descricao}
                                            </Form.Control.Feedback>
                                        </Form.Group>

                                     
                                    </Col>

                                    <Col md={6}>
                                        <Form.Group className="mb-3" controlId="preco">
                                            <Form.Label className="fw-bold text-primary">
                                                <FaHotTub className="me-2" />
                                                Preço (R$):
                                            </Form.Label>
                                            <Form.Control
                                                isInvalid={errors.preco && touched.preco}
                                                type="text"
                                                name="preco"
                                                value={values.preco}
                                                onChange={(e) => {
                                                    const value = e.target.value.replace(/\D/g, '')
                                                    setFieldValue('preco', value)
                                                }}
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                {errors.preco}
                                            </Form.Control.Feedback>
                                        </Form.Group>

                                        <Form.Group className="mb-3" controlId="duracao">
                                            <Form.Label className="fw-bold text-primary">
                                                <FaClock className="me-2" />
                                                Duração:
                                            </Form.Label>
                                            <Form.Control
                                                isInvalid={errors.duracao && touched.duracao}
                                                type="number"
                                                name="duracao"
                                                value={values.duracao}
                                                onChange={handleChange}
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                {errors.duracao}
                                            </Form.Control.Feedback>
                                        </Form.Group>

                                        <Form.Group className="mb-3" controlId="disponibilidade">
                                            <Form.Label className="fw-bold text-primary">
                                                Disponibilidade:
                                            </Form.Label>
                                            <Form.Select
                                                isInvalid={errors.disponibilidade && touched.disponibilidade}
                                                name="disponibilidade"
                                                value={values.disponibilidade}
                                                onChange={handleChange}
                                            >
                                                <option value="">Selecione a disponibilidade...</option>
                                                <option value="24 horas">24 horas</option>
                                                <option value="Diurno">Diurno</option>
                                                <option value="Noturno">Noturno</option>
                                                <option value="Sob Agendamento">Sob Agendamento</option>
                                            </Form.Select>
                                            <Form.Control.Feedback type="invalid">
                                                {errors.disponibilidade}
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                    </Col>
                                </Row>

                                <div className="text-center mt-4">
                                    <Button onClick={handleSubmit} variant="primary" className="me-2 px-4">
                                        <FaCheck className="me-2" /> Salvar
                                    </Button>
                                    <Link href="/servicosParque" className="btn btn-outline-primary px-4">
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
