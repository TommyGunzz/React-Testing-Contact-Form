import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import App from "./App";

test("renders App without crashing", () => {
  render(<App />);
});

test("Filling out the form", async () => {
  const { getByLabelText, getByTestId, queryAllByTestId, queryByTestId } = render(<App />);

  const firstNameInput = getByLabelText(/first name/i);

  fireEvent.change(firstNameInput, {target: {value: "Tom"}});

  expect(firstNameInput.value).toBe("Tom");
  console.log("App.test.js: filling out the form test: firstNameInput value: ", firstNameInput.value);

  await waitFor(() => {
    fireEvent.blur(firstNameInput);
  });

  expect(queryAllByTestId("firstNameError")).toStrictEqual([]);

  const lastNameInput = getByLabelText(/last name/i);

  fireEvent.change(lastNameInput, {target: {value: "Harris"}});

  expect(lastNameInput.value).toBe("Harris");
  console.log("App.test.js: filling out the form test: lastNameInput value: ", lastNameInput.value);

  await waitFor(() => {
    fireEvent.blur(lastNameInput);
  });

  expect(queryAllByTestId("lastNameError")).toStrictEqual([]);

  const emailInput = getByLabelText(/Email/i);

  fireEvent.change(emailInput, {target: {value: "Tom_3rd_2000@yahoo.com"}});

  expect(emailInput.value).toBe("Tom_3rd_2000@yahoo.com");
  console.log("App.test.js: filling out the form test: emailInput value: ", emailInput.value);

  await waitFor(() => {
    fireEvent.blur(emailInput);
  });

  expect(queryAllByTestId("emailError")).toStrictEqual([]);

  const messageInput = getByLabelText(/message/i);

  fireEvent.change(messageInput, {target: {value: ""}});

  expect(messageInput.value).toBe("");
  console.log("App.test.js: filling out the form test: messageInput value: ", messageInput.value);

  await waitFor(() => {
    fireEvent.blur(messageInput);
  })
  

  await waitFor(() => {
    fireEvent.click(getByTestId("submitButton"));
    
  });

  await waitFor(() => {
    const datasubmitted = queryByTestId("datasubmitted");
    console.log("App.test.js: filling out the form: datasubmitted: ", datasubmitted.textContent);
  });  
});
