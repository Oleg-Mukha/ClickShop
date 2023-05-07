import React from 'react';
import RoundedPriceContext from './RoundedPriceContext';

const RoundedPriceProvider = ({ children, product }) => {
    const roundedPrice = Math.round((product.price * (100 - product.discountPercentage)) / 100)

    return (
        <RoundedPriceContext.Provider value={{ roundedPrice }}>
            {children}
        </RoundedPriceContext.Provider>
    );
};

export default RoundedPriceProvider;