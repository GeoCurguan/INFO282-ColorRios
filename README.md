# CARTA CROMÁTICA COLOR RÍOS

## Proyect Description

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

Its main purpose is to be used as a web component that acts as a gallery to visualize colors from a database. Users can select colors, save or export them for use in other projects, and share them online with other users.

## Design

![Diagrama Color Ríos](Diagrama_colorrios.png)

This web component works in two parts:

### 1) Backend:

Manages a Google Sheets page, transforms it into an SQL database. This information is fetched and utilized by the frontend.
Here, we also store metadata of visited pages and colors (clicks). Additionally, roles are implemented for protected routes, using login with JWT.

### 2) Frontend:
Manages the user interactions and many different pages:
- **Main page:** features components such as a color gallery, filters to update the displayed colors, color information upon clicking, and a bar that stores selected colors.
- **Login and registration.**
- **3D page:** displays all the colors in the gallery as points in a 3D environment.
- **Profile and Social:** For users to view their own favorite colors and palettes, and the ones shared within the community.
- **Dashboard:** Accessible only to administrators. Allows them to view important information about colors, users and trends.

## [Requirements && Deployment ↗️](https://docs.google.com/document/d/1yK6ltc7X2nPYVArZnHLF808YQKL483dlPvmPe1h5N8M/edit?usp=sharing)
Something that is not mentioned in the deployment doc, is that you need a special layout in your excel. You can check ColorController.php to try to understand `value[cell]`

## [Code ↗️](https://www.notion.so/Docs-C-digo-bc490e49ff784ef9b0620a55736eb97e)

## [Figma ↗️](https://www.figma.com/file/jfuIMZQGajUpkj0Mz2oPYV/Los-R%C3%ADos-en-Colores?type=design&node-id=3%3A254&mode=design&t=ByFDyYO79KRT8XiD-1)
All our designs, prototypes and wireflows.

## [Sprint's ↗️](https://www.notion.so/Entregables-82b30fb037f44b84b5b2a6c79a310142)
Sprint information about tasks, progress, inconvenients, etc

## [Test Cases ↗️](https://docs.google.com/spreadsheets/d/1dGxAordmbZbPbXAAqwfNuQdKa8Oe1Hk7fc4AaqUTfs4/edit#gid=148973434)
All tests done manually. We consider a series of prerequisites, as well as the required data. To know if it fails or pass so we can fix the errors before production.
