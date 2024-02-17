import { useState } from "react";
import { RecordStep } from "./RecordStep";
import { ReviewStep } from "./ReviewStep";
import { PublishStep } from "./PublishStep";
import { SuccessStep } from "./SuccessStep";
import { CreateScreenStep } from "../../type";

export const CreateContentScreen = () => {
  const [step, setStep] = useState(CreateScreenStep.Record);
  const [videoUri, setVideoUri] = useState("");

  if (step === CreateScreenStep.Record) {
    return <RecordStep setStep={setStep} setVideoUri={setVideoUri} />;
  } else if (step === CreateScreenStep.Review) {
    return (
      <ReviewStep
        videoUri={videoUri}
        setStep={setStep}
        setVideoUri={setVideoUri}
      />
    );
  } else if (step === CreateScreenStep.Publish) {
    return <PublishStep setStep={setStep} videoUri={videoUri} />;
  }

  return <SuccessStep setStep={setStep} setVideoUri={setVideoUri} />;
};
