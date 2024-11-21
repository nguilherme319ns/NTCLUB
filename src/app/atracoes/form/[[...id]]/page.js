'use client'

import Pagina from "@/app/components/Pagina"
import AtracaoValidator from "@/validators/AtracaoValidator"
import { Formik } from "formik"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button, Card, Col, Form, Row } from "react-bootstrap"
import { FaCheck } from "react-icons/fa"
import { MdOutlineArrowBack } from "react-icons/md"
import { v4 } from "uuid"

export default function Page({ params }) {
    const route = useRouter()
    const atracoes = JSON.parse(localStorage.getItem('atracoes')) || []
    const atracao = atracoes.find(item => item.id === params.id?.[0]) || {
        nome: '',
        tipo: '',
        capacidade: '',
        idade: '',
        ocupado: false,
        observacoes: ''
    }

    function salvar(dados) {
        if (params.id) {
            const index = atracoes.findIndex(item => item.id === params.id[0])
            atracoes[index] = { ...atracoes[index], ...dados }
        } else {
            dados.id = v4()
            atracoes.push(dados)
        }

        localStorage.setItem('atracoes', JSON.stringify(atracoes))
        route.push('/atracoes')
    }

    return (
        <Pagina titulo={params.id ? "Alterar Atração" : "Nova Atração"}>
            <Card className="border-0 shadow-sm">
                <Card.Body>
                    <Formik
                        initialValues={atracao}
                        onSubmit={values => salvar(values)}
                        validationSchema={AtracaoValidator}
                    >
                        {({ values, handleChange, handleSubmit, errors, touched, setFieldValue }) => (
                            <Form>
                                <Row>
                                    <Col md={6}>
                                        <Form.Group className="mb-3" controlId="nome">
                                            <Form.Label className="fw-bold">Nome da Atração:</Form.Label>
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

                                        <Form.Group className="mb-3" controlId="tipo">
                                            <Form.Label className="fw-bold">Tipo:</Form.Label>
                                            <Form.Select
                                                isInvalid={errors.tipo && touched.tipo}
                                                name="tipo"
                                                value={values.tipo}
                                                onChange={handleChange}
                                            >
                                                <option value="">Selecione o tipo...</option>
                                                <option value="Piscina">Piscina</option>
                                                <option value="Toboágua">Toboágua</option>
                                                <option value="Espaço Infantil">Espaço Infantil</option>
                                                <option value="Jacuzzi">Jacuzzi</option>
                                                <option value="Rio Lento">Rio Lento</option>
                                            </Form.Select>
                                            <Form.Control.Feedback type="invalid">
                                                {errors.tipo}
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                    </Col>

                                    <Col md={6}>
                                        <Form.Group className="mb-3" controlId="capacidade">
                                            <Form.Label className="fw-bold">Capacidade (pessoas):</Form.Label>
                                            <Form.Control
                                                isInvalid={errors.capacidade && touched.capacidade}
                                                type="number"
                                                name="capacidade"
                                                value={values.capacidade}
                                                onChange={handleChange}
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                {errors.capacidade}
                                            </Form.Control.Feedback>
                                        </Form.Group>

                                        <Form.Group className="mb-3" controlId="idade">
                                            <Form.Label className="fw-bold">Idade mínima:</Form.Label>
                                            <Form.Control
                                                isInvalid={errors.idade && touched.idade}
                                                type="text"
                                                name="idade"
                                                value={values.idade}
                                                onChange={(e) => {
                                                    const value = e.target.value.replace(/\D/g, '')
                                                    setFieldValue('idade', value)
                                                }}
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                {errors.idade}
                                            </Form.Control.Feedback>
                                        </Form.Group>

                                        <Form.Group className="mb-3" controlId="ocupado">
                                            <Form.Check
                                                type="switch"
                                                label="Atração lotada"
                                                name="ocupado"
                                                checked={values.ocupado}
                                                onChange={handleChange}
                                            />
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
                                    <Link href="/atracoes" className="btn btn-outline-dark px-4">
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
