# Kittens Game Gameplay Mechanics

This document outlines the core formulas and constants used in Kittens Game, based on the source code from the official repository.

## 1. Core Mechanics

### 1.1 Price Formula
The cost of buildings and stackable upgrades increases exponentially.
$$Price = BasePrice \times PriceRatio^{Count} \times (1 - Discounts)$$
*   **Default Price Ratio**: 1.15 (for most buildings).
*   **Discounts**: Includes cost reductions from upgrades and metaphysics, often subject to Limited Diminishing Returns.

### 1.2 Diminishing Returns

#### Limited Diminishing Returns (LDR)
Used for effects that approach a cap. The first 75% is linear; the remaining 25% approaches the limit asymptotically.
$$
f(x, limit) =
\begin{cases}
x & \text{if } |x| \leq 0.75 \times limit \\
0.75 \times limit + (1 - \frac{0.25 \times limit}{|x| - 0.75 \times limit + 0.25 \times limit}) \times 0.25 \times limit & \text{if } |x| > 0.75 \times limit
\end{cases}
$$

#### Unlimited Diminishing Returns (UDR)
Used for effects that grow without a hard cap but slow down significantly.
$$f(value, stripe) = \frac{\sqrt{1 + 8 \times \frac{value}{stripe}} - 1}{2}$$

## 2. Village & Kittens

### 2.1 Kitten Growth
*   **Base Arrival Rate**: 0.01 kittens per tick.
*   **Modifiers**: Multiplied by $(1 + \text{kittenGrowthRatio})$.
*   **Festivals**: Multiply arrival rate by $(2 + \text{festivalArrivalRatio})$.

### 2.2 Resource Consumption
*   **Catnip**: -0.85 per kitten per tick.
*   **Furs**: -0.01 per kitten per tick.
*   **Ivory**: -0.007 per kitten per tick.
*   **Spice**: -0.001 per kitten per tick.
*   *Note: Consumption is increased by `luxuryDemandRatio`.*

### 2.3 Happiness Calculation
*   **Base**: 100%.
*   **Unhappiness**: $-(Kittens - 5) \times 2 \times (1 + \text{unhappinessRatio})$.
*   **Luxury Resources**: +10% per unique uncommon/rare resource.
*   **Festivals**: +30% bonus.
*   **Karma**: +1% per Karma point.
*   **Overpopulation**: $-2\% \times (Kittens - MaxKittens)$.
*   **Minimum Happiness**: 25%.

### 2.4 Job Production Rates (Base per tick)
*   **Woodcutter**: 0.018 wood.
*   **Farmer**: 1.00 catnip.
*   **Scholar**: 0.035 science.
*   **Hunter**: 0.06 catpower (manpower).
*   **Miner**: 0.05 minerals.
*   **Priest**: 0.0015 faith.
*   **Geologist**: 0.015 coal.
*   **Formula**: $Prod = Base \times (1 + \text{SkillMod}) \times \text{HappinessMod} \times (1 + \text{LeaderBonus})$.

## 3. Resource Production

### 3.1 Crafting
$$CraftAmount = NumberToCraft \times (1 + \text{CraftRatio})$$
*   **Craft Ratio**: Increased by Workshop upgrades and Factories.

### 3.2 Storage
*   **Barns/Warehouses**: Provide base storage.
*   **Paragon Bonus**: +0.1% storage capacity per Paragon point.

## 4. Religion

### 4.1 Solar Revolution
$$Bonus = LDR(\frac{UDR(Faith, 1000)}{100}, 10 + \text{Limit})$$
*   Limit is increased by Transcendence Tier and Black Obelisks.

### 4.2 Apocrypha
*   **Praising the Sun**: Converted Faith = $\text{FaithValue} \times (1 + \text{ApocryphaBonus})$.
*   **Apocrypha Bonus**: $UDR(\text{FaithRatio}, 0.1) \times 0.1$.

### 4.3 Transcendence
*   **Total Price for Tier**: $InverseUDR(\exp(Tier) / 10, 0.1)$.

## 5. Prestige (Reset Mechanics)

### 5.1 Karma
Calculated from kittens upon reset.
*   **Kittens > 35**: $+(Kittens - 35)$ KarmaKittens.
*   **Kittens > 60**: $+(Kittens - 60) \times 3$ KarmaKittens.
*   **Kittens > 100**: $+(Kittens - 100) \times 4$ KarmaKittens.
*   *Additional tiers at 150, 300, and 750 kittens.*
*   **Karma Value**: $UDR(\text{KarmaKittens}, 5)$.

### 5.2 Paragon
*   **Gain**: 1 Paragon point for every kitten over 70.
*   **Production Bonus**: $+1\%$ production per point, subject to LDR (diminishes at 150 points).

## 6. Calendar & Time

### 6.1 Time Constants
*   **Ticks per Day**: 10.
*   **Days per Season**: 100.
*   **Ticks per Year**: 4,000.

### 6.2 Seasonal Modifiers (Catnip)
*   **Spring**: 1.5x
*   **Summer**: 1.0x
*   **Autumn**: 1.0x
*   **Winter**: 0.25x
*   **Weather**: Warm (+0.15) or Cold (-0.15).

### 6.3 Astronomical Events
*   **Base Chance**: 0.25% per day.
*   **Auto-Observe Chance**: Increased by Observatories and researched SETI (100%).
