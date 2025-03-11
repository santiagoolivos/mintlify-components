"use client";

import React, { ReactElement } from "react";
import { StepProps } from "./step";


type TitleSize = "p" | "h2" | "h3";

interface StepsProps {
  children: ReactElement<StepProps>[]; // a list of <Step />
  titleSize?: TitleSize;
}

/**
 * Renders a vertical list of Step components,
 * each with a connecting line (except last).
 */
export function Steps({
  children,
  titleSize = "p",
}: StepsProps) {
  // If children is not an array, convert to array
  const stepsArray = React.Children.toArray(children) as ReactElement<StepProps>[];

  return (
    <div role="list" className="ml-3.5 mt-10 mb-6">
      {stepsArray.map((child, index) => {
        const isLast = index === stepsArray.length - 1;

        // We clone each child <Step> to pass:
        //  - isLastStep
        //  - fallback for stepNumber if not provided
        //  - fallback for titleSize if not provided at the step level
        return React.cloneElement(child, {
          key: index,
          isLastStep: isLast,
          stepNumber: child.props.stepNumber ?? index + 1,
          titleSize: child.props.titleSize || titleSize,
        });
      })}
    </div>
  );
}

