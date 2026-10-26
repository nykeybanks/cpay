'use client'

import { useEffect, useRef, useState } from 'react'
import { ArrowLeft, ArrowRight, FileText, Info, X } from 'lucide-react'

export function InvoicePreview({ open, onClose }: { open: boolean; onClose: () => void }) {
  const dialog = useRef<HTMLDialogElement>(null)
  const [preview, setPreview] = useState(false)
  const [amount, setAmount] = useState('')
  const [reference, setReference] = useState('')
  const [asset, setAsset] = useState('USDC')
  const [network, setNetwork] = useState('Ethereum')
  useEffect(() => {
    if (open) { setPreview(false); dialog.current?.showModal() }
    else dialog.current?.close()
  }, [open])
  return <dialog ref={dialog} className="invoice-dialog" onCancel={onClose} onClick={e => { if (e.target === dialog.current) onClose() }} aria-labelledby="invoice-title"><div className="dialog-inner"><div className="dialog-header"><span className="eyebrow">INVOICE WORKSPACE</span><button className="icon-button" onClick={onClose} aria-label="Close invoice preview"><X size={20} /></button></div><h2 id="invoice-title">{preview ? 'Your invoice preview' : 'Create an invoice preview'}</h2><p className="muted">Explore the details. No payment request will be created.</p>{preview ? <div className="invoice-result"><span className="empty-icon"><FileText size={24} /></span><span className="eyebrow">AMOUNT REQUESTED</span><strong className="preview-amount">{Number(amount).toLocaleString('en-US', { maximumFractionDigits: 6 })} <small>{asset}</small></strong><dl><div><dt>Reference</dt><dd>{reference}</dd></div><div><dt>Network</dt><dd>{network}</dd></div><div><dt>Status</dt><dd>Preview only</dd></div></dl><div className="info-box"><Info size={18} /><span>This is not a payable invoice. Connect a backend and configure the SDK to issue signed payment links.</span></div><button className="button secondary" onClick={() => setPreview(false)}><ArrowLeft size={16} /> Edit details</button></div> : <form onSubmit={e => { e.preventDefault(); setPreview(true) }}><label>Invoice reference<input autoComplete="off" name="reference" placeholder="e.g. INV-001" maxLength={64} required value={reference} onChange={e => setReference(e.target.value)} pattern=".*\S.*" /></label><div className="form-columns"><label>Amount<input name="amount" placeholder="0.00" inputMode="decimal" type="number" min="0.000001" max="999999999" step="0.000001" required value={amount} onChange={e => setAmount(e.target.value)} /></label><label>Asset<select value={asset} onChange={e => setAsset(e.target.value)}><option>USDC</option><option>USDT</option></select></label></div><label>Network<select value={network} onChange={e => setNetwork(e.target.value)}><option>Ethereum</option><option>BNB Smart Chain</option></select></label><div className="info-box"><Info size={18} /><span>Preview details are temporary and are not saved. No wallet connection or funds are required.</span></div><button className="button gold" type="submit">Preview invoice <ArrowRight size={16} /></button></form>}</div></dialog>
}
