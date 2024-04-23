import React from "react";
import TextInput from "../../components/TextInput";
import { useForm } from "react-hook-form";

describe("TextInput component", () => {
  it("should render and handle input changes correctly", () => {
    const { control } = useForm({ defaultValues: { bla: "" } });
    // Mount the component directly
    cy.mount(<TextInput label="Bla Teste" name="bla" control={control} />);

    // Type into the input field
    const inputText = "Oi sou um teste";
    cy.get('input[name="bla"]').type(inputText);

    // Verify that the input field has the correct value
    cy.get('input[name="bla"]').should("have.value", inputText);

    // Add more assertions as needed, for example, check the label
    cy.get("label").should("have.text", "Bla Teste");
  });
});
