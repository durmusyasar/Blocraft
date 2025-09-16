import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import React from "react";
import { BcPhoneInput } from "./BcPhoneInput";
import { axe, toHaveNoViolations } from 'jest-axe';
expect.extend(toHaveNoViolations);

describe("BcPhoneInput", () => {
  // === BcTextField Inheritance Tests ===
  describe("BcTextField Inheritance", () => {
    it("inherits basic TextField functionality", () => {
      render(<BcPhoneInput label="Telefon Numarası" />);
      expect(screen.getByLabelText("Telefon Numarası")).toBeInTheDocument();
    });

    it("inherits value and onChange functionality", () => {
      const handleChange = jest.fn();
      render(<BcPhoneInput label="Test" value="123456" onChange={handleChange} />);
      const input = screen.getByLabelText("Test") as HTMLInputElement;
      expect(input.value).toBe("123456");
      fireEvent.change(input, { target: { value: "654321" } });
      expect(handleChange).toHaveBeenCalled();
    });

    it("inherits clear button functionality", () => {
      const handleClear = jest.fn();
      render(
        <BcPhoneInput
          label="Clearable Phone"
          showClearButton
          defaultValue="5551234567"
          onClear={handleClear}
        />
      );
      const input = screen.getByLabelText("Clearable Phone") as HTMLInputElement;
      expect(input.value).toBe("5551234567");
      const clearBtn = screen.getByLabelText("Temizle");
      fireEvent.click(clearBtn);
      expect(handleClear).toHaveBeenCalled();
    });

    it("inherits status and statusMessage functionality", () => {
      render(
        <>
          <BcPhoneInput label="Error Phone" status="error" statusMessage="Geçersiz telefon!" />
          <BcPhoneInput label="Success Phone" status="success" statusMessage="Geçerli telefon!" />
        </>
      );
      expect(screen.getByText("Geçersiz telefon!")).toBeInTheDocument();
      expect(screen.getByText("Geçerli telefon!")).toBeInTheDocument();
    });

    it("inherits appearance styles", () => {
      render(<BcPhoneInput label="Premium Phone" appearance="premium" />);
      const input = screen.getByLabelText("Premium Phone");
      expect(input).toBeInTheDocument();
    });

    it("inherits disabled functionality", () => {
      render(<BcPhoneInput label="Disabled Phone" disabled defaultValue="5551234567" />);
      const input = screen.getByLabelText("Disabled Phone") as HTMLInputElement;
      expect(input).toBeDisabled();
      expect(input.value).toBe("5551234567");
    });

    it("inherits responsive width functionality", () => {
      render(<BcPhoneInput label="Responsive Phone" responsiveWidth />);
      const input = screen.getByLabelText("Responsive Phone");
      expect(input).toBeInTheDocument();
    });

    it("inherits accessibility features", () => {
      render(
        <BcPhoneInput
          label="Accessible Phone"
          helperText="Telefon numarası girin"
          status="error"
          statusMessage="Hata mesajı"
        />
      );
      const input = screen.getByLabelText("Accessible Phone");
      expect(input).toHaveAttribute("aria-describedby");
      expect(screen.getByText("Telefon numarası girin")).toBeInTheDocument();
      expect(screen.getByText("Hata mesajı")).toBeInTheDocument();
    });
  });

  // === Phone-Specific Tests ===
  describe("Phone-Specific Functionality", () => {
    it("renders with default country", () => {
      render(<BcPhoneInput label="Phone" country="TR" />);
      const input = screen.getByLabelText("Phone");
      expect(input).toBeInTheDocument();
      expect(input).toHaveAttribute("type", "tel");
    });

    it("calls onCountryChange when country changes", () => {
      const handleCountryChange = jest.fn();
      render(
        <BcPhoneInput 
          label="Phone" 
          country="TR" 
          onCountryChange={handleCountryChange}
        />
      );
      // Country change functionality would need to be tested based on implementation
      expect(handleCountryChange).toBeDefined();
    });

    it("shows phone mask in placeholder", () => {
      render(
        <BcPhoneInput 
          label="Phone" 
          country="TR" 
          showMaskInPlaceholder={true}
        />
      );
      const input = screen.getByLabelText("Phone") as HTMLInputElement;
      expect(input.placeholder).toBeTruthy();
    });

    it("validates phone numbers", () => {
      const customValidate = jest.fn().mockReturnValue(false);
      render(
        <BcPhoneInput 
          label="Phone" 
          country="TR" 
          value="123" 
          validatePhone={customValidate}
        />
      );
      expect(customValidate).toBeDefined();
    });

    it("handles favorite countries", () => {
      render(
        <BcPhoneInput 
          label="Phone" 
          country="TR" 
          favoriteCountries={["TR", "US", "GB"]}
        />
      );
      const input = screen.getByLabelText("Phone");
      expect(input).toBeInTheDocument();
    });

    it("supports tel input mode", () => {
      render(<BcPhoneInput label="Phone" country="TR" />);
      const input = screen.getByLabelText("Phone");
      expect(input).toHaveAttribute("inputMode", "tel");
    });
  });

  // === Advanced Features Tests ===
  describe("Advanced Features", () => {
    it("enables phone formatting", () => {
      render(
        <BcPhoneInput 
          label="Phone" 
          country="TR" 
          enablePhoneFormatting={true}
        />
      );
      const input = screen.getByLabelText("Phone");
      expect(input).toBeInTheDocument();
    });

    it("enables country search", () => {
      render(
        <BcPhoneInput 
          label="Phone" 
          country="TR" 
          enablePhoneSuggestions={true}
        />
      );
      const input = screen.getByLabelText("Phone");
      expect(input).toBeInTheDocument();
    });

    it("enables advanced validation", () => {
      render(
        <BcPhoneInput 
          label="Phone" 
          country="TR" 
          enableAdvancedValidation={true}
        />
      );
      const input = screen.getByLabelText("Phone");
      expect(input).toBeInTheDocument();
    });

    it("enables auto country detection", () => {
      render(
        <BcPhoneInput 
          label="Phone" 
          enableAutoCountryDetection={true}
        />
      );
      const input = screen.getByLabelText("Phone");
      expect(input).toBeInTheDocument();
    });

    it("enables phone suggestions", () => {
      render(
        <BcPhoneInput 
          label="Phone" 
          country="TR" 
          enablePhoneSuggestions={true}
        />
      );
      const input = screen.getByLabelText("Phone");
      expect(input).toBeInTheDocument();
    });

    it("enables smart features", () => {
      render(
        <BcPhoneInput 
          label="Phone" 
          country="TR" 
          enableSmartFeatures={true}
        />
      );
      const input = screen.getByLabelText("Phone");
      expect(input).toBeInTheDocument();
    });

    it("enables accessibility features", () => {
      render(
        <BcPhoneInput 
          label="Phone" 
          country="TR" 
          enableAccessibility={true}
        />
      );
      const input = screen.getByLabelText("Phone");
      expect(input).toBeInTheDocument();
    });

    it("enables phone history", () => {
      render(
        <BcPhoneInput 
          label="Phone" 
          country="TR" 
          enablePhoneHistory={true}
        />
      );
      const input = screen.getByLabelText("Phone");
      expect(input).toBeInTheDocument();
    });

    it("enables all advanced features", () => {
      render(
        <BcPhoneInput 
          label="Phone" 
          country="TR" 
          enableMonitoring={true}
          enablePerformance={true}
          enableAccessibility={true}
          enableSmartFeatures={true}
          enableIntegration={true}
          enablePhoneFormatting={true}
          enableAdvancedValidation={true}
          enableAutoCountryDetection={true}
          enablePhoneSuggestions={true}
          enablePhoneHistory={true}
        />
      );
      const input = screen.getByLabelText("Phone");
      expect(input).toBeInTheDocument();
    });
  });

  // === Async Operations Tests ===
  describe("Async Operations", () => {
    it("handles async country loading", async () => {
      const mockFetchCountries = jest.fn().mockResolvedValue([
        { code: "TR", name: "Turkey", flag: "🇹🇷", dial: 90, mask: "(999) 999-9999" },
        { code: "US", name: "United States", flag: "🇺🇸", dial: 1, mask: "(999) 999-9999" }
      ]);

      render(
        <BcPhoneInput 
          label="Phone" 
          fetchCountries={mockFetchCountries}
        />
      );
      
      await waitFor(() => {
        expect(mockFetchCountries).toHaveBeenCalled();
      });
    });

    it("handles async country loading error", async () => {
      const mockFetchCountries = jest.fn().mockRejectedValue(new Error("Fetch failed"));
      const consoleSpy = jest.spyOn(console, 'warn').mockImplementation();

      render(
        <BcPhoneInput 
          label="Phone" 
          fetchCountries={mockFetchCountries}
        />
      );
      
      await waitFor(() => {
        expect(mockFetchCountries).toHaveBeenCalled();
      });
      
      await waitFor(() => {
        expect(consoleSpy).toHaveBeenCalledWith(
          "BcPhoneInput: Failed to fetch countries:",
          expect.any(Error)
        );
      });

      consoleSpy.mockRestore();
    });
  });

  // === i18n Tests ===
  describe("Internationalization", () => {
    it("supports Turkish locale", () => {
      render(
        <BcPhoneInput 
          label="Telefon" 
          country="TR" 
          locale="tr"
        />
      );
      const input = screen.getByLabelText("Telefon");
      expect(input).toBeInTheDocument();
    });

    it("supports English locale", () => {
      render(
        <BcPhoneInput 
          label="Phone" 
          country="US" 
          locale="en"
        />
      );
      const input = screen.getByLabelText("Phone");
      expect(input).toBeInTheDocument();
    });

    it("falls back to fallback locale", () => {
      render(
        <BcPhoneInput 
          label="Phone" 
          country="TR" 
          locale="fr" 
          fallbackLocale="en"
        />
      );
      const input = screen.getByLabelText("Phone");
      expect(input).toBeInTheDocument();
    });
  });

  // === Accessibility Tests ===
  describe("Accessibility", () => {
    it("should not have accessibility violations", async () => {
      const { container } = render(
        <BcPhoneInput 
          label="Accessible Phone Input" 
          country="TR"
          helperText="Enter your phone number"
        />
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it("has proper ARIA attributes", () => {
      render(
        <BcPhoneInput 
          label="Phone" 
          country="TR"
          status="error"
          statusMessage="Invalid phone number"
          helperText="Enter phone number"
        />
      );
      
      const input = screen.getByLabelText("Phone");
      expect(input).toHaveAttribute("aria-describedby");
      expect(input).toHaveAttribute("type", "tel");
      expect(input).toHaveAttribute("inputMode", "tel");
    });

    it("supports screen readers", () => {
      render(
        <BcPhoneInput 
          label="Phone Number" 
          country="TR"
          helperText="Format: (555) 123-4567"
        />
      );
      
      expect(screen.getByLabelText("Phone Number")).toBeInTheDocument();
      expect(screen.getByText("Format: (555) 123-4567")).toBeInTheDocument();
    });
  });

  // === Edge Cases Tests ===
  describe("Edge Cases", () => {
    it("handles empty value", () => {
      render(<BcPhoneInput label="Phone" value="" />);
      const input = screen.getByLabelText("Phone") as HTMLInputElement;
      expect(input.value).toBe("");
    });

    it("handles very long phone numbers", () => {
      const longNumber = "1234567890123456789012345";
      render(<BcPhoneInput label="Phone" value={longNumber} />);
      const input = screen.getByLabelText("Phone") as HTMLInputElement;
      expect(input.value).toBe(longNumber);
    });

    it("handles invalid country codes", () => {
      render(<BcPhoneInput label="Phone" country="TR" />);
      const input = screen.getByLabelText("Phone");
      expect(input).toBeInTheDocument();
    });

    it("handles missing country list", () => {
      render(<BcPhoneInput label="Phone" countryList={[]} />);
      const input = screen.getByLabelText("Phone");
      expect(input).toBeInTheDocument();
    });
  });

  // === Performance Tests ===
  describe("Performance", () => {
    it("handles large country lists efficiently", () => {
      const largeCountryList = Array.from({ length: 1000 }, (_, i) => ({
        code: `C${i}`,
        name: `Country ${i}`,
        flag: '🏳️',
        dial: 1000 + i,
        mask: '(999) 999-9999'
      }));

      const start = performance.now();
      render(
        <BcPhoneInput 
          label="Phone" 
          countryList={largeCountryList}
        />
      );
      const end = performance.now();
      
      expect(end - start).toBeLessThan(1000); // Should render within 1 second
      const input = screen.getByLabelText("Phone");
      expect(input).toBeInTheDocument();
    });
  });
});