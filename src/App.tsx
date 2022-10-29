import React, { ReactElement, ReactNode } from "react";
import "./App.css";

//conventional props
function Heading({ title }: { title: string }) {
  return <h1>{title}</h1>;
}

function HeadingWithContent({
  children,
}: {
  children: ReactNode;
}): ReactElement {
  return <h1>{children}</h1>;
}

//Default Props
const defaultContainerProps = { heading: <strong>My Heading</strong> };

type ContainerProps = { children: ReactNode } & typeof defaultContainerProps; //If we dont provide header it will automatically have default header.
function Container({ heading, children }: ContainerProps) {
  return (
    <div>
      <h1>{heading}</h1>
      {children}
    </div>
  );
}
Container.defaultProps = defaultContainerProps;

//Functional props
function TextWithNumber({
  header,
  children,
}: {
  header?: (num: number) => ReactNode;
  children: (num: number) => ReactNode;
}) {
  const [state, setState] = React.useState<number>(0);

  return (
    <div>
      {header && <h2>{header?.(state)}</h2>}
      <div>{children(state)}</div>
      <div>
        <button onClick={() => setState(state + 1)}>Add</button>
      </div>
    </div>
  );
}

//List using concept of Generics. Created generic List function
function List<ListItem>({
  items,
  render,
}: {
  items: ListItem[];
  render: (item: ListItem) => ReactNode;
}) {
  return (
    <ul>
      {items.map((item, index) => (
        <li key={index}>{render(item)}</li>
      ))}
    </ul>
  );
}

//Class component
class MyHeader extends React.Component<{
  title: ReactNode;
}> {
  render() {
    return <h1>{this.props.title}</h1>;
  }
}

function App() {
  return (
    <div>
      <Heading title="Hello"></Heading>
      <HeadingWithContent>
        <strong>Hi!</strong>
      </HeadingWithContent>
      <Container>Foo</Container>
      <TextWithNumber header={(num: number) => <span>Header {num}</span>}>
        {(num: number) => <div>Today's number is num {num}</div>}
      </TextWithNumber>
      <List
        items={["Praneet", "Shambhavi", "Amruta"]}
        render={(item: string) => <div>{item.toLowerCase()}</div>}
      ></List>
      <MyHeader title="Hello there!"></MyHeader>
    </div>
  );
}

export default App;
