import ReactPixel from 'react-facebook-pixel';

const options = {
	autoConfig: true, // set pixel's autoConfig
	debug: false, // enable logs
};

export const initFacebookPixel = (pixelId: string) => {
	// @ts-ignore
	ReactPixel.init(pixelId, {}, options);
};

export const trackPageView = () => {
	ReactPixel.pageView();
};

export const trackEvent = (event: string, data = {}) => {
	ReactPixel.track(event, data);
};
