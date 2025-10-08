import { IonInput } from '@ionic/react'
import { useCallback, useState, useEffect } from 'react'

type MoneyInputProps = {
  value: number
  onChange: (value: number) => void
  label?: string
  placeholder?: string
  disabled?: boolean
  helperText?: string
  className?: string
}

const formatToBRL = (num: number): string => {
  if (!num || isNaN(num)) {
    return 'R$ 0,00'
  }

  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(num)
}

const unformatBRL = (value: string): number => {
  let cleaned = value.replace(/[^\d,]/g, '')
  cleaned = cleaned.replace(',', '.')
  return parseFloat(cleaned) || 0
}

export default function MoneyInput(props: MoneyInputProps) {
  const {
    value,
    onChange,
    label,
    placeholder,
    disabled,
    helperText,
    className,
  } = props

  const [displayValue, setDisplayValue] = useState<string>(formatToBRL(value))

  useEffect(() => {
    if (unformatBRL(displayValue) !== value) {
      setDisplayValue(formatToBRL(value))
    }
  }, [value])

  const handleInput = useCallback(
    (event: any) => {
      const inputString = event.detail.value || ''
      let digits = inputString.replace(/[^\d]/g, '')

      if (!digits) {
        setDisplayValue('')
        onChange(0)
        return
      }

      const numValue = parseInt(digits, 10) / 100
      const newDisplayValue = formatToBRL(numValue)
      setDisplayValue(newDisplayValue)
      onChange(numValue)
    },
    [onChange]
  )

  return (
    <IonInput
      type="text"
      inputmode="decimal"
      value={displayValue}
      label={label}
      placeholder={placeholder}
      disabled={disabled}
      helperText={helperText}
      className={className}
      onIonInput={handleInput}
    />
  )
}
