# React TypeScript Starter Kit

Welcome to my custom React TypeScript Starter Kit! 🚀 This kit is designed to help you skip the repetitive setup process and dive straight into building your projects. It comes pre-configured with essential tools and libraries, so you can start coding right away.

## Features

- **TypeScript**: Strong typing with TypeScript to help catch errors early and improve code quality.
- **Radix UI (shadcn)**: Pre-configured with Radix UI components, providing a set of accessible and customizable components.
- **React Router**: App routes setup using React Router for easy navigation across your application.
- **Material Symbols**: Icon setup using Material Symbols (Materialized Icons) for consistent and beautiful icons.
- **Redux Toolkit**: State management using Redux Toolkit, offering an intuitive API and simplified Redux setup.
- **TanStack Query**: Pre-configured for data fetching, caching, and synchronization with TanStack Query (React Query).
- **Yarn**: Dependency management using Yarn for faster and more reliable installs.
- **Husky**: Pre-commit hooks set up with Husky to ensure code quality and prevent bad commits.

## Getting Started

### Prerequisites

Make sure you have the following installed on your machine:

- [Node.js](https://nodejs.org/) (v14 or later)
- [Yarn](https://yarnpkg.com/) (v1.x or later)

### Switching from Yarn to npm

If you prefer to use npm instead of Yarn, please follow these steps:

1. **Remove Yarn lock file:** Delete the `yarn.lock` file from your project directory.
2. **Install dependencies using npm:** Run the following command to install dependencies with npm:

```bash
   npm install

```

### Installation

1. **Clone the repository:**

```bash
   git clone https://github.com/yourusername/react-typescript-starter-kit.git
   cd react-typescript-starter-kit
```

2. **Install dependencies:**

```bash
    Copy code
    yarn install

```

3. **Start the development server:**

```bash
    Copy code
    yarn dev
```

The app should now be running on http://localhost:3000.

## Project Structure

```bash src
├── assets/
|    └── styles/
|    └── images/
├── components/
│   ├── common/
│   └── radix/
├── views/
├── routes/
├── services/
├── store/
└── utils/
```

## Available Scripts

In the project directory, you can run the following commands:

- **`yarn dev`**: Starts the development server on `http://localhost:3000`. The app will reload if you make edits.
- **`yarn build`**: Builds the app for production to the `dist` folder. It optimizes the build for the best performance.
- **`yarn lint`**: Runs ESLint to check for and fix code style issues.
- **`yarn test`**: Runs tests using your preferred testing framework (if configured).
- **`yarn prepare`**: Automatically sets up Husky Git hooks for ensuring code quality before committing.

## Routing Setup

This project utilizes React Router for managing navigation within the app. The routes are organized in a straightforward and modular way.

### Example Route Setup

Routes are defined in the `appRoutes` array, where each route object includes the `name`, `path`, and `component` properties. Below is an example:

```jsx
import NewComponent from '@Views/NewComponent';

const appRoutes: IRoute[] = [
  {
    name: 'Home',
    path: '/',
    component: Home,
  },
  {
    name: 'NewRoute',
    path: '/new-route',
    component: NewComponent,
  },
];

export default appRoutes;


```

## Redux Setup

This project utilizes Redux for state management, providing a predictable way to manage application state. The Redux store, hooks, and slices are set up to enhance the overall development experience.

### Store Configuration

The Redux store is configured in the `store` directory, where you can define your slices and combine them to create the root reducer.

```bash
/store
├── hooks.ts
├── index.ts
├── slices

```

### Custom Typed Hooks

To simplify the usage of Redux in your components, custom typed hooks are created for dispatching actions and selecting state.

- **`useTypedDispatch`**: A custom hook that provides a typed version of `useDispatch`. This ensures that the dispatch function has the correct types associated with the actions in your application.

- **`useTypedSelector`**: A typed version of the `useSelector` hook, which allows you to select state from the Redux store while maintaining type safety.

### Usage

Here’s how you can use the custom hooks in your components:

```jsx
import React from 'react';
import { useTypedDispatch, useTypedSelector } from '@/store/hooks';
import { someAction } from '@/store/slices/someSlice';

const MyComponent = () => {
  const someData = useTypedSelector(state => state.someSlice.data);

  const handleClick = () => {
    someAction();
  };

  return (
    <div>
      <h1>{someData}</h1>
      <button onClick={handleClick}>Dispatch Action</button>
    </div>
  );
};

export default MyComponent;
```

## Husky Setup

This project uses Husky to enforce commit message standards and branch naming conventions.

### Pre-commit Hook

The `pre-commit` hook runs `yarn lint-staged` to lint staged files before allowing a commit. It checks the branch name against a specified pattern:

- Allowed branches for skipping the check: `staging`, `master`, `main`, `develop`.
- Feature branches must start with: `feat/`, `fix/`, `style/`, or `refactor/`.

### Commit Message Hook

The `commit-msg` hook enforces the following commit message format:

- **Allowed Prefixes:** `feat`, `fix`, `chore`, `docs`, `test`, `style`, `refactor`, `perf`, `build`, `ci`, `revert`, `hotfix`, `asap`.
- **Format:** Must start with an allowed prefix followed by a colon and a brief description (e.g., `feat: add user authentication`).
- **Length:** Commit messages must be 200 characters or less.

This setup ensures a consistent commit history and adherence to best practices.

# Components

The ready to use components and its way of usage is listed below:

## Icon Component

The `Icon` component is a reusable component designed to render Material Icons with customizable properties. It accepts the following props:

### Props

- **`name`** (`string`): The name of the icon to display (required).
- **`className`** (`string`, optional): Additional CSS classes for styling the icon.
- **`onClick`** (`function`, optional): A callback function that is triggered when the icon is clicked.
- **`type`** (`string`, optional): The icon type, defaulting to `'material-symbols-outlined'`.

#### Usage

Here is the example usage

```jsx
<Icon
  name="home"
  className="custom-class"
  onClick={() => alert('Icon clicked!')}
/>
```

## Button Component

The `Button` component is built using Radix UI and is designed to provide a customizable and accessible button interface. It leverages the `class-variance-authority` for handling variants and sizes.

### Features

- **Variants**: Supports multiple button styles, including:

  - **Default**: Primary styled button.
  - **Destructive**: Styled for destructive actions.
  - **Outline**: Button with a border.
  - **Secondary**: Alternative button style.
  - **Ghost**: Transparent background with hover effects.
  - **Link**: Styled like a link with underlining on hover.

- **Sizes**: Configurable button sizes:
  - **Default**: Standard button size.
  - **Small**: Smaller button variant.
  - **Large**: Larger button variant.
  - **Icon**: Size for icon-only buttons.

### Props

The `Button` component accepts the following props:

- **`variant`** (`string`, optional): The button style (default: `default`).
- **`size`** (`string`, optional): The button size (default: `default`).
- **`asChild`** (`boolean`, optional): If true, the button will render as a child component instead of a button element.
- Other standard button attributes like `onClick`, `disabled`, etc.

### Usage

Here's an example of how to use the `Button` component:

```jsx
import { Button } from '@/components/Button';

<Button variant="default" size="lg" onClick={() => alert('Button clicked!')}>
  Click Me
</Button>;
```

## Input Component

The `Input` component is a customizable input field designed for use in forms. It provides a clean and accessible interface while leveraging utility functions for styling.

### Props

The `Input` component accepts all standard HTML input attributes, such as:

- **`type`** (`string`, optional): Specifies the type of input (e.g., `text`, `password`, `email`, etc.).
- Other standard input attributes like `placeholder`, `onChange`, `value`, etc.

### Features

- **Styling**: The input field includes built-in styles for:
  - Height and width.
  - Border and background.
  - Padding and font size.
  - Focus and disabled states.
- **Accessibility**: The component is designed to be keyboard navigable and works with screen readers.

### Usage

Here's an example of how to use the `Input` component:

```jsx
import { Input } from '@/components/Input';

<Input type="text" placeholder="Enter your text here" />;
```

## Tooltip Component

The `Tooltip` component provides a convenient way to display additional information when hovering over or clicking an icon. It utilizes Radix UI for a robust and accessible tooltip experience.

### Props

The `Tooltip` component accepts the following props:

- **`name`** (`string`): The name of the icon to display.
- **`message`** (`string`): The text content of the tooltip.
- **`className`** (`string`, optional): Additional CSS classes for the icon.
- **`messageStyle`** (`string`, optional): Additional CSS classes for styling the tooltip message.
- **`iconClick`** (`function`, optional): A callback function that is triggered when the icon is clicked.
- **`preventDefault`** (`boolean`, optional): If `true`, prevents the default click behavior (default: `true`).

### Features

- **Icon Integration**: The component displays an icon with a tooltip that can be triggered by clicking or hovering.
- **Customizable Styling**: You can easily customize the appearance of the icon and tooltip message with additional CSS classes.
- **Accessibility**: Built using Radix UI for better accessibility and keyboard navigation.

### Usage

Here's an example of how to use the `Tooltip` component:

```jsx
import ToolTip from '@/components/ToolTip';

<ToolTip
  name="info"
  message="This is additional information."
  iconClick={() => console.log('Icon clicked!')}
  className="text-gray-500 hover:text-black"
  messageStyle="bg-blue-500"
/>;
```

### Searchbar Component

The `Searchbar` component provides a customizable search input field with an integrated icon for enhanced user interaction.

#### Props

The `Searchbar` component accepts the following props:

- **`className`** (`string`, optional): Additional CSS classes for styling the searchbar.
- **`onChange`** (`function`, optional): A callback function that is triggered when the input value changes.
- **`onClick`** (`function`, optional): A callback function that is triggered when the search input is clicked.
- **`placeholder`** (`string`, optional): The placeholder text displayed in the search input (default: `"Search"`).
- **`value`** (`string`, optional): The current value of the search input.
- **`iconClassName`** (`string`, optional): Additional CSS classes for the search icon.

#### Features

- **Integrated Icon**: Includes a customizable icon that enhances the search experience.
- **Customizable Styles**: Supports additional CSS classes for styling the input and icon.
- **Event Handling**: Provides callbacks for handling changes and clicks, making it easy to integrate into forms and other components.

#### Usage

Here's an example of how to use the `Searchbar` component:

```jsx
import Searchbar from '@/components/Searchbar';

const App = () => {
  const handleChange = value => {
    console.log('Search value:', value);
  };

  return (
    <Searchbar
      placeholder="Search here..."
      onChange={handleChange}
      iconClassName="text-gray-500"
      className="bg-white"
    />
  );
};

export default App;
```

## Contributing

If you have suggestions or improvements, feel free to open an issue or submit a pull request. Contributions are welcome!

## License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.
