# The Equity Premium Puzzle: A Hierarchical Guide

*Built from: Mehra & Prescott (1985) → Weil (1989) → Kocherlakota (1996)*

---

## Part 0: Before You Begin — The Building Blocks

Before touching any paper, you need to be comfortable with five ideas. Everything in the equity premium puzzle literature is just these five ideas colliding with data.

### 0.1 People Prefer Certainty Over Gambles

If someone offers you a guaranteed $50 versus a coin flip for $0 or $100, most people take the guaranteed $50 — even though both options have the same average payout. This preference is called **risk aversion**. The more strongly you prefer the safe option, the more risk-averse you are.

Economists measure this with a number called **α** (the coefficient of relative risk aversion, or CRRA). A person with α = 0 is risk-neutral — they only care about the average payout and do not care about the gamble. A person with α = 2 is moderately risk-averse. A person with α = 50 is terrified of any gamble, and would pay enormous amounts to avoid even small risks.

Most empirical evidence from micro studies, labor economics, and macro suggests α falls somewhere between 1 and 5 — people are moderately risk averse, but not pathologically so. Mehra and Prescott generously allowed α up to 10.

### 0.2 People Are Impatient

Given identical consumption today versus tomorrow, most people prefer it today. This impatience is captured by the **discount factor β**, a number between 0 and 1. If β = 0.95, a person values a dollar next year at 95 cents today. If β = 0.99, they are very patient. If β = 1, they treat present and future consumption identically (no impatience at all).

### 0.3 How People Trade Off Today vs. Tomorrow

When you save a dollar today, you give up some consumption now in exchange for more consumption later. How willing you are to do this is measured by the **intertemporal elasticity of substitution (IES)**.

- High IES → you readily shift consumption across time when interest rates change
- Low IES → you strongly prefer a smooth, flat consumption path across time; interest rates have to move a lot to get you to shift

In the standard model (power utility), the IES is mechanically locked to risk aversion: **IES = 1/α**. This single linkage is the source of enormous trouble.

### 0.4 The Basic Logic of Asset Pricing

Why do different assets earn different average returns? The standard economic answer:

> An asset that pays you well precisely when times are already good (consumption is high) is not very valuable as insurance. You do not need extra money when you are already doing fine. So for you to hold such an asset willingly, it must compensate you with a high average return.

Formally, an asset's excess return is proportional to how much its payoff moves with the investor's consumption:

**Expected excess return ≈ α × Covariance(asset return, consumption growth)**

This is the **Consumption Capital Asset Pricing Model (C-CAPM)**. It says: the reward for holding a risky asset depends on (a) how risky it is *in consumption terms*, and (b) how much the investor dislikes that risk.

### 0.5 The Representative Agent

All three papers use a simplification: instead of modelling millions of different investors, they assume a single **representative agent** whose consumption equals per capita consumption in the economy. If markets are complete (people can insure against anything) and frictionless (no transaction costs), this is theoretically justified — everyone ends up with the same consumption anyway.

---

## Part 1: Mehra & Prescott (1985) — The Puzzle Is Born

**Paper**: "The Equity Premium: A Puzzle," *Journal of Monetary Economics*

### 1.1 The Empirical Facts

Mehra and Prescott look at U.S. data from 1889 to 1978 (90 years) and observe:

| Variable | Average |
|----------|---------|
| Real return on stocks (S&P 500) | ~7% per year |
| Real return on Treasury bills | ~1% per year |
| **Equity premium** (stocks minus bills) | **~6% per year** |
| Per capita consumption growth | ~1.8% per year |
| Std. deviation of consumption growth | ~3.6% |

Stocks earned massively more than bonds. The question is: **can standard economic theory explain this gap?**

### 1.2 The Model

They build a simple economy based on Lucas (1978):

- There is one consumption good ("fruit") produced by "trees"
- Output growth follows a two-state Markov chain (good times / bad times) calibrated to match U.S. consumption data
- There is one representative agent with power utility: U(c) = c^(1−α) / (1−α)
- Two assets exist: equity (a claim on the tree's fruit) and a risk-free bill

The agent's optimal behavior produces two equilibrium conditions (Euler equations):

1. **For the equity premium**: The gap between stock and bond returns must be just large enough that the representative agent is marginally indifferent between holding stocks versus bonds
2. **For the risk-free rate**: The bond return must be just high enough that the agent is willing to defer consumption (i.e., save)

### 1.3 The Test

They search over all combinations of α (0 to 10) and β (0 to 1) and ask: for which parameter values can the model simultaneously produce an equity premium of ~6% and a risk-free rate of ~1%?

### 1.4 The Result: Failure

**The model generates a maximum equity premium of 0.35%** — no matter what values of α and β you choose within the plausible range. The observed 6% premium is more than **17 times larger** than what the model can produce.

Why? The covariance between consumption growth and stock returns in the data is simply too small. To make the representative agent demand a 6% premium for holding stocks, you would need α somewhere around 40 to 50 — meaning the agent is absurdly, implausibly risk-averse.

### 1.5 The Intuition (Why It Fails)

The heart of the problem is that **aggregate consumption is too smooth**. Year-to-year, per capita consumption barely wiggles — its standard deviation is only 3.6%. If consumption does not swing much, then from the representative agent's perspective, stocks are barely riskier than bonds in terms of what actually matters (consumption). So why should stocks earn 6% more?

The model says: they should not. The data says: they do.

This is the **Equity Premium Puzzle**.

### 1.6 The Hidden Second Problem

In their conclusion, Mehra and Prescott plant a seed that Weil would later develop. They note:

> "The equity premium puzzle may not be why was the average equity return so high but rather why was the average risk-free rate so low."

If you push α high enough (say α = 2), the model *can* begin to generate some equity premium. But then it also predicts a risk-free rate of at least 3.7% — much higher than the observed 0.8%. The model overshoots on the risk-free rate while undershooting on the equity premium. Something deeper is wrong.

---

## Part 2: Weil (1989) — The Escape Attempt That Reveals a Deeper Problem

**Paper**: "The Equity Premium Puzzle and the Riskfree Rate Puzzle," *NBER Working Paper 2829*

### 2.1 Weil's Starting Point

Weil takes Mehra and Prescott's puzzle seriously and asks: **is the problem just that standard utility is too restrictive?**

In standard power utility, risk aversion (α) and intertemporal substitution (1/α) are yoked together — they are the inverse of each other. This means:

- If you want high risk aversion (high α) to explain the equity premium → you automatically get low IES (low 1/α) → the agent strongly dislikes consuming different amounts across time → the model predicts a high risk-free rate (because the agent needs a big reward to defer consumption in a growing economy)

Maybe the problem is simply this forced linkage. If we could make the agent risk-averse (to explain the equity premium) without also making them averse to intertemporal substitution (so the risk-free rate stays low), the puzzle might dissolve.

### 2.2 The Tool: Kreps-Porteus / Epstein-Zin Preferences

Weil adopts a class of preferences introduced by Kreps-Porteus (1978) and developed by Epstein-Zin (1987). These preferences allow **two separate knobs**:

- **γ** (gamma) — coefficient of relative risk aversion (attitudes toward risk / gambles)
- **ρ** (rho), with IES = 1/ρ — attitudes toward consumption smoothing over time

Standard expected utility is the special case where γ = ρ. By letting γ ≠ ρ, you get an extra degree of freedom. In principle, you could set γ high (risk-averse, to explain the equity premium) and ρ low (high IES, to keep the risk-free rate low).

### 2.3 The Theoretical Result: The Equity Premium Does Not Budge

Weil proves a devastating result. When dividend/consumption growth is **i.i.d.** (independent over time — each year's growth has no memory of the previous year's):

> **The equity premium depends ONLY on risk aversion (γ). The intertemporal elasticity of substitution (1/ρ) is completely irrelevant.**

The mathematical intuition: with i.i.d. growth, the agent's problem reduces to a sequence of independent one-period portfolio choices. In a one-period world, only risk preferences matter — there is no "intertemporal" dimension to worry about. So the new knob (IES separate from CRRA) gives you nothing when it comes to the equity premium.

This means the extra degree of freedom that Kreps-Porteus preferences provide **cannot help with the equity premium at all**. You still need implausibly high γ (≈ 40–50) to match the 6% premium, exactly as in Mehra-Prescott.

### 2.4 The Numerical Confirmation (Non-i.i.d. Case)

Even when dividend growth is not i.i.d. (using Mehra-Prescott's calibrated Markov process with serial correlation), the numerical results confirm the theoretical finding. Across a wide grid of γ and IES values, with β = 0.95:

| IES (1/ρ) | γ = 0.5 | γ = 1 | γ = 5 | γ = 10 |
|-----------|---------|-------|-------|--------|
| 2 | 0.06% | 0.07% | 0.09% | 0.35% |
| 1 | 0.11% | 0.12% | 0.15% | 0.45% |
| 0.5 | 0.51% | 0.56% | 0.64% | 1.31% |
| 0.1 | 1.01% | 1.08% | 1.22% | 2.33% |

The risk premium barely moves as you vary IES (reading down each column). It responds almost entirely to γ (reading across each row). And even at γ = 10, the best you get is 2.33% — still far short of 6.2%.

### 2.5 The New Puzzle: The Risk-Free Rate Puzzle

But now look at what happens to the risk-free rate. In the same table, the **bold numbers** are the predicted risk-free rates:

| IES (1/ρ) | γ = 1 (R_f) | γ = 5 (R_f) | γ = 10 (R_f) |
|-----------|-------------|-------------|--------------|
| 1 (std utility) | 7.03% | 8.14% | 17.87% |
| 0.5 | 7.10% | 6.60% | 6.06% |
| 0.1 | 24.96% | 21.68% | 17.87% |

The observed risk-free rate is about 0.8%. But the model predicts risk-free rates of 6% to 25%!

What happens is: lowering IES (raising ρ, which empirical evidence suggests is correct — people do not like substituting across time) makes the risk-free rate **explode upward**. In a growing economy (consumption growth ≈ 1.8%/year), a consumer who strongly dislikes consuming different amounts in different years needs a very high interest rate as incentive to defer consumption. If the economy is growing, future consumption will exceed present consumption, and the agent finds this unpleasant if IES is low.

This is the **Risk-Free Rate Puzzle**:

> If consumers are as averse to intertemporal substitution as empirical evidence suggests, why is the risk-free rate so low?

### 2.6 The Dilemma Weil Reveals

Mehra and Prescott faced a puzzle — the equity premium was too big for the model.

Weil shows the puzzle is actually worse — it is a **double puzzle**:

1. **Equity premium puzzle**: You need impossibly high risk aversion to match the equity premium
2. **Risk-free rate puzzle**: But high risk aversion (in standard utility) or low IES (in Epstein-Zin utility) sends the predicted risk-free rate far above the observed ~1%

Separating the two preference parameters does not help with the equity premium, and in fact makes the risk-free rate problem worse when you calibrate to empirical estimates of the IES.

### 2.7 Weil's Conclusion

Relaxing the expected utility restriction in what seemed the most natural direction (Kreps-Porteus preferences) does not solve the puzzle. It sharpens it. Weil suggests the answer likely lies in **market imperfections** — incomplete markets, undiversifiable idiosyncratic risk — rather than in preference specifications. He also points toward habit formation as a potentially more promising class of preference modifications.

---

## Part 3: Kocherlakota (1996) — A Decade of Failure, Catalogued

**Paper**: "The Equity Premium: It's Still a Puzzle," *Journal of Economic Literature*

### 3.1 Purpose and Scope

Writing a decade after Mehra-Prescott, Kocherlakota surveys every major attempt to resolve the twin puzzles. His verdict is in the title: the puzzle persists. But the journey through the attempted solutions is highly instructive.

### 3.2 Reformulating the Puzzles More Robustly

Kocherlakota first strengthens the statement of the puzzles. He shows they rest on **exactly three assumptions**:

1. **Power utility**: The representative agent maximizes expected discounted power utility
2. **Complete markets**: All risks can be insured, so per capita consumption = individual consumption
3. **Frictionless trade**: No transaction costs in buying or selling assets

Any proposed solution must relax at least one of these three.

He also makes the puzzles more precise using Euler equations evaluated at their sample means (not just model simulations). This shows the puzzles survive regardless of distributional assumptions about consumption growth — they are not artifacts of Mehra-Prescott's two-state Markov specification.

Numerically: to satisfy both Euler equations with the data, you need α ≈ 18 and β ≈ 1.08. Both are outside the plausible range (α should be below 10; β should be below 1).

### 3.3 Attempted Solutions: Relaxing Assumption 1 (Preferences)

#### 3.3.1 Generalized Expected Utility (Epstein-Zin)

This is Weil's approach. Kocherlakota confirms the verdict:

- **Equity premium**: GEU preferences do not help. The key Euler equation for the equity premium has the same form regardless of whether you use standard or GEU preferences. α still needs to be near 18.
- **Risk-free rate**: GEU *can* solve the risk-free rate puzzle. By setting IES high (independently of risk aversion), you can allow the agent to tolerate consumption growth without requiring a high interest rate.

**Scorecard**: Solves half the problem (risk-free rate) but leaves the equity premium completely intact.

#### 3.3.2 Habit Formation

If your happiness today depends not just on what you consume today, but on how much you consumed yesterday ("getting used to the good life"), then your effective risk aversion shoots up — a small drop in consumption feels devastating because you are accustomed to more.

Constantinides (1990) explores this. The utility function becomes:

> U(cₜ) = (cₜ − λcₜ₋₁)^(1−α) / (1−α)

where λ > 0 captures the strength of the habit.

However, Kocherlakota shows that when consumption growth is unpredictable (a reasonable empirical assumption), habit formation **does not resolve the equity premium puzzle**. The investor is still willing to exploit the equity-bond spread unless α is high. Habit formation does help with the risk-free rate puzzle by generating higher savings demand.

**Scorecard**: Same as GEU — helps with risk-free rate, not with equity premium (under unpredictable consumption growth).

#### 3.3.3 "Keeping Up with the Joneses" (Relative Consumption)

Abel (1990) and Gali (1994) propose that people care not just about their own consumption but about how it compares to everyone else's. If per capita consumption falls, your neighbor's consumption falls too, and you feel extra pain — not because your own consumption fell, but because the whole reference point shifted.

This effectively amplifies risk aversion with respect to aggregate shocks. With the right calibration, it *can* resolve the equity premium puzzle — but it requires unrealistically large concern about relative standing (the parameter governing relative consumption effects must be extremely high).

**Scorecard**: Can match the numbers but requires parameter values with limited empirical support. Also needs habit-like effects (lagged consumption dependence) to resolve the risk-free rate puzzle simultaneously.

### 3.4 Attempted Solutions: Relaxing Assumption 2 (Complete Markets)

#### 3.4.1 Incomplete Markets (Uninsurable Income Risk)

Maybe the puzzle arises because per capita consumption is too smooth, but *individual* consumption is much more volatile (people face job losses, health shocks, etc. that they cannot fully insure against). If individual consumption is more volatile than aggregate consumption, individual investors will demand a larger premium for holding risky stocks.

This is perhaps the most intuitive escape route. But there is a devastating counterargument: **dynamic self-insurance**. In an infinite-horizon economy, individuals can smooth income shocks over time by saving and dissaving. They do not need explicit insurance markets — they just use their savings buffer.

Huggett (1993) and Heaton & Lucas (1995) find numerically that dynamic self-insurance works well enough that the incomplete-markets risk-free rate is close to the complete-markets rate. The exception is if income shocks are **permanent** (Constantinides & Duffie, 1995) — but empirical evidence suggests most income shocks are transitory.

**Scorecard**: Theoretically appealing but quantitatively insufficient. Dynamic self-insurance undoes most of the effect.

#### 3.4.2 Borrowing Constraints

If people cannot borrow against future income, they build up precautionary savings. This extra demand for safe assets pushes the risk-free rate down — helpful for the risk-free rate puzzle.

But Heaton and Lucas (1995) show that borrowing constraints have little impact on the equity premium, because an agent constrained in the stock market is typically also constrained in the bond market — both returns get pushed down together, leaving the spread roughly unchanged.

**Scorecard**: Helps with risk-free rate; does not help with equity premium.

### 3.5 Attempted Solutions: Relaxing Assumption 3 (Frictionless Trade)

#### 3.5.1 Transaction Costs

If stocks are costlier to trade than bonds (brokerage fees, bid-ask spreads, information costs), then the equity premium could partly represent compensation for these extra trading costs rather than pure risk compensation.

Kocherlakota's analysis: for a buy-and-hold investor, the annualized impact of a one-time transaction cost shrinks the longer you hold the stock. So transaction costs can generate a large premium only if investors trade frequently or if stock-trading costs are dramatically higher than bond-trading costs.

Aiyagari & Gertler (1991) and Heaton & Lucas (1995) find that **only if there are large differences in trading costs between stocks and bonds can you explain the equity premium**. Little empirical evidence supports this.

**Scorecard**: Can work mechanically but requires unsupported claims about cost differentials between stock and bond markets.

#### 3.5.2 Market Segmentation

Mankiw and Zeldes (1991) point out that only about 30% of Americans own stocks. If non-stockholders are excluded from the equity market, perhaps the consumption of *stockholders only* covaries more with stock returns than aggregate per capita consumption does. This would make stocks appear riskier to the relevant investor and justify a higher premium.

The evidence is mixed. Stockholder consumption is somewhat more volatile and more correlated with stock returns, but not enough to fully close the gap.

**Scorecard**: Partial improvement, insufficient on its own.

### 3.6 Other Proposed Solutions

#### 3.6.1 Rare Disasters (Rietz, 1988)

Maybe there is a small probability of a catastrophic consumption drop (like a depression or war) that does not appear in the 90-year sample but that investors fear. This tail risk could justify a large equity premium.

Kocherlakota's objection: in disaster states, real interest rates should spike (people desperately want current consumption), but historically they have not. Also, the precise calibration of the disaster probability is arbitrary — you can match any equity premium by choosing the right disaster probability.

#### 3.6.2 Survivorship Bias (Brown, Goetzmann & Ross, 1995)

Maybe the U.S. equity premium is high because the U.S. is a "survivor" — a market that happened to do well. Markets that collapsed (Russia 1917, Germany 1945) are not in the sample. So the observed premium overstates the true expected premium.

Kocherlakota's objection: in catastrophic episodes, bonds typically also suffered (governments defaulted, hyperinflation wiped out bondholders), so the *spread* between stocks and bonds should not be dramatically affected by survivorship.

### 3.7 Kocherlakota's Final Verdict

After cataloguing every major approach, Kocherlakota draws three conclusions:

1. **The risk-free rate puzzle has several plausible partial solutions** — GEU preferences, habit formation, borrowing constraints can all lower the predicted risk-free rate. The puzzle of why people save so much despite low returns is not as deep.

2. **The equity premium puzzle remains fundamentally unresolved.** Every approach either:
   - Requires implausibly high risk aversion (α ≥ 18)
   - Requires implausibly large parameter values for some other mechanism
   - Is quantitatively insufficient when calibrated realistically

3. **The puzzle is analogous to the "rate of return dominance" puzzle in monetary theory** — why do people hold currency (which earns 0%) when Treasury bills earn positive returns? Both puzzles point to frictions in exchange that standard theory does not capture. Progress requires understanding the fundamental informational and institutional forces that create these frictions.

---

## Part 4: The Big Picture — How the Three Papers Fit Together

```
Mehra & Prescott (1985)
│
│  "Stocks earn 6% more than bonds. Our model says they shouldn't."
│  → The EQUITY PREMIUM PUZZLE is born.
│  → Hint: maybe the real puzzle is the low risk-free rate.
│
▼
Weil (1989)
│
│  "Let me separate risk aversion from intertemporal substitution.
│   That should fix it."
│  → It does NOT fix the equity premium. At all.
│  → Instead, it reveals a second, deeper problem:
│     the RISK-FREE RATE PUZZLE.
│  → The twin puzzles are now clearly stated.
│
▼
Kocherlakota (1996)
│
│  "Ten years of attempts. Has anything worked?"
│  → Risk-free rate puzzle: partially solvable (GEU, habits, constraints)
│  → Equity premium puzzle: STILL A PUZZLE.
│  → No solution avoids implausible assumptions.
│  → The field needs a fundamentally new direction.
```

### The Core Tension in One Sentence

> Aggregate consumption is too smooth relative to stock returns for any plausibly risk-averse agent to demand a 6% premium for holding stocks over bonds — and every clever modification to preferences or market structure attempted so far has failed to convincingly change this arithmetic.

---

## Appendix A: Key Parameters at a Glance

| Symbol | Name | Role | Plausible Range |
|--------|------|------|-----------------|
| α (or γ) | Coefficient of Relative Risk Aversion (CRRA) | How much the agent dislikes gambles | 1–10 (needed: ~18–50) |
| β | Discount Factor | How impatient the agent is | 0.95–0.99 (needed: ~1.08) |
| IES (= 1/α or 1/ρ) | Intertemporal Elasticity of Substitution | Willingness to shift consumption over time | 0.1–1.0 |
| R_e | Average real return on equity | S&P 500 | ~7%/year |
| R_f | Average real return on bills | Treasury bills | ~1%/year |
| R_e − R_f | Equity premium | The puzzle | ~6%/year |

## Appendix B: Why Each "Fix" Fails — Summary Table

| Approach | Relaxes Which Assumption? | Equity Premium? | Risk-Free Rate? | Fatal Flaw |
|----------|--------------------------|-----------------|-----------------|------------|
| Standard (Mehra-Prescott) | None | Max 0.35% | Too high | This IS the puzzle |
| Epstein-Zin / GEU (Weil) | IES ≠ 1/α | No change | Can fix | EP unchanged because EP depends only on CRRA |
| Habit Formation | Utility depends on past consumption | Doesn't help (with i.i.d. growth) | Can fix | Effective risk aversion still needs to be high |
| Keeping Up with Joneses | Utility depends on others' consumption | Can help | Needs habit too | Requires extreme relative-consumption concern |
| Incomplete Markets | No full insurance | Small effect | Small effect | Dynamic self-insurance undoes most of it |
| Borrowing Constraints | Can't borrow freely | Doesn't help | Can fix | Constraints bind symmetrically across markets |
| Transaction Costs | Trading is costly | Can help IF costs differ | N/A | No evidence for huge stock-vs-bond cost gap |
| Rare Disasters | Tail risk of catastrophe | Can match anything | Predicts high R_f in crises (wrong) | Unconstrained free parameter; no testability |
| Survivorship Bias | Sample selection | Could reduce true EP | Bonds also suffer in crises | Spread should be unaffected |
