export function formatCurrency(value: number, decimals = 2): string {
    return new Intl.NumberFormat("en-US", {
      style: "decimal",
      maximumFractionDigits: decimals,
      notation: value >= 1000000 ? "compact" : "standard",
      compactDisplay: "short",
    }).format(value)
  }
  
  