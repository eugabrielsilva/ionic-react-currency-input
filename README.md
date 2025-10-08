# ionic-react-currency-input

🇧🇷 Extensão do componente `IonInput` com máscara de formatação monetária para React e suporte a react-hook-form. O valor é exibido formatado e salvo no form como um number puro.

🇺🇸 Extension of the `IonInput` component with currency formatting mask for React and react-hook-form support. The value is displayed formatted and saved in the form as a pure number.

## 🇧🇷 Uso / 🇺🇸 Usage

Ionic 8+

```tsx
<IonCurrencyInput
  value={value}
  onChange={onChange}
  locale="pt-BR"
  currency="BRL"
  fractionDigits={2}
  decimalSeparator=","
  useGrouping={true}
/>
```
