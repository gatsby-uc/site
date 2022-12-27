export function formatCountingNumber(number, locale) {
    return new Intl.NumberFormat(locale, { notation: 'standard', style: 'decimal' }).format(number)
}