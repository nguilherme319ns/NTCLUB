'use client'

import React, { useEffect, useState } from 'react'
import { Card, Col, Row, Carousel } from 'react-bootstrap'
import { FaFutbol, FaUsers, FaTrophy, FaFlagCheckered } from 'react-icons/fa'
import Pagina from './components/Pagina'
import './Home.css' // Adicione este arquivo CSS para estilos personalizados

export default function Home() {
    const [stats, setStats] = useState({
        timesParticipantes: 0,
        jogosRealizados: 0,
        totalGols: 0,
        totalJogadores: 0,
        totalVitorias: 0,
        taxaVitoria: 0
    })

    useEffect(() => {
        const times = JSON.parse(localStorage.getItem('times')) || []
        const jogos = JSON.parse(localStorage.getItem('jogos')) || []
        const jogadores = JSON.parse(localStorage.getItem('jogadores')) || []

        const jogosRealizados = jogos.length
        const totalGols = jogos.reduce((acc, jogo) => acc + jogo.golsEquipe1 + jogo.golsEquipe2, 0)
        const totalVitorias = jogos.filter(jogo => jogo.golsEquipe1 > jogo.golsEquipe2).length // Contando vitórias de uma equipe

        setStats({
            timesParticipantes: times.length,
            jogosRealizados,
            totalGols,
            totalJogadores: jogadores.length,
            totalVitorias,
            taxaVitoria: jogosRealizados ? ((totalVitorias / jogosRealizados) * 100).toFixed(0) : 0
        })
    }, [])

    return (
        <div className="futebol-bg"> {/* Adicionando a classe do fundo */}
            <Pagina titulo="Campeonato de Futebol - Dashboard">
                {/* Carrossel de Imagens */}
                <Row className="mb-4">
                    <Col md={12}>
                        <Carousel>
                            <Carousel.Item>
                                <img
                                    className="d-block w-100"
                                    src="https://example.com/imagens/futebol1.jpg" // Substitua pelo URL das imagens do campeonato
                                    alt="Time 1"
                                />
                                <Carousel.Caption>
                                    <h5>Time A</h5>
                                    <p>Campeões do Campeonato Nacional 2023.</p>
                                </Carousel.Caption>
                            </Carousel.Item>
                            <Carousel.Item>
                                <img
                                    className="d-block w-100"
                                    src="https://example.com/imagens/futebol2.jpg"
                                    alt="Time 2"
                                />
                                <Carousel.Caption>
                                    <h5>Time B</h5>
                                    <p>Desafiando a liderança do campeonato.</p>
                                </Carousel.Caption>
                            </Carousel.Item>
                            <Carousel.Item>
                                <img
                                    className="d-block w-100"
                                    src="https://example.com/imagens/futebol3.jpg"
                                    alt="Time 3"
                                />
                                <Carousel.Caption>
                                    <h5>Time C</h5>
                                    <p>Em busca do primeiro título.</p>
                                </Carousel.Caption>
                            </Carousel.Item>
                            {/* Adicione mais itens conforme necessário */}
                        </Carousel>
                    </Col>
                </Row>

                {/* Cards Estatísticos */}
                <Row>
                    <Col md={3} className="mb-4">
                        <Card className="h-100 shadow-sm border-0">
                            <Card.Body>
                                <div className="d-flex align-items-center">
                                    <div className="rounded-circle bg-primary bg-opacity-10 p-3">
                                        <FaFutbol className="fs-1 text-primary" />
                                    </div>
                                    <div className="ms-3">
                                        <h6 className="mb-1">Times Participantes</h6>
                                        <h4 className="mb-0">{stats.timesParticipantes}</h4>
                                    </div>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>

                    <Col md={3} className="mb-4">
                        <Card className="h-100 shadow-sm border-0">
                            <Card.Body>
                                <div className="d-flex align-items-center">
                                    <div className="rounded-circle bg-success bg-opacity-10 p-3">
                                        <FaUsers className="fs-1 text-success" />
                                    </div>
                                    <div className="ms-3">
                                        <h6 className="mb-1">Jogadores no Campeonato</h6>
                                        <h4 className="mb-0">{stats.totalJogadores}</h4>
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
                                        <FaTrophy className="fs-1 text-warning" />
                                    </div>
                                    <div className="ms-3">
                                        <h6 className="mb-1">Gols Marcados</h6>
                                        <h4 className="mb-0">{stats.totalGols}</h4>
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
                                        <FaFlagCheckered className="fs-1 text-danger" />
                                    </div>
                                    <div className="ms-3">
                                        <h6 className="mb-1">Taxa de Vitórias</h6>
                                        <h4 className="mb-0">{stats.taxaVitoria}%</h4>
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
