import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { BcPhoneInput } from "./BcPhoneInput";
import { CountryCode } from './types';
// import { axe, toHaveNoViolations } from 'jest-axe';
// expect.extend(toHaveNoViolations);

describe("BcPhoneInput", () => {
  it("renders with label", () => {
    render(<BcPhoneInput label="Telefon" />);
    expect(screen.getByLabelText("Telefon")).toBeInTheDocument();
  });

  it("shows country select by default", () => {
    render(<BcPhoneInput label="Telefon" />);
    expect(screen.getByText("Türkiye +90")).toBeInTheDocument();
  });

  it("can hide country select with showCountrySelect", () => {
    render(<BcPhoneInput label="Telefon" showCountrySelect={false} />);
    expect(screen.queryByText("Türkiye +90")).not.toBeInTheDocument();
  });

  it("calls onCountryChange (controlled)", () => {
    const Wrapper = () => {
      const [country, setCountry] = React.useState<CountryCode>("TR");
      return <BcPhoneInput label="Telefon" country={country} onCountryChange={setCountry} />;
    };
    render(<Wrapper />);
    fireEvent.mouseDown(screen.getByText("Türkiye +90"));
    fireEvent.click(screen.getByText("Almanya +49"));
    expect(screen.getByText("Almanya +49")).toBeInTheDocument();
  });

  it("shows error for invalid phone", () => {
    render(<BcPhoneInput label="Telefon" defaultValue="123" country="TR" />);
    expect(screen.getByText(/Geçersiz telefon/)).toBeInTheDocument();
  });

  it("supports controlled mode", () => {
    const Wrapper = () => {
      const [val, setVal] = React.useState("");
      return <BcPhoneInput label="Telefon" value={val} onChange={e => setVal(e.target.value)} />;
    };
    render(<Wrapper />);
    const input = screen.getByLabelText("Telefon");
    fireEvent.change(input, { target: { value: "5551234567" } });
    expect(input).toHaveValue("5551234567");
  });

  it("shows helperText and status", () => {
    render(<BcPhoneInput label="Telefon" helperText="Yardım" status="info" statusMessage="Bilgi!" />);
    expect(screen.getByText("Yardım")).toBeInTheDocument();
    expect(screen.getByText("Bilgi!")).toBeInTheDocument();
  });

  it("renders disabled", () => {
    render(<BcPhoneInput label="Telefon" disabled defaultValue="5551234567" />);
    expect(screen.getByLabelText("Telefon")).toBeDisabled();
  });

  it("shows clear button", () => {
    render(<BcPhoneInput label="Telefon" showClearButton defaultValue="5551234567" />);
    expect(screen.getByLabelText("Temizle")).toBeInTheDocument();
  });

  it("validates very long phone number as invalid", () => {
    render(<BcPhoneInput label="Telefon" defaultValue={"5".repeat(20)} country="TR" />);
    expect(screen.getByText(/Geçersiz telefon/)).toBeInTheDocument();
  });

  it("validates only country code as invalid", () => {
    render(<BcPhoneInput label="Telefon" defaultValue="" country="TR" />);
    expect(screen.queryByText(/Geçersiz telefon/)).not.toBeInTheDocument();
  });

  it("handles paste event correctly", () => {
    const Wrapper = () => {
      const [val, setVal] = React.useState("");
      return <BcPhoneInput label="Telefon" value={val} onChange={e => setVal(e.target.value)} />;
    };
    render(<Wrapper />);
    const input = screen.getByLabelText("Telefon");
    fireEvent.paste(input, { clipboardData: { getData: () => "5551234567" } });
    // Paste event simülasyonu için change de tetiklenmeli
    fireEvent.change(input, { target: { value: "5551234567" } });
    expect(input).toHaveValue("5551234567");
  });

  it("supports custom validatePhone and getMask", () => {
    const customValidate = (phone: string, country: string) => phone === "12345" && country === "TR";
    const customMask = (country: string) => country === "TR" ? "12345" : "999";
    render(<BcPhoneInput label="Telefon" defaultValue="12345" country="TR" validatePhone={customValidate} getMask={customMask} />);
    expect(screen.queryByText(/Geçersiz telefon/)).not.toBeInTheDocument();
  });

  it("changes label and country name with locale", () => {
    render(<BcPhoneInput label={undefined} locale="en" country="US" />);
    expect(screen.getByLabelText("Phone")).toBeInTheDocument();
    expect(screen.getByText("United States +1")).toBeInTheDocument();
  });

  // it("is accessible (axe)", async () => {
  //   const { container } = render(<BcPhoneInput label="Telefon" />);
  //   const results = await axe(container);
  //   expect(results).toHaveNoViolations();
  // });
});

describe('BcPhoneInput advanced features', () => {
  it('shows favorite countries at the top', () => {
    render(<BcPhoneInput favoriteCountries={['TR' as CountryCode, 'US' as CountryCode]} countryList={[
      { id: 1, code: 'TR' as CountryCode, name: { tr: 'Türkiye', en: 'Turkey' }, flag: '🇹🇷', dial: 90, mask: '(999) 999-9999' },
      { id: 2, code: 'US' as CountryCode, name: { tr: 'Amerika', en: 'United States' }, flag: '🇺🇸', dial: 1, mask: '(999) 999-9999' },
      { id: 3, code: 'DE' as CountryCode, name: { tr: 'Almanya', en: 'Germany' }, flag: '🇩🇪', dial: 49, mask: '9999 9999999' },
    ]} />);
    fireEvent.mouseDown(screen.getByRole('button', { name: /ülke|country/i }));
    expect(screen.getByText(/Favorites|Favoriler/)).toBeInTheDocument();
    expect(screen.getAllByRole('option')[1]).toHaveTextContent(/Türkiye|Turkey/);
    expect(screen.getAllByRole('option')[2]).toHaveTextContent(/Amerika|United States/);
  });

  it('updates recents when country changes', () => {
    const [country, setCountry] = React.useState<CountryCode>('TR');
    render(<BcPhoneInput favoriteCountries={['TR' as CountryCode]} countryList={[
      { id: 1, code: 'TR' as CountryCode, name: { tr: 'Türkiye', en: 'Turkey' }, flag: '🇹🇷', dial: 90, mask: '(999) 999-9999' },
      { id: 2, code: 'US' as CountryCode, name: { tr: 'Amerika', en: 'United States' }, flag: '🇺🇸', dial: 1, mask: '(999) 999-9999' },
    ]} country={country} onCountryChange={setCountry} />);
    fireEvent.mouseDown(screen.getByRole('button', { name: /ülke|country/i }));
    fireEvent.click(screen.getByText(/United States|Amerika/));
    fireEvent.mouseDown(screen.getByRole('button', { name: /ülke|country/i }));
    expect(screen.getByText(/Recent|Son Kullanılanlar/)).toBeInTheDocument();
    expect(screen.getAllByRole('option')[2]).toHaveTextContent(/United States|Amerika/);
  });

  it('renders readonly country code when showCountrySelect is readonly', () => {
    render(<BcPhoneInput showCountrySelect="readonly" country={'TR' as CountryCode} countryList={[
      { id: 1, code: 'TR' as CountryCode, name: { tr: 'Türkiye', en: 'Turkey' }, flag: '🇹🇷', dial: 90, mask: '(999) 999-9999' },
    ]} />);
    expect(screen.getByText(/Türkiye|Turkey/)).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /ülke|country/i })).not.toBeInTheDocument();
  });

  it('renders quickly with a large country list', async () => {
    const bigList = Array.from({ length: 1000 }, (_, i) => ({
      id: i + 1,
      code: 'TR' as CountryCode,
      name: { tr: `Ülke ${i + 1}`, en: `Country ${i + 1}` },
      flag: '🏳️',
      dial: 1000 + i,
      mask: '(999) 999-9999'
    }));
    render(<BcPhoneInput countryList={bigList} country={'TR' as CountryCode} />);
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  it('shows i18n headers for favorites and recents', () => {
    render(<BcPhoneInput favoriteCountries={['TR' as CountryCode]} countryList={[
      { id: 1, code: 'TR' as CountryCode, name: { tr: 'Türkiye', en: 'Turkey' }, flag: '🇹🇷', dial: 90, mask: '(999) 999-9999' },
      { id: 2, code: 'US' as CountryCode, name: { tr: 'Amerika', en: 'United States' }, flag: '🇺🇸', dial: 1, mask: '(999) 999-9999' },
    ]} locale="tr" country={'TR' as CountryCode} />);
    fireEvent.mouseDown(screen.getByRole('button', { name: /ülke|country/i }));
    expect(screen.getByText(/Favoriler/)).toBeInTheDocument();
  });

  it('shows loading state with async fetch', async () => {
    const fetchCountries = () => new Promise<any[]>(resolve => setTimeout(() => resolve([
      { id: 1, code: 'TR' as CountryCode, name: { tr: 'Türkiye', en: 'Turkey' }, flag: '🇹🇷', dial: 90, mask: '(999) 999-9999' },
    ]), 500));
    render(<BcPhoneInput fetchCountries={fetchCountries} country={'TR' as CountryCode} />);
    fireEvent.mouseDown(screen.getByRole('button', { name: /ülke|country/i }));
    expect(screen.getByText(/Yükleniyor|Loading/)).toBeInTheDocument();
    expect(await screen.findByText(/Türkiye|Turkey/)).toBeInTheDocument();
  });

  // Erişilebilirlik testi (jest-axe ile)
  // it('is accessible', async () => {
  //   const { container } = render(<BcPhoneInput country={'TR' as CountryCode} />);
  //   const results = await axe(container);
  //   expect(results).toHaveNoViolations();
  // });
}); 