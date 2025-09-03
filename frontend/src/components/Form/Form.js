// Form.js

import React, {useState} from 'react';
import { Preferences, Features, RecommendationType } from './Fields';
import { SubmitButton } from './SubmitButton';
import useProducts from '../../hooks/useProducts';
import useForm from '../../hooks/useForm';
import useRecommendations from '../../hooks/useRecommendations';
import Popup from "./Popup";

function Form({ setRecommendations }) {
  const [popupMessage, setPopupMessage] = useState("");
  const { preferences, features, products } = useProducts();
  const { formData, handleChange } = useForm({
    selectedPreferences: [],
    selectedFeatures: [],
    selectedRecommendationType: '',
  });

  const { getRecommendations } = useRecommendations(products);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      formData.selectedPreferences.length === 0 ||
      formData.selectedFeatures.length === 0 ||
      formData.selectedRecommendationType === ''
    ) {
      setPopupMessage("Por favor, selecione pelo menos uma opção de cada categoria.");
      return;
    }

    const dataRecommendations = getRecommendations(formData);
    setRecommendations(dataRecommendations);
  };

  return (
    <div>
    <form
      className="max-w-md mx-auto p-4 bg-white rounded-lg shadow-md"
      onSubmit={handleSubmit}
    >
      <Preferences
        preferences={preferences}
        onPreferenceChange={(selected) =>
          handleChange('selectedPreferences', selected)
        }
      />
      <Features
        features={features}
        onFeatureChange={(selected) =>
          handleChange('selectedFeatures', selected)
        }
      />
      <RecommendationType
        onRecommendationTypeChange={(selected) =>
          handleChange('selectedRecommendationType', selected)
        }
      />
      <SubmitButton text="Obter recomendação" />
    </form>
    <Popup message={popupMessage} onClose={() => setPopupMessage("")} />
    </div>
  );
}

export default Form;
