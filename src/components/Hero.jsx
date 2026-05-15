import { Row, Col, Container } from 'react-bootstrap'

export default function Hero() {
  return (
    <section className="hero-section" id="heroSection">
      <Container fluid>
        <Row className="align-items-center gy-4">
          <Col xs={12} md={5}>
            <div className="hero-text" data-aos="fade-up" data-aos-delay="200">
              <h1 className="italic">
                Pequeno<br />por escolha.<br />
                <span className="gold-text">Implacável</span><br />
                por natureza.
              </h1>
              <p className="hero-tagline">
                O FIRMA não cabe nas categorias. As categorias é que não cabem nele.
              </p>
            </div>
          </Col>
          <Col xs={12} md={7}>
            <div className="hero-image-wrapper" data-aos="fade-left" data-aos-delay="400" data-aos-duration="1200">
              <img
                src="/images/trazeira.png"
                alt="FIRMA — Vista traseira do veículo compacto de luxo"
              />
            </div>
          </Col>
        </Row>
      </Container>

      <div className="scroll-indicator mono">
        Descubra
        <div className="scroll-line"></div>
      </div>
    </section>
  )
}
