import { Row, Col, Container } from 'react-bootstrap'

export default function FiraSection() {
  return (
    <section className="fira-section" id="sectionFira">
      <Container>
        <Row className="align-items-center gy-4">
          <Col xs={12} md={5} data-aos="fade-right">
            <div className="fira-hologram-wrapper">
              {/* SVG Holographic FIRA Illustration */}
              <svg viewBox="0 0 400 520" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="FIRA — Copiloto holográfico inteligente">
                <defs>
                  <linearGradient id="holoGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#00E5D4" stopOpacity="0.9"/>
                    <stop offset="50%" stopColor="#00B4A6" stopOpacity="0.6"/>
                    <stop offset="100%" stopColor="#007A6F" stopOpacity="0.1"/>
                  </linearGradient>
                  <radialGradient id="coreGlow" cx="50%" cy="40%" r="50%">
                    <stop offset="0%" stopColor="#00FFE0" stopOpacity="0.5"/>
                    <stop offset="100%" stopColor="#00E5D4" stopOpacity="0"/>
                  </radialGradient>
                  <filter id="holoBlur">
                    <feGaussianBlur stdDeviation="2" result="blur"/>
                    <feComposite in="SourceGraphic" in2="blur" operator="over"/>
                  </filter>
                  <filter id="glowFilter">
                    <feGaussianBlur stdDeviation="6" result="glow"/>
                    <feMerge>
                      <feMergeNode in="glow"/>
                      <feMergeNode in="SourceGraphic"/>
                    </feMerge>
                  </filter>
                </defs>

                {/* Ambient glow */}
                <ellipse cx="200" cy="260" rx="180" ry="250" fill="url(#coreGlow)" opacity="0.3"/>

                {/* Body silhouette */}
                <g filter="url(#holoBlur)" opacity="0.85">
                  <path d="M160,200 Q155,260 150,320 Q148,360 170,380 L230,380 Q252,360 250,320 Q245,260 240,200 Q230,170 200,160 Q170,170 160,200Z"
                        fill="url(#holoGrad)" stroke="#00E5D4" strokeWidth="1"/>
                  <path d="M155,210 Q120,220 110,250 Q108,270 120,280 L155,270"
                        fill="none" stroke="#00E5D4" strokeWidth="1.5" opacity="0.7"/>
                  <path d="M245,210 Q280,220 290,250 Q292,270 280,280 L245,270"
                        fill="none" stroke="#00E5D4" strokeWidth="1.5" opacity="0.7"/>
                  <line x1="115" y1="265" x2="100" y2="350" stroke="#00E5D4" strokeWidth="1.2" opacity="0.5"/>
                  <line x1="285" y1="265" x2="300" y2="350" stroke="#00E5D4" strokeWidth="1.2" opacity="0.5"/>
                </g>

                {/* Head */}
                <g filter="url(#glowFilter)">
                  <ellipse cx="200" cy="120" rx="55" ry="65" fill="none" stroke="#00E5D4" strokeWidth="1.5" opacity="0.8"/>
                  <ellipse cx="200" cy="120" rx="45" ry="55" fill="rgba(0,229,212,0.08)" stroke="#00FFE0" strokeWidth="0.5" opacity="0.5"/>
                </g>

                {/* Eyes */}
                <ellipse cx="180" cy="115" rx="12" ry="8" fill="#00FFE0" opacity="0.9">
                  <animate attributeName="ry" values="8;1;8" dur="4s" repeatCount="indefinite" begin="2s"/>
                </ellipse>
                <ellipse cx="220" cy="115" rx="12" ry="8" fill="#00FFE0" opacity="0.9">
                  <animate attributeName="ry" values="8;1;8" dur="4s" repeatCount="indefinite" begin="2s"/>
                </ellipse>

                {/* Core energy */}
                <circle cx="200" cy="280" r="15" fill="none" stroke="#00E5D4" strokeWidth="1" opacity="0.6">
                  <animate attributeName="r" values="12;18;12" dur="2s" repeatCount="indefinite"/>
                  <animate attributeName="opacity" values="0.4;0.8;0.4" dur="2s" repeatCount="indefinite"/>
                </circle>
                <circle cx="200" cy="280" r="6" fill="#00FFE0" opacity="0.5">
                  <animate attributeName="opacity" values="0.3;0.7;0.3" dur="1.5s" repeatCount="indefinite"/>
                </circle>

                {/* Circuit lines */}
                <g stroke="#00E5D4" strokeWidth="0.5" opacity="0.3">
                  <line x1="170" y1="230" x2="170" y2="260"/>
                  <line x1="230" y1="230" x2="230" y2="260"/>
                  <line x1="180" y1="300" x2="220" y2="300"/>
                  <line x1="185" y1="320" x2="215" y2="320"/>
                  <line x1="190" y1="340" x2="210" y2="340"/>
                </g>

                {/* Scan lines */}
                <g opacity="0.06">
                  <line x1="100" y1="100" x2="300" y2="100" stroke="#00FFE0" strokeWidth="0.5"/>
                  <line x1="100" y1="150" x2="300" y2="150" stroke="#00FFE0" strokeWidth="0.5"/>
                  <line x1="100" y1="200" x2="300" y2="200" stroke="#00FFE0" strokeWidth="0.5"/>
                  <line x1="100" y1="250" x2="300" y2="250" stroke="#00FFE0" strokeWidth="0.5"/>
                  <line x1="100" y1="300" x2="300" y2="300" stroke="#00FFE0" strokeWidth="0.5"/>
                  <line x1="100" y1="350" x2="300" y2="350" stroke="#00FFE0" strokeWidth="0.5"/>
                </g>

                {/* Base platform glow */}
                <ellipse cx="200" cy="400" rx="100" ry="12" fill="#00E5D4" opacity="0.15">
                  <animate attributeName="opacity" values="0.1;0.25;0.1" dur="3s" repeatCount="indefinite"/>
                </ellipse>
                <ellipse cx="200" cy="400" rx="60" ry="6" fill="#00FFE0" opacity="0.2"/>
              </svg>
            </div>
          </Col>
          <Col xs={12} md={7} data-aos="fade-left">
            <div className="mono fira-label">Sistema de Bordo · FIRA</div>
            <h2>
              O copiloto que<br />
              <span className="italic">nenhum humano</span><br />
              poderia ser.
            </h2>
            <p>
              Ela não ocupa espaço. Não precisa de cinto de segurança. Não se distrai. FIRA — <strong>FIRMA Intelligence, Responsive Assistant</strong> — é o primeiro copiloto holográfico de série da história do automobilismo compacto.
            </p>
            <p>
              Com cada jornada, FIRA aprende seu estilo de condução, suas rotas preferidas, suas músicas. Após 90 dias, parece que ela sempre soube quem você é.
            </p>
          </Col>
        </Row>
      </Container>
    </section>
  )
}
