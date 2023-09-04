const getScrollProgress = (element: HTMLElement | undefined): number => {
	if (!element) return 0;

	const elementPosition = window.scrollY - element.scrollTop;

	if (elementPosition < 0) return 0;

	if (elementPosition > element.scrollHeight) return 1;

	return elementPosition / element.scrollHeight;
};

export { getScrollProgress };
