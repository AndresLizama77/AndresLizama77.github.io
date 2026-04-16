import { useState, useEffect, useRef } from 'react'
import './App.css'
import FondoInteractivo from './FondoInteractivo'

function App() {
  const [menuAbierto, setMenuAbierto] = useState(false)
  const [elementosVisibles, setElementosVisibles] = useState({})

  // Cerrar menú al hacer click en un enlace
  const cerrarMenu = () => setMenuAbierto(false)

  // Observer para animaciones al scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setElementosVisibles((prev) => ({
              ...prev,
              [entry.target.id]: true
            }))
          }
        })
      },
      { threshold: 0.1 }
    )

    const elementos = document.querySelectorAll('.animar')
    elementos.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  return (
    <div className="app">
      <div className="fondo-orbes" aria-hidden="true">
        <div className="orbe orbe-1"></div>
        <div className="orbe orbe-2"></div>
        <div className="orbe orbe-3"></div>
      </div>
      <FondoInteractivo />
      {/* Navegación */}
      <nav className="navbar">
        <a href="#" className="logo">DaRaci-7</a>
        
        {/* Menú hamburguesa */}
        <button 
          className={`menu-hamburguesa ${menuAbierto ? 'activo' : ''}`}
          onClick={() => setMenuAbierto(!menuAbierto)}
          aria-label="Menú"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <ul className={`nav-links ${menuAbierto ? 'activo' : ''}`}>
          <li><a href="#sobre-mi" onClick={cerrarMenu}>Sobre mí</a></li>
          <li><a href="#habilidades" onClick={cerrarMenu}>Habilidades</a></li>
          <li><a href="#experiencia" onClick={cerrarMenu}>Experiencia</a></li>
          <li><a href="#proyectos" onClick={cerrarMenu}>Proyectos</a></li>
          <li><a href="#contacto" onClick={cerrarMenu}>Contacto</a></li>
        </ul>
      </nav>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          {/* <p className="hero-saludo">¡Hola! Soy</p> */}
          <h1 className="hero-nombre">Eduardo Lizama</h1>
          <h2 className="hero-titulo">Analista Desarrollador Full Stack</h2>
          <p className="hero-subtitulo">Java | JavaScript | Spring Boot | React.js</p>
          <p className="hero-descripcion">
            De liderar equipos técnicos a crear soluciones digitales. 
            +1,400 horas de formación intensiva y experiencia real en soporte TI.
          </p>
          <div className="hero-botones">
            <a href="#contacto" className="btn btn-primario">Contáctame</a>
            <a href="/CV_Eduardo_Lizama.docx.pdf" download className="btn btn-secundario">Descargar CV</a>
          </div>
        </div>
        
        <div className="hero-imagen">
          <div className="hero-avatar-borde">
            <div className="hero-avatar">
              <img src="/avatarhalo.jpg" alt="Eduardo Lizama" />
            </div>
          </div>
        </div>
      </section>

      {/* Sobre Mí Section */}
      <section id="sobre-mi" className="sobre-mi">
        <div className="seccion-header animar" id="sobre-mi-header">
          <h2 className={`seccion-titulo ${elementosVisibles['sobre-mi-header'] ? 'visible' : ''}`}>Sobre mí</h2>
          <p className={`seccion-subtitulo ${elementosVisibles['sobre-mi-header'] ? 'visible' : ''}`}>Mi historia y lo que me hace diferente</p>
        </div>

        <div className={`sobre-mi-contenido animar ${elementosVisibles['sobre-mi-contenido'] ? 'visible' : ''}`} id="sobre-mi-contenido">
          <div className="sobre-mi-texto">
            <h3 className="sobre-mi-headline">
              De liderar talleres mecánicos a construir software
            </h3>
            <p>
              Mi camino hacia el desarrollo no fue convencional. Durante años lideré 
              equipos técnicos en talleres automotrices, donde aprendí a diagnosticar 
              problemas complejos, trabajar bajo presión y entregar resultados medibles: 
              <strong> +30% de productividad</strong> y <strong>-70% de errores</strong> en mis equipos.
            </p>
            <p>
              Esa mentalidad analítica me llevó a la tecnología. Hoy, con más de 
              <strong> 1,400 horas de formación intensiva</strong> en bootcamps y experiencia 
              real en soporte TI, combino la disciplina del 
              mundo técnico con las habilidades del desarrollo moderno.
            </p>
            <p>
              Actualmente soy <strong>miembro colaborador de la Cámara Chilena de 
              Inteligencia Artificial</strong>, Finalice hace muy poco un bootcamp de emprendimiento 
              DeepTech y actualmente sigo construyendo proyectos personales que me desafían a seguir 
              creciendo.
            </p>
          </div>

          <div className="sobre-mi-stats">
            <div className="stat-card">
              <span className="stat-numero">+1,400</span>
              <span className="stat-label">Horas de formación</span>
            </div>
            <div className="stat-card">
              <span className="stat-numero">2</span>
              <span className="stat-label">Años de experiencia </span>
            </div>
            <div className="stat-card">
              <span className="stat-numero">30%</span>
              <span className="stat-label">Aumento productividad</span>
            </div>
            <div className="stat-card">
              <span className="stat-numero">B1</span>
              <span className="stat-label">Nivel de inglés</span>
            </div>
          </div>
        </div>
      </section>

      {/* Habilidades Section */}
      <section id="habilidades" className="habilidades">
        <div className="seccion-header animar" id="habilidades-header">
          <h2 className={`seccion-titulo ${elementosVisibles['habilidades-header'] ? 'visible' : ''}`}>Habilidades</h2>
          <p className={`seccion-subtitulo ${elementosVisibles['habilidades-header'] ? 'visible' : ''}`}>Mi stack tecnológico y competencias</p>
        </div>

        <div className={`habilidades-contenido animar ${elementosVisibles['habilidades-contenido'] ? 'visible' : ''}`} id="habilidades-contenido">
          <div className="habilidades-grupo">
            <h3 className="grupo-titulo">💻 Desarrollo</h3>
            <div className="habilidades-lista">
              <div className="habilidad">
                <div className="habilidad-info">
                  <span className="habilidad-nombre">Java / Spring Boot</span>
                  <span className="habilidad-porcentaje">45%</span>
                </div>
                <div className="habilidad-barra">
                  <div className="habilidad-progreso" style={{ width: '45%' }}></div>
                </div>
              </div>
              <div className="habilidad">
                <div className="habilidad-info">
                  <span className="habilidad-nombre">JavaScript</span>
                  <span className="habilidad-porcentaje">51%</span>
                </div>
                <div className="habilidad-barra">
                  <div className="habilidad-progreso" style={{ width: '51%' }}></div>
                </div>
              </div>
              <div className="habilidad">
                <div className="habilidad-info">
                  <span className="habilidad-nombre">HTML / CSS / Bootstrap</span>
                  <span className="habilidad-porcentaje">80%</span>
                </div>
                <div className="habilidad-barra">
                  <div className="habilidad-progreso" style={{ width: '80%' }}></div>
                </div>
              </div>
              <div className="habilidad">
                <div className="habilidad-info">
                  <span className="habilidad-nombre">Python</span>
                  <span className="habilidad-porcentaje">30%</span>
                </div>
                <div className="habilidad-barra">
                  <div className="habilidad-progreso" style={{ width: '30%' }}></div>
                </div>
              </div>
            </div>
          </div>

          

          <div className="habilidades-grupo">
            <h3 className="grupo-titulo">🛠️ Herramientas</h3>
            <div className="habilidades-lista">
              <div className="habilidad">
                <div className="habilidad-info">
                  <span className="habilidad-nombre">Git / GitHub</span>
                  <span className="habilidad-porcentaje">75%</span>
                </div>
                <div className="habilidad-barra">
                  <div className="habilidad-progreso" style={{ width: '75%' }}></div>
                </div>
              </div>
              <div className="habilidad">
                <div className="habilidad-info">
                  <span className="habilidad-nombre">MySQL / PostgreSQL</span>
                  <span className="habilidad-porcentaje">65%</span>
                </div>
                <div className="habilidad-barra">
                  <div className="habilidad-progreso" style={{ width: '65%' }}></div>
                </div>
              </div>
              <div className="habilidad">
                <div className="habilidad-info">
                  <span className="habilidad-nombre">Soporte TI / Redes LAN</span>
                  <span className="habilidad-porcentaje">85%</span>
                </div>
                <div className="habilidad-barra">
                  <div className="habilidad-progreso" style={{ width: '85%' }}></div>
                </div>
              </div>
            </div>
          </div>

          <div className="habilidades-grupo soft-skills">
            <h3 className="grupo-titulo">🧠 Soft Skills</h3>
            <div className="soft-skills-lista">
              <span className="soft-skill-tag">Liderazgo</span>
              <span className="soft-skill-tag">Trabajo en equipo</span>
              <span className="soft-skill-tag">Resolución de problemas</span>
              <span className="soft-skill-tag">Pensamiento analítico</span>
              <span className="soft-skill-tag">Comunicación efectiva</span>
              <span className="soft-skill-tag">Trabajo bajo presión</span>
              <span className="soft-skill-tag">Aprendizaje rápido</span>
              <span className="soft-skill-tag">Adaptabilidad</span>
            </div>
          </div>
        </div>
      </section>

      {/* Experiencia Section */}
      <section id="experiencia" className="experiencia">
        <div className="seccion-header animar" id="experiencia-header">
          <h2 className={`seccion-titulo ${elementosVisibles['experiencia-header'] ? 'visible' : ''}`}>Experiencia</h2>
          <p className={`seccion-subtitulo ${elementosVisibles['experiencia-header'] ? 'visible' : ''}`}>Mi trayectoria profesional</p>
        </div>

        <div className={`timeline animar ${elementosVisibles['timeline'] ? 'visible' : ''}`} id="timeline">
          <div className="timeline-item">
            <div className="timeline-marker"></div>
            <div className="timeline-contenido">
              <div className="timeline-fecha">
                <span className="fecha-badge">2025</span>
              </div>
              <h3 className="timeline-titulo">Soporte TI</h3>
              <h4 className="timeline-empresa">Independiente</h4>
              <p className="timeline-descripcion">
                Mantenimiento y reparacion de +40 equipos con 100% de efectividad. 
                Soporte técnico de primer nivel, diagnóstico de redes LAN 
                y gestión de problemas priorizando requerimientos críticos.
              </p>
              <div className="timeline-tags">
                <span>Soporte TI</span>
                <span>Redes LAN</span>
                <span>Hardware</span>
              </div>
            </div>
          </div>

          <div className="timeline-item">
            <div className="timeline-marker"></div>
            <div className="timeline-contenido">
              <div className="timeline-fecha">
                <span className="fecha-badge">2023 - Presente</span>
              </div>
              <h3 className="timeline-titulo">Desarrollo Web</h3>
              <h4 className="timeline-empresa">Proyectos Formativos y Personales</h4>
              <p className="timeline-descripcion">
                Desarrollo de sitios web con HTML, CSS, JavaScript, Bootstrap y React. 
                Implementación de arquitectura modular con Java y JavaScript. 
                Control de versiones con Git y GitHub.
              </p>
              <div className="timeline-tags">
                <span>JavaScript</span>
                <span>Java</span>
                <span>Bootstrap</span>
                <span>Git</span>
              </div>
            </div>
          </div>

          <div className="timeline-item">
            <div className="timeline-marker"></div>
            <div className="timeline-contenido">
              <div className="timeline-fecha">
                <span className="fecha-badge">2021 - 2022</span>
              </div>
              <h3 className="timeline-titulo">Jefe de Taller</h3>
              <h4 className="timeline-empresa">Nippon Service</h4>
              <p className="timeline-descripcion">
                Liderazgo de equipo de 6 técnicos con +30% de aumento en productividad. 
                Reducción del 70% en retornos post-mantención mediante protocolos de calidad. 
                Mejora de satisfacción del cliente de 3.5 a 4.7 estrellas.
              </p>
              <div className="timeline-tags">
                <span>Liderazgo</span>
                <span>Control de Calidad</span>
                <span>Gestión</span>
              </div>
            </div>
          </div>

          <div className="timeline-item">
            <div className="timeline-marker"></div>
            <div className="timeline-contenido">
              <div className="timeline-fecha">
                <span className="fecha-badge">2019 - 2021</span>
              </div>
              <h3 className="timeline-titulo">Jefe de Taller</h3>
              <h4 className="timeline-empresa">CRC SPA</h4>
              <p className="timeline-descripcion">
                Supervisión de 4 técnicos con 95% de entregas a tiempo. 
                Implementación de diagnóstico preventivo aumentando servicios en 35%. 
                Optimización de inventario reduciendo costos en 18%.
              </p>
              <div className="timeline-tags">
                <span>Supervisión</span>
                <span>Diagnóstico</span>
                <span>Optimización</span>
              </div>
            </div>
          </div>

          <div className="timeline-item formacion">
            <div className="timeline-marker"></div>
            <div className="timeline-contenido">
              <div className="timeline-fecha">
                <span className="fecha-badge">Formación</span>
              </div>
              <h3 className="timeline-titulo">Educación Técnica</h3>
              <div className="formacion-lista">
                <div className="formacion-item">
                  <strong>Full Stack Java</strong>
                  <span>GENERATION Chile • 520 horas • 2025-2026</span>
                </div>
                <div className="formacion-item">
                  <strong>Full Stack JavaScript</strong>
                  <span>American Software • 480 horas • 2023</span>
                </div>
                <div className="formacion-item">
                  <strong>Analista Desarrollador de Software</strong>
                  <span>SENCE • 440 horas • 2018-2019</span>
                </div>
                <div className="formacion-item">
                  <strong>Técnico en Mecánica Automotriz</strong>
                  <span>DUOC UC • 6 semestres • 2016-2018</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Proyectos Section */}
      <section id="proyectos" className="proyectos">
        <div className="seccion-header animar" id="proyectos-header">
          <h2 className={`seccion-titulo ${elementosVisibles['proyectos-header'] ? 'visible' : ''}`}>Proyectos</h2>
          <p className={`seccion-subtitulo ${elementosVisibles['proyectos-header'] ? 'visible' : ''}`}>Lo que he construido</p>
        </div>

        <div className={`proyectos-grid animar ${elementosVisibles['proyectos-grid'] ? 'visible' : ''}`} id="proyectos-grid">
          <div className="proyecto-card">
            <div className="proyecto-imagen">
              <span className="proyecto-emoji">🌐</span>
            </div>
            <div className="proyecto-info">
              <h3 className="proyecto-titulo">Portfolio Personal</h3>
              <p className="proyecto-descripcion">
                Landing page profesional desarrollada con React y Vite. 
                Diseño responsive con gradientes modernos y animaciones al scroll.
              </p>
              <div className="proyecto-tecnologias">
                <span>React</span>
                <span>CSS3</span>
                <span>Vite</span>
              </div>
              <div className="proyecto-enlaces">
                {/* <a href="#" className="proyecto-link">Ver Demo →</a> */}
                <a href="https://github.com/AndresLizama77/AndresLizama77.github.io" target="_blank" rel="noopener noreferrer" className="proyecto-link">GitHub →</a>
              </div>
            </div>
          </div>

          <div className="proyecto-card">
            <div className="proyecto-imagen">
              <span className="proyecto-emoji">☕</span>
            </div>
            <div className="proyecto-info">
              <h3 className="proyecto-titulo">API REST con Spring Boot</h3>
              <p className="proyecto-descripcion">
                Backend desarrollado en Java con Spring Boot. 
                Implementación de CRUD completo con conexión a base de datos MySQL.
              </p>
              <div className="proyecto-tecnologias">
                <span>Java</span>
                <span>Spring Boot</span>
                <span>MySQL</span>
              </div>
              <div className="proyecto-enlaces">
                <a href="https://github.com/AndresLizama77/springboot-user-api" target="_blank" rel="noopener noreferrer" className="proyecto-link">GitHub →</a>
              </div>
            </div>
          </div>

          <div className="proyecto-card">
            <div className="proyecto-imagen">
              <span className="proyecto-emoji">🛒</span>
            </div>
            <div className="proyecto-info">
              <h3 className="proyecto-titulo">E-Commerce Frontend</h3>
              <p className="proyecto-descripcion">
                Tienda online con carrito de compras funcional. 
                Desarrollada con JavaScript vanilla y Bootstrap para diseño responsive.
              </p>
              <div className="proyecto-tecnologias">
                <span>JavaScript</span>
                <span>Bootstrap</span>
                <span>HTML5</span>
              </div>
              <div className="proyecto-enlaces">
                {/* <a href="#" className="proyecto-link">Ver Demo →</a> */}
                {/* <a href="https://github.com/DaRaci-7" target="_blank" rel="noopener noreferrer" className="proyecto-link">GitHub →</a> */}
              </div>
            </div>
          </div>

          <div className="proyecto-card proyecto-pronto">
            <div className="proyecto-imagen">
              <span className="proyecto-emoji">🚀</span>
            </div>
            <div className="proyecto-info">
              <h3 className="proyecto-titulo">Próximo Proyecto</h3>
              <p className="proyecto-descripcion">
                Actualmente trabajando en una aplicacion web y mobil para el seguimiento trabajos en el area automotriz.
              </p>
              <div className="proyecto-tecnologias">
                <span>En desarrollo</span>
              </div>
              <div className="proyecto-enlaces">
                <span className="proyecto-pronto-badge">Próximamente</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contacto Section */}
      <section id="contacto" className="contacto">
        <div className="seccion-header animar" id="contacto-header">
          <h2 className={`seccion-titulo ${elementosVisibles['contacto-header'] ? 'visible' : ''}`}>Contacto</h2>
          <p className={`seccion-subtitulo ${elementosVisibles['contacto-header'] ? 'visible' : ''}`}>¿Tienes un proyecto en mente? ¡Hablemos!</p>
        </div>

        <div className={`contacto-contenido animar ${elementosVisibles['contacto-contenido'] ? 'visible' : ''}`} id="contacto-contenido">
          <div className="contacto-info">
            <p className="contacto-mensaje">
              Estoy buscando oportunidades como desarrollador Full Stack Junior. 
              Si crees que puedo aportar valor a tu equipo o tienes un proyecto 
              interesante, no dudes en contactarme.
            </p>

            <div className="contacto-datos">
              <a href="mailto:andres.lizama779@gmail.com" className="contacto-item">
                <div className="contacto-icono">📧</div>
                <div className="contacto-detalle">
                  <span className="contacto-label">Email</span>
                  <span className="contacto-valor">andres.lizama779@gmail.com</span>
                </div>
              </a>

              <a href="tel:+56948848349" className="contacto-item">
                <div className="contacto-icono">📱</div>
                <div className="contacto-detalle">
                  <span className="contacto-label">Teléfono</span>
                  <span className="contacto-valor">+56 9 4884 8349</span>
                </div>
              </a>

              <a href="https://www.linkedin.com/in/andreslizama77970/" target="_blank" rel="noopener noreferrer" className="contacto-item">
                <div className="contacto-icono">💼</div>
                <div className="contacto-detalle">
                  <span className="contacto-label">LinkedIn</span>
                  <span className="contacto-valor">Eduardo Lizama</span>
                </div>
              </a>

              <a href="https://github.com/AndresLizama77" target="_blank" rel="noopener noreferrer" className="contacto-item">
                <div className="contacto-icono">💻</div>
                <div className="contacto-detalle">
                  <span className="contacto-label">GitHub</span>
                  <span className="contacto-valor">Eduardo Lizama<br />(DaRaci-7)</span>
                </div>
              </a>
            </div>

            <div className="contacto-ubicacion">
              <span className="ubicacion-icono">📍</span>
              <span>Villa Alemana, Chile</span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <p>Diseñado y desarrollado con 🔥 por <strong>Eduardo Lizama</strong></p>
        <p className="footer-year">© 2026 - Todos los derechos reservados</p>
      </footer>
    </div>
  )
}

export default App