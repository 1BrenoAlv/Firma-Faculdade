import { Row, Col, Container } from 'react-bootstrap'

/**
 * SplitSection — Reusable section with text + image side by side.
 *
 * Props:
 *   - id: section HTML id
 *   - label: small label text (e.g. "Ângulo 01 · Lateral")
 *   - title: h2 content (can be JSX)
 *   - description: paragraph text
 *   - imageSrc: image path
 *   - imageAlt: image alt text
 *   - reverse: if true, image comes first (left)
 *   - specs: optional array of { value, label } objects
 */
export default function SplitSection({
  id,
  label,
  title,
  description,
  imageSrc,
  imageAlt,
  reverse = false,
  specs = [],
}) {
  const textCol = (
    <Col xs={12} md={5} key="text" data-aos={reverse ? 'fade-left' : 'fade-right'}>
      <div className="mono gold-text section-label">{label}</div>
      <h2>{title}</h2>
      <p>{description}</p>

      {specs.length > 0 && (
        <div className="specs-grid">
          {specs.map((spec, index) => (
            <div className="spec-item" key={index}>
              <div className="val">{spec.value}</div>
              <div className="label mono">{spec.label}</div>
            </div>
          ))}
        </div>
      )}
    </Col>
  )

  const imageCol = (
    <Col xs={12} md={7} key="image" className="split-visual" data-aos={reverse ? 'fade-right' : 'fade-left'}>
      <img src={imageSrc} alt={imageAlt} />
    </Col>
  )

  // On mobile, always show text first, image second (regardless of reverse)
  const orderClass = reverse ? 'flex-column flex-md-row' : ''

  return (
    <section className="split-section" id={id}>
      <Container fluid>
        <Row className={`align-items-center gy-4 ${orderClass}`}>
          {reverse ? [imageCol, textCol] : [textCol, imageCol]}
        </Row>
      </Container>
    </section>
  )
}
