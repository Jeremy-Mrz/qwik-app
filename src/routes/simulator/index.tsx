import { $, component$, useComputed$ } from "@builder.io/qwik";
import { useSignal } from "@builder.io/qwik";
import { kitchenSimulator } from "~/utils/stepForm";


//useTask exécuté une fois côté serveur, jamais côté client
//useVisibleTask, pas exécuté sur le serveur, toujours exécuté sur le client à partir du moment ou le component à afficher est visible sur le viewport


export default component$(() => {
  const step = useSignal(0); //useState
  const currentStep = useComputed$(() => kitchenSimulator[step.value]); //useMemo
  const answers = useSignal<number[]>([]);
  const select = $((index: number) => {
    answers.value = [...answers.value, index];
    step.value++;
  }); //useCallback
  return (
    <>
      <h1>Le meilleur des simulateurs</h1>
      <ol>
        {answers.value.map((answerIndex, i) => {
          const step = kitchenSimulator[i];
          const answer = step.options[answerIndex];
          return <li key={i}>{step.description}: {answer}</li>
        })}
      </ol>
      <p>{currentStep.value.description}</p>
      <menu>
        {currentStep.value.options.map((el, i) => {
          return <button onClick$={() => select(i)} key={i}>{el}</button>
        })}
      </menu>
    </>
  );
});