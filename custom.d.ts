// Fix for SVG import
declare module '*.svg' {
  const content: string;
  export default content;
}
