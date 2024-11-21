'use client'

import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { Button, Card, Col, Row } from 'react-bootstrap'
import { FaEdit, FaPlus, FaTrash, FaUserTie, FaEnvelope, FaPhone, FaIdCard, FaBriefcase, FaCalendarCheck } from 'react-icons/fa'
import Pagina from '../components/Pagina'
import Swal from 'sweetalert2'

export default function FuncionariosParque() {

    const [funcionariosParque, setFuncionariosParque] = useState([])

    useEffect(() => {
        setFuncionariosParque(JSON.parse(localStorage.getItem('funcionariosParque')) || [])
    }, [])

    function excluir(id) {
        Swal.fire({
            title: "Tem certeza?",
            text: "Não será possível reverter esta ação!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#007ACC",
            cancelButtonColor: "#d33",
            confirmButtonText: "Sim, excluir!",
            cancelButtonText: "Cancelar"
        }).then((result) => {
            if (result.isConfirmed) {
                const funcionariosAtualizados = funcionariosParque.filter(item => item.id !== id)
                localStorage.setItem('funcionariosParque', JSON.stringify(funcionariosAtualizados))
                setFuncionariosParque(funcionariosAtualizados)

                Swal.fire({
                    title: "Excluído!",
                    text: "O funcionário foi excluído com sucesso.",
                    icon: "success"
                })
            }
        })
    }

    return (
        <Pagina titulo="Equipe do Parque Aquático">
            <Link href="/funcionariosParque/form" className="btn btn-primary mb-3">
                <FaPlus className="me-2" /> Adicionar Funcionário
            </Link>

            <Row>
                {funcionariosParque.map((item) => (
                    <Col key={item.id} md={4} className="mb-4">
                        <Card className="h-100 shadow-sm border-0">
                            <Card.Header className="bg-info text-white py-3">
                                <div className="d-flex justify-content-between align-items-center">
                                    <h5 className="mb-0">
                                        <FaUserTie className="me-2" />
                                        {item.nome}
                                    </h5>
                                    <div>
                                        <Link href={'/funcionariosParque/form/' + item.id}
                                            className="btn btn-outline-light btn-sm me-2">
                                            <FaEdit className="me-1" /> Editar
                                        </Link>
                                        <Button
                                            variant="outline-light"
                                            size="sm"
                                            onClick={() => excluir(item.id)}>
                                            <FaTrash className="me-1" /> Excluir
                                        </Button>
                                    </div>
                                </div>
                            </Card.Header>
                            <Card.Body>
                                <p className="mb-2">
                                    <FaIdCard className="me-2 text-primary" />
                                    <strong>CPF:</strong> {item.cpf}
                                </p>
                                <p className="mb-2">
                                    <FaEnvelope className="me-2 text-primary" />
                                    <strong>Email:</strong> {item.email}
                                </p>
                                <p className="mb-2">
                                    <FaPhone className="me-2 text-primary" />
                                    <strong>Telefone:</strong> {item.telefone}
                                </p>
                                <p className="mb-2">
                                    <FaBriefcase className="me-2 text-primary" />
                                    <strong>Cargo:</strong> {item.cargo}
                                </p>
                                <p className="mb-2">
                                    <FaCalendarCheck className="me-2 text-primary" />
                                    <strong>Data de Contratação:</strong> {item.data_contratacao}
                                </p>
                                <p className="mb-0">
                                    <strong>Salário:</strong> R$ {parseFloat(item.salario).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                                </p>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Pagina>
    )
}
