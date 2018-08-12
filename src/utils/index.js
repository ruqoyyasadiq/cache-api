module.exports = {
  /**
   * Generates a random string.
   * @param {number} length Length of the random string
   * @return {string} Radom string of length supplied.
   */
  generateRandomData: (length = 16) => {
    return `${Math.random().toString(36).replace('0.', '')}`.repeat(2).substr(0, length)
  }
}
