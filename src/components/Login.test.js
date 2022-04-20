import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Login from "./Login";

jest.mock("axios", () => ({
   __esModule: true,

   default: {
      get: () => ({
         data: { id: 1, name: "Tester" },
      }),
   },
}));

test("Username input should be rendered", () => {
   render(<Login />);
   const usernameInput = screen.getByPlaceholderText(/username/i);
   expect(usernameInput).toBeInTheDocument();
});

test("Password input should be rendered", () => {
   render(<Login />);
   const passwordInput = screen.getByPlaceholderText(/password/i);
   expect(passwordInput).toBeInTheDocument();
});

test("Button Login should be rendered", () => {
   render(<Login />);
   const buttonEl = screen.getByRole("button");
   expect(buttonEl).toBeInTheDocument();
});

test("Username field should be empty", () => {
   render(<Login />);
   const usernameInput = screen.getByPlaceholderText(/username/i);
   expect(usernameInput.value).toBe("");
});

test("Password field should be empty", () => {
   render(<Login />);
   const passwordInput = screen.getByPlaceholderText(/password/i);
   expect(passwordInput.value).toBe("");
});

test("Button Login should be disabled", () => {
   render(<Login />);
   const buttonEl = screen.getByRole("button");
   expect(buttonEl).toBeDisabled();
});

test("Error message should be hidden", () => {
   render(<Login />);
   const spanEl = screen.getByTestId("error-msg");
   expect(spanEl).not.toBeVisible();
});

test("Username field should change", () => {
   render(<Login />);
   const usernameInput = screen.getByPlaceholderText(/username/i);
   const testValue = "test";
   fireEvent.change(usernameInput, { target: { value: testValue } });

   expect(usernameInput.value).toBe("test");
});

test("Password field should change", () => {
   render(<Login />);
   const passwordInput = screen.getByPlaceholderText(/password/i);
   const testValue = "test";
   fireEvent.change(passwordInput, { target: { value: testValue } });

   expect(passwordInput.value).toBe("test");
});

test("Button Login should not be disabled when input exist", () => {
   render(<Login />);
   const buttonEl = screen.getByRole("button");
   const passwordInput = screen.getByPlaceholderText(/password/i);
   const usernameInput = screen.getByPlaceholderText(/username/i);
   const testValue = "test";

   fireEvent.change(usernameInput, { target: { value: testValue } });
   fireEvent.change(passwordInput, { target: { value: testValue } });

   expect(buttonEl).not.toBeDisabled();
});

test("Loading should not be rendered", () => {
   render(<Login />);
   const loading = screen.getByRole("button");
   expect(loading).not.toHaveTextContent(/please wait/i);
});

test("Loading should be rendered when button clicking", () => {
   render(<Login />);
   const buttonEl = screen.getByRole("button");
   const passwordInput = screen.getByPlaceholderText(/password/i);
   const usernameInput = screen.getByPlaceholderText(/username/i);
   const testValue = "test";

   fireEvent.change(usernameInput, { target: { value: testValue } });
   fireEvent.change(passwordInput, { target: { value: testValue } });
   fireEvent.click(buttonEl);

   expect(buttonEl).toHaveTextContent(/please wait/i);
});

test("Loading should not be rendered after fetching data", async () => {
   render(<Login />);
   const buttonEl = screen.getByRole("button");
   const passwordInput = screen.getByPlaceholderText(/password/i);
   const usernameInput = screen.getByPlaceholderText(/username/i);
   const testValue = "test";

   fireEvent.change(usernameInput, { target: { value: testValue } });
   fireEvent.change(passwordInput, { target: { value: testValue } });
   fireEvent.click(buttonEl);

   const userItem = await screen.findByText("Tester");

   expect(userItem).toBeInTheDocument()
});
