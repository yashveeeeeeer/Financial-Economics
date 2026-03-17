# Keyword Hierarchy: Equity Premium Puzzle Literature

*Extracted and aligned from: Mehra & Prescott (1985), Weil (1989), Kocherlakota (1996)*

---

## 1. CORE PUZZLES (Top Level)

### 1.1 Equity Premium Puzzle
- **Definition**: The observed 6% equity premium cannot be rationalized by standard models with plausible risk aversion
- **Empirical fact**: Average real return on stocks (~7%) vs. Treasury bills (~1%) over 1889–1978
- **Covariance problem**: Consumption growth does not covary enough with stock returns to justify the premium
- **Implied CRRA**: Requires α ≈ 40–50 to match data; implausible

### 1.2 Risk-Free Rate Puzzle
- **Definition**: If agents are highly risk-averse (to match equity premium), they should dislike growth → high risk-free rate; yet observed rate is ~1%
- **Source**: Weil (1989) — emerges from Mehra-Prescott’s equity premium puzzle
- **Dilemma**: High equity premium → high α → high predicted risk-free rate; low α → low equity premium

---

## 2. MODEL ASSUMPTIONS (Generating the Puzzles)

### 2.1 Preference Framework
- **Power utility function**: U(c) = c^(1−α)/(1−α)
- **Constant Relative Risk Aversion (CRRA)**: α
- **Intertemporal Elasticity of Substitution (IES)**: 1/α (linked in standard setup)
- **Discount factor**: β ∈ (0, 1)
- **Time-additive expected utility**: E₀ Σ βᵗ U(cₜ)

### 2.2 Market Structure
- **Complete markets**: Agents can insure against any contingency
- **Frictionless trading**: No taxes, brokerage fees, transaction costs
- **Representative agent**: Per capita consumption = individual consumption
- **Arrow-Debreu economy**: Pure exchange, competitive equilibrium

### 2.3 Technical Structure
- **Lucas (1978) pure exchange model**
- **Markov process**: Consumption/dividend growth
- **Two-state Markov chain**: Calibrated to U.S. data (μ, δ, φ)
- **Stationary equilibrium**: Price-dividend ratio
- **Euler equations**: First-order conditions for asset pricing

---

## 3. ASSET PRICING CONCEPTS

### 3.1 Fundamental Pricing
- **Stochastic discount factor (SDF)**: M₁₊₁ = β U'(c₁₊₁)/U'(cₜ)
- **Consumption-CAPM (C-CAPM)**: Covariance of returns with consumption growth
- **Market beta**: CAPM vs. consumption beta
- **Hansen–Jagannathan bound**: Variance bound on pricing kernel

### 3.2 Key Variables
- **Real return on equity**: S&P 500
- **Real return on risk-free asset**: Treasury bills
- **Consumption growth**: Per capita, nondurables + services
- **Dividend process**: Correlated with consumption growth

### 3.3 Equilibrium Conditions
- **Euler equation**: E_t[M₁₊₁ R₁₊₁] = 1
- **Equity premium**: E(R_e) − R_f
- **Risk premium**: Proportional to α × Cov(consumption growth, returns)

---

## 4. PARAMETER RESTRICTIONS

### 4.1 Plausible Ranges
- **α (CRRA)**: 0 ≤ α ≤ 10 (Mehra-Prescott); micro evidence suggests α ≤ 2.5
- **β (discount factor)**: 0 < β < 1
- **Calibration**: Cross-model verification (growth, business cycle, labor)

### 4.2 Implied Constraints
- **Admissible region**: Max equity premium ~0.35% with α ≤ 10
- **Observed**: 6.18% risk premium
- **Implied α**: ~48 with β = 0.55 (Fischer Black example)

---

## 5. ATTEMPTED RESOLUTIONS (Hierarchy by Assumption Relaxed)

### 5.1 Preference Modifications

#### 5.1.1 Kreps–Porteus / Epstein–Zin (Generalized Expected Utility)
- **Separation**: Risk aversion (γ) ≠ IES (1/ρ)
- **Result**: Does NOT solve equity premium puzzle
- **Weil (1989)**: With i.i.d. dividend growth, equity premium independent of IES
- **Risk-free rate**: Can ameliorate risk-free rate puzzle
- **Epstein–Zin (1987a, 1987b, 1991)**: Theoretical framework + empirical tests

#### 5.1.2 Habit Formation
- **Constantinides (1990)**: Marginal utility depends on past consumption
- **Effect**: Increases effective risk aversion
- **Risk-free rate**: Can lower risk-free rate via precautionary demand
- **Equity premium**: Limited success; requires high effective risk aversion

#### 5.1.3 Relative Consumption / “Keeping Up with the Joneses”
- **Abel (1990)**: Utility depends on consumption relative to others
- **Effect**: Increases sensitivity to consumption variation

### 5.2 Market Structure Modifications

#### 5.2.1 Incomplete Markets
- **Idiosyncratic risk**: Uninsurable income shocks
- **Constantinides & Duffie (1996)**: Heterogeneous consumers, permanent shocks
- **Heaton & Lucas (1996, 1997)**: Small effect in infinite-horizon models

#### 5.2.2 Borrowing Constraints
- **Effect**: Precautionary demand for bonds; lowers risk-free rate
- **Life-cycle**: Constantinides, Donaldson & Mehra (2002) — “Junior Can’t Borrow”
- **Marginal investor**: Middle-aged investors price equity

#### 5.2.3 Transaction Costs
- **Trading costs**: Stocks vs. bonds differential
- **Aiyagari & Gertler (1991)**: Inventory of bonds for smoothing

### 5.3 Distributional Assumptions

#### 5.3.1 Disaster States / Rare Events
- **Rietz (1988)**: Low probability of large consumption decline
- **Critique**: Unobserved in U.S. data; real interest rates did not move as predicted

#### 5.3.2 Survivorship Bias
- **Brown, Goetzmann, Ross (1995)**: Ex-post returns reflect surviving markets
- **Critique**: Bonds and stocks similarly affected in crises

### 5.4 Other Explanations

#### 5.4.1 Taxes
- **McGrattan & Prescott (2001)**: Tax rate changes, post-WWII period

#### 5.4.2 Liquidity Premium
- **Bansal & Coleman (1996)**: Transaction-service component of returns

---

## 6. KEY THEORETICAL CONSTRUCTS

### 6.1 Foundational Models
- **Lucas (1978)**: Asset prices in exchange economy
- **Breeden (1979)**: Consumption-based asset pricing
- **Rubinstein (1976)**: Valuation of uncertain income streams

### 6.2 Analytical Results
- **Weil (1989)**: With i.i.d. growth, equity premium ∝ CRRA only; IES irrelevant
- **C-CAPM vs. portfolio CAPM**: Mankiw & Shapiro (1986)
- **Representative agent aggregation**: Constantinides (1982)

### 6.3 Robustness
- **Three assumptions**: (1) Power utility, (2) Complete markets, (3) Frictionless trading
- **Any resolution must relax at least one**
- **Kocherlakota**: Robust to distributional assumptions, sampling error

---

## 7. PAPER-SPECIFIC KEYWORD FOCUS

| Paper | Primary Keywords | Contribution |
|-------|------------------|--------------|
| **Mehra & Prescott (1985)** | Equity premium, risk-free rate, CRRA, Arrow-Debreu, Lucas model, calibration, Markov chain | Original puzzle; max 0.35% premium with plausible α |
| **Weil (1989)** | Kreps-Porteus, Epstein-Zin, IES, CRRA, risk-free rate puzzle, i.i.d. | Adds risk-free rate puzzle; shows Kreps-Porteus fails |
| **Kocherlakota (1996)** | Survey, three assumptions, GEU, habit formation, borrowing constraints, incomplete markets | Comprehensive review; puzzle still unresolved |

---

## 8. READING ORDER (Conceptual Hierarchy)

1. **Mehra & Prescott (1985)** — Foundation: Define the puzzle
2. **Weil (1989)** — Extension: Add risk-free rate puzzle; test preference separation
3. **Kocherlakota (1996)** — Synthesis: Survey all attempts; organize by assumption relaxed
