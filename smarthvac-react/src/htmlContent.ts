// Auto-generated from original index.html
// Contains the complete HTML structure of SmartHVAC

export const bodyHtml: string = `<div class="atmosphere"></div>
<div class="grid-bg"></div>
<div class="noise"></div>

<div class="app">

<!-- =============================================================== -->
<!-- SCREEN 1 : LANDING                                              -->
<!-- =============================================================== -->
<section class="screen active" id="screen-landing">

  <nav class="nav" id="topnav">
    <div class="logo">
      <div class="logo-mark">
        <svg viewBox="0 0 28 28">
          <defs>
            <linearGradient id="lg1" x1="0" x2="1" y1="0" y2="1">
              <stop offset="0" stop-color="#00e5ff"/>
              <stop offset="1" stop-color="#00b8d4"/>
            </linearGradient>
          </defs>
          <path d="M4 8 L14 3 L24 8 L24 20 L14 25 L4 20 Z" fill="none" stroke="url(#lg1)" stroke-width="1.5"/>
          <path d="M10 11 L14 9 L18 11 L18 17 L14 19 L10 17 Z" fill="url(#lg1)" opacity=".3"/>
          <circle cx="14" cy="14" r="1.8" fill="#00e5ff"/>
        </svg>
      </div>
      <span>Smart<span class="accent">HVAC</span></span>
    </div>
    <div class="nav-links">
      <a style="cursor:pointer" onclick="openInfoModal('engine')">Engine</a>
      <a style="cursor:pointer" onclick="openInfoModal('workflow')">Workflow</a>
      <a style="cursor:pointer" onclick="openInfoModal('normativos')">Normativos</a>
      <a style="cursor:pointer" onclick="openInfoModal('docs')">Docs</a>
    </div>
    <div class="nav-cta" id="navCta">
      <button class="btn btn-ghost" onclick="openDemo()">Testar demo</button>
      <button class="btn btn-primary" onclick="go('auth')">
        <svg class="i" viewBox="0 0 24 24"><path d="M15 3h4a2 2 0 012 2v14a2 2 0 01-2 2h-4M10 17l5-5-5-5M15 12H3"/></svg>
        Entrar
      </button>
    </div>
  </nav>

  <div class="hero">
    <span class="hero-eyebrow">NBR 16401 + 17037 Â· Motor de CÃ¡lculo + QAI</span>
    <h1>Da planta em PDF<br/>Ã  carga tÃ©rmica<br/>em <span class="serif">minutos.</span></h1>
    <p class="hero-sub">
      SmartHVAC automatiza o take-off de plantas arquitetÃ´nicas, aplica as fÃ³rmulas da NBR 16401 e devolve o memorial descritivo e o desenho DXF dimensionados. O que antes levava trÃªs dias de levantamento agora cabe em um clique.
    </p>
    <div class="hero-ctas">
      <button class="btn btn-primary btn-lg" onclick="location.href='mailto:contato@smarthvac.io?subject=Solicita%C3%A7%C3%A3o%20de%20acesso%20SmartHVAC'">
        Solicitar acesso
        <svg class="i" viewBox="0 0 24 24"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
      </button>
      <button class="btn btn-outline btn-lg" onclick="openDemo()">
        Testar demo
        <svg class="i" viewBox="0 0 24 24"><polygon points="7 4 19 12 7 20 7 4" fill="currentColor"/></svg>
      </button>
    </div>
    <div class="hero-meta">
      <div><strong>~92%</strong>reduÃ§Ã£o de tempo</div>
      <div><strong>NBR 16401-1/2/3</strong>conformidade 2024</div>
      <div><strong>.dxf + .docx</strong>entregÃ¡veis finais</div>
    </div>

    <!-- HERO VISUAL -->
    <div class="hero-visual">
      <div class="hv-header">
        <div class="hv-dots"><span></span><span></span><span></span></div>
        <div class="path">smarthvac.io / <span>projeto/matriz-marata-r02/viewer</span></div>
      </div>
      <div class="hv-body">
        <aside class="hv-side">
          <div class="hv-side-title">Ambientes detectados Â· 14</div>
          <div class="hv-room-list">
            <div class="hv-room active"><span>Comercial</span><span class="hv-room-kw">62.87 kW</span></div>
            <div class="hv-room"><span>RecepÃ§Ã£o</span><span class="hv-room-kw">34.30 kW</span></div>
            <div class="hv-room"><span>Suprimentos</span><span class="hv-room-kw">10.73 kW</span></div>
            <div class="hv-room"><span>LogÃ­stica</span><span class="hv-room-kw">18.20 kW</span></div>
            <div class="hv-room"><span>Marketing</span><span class="hv-room-kw">18.15 kW</span></div>
            <div class="hv-room"><span>JurÃ­dico</span><span class="hv-room-kw">12.60 kW</span></div>
            <div class="hv-room"><span>Diretor 01</span><span class="hv-room-kw">9.36 kW</span></div>
            <div class="hv-room"><span>ReuniÃ£o 01</span><span class="hv-room-kw">6.97 kW</span></div>
          </div>
        </aside>

        <div class="hv-canvas">
          <svg class="plan-svg" viewBox="0 0 600 520" preserveAspectRatio="xMidYMid meet">
            <!-- outer building wall -->
            <rect x="40" y="40" width="520" height="440" class="plan-wall"/>
            <!-- glass facade (top = norte radiante) -->
            <line x1="60" y1="40" x2="540" y2="40" class="plan-glass"/>
            <line x1="540" y1="60" x2="540" y2="460" class="plan-glass" opacity=".5"/>
            <!-- internal walls -->
            <line x1="40" y1="180" x2="560" y2="180" class="plan-wall"/>
            <line x1="40" y1="320" x2="560" y2="320" class="plan-wall"/>
            <line x1="220" y1="40" x2="220" y2="180" class="plan-wall"/>
            <line x1="380" y1="40" x2="380" y2="180" class="plan-wall"/>
            <line x1="160" y1="180" x2="160" y2="320" class="plan-wall"/>
            <line x1="300" y1="180" x2="300" y2="320" class="plan-wall"/>
            <line x1="440" y1="180" x2="440" y2="320" class="plan-wall"/>
            <line x1="200" y1="320" x2="200" y2="480" class="plan-wall"/>
            <line x1="360" y1="320" x2="360" y2="480" class="plan-wall"/>

            <!-- rooms -->
            <rect x="40" y="40" width="180" height="140" class="plan-room selected"/>
            <rect x="220" y="40" width="160" height="140" class="plan-room"/>
            <rect x="380" y="40" width="180" height="140" class="plan-room"/>
            <rect x="40" y="180" width="120" height="140" class="plan-room"/>
            <rect x="160" y="180" width="140" height="140" class="plan-room"/>
            <rect x="300" y="180" width="140" height="140" class="plan-room"/>
            <rect x="440" y="180" width="120" height="140" class="plan-room"/>
            <rect x="40" y="320" width="160" height="160" class="plan-room"/>
            <rect x="200" y="320" width="160" height="160" class="plan-room"/>
            <rect x="360" y="320" width="200" height="160" class="plan-room"/>

            <!-- heat zone at facade -->
            <rect x="40" y="40" width="520" height="20" class="plan-hot" opacity=".4"/>

            <!-- labels -->
            <text x="130" y="105" class="plan-label">Comercial</text>
            <text x="130" y="120" class="plan-label plan-label-area">138.97 mÂ² Â· 62.87 kW</text>
            <text x="300" y="105" class="plan-label">RecepÃ§Ã£o</text>
            <text x="300" y="120" class="plan-label plan-label-area">61.03 mÂ² Â· 34.30 kW</text>
            <text x="470" y="105" class="plan-label">Diretor 01</text>
            <text x="470" y="120" class="plan-label plan-label-area">36.71 mÂ² Â· 9.36 kW</text>
            <text x="100" y="245" class="plan-label">JurÃ­dico</text>
            <text x="100" y="260" class="plan-label plan-label-area">40.86 mÂ²</text>
            <text x="230" y="245" class="plan-label">LogÃ­stica</text>
            <text x="230" y="260" class="plan-label plan-label-area">54.31 mÂ²</text>
            <text x="370" y="245" class="plan-label">Marketing</text>
            <text x="370" y="260" class="plan-label plan-label-area">53.52 mÂ²</text>
            <text x="500" y="245" class="plan-label">ReuniÃ£o</text>
            <text x="120" y="395" class="plan-label">Suprimentos</text>
            <text x="280" y="395" class="plan-label">Copa</text>
            <text x="460" y="395" class="plan-label">Sala Comex</text>

            <!-- cross / radial hint -->
            <line x1="300" y1="40" x2="300" y2="480" class="plan-cross"/>
            <line x1="40" y1="260" x2="560" y2="260" class="plan-cross"/>

            <!-- compass -->
            <g transform="translate(540,480)">
              <circle r="18" fill="#0a0e14" stroke="#262c38" stroke-width="1"/>
              <text y="-6" text-anchor="middle" class="plan-label plan-label-area" font-size="8">N</text>
              <path d="M0,-14 L4,2 L0,-3 L-4,2 Z" fill="#00e5ff"/>
            </g>
          </svg>
        </div>

        <aside class="hv-right">
          <div class="hv-metric">
            <div class="hv-metric-label">Carga total edifÃ­cio</div>
            <div class="hv-metric-value">386<span class="unit">kW</span></div>
            <div class="hv-progress"><span style="width:78%"></span></div>
          </div>
          <div class="hv-metric">
            <div class="hv-metric-label">TÃ©rreo</div>
            <div class="hv-metric-value">208<span class="unit">kW</span></div>
            <div class="hv-progress"><span style="width:54%"></span></div>
          </div>
          <div class="hv-metric">
            <div class="hv-metric-label">1Âº Andar</div>
            <div class="hv-metric-value">178<span class="unit">kW</span></div>
            <div class="hv-progress"><span style="width:46%"></span></div>
          </div>
          <div class="hv-metric">
            <div class="hv-metric-label">Ar externo NBR 16401-3</div>
            <div class="hv-metric-value">3.420<span class="unit">L/s</span></div>
          </div>
          <div style="margin-top:auto;padding-top:20px;border-top:1px solid var(--line);font-family:var(--font-mono);font-size:10.5px;color:var(--ink-muted);letter-spacing:.03em;line-height:1.6">
            <div>salvador / bahia</div>
            <div>tbs 32.2Â°c Â· tbu 26.5Â°c</div>
            <div>fachada crÃ­tica: norte</div>
          </div>
        </aside>
      </div>
    </div>
  </div>

  <div class="strip">
    <div class="strip-item">ABNT NBR 16401-1/2/3</div>
    <div class="strip-item">ABNT NBR 17037:2023</div>
    <div class="strip-item">ABNT NBR 13971</div>
    <div class="strip-item">ASHRAE 62.1</div>
    <div class="strip-item">ezdxf Â· python-docx</div>
    <div class="strip-item">OpenCV Â· pdfplumber</div>
  </div>

  <section class="section">
    <div class="section-head">
      <div class="section-label">O que o motor faz</div>
      <h2>Do <span class="serif">take-off</span> Ã  carga tÃ©rmica, sem planilha intermediÃ¡ria.</h2>
    </div>

    <div class="features-grid">
      <div class="feature">
        <div class="feature-num">01</div>
        <div class="feature-icon">
          <svg class="i" viewBox="0 0 24 24"><path d="M9 12h6M12 9v6M21 11c0 5-4 9-9 9s-9-4-9-9 4-9 9-9c2 0 4 .7 5.5 2"/><path d="M17 5l4-2-2 4"/></svg>
        </div>
        <h3>Geo-projeto automÃ¡tico</h3>
        <p>Define localidade, busca TBS/TBU da NBR 16401-1 e a rosa dos ventos define qual fachada recebe a maior carga de radiaÃ§Ã£o solar.</p>
        <div class="feature-tag">Salvador Â· SÃ£o Paulo Â· Manaus Â· +120</div>
      </div>
      <div class="feature">
        <div class="feature-num">02</div>
        <div class="feature-icon">
          <svg class="i" viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 3v18"/></svg>
        </div>
        <h3>VisÃ£o computacional</h3>
        <p>OCR + geometric reasoning extrai ambientes, Ã¡reas, cotas, pele de vidro e divisÃ³rias diretamente do PDF arquitetÃ´nico.</p>
        <div class="feature-tag">pdfplumber Â· opencv Â· docling</div>
      </div>
      <div class="feature">
        <div class="feature-num">03</div>
        <div class="feature-icon">
          <svg class="i" viewBox="0 0 24 24"><path d="M12 2v20M2 12h20M7 7l10 10M17 7L7 17"/></svg>
        </div>
        <h3>Tabela interativa</h3>
        <p>Revise e ajuste cada ambiente â fator de uso, tipo de vidro, equipamentos em W â e veja a carga em kW recalcular ao vivo.</p>
        <div class="feature-tag">editÃ¡vel Â· versionada Â· auditÃ¡vel</div>
      </div>
      <div class="feature">
        <div class="feature-num">04</div>
        <div class="feature-icon">
          <svg class="i" viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
        </div>
        <h3>Motor termodinÃ¢mico</h3>
        <p>Pessoas, iluminaÃ§Ã£o, equipamentos, envoltÃ³ria crÃ­tica e penalidade de plenum. Ar externo conforme NBR 16401-3.</p>
        <div class="feature-tag">Q_int + Q_env + Q_plenum + V_o</div>
      </div>
      <div class="feature">
        <div class="feature-num">05</div>
        <div class="feature-icon">
          <svg class="i" viewBox="0 0 24 24"><path d="M4 4h16v16H4z"/><path d="M4 10h16M10 4v16"/></svg>
        </div>
        <h3>Dimensionamento & dutos</h3>
        <p>Agrupa sistemas por pavimento, sugere mÃ¡quinas VRF e calcula a rede de dutos com igual perda de carga ou recuperaÃ§Ã£o estÃ¡tica.</p>
        <div class="feature-tag">darcy-weisbach Â· ashrae db</div>
      </div>
      <div class="feature">
        <div class="feature-num">06</div>
        <div class="feature-icon">
          <svg class="i" viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6z"/><path d="M14 2v6h6M16 13H8M16 17H8M10 9H8"/></svg>
        </div>
        <h3>EntregÃ¡veis prontos</h3>
        <p>Gera o arquivo CAD em .dxf com blocos de mÃ¡quinas e dutos locados, e o memorial descritivo em .docx com a justificativa tÃ©cnica.</p>
        <div class="feature-tag">ezdxf Â· python-docx Â· versionamento</div>
      </div>
    </div>

    <!-- PIPELINE -->
    <div class="pipeline">
      <div class="section-head" style="margin-bottom:40px">
        <div class="section-label">Pipeline</div>
        <h2 style="font-size:28px">Sete passos. <span class="serif">Zero</span> planilhas.</h2>
      </div>
      <div class="pipeline-steps">
        <div class="pstep"><div class="pstep-ico">01</div><h4>Geo</h4><p>clima & orientaÃ§Ã£o</p></div>
        <div class="pstep"><div class="pstep-ico">02</div><h4>PDF</h4><p>OCR & vision</p></div>
        <div class="pstep"><div class="pstep-ico">03</div><h4>RevisÃ£o</h4><p>tabela editÃ¡vel</p></div>
        <div class="pstep"><div class="pstep-ico">04</div><h4>CÃ¡lculo</h4><p>NBR 16401</p></div>
        <div class="pstep"><div class="pstep-ico">05</div><h4>Sistemas</h4><p>VRF & dutos</p></div>
        <div class="pstep"><div class="pstep-ico">06</div><h4>QAI</h4><p>NBR 17037</p></div>
        <div class="pstep"><div class="pstep-ico">07</div><h4>Export</h4><p>.dxf + .docx</p></div>
      </div>
    </div>
  </section>

  <section class="cta-band">
    <div class="cta-inner">
      <h2>Pare de desenhar.<br/>Comece a <span class="serif">dimensionar.</span></h2>
      <p>Suba sua prÃ³xima planta e receba o memorial descritivo e o desenho de CAD conforme NBR 16401 â enquanto seu cafÃ© ainda estÃ¡ quente.</p>
      <div style="display:flex;gap:12px;justify-content:center;position:relative;flex-wrap:wrap">
        <button class="btn btn-primary btn-lg" onclick="location.href='mailto:contato@smarthvac.io?subject=Solicita%C3%A7%C3%A3o%20de%20acesso%20SmartHVAC'">
          Falar com especialista
          <svg class="i" viewBox="0 0 24 24"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
        </button>
        <button class="btn btn-outline btn-lg" onclick="openDemo()">
          Testar demo grÃ¡tis
        </button>
      </div>
    </div>
  </section>

  <footer>
    <div>SmartHVAC Â© 2026 Â· Thermal Engine v0.9</div>
    <div>salvador Â· ba</div>
  </footer>
</section>

<!-- =============================================================== -->
<!-- SCREEN 2 : AUTH                                                  -->
<!-- =============================================================== -->
<section class="screen" id="screen-auth">
  <div class="auth-wrap">
    <div class="auth-form-side">
      <a class="auth-back" onclick="go('landing')">
        <svg class="i" viewBox="0 0 24 24"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
        VOLTAR
      </a>

      <!-- LOGIN MODE -->
      <div id="authLogin">
        <h2>Entre no seu<br/>painel tÃ©rmico.</h2>
        <p>Acesse projetos, versÃµes de cÃ¡lculo e entregÃ¡veis de qualquer lugar.</p>

        <div class="field">
          <label>E-mail corporativo</label>
          <input type="email" id="loginEmail" placeholder="engenheiro@firma.com.br"/>
        </div>
        <div class="field">
          <label>Senha</label>
          <div class="pass-input-wrap">
            <input type="password" id="loginPass" placeholder="sua senha"/>
            <button type="button" class="pass-toggle" onclick="togglePassView('loginPass', this)" title="Mostrar/esconder senha" aria-label="Mostrar senha">
              <svg class="i eye-on" viewBox="0 0 24 24"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
              <svg class="i eye-off" viewBox="0 0 24 24" style="display:none"><path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24M1 1l22 22"/></svg>
            </button>
          </div>
        </div>
        <div style="display:flex;justify-content:space-between;font-size:12px;margin-top:-6px;margin-bottom:18px">
          <label style="color:var(--ink-dim);display:flex;gap:6px;align-items:center;cursor:pointer">
            <input type="checkbox" checked style="width:auto;accent-color:var(--cyan)"/>
            Lembrar de mim
          </label>
          <a style="color:var(--cyan);cursor:pointer" onclick="alert('Enviaremos um link de recuperaÃ§Ã£o para o e-mail cadastrado.')">Esqueci a senha</a>
        </div>

        <button class="btn btn-primary btn-lg auth-submit" onclick="doLogin()">
          Entrar
          <svg class="i" viewBox="0 0 24 24"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
        </button>

        <div class="auth-alt">
          NÃ£o tem acesso ainda? <a style="cursor:pointer" onclick="switchAuth('signup')">Solicitar conta</a>
        </div>
      </div>

      <!-- SIGNUP MODE (disabled: admin-managed) -->
      <div id="authSignup" style="display:none">
        <h2>Acesso por convite.</h2>
        <p>Contas SmartHVAC sÃ£o criadas pelo administrador da empresa. Entre em contato para solicitar seu acesso.</p>

        <div class="invite-box">
          <div class="invite-icon">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
          </div>
          <div>
            <div class="invite-title">GestÃ£o centralizada</div>
            <div class="invite-sub">Dois nÃ­veis de administrador controlam tudo: Admin Geral gerencia contas, Admin de Projetos aprova cÃ¡lculos.</div>
          </div>
        </div>

        <div class="invite-steps">
          <div class="invite-step"><span class="invite-num">1</span><div><strong>Admin cria sua conta</strong><div>com seu e-mail e papel (Engenheiro / Visualizador / Admin de Projetos)</div></div></div>
          <div class="invite-step"><span class="invite-num">2</span><div><strong>VocÃª recebe e-mail</strong><div>com link de primeiro acesso e senha temporÃ¡ria</div></div></div>
          <div class="invite-step"><span class="invite-num">3</span><div><strong>Define sua senha</strong><div>e comeÃ§a a usar a plataforma imediatamente</div></div></div>
        </div>

        <div class="demo-creds-box">
          <div class="demo-creds-head">
            <svg class="i" viewBox="0 0 24 24" style="color:var(--cyan)"><path d="M9 11H5a2 2 0 00-2 2v7a2 2 0 002 2h14a2 2 0 002-2v-7a2 2 0 00-2-2h-4M9 11V7a3 3 0 016 0v4"/></svg>
            <span>Credenciais de teste prÃ©-criadas</span>
          </div>
          <div class="demo-creds-row"><span class="demo-creds-label">Admin Geral</span><code>admin@smarthvac.io</code><code>admin@2026</code></div>
          <div class="demo-creds-row"><span class="demo-creds-label">Admin Projetos</span><code>projetos@smarthvac.io</code><code>projetos@2026</code></div>
        </div>

        <button class="btn btn-primary btn-lg auth-submit" onclick="location.href='mailto:contato@smarthvac.io?subject=Solicita%C3%A7%C3%A3o%20de%20acesso%20SmartHVAC'">
          <svg class="i" viewBox="0 0 24 24"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><path d="M22 6l-10 7L2 6"/></svg>
          Solicitar acesso comercial
        </button>

        <div class="auth-divider">ou</div>

        <button class="btn btn-outline btn-lg auth-submit" onclick="openDemo()">
          <svg class="i" viewBox="0 0 24 24"><polygon points="7 4 19 12 7 20 7 4" fill="currentColor"/></svg>
          Testar modo demonstraÃ§Ã£o
        </button>

        <div class="auth-alt">
          JÃ¡ tem acesso? <a style="cursor:pointer" onclick="switchAuth('login')">Entrar</a>
        </div>
      </div>
    </div>

    <div class="auth-visual-side">
      <div class="auth-visual-inner">
        <div class="big-kw">386<span class="unit">kW</span></div>
        <div class="label">CARGA CALCULADA Â· MATRIZ MARATÃ Â· R02</div>
        <p class="auth-quote">"Levantamento de 3 dias virou um clique. O motor nÃ£o erra uma cota."</p>
        <div class="auth-quote-by">â Eng. Pedro Lima, HVAC Brasil</div>
      </div>
    </div>
  </div>
</section>

<!-- =============================================================== -->
<!-- SCREEN : OAUTH SIMULATION                                        -->
<!-- =============================================================== -->
<section class="screen" id="screen-oauth">
  <div class="oauth-wrap">
    <div class="oauth-card">
      <div class="oauth-logo" id="oauthLogoSlot"></div>
      <h2 id="oauthTitle">Entrar com Google</h2>
      <p id="oauthSubtitle">para continuar em SmartHVAC</p>

      <div class="oauth-account" onclick="confirmOauth()">
        <div class="oauth-avatar" id="oauthAvatar">LP</div>
        <div class="oauth-account-info">
          <div class="oauth-name">Lucas Pereira</div>
          <div class="oauth-email">engenheiro@firma.com.br</div>
        </div>
        <svg class="i" viewBox="0 0 24 24" style="color:var(--ink-muted)"><path d="M9 18l6-6-6-6"/></svg>
      </div>
      <div class="oauth-account secondary" onclick="confirmOauth()">
        <div class="oauth-avatar" style="background:linear-gradient(135deg,#ffb547,#ff5b3c)">MS</div>
        <div class="oauth-account-info">
          <div class="oauth-name">Maria Silva</div>
          <div class="oauth-email">msilva@firma.com.br</div>
        </div>
        <svg class="i" viewBox="0 0 24 24" style="color:var(--ink-muted)"><path d="M9 18l6-6-6-6"/></svg>
      </div>
      <div class="oauth-account secondary" onclick="confirmOauth()">
        <svg class="i" viewBox="0 0 24 24" style="color:var(--ink-muted);width:32px;height:32px"><circle cx="12" cy="12" r="10"/><path d="M12 8v4M12 16h.01"/></svg>
        <div class="oauth-account-info">
          <div class="oauth-name">Usar outra conta</div>
        </div>
      </div>

      <div class="oauth-footer">
        <a onclick="go('auth')" style="cursor:pointer">Cancelar</a>
        <span id="oauthProvider">Google</span>
      </div>
    </div>
  </div>
</section>

<!-- =============================================================== -->
<!-- SCREEN 3 : APP (authenticated)                                   -->
<!-- =============================================================== -->
<section class="screen" id="screen-app">
  <div class="app-layout">
    <aside class="sidebar">
      <div class="logo">
        <div class="logo-mark">
          <svg viewBox="0 0 28 28">
            <path d="M4 8 L14 3 L24 8 L24 20 L14 25 L4 20 Z" fill="none" stroke="#00e5ff" stroke-width="1.5"/>
            <circle cx="14" cy="14" r="1.8" fill="#00e5ff"/>
          </svg>
        </div>
        <span>Smart<span class="accent">HVAC</span></span>
      </div>

      <div class="sb-section">
        <div class="sb-title sb-title-btn" onclick="backToLanding()" title="Voltar para a pÃ¡gina inicial">
          <svg class="i" viewBox="0 0 24 24" style="width:11px;height:11px"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
          <span>Workspace</span>
          <svg class="i sb-title-home" viewBox="0 0 24 24" style="width:11px;height:11px;margin-left:auto"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/></svg>
        </div>
        <div class="sb-item active" data-view="dashboard" data-restricted="projects" onclick="showView('dashboard')">
          <svg class="i" viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>
          Projetos
        </div>
        <div class="sb-item" data-view="wizard" data-restricted="projects" onclick="startNewProject()">
          <svg class="i" viewBox="0 0 24 24"><path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"/><path d="M3.27 6.96L12 12.01l8.73-5.05M12 22.08V12"/></svg>
          Novo cÃ¡lculo
        </div>
        <div class="sb-item" data-view="libraries" data-restricted="projects" onclick="showView('libraries')">
          <svg class="i" viewBox="0 0 24 24"><path d="M4 4h16v16H4z"/><path d="M4 10h16"/></svg>
          Bibliotecas
        </div>
        <div class="sb-item" data-view="history" data-restricted="projects" onclick="showView('history')">
          <svg class="i" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
          HistÃ³rico
        </div>
      </div>

      <div class="sb-section" data-restricted="projects">
        <div class="sb-title">Normativos</div>
        <div class="sb-item" data-view="norms" onclick="showView('norms','nbr-16401-1')"><svg class="i" viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><path d="M14 2v6h6"/></svg>NBR 16401-1</div>
        <div class="sb-item" data-view="norms" onclick="showView('norms','nbr-16401-2')"><svg class="i" viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><path d="M14 2v6h6"/></svg>NBR 16401-2</div>
        <div class="sb-item" data-view="norms" onclick="showView('norms','nbr-16401-3')"><svg class="i" viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><path d="M14 2v6h6"/></svg>NBR 16401-3</div>
        <div class="sb-item" data-view="norms" onclick="showView('norms','nbr-17037')"><svg class="i" viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><path d="M14 2v6h6"/></svg>NBR 17037</div>
      </div>

      <div class="sb-section">
        <div class="sb-title">Conta</div>
        <div class="sb-item" data-view="settings" onclick="showView('settings')"><svg class="i" viewBox="0 0 24 24"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 11-2.83 2.83l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 11-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 11-2.83-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 110-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 112.83-2.83l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 114 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 112.83 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 110 4h-.09a1.65 1.65 0 00-1.51 1z"/></svg>ConfiguraÃ§Ãµes</div>
        <div class="sb-item" data-view="admin" onclick="showView('admin')" id="sidebarAdminEntry" style="display:none"><svg class="i" viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>AdministraÃ§Ã£o</div>
      </div>

      <div class="sb-user" onclick="toggleUserMenu(event)">
        <div class="sb-avatar" id="sbAvatar">â</div>
        <div class="sb-user-info">
          <div class="name" id="sbUserName">â</div>
          <div class="role" id="sbUserRole">â</div>
        </div>
        <svg class="i" viewBox="0 0 24 24" style="color:var(--ink-muted);width:14px;height:14px"><path d="M6 9l6 6 6-6"/></svg>

        <div class="user-menu" id="userMenu">
          <div class="user-menu-head">
            <div class="sb-avatar" style="width:40px;height:40px;font-size:15px" id="menuAvatar">â</div>
            <div>
              <div style="font-size:13px;font-weight:500;color:var(--ink)" id="menuUserName">â</div>
              <div style="font-size:11px;color:var(--ink-muted)" id="menuUserEmail">â</div>
            </div>
          </div>
          <div class="user-menu-items">
            <div class="user-menu-item" onclick="showView('settings');closeUserMenu()">
              <svg class="i" viewBox="0 0 24 24"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 11-2.83 2.83l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 11-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 11-2.83-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 110-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 112.83-2.83l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 114 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 112.83 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 110 4h-.09a1.65 1.65 0 00-1.51 1z"/></svg>
              ConfiguraÃ§Ãµes da conta
            </div>
            <div class="user-menu-item" onclick="showView('admin');closeUserMenu()" id="menuAdminEntry" style="display:none">
              <svg class="i" viewBox="0 0 24 24"><path d="M12 2a10 10 0 1010 10A10 10 0 0012 2zm0 3.5a2.5 2.5 0 11-2.5 2.5A2.5 2.5 0 0112 5.5zm0 13a7.5 7.5 0 01-6-3c0-2 4-3.1 6-3.1s6 1.1 6 3.1a7.5 7.5 0 01-6 3z"/></svg>
              Painel administrativo
            </div>
            <div class="user-menu-item">
              <svg class="i" viewBox="0 0 24 24"><path d="M9 11H5a2 2 0 00-2 2v7a2 2 0 002 2h14a2 2 0 002-2v-7a2 2 0 00-2-2h-4M9 11V7a3 3 0 016 0v4"/></svg>
              SeguranÃ§a
            </div>
            <div class="user-menu-item">
              <svg class="i" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3M12 17h.01"/></svg>
              Ajuda & Suporte
            </div>
          </div>
          <div class="user-menu-footer">
            <div class="user-menu-item danger" onclick="doLogout()">
              <svg class="i" viewBox="0 0 24 24"><path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9"/></svg>
              Sair da conta
            </div>
          </div>
        </div>
      </div>
    </aside>

    <main class="main">
      <!-- =========== DASHBOARD VIEW =========== -->
      <div class="view" id="view-dashboard">
        <div class="topbar">
          <div class="crumbs">
            <span style="cursor:pointer;color:var(--cyan)" onclick="showView('dashboard')" title="Painel de projetos">WORKSPACE</span>
            <span class="sep">/</span>
            <span class="now">PROJETOS</span>
          </div>
          <div class="topbar-actions">
            <div class="search-wrap">
              <div class="search-mini" onclick="openSearch()">
                <svg class="i" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>
                <span>Buscar projetos, normas, ambientesâ¦</span>
                <kbd>âK</kbd>
              </div>
              <div class="search-dropdown" id="searchDropdown">
                <div class="search-input-wrap">
                  <svg class="i" viewBox="0 0 24 24" style="color:var(--ink-muted)"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>
                  <input type="text" id="searchInput" placeholder="Digite para buscar..." oninput="doSearch(this.value)"/>
                  <kbd onclick="closeSearch()" style="cursor:pointer">ESC</kbd>
                </div>
                <div class="search-results" id="searchResults">
                  <div class="search-section">
                    <div class="search-section-title">Projetos recentes</div>
                    <div id="searchProjects">
                      <div style="padding:14px;color:var(--ink-muted);font-size:12px;font-family:var(--font-mono);text-align:center">Nenhum projeto criado ainda</div>
                    </div>
                  </div>
                  <div class="search-section">
                    <div class="search-section-title">AÃ§Ãµes rÃ¡pidas</div>
                    <div class="search-result" onclick="closeSearch();startNewProject()">
                      <svg class="i" viewBox="0 0 24 24"><path d="M12 5v14M5 12h14"/></svg>
                      <div><div class="sr-name">Novo projeto</div><div class="sr-sub">Iniciar cÃ¡lculo do zero</div></div>
                    </div>
                    <div class="search-result" onclick="closeSearch();showView('libraries')">
                      <svg class="i" viewBox="0 0 24 24"><path d="M4 4h16v16H4z"/></svg>
                      <div><div class="sr-name">Bibliotecas de equipamentos</div><div class="sr-sub">VRFs, dutos, acessÃ³rios</div></div>
                    </div>
                    <div class="search-result" onclick="closeSearch();showView('norms','nbr-17037')">
                      <svg class="i" viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/></svg>
                      <div><div class="sr-name">NBR 17037 Â· QAI</div><div class="sr-sub">Qualidade do ar interior</div></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <button class="btn btn-icon btn-outline" onclick="showView('notifications')" title="NotificaÃ§Ãµes"><svg class="i" viewBox="0 0 24 24"><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 01-3.46 0"/></svg></button>
            <button class="btn btn-icon btn-outline" onclick="backToLanding()" title="Site inicial"><svg class="i" viewBox="0 0 24 24"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/></svg></button>
            <button class="btn btn-icon btn-outline" onclick="doLogout()" title="Sair da conta"><svg class="i" viewBox="0 0 24 24"><path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9"/></svg></button>
            <button class="btn btn-primary" onclick="startNewProject()">
              <svg class="i" viewBox="0 0 24 24"><path d="M12 5v14M5 12h14"/></svg>
              Novo projeto
            </button>
          </div>
        </div>

        <div class="page">
          <div class="page-head">
            <div>
              <h1>Bem-vindo, <span id="dashUserName">â</span></h1>
              <p id="dashSubtitle">VocÃª ainda nÃ£o tem projetos. Crie o primeiro para comeÃ§ar.</p>
            </div>
          </div>

          <div class="stats-row" id="statsRow">
            <!-- Preenchido dinamicamente pelo JS -->
          </div>

          <div class="projects-head">
            <h2>Seus projetos</h2>
            <div class="filter-chips">
              <div class="chip active" data-filter="all" onclick="filterProjects('all',this)">Todos</div>
              <div class="chip" data-filter="incomplete" onclick="filterProjects('incomplete',this)">Incompletos</div>
              <div class="chip" data-filter="draft" onclick="filterProjects('draft',this)">Rascunhos</div>
              <div class="chip" data-filter="final" onclick="filterProjects('final',this)">Finalizados</div>
            </div>
          </div>

          <div class="projects-grid" <a href="relatorio-obra.html" style="display:block;margin-bottom:16px;text-decoration:none"><div style="background:linear-gradient(135deg,#00d4ff15,#0099cc10);border:1px solid #00d4ff33;border-radius:14px;padding:16px 18px;display:flex;align-items:center;gap:14px;transition:all .2s" onmouseover="this.style.borderColor='#00d4ff88'" onmouseout="this.style.borderColor='#00d4ff33'"><div style="width:44px;height:44px;background:linear-gradient(135deg,#00d4ff,#0099cc);border-radius:11px;display:grid;place-items:center;flex-shrink:0"><svg viewBox="0 0 24 24" fill="none" stroke="#001a22" stroke-width="2.2" width="22" height="22"><path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2"/><rect x="9" y="3" width="6" height="4" rx="1"/><path d="M9 12h6M9 16h4"/></svg></div><div style="flex:1"><div style="font-size:15px;font-weight:700;color:#e8edf5;letter-spacing:-.02em">RelatÃ³rio de Obra (RDO)</div><div style="font-size:12px;color:#5a6a85;margin-top:2px">Fotos Â· Croquis Â· Checklist Â· RelatÃ³rio tÃ©cnico</div></div><svg viewBox="0 0 24 24" fill="none" stroke="#00d4ff" stroke-width="2" width="18" height="18"><path d="M9 18l6-6-6-6"/></svg></div></a><div class="projects-grid" id="projectsGrid">>
            <!-- Preenchido dinamicamente pelo JS -->
          </div>
        </div>
      </div>

      <!-- =========== WIZARD VIEW =========== -->
      <div class="view" id="view-wizard" style="display:none">
        <div class="topbar">
          <div class="crumbs">
            <span style="cursor:pointer" onclick="exitWizard()">PROJETOS</span>
            <span class="sep">/</span>
            <span class="now" id="wizardCrumb">NOVO PROJETO</span>
          </div>
          <div class="topbar-actions">
            <button class="btn btn-outline" style="font-size:12px;padding:7px 12px" onclick="exitWizard()" title="Voltar ao painel">
              <svg class="i" viewBox="0 0 24 24" style="width:14px;height:14px"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
              Painel
            </button>
            <button class="btn btn-outline" onclick="saveProject(this)">
              <svg class="i" viewBox="0 0 24 24"><path d="M19 21H5a2 2 0 01-2-2V5a2 2 0 012-2h11l5 5v11a2 2 0 01-2 2z"/><path d="M17 21v-8H7v8M7 3v5h8"/></svg>
              Salvar
            </button>
            <button class="btn btn-outline" style="border-color:var(--ok);color:var(--ok)" onclick="saveAsFinal(this)" title="Enviar projeto para aprovaÃ§Ã£o do Admin de Projetos">
              <svg class="i" viewBox="0 0 24 24"><path d="M22 11.08V12a10 10 0 11-5.93-9.14M22 4L12 14.01l-3-3"/></svg>
              Enviar p/ aprovaÃ§Ã£o
            </button>
            <button class="btn btn-primary" onclick="processCalculation(this)">
              Processar cÃ¡lculo
              <svg class="i" viewBox="0 0 24 24"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
            </button>
          </div>
        </div>

        <div class="page">
          <div class="wizard-head">
            <div class="wizard-title">
              <h1 id="wizardTitle">Matriz MaratÃ¡</h1>
              <span class="ver" id="wizardVer">VERSÃO 02</span>
            </div>
          </div>

          <!-- STEPS TRACKER -->
          <div class="steps">
            <div class="step done" onclick="setStep(1)"><div class="step-num">â</div><div class="step-label">Geo-projeto</div></div>
            <div class="step-sep"></div>
            <div class="step done" onclick="setStep(2)"><div class="step-num">â</div><div class="step-label">Upload PDF</div></div>
            <div class="step-sep"></div>
            <div class="step active" onclick="setStep(3)"><div class="step-num">3</div><div class="step-label">ValidaÃ§Ã£o</div></div>
            <div class="step-sep"></div>
            <div class="step" onclick="setStep(4)"><div class="step-num">4</div><div class="step-label">CÃ¡lculo</div></div>
            <div class="step-sep"></div>
            <div class="step" onclick="setStep(5)"><div class="step-num">5</div><div class="step-label">Sistemas</div></div>
            <div class="step-sep"></div>
            <div class="step" onclick="setStep(6)"><div class="step-num">6</div><div class="step-label">QAI Â· NBR 17037</div></div>
            <div class="step-sep"></div>
            <div class="step" onclick="setStep(7)"><div class="step-num">7</div><div class="step-label">EntregÃ¡veis</div></div>
          </div>

          <!-- ====== STEP 1: GEO ====== -->
          <div class="step-panel" id="panel-1">
            <div class="geo-grid">
              <div class="card">
                <h3>IdentificaÃ§Ã£o do projeto</h3>
                <p class="desc">DÃª um nome ao projeto e informe a localizaÃ§Ã£o. Os dados climÃ¡ticos da NBR 16401-1 serÃ£o buscados automaticamente.</p>
                <div class="field">
                  <label>Nome do projeto *</label>
                  <input type="text" id="projectName" placeholder="Ex: Hospital SÃ£o Lucas â bloco A" oninput="onProjectNameInput()"/>
                  <div style="font-size:11px;color:var(--ink-muted);margin-top:6px;font-family:var(--font-mono)">aparecerÃ¡ no painel inicial e nos entregÃ¡veis</div>
                </div>
                <div class="field">
                  <label>Cidade / UF</label>
                  <select id="geoCity" onchange="updateClimate()">
                    <option value="">Selecione a cidadeâ¦</option>
                    <option value="salvador">Salvador Â· BA</option>
                    <option value="sp">SÃ£o Paulo Â· SP</option>
                    <option value="rj">Rio de Janeiro Â· RJ</option>
                    <option value="recife">Recife Â· PE</option>
                    <option value="manaus">Manaus Â· AM</option>
                    <option value="brasilia">BrasÃ­lia Â· DF</option>
                    <option value="poa">Porto Alegre Â· RS</option>
                    <option value="fortaleza">Fortaleza Â· CE</option>
                  </select>
                </div>
                <div class="field">
                  <label>EndereÃ§o completo</label>
                  <input type="text" id="geoAddress" placeholder="Digite o endereÃ§o do projetoâ¦"/>
                </div>
                <div class="climate-box">
                  <div class="climate-box-title">DADOS CLIMÃTICOS Â· NBR 16401-1</div>
                  <div class="climate-grid">
                    <div class="climate-stat"><div class="k">Temp. Bulbo Seco</div><div class="v" id="climTBS">â<span class="unit">Â°C</span></div></div>
                    <div class="climate-stat"><div class="k">Temp. Bulbo Ãmido</div><div class="v" id="climTBU">â<span class="unit">Â°C</span></div></div>
                    <div class="climate-stat"><div class="k">Altitude</div><div class="v" id="climAlt">â<span class="unit">m</span></div></div>
                    <div class="climate-stat"><div class="k">Latitude</div><div class="v" id="climLat">â<span class="unit">Â°</span></div></div>
                  </div>
                </div>
              </div>

              <div class="card">
                <h3>OrientaÃ§Ã£o Â· rosa dos ventos</h3>
                <p class="desc">Defina o norte geogrÃ¡fico da planta. Determina qual fachada recebe maior radiaÃ§Ã£o.</p>
                <div class="compass-wrap">
                  <div class="compass">
                    <span class="compass-dot n">N</span>
                    <span class="compass-dot e">L</span>
                    <span class="compass-dot s">S</span>
                    <span class="compass-dot w">O</span>
                    <div class="compass-needle" id="needle" style="transform:rotate(0deg)"></div>
                  </div>
                  <div class="orient-input" style="width:100%">
                    <span style="font-family:var(--font-mono);font-size:11px;color:var(--ink-muted)">0Â°</span>
                    <input type="range" min="0" max="360" value="0" id="orientRange"/>
                    <span class="deg" id="orientVal">0Â°</span>
                  </div>
                </div>
                <div class="climate-box">
                  <div class="climate-box-title">FACHADA CRÃTICA DETECTADA</div>
                  <div style="font-size:14px;color:var(--ink)" id="facadeText">Defina a orientaÃ§Ã£o para calcular</div>
                  <div style="margin-top:6px;font-size:11.5px;color:var(--ink-muted);font-family:var(--font-mono)" id="facadeSub">â</div>
                </div>
              </div>
            </div>
          </div>

          <!-- ====== STEP 2: UPLOAD ====== -->
          <div class="step-panel" id="panel-2">
            <input type="file" id="pdfFileInput" accept=".pdf,application/pdf" style="display:none" onchange="handleFileSelect(event)"/>
            <div class="upload-zone" id="uploadZone" onclick="document.getElementById('pdfFileInput').click()"
                 ondrop="handleFileDrop(event)" ondragover="event.preventDefault();this.classList.add('dragging')"
                 ondragleave="this.classList.remove('dragging')">
              <svg class="upload-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.25">
                <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/>
                <polyline points="17 8 12 3 7 8"/>
                <line x1="12" y1="3" x2="12" y2="15"/>
              </svg>
              <h3 id="uploadTitle">Arraste a planta arquitetÃ´nica</h3>
              <p id="uploadSub">ou clique para selecionar do seu computador</p>
              <div class="fmt">PDF Â· MÃ¡x. 50MB Â· DWG em breve</div>
            </div>

            <div class="processing" id="processing">
              <div class="file-chip" id="fileChip" style="display:none">
                <svg class="i" viewBox="0 0 24 24" style="color:var(--cyan)"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><path d="M14 2v6h6"/></svg>
                <div style="flex:1">
                  <div class="file-name" id="fileChipName">planta.pdf</div>
                  <div class="file-size" id="fileChipSize">â</div>
                </div>
                <button class="btn btn-ghost" style="padding:4px 8px" onclick="clearFile()"><svg class="i" viewBox="0 0 24 24"><path d="M18 6L6 18M6 6l12 12"/></svg></button>
              </div>
              <div class="proc-steps">
                <div class="proc-step" data-step="1"><div class="proc-dot"></div>Upload do arquivo<div class="proc-time">â</div></div>
                <div class="proc-step" data-step="2"><div class="proc-dot"></div>ExtraÃ§Ã£o de texto e cotas (pdfplumber)<div class="proc-time">â</div></div>
                <div class="proc-step" data-step="3"><div class="proc-dot"></div>AnÃ¡lise de geometria e paredes (OpenCV)<div class="proc-time">â</div></div>
                <div class="proc-step" data-step="4"><div class="proc-dot"></div>IdentificaÃ§Ã£o de pelotas de vidro e divisÃ³rias<div class="proc-time">â</div></div>
                <div class="proc-step" data-step="5"><div class="proc-dot"></div>ClassificaÃ§Ã£o de ambientes<div class="proc-time">â</div></div>
                <div class="proc-step" data-step="6"><div class="proc-dot"></div>Estimativa de ocupaÃ§Ã£o<div class="proc-time">â</div></div>
              </div>
              <div id="processingDone" style="display:none;margin-top:16px;padding:16px;background:rgba(52,211,153,.08);border:1px solid rgba(52,211,153,.25);border-radius:8px;display:none;gap:12px;align-items:center">
                <svg class="i" viewBox="0 0 24 24" style="color:var(--ok);width:22px;height:22px;flex-shrink:0"><path d="M22 11.08V12a10 10 0 11-5.93-9.14M22 4L12 14.01l-3-3"/></svg>
                <div style="flex:1">
                  <div style="font-size:13.5px;font-weight:500">ExtraÃ§Ã£o concluÃ­da Â· 26 ambientes detectados</div>
                  <div style="font-size:11.5px;color:var(--ink-dim);margin-top:2px;font-family:var(--font-mono)">avance para validar os dados no visualizador</div>
                </div>
                <button class="btn btn-primary" onclick="setStep(3)" style="font-size:12px;padding:6px 12px">PrÃ³ximo</button>
              </div>
            </div>
          </div>

          <!-- ====== STEP 3: VISUALIZER â THE WOW MOMENT ====== -->
          <div class="step-panel active" id="panel-3">
            <div class="split-view">
              <!-- LADO ESQUERDO: PDF DO PROJETO -->
              <div class="split-pdf">
                <div class="split-toolbar">
                  <div style="font-family:var(--font-mono);font-size:11px;color:var(--ink-dim);letter-spacing:.05em;flex:1;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">
                    <span style="color:var(--cyan)">â</span> PLANTA Â· <span id="splitPdfName">aguardando uploadâ¦</span>
                  </div>
                  <div style="display:flex;gap:6px;flex-shrink:0">
                    <button class="btn btn-icon btn-outline" onclick="setStep(2)" title="Substituir PDF"><svg class="i" viewBox="0 0 24 24"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5-5 5 5M12 5v12"/></svg></button>
                    <button class="btn btn-icon btn-outline" onclick="downloadCurrentPdf()" title="Baixar PDF" id="splitPdfDownloadBtn" disabled><svg class="i" viewBox="0 0 24 24"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3"/></svg></button>
                    <button class="btn btn-icon btn-outline" onclick="openPdfFullscreen()" title="Tela cheia"><svg class="i" viewBox="0 0 24 24"><path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/></svg></button>
                  </div>
                </div>
                <div class="split-pdf-canvas" id="splitPdfCanvas">
                  <div class="split-pdf-empty" id="splitPdfEmpty">
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round" style="opacity:.4;margin-bottom:14px">
                      <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/>
                      <path d="M14 2v6h6"/>
                    </svg>
                    <div style="font-size:13px;color:var(--ink-dim);margin-bottom:6px">Nenhum PDF carregado</div>
                    <div style="font-size:11px;color:var(--ink-muted);font-family:var(--font-mono);margin-bottom:14px">volte ao passo 2 para fazer o upload</div>
                    <button class="btn btn-outline" style="font-size:12px;padding:6px 14px" onclick="setStep(2)">Carregar PDF</button>
                  </div>
                  <iframe id="splitPdfFrame" style="display:none;border:none" title="Planta do projeto"></iframe>
                </div>
              </div>

              <!-- LADO DIREITO: TABELA DE CÃLCULO -->
              <div class="split-calc">
                <div class="split-toolbar">
                  <h3 style="font-size:13px;font-weight:500">CÃ¡lculo de carga tÃ©rmica</h3>
                  <div style="display:flex;gap:6px">
                    <button class="btn btn-outline" style="font-size:11px;padding:5px 10px" onclick="loadDemoTable()" title="Carrega o exemplo Matriz MaratÃ¡ com 26 ambientes">
                      <svg class="i" viewBox="0 0 24 24" style="width:13px;height:13px"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><path d="M14 2v6h6M16 13H8M16 17H8M10 9H8"/></svg>
                      Exemplo
                    </button>
                    <button class="btn btn-outline" style="font-size:11px;padding:5px 10px" onclick="exportCSV()">
                      <svg class="i" viewBox="0 0 24 24" style="width:13px;height:13px"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3"/></svg>
                      CSV
                    </button>
                    <button class="btn btn-primary" style="font-size:11px;padding:5px 10px" onclick="recalculate(this)">
                      <svg class="i" viewBox="0 0 24 24" style="width:13px;height:13px"><path d="M23 4v6h-6M1 20v-6h6"/><path d="M20.49 9A9 9 0 005.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 013.51 15"/></svg>
                      Recalcular
                    </button>
                  </div>
                </div>
                <div style="display:flex;gap:10px;padding:10px 14px;background:var(--bg-2);border-bottom:1px solid var(--line);font-size:11px;align-items:center;flex-wrap:wrap">
                  <span style="font-family:var(--font-mono);color:var(--ink-muted);letter-spacing:.06em;text-transform:uppercase;font-size:10px">marca preferida</span>
                  <select id="calcBrand" onchange="syncBrandToSystem()" style="padding:4px 8px;background:var(--bg-1);border:1px solid var(--line-2);color:var(--ink);border-radius:4px;font-size:11px;cursor:pointer"><option>Daikin VRV-X</option><option>LG Multi V 5</option><option>Midea V8 Pro</option><option>Samsung DVM S2</option><option>Hitachi Set Free Sigma</option></select>
                  <span style="color:var(--line-2)">Â·</span>
                  <span style="font-family:var(--font-mono);color:var(--ink-muted);letter-spacing:.06em;text-transform:uppercase;font-size:10px">refrigerante</span>
                  <select id="calcGas" onchange="syncBrandToSystem()" style="padding:4px 8px;background:var(--bg-1);border:1px solid var(--line-2);color:var(--ink);border-radius:4px;font-size:11px;cursor:pointer"><option>R-410A</option><option>R-32 (recomendado)</option><option>R-454B</option></select>
                  <span style="color:var(--line-2)">Â·</span>
                  <span style="font-family:var(--font-mono);color:var(--ink-muted);letter-spacing:.06em;text-transform:uppercase;font-size:10px">topologia</span>
                  <select id="calcTopo" onchange="syncBrandToSystem()" style="padding:4px 8px;background:var(--bg-1);border:1px solid var(--line-2);color:var(--ink);border-radius:4px;font-size:11px;cursor:pointer"><option value="vrf">VRF (1 condensadora Â· vÃ¡rias evaporadoras)</option><option value="split">Split individual</option></select>
                </div>
                <div class="split-calc-body">
                  <div style="font-size:11.5px;color:var(--ink-muted);font-family:var(--font-mono);padding:10px 14px;background:var(--bg-2);border-bottom:1px solid var(--line)">
                    Edite qualquer cÃ©lula â recalcula automaticamente Â· NBR 16401-1/2/3
                  </div>
                  <div class="table-scroll" style="max-height:calc(100vh - 280px);overflow:auto">
                    <table class="split-table">
                      <thead>
                        <tr>
                          <th>Ambiente</th>
                          <th>Ãrea mÂ²</th>
                          <th>PÃ© D.</th>
                          <th>Ocup.</th>
                          <th>Vidro mÂ²</th>
                          <th>Div. NC</th>
                          <th>Piso Q.</th>
                          <th>Forro Q.</th>
                          <th>F. Uso</th>
                          <th>Carga kW</th>
                        </tr>
                      </thead>
                      <tbody id="masterTbody">
                        <tr class="floor-header"><td colspan="10">PAVIMENTO TÃRREO Â· <span data-floor-kw="terreo">0,00</span> kW Â· <button class="btn btn-ghost" style="padding:2px 8px;font-size:11px;color:var(--cyan)" onclick="addRoomRow('terreo')"><svg class="i" viewBox="0 0 24 24" style="width:11px;height:11px"><path d="M12 5v14M5 12h14"/></svg>Ambiente</button></td></tr>
                        <tr data-floor="terreo"><td><input class="cell-edit name" data-col="name" value="Sala 1" style="text-align:left"/></td><td><input class="cell-edit num" data-col="area" value="0,00"/></td><td><input class="cell-edit num" data-col="pe" value="3,0"/></td><td><input class="cell-edit num" data-col="ocup" value="0"/></td><td><input class="cell-edit num" data-col="vidro" value="0,00"/></td><td><input class="cell-edit num" data-col="div" value="0,00"/></td><td><input class="cell-edit num" data-col="piso" value="0,00"/></td><td><input class="cell-edit num" data-col="forro" value="0,00"/></td><td><input class="cell-edit num" data-col="fu" value="1,00"/></td><td class="kw" data-col="kw">0,00</td></tr>
                      </tbody>
                      <tfoot>
                        <tr>
                          <td colspan="9" style="text-align:right">Carga total do edifÃ­cio</td>
                          <td class="total-kw">0,00 kW</td>
                        </tr>
                      </tfoot>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- ====== STEP 4: TABLE ====== -->
          <!-- ====== STEP 4: RESUMO DE CARGA ====== -->
          <div class="step-panel" id="panel-4">
            <div style="margin-bottom:24px">
              <h3 style="font-size:18px;font-weight:500;letter-spacing:-.01em;margin-bottom:6px">Resumo do cÃ¡lculo</h3>
              <p style="font-size:13px;color:var(--ink-dim)">Volte ao passo anterior para ajustar valores Â· todos os totais sÃ£o recalculados em tempo real.</p>
            </div>
            <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:16px;margin-bottom:24px">
              <div class="card" style="padding:20px">
                <h3 style="font-size:13px;font-family:var(--font-mono);color:var(--ink-muted);letter-spacing:.08em;text-transform:uppercase;margin-bottom:10px">Carga interna</h3>
                <div style="font-size:26px;font-weight:500" id="sumCargaInt">142,6<span style="font-size:12px;color:var(--ink-dim);margin-left:4px;font-family:var(--font-mono)">kW</span></div>
              </div>
              <div class="card" style="padding:20px">
                <h3 style="font-size:13px;font-family:var(--font-mono);color:var(--ink-muted);letter-spacing:.08em;text-transform:uppercase;margin-bottom:10px">EnvoltÃ³ria</h3>
                <div style="font-size:26px;font-weight:500" id="sumCargaEnv">168,3<span style="font-size:12px;color:var(--ink-dim);margin-left:4px;font-family:var(--font-mono)">kW</span></div>
              </div>
              <div class="card" style="padding:20px">
                <h3 style="font-size:13px;font-family:var(--font-mono);color:var(--ink-muted);letter-spacing:.08em;text-transform:uppercase;margin-bottom:10px">Ar externo</h3>
                <div style="font-size:26px;font-weight:500" id="sumCargaArExt">75,4<span style="font-size:12px;color:var(--ink-dim);margin-left:4px;font-family:var(--font-mono)">kW</span></div>
              </div>
            </div>
            <div class="card" style="padding:24px;text-align:center">
              <div style="font-family:var(--font-mono);font-size:11px;color:var(--ink-muted);letter-spacing:.1em;text-transform:uppercase;margin-bottom:10px">CARGA TOTAL DO EDIFÃCIO</div>
              <div style="font-size:48px;font-weight:500;letter-spacing:-.02em;color:var(--cyan)" id="sumTotalKw">386,27<span style="font-size:18px;color:var(--ink-dim);margin-left:6px;font-family:var(--font-mono);font-weight:400">kW</span></div>
              <div style="font-size:12px;color:var(--ink-muted);margin-top:8px;font-family:var(--font-mono)">conforme NBR 16401-1/2/3:2024 Â· 21 ambientes calculados</div>
            </div>
            <div style="margin-top:18px;display:flex;gap:10px;justify-content:center">
              <button class="btn btn-outline" onclick="openCompare()" style="font-size:13px;padding:10px 18px">
                <svg class="i" viewBox="0 0 24 24"><path d="M16 3h5v5M4 20L21 3M21 16v5h-5M15 15l6 6M4 4l5 5"/></svg>
                Comparar cenÃ¡rios (vidro / pelÃ­cula / PVC)
              </button>
            </div>
          </div>

          <!-- ====== STEP 5: SYSTEMS ====== -->
          <div class="step-panel" id="panel-5">
            <div style="margin-bottom:24px">
              <h3 style="font-size:18px;font-weight:500;letter-spacing:-.01em;margin-bottom:6px">ConfiguraÃ§Ã£o do sistema</h3>
              <p style="font-size:13px;color:var(--ink-dim)">Defina a topologia (condensadora Ãºnica ou por evaporador) e o tipo de unidade interna a usar nos ambientes.</p>
            </div>

            <div class="card" style="padding:24px;margin-bottom:18px">
              <h3 style="font-size:14px;margin-bottom:18px;color:var(--cyan);letter-spacing:.05em;text-transform:uppercase;font-family:var(--font-mono)">1 Â· TOPOLOGIA DO SISTEMA</h3>
              <div style="display:grid;grid-template-columns:1fr 1fr;gap:14px">
                <label class="topo-option" style="cursor:pointer;padding:18px;background:var(--bg-2);border:2px solid var(--cyan);border-radius:8px;display:flex;gap:12px;align-items:flex-start">
                  <input type="radio" name="topo" value="vrf" checked style="margin-top:3px;accent-color:var(--cyan)"/>
                  <div>
                    <div style="font-weight:500;margin-bottom:4px">VRF â uma condensadora para vÃ¡rias evaporadoras</div>
                    <div style="font-size:11.5px;color:var(--ink-dim);line-height:1.5">Sistema centralizado de fluxo refrigerante variÃ¡vel. Ideal para edifÃ­cios comerciais. Permite atÃ© 64 unidades internas por condensadora.</div>
                  </div>
                </label>
                <label class="topo-option" style="cursor:pointer;padding:18px;background:var(--bg-2);border:2px solid var(--line-2);border-radius:8px;display:flex;gap:12px;align-items:flex-start">
                  <input type="radio" name="topo" value="split" style="margin-top:3px;accent-color:var(--cyan)"/>
                  <div>
                    <div style="font-weight:500;margin-bottom:4px">Split â uma condensadora por evaporadora</div>
                    <div style="font-size:11.5px;color:var(--ink-dim);line-height:1.5">Sistema individual ponto-a-ponto. Cada ambiente tem sua prÃ³pria condensadora externa. Ideal para residencial e pequenos comÃ©rcios.</div>
                  </div>
                </label>
              </div>
            </div>

            <div class="card" style="padding:24px;margin-bottom:18px">
              <h3 style="font-size:14px;margin-bottom:18px;color:var(--cyan);letter-spacing:.05em;text-transform:uppercase;font-family:var(--font-mono)">2 Â· TIPO DE UNIDADE INTERNA (EVAPORADORA)</h3>
              <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:12px">
                <label class="equip-option" style="cursor:pointer;padding:14px;background:var(--bg-2);border:2px solid var(--cyan);border-radius:8px;text-align:center">
                  <input type="radio" name="equip" value="cassete4" checked style="display:none"/>
                  <svg viewBox="0 0 24 24" style="width:28px;height:28px;color:var(--cyan);margin-bottom:8px"><rect x="4" y="4" width="16" height="16" rx="1" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M4 12h16M12 4v16" stroke="currentColor" stroke-width="1.5"/></svg>
                  <div style="font-size:13px;font-weight:500;margin-bottom:2px">Cassete 4 vias</div>
                  <div style="font-size:10px;color:var(--ink-muted);font-family:var(--font-mono)">K7 / 600Ã600</div>
                </label>
                <label class="equip-option" style="cursor:pointer;padding:14px;background:var(--bg-2);border:2px solid var(--line-2);border-radius:8px;text-align:center">
                  <input type="radio" name="equip" value="hw" style="display:none"/>
                  <svg viewBox="0 0 24 24" style="width:28px;height:28px;color:var(--ink-dim);margin-bottom:8px"><rect x="2" y="6" width="20" height="8" rx="1" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M5 14v3M19 14v3M9 10h6" stroke="currentColor" stroke-width="1.5"/></svg>
                  <div style="font-size:13px;font-weight:500;margin-bottom:2px">High Wall</div>
                  <div style="font-size:10px;color:var(--ink-muted);font-family:var(--font-mono)">HW / parede</div>
                </label>
                <label class="equip-option" style="cursor:pointer;padding:14px;background:var(--bg-2);border:2px solid var(--line-2);border-radius:8px;text-align:center">
                  <input type="radio" name="equip" value="pisoteto" style="display:none"/>
                  <svg viewBox="0 0 24 24" style="width:28px;height:28px;color:var(--ink-dim);margin-bottom:8px"><rect x="4" y="4" width="16" height="6" rx="1" fill="none" stroke="currentColor" stroke-width="1.5"/><rect x="4" y="14" width="16" height="6" rx="1" fill="none" stroke="currentColor" stroke-width="1.5"/></svg>
                  <div style="font-size:13px;font-weight:500;margin-bottom:2px">Piso/Teto</div>
                  <div style="font-size:10px;color:var(--ink-muted);font-family:var(--font-mono)">FP / dual</div>
                </label>
                <label class="equip-option" style="cursor:pointer;padding:14px;background:var(--bg-2);border:2px solid var(--line-2);border-radius:8px;text-align:center">
                  <input type="radio" name="equip" value="duto" style="display:none"/>
                  <svg viewBox="0 0 24 24" style="width:28px;height:28px;color:var(--ink-dim);margin-bottom:8px"><path d="M3 8h18M3 16h18M7 8v8M17 8v8" fill="none" stroke="currentColor" stroke-width="1.5"/></svg>
                  <div style="font-size:13px;font-weight:500;margin-bottom:2px">Built-in</div>
                  <div style="font-size:10px;color:var(--ink-muted);font-family:var(--font-mono)">duto / oculto</div>
                </label>
              </div>
            </div>

            <div class="card" style="padding:24px;margin-bottom:18px">
              <h3 style="font-size:14px;margin-bottom:18px;color:var(--cyan);letter-spacing:.05em;text-transform:uppercase;font-family:var(--font-mono)">3 Â· MARCA E LINHA</h3>
              <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:14px">
                <div class="field" style="margin-bottom:0">
                  <label>Marca preferida</label>
                  <select id="sysBrand"><option>Daikin VRV-X</option><option>LG Multi V 5</option><option>Midea V8 Pro</option><option>Samsung DVM S2</option><option>Hitachi Set Free Sigma</option></select>
                </div>
                <div class="field" style="margin-bottom:0">
                  <label>Refrigerante</label>
                  <select id="sysGas"><option>R-410A</option><option>R-32 (recomendado 2026+)</option><option>R-454B</option></select>
                </div>
                <div class="field" style="margin-bottom:0">
                  <label>ModulaÃ§Ã£o</label>
                  <select id="sysMod"><option>Inverter (DC)</option><option>Inverter (AC)</option><option>Fixo on/off</option></select>
                </div>
              </div>
            </div>

            <div class="card" style="padding:24px;background:linear-gradient(135deg, rgba(0,229,255,.05), rgba(157,123,255,.03));border-color:rgba(0,229,255,.2)">
              <div style="display:flex;justify-content:space-between;align-items:center;gap:14px">
                <div>
                  <div style="font-family:var(--font-mono);font-size:10px;color:var(--cyan);letter-spacing:.1em;text-transform:uppercase;margin-bottom:6px">Sistema dimensionado</div>
                  <div style="font-size:18px;font-weight:500" id="sysSummary">VRF Â· Cassete 4 vias Â· Daikin VRV-X Â· R-410A</div>
                </div>
                <button class="btn btn-primary" onclick="recalcSystem()" style="font-size:12px;padding:8px 14px">
                  <svg class="i" viewBox="0 0 24 24" style="width:14px;height:14px"><path d="M23 4v6h-6M1 20v-6h6"/></svg>
                  Dimensionar
                </button>
              </div>
            </div>

            <div class="card" style="padding:24px;margin-top:18px">
              <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px">
                <div>
                  <h3 style="font-size:14px;color:var(--cyan);letter-spacing:.05em;text-transform:uppercase;font-family:var(--font-mono);margin-bottom:4px">4 Â· DIMENSIONAMENTO DE DUTOS</h3>
                  <p style="font-size:12px;color:var(--ink-dim)">MÃ©todo da Igual Perda de Carga Â· FÃ³rmula de Darcy-Weisbach</p>
                </div>
                <button class="btn btn-outline" style="font-size:12px;padding:8px 14px" onclick="openDuctSizing()">
                  <svg class="i" viewBox="0 0 24 24" style="width:14px;height:14px"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
                  Calcular dutos
                </button>
              </div>
              <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:14px;font-size:12px">
                <div style="padding:10px 12px;background:var(--bg-2);border-radius:6px"><div style="font-family:var(--font-mono);font-size:10px;color:var(--ink-muted);text-transform:uppercase;letter-spacing:.06em;margin-bottom:4px">MÃ©todo</div><div>Igual perda de carga</div></div>
                <div style="padding:10px 12px;background:var(--bg-2);border-radius:6px"><div style="font-family:var(--font-mono);font-size:10px;color:var(--ink-muted);text-transform:uppercase;letter-spacing:.06em;margin-bottom:4px">Perda unitÃ¡ria</div><div style="font-family:var(--font-mono)">0,80 Pa/m</div></div>
                <div style="padding:10px 12px;background:var(--bg-2);border-radius:6px"><div style="font-family:var(--font-mono);font-size:10px;color:var(--ink-muted);text-transform:uppercase;letter-spacing:.06em;margin-bottom:4px">Velocidade mÃ¡x.</div><div style="font-family:var(--font-mono)">6,5 m/s</div></div>
                <div style="padding:10px 12px;background:var(--bg-2);border-radius:6px"><div style="font-family:var(--font-mono);font-size:10px;color:var(--ink-muted);text-transform:uppercase;letter-spacing:.06em;margin-bottom:4px">Rugosidade Îµ</div><div style="font-family:var(--font-mono)">0,09 mm (chapa galv.)</div></div>
              </div>
            </div>
          </div>

          <!-- ====== STEP 6: QAI Â· NBR 17037 ====== -->
          <div class="step-panel" id="panel-6">
            <!-- Intro banner -->
            <div class="qai-banner">
              <div class="qai-banner-icon">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M12 2a7 7 0 00-7 7c0 2.38 1.19 4.47 3 5.74V17a2 2 0 002 2h4a2 2 0 002-2v-2.26c1.81-1.27 3-3.36 3-5.74a7 7 0 00-7-7z"/>
                  <path d="M9 22h6M10 19v3M14 19v3"/>
                </svg>
              </div>
              <div style="flex:1">
                <div class="qai-banner-title">Qualidade do Ar Interior Â· ABNT NBR 17037:2023</div>
                <p>PadrÃµes referenciais para QAI em ambientes nÃ£o residenciais climatizados artificialmente. Define VMA para contaminaÃ§Ãµes biolÃ³gicas, quÃ­micas e parÃ¢metros fÃ­sicos, e exige PMOC conforme NBR 13971.</p>
              </div>
              <div class="qai-banner-badge">
                <div class="k">Conformidade</div>
                <div class="v">98,4%</div>
              </div>
            </div>

            <!-- Plano de Amostragem -->
            <div class="card" style="margin-bottom:20px">
              <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:18px">
                <div>
                  <h3>Plano de amostragem automÃ¡tico</h3>
                  <p class="desc" style="margin-bottom:0">Calculado a partir da Tabela 3 da NBR 17037 Â· ar exterior + pontos interiores</p>
                </div>
                <span class="norm-ref">Â§ 7 Â· Tabela 3</span>
              </div>

              <div class="sample-grid">
                <div class="sample-item">
                  <div class="sample-k">Ãrea construÃ­da climatizada</div>
                  <div class="sample-v">1.247<span class="unit">mÂ²</span></div>
                </div>
                <div class="sample-item">
                  <div class="sample-k">Faixa normativa</div>
                  <div class="sample-v">1.000 â 2.000<span class="unit">mÂ²</span></div>
                </div>
                <div class="sample-item highlight">
                  <div class="sample-k">Amostras interiores mÃ­nimas</div>
                  <div class="sample-v">3<span class="unit">pontos</span></div>
                </div>
                <div class="sample-item">
                  <div class="sample-k">Ar exterior (obrigatÃ³rio)</div>
                  <div class="sample-v">1<span class="unit">ponto Â· 1,5m altura</span></div>
                </div>
              </div>

              <div style="margin-top:18px;padding-top:18px;border-top:1px solid var(--line);font-family:var(--font-mono);font-size:11px;color:var(--ink-muted);letter-spacing:.03em;line-height:1.7">
                ponto 01 Â· tÃ©rreo Â· recepÃ§Ã£o (alta ocupaÃ§Ã£o) â distribuÃ­do uniformemente<br>
                ponto 02 Â· tÃ©rreo Â· comercial (centro do ambiente Â· 1,5m do piso)<br>
                ponto 03 Â· 1Âº andar Â· circulaÃ§Ã£o (zona ocupada) <br>
                ponto 04 Â· ar exterior Â· tomada de ar Â· 1,5m do nÃ­vel da rua
              </div>
            </div>

            <!-- VMA Cards -->
            <div class="vma-grid">
              <!-- CO2 -->
              <div class="vma-card">
                <div class="vma-head">
                  <div class="vma-title">
                    <span class="vma-icon co2">COâ</span>
                    <div>
                      <h4>DiÃ³xido de carbono</h4>
                      <div class="vma-ref">Â§ 5.2.1 Â· NBR 17037</div>
                    </div>
                  </div>
                  <div class="status-pill ok">conforme</div>
                </div>
                <div class="vma-gauge">
                  <div class="gauge-track">
                    <div class="gauge-zone zone-ok" style="left:0%;width:64%"></div>
                    <div class="gauge-zone zone-warn" style="left:64%;width:27%"></div>
                    <div class="gauge-zone zone-bad" style="left:91%;width:9%"></div>
                    <div class="gauge-marker" style="left:48%">
                      <div class="gauge-dot"></div>
                      <div class="gauge-label">540 ppm</div>
                    </div>
                  </div>
                  <div class="gauge-legend">
                    <span>400 ppm <span style="color:var(--ink-muted)">ext.</span></span>
                    <span style="color:var(--ok)">700 ppm <span style="color:var(--ink-muted)">VMA</span></span>
                    <span style="color:var(--hot)">1.100 ppm <span style="color:var(--ink-muted)">teto</span></span>
                  </div>
                </div>
                <div class="vma-meta">
                  <div><span class="k">Interior medido</span><span class="v hi">540 ppm</span></div>
                  <div><span class="k">Exterior</span><span class="v">420 ppm</span></div>
                  <div><span class="k">Î interior â exterior</span><span class="v">120 ppm</span></div>
                  <div><span class="k">MÃ©todo</span><span class="v">NDIR Â· leitura direta</span></div>
                </div>
              </div>

              <!-- PM10 / PM2.5 -->
              <div class="vma-card">
                <div class="vma-head">
                  <div class="vma-title">
                    <span class="vma-icon pm">PM</span>
                    <div>
                      <h4>Material particulado</h4>
                      <div class="vma-ref">Â§ 5.2.2 Â· mÃ©dia 24 h</div>
                    </div>
                  </div>
                  <div class="status-pill ok">conforme</div>
                </div>
                <div class="vma-dual">
                  <div class="vma-dual-item">
                    <div class="dual-label">PMââ</div>
                    <div class="dual-bar">
                      <div class="dual-fill" style="width:58%;background:var(--ok)"></div>
                    </div>
                    <div class="dual-nums"><span>29 Âµg/mÂ³</span><span class="limit">â¤ 50 Âµg/mÂ³</span></div>
                  </div>
                  <div class="vma-dual-item">
                    <div class="dual-label">PMâ,â</div>
                    <div class="dual-bar">
                      <div class="dual-fill" style="width:48%;background:var(--ok)"></div>
                    </div>
                    <div class="dual-nums"><span>12 Âµg/mÂ³</span><span class="limit">â¤ 25 Âµg/mÂ³</span></div>
                  </div>
                </div>
                <div class="vma-meta">
                  <div><span class="k">MÃ©todo</span><span class="v">DispersÃ£o laser</span></div>
                  <div><span class="k">Sensibilidade</span><span class="v">0,1 Âµg/mÂ³</span></div>
                </div>
              </div>

              <!-- ParÃ¢metros fÃ­sicos -->
              <div class="vma-card">
                <div class="vma-head">
                  <div class="vma-title">
                    <span class="vma-icon phys">
                      <svg class="i" viewBox="0 0 24 24"><path d="M14 4v10.54a4 4 0 11-4 0V4a2 2 0 014 0z"/></svg>
                    </span>
                    <div>
                      <h4>ParÃ¢metros fÃ­sicos</h4>
                      <div class="vma-ref">Â§ 5.2.3 Â· zona ocupada</div>
                    </div>
                  </div>
                  <div class="status-pill warn">atenÃ§Ã£o</div>
                </div>
                <div class="phys-rows">
                  <div class="phys-row">
                    <div class="phys-label">Temperatura TBS</div>
                    <div class="phys-bar">
                      <div class="phys-range" style="left:40%;width:50%"></div>
                      <div class="phys-pin" style="left:58%"></div>
                    </div>
                    <div class="phys-val ok">24,0 Â°C</div>
                    <div class="phys-lim">21 â 26 Â°C</div>
                  </div>
                  <div class="phys-row">
                    <div class="phys-label">Umidade relativa</div>
                    <div class="phys-bar">
                      <div class="phys-range" style="left:35%;width:30%"></div>
                      <div class="phys-pin" style="left:28%"></div>
                    </div>
                    <div class="phys-val warn">32 %</div>
                    <div class="phys-lim">35 â 65 %</div>
                  </div>
                  <div class="phys-row">
                    <div class="phys-label">Velocidade do ar</div>
                    <div class="phys-bar">
                      <div class="phys-range" style="left:0%;width:40%"></div>
                      <div class="phys-pin" style="left:24%"></div>
                    </div>
                    <div class="phys-val ok">0,12 m/s</div>
                    <div class="phys-lim">â¤ 0,20 m/s</div>
                  </div>
                </div>
                <div class="alert-inline">
                  <svg class="i" viewBox="0 0 24 24" style="color:var(--warm)"><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0zM12 9v4M12 17h.01"/></svg>
                  UR abaixo do recomendado. SugestÃ£o: instalar umidificador de ambiente ou revisar vazÃ£o de ar exterior.
                </div>
              </div>

              <!-- BiolÃ³gicos -->
              <div class="vma-card">
                <div class="vma-head">
                  <div class="vma-title">
                    <span class="vma-icon bio">
                      <svg class="i" viewBox="0 0 24 24"><circle cx="12" cy="12" r="3"/><circle cx="5" cy="8" r="1.5"/><circle cx="19" cy="8" r="1.5"/><circle cx="5" cy="16" r="1.5"/><circle cx="19" cy="16" r="1.5"/><path d="M12 9V5M12 15v4M9 12H5M15 12h4"/></svg>
                    </span>
                    <div>
                      <h4>ContaminaÃ§Ã£o biolÃ³gica</h4>
                      <div class="vma-ref">Â§ 5.1 Â· NBR 17037</div>
                    </div>
                  </div>
                  <div class="status-pill ok">conforme</div>
                </div>
                <div class="bio-rows">
                  <div class="bio-row">
                    <div class="bio-k">Fungos Â· ar interior</div>
                    <div class="bio-v ok">312 UFC/mÂ³</div>
                    <div class="bio-lim">â¤ 750 UFC/mÂ³</div>
                  </div>
                  <div class="bio-row">
                    <div class="bio-k">Fungos Â· ar exterior</div>
                    <div class="bio-v">248 UFC/mÂ³</div>
                    <div class="bio-lim">referÃªncia</div>
                  </div>
                  <div class="bio-row">
                    <div class="bio-k">RelaÃ§Ã£o I/E</div>
                    <div class="bio-v ok">1,26</div>
                    <div class="bio-lim">â¤ 1,5</div>
                  </div>
                  <div class="bio-row">
                    <div class="bio-k">BactÃ©rias mesÃ³filas</div>
                    <div class="bio-v ok">180 UFC/mÂ³</div>
                    <div class="bio-lim">â¤ 500 UFC/mÂ³</div>
                  </div>
                </div>
                <div style="margin-top:14px;padding-top:14px;border-top:1px solid var(--line);font-family:var(--font-mono);font-size:10.5px;color:var(--ink-muted);letter-spacing:.03em;line-height:1.6">
                  amostragem por impactaÃ§Ã£o Â· acelerador linear Â· 28,3 L/min Â· 10 min<br>
                  cultivo fungos: Ã¡gar sabouraud Â· 7 dias a 25Â±3 Â°C<br>
                  cultivo bactÃ©rias: TSA Â· 48 h a 35Â±2 Â°C
                </div>
              </div>
            </div>

            <!-- PMOC -->
            <div class="card" style="margin-top:20px">
              <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:18px">
                <div>
                  <h3>PMOC â Plano de ManutenÃ§Ã£o, OperaÃ§Ã£o e Controle</h3>
                  <p class="desc" style="margin-bottom:0">ObrigatÃ³rio para edifÃ­cios de uso pÃºblico e coletivo Â· NBR 13971</p>
                </div>
                <span class="norm-ref">Â§ 4.2</span>
              </div>
              <div class="pmoc-grid">
                <div class="pmoc-item ok">
                  <div class="pmoc-check">â</div>
                  <div>
                    <div class="pmoc-title">IdentificaÃ§Ã£o do estabelecimento</div>
                    <div class="pmoc-sub">RazÃ£o social, CNPJ, endereÃ§o, responsÃ¡vel tÃ©cnico (CREA)</div>
                  </div>
                </div>
                <div class="pmoc-item ok">
                  <div class="pmoc-check">â</div>
                  <div>
                    <div class="pmoc-title">DescriÃ§Ã£o das atividades</div>
                    <div class="pmoc-sub">Limpeza de bandejas, serpentinas, filtros, dutos</div>
                  </div>
                </div>
                <div class="pmoc-item ok">
                  <div class="pmoc-check">â</div>
                  <div>
                    <div class="pmoc-title">Periodicidade</div>
                    <div class="pmoc-sub">Mensal, trimestral, semestral e anual por componente</div>
                  </div>
                </div>
                <div class="pmoc-item ok">
                  <div class="pmoc-check">â</div>
                  <div>
                    <div class="pmoc-title">Plano de contingÃªncia</div>
                    <div class="pmoc-sub">AÃ§Ãµes em falha e emergÃªncia</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- ====== STEP 7: EXPORT ====== -->
          <div class="step-panel" id="panel-7">
            <div class="summary-panel" style="margin-bottom:24px">
              <h3>Resumo Â· Matriz MaratÃ¡ R02</h3>
              <div class="summary-grid">
                <div class="summary-cell"><div class="k">Ãrea total</div><div class="v">1.247<span class="unit">mÂ²</span></div></div>
                <div class="summary-cell"><div class="k">Carga total</div><div class="v">386<span class="unit">kW</span></div></div>
                <div class="summary-cell"><div class="k">Ar externo</div><div class="v">3.420<span class="unit">L/s</span></div></div>
                <div class="summary-cell"><div class="k">Sistemas</div><div class="v">2<span class="unit">VRF</span></div></div>
              </div>
            </div>

            <div class="export-grid">
              <div class="export-card">
                <div class="export-card-icon">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                    <rect x="3" y="3" width="18" height="18" rx="2"/>
                    <path d="M3 9h18M9 21V9"/>
                  </svg>
                </div>
                <h3>Desenho CAD</h3>
                <div class="fmt">.DXF Â· ezdxf Â· AutoCAD 2024</div>
                <p>Blocos de evaporadoras locados no centro geomÃ©trico de cada ambiente climatizado, rede de dutos dimensionada e camadas organizadas por pavimento.</p>
                <button class="btn btn-primary" onclick="generateDXF(this)">
                  <svg class="i" viewBox="0 0 24 24"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3"/></svg>
                  Gerar DXF
                </button>
              </div>

              <div class="export-card">
                <div class="export-card-icon">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/>
                    <path d="M14 2v6h6M16 13H8M16 17H8M10 9H8"/>
                  </svg>
                </div>
                <h3>Memorial descritivo</h3>
                <div class="fmt">.DOCX Â· python-docx Â· NBR 16401</div>
                <p>RelatÃ³rio tÃ©cnico com justificativa das fÃ³rmulas aplicadas, tabelas de dimensionamento, especificaÃ§Ã£o de mÃ¡quinas e referÃªncias normativas de 2024.</p>
                <button class="btn btn-primary" onclick="togglePreview()">
                  <svg class="i" viewBox="0 0 24 24"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                  Visualizar & Gerar
                </button>
              </div>

              <div class="export-card">
                <div class="export-card-icon">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M12 2a7 7 0 00-7 7c0 2.38 1.19 4.47 3 5.74V17a2 2 0 002 2h4a2 2 0 002-2v-2.26c1.81-1.27 3-3.36 3-5.74a7 7 0 00-7-7z"/>
                    <path d="M9 22h6"/>
                  </svg>
                </div>
                <h3>RelatÃ³rio QAI</h3>
                <div class="fmt">.PDF Â· NBR 17037:2023</div>
                <p>Plano de amostragem, registros de leituras, validaÃ§Ã£o VMA, PMOC e diagnÃ³stico de conformidade. Pronto para entrega ao Ã³rgÃ£o fiscalizador.</p>
                <button class="btn btn-primary" onclick="generateQAI(this)">
                  <svg class="i" viewBox="0 0 24 24"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3"/></svg>
                  Gerar QAI
                </button>
              </div>
            </div>

            <!-- MEMORIAL PREVIEW (hidden by default) -->
            <div class="memorial-preview" id="memorialPreview">
              <div class="mem-head">
                <div>
                  <div class="mem-label">VISUALIZAÃÃO Â· MEMORIAL DESCRITIVO</div>
                  <h3>Memorial de CÃ¡lculo de Carga TÃ©rmica</h3>
                </div>
                <button class="btn btn-outline" onclick="togglePreview()" style="font-size:12px;padding:6px 10px">Fechar</button>
              </div>
              <div class="mem-paper">
                <div class="mem-doc-head">
                  <div style="font-family:var(--font-serif);font-style:italic;color:#888;font-size:12px;margin-bottom:8px">SmartHVAC Â· Thermal Engine</div>
                  <h2 style="color:#000;font-size:20px;margin-bottom:4px">Memorial Descritivo de CÃ¡lculo</h2>
                  <div style="color:#555;font-size:11px">Projeto: Matriz MaratÃ¡ Â· R02 Â· Salvador/BA Â· 18/04/2026</div>
                </div>

                <div class="mem-section">
                  <h4>1. Dados de projeto</h4>
                  <p>Conforme <strong>ABNT NBR 16401-1:2024</strong>, foram adotados os seguintes dados climÃ¡ticos para Salvador/BA (latitude 12Â°58'S, altitude 8m):</p>
                  <ul class="mem-list">
                    <li>Temperatura de Bulbo Seco: <strong>32,2 Â°C</strong></li>
                    <li>Temperatura de Bulbo Ãmido: <strong>26,5 Â°C</strong></li>
                    <li>OrientaÃ§Ã£o da fachada crÃ­tica: <strong>Norte</strong> Â· radiaÃ§Ã£o 550 W/mÂ²</li>
                  </ul>
                </div>

                <div class="mem-section">
                  <h4>2. Metodologia de cÃ¡lculo</h4>
                  <p>A carga tÃ©rmica total de cada ambiente foi obtida pela soma das parcelas de carga interna (Q_int), envoltÃ³ria crÃ­tica (Q_env), penalidade de plenum (Q_plenum) e ar externo, conforme formulaÃ§Ã£o a seguir:</p>

                  <div class="mem-formula">
                    <span class="f-label">Carga interna</span>
                    <code>Q_int = (Ocup Ã 126W) + (Ãrea Ã 15W) + (Ocup Ã 250W)</code>
                  </div>
                  <div class="mem-formula">
                    <span class="f-label">EnvoltÃ³ria crÃ­tica</span>
                    <code>Q_env = (Vidro Ã 550W) + (Paredes_NC Ã 12W)</code>
                  </div>
                  <div class="mem-formula">
                    <span class="f-label">Plenum (1Âº andar)</span>
                    <code>Q_plenum = Ãrea Ã 50W</code>
                  </div>
                  <div class="mem-formula">
                    <span class="f-label">Ar externo Â· NBR 16401-3</span>
                    <code>V_o = (Ocup Ã 6,8 L/s) + (Ãrea Ã 0,4 L/s)</code>
                  </div>
                </div>

                <div class="mem-section">
                  <h4>3. Tabela resumo Â· TÃ©rreo (exemplo)</h4>
                  <table class="mem-table">
                    <thead><tr><th>Ambiente</th><th>Ãrea (mÂ²)</th><th>Ocup.</th><th>Vidro (mÂ²)</th><th>Carga (kW)</th></tr></thead>
                    <tbody>
                      <tr><td>Comercial</td><td>138,97</td><td>32</td><td>70,00</td><td><strong>62,87</strong></td></tr>
                      <tr><td>RecepÃ§Ã£o</td><td>61,03</td><td>12</td><td>45,00</td><td><strong>34,30</strong></td></tr>
                      <tr><td>Suprimentos</td><td>62,90</td><td>14</td><td>0,00</td><td><strong>10,73</strong></td></tr>
                      <tr><td>Marketing</td><td>53,52</td><td>12</td><td>12,00</td><td><strong>18,15</strong></td></tr>
                    </tbody>
                  </table>
                </div>

                <div class="mem-section">
                  <h4>4. Sistemas selecionados</h4>
                  <p>Para atender Ã  carga total de <strong>386 kW</strong> (TÃ©rreo 208 kW + 1Âº Andar 178 kW), foram especificados dois sistemas VRF independentes com dimensionamento de dutos pelo mÃ©todo de igual perda de carga (Darcy-Weisbach Â· 0,8 Pa/m).</p>
                </div>

                <div class="mem-section">
                  <h4>5. Normas aplicadas</h4>
                  <ul class="mem-list">
                    <li>ABNT NBR 16401-1:2024 â ParÃ¢metros de projeto</li>
                    <li>ABNT NBR 16401-2:2024 â Conforto tÃ©rmico</li>
                    <li>ABNT NBR 16401-3:2024 â Qualidade do ar interior</li>
                    <li>ABNT NBR 17037:2023 â Qualidade do ar em ambientes climatizados</li>
                    <li>ABNT NBR 13971 â ManutenÃ§Ã£o programada (PMOC)</li>
                  </ul>
                </div>

                <div class="mem-foot">
                  <div style="font-size:10px;color:#777">Documento gerado automaticamente por SmartHVAC v0.9 Â· Assinatura digital disponÃ­vel Â· VersÃ£o: 02</div>
                </div>
              </div>
              <div class="mem-actions">
                <button class="btn btn-outline">Editar template</button>
                <button class="btn btn-primary" onclick="generateMemorial(this)">
                  <svg class="i" viewBox="0 0 24 24"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3"/></svg>
                  Baixar .docx
                </button>
              </div>
            </div>

            <div class="card" style="padding:20px;display:flex;justify-content:space-between;align-items:center">
              <div>
                <div style="font-family:var(--font-mono);font-size:10.5px;color:var(--ink-muted);letter-spacing:.08em;text-transform:uppercase;margin-bottom:6px">VersÃ£o final</div>
                <div style="font-size:14px">Salvar como as-built no banco de dados para auditoria e comparaÃ§Ã£o futura.</div>
              </div>
              <button class="btn btn-outline" onclick="saveAsFinal(this)">
                <svg class="i" viewBox="0 0 24 24"><path d="M19 21H5a2 2 0 01-2-2V5a2 2 0 012-2h11l5 5v11a2 2 0 01-2 2z"/><path d="M17 21v-8H7v8M7 3v5h8"/></svg>
                Enviar para aprovaÃ§Ã£o
              </button>
            </div>
          </div>

          <!-- NAV BETWEEN STEPS -->
          <div class="wizard-nav">
            <div class="wizard-nav-info">
              passo <span class="hl" id="stepNow">3</span> de <span>7</span> Â· alteraÃ§Ãµes salvas automaticamente Â· <span style="color:var(--cyan)">conforme NBR 16401 + NBR 17037</span>
            </div>
            <div style="display:flex;gap:10px">
              <button class="btn btn-outline" onclick="prevStep()">
                <svg class="i" viewBox="0 0 24 24"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
                Anterior
              </button>
              <button class="btn btn-primary" onclick="nextStep()">
                PrÃ³ximo
                <svg class="i" viewBox="0 0 24 24"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- =========== ADMIN VIEW =========== -->
      <div class="view" id="view-admin" style="display:none">
        <div class="topbar">
          <div class="crumbs"><span style="cursor:pointer;color:var(--cyan)" onclick="showView('admin')" title="Painel administrativo">WORKSPACE</span><span class="sep">/</span><span class="now">ADMINISTRAÃÃO</span></div>
          <div class="topbar-actions">
            <button class="btn btn-outline" style="font-size:12px;padding:7px 14px" onclick="backToLanding()">
              <svg class="i" viewBox="0 0 24 24" style="width:14px;height:14px"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/></svg>
              Site inicial
            </button>
            <button class="btn btn-outline" style="font-size:12px;padding:7px 14px" onclick="doLogout()" title="Sair da conta">
              <svg class="i" viewBox="0 0 24 24" style="width:14px;height:14px"><path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9"/></svg>
              Sair
            </button>
            <span class="admin-badge"><svg class="i" viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>Admin</span>
          </div>
        </div>
        <div class="page">
          <div class="page-head"><div><h1>Painel administrativo</h1><p>Gerencie usuÃ¡rios, papÃ©is, senhas e bloqueios de acesso da equipe.</p></div></div>

          <div class="admin-tabs">
            <div class="admin-tab" data-tab="approvals" onclick="switchAdminTab(event,'approvals')">AprovaÃ§Ãµes <span class="tab-badge" id="aprBadge">0</span></div>
            <div class="admin-tab active" data-tab="users" onclick="switchAdminTab(event,'users')">UsuÃ¡rios e papÃ©is</div>
            <div class="admin-tab" data-tab="audit" onclick="switchAdminTab(event,'audit')">Auditoria</div>
            <div class="admin-tab" data-tab="reviews" onclick="switchAdminTab(event,'reviews')">HistÃ³rico de revisÃµes</div>
          </div>

          <div class="admin-panel" id="admin-approvals" style="display:none">
            <div class="stats-row" style="margin-bottom:24px">
              <div class="stat"><div class="stat-label">Aguardando</div><div class="stat-value" style="color:var(--warm)" id="aprStatPending">0</div><div class="stat-sub">para anÃ¡lise</div></div>
              <div class="stat"><div class="stat-label">Aprovados</div><div class="stat-value" id="aprStatApproved">0</div><div class="stat-sub" style="color:var(--ok)">total</div></div>
              <div class="stat"><div class="stat-label">Rejeitados</div><div class="stat-value" id="aprStatRejected">0</div><div class="stat-sub">nÃ£o conformes</div></div>
              <div class="stat"><div class="stat-label">Total submetido</div><div class="stat-value" id="aprStatTotal">0</div><div class="stat-sub">histÃ³rico</div></div>
            </div>

            <div class="approval-list" id="approvalList"></div>
          </div>

          <div class="admin-panel active" id="admin-users">
            <div class="stats-row" style="display:grid;grid-template-columns:repeat(4,1fr);gap:16px;margin-bottom:24px">
              <div class="stat"><div class="stat-label">Total</div><div class="stat-value" id="adminStatTotal">0</div><div class="stat-sub neutral">usuÃ¡rios</div></div>
              <div class="stat"><div class="stat-label">Administradores</div><div class="stat-value" id="adminStatAdmins">0</div><div class="stat-sub neutral">geral + projetos</div></div>
              <div class="stat"><div class="stat-label">Engenheiros</div><div class="stat-value" id="adminStatEng">0</div><div class="stat-sub neutral">podem calcular</div></div>
              <div class="stat"><div class="stat-label">Bloqueados</div><div class="stat-value" id="adminStatBlocked" style="color:var(--hot)">0</div><div class="stat-sub neutral">acesso suspenso</div></div>
            </div>
            <div class="card" style="padding:0;overflow:hidden">
              <div class="table-head"><h3>UsuÃ¡rios da organizaÃ§Ã£o Â· <span id="userCount">0</span></h3>
                <div class="table-tools"><button class="btn btn-primary" style="font-size:12px;padding:6px 12px" onclick="openCreateUserModal()"><svg class="i" viewBox="0 0 24 24" style="width:14px;height:14px"><path d="M12 5v14M5 12h14"/></svg>Criar nova conta</button></div>
              </div>
              <table>
                <thead><tr><th>UsuÃ¡rio</th><th>E-mail</th><th>Papel</th><th>Status</th><th>Ãlt. acesso</th><th style="text-align:right">AÃ§Ãµes</th></tr></thead>
                <tbody id="userTableBody"></tbody>
              </table>
            </div>
          </div>

          <div class="admin-panel" id="admin-audit" style="display:none">
            <div class="card">
              <h3 style="margin-bottom:18px">Log de auditoria</h3>
              <div class="audit-log" id="auditLog"></div>
            </div>
          </div>

          <div class="admin-panel" id="admin-reviews" style="display:none">
            <div class="card" style="padding:0;overflow:hidden">
              <div class="table-head"><h3>HistÃ³rico de revisÃµes Â· <span id="reviewsCount">0</span></h3>
                <div style="font-size:11.5px;color:var(--ink-muted);font-family:var(--font-mono)">projetos enviados para aprovaÃ§Ã£o por todos os usuÃ¡rios</div>
              </div>
              <table>
                <thead><tr><th>Projeto</th><th>VersÃ£o</th><th>Criado por</th><th>Status</th><th>Decidido por</th><th>Data</th></tr></thead>
                <tbody id="reviewsTableBody"></tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <!-- =========== LIBRARIES VIEW =========== -->
      <div class="view" id="view-libraries" style="display:none">
        <div class="topbar"><div class="crumbs"><span style="cursor:pointer;color:var(--cyan)" onclick="showView('dashboard')" title="Voltar para projetos">WORKSPACE</span><span class="sep">/</span><span class="now">BIBLIOTECAS</span></div><div class="topbar-actions"><button class="btn btn-icon btn-outline" onclick="showView('dashboard')" title="Voltar ao painel"><svg class="i" viewBox="0 0 24 24"><path d="M19 12H5M12 19l-7-7 7-7"/></svg></button><button class="btn btn-icon btn-outline" onclick="backToLanding()" title="Site inicial"><svg class="i" viewBox="0 0 24 24"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/></svg></button><button class="btn btn-icon btn-outline" onclick="doLogout()" title="Sair da conta"><svg class="i" viewBox="0 0 24 24"><path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9"/></svg></button></div></div>
        <div class="page">
          <div class="page-head"><div><h1>Bibliotecas tÃ©cnicas</h1><p>CatÃ¡logos de equipamentos, dados climÃ¡ticos e blocos CAD utilizados nos cÃ¡lculos.</p></div></div>
          <div class="lib-grid">
            <div class="lib-card" style="cursor:pointer" onclick="openLibrary('vrf')">
              <div class="lib-icon"><svg class="i" viewBox="0 0 24 24" style="width:22px;height:22px"><path d="M4 4h16v16H4z"/><path d="M4 10h16M10 4v16"/></svg></div>
              <h3>Equipamentos VRF</h3>
              <div class="lib-count">248 <span>modelos</span></div>
              <p>Condensadoras e evaporadoras Daikin, LG, Midea, Samsung e Hitachi. Capacidades de 2 HP a 96 HP.</p>
              <button class="btn btn-outline" style="width:100%;margin-top:14px" onclick="event.stopPropagation();openLibrary('vrf')">Explorar catÃ¡logo</button>
            </div>
            <div class="lib-card" style="cursor:pointer" onclick="openLibrary('climate')">
              <div class="lib-icon"><svg class="i" viewBox="0 0 24 24" style="width:22px;height:22px"><circle cx="12" cy="12" r="10"/><path d="M12 2a15 15 0 010 20M2 12h20"/></svg></div>
              <h3>Dados climÃ¡ticos</h3>
              <div class="lib-count">127 <span>cidades</span></div>
              <p>TBS, TBU, altitude e latitude conforme ABNT NBR 16401-1:2024. Cobertura nacional.</p>
              <button class="btn btn-outline" style="width:100%;margin-top:14px" onclick="event.stopPropagation();openLibrary('climate')">Ver tabela</button>
            </div>
            <div class="lib-card" style="cursor:pointer" onclick="openLibrary('cad')">
              <div class="lib-icon"><svg class="i" viewBox="0 0 24 24" style="width:22px;height:22px"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/></svg></div>
              <h3>Blocos CAD</h3>
              <div class="lib-count">86 <span>blocos</span></div>
              <p>Cassetes, high walls, condensadoras, difusores e grelhas em formato .dwg e .dxf.</p>
              <button class="btn btn-outline" style="width:100%;margin-top:14px" onclick="event.stopPropagation();openLibrary('cad')">Baixar blocos</button>
            </div>
            <div class="lib-card" style="cursor:pointer" onclick="openLibrary('templates')">
              <div class="lib-icon"><svg class="i" viewBox="0 0 24 24" style="width:22px;height:22px"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><path d="M14 2v6h6"/></svg></div>
              <h3>Templates memoriais</h3>
              <div class="lib-count">12 <span>modelos</span></div>
              <p>Templates .docx personalizÃ¡veis com sua logo, cabeÃ§alho e estilo editorial.</p>
              <button class="btn btn-outline" style="width:100%;margin-top:14px" onclick="event.stopPropagation();openLibrary('templates')">Gerenciar</button>
            </div>
            <div class="lib-card" style="cursor:pointer" onclick="openLibrary('ducts')">
              <div class="lib-icon"><svg class="i" viewBox="0 0 24 24" style="width:22px;height:22px"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg></div>
              <h3>Dutos e acessÃ³rios</h3>
              <div class="lib-count">340 <span>peÃ§as</span></div>
              <p>Curvas, derivaÃ§Ãµes, registros e grelhas com perda de carga tabulada (ASHRAE Duct Fitting DB).</p>
              <button class="btn btn-outline" style="width:100%;margin-top:14px" onclick="event.stopPropagation();openLibrary('ducts')">Explorar</button>
            </div>
            <div class="lib-card" style="cursor:pointer" onclick="openLibrary('materials')">
              <div class="lib-icon"><svg class="i" viewBox="0 0 24 24" style="width:22px;height:22px"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 11-2.83 2.83l-.06-.06a1.65 1.65 0 00-1.82-.33"/></svg></div>
              <h3>Materiais e vidros</h3>
              <div class="lib-count">56 <span>tipos</span></div>
              <p>Vidros (laminado, duplo, pelÃ­cula), pelÃ­culas solares, isolamentos tÃ©rmicos com valores de U e SHGC.</p>
              <button class="btn btn-outline" style="width:100%;margin-top:14px" onclick="event.stopPropagation();openLibrary('materials')">Ver propriedades</button>
            </div>
          </div>
        </div>
      </div>

      <!-- =========== HISTORY VIEW =========== -->
      <div class="view" id="view-history" style="display:none">
        <div class="topbar"><div class="crumbs"><span style="cursor:pointer;color:var(--cyan)" onclick="showView('dashboard')" title="Voltar para projetos">WORKSPACE</span><span class="sep">/</span><span class="now">HISTÃRICO</span></div><div class="topbar-actions"><button class="btn btn-icon btn-outline" onclick="showView('dashboard')" title="Voltar ao painel"><svg class="i" viewBox="0 0 24 24"><path d="M19 12H5M12 19l-7-7 7-7"/></svg></button><button class="btn btn-icon btn-outline" onclick="backToLanding()" title="Site inicial"><svg class="i" viewBox="0 0 24 24"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/></svg></button><button class="btn btn-icon btn-outline" onclick="doLogout()" title="Sair da conta"><svg class="i" viewBox="0 0 24 24"><path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9"/></svg></button></div></div>
        <div class="page">
          <div class="page-head"><div><h1>HistÃ³rico de atividades</h1><p>Linha do tempo de todos os cÃ¡lculos, versÃµes e entregÃ¡veis gerados pela equipe.</p></div></div>
          <div class="timeline">
            <div class="tl-item">
              <div class="tl-dot" style="background:var(--cyan)"></div>
              <div class="tl-body">
                <div class="tl-time">hoje Â· 13:42</div>
                <div class="tl-title">Memorial descritivo gerado Â· <span class="tl-proj">Matriz MaratÃ¡ v02</span></div>
                <div class="tl-sub">Lucas Pereira Â· memorial_matriz_marata_v02.docx Â· 2.4 MB</div>
              </div>
            </div>
            <div class="tl-item">
              <div class="tl-dot" style="background:var(--ok)"></div>
              <div class="tl-body">
                <div class="tl-time">hoje Â· 12:18</div>
                <div class="tl-title">DXF gerado Â· <span class="tl-proj">Hospital SÃ£o Lucas v04</span></div>
                <div class="tl-sub">Maria Silva Â· 2 pavimentos Â· 48 evaporadoras locadas</div>
              </div>
            </div>
            <div class="tl-item">
              <div class="tl-dot" style="background:var(--warm)"></div>
              <div class="tl-body">
                <div class="tl-time">hoje Â· 10:30</div>
                <div class="tl-title">Nova versÃ£o criada Â· <span class="tl-proj">EdifÃ­cio AtlÃ¢ntico v01</span></div>
                <div class="tl-sub">JoÃ£o Almeida Â· 820 mÂ² Â· aguardando aprovaÃ§Ã£o</div>
              </div>
            </div>
            <div class="tl-item">
              <div class="tl-dot"></div>
              <div class="tl-body">
                <div class="tl-time">ontem Â· 16:05</div>
                <div class="tl-title">CÃ¡lculo recalculado Â· <span class="tl-proj">Torre Corporate v02</span></div>
                <div class="tl-sub">Carlos Alves Â· alteraÃ§Ã£o em fator de uso Â· delta +3,2 kW</div>
              </div>
            </div>
            <div class="tl-item">
              <div class="tl-dot" style="background:var(--violet)"></div>
              <div class="tl-body">
                <div class="tl-time">ontem Â· 14:22</div>
                <div class="tl-title">QAI validado Â· <span class="tl-proj">Shopping Bela Vista v03</span></div>
                <div class="tl-sub">Maria Silva Â· NBR 17037 Â· 98,4% conformidade</div>
              </div>
            </div>
            <div class="tl-item">
              <div class="tl-dot"></div>
              <div class="tl-body">
                <div class="tl-time">2d Â· 11:15</div>
                <div class="tl-title">Projeto criado Â· <span class="tl-proj">Matriz MaratÃ¡ v01</span></div>
                <div class="tl-sub">Lucas Pereira Â· Salvador/BA Â· PDF 8.2 MB importado</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- =========== NORMS VIEW =========== -->
      <div class="view" id="view-norms" style="display:none">
        <div class="topbar"><div class="crumbs"><span style="cursor:pointer;color:var(--cyan)" onclick="showView('dashboard')" title="Voltar para projetos">NORMATIVOS</span><span class="sep">/</span><span class="now" id="normsCurrentTitle">NBR 17037</span></div><div class="topbar-actions"><button class="btn btn-icon btn-outline" onclick="showView('dashboard')" title="Voltar ao painel"><svg class="i" viewBox="0 0 24 24"><path d="M19 12H5M12 19l-7-7 7-7"/></svg></button><button class="btn btn-icon btn-outline" onclick="backToLanding()" title="Site inicial"><svg class="i" viewBox="0 0 24 24"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/></svg></button><button class="btn btn-icon btn-outline" onclick="doLogout()" title="Sair da conta"><svg class="i" viewBox="0 0 24 24"><path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9"/></svg></button></div></div>
        <div class="page">
          <div class="norms-wrap">
            <aside class="norms-side">
              <div class="norms-side-title">Normas tÃ©cnicas</div>
              <div class="norms-list">
                <div class="norms-item" data-norm="nbr-16401-1" onclick="showNorm('nbr-16401-1')">
                  <div class="norms-item-label">ABNT NBR 16401-1</div>
                  <div class="norms-item-sub">ParÃ¢metros de projeto Â· 2024</div>
                </div>
                <div class="norms-item" data-norm="nbr-16401-2" onclick="showNorm('nbr-16401-2')">
                  <div class="norms-item-label">ABNT NBR 16401-2</div>
                  <div class="norms-item-sub">Conforto tÃ©rmico Â· 2024</div>
                </div>
                <div class="norms-item" data-norm="nbr-16401-3" onclick="showNorm('nbr-16401-3')">
                  <div class="norms-item-label">ABNT NBR 16401-3</div>
                  <div class="norms-item-sub">Qualidade do ar interior Â· 2024</div>
                </div>
                <div class="norms-item active" data-norm="nbr-17037" onclick="showNorm('nbr-17037')">
                  <div class="norms-item-label">ABNT NBR 17037</div>
                  <div class="norms-item-sub">QAI nÃ£o residencial Â· 2023</div>
                </div>
                <div class="norms-item" data-norm="nbr-13971" onclick="showNorm('nbr-13971')">
                  <div class="norms-item-label">ABNT NBR 13971</div>
                  <div class="norms-item-sub">PMOC Â· manutenÃ§Ã£o</div>
                </div>
              </div>
            </aside>
            <div class="norms-content" id="normsContent"></div>
          </div>
        </div>
      </div>

      <!-- =========== SETTINGS VIEW =========== -->
      <div class="view" id="view-settings" style="display:none">
        <div class="topbar"><div class="crumbs"><span style="cursor:pointer;color:var(--cyan)" onclick="showView('dashboard')" title="Voltar para projetos">CONTA</span><span class="sep">/</span><span class="now">CONFIGURAÃÃES</span></div><div class="topbar-actions"><button class="btn btn-icon btn-outline" onclick="showView('dashboard')" title="Voltar ao painel"><svg class="i" viewBox="0 0 24 24"><path d="M19 12H5M12 19l-7-7 7-7"/></svg></button><button class="btn btn-icon btn-outline" onclick="backToLanding()" title="Site inicial"><svg class="i" viewBox="0 0 24 24"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/></svg></button><button class="btn btn-icon btn-outline" onclick="doLogout()" title="Sair da conta"><svg class="i" viewBox="0 0 24 24"><path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9"/></svg></button></div></div>
        <div class="page">
          <div class="page-head"><div><h1>ConfiguraÃ§Ãµes</h1><p>Gerencie perfil, preferÃªncias e integraÃ§Ãµes.</p></div></div>
          <div class="settings-grid">
            <div class="card">
              <h3>Perfil</h3>
              <p class="desc">InformaÃ§Ãµes exibidas para sua equipe.</p>
              <div class="field"><label>Nome completo</label><input type="text" value="Lucas Pereira"/></div>
              <div class="field"><label>E-mail</label><input type="email" value="engenheiro@firma.com.br"/></div>
              <div class="field"><label>Empresa Â· CREA</label><input type="text" value="HVAC Brasil Engenharia Â· CREA-BA 12345"/></div>
              <div class="field"><label>Telefone</label><input type="text" value="+55 71 98765-4321"/></div>
              <button class="btn btn-primary" style="margin-top:8px" onclick="toastShow('Perfil atualizado')">Salvar alteraÃ§Ãµes</button>
            </div>

            <div class="card">
              <h3>PreferÃªncias</h3>
              <p class="desc">Personalize a experiÃªncia do sistema.</p>
              <div class="setting-row">
                <div><div class="sr-label">Sistema de unidades</div><div class="sr-sub">SI (Sistema Internacional) Â· kW, mÂ², mÂ³/h</div></div>
                <select style="width:auto"><option>SI (kW, mÂ², mÂ³/h)</option><option>Imperial (BTU/h, ftÂ²)</option></select>
              </div>
              <div class="setting-row">
                <div><div class="sr-label">Template padrÃ£o do memorial</div><div class="sr-sub">Aplicado em novos projetos</div></div>
                <select style="width:auto"><option>Corporativo SmartHVAC</option><option>Minimalista</option><option>Customizado</option></select>
              </div>
              <div class="setting-row">
                <div><div class="sr-label">NotificaÃ§Ãµes por e-mail</div><div class="sr-sub">AprovaÃ§Ãµes, conclusÃµes de cÃ¡lculo</div></div>
                <label class="switch"><input type="checkbox" checked><span class="sw-slider"></span></label>
              </div>
              <div class="setting-row">
                <div><div class="sr-label">Salvar versÃ£o ao recalcular</div><div class="sr-sub">Recomendado para auditoria</div></div>
                <label class="switch"><input type="checkbox" checked><span class="sw-slider"></span></label>
              </div>
            </div>

            <div class="card">
              <h3>Plano e uso</h3>
              <p class="desc">VocÃª estÃ¡ no plano <strong style="color:var(--cyan)">Pro</strong>.</p>
              <div style="padding:16px;background:var(--bg-2);border-radius:8px;margin-bottom:16px">
                <div style="display:flex;justify-content:space-between;margin-bottom:8px;font-size:13px"><span>Projetos neste mÃªs</span><span style="font-family:var(--font-mono);font-weight:500">12 / 100</span></div>
                <div class="hv-progress"><span style="width:12%"></span></div>
              </div>
              <div style="padding:16px;background:var(--bg-2);border-radius:8px;margin-bottom:16px">
                <div style="display:flex;justify-content:space-between;margin-bottom:8px;font-size:13px"><span>Assentos utilizados</span><span style="font-family:var(--font-mono);font-weight:500">5 / 10</span></div>
                <div class="hv-progress"><span style="width:50%"></span></div>
              </div>
              <button class="btn btn-outline" style="width:100%">Gerenciar assinatura</button>
            </div>

            <div class="card">
              <h3>Zona de perigo</h3>
              <p class="desc">AÃ§Ãµes irreversÃ­veis. Proceda com cuidado.</p>
              <button class="btn btn-outline" style="width:100%;margin-bottom:10px;border-color:rgba(255,181,71,.3);color:var(--warm)">Exportar todos meus dados</button>
              <button class="btn btn-outline" style="width:100%;border-color:rgba(255,91,60,.3);color:var(--hot)">Excluir conta permanentemente</button>
            </div>
          </div>
        </div>
      </div>

      <!-- =========== NOTIFICATIONS VIEW =========== -->
      <div class="view" id="view-notifications" style="display:none">
        <div class="topbar"><div class="crumbs"><span style="cursor:pointer;color:var(--cyan)" onclick="showView('dashboard')" title="Voltar para projetos">CONTA</span><span class="sep">/</span><span class="now">NOTIFICAÃÃES</span></div><div class="topbar-actions"><button class="btn btn-icon btn-outline" onclick="showView('dashboard')" title="Voltar ao painel"><svg class="i" viewBox="0 0 24 24"><path d="M19 12H5M12 19l-7-7 7-7"/></svg></button><button class="btn btn-icon btn-outline" onclick="backToLanding()" title="Site inicial"><svg class="i" viewBox="0 0 24 24"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/></svg></button><button class="btn btn-icon btn-outline" onclick="doLogout()" title="Sair da conta"><svg class="i" viewBox="0 0 24 24"><path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9"/></svg></button></div></div>
        <div class="page">
          <div class="page-head"><div><h1>NotificaÃ§Ãµes</h1><p>AtualizaÃ§Ãµes dos seus projetos e da equipe.</p></div></div>
          <div class="notif-list" id="notifList">
            <div style="padding:60px 20px;text-align:center;color:var(--ink-muted)">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round" style="opacity:.4;margin-bottom:14px"><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 01-3.46 0"/></svg>
              <div style="font-size:14px;color:var(--ink-dim);margin-bottom:6px">Nenhuma notificaÃ§Ã£o</div>
              <div style="font-size:11.5px;color:var(--ink-muted);font-family:var(--font-mono)">vocÃª verÃ¡ atualizaÃ§Ãµes aqui quando criar ou modificar projetos</div>
            </div>
          </div>
        </div>
      </div>

    </main>
  </div>
</section>

<!-- =============================================================== -->
<!-- CREATE USER MODAL (admin)                                        -->
<!-- =============================================================== -->
<div class="modal-overlay" id="createUserModal">
  <div class="modal-card">
    <div class="modal-head">
      <div>
        <div class="modal-eyebrow">ADMINISTRAÃÃO</div>
        <h3>Criar nova conta de usuÃ¡rio</h3>
      </div>
      <button class="btn btn-ghost" onclick="closeCreateUserModal()" style="padding:6px"><svg class="i" viewBox="0 0 24 24"><path d="M18 6L6 18M6 6l12 12"/></svg></button>
    </div>
    <div class="modal-body">
      <div class="field">
        <label>Nome completo *</label>
        <input type="text" id="newUserName" placeholder="Ex: Maria Silva"/>
      </div>
      <div class="field">
        <label>E-mail corporativo *</label>
        <input type="email" id="newUserEmail" placeholder="maria@empresa.com.br"/>
      </div>
      <div class="field">
        <label>Empresa / CREA</label>
        <input type="text" id="newUserCompany" placeholder="HVAC Brasil Â· CREA-BA 12345"/>
      </div>
      <div class="field">
        <label>Papel *</label>
        <select id="newUserRole">
          <option value="engineer">Engenheiro HVAC â calcula, edita, gera entregÃ¡veis</option>
          <option value="admin_projects">Admin de Projetos â analisa e aprova projetos</option>
          <option value="admin_general">Admin Geral â gerencia apenas usuÃ¡rios</option>
          <option value="viewer">Visualizador â apenas consulta projetos</option>
        </select>
      </div>
      <div class="field">
        <label>Senha temporÃ¡ria *</label>
        <div style="display:flex;gap:8px">
          <input type="text" id="newUserPass" placeholder="qualquer senha (mÃ­n. 4 caracteres)" style="flex:1"/>
          <button class="btn btn-outline" onclick="genRandomPass()" style="padding:10px 14px" title="Gerar senha aleatÃ³ria forte"><svg class="i" viewBox="0 0 24 24"><path d="M23 4v6h-6M1 20v-6h6M20.49 9A9 9 0 005.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 013.51 15"/></svg></button>
        </div>
        <div style="font-size:11px;color:var(--cyan);margin-top:8px;font-family:var(--font-mono);line-height:1.5">â  Esta Ã© apenas a senha de primeiro acesso. O usuÃ¡rio serÃ¡ obrigado a criar uma senha forte ao logar pela primeira vez.</div>
      </div>
      <label style="color:var(--ink-dim);display:flex;gap:8px;align-items:flex-start;cursor:pointer;font-size:12px;margin-top:14px;line-height:1.5">
        <input type="checkbox" id="newUserSendEmail" checked style="width:auto;accent-color:var(--cyan);margin-top:2px"/>
        <span>Enviar e-mail de boas-vindas com credenciais (simulado)</span>
      </label>
    </div>
    <div class="modal-foot">
      <button class="btn btn-outline" onclick="closeCreateUserModal()">Cancelar</button>
      <button class="btn btn-primary" onclick="createUser()">
        <svg class="i" viewBox="0 0 24 24"><path d="M20 6L9 17l-5-5"/></svg>
        Criar conta
      </button>
    </div>
  </div>
</div>

<!-- =============================================================== -->
<!-- TOAST / NOTIFICATION AREA                                        -->
<!-- =============================================================== -->
<!-- Modal de informaÃ§Ãµes da landing -->
<div class="modal-overlay" id="infoModal">
  <div class="modal-card" style="max-width:680px">
    <div class="modal-head">
      <div>
        <div class="modal-eyebrow" id="infoEyebrow">SOBRE</div>
        <h3 id="infoTitle">â</h3>
      </div>
      <button class="btn btn-ghost" onclick="closeInfoModal()" style="padding:6px"><svg class="i" viewBox="0 0 24 24"><path d="M18 6L6 18M6 6l12 12"/></svg></button>
    </div>
    <div class="modal-body" id="infoBody" style="font-size:13.5px;line-height:1.6;color:var(--ink-dim)"></div>
    <div class="modal-foot">
      <button class="btn btn-primary" onclick="closeInfoModal()">Entendi</button>
    </div>
  </div>
</div>

<div class="toast-wrap" id="toastWrap"></div>

<!-- Modal: trocar senha obrigatÃ³rio no primeiro acesso -->
<!-- Modal: catÃ¡logo de biblioteca tÃ©cnica -->
<!-- Modal: revisÃ£o de projeto pelo Admin de Projetos -->
<!-- Modal: ComparaÃ§Ã£o de versÃµes (vidro simples vs pelÃ­cula, R01 vs R02) -->
<!-- Modal: Dimensionamento de dutos Â· Igual perda de carga + Darcy-Weisbach -->
<div class="modal-overlay" id="ductModal">
  <div class="modal-card" style="max-width:920px">
    <div class="modal-head">
      <div>
        <div class="modal-eyebrow">DIMENSIONAMENTO DE DUTOS Â· ASHRAE / DARCY-WEISBACH</div>
        <h3>Trechos calculados por igual perda de carga</h3>
      </div>
      <button class="btn btn-ghost" onclick="closeDuct()" style="padding:6px"><svg class="i" viewBox="0 0 24 24"><path d="M18 6L6 18M6 6l12 12"/></svg></button>
    </div>
    <div class="modal-body" id="ductBody" style="max-height:65vh;overflow-y:auto"></div>
    <div class="modal-foot">
      <button class="btn btn-outline" onclick="closeDuct()">Fechar</button>
    </div>
  </div>
</div>

<div class="modal-overlay" id="compareModal">
  <div class="modal-card" style="max-width:920px">
    <div class="modal-head">
      <div>
        <div class="modal-eyebrow">COMPARAÃÃO DE VERSÃES</div>
        <h3>AnÃ¡lise de cenÃ¡rios Â· economia de carga tÃ©rmica</h3>
      </div>
      <button class="btn btn-ghost" onclick="closeCompare()" style="padding:6px"><svg class="i" viewBox="0 0 24 24"><path d="M18 6L6 18M6 6l12 12"/></svg></button>
    </div>
    <div class="modal-body" id="compareBody"></div>
    <div class="modal-foot">
      <button class="btn btn-outline" onclick="closeCompare()">Fechar</button>
    </div>
  </div>
</div>

<div class="modal-overlay" id="reviewModal">
  <div class="modal-card" style="max-width:920px">
    <div class="modal-head">
      <div>
        <div class="modal-eyebrow" id="reviewEyebrow">REVISÃO</div>
        <h3 id="reviewTitle">â</h3>
      </div>
      <button class="btn btn-ghost" onclick="closeReviewModal()" style="padding:6px"><svg class="i" viewBox="0 0 24 24"><path d="M18 6L6 18M6 6l12 12"/></svg></button>
    </div>
    <div class="modal-body" id="reviewBody" style="max-height:65vh;overflow-y:auto"></div>
    <div class="modal-foot" id="reviewFoot"></div>
  </div>
</div>

<div class="modal-overlay" id="libraryModal">
  <div class="modal-card" style="max-width:920px">
    <div class="modal-head">
      <div>
        <div class="modal-eyebrow" id="libEyebrow">BIBLIOTECA</div>
        <h3 id="libTitle">â</h3>
      </div>
      <button class="btn btn-ghost" onclick="closeLibrary()" style="padding:6px"><svg class="i" viewBox="0 0 24 24"><path d="M18 6L6 18M6 6l12 12"/></svg></button>
    </div>
    <div class="modal-body" id="libBody" style="max-height:65vh;overflow-y:auto"></div>
    <div class="modal-foot">
      <button class="btn btn-outline" onclick="closeLibrary()">Fechar</button>
      <button class="btn btn-primary" onclick="exportLibrary()" id="libExportBtn">
        <svg class="i" viewBox="0 0 24 24"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3"/></svg>
        Exportar CSV
      </button>
    </div>
  </div>
</div>

<div class="modal-overlay" id="firstLoginModal">
  <div class="modal-card">
    <div class="modal-head">
      <div>
        <div class="modal-eyebrow" style="color:var(--warm)">PRIMEIRO ACESSO</div>
        <h3>Crie sua nova senha</h3>
      </div>
    </div>
    <div class="modal-body">
      <p style="font-size:13px;color:var(--ink-dim);margin-bottom:18px;line-height:1.5">Por seguranÃ§a, vocÃª precisa definir uma nova senha pessoal antes de continuar. A senha temporÃ¡ria nÃ£o poderÃ¡ mais ser usada.</p>
      <div class="field">
        <label>Nova senha *</label>
        <div class="pass-input-wrap">
          <input type="password" id="firstLoginPass1" placeholder="digite sua nova senha" oninput="checkPassRules('firstLoginPass1','firstLoginRules')"/>
          <button type="button" class="pass-toggle" onclick="togglePassView('firstLoginPass1', this)" title="Mostrar/esconder senha" aria-label="Mostrar senha">
            <svg class="i eye-on" viewBox="0 0 24 24"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
            <svg class="i eye-off" viewBox="0 0 24 24" style="display:none"><path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24M1 1l22 22"/></svg>
          </button>
        </div>
        <div class="pass-rules" id="firstLoginRules">
          <div class="pass-rule" data-rule="len"><span class="dot"></span>MÃ­nimo 8 caracteres</div>
          <div class="pass-rule" data-rule="upper"><span class="dot"></span>Pelo menos 1 letra maiÃºscula</div>
          <div class="pass-rule" data-rule="lower"><span class="dot"></span>Pelo menos 1 letra minÃºscula</div>
          <div class="pass-rule" data-rule="num"><span class="dot"></span>Pelo menos 1 nÃºmero</div>
          <div class="pass-rule" data-rule="spec"><span class="dot"></span>Pelo menos 1 caractere especial (!@#$%&*)</div>
        </div>
      </div>
      <div class="field">
        <label>Confirmar nova senha *</label>
        <div class="pass-input-wrap">
          <input type="password" id="firstLoginPass2" placeholder="repita a nova senha"/>
          <button type="button" class="pass-toggle" onclick="togglePassView('firstLoginPass2', this)" title="Mostrar/esconder senha" aria-label="Mostrar senha">
            <svg class="i eye-on" viewBox="0 0 24 24"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
            <svg class="i eye-off" viewBox="0 0 24 24" style="display:none"><path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24M1 1l22 22"/></svg>
          </button>
        </div>
      </div>
      <div style="margin-top:6px;padding:10px 12px;background:rgba(0,229,255,.06);border:1px dashed rgba(0,229,255,.25);border-radius:6px;font-size:11.5px;color:var(--ink-dim);line-height:1.5">
        ð¡ <strong style="color:var(--cyan)">Dica:</strong> use o Ã­cone do olho para visualizar a senha enquanto digita. Anote-a em local seguro antes de confirmar â vocÃª precisarÃ¡ dela nos prÃ³ximos acessos.
      </div>
    </div>
    <div class="modal-foot">
      <button class="btn btn-primary" onclick="completeFirstLogin()">
        <svg class="i" viewBox="0 0 24 24"><path d="M20 6L9 17l-5-5"/></svg>
        Definir senha e entrar
      </button>
    </div>
  </div>
</div>

<!-- =============================================================== -->
<!-- DEMO BANNER                                                      -->
<!-- =============================================================== -->
<div class="demo-banner" id="demoBanner">
  <svg class="i" viewBox="0 0 24 24" style="color:var(--cyan)"><path d="M12 2a7 7 0 00-7 7c0 2.38 1.19 4.47 3 5.74V17a2 2 0 002 2h4a2 2 0 002-2v-2.26c1.81-1.27 3-3.36 3-5.74a7 7 0 00-7-7z"/><path d="M9 22h6"/></svg>
  <div style="flex:1;line-height:1.3">
    <div><strong>Modo demonstraÃ§Ã£o</strong> Â· vocÃª estÃ¡ explorando a plataforma com limitaÃ§Ãµes</div>
    <div style="font-size:11px;color:var(--ink-dim);font-family:var(--font-mono);margin-top:2px" id="demoLimitsLine">1 projeto Â· sem exportaÃ§Ã£o DXF/DOCX/PDF Â· sem memorial real</div>
  </div>
  <button class="btn btn-outline" style="font-size:12px;padding:6px 12px" onclick="goToLogin()"><svg class="i" viewBox="0 0 24 24" style="width:13px;height:13px"><path d="M15 3h4a2 2 0 012 2v14a2 2 0 01-2 2h-4M10 17l5-5-5-5M15 12H3"/></svg>Entrar na minha conta</button>
  <button class="btn btn-primary" style="font-size:12px;padding:6px 14px" onclick="location.href='mailto:contato@smarthvac.io?subject=Quero%20contratar%20SmartHVAC'">Falar com especialista</button>
  <button class="btn btn-ghost" style="padding:4px;color:var(--ink-muted)" onclick="closeDemoBanner()"><svg class="i" viewBox="0 0 24 24"><path d="M18 6L6 18M6 6l12 12"/></svg></button>
</div>

</div>`;
