'use client'

import { useState } from 'react'
import { ArrowDownLeft, ArrowRight, ArrowUpRight, Check, ChevronDown, CircleHelp, Code2, FileText, Layers3, Plus, Wallet } from 'lucide-react'

export function Overview({ onInvoice, onWallet, onDevelopers }: { onInvoice: () => void; onWallet: () => void; onDevelopers: () => void }) {
  const [period, setPeriod] = useState('7D')
  return <>
    <section className="welcome-panel">
      <div className="welcome-copy">
        <div className="eyebrow"><span className="status-dot" /> THE PAYMENT LAYER, REIMAGINED</div>
        <h2>Your payments.<br /><span>Under your control.</span></h2>
        <p>A clear view of every payment. A direct path to your wallet.<br className="desktop-break" /> Set up your workspace to get started.</p>
        <button className="button gold" onClick={onWallet}>Set up your wallet <ArrowUpRight size={16} /></button>
      </div>
      <div className="setup-panel">
        <div className="setup-heading"><span>Workspace setup</span><span className="muted">0 of 3</span></div>
        <div className="progress-track"><span /></div>
        <button className="setup-step" onClick={onWallet}><span className="step-icon"><Wallet size={18} /></span><span><strong>Configure receiving wallet</strong><small>Define where your payments arrive</small></span><ArrowUpRight size={16} /></button>
        <button className="setup-step" onClick={onInvoice}><span className="step-icon"><FileText size={18} /></span><span><strong>Explore your first invoice</strong><small>Preview the payment experience</small></span><ArrowUpRight size={16} /></button>
        <button className="setup-step" onClick={onDevelopers}><span className="step-icon"><Code2 size={18} /></span><span><strong>Integrate the SDK</strong><small>Connect your application</small></span><ArrowUpRight size={16} /></button>
      </div>
    </section>
    <section className="metrics" aria-label="Payment metrics">
      {[{ title: 'Total payment volume', icon: ArrowDownLeft, note: 'Across all supported assets', unit: 'USD' }, { title: 'Successful payments', icon: Check, note: 'Confirmed on-chain', unit: '' }, { title: 'Pending payments', icon: Layers3, note: 'Awaiting confirmation', unit: '' }, { title: 'Payment success rate', icon: ArrowUpRight, note: 'Completed / total payments', unit: '%' }].map(({ title, icon: Icon, note, unit }) => <article className="metric" key={title}><div className="metric-label"><span>{title}</span><Icon size={17} /></div><div className="metric-value">— <span>{unit}</span></div><div className="metric-note"><span className="mini-dash">—</span>{note}</div></article>)}
    </section>
    <div className="analytics-grid">
      <section className="panel volume-panel">
        <div className="panel-heading"><div><h2>Payment volume</h2><p>Your payment activity over time</p></div><div className="period-switch" aria-label="Chart time range">{['7D', '30D', '90D', '1Y'].map(p => <button key={p} onClick={() => setPeriod(p)} aria-pressed={period === p} className={period === p ? 'selected' : ''}>{p}</button>)}</div></div>
        <div className="chart-key"><span className="square-dot" /> Total volume <span className="muted">USD</span></div>
        <div className="empty-chart"><div className="chart-grid" aria-hidden="true">{[4, 3, 2, 1, 0].map(i => <div key={i}><span>—</span><i /></div>)}</div><div className="chart-message"><span className="empty-icon"><ArrowDownLeft size={22} /></span><strong>Your activity starts here</strong><span>Payment volume will appear when your backend is connected.</span></div></div>
        <div className="chart-footer"><span>No data for the selected {period === '1Y' ? 'year' : `${parseInt(period)} days`}</span><span>UTC <CircleHelp size={14} /></span></div>
      </section>
      <section className="panel assets-panel"><div className="panel-heading"><div><h2>Payment assets</h2><p>Built for on-chain payments</p></div><span className="subtle-label">SDK</span></div><div className="asset-list">{[{ symbol: 'T', name: 'Tether', ticker: 'USDT' }, { symbol: '$', name: 'USD Coin', ticker: 'USDC' }].map(asset => <div className="asset" key={asset.ticker}><span className="coin-icon">{asset.symbol}</span><div><strong>{asset.name}</strong><span>{asset.ticker}</span></div><div className="asset-value"><strong>—</strong><span>Not configured</span></div></div>)}</div><div className="network-block"><span className="eyebrow">SUPPORTED SDK NETWORKS</span><div className="network-chips"><span><span className="network-diamond" /> Ethereum</span><span><Layers3 size={14} /> BNB Smart Chain</span></div></div><button className="text-button asset-link" onClick={onWallet}>Manage payment configuration <ArrowRight size={16} /></button></section>
    </div>
    <Transactions onInvoice={onInvoice} />
  </>
}

export function Transactions({ onInvoice, invoiceView = false }: { onInvoice: () => void; invoiceView?: boolean }) {
  const [filter, setFilter] = useState('All statuses')
  return <section className="panel transactions-panel"><div className="panel-heading"><div><h2>{invoiceView ? 'Invoices' : 'Recent payments'} <span className="count">0</span></h2><p>{invoiceView ? 'Preview invoices before connecting your backend' : 'Track every payment, from request to confirmation'}</p></div><label className="select-wrap"><span className="sr-only">Filter by status</span><select value={filter} onChange={e => setFilter(e.target.value)}><option>All statuses</option><option>Confirmed</option><option>Pending</option><option>Expired</option></select><ChevronDown size={14} /></label></div><div className="table-scroll"><table><thead><tr><th>Invoice / reference</th><th>Amount</th><th>Asset / network</th><th>Status</th><th>Created</th><th /></tr></thead><tbody><tr><td colSpan={6}><div className="table-empty"><FileText size={23} /><strong>{filter === 'All statuses' ? 'A clean slate. Ready for your first payment.' : `No ${filter.toLowerCase()} payments`}</strong><span>No live records are connected to this prototype.</span><button className="text-button" onClick={onInvoice}><Plus size={15} /> Preview an invoice</button></div></td></tr></tbody></table></div><div className="table-footer"><span>0 records</span><span>Live payment processing is not enabled</span></div></section>
}
