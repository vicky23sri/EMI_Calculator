// src/utils/sessionUtils.js

/**
 * Get extracted loan data from sessionStorage
 * @returns {Object|null} Loan data or null if not found
 */
export const getExtractedLoanData = () => {
  try {
    const data = sessionStorage.getItem('extractedLoanData');
    if (data) {
      const parsedData = JSON.parse(data);
      console.log('📖 Retrieved from sessionStorage:', parsedData);
      return parsedData;
    }
    return null;
  } catch (error) {
    console.error('❌ Error retrieving loan data from sessionStorage:', error);
    return null;
  }
};

/**
 * Clear extracted loan data from sessionStorage
 */
export const clearExtractedLoanData = () => {
  try {
    sessionStorage.removeItem('extractedLoanData');
    console.log('🗑️ Cleared loan data from sessionStorage');
  } catch (error) {
    console.error('❌ Error clearing loan data from sessionStorage:', error);
  }
};

/**
 * Check if extracted loan data exists in sessionStorage
 * @returns {boolean}
 */
export const hasExtractedLoanData = () => {
  try {
    return sessionStorage.getItem('extractedLoanData') !== null;
  } catch (error) {
    console.error('❌ Error checking loan data in sessionStorage:', error);
    return false;
  }
};