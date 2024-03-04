import { useState, useEffect, ReactNode, MouseEventHandler } from 'react';
import bridge, { UserInfo } from '@vkontakte/vk-bridge';
import { View, SplitLayout, SplitCol, ScreenSpinner } from '@vkontakte/vkui';
import { useActiveVkuiLocation } from '@vkontakte/vk-mini-apps-router';
import { DEFAULT_VIEW_PANELS } from './routes';
import Home from './panels/Home';
import DetalBookcook from './panels/DetalBookcook'
import { setUserServerFx } from './api/user';

export const App = () => {
  const [fetchedUser, setUser] = useState<UserInfo | undefined>();
  const [popout, setPopout] = useState<ReactNode | null>(<ScreenSpinner size="large" />);
  const [activePanel, setActivePanel] = useState('home');

  useEffect(() => {
    async function fetchData() {
      const user = await bridge.send('VKWebAppGetUserInfo');
      setUser(user);
      setUserServerFx(user.id);
      setPopout(null);
    }
    fetchData();
  }, []);

  const go: MouseEventHandler<HTMLElement> = (e) => {
    setActivePanel(e.currentTarget.dataset.to ?? "home");
  };

  return (
    <SplitLayout popout={popout}>
      <SplitCol>
        <View activePanel={activePanel}>
          <Home id="home" fetchedUser={fetchedUser} go={go} />
          <DetalBookcook id="detali" fetchedUser={fetchedUser} go={go}/>
        </View>
      </SplitCol>
    </SplitLayout>
  );
};
