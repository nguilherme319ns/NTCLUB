'use client'

import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { Button, Card, Col, Row, Badge } from 'react-bootstrap'
import { FaUmbrellaBeach, FaSwimmer, FaEdit, FaPlus, FaTrash } from 'react-icons/fa'
import Pagina from '../components/Pagina'
import Swal from 'sweetalert2'

export default function Atracoes() {
    const [atracoes, setAtracoes] = useState([])

    useEffect(() => {
        setAtracoes(JSON.parse(localStorage.getItem('atracoes')) || [])
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
                const atracoesAtualizadas = atracoes.filter(item => item.id !== id)
                localStorage.setItem('atracoes', JSON.stringify(atracoesAtualizadas))
                setAtracoes(atracoesAtualizadas)

                Swal.fire({
                    title: "Excluído!",
                    text: "A atração foi excluída com sucesso.",
                    icon: "success"
                });
            }
        })
    }

    // Agrupa atrações por tipo
    const atracoesPorTipo = atracoes.reduce((acc, atracao) => {
        const tipo = atracao.tipo
        if (!acc[tipo]) {
            acc[tipo] = []
        }
        acc[tipo].push(atracao)
        return acc
    }, {})

    return (
        <Pagina titulo="Atrações do Parque">
            <Link href="/atracoes/form" className="btn btn-primary mb-3">
                <FaPlus className="me-2" /> Nova Atração
            </Link>

            {Object.entries(atracoesPorTipo)
                .sort(([a], [b]) => a.localeCompare(b))
                .map(([tipo, atracoesDoTipo]) => (
                    <div key={tipo} className="mb-4">
                        <h4 className="border-bottom pb-2 mb-3 text-primary">
                            {tipo}
                        </h4>
                        <Row>
                            {atracoesDoTipo.map((item) => (
                                <Col key={item.id} md={4} className="mb-4">
                                    <Card className={`h-100 shadow-sm border-0 ${item.ocupado ? 'bg-light-danger' : 'bg-light-primary'}`}>
                                        <Card.Header className={`py-3 ${item.ocupado ? 'bg-danger' : 'bg-primary'} text-white`}>
                                            <div className="d-flex justify-content-between align-items-center">
                                                <h5 className="mb-0">
                                                    <FaUmbrellaBeach className="me-2" />
                                                    {item.nome}
                                                </h5>
                                                <div>
                                                    <Link href={'/atracoes/form/' + item.id}
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
                                                <Badge bg={item.ocupado ? 'danger' : 'primary'}>
                                                    {item.ocupado ? 'Ocupado' : 'Disponível'}
                                                </Badge>
                                            </p>
                                            <p className="mb-2">
                                                <FaSwimmer className="me-2 text-secondary" />
                                                <strong>Capacidade:</strong> {item.capacidade} pessoas
                                            </p>
                                            <p className="mb-2">
                                                <strong>Idade Mínima:</strong> {item.idade || 'Não especificada'} anos
                                            </p>
                                            <p className="mb-0">
                                                <strong>Observações:</strong> {item.observacoes || 'Nenhuma'}
                                            </p>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            ))}
                        </Row>
                    </div>
                ))}
        </Pagina>
    )
}
