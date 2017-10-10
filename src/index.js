import MdCore from './core';
import MdAvatar from './components/mdAvatar';
import MdBackdrop from './components/mdBackdrop';
import MdButton from './components/mdButton';
import MdCard from './components/mdCard';
import MdCheckbox from './components/mdCheckbox';
import MdDialog from './components/mdDialog';
import MdInputContainer from './components/mdInputContainer';
import MdList from './components/mdList';
import MdMenu from './components/mdMenu';
import MdProgress from './components/mdProgress';
import MdRadio from './components/mdRadio';
import MdSelect from './components/mdSelect';
import MdSidenav from './components/mdSidenav';
import MdSnackbar from './components/mdSnackbar';
import MdSubheader from './components/mdSubheader';
import MdToolbar from './components/mdToolbar';
import MdTooltip from './components/mdTooltip';
import MdWhiteframe from './components/mdWhiteframe';

const options = {
  MdCore,
  MdAvatar,
  MdButton,
  MdBackdrop,
  MdCard,
  MdCheckbox,
  MdDialog,
  MdInputContainer,
  MdList,
  MdMenu,
  MdProgress,
  MdRadio,
  MdSelect,
  MdSidenav,
  MdSnackbar,
  MdSubheader,
  MdToolbar,
  MdTooltip,
  MdWhiteframe
};

options.install = (Vue) => {
  for (let component in options) {
    const componentInstaller = options[component];

    if (componentInstaller && component !== 'install') {
      Vue.use(componentInstaller);
    }
  }
};

export default options;
