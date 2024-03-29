import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { ConfigProvider } from "antd";
import { store, persistor } from "./redux/store/store.tsx";
import { QueryClient, QueryClientProvider } from "react-query";
import App from "./App.tsx";
import ko_KR from "antd/es/locale/ko_KR";

// ConfigProvider 로 theme 속성에 바로 아래 커스텀할려는 속성 넣어서 색 변경하면 됨
// 여기 components 아래에 넣고싶은 속성들 colorPrimary 에 색넣으면 되고 algorithm true 처리하면 자동으로 그 색에 맞는 색으로 입혀주는듯? false 하면 파란색
// 세세한 css 조정은 css 파일 만들어서 정리해야할듯

const theme = {
  token: {
    fontFamily: "Orbit-Regular",
    Tabs: {
      itemColor: "#aaaaaa",
      itemActiveColor: "#E0B88A",
      itemHoverColor: "#E0B88A",
      itemSelectedColor: "#E0B88A",
      inkBarColor: "#E0B88A",
      titleFontSize: "20px",
      horizontalMargin: "10px 0 30px 0",
      
      algorithm: true,
    },
  },
  components: {
    Radio: {
      colorPrimary: "#BF8438",
      colorPrimaryActive: "#FEDA89",
      colorPrimaryHover: "#BF8438",
    },
    Switch: {
      colorPrimary: "#BF8438",
      algorithm: true,
      handleSize: 25,
      trackHeight: 29,
      trackMinWidth: 60,
    },
    Button: {
      colorPrimary: "#BF8438",
      algorithm: true, // Enable algorithm
    },
    Input: {
      colorPrimary: "#FEDA89",
      algorithm: true, // Enable algorithm
    },
    Checkbox: {
      colorPrimary: "#BF8438",
      algorithm: true, // Enable algorithm
    },
    Pagination: {
      colorPrimary: "#644419",
      algorithm: true, // Enable algorithm
    },
    Steps: {
      colorPrimary: "#644419",
      algorithm: true, // Enable algorithm
    },
  },
};
const queryClient = new QueryClient();
ReactDOM.createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <Provider store={store}>
        {/* PersisGate를 통해 리액트가 로딩되기 전에 반드시 로딩되어야 할 컴포넌트가 있는 경우 loading에 해당 컴포넌트를 넣어준다 */}
        <PersistGate loading={null} persistor={persistor}>
          <ConfigProvider theme={theme} locale={ko_KR}>
            <App />
          </ConfigProvider>
        </PersistGate>
      </Provider>
    </BrowserRouter>
  </QueryClientProvider>
);
