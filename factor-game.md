# Cursor Prompt — Build "Macro Shock Arena: Factor Pricing Game"

## Project Overview

Build a single-page interactive educational finance game called **"Macro Shock Arena"** that teaches why different assets earn different expected returns. The game is rooted in Stochastic Discount Factor (SDF) theory, factor pricing (APT), and no-arbitrage logic. The player acts as a portfolio manager responding to macro shocks, making pricing and portfolio decisions, and then seeing detailed after-decision graphs that explain the correct answer using equations and visual decompositions.

The game must be fully static (no backend), deployable on GitHub Pages, and built with React + Vite + Tailwind CSS. Math equations are rendered using KaTeX. Charts and visuals use Recharts and custom SVG.

---

## Tech Stack (strict)

- **React 18** with functional components and hooks
- **Vite** as build tool
- **Tailwind CSS** for all styling (use dark theme as default with option to toggle light)
- **KaTeX** (`react-katex` or `@matejmazur/react-katex`) for rendering all math equations
- **Recharts** for bar charts, line charts, scatter plots, stacked bar charts
- **Framer Motion** for all animations (card reveals, graph transitions, glow effects, score popups)
- **React Router v6** for page navigation (HashRouter for GitHub Pages compatibility)
- **Lucide React** for icons
- No backend. All game data lives in local JSON files inside `/src/data/`
- Deployed via `gh-pages` npm package to GitHub Pages

---

## GitHub Pages Deployment Setup

### Vite config

```js
// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/macro-shock-arena/',  // repo name
})
```

### Package.json scripts

```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "predeploy": "npm run build",
    "deploy": "gh-pages -d dist"
  }
}
```

### Router

Use `HashRouter` instead of `BrowserRouter` because GitHub Pages does not support client-side routing fallbacks.

```jsx
import { HashRouter } from 'react-router-dom'

<HashRouter>
  <App />
</HashRouter>
```

### Deployment command

```bash
npm run deploy
```

This pushes the `/dist` folder to the `gh-pages` branch automatically.

---

## Project Folder Structure

```
macro-shock-arena/
├── public/
│   └── favicon.svg
├── src/
│   ├── main.jsx                    # Entry point, renders App inside HashRouter
│   ├── App.jsx                     # Top-level routing and layout
│   │
│   ├── pages/
│   │   ├── HomePage.jsx            # Landing page with hero section
│   │   ├── GamePage.jsx            # Main game interface
│   │   ├── SandboxPage.jsx         # Free exploration mode
│   │   └── LearnPage.jsx           # Equation reference / theory glossary
│   │
│   ├── components/
│   │   ├── layout/
│   │   │   ├── TopBar.jsx          # Score, round number, difficulty, pinned equation
│   │   │   ├── LeftPanel.jsx       # Macro shock card + factor indicators
│   │   │   ├── CenterPanel.jsx     # Asset cards grid
│   │   │   ├── RightPanel.jsx      # Equation + graph area with tabs
│   │   │   └── BottomPanel.jsx     # Decision console (drag-drop, sliders, submit)
│   │   │
│   │   ├── game/
│   │   │   ├── ShockCard.jsx       # Displays the macro event headline + description
│   │   │   ├── AssetCard.jsx       # Individual asset: icon, name, price, mini chart, factor clues
│   │   │   ├── FactorIndicator.jsx # Single factor gauge (growth, inflation, oil, power demand)
│   │   │   ├── DecisionRanker.jsx  # Drag-and-drop ranking for expected returns
│   │   │   ├── BetaPlacement.jsx   # 2D canvas where player places assets on growth-beta vs inflation-beta axes
│   │   │   ├── PortfolioBuilder.jsx# Slider-based long/short weight assignment for arbitrage construction
│   │   │   ├── ScorePopup.jsx      # Animated star rating + score breakdown after each round
│   │   │   ├── TutorialOverlay.jsx # 3-4 step speech bubble tutorial before first play of each mode
│   │   │   └── TimerBar.jsx        # Optional round timer for difficulty modes
│   │   │
│   │   ├── graphs/
│   │   │   ├── StatePayoffGraph.jsx    # Bar chart: states on x-axis, payoff on y-axis, SDF weight overlay
│   │   │   ├── CovarianceGraph.jsx     # Dual-line chart: SDF line + asset return line, shaded overlap in bad states
│   │   │   ├── FactorBetaBarChart.jsx  # Horizontal bar chart showing beta for each factor per asset
│   │   │   ├── ReturnDecomposition.jsx # Stacked bar chart: Rf + β₁λ₁ + β₂λ₂ + ... = E(Ri)
│   │   │   ├── ScatterBetaPlot.jsx     # Scatter: x = factor shock, y = asset return, regression line = beta
│   │   │   ├── ArbitragePayoff.jsx     # State-contingent payoff bars for long-short portfolio
│   │   │   └── FactorNeutralization.jsx# Before/after bars showing net factor exposure of portfolio
│   │   │
│   │   ├── equations/
│   │   │   ├── PinnedEquation.jsx      # Always-visible main equation for current phase
│   │   │   ├── ExpandedInterpretation.jsx # Below pinned: variable definitions and intuition
│   │   │   └── LiveDecomposition.jsx   # Animated equation where individual terms glow/highlight on interaction
│   │   │
│   │   └── ui/
│   │       ├── Button.jsx
│   │       ├── Card.jsx
│   │       ├── TabSwitcher.jsx
│   │       ├── Slider.jsx
│   │       ├── Badge.jsx
│   │       ├── ProgressBar.jsx
│   │       └── ThemeToggle.jsx
│   │
│   ├── data/
│   │   ├── scenarios/
│   │   │   ├── ai-power-surge.json
│   │   │   ├── oil-shock.json
│   │   │   ├── inflation-surprise.json
│   │   │   └── growth-slowdown.json
│   │   ├── assets.json              # All asset archetypes with properties
│   │   └── factors.json             # Factor definitions, default premia, state behaviors
│   │
│   ├── engine/
│   │   ├── pricing.js               # Computes p = E[mx], expected returns, risk-free rate
│   │   ├── beta.js                  # Computes factor betas from covariance/variance
│   │   ├── arbitrage.js             # Detects mispricing, validates zero-beta portfolios
│   │   ├── scoring.js               # Computes star rating and score breakdown
│   │   └── scenarios.js             # Loads and processes scenario JSON into game state
│   │
│   ├── hooks/
│   │   ├── useGameState.js          # Central game state manager (round, phase, score, decisions)
│   │   ├── useScenario.js           # Loads current scenario data
│   │   └── useAnimationSequence.js  # Manages sequential reveal animations for after-decision phase
│   │
│   ├── utils/
│   │   ├── math.js                  # Covariance, variance, expected value, dot product helpers
│   │   └── formatters.js            # Number formatting, percentage display, etc.
│   │
│   └── styles/
│       └── globals.css              # Tailwind directives + KaTeX overrides + custom CSS variables
│
├── index.html
├── tailwind.config.js
├── vite.config.js
├── package.json
└── README.md
```

---

## Page Descriptions

### 1. HomePage.jsx

Full-screen landing page with dark gradient background.

**Hero section:**
- Large title: **"Macro Shock Arena"**
- Subtitle: *"Why do different assets earn different expected returns?"*
- Tagline paragraph: "A government bond earns less than a tech stock. Not because tech is 'better' — but because investors price when payoffs arrive, how assets co-move with economic risks, and whether those risks are rewarded in equilibrium. Step into the arena and learn why."
- Three mode buttons:
  - **"Enter the Arena"** → GamePage (main game)
  - **"Sandbox Mode"** → SandboxPage (free exploration)
  - **"Theory Guide"** → LearnPage (equation reference)
- Scrolling animated background: subtle floating icons of dollar signs, chart lines, factor labels fading in and out

### 2. GamePage.jsx

The main 4-panel game interface (described in detail below). This is where all gameplay happens.

### 3. SandboxPage.jsx

Free-form exploration mode with no scoring. Player can:
- Adjust all factor premia via sliders (λ_growth, λ_inflation, λ_oil, λ_power)
- Adjust all asset betas via sliders
- See real-time updates to: expected returns, prices (via SDF), return decomposition stacks
- Toggle SDF view to see state-contingent pricing weights
- Add/remove assets from the workspace
- This mode has the same graph components as the game but no decision/scoring loop

### 4. LearnPage.jsx

A clean reference page with all equations used in the game, organized by concept:

**Section 1: Asset Pricing Basics**
- p = E[mx]
- Definition of m (SDF / pricing kernel / stochastic discount factor)
- Definition of x (asset payoff)

**Section 2: Expected Return and Risk**
- E(Rⁱ) - Rf = -Cov(m, Rⁱ) / E(m)
- Why negative covariance with SDF means higher expected return
- Intuition: "assets that crash when times are bad must offer higher compensation"

**Section 3: Factor Model**
- m = a + b₁F₁ + b₂F₂ + ... + b_kF_k
- Factors: growth, inflation, oil, power demand
- SDF depends on economic factors

**Section 4: Factor Beta**
- β_ik = Cov(Rᵢ, F_k) / Var(F_k)
- Beta as regression slope
- Visual: slope of scatter plot

**Section 5: Risk Premium Decomposition**
- E(Rᵢ) = Rf + Σ β_ik × λ_k
- λ_k is the market price of risk for factor k
- Each term is a compensation component

**Section 6: No-Arbitrage / APT**
- If β_A = β_B but E(R_A) ≠ E(R_B), arbitrage exists
- Long-short portfolio with zero net factor exposure and positive expected return
- In equilibrium, only factor exposure explains return differences

Each section has: equation rendered in KaTeX, plain-English explanation, a small interactive example (slider or mini-chart).

---

## Main Game Interface Layout (GamePage.jsx)

The game screen is divided into a fixed 4-panel layout that persists across all phases:

```
┌─────────────────────────────────────────────────────┐
│                      TOP BAR                         │
│  Score | Round 3/12 | ★★☆ | Difficulty: Medium      │
│  Pinned Equation: E(Rᵢ) = Rf + Σ βᵢₖλₖ            │
├──────────┬─────────────────────┬────────────────────┤
│          │                     │                    │
│  LEFT    │      CENTER         │      RIGHT         │
│  PANEL   │      PANEL          │      PANEL         │
│          │                     │                    │
│  Macro   │   Asset Cards       │   Equations &      │
│  Shock   │   (4-8 cards)       │   Graphs           │
│  Card    │                     │   (tabbed)         │
│          │                     │                    │
│  Factor  │                     │                    │
│  Gauges  │                     │                    │
│          │                     │                    │
├──────────┴─────────────────────┴────────────────────┤
│                   BOTTOM PANEL                       │
│  Decision Console: Drag-drop ranking | Sliders |     │
│  Beta placement | Portfolio weights | Submit button  │
└─────────────────────────────────────────────────────┘
```

**Panel widths (approximate):**
- Left panel: 20% width
- Center panel: 45% width
- Right panel: 35% width
- Bottom panel: full width, ~180px height
- Top bar: full width, ~60px height

---

## Game Round Structure (5 Phases per Round)

Each round follows this exact sequence. The UI transitions between phases with Framer Motion animations.

### Phase 1: SHOCK (Read the Market)

**What happens:**
- The ShockCard appears in the left panel with an animated entrance (slide in from left + fade)
- It shows a headline, a 2-sentence description, and which factors are affected
- Factor indicators in the left panel animate: arrows move up/down, colors shift (red for negative shocks, green for positive)
- Asset cards in the center panel are face-down or dimmed

**Example shock card content (AI Power Surge scenario):**
```json
{
  "headline": "AI Demand Surge Strains Power Grid",
  "description": "Major tech companies announce massive data center expansion. Electricity demand forecasts jump 15% for the next decade. Grid infrastructure spending accelerates.",
  "affectedFactors": ["power_demand", "growth"],
  "factorShocks": {
    "power_demand": +2.1,
    "growth": +0.8,
    "inflation": +0.3,
    "oil": +0.5
  }
}
```

**Pinned equation changes to:**
```
p = E[mx]
```

**Duration:** Player reads and clicks "See Assets →" to proceed.

---

### Phase 2: ANALYZE (Study the Assets)

**What happens:**
- Asset cards in center panel flip/reveal with staggered animation
- Each card shows: asset name, icon, current market price, a mini sparkline of historical returns, and 1-2 factor clue badges (e.g., "High Oil Exposure", "Defensive")
- Right panel shows the SDF state graph (StatePayoffGraph) with states: Boom, Normal, Slowdown, Recession, Crisis
- Player can click any asset card to see its state-contingent payoffs overlaid on the SDF graph
- Factor indicators in left panel remain visible with current shock values

**Asset card data structure:**
```json
{
  "id": "utility",
  "name": "GridPower Utility",
  "icon": "⚡",
  "sector": "Utilities",
  "currentPrice": 94.5,
  "factorClues": ["High Power Demand β", "Low Growth β"],
  "statePayoffs": {
    "boom": 108,
    "normal": 102,
    "slowdown": 98,
    "recession": 88,
    "crisis": 75
  },
  "trueBetas": {
    "growth": 0.3,
    "inflation": -0.2,
    "oil": 0.1,
    "power_demand": 1.4
  }
}
```

**Pinned equation stays:**
```
p = Σ πₛ mₛ xₛ
```

**Duration:** Player explores and clicks "Make Decision →" to proceed.

---

### Phase 3: DECIDE (Player Makes Choices)

This is the core interaction phase. The bottom panel activates with the decision console. Depending on the round type, the player does ONE of the following decision tasks:

#### Decision Type A: Rank Expected Returns (DecisionRanker)

The player sees all assets as draggable cards in the bottom panel. They must drag them into order from LOWEST expected return to HIGHEST expected return.

**Implementation:**
- Use `@dnd-kit/core` and `@dnd-kit/sortable` for drag-and-drop
- Or implement simpler: clickable cards that swap positions
- Show numbered slots: 1 (lowest) → N (highest)
- Submit button activates only when all slots are filled

#### Decision Type B: Estimate Factor Betas (BetaPlacement)

The player sees a 2D coordinate plane in the bottom panel:
- X-axis: Growth Beta (range -1 to +2)
- Y-axis: Oil Beta or Inflation Beta (range -1 to +2)

Each asset appears as a draggable chip. The player drags each asset to where they think it belongs on the beta map.

**Implementation:**
- SVG or canvas-based 2D plane
- Draggable asset circles with labels
- Grid lines and axis labels
- Snap-to-grid optional for easier placement

#### Decision Type C: Build Arbitrage Portfolio (PortfolioBuilder)

The player sees assets with sliders for portfolio weight:
- Range: -100% (full short) to +100% (full long)
- Real-time display of: net cost, net factor exposures (one bar per factor), expected return
- A "Factor Shield" indicator: green when all net betas are within ±0.05 of zero, red otherwise
- Submit is available anytime but score depends on quality

**Implementation:**
- Horizontal sliders per asset
- Live-updating summary panel showing:
  - Net β_growth = Σ wᵢ × βᵢ_growth
  - Net β_inflation = Σ wᵢ × βᵢ_inflation
  - Net β_oil = Σ wᵢ × βᵢ_oil
  - Net expected return = Σ wᵢ × E(Rᵢ)
  - Net cost = Σ wᵢ × priceᵢ

**Pinned equation changes to match decision type:**
- Type A: `E(Rᵢ) = Rf + Σ βᵢₖλₖ`
- Type B: `βᵢₖ = Cov(Rᵢ, Fₖ) / Var(Fₖ)`
- Type C: `If β_A = β_B but E(R_A) ≠ E(R_B), arbitrage exists`

---

### Phase 4: REVEAL (After-Decision Graphs)

**This is the most important phase of the entire game.** After the player submits their decision, the game reveals the correct answer through a sequence of animated graphs.

The right panel expands (or a modal/overlay appears) showing graphs in sequence. Each graph animates in with Framer Motion (fade + slide up, 300ms stagger between graphs).

#### Graph sequence depends on round type:

**For Rank Expected Returns rounds:**

1. **ReturnDecomposition** (stacked bar chart)
   - One bar per asset
   - Segments: Rf (gray) + β₁λ₁ (blue) + β₂λ₂ (orange) + β₃λ₃ (green) + β₄λ₄ (purple)
   - Total height = E(Rᵢ)
   - Player's ranking shown as overlay numbers; correct ranking shown alongside
   - Wrong placements highlighted in red

2. **CovarianceGraph** (dual-line chart)
   - For the most-misjudged asset
   - Line 1: SDF (m) across states — high in bad states
   - Line 2: Asset return across states
   - Shaded red region where both are extreme (showing negative covariance = high premium)
   - Annotation: Cov(m, Rⁱ) = [computed value]

3. **StatePayoffGraph** (bar chart with SDF overlay)
   - For the most educational asset comparison
   - Side-by-side bars for 2 assets across states
   - SDF weight shown as a line overlay
   - Highlights why the asset paying more in bad states has higher price / lower expected return

**For Estimate Factor Betas rounds:**

1. **ScatterBetaPlot** (scatter with regression line)
   - One plot per factor (tabbed or small multiples)
   - X = factor shock, Y = asset return
   - Data points from simulated historical periods (20-30 dots)
   - Regression line drawn with animation (line extends from origin)
   - Slope value animates into "β = [value]"

2. **FactorBetaBarChart** (horizontal bars)
   - Each asset gets a row
   - Bars extend left (negative beta) or right (positive beta) for each factor
   - Color-coded by factor
   - Player's placement shown as ghost markers vs correct position

3. **ReturnDecomposition** (stacked bars)
   - Shows how the betas they just estimated feed into expected return

**For Build Arbitrage rounds:**

1. **FactorNeutralization** (before/after bar chart)
   - "Before hedge" bars: raw factor exposures of each leg
   - "After hedge" bars: net portfolio factor exposure
   - Green glow if net β ≈ 0, red if not

2. **ArbitragePayoff** (state-contingent payoff bars)
   - States on x-axis (boom, normal, slowdown, recession, crisis)
   - Portfolio payoff on y-axis
   - If all bars ≥ 0 and at least one > 0: "ARBITRAGE FOUND" banner with confetti animation
   - If some bars are negative: "RESIDUAL RISK — Not a true arbitrage" warning

3. **ReturnDecomposition** (stacked bars)
   - Compare the two assets side by side
   - Highlight the discrepancy that creates the arbitrage opportunity

#### Equation animation during reveal:

The LiveDecomposition component in the right panel animates in sync with the graphs:
- As each graph appears, the corresponding equation term glows
- Example: when ReturnDecomposition shows the growth beta contribution, the `β_{ig}λ_g` term in the pinned equation pulses with a colored highlight (use Framer Motion `animate` on a `<span>` wrapping the KaTeX output)
- Colors match between equation terms and graph segments

---

### Phase 5: SCORE (Feedback + Explanation)

**What happens:**
- ScorePopup appears with animation (scale up from center)
- Shows star rating: ★★★ (3 stars), ★★☆ (2 stars), ★☆☆ (1 star)
- Score breakdown:

```
Pricing Accuracy:    85%  ★★★
Factor Logic:        70%  ★★☆
Arbitrage Detection: 90%  ★★★
Economic Reasoning:  —    (see below)
```

- Below the stars: a multiple-choice reasoning question
  - Example: "Why does the utility stock have a higher expected return than the Treasury in this scenario?"
    - A) Because utilities are popular stocks
    - B) Because utilities have high exposure to a priced power-demand factor
    - C) Because utilities always outperform bonds
    - D) Because the Treasury is risk-free
  - Correct answer highlighted in green after selection
  - 1-sentence explanation appears below

- "Next Round →" button to proceed
- Running total score shown in top bar

**Scoring logic (engine/scoring.js):**

For ranking decisions:
- Kendall tau distance between player ranking and correct ranking
- Perfect match = 100%, each swap = proportional deduction
- 3 stars: ≥90%, 2 stars: ≥60%, 1 star: ≥30%, 0 stars: <30%

For beta placement:
- Euclidean distance between player placement and true beta coordinates
- Per-asset scoring, averaged across all assets
- 3 stars: avg distance < 0.2, 2 stars: < 0.5, 1 star: < 1.0

For arbitrage building:
- Check 1: Are all net factor betas within ±0.1 of zero? (factor neutrality)
- Check 2: Is net expected return positive?
- Check 3: Is net cost ≤ 0?
- 3 stars: all three pass, 2 stars: two pass, 1 star: one passes

---

## Scenario Data Files (Detailed)

### `/src/data/scenarios/ai-power-surge.json`

```json
{
  "id": "ai_power_surge",
  "title": "AI Power Rush",
  "headline": "AI Demand Surge Strains Power Grid",
  "description": "Major tech companies announce massive data center expansion plans. Electricity demand forecasts jump 15% over the next decade. Utility capex programs accelerate to meet AI infrastructure needs.",
  "difficulty": "medium",
  "factors": {
    "growth": { "shock": 0.8, "premium": 0.045 },
    "inflation": { "shock": 0.3, "premium": 0.025 },
    "oil": { "shock": 0.5, "premium": 0.03 },
    "power_demand": { "shock": 2.1, "premium": 0.055 }
  },
  "riskFreeRate": 0.04,
  "states": {
    "boom":      { "probability": 0.15, "sdfWeight": 0.6 },
    "normal":    { "probability": 0.40, "sdfWeight": 0.9 },
    "slowdown":  { "probability": 0.25, "sdfWeight": 1.3 },
    "recession": { "probability": 0.15, "sdfWeight": 1.8 },
    "crisis":    { "probability": 0.05, "sdfWeight": 3.0 }
  },
  "assets": [
    {
      "id": "utility",
      "name": "GridPower Utility",
      "icon": "⚡",
      "sector": "Utilities",
      "currentPrice": 94.5,
      "factorClues": ["High Power Demand Exposure", "Moderate Defensive"],
      "trueBetas": { "growth": 0.3, "inflation": -0.2, "oil": 0.1, "power_demand": 1.4 },
      "statePayoffs": { "boom": 108, "normal": 102, "slowdown": 98, "recession": 88, "crisis": 75 },
      "trueExpectedReturn": 0.137
    },
    {
      "id": "tech_ai",
      "name": "DeepNet AI Corp",
      "icon": "🧠",
      "sector": "Technology",
      "currentPrice": 112.0,
      "factorClues": ["High Growth Exposure", "Moderate Power Demand"],
      "trueBetas": { "growth": 1.6, "inflation": -0.5, "oil": -0.1, "power_demand": 0.8 },
      "statePayoffs": { "boom": 145, "normal": 118, "slowdown": 95, "recession": 70, "crisis": 45 },
      "trueExpectedReturn": 0.162
    },
    {
      "id": "consumer_staples",
      "name": "StableGoods Inc",
      "icon": "🛒",
      "sector": "Consumer Staples",
      "currentPrice": 101.0,
      "factorClues": ["Low Growth Exposure", "Defensive"],
      "trueBetas": { "growth": 0.2, "inflation": 0.1, "oil": -0.05, "power_demand": 0.05 },
      "statePayoffs": { "boom": 106, "normal": 104, "slowdown": 102, "recession": 99, "crisis": 95 },
      "trueExpectedReturn": 0.057
    },
    {
      "id": "treasury",
      "name": "10Y Treasury Bond",
      "icon": "🏛️",
      "sector": "Government Bonds",
      "currentPrice": 98.0,
      "factorClues": ["Risk-Free Benchmark"],
      "trueBetas": { "growth": 0.0, "inflation": 0.0, "oil": 0.0, "power_demand": 0.0 },
      "statePayoffs": { "boom": 104, "normal": 104, "slowdown": 104, "recession": 104, "crisis": 104 },
      "trueExpectedReturn": 0.04
    },
    {
      "id": "oil_producer",
      "name": "PetroCorp Energy",
      "icon": "🛢️",
      "sector": "Energy",
      "currentPrice": 89.0,
      "factorClues": ["High Oil Exposure", "Cyclical"],
      "trueBetas": { "growth": 0.7, "inflation": 0.3, "oil": 1.8, "power_demand": 0.4 },
      "statePayoffs": { "boom": 125, "normal": 105, "slowdown": 85, "recession": 65, "crisis": 50 },
      "trueExpectedReturn": 0.155
    }
  ],
  "rounds": [
    {
      "roundNumber": 1,
      "decisionType": "rank_expected_returns",
      "instruction": "Rank these assets from LOWEST to HIGHEST expected return after the AI power demand shock.",
      "correctRanking": ["treasury", "consumer_staples", "utility", "oil_producer", "tech_ai"],
      "reasoningQuestion": {
        "question": "Why does the utility stock now require a higher expected return than consumer staples?",
        "options": [
          "Because utility stocks are always riskier",
          "Because utilities have high exposure to the priced power-demand factor",
          "Because consumer staples are boring investments",
          "Because the utility stock price dropped"
        ],
        "correctIndex": 1,
        "explanation": "The utility has β_power = 1.4 while staples have β_power = 0.05. Since power demand carries a positive risk premium (λ = 5.5%), this exposure adds significantly to the utility's required return."
      }
    },
    {
      "roundNumber": 2,
      "decisionType": "estimate_betas",
      "instruction": "Place each asset on the Growth Beta (x-axis) vs Power Demand Beta (y-axis) map.",
      "axisConfig": {
        "xAxis": { "factor": "growth", "label": "Growth Beta", "range": [-0.5, 2.0] },
        "yAxis": { "factor": "power_demand", "label": "Power Demand Beta", "range": [-0.5, 2.0] }
      },
      "reasoningQuestion": {
        "question": "Why does DeepNet AI Corp appear in the upper-right of the beta map?",
        "options": [
          "Because it is an expensive stock",
          "Because it has high exposure to both growth and power demand factors",
          "Because AI companies are always the most volatile",
          "Because it has the highest dividend yield"
        ],
        "correctIndex": 1,
        "explanation": "DeepNet has β_growth = 1.6 and β_power = 0.8, placing it in the high-growth, high-power-demand quadrant. Both exposures contribute to its required return."
      }
    },
    {
      "roundNumber": 3,
      "decisionType": "build_arbitrage",
      "instruction": "DeepNet AI and GridPower Utility have similar power-demand exposure but different prices. Can you build a factor-neutral portfolio with positive expected return?",
      "availableAssets": ["utility", "tech_ai", "treasury", "consumer_staples"],
      "mispricedAsset": "utility",
      "mispricingDirection": "undervalued",
      "reasoningQuestion": {
        "question": "What makes this trade an arbitrage rather than a risky bet?",
        "options": [
          "The portfolio uses leverage",
          "The portfolio has zero net factor exposure but positive expected return",
          "We are buying cheap stocks and selling expensive ones",
          "The portfolio is diversified across sectors"
        ],
        "correctIndex": 1,
        "explanation": "True arbitrage requires zero net cost and zero net factor exposure (all β_net ≈ 0) with a positive expected payoff. If any factor exposure remains, it is a risky bet, not an arbitrage."
      }
    }
  ]
}
```

### Create similar JSON files for:

**`oil-shock.json`** — "Middle East Conflict Pushes Oil Higher"
- Key assets: Airline, Oil Producer, Railroad/Logistics, Treasury, Hedged Airline
- Factors affected: oil (primary), growth (secondary negative)
- Decision types: rank returns, estimate oil betas, build long-short hedged vs unhedged airline

**`inflation-surprise.json`** — "Inflation Surprises to the Upside While Growth Weakens"
- Key assets: TIPS, Nominal Treasury, Consumer Staples, Tech Growth, Cash
- Factors affected: inflation (primary), growth (negative)
- Decision types: rank returns, compare TIPS vs nominal state payoffs, SDF pricing

**`growth-slowdown.json`** — "Leading Indicators Signal Recession"
- Key assets: Tech, Industrial, Consumer Staples, Utility, Treasury, Gold/Hedge
- Factors affected: growth (primary negative), oil (secondary negative)
- Decision types: rank returns, identify defensive vs cyclical betas, build recession hedge portfolio

---

## Engine Functions (Detailed)

### `engine/pricing.js`

```javascript
/**
 * Compute asset price using SDF: p = Σ πₛ × mₛ × xₛ
 * @param {Object} states - { boom: { probability, sdfWeight }, ... }
 * @param {Object} payoffs - { boom: 108, normal: 102, ... }
 * @returns {number} price
 */
export function computeSDFPrice(states, payoffs) {
  return Object.keys(states).reduce((sum, state) => {
    return sum + states[state].probability * states[state].sdfWeight * payoffs[state]
  }, 0)
}

/**
 * Compute expected return: E(R) = Σ πₛ × (xₛ / p) - but more precisely:
 * E(R) = Rf + Σ βᵢₖ × λₖ
 * @param {number} riskFreeRate
 * @param {Object} betas - { growth: 0.3, inflation: -0.2, ... }
 * @param {Object} premia - { growth: 0.045, inflation: 0.025, ... }
 * @returns {number} expected return
 */
export function computeExpectedReturn(riskFreeRate, betas, premia) {
  const factorContribution = Object.keys(betas).reduce((sum, factor) => {
    return sum + betas[factor] * (premia[factor] || 0)
  }, 0)
  return riskFreeRate + factorContribution
}

/**
 * Compute return decomposition for visualization
 * @returns {Array} [{ factor: 'Rf', contribution: 0.04 }, { factor: 'Growth', contribution: 0.018 }, ...]
 */
export function computeReturnDecomposition(riskFreeRate, betas, premia) {
  const components = [{ factor: 'Risk-Free Rate', contribution: riskFreeRate, color: '#6B7280' }]
  const factorColors = {
    growth: '#3B82F6',
    inflation: '#F97316',
    oil: '#22C55E',
    power_demand: '#A855F7'
  }
  Object.keys(betas).forEach(factor => {
    components.push({
      factor: factor.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase()),
      contribution: betas[factor] * (premia[factor] || 0),
      beta: betas[factor],
      premium: premia[factor] || 0,
      color: factorColors[factor] || '#9CA3AF'
    })
  })
  return components
}
```

### `engine/beta.js`

```javascript
/**
 * Generate simulated scatter data for factor-return regression
 * @param {number} trueBeta - actual beta value
 * @param {number} nPoints - number of data points (default 30)
 * @param {number} noiseStd - standard deviation of idiosyncratic noise
 * @returns {Array} [{ factorShock: 0.5, assetReturn: 0.8 }, ...]
 */
export function generateScatterData(trueBeta, nPoints = 30, noiseStd = 0.3) {
  const data = []
  for (let i = 0; i < nPoints; i++) {
    const factorShock = (Math.random() - 0.5) * 4  // range roughly -2 to +2
    const noise = gaussianRandom() * noiseStd
    const assetReturn = trueBeta * factorShock + noise
    data.push({ factorShock: round(factorShock, 2), assetReturn: round(assetReturn, 2) })
  }
  return data
}

/**
 * Compute beta from data: β = Cov(R, F) / Var(F)
 */
export function computeBetaFromData(data) {
  const n = data.length
  const meanF = data.reduce((s, d) => s + d.factorShock, 0) / n
  const meanR = data.reduce((s, d) => s + d.assetReturn, 0) / n
  const cov = data.reduce((s, d) => s + (d.factorShock - meanF) * (d.assetReturn - meanR), 0) / (n - 1)
  const varF = data.reduce((s, d) => s + (d.factorShock - meanF) ** 2, 0) / (n - 1)
  return cov / varF
}

function gaussianRandom() {
  let u = 0, v = 0
  while (u === 0) u = Math.random()
  while (v === 0) v = Math.random()
  return Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v)
}

function round(num, decimals) {
  return Math.round(num * 10 ** decimals) / 10 ** decimals
}
```

### `engine/arbitrage.js`

```javascript
/**
 * Compute net factor exposures for a portfolio
 * @param {Array} positions - [{ assetId, weight, betas: { growth, ... } }, ...]
 * @returns {Object} { growth: netBeta, inflation: netBeta, ... }
 */
export function computeNetExposure(positions) {
  const net = {}
  positions.forEach(pos => {
    Object.keys(pos.betas).forEach(factor => {
      net[factor] = (net[factor] || 0) + pos.weight * pos.betas[factor]
    })
  })
  return net
}

/**
 * Check if portfolio is factor-neutral
 * @param {Object} netExposure - { growth: 0.02, inflation: -0.01, ... }
 * @param {number} tolerance - default 0.1
 * @returns {boolean}
 */
export function isFactorNeutral(netExposure, tolerance = 0.1) {
  return Object.values(netExposure).every(beta => Math.abs(beta) <= tolerance)
}

/**
 * Compute portfolio expected return
 */
export function computePortfolioReturn(positions, riskFreeRate, premia) {
  return positions.reduce((sum, pos) => {
    const assetReturn = computeExpectedReturn(riskFreeRate, pos.betas, premia)
    return sum + pos.weight * assetReturn
  }, 0)
}

/**
 * Compute state-contingent portfolio payoffs
 */
export function computePortfolioPayoffs(positions, stateNames) {
  const payoffs = {}
  stateNames.forEach(state => {
    payoffs[state] = positions.reduce((sum, pos) => {
      return sum + pos.weight * (pos.statePayoffs[state] || 0)
    }, 0)
  })
  return payoffs
}

/**
 * Detect if arbitrage exists: factor-neutral + positive expected return + non-positive cost
 */
export function detectArbitrage(positions, riskFreeRate, premia) {
  const netExposure = computeNetExposure(positions)
  const netReturn = computePortfolioReturn(positions, riskFreeRate, premia)
  const netCost = positions.reduce((sum, pos) => sum + pos.weight * pos.currentPrice, 0)
  return {
    isFactorNeutral: isFactorNeutral(netExposure),
    isPositiveReturn: netReturn > 0,
    isNonPositiveCost: netCost <= 0,
    isArbitrage: isFactorNeutral(netExposure) && netReturn > 0 && netCost <= 0.01,
    netExposure,
    netReturn,
    netCost
  }
}
```

### `engine/scoring.js`

```javascript
/**
 * Score a ranking decision using Kendall tau distance
 * @param {Array} playerRanking - ordered asset IDs from player
 * @param {Array} correctRanking - ordered asset IDs (correct)
 * @returns {Object} { score: 0-100, stars: 0-3, details: [...] }
 */
export function scoreRanking(playerRanking, correctRanking) {
  let concordant = 0, discordant = 0
  const n = correctRanking.length
  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      const playerOrder = playerRanking.indexOf(correctRanking[i]) < playerRanking.indexOf(correctRanking[j])
      if (playerOrder) concordant++
      else discordant++
    }
  }
  const total = concordant + discordant
  const score = Math.round((concordant / total) * 100)
  const stars = score >= 90 ? 3 : score >= 60 ? 2 : score >= 30 ? 1 : 0
  return { score, stars, concordant, discordant, total }
}

/**
 * Score beta placement using average Euclidean distance
 * @param {Array} playerPlacements - [{ assetId, x, y }, ...]
 * @param {Array} correctPlacements - [{ assetId, x, y }, ...]
 * @returns {Object} { score: 0-100, stars: 0-3 }
 */
export function scoreBetaPlacement(playerPlacements, correctPlacements) {
  let totalDist = 0
  const n = playerPlacements.length
  playerPlacements.forEach(pp => {
    const cp = correctPlacements.find(c => c.assetId === pp.assetId)
    if (cp) {
      totalDist += Math.sqrt((pp.x - cp.x) ** 2 + (pp.y - cp.y) ** 2)
    }
  })
  const avgDist = totalDist / n
  const score = Math.max(0, Math.round(100 - avgDist * 50))
  const stars = avgDist < 0.2 ? 3 : avgDist < 0.5 ? 2 : avgDist < 1.0 ? 1 : 0
  return { score, stars, avgDist }
}

/**
 * Score arbitrage portfolio
 */
export function scoreArbitrage(arbitrageResult) {
  let points = 0
  if (arbitrageResult.isFactorNeutral) points++
  if (arbitrageResult.isPositiveReturn) points++
  if (arbitrageResult.isNonPositiveCost) points++
  const stars = points
  const score = Math.round((points / 3) * 100)
  return { score, stars, details: arbitrageResult }
}
```

---

## Visual Design Specifications

### Color Palette (Dark Theme Default)

```css
:root {
  --bg-primary: #0F172A;       /* slate-900 — main background */
  --bg-secondary: #1E293B;     /* slate-800 — card backgrounds */
  --bg-tertiary: #334155;      /* slate-700 — hover states */
  --text-primary: #F1F5F9;     /* slate-100 */
  --text-secondary: #94A3B8;   /* slate-400 */
  --text-muted: #64748B;       /* slate-500 */
  --accent-blue: #3B82F6;      /* growth factor color */
  --accent-orange: #F97316;    /* inflation factor color */
  --accent-green: #22C55E;     /* oil factor color + positive indicators */
  --accent-purple: #A855F7;    /* power demand factor color */
  --accent-red: #EF4444;       /* negative indicators, wrong answers */
  --accent-yellow: #EAB308;    /* stars, warnings */
  --accent-cyan: #06B6D4;      /* SDF highlights */
  --border: #334155;           /* card borders */
  --glow-blue: 0 0 20px rgba(59,130,246,0.3);
  --glow-green: 0 0 20px rgba(34,197,94,0.3);
  --glow-red: 0 0 20px rgba(239,68,68,0.3);
}
```

### Typography

- Headings: `font-family: 'Inter', sans-serif` — bold, tracking-tight
- Body: `font-family: 'Inter', sans-serif` — regular
- Equations: KaTeX default math font
- Monospace (for numbers): `font-family: 'JetBrains Mono', monospace`
- Load Inter and JetBrains Mono from Google Fonts in index.html

### Card Design

All cards (asset cards, shock cards, graph cards) follow this pattern:
- Background: `var(--bg-secondary)`
- Border: 1px solid `var(--border)`
- Border-radius: 12px
- Padding: 16px
- Box shadow: `0 4px 6px -1px rgba(0,0,0,0.3)`
- Hover: border color shifts to accent color, subtle glow

### Animation Guidelines (Framer Motion)

- Card entrance: `initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}` with 100ms stagger
- Graph reveal: `initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}` with 300ms duration
- Score popup: `initial={{ scale: 0 }} animate={{ scale: 1 }}` with spring physics
- Equation term glow: use `animate={{ textShadow }}` cycling on/off
- Phase transitions: crossfade between phases with 200ms duration
- Star rating: stars appear one by one with 200ms delay, each with a small bounce

---

## Responsive Design

The game is primarily designed for desktop (1024px+) but should be usable on tablet.

**Desktop (≥1024px):** Full 4-panel layout as described above.

**Tablet (768px–1023px):**
- Left panel collapses to a top strip showing factor indicators horizontally
- Center and right panels stack vertically
- Bottom panel becomes a scrollable section

**Mobile (<768px):**
- Show a message: "Macro Shock Arena is best experienced on a larger screen. Please use a tablet or desktop for the full experience."
- Optionally: show a simplified single-column view with collapsible sections

---

## Game Progression and Unlocking

The game has 12 rounds across 4 scenarios:

1. **AI Power Rush** — 3 rounds (rank, estimate betas, build arbitrage)
2. **Oil Shock Crisis** — 3 rounds
3. **Inflation Defender** — 3 rounds
4. **Growth Slowdown** — 3 rounds

Scenarios unlock sequentially. The player must score at least 4 total stars (out of 9) in a scenario to unlock the next one.

A progress bar on the top bar shows: `Scenario 1/4 | Round 2/3 | Total Stars: ★★★★★★☆☆☆`

---

## Tutorial System

On first visit (tracked via localStorage), show a TutorialOverlay before the first round:

**Step 1:** "Welcome to Macro Shock Arena! You'll face real macro shocks and decide how they affect asset returns." (arrow pointing to left panel)

**Step 2:** "Study the assets and their factor clues." (arrow pointing to center panel)

**Step 3:** "Make your decision using the console below." (arrow pointing to bottom panel)

**Step 4:** "After you submit, the graphs will reveal why — with equations." (arrow pointing to right panel)

Each step has a "Next" button and a "Skip Tutorial" link.

---

## Key Implementation Notes

1. **KaTeX rendering:** Wrap all equations in a reusable `<Equation>` component that uses `katex.renderToString()` with `{ throwOnError: false, displayMode: true }`. For inline equations, use `displayMode: false`.

2. **State management:** Use React Context (GameContext) with useReducer for game state. Do NOT use Redux — it is overkill for this project. The state shape:

```javascript
{
  currentScenario: 'ai_power_surge',
  currentRound: 1,
  currentPhase: 'shock', // 'shock' | 'analyze' | 'decide' | 'reveal' | 'score'
  totalScore: 0,
  totalStars: 0,
  scenarioStars: { ai_power_surge: 0, oil_shock: 0, ... },
  unlockedScenarios: ['ai_power_surge'],
  decisions: {},  // stores player decisions for current round
  showTutorial: true,
}
```

3. **Graph animations:** In the reveal phase, use a staggered animation sequence. Use `useAnimationSequence` hook that returns `{ currentStep, next, isComplete }`. Each graph component checks if `currentStep >= itsIndex` before rendering.

4. **Recharts customization:** Use custom Recharts components with the dark theme colors. Set `<ResponsiveContainer>` for all charts. Use custom tooltip components styled to match the dark theme.

5. **Drag and drop for ranking:** Use a simple implementation with `onDragStart`, `onDragOver`, `onDrop` handlers. Each asset becomes a draggable card with `draggable="true"`. Drop zones are numbered slots. Alternatively, use click-to-select + click-to-place for mobile compatibility.

6. **No external API calls.** All computation happens client-side. All data is in JSON files.

7. **Performance:** Lazy-load scenario data with dynamic imports. Use React.memo on graph components since they receive stable props during the reveal phase.

---

## README.md Content

```markdown
# Macro Shock Arena

**Why do different assets earn different expected returns?**

An interactive browser game that teaches factor pricing theory, SDF logic, and no-arbitrage through real-world macro scenarios.

## Play

Visit: `https://<username>.github.io/macro-shock-arena/`

## Concepts Covered

- Stochastic Discount Factor: p = E[mx]
- Expected return and SDF covariance: E(Rⁱ) - Rf = -Cov(m,Rⁱ)/E(m)
- Factor models: m = a + b₁F₁ + ... + bₖFₖ
- Factor betas: βᵢₖ = Cov(Rᵢ,Fₖ)/Var(Fₖ)
- Risk premium decomposition: E(Rᵢ) = Rf + Σ βᵢₖλₖ
- APT and no-arbitrage

## Tech Stack

React + Vite + Tailwind CSS + KaTeX + Recharts + Framer Motion

## Development

npm install
npm run dev

## Deploy to GitHub Pages

npm run deploy
```

---

## Final Checklist Before Shipping

- [ ] All 4 scenario JSON files are complete with 3 rounds each
- [ ] All 7 graph components render correctly with dark theme
- [ ] KaTeX equations render without errors in all phases
- [ ] Drag-and-drop ranking works smoothly
- [ ] 2D beta placement canvas works with mouse drag
- [ ] Portfolio builder sliders update net exposure in real time
- [ ] Scoring computes correctly for all 3 decision types
- [ ] Star rating and score popup animate properly
- [ ] Tutorial overlay appears on first visit
- [ ] Scenario unlocking works (4+ stars required)
- [ ] Sandbox mode allows free slider exploration
- [ ] Learn page shows all equations with explanations
- [ ] HashRouter works correctly on GitHub Pages
- [ ] Mobile shows "use desktop" message
- [ ] Lighthouse score > 90 for performance
- [ ] All factor colors are consistent across graphs and equations
- [ ] No console errors in production build