export const css = `
  .button {
    color: green;
    background-color: orange;
    display: inline-block;
    padding: 2em;
  }
  .button strong {
    font-weight: bold;
  }
`;

export default function (link: string, text: string) {
  return `<a class="button" href="${link}"><strong>${text}</strong></a>`;
}
