import { createDrawerNavigator } from '@react-navigation/drawer';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import mailView from './view/mailView';
import ComposeNewMail from './pages/composeNewMail';
import SendMail from './pages/sendMail';
import StarredMail from './pages/starredMail';

import MainScreen from './pages/inboxMail';

const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

function Home() {
  return (
    <Drawer.Navigator
      initialRouteName="Main"
      screenOptions={{
        drawerType: 'front',
        swipeEdgeWidth: 200,
      }}>
      <Drawer.Screen
        name="Inbox"
        component={MainScreen}
        options={{ headerShown: false }}
      />
      <Drawer.Screen
        name="Starred"
        component={StarredMail}
        options={{ headerShown: false }}
      />
      <Drawer.Screen
        name="Sent"
        component={SendMail}
        options={{ headerShown: false }}
      />
    </Drawer.Navigator>
  );
}

export default function Navigations() {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        name="Home"
        component={Home}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="mailView"
        component={mailView}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="composeNewMail"
        component={ComposeNewMail}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}