export const demoUser = {
  name: 'Administrador Demo',
  email: 'admin@demo.mesanexo.local',
  role: 'Administrador',
  initials: 'AD',
}

export const initialStore = {
  restaurant: {
    name: 'Casa Nostra',
    unit: 'Vila Madalena',
    document: '00.000.000/0000-00',
    phone: '(00) 0000-0000',
    serviceFee: 10,
    tables: 18,
    open: '11:00',
    close: '23:30',
  },
  tables: Array.from({ length: 18 }, (_, index) => {
    const number = index + 1
    const occupied = [2, 3, 5, 8, 9, 12, 14, 16].includes(number)
    const reserved = [7, 18].includes(number)
    return {
      id: number,
      name: `Mesa ${String(number).padStart(2, '0')}`,
      seats: number % 4 === 0 ? 6 : 4,
      status: occupied ? 'ocupada' : reserved ? 'reservada' : 'livre',
      guests: occupied ? (number % 3) + 2 : 0,
      total: occupied ? 48.9 + number * 9.7 : 0,
      openedAt: occupied ? `${11 + (number % 2)}:${number % 2 ? '18' : '42'}` : null,
    }
  }),
  products: [
    { id: 1, name: 'Filé ao molho madeira', category: 'Pratos principais', price: 69.9, cost: 24.8, available: true, sales: 32, stock: 18, color: '#a8754f' },
    { id: 2, name: 'Risoto de camarão', category: 'Pratos principais', price: 72.0, cost: 29.4, available: true, sales: 27, stock: 14, color: '#d79b52' },
    { id: 3, name: 'Parmegiana da casa', category: 'Pratos principais', price: 63.0, cost: 21.1, available: true, sales: 21, stock: 16, color: '#b95745' },
    { id: 4, name: 'Nhoque artesanal', category: 'Massas', price: 53.0, cost: 16.8, available: true, sales: 18, stock: 22, color: '#7a9f66' },
    { id: 5, name: 'Burrata da casa', category: 'Entradas', price: 46.0, cost: 17.9, available: true, sales: 15, stock: 8, color: '#8d7cbb' },
    { id: 6, name: 'Tiramisù clássico', category: 'Sobremesas', price: 29.0, cost: 8.7, available: true, sales: 19, stock: 12, color: '#a98264' },
    { id: 7, name: 'Suco natural', category: 'Bebidas', price: 14.0, cost: 4.1, available: true, sales: 38, stock: 36, color: '#5d9f7b' },
    { id: 8, name: 'Água com gás', category: 'Bebidas', price: 8.0, cost: 2.2, available: false, sales: 24, stock: 0, color: '#5689a9' },
  ],
  ingredients: [
    { id: 1, name: 'Filé mignon', unit: 'kg', cost: 72.0, quantity: 8.4, minimum: 5, expiry: '05/09/2026' },
    { id: 2, name: 'Camarão limpo', unit: 'kg', cost: 89.0, quantity: 3.2, minimum: 4, expiry: '31/08/2026' },
    { id: 3, name: 'Arroz arbóreo', unit: 'kg', cost: 24.5, quantity: 14.8, minimum: 6, expiry: '20/11/2026' },
    { id: 4, name: 'Molho de tomate', unit: 'L', cost: 16.9, quantity: 9.5, minimum: 5, expiry: '07/09/2026' },
    { id: 5, name: 'Queijo parmesão', unit: 'kg', cost: 68.0, quantity: 4.1, minimum: 3, expiry: '12/09/2026' },
    { id: 6, name: 'Creme de leite', unit: 'L', cost: 18.2, quantity: 2.4, minimum: 3, expiry: '30/08/2026' },
  ],
  orders: [
    { id: 1052, channel: 'Mesa 08', customer: 'Cliente Aurora', time: '12:52', total: 186.9, status: 'preparando', items: 4, note: 'Filé ao ponto, sem cebola' },
    { id: 1051, channel: 'Delivery', customer: 'Cliente Horizonte', time: '12:48', total: 74.5, status: 'novo', items: 2, note: 'Interfone 32' },
    { id: 1050, channel: 'Balcão', customer: 'Consumidor final', time: '12:41', total: 52.0, status: 'pronto', items: 2, note: 'Retirada no balcão' },
    { id: 1049, channel: 'Mesa 03', customer: 'Cliente Atlântico', time: '12:34', total: 128.4, status: 'preparando', items: 3, note: 'Sem lactose' },
    { id: 1048, channel: 'Mesa 12', customer: 'Cliente Primavera', time: '12:22', total: 96.0, status: 'entregue', items: 3, note: '' },
  ],
  customers: [
    { id: 1, name: 'Cliente Aurora', phone: '(00) 00000-0001', email: 'cliente1@example.invalid', orders: 18, spent: 2348.7, preference: 'Mesa · Massas' },
    { id: 2, name: 'Cliente Horizonte', phone: '(00) 00000-0002', email: 'cliente2@example.invalid', orders: 11, spent: 1042.3, preference: 'Delivery' },
    { id: 3, name: 'Cliente Atlântico', phone: '(00) 00000-0003', email: 'cliente3@example.invalid', orders: 23, spent: 3180.2, preference: 'Sem lactose' },
    { id: 4, name: 'Cliente Primavera', phone: '(00) 00000-0004', email: 'cliente4@example.invalid', orders: 8, spent: 864.5, preference: 'Mesa · Carnes' },
  ],
  suppliers: [
    { id: 1, name: 'Premium Carnes', contact: 'Contato comercial A', phone: '(00) 0000-0001', products: 'Carnes nobres', terms: '14 dias', status: 'ativo' },
    { id: 2, name: 'Horta Viva', contact: 'Contato comercial B', phone: '(00) 0000-0002', products: 'Hortifruti', terms: '7 dias', status: 'ativo' },
    { id: 3, name: 'Costa Pescados', contact: 'Contato comercial C', phone: '(00) 0000-0003', products: 'Peixes e frutos do mar', terms: 'À vista', status: 'ativo' },
  ],
  purchases: [
    { id: 238, supplier: 'Premium Carnes', date: '28/08/2026', total: 1840.0, status: 'aguardando', items: 5 },
    { id: 237, supplier: 'Horta Viva', date: '27/08/2026', total: 486.3, status: 'recebido', items: 12 },
    { id: 236, supplier: 'Costa Pescados', date: '25/08/2026', total: 1275.0, status: 'recebido', items: 4 },
  ],
  cash: {
    open: true,
    openedAt: '10:48',
    openingBalance: 300,
    balance: 8752.3,
    movements: [
      { id: 1, type: 'Venda', description: 'Pedido #1050 · Cartão', value: 52.0, time: '12:43' },
      { id: 2, type: 'Venda', description: 'Pedido #1048 · PIX', value: 96.0, time: '12:25' },
      { id: 3, type: 'Sangria', description: 'Retirada para cofre', value: -500.0, time: '11:55' },
      { id: 4, type: 'Suprimento', description: 'Troco adicional', value: 150.0, time: '11:10' },
    ],
  },
  users: [
    { id: 1, name: 'Administrador Demo', email: 'admin@demo.mesanexo.local', role: 'Administrador', status: 'ativo', last: 'Agora' },
    { id: 2, name: 'Gerente Demo', email: 'gerencia@demo.mesanexo.local', role: 'Gerente', status: 'ativo', last: 'Há 12 min' },
    { id: 3, name: 'Caixa Demo', email: 'caixa@demo.mesanexo.local', role: 'Operador de caixa', status: 'ativo', last: 'Há 2 min' },
    { id: 4, name: 'Cozinha Demo', email: 'cozinha@demo.mesanexo.local', role: 'Cozinha', status: 'ativo', last: 'Há 6 min' },
  ],
}
