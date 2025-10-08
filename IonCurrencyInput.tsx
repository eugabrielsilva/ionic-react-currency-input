import React from 'react'
import { IonInput } from '@ionic/react'
import { useCallback, useState, useEffect } from 'react'

type IonInputProps = React.ComponentProps<typeof IonInput>

type MoneyInputProps = IonInputProps & {
  value: number
  onChange: (value: number) => void
  locale?: string
  currency?: string
  fractionDigits?: number
  decimalSeparator?: string
  useGrouping?: boolean
}

export default function IonCurrencyInput(props: MoneyInputProps) {
  const {
    value,
    onChange,
    locale,
    currency,
    fractionDigits,
    decimalSeparator,
    useGrouping,
    ...rest
  } = props

  const format = useCallback(
    (num: number): string => {
      if (!num || isNaN(num)) {
        num = 0
      }

      return new Intl.NumberFormat(locale ?? 'pt-BR', {
        style: 'currency',
        currency: currency ?? 'BRL',
        minimumFractionDigits: fractionDigits ?? 2,
        maximumFractionDigits: fractionDigits ?? 2,
        useGrouping: useGrouping ?? true,
      }).format(num)
    },
    [locale, currency, fractionDigits, useGrouping]
  )

  const unformat = useCallback(
    (value: string): number => {
      const separator = decimalSeparator ?? ','
      const escapedSeparator = separator.replace(
        /([.?*+^$[\]\\(){}|-])/g,
        '\\$1'
      )
      const regex = new RegExp(`[^\\d${escapedSeparator}]`, 'g')
      let cleaned = value.replace(regex, '')
      cleaned = cleaned.replace(separator, '.')
      return parseFloat(cleaned) || 0
    },
    [decimalSeparator]
  )

  const [displayValue, setDisplayValue] = useState<string>(format(value))

  useEffect(() => {
    if (unformat(displayValue) !== value) {
      setDisplayValue(format(value))
    }
  }, [value, format, unformat, displayValue])

  const handleInput = useCallback(
    (event: any) => {
      const inputString = event.detail.value || ''
      let digits = inputString.replace(/[^\d]/g, '')

      if (!digits) {
        setDisplayValue('')
        onChange(0)
        return
      }

      const divisor = Math.pow(10, fractionDigits ?? 2)
      const numValue = parseInt(digits, 10) / divisor
      const newDisplayValue = format(numValue)
      setDisplayValue(newDisplayValue)
      onChange(numValue)
    },
    [onChange, format, fractionDigits]
  )

  return (
    <IonInput
      {...rest}
      type="text"
      inputmode="decimal"
      value={displayValue}
      onIonInput={handleInput}
    />
  )
}
