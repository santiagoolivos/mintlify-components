import { Accordion } from "./components/Accordion";
import { AccordionGroup } from "./components/accordion-groups";
import Callout from "./components/callouts";
import Card from "./components/card";


interface ComponentContainerProps {
  name: string;
  children: React.ReactNode;
}

const ComponentContainer = ({ name,  children }: ComponentContainerProps) => {
  return (
    <div className="flex flex-row gap-5 items-center justify-center">
      - {name}:
      {children}
    </div>
  );
}

function App() {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center w-full">
      <h1 className="text-4xl font-bold mb-8 text-blue-500">Component Showcase</h1>
      <div className="flex flex-col gap-4">
        <div className="flex flex-col items-center gap-2">
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
            <div className="flex flex-col">

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
            </div>

          </ComponentContainer>

          <ComponentContainer name="Cards">
            <div className="flex flex-col">

            <Card title="Click on me" icon={''} href="/content/components/card-group" color="blue">
              This is how you use a card with an icon and a link. Clicking on this card brings you to the Card Group page.
            </Card> 

            <Card title="Click on me" icon={''} href="/test-watermark.png" color="blue" horizontal={false}>
              This is how you use a card with an icon and a link. Clicking on this card brings you to the Card Group page.
            </Card> 
            </div>

          </ComponentContainer>
        </div>
      </div>
    </div>
  );
}

export default App;
