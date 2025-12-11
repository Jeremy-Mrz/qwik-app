import { $, component$, useComputed$ } from "@builder.io/qwik";
import { useSignal } from "@builder.io/qwik";
import { FormField, Option, steps } from "~/utils/stepForm";

export default component$(() => {
  const currentStepIndex = useSignal(0);
  const currentStep = useComputed$(() => steps[currentStepIndex.value]);
  const answers = useSignal<number[]>([]);
  const userInputs = useSignal<Record<number, FormField[]>>({});

  const nextStep = $((option: Option, i: number) => {
    const nextStepIndex = option.next ?? currentStep.value.next;
    if (!nextStepIndex) return alert('Missing link between steps');
    answers.value = [...answers.value, i];
    currentStepIndex.value = nextStepIndex;
  });

  const submitForm = $((form: HTMLFormElement) => {
    if (currentStep.value.type === 'form' && 'fields' in currentStep.value) {
      const formData = new FormData(form);
      const formObj = Object.fromEntries(formData);
      const fields = structuredClone(currentStep.value.fields);
      for (const field of fields) {
        field.value = Number(formObj[field.key]);
      }
      userInputs.value[currentStepIndex.value] = fields;
      answers.value = [...answers.value, 0];
      const nextStepIndex = currentStep.value.next;
      if (!nextStepIndex) return alert('Missing link between steps');
      currentStepIndex.value = nextStepIndex;
    }
  });

  return (
    <>
      <h1>Le meilleur des simulateurs</h1>
      <ol>
        {answers.value.map((answerIndex, i) => {
          console.log(i);
          const step = steps[i];
          if (step.type === 'choice' && 'options' in step) {
            const answer = step.options[answerIndex];
            return <li key={i}>{step.description}: {answer.label}</li>
          } else if (step.type === 'form' && 'fields' in step) {
            let answerString = '';
            const answers = userInputs.value[i];
            for (const answer of answers) {
              answerString += `${answer.label}: ${answer.value} `
            }
            return <li key={i}>{step.description} {answerString}</li>
          }
        })}
      </ol>
      <p>{currentStep.value.description}</p>
      {
        currentStep.value.type === 'choice'
          ? 'options' in currentStep.value && (
            <menu>
              {currentStep.value.options.map((option, i) => {
                return <button onClick$={() => nextStep(option, i)} key={option.key}>{option.label}</button>
              })}
            </menu>
          )
          : 'fields' in currentStep.value && (
            <form preventdefault:submit onsubmit$={(_, form) => submitForm(form)}>
              {currentStep.value.fields.map((field, i) => {
                return (
                  <>
                    <label for={field.key}>{field.label}</label>
                    <input name={field.key} type={field.type} min={field.min} max={field.max} />
                  </>
                )
              })}
              <button type="submit">Valider</button>
            </form>
          )
      }
    </>
  );
});