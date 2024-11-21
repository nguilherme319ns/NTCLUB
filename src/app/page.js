'use client'

import React, { useEffect, useState } from 'react'
import { Card, Col, Row, Carousel } from 'react-bootstrap'
import { FaWater, FaSwimmer, FaTicketAlt, FaPercent } from 'react-icons/fa'
import Pagina from './components/Pagina'
import './Home.css' // Adicione este arquivo CSS para estilos personalizados

export default function Home() {
    const [stats, setStats] = useState({
        atracoesDisponiveis: 0,
        atracoesOcupadas: 0,
        totalAtracoes: 0,
        totalVisitantes: 0,
        totalIngressos: 0,
        taxaOcupacao: 0
    })

    useEffect(() => {
        const atracoes = JSON.parse(localStorage.getItem('atracoes')) || []
        const visitantes = JSON.parse(localStorage.getItem('visitantes')) || []
        const ingressos = JSON.parse(localStorage.getItem('ingressos')) || []

        const atracoesDisponiveis = atracoes.filter(a => !a.ocupado).length
        const atracoesOcupadas = atracoes.filter(a => a.ocupado).length
        const totalAtracoes = atracoes.length

        setStats({
            atracoesDisponiveis,
            atracoesOcupadas,
            totalAtracoes,
            totalVisitantes: visitantes.length,
            totalIngressos: ingressos.length,
            taxaOcupacao: totalAtracoes ? ((atracoesOcupadas / totalAtracoes) * 100).toFixed(0) : 0
        })
    }, [])

    return (
        <div className="aquatic-bg"> {/* Adicionando a classe do fundo */}
            <Pagina titulo="NTCLUB - Dashboard">
                {/* Carrossel de Imagens */}
                <Row className="mb-4">
                    <Col md={12}>
                        <Carousel>
                            <Carousel.Item>
                                <img
                                    className="d-block w-100"
                                    src="https://dynamic-media-cdn.tripadvisor.com/media/photo-o/13/d5/68/50/a-maior-praia-de-artificial.jpg?w=1200&h=-1&s=1"
                                    alt="Piscina 1"
                                />
                                <Carousel.Caption>
                                    <h5>Piscina de Ondas CALMDOWN</h5>
                                    <p>Atração para todas as idades.</p>
                                </Carousel.Caption>
                            </Carousel.Item>
                            <Carousel.Item>
                                <img
                                    className="d-block w-100"
                                    src="https://v.i.uol.com.br/image/beachpark_02.jpg"
                                    alt="Toboágua 1"
                                />
                                <Carousel.Caption>
                                    <h5>Toboágua Radical</h5>
                                    <p>Adrenalina garantida!</p>
                                </Carousel.Caption>
                            </Carousel.Item>
                            <Carousel.Item>
                                <img
                                    className="d-block w-100"
                                    src="https://www.melhoresdestinos.com.br/wp-content/uploads/2021/12/beach-park-fortaleza-acqua-show-1-scaled.jpg"
                                    alt="Piscina Infantil"
                                />
                                <Carousel.Caption>
                                    <h5>Piscina Infantil</h5>
                                    <p>Segurança e diversão para os pequenos.</p>
                                </Carousel.Caption>
                            </Carousel.Item>
                            <Carousel.Item>
                                <img
                                    className="d-block w-100"
                                    src="https://beachpark.com.br/app/uploads/2024/05/Internas-de-Atracoes-Insano-OP.jpg"
                                    alt="Insano"
                                />
                                <Carousel.Caption>
                                    <h5>Insano</h5>
                                    <p>Para quem so se mete em furada</p>
                                </Carousel.Caption>
                            </Carousel.Item>
                            <Carousel.Item>
                                <img
                                    className="d-block w-100"
                                    src="https://odypark.com.br/parque-aquatico/wp-content/uploads/sites/2/2020/08/Familia-no-Rio-Lento.jpg"
                                    alt="Rio lento"
                                />
                                <Carousel.Caption>
                                    <h5>Rio Lento</h5>
                                    <p>Curta Tranquilo</p>
                                </Carousel.Caption>
                            </Carousel.Item>
                            <Carousel.Item>
                                <img
                                    className="d-block w-100"
                                    src="https://wamparks.com.br/wp-content/uploads/2023/11/bar-molhado_slide.png"
                                    alt="Piscina com Bar Molhado"
                                />
                                <Carousel.Caption>
                                    <h5>Piscina com Bar Molhado</h5>
                                    <p>Desfrute de bebidas refrescantes sem sair da água.</p>
                                </Carousel.Caption>
                            </Carousel.Item>
                        </Carousel>
                    </Col>
                </Row>

                {/* Cards Estatísticos */}
                <Row>
                    <Col md={3} className="mb-4">
                        <Card className="h-100 shadow-sm border-0">
                            <Card.Body>
                                <div className="d-flex align-items-center">
                                    <div className="rounded-circle bg-success bg-opacity-10 p-3">
                                        <FaWater className="fs-1 text-success" />
                                    </div>
                                    <div className="ms-3">
                                        <h6 className="mb-1">Piscinas Disponíveis</h6>
                                        <h4 className="mb-0">{stats.atracoesDisponiveis}</h4>
                                    </div>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>

                    <Col md={3} className="mb-4">
                        <Card className="h-100 shadow-sm border-0">
                            <Card.Body>
                                <div className="d-flex align-items-center">
                                    <div className="rounded-circle bg-danger bg-opacity-10 p-3">
                                        <FaSwimmer className="fs-1 text-danger" />
                                    </div>
                                    <div className="ms-3">
                                        <h6 className="mb-1">Piscinas em Manutenção</h6>
                                        <h4 className="mb-0">{stats.atracoesOcupadas}</h4>
                                    </div>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>

                    <Col md={3} className="mb-4">
                        <Card className="h-100 shadow-sm border-0">
                            <Card.Body>
                                <div className="d-flex align-items-center">
                                    <div className="rounded-circle bg-warning bg-opacity-10 p-3">
                                        <FaTicketAlt className="fs-1 text-warning" />
                                    </div>
                                    <div className="ms-3">
                                        <h6 className="mb-1">Ingressos Vendidos</h6>
                                        <h4 className="mb-0">{stats.totalIngressos}</h4>
                                    </div>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>

                    <Col md={3} className="mb-4">
                        <Card className="h-100 shadow-sm border-0">
                            <Card.Body>
                                <div className="d-flex align-items-center">
                                    <div className="rounded-circle bg-info bg-opacity-10 p-3">
                                        <FaPercent className="fs-1 text-info" />
                                    </div>
                                    <div className="ms-3">
                                        <h6 className="mb-1">Taxa de Ocupação</h6>
                                        <h4 className="mb-0">{stats.taxaOcupacao}%</h4>
                                    </div>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Pagina>
        </div>
    )
}
