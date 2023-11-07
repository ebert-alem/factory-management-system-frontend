import React, { useState } from 'react';
import { StepperContext } from './StepperContext';

export const StepperProvider = ({ children }: { children: React.ReactNode }) => {
    const [productData, setProductData] = useState({
        name: '',
        description: '',
        color: '',
        size: '',
        price: '',
        stock: '',
        imageUrl: '',
    });

    const [selectedMaterials, setSelectedMaterials] = useState<any[]>([{ id: '', name: '' }]);
    const [quantity, setQuantity] = useState(['']);

    const value = {
        productData,
        setProductData,
        selectedMaterials,
        setSelectedMaterials,
        quantity,
        setQuantity,
    };

    return (
        <StepperContext.Provider value={value} >
            {children}
        </ StepperContext.Provider>
    );
};