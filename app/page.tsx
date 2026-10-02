'use client';

import Image from 'next/image';
import { FormEvent, useMemo, useState } from 'react';
import {
  ArrowDownRight, ArrowRight, CalendarDays, Check, ChevronLeft, ChevronRight,
  Clock3, Flame, ForkKnifeCrossed, Heart, Instagram, MapPin, Menu as MenuIcon,
  Minus, PackageCheck, Phone, Plus, Quote, ShoppingBag, Sparkles, Star, Users,
  Utensils, Wheat, X, Zap
} from 'lucide-react';
import { menu, MenuItem } from '@/lib/menu';

type CartLine = MenuItem & { quantity: number };
type OrderMode = 'Delivery' | 'Pickup';

const whatsappBase = 'https://wa.me/254112272061?text=Hello!%20I%27d%20like%20to%20place%20a%20food%20order%20from%20Jiko%20Kitchen.';
const imageBlur = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA4IDUiPjxsaW5lYXJHcmFkaWVudCBpZD0iZyIgeDE9IjAiIHgyPSIxIiB5MT0iMCIgeTI9IjEiPjxzdG9wIHN0b3AtY29sb3I9IiMxYjQzMzIiLz48c3RvcCBvZmZzZXQ9IjEiIHN0b3AtY29sb3I9IiNhMDUyMmQiLz48L2xpbmVhckdyYWRpZW50PjxyZWN0IHdpZHRoPSI4IiBoZWlnaHQ9IjUiIGZpbGw9InVybCgjZykiLz48L3N2Zz4=';
const categories = ['All', 'Breakfast', 'Mains', 'Grills', 'Sides', 'Drinks', 'Desserts', 'Specials'];
const gallery = [
  { src: 'https://images.unsplash.com/photo-1515003197210-e0cd71810b5f?auto=format&fit=crop&w=1100&q=85', alt: 'Dinner table at Jiko Kitchen', className: 'gallery-tall' },
  { src: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1000&q=85', alt: 'Warm restaurant dining room', className: '' },
  { src: 'https://images.unsplash.com/photo-1556761223-4c4282c73f77?auto=format&fit=crop&w=1000&q=85', alt: 'Kitchen team preparing food', className: '' },
  { src: 'https://images.unsplash.com/photo-1541544741938-0af808871cc0?auto=format&fit=crop&w=1100&q=85', alt: 'Shared plates at a dinner table', className: 'gallery-wide' },
  { src: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=1000&q=85', alt: 'Fresh food plated for sharing', className: '' },
];
const testimonials = [
  { name: 'Wanjiku M.', role: 'Kilimani regular', quote: 'The coastal pilau takes me straight home. Generous portions, brilliant flavour, and it arrived properly hot.', rating: 5 },
  { name: 'Brian O.', role: 'Westlands', quote: 'Jiko is our office lunch ritual. The nyama choma platter is smoky, tender and never disappoints.', rating: 5 },
  { name: 'Amina A.', role: 'Lavington', quote: 'Warm service and food made with real care. The tamarind chicken is now a standing order in our house.', rating: 5 },
];

function Ksh({ value }: { value: number }) { return <>KES {value.toLocaleString()}</>; }

export default function Home() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [cart, setCart] = useState<CartLine[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [orderMode, setOrderMode] = useState<OrderMode>('Delivery');
  const [notice, setNotice] = useState('');
  const [reservationNotice, setReservationNotice] = useState('');
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [quoteIndex, setQuoteIndex] = useState(0);
  const [newsletter, setNewsletter] = useState('');
  const [lightbox, setLightbox] = useState<number | null>(null);
  const [flyingPlate, setFlyingPlate] = useState(false);

  const filteredMenu = useMemo(() => activeCategory === 'All' ? menu : menu.filter((item) => item.category === activeCategory), [activeCategory]);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const deliveryFee = orderMode === 'Delivery' && cart.length ? 150 : 0;

  function addToCart(item: MenuItem) {
    setCart((current) => {
      const existing = current.find((line) => line.id === item.id);
      return existing ? current.map((line) => line.id === item.id ? { ...line, quantity: line.quantity + 1 } : line) : [...current, { ...item, quantity: 1 }];
    });
    setFlyingPlate(true);
    window.setTimeout(() => setFlyingPlate(false), 900);
  }
  function updateQuantity(id: number, delta: number) {
    setCart((current) => current.flatMap((line) => line.id === id ? (line.quantity + delta > 0 ? [{ ...line, quantity: line.quantity + delta }] : []) : [line]));
  }
  async function submitReservation(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const payload = Object.fromEntries(form.entries());
    const response = await fetch('/api/reservation', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
    if (response.ok) { const result = await response.json(); window.open(result.whatsapp, '_blank', 'noopener,noreferrer'); setReservationNotice('Request received — we’ll confirm your table on WhatsApp shortly.'); event.currentTarget.reset(); }
    else setReservationNotice('Please check the form and try again.');
  }
  async function submitCheckout(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const payload = { ...Object.fromEntries(form.entries()), mode: orderMode, items: cart, subtotal, deliveryFee, total: subtotal + deliveryFee };
    const response = await fetch('/api/order', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
    if (response.ok) { const result = await response.json(); window.open(result.whatsapp, '_blank', 'noopener,noreferrer'); setCart([]); setCheckoutOpen(false); setCartOpen(false); setNotice('Order received! Your WhatsApp order summary is ready to send.'); }
    else setNotice('Something needs your attention. Please check the checkout form.');
  }
  async function subscribe(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const response = await fetch('/api/newsletter', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email: newsletter }) });
    if (response.ok) { setNewsletter(''); setNotice('You’re on the Jiko list. Karibu!'); }
  }

  return <main>
    {notice && <div className="notice" role="status"><Check size={16} /> {notice}<button aria-label="Dismiss" onClick={() => setNotice('')}><X size={16} /></button></div>}
    <div className="topbar"><div className="shell topbar-inner"><span><Clock3 size={14} /> Open daily 7am–11pm</span><span className="topbar-hide">•</span><span className="topbar-hide">Free delivery within 5km</span><span className="topbar-hide">•</span><a href={whatsappBase} target="_blank">WhatsApp orders: +254 112 272 061 <ArrowUpRightMini /></a></div></div>

    <header className="nav-wrap">
      <nav className="shell navbar" aria-label="Main navigation">
        <a className="brand" href="#top" aria-label="Jiko Kitchen home"><span className="brand-mark"><Flame size={21} fill="currentColor" /></span><span>Jiko<em>Kitchen</em></span></a>
        <div className="nav-links">{['Menu', 'About', 'Reservations', 'Catering', 'Gallery', 'Contact'].map((link) => <a key={link} href={`#${link.toLowerCase()}`}>{link}</a>)}</div>
        <div className="nav-actions"><button className="cart-trigger" onClick={() => setCartOpen(true)} aria-label="Open cart"><ShoppingBag size={19} />{cartCount > 0 && <b>{cartCount}</b>}</button><a className="button button-dark nav-order" href="#menu"><span>Order now</span><ArrowRight size={16} /></a><button className="mobile-menu" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Toggle menu">{mobileOpen ? <X /> : <MenuIcon />}</button></div>
      </nav>
      {mobileOpen && <div className="mobile-nav shell">{['Menu', 'About', 'Reservations', 'Catering', 'Gallery', 'Contact'].map((link) => <a onClick={() => setMobileOpen(false)} key={link} href={`#${link.toLowerCase()}`}>{link}</a>)}</div>}
    </header>

    <section className="hero" id="top">
      <video className="hero-video" autoPlay muted loop playsInline poster="https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=1800&q=90"><source src="https://videos.pexels.com/video-files/4253302/4253302-hd_1920_1080_25fps.mp4" type="video/mp4" /></video>
      <div className="hero-overlay" />
      <div className="hero-grain" />
      <div className="shell hero-content">
        <p className="eyebrow eyebrow-light"><span /> Nairobi’s kitchen since 2014</p>
        <h1>Real food.<br /><i>Real flavour.</i><br />Real Nairobi.</h1>
        <p className="hero-copy">From slow-simmered stews to fire-kissed grills, every plate is a little love letter to the flavours that raised us.</p>
        <div className="hero-buttons"><a className="button button-saffron" href="#menu">Order delivery <ArrowDownRight size={17} /></a><a className="button button-ghost" href="#reservations">Book a table <CalendarDays size={17} /></a></div>
      </div>
      <div className="hero-bottom shell"><span>Scroll to feast</span><div className="scroll-line" /><span className="hero-circle-text">EST. 2014 • NAIROBI • EST. 2014 •</span></div>
    </section>

    <section className="usp-section"><div className="shell usp-grid">
      <USP icon={<Wheat />} title="Farm fresh" text="Ingredients" />
      <USP icon={<Zap />} title="30-minute" text="Delivery" />
      <USP icon={<Users />} title="Made for" text="Sharing" />
      <USP icon={<Check />} title="Halal" text="Certified" />
    </div></section>

    <Divider label="what’s cooking" />
    <section className="section menu-section" id="menu"><div className="shell">
      <div className="section-heading menu-heading"><div><p className="eyebrow">The Jiko menu</p><h2>A table full of<br /><i>good things.</i></h2></div><p className="section-intro">The heart of East African cooking, with room at the table for new ideas. Made fresh when you ask for it.</p></div>
      <div className="category-row" role="tablist" aria-label="Menu categories">{categories.map((category) => <button role="tab" aria-selected={activeCategory === category} className={activeCategory === category ? 'active' : ''} key={category} onClick={() => setActiveCategory(category)}>{category}</button>)}</div>
      <div className="menu-grid">{filteredMenu.map((item, index) => <article className="dish-card" style={{ animationDelay: `${index * 55}ms` }} key={item.id}><div className="dish-image"><Image placeholder="blur" blurDataURL={imageBlur} src={item.image} alt={item.name} fill sizes="(max-width: 700px) 100vw, (max-width: 1050px) 50vw, 33vw" /><div className="image-shade" />{item.tag && <span className="food-tag">{item.tag}</span>}<button onClick={() => addToCart(item)} aria-label={`Add ${item.name} to cart`} className="round-add"><Plus size={21} /></button></div><div className="dish-body"><div className="dish-title"><h3>{item.name}</h3><b><Ksh value={item.price} /></b></div><p>{item.description}</p><button className="text-button" onClick={() => addToCart(item)}>Add to order <ArrowRight size={15} /></button></div></article>)}</div>
      <div className="center"><button className="button button-outline" onClick={() => setActiveCategory('All')}>Explore full menu <ArrowRight size={16} /></button></div>
    </div></section>

    <section className="special"><Image placeholder="blur" blurDataURL={imageBlur} src="https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=1800&q=90" alt="A rich bowl of Jiko special" fill sizes="100vw" /><div className="special-overlay" /><div className="shell special-content"><p className="eyebrow eyebrow-light"><Sparkles size={15} /> Today’s special</p><h2>Mombasa fish<br /><i>curry.</i></h2><p>Coconut, lime, market catch, and just the right heat.</p><div className="special-bottom"><strong><Ksh value={1420} /></strong><button className="button button-cream" onClick={() => addToCart(menu.find((item) => item.id === 13)!)}>Order this <ArrowRight size={16} /></button></div></div></section>

    <Divider label="our story" dark />
    <section className="section story-section" id="about"><div className="shell story-grid"><div className="story-visual"><div className="story-main"><Image placeholder="blur" blurDataURL={imageBlur} src="https://images.unsplash.com/photo-1515003197210-e0cd71810b5f?auto=format&fit=crop&w=1100&q=85" alt="Warm Jiko dining experience" fill sizes="(max-width: 850px) 100vw, 50vw" /></div><div className="story-inset"><Image placeholder="blur" blurDataURL={imageBlur} src="https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=700&q=85" alt="Chef cooking in a professional kitchen" fill sizes="230px" /></div><div className="est-badge"><span>Made with</span><b>♥</b><span>real care</span></div></div><div className="story-copy"><p className="eyebrow">From our stove to your table</p><h2>Where the <i>fire</i><br />brings us together.</h2><p>Jiko began with one small grill, a grandmother’s spice tin, and the belief that the best meals make room for everyone. A decade later, we’re still cooking the food Nairobi craves — honest, abundant, unmistakably ours.</p><div className="story-facts"><div><strong>2014</strong><span>Established in Nairobi</span></div><div><strong>Chef Nia</strong><span>Head chef & flavour keeper</span></div></div><a className="text-button" href="#gallery">Meet our people <ArrowRight size={16} /></a></div></div></section>

    <section className="reservation-wrap" id="reservations"><div className="shell reservation-card"><div className="reservation-copy"><p className="eyebrow eyebrow-light">Pull up a chair</p><h2>Your table is<br /><i>waiting.</i></h2><p>Bring the whole crew. Book a table and we’ll make sure the welcome is as warm as the jiko.</p><div className="reservation-meta"><span><MapPin size={18} /> Kilimani, Ngong Road</span><span><Phone size={18} /> +254 112 272 061</span></div></div><form onSubmit={submitReservation} className="reservation-form"><div className="form-grid"><Field name="name" label="Your name" placeholder="e.g. Kendi W." required /><Field name="phone" label="Phone number" placeholder="+254 ..." required /><Field name="date" label="Date" type="date" required /><Field name="time" label="Time" type="time" required /><label>Guests<select name="guests" defaultValue="2"><option>1 guest</option><option>2 guests</option><option>3 guests</option><option>4 guests</option><option>5 guests</option><option>6+ guests</option></select></label><Field name="requests" label="A little extra?" placeholder="Occasion, seating..." /></div><button className="button button-saffron form-submit" type="submit">Request a table <ArrowRight size={16} /></button>{reservationNotice && <p className="form-response"><Check size={15} />{reservationNotice}</p>}</form></div></section>

    <section className="section catering-section" id="catering"><div className="shell"><div className="section-heading"><div><p className="eyebrow">Catering by Jiko</p><h2>Big moments,<br /><i>well fed.</i></h2></div><p className="section-intro">We bring Jiko’s generous spirit to the places and people you love — from 20 to 2,000 guests.</p></div><div className="catering-grid"><CateringCard number="01" icon={<PackageCheck />} title="Corporate events" copy="Bright, flavour-forward lunches that make every meeting worth attending." /><CateringCard number="02" icon={<Heart />} title="Weddings" copy="A memorable feast woven around your people, your story, your day." feature /><CateringCard number="03" icon={<Sparkles />} title="Private parties" copy="Birthday, garden party or just because — you bring the guests, we bring the feast." /></div></div></section>

    <section className="testimonials"><div className="shell testimonial-layout"><div><p className="eyebrow eyebrow-light">Good words from good people</p><h2>They came hungry.<br /><i>They left happy.</i></h2><div className="testimonial-arrows"><button aria-label="Previous testimonial" onClick={() => setQuoteIndex((quoteIndex + testimonials.length - 1) % testimonials.length)}><ChevronLeft /></button><button aria-label="Next testimonial" onClick={() => setQuoteIndex((quoteIndex + 1) % testimonials.length)}><ChevronRight /></button></div></div><article className="testimonial-card"><Quote className="quote-icon" /><div className="stars">{Array.from({ length: testimonials[quoteIndex].rating }).map((_, index) => <Star key={index} size={16} fill="currentColor" />)}</div><blockquote>“{testimonials[quoteIndex].quote}”</blockquote><div className="reviewer"><div>{testimonials[quoteIndex].name.split(' ')[0][0]}</div><p><strong>{testimonials[quoteIndex].name}</strong><span>{testimonials[quoteIndex].role}</span></p></div><div className="review-count">{String(quoteIndex + 1).padStart(2, '0')} <span>/ 03</span></div></article></div></section>

    <Divider label="a taste of jiko" />
    <section className="section gallery-section" id="gallery"><div className="shell"><div className="gallery-heading"><div><p className="eyebrow">Around the table</p><h2>Come hungry.<br /><i>Leave glowing.</i></h2></div><a href="https://instagram.com" target="_blank" className="instagram-link"><Instagram size={18} /> @jikokitchen <ArrowUpRightMini /></a></div><div className="gallery-grid">{gallery.map((image, index) => <button className={`gallery-item ${image.className}`} key={image.src} onClick={() => setLightbox(index)}><Image placeholder="blur" blurDataURL={imageBlur} src={image.src} alt={image.alt} fill sizes="(max-width: 700px) 50vw, 33vw" /><span><Plus /></span></button>)}</div></div></section>

    <section className="location-section" id="contact"><div className="map-pane"><iframe title="Map to Jiko Kitchen in Nairobi" src="https://www.google.com/maps?q=Kilimani%2C%20Nairobi%2C%20Kenya&z=14&output=embed" loading="lazy" /></div><div className="location-copy"><p className="eyebrow">Find your way here</p><h2>Meet us<br /><i>at the jiko.</i></h2><address><MapPin size={19} /><span>Jiko Kitchen<br />Ngong Road, Kilimani<br />Nairobi, Kenya</span></address><div className="hours"><div><span>Monday – Friday</span><b>7:00am – 11:00pm</b></div><div><span>Saturday – Sunday</span><b>7:00am – 11:00pm</b></div></div><a className="button button-dark" target="_blank" href="https://maps.google.com/?q=Kilimani,Nairobi,Kenya">Get directions <ArrowUpRightMini /></a></div></section>

    <footer><div className="shell"><div className="footer-main"><div className="footer-brand"><a className="brand" href="#top"><span className="brand-mark"><Flame size={21} fill="currentColor" /></span><span>Jiko<em>Kitchen</em></span></a><p>East African food with a Nairobi soul. Made to gather around.</p><div className="socials"><a href="https://instagram.com" aria-label="Instagram"><Instagram size={18} /></a><a href="https://wa.me/254112272061" aria-label="WhatsApp"><Phone size={17} /></a></div></div><div className="footer-links"><div><h4>Explore</h4><a href="#menu">Our menu</a><a href="#about">Our story</a><a href="#catering">Catering</a><a href="#gallery">Gallery</a></div><div><h4>Visit</h4><a href="#reservations">Book a table</a><a href="#contact">Find us</a><a href={whatsappBase}>WhatsApp us</a><a href="#contact">Opening hours</a></div></div><div className="newsletter"><p className="eyebrow eyebrow-light">From our kitchen</p><h3>Good things are<br />always cooking.</h3><form onSubmit={subscribe}><input type="email" aria-label="Your email" placeholder="Your email address" required value={newsletter} onChange={(event) => setNewsletter(event.target.value)} /><button type="submit" aria-label="Sign up"><ArrowRight /></button></form><small>Fresh news, specials & a little joy. No spam.</small></div></div><div className="footer-bottom"><span>© {new Date().getFullYear()} Jiko Kitchen. Nairobi, Kenya.</span><span>Made with <Heart size={13} fill="currentColor" /> and plenty of chilli.</span></div></div></footer>

    <a className="whatsapp-float" href={whatsappBase} target="_blank" aria-label="Order via WhatsApp"><Phone size={24} /><span>Order via WhatsApp 🍽️</span></a>
    {flyingPlate && <span className="flying-plate" aria-hidden="true">🍽️</span>}

    {cartOpen && <><button className="drawer-scrim" aria-label="Close cart" onClick={() => setCartOpen(false)} /><aside className="cart-drawer" aria-label="Your order"><div className="drawer-head"><div><p className="eyebrow">Your feast</p><h2>Order summary</h2></div><button onClick={() => setCartOpen(false)} aria-label="Close cart"><X /></button></div>{cart.length === 0 ? <div className="empty-cart"><ShoppingBag size={34} /><h3>Your bag is empty</h3><p>There’s a whole kitchen waiting for you.</p><button className="button button-dark" onClick={() => { setCartOpen(false); document.getElementById('menu')?.scrollIntoView({ behavior: 'smooth' }); }}>Browse menu</button></div> : <><div className="cart-items">{cart.map((line) => <div className="cart-line" key={line.id}><Image placeholder="blur" blurDataURL={imageBlur} src={line.image} alt={line.name} width={72} height={72} /><div><h3>{line.name}</h3><b><Ksh value={line.price * line.quantity} /></b><div className="quantity"><button onClick={() => updateQuantity(line.id, -1)} aria-label={`Remove one ${line.name}`}><Minus size={13} /></button><span>{line.quantity}</span><button onClick={() => updateQuantity(line.id, 1)} aria-label={`Add one ${line.name}`}><Plus size={13} /></button></div></div><button className="remove-line" aria-label={`Remove ${line.name}`} onClick={() => setCart((current) => current.filter((item) => item.id !== line.id))}><X size={15} /></button></div>)}</div><div className="order-mode"><button className={orderMode === 'Delivery' ? 'active' : ''} onClick={() => setOrderMode('Delivery')}>Delivery</button><button className={orderMode === 'Pickup' ? 'active' : ''} onClick={() => setOrderMode('Pickup')}>Pickup</button></div><div className="totals"><p><span>Subtotal</span><b><Ksh value={subtotal} /></b></p><p><span>Delivery</span><b>{deliveryFee ? <Ksh value={deliveryFee} /> : 'Free'}</b></p><p className="total"><span>Total</span><b><Ksh value={subtotal + deliveryFee} /></b></p></div><button className="button button-saffron checkout-button" onClick={() => setCheckoutOpen(true)}>Continue to checkout <ArrowRight size={17} /></button></>}</aside></>}
    {checkoutOpen && <div className="modal-backdrop"><section className="checkout-modal"><button className="modal-close" onClick={() => setCheckoutOpen(false)} aria-label="Close checkout"><X /></button><p className="eyebrow">Nearly there</p><h2>Where shall we<br /><i>send the feast?</i></h2><form onSubmit={submitCheckout}><div className="form-grid"><Field name="name" label="Your name" placeholder="e.g. Amina N." required /><Field name="phone" label="Phone number" placeholder="+254 ..." required /><Field name="address" label={orderMode === 'Delivery' ? 'Delivery address' : 'Pickup details'} placeholder={orderMode === 'Delivery' ? 'Estate, building, apartment' : 'Preferred pickup time'} required={orderMode === 'Delivery'} /><Field name="mpesa" label="M-Pesa number" placeholder="07..." required /><label className="wide">Notes<textarea name="notes" placeholder="Allergies, gate instructions, anything else?" /></label></div><button className="button button-saffron form-submit" type="submit">Place order · <Ksh value={subtotal + deliveryFee} /> <ArrowRight size={16} /></button></form></section></div>}
    {lightbox !== null && <div className="lightbox" role="dialog" aria-modal="true"><button aria-label="Close image" onClick={() => setLightbox(null)}><X /></button><Image placeholder="blur" blurDataURL={imageBlur} src={gallery[lightbox].src} alt={gallery[lightbox].alt} fill sizes="100vw" /></div>}
  </main>;
}

function ArrowUpRightMini() { return <span className="arrow-mini">↗</span>; }
function USP({ icon, title, text }: { icon: React.ReactNode; title: string; text: string }) { return <div className="usp"><span>{icon}</span><p><b>{title}</b>{text}</p></div>; }
function Divider({ label, dark = false }: { label: string; dark?: boolean }) { return <div className={`divider ${dark ? 'divider-dark' : ''}`}><span /><ForkKnifeCrossed size={18} /><em>{label}</em><span /></div>; }
function Field({ name, label, type = 'text', placeholder, required = false }: { name: string; label: string; type?: string; placeholder?: string; required?: boolean }) { return <label>{label}<input name={name} type={type} placeholder={placeholder} required={required} /></label>; }
function CateringCard({ number, icon, title, copy, feature = false }: { number: string; icon: React.ReactNode; title: string; copy: string; feature?: boolean }) { return <article className={`catering-card ${feature ? 'catering-feature' : ''}`}><span className="catering-number">{number}</span><div className="catering-icon">{icon}</div><h3>{title}</h3><p>{copy}</p><a className="text-button" target="_blank" href={whatsappBase}>Get a quote <ArrowRight size={15} /></a></article>; }
