# The Equity Premium Puzzle: A Complete Guide

*From basic tenets to advanced theory — organized by Mehra & Prescott (1985), Weil (1989), and Kocherlakota (1996)*

---

# Part I: Mehra & Prescott (1985) — The Original Puzzle

## 1. The Basic Idea (In Simple English)

### What is the equity premium?

**In plain terms:** The equity premium is the extra return you get for holding stocks instead of safe government bonds (Treasury bills). Over the past century in the U.S., stocks have returned about **7% per year** on average, while Treasury bills have returned about **1% per year**. The difference—about **6 percentage points**—is the equity premium.

**Why would stocks pay more?** Because they're riskier. When the economy does poorly, stocks tend to fall. When it does well, stocks rise. Investors demand a higher return to compensate for bearing this risk.

### What is the puzzle?

**In plain terms:** Mehra and Prescott asked: *Can standard economic theory explain why the premium is so large?* Their answer: **No.** 

According to the theory, the size of the equity premium should depend on:
1. How risky stocks are (how much they move with the economy)
2. How much people dislike risk

The problem: **Consumption doesn't fluctuate that much.** When you look at the data, the growth rate of people's consumption (how much they spend) is fairly smooth—it doesn't jump around wildly. So stocks aren't *that* much riskier than bonds from the perspective of "when will I be able to consume?" 

To get a 6% premium, the theory says people would have to be *extremely* risk-averse—so risk-averse that they'd pay huge sums to avoid small gambles. That doesn't match how people actually behave. **Hence the puzzle.**

---

## 2. Mehra & Prescott's Framework (Building Up)

### 2.1 The Setup

Mehra and Prescott study a **representative agent** economy—think of it as one average person standing in for everyone. This person:

- Lives forever (or a very long time)
- Consumes a single good each period
- Can trade stocks and risk-free bonds
- Has **complete markets**—can insure against any future event
- Faces **no frictions**—no taxes, no transaction costs, no borrowing limits

### 2.2 Preferences (How the agent values consumption)

The agent maximizes:

$$E_0 \sum_{t=0}^{\infty} \beta^t \frac{c_t^{1-\alpha} - 1}{1 - \alpha}$$

**In plain English:**
- **β (beta)** = discount factor. How much do you value future consumption vs. today? (β close to 1 means patient; β = 0.99 means you value next year 1% less than this year.)
- **α (alpha)** = coefficient of relative risk aversion. How much do you dislike risk? Higher α = more risk-averse.

**Key constraint:** In this setup, α does *two* jobs at once:
1. It measures **risk aversion** (dislike of consumption varying across states of the world)
2. It measures **aversion to growth** (dislike of consumption rising over time)

The two are tied together: α = 1/IES, where IES is the intertemporal elasticity of substitution.

### 2.3 The Economy

- One "tree" produces fruit (consumption) each period
- The growth rate of fruit follows a **Markov process**—it can be "good" or "bad" each year, with probabilities that match U.S. data
- Stocks = ownership of the tree
- Bonds = risk-free claim to consumption next period

### 2.4 The Asset Pricing Logic

**Core idea:** In equilibrium, you should be indifferent between:
- Consuming one more unit today, or
- Saving it, earning the risk-free rate, and consuming tomorrow

And you should be indifferent between:
- Holding bonds, or
- Holding stocks (which are riskier)

For you to hold stocks despite their risk, they must offer a **premium**—a higher expected return. The size of that premium depends on:
- How much stocks covary with your consumption (stocks pay off when consumption is high = bad hedge)
- How risk-averse you are (α)

**The math:** The equity premium is proportional to **α × Cov(consumption growth, stock returns)**.

---

## 3. Mehra & Prescott's Main Result

### The Numbers

| Variable | U.S. Data (1889–1978) | Model (max with α ≤ 10) |
|----------|------------------------|--------------------------|
| Risk-free rate | 0.80% | — |
| Equity return | 6.98% | — |
| **Equity premium** | **6.18%** | **0.35%** |

**The model can produce at most 0.35% equity premium** when α is restricted to "plausible" values (0 to 10). The observed premium is **6.18%**—about 18 times larger.

### Why Such a Small Premium?

Consumption growth has:
- Mean ≈ 1.8% per year
- Standard deviation ≈ 3.6% per year
- Low covariance with stock returns

So the "consumption risk" of stocks is modest. To get a 6% premium, you'd need α ≈ 40 or 50. But:
- Microeconomic studies suggest α is between 1 and 5
- Arrow (1971) argued α ≈ 1
- Friend & Blume (1975) estimated α ≈ 2
- Mehra & Prescott restrict α ≤ 10 as an upper bound

### The Dilemma (Preview of Weil)

If you *did* set α = 50 to match the equity premium, you'd get another problem: the model would predict a **very high risk-free rate** (double digits). Why? High α means people dislike consumption growing over time. To get them to save anyway, you'd need a high interest rate. But the observed risk-free rate is less than 1%.

So you're stuck:
- **Low α** → plausible risk-free rate, but equity premium too small
- **High α** → equity premium OK, but risk-free rate way too high

---

## 4. Mehra & Prescott's Robustness Checks

They showed the result holds under:
- Different consumption growth processes
- Different time periods (quarterly, annual)
- Firm leverage (dividends more variable than output)
- Measurement error in inflation

**Conclusion:** The puzzle is not a fluke. Standard frictionless, complete-market models cannot explain the data.

---

## 5. Mehra & Prescott's Conjecture

They suggest the answer lies **outside** the Arrow-Debreu framework—perhaps in:
- **Incomplete markets** (people can't insure against all risks)
- **Liquidity constraints** (people can't borrow freely)
- **Transaction costs** (trading stocks is costlier than bonds)

Models with such "frictions" might rationalize both the high equity premium and the low risk-free rate.

---

# Part II: Weil (1989) — The Risk-Free Rate Puzzle

## 1. What Weil Added (In Simple English)

Weil asked: *Can we fix the puzzle by separating risk aversion from intertemporal substitution?*

**The hope:** In Mehra-Prescott, α does two things. What if we could have:
- High risk aversion (to justify the equity premium)
- High willingness to substitute over time (to keep the risk-free rate low)

That would give us an extra "degree of freedom" to match both facts.

**Weil's answer:** **No.** Separating them doesn't solve the equity premium puzzle. And it creates a new puzzle: the **risk-free rate puzzle**.

---

## 2. Kreps-Porteus / Epstein-Zin Preferences

### 2.1 The Idea

Standard preferences tie risk aversion (α) and intertemporal elasticity of substitution (1/ρ) together: they're inverses of each other.

**Kreps-Porteus / Epstein-Zin** preferences allow them to be **independent**:
- **γ (gamma)** = coefficient of relative risk aversion
- **ρ (rho)** = parameter governing intertemporal substitution (1/ρ = IES)

Now you can have high γ (risk-averse) and low ρ (willing to substitute over time) at the same time.

### 2.2 Why This Seemed Promising

**Intuition:**
- The **equity premium** depends on risk aversion (γ)—how much you dislike consumption varying across states
- The **risk-free rate** depends on intertemporal substitution (1/ρ)—how much you're willing to shift consumption across time

So: set γ high (match equity premium), set 1/ρ high (match low risk-free rate). Problem solved?

---

## 3. Weil's Main Result

### 3.1 With i.i.d. Dividend Growth

**Weil proved:** When the growth rate of dividends (and consumption) is **i.i.d.** (independent and identically distributed over time), the equity premium depends **only on γ**—not on ρ at all.

**In plain English:** With i.i.d. growth, the intertemporal substitution parameter is irrelevant for the equity premium. So relaxing the α = 1/ρ restriction doesn't help. You still need implausibly high γ (≈ 40) to match the 6% premium.

### 3.2 The Risk-Free Rate Puzzle

**Weil showed:** If you relax the restriction in the direction of "more realism" (e.g., low IES, as some estimates suggest), you make the risk-free rate puzzle **worse**, not better.

**Example from his Table 1:** With γ = 1 (log utility) and 1/ρ = 0.1 (low IES):
- Predicted equity premium: 0.45% (still far below 6%)
- Predicted risk-free rate: **24.91%** (vs. observed ~1%)

So you get a new puzzle: **Why is the risk-free rate so low if people are so averse to consumption fluctuations over time?**

### 3.3 Summary of Weil

| Puzzle | Does Kreps-Porteus help? |
|--------|---------------------------|
| Equity premium | **No** — premium still depends only on γ with i.i.d. growth |
| Risk-free rate | **No** — relaxing the restriction often makes it worse |

**Weil's conclusion:** The equity premium puzzle remains. And we now have a second puzzle—the risk-free rate puzzle—which the Kreps-Porteus framework helped bring to light.

---

# Part III: Kocherlakota (1996) — The Survey and Synthesis

## 1. What Kocherlakota Added (In Simple English)

Kocherlakota wrote a **survey** for the *Journal of Economic Literature*. He:
1. Restated the puzzles in a more **robust** way
2. Identified the **three core assumptions** that generate them
3. Reviewed **all attempts** to resolve the puzzles
4. Concluded: the equity premium puzzle is **still unresolved**

---

## 2. A More Robust Restatement of the Puzzles

### 2.1 The Three Assumptions

Kocherlakota showed the puzzles arise from only **three** assumptions. Any model that relaxes at least one *might* resolve them.

| # | Assumption | Plain English |
|---|------------|---------------|
| 1 | **Power utility** | Preferences have the form U(c) = c^(1−α)/(1−α) with α and β in plausible ranges |
| 2 | **Complete markets** | People can trade assets to insure against any future event |
| 3 | **Frictionless trading** | No taxes, no transaction costs, no borrowing constraints |

### 2.2 Why This Is Useful

Mehra-Prescott also assumed things about:
- The exact process for consumption growth (Markov chain)
- Perfect correlation between dividends and consumption
- No sampling error

Kocherlakota showed the puzzles survive even if you relax those. The **only** essential ingredients are the three above. So any solution must change at least one of them.

---

## 3. Kocherlakota's Review of Solutions

### 3.1 Preference Modifications

#### (a) Generalized Expected Utility (Epstein-Zin / Kreps-Porteus)

- **What it does:** Separates risk aversion from intertemporal substitution
- **Equity premium:** Does NOT help (as Weil showed)
- **Risk-free rate:** CAN help—you can match the low risk-free rate with high α
- **Bottom line:** Resolves risk-free rate puzzle only; equity premium puzzle remains

#### (b) Habit Formation

- **What it does:** Utility depends on past consumption (e.g., you get used to a high level)
- **Effect:** Makes marginal utility more sensitive to consumption changes → effective risk aversion rises
- **Risk-free rate:** Can lower it (precautionary demand for bonds)
- **Equity premium:** Limited success; still requires high effective risk aversion

#### (c) Relative Consumption ("Keeping Up with the Joneses")

- **What it does:** Utility depends on your consumption relative to others'
- **Effect:** Similar to habit—increases sensitivity to consumption variation

### 3.2 Market Structure Modifications

#### (a) Incomplete Markets / Idiosyncratic Risk

- **What it does:** People face uninsurable income shocks (e.g., job loss)
- **Effect:** Can increase demand for precautionary saving; may affect risk premia
- **Kocherlakota's take:** In infinite-horizon models with self-insurance, the effect on the equity premium is small

#### (b) Borrowing Constraints

- **What it does:** People cannot borrow freely (e.g., against future wages)
- **Effect:** Increases demand for bonds; lowers risk-free rate
- **Life-cycle angle:** Young people want to borrow to buy stocks but can't; middle-aged investors price equity → higher premium

### 3.3 Distributional Assumptions

#### (a) Disaster States (Rietz 1988)

- **What it does:** Small probability of a large consumption crash (e.g., depression)
- **Effect:** Makes stocks seem riskier; can raise equity premium
- **Critique:** Unobserved in U.S. data; real interest rates didn't move as the theory predicts

#### (b) Survivorship Bias

- **What it does:** U.S. data reflect a "winning" market; others failed
- **Critique:** Bonds and stocks were similarly affected in crises (e.g., hyperinflation)

### 3.4 Kocherlakota's Bottom Line

| Puzzle | Plausible explanations? |
|--------|--------------------------|
| **Risk-free rate** | Yes—several preference and market-structure fixes can lower it |
| **Equity premium** | No—only two rationalizations: (1) investors are highly risk-averse, or (2) trading stocks is much costlier than bonds. Little evidence for either. |

**The equity premium puzzle is still a puzzle.**

---

## 4. Why the Puzzles Matter (Kocherlakota)

- **Risk-free rate puzzle:** We don't fully understand why people save so much when returns are low.
- **Equity premium puzzle:** We don't understand why people are so averse to the procyclical risk of stocks. Without that, we can't properly assess the cost of business cycles (Lucas 1987).

---

# Summary: The Hierarchical Story

| Stage | Paper | Main Contribution |
|-------|-------|-------------------|
| **1** | **Mehra & Prescott (1985)** | Define the equity premium puzzle: standard models produce at most 0.35% premium; observed is 6%. Requires implausibly high risk aversion. Conjecture: frictions (incomplete markets, liquidity constraints) may explain it. |
| **2** | **Weil (1989)** | Add the risk-free rate puzzle. Test Kreps-Porteus preferences: separating risk aversion from intertemporal substitution does NOT solve the equity premium puzzle. With i.i.d. growth, equity premium depends only on γ. Relaxing the restriction can make the risk-free rate puzzle worse. |
| **3** | **Kocherlakota (1996)** | Survey and synthesize. Reduce the puzzles to three assumptions. Review all solutions: preference changes help risk-free rate, not equity premium; market frictions have limited effect. Conclude: equity premium puzzle remains unresolved. |

---

# Glossary (Simple Definitions)

| Term | Simple Definition |
|------|-------------------|
| **Equity premium** | Extra return on stocks over risk-free bonds (~6% historically) |
| **Risk-free rate** | Return on safe government debt (~1% historically) |
| **CRRA (α)** | Coefficient of relative risk aversion; how much you dislike consumption risk |
| **IES** | Intertemporal elasticity of substitution; willingness to shift consumption across time |
| **Representative agent** | One average consumer standing in for the whole economy |
| **Complete markets** | Ability to insure against any future event |
| **Arrow-Debreu economy** | Frictionless, complete-market competitive equilibrium |
| **Euler equation** | First-order condition: marginal cost of saving = expected marginal benefit |
| **Stochastic discount factor** | Factor that prices assets; links returns to marginal utility of consumption |
