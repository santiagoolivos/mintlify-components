import { Accordion } from "./components/accordion";
import { AccordionGroup } from "./components/accordion-groups";
import Callout from "./components/callouts";
import Card from "./components/card";
import CardGroup from "./components/card-group";
import {CodeBlock} from "./components/code-block";
import { CodeGroup } from "./components/code-group";
import { Icon } from "./components/icon";
import { Step } from "./components/step";
import { Steps } from "./components/steps";
import { Tab } from "./components/tab";
import { Tabs } from "./components/tabs";


interface ComponentContainerProps {
  name: string;
  children: React.ReactNode;
}

const codeSnippets = [
  {
    filename: "helloWorld.js",
    language: "javascript",
    content: `console.log("Hello World");`
  },
  {
    filename: "hello_world.py",
    language: "python",
    content: `print('Hello World!')`
  },
  {
    filename: "HelloWorld.java",
    language: "java",
    content: `class HelloWorld {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
    }
    }`,
    highlightLines: "2, 4",
    isExpandable:true
  }
];

const ComponentContainer = ({ name,  children }: ComponentContainerProps) => {
  return (
    <div className="flex flex-row gap-5 items-center justify-center">
      <div className="inline">
        {name}:
      </div>
      <div className="flex flex-col">
      {

      children
      }
      </div>
    </div>
  );
}

function App() {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center w-full">
      <h1 className="text-4xl font-bold mb-8 text-blue-500">Component Showcase</h1>
      <div className="flex flex-col gap-4">
        <div className="flex flex-col items-center gap-2 m-10">
          <ComponentContainer name="Accordion">
            <Accordion title="I am the Accordion">
              <p>Content inside the Accordion</p>
            </Accordion>
          </ComponentContainer>

          <ComponentContainer name="AccordionGroup">
            <AccordionGroup>

              <Accordion title="FAQ with Icon" icon="alien-8bit">
                Check out the [Accordion](/content/components/accordions) docs for all the supported props.
              </Accordion>

              <Accordion title="FAQ without Icon">
                <div>
                  hola
                </div>
              </Accordion>

            </AccordionGroup>
          </ComponentContainer>

          <ComponentContainer name="Callouts">
              <Callout type="note">
                This adds a note in the content
              </Callout>
              <Callout type="warning">
                This adds a warning in the content
              </Callout>
              <Callout type="info">
                This adds an info in the content
              </Callout>
              <Callout type="tip">
                This adds a tip in the content
              </Callout>
              <Callout type="check">
                This adds a check in the content
              </Callout>

          </ComponentContainer>

          <ComponentContainer name="Cards">

            <CardGroup cols={3}>

              <Card title="Click on me" icon={'link'}  href="/content/components/card-group" img={'/test-watermark.png'}  color="0000FF">
                This is how you use a card with an icon and a link. Clicking on this card brings you to the Card Group page.
              </Card> 

              <Card title="Click on me" icon={'link'} href="/test-watermark.png"  img={'/test-watermark.png'} color="blue" horizontal={true}>
                This is how you use a card with an icon and a link. Clicking on this card brings you to the Card Group page.
              </Card> 
              <Card title="Click on me" icon={'link'} href="/test-watermark.png"  img={'/test-watermark.png'} color="blue" horizontal={true}>
                This is how you use a card with an icon and a link. Clicking on this card brings you to the Card Group page.
              </Card> 
            </CardGroup>
          </ComponentContainer>

          <ComponentContainer name="Code Block">
          <CodeBlock
            title="Code Block Example"
            content={`const greeting = "Hello, World!";
function sayHello() {
  console.log(greeting);
}
sayHello();`}
            language="javascript"
            highlightLines="1, 3, 5"
            initialCollapsedHeight={100}
            isExpandable={true}
          />



          </ComponentContainer>

          <ComponentContainer name="Code Group">
          <CodeGroup
            codeSnippets={codeSnippets}
            // Optional: pass a default index if you want a certain snippet selected
            defaultIndex={0}
          />
      </ComponentContainer>

      <ComponentContainer name="Icon">
          <Icon icon="check" iconType="solid" color="#FF5733" size={32}/>
          <Icon icon="circle" iconType="regular" color="#AF2733" size={10}/>
      </ComponentContainer>
      
      <ComponentContainer name="Steps">

        <Steps titleSize="h3">
          <Step title="First Step" icon='circle' titleSize='h2' stepNumber={1} iconType='regular'>
            These are instructions or content that only pertain to the first step.
          </Step>

          <Step title="Second Step">
            These are instructions or content that only pertain to the second step.
          </Step>

          <Step title="Third Step">
            These are instructions or content that only pertain to the third step.
          </Step>
        </Steps>
      </ComponentContainer>

      <ComponentContainer name="Tabs">
        <Tabs defaultIndex={0}>
          <Tab title="First Tab">
            ☝️ Welcome to the content that you can only see inside the first Tab.
          </Tab>
          <Tab title="Second Tab">
            ✌️ Here’s content that’s only inside the second Tab.
          </Tab>
          <Tab title="Third Tab">
            💪 Here’s content that’s only inside the third Tab.
          </Tab>
          
        </Tabs>
      </ComponentContainer>

      <ComponentContainer name="Tab">
        <Tab title="Lonely tab" isActive={true}>
          💪 Here’s content that’s only inside the third Tab.
        </Tab>
      </ComponentContainer>



        </div>
      </div>
    </div>
  );
}

export default App;
