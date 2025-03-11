interface AccordionGroupProps {
	children: React.ReactNode;
}

export function AccordionGroup({ children }: AccordionGroupProps) {
	return (
		<div className="[&>div]:border-0 [&>div]:rounded-none [&>div>button]:rounded-none [&>div]:mb-0 overflow-hidden mt-0 mb-3 rounded-xl prose prose-gray dark:prose-invert divide-y divide-inherit border dark:border-gray-800/50">
			{children}
		</div>
	);
}
