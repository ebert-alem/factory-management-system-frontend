import React, { useState } from 'react';
import { Stepper, Step, StepLabel, Button, Box, Typography } from '@mui/material';

interface Step {
    label: string;
    content: React.ReactNode;
    optional?: boolean;
}

interface Props {
    steps: Step[];
    finalStep: React.ReactNode;
}

export const CustomStepper = ({ steps, finalStep }: Props) => {
    const [activeStep, setActiveStep] = useState(0);

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleReset = () => {
        setActiveStep(0);
    };

    const handleSkip = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleSubmit = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        handleNext();
    };

    return (
        <>
            <Stepper activeStep={activeStep}>
                {steps.map((step, index) => (
                    <Step key={index}>
                        <StepLabel>
                            <Typography sx={{ display: { xs: 'none', sm: 'flex' } }}>{step.label}</Typography>
                            {step.optional && (<Typography sx={{ display: { xs: 'none', sm: 'flex' } }} variant="caption">Opcional</Typography>)}
                        </StepLabel>
                    </Step>
                ))}
            </Stepper>
            <div>
                {activeStep === steps.length ? (
                    <>
                        <Box paddingX={1} paddingY={3} height='auto' onReset={handleReset}>
                            {finalStep}
                        </Box>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Button disabled={activeStep === 0} variant='text' onClick={handleBack}>Atrás</Button>
                            <Button type='reset' variant='contained' form='final-step'>Nuevo producto</Button>
                        </Box>
                    </>
                ) : (
                    <>
                        <Box paddingX={1} paddingY={3} height='auto' onSubmit={handleSubmit} onReset={handleSkip}>
                            {steps[activeStep].content}
                        </Box>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Button disabled={activeStep === 0} variant='text' onClick={handleBack}>Atrás</Button>
                            <Box>
                                {steps[activeStep].optional && (
                                    <Button variant="text" type='reset' form={`step-${activeStep + 1}`}>Omitir</Button>
                                )}
                                {activeStep === steps.length - 1 ? (
                                    <Button variant="contained" type='submit' form={`step-${activeStep + 1}`}>Confirmar</Button>
                                ) : (
                                    <Button variant="text" type='submit' form={`step-${activeStep + 1}`}>Siguiente</Button>)}
                            </Box>
                        </Box>
                    </>
                )}
            </div>
        </>
    );
};