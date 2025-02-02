# Vue project [FysioFresh]

[Link til opgaven](https://harun8-github-io.vercel.app/)

# Opgavebeskrivelse:

Lav et view med følgende funktionalitet:
1. Et kanban-board med forskellige statuskolonner.
2. Forskellige kort, som kan trækkes fra en statuskolonne til en anden.
3. Hvert kort skal indeholde en titel og en beskrivelse.
4. Det skal være muligt at tilføje, redigere og slette kort.

## Hvad har jeg brugt

- Vue 3
- Vuetify hvor det gav mening såsom ved Form, Card
- Composition API
- TypeScript
- TailwindCSS


## Tankegang


Jeg greb projektet an, som jeg ville gribe et ReactJs-projekt an, og forsøgt at tackle det på en relativt komponentbaseret måde, hvilket kan ses med KanbanBoard, Board, Card og Form-komponenterne. Jeg har inddraget separation of concerns, hvor hver komponent har sit eget fokusområde:

- KanbanBoard.vue håndterer den globale opgaveliste og tager sig af overordnet logik, såsom at tilføje, redigere, slette og fordele opgaver på de forskellige boards.
- Board.vue fokuserer på at renderer opgaverne i én specifik kolonne og at håndtere forms og drag-and-drop funktionalitet.
- Form.vue har udelukkende fokus på at oprette eller redigere nye opgaver.


### Mulige forbedringer

Det kan diskuteres, at Board.vue måske håndterer lidt for meget logik, og at man kunne overveje at flytte drag-and-drop-logikken til en separat utility-funktion.



