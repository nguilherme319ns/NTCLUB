'use client'

import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { Button, Card, Col, Row, Badge } from 'react-bootstrap'
import { FaEdit, FaPlus, FaTrash, FaCalendarAlt, FaUser, FaWater } from 'react-icons/fa'
import Pagina from '../components/Pagina'
import Swal from 'sweetalert2'

export default function Ingressos() {
    const [ingressos, setIngressos] = useState([])
    const [visitantes, setVisitantes] = useState([])
    const [atracoes, setAtracoes] = useState([])

    useEffect(() => {
        // Carrega dados do localStorage
        setIngressos(JSON.parse(localStorage.getItem('ingressos')) || [])
        setVisitantes(JSON.parse(localStorage.getItem('visitantes')) || [])
        setAtracoes(JSON.parse(localStorage.getItem('atracoes')) || [])
    }, [])

    // Obtem o nome do visitante com base no ID
    function getVisitante(id) {
        return visitantes.find(v => v.id === id)?.nome || 'Visitante não encontrado'
    }

    // Obtem o nome da atração com base no ID
    function getAtracao(id) {
        return atracoes.find(a => a.id === id)?.nome || 'Atração não encontrada'
    }

    // Função para excluir um ingresso
    function excluir(id) {
        Swal.fire({
            title: "Tem certeza?",
            text: "Esta ação não pode ser desfeita!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Sim, excluir!",
            cancelButtonText: "Cancelar"
        }).then((result) => {
            if (result.isConfirmed) {
                const ingressosAtualizados = ingressos.filter(item => item.id !== id)
                localStorage.setItem('ingressos', JSON.stringify(ingressosAtualizados))
                setIngressos(ingressosAtualizados)

                Swal.fire({
                    title: "Excluído!",
                    text: "O ingresso foi removido com sucesso.",
                    icon: "success"
                });
            }
        })
    }

    return (
        <Pagina titulo="Ingressos do Parque">
            <Link href="/ingressos/form" className="btn btn-primary mb-3">
                <FaPlus className="me-2" /> Novo Ingresso
            </Link>

            <Row>
                {ingressos.map((item) => (
                    <Col key={item.id} md={4} className="mb-4">
                        <Card className="h-100 shadow-sm border-0">
                            <Card.Header className="bg-info text-white py-3">
                                <div className="d-flex justify-content-between align-items-center">
                                    <h5 className="mb-0">
                                        <FaCalendarAlt className="me-2" />
                                        Ingresso #{item.id.slice(0, 4)}
                                    </h5>
                                    <div>
                                        <Link href={'/ingressos/form/' + item.id} 
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
                                    <FaUser className="me-2 text-primary" />
                                    <strong>Visitante:</strong> {getVisitante(item.visitante_id)}
                                </p>
                                <p className="mb-2">
                                    <FaWater className="me-2 text-primary" />
                                    <strong>Atração:</strong> {getAtracao(item.atracao_id)}
                                </p>
                                <p className="mb-2">
                                    <strong>Data de Entrada:</strong> {new Date(item.data_entrada).toLocaleDateString()}
                                </p>
                                <p className="mb-2">
                                    <strong>Data de Saída:</strong> {new Date(item.data_saida).toLocaleDateString()}
                                </p>
                                <p className="mb-0">
                                    <strong>Status:</strong>
                                    <Badge bg={
                                        new Date(item.data_entrada) > new Date() ? 'info' :
                                        new Date(item.data_saida) < new Date() ? 'dark' : 'success'
                                    } className="ms-2">
                                        {new Date(item.data_entrada) > new Date() ? 'Agendado' :
                                         new Date(item.data_saida) < new Date() ? 'Finalizado' : 'Em andamento'}
                                    </Badge>
                                </p>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Pagina>
    )
}
