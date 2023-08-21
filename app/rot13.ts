export default function rot13(str: string): string {
  return str.replace(/[a-zA-Z]/g, (c) => {
    const base = c <= 'Z' ? 65 : 97
    return String.fromCharCode(base + ((c.charCodeAt(0) - base + 13) % 26))
  })
}
