import { $, component$, useComputed$ } from "@builder.io/qwik";
import { useSignal } from "@builder.io/qwik";
import { steps, Option } from "~/utils/stepFormV4";
import styles from './simulator.module.css';

export default component$(() => {
  const currentStepIndex = useSignal(0);
  const currentStep = useComputed$(() => steps[currentStepIndex.value]);
  const answers = useSignal<Record<string, number>>({});

  const nextStep = $((option: Option, i: number) => {
    const nextStepIndex = option.next ?? currentStep.value.next;
    if (!nextStepIndex) return alert('Missing next step');
    const previousIndexexes = Object.keys(answers.value).filter((key) => key.startsWith(String(currentStepIndex.value)));
    const nextIndex = previousIndexexes.length ? `${currentStepIndex.value}-${previousIndexexes.length + 1}` : String(currentStepIndex.value);
    answers.value = { ...answers.value, [nextIndex]: i };
    currentStepIndex.value = Number(nextStepIndex);
  });

  return (
    <>
      <h1>Le meilleur des simulateurs</h1>
      <ol class={styles.ol}>
        {Object.entries(answers.value).map(([stepIndex, optionIdex]) => {
          const splittedStepIndex = stepIndex.split('-')[0];
          const step = steps[splittedStepIndex];
          const answer = step.options[optionIdex];
          return <li key={stepIndex}>{step.description}: {answer.label}</li>
        })}
      </ol>
      <p>{currentStep.value.description}</p>
      {(
        <menu class={styles.menu}>
          {currentStep?.value?.options.map((option, i) => {
            return (
              <button onClick$={() => nextStep(option, i)} key={option.key}>
                {option.label}
              </button>
            )
          })}
        </menu>
      )}
    </>
  );
});