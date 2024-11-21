'use client'

import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { Button, Card, Col, Row } from 'react-bootstrap'
import { FaEdit, FaPlus, FaTrash, FaUmbrellaBeach, FaSwimmer, FaHotTub } from 'react-icons/fa'
import Pagina from '../components/Pagina'
import Swal from 'sweetalert2'

export default function Servicos() {
    const [servicos, setServicos] = useState([])

    useEffect(() => {
        setServicos(JSON.parse(localStorage.getItem('servicosParque')) || [])
    }, [])

    function excluir(id) {
        Swal.fire({
            title: "Tem certeza?",
            text: "Esta ação não pode ser desfeita!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#007ACC",
            cancelButtonColor: "#d33",
            confirmButtonText: "Sim, excluir!",
            cancelButtonText: "Cancelar"
        }).then((result) => {
            if (result.isConfirmed) {
                const servicosAtualizados = servicos.filter(item => item.id !== id)
                localStorage.setItem('servicosParque', JSON.stringify(servicosAtualizados))
                setServicos(servicosAtualizados)

                Swal.fire({
                    title: "Excluído!",
                    text: "O serviço foi excluído com sucesso.",
                    icon: "success"
                })
            }
        })
    }

    return (
        <Pagina titulo="Serviços do Parque Aquático">
            <Link href="/servicosParque/form" className="btn btn-primary mb-3">
                <FaPlus className="me-2" /> Novo Serviço
            </Link>

            <Row>
                {servicos.map((item) => (
                    <Col key={item.id} md={4} className="mb-4">
                        <Card className="h-100 shadow-sm border-0">
                            <Card.Header className="bg-primary text-white py-3">
                                <div className="d-flex justify-content-between align-items-center">
                                    <h5 className="mb-0">
                                        <FaUmbrellaBeach className="me-2" />
                                        {item.nome}
                                    </h5>
                                    <div>
                                        <Link href={'/servicosParque/form/' + item.id} 
                                            className='btn btn-outline-light btn-sm me-2'>
                                            <FaEdit className="me-1" /> Editar
                                        </Link>
                                        <Button 
                                            variant='outline-light' 
                                            size="sm" 
                                            onClick={() => excluir(item.id)}>
                                            <FaTrash className="me-1" /> Excluir
                                        </Button>
                                    </div>
                                </div>
                            </Card.Header>
                            <Card.Body>
                                <p className="mb-2">
                                    <FaSwimmer className="me-2 text-primary" />
                                    <strong>Categoria:</strong> {item.categoria}
                                </p>
                                <p className="mb-2">
                                    <FaHotTub className="me-2 text-primary" />
                                    <strong>Duração:</strong> {item.duracao} minutos
                                </p>
                                <p className="mb-0">
                                    <strong>Descrição:</strong> {item.descricao}
                                </p>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Pagina>
    )
}
