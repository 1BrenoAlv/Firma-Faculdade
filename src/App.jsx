import { useState, useEffect, useCallback } from 'react'

// Components
import Loader from './components/Loader'
import Header from './components/Header'
import Hero from './components/Hero'
import SplitSection from './components/SplitSection'
import FiraSection from './components/FiraSection'
import CrestSection from './components/CrestSection'
import Footer from './components/Footer'
import FiraBot from './components/FiraBot'
import FiraSpeech from './components/FiraSpeech'

// Section-to-message mapping for FIRA's contextual comments
const SECTION_MESSAGES = {
  heroSection: 'Bem-vindo ao FIRMA! Esse é o carro que vai redefinir o que você entende por compacto. Prepare-se.',
  sectionLateral: 'Olha essa silhueta... 2,60m de pura proporção áurea. A aerodinâmica aqui virou arte.',
  sectionFrontal: 'O olhar do FIRMA é inconfundível. Esses faróis não foram desenhados, foram esculpidos.',
  sectionAereo: 'Vista de cima, a simetria é milimétrica. Cada vinco tem um propósito.',
  sectionFira: 'Ei, essa sou eu! FIRA, sua copiloto holográfica. Prazer em conhecê-lo. 😊',
  sectionCrest: 'O brasão da FIRMA: coragem, precisão e essência. Nada de ornamento vazio.',
  siteFooter: "Rien que l'essentiel. Tout l'impossible. Obrigada por explorar o FIRMA comigo!",
}

export default function App() {
  const [loaderDone, setLoaderDone] = useState(false)
  const [currentSection, setCurrentSection] = useState(null)

  // Memoize loader callback so it doesn't change on re-renders
  const handleLoaderFinish = useCallback(() => {
    setLoaderDone(true)
    // Show hero message after a brief delay
    setTimeout(() => setCurrentSection('heroSection'), 800)
  }, [])

  // IntersectionObserver to detect which section is visible
  useEffect(() => {
    if (!loaderDone) return

    const sectionIds = Object.keys(SECTION_MESSAGES)
    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean)

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setCurrentSection(entry.target.id)
          }
        })
      },
      { threshold: 0.4 }
    )

    elements.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [loaderDone])

  // Get current speech message
  const speechMessage = currentSection ? SECTION_MESSAGES[currentSection] : ''
  const speechVisible = loaderDone && !!speechMessage

  return (
    <>
      {/* Loader */}
      <Loader onFinish={handleLoaderFinish} />

      {/* Fixed elements */}
      <Header />
      <FiraBot />
      <FiraSpeech message={speechMessage} visible={speechVisible} />

      {/* Page sections */}
      <Hero />

      {/* Ângulo 01 — Lateral */}
      <SplitSection
        id="sectionLateral"
        label="Ângulo 01 · Lateral"
        title="O perfil que redefine proporção."
        description="A matemática sagrada nas grandes obras. O FIRMA foi concebido nos limites exatos em que a aerodinâmica deixa de ser ciência e passa a ser arte. 2,60 metros de comprimento: o suficiente para conter potência, luxo e tecnologia."
        imageSrc="/images/lateral.png"
        imageAlt="FIRMA — Vista lateral esquerda"
        specs={[
          { value: '2,60', label: 'Metros Comprimento' },
          { value: '1,00', label: 'Metro Altura' },
        ]}
      />

      {/* Ângulo 02 — Frontal */}
      <SplitSection
        id="sectionFrontal"
        label="Ângulo 02 · Frontal"
        title={<span className="italic">Olhe nos olhos do futuro. Ele não pisca.</span>}
        description="O front do FIRMA não foi desenhado para agradar. Foi construído para ser lembrado. Os grupos ópticos dianteiros, enquadrados por entradas de ar que parecem brânquias de um predador aquático, miram o horizonte com a serenidade de quem já sabe o que está prestes a fazer."
        imageSrc="/images/frente.png"
        imageAlt="FIRMA — Vista frontal"
        reverse={true}
      />

      {/* Ângulo 04 — Aéreo */}
      <SplitSection
        id="sectionAereo"
        label="Ângulo 04 · Aéreo"
        title={<>Vista de cima,<br />tudo faz sentido.</>}
        description="Do ponto de vista privilegiado que só os satélites conhecem, o FIRMA revela o que a perspectiva humana esconde: uma geometria de precisão que não aceita imperfeição. A linha central espelha o carro com tolerância de microns."
        imageSrc="/images/teto.png"
        imageAlt="FIRMA — Vista aérea do teto"
      />

      {/* FIRA — IA Copiloto */}
      <FiraSection />

      {/* Brasão */}
      <CrestSection />

      {/* Footer */}
      <Footer />
    </>
  )
}
