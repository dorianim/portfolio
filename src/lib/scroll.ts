const getScrollProgress = (element: HTMLElement | undefined): number => {
	if (!element) return 0;

	const viewHeight = window.visualViewport!.height;
	const elementPosition = window.scrollY + viewHeight - element.offsetTop;

	if (elementPosition < 0) return 0;

	if (elementPosition > viewHeight + element.offsetHeight) return 1;

	return elementPosition / (viewHeight + element.offsetHeight);
};

export { getScrollProgress };
