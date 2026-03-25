!function(e,R){"object"==typeof exports&&"object"==typeof module?module.exports=R():"function"==typeof define&&define.amd?define("dscc",[],R):"object"==typeof exports?exports.dscc=R():e.dscc=R()}(window,function(){return t={},n.m=C={"./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/*! no static exports found */function(e,N,R){"use strict";var i=this&&this.__assign||function(){return(i=Object.assign||function(e){for(var R,C=1,t=arguments.length;C<t;C++)for(var n in R=arguments[C])Object.prototype.hasOwnProperty.call(R,n)&&(e[n]=R[n]);return e}).apply(this,arguments)};Object.defineProperty(N,"__esModule",{value:!0});
/*!
  @license
  Copyright 2019 Google LLC

  Licensed under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License.
  You may obtain a copy of the License at

  https://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software
  distributed under the License is distributed on an "AS IS" BASIS,
  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  See the License for the specific language governing permissions and
  limitations under the License.
*/
var _=R(/*! ./types */"./src/types.ts");!function(e){for(var R in e)N.hasOwnProperty(R)||(N[R]=e[R])}(R(/*! ./types */"./src/types.ts")),N.getWidth=function(){return document.body.clientWidth},N.getHeight=function(){return document.documentElement.clientHeight},N.getComponentId=function(){var e=new URLSearchParams(window.location.search);if(null!==e.get("dscId"))return e.get("dscId");throw new Error("dscId must be in the query parameters. This is a bug in ds-component, please file a bug: https://github.com/googledatastudio/ds-component/issues/new")};function E(e){return e.type===_.ConfigDataElementType.DIMENSION||e.type===_.ConfigDataElementType.METRIC}function r(e){return e===_.ConfigDataElementType.DIMENSION?-1:1}function a(e){var R=[];e.config.data.forEach(function(e){e.elements.filter(E).forEach(function(e){R.push(e)})});var C,t=(C=function(e,R){return r(e.type)-r(R.type)},R.map(function(e,R){return{item:e,index:R}}).sort(function(e,R){return C(e.item,R.item)||e.index-R.index}).map(function(e){return e.item})),n=[];return t.forEach(function(e){e.value.forEach(function(){return n.push(e.id)})}),n}function o(R){return function(e){var C,t,n={};return t=R,((C=e).length<t.length?C.map(function(e,R){return[e,t[R]]}):t.map(function(e,R){return[C[R],e]})).forEach(function(e){var R=e[0],C=e[1];void 0===n[C]&&(n[C]=[]),n[C].push(R)},{}),n}}N.fieldsByConfigId=function(e){var R=e.fields.reduce(function(e,R){return e[R.id]=R,e},{}),C={};return e.config.data.forEach(function(e){e.elements.filter(E).forEach(function(e){C[e.id]=e.value.map(function(e){return R[e]})})}),C};function U(e){var R={};return(e.config.style||[]).forEach(function(e){e.elements.forEach(function(e){if(void 0!==R[e.id])throw new Error("styleIds must be unique. Your styleId: '"+e.id+"' is used more than once.");R[e.id]={value:e.value,defaultValue:e.defaultValue}})},{}),R}function Y(e){return e.config.themeStyle}function n(e){switch(e){case _.DSInteractionType.FILTER:return _.InteractionType.FILTER}}function s(e){var R=e.config.interactions;return void 0===R?{}:R.reduce(function(e,R){var C=R.supportedActions.map(n),t={type:n(R.value.type),data:R.value.data};return e[R.id]={value:t,supportedActions:C},e},{})}N.tableTransform=function(e){return{tables:(R=e,t=N.fieldsByConfigId(R),n=a(R),E={},r=n.map(function(e){void 0===E[e]?E[e]=0:E[e]++;var R=E[e],C=t[e][R];return i(i({},C),{configId:e})}),(C={})[_.TableType.DEFAULT]={headers:[],rows:[]},o=C,R.dataResponse.tables.forEach(function(e){o[e.id]={headers:r,rows:e.rows}}),o),fields:N.fieldsByConfigId(e),style:U(e),theme:Y(e),interactions:s(e)};var R,C,t,n,E,r,o},N.objectTransform=function(e){return{tables:(t=a(R=e),(C={})[_.TableType.DEFAULT]=[],n=C,R.dataResponse.tables.forEach(function(e){var R=e.rows.map(o(t));e.id===_.TableType.DEFAULT?n[e.id]=R:(void 0===n[e.id]&&(n[e.id]=[]),n[e.id]=n[e.id].concat(R))}),n),fields:N.fieldsByConfigId(e),style:U(e),theme:Y(e),interactions:s(e)};var R,C,t,n};function u(e){var R,C=!1;return e===N.tableTransform||e===N.objectTransform?C=!0:(R=!1,"identity"===e("identity")&&(R=!0,console.warn("This is an unsupported data format. Please use one of the supported transforms:\n       dscc.objectFormat or dscc.tableFormat.")),R&&(C=!0)),C}N.subscribeToData=function(R,C){if(u(C.transform)){var e=function(e){e.data.type===_.MessageType.RENDER?R(C.transform(e.data)):console.error("MessageType: "+e.data.type+" is not supported by this version of the library.")};window.addEventListener("message",e);var t={componentId:N.getComponentId(),type:_.ToDSMessageType.VIZ_READY};return window.parent.postMessage(t,"*"),function(){return window.removeEventListener("message",e)}}throw new Error("Only the built in transform functions are supported.")},N.sendInteraction=function(e,R,C){var t=N.getComponentId(),n={type:_.ToDSMessageType.INTERACTION,id:e,data:C,componentId:t};window.parent.postMessage(n,"*")},N.clearInteraction=function(e,R){N.sendInteraction(e,R,void 0)}},"./src/types.ts":
/*!**********************!*\
  !*** ./src/types.ts ***!
  \**********************/
/*! no static exports found */function(e,R,C){"use strict";var t,n,E,r,o,N;Object.defineProperty(R,"__esModule",{value:!0}),(t=R.ConceptType||(R.ConceptType={})).METRIC="METRIC",t.DIMENSION="DIMENSION",(R.MessageType||(R.MessageType={})).RENDER="RENDER",(n=R.FieldType||(R.FieldType={})).YEAR="YEAR",n.YEAR_QUARTER="YEAR_QUARTER",n.YEAR_MONTH="YEAR_MONTH",n.YEAR_WEEK="YEAR_WEEK",n.YEAR_MONTH_DAY="YEAR_MONTH_DAY",n.YEAR_MONTH_DAY_HOUR="YEAR_MONTH_DAY_HOUR",n.QUARTER="QUARTER",n.MONTH="MONTH",n.WEEK="WEEK",n.MONTH_DAY="MONTH_DAY",n.DAY_OF_WEEK="DAY_OF_WEEK",n.DAY="DAY",n.HOUR="HOUR",n.MINUTE="MINUTE",n.DURATION="DURATION",n.COUNTRY="COUNTRY",n.COUNTRY_CODE="COUNTRY_CODE",n.CONTINENT="CONTINENT",n.CONTINENT_CODE="CONTINENT_CODE",n.SUB_CONTINENT="SUB_CONTINENT",n.SUB_CONTINENT_CODE="SUB_CONTINENT_CODE",n.REGION="REGION",n.REGION_CODE="REGION_CODE",n.CITY="CITY",n.CITY_CODE="CITY_CODE",n.METRO_CODE="METRO_CODE",n.LATITUDE_LONGITUDE="LATITUDE_LONGITUDE",n.NUMBER="NUMBER",n.PERCENT="PERCENT",n.TEXT="TEXT",n.BOOLEAN="BOOLEAN",n.URL="URL",n.IMAGE="IMAGE",n.CURRENCY_AED="CURRENCY_AED",n.CURRENCY_ALL="CURRENCY_ALL",n.CURRENCY_ARS="CURRENCY_ARS",n.CURRENCY_AUD="CURRENCY_AUD",n.CURRENCY_BDT="CURRENCY_BDT",n.CURRENCY_BGN="CURRENCY_BGN",n.CURRENCY_BOB="CURRENCY_BOB",n.CURRENCY_BRL="CURRENCY_BRL",n.CURRENCY_CAD="CURRENCY_CAD",n.CURRENCY_CDF="CURRENCY_CDF",n.CURRENCY_CHF="CURRENCY_CHF",n.CURRENCY_CLP="CURRENCY_CLP",n.CURRENCY_CNY="CURRENCY_CNY",n.CURRENCY_COP="CURRENCY_COP",n.CURRENCY_CRC="CURRENCY_CRC",n.CURRENCY_CZK="CURRENCY_CZK",n.CURRENCY_DKK="CURRENCY_DKK",n.CURRENCY_DOP="CURRENCY_DOP",n.CURRENCY_EGP="CURRENCY_EGP",n.CURRENCY_ETB="CURRENCY_ETB",n.CURRENCY_EUR="CURRENCY_EUR",n.CURRENCY_GBP="CURRENCY_GBP",n.CURRENCY_HKD="CURRENCY_HKD",n.CURRENCY_HRK="CURRENCY_HRK",n.CURRENCY_HUF="CURRENCY_HUF",n.CURRENCY_IDR="CURRENCY_IDR",n.CURRENCY_ILS="CURRENCY_ILS",n.CURRENCY_INR="CURRENCY_INR",n.CURRENCY_IRR="CURRENCY_IRR",n.CURRENCY_ISK="CURRENCY_ISK",n.CURRENCY_JMD="CURRENCY_JMD",n.CURRENCY_JPY="CURRENCY_JPY",n.CURRENCY_KRW="CURRENCY_KRW",n.CURRENCY_LKR="CURRENCY_LKR",n.CURRENCY_LTL="CURRENCY_LTL",n.CURRENCY_MNT="CURRENCY_MNT",n.CURRENCY_MVR="CURRENCY_MVR",n.CURRENCY_MXN="CURRENCY_MXN",n.CURRENCY_MYR="CURRENCY_MYR",n.CURRENCY_NOK="CURRENCY_NOK",n.CURRENCY_NZD="CURRENCY_NZD",n.CURRENCY_PAB="CURRENCY_PAB",n.CURRENCY_PEN="CURRENCY_PEN",n.CURRENCY_PHP="CURRENCY_PHP",n.CURRENCY_PKR="CURRENCY_PKR",n.CURRENCY_PLN="CURRENCY_PLN",n.CURRENCY_RON="CURRENCY_RON",n.CURRENCY_RSD="CURRENCY_RSD",n.CURRENCY_RUB="CURRENCY_RUB",n.CURRENCY_SAR="CURRENCY_SAR",n.CURRENCY_SEK="CURRENCY_SEK",n.CURRENCY_SGD="CURRENCY_SGD",n.CURRENCY_THB="CURRENCY_THB",n.CURRENCY_TRY="CURRENCY_TRY",n.CURRENCY_TWD="CURRENCY_TWD",n.CURRENCY_TZS="CURRENCY_TZS",n.CURRENCY_UAH="CURRENCY_UAH",n.CURRENCY_USD="CURRENCY_USD",n.CURRENCY_UYU="CURRENCY_UYU",n.CURRENCY_VEF="CURRENCY_VEF",n.CURRENCY_VND="CURRENCY_VND",n.CURRENCY_YER="CURRENCY_YER",n.CURRENCY_ZAR="CURRENCY_ZAR",(E=R.TableType||(R.TableType={})).DEFAULT="DEFAULT",E.COMPARISON="COMPARISON",E.SUMMARY="SUMMARY",(r=R.ConfigDataElementType||(R.ConfigDataElementType={})).METRIC="METRIC",r.DIMENSION="DIMENSION",r.MAX_RESULTS="MAX_RESULTS",(o=R.ConfigStyleElementType||(R.ConfigStyleElementType={})).TEXTINPUT="TEXTINPUT",o.SELECT_SINGLE="SELECT_SINGLE",o.CHECKBOX="CHECKBOX",o.FONT_COLOR="FONT_COLOR",o.FONT_SIZE="FONT_SIZE",o.FONT_FAMILY="FONT_FAMILY",o.FILL_COLOR="FILL_COLOR",o.BORDER_COLOR="BORDER_COLOR",o.AXIS_COLOR="AXIS_COLOR",o.GRID_COLOR="GRID_COLOR",o.OPACITY="OPACITY",o.LINE_WEIGHT="LINE_WEIGHT",o.LINE_STYLE="LINE_STYLE",o.BORDER_RADIUS="BORDER_RADIUS",o.INTERVAL="INTERVAL",o.SELECT_RADIO="SELECT_RADIO",(R.DSInteractionType||(R.DSInteractionType={})).FILTER="FILTER",(N=R.ToDSMessageType||(R.ToDSMessageType={})).VIZ_READY="vizReady",N.INTERACTION="vizAction",(R.InteractionType||(R.InteractionType={})).FILTER="FILTER"}},n.c=t,n.d=function(e,R,C){n.o(e,R)||Object.defineProperty(e,R,{enumerable:!0,get:C})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(R,e){if(1&e&&(R=n(R)),8&e)return R;if(4&e&&"object"==typeof R&&R&&R.__esModule)return R;var C=Object.create(null);if(n.r(C),Object.defineProperty(C,"default",{enumerable:!0,value:R}),2&e&&"string"!=typeof R)for(var t in R)n.d(C,t,function(e){return R[e]}.bind(null,t));return C},n.n=function(e){var R=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(R,"a",R),R},n.o=function(e,R){return Object.prototype.hasOwnProperty.call(e,R)},n.p="",n(n.s="./src/index.ts");function n(e){if(t[e])return t[e].exports;var R=t[e]={i:e,l:!1,exports:{}};return C[e].call(R.exports,R,R.exports,n),R.l=!0,R.exports}var C,t});
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

  // Los IDs deben coincidir con viz-codelab.json
  var metricFields = data.fields['tableMetric'];
  var dimFields    = data.fields['tableDimension'];

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
      var key = String(row['tableDimension'] !== null && row['tableDimension'] !== undefined ? row['tableDimension'] : 'Sin valor');
      var val = parseFloat(row['tableMetric']);
      if (!isNaN(val)) {
        if (!map[key]) map[key] = [];
        map[key].push(val);
      }
    });
    groups = Object.keys(map)
      .sort(function(a, b) { return a.localeCompare(b, 'es'); })
      .map(function(name) { return { name: name, stats: calculateQuartiles(map[name]) }; });
  } else {
    var values = rows.map(function(row) { return parseFloat(row['tableMetric']); }).filter(function(v) { return !isNaN(v); });
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