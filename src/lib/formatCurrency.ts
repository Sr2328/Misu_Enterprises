/**
 * Format currency in Indian Rupees (INR)
 */
export const formatINR = (amount: number): string => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
};

/**
 * Format salary range in INR
 */
export const formatSalaryRange = (min?: number | null, max?: number | null): string => {
  if (!min && !max) return 'Salary not disclosed';
  if (min && max) {
    return `${formatINR(min)} - ${formatINR(max)}`;
  }
  if (min) return `From ${formatINR(min)}`;
  if (max) return `Up to ${formatINR(max)}`;
  return 'Salary not disclosed';
};

/**
 * Parse salary display string (for backward compatibility)
 */
export const formatSalaryDisplay = (salaryDisplay?: string | null, min?: number | null, max?: number | null): string => {
  // If we have numeric values, use those
  if (min || max) {
    return formatSalaryRange(min, max);
  }
  // If we have a display string, return it (might already be formatted)
  if (salaryDisplay) {
    // Check if it already contains INR or ₹
    if (salaryDisplay.includes('₹') || salaryDisplay.toLowerCase().includes('inr')) {
      return salaryDisplay;
    }
    // Otherwise, prepend ₹ symbol
    return `₹${salaryDisplay}`;
  }
  return 'Salary not disclosed';
};

