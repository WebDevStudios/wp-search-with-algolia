export function cx(cssClasses) {
  return Array.isArray(cssClasses) ? cssClasses.filter(Boolean).join(' ') : cssClasses || '';
}