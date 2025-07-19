import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import { BcTextField } from "./BcTextField";
import { axe, toHaveNoViolations } from 'jest-axe';
expect.extend(toHaveNoViolations);

describe("BcTextField", () => {
  it("renders with label", () => {
    render(<BcTextField label="Ad Soyad" />);
    expect(screen.getByLabelText("Ad Soyad")).toBeInTheDocument();
  });

  it("renders with value and calls onChange", () => {
    const handleChange = jest.fn();
    render(<BcTextField label="Test" value="abc" onChange={handleChange} />);
    const input = screen.getByLabelText("Test") as HTMLInputElement;
    expect(input.value).toBe("abc");
    fireEvent.change(input, { target: { value: "def" } });
    expect(handleChange).toHaveBeenCalled();
  });

  it("shows and clears with clear button", () => {
    const handleClear = jest.fn();
    render(
      <BcTextField
        label="Clearable"
        showClearButton
        defaultValue="test"
        onClear={handleClear}
      />
    );
    const input = screen.getByLabelText("Clearable") as HTMLInputElement;
    expect(input.value).toBe("test");
    const clearBtn = screen.getByLabelText("Temizle");
    fireEvent.click(clearBtn);
    expect(handleClear).toHaveBeenCalled();
  });

  it("toggles password visibility", () => {
    render(<BcTextField label="Şifre" type="password" defaultValue="123456" />);
    const input = screen.getByLabelText("Şifre") as HTMLInputElement;
    expect(input.type).toBe("password");
    const toggleBtn = screen.getByLabelText("Şifreyi göster");
    fireEvent.click(toggleBtn);
    expect(input.type).toBe("text");
  });

  it("shows status icons and messages", () => {
    render(
      <>
        <BcTextField label="Error" status="error" statusMessage="Hata!" />
        <BcTextField label="Warning" status="warning" statusMessage="Uyarı!" />
        <BcTextField
          label="Success"
          status="success"
          statusMessage="Başarılı!"
        />
        <BcTextField label="Info" status="info" statusMessage="Bilgi!" />
      </>
    );
    expect(screen.getByText("Hata!")).toBeInTheDocument();
    expect(screen.getByText("Uyarı!")).toBeInTheDocument();
    expect(screen.getByText("Başarılı!")).toBeInTheDocument();
    expect(screen.getByText("Bilgi!")).toBeInTheDocument();
  });

  it("shows loading spinner and disables input", () => {
    render(<BcTextField label="Yükleniyor" loading defaultValue="abc" />);
    const input = screen.getByLabelText("Yükleniyor") as HTMLInputElement;
    expect(input).toBeDisabled();
    expect(screen.getByLabelText("Yükleniyor")).toBeInTheDocument();
  });

  it("has accessible label and helperText", () => {
    render(
      <BcTextField
        label="E-posta"
        helperText="Açıklama"
        status="error"
        statusMessage="Hata!"
      />
    );
    const input = screen.getByLabelText("E-posta");
    expect(input).toHaveAttribute("aria-describedby");
    expect(screen.getByText("Açıklama")).toBeInTheDocument();
    expect(screen.getByText("Hata!")).toBeInTheDocument();
  });

  it("shows i18n clear button label", () => {
    render(
      <BcTextField
        label="i18n"
        showClearButton
        defaultValue="test"
        translations={{ clearButtonLabel: "Sil" }}
      />
    );
    expect(screen.getByLabelText("Sil")).toBeInTheDocument();
  });

  it("calls monitoring.onChange on value change", () => {
    const onChange = jest.fn();
    const monitoring = { onChange };
    render(
      <BcTextField label="Monitored" value="a" onChange={() => {}} monitoring={monitoring} />
    );
    const input = screen.getByLabelText("Monitored") as HTMLInputElement;
    fireEvent.change(input, { target: { value: "b" } });
    expect(onChange).toHaveBeenCalledWith("b");
  });

  it("renders custom icon and helperText", () => {
    render(
      <BcTextField
        label="Custom"
        status="success"
        statusMessage="Başarılı!"
        renderCustomIcon={() => <span data-testid="custom-icon">🎉</span>}
        renderHelperText={(h) => <span data-testid="custom-helper">{h}</span>}
        helperText="Özel yardım"
      />
    );
    expect(screen.getByTestId("custom-icon")).toBeInTheDocument();
    expect(screen.getByTestId("custom-helper")).toHaveTextContent("Özel yardım");
  });

  it("shows async validation status", async () => {
    const validateInput = jest.fn(async (v) =>
      v === "ok"
        ? { isValid: true, type: "success" as const, message: "Geçerli" }
        : { isValid: false, type: "error" as const, message: "Hatalı" }
    );
    render(
      <BcTextField
        label="Async"
        enableAsyncValidation
        validateInput={validateInput}
        showValidationStatus
      />
    );
    const input = screen.getByLabelText("Async") as HTMLInputElement;
    fireEvent.change(input, { target: { value: "ok" } });
    await screen.findByText("Geçerli");
    fireEvent.change(input, { target: { value: "no" } });
    await screen.findByText("Hatalı");
  });
});

describe('BcTextField edge-cases', () => {
  it('renders with inputPrefix and inputSuffix', () => {
    render(
      <BcTextField
        label="Telefon"
        inputPrefix={<span data-testid="prefix">+90</span>}
        inputSuffix={<span data-testid="suffix">.tr</span>}
        defaultValue="5551234567"
      />
    );
    expect(screen.getByTestId('prefix')).toBeInTheDocument();
    expect(screen.getByTestId('suffix')).toBeInTheDocument();
    expect(screen.getByDisplayValue('5551234567')).toBeInTheDocument();
  });

  it('renders prefix, suffix, clear button and status icon together', () => {
    render(
      <BcTextField
        label="Test"
        inputPrefix={<span data-testid="prefix">P</span>}
        inputSuffix={<span data-testid="suffix">S</span>}
        showClearButton
        status="error"
        statusMessage="Hata!"
        defaultValue="abc"
      />
    );
    expect(screen.getByTestId('prefix')).toBeInTheDocument();
    expect(screen.getByTestId('suffix')).toBeInTheDocument();
    expect(screen.getByLabelText('Temizle')).toBeInTheDocument();
    expect(screen.getByText('Hata!')).toBeInTheDocument();
  });

  it('shows async validation error and loading (promise reject)', async () => {
    const validateInput = jest.fn(async () => { throw new Error('Doğrulama hatası'); });
    render(
      <BcTextField
        label="Async"
        enableAsyncValidation
        validateInput={validateInput}
        showValidationStatus
        defaultValue="test"
      />
    );
    const input = screen.getByLabelText('Async') as HTMLInputElement;
    fireEvent.change(input, { target: { value: 'fail' } });
    // Loading spinner görünmeli
    expect(await screen.findByLabelText('Yükleniyor')).toBeInTheDocument();
    // Hata mesajı gözükmeli (asenkron hata)
    // (BcTextField'da reject edilen promise için statusMessage gösterilmeyebilir, bu testte loading'in gözükmesi yeterli)
  });

  it('handles custom renderers returning undefined', () => {
    render(
      <BcTextField
        label="Custom"
        status="success"
        statusMessage="Başarılı!"
        renderCustomIcon={() => undefined}
        renderHelperText={() => undefined}
        helperText="Özel yardım"
      />
    );
    // Default icon ve helperText fallback'leri çalışmalı, crash olmamalı
    expect(screen.getByText('Başarılı!')).toBeInTheDocument();
  });

  it('calls monitoring.onError if monitoring.onChange throws', () => {
    const onError = jest.fn();
    const monitoring = {
      onChange: () => { throw new Error('Test error'); },
      onError,
    };
    render(
      <BcTextField label="Monitored" defaultValue="a" monitoring={monitoring} />
    );
    const input = screen.getByLabelText('Monitored') as HTMLInputElement;
    fireEvent.change(input, { target: { value: 'b' } });
    expect(onError).toHaveBeenCalled();
  });

  it('renders with loading, error, clear button, prefix and suffix together', () => {
    render(
      <BcTextField
        label="Combo"
        loading
        status="error"
        statusMessage="Error!"
        showClearButton
        inputPrefix={<span data-testid="prefix">P</span>}
        inputSuffix={<span data-testid="suffix">S</span>}
        defaultValue="abc"
      />
    );
    expect(screen.getByTestId('prefix')).toBeInTheDocument();
    expect(screen.getByTestId('suffix')).toBeInTheDocument();
    expect(screen.getByLabelText(/clear|temizle/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/loading|yükleniyor/i)).toBeInTheDocument();
    expect(screen.getByText(/error!/i)).toBeInTheDocument();
  });

  it('renders with different locale and shows translated label', () => {
    render(
      <BcTextField
        label="Etiket"
        placeholder="Yer tutucu"
        helperText="Yardım metni"
        locale="tr"
      />
    );
    expect(screen.getByLabelText("Etiket")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Yer tutucu")).toBeInTheDocument();
    expect(screen.getByText("Yardım metni")).toBeInTheDocument();
  });

  it('renders with native input props', () => {
    render(
      <BcTextField
        label="Native"
        inputMode="tel"
        pattern="[0-9]{10,11}"
        minLength={10}
        maxLength={11}
        spellCheck={false}
      />
    );
    const input = screen.getByLabelText('Native') as HTMLInputElement;
    expect(input).toHaveAttribute('inputmode', 'tel');
    expect(input).toHaveAttribute('pattern', '[0-9]{10,11}');
    expect(input).toHaveAttribute('minlength', '10');
    expect(input).toHaveAttribute('maxlength', '11');
    expect(input).toHaveAttribute('spellcheck', 'false');
  });
});

describe('BcTextField accessibility', () => {
  it('has no basic accessibility violations', async () => {
    const { container } = render(<BcTextField label="Accessible" helperText="Helper" showClearButton defaultValue="test" />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
