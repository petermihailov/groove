import { scrollingMixin } from '../../mixins';
import { makeSyles, theme } from '../../styles';
import { showDuration, hideDuration } from './Drawer.const';

const easingDrawer = 'cubic-bezier(0.445,  0.050, 0.550, 0.950)';

export default makeSyles('Drawer', {
  root: {
    position: 'fixed',
    zIndex: theme.zIndexDrawer,
    top: 0,
    left: 0,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    width: '100%',
    height: '100%',
    overflow: 'hidden',
    touchAction: 'manipulation',
  },

  pristine: {},

  show: {},

  hide: {
    pointerEvents: 'none',
  },

  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: theme.colorOverlay,
    transition: `opacity ${theme.transitionMedium} ease-out`,

    '$show &': {
      // Drawer полностью открыт уже на 40% от таймлайна анимации, оверлей тоже нужно показать к тому времени
      animation: `$showOverlay ${showDuration * 0.4}ms linear`,
    },

    '$hide &': {
      animation: `$hideOverlay both ${hideDuration}ms ease-out`,
    },
    '$pristine &': {
      animationDuration: '0s',
    },
  },

  curtain: {
    ...scrollingMixin,
    position: 'relative',
    zIndex: 1,
    maxHeight: `calc(100% - ${theme.spacingMedium})`,
    willChange: 'transform',
    transition: `transform ${theme.transitionMedium} ease-out`,
    backgroundColor: theme.colorDrawer,
    borderRadius: theme.radiusXLarge,
    boxShadow: `0 50px 0 ${theme.colorDrawer}, ${theme.shadowLarge}`,

    '$show &': {
      animation: `$showDrawer ${showDuration}ms ${easingDrawer}`,
    },

    '$hide &': {
      animation: `$hideDrawer forwards ${hideDuration}ms ease-out`,
    },

    '$pristine &': {
      animationDuration: '0s',
    },
  },

  '@keyframes showDrawer': {
    '0%': {
      transform: 'translate3d(0,100%,0)',
      animationTimingFunction: easingDrawer,
    },
    '40%': {
      transform: 'translate3d(0,-2.8375%,0)',
      animationTimingFunction: easingDrawer,
    },
    '75%': {
      transform: 'translate3d(0,0.0805%,0)',
      animationTimingFunction: easingDrawer,
    },
    '100%': {
      transform: 'translate3d(0,0,0)',
      animationTimingFunction: easingDrawer,
    },
  },

  '@keyframes hideDrawer': {
    to: { transform: 'translate3d(0,100%,0)' },
  },

  '@keyframes showOverlay': {
    from: { opacity: 0 },
    to: { opacity: 1 },
  },

  '@keyframes hideOverlay': {
    to: { opacity: 0 },
  },
});
