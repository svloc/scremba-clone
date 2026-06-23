import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-pricing-page',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <main class="page">
      <header class="header">
        <h1>Pricing</h1>
        <p class="sub">Pick the plan that helps you learn and ship faster.</p>
      </header>

      <section class="grid">
        <article class="card">
          <h2 class="planTitle">Free</h2>
          <p class="price">$0</p>
          <ul class="list">
            <li>Access to public lessons</li>
            <li>Community support</li>
            <li>Basic progress tracking</li>
          </ul>
          <a routerLink="/courses" class="btn btn--ghost">Browse courses</a>
        </article>

        <article class="card card--pro">
          <div class="badge">Most popular</div>
          <h2 class="planTitle">Go Pro</h2>
          <p class="price">$19/mo</p>
          <ul class="list">
            <li>Full access to the Frontend Path</li>
            <li>Interactive screencasts + challenges</li>
            <li>Certification-ready roadmap</li>
            <li>Priority instructor feedback</li>
          </ul>
          <a routerLink="/login" class="btn btn--primary">Start Pro</a>
        </article>
      </section>

      <section class="faq">
        <h2 class="faqTitle">Quick FAQ</h2>
        <div class="faqItem">
          <h3>Can I cancel anytime?</h3>
          <p>Yes. Go Pro is flexible—cancel when you want.</p>
        </div>
        <div class="faqItem">
          <h3>Do you offer refunds?</h3>
          <p>Refunds follow the usual policy window. (MVP placeholder.)</p>
        </div>
      </section>
    </main>
  `,
  styles: [
    `.page{max-width:1080px;margin:0 auto;padding:24px}`,
    `.header{margin:12px 0 24px}`,
    `h1{font-size:28px;margin-bottom:6px}`,
    `.sub{color:rgba(0,0,0,.65);font-size:14px;max-width:720px}`,
    `.grid{display:grid;grid-template-columns:1fr;gap:16px}`,
    `@media (min-width:780px){.grid{grid-template-columns:repeat(2,1fr)}}`,
    `.card{border:1px solid rgba(0,0,0,.08);border-radius:14px;background:#fff;padding:18px;position:relative;overflow:hidden}`,
    `.card--pro{border-color:rgba(80,53,255,.35);box-shadow:0 10px 28px rgba(80,53,255,.12)}`,
    `.badge{position:absolute;top:14px;right:14px;background:rgba(80,53,255,.10);color:#5035ff;font-weight:800;font-size:12px;padding:6px 10px;border-radius:999px}`,
    `.planTitle{font-size:16px;margin-bottom:10px}`,
    `.price{font-size:34px;font-weight:900;margin:0 0 12px}`,
    `.list{list-style:none;padding:0;margin:0;display:flex;flex-direction:column;gap:10px;color:rgba(0,0,0,.75);font-weight:600;font-size:14px}`,
    `.btn{display:inline-block;margin-top:16px;text-decoration:none;border-radius:10px;padding:12px 14px;font-weight:900}`,
    `.btn--primary{background:#5035ff;color:#fff}`,
    `.btn--ghost{background:rgba(80,53,255,.08);color:#5035ff}`,
    `.faq{margin-top:26px;border-radius:14px;border:1px solid rgba(0,0,0,.08);background:#fff;padding:18px}`,
    `.faqTitle{font-size:18px;margin:0 0 12px}`,
    `.faqItem{padding:12px 0;border-top:1px dashed rgba(0,0,0,.12)}`,
    `.faqItem:first-child{border-top:none;padding-top:0}`,
    `.faqItem h3{font-size:15px;margin:0 0 6px}`,
    `.faqItem p{margin:0;color:rgba(0,0,0,.65);font-size:14px;font-weight:600}`
  ]
})
export class PricingPage {}

