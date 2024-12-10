'use client'

import Pagina from "@/app/components/Pagina"
import { Formik } from "formik"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button, Card, Col, Form, Row } from "react-bootstrap"
import { FaCheck } from "react-icons/fa"
import { MdOutlineArrowBack } from "react-icons/md"
import { v4 } from "uuid"
import { useEffect, useState } from "react"
import apiLocalidade from "@/services/ApiLocalidade"
import TimeValidator from "@/validators/TimeValidator" // Crie um validador para o time (adapte conforme necessário)
import { mask } from 'remask'  // Importe a função mask da biblioteca remask

export default function Page({ params }) {
    const route = useRouter()
    const times = JSON.parse(localStorage.getItem('Times')) || []  // Alterado para 'Times' com 'T' maiúsculo
    const time = times.find(item => item.id === params.id?.[0]) || {
        nomeTime: '',
        tecnico: '',
        cidade: '',
        estado: '',
        estadio: '', // Alterado para estádio
        jogadores: '',
        data_criacao: '' // Adicionando campo para data de criação
    }

    const [estados, setEstados] = useState([])
    const [cidades, setCidades] = useState([])

    useEffect(() => {
        apiLocalidade.get('estados?orderBy=nome').then(response => {
            setEstados(response.data)
        })
    }, [])

    useEffect(() => {
        if (time.estado) {
            apiLocalidade.get(`estados/${time.estado}/municipios`).then(response => {
                setCidades(response.data)
            })
        }
    }, [time.estado])

    function salvar(dados) {
        if (params.id) {
            const index = times.findIndex(item => item.id === params.id[0])
            times[index] = { ...times[index], ...dados }
        } else {
            dados.id = v4()
            times.push(dados)
        }

        localStorage.setItem('Times', JSON.stringify(times))  // Alterado para 'Times' com 'T' maiúsculo
        route.push('/times')
    }

    return (
        <Pagina titulo={params.id ? "Alterar Time" : "Novo Time"}>
            <Card className="border-0 shadow-sm">
                <Card.Body>
                    <Formik
                        initialValues={time}
                        onSubmit={values => salvar(values)}
                        
                    >
                        {({ values, handleChange, handleSubmit, errors, touched, setFieldValue }) => (
                            <Form>
                                <Row>
                                    <Col md={6}>
                                        <Form.Group className="mb-3" controlId="nomeTime">
                                            <Form.Label className="fw-bold">Nome do Time:</Form.Label>
                                            <Form.Control
                                                isInvalid={errors.nomeTime && touched.nomeTime}
                                                type="text"
                                                name="nomeTime"
                                                value={values.nomeTime}
                                                onChange={handleChange}
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                {errors.nomeTime}
                                            </Form.Control.Feedback>
                                        </Form.Group>

                                        <Form.Group className="mb-3" controlId="tecnico">
                                            <Form.Label className="fw-bold">Técnico:</Form.Label>
                                            <Form.Control
                                                isInvalid={errors.tecnico && touched.tecnico}
                                                type="text"
                                                name="tecnico"
                                                value={values.tecnico}
                                                onChange={handleChange}
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                {errors.tecnico}
                                            </Form.Control.Feedback>
                                        </Form.Group>

                                        {/* Alterado para Estádio */}
                                        <Form.Group className="mb-3" controlId="estadio">
                                            <Form.Label className="fw-bold">Estádio:</Form.Label>
                                            <Form.Control
                                                isInvalid={errors.estadio && touched.estadio}
                                                type="text"
                                                name="estadio"
                                                value={values.estadio}
                                                onChange={handleChange}
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                {errors.estadio}
                                            </Form.Control.Feedback>
                                        </Form.Group>

                                        <Form.Group className="mb-3" controlId="jogadores">
                                            <Form.Label className="fw-bold">Jogadores:</Form.Label>
                                            <Form.Control
                                                isInvalid={errors.jogadores && touched.jogadores}
                                                type="text"
                                                name="jogadores"
                                                value={values.jogadores}
                                                onChange={handleChange}
                                                placeholder="Nome dos jogadores separados por vírgula"
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                {errors.jogadores}
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                    </Col>

                                    <Col md={6}>
                                        {/* Máscara para o campo Estado (UF) */}
                                        <Form.Group className="mb-3" controlId="estado">
                                            <Form.Label className="fw-bold">Estado (UF):</Form.Label>
                                            <Form.Control
                                                isInvalid={errors.estado && touched.estado}
                                                type="text"
                                                name="estado"
                                                value={values.estado}
                                                onChange={(e) => {
                                                    const estadoId = e.target.value
                                                    setFieldValue('estado', mask(estadoId, 'AA')) // Máscara para o UF (2 letras)
                                                    setFieldValue('cidade', '')
                                                    apiLocalidade.get(`estados/${estadoId}/municipios`).then(response => {
                                                        setCidades(response.data)
                                                    })
                                                }}
                                            />
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

                                        {/* Máscara para o campo Data de Criação */}
                                        <Form.Group className="mb-3" controlId="data_criacao">
                                            <Form.Label className="fw-bold">Data de Criação:</Form.Label>
                                            <Form.Control
                                                isInvalid={errors.data_criacao && touched.data_criacao}
                                                type="text"
                                                name="data_criacao"
                                                value={values.data_criacao}
                                                onChange={(e) => {
                                                    setFieldValue('data_criacao', mask(e.target.value, '99/99/9999')) // Máscara para a data
                                                }}
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                {errors.data_criacao}
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                    </Col>
                                </Row>

                                <div className="text-center mt-4">
                                    <Button onClick={handleSubmit} variant="dark" className="me-2 px-4">
                                        <FaCheck className="me-2" /> Salvar
                                    </Button>
                                    <Link href="/times" className="btn btn-outline-dark px-4">
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
