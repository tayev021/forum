import {
  useReducer,
  type ChangeEvent,
  type FocusEvent,
  type FormEvent,
} from 'react';

type Validate = (value: string) => string;

type State = Record<
  string,
  {
    value: string;
    error: string;
    validate?: Validate;
  }
>;

type Action =
  | {
      type: 'register';
      payload: {
        inputName: string;
        defaultValue?: string;
        validate?: Validate;
      };
    }
  | { type: 'change'; payload: { inputName: string; value: string } }
  | { type: 'error'; payload: { inputName: string; error: string } }
  | { type: 'reset' };

interface Options {
  defaultValue?: string;
  validate?: (value: string, getValue?: (input: string) => string) => string;
}

const initialState: State = {};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'register':
      return {
        ...state,
        [action.payload.inputName]: {
          value: action.payload.defaultValue || '',
          error: '',
          validate: action.payload.validate,
        },
      };
    case 'change':
      return {
        ...state,
        [action.payload.inputName]: {
          ...state[action.payload.inputName],
          value: action.payload.value,
          error: '',
        },
      };
    case 'error':
      return {
        ...state,
        [action.payload.inputName]: {
          ...state[action.payload.inputName],
          error: action.payload.error,
        },
      };
    case 'reset':
      return Object.entries(state)
        .map(([inputName, input]) => {
          return [inputName, { ...input, value: '', error: '' }] as const;
        })
        .reduce((acc: State, [inputName, input]) => {
          acc[inputName] = input;
          return acc;
        }, {});
    default:
      return state;
  }
}

export function useForm() {
  const [state, dispatch] = useReducer(reducer, initialState);

  function register(inputName: string, options: Options = {}) {
    if (!state[inputName]) {
      dispatch({
        type: 'register',
        payload: {
          inputName,
          defaultValue: options.defaultValue,
          validate: options.validate || (() => ''),
        },
      });
    }

    function onChange(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
      dispatch({
        type: 'change',
        payload: { inputName, value: e.target.value },
      });
    }

    function onBlur(_e: FocusEvent<HTMLInputElement | HTMLTextAreaElement>) {
      if (state[inputName].validate) {
        const error = state[inputName].validate(state[inputName].value);

        if (error) {
          dispatch({
            type: 'error',
            payload: { inputName, error },
          });
        }
      }
    }

    return { onChange, onBlur };
  }

  function getValues() {
    const values: Record<string, string> = {};

    for (const input in state) {
      values[input] = state[input].value;
    }

    return values;
  }

  function getErrors() {
    const errors: Record<string, string> = {};

    for (const input in state) {
      errors[input] = state[input].error;
    }

    return errors;
  }

  function setError(inputName: string, error: string) {
    if (state[inputName]) {
      dispatch({
        type: 'error',
        payload: { inputName, error },
      });
    }
  }

  function handleSubmit(submit: (formData: any) => void) {
    return function (e: FormEvent) {
      e.preventDefault();

      let hasErrors = false;

      for (const input in state) {
        if (state[input].validate) {
          const error = state[input].validate(state[input].value);

          if (error) {
            hasErrors = true;
            dispatch({
              type: 'error',
              payload: { inputName: input, error },
            });
          }
        }
      }

      for (const input in state) {
        if (state[input].error) {
          hasErrors = true;
        }
      }

      if (!hasErrors) submit(getValues());
    };
  }

  function reset() {
    dispatch({ type: 'reset' });
  }

  return { register, getValues, getErrors, setError, handleSubmit, reset };
}
