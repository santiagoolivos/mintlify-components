import { Accordion } from "./components/accordion";
import { AccordionGroup } from "./components/accordion-groups";
import { Callout } from "./components/callouts";
import { Card } from "./components/card";
import { CardGroup } from "./components/card-group";
import { CodeBlock } from "./components/code-block";
import { CodeGroup } from "./components/code-group";
import { Icon } from "./components/icon";
import { Step } from "./components/step";
import { Steps } from "./components/steps";
import { Tab } from "./components/tab";
import { Tabs } from "./components/tabs";
import { Tooltip } from "./components/tooltip";

interface ComponentContainerProps {
	name: string;
	children: React.ReactNode;
}

const codeSnippets = [
	{
		filename: "helloWorld.js",
		language: "javascript",
		content: `console.log("Hello World");`,
	},
	{
		filename: "hello_world.py",
		language: "python",
		content: `print('Hello World!')`,
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
		isExpandable: true,
	},
];

const ComponentContainer = ({ name, children }: ComponentContainerProps) => {
	return (
		<tr className="border">
			{/* Left column: Name */}
			<td className=" border p-2 font-bold text-primary">{name}:</td>
			{/* Right column: Children */}
			<td className=" p-2 align-top flex flex-col items-start m-5">
				{children}
			</td>
		</tr>
	);
};

function App() {
	return (
		<div className="min-h-screen bg-white flex flex-col items-center justify-center  m-10">
			<h1 className="text-4xl font-bold mb-8 text-primary">
				Components Showcase
			</h1>
			<table className="border-collapse max-w-screen-xl">
				<tbody>
					<ComponentContainer name="Accordion">
						<Accordion title="I am the Accordion">
							<p>Content inside the Accordion</p>
						</Accordion>

            <Accordion title="I am the Accordion with icon and description" icon="circle" iconType="regular" description="This is the description" defaultOpen={true}>
							<p>Content inside the Accordion with default open</p>
						</Accordion>
					</ComponentContainer>

					<ComponentContainer name="AccordionGroup">
						<AccordionGroup>
							<Accordion title="FAQ with Icon" icon="alien-8bit">
								Check out the [Accordion](/content/components/accordions) docs
								for all the supported props.
							</Accordion>

							<Accordion title="FAQ without Icon">
								<div>hola</div>
							</Accordion>
						</AccordionGroup>
					</ComponentContainer>

					<ComponentContainer name="Callouts">
						<Callout type="note">This adds a note in the content</Callout>
						<Callout type="warning">This adds a warning in the content</Callout>
						<Callout type="info">This adds an info in the content</Callout>
						<Callout type="tip">This adds a tip in the content</Callout>
						<Callout type="check">This adds a check in the content</Callout>
					</ComponentContainer>

					<ComponentContainer name="Card">
						<Card
							title="Click on me"
							icon={"ghost"}
              iconType="solid"
							color="F16FF0"
							href="/content/components/card-group"
              horizontal={true}
							img={"/test-watermark.png"}
						>
							This is how you use a card with an icon and a link. Clicking on
							this card brings you to the Card Group page.
						</Card>
					</ComponentContainer>

					<ComponentContainer name="Cards">
						<CardGroup cols={3}>
							<Card
								title="Click on me"
								icon={"link"}
                iconType="solid"
                color="red" // this also can be the hex
								href="/content/components/card-group"
								img={"/test-watermark.png"}
							>
								This is how you use a card with an icon and a link. Clicking on
								this card brings you to the Card Group page.
							</Card>

							<Card
								title="Click on me"
								icon={"link"}
								href="/test-watermark.png"
								img={"/test-watermark.png"}
								color="blue"
								horizontal={true}
							>
								This is how you use a card with an icon and a link. Clicking on
								this card brings you to the Card Group page.
							</Card>
							<Card
								title="Click on me"
								icon={"link"}
								href="/test-watermark.png"
								img={"/test-watermark.png"}
								color="blue"
								horizontal={true}
							>
								This is how you use a card with an icon and a link. Clicking on
								this card brings you to the Card Group page.
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
sayHello();
`}
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
						<Icon icon="check" iconType="solid" color="#FF5733" size={32} />
						<Icon icon="circle" iconType="regular" color="#AF2733" size={10} />
					</ComponentContainer>

					<ComponentContainer name="Step">
						<Step title="Lonely Step" stepNumber={1} titleSize="h2">
							These are instructions or content that only pertain to the third
							step.
						</Step>
					</ComponentContainer>

					<ComponentContainer name="Steps">
						<Steps titleSize="h3">
							<Step
								title="First Step"
								icon="circle"
								titleSize="h2"
								stepNumber={1}
								iconType="regular"
							>
								These are instructions or content that only pertain to the first
								step.
							</Step>

							<Step title="Second Step" titleSize="h3">
								These are instructions or content that only pertain to the
								second step.
							</Step>

							<Step title="Third Step" titleSize="p">
								These are instructions or content that only pertain to the third
								step.
							</Step>
						</Steps>
					</ComponentContainer>
					<ComponentContainer name="Tab">
						<Tab title="Lonely tab" isActive={true}>
							💪 Here’s content that’s only inside the third Tab.
						</Tab>
					</ComponentContainer>

					<ComponentContainer name="Tabs">
						<Tabs defaultIndex={0}>
							<Tab title="First Tab">
								☝️ Welcome to the content that you can only see inside the first
								Tab.
							</Tab>
							<Tab title="Second Tab">
								✌️ Here’s content that’s only inside the second Tab.
							</Tab>
							<Tab title="Third Tab">
								💪 Here’s content that’s only inside the third Tab.
							</Tab>
						</Tabs>
					</ComponentContainer>

					<ComponentContainer name="Tooltip">
						<Tooltip tip="This is a tooltip!">Hover over me</Tooltip>
					</ComponentContainer>
				</tbody>
			</table>
		</div>
	);
}

export default App;
