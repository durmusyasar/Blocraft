import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BcOtpInput } from "./BcOtpInput";

describe("BcOtpInput", () => {
  it("renders with default props", () => {
    render(<BcOtpInput />);
    expect(screen.getByText("OTP")).toBeInTheDocument();
    expect(screen.getByRole("textbox")).toBeInTheDocument();
  });

  it("renders with custom label", () => {
    render(<BcOtpInput label="Doğrulama Kodu" />);
    expect(screen.getByText("Doğrulama Kodu")).toBeInTheDocument();
  });

  it("renders correct number of input boxes", () => {
    render(<BcOtpInput length={4} />);
    const inputs = screen.getAllByRole("textbox");
    expect(inputs).toHaveLength(4);
  });

  it("handles controlled value", () => {
    const handleChange = jest.fn();
    render(<BcOtpInput value="123" onChange={handleChange} />);
    const inputs = screen.getAllByRole("textbox");
    expect(inputs[0]).toHaveValue("1");
    expect(inputs[1]).toHaveValue("2");
    expect(inputs[2]).toHaveValue("3");
  });

  it("handles uncontrolled value", () => {
    render(<BcOtpInput defaultValue="123" />);
    const inputs = screen.getAllByRole("textbox");
    expect(inputs[0]).toHaveValue("1");
    expect(inputs[1]).toHaveValue("2");
    expect(inputs[2]).toHaveValue("3");
  });

  it("calls onChange when typing", async () => {
    const handleChange = jest.fn();
    render(<BcOtpInput onChange={handleChange} />);
    const inputs = screen.getAllByRole("textbox");
    
    await userEvent.type(inputs[0], "1");
    expect(handleChange).toHaveBeenCalledWith("1");
  });

  it("handles keyboard navigation", async () => {
    render(<BcOtpInput length={3} />);
    const inputs = screen.getAllByRole("textbox");
    
    // Type in first input
    await userEvent.type(inputs[0], "1");
    expect(screen.getByRole("textbox", { name: "OTP" })).toHaveFocus();
    
    // Type in second input
    await userEvent.type(inputs[1], "2");
    expect(screen.getByRole("textbox", { name: "OTP" })).toHaveFocus();
  });

  it("handles backspace navigation", async () => {
    render(<BcOtpInput defaultValue="123" />);
    const inputs = screen.getAllByRole("textbox");
    
    // Focus last input and press backspace
    inputs[2].focus();
    await userEvent.keyboard("{backspace}");
    expect(screen.getByRole("textbox", { name: "OTP" })).toHaveFocus();
  });

  it("handles paste functionality", async () => {
    const handleChange = jest.fn();
    render(<BcOtpInput onChange={handleChange} />);
    const inputs = screen.getAllByRole("textbox");
    
    // Mock clipboard data
    Object.assign(navigator, {
      clipboard: {
        readText: () => Promise.resolve("123456"),
      },
    });
    
    // Focus first input and paste
    inputs[0].focus();
    await userEvent.keyboard("{ctrl}v");
    
    await waitFor(() => {
      expect(handleChange).toHaveBeenCalledWith("123456");
    });
  });

  it("shows clear button when value exists", () => {
    render(<BcOtpInput defaultValue="123" showClearButton />);
    expect(screen.getByTitle("Temizle")).toBeInTheDocument();
  });

  it("hides clear button when no value", () => {
    render(<BcOtpInput showClearButton />);
    expect(screen.queryByTitle("Temizle")).not.toBeInTheDocument();
  });

  it("handles professional features", () => {
    const handleDebugLog = jest.fn();
    const handlePerformanceIssue = jest.fn();
    
    render(
      <BcOtpInput
        length={6}
        enableDebug={true}
        enableMetrics={true}
        onDebugLog={handleDebugLog}
        onPerformanceIssue={handlePerformanceIssue}
        enableBiometric={true}
        enableQRCode={true}
        enableSMS={true}
        phoneNumber="+1234567890"
        enableAnimations={true}
        inputShape="circle"
        inputSize="large"
        customTheme="dark"
        enableCustomColors={true}
        primaryColor="#ff6b6b"
      />
    );
    
    expect(screen.getByText("OTP")).toBeInTheDocument();
    expect(screen.getAllByRole("textbox")).toHaveLength(6);
  });

  it("handles enhanced accessibility", () => {
    render(
      <BcOtpInput
        length={6}
        enableHighContrast={true}
        enableReducedMotion={true}
        enableVoiceInput={true}
        enableScreenReaderAnnouncements={true}
      />
    );
    
    expect(screen.getByText("OTP")).toBeInTheDocument();
    expect(screen.getAllByRole("textbox")).toHaveLength(6);
  });

  it("handles customization features", () => {
    render(
      <BcOtpInput
        length={6}
        inputShape="hexagon"
        inputSize="xlarge"
        customTheme="high-contrast"
        enableGradient={true}
        enableGlow={true}
        enableShadow={true}
      />
    );
    
    expect(screen.getByText("OTP")).toBeInTheDocument();
    expect(screen.getAllByRole("textbox")).toHaveLength(6);
  });

  it("calls onClear when clear button is clicked", async () => {
    const handleClear = jest.fn();
    render(<BcOtpInput defaultValue="123" showClearButton onClear={handleClear} />);
    
    const clearButton = screen.getByTitle("Temizle");
    await userEvent.click(clearButton);
    expect(handleClear).toHaveBeenCalled();
  });

  it("shows status message", () => {
    render(
      <BcOtpInput
        status="error"
        statusMessage="Kod hatalı"
      />
    );
    expect(screen.getByText("Kod hatalı")).toBeInTheDocument();
  });

  it("shows helper text", () => {
    render(<BcOtpInput helperText="Telefonunuza gelen kodu girin" />);
    expect(screen.getByText("Telefonunuza gelen kodu girin")).toBeInTheDocument();
  });

  it("applies appearance styles", () => {
    render(<BcOtpInput appearance="premium" />);
    expect(screen.getByText("OTP")).toBeInTheDocument();
  });

  it("shows loading state", () => {
    render(<BcOtpInput loading />);
    expect(screen.getByRole("progressbar")).toBeInTheDocument();
  });

  it("disables inputs when disabled", () => {
    render(<BcOtpInput disabled />);
    const inputs = screen.getAllByRole("textbox");
    inputs.forEach(input => {
      expect(input).toBeDisabled();
    });
  });

  it("masks input when mask is true", () => {
    render(<BcOtpInput mask defaultValue="123" />);
    const inputs = screen.getAllByRole("textbox");
    inputs.forEach(input => {
      expect(input).toHaveAttribute("type", "password");
    });
  });

  it("uses number input type when specified", () => {
    render(<BcOtpInput inputType="number" />);
    const inputs = screen.getAllByRole("textbox");
    inputs.forEach(input => {
      expect(input).toHaveAttribute("type", "number");
    });
  });

  it("handles auto focus", () => {
    render(<BcOtpInput autoFocus />);
    const inputs = screen.getAllByRole("textbox");
    expect(inputs[0]).toHaveFocus();
  });

  it("handles responsive width", () => {
    render(<BcOtpInput responsiveWidth />);
    expect(screen.getByText("OTP")).toBeInTheDocument();
  });

  it("handles edge case: empty value", () => {
    const handleChange = jest.fn();
    render(<BcOtpInput onChange={handleChange} />);
    const inputs = screen.getAllByRole("textbox");
    
    // Try to type empty string
    fireEvent.change(inputs[0], { target: { value: "" } });
    expect(handleChange).toHaveBeenCalledWith("");
  });

  it("handles edge case: very long input", async () => {
    const handleChange = jest.fn();
    render(<BcOtpInput length={3} onChange={handleChange} />);
    const inputs = screen.getAllByRole("textbox");
    
    // Try to paste longer string than length
    Object.assign(navigator, {
      clipboard: {
        readText: () => Promise.resolve("123456789"),
      },
    });
    
    inputs[0].focus();
    await userEvent.keyboard("{ctrl}v");
    
    await waitFor(() => {
      expect(handleChange).toHaveBeenCalledWith("123");
    });
  });

  it("handles edge case: special characters", async () => {
    const handleChange = jest.fn();
    render(<BcOtpInput inputType="text" onChange={handleChange} />);
    const inputs = screen.getAllByRole("textbox");
    
    await userEvent.type(inputs[0], "a");
    expect(handleChange).toHaveBeenCalledWith("a");
  });

  it("handles edge case: number input with letters", async () => {
    const handleChange = jest.fn();
    render(<BcOtpInput inputType="number" onChange={handleChange} />);
    const inputs = screen.getAllByRole("textbox");
    
    // Try to type letter in number input
    await userEvent.type(inputs[0], "a");
    // Should not call onChange for invalid input
    expect(handleChange).not.toHaveBeenCalled();
  });
}); 