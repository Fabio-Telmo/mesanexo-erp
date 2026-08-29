import { useEffect, useMemo, useState } from 'react'
import {
  AlertTriangle, Archive, ArrowDownRight, ArrowLeftRight, ArrowUpRight, BadgeDollarSign,
  Banknote, Bell, BookOpenCheck, Boxes, Building2, CalendarDays, Check,
  ChefHat, ChevronDown, ChevronRight, CircleDollarSign, ClipboardList,
  Clock3, Command, CreditCard, Download, FileBarChart, Filter, HandCoins,
  LayoutDashboard, LayoutGrid, LockKeyhole, LogOut, Menu, Minus, PackageCheck, PackagePlus,
  PanelLeftClose, Plus, ReceiptText, Search, Settings, ShieldCheck, ShoppingBag, ShoppingCart,
  SlidersHorizontal, Sparkles, Store, Tags, Trash2, TrendingUp, Truck, UserRoundCog, Users,
  UtensilsCrossed, WalletCards, Warehouse, X, Zap,
} from 'lucide-react'
import { demoUser, initialStore } from './demoData.js'

const NAV_SECTIONS = [
  {
    title: 'Visão e operação',
    items: [
      ['dashboard', 'Visão geral', LayoutDashboard], ['tables', 'Mesas e comandas', LayoutGrid],
      ['pos', 'PDV', ShoppingCart], ['orders', 'Pedidos', ShoppingBag], ['kitchen', 'Cozinha', ChefHat],
    ],
  },
  {
    title: 'Cardápio e estoque',
    items: [
      ['menu', 'Cardápio', BookOpenCheck], ['products', 'Produtos', Tags], ['ingredients', 'Ingredientes', Boxes],
      ['recipes', 'Fichas técnicas', ClipboardList], ['inventory', 'Estoque', Warehouse],
      ['suppliers', 'Fornecedores', Truck], ['purchases', 'Compras', PackagePlus],
    ],
  },
  {
    title: 'Gestão',
    items: [
      ['cash', 'Caixa', Banknote], ['financial', 'Financeiro', WalletCards], ['customers', 'Clientes', Users],
      ['reports', 'Relatórios', FileBarChart], ['users', 'Usuários', UserRoundCog], ['settings', 'Configurações', Settings],
    ],
  },
]

const PAGE_META = {
  dashboard: ['Visão geral', 'Acompanhe a operação do restaurante em tempo real'],
  tables: ['Mesas e comandas', 'Controle ocupação, consumo e movimentação das mesas'],
  pos: ['Ponto de venda', 'Registre vendas no salão, balcão ou retirada'],
  orders: ['Pedidos', 'Acompanhe todos os pedidos e seus status'],
  kitchen: ['Tela da cozinha', 'Organize a produção por etapa e tempo de espera'],
  menu: ['Cardápio', 'Visualize categorias, preços e disponibilidade'],
  products: ['Produtos', 'Gerencie itens, custos, margens e variações'],
  ingredients: ['Ingredientes', 'Controle insumos, validade e custo médio'],
  recipes: ['Fichas técnicas', 'Relacione ingredientes e calcule custos automaticamente'],
  inventory: ['Estoque', 'Acompanhe saldos, perdas, inventários e alertas'],
  suppliers: ['Fornecedores', 'Centralize contatos e condições comerciais'],
  purchases: ['Compras', 'Crie pedidos e registre o recebimento de mercadorias'],
  cash: ['Caixa', 'Confira vendas, retiradas, suprimentos e saldo'],
  financial: ['Financeiro', 'Analise receitas, despesas e fluxo de caixa'],
  customers: ['Clientes', 'Conheça frequência, preferências e histórico de consumo'],
  reports: ['Relatórios', 'Transforme dados operacionais em decisões'],
  users: ['Login e usuários', 'Controle acesso, cargos e níveis de permissão'],
  settings: ['Configurações', 'Personalize os dados e as regras do restaurante'],
}

const money = (value) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value)
const statusLabel = (value) => ({ novo: 'Novo', preparando: 'Preparando', pronto: 'Pronto', entregue: 'Entregue', ocupada: 'Ocupada', livre: 'Livre', reservada: 'Reservada', ativo: 'Ativo', aguardando: 'Aguardando', recebido: 'Recebido' }[value] || value)

function useLocalState(key, fallback) {
  const [value, setValue] = useState(() => {
    try { return JSON.parse(localStorage.getItem(key)) || fallback } catch { return fallback }
  })
  useEffect(() => { localStorage.setItem(key, JSON.stringify(value)) }, [key, value])
  return [value, setValue]
}

function Login({ onLogin }) {
  const [email, setEmail] = useState('admin@demo.mesanexo.local')
  const [password, setPassword] = useState('demo123')
  const [visible, setVisible] = useState(false)
  const submit = (event) => {
    event.preventDefault()
    if (email && password) onLogin({ ...demoUser, email })
  }

  return <div className="login-page">
    <section className="login-showcase">
      <div className="login-brand"><span><Command size={22}/></span><b>Mesa<strong>Nexo</strong></b></div>
      <div className="login-copy">
        <span className="eyebrow"><Sparkles size={14}/> Gestão inteligente para restaurantes</span>
        <h1>Todo o restaurante.<br/><em>Um só lugar.</em></h1>
        <p>Vendas, salão, cozinha, estoque e financeiro conectados em uma operação simples e precisa.</p>
        <div className="login-stats"><div><strong>+18%</strong><span>eficiência operacional</span></div><div><strong>4,9/5</strong><span>satisfação da equipe</span></div></div>
      </div>
      <div className="login-ambient"><i/><i/><i/></div>
      <small>© 2026 MesaNexo Sistemas</small>
    </section>
    <section className="login-panel">
      <form onSubmit={submit}>
        <div className="mobile-login-brand"><Command size={20}/> MesaNexo</div>
        <span className="secure"><ShieldCheck size={15}/> Ambiente seguro</span>
        <h2>Bem-vindo de volta</h2>
        <p>Acesse o painel de gestão da Casa Nostra.</p>
        <label>E-mail corporativo<input value={email} onChange={(e) => setEmail(e.target.value)} type="email" required/></label>
        <label>Senha<div className="password-field"><input value={password} onChange={(e) => setPassword(e.target.value)} type={visible ? 'text' : 'password'} required/><button type="button" onClick={() => setVisible(!visible)}>{visible ? 'Ocultar' : 'Exibir'}</button></div></label>
        <div className="login-options"><label><input type="checkbox" defaultChecked/> Manter conectado</label><button type="button">Esqueci minha senha</button></div>
        <button className="primary login-submit" type="submit">Entrar no MesaNexo <ChevronRight size={18}/></button>
        <div className="demo-access"><Zap size={18}/><div><strong>Acesso demonstrativo</strong><span>Os dados ficam salvos apenas neste navegador.</span></div></div>
      </form>
    </section>
  </div>
}

function Status({ value }) {
  return <span className={`status status-${value}`}><i/>{statusLabel(value)}</span>
}

function Kpi({ label, value, hint, trend = 'up', icon: Icon }) {
  return <article className="kpi-card">
    <div className="kpi-top"><span><Icon size={19}/></span><small>HOJE</small></div>
    <p>{label}</p><h3>{value}</h3>
    <div className={`trend ${trend}`}>{trend === 'up' ? <ArrowUpRight size={15}/> : <ArrowDownRight size={15}/>}<strong>{hint}</strong><span>vs. ontem</span></div>
  </article>
}

function PageHeader({ page, action, onAction }) {
  const [title, subtitle] = PAGE_META[page]
  return <div className="page-header">
    <div><span className="breadcrumb">Casa Nostra <ChevronRight size={13}/> {title}</span><h1>{title}</h1><p>{subtitle}</p></div>
    <div className="page-actions"><button className="secondary"><Download size={17}/> Exportar</button>{action && <button className="primary" onClick={onAction}><Plus size={18}/>{action}</button>}</div>
  </div>
}

function Panel({ title, subtitle, action, children, className = '' }) {
  return <section className={`panel ${className}`}>
    <header className="panel-head"><div><h2>{title}</h2>{subtitle && <p>{subtitle}</p>}</div>{action}</header>
    {children}
  </section>
}

function Dashboard({ store, goTo }) {
  const occupied = store.tables.filter((table) => table.status === 'ocupada').length
  const revenue = store.orders.reduce((sum, order) => sum + order.total, 0) + 7912.5
  const pending = store.ingredients.filter((item) => item.quantity <= item.minimum).length
  return <>
    <PageHeader page="dashboard"/>
    <div className="alert-strip"><span><Sparkles size={17}/></span><div><strong>Boa tarde, administrador.</strong> O movimento está 12,5% acima da última quinta-feira.</div><button onClick={() => goTo('reports')}>Ver análise <ChevronRight size={15}/></button></div>
    <div className="kpi-grid">
      <Kpi label="Faturamento" value={money(revenue)} hint="12,5%" icon={CircleDollarSign}/>
      <Kpi label="Pedidos" value={String(124 + store.orders.length)} hint="8,2%" icon={ShoppingBag}/>
      <Kpi label="Ticket médio" value={money(revenue / 129)} hint="2,1%" icon={ReceiptText}/>
      <Kpi label="Tempo médio" value="28 min" hint="4,3%" trend="down" icon={Clock3}/>
    </div>
    <div className="dashboard-grid">
      <Panel title="Faturamento por horário" subtitle="Comparativo de hoje com ontem" className="chart-panel" action={<button className="chip">Hoje <ChevronDown size={14}/></button>}>
        <div className="revenue-chart">
          <div className="chart-scale"><span>R$ 3k</span><span>R$ 2k</span><span>R$ 1k</span><span>R$ 0</span></div>
          <div className="chart-plot"><div className="chart-lines"><i/><i/><i/><i/></div><svg viewBox="0 0 800 230" preserveAspectRatio="none"><defs><linearGradient id="fill" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#d6a85f" stopOpacity=".3"/><stop offset="1" stopColor="#d6a85f" stopOpacity="0"/></linearGradient></defs><path className="area" d="M0 205 C60 190 70 168 130 176 S220 135 275 146 S345 116 410 121 S495 84 555 94 S650 54 700 63 S760 29 800 38 L800 230 L0 230Z"/><path className="line-muted" d="M0 210 C80 181 135 195 205 164 S330 160 410 130 S540 116 620 89 S720 82 800 61"/><path className="line-main" d="M0 205 C60 190 70 168 130 176 S220 135 275 146 S345 116 410 121 S495 84 555 94 S650 54 700 63 S760 29 800 38"/><circle cx="700" cy="63" r="6"/></svg><div className="chart-labels"><span>08h</span><span>10h</span><span>12h</span><span>14h</span><span>16h</span><span>18h</span><span>20h</span><span>22h</span></div></div>
        </div>
        <div className="chart-legend"><span><i className="today"/>Hoje</span><span><i/>Ontem</span></div>
      </Panel>
      <Panel title="Ocupação do salão" subtitle="Atualizado agora" action={<button className="link-button" onClick={() => goTo('tables')}>Ver mesas <ChevronRight size={15}/></button>}>
        <div className="occupancy"><div className="donut" style={{ '--value': `${(occupied / store.tables.length) * 100 * 3.6}deg` }}><div><strong>{Math.round((occupied / store.tables.length) * 100)}%</strong><span>ocupado</span></div></div><div className="occupancy-list"><div><i className="busy"/><span>Ocupadas</span><strong>{occupied}</strong></div><div><i className="free"/><span>Livres</span><strong>{store.tables.filter((t) => t.status === 'livre').length}</strong></div><div><i className="reserved"/><span>Reservadas</span><strong>{store.tables.filter((t) => t.status === 'reservada').length}</strong></div></div></div>
        <div className="capacity"><span>Capacidade total</span><strong>{store.tables.length} mesas · {store.tables.reduce((sum, table) => sum + table.seats, 0)} lugares</strong></div>
      </Panel>
    </div>
    <div className="dashboard-bottom">
      <Panel title="Pedidos recentes" subtitle="Últimas movimentações" action={<button className="link-button" onClick={() => goTo('orders')}>Ver todos <ChevronRight size={15}/></button>}>
        <div className="compact-orders">{store.orders.slice(0, 4).map((order) => <div key={order.id}><span className="order-token">#{order.id}</span><div><strong>{order.channel}</strong><small>{order.customer} · {order.time}</small></div><b>{money(order.total)}</b><Status value={order.status}/></div>)}</div>
      </Panel>
      <Panel title="Alertas da operação" subtitle="Itens que precisam de atenção">
        <div className="alerts"><button onClick={() => goTo('inventory')}><span className="alert-icon danger"><AlertTriangle size={18}/></span><div><strong>{pending} itens em estoque mínimo</strong><small>Reponha os insumos antes do próximo turno</small></div><ChevronRight size={17}/></button><button onClick={() => goTo('purchases')}><span className="alert-icon warning"><PackageCheck size={18}/></span><div><strong>1 compra aguardando</strong><small>Entrega prevista para hoje às 15h</small></div><ChevronRight size={17}/></button><button onClick={() => goTo('cash')}><span className="alert-icon info"><BadgeDollarSign size={18}/></span><div><strong>Caixa aberto há 2h</strong><small>Saldo atual de {money(store.cash.balance)}</small></div><ChevronRight size={17}/></button></div>
      </Panel>
    </div>
  </>
}

function Tables({ store, setStore, notify }) {
  const [selected, setSelected] = useState(store.tables[0].id)
  const current = store.tables.find((table) => table.id === selected)
  const update = (id, values) => setStore((old) => ({ ...old, tables: old.tables.map((table) => table.id === id ? { ...table, ...values } : table) }))
  const openClose = () => {
    const opening = current.status !== 'ocupada'
    update(current.id, opening ? { status: 'ocupada', guests: 2, openedAt: '13:05', total: 0 } : { status: 'livre', guests: 0, openedAt: null, total: 0 })
    notify(opening ? `${current.name} aberta com sucesso` : `${current.name} fechada e liberada`)
  }
  const transfer = () => {
    const free = store.tables.find((table) => table.status === 'livre')
    if (!free || current.status !== 'ocupada') return notify('Selecione uma mesa ocupada para transferir')
    setStore((old) => ({ ...old, tables: old.tables.map((table) => table.id === current.id ? { ...table, status: 'livre', guests: 0, total: 0, openedAt: null } : table.id === free.id ? { ...current, id: free.id, name: free.name } : table) }))
    setSelected(free.id); notify(`Conta transferida para ${free.name}`)
  }
  const split = () => { if (current.total) { update(current.id, { total: current.total / 2 }); notify('Conta dividida em 2 pagamentos') } }
  return <><PageHeader page="tables" action="Nova comanda" onAction={() => notify('Selecione uma mesa livre para abrir a comanda')}/><div className="module-layout tables-layout"><Panel title="Mapa do salão" subtitle="Clique em uma mesa para gerenciar"><div className="table-filters"><button className="chip active">Todas <b>{store.tables.length}</b></button><button className="chip">Livres <b>{store.tables.filter((t) => t.status === 'livre').length}</b></button><button className="chip">Ocupadas <b>{store.tables.filter((t) => t.status === 'ocupada').length}</b></button></div><div className="table-map">{store.tables.map((table) => <button className={`table-card ${table.status} ${selected === table.id ? 'selected' : ''}`} key={table.id} onClick={() => setSelected(table.id)}><span><UtensilsCrossed size={17}/>{table.seats} lugares</span><strong>{table.name}</strong><small>{table.status === 'ocupada' ? `${table.guests} pessoas · ${table.openedAt}` : statusLabel(table.status)}</small>{table.total > 0 && <b>{money(table.total)}</b>}</button>)}</div></Panel><aside className="detail-panel"><div className="detail-title"><span className={`table-big-icon ${current.status}`}><UtensilsCrossed/></span><div><small>SELECIONADA</small><h2>{current.name}</h2><Status value={current.status}/></div></div><div className="detail-metrics"><div><span>Consumo atual</span><strong>{money(current.total)}</strong></div><div><span>Pessoas</span><strong>{current.guests || '—'}</strong></div><div><span>Aberta às</span><strong>{current.openedAt || '—'}</strong></div></div><button className="primary full" onClick={openClose}>{current.status === 'ocupada' ? 'Fechar conta' : 'Abrir comanda'}</button><div className="action-grid"><button onClick={transfer}><ArrowLeftRight/>Transferir</button><button onClick={() => notify('Mesas selecionadas foram agrupadas')}><LayoutGrid/>Juntar</button><button onClick={split}><SlidersHorizontal/>Dividir conta</button><button onClick={() => notify('Reserva registrada para esta mesa')}><CalendarDays/>Reservar</button></div></aside></div></>
}

function Pos({ store, setStore, notify }) {
  const [cart, setCart] = useState([])
  const [category, setCategory] = useState('Todos')
  const [channel, setChannel] = useState('Balcão')
  const categories = ['Todos', ...new Set(store.products.map((item) => item.category))]
  const shown = store.products.filter((item) => item.available && (category === 'Todos' || item.category === category))
  const add = (product) => setCart((old) => old.some((item) => item.id === product.id) ? old.map((item) => item.id === product.id ? { ...item, qty: item.qty + 1 } : item) : [...old, { ...product, qty: 1 }])
  const change = (id, amount) => setCart((old) => old.map((item) => item.id === id ? { ...item, qty: Math.max(0, item.qty + amount) } : item).filter((item) => item.qty))
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0)
  const total = subtotal * 1.1
  const finish = () => {
    if (!cart.length) return notify('Adicione ao menos um produto à venda')
    const id = Math.max(...store.orders.map((order) => order.id)) + 1
    const now = new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
    setStore((old) => ({
      ...old,
      orders: [{ id, channel, customer: 'Consumidor final', time: now, total, status: 'novo', items: cart.reduce((sum, item) => sum + item.qty, 0), note: '' }, ...old.orders],
      products: old.products.map((product) => { const item = cart.find((entry) => entry.id === product.id); return item ? { ...product, sales: product.sales + item.qty, stock: Math.max(0, product.stock - item.qty) } : product }),
      ingredients: old.ingredients.map((item) => ({ ...item, quantity: Math.max(0, Number((item.quantity - cart.length * 0.08).toFixed(2))) })),
      cash: { ...old.cash, balance: old.cash.balance + total, movements: [{ id: Date.now(), type: 'Venda', description: `Pedido #${id} · PIX`, value: total, time: now }, ...old.cash.movements] },
    }))
    setCart([]); notify(`Venda #${id} concluída e integrada ao estoque e caixa`)
  }
  return <><PageHeader page="pos"/><div className="pos-layout"><section className="pos-catalog"><div className="pos-toolbar"><div className="search-box"><Search size={17}/><input placeholder="Buscar produto..."/></div><div className="segmented">{['Balcão', 'Mesa', 'Retirada'].map((item) => <button className={channel === item ? 'active' : ''} onClick={() => setChannel(item)} key={item}>{item}</button>)}</div></div><div className="category-row">{categories.map((item) => <button className={`chip ${category === item ? 'active' : ''}`} onClick={() => setCategory(item)} key={item}>{item}</button>)}</div><div className="product-grid">{shown.map((product) => <button className="product-card" key={product.id} onClick={() => add(product)}><span className="product-visual" style={{ '--product': product.color }}><UtensilsCrossed/></span><small>{product.category}</small><strong>{product.name}</strong><div><b>{money(product.price)}</b><span><Plus size={16}/></span></div></button>)}</div></section><aside className="cart"><header><div><span>VENDA ATUAL</span><h2>{channel}</h2></div><button onClick={() => setCart([])}><Trash2 size={17}/></button></header>{cart.length ? <div className="cart-items">{cart.map((item) => <div key={item.id}><div><strong>{item.name}</strong><small>{money(item.price)} cada</small></div><div className="qty"><button onClick={() => change(item.id, -1)}><Minus size={14}/></button><b>{item.qty}</b><button onClick={() => change(item.id, 1)}><Plus size={14}/></button></div><b>{money(item.price * item.qty)}</b></div>)}</div> : <div className="cart-empty"><ShoppingCart size={30}/><strong>Venda vazia</strong><span>Selecione produtos para começar.</span></div>}<div className="cart-summary"><div><span>Subtotal</span><b>{money(subtotal)}</b></div><div><span>Taxa de serviço (10%)</span><b>{money(subtotal * .1)}</b></div><div className="cart-total"><span>Total</span><strong>{money(total)}</strong></div><button className="primary full" onClick={finish}><CreditCard size={18}/> Receber pagamento</button></div></aside></div></>
}

function Orders({ store, setStore, notify, kitchen = false }) {
  const [filter, setFilter] = useState('todos')
  const statuses = ['novo', 'preparando', 'pronto', 'entregue']
  const advance = (id) => {
    setStore((old) => ({ ...old, orders: old.orders.map((order) => order.id === id ? { ...order, status: statuses[Math.min(statuses.indexOf(order.status) + 1, statuses.length - 1)] } : order) }))
    notify('Status do pedido atualizado')
  }
  if (kitchen) return <><PageHeader page="kitchen"/><div className="kitchen-top"><div><span className="live-dot"/>Cozinha online</div><span>Tempo médio atual <strong>28 min</strong></span><button className="secondary"><Bell size={17}/> Ativar som</button></div><div className="kanban">{statuses.slice(0, 3).map((status) => <section key={status} className={`kitchen-column ${status}`}><header><span>{statusLabel(status)}</span><b>{store.orders.filter((order) => order.status === status).length}</b></header>{store.orders.filter((order) => order.status === status).map((order) => <article className="kitchen-ticket" key={order.id}><div className="ticket-head"><div><small>PEDIDO</small><strong>#{order.id}</strong></div><span><Clock3 size={14}/>{order.time}</span></div><h3>{order.channel}</h3><p><b>{order.items} itens</b> · {order.customer}</p>{order.note && <div className="ticket-note"><AlertTriangle size={15}/>{order.note}</div>}<button onClick={() => advance(order.id)}>{status === 'novo' ? 'Iniciar preparo' : status === 'preparando' ? 'Marcar como pronto' : 'Confirmar entrega'}<ChevronRight size={16}/></button></article>)}</section>)}</div></>
  const shown = filter === 'todos' ? store.orders : store.orders.filter((order) => order.status === filter)
  return <><PageHeader page="orders" action="Novo pedido" onAction={() => notify('Use o PDV para registrar um novo pedido')}/><Panel title="Todos os pedidos" subtitle={`${store.orders.length} pedidos registrados hoje`} action={<div className="table-tools"><button><Filter size={16}/>Filtros</button><button><CalendarDays size={16}/>Hoje</button></div>}><div className="status-tabs">{['todos', ...statuses].map((status) => <button className={filter === status ? 'active' : ''} onClick={() => setFilter(status)} key={status}>{status === 'todos' ? 'Todos' : statusLabel(status)}<b>{status === 'todos' ? store.orders.length : store.orders.filter((o) => o.status === status).length}</b></button>)}</div><div className="data-table orders-table"><div className="table-row table-header"><span>Pedido</span><span>Canal / cliente</span><span>Horário</span><span>Itens</span><span>Total</span><span>Status</span><span/></div>{shown.map((order) => <div className="table-row" key={order.id}><strong>#{order.id}</strong><span><b>{order.channel}</b><small>{order.customer}</small></span><span>{order.time}</span><span>{order.items} itens</span><strong>{money(order.total)}</strong><Status value={order.status}/><button className="round-button" onClick={() => advance(order.id)}><ChevronRight size={17}/></button></div>)}</div></Panel></>
}

function Products({ store, setStore, notify, menu = false }) {
  const [category, setCategory] = useState('Todos')
  const categories = ['Todos', ...new Set(store.products.map((item) => item.category))]
  const toggle = (id) => { setStore((old) => ({ ...old, products: old.products.map((item) => item.id === id ? { ...item, available: !item.available } : item) })); notify('Disponibilidade atualizada no cardápio e PDV') }
  if (menu) return <><PageHeader page="menu" action="Nova categoria" onAction={() => notify('Categoria de demonstração criada')}/><div className="menu-overview"><div><span><BookOpenCheck/></span><div><small>CARDÁPIO ATIVO</small><strong>Almoço e jantar</strong><p>{store.products.filter((p) => p.available).length} produtos disponíveis em {categories.length - 1} categorias</p></div></div><button className="secondary"><SlidersHorizontal size={17}/>Organizar cardápio</button></div><div className="category-row menu-categories">{categories.map((item) => <button className={`chip ${category === item ? 'active' : ''}`} onClick={() => setCategory(item)} key={item}>{item}</button>)}</div><div className="menu-grid">{store.products.filter((product) => category === 'Todos' || product.category === category).map((product) => <article key={product.id} className={!product.available ? 'unavailable' : ''}><div className="menu-product-visual" style={{ '--product': product.color }}><UtensilsCrossed/><Status value={product.available ? 'ativo' : 'indisponível'}/></div><div><small>{product.category}</small><h3>{product.name}</h3><p>Preparado com ingredientes selecionados e receita padronizada.</p><div><strong>{money(product.price)}</strong><button onClick={() => toggle(product.id)}>{product.available ? 'Pausar' : 'Ativar'}</button></div></div></article>)}</div></>
  return <><PageHeader page="products" action="Novo produto" onAction={() => notify('Formulário de novo produto aberto')}/><div className="mini-kpis"><div><span>Produtos ativos</span><strong>{store.products.filter((p) => p.available).length}</strong><small>de {store.products.length} cadastrados</small></div><div><span>Margem média</span><strong>64,2%</strong><small className="positive-text">+2,4% no mês</small></div><div><span>Mais vendido</span><strong>Filé madeira</strong><small>32 pedidos hoje</small></div><div><span>Indisponíveis</span><strong>{store.products.filter((p) => !p.available).length}</strong><small>requer atenção</small></div></div><Panel title="Catálogo de produtos" subtitle="Preços, custos e disponibilidade integrados"><div className="data-table products-table"><div className="table-row table-header"><span>Produto</span><span>Categoria</span><span>Preço</span><span>Custo</span><span>Margem</span><span>Estoque</span><span>Disponível</span></div>{store.products.map((product) => <div className="table-row" key={product.id}><span className="product-cell"><i style={{ background: product.color }}><UtensilsCrossed size={16}/></i><b>{product.name}</b></span><span>{product.category}</span><strong>{money(product.price)}</strong><span>{money(product.cost)}</span><span className="positive-text">{Math.round((1 - product.cost / product.price) * 100)}%</span><span>{product.stock} un.</span><button className={`switch ${product.available ? 'on' : ''}`} onClick={() => toggle(product.id)}><i/></button></div>)}</div></Panel></>
}

function Stock({ store, setStore, notify, mode = 'ingredients' }) {
  const addStock = (id, amount = 1) => { setStore((old) => ({ ...old, ingredients: old.ingredients.map((item) => item.id === id ? { ...item, quantity: Number((item.quantity + amount).toFixed(2)) } : item) })); notify('Movimentação registrada no estoque') }
  if (mode === 'recipes') return <><PageHeader page="recipes" action="Nova ficha técnica" onAction={() => notify('Nova ficha técnica iniciada')}/><div className="recipe-grid">{store.products.slice(0, 6).map((product) => <article key={product.id}><header><span style={{ background: product.color }}><ClipboardList/></span><div><small>{product.category}</small><h3>{product.name}</h3></div><button><ChevronRight/></button></header><div className="recipe-cost"><div><span>Custo de produção</span><strong>{money(product.cost)}</strong></div><div><span>Preço de venda</span><strong>{money(product.price)}</strong></div></div><div className="margin-line"><span>Margem de contribuição</span><b>{Math.round((1 - product.cost / product.price) * 100)}%</b><i><em style={{ width: `${Math.round((1 - product.cost / product.price) * 100)}%` }}/></i></div><footer><span>4 ingredientes</span><span>Rendimento: 1 porção</span></footer></article>)}</div></>
  if (mode === 'inventory') return <><PageHeader page="inventory" action="Nova movimentação" onAction={() => notify('Escolha um ingrediente para registrar a entrada')}/><div className="inventory-summary"><div><span><Warehouse/></span><div><small>VALOR EM ESTOQUE</small><strong>{money(18452.8)}</strong><p>Atualizado com o custo médio dos ingredientes</p></div></div><div><span>Itens monitorados<strong>{store.ingredients.length}</strong></span><span>Estoque mínimo<strong className="danger-text">{store.ingredients.filter((i) => i.quantity <= i.minimum).length}</strong></span><span>Perdas no mês<strong>{money(326.4)}</strong></span></div></div><Panel title="Posição de estoque" subtitle="Saldo e nível de reposição por ingrediente"><div className="data-table inventory-table"><div className="table-row table-header"><span>Ingrediente</span><span>Saldo atual</span><span>Estoque mínimo</span><span>Nível</span><span>Validade</span><span>Ação</span></div>{store.ingredients.map((item) => { const level = Math.min(100, Math.round(item.quantity / (item.minimum * 2) * 100)); return <div className="table-row" key={item.id}><strong>{item.name}</strong><span>{item.quantity} {item.unit}</span><span>{item.minimum} {item.unit}</span><span className="stock-level"><i><em className={level < 50 ? 'low' : ''} style={{ width: `${level}%` }}/></i><b>{level}%</b></span><span>{item.expiry}</span><button className="secondary small" onClick={() => addStock(item.id, 2)}>Entrada +2</button></div>})}</div></Panel></>
  return <><PageHeader page="ingredients" action="Novo ingrediente" onAction={() => notify('Formulário de ingrediente aberto')}/><div className="mini-kpis"><div><span>Ingredientes</span><strong>{store.ingredients.length}</strong><small>cadastrados</small></div><div><span>Custo médio</span><strong>{money(store.ingredients.reduce((s, i) => s + i.cost, 0) / store.ingredients.length)}</strong><small>por unidade</small></div><div><span>Estoque mínimo</span><strong className="danger-text">{store.ingredients.filter((i) => i.quantity <= i.minimum).length}</strong><small>itens abaixo do ideal</small></div><div><span>Próxima validade</span><strong>30 ago.</strong><small>Creme de leite</small></div></div><Panel title="Cadastro de ingredientes"><div className="data-table ingredient-table"><div className="table-row table-header"><span>Ingrediente</span><span>Unidade</span><span>Custo</span><span>Disponível</span><span>Mínimo</span><span>Validade</span><span/></div>{store.ingredients.map((item) => <div className="table-row" key={item.id}><strong>{item.name}</strong><span>{item.unit}</span><span>{money(item.cost)}</span><span>{item.quantity} {item.unit}</span><span>{item.minimum} {item.unit}</span><span>{item.expiry}</span><button className="round-button"><ChevronRight/></button></div>)}</div></Panel></>
}

function Supply({ store, setStore, notify, purchases = false }) {
  const receive = (id) => {
    setStore((old) => ({ ...old, purchases: old.purchases.map((item) => item.id === id ? { ...item, status: 'recebido' } : item), ingredients: old.ingredients.map((item) => ({ ...item, quantity: Number((item.quantity + 1.5).toFixed(2)) })) }))
    notify('Compra recebida e estoque atualizado automaticamente')
  }
  if (purchases) return <><PageHeader page="purchases" action="Novo pedido de compra" onAction={() => notify('Pedido de compra de demonstração criado')}/><div className="mini-kpis"><div><span>Compras no mês</span><strong>{money(12680.4)}</strong><small>8 pedidos</small></div><div><span>Aguardando</span><strong>1</strong><small>{money(1840)}</small></div><div><span>Recebidos</span><strong>7</strong><small>no prazo</small></div><div><span>Economia negociada</span><strong className="positive-text">6,8%</strong><small>vs. tabela</small></div></div><Panel title="Pedidos de compra" subtitle="Histórico e recebimentos"><div className="data-table purchase-table"><div className="table-row table-header"><span>Pedido</span><span>Fornecedor</span><span>Data</span><span>Itens</span><span>Total</span><span>Status</span><span>Ação</span></div>{store.purchases.map((item) => <div className="table-row" key={item.id}><strong>PC-{item.id}</strong><span>{item.supplier}</span><span>{item.date}</span><span>{item.items} itens</span><strong>{money(item.total)}</strong><Status value={item.status}/>{item.status === 'aguardando' ? <button className="primary small" onClick={() => receive(item.id)}>Receber</button> : <button className="secondary small">Detalhes</button>}</div>)}</div></Panel></>
  return <><PageHeader page="suppliers" action="Novo fornecedor" onAction={() => notify('Formulário de fornecedor aberto')}/><div className="supplier-grid">{store.suppliers.map((supplier) => <article key={supplier.id}><header><span><Building2/></span><Status value={supplier.status}/></header><h3>{supplier.name}</h3><p>{supplier.products}</p><div><span>Contato<strong>{supplier.contact}</strong></span><span>Telefone<strong>{supplier.phone}</strong></span><span>Pagamento<strong>{supplier.terms}</strong></span></div><footer><button className="secondary">Ver histórico</button><button className="round-button"><ChevronRight/></button></footer></article>)}</div></>
}

function Cash({ store, setStore, notify }) {
  const addMovement = (type, value) => {
    const amount = type === 'Sangria' ? -Math.abs(value) : Math.abs(value)
    const time = new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
    setStore((old) => ({ ...old, cash: { ...old.cash, balance: old.cash.balance + amount, movements: [{ id: Date.now(), type, description: `${type} manual`, value: amount, time }, ...old.cash.movements] } }))
    notify(`${type} de ${money(Math.abs(value))} registrada`)
  }
  const toggle = () => { setStore((old) => ({ ...old, cash: { ...old.cash, open: !old.cash.open } })); notify(store.cash.open ? 'Caixa fechado e valores conferidos' : 'Caixa aberto com saldo inicial') }
  return <><PageHeader page="cash"/><div className="cash-hero"><div className="cash-status"><span className={store.cash.open ? 'open' : ''}><LockKeyhole/></span><div><small>STATUS DO CAIXA</small><h2>{store.cash.open ? 'Caixa aberto' : 'Caixa fechado'}</h2><p>{store.cash.open ? `Aberto hoje às ${store.cash.openedAt} pelo operador demo` : 'Faça a abertura para iniciar as vendas'}</p></div></div><div className="cash-balance"><span>Saldo esperado</span><strong>{money(store.cash.balance)}</strong><small>Saldo inicial de {money(store.cash.openingBalance)}</small></div><button className={store.cash.open ? 'danger-button' : 'primary'} onClick={toggle}>{store.cash.open ? 'Fechar caixa' : 'Abrir caixa'}</button></div><div className="cash-grid"><Panel title="Resumo por pagamento" subtitle="Vendas registradas hoje"><div className="payment-list"><div><span><CreditCard/>Cartão de crédito</span><strong>{money(4682.4)}</strong><i><em style={{ width: '54%' }}/></i></div><div><span><Zap/>PIX</span><strong>{money(2396.9)}</strong><i><em style={{ width: '29%' }}/></i></div><div><span><Banknote/>Dinheiro</span><strong>{money(1273)}</strong><i><em style={{ width: '15%' }}/></i></div></div><div className="cash-actions"><button onClick={() => addMovement('Sangria', 100)}><ArrowDownRight/>Registrar sangria</button><button onClick={() => addMovement('Suprimento', 100)}><ArrowUpRight/>Adicionar suprimento</button></div></Panel><Panel title="Movimentações recentes" subtitle="Entradas e saídas do turno"><div className="movement-list">{store.cash.movements.map((item) => <div key={item.id}><span className={item.value > 0 ? 'in' : 'out'}>{item.value > 0 ? <ArrowUpRight/> : <ArrowDownRight/>}</span><div><strong>{item.type}</strong><small>{item.description} · {item.time}</small></div><b className={item.value > 0 ? 'positive-text' : 'danger-text'}>{item.value > 0 ? '+' : ''}{money(item.value)}</b></div>)}</div></Panel></div></>
}

function Financial({ store }) {
  const revenue = store.cash.balance - store.cash.openingBalance + 24340
  return <><PageHeader page="financial" action="Novo lançamento"/><div className="kpi-grid financial-kpis"><Kpi label="Receitas no mês" value={money(revenue)} hint="9,8%" icon={TrendingUp}/><Kpi label="Despesas no mês" value={money(18462.2)} hint="3,1%" trend="down" icon={HandCoins}/><Kpi label="Lucro operacional" value={money(revenue - 18462.2)} hint="14,2%" icon={BadgeDollarSign}/><Kpi label="CMV" value="31,8%" hint="1,6%" trend="down" icon={Archive}/></div><div className="financial-grid"><Panel title="Fluxo de caixa" subtitle="Entradas e saídas nos últimos 6 meses"><div className="bar-chart">{[['Mar', 62, 42], ['Abr', 70, 48], ['Mai', 66, 45], ['Jun', 78, 54], ['Jul', 85, 58], ['Ago', 92, 61]].map(([month, input, output]) => <div key={month}><span className="bars"><i style={{ height: `${input}%` }}/><i style={{ height: `${output}%` }}/></span><small>{month}</small></div>)}</div><div className="chart-legend"><span><i className="today"/>Receitas</span><span><i/>Despesas</span></div></Panel><Panel title="Próximos vencimentos" subtitle="Contas a pagar e receber"><div className="due-list"><div><span className="due-icon out"><ArrowDownRight/></span><div><strong>Premium Carnes</strong><small>Vence amanhã · Fornecedores</small></div><b>{money(1840)}</b></div><div><span className="due-icon out"><ArrowDownRight/></span><div><strong>Aluguel comercial</strong><small>02 set. · Despesa fixa</small></div><b>{money(6200)}</b></div><div><span className="due-icon in"><ArrowUpRight/></span><div><strong>Repasse iFood</strong><small>03 set. · Contas a receber</small></div><b>{money(3482.9)}</b></div></div></Panel></div></>
}

function Customers({ store, notify }) {
  return <><PageHeader page="customers" action="Novo cliente" onAction={() => notify('Cadastro de cliente aberto')}/><div className="mini-kpis"><div><span>Clientes ativos</span><strong>1.248</strong><small>+42 neste mês</small></div><div><span>Recorrência</span><strong>38,6%</strong><small className="positive-text">+4,1%</small></div><div><span>Gasto médio</span><strong>{money(126.4)}</strong><small>por cliente</small></div><div><span>Aniversariantes</span><strong>8</strong><small>nos próximos 7 dias</small></div></div><Panel title="Base de clientes" subtitle="Histórico e preferências de consumo"><div className="data-table customer-table"><div className="table-row table-header"><span>Cliente</span><span>Contato</span><span>Pedidos</span><span>Gasto total</span><span>Preferência</span><span/></div>{store.customers.map((customer) => <div className="table-row" key={customer.id}><span className="customer-name"><i>{customer.name.split(' ').map((part) => part[0]).slice(0, 2).join('')}</i><b>{customer.name}</b></span><span><b>{customer.phone}</b><small>{customer.email}</small></span><span>{customer.orders}</span><strong>{money(customer.spent)}</strong><span>{customer.preference}</span><button className="round-button"><ChevronRight/></button></div>)}</div></Panel></>
}

function Reports({ store }) {
  const productMax = Math.max(...store.products.map((product) => product.sales))
  return <><PageHeader page="reports"/><div className="report-toolbar"><div><button className="chip active">Vendas</button><button className="chip">Financeiro</button><button className="chip">Estoque</button><button className="chip">Equipe</button></div><div><button className="secondary"><CalendarDays/>01–29 ago. 2026</button><button className="primary"><Download/>Exportar relatório</button></div></div><div className="kpi-grid"><Kpi label="Faturamento bruto" value={money(142680.4)} hint="12,5%" icon={CircleDollarSign}/><Kpi label="Lucro líquido" value={money(38492.8)} hint="9,2%" icon={TrendingUp}/><Kpi label="Ticket médio" value={money(71.86)} hint="4,8%" icon={ReceiptText}/><Kpi label="Pedidos no mês" value="1.985" hint="7,4%" icon={ShoppingBag}/></div><div className="report-grid"><Panel title="Produtos mais vendidos" subtitle="Quantidade de pedidos no período"><div className="ranking">{[...store.products].sort((a, b) => b.sales - a.sales).slice(0, 6).map((product, index) => <div key={product.id}><span>{index + 1}</span><div><strong>{product.name}</strong><i><em style={{ width: `${product.sales / productMax * 100}%` }}/></i></div><b>{product.sales}</b></div>)}</div></Panel><Panel title="Vendas por canal" subtitle="Participação no faturamento"><div className="channel-chart"><div className="channel-donut"><div><strong>100%</strong><span>das vendas</span></div></div><div><span><i className="salon"/>Salão <b>58%</b></span><span><i className="delivery"/>Delivery <b>27%</b></span><span><i className="counter"/>Balcão <b>15%</b></span></div></div></Panel></div><Panel title="Desempenho consolidado" subtitle="Indicadores por competência"><div className="data-table report-table"><div className="table-row table-header"><span>Período</span><span>Pedidos</span><span>Faturamento</span><span>Ticket médio</span><span>CMV</span><span>Lucro</span><span>Variação</span></div>{[['Agosto 2026', '1.985', 142680, 71.86, '31,8%', 38492, '+12,5%'], ['Julho 2026', '1.764', 126840, 71.9, '33,4%', 33780, '+6,2%'], ['Junho 2026', '1.632', 119450, 73.19, '34,1%', 30120, '+4,8%']].map((row) => <div className="table-row" key={row[0]}>{row.map((cell, i) => <span className={i === 6 ? 'positive-text' : ''} key={i}>{typeof cell === 'number' ? money(cell) : cell}</span>)}</div>)}</div></Panel></>
}

function UsersPage({ store, notify }) {
  return <><PageHeader page="users" action="Convidar usuário" onAction={() => notify('Convite de acesso enviado')}/><div className="access-banner"><span><ShieldCheck/></span><div><h3>Permissões protegidas por função</h3><p>Cada colaborador visualiza apenas os módulos e ações liberados para o seu cargo.</p></div><button className="secondary">Gerenciar permissões</button></div><Panel title="Usuários da unidade" subtitle={`${store.users.length} acessos cadastrados`}><div className="data-table users-table"><div className="table-row table-header"><span>Usuário</span><span>Cargo e permissão</span><span>Status</span><span>Último acesso</span><span>Autenticação</span><span/></div>{store.users.map((user) => <div className="table-row" key={user.id}><span className="customer-name"><i>{user.name.split(' ').map((part) => part[0]).slice(0, 2).join('')}</i><span><b>{user.name}</b><small>{user.email}</small></span></span><span>{user.role}</span><Status value={user.status}/><span>{user.last}</span><span className="two-factor"><ShieldCheck size={16}/>2 fatores</span><button className="round-button"><ChevronRight/></button></div>)}</div></Panel><div className="permission-grid"><article><span><LockKeyhole/></span><h3>Administrador</h3><p>Acesso total a todos os módulos e configurações.</p><b>1 usuário</b></article><article><span><UserRoundCog/></span><h3>Gerente</h3><p>Operação, relatórios, estoque e equipe.</p><b>1 usuário</b></article><article><span><CreditCard/></span><h3>Operador de caixa</h3><p>PDV, pedidos, mesas e movimentações do caixa.</p><b>1 usuário</b></article><article><span><ChefHat/></span><h3>Cozinha</h3><p>Pedidos e tela de produção da cozinha.</p><b>1 usuário</b></article></div></>
}

function SettingsPage({ store, setStore, notify }) {
  const [tab, setTab] = useState('restaurante')
  const updateRestaurant = (key, value) => setStore((old) => ({ ...old, restaurant: { ...old.restaurant, [key]: value } }))
  return <><PageHeader page="settings"/><div className="settings-layout"><aside className="settings-nav">{[['restaurante', Store, 'Restaurante'], ['operacao', SlidersHorizontal, 'Operação'], ['pagamentos', CreditCard, 'Pagamentos'], ['permissoes', ShieldCheck, 'Permissões'], ['integracoes', Zap, 'Integrações']].map(([id, Icon, label]) => <button className={tab === id ? 'active' : ''} onClick={() => setTab(id)} key={id}><Icon/>{label}<ChevronRight/></button>)}</aside><Panel title={tab === 'restaurante' ? 'Dados do restaurante' : PAGE_META.settings[0]} subtitle="As alterações são salvas neste dispositivo"><div className="settings-form"><div className="logo-upload"><span><UtensilsCrossed/></span><div><strong>Logo da Casa Nostra</strong><small>PNG ou JPG, até 2 MB</small></div><button className="secondary">Alterar logo</button></div><div className="form-grid"><label>Nome do restaurante<input value={store.restaurant.name} onChange={(e) => updateRestaurant('name', e.target.value)}/></label><label>Unidade<input value={store.restaurant.unit} onChange={(e) => updateRestaurant('unit', e.target.value)}/></label><label>CNPJ<input value={store.restaurant.document} onChange={(e) => updateRestaurant('document', e.target.value)}/></label><label>Telefone<input value={store.restaurant.phone} onChange={(e) => updateRestaurant('phone', e.target.value)}/></label><label>Horário de abertura<input type="time" value={store.restaurant.open} onChange={(e) => updateRestaurant('open', e.target.value)}/></label><label>Horário de fechamento<input type="time" value={store.restaurant.close} onChange={(e) => updateRestaurant('close', e.target.value)}/></label><label>Taxa de serviço (%)<input type="number" value={store.restaurant.serviceFee} onChange={(e) => updateRestaurant('serviceFee', Number(e.target.value))}/></label><label>Número de mesas<input type="number" value={store.restaurant.tables} onChange={(e) => updateRestaurant('tables', Number(e.target.value))}/></label></div><div className="setting-switches"><div><span><strong>Baixa automática no estoque</strong><small>Descontar ingredientes após cada venda concluída.</small></span><button className="switch on"><i/></button></div><div><span><strong>Exigir fechamento cego</strong><small>O operador não visualiza o saldo esperado no fechamento.</small></span><button className="switch"><i/></button></div><div><span><strong>Notificações de estoque mínimo</strong><small>Alertar gerentes quando um insumo atingir o limite.</small></span><button className="switch on"><i/></button></div></div><footer><button className="secondary">Cancelar</button><button className="primary" onClick={() => notify('Configurações salvas com sucesso')}><Check/>Salvar alterações</button></footer></div></Panel></div></>
}

function Shell({ session, onLogout }) {
  const [store, setStore] = useLocalState('mesanexo-demo-store', initialStore)
  const [page, setPage] = useState('dashboard')
  const [sidebar, setSidebar] = useState(false)
  const [collapsed, setCollapsed] = useState(false)
  const [search, setSearch] = useState('')
  const [toast, setToast] = useState('')
  const notify = (message) => { setToast(message); window.setTimeout(() => setToast(''), 2800) }
  const searchResults = useMemo(() => {
    if (!search.trim()) return []
    const term = search.toLowerCase()
    return NAV_SECTIONS.flatMap((section) => section.items).filter((item) => item[1].toLowerCase().includes(term)).slice(0, 6)
  }, [search])
  const goTo = (id) => { setPage(id); setSidebar(false); setSearch(''); window.scrollTo({ top: 0, behavior: 'smooth' }) }
  const renderPage = () => {
    if (page === 'dashboard') return <Dashboard store={store} goTo={goTo}/>
    if (page === 'tables') return <Tables store={store} setStore={setStore} notify={notify}/>
    if (page === 'pos') return <Pos store={store} setStore={setStore} notify={notify}/>
    if (page === 'orders') return <Orders store={store} setStore={setStore} notify={notify}/>
    if (page === 'kitchen') return <Orders store={store} setStore={setStore} notify={notify} kitchen/>
    if (page === 'menu') return <Products store={store} setStore={setStore} notify={notify} menu/>
    if (page === 'products') return <Products store={store} setStore={setStore} notify={notify}/>
    if (page === 'ingredients') return <Stock store={store} setStore={setStore} notify={notify}/>
    if (page === 'recipes') return <Stock store={store} setStore={setStore} notify={notify} mode="recipes"/>
    if (page === 'inventory') return <Stock store={store} setStore={setStore} notify={notify} mode="inventory"/>
    if (page === 'suppliers') return <Supply store={store} setStore={setStore} notify={notify}/>
    if (page === 'purchases') return <Supply store={store} setStore={setStore} notify={notify} purchases/>
    if (page === 'cash') return <Cash store={store} setStore={setStore} notify={notify}/>
    if (page === 'financial') return <Financial store={store}/>
    if (page === 'customers') return <Customers store={store} notify={notify}/>
    if (page === 'reports') return <Reports store={store}/>
    if (page === 'users') return <UsersPage store={store} notify={notify}/>
    return <SettingsPage store={store} setStore={setStore} notify={notify}/>
  }
  return <div className={`erp-shell ${collapsed ? 'collapsed' : ''}`}>
    <aside className={`sidebar ${sidebar ? 'mobile-open' : ''}`}>
      <div className="sidebar-brand"><span><Command/></span><b>Mesa<strong>Nexo</strong></b><button onClick={() => setSidebar(false)} className="mobile-close"><X/></button></div>
      <div className="unit-selector"><span><Store/></span><div><strong>{store.restaurant.name}</strong><small>Unidade {store.restaurant.unit}</small></div><ChevronDown/></div>
      <nav>{NAV_SECTIONS.map((section) => <section key={section.title}><p>{section.title}</p>{section.items.map(([id, label, Icon]) => <button className={page === id ? 'active' : ''} onClick={() => goTo(id)} key={id}><Icon/><span>{label}</span>{id === 'orders' && <b>5</b>}{id === 'inventory' && <i/>}</button>)}</section>)}</nav>
      <div className="sidebar-footer"><button onClick={() => goTo('users')}><span className="user-avatar">{session.initials}</span><div><strong>{session.name}</strong><small>{session.role}</small></div><ChevronRight/></button><button className="logout" onClick={onLogout}><LogOut/><span>Sair</span></button></div>
    </aside>
    {sidebar && <button className="scrim" onClick={() => setSidebar(false)} aria-label="Fechar menu"/>}
    <div className="workspace">
      <header className="topbar"><button className="mobile-menu" onClick={() => setSidebar(true)}><Menu/></button><button className="collapse-button" onClick={() => setCollapsed(!collapsed)}><PanelLeftClose/></button><div className="global-search"><Search/><input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Buscar módulo, pedido ou produto..."/><kbd>⌘ K</kbd>{searchResults.length > 0 && <div className="search-results">{searchResults.map(([id, label, Icon]) => <button onClick={() => goTo(id)} key={id}><Icon/><span>{label}</span><ChevronRight/></button>)}</div>}</div><div className="topbar-actions"><span className="sync"><i/>Dados sincronizados</span><button><Bell/><i/></button><button className="quick" onClick={() => goTo('pos')}><Zap/>Nova venda</button></div></header>
      <main className="page-content">{renderPage()}</main>
    </div>
    {toast && <div className="toast"><span><Check/></span><div><strong>Operação concluída</strong><small>{toast}</small></div><button onClick={() => setToast('')}><X/></button></div>}
  </div>
}

function App() {
  const [session, setSession] = useLocalState('mesanexo-demo-session', null)
  if (!session) return <Login onLogin={setSession}/>
  return <Shell session={session} onLogout={() => setSession(null)}/>
}

export default App
