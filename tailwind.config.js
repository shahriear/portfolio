/** @type {import('tailwindcss').Config} */
export default { darkMode:'class', content:['./app/**/*.{js,jsx}','./components/**/*.{js,jsx}','./lib/**/*.{js,jsx}'], theme:{ extend:{
  colors:{ bg:'oklch(var(--bg)/<alpha-value>)', surface:'oklch(var(--surface)/<alpha-value>)', text:'oklch(var(--text)/<alpha-value>)', muted:'oklch(var(--muted)/<alpha-value>)' },
  boxShadow:{ soft:'0 10px 30px rgba(0,0,0,.15)' }, borderRadius:{ xl:'14px' } }}, plugins:[] };
