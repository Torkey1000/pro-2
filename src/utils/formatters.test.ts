import { describe, it, expect } from 'vitest';
import { formatDate, formatSalary, formatNumber, formatPercentage, getStatusColor } from './formatters';

describe('formatters', () => {
  describe('formatDate', () => {
    it('should return "غير محدد" for null input', () => {
      expect(formatDate(null)).toBe('غير محدد');
    });

    it('should return "غير محدد" for undefined input', () => {
      expect(formatDate(undefined)).toBe('غير محدد');
    });

    it('should return "غير محدد" for empty string', () => {
      expect(formatDate('')).toBe('غير محدد');
    });

    it('should format valid date string', () => {
      const result = formatDate('2024-01-15');
      expect(result).toMatch(/\d+\/\d+\/\d+/);
    });
  });

  describe('formatSalary', () => {
    it('should return "غير محدد" for null input', () => {
      expect(formatSalary(null)).toBe('غير محدد');
    });

    it('should return "غير محدد" for undefined input', () => {
      expect(formatSalary(undefined)).toBe('غير محدد');
    });

    it('should format valid salary number', () => {
      const result = formatSalary(5000);
      expect(result).toContain('ر.س');
    });

    it('should format decimal salary', () => {
      const result = formatSalary(5000.50);
      expect(result).toContain('ر.س');
    });
  });

  describe('formatNumber', () => {
    it('should return "غير محدد" for null input', () => {
      expect(formatNumber(null)).toBe('غير محدد');
    });

    it('should return "غير محدد" for undefined input', () => {
      expect(formatNumber(undefined)).toBe('غير محدد');
    });

    it('should format valid number', () => {
      const result = formatNumber(1000);
      expect(result).toMatch(/\d/);
    });

    it('should format large numbers with separators', () => {
      const result = formatNumber(1000000);
      expect(result).toContain('٠٠٠');
    });
  });

  describe('formatPercentage', () => {
    it('should return "غير محدد" for null input', () => {
      expect(formatPercentage(null)).toBe('غير محدد');
    });

    it('should return "غير محدد" for undefined input', () => {
      expect(formatPercentage(undefined)).toBe('غير محدد');
    });

    it('should format valid percentage', () => {
      const result = formatPercentage(50);
      expect(result).toContain('%');
    });

    it('should format zero percentage', () => {
      const result = formatPercentage(0);
      expect(result).toContain('%');
    });
  });

  describe('getStatusColor', () => {
    it('should return success color for active status', () => {
      expect(getStatusColor('active')).toBe('text-green-600 bg-green-100');
    });

    it('should return success color for completed status', () => {
      expect(getStatusColor('completed')).toBe('text-green-600 bg-green-100');
    });

    it('should return success color for paid status', () => {
      expect(getStatusColor('paid')).toBe('text-green-600 bg-green-100');
    });

    it('should return warning color for pending status', () => {
      expect(getStatusColor('pending')).toBe('text-amber-600 bg-amber-100');
    });

    it('should return warning color for soon-expire status', () => {
      expect(getStatusColor('soon-expire')).toBe('text-amber-600 bg-amber-100');
    });

    it('should return error color for expired status', () => {
      expect(getStatusColor('expired')).toBe('text-red-600 bg-red-100');
    });

    it('should return error color for cancelled status', () => {
      expect(getStatusColor('cancelled')).toBe('text-red-600 bg-red-100');
    });

    it('should return default color for unknown status', () => {
      expect(getStatusColor('unknown')).toBe('text-gray-600 bg-gray-100');
    });

    it('should handle case-insensitive status', () => {
      expect(getStatusColor('ACTIVE')).toBe('text-green-600 bg-green-100');
      expect(getStatusColor('Completed')).toBe('text-green-600 bg-green-100');
    });
  });
});
