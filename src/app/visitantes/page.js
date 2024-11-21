'use client'

import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { Button, Card, Col, Row } from 'react-bootstrap'
import { FaUmbrellaBeach, FaEnvelope, FaPhone, FaIdCard, FaMapMarkerAlt, FaBirthdayCake, FaEdit, FaTrash, FaPlus } from 'react-icons/fa'
import Pagina from '../components/Pagina'
import Swal from 'sweetalert2'

export default function Visitantes() {
    const [visitantes, setVisitantes] = useState([])

    useEffect(() => {
        setVisitantes(JSON.parse(localStorage.getItem('visitantes')) || [])
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
                const visitantesAtualizados = visitantes.filter(item => item.id !== id)
                localStorage.setItem('visitantes', JSON.stringify(visitantesAtualizados))
                setVisitantes(visitantesAtualizados)

                Swal.fire({
                    title: "Excluído!",
                    text: "O visitante foi excluído com sucesso.",
                    icon: "success"
                })
            }
        })
    }

    return (
        <Pagina titulo="Visitantes do Parque Aquático">
            <Link href="/visitantes/form" className="btn btn-info mb-3">
                <FaPlus className="me-2" /> Novo Visitante
            </Link>

            <Row>
                {visitantes.map((item) => (
                    <Col key={item.id} md={4} className="mb-4">
                        <Card className="h-100 shadow-sm border-0">
                            <Card.Header className="bg-info text-white py-3">
                                <div className="d-flex justify-content-between align-items-center">
                                    <h5 className="mb-0">
                                        <FaUmbrellaBeach className="me-2" />
                                        {item.nome}
                                    </h5>
                                    <div>
                                        <Link href={'/visitantes/form/' + item.id} className="btn btn-outline-light btn-sm me-2">
                                            <FaEdit className="me-1" /> Editar
                                        </Link>
                                        <Button variant="outline-light" size="sm" onClick={() => excluir(item.id)}>
                                            <FaTrash className="me-1" /> Excluir
                                        </Button>
                                    </div>
                                </div>
                            </Card.Header>
                            <Card.Body>
                                <p className="mb-2"><FaIdCard className="me-2 text-info" /><strong>CPF:</strong> {item.cpf}</p>
                                <p className="mb-2"><FaEnvelope className="me-2 text-info" /><strong>Email:</strong> {item.email}</p>
                                <p className="mb-2"><FaPhone className="me-2 text-info" /><strong>Telefone:</strong> {item.telefone}</p>
                                <p className="mb-2"><FaMapMarkerAlt className="me-2 text-info" /><strong>Endereço:</strong> {item.endereco}</p>
                                <p className="mb-0"><FaBirthdayCake className="me-2 text-info" /><strong>Data de Nascimento:</strong> {item.data_nascimento}</p>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Pagina>
    )
}
