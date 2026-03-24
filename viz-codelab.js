// ─── Cálculo de cuartiles (método de interpolación lineal) ──────────────────
function calculateQuartiles(values) {
  if (!values || values.length === 0) {
    return { min: 0, whiskerMin: 0, q1: 0, q2: 0, q3: 0, whiskerMax: 0, max: 0, mean: 0, count: 0, iqr: 0, outliers: [] };
  }

  const sorted = [...values].sort((a, b) => a - b);
  const n = sorted.length;

  function percentile(arr, p) {
    const idx = (arr.length - 1) * p;
    const lo  = Math.floor(idx);
    const hi  = Math.min(lo + 1, arr.length - 1);
    return arr[lo] + (idx - lo) * (arr[hi] - arr[lo]);
  }

  const q1   = percentile(sorted, 0.25);
  const q2   = percentile(sorted, 0.50);
  const q3   = percentile(sorted, 0.75);
  const iqr  = q3 - q1;
  const mean = sorted.reduce((s, v) => s + v, 0) / n;

  // Bigotes según regla de Tukey (1.5 × IQR)
  const lFence = q1 - 1.5 * iqr;
  const uFence = q3 + 1.5 * iqr;
  const whiskerMin = sorted.find(v => v >= lFence)           ?? sorted[0];
  const whiskerMax = [...sorted].reverse().find(v => v <= uFence) ?? sorted[n - 1];
  const outliers   = sorted.filter(v => v < lFence || v > uFence);

  return { min: sorted[0], whiskerMin, q1, q2, q3, whiskerMax, max: sorted[n - 1], mean, count: n, iqr, outliers };
}

// ─── Helpers ─────────────────────────────────────────────────────────────────
function formatNumber(val) {
  if (val === null || val === undefined || isNaN(val)) return '-';
  const abs = Math.abs(val);
  if (abs >= 1e9) return (val / 1e9).toFixed(2) + 'B';
  if (abs >= 1e6) return (val / 1e6).toFixed(2) + 'M';
  if (abs >= 1e3) return (val / 1e3).toFixed(2) + 'K';
  return Number(val).toLocaleString('es-CO', { minimumFractionDigits: 0, maximumFractionDigits: 2 });
}

function svgEl(tag, attrs, text) {
  const el = document.createElementNS('http://www.w3.org/2000/svg', tag);
  Object.entries(attrs).forEach(([k, v]) => el.setAttribute(k, String(v)));
  if (text !== undefined) el.textContent = text;
  return el;
}

// ─── Colores por grupo ────────────────────────────────────────────────────────
var PALETTE = ['#4285f4', '#34a853', '#ea4335', '#a142f4', '#24c1e0', '#f29900'];

// ─── Dibujar boxplot SVG ──────────────────────────────────────────────────────
function drawBoxplot(container, groups, metricName) {
  var margin = { top: 50, right: 20, bottom: 65, left: 75 };
  var totalW = Math.max(container.clientWidth || 640, 300);
  var totalH = 340;
  var W = totalW - margin.left - margin.right;
  var H = totalH - margin.top - margin.bottom;

  var svg = svgEl('svg', { width: totalW, height: totalH });
  var g   = svgEl('g',   { transform: 'translate(' + margin.left + ',' + margin.top + ')' });
  svg.appendChild(g);

  // Dominio Y
  var allNums   = groups.flatMap(function(gr) { return [gr.stats.min, gr.stats.max]; });
  var yMin      = Math.min.apply(null, allNums);
  var yMax      = Math.max.apply(null, allNums);
  var pad       = (yMax - yMin) * 0.12 || 1;
  var domainMin = yMin - pad;
  var domainMax = yMax + pad;

  function yScale(v) { return H - ((v - domainMin) / (domainMax - domainMin)) * H; }

  // Dominio X
  var n    = groups.length;
  var slotW = W / n;
  var boxW  = Math.min(54, slotW * 0.45);
  function xCenter(i) { return slotW * i + slotW / 2; }

  // Grilla + etiquetas eje Y
  var TICKS = 6;
  for (var t = 0; t <= TICKS; t++) {
    var val = domainMin + ((domainMax - domainMin) / TICKS) * t;
    var y   = yScale(val);
    g.appendChild(svgEl('line', { x1: 0, x2: W, y1: y, y2: y, stroke: '#e0e0e0', 'stroke-width': 1 }));
    g.appendChild(svgEl('text', { x: -6, y: y + 4, 'text-anchor': 'end', 'font-size': 11, fill: '#555' }, formatNumber(val)));
  }

  // Ejes
  g.appendChild(svgEl('line', { x1: 0, y1: 0,  x2: 0, y2: H, stroke: '#bbb', 'stroke-width': 1 }));
  g.appendChild(svgEl('line', { x1: 0, y1: H,  x2: W, y2: H, stroke: '#bbb', 'stroke-width': 1 }));

  // Etiqueta eje Y
  var yLbl = svgEl('text', {
    transform: 'rotate(-90)', x: -(H / 2), y: -58,
    'text-anchor': 'middle', 'font-size': 12, fill: '#333'
  }, metricName);
  g.appendChild(yLbl);

  // Dibujar cada caja
  groups.forEach(function(group, i) {
    var cx    = xCenter(i);
    var s     = group.stats;
    var color = PALETTE[i % PALETTE.length];
    var hw    = boxW / 2;

    // Bigote inferior (línea punteada)
    g.appendChild(svgEl('line', { x1: cx, y1: yScale(s.whiskerMin), x2: cx, y2: yScale(s.q1),
      stroke: color, 'stroke-width': 1.5, 'stroke-dasharray': '4 2' }));
    // Cap inferior
    g.appendChild(svgEl('line', { x1: cx - hw * 0.6, y1: yScale(s.whiskerMin), x2: cx + hw * 0.6, y2: yScale(s.whiskerMin),
      stroke: color, 'stroke-width': 2 }));

    // Bigote superior
    g.appendChild(svgEl('line', { x1: cx, y1: yScale(s.q3), x2: cx, y2: yScale(s.whiskerMax),
      stroke: color, 'stroke-width': 1.5, 'stroke-dasharray': '4 2' }));
    // Cap superior
    g.appendChild(svgEl('line', { x1: cx - hw * 0.6, y1: yScale(s.whiskerMax), x2: cx + hw * 0.6, y2: yScale(s.whiskerMax),
      stroke: color, 'stroke-width': 2 }));

    // Caja IQR (Q1 – Q3)
    var boxTop = yScale(s.q3);
    var boxHgt = Math.abs(yScale(s.q1) - yScale(s.q3));
    g.appendChild(svgEl('rect', { x: cx - hw, y: boxTop, width: boxW, height: boxHgt,
      fill: color, 'fill-opacity': 0.22, stroke: color, 'stroke-width': 2 }));

    // Línea mediana (Q2)
    g.appendChild(svgEl('line', { x1: cx - hw, y1: yScale(s.q2), x2: cx + hw, y2: yScale(s.q2),
      stroke: color, 'stroke-width': 3 }));

    // Símbolo media (×)
    g.appendChild(svgEl('text', {
      x: cx, y: yScale(s.mean) + 5,
      'text-anchor': 'middle', 'font-size': 14, fill: '#ff6d00', 'font-weight': 'bold'
    }, '×'));

    // Valores atípicos
    s.outliers.forEach(function(ov) {
      g.appendChild(svgEl('circle', { cx: cx, cy: yScale(ov), r: 3.5,
        fill: '#fbbc04', 'fill-opacity': 0.9, stroke: '#555', 'stroke-width': 0.5 }));
    });

    // Etiqueta X (nombre grupo)
    var label = group.name.length > 16 ? group.name.slice(0, 15) + '…' : group.name;
    g.appendChild(svgEl('text', { x: cx, y: H + 20, 'text-anchor': 'middle', 'font-size': 11, fill: '#333' }, label));
    g.appendChild(svgEl('text', { x: cx, y: H + 34, 'text-anchor': 'middle', 'font-size': 9.5, fill: '#888' }, 'n = ' + s.count));
  });

  // Leyenda de elementos del boxplot (esquina superior izquierda)
  var leg = [
    { color: '#6b6b6b', label: '— Mediana (Q2)' },
    { color: '#ff6d00', label: '× Media' },
    { color: '#6b6b6b', label: '▪ Caja Q1–Q3' },
    { color: '#fbbc04', label: '● Valor atípico' },
    { color: '#6b6b6b', label: '╌ Bigote 1.5×IQR' },
  ];
  var legG = svgEl('g', { transform: 'translate(0,' + (-margin.top + 4) + ')' });
  var colW = Math.floor(W / leg.length);
  leg.forEach(function(item, li) {
    legG.appendChild(svgEl('text', {
      x: li * colW + 4, y: 12,
      'font-size': 9.5, fill: item.color
    }, item.label));
  });
  g.appendChild(legG);

  container.appendChild(svg);
}

// ─── Dibujar tabla resumen ────────────────────────────────────────────────────
function drawTable(container, groups) {
  var wrap = document.createElement('div');
  wrap.className = 'table-wrapper';

  var titleEl = document.createElement('div');
  titleEl.className = 'table-title';
  titleEl.textContent = 'Estadísticas de cuartiles';
  wrap.appendChild(titleEl);

  var tbl    = document.createElement('table');
  var headers = ['Grupo', 'N', 'Mín', 'Q1 (25%)', 'Mediana (Q2)', 'Q3 (75%)', 'Máx', 'IQR', 'Media', 'Atípicos'];

  var thead = document.createElement('thead');
  var hrow  = document.createElement('tr');
  headers.forEach(function(h) {
    var th = document.createElement('th');
    th.textContent = h;
    hrow.appendChild(th);
  });
  thead.appendChild(hrow);
  tbl.appendChild(thead);

  var tbody = document.createElement('tbody');
  groups.forEach(function(group, idx) {
    var s  = group.stats;
    var tr = document.createElement('tr');
    tr.className = idx % 2 === 0 ? 'row-even' : 'row-odd';

    var cells = [
      group.name,
      s.count.toLocaleString('es-CO'),
      formatNumber(s.min),
      formatNumber(s.q1),
      formatNumber(s.q2),
      formatNumber(s.q3),
      formatNumber(s.max),
      formatNumber(s.iqr),
      formatNumber(s.mean),
      s.outliers.length
    ];

    cells.forEach(function(val, ci) {
      var td = document.createElement('td');
      td.textContent = val;
      if (ci === 0) td.className = 'col-label';
      tr.appendChild(td);
    });
    tbody.appendChild(tr);
  });
  tbl.appendChild(tbody);
  wrap.appendChild(tbl);
  container.appendChild(wrap);
}

// ─── Función principal ────────────────────────────────────────────────────────
function drawViz(data) {
  // Limpiar / crear contenedor
  var container = document.getElementById('container');
  if (container) {
    container.innerHTML = '';
  } else {
    container = document.createElement('div');
    container.id = 'container';
    document.body.appendChild(container);
  }

  var rows = data.tables.DEFAULT;

  // Sin datos
  if (!rows || rows.length === 0) {
    var emptyMsg = document.createElement('div');
    emptyMsg.className = 'empty-msg';
    emptyMsg.textContent = 'Sin datos. Verifica la fuente o los filtros aplicados.';
    container.appendChild(emptyMsg);
    return;
  }

  // Los IDs "metrica" y "dimension" deben coincidir con viz-codelab.json
  var metricFields = data.fields['metrica'];
  var dimFields    = data.fields['dimension'];

  if (!metricFields || metricFields.length === 0) {
    var noMetric = document.createElement('div');
    noMetric.className = 'empty-msg';
    noMetric.textContent = 'Agrega al menos una métrica numérica al componente de visualización.';
    container.appendChild(noMetric);
    return;
  }

  var metricName = metricFields[0].name;
  var dimName    = (dimFields && dimFields.length > 0) ? dimFields[0].name : null;

  // Agrupar filas por dimensión (o grupo único)
  var groups;
  if (dimName) {
    var map = {};
    rows.forEach(function(row) {
      var key = String(row['dimension'] !== null && row['dimension'] !== undefined ? row['dimension'] : 'Sin valor');
      var val = parseFloat(row['metrica']);
      if (!isNaN(val)) {
        if (!map[key]) map[key] = [];
        map[key].push(val);
      }
    });
    groups = Object.keys(map)
      .sort(function(a, b) { return a.localeCompare(b, 'es'); })
      .map(function(name) { return { name: name, stats: calculateQuartiles(map[name]) }; });
  } else {
    var values = rows.map(function(row) { return parseFloat(row['metrica']); }).filter(function(v) { return !isNaN(v); });
    groups = [{ name: metricName, stats: calculateQuartiles(values) }];
  }

  if (groups.length === 0 || groups.every(function(g) { return g.stats.count === 0; })) {
    var noData = document.createElement('div');
    noData.className = 'empty-msg';
    noData.textContent = 'No se encontraron valores numéricos válidos en la métrica seleccionada.';
    container.appendChild(noData);
    return;
  }

  // Título
  var titleEl = document.createElement('div');
  titleEl.className = 'viz-title';
  titleEl.textContent = dimName
    ? 'Cuartiles de ' + metricName + ' por ' + dimName
    : 'Distribución y cuartiles: ' + metricName;
  container.appendChild(titleEl);

  // Gráfico boxplot
  var chartArea = document.createElement('div');
  chartArea.className = 'chart-area';
  container.appendChild(chartArea);
  drawBoxplot(chartArea, groups, metricName);

  // Tabla estadística
  var tableArea = document.createElement('div');
  tableArea.className = 'table-area';
  container.appendChild(tableArea);
  drawTable(tableArea, groups);
}

// Suscribirse a datos y cambios de filtro de Looker Studio
dscc.subscribeToData(drawViz, { transform: dscc.tableTransform });