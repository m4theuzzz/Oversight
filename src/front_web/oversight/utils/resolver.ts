import { appendErrors, FieldError } from "react-hook-form";
import type { ValidationError } from "joi";
import Joi from "joi";

const parseErrorSchema = (
  error: ValidationError,
  validateAllFieldCriteria: boolean
) => {
  console.log("%cERROS DO FORM", "color: red", error.details);

  return error.details.length
    ? error.details.reduce<Record<string, FieldError>>((previous, error) => {
        const _path = error.path.join(".");

        if (!previous[_path]) {
          previous[_path] = { message: error.message, type: error.type };
        }

        if (validateAllFieldCriteria) {
          const types = previous[_path].types;
          const messages = types && types[error.type!];

          previous[_path] = appendErrors(
            _path,
            validateAllFieldCriteria,
            previous,
            error.type,
            messages
              ? ([] as string[]).concat(messages as string[], error.message)
              : error.message
          ) as FieldError;
        }

        return previous;
      }, {})
    : {};
};
export const joiResolver: any =
  (
    schema: Joi.PartialSchemaMap,
    schemaOptions = {
      abortEarly: false,
    }
  ) =>
  async (values, context, options) => {
    const _schemaOptions = Object.assign({}, schemaOptions, {
      context,
    });

    const schemaToValidate = Joi.object(schema).messages({
      "number.base": `Este campo é obrigatório`,
      "string.base": `Este campo é obrigatório`,
      "string.empty": `Este campo é obrigatório`,
      "any.required": `Este campo é obrigatório`,
      "string.max": `Este campo deve ter um máximo de {#limit} caracteres`,
      "string.min": `Este campo deve ter um mínimo de {#limit} caracteres`,
      "number.max": `Este campo deve ter um valor máximo de {#limit}`,
      "number.greater": `Este campo deve ter um valor maior que {#limit}`,
      "number.integer": `Este campo deve conter um número inteiro`,
      "date.base": `Este campo é obrigatório`,
      "string.email": `Email inválido`,
      "string.length": `Este campo deve ter {#limit} caracteres`,
      "any.invalid": "Este valor não é válido",
      "any.only": "Valor inválido",
    });

    console.log("%cVALORES ENVIADOS", "color: green", values);

    let result: Record<string, any> = {};
    if (true) {
      result = schemaToValidate.validate(values, {
        ..._schemaOptions,
        abortEarly: false,
        allowUnknown: true,
      });
    } else {
      try {
        result.value = await schemaToValidate.validateAsync(values, {
          ..._schemaOptions,
          abortEarly: false,
          allowUnknown: true,
        });
      } catch (e) {
        result.error = e;
      }
    }

    if (result.error) {
      // toast.error('Preencha corretamente os dados do formulário')

      return {
        values: {},
        errors: parseErrorSchema(
          result.error,
          !options.shouldUseNativeValidation && options.criteriaMode === "all"
        ),
      };
    }

 

    return {
      errors: {},
      values: result.value,
    };
  };
