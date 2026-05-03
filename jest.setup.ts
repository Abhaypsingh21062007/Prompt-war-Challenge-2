import '@testing-library/jest-dom';

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

Object.defineProperty(window, 'IntersectionObserver', {
  writable: true,
  value: jest.fn().mockImplementation(() => ({
    observe: jest.fn(),
    unobserve: jest.fn(),
    disconnect: jest.fn(),
  })),
});

// ---------------------------------------------------------------------------
// Global framer-motion mock — strips animation props from DOM elements,
// preventing React warnings about unknown attributes (whileInView, etc.)
// ---------------------------------------------------------------------------
jest.mock('framer-motion', () => {
  const React = require('react');
  
  const FRAMER_MOTION_PROPS = new Set([
    'initial', 'animate', 'exit', 'transition', 'variants',
    'whileHover', 'whileTap', 'whileInView', 'whileFocus', 'whileDrag',
    'layoutId', 'layout', 'viewport', 'drag', 'dragConstraints', 'onViewportEnter', 'onViewportLeave',
    'hoverEffect', 'isLoading' // Add custom props that might leak from UI components
  ]);

  const createMotionComponent = (tag: any) => {
    return React.forwardRef(({ children, ...props }: any, ref: any) => {
      const cleanProps: Record<string, any> = {};
      Object.keys(props).forEach(key => {
        if (!FRAMER_MOTION_PROPS.has(key)) cleanProps[key] = props[key];
      });
      return React.createElement(tag, { ...cleanProps, ref }, children);
    });
  };

  const motion = createMotionComponent; // motion(Component)

  // Add common tags as properties: motion.div, motion.span, etc.
  const tags = [
    'div', 'span', 'button', 'form', 'input', 'select', 'textarea', 'label',
    'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'a', 'img', 'ul', 'ol', 'li',
    'svg', 'path', 'circle', 'rect', 'line', 'polyline', 'polygon', 'ellipse', 'g',
    'nav', 'section', 'footer', 'header', 'main', 'article', 'aside', 'details', 'summary'
  ];
  tags.forEach(tag => {
    (motion as any)[tag] = createMotionComponent(tag);
  });

  return {
    motion,
    AnimatePresence: ({ children }: any) => React.createElement(React.Fragment, null, children),
    useAnimation: () => ({ start: jest.fn(), stop: jest.fn() }),
    useMotionValue: (v: any) => ({ get: () => v, set: jest.fn() }),
    useTransform: () => ({ get: jest.fn() }),
  };
});



