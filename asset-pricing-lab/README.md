# Interactive Asset Pricing Lab

**Understand why different assets earn different expected returns through macro shocks, factor exposure, and visual pricing logic.**

An interactive educational web app that teaches asset pricing theory through hands-on simulations. Built for financial economics students and anyone curious about how risk is priced in financial markets.

## Concepts Covered

- **Stochastic Discount Factor**: p = E[mx]
- **Expected return and SDF covariance**: E(Rⁱ) - Rf = -Cov(m,Rⁱ)/E(m)
- **Factor models**: m = a + b₁F₁ + ... + bₖFₖ
- **Factor betas**: βᵢₖ = Cov(Rᵢ,Fₖ)/Var(Fₖ)
- **Risk premium decomposition**: E(Rᵢ) = Rf + Σ βᵢₖλₖ
- **APT and no-arbitrage**

## Simulation Scenarios

1. **AI Power Rush** — Power demand surge, growth exposure, cash-flow vs required return
2. **Oil Shock Crisis** — Oil beta, hedged vs unhedged airlines, factor isolation
3. **Inflation Defender** — TIPS vs nominal bonds, inflation hedge, state pricing

## Tech Stack

React 19 · TypeScript · Vite · Tailwind CSS 4 · Recharts · KaTeX · Framer Motion

## Development

```bash
cd asset-pricing-lab
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Deploy

Deployed automatically via GitHub Actions to GitHub Pages on push to `main`.
