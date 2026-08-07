import { useState } from 'react'
import {
  ArrowDownRight, ArrowUpRight, Bell, CalendarDays, ChevronDown, ChevronRight,
  CircleDollarSign, Clock3, Command, HelpCircle, Home, Landmark, LayoutGrid,
  Menu, Package, Search, Settings, ShoppingBag, ShoppingCart, Sparkles, Users, UtensilsCrossed, WalletCards, X,
} from 'lucide-react'

const nav = [
  { label: 'Visão geral', icon: Home },
  { label: 'Pedidos', icon: ShoppingBag, badge: '12' },
  { label: 'Mesas', icon: LayoutGrid },
  { label: 'Cardápio', icon: UtensilsCrossed },
  { label: 'Estoque', icon: Package },
  { label: 'Financeiro', icon: WalletCards },
  { label: 'Equipe', icon: Users },
]

const orders = [
  { id: '#1048', channel: 'Salão · Mesa 08', time: '12:42', value: 'R$ 186,90', status: 'Preparando', color: 'orange', initials: 'M8' },
  { id: '#1047', channel: 'iFood · Delivery', time: '12:38', value: 'R$ 74,50', status: 'Novo pedido', color: 'blue', initials: 'IF' },
  { id: '#1046', channel: 'Balcão · Retirada', time: '12:31', value: 'R$ 52,00', status: 'Pronto', color: 'green', initials: 'BR' },
  { id: '#1045', channel: 'Salão · Mesa 03', time: '12:22', value: 'R$ 128,40', status: 'Preparando', color: 'orange', initials: 'M3' },
]

const products = [
  ['Filé ao molho madeira', '32 pedidos', 'R$ 2.236,80', 88],
  ['Risoto de camarão', '27 pedidos', 'R$ 1.863,00', 74],
  ['Parmegiana da casa', '21 pedidos', 'R$ 1.323,00', 58],
  ['Nhoque artesanal', '18 pedidos', 'R$ 954,00', 48],
]

function Sidebar({ open, close }) {
  return <aside className={`sidebar ${open ? 'open' : ''}`}>
    <div className="brand"><span className="brand-mark"><Command size={21}/></span><span>Mesa<span>Nexo</span></span><button className="close-mobile" onClick={close}><X/></button></div>
    <div className="location"><span className="restaurant-icon"><UtensilsCrossed size={17}/></span><div><strong>Casa Nostra</strong><small>Unidade Vila Madalena</small></div><ChevronDown size={15}/></div>
    <p className="nav-title">GESTÃO</p>
    <nav>{nav.map(({ label, icon: Icon, badge }) => <button className={label === 'Visão geral' ? 'active' : ''} key={label} onClick={close}><Icon size={19}/><span>{label}</span>{badge && <b>{badge}</b>}</button>)}</nav>
    <div className="sidebar-bottom">
      <button><HelpCircle size={19}/><span>Central de ajuda</span></button>
      <button><Settings size={19}/><span>Configurações</span></button>
      <div className="profile"><span className="avatar">LM</span><div><strong>Lucas Martins</strong><small>Administrador</small></div><ChevronRight size={16}/></div>
    </div>
  </aside>
}

function StatCard({ title, value, change, positive, icon: Icon, dark }) {
  return <article className={`stat-card ${dark ? 'dark' : ''}`}>
    <div className="stat-head"><span className="stat-icon"><Icon size={19}/></span><span className="period">Hoje <ChevronDown size={13}/></span></div>
    <p>{title}</p><h2>{value}</h2>
    <div className={`change ${positive ? 'positive' : 'negative'}`}>{positive ? <ArrowUpRight size={15}/> : <ArrowDownRight size={15}/>}<strong>{change}</strong><span>vs. ontem</span></div>
  </article>
}

function App() {
  const [sidebar, setSidebar] = useState(false)
  const [period, setPeriod] = useState('Hoje')
  const [toast, setToast] = useState(false)
  const notify = () => { setToast(true); setTimeout(() => setToast(false), 2500) }
  return <div className="app">
    <Sidebar open={sidebar} close={() => setSidebar(false)}/>{sidebar && <div className="scrim" onClick={() => setSidebar(false)}/>} 
    <main>
      <header>
        <button className="menu-mobile" onClick={() => setSidebar(true)}><Menu/></button>
        <div className="search"><Search size={18}/><input placeholder="Buscar pedidos, mesas ou produtos..."/><kbd>⌘ K</kbd></div>
        <button className="icon-button" onClick={notify}><Bell size={20}/><i/></button>
        <button className="quick" onClick={notify}><Sparkles size={17}/> Ações rápidas <ChevronDown size={15}/></button>
      </header>
      <div className="content">
        <section className="welcome"><div><p>QUINTA-FEIRA, 06 DE AGOSTO</p><h1>Bom dia, Lucas! <span>👋</span></h1><h3>Acompanhe o desempenho do seu restaurante hoje.</h3></div><div className="date-picker"><CalendarDays size={18}/><select value={period} onChange={e => setPeriod(e.target.value)}><option>Hoje</option><option>Esta semana</option><option>Este mês</option></select></div></section>
        <section className="stats">
          <StatCard title="Faturamento" value="R$ 8.452,30" change="12,5%" positive icon={CircleDollarSign}/>
          <StatCard title="Pedidos" value="124" change="8,2%" positive icon={ShoppingCart}/>
          <StatCard title="Ticket médio" value="R$ 68,16" change="2,1%" positive icon={Landmark}/>
          <StatCard title="Tempo médio" value="28 min" change="4,3%" icon={Clock3} dark/>
        </section>
        <section className="grid-main">
          <article className="panel revenue">
            <div className="panel-title"><div><h2>Faturamento</h2><p>Desempenho ao longo do dia</p></div><div className="legend"><i/> Hoje <span/> Ontem</div></div>
            <div className="chart"><div className="y-labels"><span>R$ 3k</span><span>R$ 2k</span><span>R$ 1k</span><span>R$ 0</span></div><div className="plot"><div className="grid-line"/><div className="grid-line"/><div className="grid-line"/><svg viewBox="0 0 700 185" preserveAspectRatio="none"><defs><linearGradient id="area" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#3f9d71" stopOpacity=".26"/><stop offset="1" stopColor="#3f9d71" stopOpacity="0"/></linearGradient></defs><path className="area" d="M0,165 C45,158 58,135 105,140 S175,115 210,122 S280,92 315,103 S370,78 420,82 S480,58 525,66 S590,34 630,43 S676,19 700,25 L700,185 L0,185Z"/><path className="line yesterday" d="M0,170 C70,152 115,158 170,139 S260,136 315,118 S410,110 470,87 S580,79 700,55"/><path className="line today" d="M0,165 C45,158 58,135 105,140 S175,115 210,122 S280,92 315,103 S370,78 420,82 S480,58 525,66 S590,34 630,43 S676,19 700,25"/><circle cx="630" cy="43" r="5" fill="#fff" stroke="#287a55" strokeWidth="3"/></svg><div className="x-labels"><span>08h</span><span>10h</span><span>12h</span><span>14h</span><span>16h</span><span>18h</span><span>20h</span><span>22h</span></div></div></div>
          </article>
          <article className="panel occupation"><div className="panel-title"><div><h2>Ocupação do salão</h2><p>Atualizado agora</p></div><button>Ver mesas <ChevronRight size={15}/></button></div><div className="donut-wrap"><div className="donut"><div><strong>68%</strong><span>ocupado</span></div></div><div className="occupancy-list"><div><i className="busy"/><span>Ocupadas</span><strong>17</strong></div><div><i className="free"/><span>Livres</span><strong>6</strong></div><div><i className="reserved"/><span>Reservadas</span><strong>2</strong></div></div></div><div className="capacity"><span>Capacidade do salão</span><strong>25 mesas · 82 lugares</strong></div></article>
        </section>
        <section className="grid-bottom">
          <article className="panel orders"><div className="panel-title"><div><h2>Pedidos recentes</h2><p>Últimas movimentações</p></div><button>Ver todos <ChevronRight size={15}/></button></div><div className="order-table">{orders.map(o => <div className="order" key={o.id}><span className={`order-avatar ${o.color}`}>{o.initials}</span><div><strong>{o.id}</strong><small>{o.channel}</small></div><span className="order-time">{o.time}</span><strong className="order-value">{o.value}</strong><span className={`status ${o.color}`}><i/>{o.status}</span><ChevronRight className="row-arrow" size={17}/></div>)}</div></article>
          <article className="panel products"><div className="panel-title"><div><h2>Mais vendidos</h2><p>Produtos com melhor saída hoje</p></div><button>Cardápio <ChevronRight size={15}/></button></div><div className="product-list">{products.map((p, i) => <div className="product" key={p[0]}><span className="rank">{i+1}</span><div><strong>{p[0]}</strong><small>{p[1]}</small><div className="bar"><i style={{width: `${p[3]}%`}}/></div></div><b>{p[2]}</b></div>)}</div></article>
        </section>
      </div>
    </main>
    {toast && <div className="toast"><span><Bell size={17}/></span><div><strong>Tudo em dia!</strong><small>Você não tem novas pendências.</small></div></div>}
  </div>
}

export default App
