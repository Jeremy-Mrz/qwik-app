import { $, component$, useComputed$ } from "@builder.io/qwik";
import { useSignal } from "@builder.io/qwik";
import { steps } from "~/utils/stepFormV3";

export default component$(() => {
  const currentStepIndex = useSignal(0);
  const currentStep = useComputed$(() => steps[currentStepIndex.value]);
  const stepsLink = useSignal<number[]>([]);
  const answers = useSignal<Record<string, number>>({});

  const nextStep = $((optionNextIndexes: number[] | undefined, i: number) => {
    const nextStepIndexes = optionNextIndexes ?? currentStep.value.next;
    if (!nextStepIndexes?.length && !stepsLink.value.length) return alert('Missing next step');
    const existingIndexes = Object.keys(answers.value).filter((key) => {
      return key.startsWith(currentStepIndex.value.toString())
    });
    const answerIndex = existingIndexes.length
      ? `${currentStepIndex.value}-${existingIndexes.length + 1}`
      : currentStepIndex.value;
    answers.value = { ...answers.value, [answerIndex]: i };
    if (nextStepIndexes && nextStepIndexes?.length > 1) {
      stepsLink.value = [...nextStepIndexes, ...stepsLink.value];
    }
    if (stepsLink.value.length) {
      currentStepIndex.value = stepsLink.value[0];
      stepsLink.value = [...stepsLink.value.slice(1)];
    } else if (nextStepIndexes) {
      currentStepIndex.value = nextStepIndexes[0];
    }
  });

  return (
    <>
      <h1>Le meilleur des simulateurs</h1>
      <ol>
        {Object.entries(answers.value).map(([stepIndex, optionIdex]) => {
          const step = steps[stepIndex[0]];
          const answer = step.options[optionIdex];
          return <li key={stepIndex}>{step.description}: {answer.label}</li>
        })}
      </ol>
      <p>{currentStep.value.description}</p>
      {(
        <menu>
          {currentStep.value.options.map((option, i) => {
            return <button onClick$={() => nextStep(option.next, i)} key={option.key}>{option.label}</button>
          })}
        </menu>
      )}
    </>
  );
});