import React from 'react';
import {StatusBar} from 'react-native';
import {StoreProvider} from 'easy-peasy';
import {Provider as PaperProvider} from 'react-native-paper';

import createStore from './Store';

import {ThemeProvider} from './Themes/Context/ThemeContext';
import {AppContextProvider} from './Services/Auth/AppContext';
import {LocaleContextProvider} from './i18n/LocaleContext';

import {Screen} from './Components';
import useAppTheme from './Themes/Context';
import RootNavigation from './Navigation/AppNavigation';

const store = createStore();

//return root component
const Root = () => {
  return (
    <Screen>
      <LocaleContextProvider>
        <StoreProvider store={store}>
          <StatusBar translucent backgroundColor={'rgba(0,0,0,0.2)'} />
          <ThemeProvider>
            <ThemeConsumer />
          </ThemeProvider>
        </StoreProvider>
      </LocaleContextProvider>
    </Screen>
  );
};

const ThemeConsumer = () => {
  const {theme} = useAppTheme();

  return (
    <PaperProvider theme={theme}>
      <AppContextProvider>
        <RootNavigation />
      </AppContextProvider>
    </PaperProvider>
  );
};

//temp workaround for react-native-gesture-handler in react-native 0.61
// take a look https://github.com/react-native-community/releases/issues/140#issuecomment-532819601
export default Root;
