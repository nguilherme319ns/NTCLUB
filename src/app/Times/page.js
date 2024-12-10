'use client'

import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { Button, Card, Col, Row } from 'react-bootstrap'
import { FaFootballBall, FaEdit, FaTrash, FaPlus } from 'react-icons/fa'
import Pagina from '../components/Pagina'
import Swal from 'sweetalert2'

export default function Times() {
    const [times, setTimes] = useState([])

    useEffect(() => {
        setTimes(JSON.parse(localStorage.getItem('Times')) || [])  // Alterado para 'Times' com 'T' maiúsculo
    }, [])

    function excluir(id) {
        Swal.fire({
            title: "Tem certeza?",
            text: "Não será possível reverter esta ação!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Sim, excluir!",
            cancelButtonText: "Cancelar"
        }).then((result) => {
            if (result.isConfirmed) {
                const timesAtualizados = times.filter(item => item.id !== id)
                localStorage.setItem('Times', JSON.stringify(timesAtualizados))  // Alterado para 'Times' com 'T' maiúsculo
                setTimes(timesAtualizados)

                Swal.fire({
                    title: "Excluído!",
                    text: "O time foi excluído com sucesso.",
                    icon: "success"
                })
            }
        })
    }

    return (
        <Pagina titulo="Times de Futebol">
            <Link href="/times/form" className="btn btn-info mb-3">
                <FaPlus className="me-2" /> Novo Time
            </Link>

            <Row>
                {times.map((item) => (
                    <Col key={item.id} md={4} className="mb-4">
                        <Card className="h-100 shadow-sm border-0">
                            <Card.Header className="bg-info text-white py-3">
                                <div className="d-flex justify-content-between align-items-center">
                                    <h5 className="mb-0">
                                        <FaFootballBall className="me-2" />
                                        {item.nomeTime}
                                    </h5>
                                    <div>
                                        <Link href={'/times/form/' + item.id} className="btn btn-outline-light btn-sm me-2">
                                            <FaEdit className="me-1" /> Editar
                                        </Link>
                                        <Button variant="outline-light" size="sm" onClick={() => excluir(item.id)}>
                                            <FaTrash className="me-1" /> Excluir
                                        </Button>
                                    </div>
                                </div>
                            </Card.Header>
                            <Card.Body>
                                <p className="mb-2"><strong>Técnico:</strong> {item.tecnico}</p>
                                <p className="mb-2"><strong>Estadio:</strong> {item.estadio}</p>
                                <p className="mb-2"><strong>Cidade:</strong> {item.cidade}</p>
                                <p className="mb-2"><strong>Estado:</strong> {item.estado}</p>
                                <p className="mb-0"><strong>Jogadores:</strong> {item.jogadores}</p>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Pagina>
    )
}
