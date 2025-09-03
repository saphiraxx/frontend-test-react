// recommendation.service.js

const recommendationService = {
  getRecommendations: (formData, products) => {
    const {
      selectedPreferences = [],
      selectedFeatures = [],
      selectedRecommendationType,
    } = formData;

    if (!products || products.length === 0) return [];

    const ratedProducts = products.map((product) => {
      let score = 0;

      selectedPreferences.forEach((pref) => {
        if (product.preferences.includes(pref)) score++;
      });

      selectedFeatures.forEach((feat) => {
        if (product.features.includes(feat)) score++;
      });

      return { ...product, score};
    });

    if (selectedRecommendationType === 'SingleProduct') {
      let bestProduct = null;
      let maxScore = 1; 

      ratedProducts.forEach((product) => {
        if (product.score > maxScore) {
          maxScore = product.score;
          bestProduct = product;
        } else if (product.score === maxScore) {
          bestProduct = product;
        }
      });

      return bestProduct ? [bestProduct] : [];
    }

    if (selectedRecommendationType === 'MultipleProducts') {
      return ratedProducts
        .filter((p) => p.score > 0)
        .sort((a, b) => b.score - a.score);
    }
  },
};

export default recommendationService;
