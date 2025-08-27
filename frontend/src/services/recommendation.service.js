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
        if (product.preferences.includes(pref)) {
          score++;
        }
      });

      selectedFeatures.forEach((feat) => {
        if (product.features.includes(feat)) {
          score++;
        }
      });

      return { ...product, score };
    });

    const rankedProducts = ratedProducts.sort((a, b) => {
      if (a.score === b.score) {
        return a.id - b.id;
      }
      return b.score - a.score;
    });

    if (selectedRecommendationType === 'SingleProduct') {
      return rankedProducts.length > 0 ? [rankedProducts[0]] : [];
    }

    if (selectedRecommendationType === 'MultipleProducts') {
      return rankedProducts.filter((p) => p.score > 0);
    }

    return rankedProducts;
  },
};

export default recommendationService;
