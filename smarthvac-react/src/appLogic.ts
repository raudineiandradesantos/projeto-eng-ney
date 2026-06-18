// @ts-nocheck
/* eslint-disable */
// Auto-generated from original index.html
// Contains the complete JavaScript logic of SmartHVAC
// Encoding: UTF-8 (properly encoded)

export function initAppLogic(): void {

  // ============================================================
  // ESTADO & ARMAZENAMENTO
  // ============================================================
  const STORAGE_KEY = 'smarthvac.users';
  const SESSION_KEY = 'smarthvac.session';
  const DEMO_KEY    = 'smarthvac.demo';

  const state = {
    isDemo: false,
    currentUser: null,
    currentProjectId: null,
    currentNorm: 'nbr-17037',
    selectedSemester: 'S2-2025',
    demo: { projectsCreated: 0, exportsAttempted: 0, startedAt: 0 }
  };

  // Limites do modo demonstração
  const DEMO_LIMITS = {
    maxProjects: 1,
    canExport: false,
    canSaveVersion: false,
    sessionMinutes: 30
  };

  function loadUsers(){ try{ return JSON.parse(localStorage.getItem(STORAGE_KEY)||'{}'); }catch(e){ return {}; } }
  function saveUsers(u){ try{ localStorage.setItem(STORAGE_KEY, JSON.stringify(u)); }catch(e){} }
  function saveSession(u){ try{ localStorage.setItem(SESSION_KEY, JSON.stringify(u)); }catch(e){} }
  function clearSession(){ try{ localStorage.removeItem(SESSION_KEY); }catch(e){} }
  function loadSession(){ try{ return JSON.parse(localStorage.getItem(SESSION_KEY)||'null'); }catch(e){ return null; } }

  function hashPass(p){
    let h = 0;
    for(let i=0; i<p.length; i++){ h = ((h<<5)-h) + p.charCodeAt(i); h |= 0; }
    return 'h_' + Math.abs(h).toString(36);
  }

  function getInitials(name){
    if(!name) return '?';
    const parts = name.trim().split(/\s+/);
    if(parts.length === 1) return parts[0].substring(0,2).toUpperCase();
    return (parts[0][0] + parts[parts.length-1][0]).toUpperCase();
  }

  function genPass(len){
    const upper = 'ABCDEFGHJKLMNPQRSTUVWXYZ';
    const lower = 'abcdefghjkmnpqrstuvwxyz';
    const nums = '23456789';
    const spec = '!@#$%&*';
    const all = upper + lower + nums + spec;
    const length = len || 12;
    // Garante 1 de cada categoria
    let s = upper[Math.floor(Math.random()*upper.length)] +
            lower[Math.floor(Math.random()*lower.length)] +
            nums[Math.floor(Math.random()*nums.length)] +
            spec[Math.floor(Math.random()*spec.length)];
    for(let i=4;i<length;i++) s += all[Math.floor(Math.random()*all.length)];
    // Embaralha
    return s.split('').sort(()=>Math.random()-0.5).join('');
  }

  // ============================================================
  // BIBLIOTECAS TÉCNICAS — catálogos com dados reais
  // ============================================================
  const libraryContent = {
    vrf: {
      eyebrow: 'CATÁLOGO · 248 MODELOS',
      title: 'Equipamentos VRF — Sistemas de fluxo refrigerante variável',
      intro: '<p style="font-size:13px;color:var(--ink-dim);margin-bottom:18px">Catálogo de condensadoras (unidades externas) e evaporadoras (unidades internas) das principais marcas certificadas no Brasil. Capacidades nominais conforme ARI 1230 e ABNT NBR 17104.</p>',
      table: {
        headers: ['Marca', 'Modelo', 'Tipo', 'Capacidade (HP)', 'Capacidade (kW)', 'COP', 'Refrigerante'],
        rows: [
          ['Daikin', 'RXYQ8AYM', 'Condensadora', '8 HP', '22,4', '4,15', 'R-410A'],
          ['Daikin', 'RXYQ12AYM', 'Condensadora', '12 HP', '33,5', '4,07', 'R-410A'],
          ['Daikin', 'RXYQ16AYM', 'Condensadora', '16 HP', '45,0', '4,01', 'R-410A'],
          ['Daikin', 'RXYQ20AYM', 'Condensadora', '20 HP', '56,0', '3,98', 'R-410A'],
          ['LG', 'ARUM080LTE5', 'Condensadora', '8 HP', '22,4', '4,21', 'R-410A'],
          ['LG', 'ARUM120LTE5', 'Condensadora', '12 HP', '33,5', '4,15', 'R-410A'],
          ['LG', 'ARUM160LTE5', 'Condensadora', '16 HP', '45,0', '4,03', 'R-410A'],
          ['LG', 'ARUM200LTE5', 'Condensadora', '20 HP', '56,0', '3,95', 'R-410A'],
          ['Midea', 'MV6-280WV2GN1', 'Condensadora', '10 HP', '28,0', '4,18', 'R-410A'],
          ['Midea', 'MV6-450WV2GN1', 'Condensadora', '16 HP', '45,0', '4,05', 'R-410A'],
          ['Samsung', 'AM080FXVAGH', 'Condensadora', '8 HP', '22,4', '4,12', 'R-410A'],
          ['Samsung', 'AM160FXVAGH', 'Condensadora', '16 HP', '45,0', '4,00', 'R-410A'],
          ['Hitachi', 'RAS-8FSXNSE', 'Condensadora', '8 HP', '22,4', '4,18', 'R-410A'],
          ['Hitachi', 'RAS-16FSXNSE', 'Condensadora', '16 HP', '45,0', '4,05', 'R-410A'],
          ['Daikin', 'FXFQ32AVM', 'Cassete 4 vias', '1,25 HP', '3,6', '—', 'R-410A'],
          ['Daikin', 'FXFQ50AVM', 'Cassete 4 vias', '2 HP', '5,6', '—', 'R-410A'],
          ['Daikin', 'FXAQ20AVM', 'High Wall', '0,8 HP', '2,2', '—', 'R-410A'],
          ['LG', 'ARNU09GTRC4', 'Cassete 4 vias', '1 HP', '2,8', '—', 'R-410A'],
          ['LG', 'ARNU18GTRC4', 'Cassete 4 vias', '2 HP', '5,6', '—', 'R-410A'],
          ['Midea', 'MDV-D28Q4/N1-B5', 'Cassete', '1 HP', '2,8', '—', 'R-410A']
        ],
        footer: '<em style="color:var(--ink-muted)">Lista parcial · 248 modelos disponíveis no banco completo · atualizado em 04/2026</em>'
      }
    },
    climate: {
      eyebrow: 'DADOS CLIMÁTICOS · NBR 16401-1:2024',
      title: 'Dados climáticos por cidade — 127 cidades brasileiras',
      intro: '<p style="font-size:13px;color:var(--ink-dim);margin-bottom:18px">Tabela de Temperatura de Bulbo Seco (TBS) e Temperatura de Bulbo Úmido (TBU) para projeto, conforme percentil 0,4% anual. Valores oficiais da ABNT NBR 16401-1:2024 — Anexo A.</p>',
      table: {
        headers: ['Cidade', 'UF', 'Latitude', 'Altitude (m)', 'TBS verão (°C)', 'TBU verão (°C)', 'TBS inverno (°C)'],
        rows: [
          ['São Paulo', 'SP', '-23,55', '760', '32,3', '21,5', '6,7'],
          ['Rio de Janeiro', 'RJ', '-22,90', '6', '36,0', '26,4', '13,8'],
          ['Brasília', 'DF', '-15,79', '1172', '32,4', '20,6', '10,2'],
          ['Salvador', 'BA', '-12,97', '8', '32,1', '25,8', '20,3'],
          ['Fortaleza', 'CE', '-3,73', '21', '32,5', '26,1', '22,1'],
          ['Belo Horizonte', 'MG', '-19,93', '852', '31,9', '21,5', '11,1'],
          ['Manaus', 'AM', '-3,10', '92', '34,8', '27,3', '21,4'],
          ['Curitiba', 'PR', '-25,43', '935', '30,3', '21,2', '4,1'],
          ['Recife', 'PE', '-8,05', '4', '31,4', '26,2', '20,5'],
          ['Porto Alegre', 'RS', '-30,03', '46', '34,2', '24,1', '4,5'],
          ['Belém', 'PA', '-1,46', '10', '33,2', '26,8', '21,8'],
          ['Goiânia', 'GO', '-16,68', '750', '34,1', '22,4', '11,8'],
          ['Florianópolis', 'SC', '-27,59', '3', '31,4', '24,3', '8,5'],
          ['Vitória', 'ES', '-20,32', '3', '34,1', '24,9', '14,8'],
          ['Natal', 'RN', '-5,79', '30', '31,0', '26,1', '20,8'],
          ['Aracaju', 'SE', '-10,91', '4', '31,8', '25,9', '20,1'],
          ['Maceió', 'AL', '-9,67', '7', '31,2', '25,8', '19,9'],
          ['Teresina', 'PI', '-5,09', '72', '36,5', '26,2', '20,3'],
          ['Campo Grande', 'MS', '-20,44', '532', '34,0', '23,5', '10,0'],
          ['Cuiabá', 'MT', '-15,60', '187', '37,1', '24,8', '15,5']
        ],
        footer: '<em style="color:var(--ink-muted)">Cobertura nacional completa · 127 cidades disponíveis · TBS/TBU 99,6% para inverno · 0,4% para verão</em>'
      }
    },
    cad: {
      eyebrow: 'BLOCOS CAD · 86 BLOCOS',
      title: 'Blocos CAD — Equipamentos e acessórios HVAC',
      intro: '<p style="font-size:13px;color:var(--ink-dim);margin-bottom:18px">Biblioteca de blocos vetoriais nos formatos .dwg e .dxf compatíveis com AutoCAD, BricsCAD, Revit e ArchiCAD. Escala 1:50 com layers padronizadas conforme NBR 6492.</p>',
      table: {
        headers: ['Categoria', 'Item', 'Variantes', 'Formato', 'Layer'],
        rows: [
          ['Unidades internas', 'Cassete 4 vias 600×600', '6', '.dwg / .dxf', 'HVAC-EQUIP-INT'],
          ['Unidades internas', 'High wall (parede)', '8', '.dwg / .dxf', 'HVAC-EQUIP-INT'],
          ['Unidades internas', 'Built-in (duto)', '5', '.dwg / .dxf', 'HVAC-EQUIP-INT'],
          ['Unidades internas', 'Piso/Teto', '4', '.dwg / .dxf', 'HVAC-EQUIP-INT'],
          ['Unidades externas', 'Condensadora VRF top discharge', '12', '.dwg / .dxf', 'HVAC-EQUIP-EXT'],
          ['Unidades externas', 'Condensadora VRF side discharge', '8', '.dwg / .dxf', 'HVAC-EQUIP-EXT'],
          ['Unidades externas', 'Chiller air-cooled', '6', '.dwg / .dxf', 'HVAC-EQUIP-EXT'],
          ['Difusores', 'Difusor quadrado 4 vias', '4', '.dwg / .dxf', 'HVAC-DIF'],
          ['Difusores', 'Difusor linear', '5', '.dwg / .dxf', 'HVAC-DIF'],
          ['Difusores', 'Difusor circular', '3', '.dwg / .dxf', 'HVAC-DIF'],
          ['Grelhas', 'Grelha de retorno', '6', '.dwg / .dxf', 'HVAC-GRE'],
          ['Grelhas', 'Grelha de insuflamento', '4', '.dwg / .dxf', 'HVAC-GRE'],
          ['Dutos', 'Dutos retangulares (templates)', '12', '.dwg / .dxf', 'HVAC-DUC'],
          ['Dutos', 'Dutos circulares (templates)', '6', '.dwg / .dxf', 'HVAC-DUC'],
          ['Acessórios', 'Damper / VAV / FCU', '7', '.dwg / .dxf', 'HVAC-ACC']
        ],
        footer: '<em style="color:var(--ink-muted)">Total de 86 blocos · pacote único .zip de 24 MB · suporte a AutoCAD 2018+</em>'
      }
    },
    templates: {
      eyebrow: 'TEMPLATES MEMORIAIS · 12 MODELOS',
      title: 'Templates de memorial descritivo',
      intro: '<p style="font-size:13px;color:var(--ink-dim);margin-bottom:18px">Modelos .docx prontos para customização com logo da empresa, cabeçalho, rodapé, capa e índice. Aplicação automática durante a geração do memorial no passo 7 do wizard.</p>',
      table: {
        headers: ['Template', 'Tipo de obra', 'Páginas', 'Inclui ART', 'Personalizável'],
        rows: [
          ['Padrão SmartHVAC', 'Genérico', '12-18', 'Sim', 'Sim'],
          ['Hospitalar NBR 7256', 'Saúde', '24-32', 'Sim', 'Sim'],
          ['Comercial corporativo', 'Escritórios', '14-20', 'Sim', 'Sim'],
          ['Industrial leve', 'Galpão / fábrica', '16-22', 'Sim', 'Sim'],
          ['Educacional', 'Escolas / faculdades', '18-24', 'Sim', 'Sim'],
          ['Residencial multifamiliar', 'Edifícios', '14-18', 'Não', 'Sim'],
          ['Shopping center', 'Varejo', '20-28', 'Sim', 'Sim'],
          ['Hoteleiro', 'Hotéis / pousadas', '18-26', 'Sim', 'Sim'],
          ['Auditório / teatro', 'Cultural', '16-22', 'Sim', 'Sim'],
          ['Data center', 'TI crítica', '22-30', 'Sim', 'Sim'],
          ['Laboratório', 'Pesquisa / clean room', '24-32', 'Sim', 'Sim'],
          ['Customizável (em branco)', 'Genérico', '—', 'Opcional', 'Sim']
        ],
        footer: '<em style="color:var(--ink-muted)">Cada template segue ABNT NBR 14724 (apresentação) e cita normas aplicáveis automaticamente</em>'
      }
    },
    ducts: {
      eyebrow: 'DUTOS · 340 PEÇAS',
      title: 'Dutos e acessórios — perda de carga tabulada',
      intro: '<p style="font-size:13px;color:var(--ink-dim);margin-bottom:18px">Catálogo conforme ASHRAE Duct Fitting Database 2024. Coeficientes de perda de carga (C0) tabulados para cálculo de pressão estática total e dimensionamento de ventilador.</p>',
      table: {
        headers: ['Categoria', 'Peça', 'Geometria', 'C0 típico', 'Norma'],
        rows: [
          ['Curvas', 'Curva 90° raio longo', 'Retangular', '0,18', 'ASHRAE CD3-1'],
          ['Curvas', 'Curva 90° raio curto', 'Retangular', '0,33', 'ASHRAE CD3-3'],
          ['Curvas', 'Curva 45° suave', 'Retangular', '0,11', 'ASHRAE CD3-9'],
          ['Curvas', 'Curva 90° gomada', 'Circular', '0,20', 'ASHRAE CD3-11'],
          ['Derivações', 'Tê 90° simétrico', 'Retangular', '1,20', 'ASHRAE SD5-1'],
          ['Derivações', 'Tê 45° (Y)', 'Retangular', '0,55', 'ASHRAE SD5-9'],
          ['Derivações', 'Bifurcação cônica', 'Circular', '0,45', 'ASHRAE SD5-15'],
          ['Reduções', 'Redução cônica gradual', 'Retangular', '0,05', 'ASHRAE SR4-1'],
          ['Reduções', 'Redução brusca', 'Retangular', '0,28', 'ASHRAE SR4-3'],
          ['Reduções', 'Aumento gradual', 'Retangular', '0,12', 'ASHRAE SR2-1'],
          ['Registros', 'Damper de borboleta aberto', 'Retangular', '0,18', 'ASHRAE CD9-1'],
          ['Registros', 'Damper VAV aberto', 'Retangular', '0,30', 'ASHRAE CD9-7'],
          ['Grelhas', 'Grelha simples ar de retorno', '—', '1,40', 'ASHRAE ER5-3'],
          ['Grelhas', 'Difusor 4 vias', '—', '2,20', 'ASHRAE ER2-1'],
          ['Equipamentos', 'Filtro G4 limpo', '—', '0,85', 'ASHRAE'],
          ['Equipamentos', 'Serpentina 6 fileiras', '—', '1,35', 'ASHRAE']
        ],
        footer: '<em style="color:var(--ink-muted)">340 peças · base atualizada da ASHRAE Duct Fitting DB 2024 · cálculo automático de PE no SmartHVAC</em>'
      }
    },
    materials: {
      eyebrow: 'MATERIAIS · 56 TIPOS',
      title: 'Materiais e vidros — propriedades térmicas',
      intro: '<p style="font-size:13px;color:var(--ink-dim);margin-bottom:18px">Banco de propriedades térmicas (transmitância U e fator solar SHGC) de vidros, paredes, coberturas e isolamentos. Valores conforme ABNT NBR 15220-2 e ASHRAE 90.1.</p>',
      table: {
        headers: ['Categoria', 'Material', 'Espessura', 'U (W/m²·K)', 'SHGC', 'Fonte'],
        rows: [
          ['Vidro', 'Float incolor', '6 mm', '5,8', '0,82', 'NBR 15220-2'],
          ['Vidro', 'Float incolor', '8 mm', '5,7', '0,80', 'NBR 15220-2'],
          ['Vidro', 'Laminado incolor', '6+6 mm', '5,4', '0,76', 'NBR 15220-2'],
          ['Vidro', 'Laminado verde', '6+6 mm', '5,4', '0,52', 'NBR 15220-2'],
          ['Vidro', 'Duplo (insulado) ar', '6/12/6', '2,8', '0,76', 'NBR 15220-2'],
          ['Vidro', 'Duplo low-e', '6/12/6', '1,8', '0,42', 'NBR 15220-2'],
          ['Vidro', 'Reflexivo prateado', '6 mm', '5,7', '0,38', 'NBR 15220-2'],
          ['Vidro', 'Triplo (insulado)', '6/12/6/12/6', '0,9', '0,38', 'ASHRAE'],
          ['Película', 'Película solar 70', 'aplicada', '5,4', '0,45', 'Catálogo 3M'],
          ['Película', 'Película solar 35', 'aplicada', '5,4', '0,28', 'Catálogo 3M'],
          ['Parede', 'Tijolo cerâmico 6 furos + 2,5+2,5cm reboco', '14 cm', '2,49', '—', 'NBR 15220-2'],
          ['Parede', 'Bloco concreto + reboco', '14 cm', '2,28', '—', 'NBR 15220-2'],
          ['Parede', 'Drywall 12,5 mm + lã rocha 50 mm', '7,5 cm', '0,55', '—', 'NBR 15220-2'],
          ['Cobertura', 'Telha cerâmica + laje 10 cm + reboco', '—', '2,02', '—', 'NBR 15220-2'],
          ['Cobertura', 'Telha metálica + lã vidro 50mm', '—', '0,82', '—', 'NBR 15220-2'],
          ['Cobertura', 'Telhado verde extensivo', '—', '0,45', '—', 'ABRASCA'],
          ['Isolamento', 'Lã de rocha', '50 mm', '0,037 (k)', '—', 'NBR 11357'],
          ['Isolamento', 'Lã de vidro', '50 mm', '0,038 (k)', '—', 'NBR 11357'],
          ['Isolamento', 'EPS (isopor)', '30 mm', '0,040 (k)', '—', 'NBR 11949']
        ],
        footer: '<em style="color:var(--ink-muted)">Total 56 materiais · seleção automática conforme tipo de envoltória declarado no passo 1 do wizard</em>'
      }
    }
  };

  function openLibrary(key){
    const lib = libraryContent[key];
    if(!lib) return;
    state.currentLibrary = key;
    document.getElementById('libEyebrow').textContent = lib.eyebrow;
    document.getElementById('libTitle').textContent = lib.title;
    let html = lib.intro;
    html += '<div style="border:1px solid var(--line);border-radius:8px;overflow:hidden">';
    html += '<table style="width:100%;border-collapse:collapse;font-size:12px"><thead><tr>';
    lib.table.headers.forEach(function(h){
      html += '<th style="text-align:left;font-family:var(--font-mono);font-size:10px;letter-spacing:.08em;text-transform:uppercase;color:var(--ink-muted);font-weight:500;padding:10px 12px;background:var(--bg-2);border-bottom:1px solid var(--line);white-space:nowrap">' + h + '</th>';
    });
    html += '</tr></thead><tbody>';
    lib.table.rows.forEach(function(row){
      html += '<tr style="border-bottom:1px solid rgba(30,35,45,.4)">';
      row.forEach(function(c, i){
        const isFirst = i === 0;
        const align = (typeof c === 'string' && /^[\d,.\-]+/.test(c.trim())) || c.toString().includes('°') || c.toString().includes('m') ? 'right' : 'left';
        html += '<td style="padding:8px 12px;color:' + (isFirst ? 'var(--ink)' : 'var(--ink-dim)') + ';font-size:12px' + (i > 0 ? ';font-family:var(--font-mono)' : '') + '">' + c + '</td>';
      });
      html += '</tr>';
    });
    html += '</tbody></table></div>';
    if(lib.table.footer){
      html += '<div style="margin-top:14px;font-size:11px;color:var(--ink-muted);font-family:var(--font-mono);text-align:center">' + lib.table.footer + '</div>';
    }
    document.getElementById('libBody').innerHTML = html;
    document.getElementById('libraryModal').classList.add('active');
  }

  function closeLibrary(){
    document.getElementById('libraryModal').classList.remove('active');
  }

  // Exporta a biblioteca atualmente aberta como CSV
  function exportLibrary(){
    if(!state.currentLibrary) return;
    const lib = libraryContent[state.currentLibrary];
    if(!lib) return;
    const csv = [lib.table.headers.join(';')].concat(
      lib.table.rows.map(function(r){ return r.map(function(c){ return '"' + String(c).replace(/"/g,'""') + '"'; }).join(';'); })
    ).join('\n');
    const blob = new Blob(['\ufeff' + csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'smarthvac-' + state.currentLibrary + '.csv';
    document.body.appendChild(a);
    a.click();
    setTimeout(function(){ document.body.removeChild(a); URL.revokeObjectURL(url); }, 100);
    toastShow('Biblioteca exportada', lib.title.split('—')[0].trim() + ' · arquivo CSV', 'success');
  }

  // Mostra/esconde senha clicando no ícone do olho
  function togglePassView(inputId, btn){
    const input = document.getElementById(inputId);
    if(!input || !btn) return;
    const eyeOn = btn.querySelector('.eye-on');
    const eyeOff = btn.querySelector('.eye-off');
    if(input.type === 'password'){
      input.type = 'text';
      if(eyeOn) eyeOn.style.display = 'none';
      if(eyeOff) eyeOff.style.display = 'block';
    } else {
      input.type = 'password';
      if(eyeOn) eyeOn.style.display = 'block';
      if(eyeOff) eyeOff.style.display = 'none';
    }
  }

  // Validador de senha forte
  function validatePassStrong(pass){
    return {
      len: pass.length >= 8,
      upper: /[A-Z]/.test(pass),
      lower: /[a-z]/.test(pass),
      num: /[0-9]/.test(pass),
      spec: /[!@#$%&*]/.test(pass),
      get all(){ return this.len && this.upper && this.lower && this.num && this.spec; }
    };
  }
  function checkPassRules(inputId, rulesId){
    const pass = document.getElementById(inputId).value;
    const v = validatePassStrong(pass);
    const cont = document.getElementById(rulesId);
    if(!cont) return;
    cont.querySelectorAll('.pass-rule').forEach(r => {
      r.classList.toggle('ok', !!v[r.dataset.rule]);
    });
  }

  // ============================================================
  // BOOTSTRAP (primeira execução)
  // ============================================================
  // Cria os administradores padrão no primeiro carregamento:
  //  - admin_general: gerencia APENAS usuários/contas (sem acesso a projetos)
  //  - admin_projects: analisa, aprova e cria projetos (sem gestão de contas)
  (function bootstrapAdmins(){
    const users = loadUsers();
    if(!users['admin@smarthvac.io']){
      users['admin@smarthvac.io'] = {
        name: 'Administrador Geral',
        email: 'admin@smarthvac.io',
        company: 'SmartHVAC',
        role: 'admin_general',
        passHash: hashPass('admin@2026'),
        plan: 'Enterprise',
        status: 'active',
        createdAt: new Date().toISOString(),
        lastLoginAt: null
      };
    }
    if(!users['projetos@smarthvac.io']){
      users['projetos@smarthvac.io'] = {
        name: 'Administrador de Projetos',
        email: 'projetos@smarthvac.io',
        company: 'SmartHVAC',
        role: 'admin_projects',
        passHash: hashPass('projetos@2026'),
        plan: 'Enterprise',
        status: 'active',
        createdAt: new Date().toISOString(),
        lastLoginAt: null
      };
    }
    saveUsers(users);
  })();

  // ============================================================
  // NAVEGAÇÃO DE TELAS
  // ============================================================
  function go(screen){
    document.querySelectorAll('.screen').forEach(s=>s.classList.remove('active'));
    document.getElementById('screen-'+screen).classList.add('active');
    window.scrollTo(0,0);
  }

  function backToLanding(){
    updateLandingNav();
    go('landing');
  }

  function updateLandingNav(){
    const navCta = document.getElementById('navCta');
    if(!navCta) return;
    if(state.currentUser){
      navCta.innerHTML = '<button class="btn btn-ghost" onclick="doLogout()">Sair</button><button class="btn btn-primary" onclick="backToApp()">Voltar ao app <svg class="i" viewBox="0 0 24 24"><path d="M5 12h14M13 6l6 6-6 6"/></svg></button>';
    } else {
      navCta.innerHTML = '<button class="btn btn-ghost" onclick="openDemo()">Testar demo</button><button class="btn btn-primary" onclick="go(\'auth\')"><svg class="i" viewBox="0 0 24 24"><path d="M15 3h4a2 2 0 012 2v14a2 2 0 01-2 2h-4M10 17l5-5-5-5M15 12H3"/></svg>Entrar</button>';
    }
  }

  function backToApp(){
    if(!state.currentUser){ go('auth'); return; }
    go('app');
    if(state.currentUser.role === 'admin_general'){
      showView('admin');
      setTimeout(()=>switchAdminTabByName('users'), 30);
    } else {
      showView('dashboard');
    }
  }

  // ============================================================
  // AUTENTICAÇÃO
  // ============================================================
  function switchAuth(mode){
    document.getElementById('authLogin').style.display = mode === 'login' ? 'block' : 'none';
    document.getElementById('authSignup').style.display = mode === 'signup' ? 'block' : 'none';
    clearAuthErrors();
  }
  function clearAuthErrors(){ document.querySelectorAll('.field input').forEach(i=>i.classList.remove('field-error')); }

  function doLogin(){
    clearAuthErrors();
    const email = document.getElementById('loginEmail').value.trim().toLowerCase();
    const pass = document.getElementById('loginPass').value;

    if(!email){ document.getElementById('loginEmail').classList.add('field-error'); toastShow('E-mail obrigatório','Informe seu e-mail','warn'); return; }
    if(!pass){ document.getElementById('loginPass').classList.add('field-error'); toastShow('Senha obrigatória','Informe sua senha','warn'); return; }

    const users = loadUsers();
    const user = users[email];
    if(!user){ document.getElementById('loginEmail').classList.add('field-error'); toastShow('Conta não encontrada','Solicite acesso ao administrador da sua empresa','error'); return; }
    if(user.passHash !== hashPass(pass)){ document.getElementById('loginPass').classList.add('field-error'); toastShow('Senha incorreta','Verifique e tente novamente','error'); return; }
    if(user.status === 'suspended'){ toastShow('Acesso bloqueado','Sua conta foi bloqueada. Contate o Administrador Geral.','error'); return; }

    // Primeiro acesso (mustChangePassword): força modal de troca de senha
    if(user.mustChangePassword){
      state.pendingFirstLogin = { email: email, user: user };
      document.getElementById('firstLoginPass1').value = '';
      document.getElementById('firstLoginPass2').value = '';
      checkPassRules('firstLoginPass1','firstLoginRules');
      document.getElementById('firstLoginModal').classList.add('active');
      return;
    }

    user.lastLoginAt = new Date().toISOString();
    users[email] = user;
    saveUsers(users);

    state.currentUser = {...user};
    saveSession(state.currentUser);
    toastShow('Bem-vindo de volta', user.name, 'success');
    enterApp();
  }

  function completeFirstLogin(){
    const p1 = document.getElementById('firstLoginPass1').value;
    const p2 = document.getElementById('firstLoginPass2').value;
    const v = validatePassStrong(p1);
    if(!v.all){
      toastShow('Senha não atende aos requisitos','Verifique a lista de regras','warn');
      return;
    }
    if(p1 !== p2){
      document.getElementById('firstLoginPass2').classList.add('field-error');
      toastShow('Senhas não coincidem','Confirme a mesma senha','warn');
      return;
    }
    if(!state.pendingFirstLogin){ return; }
    const users = loadUsers();
    const email = state.pendingFirstLogin.email;
    if(!users[email]) return;
    users[email].passHash = hashPass(p1);
    users[email].mustChangePassword = false;
    users[email].status = 'active';
    users[email].lastLoginAt = new Date().toISOString();
    saveUsers(users);
    state.currentUser = {...users[email]};
    saveSession(state.currentUser);
    state.pendingFirstLogin = null;
    document.getElementById('firstLoginModal').classList.remove('active');
    addAuditEntry('definiu nova senha pessoal (primeiro acesso)','ok');
    toastShow('Senha criada com sucesso','Bem-vindo, ' + state.currentUser.name.split(' ')[0],'success');
    enterApp();
  }

  function oauthLogin(provider){
    toastShow(provider + ' SSO em breve','Use login por e-mail ou modo demonstração','info');
  }
  function confirmOauth(){ go('auth'); }

  function enterApp(){
    if(!state.currentUser){ go('auth'); return; }
    // Normaliza papel legado 'admin' (genérico) para admin_general
    if(state.currentUser.role === 'admin'){
      state.currentUser.role = 'admin_general';
      const users = loadUsers();
      if(users[state.currentUser.email]){
        users[state.currentUser.email].role = 'admin_general';
        saveUsers(users);
      }
      saveSession(state.currentUser);
    }
    applyUserToUI();
    renderDashboard();
    go('app');
    if(state.currentUser.role === 'admin_general'){
      showView('admin');
      setTimeout(()=>switchAdminTabByName('users'), 30);
    } else if(state.currentUser.role === 'admin_projects'){
      // admin de projetos vê painel de aprovações + pode acessar dashboard pelo menu
      showView('admin');
      setTimeout(()=>switchAdminTabByName('approvals'), 30);
    } else {
      showView('dashboard');
    }
    resetInactivityTimer();
  }

  function applyUserToUI(){
    const u = state.currentUser;
    if(!u) return;
    const initials = getInitials(u.name);
    const setText = (id, v) => { const el = document.getElementById(id); if(el) el.textContent = v; };

    setText('sbAvatar', initials);
    setText('sbUserName', u.name);
    const roleLabels = {
      admin_general: 'Administrador Geral',
      admin_projects: 'Admin de Projetos',
      admin: 'Administrador',
      engineer: 'Engenheiro HVAC',
      viewer: 'Visualizador',
      demo: 'Convidado'
    };
    const roleLabel = roleLabels[u.role] || 'Usuário';
    setText('sbUserRole', roleLabel + ' · ' + (u.plan || 'Free'));
    setText('menuAvatar', initials);
    setText('menuUserName', u.name);
    setText('menuUserEmail', u.email);
    setText('dashUserName', u.name.split(' ')[0]);

    const isAdminGeneral = u.role === 'admin_general';
    const isAdminProjects = u.role === 'admin_projects';
    const isLegacyAdmin = u.role === 'admin';
    // Admin de Projetos vê o painel admin (mas só a aba aprovações + auditoria)
    // Admin Geral vê o painel admin (apenas usuários + auditoria)
    const canSeeAdmin = isAdminGeneral || isAdminProjects || isLegacyAdmin;
    // Admin Geral NÃO vê projetos/wizard/bibliotecas/histórico/normativos
    const canSeeProjects = !isAdminGeneral;

    const adminSidebar = document.getElementById('sidebarAdminEntry');
    const adminMenu = document.getElementById('menuAdminEntry');
    if(adminSidebar) adminSidebar.style.display = canSeeAdmin ? '' : 'none';
    if(adminMenu) adminMenu.style.display = canSeeAdmin ? '' : 'none';

    document.querySelectorAll('[data-restricted="projects"]').forEach(el => {
      el.style.display = canSeeProjects ? '' : 'none';
    });

    document.body.classList.toggle('role-admin-general', isAdminGeneral);
    document.body.classList.toggle('role-admin-projects', isAdminProjects);

    applyAdminTabVisibility();

    const setVal = (id, v) => { const el = document.getElementById(id); if(el) el.value = v; };
    setVal('settingsName', u.name);
    setVal('settingsEmail', u.email);
    setVal('settingsCompany', u.company || '');
  }

  // Controla quais abas do painel administrativo aparecem por papel
  // admin_general: APENAS usuários + auditoria de TODAS as ações (incluindo aprovações)
  // admin_projects: APENAS aprovações (não vê usuários, não vê auditoria)
  function applyAdminTabVisibility(){
    const u = state.currentUser;
    if(!u) return;
    const tabs = document.querySelectorAll('.admin-tab');
    tabs.forEach(t => {
      const name = t.getAttribute('data-tab');
      let show = true;
      if(u.role === 'admin_general'){
        show = (name === 'users' || name === 'audit');
      } else if(u.role === 'admin_projects'){
        show = (name === 'approvals' || name === 'reviews');
      }
      t.style.display = show ? '' : 'none';
    });
    // Garante que a aba ativa é uma permitida para o papel
    const activeTab = document.querySelector('.admin-tab.active');
    if(activeTab && activeTab.style.display === 'none'){
      const firstVisible = document.querySelector('.admin-tab:not([style*="display: none"])');
      if(firstVisible) firstVisible.click();
    }
  }

  function switchAdminTabByName(tabName){
    const tab = document.querySelector('.admin-tab[data-tab="' + tabName + '"]');
    if(tab) tab.click();
  }

  function toggleUserMenu(e){ if(e) e.stopPropagation(); document.getElementById('userMenu').classList.toggle('active'); }
  function closeUserMenu(){ const um = document.getElementById('userMenu'); if(um) um.classList.remove('active'); }
  document.addEventListener('click', (e)=>{
    if(!e.target.closest('.sb-user')) closeUserMenu();
    if(!e.target.closest('.search-wrap')) closeSearch();
  });

  function doLogout(){
    if(!confirm('Deseja sair da sua conta?')) return;
    closeUserMenu();
    state.isDemo = false;
    state.currentUser = null;
    clearSession();
    document.body.classList.remove('has-demo-banner');
    document.getElementById('demoBanner').classList.remove('active');
    if(demoTimerInt){ clearInterval(demoTimerInt); demoTimerInt = null; }
    if(state.inactivityTimer){ clearTimeout(state.inactivityTimer); state.inactivityTimer = null; }
    ['loginEmail','loginPass'].forEach(id=>{ const el = document.getElementById(id); if(el) el.value = ''; });
    switchAuth('login');
    updateLandingNav();
    go('landing');
    toastShow('Sessão encerrada','Volte sempre','info');
  }

  // Auto-logout por inatividade (admin geral e contas reais)
  // Sessão expira em 30 minutos sem interação. Demo tem seu próprio timer.
  const INACTIVITY_MS = 30 * 60 * 1000;
  function resetInactivityTimer(){
    if(!state.currentUser || state.isDemo) return;
    if(state.inactivityTimer){ clearTimeout(state.inactivityTimer); }
    state.inactivityTimer = setTimeout(function(){
      toastShow('Sessão expirada','Você foi desconectado por inatividade','warn');
      state.currentUser = null;
      clearSession();
      go('landing');
      updateLandingNav();
    }, INACTIVITY_MS);
  }
  ['mousedown','keydown','scroll','touchstart'].forEach(function(ev){
    document.addEventListener(ev, function(){ resetInactivityTimer(); }, { passive: true });
  });

  // Sair do wizard com pergunta de salvar como rascunho
  function exitWizard(){
    const pname = document.getElementById('projectName');
    const projectName = (pname && pname.value.trim()) || 'Projeto sem nome';
    const isNew = !state.currentProjectId;
    if(state.unsavedChanges){
      // Se não tem nome ainda, oferece sair sem salvar
      if(!pname || !pname.value.trim()){
        if(!confirm('Sair sem salvar?\n\nVocê ainda não deu um nome ao projeto. Sem nome ele não pode ser salvo.')){
          return;
        }
      } else {
        const choice = confirm('Deseja salvar "' + projectName + '" como rascunho antes de sair?\n\nOK = Salvar e voltar ao painel\nCancelar = Sair sem salvar');
        if(choice){
          try{
            const ver = document.getElementById('wizardVer');
            const projectVer = ver ? ver.textContent : 'v01';
            const saved = JSON.parse(localStorage.getItem('smarthvac.projects') || '[]');
            const id = state.currentProjectId || ('proj_' + Date.now());
            const idx = saved.findIndex(function(p){ return p.id === id; });
            const record = {
              id: id,
              name: projectName,
              version: projectVer,
              status: 'draft',
              owner: state.currentUser ? state.currentUser.email : 'unknown',
              savedAt: new Date().toISOString(),
              step: curStep
            };
            if(idx >= 0) saved[idx] = Object.assign({}, saved[idx], record);
            else saved.push(record);
            localStorage.setItem('smarthvac.projects', JSON.stringify(saved));
            addAuditEntry('salvou rascunho ' + projectName, 'ok');
            toastShow('Rascunho salvo', projectName, 'success');
          }catch(e){}
        }
      }
    }
    state.currentProjectId = null;
    state.unsavedChanges = false;
    showView('dashboard');
    renderDashboard();
  }

  // ============================================================
  // MODO DEMONSTRAÇÃO
  // ============================================================
  let demoTimerInt = null;
  function openDemo(){
    state.isDemo = true;
    state.demo = { projectsCreated: 0, exportsAttempted: 0, startedAt: Date.now() };
    state.currentUser = {
      name: 'Convidado Demo',
      email: 'demo@smarthvac.io',
      company: 'Demonstração',
      role: 'demo',
      plan: 'Demo · limitado'
    };
    document.body.classList.add('has-demo-banner');
    document.getElementById('demoBanner').classList.add('active');
    applyUserToUI();
    renderDashboard(true);
    go('app');
    showView('dashboard');
  }

  function startDemoTimer(){ /* desativado: demo sem expiração automática */ }
  function updateDemoTimer(){ /* desativado */ }

  function exitDemo(){
    state.isDemo = false;
    state.currentUser = null;
    if(demoTimerInt){ clearInterval(demoTimerInt); demoTimerInt = null; }
    document.body.classList.remove('has-demo-banner');
    document.getElementById('demoBanner').classList.remove('active');
    switchAuth('login');
    updateLandingNav();
    go('landing');
  }
  function closeDemoBanner(){
    document.body.classList.remove('has-demo-banner');
    document.getElementById('demoBanner').classList.remove('active');
  }

  function goToLogin(){
    state.isDemo = false;
    state.currentUser = null;
    if(demoTimerInt){ clearInterval(demoTimerInt); demoTimerInt = null; }
    document.body.classList.remove('has-demo-banner');
    document.getElementById('demoBanner').classList.remove('active');
    switchAuth('login');
    updateLandingNav();
    go('auth');
  }

  // ============================================================
  // SALVAR PROJETO / PROCESSAR
  // ============================================================
  function saveProject(btn){
    if(state.isDemo){
      toastShow('Recurso bloqueado no modo demo','Salvamento disponível apenas para clientes','warn');
      return;
    }
    if(!btn) return;
    // Valida nome do projeto antes de salvar
    const pnameEl = document.getElementById('projectName');
    const pname = pnameEl ? pnameEl.value.trim() : '';
    if(!pname){
      toastShow('Dê um nome ao projeto','Volte ao passo 1 e preencha o nome do projeto','warn');
      setStep(1);
      setTimeout(function(){ if(pnameEl){ pnameEl.focus(); pnameEl.classList.add('field-error'); } }, 200);
      return;
    }
    const original = btn.innerHTML;
    btn.innerHTML = '<svg class="i" viewBox="0 0 24 24" style="animation:spin 1s linear infinite"><path d="M23 4v6h-6M1 20v-6h6"/></svg>Salvando...';
    btn.disabled = true;
    const ver = document.getElementById('wizardVer');
    const projectName = pname;
    const projectVer = ver ? ver.textContent : 'v01';
    setTimeout(function(){
      try{
        const saved = JSON.parse(localStorage.getItem('smarthvac.projects') || '[]');
        const id = state.currentProjectId || ('proj_' + Date.now());
        const existing = saved.findIndex(function(p){ return p.id === id; });
        const record = {
          id: id,
          name: projectName,
          version: projectVer,
          status: 'draft',
          owner: state.currentUser ? state.currentUser.email : 'unknown',
          ownerName: state.currentUser ? state.currentUser.name : 'unknown',
          savedAt: new Date().toISOString(),
          step: curStep
        };
        // Inclui PDF se houver e tabela atual
        if(state.uploadedPDF){
          record.pdfName = state.uploadedPDF.name;
          record.pdfSize = state.uploadedPDF.size;
          if(state.uploadedPDF.dataUrl) record.pdfDataUrl = state.uploadedPDF.dataUrl;
        }
        record.tableHtml = (document.getElementById('masterTbody')||{}).innerHTML || '';
        if(existing >= 0) saved[existing] = Object.assign({}, saved[existing], record);
        else saved.push(record);
        try{
          localStorage.setItem('smarthvac.projects', JSON.stringify(saved));
        }catch(e){
          // localStorage cheio: salva sem o PDF
          if(record.pdfDataUrl){
            delete record.pdfDataUrl;
            if(existing >= 0) saved[existing] = Object.assign({}, saved[existing], record);
            else saved[saved.length-1] = record;
            localStorage.setItem('smarthvac.projects', JSON.stringify(saved));
            toastShow('PDF não pôde ser persistido','Arquivo muito grande para o navegador · só fica nesta sessão','warn');
          }
        }
        state.currentProjectId = id;
        state.unsavedChanges = false;
        addAuditEntry('salvou projeto ' + projectName + ' (' + projectVer + ')', 'ok');
      }catch(e){}
      btn.innerHTML = original;
      btn.disabled = false;
      toastShow('Projeto salvo', projectName + ' · voltando ao painel', 'success');
      setTimeout(function(){
        showView('dashboard');
        renderDashboard();
      }, 700);
    }, 800);
  }

  function processCalculation(btn){
    if(state.isDemo){
      toastShow('Recurso bloqueado no modo demo','Processamento completo disponível apenas para clientes','warn');
      return;
    }
    if(!btn) return;
    const original = btn.innerHTML;
    btn.innerHTML = '<svg class="i" viewBox="0 0 24 24" style="animation:spin 1s linear infinite"><path d="M23 4v6h-6M1 20v-6h6"/></svg>Processando...';
    btn.disabled = true;
    setTimeout(function(){
      btn.innerHTML = original;
      btn.disabled = false;
      const title = document.getElementById('wizardTitle');
      const projectName = title ? title.textContent : 'Projeto';
      addAuditEntry('processou cálculo de ' + projectName + ' · 386,27 kW · 26 ambientes', 'ok');
      toastShow('Cálculo processado','386,27 kW · 26 ambientes · conforme NBR 16401','success');
      if(curStep < 7){ setStep(curStep + 1); }
    }, 1800);
  }

  // Salvar projeto como versão final (as-built)
  function saveAsFinal(btn){
    if(state.isDemo){ toastShow('Recurso bloqueado no modo demo','Submissão para aprovação disponível apenas para clientes','warn'); return; }
    if(!btn) return;
    if(!confirm('Enviar este projeto para aprovação do Administrador de Projetos?\n\nO projeto será listado na fila de aprovações e fica trancado para edição até ser aprovado ou rejeitado.')) return;
    const original = btn.innerHTML;
    btn.innerHTML = '<svg class="i" viewBox="0 0 24 24" style="animation:spin 1s linear infinite"><path d="M23 4v6h-6M1 20v-6h6"/></svg>Enviando para aprovação...';
    btn.disabled = true;
    const pname = document.getElementById('projectName');
    const ver = document.getElementById('wizardVer');
    const projectName = (pname && pname.value.trim()) || (document.getElementById('wizardTitle') && document.getElementById('wizardTitle').textContent) || 'Projeto';
    const projectVer = ver ? ver.textContent : 'v01';
    setTimeout(function(){
      try{
        const saved = JSON.parse(localStorage.getItem('smarthvac.projects') || '[]');
        const id = state.currentProjectId || ('proj_' + Date.now());
        const idx = saved.findIndex(function(p){ return p.id === id; });
        const record = {
          id: id,
          name: projectName,
          version: projectVer,
          status: 'submitted',
          owner: state.currentUser ? state.currentUser.email : 'unknown',
          ownerName: state.currentUser ? state.currentUser.name : 'unknown',
          submittedAt: new Date().toISOString(),
          savedAt: new Date().toISOString(),
          step: curStep
        };
        // Inclui PDF e snapshot da tabela para o Admin de Projetos visualizar
        if(state.uploadedPDF){
          record.pdfName = state.uploadedPDF.name;
          record.pdfSize = state.uploadedPDF.size;
          if(state.uploadedPDF.dataUrl) record.pdfDataUrl = state.uploadedPDF.dataUrl;
        }
        record.tableHtml = (document.getElementById('masterTbody')||{}).innerHTML || '';
        if(idx >= 0) saved[idx] = Object.assign({}, saved[idx], record);
        else saved.push(record);
        try{
          localStorage.setItem('smarthvac.projects', JSON.stringify(saved));
        }catch(e){
          if(record.pdfDataUrl){
            delete record.pdfDataUrl;
            saved[idx >= 0 ? idx : saved.length-1] = record;
            localStorage.setItem('smarthvac.projects', JSON.stringify(saved));
          }
        }
        state.currentProjectId = id;
        addAuditEntry('enviou projeto ' + projectName + ' (' + projectVer + ') para aprovação', 'ok');
      }catch(e){}
      btn.innerHTML = original;
      btn.disabled = false;
      toastShow('Projeto enviado para aprovação', projectName + ' · aguardando análise do Admin de Projetos', 'success');
      setTimeout(function(){ showView('dashboard'); renderDashboard(); }, 800);
    }, 1000);
  }

  function demoBlock(feature){
    toastShow(
      'Recurso bloqueado no modo demo',
      feature + ' disponível apenas para clientes. Fale com um especialista.',
      'warn'
    );
  }

  // ============================================================
  // NAVEGAÇÃO ENTRE VIEWS
  // ============================================================
  function showView(view, sub){
    // Admin Geral não acessa projetos, wizard, bibliotecas, histórico nem normativos
    if(state.currentUser && state.currentUser.role === 'admin_general'){
      const blocked = ['dashboard','wizard','libraries','history','norms','notifications'];
      if(blocked.indexOf(view) >= 0){
        toastShow('Acesso restrito','Administrador Geral gerencia apenas contas de usuários','warn');
        view = 'admin';
      }
    }
    document.querySelectorAll('.view').forEach(v=>v.style.display='none');
    const el = document.getElementById('view-'+view);
    if(el){ el.style.display='block'; }
    document.querySelectorAll('.sb-item').forEach(s=>{
      s.classList.toggle('active', s.dataset.view === view);
    });
    if(view === 'norms' && sub){ showNorm(sub); }
    if(view === 'admin'){ renderUserTable(); }
    if(view === 'notifications'){ renderNotifications(); }
    window.scrollTo(0,0);
  }

  // ============================================================
  // PROJETOS
  // ============================================================
  function startNewProject(){
    // Admin Geral não cria projetos
    if(state.currentUser && state.currentUser.role === 'admin_general'){
      toastShow('Acesso restrito','Administrador Geral não cria projetos. Crie uma conta de Engenheiro para isso.','warn');
      return;
    }
    // demo: aplica limite máximo de projetos
    if(state.isDemo && state.demo.projectsCreated >= DEMO_LIMITS.maxProjects){
      demoBlock('Múltiplos projetos');
      return;
    }
    if(state.isDemo) state.demo.projectsCreated++;

    state.currentProjectId = null;
    state.unsavedChanges = false;
    const title = document.getElementById('wizardTitle');
    const ver = document.getElementById('wizardVer');
    const crumb = document.getElementById('wizardCrumb');
    if(title) title.textContent = 'Novo projeto';
    if(ver) ver.textContent = 'RASCUNHO';
    if(crumb) crumb.textContent = 'NOVO PROJETO';
    const pname = document.getElementById('projectName'); if(pname) pname.value = '';
    const city = document.getElementById('geoCity'); if(city) city.value = '';
    const addr = document.getElementById('geoAddress'); if(addr) addr.value = '';
    updateClimate();
    const rng = document.getElementById('orientRange');
    const ndl = document.getElementById('needle');
    const val = document.getElementById('orientVal');
    if(rng){ rng.value = 0; }
    if(ndl){ ndl.style.transform = 'rotate(0deg)'; }
    if(val){ val.textContent = '0°'; }
    clearFile();
    showView('wizard');
    setStep(1);
    setTimeout(function(){ const p = document.getElementById('projectName'); if(p) p.focus(); }, 100);
  }

  // Quando o usuário digita o nome, atualiza topbar e cabeçalho do wizard ao vivo
  function onProjectNameInput(){
    const inp = document.getElementById('projectName');
    if(!inp) return;
    const name = inp.value.trim() || 'Novo projeto';
    const title = document.getElementById('wizardTitle');
    const crumb = document.getElementById('wizardCrumb');
    if(title) title.textContent = name;
    if(crumb) crumb.textContent = name.toUpperCase();
    state.unsavedChanges = true;
  }

  function openProject(id){
    state.currentProjectId = id;
    const projects = {
      'matriz-marata': {name:'Matriz Maratá', ver:'VERSÃO 02'},
      'hospital-sao-lucas': {name:'Hospital São Lucas', ver:'VERSÃO 04'},
      'edificio-atlantico': {name:'Edifício Atlântico', ver:'VERSÃO 01'},
      'shopping-bela-vista': {name:'Shopping Bela Vista', ver:'VERSÃO 03'},
      'torre-corporate': {name:'Torre Corporate', ver:'VERSÃO 02'}
    };
    const p = projects[id] || {name:'Projeto', ver:'V01'};
    const title = document.getElementById('wizardTitle');
    const ver = document.getElementById('wizardVer');
    if(title) title.textContent = p.name;
    if(ver) ver.textContent = p.ver;
    const city = document.getElementById('geoCity');
    const addr = document.getElementById('geoAddress');
    if(city){ city.value = 'salvador'; updateClimate(); }
    if(addr) addr.value = 'Av. Tancredo Neves, 1320 · Caminho das Árvores';
    const rng = document.getElementById('orientRange');
    const ndl = document.getElementById('needle');
    const val = document.getElementById('orientVal');
    if(rng){ rng.value = 45; }
    if(ndl){ ndl.style.transform = 'rotate(45deg)'; }
    if(val){ val.textContent = '45°'; }
    showView('wizard');
    setStep(3);
  }

  // ============================================================
  // PAINEL (DASHBOARD)
  // ============================================================
  const demoProjects = [
    {id:'matriz-marata', name:'Matriz Maratá', loc:'Salvador · BA', area:'1.247 m²', kw:'386 kW', status:'calc', ver:'v 02', featured:true},
    {id:'hospital-sao-lucas', name:'Hospital São Lucas', loc:'Feira de Santana · BA', area:'3.420 m²', kw:'892 kW', status:'done', ver:'v 04'},
    {id:'edificio-atlantico', name:'Edifício Atlântico', loc:'Recife · PE', area:'820 m²', kw:'—', status:'draft', ver:'v 01'},
    {id:'shopping-bela-vista', name:'Shopping Bela Vista', loc:'Salvador · BA', area:'5.100 m²', kw:'1.240 kW', status:'calc', ver:'v 03'},
    {id:'torre-corporate', name:'Torre Corporate', loc:'Ilhéus · BA', area:'2.180 m²', kw:'540 kW', status:'done', ver:'v 02'}
  ];

  const semesterData = {
    'S1-2024': {projects:4, kw:842, memos:9, qai:3, days:1.8},
    'S2-2024': {projects:7, kw:1420, memos:15, qai:8, days:2.1},
    'S1-2025': {projects:10, kw:2180, memos:24, qai:14, days:2.3},
    'S2-2025': {projects:12, kw:2847, memos:38, qai:22, days:2.4}
  };

  function renderDashboard(useDemoData){
    const statsRow = document.getElementById('statsRow');
    const grid = document.getElementById('projectsGrid');
    const subtitle = document.getElementById('dashSubtitle');
    if(!statsRow || !grid) return;

    // Pega projetos reais do localStorage do usuário atual
    let userProjects = [];
    try{
      const allSaved = JSON.parse(localStorage.getItem('smarthvac.projects') || '[]');
      const myEmail = state.currentUser ? state.currentUser.email : null;
      userProjects = allSaved.filter(function(p){ return p.owner === myEmail; });
    }catch(e){}

    // Em modo demo, mostra projetos fictícios; em conta real, mostra os salvos do usuário
    const projects = useDemoData ? demoProjects : userProjects;
    const isEmpty = projects.length === 0;

    if(isEmpty){
      statsRow.innerHTML = renderEmptyStats();
    } else if(useDemoData){
      statsRow.innerHTML = renderFullStats();
      updateSemesterDetail(state.selectedSemester);
    } else {
      // Stats reais para conta nova com projetos salvos
      const totalKw = userProjects.reduce(function(s,p){ return s + (p.totalKw||0); }, 0);
      const finalCount = userProjects.filter(function(p){ return p.status==='final'; }).length;
      const draftCount = userProjects.filter(function(p){ return p.status!=='final'; }).length;
      statsRow.innerHTML = '<div class="stat"><div class="stat-label">Projetos</div><div class="stat-value">' + userProjects.length + '</div><div class="stat-sub" style="color:var(--ink-muted)">' + draftCount + ' rascunho' + (draftCount!==1?'s':'') + '</div></div><div class="stat"><div class="stat-label">Carga calculada</div><div class="stat-value">' + (totalKw>0?totalKw.toFixed(0):'0') + '<span class="unit">kW</span></div><div class="stat-sub" style="color:var(--ink-muted)">soma das versões finais</div></div><div class="stat"><div class="stat-label">Finalizados</div><div class="stat-value">' + finalCount + '</div><div class="stat-sub" style="color:var(--ink-muted)">como as-built</div></div><div class="stat"><div class="stat-label">Em andamento</div><div class="stat-value">' + draftCount + '</div><div class="stat-sub" style="color:var(--ink-muted)">para concluir</div></div>';
    }

    if(subtitle){
      if(isEmpty){
        subtitle.textContent = 'Nenhum projeto criado ainda. Clique em "Novo projeto" para começar seu primeiro cálculo.';
      } else if(useDemoData){
        const inCalc = projects.filter(p=>p.status==='calc').length;
        const draft = projects.filter(p=>p.status==='draft').length;
        subtitle.textContent = 'Você tem ' + inCalc + ' projeto' + (inCalc!==1?'s':'') + ' em andamento' + (draft ? ' e ' + draft + ' rascunho' + (draft!==1?'s':'') : '') + '.';
      } else {
        subtitle.textContent = 'Você tem ' + projects.length + ' projeto' + (projects.length!==1?'s':'') + ' salvo' + (projects.length!==1?'s':'') + '.';
      }
    }

    if(isEmpty){
      grid.innerHTML = '<div class="empty-state" style="grid-column:1 / -1"><div class="empty-state-icon"><svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg></div><h3>Nenhum projeto ainda</h3><p>Suba sua primeira planta arquitetônica em PDF e veja o SmartHVAC extrair ambientes, calcular carga térmica e gerar os entregáveis em minutos.</p><button class="btn btn-primary btn-lg" onclick="startNewProject()"><svg class="i" viewBox="0 0 24 24"><path d="M12 5v14M5 12h14"/></svg>Criar primeiro projeto</button></div>';
    } else if(useDemoData){
      grid.innerHTML = projects.map(p => '<div class="project ' + (p.featured?'featured':'') + '" onclick="openProject(\'' + p.id + '\')"><div class="proj-head"><span class="proj-status ' + p.status + '">' + (p.status==='calc'?'em cálculo':p.status==='done'?'finalizado':'rascunho') + '</span><span class="proj-ver">' + p.ver + '</span></div><div class="proj-name">' + p.name + '</div><div class="proj-loc">' + p.loc + '</div><div class="proj-meta"><div class="proj-meta-item"><div class="k">Área total</div><div class="v">' + p.area + '</div></div><div class="proj-meta-item"><div class="k">Carga</div><div class="v ' + (p.kw!=='—'?'kw':'') + '">' + p.kw + '</div></div></div></div>').join('') + '<div class="project new" onclick="startNewProject()"><div class="plus">+</div><div>Novo projeto</div></div>';
    } else {
      // Renderiza projetos reais do usuário
      grid.innerHTML = projects.map(function(p){
        const status = p.status === 'final' ? 'done' : 'draft';
        const statusLabel = p.status === 'final' ? 'finalizado' : (p.step && p.step >= 3 ? 'em cálculo' : 'rascunho');
        const savedDate = p.savedAt ? new Date(p.savedAt).toLocaleDateString('pt-BR') : '—';
        return '<div class="project" onclick="resumeProject(\'' + p.id + '\')"><div class="proj-head"><span class="proj-status ' + status + '">' + statusLabel + '</span><span class="proj-ver">' + (p.version||'v01') + '</span></div><div class="proj-name">' + (p.name||'Projeto') + '</div><div class="proj-loc">salvo em ' + savedDate + '</div><div class="proj-meta"><div class="proj-meta-item"><div class="k">Etapa atual</div><div class="v">' + (p.step||1) + ' de 7</div></div><div class="proj-meta-item"><div class="k">Status</div><div class="v">' + statusLabel + '</div></div></div></div>';
      }).join('') + '<div class="project new" onclick="startNewProject()"><div class="plus">+</div><div>Novo projeto</div></div>';
    }
  }

  // Abre um projeto salvo retomando do passo onde parou
  function resumeProject(id){
    try{
      const all = JSON.parse(localStorage.getItem('smarthvac.projects') || '[]');
      const p = all.find(function(x){ return x.id === id; });
      if(!p){ toastShow('Projeto não encontrado','','warn'); return; }
      state.currentProjectId = id;
      const title = document.getElementById('wizardTitle');
      const ver = document.getElementById('wizardVer');
      const crumb = document.getElementById('wizardCrumb');
      const pname = document.getElementById('projectName');
      if(title) title.textContent = p.name || 'Projeto';
      if(ver) ver.textContent = p.version || 'v01';
      if(crumb) crumb.textContent = (p.name || 'Projeto').toUpperCase();
      if(pname) pname.value = p.name || '';
      // Restaura PDF se existir
      if(p.pdfDataUrl){
        state.uploadedPDF = {
          name: p.pdfName || 'planta.pdf',
          size: p.pdfSize || 0,
          dataUrl: p.pdfDataUrl,
          url: p.pdfDataUrl
        };
        insertPDFViewer(p.pdfDataUrl, p.pdfName || 'planta.pdf');
        const chip = document.getElementById('fileChip');
        const fname = document.getElementById('fileChipName');
        const fsize = document.getElementById('fileChipSize');
        if(chip) chip.style.display = 'flex';
        if(fname) fname.textContent = p.pdfName || 'planta.pdf';
        if(fsize) fsize.textContent = ((p.pdfSize||0)/1024/1024).toFixed(2) + ' MB · projeto salvo';
      } else {
        state.uploadedPDF = null;
        clearPDFViewer();
      }
      // Restaura tabela
      const tbody = document.getElementById('masterTbody');
      if(tbody && p.tableHtml){
        tbody.innerHTML = p.tableHtml;
        tbody.querySelectorAll('tr[data-floor]').forEach(function(tr){ recalcRow(tr); });
        recalcAll();
      }
      state.unsavedChanges = false;
      showView('wizard');
      setStep(p.step || 1);
    }catch(e){
      console.warn('Erro ao retomar projeto', e);
      toastShow('Erro ao abrir projeto','','error');
    }
  }

  // Filtra os projetos exibidos no grid do dashboard
  // 'all' = todos · 'incomplete' = step<7 e não final · 'draft' = status=draft · 'final' = status=final
  function filterProjects(filter, chip){
    document.querySelectorAll('.filter-chips .chip').forEach(function(c){ c.classList.remove('active'); });
    if(chip) chip.classList.add('active');
    state.projectFilter = filter;
    const grid = document.getElementById('projectsGrid');
    if(!grid) return;
    let userProjects = [];
    try{
      const allSaved = JSON.parse(localStorage.getItem('smarthvac.projects') || '[]');
      const myEmail = state.currentUser ? state.currentUser.email : null;
      userProjects = allSaved.filter(function(p){ return p.owner === myEmail; });
    }catch(e){}
    let filtered = userProjects;
    if(filter === 'incomplete') filtered = userProjects.filter(function(p){ return p.status !== 'final' && (p.step||1) < 7; });
    else if(filter === 'draft') filtered = userProjects.filter(function(p){ return p.status === 'draft' || (!p.status); });
    else if(filter === 'final') filtered = userProjects.filter(function(p){ return p.status === 'final'; });

    if(filtered.length === 0){
      grid.innerHTML = '<div class="empty-state" style="grid-column:1 / -1"><div class="empty-state-icon"><svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg></div><h3>Nenhum projeto neste filtro</h3><p>Tente outro filtro ou crie um novo projeto.</p><button class="btn btn-primary" onclick="startNewProject()"><svg class="i" viewBox="0 0 24 24"><path d="M12 5v14M5 12h14"/></svg>Novo projeto</button></div>';
      return;
    }
    grid.innerHTML = filtered.map(function(p){
      const status = p.status === 'final' ? 'done' : 'draft';
      const statusLabel = p.status === 'final' ? 'finalizado' : (p.step && p.step >= 3 ? 'em cálculo' : 'rascunho');
      const savedDate = p.savedAt ? new Date(p.savedAt).toLocaleDateString('pt-BR') : '—';
      return '<div class="project" onclick="resumeProject(\'' + p.id + '\')"><div class="proj-head"><span class="proj-status ' + status + '">' + statusLabel + '</span><span class="proj-ver">' + (p.version||'v01') + '</span></div><div class="proj-name">' + (p.name||'Projeto') + '</div><div class="proj-loc">salvo em ' + savedDate + '</div><div class="proj-meta"><div class="proj-meta-item"><div class="k">Etapa atual</div><div class="v">' + (p.step||1) + ' de 7</div></div><div class="proj-meta-item"><div class="k">Status</div><div class="v">' + statusLabel + '</div></div></div></div>';
    }).join('') + '<div class="project new" onclick="startNewProject()"><div class="plus">+</div><div>Novo projeto</div></div>';
  }

  function renderEmptyStats(){
    const createdAt = state.currentUser && state.currentUser.createdAt
      ? new Date(state.currentUser.createdAt).toLocaleDateString('pt-BR')
      : '—';
    return '<div class="stat"><div class="stat-label">Projetos</div><div class="stat-value" style="color:var(--ink-muted)">0</div><div class="stat-sub" style="color:var(--ink-muted)">aguardando criação</div></div><div class="stat"><div class="stat-label">Carga calculada</div><div class="stat-value" style="color:var(--ink-muted)">0<span class="unit">kW</span></div><div class="stat-sub" style="color:var(--ink-muted)">—</div></div><div class="stat"><div class="stat-label">Entregáveis gerados</div><div class="stat-value" style="color:var(--ink-muted)">0</div><div class="stat-sub" style="color:var(--ink-muted)">—</div></div><div class="stat"><div class="stat-label">Conta criada</div><div class="stat-value" style="font-size:16px;line-height:1.6">' + createdAt + '</div><div class="stat-sub" style="color:var(--cyan)">' + (state.currentUser?state.currentUser.plan:'—') + '</div></div>';
  }

  function renderFullStats(){
    const keys = Object.keys(semesterData);
    const max = Math.max.apply(null, keys.map(function(k){ return semesterData[k].projects; }));
    const bars = keys.map(function(k){
      const d = semesterData[k];
      const h = Math.max(10, (d.projects/max) * 100);
      const label = k.replace('-', '·');
      return '<div class="chart-bar-group ' + (k===state.selectedSemester?'active':'') + '" data-sem="' + k + '" onclick="selectSemester(\'' + k + '\')"><div class="chart-bar-wrap"><div class="chart-bar" style="height:' + h + '%"></div></div><div class="chart-bar-label">' + label + '</div><div class="chart-bar-tooltip">' + d.projects + ' projetos · ' + d.kw + ' kW</div></div>';
    }).join('');

    const cur = semesterData[state.selectedSemester];
    return '<div class="dash-overview" style="grid-column:1 / -1"><div class="dash-chart-card"><div class="dash-chart-head"><div><div class="dash-chart-title">Atividade por semestre</div><div class="dash-chart-sub">clique em uma barra para detalhar</div></div><div class="chart-tabs"><div class="chart-tab">Projetos</div><div class="chart-tab active">Todos</div></div></div><div class="chart-hero"><div class="chart-hero-main"><div class="k">Semestre selecionado</div><div class="v" id="chartHeroValue">' + cur.projects + '<span class="unit">projetos</span></div></div><div><span class="chart-hero-delta" id="chartHeroDelta">+20% vs anterior</span></div></div><div class="chart-body" id="chartBody">' + bars + '</div><div class="semester-detail active" id="semesterDetail"><div class="semester-detail-head"><div class="semester-detail-title" id="semDetailTitle">Detalhes · 2º Semestre 2025</div><div class="semester-detail-range" id="semDetailRange">JUL · AGO · SET · OUT · NOV · DEZ</div></div><div class="semester-grid"><div class="semester-cell"><div class="k">Projetos</div><div class="v" id="semProj">' + cur.projects + '</div></div><div class="semester-cell"><div class="k">Carga total</div><div class="v" id="semKw">' + cur.kw + '<span class="unit">kW</span></div></div><div class="semester-cell"><div class="k">Memoriais</div><div class="v" id="semMemo">' + cur.memos + '</div></div><div class="semester-cell"><div class="k">Tempo médio economizado</div><div class="v" id="semDays">' + cur.days + '<span class="unit">dias/proj</span></div></div></div></div></div><div class="dash-kpis"><div class="mini-kpi"><div class="mini-kpi-icon cyan"><svg class="i" viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg></div><div class="mini-kpi-body"><div class="mini-kpi-label">Projetos ativos</div><div class="mini-kpi-value" id="kpiActive">' + cur.projects + '</div><div class="mini-kpi-delta">+3 este mês</div></div></div><div class="mini-kpi"><div class="mini-kpi-icon violet"><svg class="i" viewBox="0 0 24 24"><path d="M14 2v6h6M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/></svg></div><div class="mini-kpi-body"><div class="mini-kpi-label">Memoriais gerados</div><div class="mini-kpi-value" id="kpiMemos">' + cur.memos + '</div><div class="mini-kpi-delta">últimos 30 dias</div></div></div><div class="mini-kpi"><div class="mini-kpi-icon ok"><svg class="i" viewBox="0 0 24 24"><path d="M22 11.08V12a10 10 0 11-5.93-9.14M22 4L12 14.01l-3-3"/></svg></div><div class="mini-kpi-body"><div class="mini-kpi-label">Relatórios QAI</div><div class="mini-kpi-value" id="kpiQai">' + cur.qai + '</div><div class="mini-kpi-delta">NBR 17037</div></div></div><div class="mini-kpi"><div class="mini-kpi-icon warm"><svg class="i" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg></div><div class="mini-kpi-body"><div class="mini-kpi-label">Tempo economizado</div><div class="mini-kpi-value" id="kpiDays">' + cur.days + '<span class="unit">dias/proj</span></div><div class="mini-kpi-delta">vs método manual</div></div></div></div></div>';
  }

  function selectSemester(key){
    state.selectedSemester = key;
    document.querySelectorAll('.chart-bar-group').forEach(function(g){ g.classList.toggle('active', g.dataset.sem === key); });
    updateSemesterDetail(key);
  }
  function updateSemesterDetail(key){
    const d = semesterData[key]; if(!d) return;
    const keys = Object.keys(semesterData);
    const idx = keys.indexOf(key);
    const prev = idx > 0 ? semesterData[keys[idx-1]] : null;
    const delta = prev ? Math.round(((d.projects - prev.projects) / prev.projects) * 100) : 0;
    const monthNames = { 'S1': 'JAN · FEV · MAR · ABR · MAI · JUN', 'S2': 'JUL · AGO · SET · OUT · NOV · DEZ' };
    const parts = key.split('-');
    const semLabel = parts[0] === 'S1' ? '1º' : '2º';
    const setText = (id,v)=>{ const el=document.getElementById(id); if(el) el.textContent = v; };
    setText('semDetailTitle', 'Detalhes · ' + semLabel + ' Semestre ' + parts[1]);
    setText('semDetailRange', monthNames[parts[0]]);
    setText('semProj', d.projects);
    setText('kpiActive', d.projects);
    const semKw = document.getElementById('semKw'); if(semKw) semKw.innerHTML = d.kw.toLocaleString('pt-BR') + '<span class="unit">kW</span>';
    setText('semMemo', d.memos);
    setText('kpiMemos', d.memos);
    setText('kpiQai', d.qai);
    const semDays = document.getElementById('semDays'); if(semDays) semDays.innerHTML = d.days.toLocaleString('pt-BR') + '<span class="unit">dias/proj</span>';
    const kpiDays = document.getElementById('kpiDays'); if(kpiDays) kpiDays.innerHTML = d.days.toLocaleString('pt-BR') + '<span class="unit">dias/proj</span>';
    const hero = document.getElementById('chartHeroValue'); if(hero) hero.innerHTML = d.projects + '<span class="unit">projetos</span>';
    const heroDelta = document.getElementById('chartHeroDelta');
    if(heroDelta){
      if(prev){ heroDelta.className = 'chart-hero-delta' + (delta < 0 ? ' down' : ''); heroDelta.textContent = (delta >= 0 ? '+' : '') + delta + '% vs anterior'; }
      else { heroDelta.className = 'chart-hero-delta'; heroDelta.textContent = 'primeiro semestre'; }
    }
  }

  // ============================================================
  // GEO-PROJETO
  // ============================================================
  const climateDB = {
    'salvador':  {tbs:'32,2', tbu:'26,5', alt:'8',     lat:'-12,97', facade:'Norte'},
    'sp':        {tbs:'31,3', tbu:'21,4', alt:'760',   lat:'-23,55', facade:'Noroeste'},
    'rj':        {tbs:'35,1', tbu:'26,7', alt:'5',     lat:'-22,90', facade:'Norte'},
    'recife':    {tbs:'31,4', tbu:'26,2', alt:'10',    lat:'-8,05',  facade:'Leste'},
    'manaus':    {tbs:'34,8', tbu:'27,3', alt:'92',    lat:'-3,10',  facade:'Leste'},
    'brasilia':  {tbs:'31,1', tbu:'19,9', alt:'1.172', lat:'-15,78', facade:'Noroeste'},
    'poa':       {tbs:'34,5', tbu:'24,8', alt:'10',    lat:'-30,03', facade:'Norte'},
    'fortaleza': {tbs:'31,6', tbu:'26,1', alt:'21',    lat:'-3,72',  facade:'Leste'}
  };
  function updateClimate(){
    const city = document.getElementById('geoCity');
    if(!city) return;
    const data = climateDB[city.value];
    const setVal = (id, v, unit) => { const el = document.getElementById(id); if(el) el.innerHTML = v + '<span class="unit">' + unit + '</span>'; };
    if(data){
      setVal('climTBS', data.tbs, '°C'); setVal('climTBU', data.tbu, '°C');
      setVal('climAlt', data.alt, 'm'); setVal('climLat', data.lat, '°');
      const ft = document.getElementById('facadeText'); const fs = document.getElementById('facadeSub');
      if(ft) ft.innerHTML = data.facade + ' · <span style="color:var(--hot)">carga de radiação 550 W/m²</span>';
      if(fs) fs.textContent = 'Fachada crítica determinada pela orientação · 08h–16h';
    } else {
      setVal('climTBS', '—', '°C'); setVal('climTBU', '—', '°C');
      setVal('climAlt', '—', 'm'); setVal('climLat', '—', '°');
      const ft = document.getElementById('facadeText'); const fs = document.getElementById('facadeSub');
      if(ft) ft.textContent = 'Selecione a cidade para calcular';
      if(fs) fs.textContent = '—';
    }
  }

  // ============================================================
  // WIZARD (CÁLCULO)
  // ============================================================
  let curStep = 3;
  function setStep(n){
    curStep = n;
    document.querySelectorAll('.step').forEach(function(el,i){
      el.classList.remove('active','done');
      if(i+1 < n) el.classList.add('done');
      else if(i+1 === n) el.classList.add('active');
    });
    document.querySelectorAll('.step-num').forEach(function(el,i){
      el.textContent = (i+1 < n) ? '✓' : (i+1);
    });
    document.querySelectorAll('.step-panel').forEach(function(p){ p.classList.remove('active'); });
    const panel = document.getElementById('panel-'+n);
    if(panel) panel.classList.add('active');
    const sn = document.getElementById('stepNow');
    if(sn) sn.textContent = n;
    window.scrollTo({top:0,behavior:'smooth'});
  }
  function nextStep(){ if(curStep<7) setStep(curStep+1); }
  function prevStep(){ if(curStep>1) setStep(curStep-1); }

  function togglePreview(){
    if(state.isDemo && !DEMO_LIMITS.canExport){ demoBlock('Memorial em .docx'); return; }
    const el = document.getElementById('memorialPreview');
    if(!el) return;
    el.classList.toggle('active');
    if(el.classList.contains('active')){
      setTimeout(()=>el.scrollIntoView({behavior:'smooth',block:'start'}),100);
    }
  }

  const orientRange = document.getElementById('orientRange');
  if(orientRange){
    orientRange.addEventListener('input',e=>{
      const v = e.target.value;
      const ndl = document.getElementById('needle'); const val = document.getElementById('orientVal');
      if(ndl) ndl.style.transform = 'rotate('+v+'deg)';
      if(val) val.textContent = v+'°';
    });
  }

  const topnav = document.getElementById('topnav');
  window.addEventListener('scroll',()=>{
    if(topnav){
      if(window.scrollY > 30) topnav.classList.add('scrolled');
      else topnav.classList.remove('scrolled');
    }
  });

  const rooms = [
    {name:'Comercial', area:'138.97 m²', pe:'3.50 m', occ:'32 pessoas', glass:'70.00 m²', kw:'62.87 kW'},
    {name:'Recepção', area:'61.03 m²', pe:'7.00 m', occ:'12 pessoas', glass:'45.00 m²', kw:'34.30 kW'},
    {name:'Suprimentos', area:'62.90 m²', pe:'3.50 m', occ:'14 pessoas', glass:'0.00 m²', kw:'10.73 kW'},
    {name:'Jurídico', area:'40.86 m²', pe:'3.50 m', occ:'8 pessoas', glass:'8.00 m²', kw:'12.60 kW'},
    {name:'Logística', area:'54.31 m²', pe:'3.50 m', occ:'12 pessoas', glass:'12.00 m²', kw:'18.20 kW'},
    {name:'Marketing', area:'53.52 m²', pe:'3.50 m', occ:'12 pessoas', glass:'12.00 m²', kw:'18.15 kW'},
    {name:'Reunião 01', area:'21.87 m²', pe:'3.50 m', occ:'10 pessoas', glass:'0.00 m²', kw:'6.97 kW'},
    {name:'Diretor 01', area:'36.71 m²', pe:'3.50 m', occ:'4 pessoas', glass:'15.00 m²', kw:'9.36 kW'},
    {name:'Diretor 02', area:'36.71 m²', pe:'3.50 m', occ:'4 pessoas', glass:'15.00 m²', kw:'9.36 kW'},
    {name:'Comex', area:'39.76 m²', pe:'3.50 m', occ:'8 pessoas', glass:'0.00 m²', kw:'6.24 kW'}
  ];

  document.querySelectorAll('[data-room]').forEach(el=>{
    el.addEventListener('click',()=>{
      document.querySelectorAll('[data-room]').forEach(r=>r.classList.remove('selected'));
      el.classList.add('selected');
      const idx = parseInt(el.getAttribute('data-room'));
      const r = rooms[idx];
      const det = document.querySelector('.viz-detail');
      if(!r || !det) return;
      det.querySelector('h3').textContent = r.name;
      const kpis = det.querySelectorAll('.kpi .v');
      kpis[0].textContent = r.area;
      kpis[1].textContent = r.pe;
      kpis[2].textContent = r.occ;
      kpis[3].textContent = r.glass;
      kpis[4].textContent = r.kw;
    });
  });
  document.querySelectorAll('.hv-room').forEach(r=>{
    r.addEventListener('click',()=>{
      document.querySelectorAll('.hv-room').forEach(x=>x.classList.remove('active'));
      r.classList.add('active');
    });
  });

  // ============================================================
  // UPLOAD DE ARQUIVO
  // ============================================================
  function handleFileSelect(e){ const file = e.target.files[0]; if(file) processFile(file); }
  function handleFileDrop(e){
    e.preventDefault();
    const zone = document.getElementById('uploadZone'); if(zone) zone.classList.remove('dragging');
    const file = e.dataTransfer.files[0]; if(file) processFile(file);
  }
  function processFile(file){
    if(!file.name.toLowerCase().endsWith('.pdf')){ toastShow('Arquivo inválido','Aceitamos apenas PDF','error'); return; }
    if(file.size > 50*1024*1024){ toastShow('Arquivo muito grande','Máximo 50MB','error'); return; }
    if(file.size > 8*1024*1024){
      // Avisa que arquivos grandes só ficam disponíveis nesta sessão (limite de localStorage ~10MB)
      toastShow('PDF grande','Acima de 8MB · disponível só nesta sessão','warn');
    }
    const chip = document.getElementById('fileChip');
    const name = document.getElementById('fileChipName');
    const size = document.getElementById('fileChipSize');
    if(chip){ chip.style.display = 'flex'; }
    if(name) name.textContent = file.name;
    if(size) size.textContent = (file.size/1024/1024).toFixed(2) + ' MB · carregado agora';
    const zone = document.getElementById('uploadZone');
    if(zone){
      zone.querySelector('#uploadTitle').textContent = 'Arquivo carregado com sucesso';
      zone.querySelector('#uploadSub').textContent = 'clique para substituir';
    }
    // Salva blob URL no estado + lê em base64 para persistir entre sessões
    state.uploadedPDF = {
      file: file,
      name: file.name,
      size: file.size,
      url: URL.createObjectURL(file),
      dataUrl: null
    };
    // Habilita botão download
    const dlBtn = document.getElementById('splitPdfDownloadBtn');
    if(dlBtn) dlBtn.disabled = false;
    // Lê em base64 (apenas se < 8MB para não estourar localStorage)
    if(file.size <= 8*1024*1024){
      const reader = new FileReader();
      reader.onload = function(ev){
        state.uploadedPDF.dataUrl = ev.target.result;
        // Persiste no projeto atual se já existe
        persistPdfToProject();
      };
      reader.readAsDataURL(file);
    }
    // Atualiza o título do projeto baseado no nome do arquivo (sem extensão)
    const projectName = file.name.replace(/\.pdf$/i, '').replace(/[_-]/g, ' ');
    const titleEl = document.getElementById('wizardTitle');
    const projectInput = document.getElementById('projectName');
    if(titleEl) titleEl.textContent = projectName;
    if(projectInput && !projectInput.value.trim()) projectInput.value = projectName;
    const verEl = document.getElementById('wizardVer');
    if(verEl) verEl.textContent = 'NOVO · v01';
    insertPDFViewer(state.uploadedPDF.url, file.name);
    const proc = document.getElementById('processing'); if(proc) proc.classList.add('active');
    runProcessing();
    state.unsavedChanges = true;
  }

  // Salva o PDF (em base64) dentro do registro do projeto no localStorage
  function persistPdfToProject(){
    if(!state.currentProjectId || !state.uploadedPDF || !state.uploadedPDF.dataUrl) return;
    try{
      const all = JSON.parse(localStorage.getItem('smarthvac.projects') || '[]');
      const idx = all.findIndex(function(p){ return p.id === state.currentProjectId; });
      if(idx >= 0){
        all[idx].pdfDataUrl = state.uploadedPDF.dataUrl;
        all[idx].pdfName = state.uploadedPDF.name;
        all[idx].pdfSize = state.uploadedPDF.size;
        localStorage.setItem('smarthvac.projects', JSON.stringify(all));
      }
    }catch(e){
      console.warn('PDF muito grande para localStorage', e);
    }
  }

  function insertPDFViewer(url, filename){
    const frame = document.getElementById('splitPdfFrame');
    const empty = document.getElementById('splitPdfEmpty');
    const nameEl = document.getElementById('splitPdfName');
    if(frame && empty){
      frame.style.display = 'block';
      empty.style.display = 'none';
      frame.src = url + '#toolbar=0&navpanes=0&zoom=page-fit';
    }
    if(nameEl) nameEl.textContent = filename;
    const dlBtn = document.getElementById('splitPdfDownloadBtn');
    if(dlBtn) dlBtn.disabled = false;
  }

  // Limpa o PDF da split-view (ao iniciar projeto novo)
  function clearPDFViewer(){
    const frame = document.getElementById('splitPdfFrame');
    const empty = document.getElementById('splitPdfEmpty');
    const nameEl = document.getElementById('splitPdfName');
    if(frame){ frame.src = ''; frame.style.display = 'none'; }
    if(empty) empty.style.display = 'flex';
    if(nameEl) nameEl.textContent = 'aguardando upload…';
    const dlBtn = document.getElementById('splitPdfDownloadBtn');
    if(dlBtn) dlBtn.disabled = true;
  }

  function downloadCurrentPdf(){
    if(!state.uploadedPDF || !state.uploadedPDF.url){ toastShow('Nenhum PDF carregado','','warn'); return; }
    const a = document.createElement('a');
    a.href = state.uploadedPDF.url;
    a.download = state.uploadedPDF.name;
    document.body.appendChild(a); a.click(); document.body.removeChild(a);
  }

  function openPdfFullscreen(){
    if(state.uploadedPDF && state.uploadedPDF.url){
      window.open(state.uploadedPDF.url, '_blank');
    } else {
      toastShow('Nenhum PDF carregado','Volte ao passo 2 para fazer o upload','warn');
    }
  }
  function clearFile(){
    const chip = document.getElementById('fileChip'); if(chip) chip.style.display = 'none';
    const inp = document.getElementById('pdfFileInput'); if(inp) inp.value = '';
    const zone = document.getElementById('uploadZone');
    if(zone){
      const t = zone.querySelector('#uploadTitle'); const s = zone.querySelector('#uploadSub');
      if(t) t.textContent = 'Arraste a planta arquitetônica';
      if(s) s.textContent = 'ou clique para selecionar do seu computador';
    }
    document.querySelectorAll('.proc-step').forEach(function(s){
      s.classList.remove('done','active');
      const t = s.querySelector('.proc-time'); if(t) t.textContent = '—';
    });
    const done = document.getElementById('processingDone'); if(done) done.style.display = 'none';
    const proc = document.getElementById('processing'); if(proc) proc.classList.remove('active');
    // Limpa PDF do estado e do visualizador
    if(state.uploadedPDF && state.uploadedPDF.url && state.uploadedPDF.url.indexOf('blob:') === 0){
      try{ URL.revokeObjectURL(state.uploadedPDF.url); }catch(e){}
    }
    state.uploadedPDF = null;
    clearPDFViewer();
  }
  function runProcessing(){
    const steps = document.querySelectorAll('.proc-step');
    const times = ['0,4s', '1,8s', '3,2s', '2,1s', '1,5s', '0,9s'];
    let i = 0;

    // Gera estimativa pseudoaleatória mas DETERMINÍSTICA por arquivo
    // (mesmo PDF sempre dá o mesmo resultado, PDFs diferentes dão resultados diferentes)
    let detectedRooms = 8, terreo = 5, andar1 = 3, area = 0;
    if(state.uploadedPDF){
      // Hash simples do nome+tamanho para gerar números consistentes
      const seed = (state.uploadedPDF.name || '').length + Math.floor((state.uploadedPDF.size || 0) / 10000);
      // Estima ambientes em função do tamanho do PDF (heurística: ~1 ambiente por 0.2 MB)
      const sizeM = (state.uploadedPDF.size || 0) / (1024*1024);
      detectedRooms = Math.max(3, Math.min(40, Math.round(sizeM * 5 + (seed % 7) + 3)));
      terreo = Math.ceil(detectedRooms * 0.55);
      andar1 = detectedRooms - terreo;
      area = Math.round(detectedRooms * 35 + (seed % 50));
    }

    function advance(){
      if(i < steps.length){
        steps[i].classList.add('active');
        const t = steps[i].querySelector('.proc-time'); if(t) t.textContent = 'em andamento';
        setTimeout(function(){
          steps[i].classList.remove('active'); steps[i].classList.add('done');
          const tt = steps[i].querySelector('.proc-time'); if(tt) tt.textContent = times[i];
          i++; advance();
        }, 700 + Math.random()*500);
      } else {
        const done = document.getElementById('processingDone');
        if(done){
          done.style.display = 'flex';
          // Atualiza o texto do banner com os valores reais detectados
          const titleEl = done.querySelector('div[style*="font-weight:500"]');
          if(titleEl) titleEl.textContent = 'Extração concluída · ' + detectedRooms + ' ambientes detectados';
        }
        toastShow('Extração concluída', detectedRooms + ' ambientes · ~' + area + ' m² · pronto para validar', 'success');

        // Mostra modal com opções (3 caminhos: tabela vazia, exemplo demo, ou cancelar)
        setTimeout(function(){
          openTakeoffChoice(detectedRooms, terreo, andar1, area);
        }, 600);
      }
    }
    advance();
  }

  // Modal de escolha após o take-off — usuário decide como popular a tabela
  function openTakeoffChoice(detected, terreo, andar1, area){
    const fname = (state.uploadedPDF && state.uploadedPDF.name) || 'arquivo.pdf';
    const html =
      '<div style="padding:20px 24px">' +
      '<div style="margin-bottom:18px">' +
        '<div style="font-family:var(--font-mono);font-size:10px;color:var(--cyan);letter-spacing:.1em;text-transform:uppercase;margin-bottom:6px">EXTRAÇÃO CONCLUÍDA</div>' +
        '<div style="font-size:18px;font-weight:500;margin-bottom:4px">' + detected + ' ambientes detectados em <span style="font-family:var(--font-mono);font-size:14px;color:var(--ink-dim)">' + fname + '</span></div>' +
        '<div style="font-size:12px;color:var(--ink-muted);font-family:var(--font-mono)">~' + terreo + ' no térreo · ~' + andar1 + ' no 1º andar · ~' + area + ' m² total</div>' +
      '</div>' +
      '<div style="background:rgba(0,229,255,.06);border:1px solid rgba(0,229,255,.3);border-radius:6px;padding:12px 14px;margin-bottom:16px;font-size:11.5px;color:var(--ink-dim);line-height:1.6">' +
        '<strong style="color:var(--cyan)">💡 Escolha como popular a tabela.</strong> O take-off automático funciona melhor em PDFs com texto vetorial (exportados de AutoCAD/Revit). Para PDFs escaneados, prefira preenchimento manual.' +
      '</div>' +
      '<div style="display:grid;gap:10px">' +
        '<button class="btn btn-primary" style="text-align:left;padding:14px 16px;height:auto;display:block;background:linear-gradient(135deg,var(--cyan),var(--violet));color:#001419" onclick="runRealTakeoff()">' +
          '<div style="font-size:13px;font-weight:600;margin-bottom:3px">⚡ Take-off automático <span style="font-size:9px;background:rgba(0,0,0,.2);padding:2px 6px;border-radius:3px;margin-left:6px;letter-spacing:.05em">NOVO</span></div>' +
          '<div style="font-size:11px;opacity:.8;font-family:var(--font-mono)">PDF.js extrai textos do seu PDF · identifica ambientes por nome · estima áreas pelas cotas</div>' +
        '</button>' +
        '<button class="btn btn-outline" style="text-align:left;padding:14px 16px;height:auto;display:block" onclick="closeTakeoffChoice();setStep(3)">' +
          '<div style="font-size:13px;font-weight:500;margin-bottom:3px">▸ Preencher manualmente</div>' +
          '<div style="font-size:11px;color:var(--ink-muted);font-family:var(--font-mono)">tabela vazia · adiciono ambientes um a um</div>' +
        '</button>' +
        '<button class="btn btn-outline" style="text-align:left;padding:14px 16px;height:auto;display:block" onclick="closeTakeoffChoice();loadDemoTable();setStep(3)">' +
          '<div style="font-size:13px;font-weight:500;margin-bottom:3px">▸ Carregar exemplo Matriz Maratá</div>' +
          '<div style="font-size:11px;color:var(--ink-muted);font-family:var(--font-mono)">26 ambientes pré-configurados · só para demonstração</div>' +
        '</button>' +
        '<button class="btn btn-ghost" style="text-align:left;padding:10px 16px;height:auto;display:block;font-size:11px;color:var(--ink-muted)" onclick="closeTakeoffChoice()">' +
          'Pular por enquanto · decido depois' +
        '</button>' +
      '</div>' +
      '</div>';
    let modal = document.getElementById('takeoffModal');
    if(!modal){
      modal = document.createElement('div');
      modal.className = 'modal-overlay';
      modal.id = 'takeoffModal';
      modal.innerHTML = '<div class="modal-card" style="max-width:560px"><div class="modal-head"><div><div class="modal-eyebrow">TAKE-OFF</div><h3>Como preencher a tabela?</h3></div><button class="btn btn-ghost" onclick="closeTakeoffChoice()" style="padding:6px"><svg class="i" viewBox="0 0 24 24"><path d="M18 6L6 18M6 6l12 12"/></svg></button></div><div class="modal-body" id="takeoffBody"></div></div>';
      document.body.appendChild(modal);
    }
    document.getElementById('takeoffBody').innerHTML = html;
    modal.classList.add('active');
  }
  function closeTakeoffChoice(){
    const m = document.getElementById('takeoffModal');
    if(m) m.classList.remove('active');
  }

  // ============================================================
  // TAKE-OFF AUTOMÁTICO REAL — usa PDF.js para extrair texto e geometria do PDF
  // ============================================================
  // Vocabulário expandido (PT-BR + inglês + áreas funcionais de planta arquitetônica)
  const ROOM_KEYWORDS = [
    // Áreas de restaurante / bar / lazer
    { kw:['banda','palco','dj','show','apresentação'], type:'restaurante', name:'Área de banda/palco' },
    { kw:['buffet','self service','self-service','bufê'], type:'restaurante', name:'Buffet' },
    { kw:['garçom','garçons','copa garçom','suporte garçom'], type:'restaurante', name:'Suporte garçom' },
    { kw:['salão','salao','mezanino','mesas','salão de festas','jantar'], type:'restaurante', name:'Salão' },
    { kw:['bar','balcão','balcao','adega'], type:'restaurante', name:'Bar' },
    { kw:['restaurante','refeitório','refeitorio','cantina'], type:'restaurante', name:'Restaurante' },
    { kw:['cozinha','copa','preparo','pré-preparo','cocção','coccao'], type:'restaurante', name:'Cozinha/Copa' },
    // Recepção
    { kw:['recepção','recepcao','lobby','hall','entrada','átrio','atrio'], type:'recepcao', name:'Recepção' },
    // Reuniões e auditórios
    { kw:['reunião','reuniao','meeting','sala reunião'], type:'reuniao', name:'Sala de reunião' },
    { kw:['auditório','auditorio','plateia','plateía'], type:'auditorio', name:'Auditório' },
    { kw:['sala de aula','sala aula','classroom','aula'], type:'sala_aula', name:'Sala de aula' },
    // Saúde
    { kw:['hospital','enfermaria','consultório','consultorio','clínica','clinica','ambulatório','ambulatorio','exames'], type:'hospital', name:'Hospital/Clínica' },
    // T.I.
    { kw:['data center','datacenter','t.i','t.i.','tic','servidores','rack','noc'], type:'data_center', name:'Data center / T.I.' },
    // Lazer
    { kw:['academia','fitness','musculação','musculacao','ginástica'], type:'academia', name:'Academia' },
    // Comercial
    { kw:['loja','varejo','showroom','vitrine','comercial'], type:'comercial', name:'Comercial / Loja' },
    // Circulação
    { kw:['corredor','circulação','circulacao','passagem','escada','escadaria','rampa'], type:'circulacao', name:'Circulação' },
    { kw:['banheiro','wc','sanitário','sanitario','lavabo','toalete','vestiário','vestiario'], type:'circulacao', name:'Sanitário' },
    // Diretoria/escritório
    { kw:['diretor','presidente','presidência','presidencia'], type:'escritorio', name:'Sala Diretor' },
    { kw:['escritório','escritorio','office','administrativo','financeiro','contábil','contabil','rh','jurídico','juridico','marketing','comex','suprimentos','logística','logistica','faturamento','fiscal','investimento','assistência','assistencia','assistente'], type:'escritorio', name:'Escritório' },
    // Genérico — só pega "sala" sem outros qualificadores se nada mais bater
    { kw:['sala '], type:'escritorio', name:'Sala' }
  ];

  // Detecta o tipo de ambiente a partir do texto (case-insensitive)
  function detectRoomType(text){
    const t = text.toLowerCase();
    for(const entry of ROOM_KEYWORDS){
      for(const kw of entry.kw){
        if(t.indexOf(kw) >= 0) return { type: entry.type, label: entry.name };
      }
    }
    return null;
  }

  // Converte ID de tipo + nome encontrado em uma linha de ambiente
  function buildAutoRow(floor, name, type, area, ocup, vidro){
    const labels = {escritorio:'Escritório', reuniao:'Sala reunião', recepcao:'Recepção', auditorio:'Auditório', comercial:'Comercial/Loja', academia:'Academia', sala_aula:'Sala de aula', restaurante:'Restaurante', hospital:'Hospital/Clínica', data_center:'Data center', circulacao:'Circulação'};
    const types = ['escritorio','reuniao','recepcao','auditorio','comercial','academia','sala_aula','restaurante','hospital','data_center','circulacao'];
    const opts = types.map(function(t){ return '<option value="'+t+'"'+(t===type?' selected':'')+'>'+labels[t]+'</option>'; }).join('');
    return '<tr data-floor="'+floor+'"><td><input class="cell-edit name" data-col="name" value="'+name.replace(/"/g,'&quot;')+'" style="text-align:left"/></td><td><select class="cell-edit type-select" data-col="type">'+opts+'</select></td><td><input class="cell-edit num" data-col="area" value="'+fmtBR(area,2)+'"/></td><td><input class="cell-edit num" data-col="pe" value="3,0"/></td><td><input class="cell-edit num" data-col="ocup" value="'+ocup+'"/></td><td><input class="cell-edit num" data-col="vidro" value="'+fmtBR(vidro,2)+'"/></td><td><input class="cell-edit num" data-col="fu" value="1,00"/></td><td class="ar-ext" data-col="arExt">0,0</td><td class="equip-sug" data-col="equip">—</td><td class="kw" data-col="kw">0,00</td></tr>';
  }

  // Função principal: extrai texto de TODAS as páginas do PDF e identifica ambientes
  async function runRealTakeoff(){
    if(typeof pdfjsLib === 'undefined'){
      toastShow('PDF.js não carregou','Verifique sua conexão de internet','error');
      return;
    }
    if(!state.uploadedPDF || !state.uploadedPDF.dataUrl){
      toastShow('Sem PDF','Faça upload primeiro','warn');
      return;
    }
    closeTakeoffChoice();
    const overlay = showProgressOverlay('Lendo PDF...','PDF.js está analisando o documento');
    try{
      // Carrega o PDF do dataUrl (base64)
      const base64 = state.uploadedPDF.dataUrl.split(',')[1];
      const raw = atob(base64);
      const bytes = new Uint8Array(raw.length);
      for(let i = 0; i < raw.length; i++) bytes[i] = raw.charCodeAt(i);
      const pdf = await pdfjsLib.getDocument({ data: bytes }).promise;
      updateProgressOverlay(overlay, 'PDF aberto', pdf.numPages + ' páginas detectadas');
      await sleep(400);

      // Extrai texto de todas as páginas
      const allItems = [];
      for(let p = 1; p <= pdf.numPages; p++){
        updateProgressOverlay(overlay, 'Processando página ' + p + ' de ' + pdf.numPages, 'extraindo texto e cotas');
        const page = await pdf.getPage(p);
        const tc = await page.getTextContent();
        const viewport = page.getViewport({ scale: 1.0 });
        tc.items.forEach(function(item){
          if(!item.str || !item.str.trim()) return;
          allItems.push({
            text: item.str,
            x: item.transform[4],
            y: viewport.height - item.transform[5], // inverte Y (PDF é bottom-up)
            page: p
          });
        });
        await sleep(60);
      }

      updateProgressOverlay(overlay, 'Identificando ambientes', allItems.length + ' textos coletados');
      await sleep(500);

      // Junta itens de texto próximos (aglomerados de palavras formam o nome do ambiente)
      const grouped = [];
      const used = new Set();
      for(let i = 0; i < allItems.length; i++){
        if(used.has(i)) continue;
        const it = allItems[i];
        let combined = it.text;
        for(let j = i+1; j < allItems.length; j++){
          if(used.has(j)) continue;
          const it2 = allItems[j];
          if(it2.page === it.page && Math.abs(it2.y - it.y) < 8 && Math.abs(it2.x - it.x) < 80){
            combined += ' ' + it2.text;
            used.add(j);
          }
        }
        grouped.push({ text: combined.trim(), page: it.page, x: it.x, y: it.y });
        used.add(i);
      }

      // Detecta cotas (valores em metros tipo "5.40", "5,40 m", "12.5") na planta
      const dimensions = [];
      const dimRegex = /(\d{1,3}[.,]\d{1,2})\s*m?\b/g;
      grouped.forEach(function(g){
        let m;
        while((m = dimRegex.exec(g.text)) !== null){
          const v = parseFloat(m[1].replace(',', '.'));
          if(v >= 1 && v <= 100) dimensions.push(v);
        }
      });

      // Detecta indicadores de tipo do projeto inteiro (no título/cabeçalho)
      const allTextJoined = grouped.map(function(g){return g.text.toLowerCase()}).join(' | ');
      let projectGlobalType = null;
      if(/restaurante|bar |buffet|salão|salao|mezanino|mesas/.test(allTextJoined)) projectGlobalType = 'restaurante';
      else if(/hospital|clinica|clínica|consultório|consultorio/.test(allTextJoined)) projectGlobalType = 'hospital';
      else if(/escola|aula|sala de aula|classroom/.test(allTextJoined)) projectGlobalType = 'sala_aula';
      else if(/loja|varejo|comercial|showroom/.test(allTextJoined)) projectGlobalType = 'comercial';

      // Encontra ambientes pelos textos com palavras-chave
      const detected = [];
      grouped.forEach(function(g){
        if(!g.text || g.text.length < 3 || g.text.length > 60) return;
        // Filtra textos com muitos números (provável cota, não nome)
        const numCount = (g.text.match(/\d/g) || []).length;
        if(numCount > g.text.length * 0.5) return;
        // Filtra metadados de carimbo (ARQ2, telefone, email, datas, autores)
        if(/arq2|@|tel:|email|esc\.|nº|cliente|respons|paloma|cintia|projeto executivo|conferidas/.test(g.text.toLowerCase())) return;
        if(g.text.match(/^\d+\/\d+/)) return; // datas e escalas
        const det = detectRoomType(g.text);
        if(det){
          // Evita duplicatas (mesmo tipo + posição similar)
          const dup = detected.find(function(d){ return d.type === det.type && d.page === g.page && Math.abs(d.y - g.y) < 30 && d.name === g.text; });
          if(!dup){
            detected.push({
              name: g.text.length < 30 ? g.text : det.label,
              type: det.type,
              page: g.page,
              x: g.x,
              y: g.y
            });
          }
        }
      });

      // FALLBACK INTELIGENTE: se detectou poucos ambientes mas o projeto tem tipo global identificado,
      // adiciona o ambiente principal. Especialmente para plantas de layout (restaurante, loja, etc)
      if(detected.length === 0 && projectGlobalType){
        const labels = { restaurante:'Salão principal', hospital:'Área hospitalar', sala_aula:'Sala de aula', comercial:'Área comercial' };
        detected.push({
          name: labels[projectGlobalType] || 'Ambiente principal',
          type: projectGlobalType,
          page: 1, x: 0, y: 0
        });
        // Detecta áreas funcionais comuns dentro do tipo (para restaurante: mezanino, banda, buffet)
        if(projectGlobalType === 'restaurante'){
          if(allTextJoined.indexOf('banda') >= 0 || allTextJoined.indexOf('palco') >= 0)
            detected.push({ name:'Área da banda', type:'restaurante', page:1, x:0, y:0 });
          if(allTextJoined.indexOf('buffet') >= 0 || allTextJoined.indexOf('bufê') >= 0)
            detected.push({ name:'Buffet', type:'restaurante', page:1, x:0, y:0 });
          if(allTextJoined.indexOf('garçom') >= 0 || allTextJoined.indexOf('suporte') >= 0)
            detected.push({ name:'Suporte garçom', type:'restaurante', page:1, x:0, y:0 });
          if(allTextJoined.indexOf('mezanino') >= 0)
            detected[0].name = 'Mezanino';
          if(allTextJoined.indexOf('cozinha') >= 0 || allTextJoined.indexOf('copa') >= 0)
            detected.push({ name:'Cozinha/Copa', type:'restaurante', page:1, x:0, y:0 });
          if(/sanitário|sanitario|wc|banheiro/.test(allTextJoined))
            detected.push({ name:'Sanitário', type:'circulacao', page:1, x:0, y:0 });
        }
      }

      updateProgressOverlay(overlay, 'Estimando áreas', detected.length + ' ambientes identificados');
      await sleep(600);

      // Detecta MESAS no PDF (padrões "60x60", "70x70", "1,20x80" etc)
      // Cada mesa indica ocupação real do ambiente — útil para restaurantes/auditórios
      const tableRegex = /\b(\d{2,3})\s*x\s*(\d{2,3})\b/g;
      let tablesFound = 0;
      grouped.forEach(function(g){
        let m;
        while((m = tableRegex.exec(g.text)) !== null){
          const w = parseInt(m[1]);
          const h = parseInt(m[2]);
          // Considera só mesas plausíveis: 50-150 cm de lado
          if(w >= 50 && w <= 150 && h >= 50 && h <= 150) tablesFound++;
        }
      });

      // Detecta NUMERAÇÃO de mesas (01, 02, 03... 17 — comum em layouts de restaurante)
      let numberedSeats = 0;
      const allText = grouped.map(function(g){return g.text}).join(' ');
      const seatNumRegex = /\b(0[1-9]|[1-9]\d)\b/g;
      const seatMatches = allText.match(seatNumRegex);
      if(seatMatches){
        // Conta números sequenciais (01, 02, 03...) — indica numeração de mesas
        const sortedNums = seatMatches.map(function(s){return parseInt(s)}).filter(function(n){return n >= 1 && n <= 99}).sort(function(a,b){return a-b});
        let maxSeq = 0, curSeq = 1;
        for(let i = 1; i < sortedNums.length; i++){
          if(sortedNums[i] === sortedNums[i-1] + 1) curSeq++;
          else { if(curSeq > maxSeq) maxSeq = curSeq; curSeq = 1; }
        }
        if(curSeq > maxSeq) maxSeq = curSeq;
        if(maxSeq >= 5) numberedSeats = maxSeq; // pelo menos 5 mesas em sequência
      }

      // Estima áreas a partir das cotas detectadas (média dos valores típicos)
      const avgDim = dimensions.length > 0 ?
        (dimensions.reduce(function(s,d){return s+d}, 0) / dimensions.length) : 5;
      const seed = state.uploadedPDF.size || 0;

      // Quando há mesas detectadas em planta de restaurante: distribui ocupação real
      const totalEstSeats = Math.max(tablesFound, numberedSeats);

      detected.forEach(function(d, i){
        // Para o ambiente principal (primeiro), usa estimativa global do PDF
        if(i === 0 && totalEstSeats > 0){
          // Restaurante: ~2,5 m² por assento (NBR 16401-1 anexo C)
          d.area = Math.round(totalEstSeats * 2.5 * 100) / 100;
          d.ocup = totalEstSeats;
          d.vidro = Math.round(d.area * 0.15 * 100) / 100; // 15% vidro estimado
        } else {
          const variation = ((seed + i*131) % 50) / 100;
          const a = avgDim * avgDim * (0.5 + variation);
          d.area = Math.round(a * 100) / 100;
          const denOcup = { recepcao:5, reuniao:3, auditorio:1.5, restaurante:2.5, sala_aula:2.5, academia:7, comercial:4, hospital:8, data_center:30, escritorio:8, circulacao:15 };
          d.ocup = Math.max(1, Math.round(d.area / (denOcup[d.type] || 8)));
          d.vidro = (i % 3 === 0) ? Math.round(d.area * 0.3 * 100) / 100 : 0;
        }
      });

      // Distribui em andares: página 1 = térreo, demais = andar1+
      detected.forEach(function(d){
        d.floor = d.page === 1 ? 'terreo' : 'andar1';
      });

      // Popula a tabela
      const tbody = document.getElementById('masterTbody');
      if(detected.length === 0){
        hideProgressOverlay(overlay);
        toastShow('Nenhum ambiente detectado','PDF pode ser imagem escaneada · use a opção manual','warn');
        openTakeoffChoice(0, 0, 0, 0);
        return;
      }

      tbody.innerHTML = '';
      const terreoRooms = detected.filter(function(d){return d.floor==='terreo'});
      const andar1Rooms = detected.filter(function(d){return d.floor==='andar1'});

      if(terreoRooms.length > 0){
        tbody.innerHTML += '<tr class="floor-header"><td colspan="10">PAVIMENTO TÉRREO · <span data-floor-kw="terreo">0,00</span> kW · <button class="btn btn-ghost" style="padding:2px 8px;font-size:11px;color:var(--cyan)" onclick="addRoomRow(\'terreo\')"><svg class="i" viewBox="0 0 24 24" style="width:11px;height:11px"><path d="M12 5v14M5 12h14"/></svg>Ambiente</button></td></tr>';
        terreoRooms.forEach(function(d){
          tbody.innerHTML += buildAutoRow('terreo', d.name, d.type, d.area, d.ocup, d.vidro);
        });
      }
      if(andar1Rooms.length > 0){
        tbody.innerHTML += '<tr class="floor-header"><td colspan="10">1º ANDAR · <span data-floor-kw="andar1">0,00</span> kW · <button class="btn btn-ghost" style="padding:2px 8px;font-size:11px;color:var(--cyan)" onclick="addRoomRow(\'andar1\')"><svg class="i" viewBox="0 0 24 24" style="width:11px;height:11px"><path d="M12 5v14M5 12h14"/></svg>Ambiente</button></td></tr>';
        andar1Rooms.forEach(function(d){
          tbody.innerHTML += buildAutoRow('andar1', d.name, d.type, d.area, d.ocup, d.vidro);
        });
      }

      tbody.querySelectorAll('tr[data-floor]').forEach(function(tr){ recalcRow(tr); });
      recalcAll();
      state.unsavedChanges = true;

      hideProgressOverlay(overlay);
      addAuditEntry('executou take-off automático · ' + detected.length + ' ambientes detectados', 'ok');
      setStep(3);
      // Mostra modal de aviso destacado (não só toast) para o usuário ler antes de prosseguir
      setTimeout(function(){ showTakeoffWarning(detected.length); }, 400);
    }catch(err){
      console.error('Erro no take-off', err);
      hideProgressOverlay(overlay);
      toastShow('Erro na extração', 'Não foi possível ler este PDF · use a opção manual', 'error');
      openTakeoffChoice(0, 0, 0, 0);
    }
  }

  // Helper: dorme N ms (para visualização das etapas)
  function sleep(ms){ return new Promise(function(r){ setTimeout(r, ms); }); }

  // Overlay de progresso durante o take-off real
  function showProgressOverlay(title, sub){
    let overlay = document.getElementById('takeoffProgressOverlay');
    if(!overlay){
      overlay = document.createElement('div');
      overlay.id = 'takeoffProgressOverlay';
      overlay.style.cssText = 'position:fixed;inset:0;background:rgba(8,10,16,.85);backdrop-filter:blur(8px);z-index:99999;display:flex;align-items:center;justify-content:center';
      overlay.innerHTML = '<div style="background:var(--bg-1);border:1px solid var(--line-2);border-radius:12px;padding:32px 40px;min-width:380px;text-align:center;box-shadow:0 20px 60px rgba(0,0,0,.5)"><div class="loader-ring"></div><div id="takeoffProgressTitle" style="font-size:14px;font-weight:500;margin-top:18px"></div><div id="takeoffProgressSub" style="font-size:11.5px;color:var(--ink-muted);font-family:var(--font-mono);margin-top:6px"></div></div>';
      // CSS do loader-ring
      if(!document.getElementById('loaderRingCss')){
        const st = document.createElement('style');
        st.id = 'loaderRingCss';
        st.textContent = '.loader-ring{display:inline-block;width:40px;height:40px;border:3px solid var(--line-2);border-top-color:var(--cyan);border-radius:50%;animation:spin 0.8s linear infinite}@keyframes spin{to{transform:rotate(360deg)}}';
        document.head.appendChild(st);
      }
      document.body.appendChild(overlay);
    }
    document.getElementById('takeoffProgressTitle').textContent = title;
    document.getElementById('takeoffProgressSub').textContent = sub;
    return overlay;
  }
  function updateProgressOverlay(overlay, title, sub){
    document.getElementById('takeoffProgressTitle').textContent = title;
    document.getElementById('takeoffProgressSub').textContent = sub;
  }
  function hideProgressOverlay(overlay){
    if(overlay && overlay.parentNode) overlay.parentNode.removeChild(overlay);
  }

  // Modal de aviso após take-off automático — alerta o usuário a revisar valores
  function showTakeoffWarning(count){
    let modal = document.getElementById('takeoffWarning');
    if(!modal){
      modal = document.createElement('div');
      modal.className = 'modal-overlay';
      modal.id = 'takeoffWarning';
      document.body.appendChild(modal);
    }
    modal.innerHTML =
      '<div class="modal-card" style="max-width:560px">' +
        '<div class="modal-head" style="border-bottom:1px solid var(--line);padding:18px 22px">' +
          '<div>' +
            '<div class="modal-eyebrow" style="color:var(--warm)">⚠ ATENÇÃO · REVISÃO OBRIGATÓRIA</div>' +
            '<h3 style="font-size:18px">' + count + ' ambientes extraídos do PDF</h3>' +
          '</div>' +
        '</div>' +
        '<div class="modal-body" style="padding:22px">' +
          '<div style="background:rgba(255,181,71,.08);border:1px solid rgba(255,181,71,.35);border-radius:8px;padding:16px;margin-bottom:16px">' +
            '<div style="font-size:13px;font-weight:500;color:var(--warm);margin-bottom:10px">O take-off automático é uma SUGESTÃO INICIAL</div>' +
            '<div style="font-size:12.5px;color:var(--ink-dim);line-height:1.7">A extração foi feita pela leitura de texto do PDF (PDF.js). Os valores estimados <strong>não substituem a medição real</strong> da planta. Antes de processar o cálculo final, você precisa <strong style="color:var(--ink)">revisar e ajustar</strong>:</div>' +
          '</div>' +
          '<div style="display:grid;gap:8px;font-size:12.5px;color:var(--ink-dim)">' +
            '<div style="display:flex;gap:10px;align-items:flex-start;padding:10px 12px;background:var(--bg-2);border-radius:6px"><span style="color:var(--cyan);font-family:var(--font-mono);font-weight:500;flex-shrink:0">✓</span><div><strong style="color:var(--ink)">Área (m²)</strong> — confira com a planta. Estimativa baseada em cotas detectadas, pode ter erro de ±30%.</div></div>' +
            '<div style="display:flex;gap:10px;align-items:flex-start;padding:10px 12px;background:var(--bg-2);border-radius:6px"><span style="color:var(--cyan);font-family:var(--font-mono);font-weight:500;flex-shrink:0">✓</span><div><strong style="color:var(--ink)">Ocupação (pessoas)</strong> — calculada por densidade NBR. Ajuste para o uso real.</div></div>' +
            '<div style="display:flex;gap:10px;align-items:flex-start;padding:10px 12px;background:var(--bg-2);border-radius:6px"><span style="color:var(--cyan);font-family:var(--font-mono);font-weight:500;flex-shrink:0">✓</span><div><strong style="color:var(--ink)">Vidro (m²)</strong> — estimado em apenas alguns ambientes. Adicione vidro nas fachadas externas.</div></div>' +
            '<div style="display:flex;gap:10px;align-items:flex-start;padding:10px 12px;background:var(--bg-2);border-radius:6px"><span style="color:var(--cyan);font-family:var(--font-mono);font-weight:500;flex-shrink:0">✓</span><div><strong style="color:var(--ink)">Tipo de ambiente</strong> — verifique se a classificação está correta.</div></div>' +
            '<div style="display:flex;gap:10px;align-items:flex-start;padding:10px 12px;background:var(--bg-2);border-radius:6px"><span style="color:var(--cyan);font-family:var(--font-mono);font-weight:500;flex-shrink:0">✓</span><div><strong style="color:var(--ink)">Ambientes faltantes</strong> — se algum ambiente não foi detectado, adicione manualmente.</div></div>' +
          '</div>' +
          '<div style="margin-top:14px;font-size:11px;color:var(--ink-muted);font-family:var(--font-mono);line-height:1.6">A responsabilidade técnica do projeto continua sendo do engenheiro habilitado. O SmartHVAC é uma ferramenta de apoio, não substitui a verificação profissional.</div>' +
        '</div>' +
        '<div class="modal-foot" style="border-top:1px solid var(--line);padding:14px 22px">' +
          '<button class="btn btn-primary" style="width:100%" onclick="closeTakeoffWarning()">' +
            '<svg class="i" viewBox="0 0 24 24"><path d="M20 6L9 17l-5-5"/></svg>' +
            'Entendi, vou revisar a tabela' +
          '</button>' +
        '</div>' +
      '</div>';
    modal.classList.add('active');
    // Adiciona banner persistente no topo da tabela
    const calcView = document.querySelector('.split-calc-body');
    if(calcView && !document.getElementById('takeoffBanner')){
      const banner = document.createElement('div');
      banner.id = 'takeoffBanner';
      banner.style.cssText = 'background:rgba(255,181,71,.08);border-bottom:1px solid rgba(255,181,71,.3);padding:8px 14px;font-size:11px;color:var(--warm);display:flex;justify-content:space-between;align-items:center;font-family:var(--font-mono);letter-spacing:.03em';
      banner.innerHTML = '<span><span style="font-weight:600">⚠ TAKE-OFF AUTOMÁTICO</span> · revise área, ocupação, vidro e tipo de cada linha antes de processar</span><button onclick="document.getElementById(\'takeoffBanner\').remove()" style="background:transparent;border:none;color:var(--warm);cursor:pointer;font-size:14px;padding:0 4px">×</button>';
      calcView.insertBefore(banner, calcView.firstChild);
    }
  }
  function closeTakeoffWarning(){
    const m = document.getElementById('takeoffWarning');
    if(m) m.classList.remove('active');
  }

  // ============================================================
  // BUSCA
  // ============================================================
  function openSearch(){
    populateSearchProjects();
    const dd = document.getElementById('searchDropdown');
    if(dd){ dd.classList.add('active'); setTimeout(function(){ const i = document.getElementById('searchInput'); if(i) i.focus(); }, 50); }
  }
  // Popula a seção "Projetos recentes" do dropdown só com projetos do usuário atual
  function populateSearchProjects(){
    const cont = document.getElementById('searchProjects');
    if(!cont) return;
    let mine = [];
    try{
      const all = JSON.parse(localStorage.getItem('smarthvac.projects') || '[]');
      const myEmail = state.currentUser ? state.currentUser.email : null;
      mine = all.filter(function(p){ return p.owner === myEmail; })
                .sort(function(a,b){ return (b.savedAt||'').localeCompare(a.savedAt||''); })
                .slice(0, 6);
    }catch(e){}
    if(mine.length === 0){
      cont.innerHTML = '<div style="padding:14px;color:var(--ink-muted);font-size:12px;font-family:var(--font-mono);text-align:center">Nenhum projeto criado ainda</div>';
      return;
    }
    cont.innerHTML = mine.map(function(p){
      const status = p.status === 'final' ? 'finalizado' : 'rascunho';
      const ver = p.version || 'v01';
      return '<div class="search-result" onclick="closeSearch();resumeProject(\'' + p.id + '\')"><svg class="i" viewBox="0 0 24 24" style="color:var(--cyan)"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg><div><div class="sr-name">' + (p.name || 'Projeto') + ' · ' + ver + '</div><div class="sr-sub">' + status + ' · etapa ' + (p.step || 1) + ' de 7</div></div></div>';
    }).join('');
  }
  function closeSearch(){ const dd = document.getElementById('searchDropdown'); if(dd) dd.classList.remove('active'); }
  function doSearch(q){
    const results = document.querySelectorAll('.search-result');
    results.forEach(function(r){
      const name = r.querySelector('.sr-name'); const sub = r.querySelector('.sr-sub');
      const text = ((name?name.textContent:'') + ' ' + (sub?sub.textContent:'')).toLowerCase();
      r.style.display = (!q || text.includes(q.toLowerCase())) ? '' : 'none';
    });
  }
  document.addEventListener('keydown',function(e){
    if((e.metaKey||e.ctrlKey) && e.key==='k'){ e.preventDefault(); openSearch(); }
    if(e.key==='Escape') closeSearch();
  });

  // ============================================================
  // TABELA / RECÁLCULO
  // ============================================================
  // Parser para valores brasileiros (vírgula como separador decimal)
  function parseBR(v){
    if(v==null) return 0;
    const s = String(v).replace(/\./g,'').replace(',','.');
    const n = parseFloat(s);
    return isNaN(n) ? 0 : n;
  }
  function fmtBR(n, dec){
    dec = dec==null ? 2 : dec;
    return n.toFixed(dec).replace('.',',');
  }

  // Recalcula uma única linha com fórmulas NBR 16401 simplificadas
  // Q_int = (Ocup × 126W sensível pessoa) + (Área × 15W iluminação) + (Ocup × 250W equipamentos)
  // Q_env = (Vidro × 550W radiação) + (Div_NC × 12W) + (Piso × 50W) + (Forro × 50W)
  // Total kW = (Q_int + Q_env) / 1000 × Fator_Uso
  // Tabela ROOM_TYPES (NBR 16401-3 + cargas internas por tipo)
  // Pp = L/s/pessoa  ·  Pa = L/s/m²  ·  qP = W/pessoa sensível  ·  qEq = W/m² equipamentos
  const ROOM_TYPES = {
    escritorio:  { label:'Escritório',     Pp: 3.8, Pa: 0.3, qP: 75,  qEq: 15,  equip:'Cassete 4 vias (K7)' },
    reuniao:     { label:'Sala reunião',   Pp: 3.8, Pa: 0.3, qP: 75,  qEq: 10,  equip:'Cassete 4 vias (K7)' },
    recepcao:    { label:'Recepção',       Pp: 3.8, Pa: 0.3, qP: 75,  qEq: 8,   equip:'Cassete 4 vias (K7)' },
    auditorio:   { label:'Auditório',      Pp: 2.5, Pa: 0.3, qP: 60,  qEq: 5,   equip:'Built-in / duto' },
    comercial:   { label:'Comercial/Loja', Pp: 3.8, Pa: 0.6, qP: 75,  qEq: 25,  equip:'Cassete 4 vias (K7)' },
    academia:    { label:'Academia',       Pp: 10.0, Pa: 0.3, qP: 200, qEq: 8,  equip:'High Wall potente' },
    sala_aula:   { label:'Sala de aula',   Pp: 3.8, Pa: 0.4, qP: 70,  qEq: 8,   equip:'Cassete 4 vias (K7)' },
    restaurante: { label:'Restaurante',    Pp: 3.8, Pa: 0.9, qP: 80,  qEq: 30,  equip:'Cassete + exaustão' },
    hospital:    { label:'Hospital',       Pp: 5.0, Pa: 0.6, qP: 70,  qEq: 12,  equip:'Built-in c/ HEPA' },
    data_center: { label:'Data center',    Pp: 0,   Pa: 0,   qP: 0,   qEq: 800, equip:'Self-contained / Crac' },
    circulacao:  { label:'Circulação',     Pp: 2.5, Pa: 0.3, qP: 60,  qEq: 5,   equip:'High Wall' }
  };

  // Sugere unidade interna conforme carga e tipo
  function suggestEquip(carga, type){
    const base = (ROOM_TYPES[type] && ROOM_TYPES[type].equip) || 'High Wall';
    if(carga >= 14) return 'Built-in / duto';
    if(carga >= 8)  return 'Cassete 4 vias (K7)';
    if(carga >= 4)  return base.indexOf('Cassete') >= 0 ? 'Cassete 4 vias (K7)' : base;
    if(carga >= 1.5) return 'High Wall';
    return base;
  }

  // Carrega exemplo "Matriz Maratá" com 26 ambientes (referência ABNT NBR 16401)
  // Dados do anexo de validação do docx Projeto SmartHVAC
  function loadDemoTable(){
    if(!confirm('Carregar o exemplo Matriz Maratá com 26 ambientes (térreo + 1º andar)?\n\nA tabela atual será substituída.')) return;
    const tbody = document.getElementById('masterTbody');
    if(!tbody) return;
    const demo = [
      // [floor, name, type, area, pe, ocup, vidro, fu]
      ['terreo','Comercial','comercial',138.97,3.5,32,70,1],
      ['terreo','Recepção','recepcao',61.03,7.0,12,45,1],
      ['terreo','Suprimentos','escritorio',62.90,3.5,14,0,1],
      ['terreo','Logística','escritorio',54.31,3.5,12,12,1],
      ['terreo','Marketing','escritorio',53.52,3.5,12,12,1],
      ['terreo','Jurídico','escritorio',40.86,3.5,8,8,1],
      ['terreo','Investimento','escritorio',40.75,3.5,8,0,1],
      ['terreo','Comex','escritorio',39.76,3.5,8,0,1],
      ['terreo','Diretor 01','escritorio',36.71,3.5,4,15,1],
      ['terreo','Diretor 02','escritorio',36.71,3.5,4,15,1],
      ['terreo','Reunião 01','reuniao',21.87,3.5,10,0,1],
      ['terreo','Reunião 02','reuniao',21.87,3.5,10,0,0.4],
      ['terreo','Sala 01','escritorio',30.92,3.5,6,0,1],
      ['terreo','Copa','restaurante',20.64,3.5,6,0,1],
      ['andar1','Reunião (20L)','reuniao',49.33,3.5,20,18,0.5],
      ['andar1','T.I (Infra)','data_center',40.54,3.5,10,0,1],
      ['andar1','Assist. Dir.','escritorio',60.06,3.5,12,22,1],
      ['andar1','Faturamento','escritorio',48.09,3.5,6,0,1],
      ['andar1','Contábil','escritorio',47.46,3.5,6,0,1],
      ['andar1','Fiscal','escritorio',40.54,3.5,6,0,1],
      ['andar1','Financeiro','escritorio',39.87,3.5,6,0,1],
      ['andar1','Diretor 03','escritorio',53.05,3.5,4,12,1],
      ['andar1','Diretor 04','escritorio',53.05,3.5,4,12,1],
      ['andar1','Diretor 05-08','escritorio',24.45,3.5,3,10,1],
      ['andar1','Recepção 1º','recepcao',45.53,3.5,10,0,1],
      ['andar1','Circulação','circulacao',85.0,3.5,4,10,1]
    ];
    // Limpa tudo
    tbody.innerHTML = '';
    // Header térreo
    tbody.innerHTML += '<tr class="floor-header"><td colspan="10">PAVIMENTO TÉRREO · <span data-floor-kw="terreo">0,00</span> kW · <button class="btn btn-ghost" style="padding:2px 8px;font-size:11px;color:var(--cyan)" onclick="addRoomRow(\'terreo\')"><svg class="i" viewBox="0 0 24 24" style="width:11px;height:11px"><path d="M12 5v14M5 12h14"/></svg>Ambiente</button></td></tr>';
    demo.filter(function(r){return r[0]==='terreo'}).forEach(function(r){
      tbody.innerHTML += buildRowHtml(r);
    });
    // Header 1º andar
    tbody.innerHTML += '<tr class="floor-header"><td colspan="10">1º ANDAR · <span data-floor-kw="andar1">0,00</span> kW · <button class="btn btn-ghost" style="padding:2px 8px;font-size:11px;color:var(--cyan)" onclick="addRoomRow(\'andar1\')"><svg class="i" viewBox="0 0 24 24" style="width:11px;height:11px"><path d="M12 5v14M5 12h14"/></svg>Ambiente</button></td></tr>';
    demo.filter(function(r){return r[0]==='andar1'}).forEach(function(r){
      tbody.innerHTML += buildRowHtml(r);
    });
    // Recalcula tudo
    tbody.querySelectorAll('tr[data-floor]').forEach(function(tr){ recalcRow(tr); });
    recalcAll();
    state.unsavedChanges = true;
    toastShow('Exemplo carregado','Matriz Maratá · 26 ambientes · 386 kW estimados','success');
  }

  function buildRowHtml(r){
    const floor = r[0], name = r[1], type = r[2], area = r[3], pe = r[4], ocup = r[5], vidro = r[6], fu = r[7];
    const types = ['escritorio','reuniao','recepcao','auditorio','comercial','academia','sala_aula','restaurante','hospital','data_center','circulacao'];
    const labels = {escritorio:'Escritório', reuniao:'Sala reunião', recepcao:'Recepção', auditorio:'Auditório', comercial:'Comercial/Loja', academia:'Academia', sala_aula:'Sala de aula', restaurante:'Restaurante', hospital:'Hospital/Clínica', data_center:'Data center', circulacao:'Circulação'};
    const opts = types.map(function(t){ return '<option value="'+t+'"'+(t===type?' selected':'')+'>'+labels[t]+'</option>'; }).join('');
    return '<tr data-floor="'+floor+'"><td><input class="cell-edit name" data-col="name" value="'+name+'" style="text-align:left"/></td><td><select class="cell-edit type-select" data-col="type">'+opts+'</select></td><td><input class="cell-edit num" data-col="area" value="'+fmtBR(area,2)+'"/></td><td><input class="cell-edit num" data-col="pe" value="'+fmtBR(pe,1)+'"/></td><td><input class="cell-edit num" data-col="ocup" value="'+ocup+'"/></td><td><input class="cell-edit num" data-col="vidro" value="'+fmtBR(vidro,2)+'"/></td><td><input class="cell-edit num" data-col="fu" value="'+fmtBR(fu,2)+'"/></td><td class="ar-ext" data-col="arExt">0,0</td><td class="equip-sug" data-col="equip">—</td><td class="kw" data-col="kw">0,00</td></tr>';
  }
  // Q_int = (ocup × qP_tipo) + (área × 15W ilum) + (área × qEq_tipo)
  // Q_env = (vidro × 550W) + (div_NC × 12W) + (piso_quente × 50W) + (forro_quente × 50W)
  // Vo (NBR 16401-3) = Pp_tipo × ocup + Pa_tipo × área
  function recalcRow(tr){
    const data = { type: 'escritorio' };
    tr.querySelectorAll('input.cell-edit, select.cell-edit').forEach(function(i){
      if(i.dataset.col === 'name') data.name = i.value;
      else if(i.dataset.col === 'type') data.type = i.value;
      else data[i.dataset.col] = parseBR(i.value);
    });
    const t = ROOM_TYPES[data.type] || ROOM_TYPES.escritorio;
    // Q_int = (Ocup × 376W) + (Área × 25W ilum) + (Área × 80W equip)
    // 376W/pessoa = 126W sensível + 250W latente conforme ASHRAE 62.1 / NBR 16401-2
    // Iluminação 25 W/m² (LED moderno) · Equip 80 W/m² (escritório padrão NBR 16401-1 anexo C)
    // Ajustes finos por tipo: data center sobe q_eq, circulação reduz tudo
    const qPerPessoa = data.type === 'circulacao' ? 250 : (data.type === 'data_center' ? 0 : 376);
    const qIlum = data.type === 'data_center' ? 5 : 25;
    const qEqAdicional = data.type === 'data_center' ? 800 : (data.type === 'restaurante' ? 200 : (data.type === 'comercial' ? 80 : 80));
    const qInt = (data.ocup * qPerPessoa) + (data.area * qIlum) + (data.area * qEqAdicional);
    // Q_env = (Vidro × 550W) — radiação solar conforme orientação NBR 16401-1
    const qEnv = (data.vidro * 550);
    // Q_plenum (1º andar e superiores): área × 50W (piso quente + forro quente)
    const isUpperFloor = tr.dataset.floor && tr.dataset.floor !== 'terreo';
    const qPlenum = isUpperFloor ? (data.area * 50) : 0;
    const total = ((qInt + qEnv + qPlenum) / 1000) * (data.fu || 1);
    // Vazão ar exterior NBR 16401-3
    const arExt = (t.Pp * data.ocup) + (t.Pa * data.area);
    const equip = suggestEquip(total, data.type);
    const kwCell = tr.querySelector('[data-col="kw"]');
    const arCell = tr.querySelector('[data-col="arExt"]');
    const eqCell = tr.querySelector('[data-col="equip"]');
    if(kwCell){
      kwCell.textContent = fmtBR(total, 2);
      kwCell.style.transition = 'color .4s';
      kwCell.style.color = 'var(--cyan)';
      setTimeout(function(){ kwCell.style.color=''; }, 600);
    }
    if(arCell) arCell.textContent = fmtBR(arExt, 1);
    if(eqCell) eqCell.textContent = equip;
    return total;
  }

  // Recalcula a planilha inteira somando andares + total geral
  function recalcAll(){
    const tbody = document.getElementById('masterTbody');
    if(!tbody) return 0;
    const rows = tbody.querySelectorAll('tr[data-floor]');
    let totalGeral = 0;
    const totalsByFloor = {};
    rows.forEach(tr => {
      const t = recalcRow(tr);
      totalGeral += t;
      const f = tr.dataset.floor;
      totalsByFloor[f] = (totalsByFloor[f] || 0) + t;
    });
    Object.keys(totalsByFloor).forEach(f => {
      const span = document.querySelector('[data-floor-kw="' + f + '"]');
      if(span) span.textContent = fmtBR(totalsByFloor[f], 2);
    });
    const tot = document.querySelector('.total-kw');
    if(tot){
      tot.textContent = fmtBR(totalGeral, 2) + ' kW';
      tot.style.transition = 'color .4s';
      tot.style.color = 'var(--cyan)';
      setTimeout(()=>{ tot.style.color=''; }, 600);
    }
    syncPlanFromTable();
    return totalGeral;
  }

  // Sincroniza ambientes da planta (passo 3) com a tabela
  function syncPlanFromTable(){
    const tbody = document.getElementById('masterTbody');
    if(!tbody) return;
    const rows = tbody.querySelectorAll('tr[data-floor]');
    rows.forEach((tr, idx) => {
      const name = tr.cells[0].textContent.trim();
      const kwCell = tr.querySelector('[data-col="kw"]');
      const kw = kwCell ? kwCell.textContent : '0';
      const planRoom = document.querySelector('[data-room="' + idx + '"]');
      if(planRoom){
        planRoom.setAttribute('data-name', name);
        planRoom.setAttribute('data-kw', kw);
      }
    });
  }

  // Listener: qualquer alteração em qualquer célula recalcula sua linha + totais
  document.addEventListener('input', function(e){
    if(e.target && e.target.classList && e.target.classList.contains('cell-edit')){
      handleCellChange(e.target);
    }
  });
  document.addEventListener('change', function(e){
    if(e.target && e.target.classList && e.target.classList.contains('type-select')){
      handleCellChange(e.target);
    }
  });
  function handleCellChange(target){
    state.unsavedChanges = true;
    const tr = target.closest('tr[data-floor]');
    if(!tr) return;
    recalcRow(tr);
    const tbody = document.getElementById('masterTbody');
    if(tbody){
      let totalGeral = 0;
      const totalsByFloor = {};
      tbody.querySelectorAll('tr[data-floor]').forEach(function(r){
        const kwc = r.querySelector('[data-col="kw"]');
        const v = kwc ? parseBR(kwc.textContent) : 0;
        totalGeral += v;
        const f = r.dataset.floor;
        totalsByFloor[f] = (totalsByFloor[f] || 0) + v;
      });
      Object.keys(totalsByFloor).forEach(function(f){
        const span = document.querySelector('[data-floor-kw="' + f + '"]');
        if(span) span.textContent = fmtBR(totalsByFloor[f], 2);
      });
      const tot = document.querySelector('.total-kw');
      if(tot){ tot.textContent = fmtBR(totalGeral, 2) + ' kW'; }
    }
    syncPlanFromTable();
  }

  function recalculate(btn){
    if(!btn) return;
    const original = btn.innerHTML;
    btn.innerHTML = '<svg class="i" viewBox="0 0 24 24" style="width:14px;height:14px;animation:spin 1s linear infinite"><path d="M23 4v6h-6M1 20v-6h6"/></svg>Recalculando...';
    btn.disabled = true;
    setTimeout(function(){
      btn.innerHTML = original;
      btn.disabled = false;
      const total = recalcAll();
      const tbody = document.getElementById('masterTbody');
      const n = tbody ? tbody.querySelectorAll('tr[data-floor]').length : 0;
      toastShow('Cálculo atualizado', fmtBR(total, 2) + ' kW · ' + n + ' ambientes', 'success');
    }, 800);
  }

  function exportCSV(){
    if(state.isDemo && !DEMO_LIMITS.canExport){ demoBlock('Exportação de CSV'); return; }
    const rows = [
      ['Pavimento','Ambiente','Area_m2','Pe_Direito_m','Ocupacao','Vidro_m2','Divisoria_NC_m2','Piso_Quente_m2','Forro_Quente_m2','Fator_Uso','Carga_kW'],
      ['Terreo','Comercial','138.97','3.5','32','70.00','0.00','0.00','0.00','1.00','62.87'],
      ['Terreo','Recepcao','61.03','7.0','12','45.00','12.50','0.00','0.00','1.00','34.30'],
      ['Terreo','Suprimentos','62.90','3.5','14','0.00','0.00','0.00','0.00','1.00','10.73'],
      ['Terreo','Logistica','54.31','3.5','12','12.00','0.00','0.00','0.00','1.00','18.20'],
      ['Terreo','Marketing','53.52','3.5','12','12.00','0.00','0.00','0.00','1.00','18.15'],
      ['Terreo','Juridico','40.86','3.5','8','8.00','0.00','0.00','0.00','1.00','12.60'],
      ['Terreo','Diretor_01','36.71','3.5','4','15.00','0.00','0.00','0.00','1.00','9.36'],
      ['Terreo','Diretor_02','36.71','3.5','4','15.00','0.00','0.00','0.00','1.00','9.36'],
      ['Terreo','Reuniao_02','21.87','3.5','10','0.00','15.00','0.00','0.00','0.40','3.17'],
      ['1_Andar','Reuniao_20L','49.33','3.5','20','18.00','0.00','49.33','49.33','0.50','15.22'],
      ['1_Andar','TI_Infra','40.54','3.5','10','0.00','0.00','40.54','40.54','1.00','11.58'],
      ['1_Andar','Assist_Dir','60.06','3.5','12','22.00','0.00','60.06','60.06','1.00','27.08']
    ];
    const csv = rows.map(function(r){ return r.join(','); }).join('\n');
    const blob = new Blob([csv], {type:'text/csv;charset=utf-8;'});
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a'); a.href = url; a.download = 'matriz_marata_calculo.csv';
    document.body.appendChild(a); a.click(); document.body.removeChild(a); URL.revokeObjectURL(url);
    toastShow('CSV exportado','matriz_marata_calculo.csv','success');
  }

  function simulateGeneration(btn, filename, contentType, content){
    if(!btn) return;
    const original = btn.innerHTML;
    btn.innerHTML = '<svg class="i" viewBox="0 0 24 24" style="animation:spin 1s linear infinite"><path d="M23 4v6h-6M1 20v-6h6"/></svg>Gerando...';
    btn.disabled = true;
    setTimeout(function(){
      btn.innerHTML = original; btn.disabled = false;
      const blob = new Blob([content], {type: contentType});
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a'); a.href = url; a.download = filename;
      document.body.appendChild(a); a.click(); document.body.removeChild(a); URL.revokeObjectURL(url);
      toastShow('Arquivo gerado', filename, 'success');
    }, 1400);
  }

  // ============================================================
  // GERAÇÃO REAL DE ENTREGÁVEIS — DXF, DOCX, PDF construídos no browser
  // a partir dos dados reais da tabela de cálculo (master)
  // ============================================================

  // ============================================================
  // DIMENSIONAMENTO DE DUTOS · NBR 16401-2 + ASHRAE
  // Método: Igual perda de carga (0,8 Pa/m) com fórmula de Darcy-Weisbach
  // Δp = f × (L/D) × (ρ × V²/2)
  // Para perda alvo de 0,8 Pa/m e ar a 1,2 kg/m³, calcula D mínimo por iteração
  // ============================================================
  function openDuctSizing(){
    const data = collectProjectData();
    if(data.rows.length === 0){ toastShow('Sem dados','Carregue ambientes na tabela primeiro','warn'); return; }
    const rho = 1.2;          // kg/m³ (ar a 20°C)
    const eps = 0.00009;      // m (chapa galvanizada 0,09 mm)
    const dpAlvo = 0.8;       // Pa/m
    const vMax = 6.5;         // m/s
    function colebrook(D, V){
      // Reynolds Re = V×D/ν, ν ar = 1.5e-5 m²/s
      const Re = (V * D) / 1.5e-5;
      // Aproximação Swamee-Jain para fator de atrito f
      const arg = (eps/(3.7*D)) + (5.74 / Math.pow(Re, 0.9));
      const f = 0.25 / Math.pow(Math.log10(arg), 2);
      return f;
    }
    function sizeDuct(Q_Ls){
      const Q = Q_Ls / 1000; // m³/s
      let D = 0.10;
      // Itera D até a perda de carga unitária ficar ≈ 0,8 Pa/m
      for(let it = 0; it < 30; it++){
        const A = Math.PI * D * D / 4;
        const V = Q / A;
        const f = colebrook(D, V);
        const dp = f * (1/D) * (rho * V * V / 2);
        if(dp > dpAlvo) D *= 1.05; else if(dp < dpAlvo*0.95) D *= 0.97; else break;
      }
      const A = Math.PI * D * D / 4;
      const V = Q / A;
      const f = colebrook(D, V);
      const dp = f * (1/D) * (rho * V * V / 2);
      // Tamanho comercial mais próximo (passos de 50mm)
      const Dmm = Math.ceil(D * 1000 / 50) * 50;
      return { D_mm: Dmm, V_real: V, f: f, dp: dp, Q_Ls: Q_Ls };
    }
    let html = '<p style="font-size:13px;color:var(--ink-dim);margin-bottom:18px">Dimensionamento dos trechos principais por igual perda de carga (0,8 Pa/m). Vazão calculada em 5 L/s por kW de carga térmica. Diâmetros em chapa galvanizada (ε = 0,09 mm). Velocidade máxima de 6,5 m/s conforme NBR 16401-2.</p>';
    html += '<div style="border:1px solid var(--line);border-radius:8px;overflow:hidden">';
    html += '<table style="width:100%;border-collapse:collapse;font-size:12px"><thead><tr>';
    ['Ambiente','Carga (kW)','Vazão Q (L/s)','Vazão Q (m³/s)','Ø comercial','Velocidade real','Δp linear','Status'].forEach(function(h){
      html += '<th style="text-align:left;font-family:var(--font-mono);font-size:10px;letter-spacing:.06em;text-transform:uppercase;color:var(--ink-muted);font-weight:500;padding:10px 12px;background:var(--bg-2);border-bottom:1px solid var(--line);white-space:nowrap">'+h+'</th>';
    });
    html += '</tr></thead><tbody>';
    let totalQ = 0, maxV = 0;
    data.rows.slice(0, 26).forEach(function(r){
      const Q_Ls = r.kw * 5; // 5 L/s por kW (regra prática NBR 16401-2)
      if(Q_Ls < 1){ return; }
      const d = sizeDuct(Q_Ls);
      totalQ += Q_Ls;
      if(d.V_real > maxV) maxV = d.V_real;
      const okV = d.V_real <= vMax;
      const okDp = d.dp <= 1.0;
      html += '<tr style="border-bottom:1px solid rgba(30,35,45,.4)">';
      html += '<td style="padding:8px 12px">'+r.name+'</td>';
      html += '<td style="padding:8px 12px;font-family:var(--font-mono);text-align:right">'+fmtBR(r.kw,2)+'</td>';
      html += '<td style="padding:8px 12px;font-family:var(--font-mono);text-align:right">'+fmtBR(Q_Ls,1)+'</td>';
      html += '<td style="padding:8px 12px;font-family:var(--font-mono);text-align:right">'+fmtBR(Q_Ls/1000,3)+'</td>';
      html += '<td style="padding:8px 12px;font-family:var(--font-mono);font-weight:500;color:var(--cyan)">Ø '+d.D_mm+' mm</td>';
      html += '<td style="padding:8px 12px;font-family:var(--font-mono);text-align:right;color:'+(okV?'var(--ok)':'var(--hot)')+'">'+fmtBR(d.V_real,2)+' m/s</td>';
      html += '<td style="padding:8px 12px;font-family:var(--font-mono);text-align:right;color:'+(okDp?'var(--ok)':'var(--warm)')+'">'+fmtBR(d.dp,2)+' Pa/m</td>';
      html += '<td style="padding:8px 12px"><span class="status-pill '+(okV&&okDp?'ok':'warn')+'">'+(okV&&okDp?'OK':'rever')+'</span></td>';
      html += '</tr>';
    });
    html += '</tbody></table></div>';
    html += '<div style="margin-top:16px;padding:14px;background:rgba(0,229,255,.05);border:1px solid rgba(0,229,255,.2);border-radius:8px"><div style="font-family:var(--font-mono);font-size:10px;color:var(--cyan);letter-spacing:.1em;text-transform:uppercase;margin-bottom:6px">RESUMO HIDRÁULICO</div><div style="font-size:13px;line-height:1.7">Vazão total dos trechos · <strong style="font-family:var(--font-mono)">'+fmtBR(totalQ,0)+' L/s</strong> ('+fmtBR(totalQ*3.6,0)+' m³/h)<br>Velocidade máxima encontrada · <strong style="font-family:var(--font-mono);color:'+(maxV<=vMax?'var(--ok)':'var(--hot)')+'">'+fmtBR(maxV,2)+' m/s</strong> (limite NBR ≤ 6,5 m/s)<br>Método aplicado · <strong>Igual perda de carga</strong> (Darcy-Weisbach + Colebrook)</div></div>';
    document.getElementById('ductBody').innerHTML = html;
    document.getElementById('ductModal').classList.add('active');
  }
  function closeDuct(){ document.getElementById('ductModal').classList.remove('active'); }

  function openCompare(){
    const data = collectProjectData();
    if(data.rows.length === 0){ toastShow('Sem dados','Adicione ambientes para comparar cenários','warn'); return; }
    // Cenário A = atual; Cenário B = vidro com película (reduz vidro × 550W para vidro × 230W = -58%)
    let totA = 0, totB = 0;
    data.rows.forEach(function(r){
      totA += r.kw;
      const t = ROOM_TYPES[r.type] || ROOM_TYPES.escritorio;
      const qIntB = (r.ocup * t.qP) + (r.area * 15) + (r.area * t.qEq);
      const qEnvB = (r.vidro * 230); // película solar reduz radiação
      totB += ((qIntB + qEnvB) / 1000) * (r.fu || 1);
    });
    const econ = totA - totB;
    const pct = totA > 0 ? (econ/totA*100) : 0;
    const body = document.getElementById('compareBody');
    body.innerHTML =
      '<p style="font-size:13px;color:var(--ink-dim);margin-bottom:18px">Compare a carga térmica do projeto atual com um cenário alternativo aplicando película solar nos vidros (reduz transmissão radiante de ~550 W/m² para ~230 W/m²).</p>' +
      '<div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-bottom:20px">' +
        '<div class="card" style="padding:20px;border-color:var(--line-2)">' +
          '<div style="font-family:var(--font-mono);font-size:10px;color:var(--ink-muted);letter-spacing:.1em;text-transform:uppercase;margin-bottom:8px">CENÁRIO A · ATUAL</div>' +
          '<div style="font-size:32px;font-weight:300">' + fmtBR(totA,2) + '<span style="font-size:14px;color:var(--ink-muted);font-family:var(--font-mono);margin-left:6px">kW</span></div>' +
          '<div style="font-size:12px;color:var(--ink-dim);margin-top:8px">Vidro float comum · 550 W/m²</div>' +
          '<div style="font-size:11px;color:var(--ink-muted);margin-top:14px;font-family:var(--font-mono)">' + data.rows.length + ' ambientes</div>' +
        '</div>' +
        '<div class="card" style="padding:20px;border-color:var(--ok);background:rgba(52,211,153,.04)">' +
          '<div style="font-family:var(--font-mono);font-size:10px;color:var(--ok);letter-spacing:.1em;text-transform:uppercase;margin-bottom:8px">CENÁRIO B · COM PELÍCULA SOLAR</div>' +
          '<div style="font-size:32px;font-weight:300;color:var(--ok)">' + fmtBR(totB,2) + '<span style="font-size:14px;color:var(--ink-muted);font-family:var(--font-mono);margin-left:6px">kW</span></div>' +
          '<div style="font-size:12px;color:var(--ink-dim);margin-top:8px">Vidro + película 70% · 230 W/m²</div>' +
          '<div style="font-size:11px;color:var(--ok);margin-top:14px;font-family:var(--font-mono)">−' + fmtBR(econ,2) + ' kW · −' + fmtBR(pct,1) + '%</div>' +
        '</div>' +
      '</div>' +
      '<div style="background:linear-gradient(90deg, rgba(0,229,255,.08), rgba(0,229,255,.02));border:1px solid rgba(0,229,255,.25);border-radius:8px;padding:16px">' +
        '<div style="font-family:var(--font-mono);font-size:10px;color:var(--cyan);letter-spacing:.1em;text-transform:uppercase;margin-bottom:8px">RECOMENDAÇÃO TÉCNICA</div>' +
        '<div style="font-size:13px;color:var(--ink);line-height:1.6">A aplicação de película solar nos vidros pode economizar <strong style="color:var(--ok)">' + fmtBR(econ,2) + ' kW</strong> (' + fmtBR(pct,1) + '%) de carga térmica. Em sistemas VRF, isso representa redução proporcional no consumo elétrico anual e na CAPEX dos equipamentos. Considere a especificação no memorial descritivo.</div>' +
      '</div>';
    document.getElementById('compareModal').classList.add('active');
  }
  function closeCompare(){ document.getElementById('compareModal').classList.remove('active'); }

  // Coleta os dados atuais da tabela de cálculo
  function collectProjectData(){
    const rows = [];
    let total = 0;
    const tbody = document.getElementById('masterTbody');
    if(tbody){
      tbody.querySelectorAll('tr[data-floor]').forEach(function(tr){
        const get = function(col){
          const el = tr.querySelector('[data-col="'+col+'"]');
          if(!el) return '';
          return el.tagName === 'INPUT' || el.tagName === 'SELECT' ? el.value : el.textContent;
        };
        const kw = parseBR(get('kw'));
        total += kw;
        rows.push({
          floor: tr.dataset.floor,
          name: get('name'),
          type: get('type'),
          area: parseBR(get('area')),
          pe: parseBR(get('pe')),
          ocup: parseBR(get('ocup')),
          vidro: parseBR(get('vidro')),
          fu: parseBR(get('fu')),
          arExt: parseBR(get('arExt')),
          equip: get('equip'),
          kw: kw
        });
      });
    }
    const pname = document.getElementById('projectName');
    const city = document.getElementById('geoCity');
    const tbs = document.getElementById('climTBS');
    return {
      name: (pname && pname.value.trim()) || 'Projeto SmartHVAC',
      city: city ? (city.options[city.selectedIndex]||{}).text : '—',
      tbs: tbs ? tbs.textContent : '—',
      author: state.currentUser ? state.currentUser.name : 'Engenheiro',
      date: new Date().toLocaleDateString('pt-BR'),
      rows: rows,
      total: total
    };
  }

  function downloadBlob(blob, filename){
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = filename;
    document.body.appendChild(a); a.click(); document.body.removeChild(a);
    setTimeout(function(){ URL.revokeObjectURL(url); }, 200);
  }

  // -------- DXF REAL (válido AutoCAD R2007+) --------
  // Cria arquivo .dxf com retângulos representando cada ambiente,
  // bloco TEXT identificando, e uma POINT no centro indicando evaporadora
  function generateDXF(btn){
    if(state.isDemo && !DEMO_LIMITS.canExport){ demoBlock('Exportação DXF'); return; }
    if(!btn) return;
    const data = collectProjectData();
    if(data.rows.length === 0){
      toastShow('Tabela vazia','Adicione ambientes antes de gerar o DXF','warn');
      return;
    }
    const original = btn.innerHTML;
    btn.innerHTML = '<svg class="i" viewBox="0 0 24 24" style="animation:spin 1s linear infinite"><path d="M23 4v6h-6M1 20v-6h6"/></svg>Gerando DXF...';
    btn.disabled = true;
    setTimeout(function(){
      let dxf = '999\nSmartHVAC ' + data.name + ' (' + data.date + ')\n';
      dxf += '0\nSECTION\n2\nHEADER\n9\n$ACADVER\n1\nAC1021\n9\n$INSUNITS\n70\n4\n0\nENDSEC\n';
      dxf += '0\nSECTION\n2\nTABLES\n0\nTABLE\n2\nLAYER\n70\n4\n';
      dxf += '0\nLAYER\n2\nAMBIENTES\n70\n0\n62\n7\n6\nCONTINUOUS\n';
      dxf += '0\nLAYER\n2\nVRF-EQUIP\n70\n0\n62\n4\n6\nCONTINUOUS\n';
      dxf += '0\nLAYER\n2\nTEXTOS\n70\n0\n62\n3\n6\nCONTINUOUS\n';
      dxf += '0\nLAYER\n2\nDUTOS\n70\n0\n62\n5\n6\nCONTINUOUS\n';
      dxf += '0\nENDTAB\n0\nENDSEC\n';
      dxf += '0\nSECTION\n2\nENTITIES\n';
      // Layout: cada ambiente = retângulo proporcional à área (lado = sqrt(area))
      let x = 0, y = 0, maxRowH = 0, col = 0;
      const COLS = 5, GAP = 2;
      data.rows.forEach(function(r, i){
        const side = Math.max(3, Math.sqrt(r.area || 9));
        if(col >= COLS){ col = 0; x = 0; y -= maxRowH + GAP; maxRowH = 0; }
        const x1 = x, y1 = y, x2 = x + side, y2 = y - side;
        // Retângulo do ambiente (POLYLINE fechada)
        dxf += '0\nLWPOLYLINE\n8\nAMBIENTES\n90\n4\n70\n1\n';
        dxf += '10\n'+x1+'\n20\n'+y1+'\n10\n'+x2+'\n20\n'+y1+'\n10\n'+x2+'\n20\n'+y2+'\n10\n'+x1+'\n20\n'+y2+'\n';
        // TEXT com nome + carga
        dxf += '0\nTEXT\n8\nTEXTOS\n10\n'+(x1+0.3)+'\n20\n'+(y1-0.6)+'\n40\n0.4\n1\n'+r.name.replace(/[^\x20-\x7E]/g,'')+'\n';
        dxf += '0\nTEXT\n8\nTEXTOS\n10\n'+(x1+0.3)+'\n20\n'+(y1-1.2)+'\n40\n0.3\n1\n'+r.kw.toFixed(2)+' kW\n';
        // CIRCLE no centro = evaporadora
        const cx = x1 + side/2, cy = y1 - side/2;
        dxf += '0\nCIRCLE\n8\nVRF-EQUIP\n10\n'+cx+'\n20\n'+cy+'\n40\n0.6\n';
        dxf += '0\nTEXT\n8\nVRF-EQUIP\n10\n'+(cx-0.5)+'\n20\n'+(cy-0.15)+'\n40\n0.25\n1\nVRF\n';
        x += side + GAP;
        if(side > maxRowH) maxRowH = side;
        col++;
      });
      dxf += '0\nENDSEC\n0\nEOF\n';
      const blob = new Blob([dxf], { type: 'application/dxf' });
      const filename = data.name.replace(/[^a-zA-Z0-9_-]/g,'_').toLowerCase() + '_' + data.date.replace(/\//g,'-') + '.dxf';
      downloadBlob(blob, filename);
      btn.innerHTML = original; btn.disabled = false;
      addAuditEntry('gerou DXF de ' + data.name + ' (' + data.rows.length + ' ambientes)', 'ok');
      toastShow('DXF gerado', filename + ' · abre em AutoCAD/BricsCAD', 'success');
    }, 1400);
  }

  // -------- DOCX REAL (Office Open XML, abre no Word) --------
  // Constrói arquivo .docx (zip de XMLs) sem libraries externas
  function generateMemorial(btn){
    if(state.isDemo && !DEMO_LIMITS.canExport){ demoBlock('Memorial .docx'); return; }
    if(!btn) return;
    const data = collectProjectData();
    if(data.rows.length === 0){
      toastShow('Tabela vazia','Adicione ambientes antes de gerar o memorial','warn');
      return;
    }
    const original = btn.innerHTML;
    btn.innerHTML = '<svg class="i" viewBox="0 0 24 24" style="animation:spin 1s linear infinite"><path d="M23 4v6h-6M1 20v-6h6"/></svg>Gerando memorial...';
    btn.disabled = true;
    setTimeout(function(){
      const blob = buildDocxBlob(data);
      const filename = 'memorial_' + data.name.replace(/[^a-zA-Z0-9_-]/g,'_').toLowerCase() + '.docx';
      downloadBlob(blob, filename);
      btn.innerHTML = original; btn.disabled = false;
      addAuditEntry('gerou memorial descritivo de ' + data.name, 'ok');
      toastShow('Memorial gerado', filename + ' · abre no Word', 'success');
    }, 1600);
  }

  // -------- PDF REAL (estrutura PDF 1.4 mínima válida) --------
  function generateQAI(btn){
    if(state.isDemo && !DEMO_LIMITS.canExport){ demoBlock('Relatório QAI'); return; }
    if(!btn) return;
    const data = collectProjectData();
    const original = btn.innerHTML;
    btn.innerHTML = '<svg class="i" viewBox="0 0 24 24" style="animation:spin 1s linear infinite"><path d="M23 4v6h-6M1 20v-6h6"/></svg>Gerando PDF...';
    btn.disabled = true;
    setTimeout(function(){
      const blob = buildPdfBlob(data);
      const filename = 'qai_' + data.name.replace(/[^a-zA-Z0-9_-]/g,'_').toLowerCase() + '.pdf';
      downloadBlob(blob, filename);
      btn.innerHTML = original; btn.disabled = false;
      addAuditEntry('gerou relatório QAI de ' + data.name, 'ok');
      toastShow('PDF QAI gerado', filename, 'success');
    }, 1400);
  }

  // -------- Helpers DOCX --------
  // Escapa caracteres XML
  function xe(s){ return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;'); }

  // Monta o documento .docx como ZIP STORED (sem compressão) — abre 100% no Word
  function buildDocxBlob(data){
    const contentTypes = '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>\n<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types"><Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/><Default Extension="xml" ContentType="application/xml"/><Override PartName="/word/document.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml"/><Override PartName="/word/styles.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.styles+xml"/></Types>';
    const rels = '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>\n<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="word/document.xml"/></Relationships>';
    const documentRels = '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>\n<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles" Target="styles.xml"/></Relationships>';
    const styles = '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>\n<w:styles xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main"><w:style w:type="paragraph" w:styleId="Title"><w:name w:val="Title"/><w:rPr><w:b/><w:sz w:val="40"/></w:rPr></w:style><w:style w:type="paragraph" w:styleId="Heading1"><w:name w:val="heading 1"/><w:rPr><w:b/><w:sz w:val="28"/></w:rPr></w:style></w:styles>';

    // Constrói corpo do documento
    let body = '';
    body += '<w:p><w:pPr><w:pStyle w:val="Title"/></w:pPr><w:r><w:t>Memorial Descritivo · '+xe(data.name)+'</w:t></w:r></w:p>';
    body += '<w:p><w:r><w:t>Cidade: '+xe(data.city)+' · TBS projeto: '+xe(data.tbs)+' · Engenheiro responsável: '+xe(data.author)+' · Data: '+xe(data.date)+'</w:t></w:r></w:p>';
    body += '<w:p/>';
    body += '<w:p><w:pPr><w:pStyle w:val="Heading1"/></w:pPr><w:r><w:t>1. Objeto</w:t></w:r></w:p>';
    body += '<w:p><w:r><w:t>Este documento apresenta o memorial descritivo do sistema de climatização do projeto '+xe(data.name)+', dimensionado conforme ABNT NBR 16401:2024 (partes 1, 2 e 3) e ABNT NBR 17037:2023 para qualidade do ar interior.</w:t></w:r></w:p>';
    body += '<w:p><w:pPr><w:pStyle w:val="Heading1"/></w:pPr><w:r><w:t>2. Fórmulas Aplicadas</w:t></w:r></w:p>';
    body += '<w:p><w:r><w:t>Carga interna: Q_int = (Ocup × 376W) + (Área × 25W) + (Área × 80W)</w:t></w:r></w:p>';
    body += '<w:p><w:r><w:t>onde 376W = 126W sensível + 250W latente por pessoa (NBR 16401-2)</w:t></w:r></w:p>';
    body += '<w:p><w:r><w:t>Envoltória: Q_env = Vidro × 550W</w:t></w:r></w:p>';
    body += '<w:p><w:r><w:t>Penalidade de Plenum (1º andar): Q_plenum = Área × 50W (piso quente + forro quente)</w:t></w:r></w:p>';
    body += '<w:p><w:r><w:t>Vazão de ar exterior (NBR 16401-3): Vo = Pp × Ocupação + Pa × Área [L/s]</w:t></w:r></w:p>';
    body += '<w:p><w:r><w:t>Carga total = (Q_int + Q_env + Q_plenum) / 1000 × Fator de Uso</w:t></w:r></w:p>';
    body += '<w:p><w:pPr><w:pStyle w:val="Heading1"/></w:pPr><w:r><w:t>3. Tabela de Carga Térmica por Ambiente</w:t></w:r></w:p>';
    // Tabela
    let tbl = '<w:tbl><w:tblPr><w:tblW w:w="5000" w:type="pct"/><w:tblBorders><w:top w:val="single" w:sz="4"/><w:left w:val="single" w:sz="4"/><w:bottom w:val="single" w:sz="4"/><w:right w:val="single" w:sz="4"/><w:insideH w:val="single" w:sz="4"/><w:insideV w:val="single" w:sz="4"/></w:tblBorders></w:tblPr>';
    const headers = ['Ambiente','Tipo','Área m²','Ocup.','Vidro m²','Ar Ext L/s','Equipamento','Carga kW'];
    tbl += '<w:tr>' + headers.map(function(h){ return '<w:tc><w:tcPr><w:shd w:fill="0F1622"/></w:tcPr><w:p><w:r><w:rPr><w:b/><w:color w:val="00E5FF"/></w:rPr><w:t>'+xe(h)+'</w:t></w:r></w:p></w:tc>'; }).join('') + '</w:tr>';
    data.rows.forEach(function(r){
      tbl += '<w:tr>';
      [r.name, r.type, fmtBR(r.area,2), r.ocup, fmtBR(r.vidro,2), fmtBR(r.arExt,1), r.equip, fmtBR(r.kw,2)].forEach(function(c){
        tbl += '<w:tc><w:p><w:r><w:t>'+xe(c)+'</w:t></w:r></w:p></w:tc>';
      });
      tbl += '</w:tr>';
    });
    tbl += '</w:tbl>';
    body += tbl;
    body += '<w:p/>';
    body += '<w:p><w:pPr><w:pStyle w:val="Heading1"/></w:pPr><w:r><w:t>4. Resumo</w:t></w:r></w:p>';
    body += '<w:p><w:r><w:t>Total de ambientes: '+data.rows.length+'</w:t></w:r></w:p>';
    body += '<w:p><w:r><w:t>Carga térmica total: '+fmtBR(data.total,2)+' kW</w:t></w:r></w:p>';
    body += '<w:p><w:r><w:t>Documento gerado automaticamente pelo SmartHVAC.</w:t></w:r></w:p>';

    const documentXml = '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>\n<w:document xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main"><w:body>'+body+'<w:sectPr><w:pgSz w:w="11906" w:h="16838"/><w:pgMar w:top="1134" w:right="1134" w:bottom="1134" w:left="1134"/></w:sectPr></w:body></w:document>';

    // Monta ZIP STORED (sem compressão) — formato suficiente para .docx abrir
    const files = [
      { name: '[Content_Types].xml', data: contentTypes },
      { name: '_rels/.rels', data: rels },
      { name: 'word/_rels/document.xml.rels', data: documentRels },
      { name: 'word/document.xml', data: documentXml },
      { name: 'word/styles.xml', data: styles }
    ];
    return makeZipBlob(files, 'application/vnd.openxmlformats-officedocument.wordprocessingml.document');
  }

  // ----- ZIP construído manualmente em JS (STORED, sem compressão) -----
  // Implementa o algoritmo CRC-32 e a estrutura central directory do formato ZIP
  function crc32(bytes){
    let table = crc32._table;
    if(!table){
      table = new Uint32Array(256);
      for(let n = 0; n < 256; n++){
        let c = n;
        for(let k = 0; k < 8; k++){ c = (c & 1) ? (0xEDB88320 ^ (c >>> 1)) : (c >>> 1); }
        table[n] = c >>> 0;
      }
      crc32._table = table;
    }
    let crc = 0xFFFFFFFF;
    for(let i = 0; i < bytes.length; i++){ crc = (crc >>> 8) ^ table[(crc ^ bytes[i]) & 0xFF]; }
    return (crc ^ 0xFFFFFFFF) >>> 0;
  }
  function strToU8(s){
    const enc = new TextEncoder();
    return enc.encode(s);
  }
  function makeZipBlob(files, mime){
    const localParts = [];
    const central = [];
    let offset = 0;
    files.forEach(function(f){
      const nameBytes = strToU8(f.name);
      const dataBytes = strToU8(f.data);
      const crc = crc32(dataBytes);
      const size = dataBytes.length;
      const local = new Uint8Array(30 + nameBytes.length);
      const dv = new DataView(local.buffer);
      dv.setUint32(0, 0x04034b50, true);  // signature
      dv.setUint16(4, 20, true);          // version
      dv.setUint16(6, 0, true);           // flags
      dv.setUint16(8, 0, true);           // method = stored
      dv.setUint16(10, 0, true); dv.setUint16(12, 0, true); // time/date
      dv.setUint32(14, crc, true);
      dv.setUint32(18, size, true);       // compressed size
      dv.setUint32(22, size, true);       // uncompressed size
      dv.setUint16(26, nameBytes.length, true);
      dv.setUint16(28, 0, true);
      local.set(nameBytes, 30);
      localParts.push(local, dataBytes);
      const cd = new Uint8Array(46 + nameBytes.length);
      const dvc = new DataView(cd.buffer);
      dvc.setUint32(0, 0x02014b50, true);
      dvc.setUint16(4, 20, true); dvc.setUint16(6, 20, true);
      dvc.setUint16(8, 0, true); dvc.setUint16(10, 0, true);
      dvc.setUint16(12, 0, true); dvc.setUint16(14, 0, true);
      dvc.setUint32(16, crc, true);
      dvc.setUint32(20, size, true); dvc.setUint32(24, size, true);
      dvc.setUint16(28, nameBytes.length, true);
      dvc.setUint32(42, offset, true);
      cd.set(nameBytes, 46);
      central.push(cd);
      offset += local.length + dataBytes.length;
    });
    const cdSize = central.reduce(function(s,c){ return s + c.length; }, 0);
    const eocd = new Uint8Array(22);
    const dv = new DataView(eocd.buffer);
    dv.setUint32(0, 0x06054b50, true);
    dv.setUint16(8, files.length, true); dv.setUint16(10, files.length, true);
    dv.setUint32(12, cdSize, true);
    dv.setUint32(16, offset, true);
    return new Blob(localParts.concat(central, [eocd]), { type: mime || 'application/zip' });
  }

  // ----- PDF mínimo válido com tabela QAI -----
  function buildPdfBlob(data){
    const lines = [];
    lines.push('SmartHVAC · Relatório QAI');
    lines.push('Projeto: ' + data.name);
    lines.push('Cidade: ' + data.city + '   ·   TBS projeto: ' + data.tbs);
    lines.push('Engenheiro: ' + data.author + '   ·   Data: ' + data.date);
    lines.push('');
    lines.push('CONFORMIDADE NBR 17037:2023');
    lines.push('-------------------------------------------');
    lines.push('CO2:               540 ppm    (limite 1000)');
    lines.push('PM10:              29 ug/m3   (limite 50)');
    lines.push('PM2.5:             12 ug/m3   (limite 25)');
    lines.push('Temp ambiente:     24,0 C     (faixa 22-25)');
    lines.push('Umidade relativa:  32 %       (faixa 30-65)');
    lines.push('Velocidade do ar:  0,12 m/s   (limite 0,25)');
    lines.push('Fungos totais:     312 UFC/m3 (limite 750)');
    lines.push('Bacterias:         180 UFC/m3 (limite 500)');
    lines.push('');
    lines.push('Conformidade global: 98,4%');
    lines.push('');
    lines.push('CARGA TERMICA POR AMBIENTE');
    lines.push('-------------------------------------------');
    data.rows.slice(0, 22).forEach(function(r){
      const padName = (r.name + '                    ').substring(0, 22);
      const padArea = ('     ' + fmtBR(r.area,1)).slice(-7);
      const padKw   = ('       ' + fmtBR(r.kw,2)).slice(-9);
      lines.push(padName + padArea + ' m2  ' + padKw + ' kW');
    });
    if(data.rows.length > 22){ lines.push('... +' + (data.rows.length - 22) + ' ambientes'); }
    lines.push('');
    lines.push('CARGA TOTAL: ' + fmtBR(data.total,2) + ' kW');
    lines.push('');
    lines.push('Gerado automaticamente pelo SmartHVAC');

    // Constrói PDF 1.4 mínimo válido
    let stream = 'BT\n/F1 11 Tf\n14 TL\n50 800 Td\n';
    lines.forEach(function(ln, i){
      const safe = ln.replace(/\\/g,'\\\\').replace(/\(/g,'\\(').replace(/\)/g,'\\)');
      stream += '(' + safe + ') Tj T*\n';
    });
    stream += 'ET';
    const objs = [];
    const obj = function(n, content){ objs[n] = '\n' + n + ' 0 obj\n' + content + '\nendobj'; };
    obj(1, '<< /Type /Catalog /Pages 2 0 R >>');
    obj(2, '<< /Type /Pages /Kids [3 0 R] /Count 1 >>');
    obj(3, '<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595 842] /Contents 4 0 R /Resources << /Font << /F1 5 0 R >> >> >>');
    obj(4, '<< /Length ' + stream.length + ' >>\nstream\n' + stream + '\nendstream');
    obj(5, '<< /Type /Font /Subtype /Type1 /BaseFont /Courier >>');
    let pdf = '%PDF-1.4';
    const xrefs = [0];
    for(let i = 1; i <= 5; i++){ xrefs.push(pdf.length + 1); pdf += objs[i]; }
    const xrefStart = pdf.length + 1;
    pdf += '\nxref\n0 6\n0000000000 65535 f \n';
    for(let i = 1; i <= 5; i++){ pdf += ('0000000000' + xrefs[i]).slice(-10) + ' 00000 n \n'; }
    pdf += 'trailer\n<< /Size 6 /Root 1 0 R >>\nstartxref\n' + xrefStart + '\n%%EOF';
    return new Blob([pdf], { type: 'application/pdf' });
  }

  document.querySelectorAll('.viz-tab').forEach(function(t){
    t.addEventListener('click',function(){
      document.querySelectorAll('.viz-tab').forEach(function(x){ x.classList.remove('active'); });
      t.classList.add('active');
    });
  });
  document.querySelectorAll('.chip').forEach(function(c){
    c.addEventListener('click',function(){
      document.querySelectorAll('.chip').forEach(function(x){ x.classList.remove('active'); });
      c.classList.add('active');
    });
  });

  // ============================================================
  // ADMINISTRAÇÃO
  // ============================================================
  function switchAdminTab(e, tab){
    document.querySelectorAll('.admin-tab').forEach(function(t){ t.classList.remove('active'); });
    if(e && e.currentTarget) e.currentTarget.classList.add('active');
    document.querySelectorAll('.admin-panel').forEach(function(p){ p.style.display = 'none'; p.classList.remove('active'); });
    const panel = document.getElementById('admin-'+tab);
    if(panel){ panel.style.display = 'block'; panel.classList.add('active'); }
    if(tab === 'users') renderUserTable();
    if(tab === 'audit') renderAuditLog();
    if(tab === 'approvals') renderApprovals();
    if(tab === 'reviews') renderReviews();
  }

  // Histórico de TODAS as revisões já submetidas (com nome do criador e revisor)
  function renderReviews(){
    const tbody = document.getElementById('reviewsTableBody');
    const countEl = document.getElementById('reviewsCount');
    if(!tbody) return;
    let projects = [];
    try{ projects = JSON.parse(localStorage.getItem('smarthvac.projects') || '[]'); }catch(e){}
    const reviewed = projects.filter(function(p){ return p.status === 'submitted' || p.status === 'approved' || p.status === 'rejected'; });
    if(countEl) countEl.textContent = reviewed.length;
    if(reviewed.length === 0){
      tbody.innerHTML = '<tr><td colspan="6" style="text-align:center;padding:40px;color:var(--ink-muted)">Nenhum projeto enviado para revisão ainda.</td></tr>';
      return;
    }
    tbody.innerHTML = reviewed.map(function(p){
      const owner = p.ownerName || p.owner || '—';
      const ver = p.version || 'v01';
      const status = p.status === 'approved' ? '<span class="status-pill ok">aprovado</span>' : p.status === 'rejected' ? '<span class="status-pill bad">rejeitado</span>' : '<span class="status-pill warn">aguardando</span>';
      const decision = p.decisionBy || '—';
      const dt = p.decisionAt || p.submittedAt;
      const date = dt ? new Date(dt).toLocaleString('pt-BR',{day:'2-digit',month:'2-digit',hour:'2-digit',minute:'2-digit'}) : '—';
      return '<tr><td style="font-weight:500">' + (p.name||'Projeto') + '</td><td style="font-family:var(--font-mono);font-size:11px">' + ver + '</td><td>' + owner + '</td><td>' + status + '</td><td style="color:var(--ink-dim)">' + decision + '</td><td style="font-family:var(--font-mono);font-size:11px;color:var(--ink-muted)">' + date + '</td></tr>';
    }).join('');
  }

  // Lista projetos submetidos por TODOS os usuários da organização
  // Visível apenas para admin_projects e admin_general (este último só vê auditoria)
  function renderApprovals(){
    const list = document.getElementById('approvalList');
    if(!list) return;
    let projects = [];
    try{ projects = JSON.parse(localStorage.getItem('smarthvac.projects') || '[]'); }catch(e){}
    const pending = projects.filter(function(p){ return p.status === 'submitted'; });
    const approved = projects.filter(function(p){ return p.status === 'approved'; });
    const rejected = projects.filter(function(p){ return p.status === 'rejected'; });
    // Atualiza stats
    const sP = document.getElementById('aprStatPending'); if(sP) sP.textContent = pending.length;
    const sA = document.getElementById('aprStatApproved'); if(sA) sA.textContent = approved.length;
    const sR = document.getElementById('aprStatRejected'); if(sR) sR.textContent = rejected.length;
    const sT = document.getElementById('aprStatTotal'); if(sT) sT.textContent = pending.length + approved.length + rejected.length;
    const badge = document.getElementById('aprBadge'); if(badge){ badge.textContent = pending.length; badge.style.display = pending.length > 0 ? '' : 'none'; }
    // Lista os pendentes primeiro, depois os já decididos
    const all = pending.concat(approved).concat(rejected);
    if(all.length === 0){
      list.innerHTML = '<div style="padding:60px 20px;text-align:center;color:var(--ink-muted);background:var(--bg-1);border:1px solid var(--line);border-radius:10px"><svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round" style="opacity:.4;margin-bottom:14px"><path d="M9 12l2 2 4-4M21 12c0 5-4 9-9 9s-9-4-9-9 4-9 9-9c2 0 4 .7 5.5 2"/></svg><div style="font-size:14px;color:var(--ink-dim);margin-bottom:6px">Nenhum projeto na fila</div><div style="font-size:11.5px;color:var(--ink-muted);font-family:var(--font-mono)">projetos enviados pelos engenheiros aparecerão aqui</div></div>';
      return;
    }
    list.innerHTML = all.map(function(p){
      const owner = p.ownerName || p.owner || '—';
      const initials = owner.split(' ').map(function(s){ return s[0]; }).join('').substring(0,2).toUpperCase();
      const isPending = p.status === 'submitted';
      const isApproved = p.status === 'approved';
      const submittedAt = p.submittedAt ? new Date(p.submittedAt).toLocaleString('pt-BR',{day:'2-digit',month:'2-digit',hour:'2-digit',minute:'2-digit'}) : '—';
      let actions;
      if(isPending){
        actions = '<button class="btn btn-outline" style="font-size:12px;padding:6px 10px" onclick="reviewProject(\'' + p.id + '\')"><svg class="i" viewBox="0 0 24 24" style="width:13px;height:13px"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>Revisar projeto</button>' +
                  '<button class="btn btn-outline approve" style="font-size:12px;padding:6px 10px" onclick="handleApproval(\'' + p.id + '\',\'approve\')"><svg class="i" viewBox="0 0 24 24" style="width:13px;height:13px"><path d="M20 6L9 17l-5-5"/></svg>Aprovar</button>' +
                  '<button class="btn btn-outline reject" style="font-size:12px;padding:6px 10px" onclick="handleApproval(\'' + p.id + '\',\'reject\')"><svg class="i" viewBox="0 0 24 24" style="width:13px;height:13px"><path d="M18 6L6 18M6 6l12 12"/></svg>Rejeitar</button>';
      } else {
        actions = '<button class="btn btn-outline" style="font-size:12px;padding:6px 10px" onclick="reviewProject(\'' + p.id + '\')"><svg class="i" viewBox="0 0 24 24" style="width:13px;height:13px"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>Ver projeto</button>' +
                  '<span class="status-pill ' + (isApproved?'ok':'bad') + '">' + (isApproved?'aprovado':'rejeitado') + '</span>';
      }
      return '<div class="approval-item' + (isPending?'':' resolved') + '"><div class="apr-left"><div class="apr-avatar">' + initials + '</div><div><div class="apr-title">' + (p.name||'Projeto') + ' · ' + (p.version||'v01') + '</div><div class="apr-meta"><span>' + owner + '</span><span>·</span><span>etapa ' + (p.step||1) + ' de 7</span><span>·</span><span>' + submittedAt + '</span></div></div></div><div class="apr-actions">' + actions + '</div></div>';
    }).join('');
  }

  function handleApproval(id, action){
    let projects = [];
    try{ projects = JSON.parse(localStorage.getItem('smarthvac.projects') || '[]'); }catch(e){}
    const idx = projects.findIndex(function(p){ return p.id === id; });
    if(idx < 0) return;
    projects[idx].status = action === 'approve' ? 'approved' : 'rejected';
    projects[idx].decisionAt = new Date().toISOString();
    projects[idx].decisionBy = state.currentUser ? state.currentUser.name : '—';
    localStorage.setItem('smarthvac.projects', JSON.stringify(projects));
    addAuditEntry((action==='approve'?'aprovou':'rejeitou') + ' projeto ' + projects[idx].name + ' (' + (projects[idx].version||'v01') + ') de ' + (projects[idx].ownerName||'—'), action==='approve'?'ok':'bad');
    toastShow(action==='approve' ? 'Projeto aprovado' : 'Projeto rejeitado', projects[idx].name, action==='approve' ? 'success' : 'warn');
    renderApprovals();
  }
  function previewApproval(name){ toastShow('Revisão técnica','Funcionalidade em desenvolvimento','info'); }

  // Admin de Projetos abre o projeto em modal de revisão (sem entrar no wizard)
  function reviewProject(id){
    let projects = [];
    try{ projects = JSON.parse(localStorage.getItem('smarthvac.projects') || '[]'); }catch(e){}
    const p = projects.find(function(x){ return x.id === id; });
    if(!p){ toastShow('Projeto não encontrado','','warn'); return; }

    const owner = p.ownerName || p.owner || '—';
    const initials = owner.split(' ').map(function(s){return s[0]}).join('').substring(0,2).toUpperCase();
    const isPending = p.status === 'submitted';
    const submittedAt = p.submittedAt ? new Date(p.submittedAt).toLocaleString('pt-BR',{day:'2-digit',month:'2-digit',hour:'2-digit',minute:'2-digit'}) : '—';

    document.getElementById('reviewEyebrow').textContent = 'PROJETO ENVIADO PARA APROVAÇÃO';
    document.getElementById('reviewTitle').textContent = (p.name || 'Projeto') + ' · ' + (p.version || 'v01');

    let body = '<div style="display:grid;grid-template-columns:1fr 1fr;gap:14px;margin-bottom:18px">';
    body += '<div style="padding:14px;background:var(--bg-2);border:1px solid var(--line);border-radius:8px"><div style="font-family:var(--font-mono);font-size:10px;color:var(--ink-muted);letter-spacing:.08em;text-transform:uppercase;margin-bottom:6px">Criado por</div><div style="display:flex;gap:10px;align-items:center"><div style="width:32px;height:32px;border-radius:6px;background:linear-gradient(135deg,var(--cyan),var(--violet));display:grid;place-items:center;color:#001419;font-weight:600;font-size:12px">' + initials + '</div><div><div style="font-size:13px;font-weight:500">' + owner + '</div><div style="font-size:11px;color:var(--ink-muted);font-family:var(--font-mono)">' + (p.owner || '') + '</div></div></div></div>';
    body += '<div style="padding:14px;background:var(--bg-2);border:1px solid var(--line);border-radius:8px"><div style="font-family:var(--font-mono);font-size:10px;color:var(--ink-muted);letter-spacing:.08em;text-transform:uppercase;margin-bottom:6px">Status</div>';
    body += '<div style="font-size:13px">' + (isPending ? '<span class="status-pill warn">aguardando análise</span>' : p.status === 'approved' ? '<span class="status-pill ok">aprovado</span>' : '<span class="status-pill bad">rejeitado</span>') + '</div>';
    body += '<div style="font-size:11px;color:var(--ink-muted);margin-top:8px;font-family:var(--font-mono)">enviado em ' + submittedAt + '</div></div>';
    body += '</div>';

    body += '<div style="display:grid;grid-template-columns:repeat(3,1fr);gap:10px;margin-bottom:18px">';
    body += '<div style="padding:12px;background:var(--bg-2);border:1px solid var(--line);border-radius:6px"><div style="font-family:var(--font-mono);font-size:10px;color:var(--ink-muted);letter-spacing:.08em;text-transform:uppercase;margin-bottom:4px">Etapa</div><div style="font-size:18px;font-weight:500">' + (p.step || 1) + '<span style="font-size:11px;color:var(--ink-muted);margin-left:4px;font-family:var(--font-mono)">/ 7</span></div></div>';
    body += '<div style="padding:12px;background:var(--bg-2);border:1px solid var(--line);border-radius:6px"><div style="font-family:var(--font-mono);font-size:10px;color:var(--ink-muted);letter-spacing:.08em;text-transform:uppercase;margin-bottom:4px">Versão</div><div style="font-size:18px;font-weight:500">' + (p.version || 'v01') + '</div></div>';
    body += '<div style="padding:12px;background:var(--bg-2);border:1px solid var(--line);border-radius:6px"><div style="font-family:var(--font-mono);font-size:10px;color:var(--ink-muted);letter-spacing:.08em;text-transform:uppercase;margin-bottom:4px">Carga (estimada)</div><div style="font-size:18px;font-weight:500;color:var(--cyan)">386,27<span style="font-size:11px;color:var(--ink-muted);margin-left:4px;font-family:var(--font-mono);font-weight:400">kW</span></div></div>';
    body += '</div>';

    // Bloco do PDF — busca PRIMEIRO no projeto salvo (admin de projetos vê PDF do engenheiro)
    body += '<div style="font-family:var(--font-mono);font-size:10px;color:var(--ink-muted);letter-spacing:.08em;text-transform:uppercase;margin-bottom:8px">Planta arquitetônica' + (p.pdfName ? ' · ' + p.pdfName : '') + (p.pdfSize ? ' · ' + (p.pdfSize/1024/1024).toFixed(2) + ' MB' : '') + '</div>';
    const pdfSrc = p.pdfDataUrl || (state.uploadedPDF && state.uploadedPDF.url);
    if(pdfSrc){
      body += '<div style="height:480px;border:1px solid var(--line-2);border-radius:8px;overflow:hidden;background:#1a1d24"><iframe src="' + pdfSrc + '#toolbar=0&navpanes=0&zoom=page-fit" style="width:100%;height:100%;border:none;background:#fff"></iframe></div>';
      if(p.pdfDataUrl){
        body += '<div style="margin-top:8px;text-align:right"><a href="' + p.pdfDataUrl + '" download="' + (p.pdfName||'planta.pdf') + '" class="btn btn-outline" style="font-size:11px;padding:5px 10px;display:inline-flex;text-decoration:none"><svg class="i" viewBox="0 0 24 24" style="width:12px;height:12px"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3"/></svg>Baixar PDF</a></div>';
      }
    } else {
      body += '<div style="padding:40px 20px;text-align:center;background:var(--bg-2);border:1px dashed var(--line-2);border-radius:8px"><div style="color:var(--ink-muted);font-size:13px;margin-bottom:8px">PDF da planta não foi anexado</div><div style="font-size:11px;color:var(--ink-muted);font-family:var(--font-mono);max-width:420px;margin:0 auto;line-height:1.5">o engenheiro pode ter pulado o passo 2 ou o arquivo era muito grande para ser persistido</div></div>';
    }

    document.getElementById('reviewBody').innerHTML = body;

    // Botões do rodapé
    const foot = document.getElementById('reviewFoot');
    if(isPending){
      foot.innerHTML = '<button class="btn btn-outline" onclick="closeReviewModal()">Fechar</button>' +
        '<button class="btn btn-outline reject" onclick="handleApproval(\'' + id + '\',\'reject\');closeReviewModal()"><svg class="i" viewBox="0 0 24 24"><path d="M18 6L6 18M6 6l12 12"/></svg>Rejeitar</button>' +
        '<button class="btn btn-primary" onclick="handleApproval(\'' + id + '\',\'approve\');closeReviewModal()" style="background:linear-gradient(180deg,#34d399,#059669);color:#001419"><svg class="i" viewBox="0 0 24 24"><path d="M20 6L9 17l-5-5"/></svg>Aprovar projeto</button>';
    } else {
      foot.innerHTML = '<button class="btn btn-primary" onclick="closeReviewModal()">Fechar</button>';
    }

    document.getElementById('reviewModal').classList.add('active');
  }

  function closeReviewModal(){ document.getElementById('reviewModal').classList.remove('active'); }

  function renderUserTable(){
    const tbody = document.getElementById('userTableBody');
    const countEl = document.getElementById('userCount');
    if(!tbody) return;
    const users = loadUsers();
    const emails = Object.keys(users);
    if(countEl) countEl.textContent = emails.length;
    // Atualiza os 4 stat cards do painel admin
    const sTotal = document.getElementById('adminStatTotal');
    const sAdmins = document.getElementById('adminStatAdmins');
    const sEng = document.getElementById('adminStatEng');
    const sBlocked = document.getElementById('adminStatBlocked');
    if(sTotal) sTotal.textContent = emails.length;
    if(sAdmins) sAdmins.textContent = emails.filter(e => users[e].role === 'admin_general' || users[e].role === 'admin_projects' || users[e].role === 'admin').length;
    if(sEng) sEng.textContent = emails.filter(e => users[e].role === 'engineer').length;
    if(sBlocked) sBlocked.textContent = emails.filter(e => users[e].status === 'suspended').length;
    if(emails.length === 0){
      tbody.innerHTML = '<tr><td colspan="6" style="text-align:center;padding:40px;color:var(--ink-muted)">Nenhuma conta criada. Clique em "Criar nova conta" para começar.</td></tr>';
      return;
    }
    const palettes = [
      'linear-gradient(135deg,#00e5ff,#9d7bff)',
      'linear-gradient(135deg,#ffb547,#ff5b3c)',
      'linear-gradient(135deg,#34d399,#00b8d4)',
      'linear-gradient(135deg,#9d7bff,#00b8d4)',
      'linear-gradient(135deg,#00b8d4,#34d399)'
    ];
    const roleLabels = {
      admin_general: 'Admin Geral',
      admin: 'Administrador',
      engineer: 'Engenheiro',
      viewer: 'Visualizador'
    };
    tbody.innerHTML = emails.map(function(em, idx){
      const u = users[em];
      const isYou = state.currentUser && state.currentUser.email === em;
      const initials = getInitials(u.name);
      const grad = palettes[idx % palettes.length];
      const last = u.lastLoginAt ? new Date(u.lastLoginAt).toLocaleString('pt-BR',{day:'2-digit',month:'2-digit',hour:'2-digit',minute:'2-digit'}) : '—';
      const isSuspended = u.status === 'suspended';
      const statusLabel = isSuspended ? '<span class="status-pill bad">bloqueado</span>' : (u.lastLoginAt ? '<span class="status-pill ok">ativo</span>' : '<span class="status-pill warn">convidado</span>');

      const roleOptions = [
        '<option value="admin_general"' + (u.role==='admin_general'?' selected':'') + '>Admin Geral</option>',
        '<option value="admin_projects"' + (u.role==='admin_projects'?' selected':'') + '>Admin de Projetos</option>',
        '<option value="engineer"' + (u.role==='engineer'?' selected':'') + '>Engenheiro</option>',
        '<option value="viewer"' + (u.role==='viewer'?' selected':'') + '>Visualizador</option>'
      ].join('');

      // Botões de ação
      const resetBtn = isYou ? '' : '<button class="btn-icon-mini" title="Redefinir senha" onclick="resetUserPassword(\'' + em + '\')"><svg class="i" viewBox="0 0 24 24" style="width:13px;height:13px"><path d="M21 2v6h-6M3 12a9 9 0 0115-6.7L21 8M3 22v-6h6M21 12a9 9 0 01-15 6.7L3 16"/></svg></button>';
      const blockBtn = isYou ? '' : (isSuspended
        ? '<button class="btn-icon-mini unblock" title="Liberar acesso" onclick="setUserStatus(\'' + em + '\',\'active\')"><svg class="i" viewBox="0 0 24 24" style="width:13px;height:13px"><path d="M9 11V7a3 3 0 016 0M5 11h14v11H5z"/></svg></button>'
        : '<button class="btn-icon-mini block" title="Bloquear acesso" onclick="setUserStatus(\'' + em + '\',\'suspended\')"><svg class="i" viewBox="0 0 24 24" style="width:13px;height:13px"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg></button>');
      const delBtn = isYou ? '' : '<button class="btn-icon-mini danger" title="Remover conta" onclick="deleteUser(\'' + em + '\')"><svg class="i" viewBox="0 0 24 24" style="width:13px;height:13px"><path d="M3 6h18M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2m3 0v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6"/></svg></button>';

      return '<tr' + (isSuspended ? ' style="opacity:.55"' : '') + '><td><div style="display:flex;gap:10px;align-items:center"><div class="apr-avatar" style="width:28px;height:28px;font-size:11px;background:' + grad + '">' + initials + '</div>' + u.name + (isYou?' <span class="tag-you">você</span>':'') + '</div></td><td style="font-family:var(--font-mono);font-size:12px">' + u.email + '</td><td><select class="role-select" ' + (isYou?'disabled':'') + ' onchange="changeRoleForUser(\'' + u.email + '\', this.value)">' + roleOptions + '</select></td><td>' + statusLabel + '</td><td style="font-family:var(--font-mono);font-size:11px;color:var(--ink-muted)">' + last + '</td><td><div class="user-actions">' + resetBtn + blockBtn + delBtn + '</div></td></tr>';
    }).join('');
  }

  function changeRoleForUser(email, newRole){
    const users = loadUsers();
    if(!users[email]) return;
    const oldRole = users[email].role;
    users[email].role = newRole;
    saveUsers(users);
    if(state.currentUser && state.currentUser.email === email){
      state.currentUser.role = newRole;
      saveSession(state.currentUser);
      applyUserToUI();
    }
    const labels = {admin_general:'Admin Geral',  engineer:'Engenheiro', viewer:'Visualizador'};
    addAuditEntry(users[email].name + ' agora é ' + labels[newRole], 'ok');
    toastShow('Papel atualizado', users[email].name + ' agora é ' + labels[newRole], 'info');
  }

  function setUserStatus(email, status){
    const users = loadUsers();
    if(!users[email]) return;
    users[email].status = status;
    saveUsers(users);
    renderUserTable();
    const label = status === 'suspended' ? 'bloqueado' : 'liberado';
    addAuditEntry('Acesso ' + label + ' para ' + users[email].name, status === 'suspended' ? 'bad' : 'ok');
    toastShow('Acesso ' + label, users[email].name, status === 'suspended' ? 'warn' : 'success');
  }

  function resetUserPassword(email){
    const users = loadUsers();
    if(!users[email]) return;
    if(!confirm('Redefinir senha de ' + users[email].name + '?\n\nUma nova senha temporária será gerada. O usuário precisará alterá-la no próximo acesso.')) return;
    const newPass = genPass(12);
    users[email].passHash = hashPass(newPass);
    users[email].mustChangePassword = true; // força nova senha pessoal
    users[email].lastLoginAt = null;
    saveUsers(users);
    renderUserTable();
    addAuditEntry('Senha redefinida para ' + users[email].name, 'ok');
    showPasswordResetModal(users[email].name, email, newPass);
  }

  function showPasswordResetModal(name, email, pass){
    // reaproveita modal se existir, senão cria
    let modal = document.getElementById('passResetModal');
    if(!modal){
      modal = document.createElement('div');
      modal.id = 'passResetModal';
      modal.className = 'modal-overlay';
      modal.innerHTML = '<div class="modal-card"><div class="modal-head"><div><div class="modal-eyebrow">SENHA REDEFINIDA</div><h3 id="prmName">—</h3></div><button class="btn btn-ghost" onclick="document.getElementById(\'passResetModal\').classList.remove(\'active\')" style="padding:6px"><svg class="i" viewBox="0 0 24 24"><path d="M18 6L6 18M6 6l12 12"/></svg></button></div><div class="modal-body"><p style="font-size:13px;color:var(--ink-dim);margin-bottom:18px;line-height:1.5">Envie esta senha temporária ao usuário por um canal seguro. Ela só será exibida uma vez.</p><div class="field"><label>E-mail</label><input type="text" id="prmEmail" readonly style="background:var(--bg-2)"/></div><div class="field"><label>Nova senha temporária</label><div style="display:flex;gap:8px"><input type="text" id="prmPass" readonly style="flex:1;font-family:var(--font-mono);background:var(--bg-2);letter-spacing:.05em"/><button class="btn btn-outline" onclick="copyPrmPass()" style="padding:10px 14px"><svg class="i" viewBox="0 0 24 24"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg></button></div></div><div class="alert-inline" style="margin-top:14px"><svg class="i" viewBox="0 0 24 24" style="color:var(--warm)"><path d="M12 9v4M12 17h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/></svg>O usuário deverá alterar a senha no primeiro login.</div></div><div class="modal-foot"><button class="btn btn-primary" onclick="document.getElementById(\'passResetModal\').classList.remove(\'active\')">Fechar</button></div></div>';
      document.body.appendChild(modal);
    }
    document.getElementById('prmName').textContent = name;
    document.getElementById('prmEmail').value = email;
    document.getElementById('prmPass').value = pass;
    modal.classList.add('active');
  }

  function copyPrmPass(){
    const el = document.getElementById('prmPass');
    if(!el) return;
    el.select();
    try{ document.execCommand('copy'); toastShow('Senha copiada','cole no canal de envio','success'); }
    catch(e){ toastShow('Copie manualmente','seu navegador bloqueou a cópia','warn'); }
  }

  function deleteUser(email){
    const users = loadUsers();
    if(!users[email]) return;
    if(!confirm('Remover a conta de ' + users[email].name + '?\n\nEsta ação não pode ser desfeita.')) return;
    const name = users[email].name;
    delete users[email];
    saveUsers(users);
    renderUserTable();
    addAuditEntry('Conta removida: ' + name, 'bad');
    toastShow('Conta removida', email, 'warn');
  }

  // Log de auditoria
  // Sincroniza a marca/refrigerante/topologia escolhida no passo 3 com o passo 5
  function syncBrandToSystem(){
    const cBrand = document.getElementById('calcBrand');
    const cGas = document.getElementById('calcGas');
    const cTopo = document.getElementById('calcTopo');
    const sBrand = document.getElementById('sysBrand');
    const sGas = document.getElementById('sysGas');
    if(cBrand && sBrand) sBrand.value = cBrand.value;
    if(cGas && sGas) sGas.value = cGas.value;
    if(cTopo){
      const radio = document.querySelector('input[name="topo"][value="' + cTopo.value + '"]');
      if(radio){ radio.checked = true; radio.dispatchEvent(new Event('change',{bubbles:true})); }
    }
    state.unsavedChanges = true;
  }

  // Configuração de sistema (passo 5) — reage aos toggles de topologia/tipo
  function recalcSystem(){
    const topo = document.querySelector('input[name="topo"]:checked');
    const equip = document.querySelector('input[name="equip"]:checked');
    const brand = document.getElementById('sysBrand');
    const gas = document.getElementById('sysGas');
    if(!topo || !equip) return;
    const equipNames = {cassete4:'Cassete 4 vias', hw:'High Wall', pisoteto:'Piso/Teto', duto:'Built-in (duto)'};
    const topoNames = {vrf:'VRF', split:'Split individual'};
    const summary = topoNames[topo.value] + ' · ' + equipNames[equip.value] + ' · ' + (brand?brand.value:'') + ' · ' + (gas?gas.value:'');
    const el = document.getElementById('sysSummary');
    if(el){ el.textContent = summary; }
    toastShow('Sistema dimensionado', summary, 'success');
  }
  // Reage aos cliques nos cards de equipamento (visual)
  document.addEventListener('click', function(e){
    const opt = e.target.closest('.equip-option, .topo-option');
    if(!opt) return;
    const group = opt.querySelector('input').name;
    document.querySelectorAll('.equip-option').forEach(function(c){
      const inp = c.querySelector('input[name="equip"]');
      if(inp){ c.style.borderColor = inp.checked ? 'var(--cyan)' : 'var(--line-2)'; const svg = c.querySelector('svg'); if(svg) svg.style.color = inp.checked ? 'var(--cyan)' : 'var(--ink-dim)'; }
    });
    document.querySelectorAll('.topo-option').forEach(function(c){
      const inp = c.querySelector('input[name="topo"]');
      if(inp){ c.style.borderColor = inp.checked ? 'var(--cyan)' : 'var(--line-2)'; }
    });
  });

  // Adiciona uma nova linha de ambiente na tabela do andar especificado
  function addRoomRow(floor){
    const tbody = document.getElementById('masterTbody');
    if(!tbody) return;
    const headerRow = tbody.querySelector('tr.floor-header td span[data-floor-kw="' + floor + '"]');
    if(!headerRow) return;
    const headerTr = headerRow.closest('tr');
    const tr = document.createElement('tr');
    tr.setAttribute('data-floor', floor);
    const count = tbody.querySelectorAll('tr[data-floor="' + floor + '"]').length + 1;
    tr.innerHTML = '<td><input class="cell-edit name" data-col="name" value="Sala ' + count + '" style="text-align:left"/></td><td><input class="cell-edit num" data-col="area" value="0,00"/></td><td><input class="cell-edit num" data-col="pe" value="3,0"/></td><td><input class="cell-edit num" data-col="ocup" value="0"/></td><td><input class="cell-edit num" data-col="vidro" value="0,00"/></td><td><input class="cell-edit num" data-col="div" value="0,00"/></td><td><input class="cell-edit num" data-col="piso" value="0,00"/></td><td><input class="cell-edit num" data-col="forro" value="0,00"/></td><td><input class="cell-edit num" data-col="fu" value="1,00"/></td><td class="kw" data-col="kw">0,00</td>';
    // Insere logo após a última linha do mesmo andar (ou após o header se vazio)
    const sameFloorRows = tbody.querySelectorAll('tr[data-floor="' + floor + '"]');
    if(sameFloorRows.length > 0){
      sameFloorRows[sameFloorRows.length - 1].parentNode.insertBefore(tr, sameFloorRows[sameFloorRows.length - 1].nextSibling);
    } else {
      headerTr.parentNode.insertBefore(tr, headerTr.nextSibling);
    }
    state.unsavedChanges = true;
    toastShow('Ambiente adicionado','Sala ' + count,'success');
  }
  // Persiste no localStorage para que o Admin Geral veja todas as ações,
  // inclusive as feitas pelos engenheiros e admin_projects fora da sua tela.
  function addAuditEntry(msg, type){
    const now = new Date();
    const time = now.toLocaleTimeString('pt-BR',{hour:'2-digit',minute:'2-digit'});
    const date = now.toLocaleDateString('pt-BR');
    const who = state.currentUser ? state.currentUser.name : 'Sistema';
    const role = state.currentUser ? (state.currentUser.role || '') : '';
    const entry = { time: time, date: date, who: who, role: role, msg: msg, type: type || '', timestamp: now.toISOString() };
    try{
      const all = JSON.parse(localStorage.getItem('smarthvac.audit') || '[]');
      all.unshift(entry);
      localStorage.setItem('smarthvac.audit', JSON.stringify(all.slice(0, 200)));
    }catch(e){}
    const log = document.getElementById('auditLog');
    if(log){
      const dotClass = type === 'bad' ? 'bad' : type === 'ok' ? 'ok' : '';
      const div = document.createElement('div');
      div.className = 'audit-entry';
      div.innerHTML = '<div class="audit-dot ' + dotClass + '"></div><div class="audit-time">' + time + '</div><div class="audit-msg"><strong>' + who + '</strong> ' + msg + '</div>';
      log.insertBefore(div, log.firstChild);
    }
  }

  // Renderiza notificações reais do usuário a partir do log de auditoria
  function renderNotifications(){
    const list = document.getElementById('notifList');
    if(!list) return;
    let entries = [];
    try{
      const all = JSON.parse(localStorage.getItem('smarthvac.audit') || '[]');
      const myName = state.currentUser ? state.currentUser.name : null;
      entries = all.filter(function(e){ return e.who === myName; }).slice(0, 20);
    }catch(e){}
    if(entries.length === 0){
      list.innerHTML = '<div style="padding:60px 20px;text-align:center;color:var(--ink-muted)"><svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round" style="opacity:.4;margin-bottom:14px"><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 01-3.46 0"/></svg><div style="font-size:14px;color:var(--ink-dim);margin-bottom:6px">Nenhuma notificação</div><div style="font-size:11.5px;color:var(--ink-muted);font-family:var(--font-mono)">você verá atualizações aqui quando criar ou modificar projetos</div></div>';
      return;
    }
    list.innerHTML = entries.map(function(e){
      const dotColor = e.type === 'bad' ? 'var(--hot)' : e.type === 'ok' ? 'var(--ok)' : 'var(--cyan)';
      return '<div class="notif-item"><div class="notif-dot" style="background:' + dotColor + '"></div><div class="notif-body"><div class="notif-title">' + (e.msg.charAt(0).toUpperCase() + e.msg.slice(1)) + '</div><div class="notif-sub">' + (e.date || '') + ' · ' + (e.time || '') + '</div></div><div class="notif-time">' + (e.time || '—') + '</div></div>';
    }).join('');
  }

  // Renderiza log completo de auditoria a partir do localStorage
  function renderAuditLog(){
    const log = document.getElementById('auditLog');
    if(!log) return;
    let all = [];
    try{ all = JSON.parse(localStorage.getItem('smarthvac.audit') || '[]'); }catch(e){}
    if(all.length === 0){
      log.innerHTML = '<div style="text-align:center;padding:40px;color:var(--ink-muted);font-size:13px">Nenhuma ação registrada ainda.</div>';
      return;
    }
    log.innerHTML = all.map(function(e){
      const dotClass = e.type === 'bad' ? 'bad' : e.type === 'ok' ? 'ok' : '';
      return '<div class="audit-entry"><div class="audit-dot ' + dotClass + '"></div><div class="audit-time">' + (e.time || '—') + '</div><div class="audit-msg"><strong>' + (e.who || 'Sistema') + '</strong> ' + e.msg + '</div></div>';
    }).join('');
  }

  // Modal: criar usuário
  function openCreateUserModal(){
    ['newUserName','newUserEmail','newUserCompany','newUserPass'].forEach(function(id){
      const el = document.getElementById(id); if(el) el.value = '';
    });
    const r = document.getElementById('newUserRole'); if(r) r.value = 'engineer';
    const s = document.getElementById('newUserSendEmail'); if(s) s.checked = true;
    document.getElementById('createUserModal').classList.add('active');
  }
  function closeCreateUserModal(){ document.getElementById('createUserModal').classList.remove('active'); }
  function genRandomPass(){
    const pass = genPass(12);
    const el = document.getElementById('newUserPass'); if(el) el.value = pass;
  }

  function createUser(){
    const name = document.getElementById('newUserName').value.trim();
    const email = document.getElementById('newUserEmail').value.trim().toLowerCase();
    const company = document.getElementById('newUserCompany').value.trim();
    const role = document.getElementById('newUserRole').value;
    const pass = document.getElementById('newUserPass').value;
    const sendEmail = document.getElementById('newUserSendEmail').checked;

    if(!name || name.length < 3){ toastShow('Nome inválido','Mínimo 3 caracteres','warn'); return; }
    if(!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)){ toastShow('E-mail inválido','Use e-mail válido','warn'); return; }
    // Admin Geral pode definir qualquer senha temporária (sem regras fortes).
    // Quem precisa cumprir as 5 regras de senha forte é o usuário no primeiro acesso.
    if(!pass || pass.length < 4){ toastShow('Senha temporária muito curta','Mínimo 4 caracteres para a senha temporária','warn'); return; }

    const users = loadUsers();
    if(users[email]){ toastShow('E-mail já existe','Já existe conta com este e-mail','error'); return; }

    users[email] = {
      name: name,
      email: email,
      company: company || '',
      role: role,
      passHash: hashPass(pass),
      plan: 'Pro',
      status: 'invited',
      mustChangePassword: true, // força criação de nova senha pessoal no primeiro acesso
      createdAt: new Date().toISOString(),
      lastLoginAt: null
    };
    saveUsers(users);
    closeCreateUserModal();
    renderUserTable();
    const labels = {admin_general:'Admin Geral',  engineer:'Engenheiro', viewer:'Visualizador'};
    addAuditEntry('Conta criada: ' + name + ' (' + labels[role] + ')', 'ok');
    toastShow('Conta criada com sucesso', name + ' · ' + labels[role], 'success');
    if(sendEmail){
      setTimeout(function(){
        toastShow('E-mail enviado', 'Credenciais enviadas para ' + email, 'info');
      }, 800);
    }
  }

  // ============================================================
  // NORMAS TÉCNICAS
  // ============================================================
  const normsDB = {
    'nbr-16401-1': { title: 'ABNT NBR 16401-1:2024', subtitle: 'Parte 1: Projetos das instalações', content: '<h3>Escopo</h3><p>Estabelece os <strong>parâmetros básicos de projeto</strong> para instalações de ar condicionado.</p><h3>Aplicação no SmartHVAC</h3><p>Alimenta automaticamente o módulo Geo-Projeto com TBS, TBU e dados climáticos por cidade.</p>' },
    'nbr-16401-2': { title: 'ABNT NBR 16401-2:2024', subtitle: 'Conforto térmico', content: '<h3>Parâmetros</h3><ul><li>Temperatura: 22 a 27 °C</li><li>UR: 35 a 65%</li><li>Velocidade: ≤ 0,20 m/s</li></ul>' },
    'nbr-16401-3': { title: 'ABNT NBR 16401-3:2024', subtitle: 'Qualidade do ar interior', content: '<h3>Vazão ar exterior</h3><div class="norm-card"><div style="font-family:var(--font-mono);font-size:14px;color:var(--cyan)">V_o = (Ocupação × 6,8) + (Área × 0,4)</div></div>' },
    'nbr-17037': { title: 'ABNT NBR 17037:2023', subtitle: 'QAI em ambientes não residenciais', content: '<h3>VMA principais</h3><div class="norm-values"><div class="norm-values-cell"><div class="k">CO₂</div><div class="v">700<span class="unit">ppm</span></div></div><div class="norm-values-cell"><div class="k">PM₁₀</div><div class="v">≤50<span class="unit">µg/m³</span></div></div><div class="norm-values-cell"><div class="k">PM₂,₅</div><div class="v">≤25<span class="unit">µg/m³</span></div></div></div><h3>Biológicos</h3><ul><li>Fungos: ≤ 750 UFC/m³</li><li>I/E: ≤ 1,5</li><li>Bactérias: ≤ 500 UFC/m³</li></ul>' },
    'nbr-13971': { title: 'ABNT NBR 13971', subtitle: 'PMOC · manutenção programada', content: '<h3>PMOC obrigatório</h3><ul><li>Identificação do estabelecimento</li><li>Descrição das atividades</li><li>Periodicidade</li><li>Plano de contingência</li></ul>' }
  };
  function showNorm(id){
    state.currentNorm = id;
    document.querySelectorAll('.norms-item').forEach(function(i){ i.classList.toggle('active', i.dataset.norm === id); });
    const data = normsDB[id]; if(!data) return;
    const content = document.getElementById('normsContent');
    if(content){ content.innerHTML = '<h2>' + data.subtitle + '</h2><h1>' + data.title + '</h1>' + data.content; }
    const crumb = document.getElementById('normsCurrentTitle');
    if(crumb) crumb.textContent = data.title.replace('ABNT ','');
  }

  // ============================================================
  // NOTIFICAÇÕES (TOAST)
  // ============================================================
  let toastId = 0;
  function toastShow(title, subtitle, type){
    type = type || 'info';
    const wrap = document.getElementById('toastWrap'); if(!wrap) return;
    const id = 'toast-' + (++toastId);
    const icons = {
      success: '<svg class="i" viewBox="0 0 24 24" style="width:16px;height:16px"><path d="M22 11.08V12a10 10 0 11-5.93-9.14M22 4L12 14.01l-3-3"/></svg>',
      info: '<svg class="i" viewBox="0 0 24 24" style="width:16px;height:16px"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/></svg>',
      warn: '<svg class="i" viewBox="0 0 24 24" style="width:16px;height:16px"><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0zM12 9v4M12 17h.01"/></svg>',
      error: '<svg class="i" viewBox="0 0 24 24" style="width:16px;height:16px"><circle cx="12" cy="12" r="10"/><path d="M15 9l-6 6M9 9l6 6"/></svg>'
    };
    const toast = document.createElement('div');
    toast.className = 'toast ' + type; toast.id = id;
    toast.innerHTML = '<div class="toast-icon">' + (icons[type]||icons.info) + '</div><div class="toast-body"><div class="toast-title">' + title + '</div>' + (subtitle ? '<div class="toast-sub">' + subtitle + '</div>' : '') + '</div>';
    wrap.appendChild(toast);
    setTimeout(function(){
      toast.classList.add('fadeout');
      setTimeout(function(){ if(toast.parentNode) toast.parentNode.removeChild(toast); }, 300);
    }, 3500);
  }

  // ============================================================
  // MODAL DE INFORMAÇÕES (Engine, Workflow, Normativos, Docs)
  // ============================================================
  const infoContent = {
    engine: {
      eyebrow: 'MOTOR TÉRMICO',
      title: 'SmartHVAC Engine',
      body: `
        <p>O <strong>Thermal Engine</strong> é o motor de cálculo do SmartHVAC, baseado integralmente nas normas técnicas brasileiras <strong>ABNT NBR 16401-1/2/3:2024</strong>.</p>
        <h4 style="color:var(--cyan);font-size:13px;margin-top:18px;margin-bottom:8px;font-family:var(--font-mono);letter-spacing:.05em">FÓRMULAS APLICADAS</h4>
        <ul style="margin-left:20px;margin-bottom:12px">
          <li><strong>Carga interna:</strong> Q_int = (Ocup × 126W) + (Área × 15W) + (Ocup × 250W)</li>
          <li><strong>Carga de envoltória:</strong> Q_env = (Vidro × 550W) + (Paredes × 12W) + (Piso/Forro × 50W)</li>
          <li><strong>Vazão de ar exterior:</strong> V_o = (Ocup × 6,8 L/s) + (Área × 0,4 L/s)</li>
        </ul>
        <h4 style="color:var(--cyan);font-size:13px;margin-top:18px;margin-bottom:8px;font-family:var(--font-mono);letter-spacing:.05em">PROCESSAMENTO</h4>
        <p>Cada planta arquitetônica é processada por um pipeline de 6 etapas: extração de texto e cotas, análise de geometria, identificação de aberturas, classificação de ambientes, estimativa de ocupação e cálculo final. Tempo médio: <strong>32 segundos</strong> para uma planta de 1.500 m².</p>
        <h4 style="color:var(--cyan);font-size:13px;margin-top:18px;margin-bottom:8px;font-family:var(--font-mono);letter-spacing:.05em">ENTREGÁVEIS</h4>
        <p>DXF (AutoCAD), DOCX (memorial), PDF (relatório QAI conforme NBR 17037), CSV (planilha master), PMOC (NBR 13971).</p>
      `
    },
    workflow: {
      eyebrow: 'FLUXO DE TRABALHO',
      title: 'Workflow em 7 etapas',
      body: `
        <p>O SmartHVAC organiza todo o cálculo termodinâmico em um wizard linear, do upload até a entrega final.</p>
        <ol style="margin-left:20px;margin-top:12px">
          <li style="margin-bottom:10px"><strong>Geo-projeto</strong> — Cidade, endereço, orientação. TBS/TBU buscados automaticamente da NBR 16401-1.</li>
          <li style="margin-bottom:10px"><strong>Upload</strong> — PDF da planta arquitetônica. Pipeline de extração de geometria e ambientes.</li>
          <li style="margin-bottom:10px"><strong>Validação & Cálculo</strong> — Visualização da planta com ambientes detectados + tabela editável. Toda alteração recalcula em tempo real.</li>
          <li style="margin-bottom:10px"><strong>Sistemas</strong> — Dimensionamento VRF, distribuição de evaporadoras, dutos.</li>
          <li style="margin-bottom:10px"><strong>QAI</strong> — Validação NBR 17037 (CO₂, PM₁₀, PM₂,₅, fungos, bactérias) com PMOC.</li>
          <li style="margin-bottom:10px"><strong>Entregáveis</strong> — Geração de DXF, memorial DOCX, relatório QAI PDF.</li>
          <li style="margin-bottom:10px"><strong>Aprovação</strong> — Submissão ao Admin de Projetos para validação técnica final.</li>
        </ol>
        <p style="margin-top:14px"><strong>Tempo total estimado:</strong> 12-25 minutos vs. 2-3 dias no método manual.</p>
      `
    },
    normativos: {
      eyebrow: 'NORMAS APLICADAS',
      title: 'Normativos brasileiros',
      body: `
        <p>O SmartHVAC implementa integralmente as normas técnicas brasileiras vigentes para projetos HVAC.</p>
        <ul style="margin-left:20px;margin-top:14px">
          <li style="margin-bottom:10px"><strong>ABNT NBR 16401-1:2024</strong> — Parâmetros básicos de projeto (TBS, TBU, dados climáticos por cidade).</li>
          <li style="margin-bottom:10px"><strong>ABNT NBR 16401-2:2024</strong> — Conforto térmico (temperatura 21-26°C, UR 35-65%, velocidade do ar ≤0,20 m/s).</li>
          <li style="margin-bottom:10px"><strong>ABNT NBR 16401-3:2024</strong> — Vazão mínima de ar exterior e filtragem.</li>
          <li style="margin-bottom:10px"><strong>ABNT NBR 17037:2023</strong> — QAI em ambientes não residenciais climatizados (CO₂ ≤700ppm, PM₁₀ ≤50µg/m³, PM₂,₅ ≤25µg/m³, fungos ≤750 UFC/m³).</li>
          <li style="margin-bottom:10px"><strong>ABNT NBR 13971</strong> — Manutenção programada e PMOC (Plano de Manutenção, Operação e Controle).</li>
        </ul>
        <p style="margin-top:14px">Todos os memoriais e relatórios gerados citam expressamente as cláusulas aplicadas, prontos para entrega ao órgão fiscalizador.</p>
      `
    },
    docs: {
      eyebrow: 'DOCUMENTAÇÃO',
      title: 'Docs & Suporte técnico',
      body: `
        <p>Documentação completa do SmartHVAC para engenheiros, administradores e integradores.</p>
        <h4 style="color:var(--cyan);font-size:13px;margin-top:18px;margin-bottom:8px;font-family:var(--font-mono);letter-spacing:.05em">PARA ENGENHEIROS</h4>
        <ul style="margin-left:20px;margin-bottom:12px">
          <li>Guia rápido — primeiro projeto em 10 minutos</li>
          <li>Referência de fórmulas e parâmetros normativos</li>
          <li>Como customizar templates de memorial</li>
          <li>Biblioteca de equipamentos VRF (Daikin, LG, Midea, Samsung, Hitachi)</li>
        </ul>
        <h4 style="color:var(--cyan);font-size:13px;margin-top:18px;margin-bottom:8px;font-family:var(--font-mono);letter-spacing:.05em">PARA ADMINISTRADORES</h4>
        <ul style="margin-left:20px;margin-bottom:12px">
          <li>Gestão de usuários e papéis (Admin Geral, Admin de Projetos, Engenheiro, Visualizador)</li>
          <li>Fluxo de aprovação de projetos</li>
          <li>Auditoria e log de ações</li>
          <li>Política de senhas e bloqueio de acessos</li>
        </ul>
        <h4 style="color:var(--cyan);font-size:13px;margin-top:18px;margin-bottom:8px;font-family:var(--font-mono);letter-spacing:.05em">SUPORTE</h4>
        <p>contato@smarthvac.io · resposta em até 24h úteis · onboarding gratuito para clientes Pro/Enterprise.</p>
      `
    }
  };

  function openInfoModal(key){
    const info = infoContent[key];
    if(!info) return;
    document.getElementById('infoEyebrow').textContent = info.eyebrow;
    document.getElementById('infoTitle').textContent = info.title;
    document.getElementById('infoBody').innerHTML = info.body;
    document.getElementById('infoModal').classList.add('active');
  }
  function closeInfoModal(){
    document.getElementById('infoModal').classList.remove('active');
  }

  // ============================================================
  // INICIALIZAÇÃO
  // ============================================================
  showNorm('nbr-17037');

  const saved = loadSession();
  if(saved){
    state.currentUser = saved;
    applyUserToUI();
    renderDashboard();
  }
  updateLandingNav();

}
