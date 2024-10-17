import React from 'react';
import Lottie from 'lottie-react';
import cookingAnimation from './Cooking.json.json'; // Adjust the path as necessary

const CookingAnimation = () => {
    return (
        <div style={{ width: '300px', height: '300px' }}> {/* Adjust size as needed */}
            <Lottie animationData={cookingAnimation} loop={true} />
        </div>
    );
};

export default CookingAnimation;