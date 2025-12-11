import { $, component$, useComputed$ } from "@builder.io/qwik";
import { useSignal } from "@builder.io/qwik";
import { steps, Option } from "~/utils/stepFormV4";
import styles from './simulator.module.css';

export default component$(() => {
  const currentStepIndex = useSignal(0);
  const currentStep = useComputed$(() => steps[currentStepIndex.value]);
  const currentQuoteIndex = useSignal(0);
  const quotes = useSignal<Record<string, number>[]>([]);
  const quotesTitles = useSignal<Record<string, string>>({});

  const nextStep = $((option: Option, i: number) => {
    const nextStepIndex = option.next ?? currentStep.value.next;
    if (option.key === 'more') {
      currentQuoteIndex.value++;
    } else {
      if (!nextStepIndex) return alert('Missing next step');
      const previousIndexes = Object.keys(quotes.value[currentQuoteIndex.value]).filter((key) => key.startsWith(String(currentStepIndex.value)));
      const nextIndex = previousIndexes.length ? `${currentStepIndex.value}-${previousIndexes.length + 1}` : String(currentStepIndex.value);
      quotes.value[currentQuoteIndex.value] = { ...quotes.value[currentQuoteIndex.value], [nextIndex]: i };
    }
    currentStepIndex.value = Number(nextStepIndex);
  });

  return (
    <>
      <div class={styles['main-layout']}>
        <aside>
          <h3>Simulateur de devis V4</h3>
          <ol class={styles['simulation-list']}>
            {Object.entries(quotesTitles.value).map(([quoteIndex, title]) => {
              return (
                <li key={quoteIndex}>{title}
                  <button onClick$={() => {
                    currentQuoteIndex.value = Number(quoteIndex);
                    const currentQuote = quotes.value[Number(quoteIndex)];
                    const keyValues = Object.entries(currentQuote).at(-1);
                    if (!keyValues) return currentStepIndex.value = 0;
                    const [stepIndex, answerIndex] = keyValues;
                    const nextStep = steps[stepIndex].options[answerIndex].next ?? steps[stepIndex].next;
                    currentStepIndex.value = Number(nextStep);
                  }}>edit</button>
                </li>)

            })}
          </ol>
        </aside>
        <div class={styles['center-container']}>
          <h1>Le meilleur des simulateurs</h1>
          <section class={styles['selected-simulation']}>
            {quotes.value[currentQuoteIndex.value] && (
              <article>
                <h3>{quotesTitles.value[currentQuoteIndex.value]}</h3>
                <ol class={styles.ol}>
                  {Object.entries(quotes.value[currentQuoteIndex.value]).map(([stepIndex, optionIdex]) => {
                    const splittedStepIndex = stepIndex.split('-')[0];
                    const step = steps[splittedStepIndex];
                    const answer = step.options[optionIdex];
                    return <li key={stepIndex}>{step.description}: {answer.label}</li>
                  })}
                </ol>
              </article>
            )
            }
          </section>
          {
            !!quotesTitles.value[currentQuoteIndex.value]
              ? (
                <>
                  <p>{currentStep.value.description}</p>
                  {(
                    <menu class={styles.menu}>
                      {currentStep.value.options.map((option, i) => {
                        return (
                          <button onClick$={() => nextStep(option, i)} key={option.key}>
                            {option.label}
                          </button>
                        )
                      })}
                    </menu>
                  )}
                </>
              ) :
              (
                <>
                  <form preventdefault:submit onsubmit$={(_, form) => {
                    const formData = new FormData(form);
                    const title = formData.get('title');
                    quotesTitles.value = { ...quotesTitles.value, [currentQuoteIndex.value]: title };
                    quotes.value = [...quotes.value, {}];
                  }}>
                    <div class={styles['input-container']}>
                      <input type="text" minLength={3} maxLength={30} name="title" id="title" placeholder="Titre de votre estimation" />
                      <button type="submit">Commencer</button>
                    </div>
                  </form>
                </>
              )
          }
        </div>
      </div>
    </>
  );
});