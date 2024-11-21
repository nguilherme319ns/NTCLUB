import { Container, Nav, Navbar } from "react-bootstrap";
import { FaWater, FaTicketAlt, FaUmbrellaBeach, FaUsers, FaConciergeBell, FaSwimmer } from "react-icons/fa";

export default function Pagina(props) {
    return (
        <>
            <Navbar style={{ backgroundColor: "#00AEEF" }} variant="light" expand="lg" className="py-3 shadow">
                <Container>
                    <Navbar.Brand href="/" className="fs-4 fw-bold text-white">
                        <FaWater className="me-2" />
                        NTCLUB
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ms-auto gap-3">
                            <Nav.Link href="/ingressos" className="fw-semibold text-white">
                                <FaTicketAlt className="me-1" /> Ingressos
                            </Nav.Link>
                            <Nav.Link href="/atracoes" className="fw-semibold text-white">
                                <FaUmbrellaBeach className="me-1" /> Atrações
                            </Nav.Link>
                            <Nav.Link href="/visitantes" className="fw-semibold text-white">
                                <FaUsers className="me-1" /> Visitantes
                            </Nav.Link>
                            <Nav.Link href="/servicosParque" className="fw-semibold text-white">
                                <FaConciergeBell className="me-1" /> Serviços
                            </Nav.Link>
                            <Nav.Link href="/funcionariosParque" className="fw-semibold text-white">
                                <FaSwimmer className="me-1" /> Funcionários
                            </Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            <div style={{ backgroundColor: "#007ACC" }} className="text-white text-center p-3">
                <h1 className="fw-light">{props.titulo}</h1>
            </div>

            <Container className="my-4">{props.children}</Container>
        </>
    );
}
