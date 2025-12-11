import { $, component$, useComputed$ } from "@builder.io/qwik";
import { useSignal } from "@builder.io/qwik";
import { steps, Option } from "~/utils/stepFormV4";
import styles from './simulator.module.css';

export default component$(() => {
  const currentStepIndex = useSignal(0);
  const currentStep = useComputed$(() => steps[currentStepIndex.value]);
  const currentQuoteIndex = useSignal(0);
  const quotes = useSignal<Record<string, number>[]>([]);

  const nextStep = $((option: Option, i: number) => {
    const nextStepIndex = option.next ?? currentStep.value.next;
    if (option.key === 'more') {
      currentQuoteIndex.value++;
    } else {
      if (!quotes.value.length || !quotes.value[currentQuoteIndex.value]) quotes.value = [...quotes.value, {}];
      if (!nextStepIndex) return alert('Missing next step');
      const previousIndexes = Object.keys(quotes.value[currentQuoteIndex.value]).filter((key) => key.startsWith(String(currentStepIndex.value)));
      const nextIndex = previousIndexes.length ? `${currentStepIndex.value}-${previousIndexes.length + 1}` : String(currentStepIndex.value);
      quotes.value[currentQuoteIndex.value] = { ...quotes.value[currentQuoteIndex.value], [nextIndex]: i };
    }
    currentStepIndex.value = Number(nextStepIndex);
  });

  return (
    <>
      <h1>Le meilleur des simulateurs</h1>
      <section class={styles.section}>
        {quotes.value.map((quote) => {
          return (
            <article>
              <ol class={styles.ol}>
                {Object.entries(quote).map(([stepIndex, optionIdex]) => {
                  const splittedStepIndex = stepIndex.split('-')[0];
                  const step = steps[splittedStepIndex];
                  const answer = step.options[optionIdex];
                  return <li key={stepIndex}>{step.description}: {answer.label}</li>
                })}
              </ol>
            </article>
          )
        })
        }
      </section>
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